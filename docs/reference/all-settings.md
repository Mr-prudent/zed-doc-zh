---
title: 所有设置
description: "Zed 所有设置的完整参考。"
---

# 所有设置

这是 Zed 所有设置的完整参考。

您可能还想更改您的[主题](../themes.md)、配置[键盘绑定](../key-bindings.md)、设置[任务](../tasks.md)或安装[扩展](../extensions.md)。

# 设置

以下部分记录了支持的 Zed 设置。

## 活动窗格修饰符

- 描述: 应用于活动窗格的样式设置。
- 设置: `active_pane_modifiers`
- 默认值:

```json [settings]
{
  "active_pane_modifiers": {
    "border_size": 0.0,
    "inactive_opacity": 1.0
  }
}
```

### 边框大小

- 描述: 活动窗格周围边框的大小。当设置为 0 时，活动窗格没有边框。边框向内绘制。
- 设置: `border_size`
- 默认值: `0.0`

**选项**

非负 `float` 值

### 非活动窗格不透明度

- 描述: 非活动窗格的不透明度。当设置为 1.0 时，非活动窗格与活动窗格具有相同的不透明度。如果设置为 0，则非活动窗格内容不可见。值被限制在 [0.0, 1.0] 范围内。
- 设置: `inactive_opacity`
- 默认值: `1.0`

**选项**

`float` 值

## 底部停靠栏布局

- 描述: 控制底部停靠栏相对于左右停靠栏的布局。
- 设置: `bottom_dock_layout`
- 默认值: `"contained"`

**选项**

1.  包含底部停靠栏，将窗口的完整高度给予左右停靠栏。

```json [settings]
{
  "bottom_dock_layout": "contained"
}
```

2.  给予底部停靠栏窗口的完整宽度，截断左右停靠栏。

```json [settings]
{
  "bottom_dock_layout": "full"
}
```

3.  左对齐底部停靠栏，截断左侧停靠栏，并将右侧停靠栏给予窗口的完整高度。

```json [settings]
{
  "bottom_dock_layout": "left_aligned"
}
```

4.  右对齐底部停靠栏，将左侧停靠栏给予窗口的完整高度，并截断右侧停靠栏。

```json [settings]
{
  "bottom_dock_layout": "right_aligned"
}
```

## 代理字体大小

- 描述: 智能体面板中文本的字体大小。如果未设置，则继承 UI 字体大小。
- 设置: `agent_font_size`
- 默认值: `null`

**选项**

从 `6` 到 `100` 像素（含）的 `integer` 值

## 允许重新换行

