---
title: 任务 - 在 Zed 中运行命令
description: 使用任务定义在 Zed 中运行和重新运行 shell 命令。支持变量、模板以及语言特定的任务。
---

# 任务

Zed 支持使用其集成的[终端](./terminal.md)来生成（和重新运行）命令并输出结果。这些命令可以读取 Zed 状态的有限子集（例如当前正在编辑或所选文件的路径）。

```json [tasks]
[
  {
    "label": "示例任务",
    "command": "for i in {1..5}; do echo \"Hello $i/5\"; sleep 1; done",
    //"args": [],
    // 命令的环境变量覆盖，将从设置中的终端环境变量追加。
    "env": { "foo": "bar" },
    // 生成命令的当前工作目录，默认为当前项目根目录。
    //"cwd": "/path/to/working/directory",
    // 使用新的终端标签页来生成进程，还是重用现有的一个，默认为 `false`。
    "use_new_terminal": false,
    // 是否允许多个相同任务实例同时运行，或者等待现有实例完成，默认为 `false`。
    "allow_concurrent_runs": false,
    // 命令启动后，对终端窗格和标签页执行的操作：
    // * `always` — 始终显示任务的窗格，并聚焦到其中的相应标签页（默认）
    // * `no_focus` — 始终显示任务的窗格，在其中添加任务的标签页，但不聚焦它
    // * `never` — 不更改焦点，但仍在其窗格中添加/重用任务的标签页
    "reveal": "always",
    // 命令完成后，对终端窗格和标签页执行的操作：
    // * `never` — 命令完成时不执行任何操作（默认）
    // * `always` — 总是隐藏终端标签页，如果它是窗格中的最后一个标签页，也隐藏窗格
    // * `on_success` — 仅在任务成功时隐藏终端标签页，否则行为类似于 `always`
    "hide": "never",
    // 在终端中运行任务时使用哪个 shell。
    // 可接受 3 个值：
    // 1. (默认) 使用 /etc/passwd 中系统默认的终端配置
    //      "shell": "system"
    // 2. 一个程序：
    //      "shell": {
    //        "program": "sh"
    //      }
    // 3. 一个带参数的程序：
    //     "shell": {
    //         "with_arguments": {
    //           "program": "/bin/bash",
    //           "args": ["--login"]
    //         }
    //     }
    "shell": "system",
    // 是否在生成任务的输出中显示任务行，默认为 `true`。
    "show_summary": true,
    // 是否在生成任务的输出中显示命令行，默认为 `true`。
    "show_command": true,
    // 运行任务前保存哪些已编辑的缓冲区：
    // * `all` — 保存所有已编辑的缓冲区
    // * `current` — 仅保存当前缓冲区
    // * `none` — 不保存任何缓冲区
    "save": "all"
    // 用于内联可运行指标或一次性运行多个任务的标签。
    // "tags": []
  }
]
```

有两个操作驱动着任务使用的工作流程：`task: spawn` 和 `task: rerun`。
`task: spawn` 会打开一个模态框，其中显示当前文件中所有可用的任务。
`task: rerun` 会重新运行最近生成的任务。您也可以从任务模态框中重新运行任务。

默认情况下，重新运行任务会重用同一个终端（因为默认 `"use_new_terminal": false`），但会等待前一个任务完成后再启动（因为默认 `"allow_concurrent_runs": false`）。

保持 `"use_new_terminal": false` 并设置 `"allow_concurrent_runs": true` 以允许在重新运行时取消之前的任务。

## 任务模板

任务可以在以下地方定义：

