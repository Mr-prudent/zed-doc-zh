---
title: Vim 模式 - Zed
description: Zed 中的完整 Vim 模拟，包含 motions、text objects、visual mode、macros 和 Zed 特有的扩展功能。
---

# Vim 模式

Zed 包含一个 Vim 模拟层。本页介绍如何启用和禁用 vim 模式、键绑定、Zed 特有功能以及配置选项。

## Zed 的 vim 模式设计

在合理的情况下，Vim 模式会复制 motions 和命令的行为，并在 Zed 的方法更好时使用 Zed 特有的功能。其目标是一个开箱即用、无需配置即可运行的熟悉体验。

这包括对语义导航、多光标或其他通常由插件（如环绕文本）提供的功能的支持。

因此，Zed 的 vim 模式并非一对一地复制 Vim，而是将 Vim 的模式设计与 Zed 的现代功能相结合，以提供更流畅的体验。它也是可配置的，因此您可以添加自己的键绑定或覆盖默认设置。

### 核心差异

vim 模式中使用 Zed 核心功能有四种类型的功能，导致一些行为上的差异：

1. **Motions**：vim 模式使用 Zed 的语义分析来根据每种语言调整 motions 的行为。例如，在 Rust 中，使用 `%` 跳转到匹配的括号对时，可以与管道字符 `|` 一起使用。在 JavaScript 中，`w` 将 `$` 视为单词字符。
2. **Visual block selections**：vim 模式使用 Zed 的多光标来模拟可视块选择，这使得块选择更加灵活。例如，在任何块选择后插入的内容都会实时更新到每一行，并且您可以随时添加或删除光标。
3. **Macros**：vim 模式使用 Zed 的录制系统来实现 vim 宏。因此，您可以捕获和重放更复杂的操作，例如自动补全。
4. **Search and replace**：vim 模式使用 Zed 的搜索系统，因此，正则表达式的语法与 Vim 略有不同。有关详细信息，请[前往正则表达式差异部分](#regex-differences)。

> **注意**：Zed 的 vim 模式基础应已涵盖许多用例，我们一直在努力改进它。如果您发现工作流中依赖但缺失的功能，请[在 GitHub 上提交问题](https://github.com/zed-industries/zed/issues)。

## 启用和禁用 vim 模式

当您首次打开 Zed 时，欢迎屏幕上会出现一个复选框，允许您启用 vim 模式。

如果您错过了此选项，可以通过打开命令调色板并使用工作区命令 `toggle vim mode` 随时切换 vim 模式。

> **注意**：此命令会切换您用户设置中的以下属性：
>
> ```json [settings]
> {
>   "vim_mode": true
> }
> ```

## Zed 特有功能

Zed 建立在现代基础之上（除其他外），它使用 Tree-sitter 和语言服务器来理解您正在编辑的文件内容，并开箱即用地支持多光标。

Vim 模式有几个“核心 Zed”键绑定，可帮助您充分利用 Zed 的特定功能集。

### 语言服务器

以下命令使用语言服务器来帮助您导航和重构代码。

| Command (命令)                      | Default Shortcut (默认快捷键) |
| ---------------------------------------- | ---------------- |
| Go to definition (跳转到定义)                         | `g d`            |
| Go to declaration (跳转到声明)                        | `g D`            |
| Go to type definition (跳转到类型定义)                    | `g y`            |
| Go to implementation (跳转到实现)                     | `g I`            |
| Rename (change definition) (重命名/更改定义)               | `c d`            |
| Go to All references to the current word (跳转到当前单词的所有引用) | `g A`            |
| Find symbol in current file (在当前文件中查找符号)              | `g s`            |
| Find symbol in entire project (在整个项目中查找符号)            | `g S`            |
| Go to next diagnostic (跳转到下一个诊断)                    | `g ]` or `] d`   |
| Go to previous diagnostic (跳转到上一个诊断)                | `g [` or `[ d`   |
| Show inline error (hover) (显示内联错误/悬停)                | `g h`            |
| Open the code actions menu (打开代码操作菜单)               | `g .`            |

### Git

| Command (命令)                         | Default Shortcut (默认快捷键) |
| ------------------------------- | ---------------- |
| Go to next git change (跳转到下一个 Git 更改)           | `] c`            |
| Go to previous git change (跳转到上一个 Git 更改)       | `[ c`            |
| Expand diff hunk (展开差异块)                | `d o`            |
| Toggle staged (切换暂存状态)                   | `d O`            |
| Stage and next (in diff view) (暂存并跳转至下一个，在差异视图中)   | `d u`            |
| Unstage and next (in diff view) (取消暂存并跳转至下一个，在差异视图中) | `d U`            |
| Restore change (恢复更改)                  | `d p`            |

### Tree-sitter

Tree-sitter 是 Zed 用于理解代码结构的解析器。Zed 提供了可以更改当前光标位置的 motions，以及可以用作操作目标的 text objects。

| Command (命令)                         | Default Shortcut (默认快捷键)            |
| ------------------------------- | --------------------------- |
| Go to next/previous method (跳转到下一个/上一个方法)      | `] m` / `[ m`               |
| Go to next/previous method end (跳转到下一个/上一个方法结束)  | `] M` / `[ M`               |
| Go to next/previous section (跳转到下一个/上一个节)     | `] ]` / `[ [`               |
| Go to next/previous section end (跳转到下一个/上一个节结束) | `] [` / `[ ]`               |
| Go to next/previous comment (跳转到下一个/上一个注释)     | `] /`, `] *` / `[ /`, `[ *` |
| Select a larger syntax node (选择更大的语法节点)     | `[ x`                       |
| Select a smaller syntax node (选择更小的语法节点)    | `] x`                       |

| Text Objects (文本对象)                                               | Default Shortcut (默认快捷键) |
| ---------------------------------------------------------- | ---------------- |
| Around a class, definition, etc. (环绕一个类、定义等)                           | `a c`            |
| Inside a class, definition, etc. (在一个类、定义等内部)                           | `i c`            |
| Around a function, method etc. (环绕一个函数、方法等)                             | `a f`            |
| Inside a function, method, etc. (在一个函数、方法等内部)                            | `i f`            |
| A comment (一个注释)                                                  | `g c`            |
| An argument, or list item, etc. (一个参数或列表项等)                            | `i a`            |
| An argument, or list item, etc. (including trailing comma) (一个参数或列表项等，包括尾随逗号) | `a a`            |
| Around an HTML-like tag (环绕一个类 HTML 标签)                                    | `a t`            |
| Inside an HTML-like tag (在一个类 HTML 标签内部)                                    | `i t`            |
| The current indent level, and one line before and after (当前缩进级别，及其前一行和后一行)    | `a I`            |
| The current indent level, and one line before (当前缩进级别及其前一行)              | `a i`            |
| The current indent level (当前缩进级别)                                   | `i i`            |

请注意，`[m` 系列 motions 的目标定义与 `af` 定义的边界是相同的。`[[` 的目标与 `ac` 定义的相同，但如果
没有类，则也会使用函数。同样，`gc` 用于查找 `[ /`。`g c`

函数、类和注释的定义取决于语言，并且可以通过添加一个 [`textobjects.scm`] 来为扩展添加支持。
参数和标签的操作在 Tree-sitter 级别上进行，但会查找解析树中的某些模式，目前尚不支持按语言进行配置。

### Multi cursor (多光标)

这些命令帮助您在 Zed 中管理多个光标。

| Command (命令)                                                                           | Default Shortcut (默认快捷键) |
| --------------------------------------------------------------------------------- | ---------------- |
| Add a cursor selecting the next copy of the current word (添加一个光标，选中当前单词的下一个副本)                          | `g l`            |
| Add a cursor selecting the previous copy of the current word (添加一个光标，选中当前单词的上一个副本)                      | `g L`            |
| Add a cursor at the end of every line in the current visual selection (在当前可视选择中的每一行末尾添加一个光标)             | `g A`            |
| Add a cursor at the first character of every line in the current visual selection (在当前可视选择中的每一行首字符处添加一个光标) | `g I`            |
| Add a visual selection for every copy of the current word (为当前单词的每个副本添加一个可视选择)                         | `g a`            |
| Skip latest word selection, and add next (跳过最新的单词选择，并添加下一个)                                          | `g >`            |
| Skip latest word selection, and add previous (跳过最新的单词选择，并添加上一个)                                      | `g <`            |

### Pane management (窗格管理)

这些命令会打开新的窗格或跳转到特定的窗格。

| Command (命令)                                    | Default Shortcut (默认快捷键)   |
| ------------------------------------------ | ------------------ |
| Open a project-wide search (打开项目范围的搜索)                 | `g /`              |
| Open the current search excerpt (打开当前搜索结果)            | `g <space>`        |
| Open the current search excerpt in a split (在分割窗口中打开当前搜索结果) | `<ctrl-w> <space>` |
| Go to definition in a split (在分割窗口中跳转到定义)                | `<ctrl-w> g d`     |
| Go to type definition in a split (在分割窗口中跳转到类型定义)           | `<ctrl-w> g D`     |

### In insert mode (在插入模式下)

以下命令帮助您调出 Zed 的补全菜单、从 GitHub Copilot 请求建议，或在不退出插入模式的情况下打开内联 AI 助手。

| Command (命令)                                                                      | Default Shortcut (默认快捷键) |
| ---------------------------------------------------------------------------- | ---------------- |
| Open the completion menu (打开补全菜单)                                                     | `ctrl-x ctrl-o`  |
| Request GitHub Copilot suggestion (requires GitHub Copilot to be configured) (请求 GitHub Copilot 建议，需要配置 GitHub Copilot) | `ctrl-x ctrl-c`  |
| Open the inline AI assistant (requires a configured assistant) (打开内联 AI 助手，需要配置的助手)               | `ctrl-x ctrl-a`  |
| Open the code actions menu (打开代码操作菜单)                                                   | `ctrl-x ctrl-l`  |
| Hides all suggestions (隐藏所有建议)                                                        | `ctrl-x ctrl-z`  |

### Supported plugins (支持的插件)

Zed 的 vim 模式包含了 Vim 生态系统中插件通常提供的功能：

- 您可以使用 `ys`（yank surround）将文本对象包围起来，使用 `cs` 更改环绕，使用 `ds` 删除环绕。
- 您可以在可视模式下使用 `gc` 注释或取消选择注释，在普通模式下使用 `gcc` 注释或取消注释。
- 项目面板支持许多模仿 Vim 插件 `netrw` 的快捷键：使用 `hjkl` 导航，使用 `o` 打开文件，使用 `t` 在新标签页中打开文件等。
- 您可以向键映射中添加键绑定以导航 "camelCase" 名称。[向下滚动到可选键绑定](#optional-key-bindings)部分以了解如何操作。
- 您可以使用 `gR` 执行 [ReplaceWithRegister](https://github.com/vim-scripts/ReplaceWithRegister)。
- 您可以使用 `cx` 实现 [vim-exchange](https://github.com/tommcdo/vim-exchange) 功能。请注意，它在可视模式下没有默认绑定，但您可以将其添加到您的键映射中（请参阅[可选键绑定](#optional-key-bindings)部分）。
- 您可以使用 [-`, `]-`, `[+`, `]+`, `[=`, `]=` 等，通过 [indent wise](https://github.com/jeetsukumaran/vim-indentwise) 插件相对于光标导航到缩进深度。
- 您可以使用 AnyQuotes 和 AnyBrackets 文本对象来选择带引号的文本。Zed 还提供了 MiniQuotes 和 MiniBrackets，它们基于 [mini.ai](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-ai.md) Neovim 插件提供替代的选择行为。有关详细信息，请参阅下面的[引号和括号文本对象](#quote-and-bracket-text-objects)部分。
- 您可以配置 AnyQuotes、AnyBrackets、MiniQuotes 和 MiniBrackets 文本对象，以便使用不同的选择策略选择带引号和括号的文本。有关详细信息，请参阅下面的[任意括号功能](#any-bracket-functionality)部分。

### Any Bracket Functionality (任意括号功能)

Zed 为选择被任意引号或任意括号包围的文本提供了两种不同的策略。这些文本对象**默认不启用**，必须在您的键映射中进行配置才能使用。

#### Included Characters (包含的字符)

每种文本对象类型都与特定的字符一起工作：

| Text Object (文本对象)              | Characters (字符)                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------- |
| AnyQuotes/MiniQuotes     | 单引号 (`'`), 双引号 (`"`), 反引号 (`` ` ``)                             |
| AnyBrackets/MiniBrackets | 圆括号 (`()`), 方括号 (`[]`), 花括号 (`{}`), 尖括号 (`<>`) |

“Any”和“Mini”变体都使用相同的字符集，但选择策略不同。

#### AnyQuotes and AnyBrackets (传统 Vim 行为)

这些文本对象实现了传统的 Vim 行为：

- **Selection priority (选择优先级)**：首先找到最内层（最近）的引号或括号
- **Fallback mechanism (回退机制)**：如果未找到任何引号或括号，则回退到当前行
- **Character-based matching (基于字符的匹配)**：仅专注于开闭字符，不考虑语法
- **Vanilla Vim similarity (与原生 Vim 的相似性)**：AnyBrackets 的行为与原生 Vim 中的 `ci<`、`ci(` 等命令一致，包括潜在的边缘情况（例如，将 `=>` 中的 `>` 视为闭合分隔符）

#### MiniQuotes and MiniBrackets (mini.ai 行为)

这些文本对象实现了 [mini.ai](https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-ai.md) Neovim 插件的行为：

- **Selection priority (选择优先级)**：首先在当前行搜索，然后向外扩展
- **Tree-sitter integration (Tree-sitter 集成)**：使用 Tree-sitter 查询以获得更具上下文感知能力的选择
- **Syntax-aware matching (语法感知匹配)**：可以区分实际括号和其他上下文中的相似字符（例如 `=>` 中的 `>`）

#### Choosing Between Approaches (选择方法)

- 如果您：
  - 偏好传统的 Vim 行为
  - 希望一致的基于字符的选择，优先选择最内层的分隔符
  - 需要的行为与原生 Vim 的文本对象紧密匹配
  - 使用 **AnyQuotes/AnyBrackets**

- 如果您：
  - 偏好 mini.ai 插件的行为
  - 希望使用 Tree-sitter 进行更具上下文感知能力的选择
  - 在搜索时优先选择当前行
  - 使用 **MiniQuotes/MiniBrackets**

#### Example Configuration (示例配置)

要使用这些文本对象，您需要将绑定添加到您的键映射中。这是一个示例配置，它在使用文本对象操作符（`i` 和 `a`）或更改环绕（`cs`）时使它们可用：

```json [keymap]
{
  "context": "vim_operator == a || vim_operator == i || vim_operator == cs",
  "bindings": {
    // Traditional Vim behavior (传统 Vim 行为)
    "q": "vim::AnyQuotes",
    "b": "vim::AnyBrackets",

    // mini.ai plugin behavior (mini.ai 插件行为)
    "Q": "vim::MiniQuotes",
    "B": "vim::MiniBrackets"
  }
}
```

使用此配置，您可以使用如下命令：
- `cib` - 使用 AnyBrackets 行为更改括号内部内容
- `ciB` - 使用 MiniBrackets 行为更改括号内部内容
- `ciq` - 使用 AnyQuotes 行为更改引号内部内容
- `ciQ` - 使用 MiniQuotes 行为更改引号内部内容

## Command palette (命令调色板)

Vim 模式允许您使用 `:` 打开 Zed 的命令调色板。然后您可以输入来访问任何常用的 Zed 命令。此外，vim 模式为流行的 Vim 命令添加了别名，以确保您的肌肉记忆能够顺利转移到 Zed。例如，您可以编写 `:w` 或 `:write` 来保存文件。

在下表中，您将找到可以在命令调色板中使用的命令。我们将可选字符放在方括号中，表示您可以省略它们。

> **注意**：我们尚未模拟 Vim 命令行的全部功能。特别是，当前命令不支持参数。如果您发现命令调色板中缺少某些功能，请在 GitHub 上[提交问题](https://github.com/zed-industries/zed)。

### File and window management (文件和窗口管理)

此表显示了用于管理窗口、标签页和窗格的命令。由于命令目前不支持参数，因此您在保存或创建新文件时无法指定文件名。

| Command (命令)         | Description (描述)                                          |
| --------------- | ---------------------------------------------------- |
| `:w[rite][!]`   | Save the current file (保存当前文件)                                |
| `:wq[!]`        | Save the file and close the buffer (保存文件并关闭缓冲区)                   |
| `:q[uit][!]`    | Close the buffer (关闭缓冲区)                                     |
| `:wa[ll][!]`    | Save all open files (保存所有打开的文件)                                  |
| `:wqa[ll][!]`   | Save all open files and close all buffers (保存所有打开的文件并关闭所有缓冲区)            |
| `:qa[ll][!]`    | Close all buffers (关闭所有缓冲区)                                    |
| `:[e]x[it][!]`  | Close the buffer (关闭缓冲区)                                     |
| `:up[date]`     | Save the current file (保存当前文件)                                |
| `:cq`           | Quit completely (close all running instances of Zed) (完全退出（关闭所有正在运行的 Zed 实例）) |
| `:bd[elete][!]` | Close the active file in all panes (在所有窗格中关闭活动文件)                   |
| `:vs[plit]`     | Split the pane vertically (垂直分割窗格)                            |
| `:sp[lit]`      | Split the pane horizontally (水平分割窗格)                          |
| `:new`          | Create a new file in a horizontal split (在水平分割中创建新文件)              |
| `:vne[w]`       | Create a new file in a vertical split (在垂直分割中创建新文件)                |
| `:tabedit`      | Create a new file in a new tab (在新标签页中创建新文件)                       |
| `:tabnew`       | Create a new file in a new tab (在新标签页中创建新文件)                       |
| `:tabn[ext]`    | Go to the next tab (跳转到下一个标签页)                                   |
| `:tabp[rev]`    | Go to previous tab (跳转到上一个标签页)                                   |
| `:tabc[lose]`   | Close the current tab (关闭当前标签页)                                |
| `:ls`           | Show all buffers (显示所有缓冲区)                                     |

> **注意**：`!` 字符用于强制执行命令，而不保存更改或在覆盖文件之前提示。

### Ex commands (Ex 命令)

这些 Ex 命令打开 Zed 的各种面板和窗口。

| Command (命令)                      | Default Shortcut (默认快捷键) |
| ---------------------------- | ---------------- |
| Open the project panel (打开项目面板)       | `:E[xplore]`     |
| Open the collaboration panel (打开协作面板) | `:C[ollab]`      |
| Open the chat panel (打开聊天面板)          | `:Ch[at]`        |
| Open the AI panel (打开 AI 面板)            | `:A[I]`          |
| Open the git panel (打开 Git 面板)           | `:G[it]`         |
| Open the debug panel (打开调试面板)         | `:D[ebug]`       |
| Open the notifications panel (打开通知面板) | `:No[tif]`       |
| Open the feedback window (打开反馈窗口)     | `:fe[edback]`    |
| Open the diagnostics window (打开诊断窗口)  | `:cl[ist]`       |
| Open the terminal (打开终端)            | `:te[rm]`        |
| Open the extensions window (打开扩展窗口)   | `:Ext[ensions]`  |

### Navigating diagnostics (导航诊断)

这些命令用于导航诊断信息。

| Command (命令)                  | Description (描述)                    |
| ------------------------ | ------------------------------ |
| `:cn[ext]` or `:ln[ext]` | Go to the next diagnostic (跳转到下一个诊断)      |
| `:cp[rev]` or `:lp[rev]` | Go to the previous diagnostics (跳转到上一个诊断) |
| `:cc` or `:ll`           | Open the errors page (打开错误页面)           |

### Git

这些命令与版本控制系统 git 交互。

| Command (命令)         | Description (描述)                                             |
| --------------- | ------------------------------------------------------- |
| `:dif[fupdate]` | View the diff under the cursor (`d o` in normal mode) (查看光标下方的差异，在普通模式下为 `d o`)   |
| `:rev[ert]`     | Revert the diff under the cursor (`d p` in normal mode) (恢复光标下方的差异，在普通模式下为 `d p`) |

### Jump

这些命令跳转到文件中的特定位置。

| Command (命令)             | Description (描述)                         |
| ------------------- | ----------------------------------- |
| `:<number>`         | Jump to a line number (跳转到指定行号)               |
| `$`                | Jump to the end of the file (跳转到文件末尾)         |
| `:/foo` and `:?foo` | Jump to next/prev line matching foo (跳转到下一个/上一个匹配 foo 的行) |

### Replacement (替换)

此命令替换文本。它模拟了 vim 中的 substitute 命令。substitute 命令使用正则表达式，而 Zed 使用与 vim 略有不同的语法。您可以在下面的[正则表达式差异部分](#regex-differences)中了解更多关于 Zed 语法的知识。Zed 将仅替换当前行中搜索模式的第一处匹配。要替换所有匹配，请附加 `g` 标志。

| Command (命令)                 | Description (描述)                       |
| ----------------------- | --------------------------------- |
| `:[range]s/foo/bar/[g]` | Replace instances of foo with bar (将 foo 替换为 bar) |

### Editing

这些命令帮助您编辑文本。

| Command (命令)           | Description (描述)                                             |
| ----------------- | ------------------------------------------------------- |
| `:j[oin]`         | Join the current line (连接当前行)                                   |
| `:d[elete][l][p]` | Delete the current line (删除当前行)                                 |
| `:s[ort] [i]`     | Sort the current selection (with i, case-insensitively) (对当前选择进行排序，使用 i 时为不区分大小写) |
| `:y[ank]`         | Yank (copy) the current selection or line (复制当前选择或行)               |

### Set

这些命令用于在当前缓冲区内本地修改编辑器选项。

| Command (命令)                         | Description (描述)                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `:se[t] [no]wrap`               | Lines longer than the width of the window will wrap and displaying continues on the next line (比窗口宽度更长的行将自动换行，并在下一行继续显示) |
| `:se[t] [no]nu[mber]`           | Print the line number in front of each line (在每行前显示行号)                                                   |
| `:se[t] [no]r[elative]nu[mber]` | Changes the displayed number to be relative to the cursor (更改显示的数字，使其相对于光标)                                     |
| `:se[t] [no]i[gnore]c[ase]`     | Controls whether the buffer and project search use case-sensitive matching (控制缓冲区和项目搜索是否使用区分大小写的匹配)                    |

### Command mnemonics (命令助记符)

由于任何 Zed 命令都可用，您可能会发现记住可以运行正确命令的助记符很有帮助。例如：

- `:diffs` 用于 "toggle all hunk diffs"（切换所有差异块）
- `:cpp` 用于 "copy path to file"（复制文件路径）
- `:crp` 用于 "copy relative path"（复制相对路径）
- `:reveal` 用于 "reveal in finder"（在访达中显示）
- `:zlog` 用于 "open zed log"（打开 zed 日志）
- `:clank` 用于 "cancel language server work"（取消语言服务器工作）

## Customizing key bindings (自定义键绑定)

### Selecting the correct context (选择正确的上下文)

Zed 的键绑定仅在 `"context"` 属性与您在编辑器中的位置匹配时才会被评估。例如，如果您将键绑定添加到 `"Editor"` 上下文，它们只会在您编辑文件时生效。如果您将键绑定添加到 `"Workspace"` 上下文，它们将在 Zed 的所有地方生效。这是一个在您编辑文件时保存的键绑定示例：

```json [keymap]
{
  "context": "Editor",
  "bindings": {
    "ctrl-s": "workspace::Save"
  }
}
```

上下文是嵌套的，因此当您编辑文件时，上下文是位于 `"Pane"` 上下文内部的 `"Editor"` 上下文，而 `"Pane"` 上下文又位于 `"Workspace"` 上下文内部。这就是为什么您添加到 `"Workspace"` 上下文中的任何键绑定在您编辑文件时都会生效。这是一个示例：

```json [keymap]
// This key binding will work when you're editing a file. It comes built into Zed by default as the workspace: save command.
// 这个键绑定在您编辑文件时生效。它作为工作区：保存命令默认内置于 Zed 中。
{
  "context": "Workspace",
  "bindings": {
    "ctrl-s": "workspace::Save"
  }
}
```

上下文是表达式。它们支持布尔运算符，如 `&&`（与）和 `||`（或）。例如，您可以使用上下文 `"Editor && vim_mode == normal"` 来创建仅在您编辑文件且处于 vim 普通模式下才生效的键绑定。

Vim 模式在 `"Editor"` 上下文中添加了几个上下文：

| Operator (运算符)             | Description (描述)                                                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VimControl           | 指示应启用 vim 键绑定。目前是 `vim_mode == normal \|\| vim_mode == visual \|\| vim_mode == operator` 的别名，但定义可能会随时间改变 |
| vim_mode == normal   | 普通模式                                                                                                                                                                        |
| vim_mode == visual   | 可视模式                                                                                                                                                                        |
| vim_mode == insert   | 插入模式                                                                                                                                                                        |
| vim_mode == replace  | 替换模式                                                                                                                                                                       |
| vim_mode == waiting  | 等待任意按键（例如，在输入 `f` 或 `t` 后）                                                                                                                       |
| vim_mode == operator | 等待另一个绑定来触发（例如，在输入 `c` 或 `d` 后）                                                                                                             |
| vim_operator         | 除非 `vim_mode == operator`，否则设置为 `none`；在这种情况下，它被设置为当前操作符的默认键绑定（例如，在输入 `d` 后，`vim_operator == d`）                    |

> **注意**：上下文一次只在一个级别上匹配。因此，可以使用表达式 `"Editor && vim_mode == normal"`，但 `"Workspace && vim_mode == normal"` 将永远不会匹配，因为我们在 `"Editor"` 级别设置了 vim 上下文。

### Useful contexts for vim mode key bindings (Vim 模式键绑定的有用上下文)

这是一个包含有用的 vim 模式上下文的模板，可帮助您自定义 vim 模式键绑定。您可以复制它并将其集成到您的用户键映射中。

```json [keymap]
[
  {
    "context": "VimControl && !menu",
    "bindings": {
      // Put key bindings here if you want them to work in normal & visual mode.
      // 在此处放置键绑定，如果您希望它们在普通模式和可视模式下工作。
    }
  },
  {
    "context": "vim_mode == normal && !menu",
    "bindings": {
      // "shift-y": ["workspace::SendKeystrokes", "y $"] // Use neovim's yank behavior: yank to end of line.
      // "shift-y": ["workspace::SendKeystrokes", "y $"] // 使用 neovim 的 yank 行为：yank 到行尾。
    }
  },
  {
    "context": "vim_mode == insert",
    "bindings": {
      // "j k": "vim::NormalBefore" // In insert mode, make jk escape to normal mode.
      // "j k": "vim::NormalBefore" // 在插入模式下，使 jk 退出到普通模式。
    }
  },
  {
    "context": "EmptyPane || SharedScreen",
    "bindings": {
      // Put key bindings here (in addition to the context above) if you want them to
      // work when no editor exists.
      // 在此处放置键绑定（除了上面的上下文），如果您希望它们在没有编辑器存在时也能工作。
      // "space f": "file_finder::Toggle"
    }
  }
]
```

> **注意**：如果您想模拟 Vim 的 `map` 命令（`nmap` 等），您可以在正确的上下文中使用 `workspace::SendKeystrokes` 操作。

### Optional key bindings (可选键绑定)

默认情况下，您可以使用类似 `ctrl+w` 后跟 `hjkl` 中的某个键的快捷键在编辑器中在不同打开的文件之间导航，分别向左、下、上或右移动。

但是，您不能使用相同的快捷键在所有编辑器停靠面板（终端、项目面板、助手面板等）之间移动。如果您想使用相同的快捷键导航到停靠面板，可以将以下键绑定添加到您的用户键映射中。

```json [keymap]
{
  "context": "Dock",
  "bindings": {
    "ctrl-w h": "workspace::ActivatePaneLeft",
    "ctrl-w l": "workspace::ActivatePaneRight",
    "ctrl-w k": "workspace::ActivatePaneUp",
    "ctrl-w j": "workspace::ActivatePaneDown"
    // ... or other keybindings
    // ... 或其他键绑定
  }
}
```

Subword motion（子词移动，允许您在 `camelCase` 或 `snake_case` 中导航和选择单个单词）默认未启用。要启用它，请将这些绑定添加到您的键映射中。

```json [keymap]
{
  "context": "VimControl && !menu && vim_mode != operator",
  "bindings": {
    "w": "vim::NextSubwordStart",
    "b": "vim::PreviousSubwordStart",
    "e": "vim::NextSubwordEnd",
    "g e": "vim::PreviousSubwordEnd"
  }
}
```

> 注意：像 `dw` 这样的操作不受影响。如果您希望操作
> 也使用子词移动，请从 `context` 中删除 `vim_mode != operator`。

Vim 模式带有在普通模式下环绕选择的快捷键（`ys`），但在可视模式下没有添加环绕的快捷键。默认情况下，`shift-s` 会替换选择（擦除文本并进入插入模式）。要在可视模式下使用 `shift-s` 来添加环绕，可以将以下对象添加到您的键映射中。

```json [keymap]
{
  "context": "vim_mode == visual",
  "bindings": {
    "shift-s": "vim::PushAddSurrounds"
  }
}
```

在非模式化文本编辑器中，当光标移过行尾时，光标导航通常会回绕。然而，Zed 默认处理此行为的方式与 Vim 完全相同：光标停在行边界。如果您希望光标在行之间回绕，请覆盖这些键绑定：

```json [keymap]
// In VimScript, this would look like this:
// set whichwrap+=<,>,[,],h,l
// 在 VimScript 中，它看起来像这样：
// set whichwrap+=<,>,[,],h,l
{
  "context": "VimControl && !menu",
  "bindings": {
    "left": "vim::WrappingLeft",
    "right": "vim::WrappingRight",
    "h": "vim::WrappingLeft",
    "l": "vim::WrappingRight"
  }
}
```

[Sneak motion](https://github.com/justinmk/vim-sneak) 功能允许您快速导航到文本中的任意两个字符序列。您可以通过将以下键绑定添加到您的键映射中来启用它。默认情况下，`s` 键映射到 `vim::Substitute`。添加这些绑定将覆盖该行为，因此请确保此更改符合您的工作流偏好。

```json [keymap]
{
  "context": "vim_mode == normal || vim_mode == visual",
  "bindings": {
    "s": "vim::PushSneak",
    "shift-s": "vim::PushSneakBackward"
  }
}
```

[vim-exchange](https://github.com/tommcdo/vim-exchange) 功能在可视模式下没有默认绑定，因为 `shift-x` 绑定与可视模式的默认 `shift-x` 绑定（`vim::VisualDeleteLine`）冲突。要分配默认的 vim-exchange 绑定，请将以下键绑定添加到您的键映射中：

```json [keymap]
{
  "context": "vim_mode == visual",
  "bindings": {
    "shift-x": "vim::Exchange"
  }
}
```

### Restoring common text editing and Zed keybindings (恢复常用的文本编辑和 Zed 键绑定)

如果您在 Linux 或 Windows 上使用 vim 模式，您可能会发现它覆盖了您无法舍弃的键绑定：`ctrl+v` 用于粘贴，`ctrl+f` 用于搜索等。您可以通过将以下数据复制到您的键映射中来恢复它们：

```json [keymap]
{
  "context": "Editor && !menu",
  "bindings": {
    "ctrl-f": "buffer_search::Deploy",      // vim default: page down
    "ctrl-c": "editor::Copy",               // vim default: return to normal mode
    "ctrl-x": "editor::Cut",                // vim default: decrement
    "ctrl-v": "editor::Paste",              // vim default: visual block mode
    "ctrl-a": "editor::SelectAll",          // vim default: increment
    "ctrl-y": "editor::Undo",               // vim default: line up
    "ctrl-t": "project_symbols::Toggle",    // vim default: go to older tag
    "ctrl-o": "workspace::Open",            // vim default: go back
    "ctrl-s": "workspace::Save",            // vim default: show signature
    "ctrl-b": "workspace::ToggleLeftDock"   // vim default: down
  },
}
```

## Changing vim mode settings (更改 vim 模式设置)

您可以更改以下设置来修改 vim 模式的行为：

| Property (属性)                     | Description (描述)                                                                                                                                                                                   | Default Value (默认值) |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| default_mode                 | The default mode to start in. One of "normal", "insert", "replace", "visual", "visual_line", "visual_block", "helix_normal". (启动时的默认模式。可选值之一："normal", "insert", "replace", "visual", "visual_line", "visual_block", "helix_normal"。)                                                                  | "normal"      |
| use_system_clipboard         | Determines how system clipboard is used:<br><ul><li>"always": use for all operations</li><li>"never": only use when explicitly specified</li><li>"on_yank": use for yank operations</li></ul> (确定如何使用系统剪贴板：<br><ul><li>"always"：所有操作都使用</li><li>"never"：仅在明确指定时使用</li><li>"on_yank"：仅用于 yank 操作</li></ul>) | "always"      |
| use_multiline_find           | deprecated (已弃用)                                                                                                                                                                                    |
| use_smartcase_find           | If `true`, `f` and `t` motions are case-insensitive when the target letter is lowercase. (如果为 `true`，当目标字母为小写时，`f` 和 `t` motions 不区分大小写。)                                                                                                      | false         |
| gdefault                     | If `true`, the `:substitute` command replaces all matches in a line by default (as if `g` flag was given). The `g` flag then toggles this, replacing only the first match. (如果为 `true`，`:substitute` 命令默认替换一行中的所有匹配（就好像给出了 `g` 标志）。然后 `g` 标志会切换此行为，仅替换第一个匹配项。)。)                    | false         |
| toggle_relative_line_numbers | If `true`, line numbers are relative in normal mode and absolute in insert mode, giving you the best of both options. (如果为 `true`，行号在普通模式下为相对值，在插入模式下为绝对值，为您提供两者的最佳选择。)。)                                                                         | false         |
| custom_digraphs              | An object that allows you to add custom digraphs. Read below for an example. (一个允许您添加自定义二合字符的对象。请阅读下文示例。)。                                                                                                                  | {}            |
| highlight_on_yank_duration   | The duration of the highlight animation(in ms). Set to `0` to disable (高亮显示动画的持续时间（毫秒）。设置为 `0` 以禁用）。                                                                                                                         | 200           |

以下是一个为僵尸表情符号添加二合字符的示例。这允许您输入 `ctrl-k f z` 来插入一个僵尸表情符号。您可以添加任意数量的二合字符。

```json [settings]
{
  "vim": {
    "custom_digraphs": {
      "fz": "🧟‍♀️"
    }
  }
}
```

以下是更改后的这些设置的示例：

```json [settings]
{
  "vim": {
    "default_mode": "insert",
    "use_system_clipboard": "never",
    "use_smartcase_find": true,
    "gdefault": true,
    "toggle_relative_line_numbers": true,
    "highlight_on_yank_duration": 50,
    "custom_digraphs": {
      "fz": "🧟‍♀️"
    }
  }
}
```

## Useful core Zed settings for vim mode (对 Vim 模式有用的核心 Zed 设置)

这里有一些可以帮您微调 Vim 体验的通用 Zed 设置：

| Property (属性)                | Description (描述)                                                                                                                                                   | Default Value (默认值)        |
| ----------------------- | --------------------------------------------------------------------------------------------- | -------------------- |
| cursor_blink            | If `true`, the cursor blinks. (如果为 `true`，光标会闪烁。)。                                                                                                       | `true`               |
| relative_line_numbers   | If `"enabled"`, line numbers in the left gutter are relative to the cursor. If `"wrapped"`, they also display for wrapped lines. (如果为 `"enabled"`，左侧边栏中的行号相对于光标。如果为 `"wrapped"`，它们也会为换行行显示。)。                          | `"disabled"`         |
| scrollbar               | Object that controls the scrollbar display. Set to `{ "show": "never" }` to hide the scroll bar. (控制滚动条显示的对象。设置为 `{ "show": "never" }` 可隐藏滚动条。)。                                                                              | `{ "show": "auto" }` |
| scroll_beyond_last_line | If set to `"one_page"`, allows scrolling up to one page beyond the last line. Set to `"off"` to prevent this behavior. (如果设置为 `"one_page"`，允许滚动到最后一行之外的一页。设置为 `"off"` 可防止此行为。)。                                        | `"one_page"`         |
| vertical_scroll_margin  | The number of lines to keep above or below the cursor when scrolling. Set to `0` to allow the cursor to go up to the edges of the screen vertically. (滚动时在光标上方或下方保留的行数。设置为 `0` 可允许光标垂直移动到屏幕边缘。)。          | `3`                  |
| gutter.line_numbers     | Controls the display of line numbers in the gutter. Set the `"line_numbers"` property to `false` to hide line numbers. (控制边栏中行号的显示。将 `"line_numbers"` 属性设置为 `false` 可隐藏行号。)。                                        | `true`               |
| command_aliases         | Object that defines aliases for commands in the command palette. You can use it to define shortcut names for commands you use often. Read below for examples. (一个为命令调色板中的命令定义别名的对象。您可以用它为您常用的命令定义快捷名称。请阅读下文示例。)。 | `{}`                 |

以下是这些设置更改后的示例：

```json [settings]
{
  // Disable cursor blink (禁用光标闪烁)
  "cursor_blink": false,
  // Use relative line numbers (使用相对行号)
  "relative_line_numbers": "enabled",
  // Hide the scroll bar (隐藏滚动条)
  "scrollbar": { "show": "never" },
  // Prevent the buffer from scrolling beyond the last line (防止缓冲区滚动到最后一行之后)
  "scroll_beyond_last_line": "off",
  // Allow the cursor to reach the edges of the screen (允许光标到达屏幕边缘)
  "vertical_scroll_margin": 0,
  "gutter": {
    // Disable line numbers completely (完全禁用行号)
    "line_numbers": false
  },
  "command_aliases": {
    "W": "w",
    "Wq": "wq",
    "Q": "q"
  }
}
```

`command_aliases` 属性是一个单一对象，它将键或键序列映射到 vim 模式命令。上面的示例定义了多个别名：`W` 对应 `w`，`Wq` 对应 `wq`，`Q` 对应 `q`。

## Regex differences (正则表达式差异)

Zed 使用与 Vim 不同的正则表达式引擎。这意味着在某些情况下，您必须使用不同的语法。以下是最常见的差异：

- **Capture groups (捕获组)**：Vim 使用 `\(` 和 `\)` 来表示捕获组，在 Zed 中，这些是 `(` 和 `)`。反过来，在 Vim 中，`(` 和 `)` 表示字面意义上的括号，但在 Zed 中，它们必须转义为 `\(` 和 `\)`.
- **Matches (匹配项)**：在替换时，Vim 使用后跟数字的反斜杠字符来表示匹配的捕获组。例如，`\1`。Zed 则使用美元符号。因此，当在 Vim 中使用 `\0` 表示整个匹配时，在 Zed 中的语法是 `$0`。对于编号的捕获组也是如此：Vim 中的 `\1` 在 Zed 中是 `$1`。
- **Global option (全局选项)**：默认情况下，在 Vim 中，正则表达式搜索只匹配一行中的第一个匹配项，您需要在查询末尾附加 `/g` 来查找所有匹配项。在 Zed 中，正则表达式搜索默认是全局的。
- **Case sensitivity (大小写敏感)**：Vim 使用 `/i` 表示不区分大小写的搜索。在 Zed 中，您可以在模式开头编写 `(?i)` 或使用快捷键 {#kb search::ToggleCaseSensitive} 来切换大小写敏感度。

> **注意**：为了帮助过渡，当您编写 Vim 风格的 substitute 命令 `:%s//` 时，命令调色板会为您修复括号和替换组。因此，Zed 会将 `%s:/\(a\)(b)/\1/` 转换为搜索 "(a)\(b\)" 和替换为 "$1"。

有关 Zed 正则表达式引擎支持的完整语法，[请参阅 regex crate 文档](https://docs.rs/regex/latest/regex/#syntax)。