- 描述: 控制在当前语言范围内允许执行 {#action editor::Rewrap} 操作的位置。
- 设置: `allow_rewrap`
- 默认值: `"in_comments"`

**选项**

1.  只允许在注释中重新换行：

```json [settings]
{
  "allow_rewrap": "in_comments"
}
```

2.  只允许在选区中重新换行：

```json [settings]
{
  "allow_rewrap": "in_selections"
}
```

3.  允许在任何地方重新换行：

```json [settings]
{
  "allow_rewrap": "anywhere"
}
```

注意：此设置在 Vim 模式下无效，因为重新换行已经允许在任何地方使用。

## 自动缩进

- 描述: 在输入时是否应根据上下文调整缩进。这可以按每种语言分别指定。
- 设置: `auto_indent`
- 默认值: `true`

**选项**

`boolean` 值

## 粘贴时自动缩进

- 描述: 粘贴的内容的缩进是否应根据上下文进行调整。
- 设置: `auto_indent_on_paste`
- 默认值: `true`

**选项**

`boolean` 值

## 自动安装扩展

- 描述: 定义要自动安装或永不安装的扩展。
- 设置: `auto_install_extensions`
- 默认值: `{ "html": true }`

**选项**

您可以通过列出 [扩展安装位置](../extensions/installing-extensions.md#installation-location)下的子文件夹来查找当前已安装扩展的名称：

在 macOS 上：

```sh
ls ~/Library/Application\ Support/Zed/extensions/installed/
```

在 Linux 上：

```sh
ls ~/.local/share/zed/extensions/installed
```

定义应安装（`true`）或永不安装（`false`）的扩展。

```json [settings]
{
  "auto_install_extensions": {
    "html": true,
    "dockerfile": true,
    "docker-compose": false
  }
}
```

## 自动保存

- 描述: 何时自动保存编辑过的缓冲区。
- 设置: `autosave`
- 默认值: `off`

**选项**

1.  要禁用自动保存，请将其设置为 `off`：

```json [settings]
{
  "autosave": "off"
}
```

2.  要在焦点更改时自动保存，请使用 `on_focus_change`：

```json [settings]
{
  "autosave": "on_focus_change"
}
```

3.  要在活动窗口更改时自动保存，请使用 `on_window_change`：

```json [settings]
{
  "autosave": "on_window_change"
}
```

4.  要在非活动期后自动保存，请使用 `after_delay`：

```json [settings]
{
  "autosave": {
    "after_delay": {
      "milliseconds": 1000
    }
  }
}
```

请注意，当关闭未保存的选项卡时，即使这早于配置的非活动期，也会触发保存。

## 点击时自动滚动

- 描述: 当点击靠近可见文本区域边缘时是否滚动。
- 设置: `autoscroll_on_clicks`
- 默认值: `false`

**选项**

`boolean` 值

## 自动签名帮助

- 描述: 在圆括号内时，在编辑器中显示方法签名。
- 设置: `auto_signature_help`
- 默认值: `false`

**选项**

`boolean` 值

### 编辑后显示签名帮助

- 描述: 是否在完成或插入括号对后显示签名帮助。如果启用了 `auto_signature_help`，此设置也将被视为启用。
- 设置: `show_signature_help_after_edits`
- 默认值: `false`

**选项**

`boolean` 值

## 自动更新

- 描述: 是否自动检查更新。
- 设置: `auto_update`
- 默认值: `true`

**选项**

`boolean` 值

## 基础键位映射

- 描述: 基础键位绑定方案。基础键位映射可以被用户键位映射覆盖。
- 设置: `base_keymap`
- 默认值: `VSCode`

**选项**

1.  VS Code

```json [settings]
{
  "base_keymap": "VSCode"
}
```

2.  Atom

```json [settings]
{
  "base_keymap": "Atom"
}
```

3.  JetBrains

```json [settings]
{
  "base_keymap": "JetBrains"
}
```

4.  无

```json [settings]
{
  "base_keymap": "None"
}
```

5.  Sublime Text

```json [settings]
{
  "base_keymap": "SublimeText"
}
```

6.  TextMate

```json [settings]
{
  "base_keymap": "TextMate"
}
```

## 缓冲区字体族

- 描述: 用于在编辑器中渲染文本的字体名称。
- 设置: `buffer_font_family`
- 默认值: `.ZedMono`。这目前别名为 [Lilex](https://lilex.myrt.co)。

**选项**

用户系统上安装的任何字体族的名称，或 `".ZedMono"`。

## 缓冲区字体特性

- 描述: 为编辑��中的文本启用的 OpenType 特性。
- 设置: `buffer_font_features`
- 默认值: `null`
- 平台: macOS 和 Windows。

**选项**

Zed 支持所有可以为给定缓冲区或终端字体启用或禁用的 OpenType 特性，以及设置字体特性值。

例如，要禁用字体连字，请将以下内容添加到您的设置中：

```json [settings]
{
  "buffer_font_features": {
    "calt": false
  }
}
```

您还可以设置其他 OpenType 特性，例如将 `cv01` 设置为 `7`：

```json [settings]
{
  "buffer_font_features": {
    "cv01": 7
  }
}
```

## 缓冲区字体后备方案

- 描述: 设置缓冲区文本的字体后备方案，这将与平台的后备方案合并。
- 设置: `buffer_font_fallbacks`
- 默认值: `null`
- 平台: macOS 和 Windows。

**选项**

例如，要使用 `Nerd Font` 作为后备方案，请将以下内容添加到您的设置中：

```json [settings]
{
  "buffer_font_fallbacks": ["Nerd Font"]
}
```

## 缓冲区字体大小

- 描述: 编辑器中文本的默认字体大小。
- 设置: `buffer_font_size`
- 默认值: `15`

**选项**

从 `6` 到 `100` 像素（含）的字体大小

## 缓冲区字体粗细

- 描述: 编辑器中文本的默认字体粗细。
- 设置: `buffer_font_weight`
- 默认值: `400`

**选项**

在 `100` 和 `900` 之间的 `integer` 值

## 缓冲区行高

- 描述: 编辑器中文本的默认行高。
- 设置: `buffer_line_height`
- 默认值: `"comfortable"`

**选项**

`"standard"`, `"comfortable"` 或 `{ "custom": float }`（`1` 为紧凑，`2` 为宽松）

## 居中布局

- 描述: 居中布局模式的配置。
- 设置: `centered_layout`
- 默认值:

```json [settings]
{
  "centered_layout": {
    "left_padding": 0.2,
    "right_padding": 0.2
  }
}
```

**选项**

`left_padding` 和 `right_padding` 选项定义当激活居中布局模式时，工作区中央窗格的左侧和右侧填充的相对宽度。有效值范围是从 `0` 到 `0.4`。

## 文件删除时关闭

- 描述: 当其对应的文件从磁盘删除时，是否自动关闭编辑器选项卡。
- 设置: `close_on_file_delete`
- 默认值: `false`

**选项**

`boolean` 值

启用时，此设置将自动关闭已在文件系统中删除的文件的选项卡。这对于涉及频繁创建和删除的临时文件或草稿文件的工作流程特别有用。禁用时（默认），已删除的文件会保持打开状态，其选项卡标题上有一条删除线。

注意：脏文件（有未保存更改的文件）即使启用了此设置也不会自动关闭，以确保您不会丢失未保存的工作。

## 确认退出

- 描述: 是否在关闭应用程序之前提示用户确认。
- 设置: `confirm_quit`
- 默认值: `false`

**选项**

`boolean` 值

## 诊断最大严重性

- 描述: 用于过滤在编辑器中显示的诊断信息的级别。
- 设置: `diagnostics_max_severity`
- 默认值: `null`

**选项**

1.  允许所有诊断（默认）：

```json [settings]
{
  "diagnostics_max_severity": "all"
}
```

2.  只显示错误：

```json [settings]
{
  "diagnostics_max_severity": "error"
}
```

3.  显示错误和警告：

```json [settings]
{
  "diagnostics_max_severity": "warning"
}
```

4.  显示错误、警告和信息：

```json [settings]
{
  "diagnostics_max_severity": "info"
}
```

5.  显示所有内容，包括提示：

```json [settings]
{
  "diagnostics_max_severity": "hint"
}
```

## 差异视图样式

- 描述: 如何在编辑器中显示差异。
- 设置: `diff_view_style`
- 默认值: `"split"`

**选项**

- `"unified"`: 将更改以内联方式显示，添加和删除的行垂直堆叠
- `"split"`: 在单独的窗格中并排显示新旧版本（默认）

有关更多详细信息，请参阅 [Git 文档](../git.md#diff-view-styles)。

## 禁用 AI

- 描述: 是否禁用 Zed 中的所有 AI 功能。
- 设置: `disable_ai`
- 默认值: `false`

**选项**

`boolean` 值

## Direnv 集成

- 描述: [direnv](https://direnv.net/) 集成的设置。需要安装 `direnv`。
  `direnv` 集成允许使用 `direnv` 配置设置的环境变量来检测 `$PATH` 中的一些语言服务器，而不是安装它们。
  它还允许在任务中使用这些环境变量。
- 设置: `load_direnv`
- 默认值: `"direct"`

**选项**

有三个选项可供选择：

1.  `shell_hook`: 使用 shell hook 来加载 direnv。这依赖于 direnv 在进入目录时激活。支持 POSIX shell 和 fish。
2.  `direct`: 使用 `direnv export json` 来加载 direnv。这将直接加载 direnv，而不依赖于 shell hook，可能会导致一些不一致。这允许 direnv 与任何 shell 一起使用。
3.  `disabled`: 不会自动加载任何 shell 环境；direnv 必须手动调用（例如使用 `direnv exec`）才能使用。

## 多缓冲区中的双击

- 描述: 当在某些摘要（单例缓冲区的一部分）中双击多缓冲区时该怎么做。
- 设置: `double_click_in_multibuffer`
- 默认值: `"select"`

**选项**

1.  表现得像普通缓冲区，选择整个单词（默认）：

```json [settings]
{
  "double_click_in_multibuffer": "select"
}
```

2.  将点击的摘要作为新缓冲区在新选项卡中打开：

```json [settings]
{
  "double_click_in_multibuffer": "open"
}
```

对于 "open" 的情况，通过在双击时按住 `alt` 可以实现常规的选区行为。

## 拖放目标大小

- 描述: 编辑器中拖放目标的相对大小，用于将拖放的文件作为拆分窗格打开（0-0.5）。例如，0.25 表示如果您拖放到窗格的顶部/底部四分之一，将使用新的垂直拆分；如果您拖放到窗格的左侧/右侧四分之一，将使用新的水平拆分。
- 设置: `drop_target_size`
- 默认值: `0.2`

**选项**

在 `0` 和 `0.5` 之间的 `float` 值

## 编辑预测

- 描述: 编辑预测的设置。
- 设置: `edit_predictions`
- 默认值:

```json [settings]
  "edit_predictions": {
    "disabled_globs": [
      "**/.env*",
      "**/*.pem",
      "**/*.key",
      "**/*.cert",
      "**/*.crt",
      "**/.dev.vars",
      "**/secrets.yml"
    ]
  }
```

**选项**

### 禁用的 Globs

- 描述: 应禁用编辑预测的 glob 列表。此列表添加到一个已有的、合理的默认 glob 集合中。您添加的任何额外条目将与它们合并。
- 设置: `disabled_globs`
- 默认值: `["**/.env*", "**/*.pem", "**/*.key", "**/*.cert", "**/*.crt", "**/.dev.vars", "**/secrets.yml"]`

**选项**

`string` 值列表。

### 在其中禁用编辑预测

- 描述: 应禁用编辑预测的语言范围列表。
- 设置: `edit_predictions_disabled_in`
- 默认值: `[]`

**选项**

`string` 值列表

1.  不要在注释中显示编辑预测：

```json [settings]
{
  "edit_predictions_disabled_in": ["comment"]
}
```

2.  不要在字符串和注释中显示编辑预测：

```json [settings]
{
  "edit_predictions_disabled_in": ["comment", "string"]
}
```

3.  只在 Go 中，不要在字符串和注释中显示编辑预测：

```json [settings]
{
  "languages": {
    "Go": {
      "edit_predictions_disabled_in": ["comment", "string"]
    }
  }
}
```

## 当前行高亮

- 描述: 如何在编辑器中高亮显示当前行。
- 设置: `current_line_highlight`
- 默认值: `all`

**选项**

1.  不要高亮显示当前行：

```json [settings]
{
  "current_line_highlight": "none"
}
```

2.  高亮显示侧边栏区域：

```json [settings]
{
  "current_line_highlight": "gutter"
}
```

3.  高亮显示编辑器区域：

```json [settings]
{
  "current_line_highlight": "line"
}
```

4.  高亮显示整行：

```json [settings]
{
  "current_line_highlight": "all"
}
```

## 选区高亮

- 描述: 是否高亮显示编辑器中选中文本的所有出现。
- 设置: `selection_highlight`
- 默认值: `true`

## 圆角选区

- 描述: 文本选区是否应有圆角。
- 设置: `rounded_selection`
- 默认值: `true`

## 光标闪烁

- 描述: 光标是否闪烁。
- 设置: `cursor_blink`
- 默认值: `true`

**选项**

`boolean` 值

## 光标形状

- 描述: 默认编辑器的光标形状。
- 设置: `cursor_shape`
- 默认值: `bar`

**选项**

1.  垂直条：

```json [settings]
{
  "cursor_shape": "bar"
}
```

2.  包围下一个字符的块：

```json [settings]
{
  "cursor_shape": "block"
}
```

3.  沿下一个字符运行的下划线/下划线：

```json [settings]
{
  "cursor_shape": "underline"
}
```

4.  在下一个字符周围绘制的框：

```json [settings]
{
  "cursor_shape": "hollow"
}
```

## 侧边栏

- 描述: 编辑器侧边栏的设置
- 设置: `gutter`
- 默认值:

```json [settings]
{
  "gutter": {
    "line_numbers": true,
    "runnables": true,
    "breakpoints": true,
    "folds": true,
    "min_line_number_digits": 4
  }
}
```

**选项**

- `line_numbers`: 是否在侧边栏显示行号
- `runnables`: 是否在侧边栏显示可运行按钮
- `breakpoints`: 是否在侧边栏显示断点
- `folds`: 是否在侧边栏显示折叠按钮
- `min_line_number_digits`: 在侧边栏为行号保留空间的最小字符数

## 隐藏鼠标

- 描述: 确定在编辑器或输入框中何时隐藏鼠标光标。
- 设置: `hide_mouse`
- 默认值: `on_typing_and_movement`

**选项**

1.  从不隐藏鼠标光标：

```json [settings]
{
  "hide_mouse": "never"
}
```

2.  只在输入时隐藏：

```json [settings]
{
  "hide_mouse": "on_typing"
}
```

3.  在输入和光标移动时都隐藏：

```json [settings]
{
  "hide_mouse": "on_typing_and_movement"
}
```

## 片段排序顺序

- 描述: 确定片段与其他补全项的排序方式。
- 设置: `snippet_sort_order`
- 默认值: `inline`

**选项**

1.  将片段放在补全列表的顶部：

```json [settings]
{
  "snippet_sort_order": "top"
}
```

2.  正常放置片段，不偏好任何位置：

```json [settings]
{
  "snippet_sort_order": "inline"
}
```

3.  将片段放在补全列表的底部：

```json [settings]
{
  "snippet_sort_order": "bottom"
}
```

4.  完全不在补全列表中显示片段：

```json [settings]
{
  "snippet_sort_order": "none"
}
```

## 编辑器滚动条

- 描述: 是否显示编辑器滚动条及其中的各种元素。
- 设置: `scrollbar`
- 默认值:

```json [settings]
{
  "scrollbar": {
    "show": "auto",
    "cursors": true,
    "git_diff": true,
    "search_results": true,
    "selected_text": true,
    "selected_symbol": true,
    "diagnostics": "all",
    "axes": {
      "horizontal": true,
      "vertical": true
    }
  }
}
```

### 显示模式

- 描述: 何时显示编辑器滚动条。
- 设置: `show`
- 默认值: `auto`

**选项**

1.  如果有重要信息则显示滚动条，或遵循系统配置的行为：

```json [settings]
{
  "scrollbar": {
    "show": "auto"
  }
}
```

2.  遵循系统配置的行为：

```json [settings]
{
  "scrollbar": {
    "show": "system"
  }
}
```

3.  始终显示滚动条：

```json [settings]
{
  "scrollbar": {
    "show": "always"
  }
}
```

4.  从不显示滚动条：

```json [settings]
{
  "scrollbar": {
    "show": "never"
  }
}
```

### 光标指示器

- 描述: 是否在滚动条中显示光标位置。
- 设置: `cursors`
- 默认值: `true`

光标指示器显示为滚动条上的小标记，显示其他协作者的光标在文件中的位置。

**选项**

`boolean` 值

### Git 差异指示器

- 描述: 是否在滚动条中显示 git 差异指示器。
- 设置: `git_diff`
- 默认值: `true`

Git 差异指示器显示为彩色标记，显示与 git HEAD 相比已添加、修改或删除的行。

**选项**

`boolean` 值

### 搜索结果指示器

- 描述: 是否在滚动条中显示缓冲区搜索结果。
- 设置: `search_results`
- 默认值: `true`

搜索结果指示器显示为标记，显示文件中当前搜索查询匹配的所有位置。

**选项**

`boolean` 值

### 选中文本指示器

- 描述: 是否在滚动条中显示选中文本的出现。
- 设置: `selected_text`
- 默认值: `true`

选中文本指示器显示为标记，显示文件中当前选中文本的所有出现。

**选项**

`boolean` 值

### 选中文本符号指示器

- 描述: 是否在滚动条中显示选中文本符号的出现。
- 设置: `selected_symbol`
- 默认值: `true`

选中文本符号指示器显示为标记，显示文件中当前选中文本符号（如函数或变量名）的所有出现。

**选项**

`boolean` 值

### 诊断信息

- 描述: 在滚动条中显示哪些诊断指示器。
- 设置: `diagnostics`
- 默认值: `all`

诊断指示器显示为彩色标记，显示错误、警告和其他语言服务器诊断信息在文件中相应行位置。

**选项**

1.  显示所有诊断信息：

```json [settings]
{
  "scrollbar": {
    "diagnostics": "all"
  }
}
```

2.  不显示任何诊断信息：

```json [settings]
{
  "scrollbar": {
    "diagnostics": "none"
  }
}
```

3.  只显示错误：

```json [settings]
{
  "scrollbar": {
    "diagnostics": "error"
  }
}
```

4.  只显示错误和警告：

```json [settings]
{
  "scrollbar": {
    "diagnostics": "warning"
  }
}
```

5.  只显示错误、警告和信息：

```json [settings]
{
  "scrollbar": {
    "diagnostics": "information"
  }
}
```

### 轴

- 描述: 强制启用或禁用每个轴的滚动条。
- 设置: `axes`
- 默认值:

```json [settings]
{
  "scrollbar": {
    "axes": {
      "horizontal": true,
      "vertical": true
    }
  }
}
```

#### 水平

- 描述: 为 false 时，强制禁用水平滚动条。否则，遵循其他设置。
- 设置: `horizontal`
- 默认值: `true`

**选项**

`boolean` 值

#### 垂直

- 描述: 为 false 时，强制禁用垂直滚动条。否则，遵循其他设置。
- 设置: `vertical`
- 默认值: `true`

**选项**

`boolean` 值

## 小地图

- 描述: 与编辑器小地图相关的设置，它为您提供文档的概览。
- 设置: `minimap`
- 默认值:

```json [settings]
{
  "minimap": {
    "show": "never",
    "thumb": "always",
    "thumb_border": "left_open",
    "current_line_highlight": null
  }
}
```

### 显示模式

- 描述: 何时在编辑器中显示小地图。
- 设置: `show`
- 默认值: `never`

**选项**

1.  始终显示小地图：

```json [settings]
{
  "minimap": {
    "show": "always"
  }
}
```

2.  如果编辑器的滚动条可见，则显示小地图：

```json [settings]
{
  "minimap": {
    "show": "auto"
  }
}
```

3.  从不显示小地图：

```json [settings]
{
  "minimap": {
    "show": "never"
  }
}
```

### 缩略图显示

- 描述: 何时在小地图中显示缩略图（可见的编辑器区域）。
- 设置: `thumb`
- 默认值: `always`

**选项**

1.  当鼠标悬停在小地图上时显示缩略图：

```json [settings]
{
  "minimap": {
    "thumb": "hover"
  }
}
```

2.  始终显示小地图缩略图：

```json [settings]
{
  "minimap": {
    "thumb": "always"
  }
}
```

### 缩略图边框

- 描述: 小地图缩略图的边框外观。
- 设置: `thumb_border`
- 默认值: `left_open`

**选项**

1.  在缩略图的所有边上显示边框：

```json [settings]
{
  "minimap": {
    "thumb_border": "full"
  }
}
```

2.  在除左侧边框外的所有边上显���边框：

```json [settings]
{
  "minimap": {
    "thumb_border": "left_open"
  }
}
```

3.  在除右侧边框外的所有边上显示边框：

```json [settings]
{
  "minimap": {
    "thumb_border": "right_open"
  }
}
```

4.  只在左侧显示边框：

```json [settings]
{
  "minimap": {
    "thumb_border": "left_only"
  }
}
```

5.  不显示缩略图边框：

```json [settings]
{
  "minimap": {
    "thumb_border": "none"
  }
}
```

### 当前行高亮

- 描述: 如何在小地图中高亮显示当前行。
- 设置: `current_line_highlight`
- 默认值: `null`

**选项**

1.  继承编辑器的当前行高亮设置：

```json [settings]
{
  "minimap": {
    "current_line_highlight": null
  }
}
```

2.  在小地图中高亮显示当前行：

```json [settings]
{
  "minimap": {
    "current_line_highlight": "line"
  }
}
```

或

```json [settings]
{
  "minimap": {
    "current_line_highlight": "all"
  }
}
```

3.  不要在小地图中高亮显示当前行：

```json [settings]
{
  "minimap": {
    "current_line_highlight": "gutter"
  }
}
```

或

```json [settings]
{
  "minimap": {
    "current_line_highlight": "none"
  }
}
```

## 编辑器选项卡栏

- 描述: 与编辑器选项卡栏相关的设置。
- 设置: `tab_bar`
- 默认值:

```json [settings]
{
  "tab_bar": {
    "show": true,
    "show_nav_history_buttons": true,
    "show_tab_bar_buttons": true
  }
}
```

### 显示

- 描述: 是否在编辑器中显示选项卡栏。
- 设置: `show`
- 默认值: `true`

**选项**

`boolean` 值

### 导航历史按钮

- 描述: 是否显示导航历史按钮。
- 设置: `show_nav_history_buttons`
- 默认值: `true`

**选项**

`boolean` 值

### 选项栏按钮

- 描述: 是否显示选项栏按钮。
- 设置: `show_tab_bar_buttons`
- 默认值: `true`

**选项**

`boolean` 值

## 编辑器选项卡

- 描述: 编辑器选项卡的配置。
- 设置: `tabs`
- 默认值:

```json [settings]
{
  "tabs": {
    "close_position": "right",
    "file_icons": false,
    "git_status": false,
    "activate_on_close": "history",
    "show_close_button": "hover",
    "show_diagnostics": "off"
  }
}
```

### 关闭位置

- 描述: 在选项卡内显示关闭按钮的位置。
- 设置: `close_position`
- 默认值: `right`

**选项**

1.  在右侧显示关闭按钮：

```json [settings]
{
  "tabs": {
    "close_position": "right"
  }
}
```

2.  在左侧显示关闭按钮：

```json [settings]
{
  "tabs": {
    "close_position": "left"
  }
}
```

### 文件图标

- 描述: 是否显示选项卡的文件图标。
- 设置: `file_icons`
- 默认值: `false`

### Git 状态

- 描述: 是否在选项卡中显示 Git 文件状态。
- 设置: `git_status`
- 默认值: `false`

### 关闭时激活

- 描述: 关闭当前选项卡后要做什么。
- 设置: `activate_on_close`
- 默认值: `history`

**选项**

1.  激活之前打开的选项卡：

```json [settings]
{
  "tabs": {
    "activate_on_close": "history"
  }
}
```

2.  如果存在，激活右侧邻居选项卡：

```json [settings]
{
  "tabs": {
    "activate_on_close": "neighbour"
  }
}
```

3.  如果存在，激活左侧邻居选项卡：

```json [settings]
{
  "tabs": {
    "activate_on_close": "left_neighbour"
  }
}
```

### 显示关闭按钮

- 描述: 控制选项卡关闭按钮的外观行为。
- 设置: `show_close_button`
- 默认值: `hover`

**选项**

1.  仅在鼠标悬停在选项卡上时显示：

```json [settings]
{
  "tabs": {
    "show_close_button": "hover"
  }
}
```

2.  持续显示：

```json [settings]
{
  "tabs": {
    "show_close_button": "always"
  }
}
```

3.  从不显示，即使鼠标悬停在其上：

```json [settings]
{
  "tabs": {
    "show_close_button": "hidden"
  }
}
```

### 显示诊断信息

- 描述: 是否在选项卡中显示诊断指示器。此设置仅在文件图标处于活动状态时有效，并控制哪些有诊断问题的文件被标记。
- 设置: `show_diagnostics`
- 默认值: `off`

**选项**

1.  不标记任何文件：

```json [settings]
{
  "tabs": {
    "show_diagnostics": "off"
  }
}
```

2.  只标记有错误的文件：

```json [settings]
{
  "tabs": {
    "show_diagnostics": "errors"
  }
}
```

3.  标记有错误和警告的文件：

```json [settings]
{
  "tabs": {
    "show_diagnostics": "all"
  }
}
```

### 显示内联代码操作

- 描述: 是否在缓冲区行首显示代码操作按钮。
- 设置: `inline_code_actions`
- 默认值: `true`

**选项**

`boolean` 值

### 会话

- 描述: 控制 Zed 生命周期相关的行为。
- 设置: `session`
- 默认值:

```json
{
  "session": {
    "restore_unsaved_buffers": true,
    "trust_all_worktrees": false
  }
}
```

**选项**

1.  是否在重启时恢复未保存的缓冲区：

```json [settings]
{
  "session": {
    "restore_unsaved_buffers": true
  }
}
```

如果此设置为 true，则在关闭应用程序时不会提示用户是否保存/丢弃脏文件。

2.  是否跳过 worktree 和工作区信任检查：

```json [settings]
{
  "session": {
    "trust_all_worktrees": false
  }
}
```

当受信任时，项目设置会自动同步，语言和 MCP 服务器会自动下载和启动。

### 拖放选区

- 描述: 是否允许在缓冲区中拖放文本选区。`delay` 是允许拖放前必须经过的毫秒数。否则，将创建新的文本选区。
- 设置: `drag_and_drop_selection`
- 默认值:

```json [settings]
{
  "drag_and_drop_selection": {
    "enabled": true,
    "delay": 300
  }
}
```

## 编辑器工具栏

- 描述: 是否在编辑器工具栏中显示各种元素。
- 设置: `toolbar`
- 默认值:

```json [settings]
{
  "toolbar": {
    "breadcrumbs": true,
    "quick_actions": true,
    "selections_menu": true,
    "agent_review": true,
    "code_actions": false
  }
}
```

**选项**

每个选项控制显示特定的工具栏元素。如果所有元素都隐藏，则不显示编辑器工具栏。

## 使用系统选项卡

- 描述: 是否根据用户的选项卡偏好允许窗口选项卡组合在一起（仅限 macOS）。
- 设置: `use_system_window_tabs`
- 默认值: `false`

**选项**

此设置可启用与 macOS 原生窗口选项卡功能的集成。当设置为 `true` 时，Zed 窗口可以作为选项卡组合在单个 macOS 窗口中，遵循用户设置的系统范围的选项卡偏好（例如"始终"、"全屏中"或"从不"）。此设置仅在 macOS 上可用。

## 启用语言服务器

- 描述: 是否使用语言服务器来提供代码智能。
- 设置: `enable_language_server`
- 默认值: `true`

**选项**

`boolean` 值

## 保存时确保最终换行符

- 描述: 移除文件末尾仅包含空白的任何行，并确保末尾只有一个换行符。
- 设置: `ensure_final_newline_on_save`
- 默认值: `true`

**选项**

`boolean` 值

## 扩展摘要行数

- 描述: 在多缓冲区中扩展摘要的默认行数。
- 设置: `expand_excerpt_lines`
- 默认值: `5`

**选项**

正 `integer` 值

## 摘要上下文行数

- 描述: 在多缓冲区中显示摘要时提供的上下文行数。
- 设置: `excerpt_context_lines`
- 默认值: `2`

**选项**

1 到 32 之间的正 `integer` 值。此范围之外的值将被限制在此范围内。

## 新行上扩展注释

- 描述: 当上一行是注释时，是否在新行上以注释开头。
- 设置: `extend_comment_on_newline`
- 默认值: `true`

**选项**

`boolean` 值

## 状态栏

- 描述: 控制状态栏中的各种元素。请注意，状态栏中的���些项目在其他地方有自己的设置。
- 设置: `status_bar`
- 默认值:

```json [settings]
{
  "status_bar": {
    "active_language_button": true,
    "cursor_position_button": true,
    "line_endings_button": false
  }
}
```

有一个实验性设置可以完全隐藏状态栏。这会导致严重的可用性问题（您将无法使用 Zed 的许多功能），但为那些在所有方面都重视屏幕空间的人提供。

```json
"status_bar": {
  "experimental.show": false
}
```

## LSP

- 描述: 语言服务器的配置。
- 设置: `lsp`
- 默认值: `null`

**选项**

以下设置可以针对特定的语言服务器进行覆盖：

- `initialization_options`
- `settings`

要覆盖语言服务器的配置，请在该语言服务器的名称处添加一个条目到 `lsp` 值中。

一些选项通过 `initialization_options` 传递给语言服务器。这些是必须在语言服务器启动时指定的选项，并且在更改时需要重新启动语言服务器。

例如，将 `check` 选项传递给 `rust-analyzer`，请使用以下配置：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "check": {
          "command": "clippy" // rust-analyzer.check.command (默认: "check")
        }
      }
    }
  }
}
```

而其他选项可以在运行时更改，应放在 `settings` 下：

```json [settings]
{
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "keyOrdering": true // 强制映射中键按字母顺序排序
        }
      }
    }
  }
}
```

## 全局 LSP 设置

- 描述: 适用于所有语言服务器的全局 LSP 设置
- 设置: `global_lsp_settings`
- 默认值:

```json [settings]
{
  "global_lsp_settings": {
    "button": true,
    "request_timeout": 120,
    "notifications": {
      // 自动关闭语言服务器通知的超时时间（毫秒）。
      // 设置为 0 以禁用自动关闭。
      "dismiss_timeout_ms": 5000
    }
  }
}
```

**选项**

- `button`: 是否在状态栏中显示 LSP 状态按钮
- `request_timeout`: 等待语言服务器响应的最长时间（秒）。值为 `0` 将导致不应用任何超时（导致所有 LSP 响应无限期等待直到完成）。默认值：`120`
- `notifications`: 通知相关设置。
  - `dismiss_timeout_ms`: 自动关闭语言服务器通知的超时时间（毫秒）。设置为 0 以禁用自动关闭。

## LSP 高亮防抖

- 描述: 在根据当前光标位置从语言服务器查询高亮信息之前的防抖延迟（毫秒）。
- 设置: `lsp_highlight_debounce`
- 默认值: `75`

**选项**

代表毫秒的 `integer` 值

## 功能

- 描述: 可以全局启用或禁用的功能
- 设置: `features`
- 默认值:

```json [settings]
{
  "edit_predictions": {
    "provider": "zed"
  }
}
```

### 编辑预测提供者

- 描述: 使用哪个编辑预测提供者。
- 设置: `edit_prediction_provider`
- 默认值: `"zed"`

**选项**

1.  使用 Zeta 作为编辑预测提供者：

```json [settings]
{
  "edit_predictions": {
    "provider": "zed"
  }
}
```

2.  使用 Copilot 作为编辑预测提供者：

```json [settings]
{
  "edit_predictions": {
    "provider": "copilot"
  }
}
```

3.  在所有提供者中关闭编辑预测：

```json [settings]
{
  "edit_predictions": {
    "provider": "none"
  }
}
```

## 保存时格式化

- 描述: 是否在保存前对缓冲区执行格式化。
- 设置: `format_on_save`
- 默认值: `on`

**选项**

1.  `on`，启用保存时格式化，遵循 `formatter` 设置：

```json [settings]
{
  "format_on_save": "on"
}
```

2.  `off`，禁用保存时格式化：

```json [settings]
{
  "format_on_save": "off"
}
```

## 格式化程序

- 描述: 如何执行缓冲区格式化。
- 设置: `formatter`
- 默认值: `auto`

**选项**

1.  要使用当前语言服务器，请使用 `"language_server"`：

```json [settings]
{
  "formatter": "language_server"
}
```

2.  或者使用外部命令，请使用 `"external"`。指定要运行的格式化程序的名称，以及传递给程序的参数数组。缓冲区的文本将通过 stdin 传递给程序，格式化后的输出应写入 stdout。例如，以下命令将使用 [`sed(1)`](https://linux.die.net/man/1/sed) 去除尾随空格：

```json [settings]
{
  "formatter": {
    "external": {
      "command": "sed",
      "arguments": ["-e", "s/ *$//"]
    }
  }
}
```

3.  外部格式化程序可以选择性地包含 `{buffer_path}` 占位符，该占位符将在运行时包含正在被格式化的缓冲区的路径。格式化程序通过标准输入接收文件内容，重新格式化它，然后将其输出到标准输出，因此通常不知道它们正在格式化的文件名。像 Prettier 这样的工具支持通过命令行参数接收文件路径，然后可用于影响格式化决策。

警告：不应使用 `{buffer_path}` 来指导您的格式化程序从文件名读取。您的格式化程序应只从标准输入读取，并且不应直接读取或写入文件。

```json [settings]
  "formatter": {
    "external": {
      "command": "prettier",
      "arguments": ["--stdin-filepath", "{buffer_path}"]
    }
  }
