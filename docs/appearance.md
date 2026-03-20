---
title: 外观与视觉定制 - Zed
description: 自定义 Zed 的主题、字体、图标、UI 密度和其他视觉设置，以符合您的偏好。
---

# 外观

自定义 Zed 的外观以符合您的偏好。本指南涵盖了主题、字体、图标和其他视觉设置。

有关设置系统工作方式的信息，请参阅 [所有设置](./reference/all-settings.md)。

## 5 分钟内自定义 Zed

以下是如何让 Zed 感觉像家的方法：

1. **选择一个主题**：按 {#kb theme_selector::Toggle} 打开主题选择器。使用方向键浏览列表以实时预览主题，然后按 Enter 应用。

2. **快速切换明/暗模式**：按 {#kb theme::ToggleMode}。如果您当前使用静态的 `"theme": "..."` 值，第一次切换会将其转换为使用默认主题的动态模式设置。

3. **选择图标主题**：从命令面板运行 `icon theme selector: toggle` 以浏览图标主题。

4. **设置您的字体**：使用 {#kb zed::OpenSettings} 打开设置编辑器，然后搜索 `buffer_font_family`。将其设置为您的首选编码字体。

5. **调整字体大小**：在同一个设置编辑器中，搜索 `buffer_font_size` 和 `ui_font_size` 来微调编辑器和界面文本大小。

就这些。您现在有了个性化的 Zed 设置。

## 主题

从扩展页面 ({#action zed::Extensions}) 安装主题，然后使用主题选择器 ({#kb theme_selector::Toggle}) 在它们之间切换。

Zed 支持为明暗模式使用不同的主题，并根据系统偏好自动切换：

```json [设置]
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  }
}
```

您还可以覆盖特定的主题属性以进行精细控制。

→ [主题文档](./themes.md)

## 图标主题

自定义项目面板和选项卡中的文件和文件夹图标。使用图标主题选择器（命令面板中的 `icon theme selector: toggle`）浏览可用的图标主题。

与颜色主题一样，图标主题也支持独立的明暗变体：

```json [设置]
{
  "icon_theme": {
    "mode": "system",
    "light": "Zed (Default)",
    "dark": "Zed (Default)"
  }
}
```

→ [图标主题文档](./icon-themes.md)

## 字体

Zed 使用三种字体设置用于不同上下文：

| 设置                   | 用途                     |
| ---------------------- | ------------------------ |
| `buffer_font_family`   | 编辑器文本               |
| `ui_font_family`       | 界面元素                 |
| `terminal.font_family` | [终端](./terminal.md)    |

示例配置：

```json [设置]
{
  "buffer_font_family": "JetBrains Mono",
  "buffer_font_size": 14,
  "ui_font_family": "Inter",
  "ui_font_size": 16,
  "terminal": {
    "font_family": "JetBrains Mono",
    "font_size": 14
  }
}
```

### 字体连字

要禁用字体连字：

```json [设置]
{
  "buffer_font_features": {
    "calt": false
  }
}
```

### 行高

使用 `buffer_line_height` 调整行间距：

- `"comfortable"` — 1.618 比例（默认）
- `"standard"` — 1.3 比例
- `{ "custom": 1.5 }` — 自定义比例

## UI 元素

Zed 提供了对 UI 元素的广泛控制，包括：

- **选项卡栏** — 显示/隐藏、导航按钮、文件图标、git 状态
- **状态栏** — 语言选择器、光标位置、行尾符
- **滚动条** — 可见性、git 差异指示器、搜索结果
- ** minimap** — 代码概览显示
- **Gutter** — 行号、折叠指示器、断点
- **面板** — 项目面板、终端、智能体面板的大小和停靠

→ [所有 UI 元素设置的视觉定制文档](./visual-customization.md)

## 接下来做什么

- [所有设置](./reference/all-settings.md) — 完整的设置参考
- [键绑定](./key-bindings.md) — 自定义键盘快捷键
- [Vim 模式](./vim.md) — 启用模态编辑
