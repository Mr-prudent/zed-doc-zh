---
title: 如何从 VS Code 迁移到 Zed
description: "从 VS Code 迁移到 Zed 的指南，包括设置和键盘快捷键。"
---

# 从 VS Code 迁移

本指南解释了如何在不重建工作流程的情况下，从 VS Code 迁移到 Zed。

它涵盖了哪些设置会自动导入、哪些快捷键能够完美映射，以及哪些行为存在差异，以便您能够快速调整。

## 安装 Zed

Zed 适用于 macOS、Windows 和 Linux。

对于 macOS，您可以从 zed.dev/download 下载，或通过 Homebrew 安装：
`brew install zed-editor/zed/zed`

对于大多数 Linux 用户，安装 Zed 最简单的方法是通过我们的安装脚本：
`curl -f https://zed.dev/install.sh | sh`

安装后，您可以从应用程序文件夹（macOS）或直接从终端（Linux）启动 Zed，使用：
`zed .`
这会在 Zed 中打开当前目录。

## 从 VS Code 导入设置

在设置过程中，您可以选择从 VS Code 导入关键设置。Zed 会导入以下设置：

### 从 VS Code 导入的设置

当您使用**从 VS Code 导入设置**时，以下 VS Code 设置会自动导入：

**编辑器**

| VS Code 设置                                 | Zed 设置                                      |
| -------------------------------------------- | --------------------------------------------- |
| `editor.fontFamily`                          | `buffer_font_family`                         |
| `editor.fontSize`                            | `buffer_font_size`                           |
| `editor.fontWeight`                          | `buffer_font_weight`                         |
| `editor.tabSize`                             | `tab_size`                                   |
| `editor.insertSpaces`                        | `hard_tabs` (取反)                           |
| `editor.wordWrap`                            | `soft_wrap`                                  |
| `editor.wordWrapColumn`                      | `preferred_line_length`                      |
| `editor.cursorStyle`                         | `cursor_shape`                               |
| `editor.cursorBlinking`                      | `cursor_blink`                               |
| `editor.renderLineHighlight`                 | `current_line_highlight`                     |
| `editor.lineNumbers`                         | `gutter.line_numbers`, `relative_line_numbers` |
| `editor.showFoldingControls`                 | `gutter.folds`                               |
| `editor.minimap.enabled`                     | `minimap.show`                               |
| `editor.minimap.autohide`                    | `minimap.show`                               |
| `editor.minimap.showSlider`                  | `minimap.thumb`                              |
| `editor.minimap.maxColumn`                   | `minimap.max_width_columns`                  |
| `editor.stickyScroll.enabled`                | `sticky_scroll.enabled`                      |
| `editor.scrollbar.horizontal`                 | `scrollbar.axes.horizontal`                  |
| `editor.scrollbar.vertical`                  | `scrollbar.axes.vertical`                    |
| `editor.mouseWheelScrollSensitivity`         | `scroll_sensitivity`                         |
| `editor.fastScrollSensitivity`               | `fast_scroll_sensitivity`                    |
| `editor.cursorSurroundingLines`              | `vertical_scroll_margin`                     |
| `editor.hover.enabled`                       | `hover_popover_enabled`                      |
| `editor.hover.delay`                         | `hover_popover_delay`                        |
| `editor.parameterHints.enabled`              | `auto_signature_help`                        |
| `editor.multiCursorModifier`                 | `multi_cursor_modifier`                      |
| `editor.selectionHighlight`                  | `selection_highlight`                        |
| `editor.roundedSelection`                    | `rounded_selection`                          |
| `editor.find.seedSearchStringFromSelection`  | `seed_search_query_from_cursor`              |
| `editor.rulers`                              | `wrap_guides`                                |
| `editor.renderWhitespace`                    | `show_whitespaces`                           |
| `editor.guides.indentation`                   | `indent_guides.enabled`                      |
| `editor.linkedEditing`                       | `linked_edits`                               |
| `editor.autoSurround`                        | `use_auto_surround`                          |
| `editor.formatOnSave`                        | `format_on_save`                             |
| `editor.formatOnPaste`                       | `auto_indent_on_paste`                       |
| `editor.formatOnType`                        | `use_on_type_format`                         |
| `editor.trimAutoWhitespace`                  | `remove_trailing_whitespace_on_save`         |
| `editor.suggestOnTriggerCharacters`          | `show_completions_on_input`                  |
| `editor.suggest.showWords`                   | `completions.words`                          |
| `editor.inlineSuggest.enabled`               | `show_edit_predictions`                      |