- 全局 `tasks.json` 文件中；这样的任务在您工作的所有 Zed 项目中都可用。此文件通常位于 `~/.config/zed/tasks.json`。您可以使用 `zed: open tasks` 操作来编辑它们。
- 工作区特定的（本地）`.zed/tasks.json` 文件中；这样的任务仅在包含该工作区的项目上工作时可用。您可以使用 `zed: open project tasks` 操作来编辑工作区特定的任务。
- 通过[一次性任务](#oneshot-tasks)即时定义。这些任务是项目特定的，不会在会话之间持久化。
- 通过语言扩展。

## 变量

Zed 任务的行为就像您的 shell；这意味着您也可以通过类 sh 的 `$VAR_NAME` 语法引用环境变量。为了方便起见，还设置了一些额外的环境变量。
这些变量允许您从当前编辑器中提取信息，并在您的任务中使用。以下变量是可用的：

- `ZED_COLUMN`: 当前列号
- `ZED_ROW`: 当前行号
- `ZED_FILE`: 当前打开文件的绝对路径（例如 `/Users/my-user/path/to/project/src/main.rs`）
- `ZED_FILENAME`: 当前打开文件的文件名（例如 `main.rs`）
- `ZED_DIRNAME`: 当前打开文件去掉文件名后的绝对路径（例如 `/Users/my-user/path/to/project/src`）
- `ZED_RELATIVE_FILE`: 当前打开文件的路径，相对于 `ZED_WORKTREE_ROOT`（例如 `src/main.rs`）
- `ZED_RELATIVE_DIR`: 当前打开文件所在目录的路径，相对于 `ZED_WORKTREE_ROOT`（例如 `src`）
- `ZED_STEM`: 当前打开文件的 stem（不带扩展名的文件名）（例如 `main`）
- `ZED_SYMBOL`: 当前选定的符号；应与符号面包屑中显示的最后一个符号匹配（例如 `mod tests > fn test_task_contexts`）
- `ZED_SELECTED_TEXT`: 当前选定的文本
- `ZED_LANGUAGE`: 当前打开缓冲区的语言（例如 `Rust`、`Python`、`Shell Script`）
- `ZED_WORKTREE_ROOT`: 当前工作区的绝对路径到根目录。（例如 `/Users/my-user/path/to/project`）
- `ZED_CUSTOM_RUST_PACKAGE`: (Rust 特定) $ZED_FILE 源文件父包的名称。

要在任务中使用变量，请在它前面加上一个美元符号 (`$`)：

```json [tasks]
{
  "label": "echo current file's path",
  "command": "echo $ZED_FILE"
}
```

您也可以使用详细语法，该语法允许在给定变量不可用时指定默认值：`${ZED_FILE:default_value}`

这些环境变量也可以在任务的 `cwd`、`args` 和 `label` 字段中使用。

### 变量引用

当处理包含空格或其他特殊字符的路径时，请确保变量已正确转义。

例如，不要这样做（如果路径中有空格，这将会失败）：

```json [tasks]
{
  "label": "stat current file",
  "command": "stat $ZED_FILE"
}
```

请提供如下内容：

```json [tasks]
{
  "label": "stat current file",
  "command": "stat",
  "args": ["$ZED_FILE"]
}
```

或者像这样显式包含转义引号：

```json [tasks]
{
  "label": "stat current file",
  "command": "stat \"$ZED_FILE\""
}
```

### 基于变量的任务过滤

在确定任务列表时，如果任务定义中的变量当前不存在，则这些任务将被过滤掉。

例如，只有在有文本选择时，以下任务才会出现在生成模态框中：

```json [tasks]
{
  "label": "selected text",
  "command": "echo \"$ZED_SELECTED_TEXT\""
}
```

为这些变量设置默认值，以便始终显示此类任务：

```json [tasks]
{
  "label": "selected text with default",
  "command": "echo \"${ZED_SELECTED_TEXT:no text selected}\""
}
```

## 一次性任务

通过 `task: spawn` 打开的同一个任务模态框支持类 bash 命令的任意执行：在模态框的文本字段中键入命令，然后使用 `opt-enter` 来生成它。

该任务模态框在会话期间会临时保存这些临时命令，`task: rerun` 也会重新运行这些任务，如果它们是最近生成的任务。

您还可以在模态框中调整当前选定的任务（`tab` 是默认的键绑定）。这样做会将该任务的命令放入一个提示符中，然后可以对其进行编辑并作为一次性任务生成。

### 临时任务

当通过模态框生成任务时，您可以使用 `cmd` 修饰符；这样生成的任务不会增加其使用计数（因此，它们不会通过 `task: rerun` 重新生成，并且在任务模态框中不会有很高的排名）。
临时任务的预期用途是通过连续的 `task: rerun` 使用来保持工作流畅。

### 更多的任务重新运行控制

默认情况下，任务会将变量捕获到上下文中一次，并且这个“已解析的任务”会被一直重新运行。

这可以通过向任务添加 `"reevaluate_context"` 参数来控制：将其设置为 `true` 将强制在每次运行前重新评估任务。

```json [keymap]
{
  "context": "Workspace",
  "bindings": {
    "alt-t": ["task::Rerun", { "reevaluate_context": true }]
  }
}
```

## 任务的自定义键绑定

您可以通过向 `task::Spawn` 添加一个额外参数来为您自己的任务定义自定义键绑定。如果您想将上述 `echo current file's path` 任务绑定到 `alt-g`，您将在您的 [`keymap.json`](./key-bindings.md) 文件中添加以下代码段：

```json [keymap]
{
  "context": "Workspace",
  "bindings": {
    "alt-g": ["task::Spawn", { "task_name": "echo current file's path" }]
  }
}
```

请注意，这些任务还可以指定一个 'target' 来控制在何处显示生成的任务。
这对于启动您想在中心区域使用的终端应用程序可能很有用：

```json [tasks]
// 在 tasks.json 中
{
  "label": "start lazygit",
  "command": "lazygit -p $ZED_WORKTREE_ROOT"
}
```

```json [keymap]
// 在 keymap.json 中
{
  "context": "Workspace",
  "bindings": {
    "alt-g": [
      "task::Spawn",
      { "task_name": "start lazygit", "reveal_target": "center" }
    ]
  }
}
```

## VS Code 任务格式

从 `.vscode/tasks.json` 导入 VS Code 任务时，您可以省略 `label` 字段。Zed 会根据任务类型自动生成标签：

- **npm 任务**: `npm: <script>` (例如 `npm: start`)
- **gulp 任务**: `gulp: <task>` (例如 `gulp: build`)
- **shell 任务**: 直接使用 `command` 字符串（例如 `echo hello`），如果命令为空则使用 `shell`
- **无类型任务**: `Untitled Task`

带有自动生成标签的示例任务文件：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "start"
    },
    {
      "type": "shell",
      "command": "cargo build --release"
    }
  ]
}
```

这些任务在任务选择器中显示为 "npm: start" 和 "cargo build --release"。您可以通过提供明确的 `label` 字段来覆盖生成的标签。

## 将可运行标签绑定到任务模板

Zed 支持通过工作区本地和全局的 `tasks.json` 文件覆盖内联可运行指标的默认操作，遵循以下优先级层次结构：

1. 工作区 `tasks.json`
2. 全局 `tasks.json`
3. 语言提供的标签绑定（默认）。

要为任务添加标签，请将可运行标签名称添加到任务模板的 `tags` 字段中：

```json [tasks]
{
  "label": "echo current file's path",
  "command": "echo $ZED_FILE",
  "tags": ["rust-test"]
}
```

这样，您可以更改在可运行指标中显示的任务。

## 运行绑定到可运行的任务的键绑定

当您有一个绑定到可运行的任务定义时，您可以使用[代码操作](https://zed.dev/docs/configuring-languages?#code-actions)快速运行它，您可以通过 `editor: Toggle Code Actions` 命令或 `cmd-.`/`ctrl-.` 快捷键来触发它。您的任务将是下拉列表中的第一个。如果此行没有其他代码操作，任务将立即运行。

## 运行 Bash 脚本

您可以直接从 Zed 运行 bash 脚本。当您打开 `.sh` 或 `.bash` 文件时，Zed 会自动检测该脚本为可运行，并在任务选择器中使其可用。

要运行 bash 脚本：

1. 使用 {#kb command_palette::Toggle} 打开命令面板
2. 搜索 "task" 并选择 **task: spawn**
3. 从列表中选择该脚本

Bash 脚本被标记为 `bash-script`，允许您在任务配置中进行过滤或引用。

如果您需要传递参数或自定义执行环境，请在您的 `.zed/tasks.json` 中添加一个任务配置：

```json
[
  {
    "label": "run my-script.sh with args",
    "command": "./my-script.sh",
    "args": ["--verbose", "--output=results.txt"],
    "tags": ["bash-script"]
  }
]
```

## Shell 初始化

当 Zed 运行任务时，它会在登录 shell 中启动命令。这确保了您的 shell 初始化文件（`.bash_profile`、`.zshrc` 等）在任务执行之前被加载。

这种行为使任务能够访问您在 shell 配置文件中配置的相同环境变量、别名和 PATH 修改。如果任务无法在终端中找到可用的命令，请验证您的 shell 配置文件是否已正确设置。

要覆盖用于任务的 shell，请配置 `terminal.shell` 设置：

```json
{
  "terminal": {
    "shell": {
      "program": "/bin/zsh"
    }
  }
}
```

有关完整的 shell 选项，请参阅[终端配置](./terminal.md)。