```

4.  或者使用连接的语言服务器提供的代码操作，请使用 `"code_actions"`：

```json [settings]
{
  "formatter": [
    // 使用 ESLint 的 --fix：
    { "code_action": "source.fixAll.eslint" },
    // 保存时组织导入：
    { "code_action": "source.organizeImports" }
  ]
}
```

5.  或者连续使用多个格式化程序，请使用格式化程序数组：

```json [settings]
{
  "formatter": [
    { "language_server": { "name": "rust-analyzer" } },
    {
      "external": {
        "command": "sed",
        "arguments": ["-e", "s/ *$//"]
      }
    }
  ]
}
```

这里将首先使用 `rust-analyzer` 来格式化代码，然后调用 sed。
如果任何格式化程序失败，后续的格式化程序仍将执行。

6.  要禁用格式化程序，请使用 `"none"`。此设置会禁用已配置的格式化程序，但 `code_actions_on_format` 中的任何操作仍将执行：

```json [settings]
{
  "formatter": "none"
}
```

## 自动关闭

- 描述: 在输入左括号、方括号、大括号、单引号或双引号字符时，是否自动添加匹配的右括号。
- 设置: `use_autoclose`
- 默认值: `true`

**选项**

`boolean` 值

## 总是将括号视为自动关闭

- 描述: 控制编辑器如何处理自动关闭的字符。
- 设置: `always_treat_brackets_as_autoclosed`
- 默认值: `false`

**选项**

`boolean` 值

**示例**

如果设置设置为 `true`：

1.  在编辑器中输入：`)))`
2.  将光标移动到开头：`^)))`
3.  再次输入：`)))`

结果仍然是 `)))`，而不是 `))))`，这是默认情况下的结果。

## 文件扫描排除项

- 设置: `file_scan_exclusions`
- 描述: Zed 将完全排除的文件或 glob 文件。它们将在文件扫描、文件搜索中被跳过，并且不会显示在项目文件树中。覆盖 `file_scan_inclusions`。
- 默认值:

```json [settings]
{
  "file_scan_exclusions": [
    "**/.git",
    "**/.svn",
    "**/.hg",
    "**/.jj",
    "**/CVS",
    "**/.DS_Store",
    "**/Thumbs.db",
    "**/.classpath",
    "**/.settings"
  ]
}
```

注意，在 settings.json 中指定 `file_scan_exclusions` 将覆盖默认值（如上所示）。如果您想排除额外的项目，您需要在您的设置中包含所有默认值。

## 文件扫描包含项

- 设置: `file_scan_inclusions`
- 描述: 即使被 git 忽略，Zed 也将包含的文件或 glob 文件。这对于对项目很重要但未被 git 跟踪的文件很有用。请注意，过于宽泛的 glob 可能会减慢 Zed 的文件扫描速度。`file_scan_exclusions` 优先于这些包含项。
- 默认值:

```json [settings]
{
  "file_scan_inclusions": [".env*"]
}
```

## 文件类型

- 设置: `file_types`
- 描述: 根据文件名或扩展名配置 Zed 如何为文件选择语言。支持 glob 条目。
- 默认值:

```json [settings]
{
  "file_types": {
    "JSONC": [
      "**/.zed/**/*.json",
      "**/zed/**/*.json",
      "**/Zed/**/*.json",
      "**/.vscode/**/*.json"
    ],
    "Shell Script": [".env.*"]
  }
}
```

**示例**

要将所有 `.c` 文件解释为 C++，将名为 `MyLockFile` 的文件解释为 TOML，将以 `Dockerfile` 开头的文件解释为 Dockerfile：

```json [settings]
{
  "file_types": {
    "C++": ["c"],
    "TOML": ["MyLockFile"],
    "Dockerfile": ["Dockerfile*"]
  }
}
```

## 诊断

- 描述: 诊断相关功能的配置。
- 设置: `diagnostics`
- 默认值:

```json [settings]
{
  "diagnostics": {
    "include_warnings": true,
    "inline": {
      "enabled": false
    }
  }
}
```

### 内联诊断

- 描述: 是否内联显示诊断信息。
- 设置: `inline`
- 默认值:

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": false,
      "update_debounce_ms": 150,
      "padding": 4,
      "min_column": 0,
      "max_severity": null
    }
  }
}
```

**选项**

1.  启用内联诊断。

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": true
    }
  }
}
```

2.  延迟诊断更新，直到上次诊断更新后的一段时间。

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "update_debounce_ms": 150
    }
  }
}
```

3.  设置源行结束和诊断开始之间的填充。

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "padding": 4
    }
  }
}
```

4.  在给定的列处水平对齐内联诊断。

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "min_column": 80
    }
  }
}
```

5.  仅显示警告和错误诊断。

```json [settings]
{
  "diagnostics": {
    "inline": {
      "enabled": true,
      "max_severity": "warning"
    }
  }
}
```

## Git

