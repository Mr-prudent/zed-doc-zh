---
title: Key Bindings and Shortcuts - Zed
description: 自定义 Zed 的键盘快捷键。重新绑定操作，创建按键序列，并设置上下文特定的绑定。
---

# 键盘绑定

Zed 的键盘绑定系统是完全可自定义的。您可以重新绑定任何操作，创建按键序列，并定义上下文特定的绑定。

## 预定义键映射

如果您习惯于特定编辑器的默认设置，您可以通过设置窗口 ({#kb zed::OpenSettings}) 或直接通过您的 `settings.json` 文件 ({#kb zed::OpenSettingsFile}) 来更改您的 `base_keymap`。
我们目前支持：

- VS Code (默认)
- Atom
- Emacs (Beta)
- JetBrains
- Sublime Text
- TextMate
- Cursor
- None (禁用 _所有_ 键盘绑定)

此设置也可以通过命令面板中的 `zed: toggle base keymap selector` 操作来更改。

您还可以启用 `vim_mode` 或 `helix_mode`，它们会增加模态绑定。
有关更多信息，请参阅 [Vim 模式](./vim.md) 和 [Helix 模式](./helix.md) 的文档。

## 键映射编辑器

您可以通过 {#kb zed::OpenKeymap} 操作或在命令面板中运行 {#action zed::OpenKeymap} 操作来访问键映射编辑器。您可以通过命令面板左下角的 `Change Keybinding` 或 `Add Keybinding` 按钮轻松为操作添加或更改键绑定。

在那里，您可以看到 Zed 中所有现有的操作以及默认分配给它们的关联键绑定。

您也可以直接从那里自定义它们，方法是将鼠标悬停在特定操作上时出现的铅笔图标，双击操作行，或按 `enter` 键。

您在键映射编辑器中所做的任何操作也会反映在 `keymap.json` 文件中。

## 用户键映射

键映射文件存储在每个平台的以下位置：

- macOS/Linux: `~/.config/zed/keymap.json`
- Windows: `~\AppData\Roaming\Zed/keymap.json`

您可以从命令面板中使用 {#action zed::OpenKeymapFile} 操作来打开键映射文件。

该文件包含一个 JSON 对象数组，这些对象带有 `"bindings"`。
如果未设置 `"context"`，则绑定始终处于活动状态。
如果设置了 `"context"`，则只有当 [上下文匹配](#contexts) 时，绑定才处于活动状态。

在每个绑定部分中，一个 [按键序列](#keybinding-syntax) 被映射到 [一个操作](#actions)。
如果检测到冲突，将按照 [如下所述](#precedence) 解决冲突。

如果您使用的是非 QWERTY、拉丁字符键盘，您可能需要将 `use_key_equivalents` 设置为 `true`。有关更多信息，请参见 [非 QWERTY 键盘](#non-qwerty-keyboards)。

例如：

```json [keymap]
[
  {
    "bindings": {
      "ctrl-right": "editor::SelectLargerSyntaxNode",
      "ctrl-left": "editor::SelectSmallerSyntaxNode"
    }
  },
  {
    "context": "ProjectPanel && not_editing",
    "bindings": {
      "o": "project_panel::Open"
    }
  }
]
```

您可以在默认键映射文件中查看 Zed 为每个平台提供的默认绑定：

- [macOS](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-macos.json)
- [Windows](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-windows.json)
- [Linux](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-linux.json)。

如果您想调试自定义键映射的问题，可以从命令面板中使用 `dev: Open Key Context View`。
如果您遇到某些您认为应该可行但不起作用的情况，请提交 [一个问题](https://github.com/zed-industries/zed)。

### 键绑定语法

Zed 不仅可以匹配单个按键，还可以匹配按顺序输入的一组按键序列。`"bindings"` 映射中的每个键都是由空格分隔的按键序列。

每个按键都是修饰键后跟一个键的序列。修饰键包括：

- `ctrl-` Control 键
- `cmd-`、`win-` 或 `super-` 平台修饰键（macOS 上的 Command，Windows 上的 Windows 键，Linux 上的 Super 键）。
- `alt-` Alt 键（macOS 上的 Option）
- `shift-` Shift 键
- `fn-` Function 键
- `secondary-` 当 Zed 在 macOS 上运行时等效于 `cmd`，在 Windows 和 Linux 上等效于 `ctrl`

键可以是您的键盘生成的任何单个 Unicode 码点（例如 `a`、`0`、`£` 或 `ç`），也可以是任何命名键（`tab`、`f1`、`shift` 或 `cmd`）。如果您使用的是非拉丁布局（例如西里尔字母），您可以绑定到西里尔字母字符，也可以绑定到按下 `cmd` 时该键生成的拉丁字母字符。

一些示例：

```json [keymap]
{
  "bindings": {
    "cmd-k cmd-s": "zed::OpenKeymap", // 匹配 ⌘-k 然后 ⌘-s
    "space e": "editor::ShowCompletions", // 输入空格然后 e
    "ç": "editor::ShowCompletions", // 匹配 ⌥-c
    "shift shift": "file_finder::Toggle" // 匹配按下并释放 shift 两次
  }
}
```

`shift-` 修饰键只能与字母一起使用以表示大写版本。例如，`shift-g` 匹配输入 `G`。尽管在许多键盘上，shift 用于输入标点符号（如 `(`），但按键不被认为是被修饰的，因此 `shift-(` 不匹配。

`alt-` 修饰键可用于多种布局来生成不同的键。例如，在 macOS US 键盘上，组合键 `alt-c` 会输入 `ç`。您可以在键映射文件中匹配其中任意一种，但按照惯例，Zed 将此组合拼写为 `alt-c`。

可以匹配单独修饰键的按下。例如，`shift shift` 可用于实现 JetBrains 的 "Search Everywhere" 快捷键。在这种情况下，绑定发生在按键释放时，而不是按键按下时。

### 上下文

如果绑定组有一个 `"context"` 键，它将与 Zed 中当前活动的上下文进行匹配。

Zed 的上下文构成一个树，其根节点是 `Workspace`。工作区包含窗格（Panes）和面板（Panels），窗格包含编辑器（Editors），等等。在给定时刻查看哪些上下文处于活动的最简单方法是使用键上下文视图，您可以通过命令面板中的 `dev: open key context view` 命令来访问它。

例如：

```
# 在编辑器中，它可能看起来像这样：
Workspace os=macos keyboard_layout=com.apple.keylayout.QWERTY
  Pane
    Editor mode=full extension=md vim_mode=insert

# 在项目面板中
Workspace os=macos
  Dock
    ProjectPanel not_editing
```

上下文表达式可以包含以下语法：

- `X && Y`、`X || Y` 对两个条件进行与/或运算
- `!X` 检查某个条件是否为假
- `(X)` 用于分组
- `X > Y` 如果树中的祖先节点匹配 X 且此层匹配 Y，则进行匹配。

例如：

- `"context": "Editor"` - 匹配任何编辑器（包括行内输入）
- `"context": "Editor && mode == full"` - 匹配用于编辑代码的主编辑器
- `"context": "!Editor && !Terminal"` - 匹配任何非编辑器或终端获得焦点的位置
- `"context": "os == macos > Editor"` - 匹配 macOS 上的任何编辑器。

值得注意的是，属性仅在定义它们的节点上可用。这意味着如果您想（例如）仅在调试器在 vim normal 模式下停止时启用键绑定，您需要执行 `debugger_stopped > vim_mode == normal`。

> 注意：在 Zed v0.197.x 之前，`!` 运算符一次只查看一个节点，并且 `>` 表示 "父节点" 而不是 "祖先节点"。这意味着 `!Editor` 会匹配上下文 `Workspace > Pane > Editor`，因为（令人困惑的是）Pane 匹配 `!Editor`，并且 `os == macos > Editor` 不匹配上下文 `Workspace > Pane > Editor`，因为存在中间的 `Pane` 节点。

如果您使用的是 Vim 模式，我们有关 [vim 模式如何影响上下文](./vim.md#contexts) 的信息。Helix 模式构建在 Vim 模式之上，并使用相同的上下文。

### 操作

几乎所有 Zed 的功能都作为操作暴露。
虽然没有明确记录的列表，但您可以通过在命令面板中搜索，查看 [macOS](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-macos.json)、[Windows](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-windows.json) 或 [Linux](https://github.com/zed-industries/zed/blob/main/assets/keymaps/default-linux.json) 的默认键映射，或在您的键映射文件中使用 Zed 的自动补全来找到其中大多数操作。

大多数操作不需要任何参数，因此您可以将它们绑定为字符串：`"ctrl-a": "language_selector::Toggle"`。一些需要一个参数，并且必须绑定为数组：`"cmd-1": ["workspace::ActivatePane", 0]`。一些操作需要多个参数，并绑定为字符串和对象的数组：`"ctrl-a": ["pane::DeploySearch", { "replace_enabled": true }]`。

### 优先级

当多个键盘绑定具有相同的击键并且在同一时间处于活动状态时，优先级通过以下两种方式解决：

- 在上下文树中较低节点上匹配的绑定会生效。这意味着，如果您有一个上下文为 `Editor` 的绑定，它将优先于上下文为 `Workspace` 的绑定。没有上下文匹配的绑定在树中优先级最低。
- 如果在树的同一级别有多个匹配的绑定，则后定义的绑定优先。由于用户键映射是在系统键映射之后加载的，这允许用户绑定优先于内置键绑定。

另一种出现的冲突是当您有两个绑定，其中一个绑定的键序列是另一个绑定的前缀时。例如，如果您有 `"ctrl-w":"editor::DeleteToNextWordEnd"` 和 `"ctrl-w left":"editor::DeleteToEndOfLine"`。

当这种情况发生，并且两个绑定在当前上下文中都处于活动状态时，Zed 会在您输入 `ctrl-w` 后等待 1 秒，看看您是否即将输入 `left`。如果您没有输入任何内容，或者输入了其他键，则会触发 `DeleteToNextWordEnd`。如果您输入了，则会触发 `DeleteToEndOfLine`。

### 非 QWERTY 键盘

Zed 对非 QWERTY 键盘的支持仍在进行中。

如果您的键盘可以输入完整的 ASCII 范围（如 DVORAK、COLEMAK 等），那么快捷键应该能按您预期工作。

否则，请继续阅读...

#### macOS

对于西里尔语、希伯来语、亚美尼亚语等主要非 ASCII 的键盘，当按住 `cmd` 时，macOS 会自动将键映射到 ASCII 范围。Zed 在此基础上更进一步，无论修饰键和 `use_key_equivalents` 设置如何，它都可以始终将按键与 ASCII 布局或真实布局进行匹配。例如，在泰语键盘中，按下 `ctrl-ๆ` 将匹配与 `ctrl-q` 或 `ctrl-ๆ` 关联的绑定。

对于支持扩展拉丁字母表的键盘（法语 AZERTY、德语 QWERTZ 等），通常无法在不使用 `option` 的情况下输入完整的 ASCII 范围。这引入了一个歧义：`option-2` 生成 `@`。为了确保所有内置键盘快捷键仍可以在这些键盘上输入，我们重新映射了键绑定。例如，在 QWERTY 上绑定到 `@` 的快捷键在西班牙语布局上会移动到 `"`。此映射基于 macOS 系统默认设置，可以通过从命令面板运行 `dev: open key context view` 来查看。

如果您在个人键映射中定义快捷键，可以通过在键映射中将 `use_key_equivalents` 设置为 `true` 来选择键等效映射：

```json [keymap]
[
  {
    "use_key_equivalents": true,
    "bindings": {
      "ctrl->": "editor::Indent" // 当德语 QWERTZ 键盘处于活动状态时，解析为 ctrl-:
    }
  }
]
```

### Linux

自 v0.196.0 起，在 Linux 上，如果您输入的键不生成 ASCII 字符，那么我们会使用 QWERTY 布局的等效键作为键盘快捷键。这意味着许多快捷键可以在许多布局上输入。

我们尚未重新映射快捷键，以便每个内置快捷键在每个布局上都可以输入。如果您的布局无法输入某些 ASCII 字符，您可能需要自定义键绑定。我们计划改进这一点。

## 技巧和提示

### 禁用绑定

如果您希望某个绑定在给定上下文中不执行任何操作，可以使用 `null` 作为操作。如果您意外触发了该键绑定并希望禁用它，或者您想输入该序列会输入的字符，或者您想禁用以该键开头的多键绑定，这会很有用。

```json [keymap]
[
  {
    "context": "Workspace",
    "bindings": {
      "cmd-r": null // 当 Workspace 上下文处于活动状态时，cmd-r 将不执行任何操作
    }
  }
]
```
`null` 绑定遵循与正常操作相同的优先级规则，因此它会禁用树中更高匹配度的所有绑定。如果您希望树中更高匹配度的绑定优先于较低的绑定，您需要在所需的上下文中将其重新绑定为您想要的操作。

这对于防止 Zed 在您指定的操作是条件性的并且会传播时回退到默认键绑定很有用。例如，`buffer_search::DeployReplace` 仅在搜索栏不在视图中时触发。如果搜索栏在视图中，它将会传播并触发为该键绑定设置的默认操作，例如打开右侧停靠栏。为了防止这种情况发生：

```json [keymap]
[
  {
    "context": "Workspace",
    "bindings": {
      "cmd-r": null // 当搜索栏在视图中时，cmd-r 将不执行任何操作
    }
  },
  {
    "context": "Workspace",
    "bindings": {
      "cmd-r": "buffer_search::DeployReplace" // 当搜索栏不在视图中时，cmd-r 将部署替换功能
    }
  }
]
```

### 重新映射键

一个常见的要求是能够将单个按键映射到一个序列。您可以使用 `workspace::SendKeystrokes` 操作来实现。

```json [keymap]
[
  {
    "bindings": {
      // 向下移动四次
      "alt-down": ["workspace::SendKeystrokes", "down down down down"],
      // 扩展选择 (editor::SelectLargerSyntaxNode);
      // 复制到剪贴板；然后撤销选择扩展。
      "cmd-alt-c": [
        "workspace::SendKeystrokes",
        "ctrl-shift-right ctrl-shift-right ctrl-shift-right cmd-c ctrl-shift-left ctrl-shift-left ctrl-shift-left"
      ]
    }
  },
  {
    "context": "Editor && vim_mode == insert",
    "bindings": {
      "j k": ["workspace::SendKeystrokes", "escape"]
    }
  }
]
```

对此有一些限制，特别是：

- 任何异步操作都不会在您的所有键绑定分派完成后发生。例如，这意味着虽然您可以使用绑定来打开文件（如在 `cmd-alt-r` 示例中），但您无法发送更多按键并希望它们被新视图解释。
- 其他异步操作的例子有：打开命令面板、与语言服务器通信、更改缓冲区的语言、任何涉及网络的操作。
- 一次最多模拟 100 个按键。

`SendKeystrokes` 的参数是一个由空格分隔的按键列表（使用与上述相同的语法）。由于按键的解析方式，任何未被识别为按键的部分都将被逐字发送到当前聚焦的输入字段。

如果 `SendKeystrokes` 的参数包含用于触发它的绑定，它将使用该绑定的下一个最高优先级定义。这使您可以扩展键绑定的默认行为。

### 将按键转发到终端

如果您在 Linux 或 Windows 上，您可能会发现希望将键组合转发到内置终端，而不是由 Zed 处理。

例如，在 Linux 上，`ctrl-n` 在 Zed 中创建一个新标签页。如果希望在终端获得焦点时将 `ctrl-n` 发送到内置终端，请将以下内容添加到您的键映射中：

```json [keymap]
{
  "context": "Terminal",
  "bindings": {
    "ctrl-n": ["terminal::SendKeystroke", "ctrl-n"]
  }
}
```

### 任务键绑定

您还可以将键绑定到在 `tasks.json` 中定义的 Zed 任务。
有关更多信息，请参阅 [任务文档](tasks.md#custom-keybindings-for-tasks)。