**文件与工作区**

| VS Code 设置                  | Zed 设置                         |
| ------------------------------ | -------------------------------- |
| `files.autoSave`              | `autosave`                       |
| `files.autoSaveDelay`         | `autosave.milliseconds`          |
| `files.insertFinalNewline`    | `ensure_final_newline_on_save`  |
| `files.associations`          | `file_types`                     |
| `files.watcherExclude`        | `file_scan_exclusions`           |
| `files.watcherInclude`        | `file_scan_inclusions`           |
| `files.simpleDialog.enable`   | `use_system_path_prompts`        |
| `search.smartCase`            | `use_smartcase_search`           |
| `search.useIgnoreFiles`       | `search.include_ignored`         |

**终端**

| VS Code 设置                          | Zed 设置                              |
| ------------------------------------- | ------------------------------------- |
| `terminal.integrated.fontFamily`      | `terminal.font_family`                |
| `terminal.integrated.fontSize`        | `terminal.font_size`                  |
| `terminal.integrated.lineHeight`      | `terminal.line_height`                |
| `terminal.integrated.cursorStyle`     | `terminal.cursor_shape`               |
| `terminal.integrated.cursorBlinking`  | `terminal.blinking`                   |
| `terminal.integrated.copyOnSelection`  | `terminal.copy_on_select`             |
| `terminal.integrated.scrollback`      | `terminal.max_scroll_history_lines`   |
| `terminal.integrated.macOptionIsMeta` | `terminal.option_as_meta`             |
| `terminal.integrated.{platform}Exec`  | `terminal.shell`                      |
| `terminal.integrated.env.{platform}`  | `terminal.env`                        |

**标签页与面板**

| VS Code 设置                                              | Zed 设置                                            |
| -------------------------------------------------------- | --------------------------------------------------- |
| `workbench.editor.showTabs`                              | `tab_bar.show`                                      |
| `workbench.editor.showIcons`                             | `tabs.file_icons`                                   |
| `workbench.editor.tabActionLocation`                      | `tabs.close_position`                               |
| `workbench.editor.tabActionCloseVisibility`               | `tabs.show_close_button`                            |
| `workbench.editor.focusRecentEditorAfterClose`           | `tabs.activate_on_close`                            |
| `workbench.editor.enablePreview`                          | `preview_tabs.enabled`                             |
| `workbench.editor.enablePreviewFromQuickOpen`             | `preview_tabs.enable_preview_from_file_finder`      |
| `workbench.editor.enablePreviewFromCodeNavigation`        | `preview_tabs.enable_preview_from_code_navigation`  |
| `workbench.editor.editorActionsLocation`                  | `tab_bar.show_tab_bar_buttons`                      |
| `workbench.editor.limit.enabled` / `value`               | `max_tabs`                                          |
| `workbench.editor.restoreViewState`                       | `restore_on_file_reopen`                            |
| `workbench.statusBar.visible`                             | `status_bar.show`                                   |

**项目面板（文件浏览器）**

