---
title: 视觉自定义
description: "可以在设置编辑器或设置文件中配置 Zed 视觉布局的各个方面。"
---

# 视觉自定义

Zed 的视觉布局各个方面都可以在设置编辑器 ({#kb zed::OpenSettings}) 或您的设置文件 ({#kb zed::OpenSettingsFile}) 中进行配置。

有关更多信息和其他非视觉设置，请参阅 [所有设置](./reference/all-settings.md)。

## 主题

您可以通过从命令面板运行 {#action zed::Extensions} 以扩展的形式安装许多[主题](./themes.md)和[图标主题](./icon-themes.md)。

您可以使用 {#action theme_selector::Toggle} ({#kb theme_selector::Toggle}) 和 {#action icon_theme_selector::Toggle} 来预览/选择您已安装的主题和图标主题，这将修改以下设置：

```json [settings]
{
  "theme": "One Dark",
  "icon_theme": "Zed (Default)"
}
```

如果您希望为亮色模式/暗色模式使用不同的主题，可以这样设置：

```json [settings]
{
  "theme": {
    "dark": "One Dark",
    "light": "One Light",
    // 使用的模式（dark, light）或 "system" 以跟随操作系统的亮色/暗色模式（默认）
    "mode": "system"
  },
  "icon_theme": {
    "dark": "Zed (Default)",
    "light": "Zed (Default)",
    // 使用的模式（dark, light）或 "system" 以跟随操作系统的亮色/暗色模式（默认）
    "mode": "system"
  }
}
```

## 字体

```json [settings]
  // UI 字体。使用 ".SystemUIFont" 来使用默认系统字体（macOS 上为 SF Pro），
  // 或使用 ".ZedSans" 作为捆绑的默认字体（当前为 IBM Plex）
  "ui_font_family": ".SystemUIFont",
  "ui_font_weight": 400, // 标准 CSS 单位中的字体粗细，从 100 到 900。
  "ui_font_size": 16,

  // 缓冲区字体 - 编辑器缓冲区使用
  // 使用 ".ZedMono" 作为捆绑的默认等宽字体（当前为 Lilex）
  "buffer_font_family": "Berkeley Mono", // 编辑器缓冲区的字体名称
  "buffer_font_size": 15,                 // 编辑器缓冲区的字体大小
  "buffer_font_weight": 400,              // CSS 单位中的字体粗细 [100-900]
  // 行高 "comfortable" (1.618), "standard" (1.3) 或自定义：`{ "custom": 2 }`
  "buffer_line_height": "comfortable",

  // 终端字体设置
  "terminal": {
    "font_family": "",
    "font_size": 15,
    // 终端行高：comfortable (1.618), standard(1.3) 或 `{ "custom": 2 }`
    "line_height": "standard",
  },

  // 控制智能体面板中代理响应的字体大小。
  // 如果未指定，则回退到 UI 字体大小。
  "agent_ui_font_size": 15,
  // 控制智能体面板的消息编辑器、用户消息和任何其他代码片段的字体大小。
  "agent_buffer_font_size": 12
```

### 字体连字

默认情况下，Zed 启用字体连字，这将视觉上合并某些相邻的字符。

例如 `=>` 将显示为 `→`，`!=` 将显示为 `≠`。
这纯粹是装饰性的，单个字符保持不变。

要禁用此行为，请使用：

```json [settings]
{
  "buffer_font_features": {
    "calt": false // 禁用连字
  }
}
```

### 状态栏

```json [settings]
{
  // 是在行指示器中显示完整标签还是短标签
  //   - `short`: "2 s, 15 l, 32 c"
  //   - `long`: "2 selections, 15 lines, 32 characters"
  "line_indicator_format": "long"

  // 可以隐藏单个状态栏图标：
  // "project_panel": {"button": false },
  // "outline_panel": {"button": false },
  // "collaboration_panel": {"button": false },
  // "git_panel": {"button": false },
  // "notification_panel": {"button": false },
  // "agent": {"button": false },
  // "debugger": {"button": false },
  // "diagnostics": {"button": false },
  // "search": {"button": false },
}
```

### 标题栏

```json [settings]
  // 控制标题栏中显示/隐藏的项目
  "title_bar": {
    "show_branch_icon": false,      // 显示/隐藏分支切换器旁边的分支图标
    "show_branch_name": true,       // 显示/隐藏分支名称
    "show_project_items": true,     // 显示/隐藏项目主机和名称
    "show_onboarding_banner": true, // 显示/隐藏入门横幅
    "show_user_picture": true,      // 显示/隐藏用户头像
    "show_user_menu": true,         // 显示/隐藏应用用户按钮
    "show_sign_in": true,           // 显示/隐藏登录按钮
    "show_menus": false             // 显示/隐藏菜单
  },
```

## 工作区

```json [settings]
{
  // 强制使用 Zed 内置的��径提示（文件和目录选择器）
  // 而不是操作系统原生选择器 (false)。
  "use_system_path_prompts": true,
  // 强制使用 Zed 内置的确认提示 ("Do you want to save?")
  // 而不是操作系统原生提示 (false)。在 Linux 上此设置被忽略（始终为 false）。
  "use_system_prompts": true,

  // 活动面板样式设置。
  "active_pane_modifiers": {
    // 活动面板的内边框大小，以像素为单位。
    "border_size": 0.0,
    // 非活动面板的不透明度。0 表示透明，1 表示不透明。
    "inactive_opacity": 1.0
  },

  // 底部 dock 的布局模式：contained, full, left_aligned, right_aligned
  "bottom_dock_layout": "contained",

  // 调整 dock 大小时是否调整 dock 中所有面板的大小。
  // 可以是 "left", "right" 和 "bottom" 的组合。
  "resize_all_panels_in_dock": ["left"]
}
```

<!--
TBD: 居中布局相关设置
```json [settings]
    "centered_layout": {
    // 使用居中布局时，中央面板相对于工作区的左内边距的相对宽度。
    "left_padding": 0.2,
    // 使用居中布局时，中央面板相对于工作区的右内边距的相对宽度。
    "right_padding": 0.2
    },
```
-->

## 编辑器

```json [settings]
  // 是否在编辑器中光标闪烁。
  "cursor_blink": true,

  // 默认编辑器的光标形状：bar, block, underline, hollow
  "cursor_shape": null,

  // 在编辑器中突出显示当前行：none, gutter, line, all
  "current_line_highlight": "all",

  // 何时隐藏鼠标光标：never, on_typing, on_typing_and_movement
  "hide_mouse": "on_typing_and_movement",

  // 是否突出显示编辑器中所选文本的所有出现。
  "selection_highlight": true,

  // 视觉上显示制表符和空格 (none, all, selection, boundary, trailing)
  "show_whitespaces": "selection",
  "whitespace_map": { // 启用 `show_whitespaces` 时显示哪些字符
    "space": "•",
    "tab": "⟶"       // 使用 "→" 以获得更短的箭头
  },

  "unnecessary_code_fade": 0.3, // 淡出未使用代码的程度。

  // 在私有文件中从视觉显示中隐藏变量的值
  "redact_private_values": false,

  // 自动换行和标尺
  "soft_wrap": "none",          // none, editor_width, preferred_line_length, bounded
  "preferred_line_length": 80,  // 自动换位列
  "show_wrap_guides": true,     // 显示/隐藏换行指南（垂直标尺）
  "wrap_guides": [],            // 换行指南的位置（字符计数）

  // 侧边栏设置
  "gutter": {
    "line_numbers": true,         // 显示/隐藏侧边栏中的行号。
    "runnables": true,            // 显示/隐藏侧边栏中的可运行按钮。
    "breakpoints": true,          // 显示/隐藏侧边栏中的断点。
    "folds": true,                // 显示/隐藏侧边栏中的折叠按钮。
    "min_line_number_digits": 4   // 为 N 位数字的行号保留空间
  },
  "relative_line_numbers": "enabled", // 在侧边栏中显示相对行号

  // 缩进指南
  "indent_guides": {
    "enabled": true,
    "line_width": 1,                  // 指导线的宽度，以像素为单位 [1-10]
    "active_line_width": 1,           // 活动指导线的宽度，以像素为单位 [1-10]
    "coloring": "fixed",              // disabled, fixed, indent_aware
    "background_coloring": "disabled" // disabled, indent_aware
  },

  "sticky_scroll": {
    "enabled": false // 是否将作用域固定在编辑器顶部。默认为禁用。
  }
```

### Git Blame {#editor-blame}

```json [settings]
  "git": {
    "inline_blame": {
      "enabled": true,             // 显示/隐藏内联 blame
      "delay_ms": 0,                  // 延迟后显示 (ms)
      "min_column": 0,             // 内联显示 blame 的最小列
      "padding": 7,                // 代码和内联 blame 之间的填充 (em)
      "show_commit_summary": false // 显示/隐藏提交摘要
    },
    "hunk_style": "staged_hollow"  // staged_hollow, unstaged_hollow
  }
```

### 编辑器工具栏

```json [settings]
  // 编辑器工具栏相关设置
  "toolbar": {
    "breadcrumbs": true, // 是否显示面包屑导航。
    "quick_actions": true, // 是否显示快速操作按钮。
    "selections_menu": true, // 是否显示“选择”菜单
    "agent_review": true, // 是否显示代理审查按钮
    "code_actions": false // 是否显示代码操作按钮
  }
```

### 编辑器滚动条和 Minimap {#editor-scrollbar}

```json [settings]
  // 滚动条相关设置
  "scrollbar": {
    // 在编辑器中何时显示滚动条 (auto, system, always, never)
    "show": "auto",
    "cursors": true,          // 在滚动条中显示光标位置。
    "git_diff": true,         // 在滚动条中显示 git diff 指示器。
    "search_results": true,   // 在滚动条中显示缓冲区搜索结果。
    "selected_text": true,    // 在滚动条中显示所选文本的出现。
    "selected_symbol": true,  // 在滚动条中显示所选符号的出现。
    "diagnostics": "all",     // 显示诊断信息 (none, error, warning, information, all)
    "axes": {
      "horizontal": true,     // 显示/隐藏水平滚动条
      "vertical": true        // 显示/隐藏垂直滚动条
    }
  },

  // Minimap 相关设置
  "minimap": {
    "show": "never",                // 何时显示 (auto, always, never)
    "display_in": "active_editor",  // 在何处显示 (active_editor, all_editor)
    "thumb": "always",              // 何时显示缩略图 (always, hover)
    "thumb_border": "left_open",    // 缩略图边框 (left_open, right_open, full, none)
    "max_width_columns": 80,        // Minimap 的最大宽度
    "current_line_highlight": null  // 高亮显示当前行 (null, line, gutter)
  },

  // 控制编辑器滚动到最后一行之后：off, one_page, vertical_scroll_margin
  "scroll_beyond_last_line": "one_page",
  // 使用键盘滚动时在光标上方/下方保留的行数
  "vertical_scroll_margin": 3,
  // 使用鼠标滚动时在两侧保留的字符数
  "horizontal_scroll_margin": 5,
  // 滚动灵敏度乘数
  "scroll_sensitivity": 1.0,
  // 快速滚动的滚动灵敏度乘数（滚动时按住 alt）
  "fast_scroll_sensitivity": 4.0,
```

### 编辑器标签页

```json [settings]
  // 每个面板的最大标签页数。未设置则表示无限制。
  "max_tabs": null,

  // 自定义标签栏外观
  "tab_bar": {
    "show": true,                     // 显示/隐藏标签栏
    "show_nav_history_buttons": true, // 显示/隐藏标签栏上的历史按钮
    "show_tab_bar_buttons": true      // 显示/隐藏按钮（新建、分割、缩放）
  },
  "tabs": {
    "git_status": false,              // 显示 git 状态的颜色
    "close_position": "right",        // 关闭按钮位置 (left, right, hidden)
    "show_close_button": "hover",     // 关闭按钮显示方式 (hover, always, hidden)
    "file_icons": false,              // 显示文件类型的图标
    // 在文件图标中显示诊断信息 (off, errors, all)。需要 file_icons=true
    "show_diagnostics": "off"
  }
```

### 状态栏

```json [settings]
  "status_bar": {
    // 显示/隐藏一个显示活动缓冲区语言的按钮。
    // 点击该按钮会弹出语言选择器。
    // 默认为 true。
    "active_language_button": true,
    // 显示/隐藏一个显示光标位置的按钮。
    // 点击该按钮会弹出用于跳转到行和列的输入框。
    // 默认为 true。
    "cursor_position_button": true,
    // 显示/隐藏一个显示缓冲区行尾模式的按钮。
    // 点击该按钮会弹出行尾选择器。
    // 默认为 false。
    "line_endings_button": false,
    // 显示/隐藏一个显示缓冲区字符编码的按钮。
    // 如果设置为 "non_utf8"，则仅对无 BOM 的 UTF-8 隐藏该按钮。
    // 默认为 "non_utf8"。
    "active_encoding_button": "non_utf8"
  },
  "global_lsp_settings": {
    // 显示/隐藏状态栏中的 LSP 按钮。
    // LSP 的活动仍会显示。
    // 如果 "enable_language_server" 为 false，则不显示该按钮。
    "button": true
  },
```

### 多缓冲区

```json [settings]
{
  // 在多缓冲区中展开摘录的默认行数。
  "expand_excerpt_lines": 5,
  // 多缓冲区中为摘录提供的默认上下文行数。
  "excerpt_context_lines": 2
}
```

### 编辑器补全、代码片段、操作、诊断 {#editor-lsp}

```json [settings]
  "snippet_sort_order": "inline",        // 代码片段补全：top, inline, bottom, none
  "show_completions_on_input": true,     // 输入时显示补全
  "show_completion_documentation": true, // 在补全中显示文档
  "auto_signature_help": false,          // 在括号内显示方法签名

  // 是否在补全或括号对插入后显示签名帮助。
  // 如果 `auto_signature_help` 已启用，此设置也将被视为启用。
  "show_signature_help_after_edits": false,

  // 是否在缓冲区行首显示代码操作按钮。
  "inline_code_actions": true,

  // 用于过滤编辑器中显示的诊断信息的级别：
  "diagnostics_max_severity": null,      // off, error, warning, info, hint, null (全部)

  // 如何在编辑器中渲染 LSP `textDocument/documentColor` 颜色。
  "lsp_document_colors": "inlay",        // none, inlay, border, background
  // 何时在补全菜单中显示滚动条。
  "completion_menu_scrollbar": "never", // auto, system, always, never
  // 在编辑器中开启括号着色（可按语言配置）
  "colorize_brackets": true",
```

### 编辑预测 {#editor-ai}

```json [settings]
  "edit_predictions": {
    "mode": "eager",                // 自动显示 (eager) 或按住 alt (subtle)
    "enabled_in_text_threads": true // 在代理文本线程中显示/隐藏预测
  },
  "show_edit_predictions": true     // 在编辑器中显示/隐藏预测
```

### 编辑器内联提示

```json [settings]
{
  "inlay_hints": {
    "enabled": false,
    // 开关特定类型的提示，默认全部开启。
    "show_type_hints": true,
    "show_parameter_hints": true,
    "show_other_hints": true,

    // 是否为内联提示显示背景（主题 `hint.background`）
    "show_background": false, //

    // 编辑后等待多长时间再请求提示（0 表示禁用防抖）
    "edit_debounce_ms": 700,
    // 滚动后等待多长时间再请求提示（0 表示禁用防抖）
    "scroll_debounce_ms": 50,

    // 一组修饰键，按下后将切换内联提示的可见性。
    "toggle_on_modifiers_press": {
      "control": false,
      "shift": false,
      "alt": false,
      "platform": false,
      "function": false
    }
  }
}
```

## 文件查找器

```json [settings]
  // 文件查找器设置
  "file_finder": {
    "file_icons": true,         // 显示/隐藏文件图标
    "modal_max_width": "small", // 水平大小：small, medium, large, xlarge, full
    "include_ignored": null     // 结果中是否包含被 gitignore 的文件：true, false, null
  },
```

## 项目面板

项目面板可以通过 {#action project_panel::ToggleFocus} ({#kb project_panel::ToggleFocus}) 或 {#action pane::RevealInProjectPanel} ({#kb pane::RevealInProjectPanel}) 来显示/隐藏。

```json [settings]
  // 项目面板设置
  "project_panel": {
    "button": true,                 // 显示/隐藏状态栏中的按钮
    "default_width": 240,           // 默认面板宽度
    "dock": "left",                 // dock 的位置（left, right）
    "entry_spacing": "comfortable", // 垂直间距（comfortable, standard）
    "file_icons": true,             // 显示/隐藏文件图标
    "folder_icons": true,           // 显示/隐藏文件夹图标
    "git_status": true,             // 指示新/更新的文件
    "indent_size": 20,              // 每级缩进的像素数
    "auto_reveal_entries": true,    // 激活缓冲区时在面板中显示文件
    "auto_fold_dirs": true,         // 折叠包含单个子目录的目录
    "bold_folder_labels": false,    // 使用粗体文本显示文件夹名称
    "sticky_scroll": true,          // 将父目录固定在项目面板的顶部。
    "drag_and_drop": true,          // 是否启用拖放
    "scrollbar": {                  // 项目面板滚动条设置
      "show": null                  // 显示/隐藏：(auto, system, always, never)
    },
    "show_diagnostics": "all",      //
    // 项目面板中缩进指南的相关设置。
    "indent_guides": {
      // 在项目面板中何时显示缩进指南。(always, never)
      "show": "always"
    },
    // 条目的排序方式（directories_first, mixed, files_first）
    "sort_mode": "directories_first",
    // 当窗口中只有一个文件夹打开时，是否隐藏根条目；
    // 这也会影响文件查找器历史记录中文件路径的显示方式。
    "hide_root": false,
    // 是否在项目面板中隐藏隐藏的条目。
    "hide_hidden": false
  }
```

## 智能体面板

```json [settings]
{
  "agent": {
    "enabled": true, // 启用/禁用代理
    "button": true, // 显示/隐藏状态栏中的图标
    "dock": "right", // dock 的位置：left, right, bottom
    "default_width": 640, // 默认宽度（左/右 dock）
    "default_height": 320 // 默认高度（底部 dock）
  },
  // 控制智能体面板中代理响应的字体大小。
  // 如果未指定，则回退到 UI 字体大小。
  "agent_ui_font_size": 15,
  // 控制智能体面板的消息编辑器、用户消息和任何其他代码片段的字体大小。
  "agent_buffer_font_size": 12
}
```

有关其他非视觉 AI 设置，请参阅 [Zed AI 文档](./ai/overview.md)。

## 终端面板

```json [settings]
  // 终端面板设置
  "terminal": {
    "dock": "bottom",                   // dock 的位置：left, right, bottom
    "button": true,                     // 显示/隐藏状态栏图标
    "default_width": 640,               // 默认宽度（左/右 dock）
    "default_height": 320,              // 默认高度（底部 dock）

    // 设置终端中光标的闪烁行为 (on, off, terminal_controlled)
    "blinking": "terminal_controlled",
    // 终端光标的默认形状 (block, bar, underline, hollow)
    "cursor_shape": "block",

    // 添加到终端进程环境的变量
    "env": {
      // "KEY": "value"
    },

    // 终端滚动条
    "scrollbar": {
      "show": null                       // 显示/隐藏：(auto, system, always, never)
    },
    // 终端字体设置
    "font_family": "Fira Code",
    "font_size": 15,
    "font_weight": 400,
    // 终端行高：comfortable (1.618), standard(1.3) 或 `{ "custom": 2 }`
    "line_height": "comfortable",

    "max_scroll_history_lines": 10000,   // 滚动历史记录 (0=禁用, max=100000)
  }
```

有关其他非视觉自定义选项，请参阅 [终端设置](./reference/all-settings.md#terminal)。

### 其他面板

```json [settings]
  // Git 面板
  "git_panel": {
    "button": true,               // 显示/隐藏状态栏图标
    "dock": "left",               // dock 的位置：left, right
    "default_width": 360,         // Git 面板的默认宽度。
    "status_style": "icon",       // label_color, icon
    "sort_by_path": false,        // 按路径排序 (false) 或状态 (true) 排序
    "scrollbar": {
      "show": null                // 显示/隐藏：(auto, system, always, never)
    }
  },

  // 调试器面板
  "debugger": {
    "dock": "bottom",             // dock 的位置：left, right, bottom
    "button": true                // 显示/隐藏状态栏图标
  },

  // 大纲面板
  "outline_panel": {
    "button": true,               // 显示/隐藏状态栏图标
    "default_width": 300,         // Git 面板的默认宽度
    "dock": "left",               // dock 的位置：left, right
    "file_icons": true,           // 显示/隐藏文件图标
    "folder_icons": true,         // 为目录显示文件图标 (true)，显示箭头 (false)
    "git_status": true,           // 显示 git 状态
    "indent_size": 20,            // 嵌套项目的缩进（像素）
    "indent_guides": {
      "show": "always"            // 显示缩进指南 (always, never)
    },
    "auto_reveal_entries": true,  // 激活缓冲区时在面板中显示文件
    "auto_fold_dirs": true,       // 折叠包含单个子目录的目录
    "scrollbar": {                // 项目面板滚动条设置
      "show": null                // 显示/隐藏：(auto, system, always, never)
    }
  }
```

## 协作面板

```json [settings]
{
  // 协作面板
  "collaboration_panel": {
    "button": true, // 显示/隐藏状态栏图标
    "dock": "left", // dock 的位置：left, right
    "default_width": 240 // 协作面板的默认宽度。
  },
  "show_call_status_icon": true, // 在操作系统状态栏显示通话状态。

  // 通知面板
  "notification_panel": {
    // 是否在状态栏中显示通知面板按钮。
    "button": true,
    // 通知面板的 dock 位置。可以是 'left' 或 'right'。
    "dock": "right",
    // 通知面板的默认宽度。
    "default_width": 380
  }
}
```