- 描述: Git 相关功能的配置。
- 设置: `git`
- 默认值:

```json [settings]
{
  "git": {
    "git_gutter": "tracked_files",
    "inline_blame": {
      "enabled": true
    },
    "branch_picker": {
      "show_author_name": true
    },
    "hunk_style": "staged_hollow"
  }
}
```

### Git Gutter

- 描述: 是否显示 git 状态栏。
- 设置: `git_gutter`
- 默认值: `tracked_files`

**选项**

1.  在跟踪的文件中显示 git 状态栏

```json [settings]
{
  "git": {
    "git_gutter": "tracked_files"
  }
}
```

2.  隐藏 git 状态栏

```json [settings]
{
  "git": {
    "git_gutter": "hide"
  }
}
```

### Gutter 防抖

- 描述: 设置更改在 git 状态栏中反映的防抖阈值（毫秒）。
- 设置: `gutter_debounce`
- 默认值: `null`

**选项**

代表毫秒的 `integer` 值

示例：

```json [settings]
{
  "git": {
    "gutter_debounce": 100
  }
}
```

### 内联 Git Blame

- 描述: 是否在当前聚焦的行内联显示 git blame 信息。
- 设置: `inline_blame`
- 默认值:

```json [settings]
{
  "git": {
    "inline_blame": {
      "enabled": true
    }
  }
}
```

**选项**

1.  禁用内联 git blame：

```json [settings]
{
  "git": {
    "inline_blame": {
      "enabled": false
    }
  }
}
```

2.  只在延迟后显示内联 git blame（延迟从光标停止移动后开始）：

```json [settings]
{
  "git": {
    "inline_blame": {
      "delay_ms": 500
    }
  }
}
```

3.  在提交日期和作者旁边显示提交摘要：

```json [settings]
{
  "git": {
    "inline_blame": {
      "show_commit_summary": true
    }
  }
}
```

4.  使用此列作为显示内联 blame 信息的最小列：

```json [settings]
{
  "git": {
    "inline_blame": {
      "min_column": 80
    }
  }
}
```

5.  设置行结束和内联 blame 提示之间的填充（以 em 为单位）：

```json [settings]
{
  "git": {
    "inline_blame": {
      "padding": 10
    }
  }
}
```

### 分支选择器

- 描述: 与分支选择器相关的配置。
- 设置: `branch_picker`
- 默认值:

```json [settings]
{
  "git": {
    "branch_picker": {
      "show_author_name": false
    }
  }
}
```

**选项**

1.  在分支选择器中显示作者姓名：

```json [settings]
{
  "git": {
    "branch_picker": {
      "show_author_name": true
    }
  }
}
```

### Hunk 样式

- 描述: 我们应该为 diff hunks 使用什么样式。
- 设置: `hunk_style`
- 默认值:

```json [settings]
{
  "git": {
    "hunk_style": "staged_hollow"
  }
}
```

**选项**

1.  淡出显示已暂存的 hunks 并带有边框：

```json [settings]
{
  "git": {
    "hunk_style": "staged_hollow"
  }
}
```

2.  淡出显示未暂存的 hunks 并带有边框：

```json [settings]
{
  "git": {
    "hunk_style": "unstaged_hollow"
  }
}
```

## 转到定义回退

