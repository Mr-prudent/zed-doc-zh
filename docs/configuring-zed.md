---
title: 配置 Zed - 设置和偏好
description: 使用设置编辑器、JSON 文件和项目特定的覆盖配置 Zed。涵盖所有设置选项。
---

# 配置 Zed

本指南解释了 Zed 的设置系统是如何工作的，包括设置编辑器、JSON 配置文件和项目特定设置。

有关视觉自定义（主题、字体、图标），请参阅 [外观](./appearance.md)。

## 设置编辑器

**设置编辑器** ({#kb zed::OpenSettings}) 是配置 Zed 的主要方式。它提供了一个可搜索的界面，您可以在其中浏览可用的设置，查看它们的当前值并进行更改。

打开它：

- 按 {#kb zed::OpenSettings}
- 或从命令面板运行 `zed: open settings`

当您在搜索框中键入时，匹配的设置会显示其描述和修改它们的控件。更改会自动保存到您的设置文件中。

> **注意：** 并非所有设置都已在设置编辑器中提供。一些高级选项，如语言格式化程序，需要直接编辑 JSON 文件。

## 设置文件

### 用户设置

您的用户设置会全局应用于所有项目。使用 {#kb zed::OpenSettingsFile} 打开文件，或从命令面板运行 `zed: open settings file`。

文件位于：

- macOS: `~/.config/zed/settings.json`
- Linux: `~/.config/zed/settings.json`（或 `$XDG_CONFIG_HOME/zed/settings.json`）
- Windows: `%APPDATA%\Zed\settings.json`

语法是支持 `//` 注释的 JSON。

### 默认设置

要查看所有带有默认值的可用设置，请从命令面板运行 {#action zed::OpenDefaultSettings}。这将打开一个只读参考，您可以在编辑自己的设置时使用它。

### 项目设置

通过在项目根目录创建 `.zed/settings.json` 文件来覆盖特定项目的用户设置。运行 {#action zed::OpenProjectSettings} 来创建此文件。

项目设置仅对该项目优先于用户设置。

```json [settings]
// .zed/settings.json
{
  "tab_size": 2,
  "formatter": "prettier",
  "format_on_save": "on"
}
```

您还可以在子目录中添加设置文件，以进行更细粒度的控制。

**限制：** 并非所有设置都可以在项目级别设置。影响编辑器全局的设置（如 `theme` 或 `vim_mode`）仅在用户设置中有效。项目设置仅限于编辑器行为和语言工具选项，如 `tab_size`、`formatter` 和 `format_on_save`。

## 设置如何合并

设置按层应用：

1. **默认设置** — Zed 的内置默认值
2. **用户设置** — 您的全局偏好
3. **项目设置** — 项目特定的覆盖

后续层会覆盖前面的层。对于对象设置（如 `terminal`），属性会合并而不是完全替换。

## 每个发布频道覆盖

通过添加顶级频道密钥，为稳定版、预览版或每日构建使用不同的设置：

```json [settings]
{
  "theme": "One Dark",
  "vim_mode": false,
  "nightly": {
    "theme": "Rosé Pine",
    "vim_mode": true
  },
  "preview": {
    "theme": "Catppuccin Mocha"
  }
}
```

使用此配置：

- **稳定版** 使用 One Dark 并关闭 vim 模式
- **预览版** 使用 Catppuccin Mocha 并关闭 vim 模式
- **每日构建** 使用 Rosé Pine 并打开 vim 模式

在设置编辑器中进行的更改会应用于所有频道。

## 设置深度链接

Zed 支持深度链接，可以直接打开特定设置：

```
zed://settings/theme
zed://settings/vim_mode
zed://settings/buffer_font_size
```

这些对于共享配置技巧或从文档链接非常有用。

## 示例配置

```json [settings]
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  },
  "buffer_font_family": "JetBrains Mono",
  "buffer_font_size": 14,
  "tab_size": 2,
  "format_on_save": "on",
  "autosave": "on_focus_change",
  "vim_mode": false,
  "terminal": {
    "font_family": "JetBrains Mono",
    "font_size": 14
  },
  "languages": {
    "Python": {
      "tab_size": 4
    }
  }
}
```

## 接下来做什么

- [外观](./appearance.md) — 主题、字体和视觉自定义
- [键绑定](./key-bindings.md) — 自定义键盘快捷键
- [AI 配置](./ai/configuration.md) — 设置 AI 提供商、模型和代理设置
- [所有设置](./reference/all-settings.md) — 完整的设置参考