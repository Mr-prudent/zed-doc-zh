---
title: 调试器 - Zed
description: 使用调试器协议 (DAP) 在 Zed 中调试代码。支持多种语言的断点、单步执行和变量检查。
---

# 调试器

Zed 使用 [调试器协议 (DAP)](https://microsoft.github.io/debug-adapter-protocol/) 来提供跨多种编程语言的调试功能。
DAP 是一个标准化的协议，它定义了调试器、编辑器和 IDE 之间如何相互通信。
它使得 Zed 能够支持各种调试器，而无需实现特定语言的调试逻辑。
Zed 实现了该协议的客户端部分，而各种 _调试适配器_ 实现了服务器部分。

该协议实现在不同的编程语言和运行时环境中，以一致的方式设置断点、单步执行代码、检查变量等功能。

## 支持的语言

要调试特定语言编写的代码，Zed 需要为该语言找到一个调试适配器。一些调试适配器由 Zed 提供，无需额外设置，另一些则由 [语言扩展](./extensions/debugger-extensions.md) 提供。目前以下语言有可用的调试适配器：

<!-- keep this sorted -->

- [C](./languages/c.md#debugging) (内置)
- [C++](./languages/cpp.md#debugging) (内置)
- [Go](./languages/go.md#debugging) (内置)
- [Java](./languages/java.md#debugging) (由扩展提供)
- [JavaScript](./languages/javascript.md#debugging) (内置)
- [PHP](./languages/php.md#debugging) (内置)
- [Python](./languages/python.md#debugging) (内置)
- [Ruby](./languages/ruby.md#debugging) (由扩展提供)
- [Rust](./languages/rust.md#debugging) (内置)
- [Swift](./languages/swift.md#debugging) (由扩展提供)
- [TypeScript](./languages/typescript.md#debugging) (内置)

> 如果你的语言未在列表中，你可以通过为其添加调试适配器来做出贡献。请查看我们的 [调试器扩展](./extensions/debugger-extensions.md) 文档以获取更多信息。

请遵循这些链接以获取特定于语言和适配器的信息和示例，或继续阅读以了解 Zed 适用于所有适配器的通用调试功能。

## 入门指南

对于大多数语言，最快入门的方式是运行 {#action debugger::Start} ({#kb debugger::Start})。这将打开 _新进程模态框_，其中显示当前项目的预配置调试任务列表。调试任务由测试、入口点（如 `main` 函数）和其他来源创建——有关支持的完整信息，请参阅你所用语言的文档。

你也可以通过单击调试面板右上角的 "加号" 按钮来打开相同的模态框。

对于不提供预配置调试任务的语言（这包括 C、C++ 和一些由扩展支持的语言），你可以在项目根目录的 `.zed/debug.json` 文件中定义调试配置。该文件应为一个配置对象的数组：

```json [debug]
[
  {
    "adapter": "CodeLLDB",
    "label": "第一个配置"
    // ...
  },
  {
    "adapter": "Debugpy",
    "label": "第二个配置"
    // ...
  }
]
```

请查阅你所用语言的文档，以获取涵盖典型用例的示例配置。一旦你将配置添加到 `.zed/debug.json` 中，它们就会出现在新进程模态框的列表中。

Zed 还会从 `.vscode/launch.json` 加载调试配置，如果在 `.zed/debug.json` 中找不到配置，则会在新进程模态框中显示它们。

#### 全局调试配置

如果你在多个项目中使用相同的启动配置文件，你可以将它们一次性存储在用户配置中。从命令面板中调用 {#action zed::OpenDebugTasks} 以打开全局 `debug.json` 文件；Zed 会在你的用户 `settings.json` 旁边创建它，并使其与调试器 UI 保持同步。该文件位于：

- **macOS:** `~/Library/Application Support/Zed/debug.json`
- **Linux/BSD:** `$XDG_CONFIG_HOME/zed/debug.json` (回退到 `~/.config/zed/debug.json`)
- **Windows:** `%APPDATA%\Zed\debug.json`

在此文件中填充你原本会放在 `.zed/debug.json` 中的相同对象数组。其中定义的任何场景都会合并到每个工作区中，因此你最喜欢的启动预设会自动出现在“新调试会话”对话框中。

### 启动与附加

Zed 调试器提供了两种调试程序的方式：你可以 _启动_ 程序的一个新实例，或 _附加_ 到一个现有进程。
选择哪种方式取决于你想要实现的目标。

当启动一个新实例时，Zed（以及底层的调试适配器）通常比附加到现有进程能更好地获取调试信息，因为它控制整个程序的生命周期。
运行单元测试或应用程序的调试版本是启动方式的一个很好的用例。

与启动相比，附加到现有进程可能看起来更逊色，但事实远非如此；在某些情况下，你无法重启你的程序，例如，该错误无法在生产环境之外重现，或其他某些情况。

## 配置

Zed 要求所有调试任务都需要 `adapter` 和 `label` 字段。此外，Zed 将使用 `build` 字段在调试器启动之前运行任何必要的设置步骤 [(参见下文)](#build-tasks)，并且可以接受一个 `tcp_connection` 字段以连接到现有进程。

所有其他字段均由调试适配器提供，并且可以包含 [任务变量](./tasks.md#variables)。大多数适配器支持 `request`、`program` 和 `cwd`：

```json [debug]
[
  {
    // 调试配置的标签，用于在调试面板和新进程模态框中标识调试会话
    "label": "示例启动调试器配置",
    // Zed 应用于调试程序的调试适配器
    "adapter": "示例适配器名称",
    // 请求：
    //  - launch: 如果指定，Zed 将启动该程序，或者显示一个具有正确配置的调试终端
    //  - attach: Zed 将附加到一个正在运行的程序进行调试，或者当未指定 process_id 时，将显示一个进程选择器（目前仅支持 node）
    "request": "launch",
    // 要调试的程序。此字段支持使用 ~ 或 . 符号进行路径解析。
    "program": "程序路径",
    // cwd: 默认为项目的当前工作目录 ($ZED_WORKTREE_ROOT)
    "cwd": "$ZED_WORKTREE_ROOT"
  }
]
```

查阅你的调试适配器文档以了解更多它所支持的字段信息。

### 构建任务

Zed 允许在 `build` 字段中嵌入一个 Zed 任务，该任务在调试器启动之前运行。这对于在调试器启动之前设置环境或运行任何必要的设置步骤非常有用。

```json [debug]
[
  {
    "label": "构建二进制文件",
    "adapter": "CodeLLDB",
    "program": "程序路径",
    "request": "launch",
    "build": {
      "command": "make",
      "args": ["build", "-j8"]
    }
  }
]
```

构建任务也可以通过未替换的标签引用现有任务：

```json [debug]
[
  {
    "label": "构建二进制文件",
    "adapter": "CodeLLDB",
    "program": "程序路径",
    "request": "launch",
    "build": "我的构建任务" // 或 "我的构建任务 for $ZED_FILE"
  }
]
```

### 自动场景创建

给定一个 Zed 任务，Zed 可以为你自动创建一个场景。自动场景创建也支持我们从代码行边缘（gutter）创建场景。
目前，Rust、Go、Python、JavaScript 和 TypeScript 支持自动场景创建。

## 断点

要设置断点，只需单击编辑器代码行边缘（gutter）旁边的行号。
断点可以根据你的需求进行调整；要访问某个断点的其他选项，请右键单击边缘（gutter）中的断点图标，然后选择所需的选项。
目前，你可以：

- 向断点添加日志，每当该断点被命中时，将输出日志消息。
- 使断点成为条件断点，只有当条件满足时才在断点处停止。条件的语法因适配器而异。
- 为断点添加命中计数，只有在该断点被命中特定次数后才停止。
- 禁用断点，这将防止它被命中，同时在边缘（gutter）中保持可见。

一些调试适配器（例如 CodeLLDB 和 JavaScript）也会 _验证_ 你的断点是否可以被命中；无法被命中的断点在 UI 中会更加突出地显示。

项目中所有启用的断点也会列在调试会话 UI 的 "断点" 项目中。从你 UI 中的 "断点" 项目，你还可以管理异常断点。
然后，每当发生特定类型的异常时，调试适配器就会停止。支持哪些异常类型取决于调试适配器。

## 使用分割窗格

当使用多个打开的分割窗格进行调试时，Zed 会在一个窗格中显示活动的调试行，并在其他窗格中保留你的布局。如果你在多个窗格中打开了相同的文件，调试器会选择一个该文件已经是活动标签的窗格——它不会切换文件处于非活动状态的窗格中的标签。

一旦调试器选择了一个窗格，它就会在该会话的后续断点继续使用该窗格。如果你将带有活动调试行的标签拖动到另一个分割区域，调试器会跟踪这个移动并使用新的窗格。

这确保了在跨不同文件单步执行代码时，调试器不会中断你的工作流程。

## 设置

调试器的设置在 `settings.json` 中归入 `debugger` 键下：

- `dock`: 确定 UI 中调试面板的位置。
- `stepping_granularity`: 确定单步执行的粒度。
- `save_breakpoints`: 断点是否应在 Zed 会话之间重用。
- `button`: 是否在状态栏中显示调试按钮。
- `timeout`: 连接到 TCP 调试适配器时，直到超时错误的时间（毫秒）。
- `log_dap_communications`: 是否记录活动调试适配器与 Zed 之间的消息。
- `format_dap_log_messages`: 在将 DAP 消息添加到调试适配器日志时是否格式化它们。

### 停靠位置

- 描述: UI 中调试面板的位置。
- 默认值: `bottom`
- 设置项: `debugger.dock`

**选项**

1. `left` - 调试面板将停靠在 UI 的左侧。
2. `right` - 调试面板将停靠在 UI 的右侧。
3. `bottom` - 调试面板将停靠在 UI 的底部。

```json [settings]
"debugger": {
  "dock": "bottom"
},
```

### 单步执行粒度

- 描述: 调试器将使用的单步执行粒度。
- 默认值: `line`
- 设置项: `debugger.stepping_granularity`

**选项**

1. Statement (语句) - 单步执行应允许程序运行，直到当前语句执行完毕。
   语句的含义由适配器决定，并且可能被认为等同于一行。
   例如 `for(int i = 0; i < 10; i++)` 可能被认为有 3 个语句：`int i = 0`、`i < 10` 和 `i++`。

```json [settings]
{
  "debugger": {
    "stepping_granularity": "statement"
  }
}
```

2. Line (行) - 单步执行应允许程序运行，直到当前源行被执行完毕。

```json [settings]
{
  "debugger": {
    "stepping_granularity": "line"
  }
}
```

3. Instruction (指令) - 单步执行应允许执行一条指令（例如一个 x86 指令）。

```json [settings]
{
  "debugger": {
    "stepping_granularity": "instruction"
  }
}
```

### 保存断点

- 描述: 断点是否应在 Zed 会话之间被保存。
- 默认值: `true`
- 设置项: `debugger.save_breakpoints`

**选项**

`boolean` 值

```json [settings]
{
  "debugger": {
    "save_breakpoints": true
  }
}
```

### 按钮

- 描述: 是否应在调试器工具栏中显示该按钮。
- 默认值: `true`
- 设置项: `debugger.button`

**选项**

`boolean` 值

```json [settings]
{
  "debugger": {
    "button": true
  }
}
```

### 超时

- 描述: 连接到 TCP 调试适配器时，直到超时错误的时间（毫秒）。
- 默认值: `2000`
- 设置项: `debugger.timeout`

**选项**

`integer` 值

```json [settings]
{
  "debugger": {
    "timeout": 3000
  }
}
```

### 内联值

- 描述: 是否在调试会话期间启用编辑器内联提示，以显示代码中变量的值。
- 默认值: `true`
- 设置项: `inlay_hints.show_value_hints`

**选项**

```json [settings]
{
  "inlay_hints": {
    "show_value_hints": false
  }
}
```

内联值提示也可以从编辑器工具栏的“编辑器控制”菜单中切换。

### 记录 DAP 通信

- 描述: 是否记录活动调试适配器与 Zed 之间的消息。（用于 DAP 开发）
- 默认值: `false`
- 设置项: `debugger.log_dap_communications`

**选项**

`boolean` 值

```json [settings]
{
  "debugger": {
    "log_dap_communications": true
  }
}
```

### 格式化 DAP 日志消息

- 描述: 在将 DAP 消息添加到调试适配器日志时是否格式化它们。（用于 DAP 开发）
- 默认值: `false`
- 设置项: `debugger.format_dap_log_messages`

**选项**

`boolean` 值

```json [settings]
{
  "debugger": {
    "format_dap_log_messages": true
  }
}
```

### 自定义调试适配器

- 描述: 自定义程序路径和参数，以覆盖 Zed 启动特定调试适配器的方式。
- 默认值: 因适配器而异
- 设置项: `dap.$ADAPTER.binary` 和 `dap.$ADAPTER.args`

你可以传递 `binary`、`args` 或两者。`binary` 应该是 _调试适配器_（如 `lldb-dap`）的路径，而不是 _调试器_（如 `lldb` 本身）。`args` 设置会覆盖 Zed 否则会传递给适配器的任何参数。

```json [settings]
{
  "dap": {
    "CodeLLDB": {
      "binary": "/Users/姓名/bin/lldb-dap",
      "args": ["--wait-for-debugger"]
    }
  }
}
```

## 主题

调试器支持以下主题选项：

- `debugger.accent`: 用于突出显示断点及断点相关符号的颜色
- `editor.debugger_active_line.background`: 活动调试行的背景色

## 故障排除

如果你在使用调试器时遇到问题，请 [在 GitHub 上提交一个问题](https://github.com/zed-industries/zed/issues/new?template=04_bug_debugger.yml)，并提供尽可能多的上下文信息。你还可以使用一些功能来收集更多关于问题的信息：

- 当你在调试面板中有一个正在运行的会话时，你可以运行 {#action dev::CopyDebugAdapterArguments} 操作，将一个描述 Zed 如何初始化该会话的 JSON blob 复制到剪贴板。这在会话未能启动时尤其有用，如果你在 GitHub 上提交问题，这也是很好的上下文信息。
- 你还可以使用 {#action dev::OpenDebugAdapterLogs} 操作来查看最近调试会话期间 Zed 与所有调试适配器通信的跟踪记录。