- 描述: 当 {#action editor::GoToDefinition} 操作无法找到定义时要做什么。
- 设置: `go_to_definition_fallback`
- 默认值: `"find_all_references"`

**选项**

1.  什么都不做：

```json [settings]
{
  "go_to_definition_fallback": "none"
}
```

2.  查找同一符号的引用（默认）：

```json [settings]
{
  "go_to_definition_fallback": "find_all_references"
}
```

## 硬制表符

- 描述: 是否使用制表符或多个空格进行缩进。
- 设置: `hard_tabs`
- 默认值: `false`

**选项**

`boolean` 值

## Helix 模式

- 描述: 是否启用 Helix 模式。启用 `helix_mode` 也会启用 `vim_mode`。有关更多详细信息，请参阅 [Helix 文档](../helix.md)。
- 设置: `helix_mode`
- 默认值: `false`

**选项**

`boolean` 值

## 缩进指南

- 描述: 与缩进指南相关的配置。缩进指南可以按每种语言单独配置。
- 设置: `indent_guides`
- 默认值:

```json [settings]
{
  "indent_guides": {
    "enabled": true,
    "line_width": 1,
    "active_line_width": 1,
    "coloring": "fixed",
    "background_coloring": "disabled"
  }
}
```

**选项**

1.  禁用缩进指南

```json [settings]
{
  "indent_guides": {
    "enabled": false
  }
}
```

2.  为特定语言启用缩进指南。

```json [settings]
{
  "languages": {
    "Python": {
      "indent_guides": {
        "enabled": true
      }
    }
  }
}
```

3.  启用缩进感知的着色（"彩虹缩进"）。
   用于不同缩进级别的颜色在主题中定义（主题键：`accents`）。它们可以通过主题覆盖来定制。

```json [settings]
{
  "indent_guides": {
    "enabled": true,
    "coloring": "indent_aware"
  }
}
```

4.  启用缩进感知的背景着色（"彩虹缩进"）。
   用于不同缩进级别的颜色在主题中定义（主题键：`accents`）。它们可以通过主题覆盖来定制。

```json [settings]
{
  "indent_guides": {
    "enabled": true,
    "coloring": "indent_aware",
    "background_coloring": "indent_aware"
  }
}
```

## 悬浮提示启用

- 描述: 当鼠标在编辑器中的符号上移动时，是否显示信息性悬浮框。
- 设置: `hover_popover_enabled`
- 默认值: `true`

**选项**

`boolean` 值

## 悬浮提示延迟

- 描述: 显示信息性悬浮框前等待的时间（毫秒）。当 `auto_signature_help` 启用时，此延迟也适用于自动签名帮助。
- 设置: `hover_popover_delay`
- 默认值: `300`

**选项**

代表毫秒的 `integer` 值

## 图标主题

- 描述: 图标主题设置可以以两种形式指定 - 作为图标主题的名称，或作为包含 Zed 内部文件/文件夹的 `mode`、`dark` 和 `light` 图标主题的对象。
- 设置: `icon_theme`
- 默认值: `Zed (Default)`

### 图标主题对象

- 描述: 使用包含 `mode`、`dark` 和 `light` 的对象指定图标主题。
- 设置: `icon_theme`
- 默认值:

```json [settings]
{
  "icon_theme": {
    "mode": "system",
    "dark": "Zed (Default)",
    "light": "Zed (Default)"
  }
}
```

### 模式

- 描述: 指定图标主题模式。
- 设置: `mode`
- 默认值: `system`

**选项**

1.  设置图标主题为深色模式

```json [settings]
{
  "icon_theme": {
    "mode": "dark",
    "dark": "Zed (Default)",
    "light": "Zed (Default)"
  }
}
```

2.  设置图标主题为浅色模式

```json [settings]
{
  "icon_theme": {
    "mode": "light",
    "dark": "Zed (Default)",
    "light": "Zed (Default)"
  }
}
```

3.  设置图标主题为系统模式

```json [settings]
{
  "icon_theme": {
    "mode": "system",
    "dark": "Zed (Default)",
    "light": "Zed (Default)"
  }
}
```

### 深色

- 描述: 深色图标主题的名称。
- 设置: `dark`
- 默认值: `Zed (Default)`

**选项**

在命令面板中运行 {#action icon_theme_selector::Toggle} 操作以查看当前有效的图标主题名称列表。

### 浅色

- 描述: 浅色图标主题的名称。
- 设置: `light`
- 默认值: `Zed (Default)`

**选项**

在命令面板中运行 {#action icon_theme_selector::Toggle} 操作以查看当前有效的图标主题名称列表。

## 图片查看器

- 描述: 图片查看器功能的设置
- 设置: `image_viewer`
- 默认值:

```json [settings]
{
  "image_viewer": {
    "unit": "binary"
  }
}
```

**选项**

### 单位

- 描述: 图片文件大小的单位
- 设置: `unit`
- 默认值: `"binary"`

**选项**

1.  使用二进制单位（KiB, MiB）：

```json [settings]
{
  "image_viewer": {
    "unit": "binary"
  }
}
```

2.  使用十进制单位（KB, MB）：

```json [settings]
{
  "image_viewer": {
    "unit": "decimal"
  }
}
```

## 内联提示

- 描述: 用于在编辑器中显示带有提示的额外文本的配置。
- 设置: `inlay_hints`
- 默认值:

```json [settings]
{
  "inlay_hints": {
    "enabled": false,
    "show_type_hints": true,
    "show_parameter_hints": true,
    "show_other_hints": true,
    "show_background": false,
    "edit_debounce_ms": 700,
    "scroll_debounce_ms": 50,
    "toggle_on_modifiers_press": null
  }
}
```

**选项**

内联提示查询由两部分组成：编辑器（客户端）和 LSP 服务器。
当上述内联设置更改为启用提示时，编辑器将开始查询某些类型的提示并响应来自服务器的 LSP 提示刷新请求。
此时，服务器可能会也可能不会返回提示，具体取决于其实现，可能需要进一步配置，请参阅相应的 LSP 服务器文档。

以下语言由 Zed 预配置了内联提示：

- [Go](https://docs.zed.dev/languages/go)
- [Rust](https://docs.zed.dev/languages/rust)
- [Svelte](https://docs.zed.dev/languages/svelte)
- [TypeScript](https://docs.zed.dev/languages/typescript)

使用 `lsp` 部分进行服务器配置。示例在相应的语言文档中提供。

Zed 中的提示查询不是即时的，使用了两种类型的防抖，可以设置为 0 以禁用。
设置相关的提示更新不会被防抖处理。

`toggle_on_modifiers_press` 的所有可能配置值：

```json [settings]
{
  "inlay_hints": {
    "toggle_on_modifiers_press": {
      "control": true,
      "shift": true,
      "alt": true,
      "platform": true,
      "function": true
    }
  }
}
```

未指定的值为 `false`，如果所有修饰键都是 `false` 或并非所有修饰键都按下，则不会切换提示。

## 日记

- 描述: 日记的配置。
- 设置: `journal`
- 默认值:

```json [settings]
{
  "journal": {
    "path": "~",
    "hour_format": "hour12"
  }
}
```

### 路径

- 描述: 存储日记条目的目录路径。如果指定了无效路径，日记将回退到使用 `~`（主目录）。
- 设置: `path`
- 默认值: `~`

**选项**

`string` 值

### 小时格式

- 描述: 在日记中显示小时所使用的格式。
- 设置: `hour_format`
- 默认值: `hour12`

**选项**

1.  12 小时格式：

```json [settings]
{
  "journal": {
    "hour_format": "hour12"
  }
}
```

2.  24 小时格式：

```json [settings]
{
  "journal": {
    "hour_format": "hour24"
  }
}
```

## JSX 标签自动关闭

- 描述: 是否自动关闭 JSX 标签
- 设置: `jsx_tag_auto_close`
- 默认值:

```json [settings]
{
  "jsx_tag_auto_close": {
    "enabled": true
  }
}
```

**选项**

- `enabled`: 是否启用自动 JSX 标签关闭

## 语言

- 描述: 特定语言的配置。
- 设置: `languages`
- 默认值: `null`

**选项**

要覆盖语言的设置，请在该语言名称处添加一个条目到 `languages` 值中。示例：

```json [settings]
{
  "languages": {
    "C": {
      "format_on_save": "off",
      "preferred_line_length": 64,
      "soft_wrap": "preferred_line_length"
    },
    "JSON": {
      "tab_size": 4
    }
  }
}
```
以下设置可以针对每种特定语言进行覆盖：

- [`enable_language_server`](#enable-language-server)
- [`ensure_final_newline_on_save`](#ensure-final-newline-on-save)
- [`format_on_save`](#format-on-save)
- [`formatter`](#formatter)
- [`hard_tabs`](#hard-tabs)
- [`preferred_line_length`](#preferred-line-length)
- [`remove_trailing_whitespace_on_save`](#remove-trailing-whitespace-on-save)
- [`semantic_tokens`](#semantic-tokens)
- [`show_edit_predictions`](#show-edit-predictions)
- [`show_whitespaces`](#show-whitespaces)
- [`whitespace_map`](#whitespace-map)
- [`soft_wrap`](#soft-wrap)
- [`tab_size`](#tab-size)
- [`use_autoclose`](#use-autoclose)
- [`always_treat_brackets_as_autoclosed`](#always-treat-brackets-as-autoclosed)

这些值接受与同名的根级设置相同的选项。

### 文档符号

- 描述: 控制用于大纲和面包屑的文档符号的来源。
- 设置: `document_symbols`
- 默认值: `off`

**选项**

- `"off"`: 使用 tree-sitter 查询计算文档符号（默认）
- `"on"`: 使用语言服务器的 `textDocument/documentSymbol` LSP 响应。启用后，tree-sitter 不用于文档符号

LSP 文档符号可以为复杂的语言功能（例如，泛型类型、宏、装饰器）提供更准确的符号，而这些功能 tree-sitter 可能无法很好地处理。当您的语言服务器比 tree-sitter 语法提供更好的符号信息时，使用此设置。

示例：

```json [settings]
{
  "languages": {
    "TypeScript": {
      "document_symbols": "on"
    }
  }
}
```

## 语言模型

- 描述: 语言模型提供者的配置
- 设置: `language_models`
- 默认值:

```json [settings]
{
  "language_models": {
    "anthropic": {
      "api_url": "https://api.anthropic.com"
    },
    "google": {
      "api_url": "https://generativelanguage.googleapis.com"
    },
    "ollama": {
      "api_url": "http://localhost:11434"
    },
    "openai": {
      "api_url": "https://api.openai.com/v1"
    }
  }
}
```

**选项**

包括 API URL 和身份验证设置在内的各种 AI 模型提供者的配置。

## 行指示器格式

- 描述: 状态栏中行指示器的格式
- 设置: `line_indicator_format`
- 默认值: `"short"`

**选项**

1.  短格式：

```json [settings]
{
  "line_indicator_format": "short"
}
```

2.  长格式：

```json [settings]
{
  "line_indicator_format": "long"
}
```

## 链接编辑

- 描述: 如果语言服务器支持，是否执行关联范围的链接编辑。例如，在编辑打开的 `<html>` 标签时，关闭的 `</html>` 标签的内容也将被编辑。
- 设置: `linked_edits`
- 默认值: `true`

**选项**

`boolean` 值

## LSP 文档颜色

- 描述: 如何在编辑器中渲染 LSP `textDocument/documentColor` 颜色
- 设置: `lsp_document_colors`
- 默认值: `inlay`

**选项**

1.  `inlay`: 将文档颜色渲染为颜色文本旁边的内联提示。
2.  `background`: 在颜色文本后面绘制背景。
3.  `border`: 在颜色文本周围绘制边框。
4.  `none`: 不查询和渲染文档颜色。

## 最大选项卡数

- 描述: 选项卡栏中显示的最大选项卡数
- 设置: `max_tabs`
- 默认值: `null`

**选项**

正 `integer` 值或 `null` 表示无限选项卡

## 中键粘贴（仅限 Linux）

- 描述: 在 Linux 上启用中键粘贴
- 设置: `middle_click_paste`
- 默认值: `true`

**选项**

`boolean` 值

## 多光标修饰键

- 描述: 确定用于通过鼠标添加多个光标的修饰键。打开悬停链接的鼠标手势将进行调整，以避免与多光标修饰键冲突。
- 设置: `multi_cursor_modifier`
- 默认值: `alt`

**选项**

1.  在 Linux 和 Windows 上映射到 `Alt`，在 macOS 上映射到 `Option`：

```json [settings]
{
  "multi_cursor_modifier": "alt"
}
```

2.  在 Linux 和 Windows 上映射 `Control`，在 macOS 上映射到 `Command`：

```json [settings]
{
  "multi_cursor_modifier": "cmd_or_ctrl" // 别名: "cmd", "ctrl"
}
```

## Node.js

- 描述: Node.js 集成的配置
- 设置: `node`
- 默认值:

```json [settings]
{
  "node": {
    "ignore_system_version": false,
    "path": null,
    "npm_path": null
  }
}
```

**选项**

- `ignore_system_version`: 是否忽略系统 Node.js 版本
- `path`: 自定义 Node.js 二进制文件路径
- `npm_path`: 自定义 npm 二进制文件路径

## 网络代理

- 描述: 为 Zed 配置网络代理。
- 设置: `proxy`
- 默认值: `null`

**选项**

代理设置必须包含代理的 URL。

支持以下 URI 方案：

- `http`
- `https`
- `socks4` - 具有本地 DNS 的 SOCKS4 代理
- `socks4a` - 具有远程 DNS 的 SOCKS4 代理
- `socks5` - 具有本地 DNS 的 SOCKS5 代理
- `socks5h` - 具有远程 DNS 的 SOCKS5 代理

未指定方案时将使用 `http`。

默认情况下不使用代理，或者 Zed 将尝试从环境变量（如 `http_proxy`、`HTTP_PROXY`、`https_proxy`、`HTTPS_PROXY`、`all_proxy`、`ALL_PROXY`、`no_proxy` 和 `NO_PROXY`）检索代理设置。

例如，要设置 `http` 代理，请将以下内容添加到您的设置中：

```json [settings]
{
  "proxy": "http://127.0.0.1:10809"
}
```

或者设置 `socks5` 代理：

```json [settings]
{
  "proxy": "socks5h://localhost:10808"
}
```

如果您希望排除某些主机不使用代理，请设置 `NO_PROXY` 环境变量。这接受一个不应使用代理的主机名、主机后缀、IPv4/IPv6 地址或块的逗号分隔列表。例如，如果您的环境包含 `NO_PROXY="google.com, 192.168.1.0/24"`，所有 `192.168.1.*`、`google.com` 和 `*.google.com` 主机将绕过代理。有关更多详细信息，请参阅 [reqwest NoProxy 文档](https://docs.rs/reqwest/latest/reqwest/struct.NoProxy.html#method.from_string)。

## 关闭最后一个窗口时

- 描述: 关闭最后一个窗口时要做什么
- 设置: `on_last_window_closed`
- 默认值: `"platform_default"`

**选项**

1.  使用平台默认行为：

```json [settings]
{
  "on_last_window_closed": "platform_default"
}
```

2.  总是退出应用程序：

```json [settings]
{
  "on_last_window_closed": "quit_app"
}
```

## 配置文件

- 描述: 可以应用于现有设置之上的配置文件
- 设置: `profiles`
- 默认值: `{}`

**选项**

用于定义设置配置的对象。示例：

```json [settings]
{
  "profiles": {
    "presentation": {
      "buffer_font_size": 20,
      "ui_font_size": 18,
      "theme": "One Light"
    }
  }
}
```

## 预览选项卡

- 描述:
  预览选项卡允许您以预览模式打开文件，除非您明确固定它们，否则在切换到另一个文件时会自动关闭。这对于快速查看文件而不使您的工作区混乱很有用。预览选项卡以斜体显示文件名。\
   有几种方法可以将预览选项卡转换为常规选项卡：

  - 双击文件
  - 双击选项卡标题
  - 使用 {#action project_panel::OpenPermanent} 操作
  - 编辑文件
  - 将文件拖放到不同的窗格中

- 设置: `preview_tabs`
- 默认值:

```json [settings]
{
  "preview_tabs": {
    "enabled": true,
    "enable_preview_from_project_panel": true,
    "enable_preview_from_file_finder": false,
    "enable_preview_from_multibuffer": true,
    "enable_preview_multibuffer_from_code_navigation": false,
    "enable_preview_file_from_code_navigation": true,
    "enable_keep_preview_on_code_navigation": false
  }
}
```

### 从项目面板启用预览

- 描述: 确定在从项目面板单击时是否以预览模式打开文件。
- 设置: `enable_preview_from_project_panel`
- 默认值: `true`

**选项**

`boolean` 值

### 从文件查找器启用预览

- 描述: 确定从文件查找器中选择时是否以预览模式打开文件。
- 设置: `enable_preview_from_file_finder`
- 默认值: `false`

**选项**

`boolean` 值

### 从多缓冲区启用预览

- 描述: 确定从多缓冲区打开时是否以预览模式打开文件。
- 设置: `enable_preview_from_multibuffer`
- 默认值: `true`

**选项**

`boolean` 值

### 从代码导航启用预览多缓冲区

- 描述: 确定使用代码导航打开多缓冲区时是否以预览模式打开选项卡。
- 设置: `enable_preview_multibuffer_from_code_navigation`
- 默认值: `false`

**选项**

`boolean` 值

### 从代码导航启用预览文件

- 描述: 确定使用代码导航打开单个文件时是否以预览模式打开选项卡。
- 设置: `enable_preview_file_from_code_navigation`
- 默认值: `true`

**选项**

`boolean` 值

### 在代码导航中保持预览启用

- 描述: 确定在使用代码导航导航离开选项卡时是否将选项卡保持在预览模式。如果 `enable_preview_file_from_code_navigation` 或 `enable_preview_multibuffer_from_code_navigation` 也为 true，新选项卡可能会替换现有选项卡。
- 设置: `enable_keep_preview_on_code_navigation`
- 默认值: `false`

**选项**

`boolean` 值

## 文件查找器

### 文件图标

- 描述: 是否在文件查找器中显示文件图标。
- 设置: `file_icons`
- 默认值: `true`

### 模态最大宽度

- 描述: 文件查找器模态框的最大宽度。它可以取以下值之一：`small`、`medium`、`large`、`xlarge` 和 `full`。
- 设置: `modal_max_width`
- 默认值: `small`

### 在搜索中跳过活动项的焦点

- 描述: 确定文件查找器是否应在搜索结果中为活动文件跳过焦点。
- 设置: `skip_focus_for_active_in_search`
- 默认值: `true`

## 窗格拆分方向（水平）

- 描述: 您想要水平拆分窗格的方向
- 设置: `pane_split_direction_horizontal`
- 默认值: `"up"`

**选项**

1.  向上拆分：

```json [settings]
{
  "pane_split_direction_horizontal": "up"
}
```

2.  向下拆分：

```json [settings]
{
  "pane_split_direction_horizontal": "down"
}
```

## 窗格拆分方向（垂直）

- 描述: 您想要垂直拆分窗格的方向
- 设置: `pane_split_direction_vertical`
- 默认值: `"left"`

**选项**

1.  向左拆分：

```json [settings]
{
  "pane_split_direction_vertical": "left"
}
```

2.  向右拆分：

```json [settings]
{
  "pane_split_direction_vertical": "right"
}
```

## 首选行长度

- 描述: 对于启用了软换行的缓冲区，软换行所在的列。
- 设置: `preferred_line_length`
- 默认值: `80`

**选项**

`integer` 值

## 私有文件

- 描述: 用于匹配文件路径以确定文件是否为私有的 glob 模式
- 设置: `private_files`
- 默认值: `["**/.env*", "**/*.pem", "**/*.key", "**/*.cert", "**/*.crt", "**/secrets.yml"]`

**选项**

`string` glob 模式列表

## 默认在线项目

- 描述: 是否默认显示在线项目视图。
- 设置: `projects_online_by_default`
- 默认值: `true`

**选项**

`boolean` 值

## 读取 SSH 配置

- 描述: 是否读取 SSH 配置文件
- 设置: `read_ssh_config`
- 默认值: `true`

**选项**

`boolean` 值

## 编辑私有值

- 描述: 在私有文件中从视觉显示中隐藏变量的值
- 设置: `redact_private_values`
- 默认值: `false`

**选项**

`boolean` 值

## 相对行号

- 描述: 是否在侧边栏中显示相对行号
- 设置: `relative_line_numbers`
- 默认值: `"disabled"`

**选项**

1.  在侧边栏中显示相对行号，同时将换行视为一行：

```json [settings]
{
  "relative_line_numbers": "enabled"
}
```

2.  在侧边栏中显示相对行号，在计数中包括换行：

```json [settings]
{
  "relative_line_numbers": "wrapped"
}
```

2.  不使用相对行号：

```json [settings]
{
  "relative_line_numbers": "disabled"
}
```

## 保存时删除尾随空格

- 描述: 是否在保存缓冲区之前删除任何行中的尾随空格。
- 设置: `remove_trailing_whitespace_on_save`
- 默认值: `true`

**选项**

`boolean` 值

## 在停靠栏中调整所有面板大小

- 描述: 调整停靠栏大小时是否调整停靠栏中所有面板的大小。可以是 "left"、"right" 和 "bottom" 的组合。
- 设置: `resize_all_panels_in_dock`
- 默认值: `["left"]`

**选项**

包含以下任意组合的字符串列表：

- `"left"`: 一起调整左侧停靠栏面板
- `"right"`: 一起调整右侧停靠栏面板
- `"bottom"`: 一起调整底部停靠栏面板

## 重新打开文件时恢复

- 描述: 当再次打开文件时是否尝试恢复先前的文件状态。状态按窗格存储。
- 设置: `restore_on_file_reopen`
- 默认值: `true`

**选项**

`boolean` 值

## 启动时恢复

- 描述: 控制启动时的会话恢复。
- 设置: `restore_on_startup`
- 默认值: `last_session`

**选项**

1.  恢退退出 Zed 时打开的所有工作区：

```json [settings]
{
  "restore_on_startup": "last_session"
}
```

2.  恢退最后关闭的工作区：

```json [settings]
{
  "restore_on_startup": "last_workspace"
}
```

3.  始终以空的编辑器开始：

```json [settings]
{
  "restore_on_startup": "empty_tab"
}
```

4.  始终以欢迎启动台开始：

```json [settings]
{
  "restore_on_startup": "launchpad"
}
```

## 滚动超出最后一行

- 描述: 编辑器是否会滚动到最后一行之后
- 设置: `scroll_beyond_last_line`
- 默认值: `"one_page"`

**选项**

1.  滚动到最后一页之外的一页：

```json [settings]
{
  "scroll_beyond_last_line": "one_page"
}
```

2.  编辑器将滚动到最后一行之外，滚动量与 `vertical_scroll_margin` 相同：

```json [settings]
{
  "scroll_beyond_last_line": "vertical_scroll_margin"
}
```

3.  编辑器不会滚动到最后一行之后：

```json [settings]
{
  "scroll_beyond_last_line": "off"
}
```

**选项**

`boolean` 值

## 滚动灵敏度

- 描述: 滚动灵敏度乘数。此乘数应用于滚动时的水平和垂直增量值。
- 设置: `scroll_sensitivity`
- 默认值: `1.0`

**选项**

正 `float` 值

### 快速滚动灵敏度

- 描述: 快速滚动的滚动灵敏度乘数。此乘数应用于滚动时的水平和垂直增量值。当用户在滚动时按住 alt 或 option 键时，会发生快速滚动。
- 设置: `fast_scroll_sensitivity`
- 默认值: `4.0`

**选项**

正 `float` 值

### 水平滚动边距

- 描述: 使用鼠标滚动时要在两侧保留的字符数
- 设置: `horizontal_scroll_margin`
- 默认值: `5`

**选项**

非负 `integer` 值

### 垂直滚动边距

- 描述: 使用键盘滚动时要在光标上方/下方保留的行数
- 设置: `vertical_scroll_margin`
- 默认值: `3`

**选项**

非负 `integer` 值

## 搜索

- 描述: 在打开新的项目和缓冲区搜索时默认启用的搜索选项。
- 设置: `search`
- 默认值:

```json [settings]
{
  "search": {
    "button": true,
    "whole_word": false,
    "case_sensitive": false,
    "include_ignored": false,
    "regex": false,
    "center_on_match": false
  }
}
```

### 按钮

- 描述: 是否在状态栏中显示项目搜索按钮。
- 设置: `button`
- 默认值: `true`

### 全词匹配

- 描述: 是否只匹配整个单词。
- 设置: `whole_word`
- 默认值: `false`

### 区分大小写

- 描述: 是否区分大小写进行匹配。此设置影响搜索和编辑器操作，如"选择下一个出现"、"选择上一个出现"和"选择所有出现"。
- 设置: `case_sensitive`
- 默认值: `false`

### 包含被忽略的文件

- 描述: 是否在搜索结果中包含被 git 忽略的文件。
- 设置: `include_ignored`
- 默认值: `false`

### 正则表达式

- 描述: 是否将搜索查询解释为正则表达式。
- 设置: `regex`
- 默认值: `false`

### 输入时搜索

- 描述: 是否在项目搜索中输入时进行搜索。
- 设置: `search_on_input`
- 默认值: `true`

### 匹配时居中

- 描述: 在导航时是否将光标在每个搜索匹配项上居中。
- 设置: `center_on_match`
- 默认值: `false`

## 搜索环绕

- 描述: 如果禁用 `search_wrap`，搜索结果不会环绕文件末尾
- 设置: `search_wrap`
- 默认值: `true`

## 从光标处生成搜索查询

- 描述: 何时根据光标下的文本填充新搜索的查询。
- 设置: `seed_search_query_from_cursor`
- 默认值: `always`

**选项**

1.  `always` 始终用光标下的单词填充搜索查询
2.  `selection` 只在选中文本时填充搜索查询
3.  `never` 从不填充搜索查询

## 语义标记

- 描述: 控制如何使用来自语言服务器的语义标记进行语法高亮。
- 设置: `semantic_tokens`
- 默认值: `off`

**选项**

1.  `off`: 不向语言服务器请求语义标记。
2.  `combined`: 将 LSP 语义标记与 tree-sitter 高亮一起使用。
3.  `full`: 仅使用 LSP 语义标记，替换 tree-sitter 高亮。

要全局启用语义标记：

```json [settings]
{
  "semantic_tokens": "combined"
}
```

要为特定语言启用语义标记：

```json [settings]
{
  "languages": {
    "Rust": {
      "semantic_tokens": "full"
    }
  }
}
```

可能需要重新启动语言服务器才能正确应用。

## LSP 折叠范围

- 描述: 控制是否使用来自语言服务器的折叠范围，而不是 tree-sitter 和基于缩进的折叠。默认使用 tree-sitter 和基于缩进的折叠；当未返回 LSP 折叠数据或此设置关闭时，用作回退。
- 设置: `document_folding_ranges`
- 默认值: `off`

**选项**

1.  `off`: 使用 tree-sitter 和基于缩进的折叠。
2.  `on`: 尽可能使用 LSP 折叠，当服务器未返回结果时，回退到 tree-sitter 和基于缩进的折叠。

要全局启用 LSP 折叠范围：

```json [settings]
{
  "document_folding_ranges": "on"
}
```

要为特定语言启用 LSP 折叠范围：

```json [settings]
{
  "languages": {
    "Rust": {
      "document_folding_ranges": "on"
    }
  }
}
```

## LSP 文档符号

- 描述: 控制用于大纲和面包屑的文档符号的来源。这是一个 LSP 功能 — 启用时，tree-sitter 不用于文档符号，而是使用语言服务器的 `textDocument/documentSymbol` 响应。
- 设置: `document_symbols`
- 默认值: `off`

**选项**

1.  `off`: 使用 tree-sitter 查询计算文档符号。
2.  `on`: 使用语言服务器的 `textDocument/documentSymbol` LSP 响应。启用时，tree-sitter 不用于文档符号。

要全局启用 LSP 文档符号：

```json [settings]
{
  "document_symbols": "on"
}
```

要为特定语言启用 LSP 文档符号：

```json [settings]
{
  "languages": {
    "Rust": {
      "document_symbols": "on"
    }
  }
}
```

## 使用智能大小写搜索

- 描述: 启用时，根据您的查询自动调整搜索大小写敏感性。如果您的搜索查询包含任何大写字母，搜索将变为区分大小写；如果它只包含小写字母，搜索将变为不区分大小写。\
  这适用于文件内搜索和项目范围搜索。
- 设置: `use_smartcase_search`
- 默认值: `false`

**选项**

`boolean` 值

示例：

- 搜索 "function" 将匹配 "function"、"Function"、"FUNCTION" 等。
- 搜索 "Function" 将只匹配 "Function"，而不匹配 "function" 或 "FUNCTION"

## 显示通话状态图标

- 描述: 是否在状态栏中显示通话状态图标。
- 设置: `show_call_status_icon`
- 默认值: `true`

**选项**

`boolean` 值

## 补全

- 描述: 控制如何为这种语言处理补全。
- 设置: `completions`
- 默认值:

```json [settings]
{
  "completions": {
    "words": "fallback",
    "words_min_length": 3,
    "lsp": true,
    "lsp_fetch_timeout_ms": 0,
    "lsp_insert_mode": "replace_suffix"
  }
}
```

### 单词补全

- 描述: 控制如何补全单词。对于大文档，可能不会获取所有单词用于补全。
- 设置: `words`
- 默认值: `fallback`

**选项**

1.  `enabled` - 始终获取文档的单词用于补全，以及 LSP 补全
2.  `fallback` - 仅当 LSP 响应错误或超时时，才使用文档的单词显示补全
3.  `disabled` - 永不获取或补全文档的单词（仍可以通过单独的操作查询基于单词的补全）

### 最小单词查询长度

- 描述: 自动触发基于单词的补全所需的最小字符数。
  在该值之前，仍然可以通过相应的编辑器命令手动触发基于单词的补全。
- 设置: `words_min_length`
- 默认值: `3`

**选项**

正整数值

### LSP

- 描述: 是否获取 LSP 补全。
- 设置: `lsp`
- 默认值: `true`

**选项**

`boolean` 值

### LSP 获取超时（毫秒）

- 描述: 获取 LSP 补全时，确定等待特定服务器的响应多长时间。设置为 0 时，将无限期等待。
- 设置: `lsp_fetch_timeout_ms`
- 默认值: `0`

**选项**

代表毫秒的 `integer` 值

### LSP 插入模式

- 描述: 控制接受 LSP 补全时替换哪个范围。
- 设置: `lsp_insert_mode`
- 默认值: `replace_suffix`

**选项**

1.  `insert` - 替换光标前的文本，使用 LSP 规范中描述的 `insert` 范围
2.  `replace` - 替换光标前后的文本，使用 LSP 规范中描述的 `replace` 范围
3.  `replace_subsequence` - 如果将被替换的文本是补全文本的子序列，则表现得像 `"replace"`，否则表现得像 `"insert"`
4.  `replace_suffix` - 如果光标后的文本是补全的后缀，则表现得像 `"replace"`，否则表现得像 `"insert"`

## 输入时显示补全

- 描述: 是否在输入时显示补全。
- 设置: `show_completions_on_input`
- 默认值: `true`

**选项**

`boolean` 值

## 显示补全文档

- 描述: 是否在补全菜单中显示项目和旁边的内联文档。
- 设置: `show_completion_documentation`
- 默认值: `true`

**选项**

`boolean` 值

## 显示编辑预测

- 描述: 是否在输入时显示编辑预测，或通过触发 `editor::ShowEditPrediction` 手动显示。
- 设置: `show_edit_predictions`
- 默认值: `true`

**选项**

`boolean` 值

## 显示空白字符

- 描述: 是否在编辑器中渲染空白字符。
- 设置: `show_whitespaces`
- 默认值: `selection`

**选项**

1.  `all`
2.  `selection`
3.  `none`
4.  `boundary`

## 空白字符映射

- 描述: 当启用 `show_whitespaces` 时，指定用于渲染空白字符的字符。
- 设置: `whitespace_map`
- 默认值:

```json [settings]
{
  "whitespace_map": {
    "space": "•",
    "tab": "→"
  }
}
```

## 软换行

- 描述: 是否自动换行以适应编辑器/首选宽度。
- 设置: `soft_wrap`
- 默认值: `none`

**选项**

1.  `none` 通常避免换行，除非行太长
2.  `prefer_line` (已弃用，与 `none` 相同)
3.  `editor_width` 换行溢出编辑器宽度的行
4.  `preferred_line_length` 换行溢出 `preferred_line_length` 配置值的行
5.  `bounded` 在 `editor_width` 和 `preferred_line_length` 的最小值处换行

## 显示换行指引

- 描述: 是否在编辑器中显示换行指引（垂直标尺）。如果设置为 true，并且 `soft_wrap` 设置为 `preferred_line_length`，将在 'preferred_line_length' 值处显示一个指引，并将根据 `wrap_guides` 设置显示任何额外的指引。
- 设置: `show_wrap_guides`
- 默认值: `true`

**选项**

`boolean` 值

## 使用即时格式化

- 描述: 是否使用额外的 LSP 查询来格式化（并修改）每次"触发"符号输入后的代码，该符号由 LSP 服务器功能定义。
- 设置: `use_on_type_format`
- 默认值: `true`

**选项**

`boolean` 值

## 使用自动环绕

- 描述: 是否在输入左括号、方括号、大括号、单引号或双引号字符时自动环绕选中的文本。例如，当您选择文本并输入 '(' 时，Zed 将用 () 环绕文本。
- 设置: `use_auto_surround`
- 默认值: `true`

**选项**

`boolean` 值

## 使用系统路径提示

- 描述: 是否使用系统提供的"打开"和"另存为"对话框。当设置为 false 时，Zed 将使用内置的键盘优先选择器。
- 设置: `use_system_path_prompts`
- 默认值: `true`

**选项**

`boolean` 值

## 使用系统提示

- 描述: 是否使用系统提供的对话框进行提示，例如确认提示。当设置为 false 时，Zed 将使用其内置的提示。请注意，在 Linux 上，此选项将被忽略，并且 Zed 将始终使用内置的提示。
- 设置: `use_system_prompts`
- 默认值: `true`

**选项**

`boolean` 值

## 换行指引（垂直标尺）

- 描述: 在何处显示作为换行指引的垂直标尺。通过将 `show_wrap_guides` 设置为 `false` 来禁用。
- 设置: `wrap_guides`
- 默认值: []

**选项**

`integer` 列号列表

## 制表符大小

- 描述: 每个制表符字符使用的空格数。
- 设置: `tab_size`
- 默认值: `4`

**选项**

`integer` 值

## 任务

- 描述: Zed 内可运行的任务的配置
- 设置: `tasks`
- 默认值:

```json [settings]
{
  "tasks": {
    "variables": {},
    "enabled": true,
    "prefer_lsp": false
  }
}
```

**选项**

- `variables`: 任务配置的自定义变量
- `enabled`: 是否启用任务
- `prefer_lsp`: 是否优先选择 LSP 提供的任务而非 Zed 语言扩展任务

## 遥测

- 描述: 控制 Zed 收集哪些信息。
- 设置: `telemetry`
- 默认值:

```json [settings]
{
  "telemetry": {
    "diagnostics": true,
    "metrics": true
  }
}
```

**选项**

### 诊断

- 描述: 用于发送调试相关数据（例如崩溃报告）的设置。
- 设置: `diagnostics`
- 默认值: `true`

**选项**

`boolean` 值

### 指标

- 描述: 用于发送匿名使用数据的设置，例如您使用 Zed 的语言。
- 设置: `metrics`
- 默认值: `true`

**选项**

`boolean` 值

## 终端

- 描述: 终端的配置。
- 设置: `terminal`
- 默认值:

```json [settings]
{
  "terminal": {
    "alternate_scroll": "off",
    "blinking": "terminal_controlled",
    "copy_on_select": false,
    "keep_selection_on_copy": true,
    "dock": "bottom",
    "default_width": 640,
    "default_height": 320,
    "detect_venv": {
      "on": {
        "directories": [".env", "env", ".venv", "venv"],
        "activate_script": "default"
      }
    },
    "env": {},
    "font_family": null,
    "font_features": null,
    "font_size": null,
    "line_height": "comfortable",
    "minimum_contrast": 45,
    "option_as_meta": false,
    "button": true,
    "shell": "system",
    "scroll_multiplier": 3.0,
    "toolbar": {
      "breadcrumbs": false
    },
    "working_directory": "current_project_directory",
    "scrollbar": {
      "show": null
    }
  }
}
```

### 终端：停靠位置

- 描述: 控制停靠栏的位置
- 设置: `dock`
- 默认值: `bottom`

**选项**

`"bottom"`, `"left"` 或 `"right"`

### 终端：交替滚动

- 描述: 设置 Alternate Scroll 模式（DECSET 代码：`?1007`）是否默认处于活动状态。Alternate Scroll 模式在备用屏幕中将鼠标滚动事件转换为向上/向下按键（例如，在运行 vim 或 less 等应用程序时）。终端仍然可以使用 ANSI 转义码设置和取消设置此模式。
- 设置: `alternate_scroll`
- 默认值: `off`

**选项**

1.  默认将交替滚动模式设置为关闭

```json [settings]
{
  "terminal": {
    "alternate_scroll": "off"
  }
}
```

2.  默认将交替滚动模式设置为开启

```json [settings]
{
  "terminal": {
    "alternate_scroll": "on"
  }
}
```

### 终端：闪烁

- 描述: 设置终端中光标的行为
- 设置: `blinking`
- 默认值: `terminal_controlled`

**选项**

1.  从不闪烁光标，忽略终端模式

```json [settings]
{
  "terminal": {
    "blinking": "off"
  }
}
```

2.  默认光标闪烁为关闭，但允许终端打开闪烁

```json [settings]
{
  "terminal": {
    "blinking": "terminal_controlled"
  }
}
```

3.  始终闪烁光标，忽略终端模式

```json [settings]
{
  "terminal": {
    "blinking": "on"
  }
}
```

### 终端：选择时复制

- 描述: 是否在终端中选择文本时自动复制到系统剪贴板。
- ��置: `copy_on_select`
- 默认值: `false`

**选项**

`boolean` 值

**示例**

```json [settings]
{
  "terminal": {
    "copy_on_select": true
  }
}
```

### 终端：复制后保持选区

- 描述: 复制文本后是否在终端中保持选区。
- 设置: `keep_selection_on_copy`
- 默认值: `true`

**选项**

`boolean` 值

**示例**

```json [settings]
{
  "terminal": {
    "keep_selection_on_copy": false
  }
}
```

### 终端：环境变量

- 描述: 添加到此对象中的任何键值对都将添加到终端的环境中。键必须是唯一的，使用 `:` 在单个变量中分隔多个值。
- 设置: `env`
- 默认值: `{}`

**示例**

```json [settings]
{
  "terminal": {
    "env": {
      "ZED": "1",
      "KEY": "value1:value2"
    }
  }
}
```

### 终端：字体大小

- 描述: 终端使用的字体大小。未设置时，默认为匹配编辑器的字体大小。
- 设置: `font_size`
- 默认值: `null`

**选项**

`integer` 值

```json [settings]
{
  "terminal": {
    "font_size": 15
  }
}
```

### 终端：字体族

- 描述: 终端使用的字体。未设置时，默认为匹配编辑器的字体。
- 设置: `font_family`
- 默认值: `null`

**选项**

用户系统上安装的任何字体族的名称

```json [settings]
{
  "terminal": {
    "font_family": "Berkeley Mono"
  }
}
```

### 终端：字体特性

- 描述: 终端使用的字体特性。未设置时，默认为匹配编辑器的字体特性。
- 设置: `font_features`
- 默认值: `null`
- 平台: macOS 和 Windows。

**选项**

请参阅缓冲区字体特性

```json [settings]
{
  "terminal": {
    "font_features": {
      "calt": false
      // 有关更多特性，请参阅缓冲区字体特性
    }
  }
}
```

### 终端：行高

- 描述: 设置终端的行高。
- 设置: `line_height`
- 默认值: `standard`

**选项**

1.  使用对阅读来说 `comfortable` 的行高，1.618。

```json [settings]
{
  "terminal": {
    "line_height": "comfortable"
  }
}
```

2.  使用 `standard` 行高，1.3。此选项对于 TUI 特别有用，尤其是如果它们使用框字符。（默认）

```json [settings]
{
  "terminal": {
    "line_height": "standard"
  }
}
```

3.  使用自定义行高。

```json [settings]
{
  "terminal": {
    "line_height": {
      "custom": 2
    }
  }
}
```

### 终端：最小对比度

- 描述: 控制终端中前景色和背景色之间的最小对比度。使用 APCA（可感知对比度算法）进行颜色调整。设置为 0 以禁用此功能。
- 设置: `minimum_contrast`
- 默认值: `45`

**选项**

从 0 到 106 的 `integer` 值。常见推荐值：

- `0`: 无对比度调整
- `45`: 大型流畅文本的最小值（默认）
- `60`: 其他内容文本的最小值
- `75`: 正文文本的最小值
- `90`: 正文文本的首选值

```json [settings]
{
  "terminal": {
    "minimum_contrast": 45
  }
}
```

### 终端：Option 键作为 Meta 键

- 描述: 重新解释 option 键以充当 'meta' 键，类似于 Emacs。
- 设置: `option_as_meta`
- 默认值: `false`

**选项**

`boolean` 值

```json [settings]
{
  "terminal": {
    "option_as_meta": true
  }
}
```

### 终端：Shell

- 描述: 启动终端时使用的 shell。
- 设置: `shell`
- 默认值: `system`

**选项**

1.  使用系统的默认终端配置（通常是 `/etc/passwd` 文件）。

```json [settings]
{
  "terminal": {
    "shell": "system"
  }
}
```

2.  要启动的程序：

```json [settings]
{
  "terminal": {
    "shell": {
      "program": "sh"
    }
  }
}
```

3.  带有参数的程序：

```json [settings]
{
  "terminal": {
    "shell": {
      "with_arguments": {
        "program": "/bin/bash",
        "args": ["--login"]
      }
    }
  }
}
```

## 终端：检测虚拟环境 {#terminal-detect_venv}

- 描述: 激活 [Python 虚拟环境](https://docs.python.org/3/library/venv.html)，如果工作目录中找到的话，在终端中自动激活虚拟环境。
- 设置: `detect_venv`
- 默认值:

```json [settings]
{
  "terminal": {
    "detect_venv": {
      "on": {
        // 相对于当前工作目录搜索虚拟环境的默认目录。
        // 我们建议在项目设置中覆盖此设置，而不是全局设置。
        "directories": [".env", "env", ".venv", "venv"],
        // 也可以是 `csh`, `fish`, 和 `nushell`
        "activate_script": "default"
      }
    }
  }
}
```

通过以下方式禁用：

```json [settings]
{
  "terminal": {
    "detect_venv": "off"
  }
}
```

### 终端：滚动乘数

- 描述: 在终端中使用鼠标滚轮或触控板时的滚动速度乘数。
- 设置: `scroll_multiplier`
- 默认值: `1.0`

**选项**

正浮点数。小于或等于 0 的值将被限制为最小值 0.01。

**示例**

```json
{
  "terminal": {
    "scroll_multiplier": 5.0
  }
}
```

## 终端：工具栏

- 描述: 是否在终端工具栏中显示各种元素。
- 设置: `toolbar`
- 默认值:

```json [settings]
{
  "terminal": {
    "toolbar": {
      "breadcrumbs": false
    }
  }
}
```

**选项**

目前只有 `breadcrumbs` 选项可用，它控制可通过 `PROMPT_COMMAND` 更改的终端标题的显示。

如果终端标题为空，则不会显示面包屑。

运行终端的 shell 需要配置为发出标题。

设置标题的示例命令：`echo -e "\e]2;New Title\007";`

### 终端：按钮

- 描述: 控制在状态栏中显示或隐藏终端按钮
- 设置: `button`
- 默认值: `true`

**选项**

`boolean` 值

```json [settings]
{
  "terminal": {
    "button": false
  }
}
```

### 终端：工作目录

- 描述: 启动终端时使用的工作目录。
- 设置: `working_directory`
- 默认值: `"current_project_directory"`

**选项**

1.  使用当前文件的目录，回退到项目目录，然后是工作区中的第一个项目。

```json [settings]
{
  "terminal": {
    "working_directory": "current_file_directory"
  }
}
```

2.  使用当前文件的项目目录。如果不成功，回退到第一个项目目录策略。

```json [settings]
{
  "terminal": {
    "working_directory": "current_project_directory"
  }
}
```

3.  使用此工作区中第一个项目的目录。回退到使用此平台的主目录。

```json [settings]
{
  "terminal": {
    "working_directory": "first_project_directory"
  }
}
```

4.  如果找到，始终使用此平台的主目录。

```json [settings]
{
  "terminal": {
    "working_directory": "always_home"
  }
}
```

5.  始终使用特定目录。此值将被 shell 扩展。如果此路径不是有效目录，终端将默认为此平台的主目录。

```json [settings]
{
  "terminal": {
    "working_directory": {
      "always": {
        "directory": "~/zed/projects/"
      }
    }
  }
}
```

### 终端：路径超链接正则表达式

- 描述: 用于识别路径超链接的正则表达式。正则表达式可以以两种形式指定 - 单个正则表达式字符串，或字符串数组（这些字符串将收集到一个多行正则表达式字符串中）。
- 设置: `path_hyperlink_regexes`
- 默认值:

```json [settings]
{
  "terminal": {
    "path_hyperlink_regexes": [
      // Python 风格的诊断
      "File \"(?<path>[^\"]+)\", line (?<line>[0-9]+)",
      // 带有可选行、列、描述、尾随标点或周围符号或引号的通用路径语法
      [
        "(?x)",
        "# 可选以 0-2 个打开的前缀符号开头",
        "[({\\[<]{0,2}",
        "# 后面可能跟着一个开始引号",
        "(?<quote>[\"'`])?",
        // `path` 是任何非空字符序列的最短序列
        "(?<link>(?<path>[^ ]+?",
        "    # 可能以行和可选列结尾，",
        "    (?<line_column>:+[0-9]+(:[0-9]+)?|:?\\([0-9]+([,:][0-9]+)?\\))?",
        "))",
        "# 后面必须跟着一个匹配的引号",
        "(?(<quote>)\\k<quote>)",
        "# 以及可选的单个结束符号",
        "[)}\\]>]?",
        // 如果匹配了行/列，后面可能跟着一个描述",
        "(?(<line_column>):[^ 0-9][^ ]*)?",
        "# 后面可能跟着尾随标点",
        "[.,:)}\\]>]*",
        "# 并且总是包括尾随空格或行尾",
        "([ ]+|$)"
      ]
    ]
  }
}
```

### 终端：路径超链接超时（毫秒）

- 描述: 搜索路径超链接的最大时间。设置为 0 时，禁用路径超链接。
- 设置: `path_hyperlink_timeout_ms`
- 默认值: `1`

## REPL

- 描述: REPL 设置。
- 设置: `repl`
- 默认值:

```json [settings]
{
  "repl": {
    // 在 REPL 的回滚缓冲区中保留的最大列数。
    // 限制在 [20, 512] 范围内。
    "max_columns": 128,
    // 在 REPL 的回滚缓冲区中保留的最大行数。
    // 限制在 [4, 256] 范围内。
    "max_lines": 32
  }
}
```

## 主题

- 描述: 主题设置可以以两种形式指定 - 作为主题的名称，或作为包含 Zed UI 的 `mode`、`dark` 和 `light` 主题的对象。
- 设置: `theme`
- 默认值: `One Dark`

### 主题对象

- 描述: 使用包含 `mode`、`dark` 和 `light` 的对象指定主题。
- 设置: `theme`
- 默认值:

```json [settings]
{
  "theme": {
    "mode": "system",
    "dark": "One Dark",
    "light": "One Light"
  }
}
```

### 模式

- 描述: 指定主题模式。
- 设置: `mode`
- 默认值: `system`

**选项**

1.  设置主题为深色模式

```json [settings]
{
  "theme": {
    "mode": "dark",
    "dark": "One Dark",
    "light": "One Light"
  }
}
```

2.  设置主题为浅色模式

```json [settings]
{
  "theme": {
    "mode": "light",
    "dark": "One Dark",
    "light": "One Light"
  }
}
```

3.  设置主题为系统模式

```json [settings]
{
  "theme": {
    "mode": "system",
    "dark": "One Dark",
    "light": "One Light"
  }
}
```

### 深色

- 描述: 用于 UI 的深色 Zed 主题的名称。
- 设置: `dark`
- 默认值: `One Dark`

**选项**

在命令面板中运行 {#action theme_selector::Toggle} 操作以查看当前有效的主题名称列表。

### 浅色

- 描述: 用于 UI 的浅色 Zed 主题的名称。
- 设置: `light`
- 默认值: `One Light`

**选项**

在命令面板中运行 {#action theme_selector::Toggle} 操作以查看当前有效的主题名称列表。

## 标题栏

- 描述: 是否在标题栏中显示各种元素
- 设置: `title_bar`
- 默认值:

```json [settings]
{
  "title_bar": {
    "show_branch_icon": false,
    "show_branch_name": true,
    "show_project_items": true,
    "show_onboarding_banner": true,
    "show_user_picture": true,
    "show_user_menu": true,
    "show_sign_in": true,
    "show_menus": false
  }
}
```

**选项**

- `show_branch_icon`: 是否在标题栏的分支切换器旁边显示分支图标
- `show_branch_name`: 是否在标题栏显示分支名称按钮
- `show_project_items`: 是否在标题栏显示项目主机和名称
- `show_onboarding_banner`: 是否在标题栏显示横幅
- `show_user_picture`: 是否在标题栏显示用户图片
- `show_user_menu`: 是否在标题栏显示用户菜单按钮（默认显示您的头像，并包含"设置"、"键位映射"、"主题"等选项）
- `show_sign_in`: 是否在标题栏显示登录按钮
- `show_menus`: 是否在标题栏显示菜单

## Vim

- 描述: 是否启用 vim 模式。
- 设置: `vim_mode`
- 默认值: `false`

## 在没有选项卡时关闭

- 描述: 使用"关闭活动项"关闭没有选项卡的窗口时，是否应关闭窗口。
- 设置: `when_closing_with_no_tabs`
- 默认值: `"platform_default"`

**选项**

1.  使用平台默认行为：

```json [settings]
{
  "when_closing_with_no_tabs": "platform_default"
}
```

2.  总是关闭窗口：

```json [settings]
{
  "when_closing_with_no_tabs": "close_window"
}
```

3.  从不关闭窗口：

```json [settings]
{
  "when_closing_with_no_tabs": "keep_window_open"
}
```

## 项目面板

- 描述: 自定义项目面板
- 设置: `project_panel`
- 默认值:

```json [settings]
{
  "project_panel": {
    "button": true,
    "default_width": 240,
    "dock": "left",
    "entry_spacing": "comfortable",
    "file_icons": true,
    "folder_icons": true,
    "git_status": true,
    "indent_size": 20,
    "auto_reveal_entries": true,
    "auto_fold_dirs": true,
    "indent_guides": {
      "show": "always"
    },
    "scrollbar": {
      "show": null,
      "horizontal_scroll": true
    },
    "sticky_scroll": true,
    "show_diagnostics": "all",
    "sort_mode": "directories_first",
    "hide_root": false,
    "hide_hidden": false,
    "starts_open": true,
    "auto_open": {
      "on_create": true,
      "on_paste": true,
      "on_drop": true
    }
  }
}
```

### 停靠位置

- 描述: 控制停靠栏的位置
- 设置: `dock`
- 默认值: `left`

**选项**

1.  默认将停靠位置设置为左侧

```json [settings]
{
  "project_panel": {
    "dock": "left"
  }
}
```

2.  默认将停靠位置设置为右侧

```json [settings]
{
  "project_panel": {
    "dock": "right"
  }
}
```

### 条目间距

- 描述: 工作树条目之间的间距
- 设置: `entry_spacing`
- 默认值: `comfortable`

**选项**

1.  舒适的条目间距

```json [settings]
{
  "project_panel": {
    "entry_spacing": "comfortable"
  }
}
```

2.  标准条目间距

```json [settings]
{
  "project_panel": {
    "entry_spacing": "standard"
  }
}
```

### Git 状态

- 描述: 指示新创建和更新的文件
- 设置: `git_status`
- 默认值: `true`

**选项**

1.  默认启用 Git 状态

```json [settings]
{
  "project_panel": {
    "git_status": true
  }
}
```

2.  默认禁用 Git 状态

```json [settings]
{
  "project_panel": {
    "git_status": false
  }
}
```

### 默认宽度

- 描述: 自定义项目面板占用的默认宽度
- 设置: `default_width`
- 默认值: `240`

**选项**

`float` 值

### 自动显示条目

- 描述: 当相应的项目条目变为活动时，是否在项目面板中自动显示它。被 Git 忽略的条目永远不会自动显示。
- 设置: `auto_reveal_entries`
- 默认值: `true`

**选项**

1.  启用自动显示条目

```json [settings]
{
  "project_panel": {
    "auto_reveal_entries": true
  }
}
```

2.  禁用自动显示条目

```json [settings]
{
  "project_panel": {
    "auto_reveal_entries": false
  }
}
```

### 自动折叠目录

- 描述: 当目录只有一个目录时是否自动折叠目录。
- 设置: `auto_fold_dirs`
- 默认值: `true`

**选项**

1.  启用自动折叠目录

```json [settings]
{
  "project_panel": {
    "auto_fold_dirs": true
  }
}
```

2.  禁用自动折叠目录

```json [settings]
{
  "project_panel": {
    "auto_fold_dirs": false
  }
}
```

### 粗体文件夹标签

- 描述: 是否在项目面板中以粗体文本显示文件夹名称。
- 设置: `bold_folder_labels`
- 默认值: `false`

**选项**

1.  启用粗体文件夹标签

```json [settings]
{
  "project_panel": {
    "bold_folder_labels": true
  }
}
```

2.  禁用粗体文件夹标签

```json [settings]
{
  "project_panel": {
    "bold_folder_labels": false
  }
}
```

### 缩进大小

- 描述: 嵌套项目的缩进量（以像素为单位）。
- 设置: `indent_size`
- 默���值: `20`

### 缩进指南：显示

- 描述: 是否在项目面板中显示缩进指南。
- 设置: `indent_guides`
- 默认值:

```json [settings]
{
  "project_panel": {
    "indent_guides": {
      "show": "always"
    }
  }
}
```

**选项**

1.  在项目面板中显示缩进指南

```json [settings]
{
  "project_panel": {
    "indent_guides": {
      "show": "always"
    }
  }
}
```

2.  在项目面板中隐藏缩进指南

```json [settings]
{
  "project_panel": {
    "indent_guides": {
      "show": "never"
    }
  }
}
```

### 滚动条

- 描述: 项目面板的滚动条相关设置。
- 设置: `scrollbar`
- 默认值:

```json [settings]
{
  "project_panel": {
    "scrollbar": {
      "show": null,
      "horizontal_scroll": true
    }
  }
}
```

**选项**

- `show`: 是否在项目面板中显示滚动条。可能的值：null, "auto", "system", "always", "never"。当不存在时，继承编辑器设置，请参阅其描述了解详情。
- `horizontal_scroll`: 是否允许在项目面板中水平滚动。当为 `false` 时，视图锁定在最左侧位置，长文件名会被截断。

### 排序模式

- 描述: 项目面板中条目的排序顺序
- 设置: `sort_mode`
- 默认值: `directories_first`

**选项**

1.  首先显示目录，然后显示文件

```json [settings]
{
  "project_panel": {
    "sort_mode": "directories_first"
  }
}
```

2.  将目录和文件混合在一起显示

```json [settings]
{
  "project_panel": {
    "sort_mode": "mixed"
  }
}
```

3.  首先显示文件，然后显示目录

```json [settings]
{
  "project_panel": {
    "sort_mode": "files_first"
  }
}
```

### 自动打开

- 描述: 控制在项目面板中不同的创建流程后是否自动打开文件。
- 设置: `auto_open`
- 默认值:

```json [settings]
{
  "project_panel": {
    "auto_open": {
      "on_create": true,
      "on_paste": true,
      "on_drop": true
    }
  }
}
```

**选项**

- `on_create`: 是否在编辑器中自动打开新创建的文件。
- `on_paste`: 是否在粘贴或复制文件后自动打开文件。
- `on_drop`: 是否自动从外部源拖放的文件。

## 代理

访问 [AI 部分的配置页面](../ai/configuration.md) 以了解所有与代理相关的设置。

## 协作面板

- 描述: 协作面板的自定义设置。
- 设置: `collaboration_panel`
- 默认值:

```json [settings]
{
  "collaboration_panel": {
    "button": true,
    "dock": "left",
    "default_width": 240
  }
}
```

**选项**

- `button`: 是否在状态栏中显示协作面板按钮
- `dock`: 协作面板停靠的位置。可以是 `left` 或 `right`
- `default_width`: 协作面板的默认宽度

## 调试器

- 描述: 调试器面板和设置的配置
- 设置: `debugger`
- 默认值:

```json [settings]
{
  "debugger": {
    "stepping_granularity": "line",
    "save_breakpoints": true,
    "dock": "bottom",
    "button": true
  }
}
```

有关 Zed 内调试支持的更多信息，请参阅 [调试器页面](../debugger.md)。

## Git 面板

- 描述: 自定义 Git 面板行为的设置。
- 设置: `git_panel`
- 默认值:

```json [settings]
{
  "git_panel": {
    "button": true,
    "dock": "left",
    "default_width": 360,
    "status_style": "icon",
    "fallback_branch_name": "main",
    "sort_by_path": false,
    "collapse_untracked_diff": false,
    "scrollbar": {
      "show": null
    },
    "starts_open": false
  }
}
```

**选项**

- `button`: 是否在状态栏中显示 Git 面板按钮
- `dock`: Git 面板停靠的位置。可以是 `left` 或 `right`
- `default_width`: Git 面板的默认宽度
- `status_style`: 如何显示 Git 状态。可以是 `label_color` 或 `icon`
- `fallback_branch_name`: 如果未设置 `init.defaultBranch`，使用什么分支名称
- `sort_by_path`: 是否按路径对面板中的条目排序（默认按状态排序）
- `collapse_untracked_diff`: 是否在差异面板中折叠未跟踪的文件
- `scrollbar`: 何时在 Git 面板中显示滚动条
- `starts_open`: Git 面板是否应在启动时打开

## Git Worktree 目录

- 描述: Git worktree 创建的目录，相对于仓库工作目录。
- 设置: `git.worktree_directory`
- 默认值: `"../worktrees"`

当解析的目录超出项目根目录时，会自动附加项目的目录名称，以避免兄弟仓库发生冲突。例如，使用默认的 `"../worktrees"` 和位于 `~/code/zed` 的项目，worktree 将在 `~/code/worktrees/zed/` 下创建。

当解析的目录在项目根目录内时，不添加额外的组件（它已经是项目作用域的）。

**示例**：

- `"../worktrees"` — `~/code/worktrees/<project>/` (默认)
- `".git/zed-worktrees"` — `<project>/.git/zed-worktrees/`
- `"my-worktrees"` — `<project>/my-worktrees/`

尾随斜杠将被忽略。

```json [settings]
{
  "git": {
    "worktree_directory": "../worktrees"
  }
}
```

## Git 托管服务提供者

- 描述: 注册自托管 GitHub、GitLab 或 Bitbucket 实例，以便提交哈希、问题引用和永久链接可以解析到正确的主机。
- 设置: `git_hosting_providers`
- 默认值: `[]`

**选项**

每个条目接受：

- `provider`: `github`、`gitlab` 或 `bitbucket` 之一
- `name`: 实例的显示名称
- `base_url`: 基础 URL，例如 `https://git.example.corp`

您可以在用户或项目设置中定义这些；项目设置在用户设置之上合并。

```json [settings]
{
  "git_hosting_providers": [
    {
      "provider": "github",
      "name": "BigCorp GitHub",
      "base_url": "https://git.example.corp"
    }
  ]
}
```

## 大纲面板

- 描述: 自定义大纲面板
- 设置: `outline_panel`
- 默认值:

```json [settings]
{
  "outline_panel": {
    "button": true,
    "default_width": 300,
    "dock": "left",
    "file_icons": true,
    "folder_icons": true,
    "git_status": true,
    "indent_size": 20,
    "auto_reveal_entries": true,
    "auto_fold_dirs": true,
    "indent_guides": {
      "show": "always"
    },
    "scrollbar": {
      "show": null
    }
  }
}
```

## 通话

- 描述: 参与通话时自定义行为
- 设置: `calls`
- 默认值:

```json [settings]
{
  "calls": {
    // 默认通过实时麦克风加入通话
    "mute_on_join": false,
    // 当您是第一个加入频道时共享您的项目
    "share_on_join": false
  }
}
```

## 彩色括号

- 描述: 是否使用 tree-sitter 括号查询来检测和着色编辑器中的括号（也称为"彩虹括号"）。
- 设置: `colorize_brackets`
- 默认值: `false`

**选项**

`boolean` 值

用于不同缩进级别的颜色在主题中定义（主题键：`accents`）。它们可以通过主题覆盖来定制。

## 不必要代码淡化

- 描述: 淡化未使用代码的程度。
- 设置: `unnecessary_code_fade`
- 默认值: `0.3`

**选项**

`0.0` 和 `0.9` 之间的浮点值，其中：

- `0.0` 表示没有淡化（未使用的代码看起来与已使用的代码相同）
- `0.9` 表示最大淡化（未使用的代码非常淡但仍然可见）

**示例**

```json [settings]
{
  "unnecessary_code_fade": 0.5
}
```

## UI 字体族

- 描述: 用于 UI 文本的字体名称。
- 设置: `ui_font_family`
- 默认值: `.ZedSans`。这目前别名为 [IBM Plex](https://www.ibm.com/plex/)。

**选项**

系统上安装的任何字体族的名称，`".ZedSans"` 以使用 Zed 提供的默认字体，或 `".SystemUIFont"` 以使用系统的默认 UI 字体（在 macOS 和 Windows 上）。

## UI 字体特性

- 描述: 为 UI 文本启用的 OpenType 特性。
- 设置: `ui_font_features`
- 默认值:

```json [settings]
{
  "ui_font_features": {
    "calt": false
  }
}
```

- 平台: macOS 和 Windows。

**选项**

Zed 支持所有可以为给定 UI 字体启用或禁用的 OpenType 特性，以及设置字体特性值。

例如，要禁用字体连字，请将以下内容添加到您的设置中：

```json [settings]
{
  "ui_font_features": {
    "calt": false
  }
}
```

您也可以设置其他 OpenType 特性，例如将 `cv01` 设置为 `7`：

```json [settings]
{
  "ui_font_features": {
    "cv01": 7
  }
}
```

## UI 字体后备方案

- 描述: 用于 UI 文本的字体后备方案。
- 设置: `ui_font_fallbacks`
- 默认值: `null`
- 平台: macOS 和 Windows。

**选项**

例如，要使用 `Nerd Font` 作为后备方案，请将以下内容添加到您的设置中：

```json [settings]
{
  "ui_font_fallbacks": ["Nerd Font"]
}
```

## UI 字体大小

- 描述: UI 文本的默认字体大小。
- 设置: `ui_font_size`
- 默认值: `16`

**选项**

从 `6` 到 `100` 像素（含）的 `integer` 值

## UI 字体粗细

- 描述: UI 文本的默认字体粗细。
- 设置: `ui_font_weight`
- 默认值: `400`

**选项**

在 `100` 和 `900` 之间的 `integer` 值

## 设置配置文件

- 描述: 配置任意数量的设置配置文件，当从 `settings profile selector: toggle` 中选择时，这些配置文件会临时应用于您现有的用户设置之上。
- 设置: `profiles`
- 默认值: `{}`

在您的 `settings.json` 文件中，添加 `profiles` 对象。
此对象中的每个键都是设置配置文件的名称，每个值是一个可以包含 Zed 任何设置的对象。

示例：

```json [settings]
{
  "profiles": {
    "Presenting (Dark)": {
      "agent_buffer_font_size": 18.0,
      "buffer_font_size": 18.0,
      "theme": "One Dark",
      "ui_font_size": 18.0
    },
    "Presenting (Light)": {
      "agent_buffer_font_size": 18.0,
      "buffer_font_size": 18.0,
      "theme": "One Light",
      "ui_font_size": 18.0
    },
    "Writing": {
      "agent_buffer_font_size": 15.0,
      "buffer_font_size": 15.0,
      "theme": "Catppuccin Frappé - No Italics",
      "ui_font_size": 15.0,
      "tab_bar": { "show": false },
      "toolbar": { "breadcrumbs": false }
    }
  }
}
```

要预览和启用设置配置文件，请通过 {#kb command_palette::Toggle} 打开命令面板并搜索 `settings profile selector: toggle`。

## 一个示例配置：

```json [settings]
// ~/.config/zed/settings.json
{
  "theme": "cave-light",
  "tab_size": 2,
  "preferred_line_length": 80,
  "soft_wrap": "none",

  "buffer_font_size": 18,
  "buffer_font_family": ".ZedMono",

  "autosave": "on_focus_change",
  "format_on_save": "off",
  "vim_mode": false,
  "terminal": {
    "font_family": "FiraCode Nerd Font Mono",
    "blinking": "off"
  },
  "languages": {
    "C": {
      "format_on_save": "on",
      "formatter": "language_server",
      "preferred_line_length": 64,
      "soft_wrap": "preferred_line_length"
    }
  }
}
```