| VS Code 设置                      | Zed 设置                          |
| --------------------------------- | --------------------------------- |
| `explorer.compactFolders`         | `project_panel.auto_fold_dirs`    |
| `explorer.autoReveal`             | `project_panel.auto_reveal_entries` |
| `explorer.excludeGitIgnore`       | `project_panel.hide_gitignore`    |
| `problems.decorations.enabled`    | `project_panel.show_diagnostics`  |
| `explorer.decorations.badges`    | `project_panel.git_status`        |

**Git**

| VS Code 设置                      | Zed 设置                                    |
| ---------------------------------- | ------------------------------------------- |
| `git.enabled`                      | `git_panel.button`                          |
| `git.defaultBranchName`            | `git_panel.fallback_branch_name`           |
| `git.decorations.enabled`          | `git.inline_blame`, `project_panel.git_status` |
| `git.blame.editorDecoration.enabled` | `git.inline_blame.enabled`                  |

**窗口与行为**

| VS Code 设置                                       | Zed 设置                              |
| -------------------------------------------------- | ------------------------------------- |
| `window.confirmBeforeClose`                        | `confirm_quit`                        |
| `window.nativeTabs`                                | `use_system_window_tabs`              |
| `window.closeWhenEmpty`                            | `when_closing_with_no_tabs`           |
| `accessibility.dimUnfocused.enabled` / `opacity`   | `active_pane_modifiers.inactive_opacity` |

**其他**

| VS Code 设置              | Zed 设置                                              |
| ------------------------- | ----------------------------------------------------- |
| `http.proxy`              | `proxy`                                               |
| `npm.packageManager`      | `node.npm_path`                                       |
| `telemetry.telemetryLevel` | `telemetry.metrics`, `telemetry.diagnostics`          |
| `outline.icons`           | `outline_panel.file_icons`, `outline_panel.folder_icons` |
| `chat.agent.enabled`      | `agent.enabled`                                       |
| `mcp`                     | `context_servers`                                     |

Zed 不会导入扩展或键盘快捷键，但此导入可以使核心编辑器行为接近您的 VS Code 设置。如果在设置过程中跳过了该步骤，您稍后仍可以通过命令面板手动导入设置：
`Cmd+Shift+P → Zed: 导入 VS Code 设置`

## 设置编辑器偏好

您可以在设置编辑器 ({#kb zed::OpenSettings}) 中配置大多数设置。对于高级设置，请从命令面板中运行 `zed: open settings file` 以直接编辑您的设置文件。

以下是常用 VS Code 设置的对应关系：
| VS Code | Zed | 说明 |
| --- | --- | --- |
| editor.fontFamily | buffer_font_family | Zed 默认使用 Zed Mono 字体 |
| editor.fontSize | buffer_font_size | 以像素为单位设置 |
| editor.tabSize | tab_size | 可按语言覆盖 |
| editor.insertSpaces | insert_spaces | 布尔值 |
| editor.formatOnSave | format_on_save | 在启用格式化程序时有效 |
| editor.wordWrap | soft_wrap | 支持可选的换位列 |

Zed 也支持每个项目的设置。您也可以在设置编辑器中找到这些设置。

## 打开或创建项目

设置完成后，按 `Cmd+O`（Linux 上为 `Ctrl+O`）打开一个文件夹。这将成为您在 Zed 中的工作区。与 VS Code 不同，Zed 不支持多根工作区或 `.code-workspace` 文件。Zed 保持简单：一个文件夹，一个工作区。

要启动一个新项目，请使用终端或文件管理器创建一个目录，然后在 Zed 中打开它。编辑器会将该文件夹视为您项目的根目录。

您也可以从任何文件夹内的终端启动 Zed：
`zed .`

进入项目后，使用 `Cmd+P` 在文件之间快速跳转。`Cmd+Shift+P`（Linux 上为 `Ctrl+Shift+P`）打开命令面板，用于运行操作/任务、切换设置或启动协作会话。

打开的缓冲区显示为顶部的标签页。项目面板显示您的文件树和 Git 状态。使用 `Cmd+B` 折叠它以获得无干扰的视图。

## 键盘快捷键的差异

如果您在入门过程中选择了 VS Code 键盘映射，大多数快捷键应该已经感觉很熟悉。
以下是一份快捷键匹配与差异的快速参考。

### 常用共享快捷键

| 操作                     | 快捷键         |
| ------------------------ | -------------- |
| 查找文件                 | `Cmd + P`      |
| 运行命令                 | `Cmd + Shift + P` |
| 搜索文本（整个项目）     | `Cmd + Shift + F` |
| 查找符号（整个项目）     | `Cmd + T`      |
| 查找符号（当前文件）     | `Cmd + Shift + O` |
| 切换左侧停靠栏           | `Cmd + B`      |
| 切换底部停靠栏           | `Cmd + J`      |
| 打开终端                 | `Ctrl + ~`     |
| 打开文件树浏览器         | `Cmd + Shift + E` |
| 关闭当前缓冲区           | `Cmd + W`      |
| 关闭整个项目             | `Cmd + Shift + W` |
| 重构：重命名符号         | `F2`           |
| 更改主题                 | `Cmd + K, Cmd + T` |
| 文本换行                 | `Opt + Z`      |
| 在打开的标签页间导航     | `Cmd + Opt + 方向键` |
| 语法折叠/展开           | `Cmd + Opt + {` 或 `}` |

### 不同的快捷键

| 操作               | VS Code                 | Zed                      |
| ------------------ | ----------------------- | ------------------------ |
| 打开最近的项目     | `Ctrl + R`             | `Cmd + Opt + O`          |
| 向上/下移动行     | `Opt + 上/下方向键`    | `Cmd + Ctrl + 上/下方向键` |
| 分割面板           | `Cmd + \`              | `Cmd + K, 方向键`        |
| 扩展选择范围       | `Shift + Alt + 右方向键` | `Opt + 上方向键`         |

### Zed 独有的

| 操作             | 快捷键                       | 说明                                                       |
| ---------------- | ---------------------------- | ---------------------------------------------------------- |
| 切换右侧停靠栏   | `Cmd + R` 或 `Cmd + Alt + B` |                                                            |
| 语法选择         | `Opt + 上/下方向键`         | 按结构选择代码（例如，在花括号内部）。                     |

### 如何自定义键盘快捷键

要编辑您的键盘快捷键：

- 打开命令面板（`Cmd+Shift+P`）
- 运行 `Zed: 打开键映射编辑器`

这将打开所有可用绑定的列表。您可以覆盖单个快捷键、删除冲突，或构建一个更适合您设置的布局。

Zed 也支持和弦（多键序列），例如 `Cmd+K Cmd+C`，就像 VS Code 一样。

## 用户界面的差异

### 没有工作区

VS Code 使用专门的工作区概念，具有多根文件夹、`.code-workspace` 文件，以及“一个窗口”和“一个工作区”之间的明确区分。
Zed 简化了这种模式。

在 Zed 中：

- 没有工作区文件格式。打开一个文件夹就是您的项目上下文。

- Zed 不支持多根工作区。您一次只能在一个窗口中打开一个文件夹。

- 大多数项目级行为都限定在您打开的文件夹内。搜索、Git 集成、任务和环境检测都将打开的目录视为项目根目录。

- 每个项目的设置是可选的。您可以在项目中添加一个 `.zed/settings.json` 文件来覆盖全局设置，但 Zed 不使用 `.code-workspace` 文件，也不会导入它们。

- 您可以从单个文件或空白窗口开始。Zed 不要求您打开文件夹即可开始编辑。

结果是更简单的模型：
打开一个文件夹 → 在该文件夹内工作 → 没有额外的工作区层。

### 在项目中导航

在 VS Code 中，标准的入口点是打开一个文件夹。从那里，左侧面板是导航的核心。
Zed 采用了不同的方法：

- 您仍然可以打开文件夹，但并非必须。打开单个文件甚至从空白工作区开始都是有效的。
- 命令面板（`Cmd+Shift+P`）和文件查找器（`Cmd+P`）是主要的导航工具。文件查找器在整个工作区中搜索文件、符号和命令。
- Zed 鼓励您，而不是使用持久面板：
  - 通过文件名进行模糊查找（`Cmd+P`）
  - 直接跳转到符号（`Cmd+Shift+O`）
  - 使用分割面板和标签页来保持上下文，而不是保持打开一个大型文件树（尽管如果您愿意，可以通过项目面板来实现）。

用户界面将辅助面板放在一旁，使导航以代码为中心。

### 扩展与市场

Zed 提供的扩展不像 VS Code 那么多。可用的扩展专注于语言支持、主题、语法高亮和其他核心编辑增强功能。

一些通常需要在 VS Code 中扩展实现的功能已内置在 Zed 中：

- 带有语音和光标共享的实时协作（无需 Live Share）
- AI 编程辅助（无需 Copilot 扩展）
- 内置终端面板
- 项目范围的模糊搜索
- 带有 JSON 配置的任务运行器
- 通过 LSP 提供内联诊断和代码操作

您不会找到每个 VS Code 扩展的一对一替代品，特别是如果您依赖用于 DevOps、容器或测试运行工具的扩展。Zed 的扩展目录仍在增长，并且规模仍然较小。

### Zed 与 VS Code 中的协作

与 VS Code 不同，Zed 进行协作无需扩展。它已内置到核心体验中。

- 在左侧停靠栏中打开协作面板。
- 创建一个频道并[邀请您的协作者](https://zed.dev/docs/collaboration#inviting-a-collaborator)加入。
- [直接共享您的屏幕或代码库](https://zed.dev/docs/collaboration#share-a-project)。

连接后，您将实时看到彼此的光标、选择和编辑。包含语音聊天，因此您可以在工作时进行对话。无需单独的工具或第三方登录。

了解 [Zed 如何使用 Zed](https://zed.dev/blog/zed-is-our-office) 来规划工作和协作。

### 在 Zed 中使用 AI

如果您在 VS Code 中习惯使用 GitHub Copilot，您也可以在 Zed 中做到同样的事情。您还可以通过 Zed Pro 探索其他代理，或者使用您自己的密钥进行连接而无需身份验证。如果您愿意，可以完全禁用 AI 功能。

#### 配置 GitHub Copilot

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 导航到 **AI → 编辑预测**
3. 点击“配置提供程序”旁边的 **配置**
4. 在 **GitHub Copilot** 下，点击 **登录 GitHub**

登录后，只需开始输入。Zed 将会为您提供内联建议以供接受。

#### 其他 AI 选项

要在 Zed 中使用其他 AI 模型，您有几个选择：

- 使用 Zed 托管的模型，具有更高的速率限制。需要 [身份验证](https://zed.dev/docs/authentication) 和订阅 [Zed Pro](https://zed.dev/docs/ai/subscription.html)。
- 带上您自己的 [API 密钥](https://zed.dev/docs/ai/llm-providers.html)，无需身份验证。
- 使用 [外部智能体，如 Claude Agent](https://zed.dev/docs/ai/external-agents.html)。

### 高级配置和生产力调整

Zed 为希望微调其环境的高级用户提供了高级设置。

以下是一些有用的调整：

**保存时格式化：**

```json
"format_on_save": "on"
```

**启用 direnv 支持：**

```json
"load_direnv": "shell_hook"
```

**自定义任务**：在您的 `tasks.json` 中定义构建或运行命令（通过命令面板访问：`zed: open tasks`）：

```json
[
  {
    "label": "build",
    "command": "cargo build"
  }
]
```

**导入自定义代码片段**
将您的 VS Code 代码片段 JSON 直接复制到 Zed 的代码片段文件夹（`zed: configure snippets`）。
