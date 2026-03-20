---
title: 主题 - Zed
description: 浏览、安装和创建 Zed 的主题。包含内置主题和社区主题扩展。
---

# 主题

Zed 附带了许多内置主题，还有更多主题可以作��扩展使用。

## 选择主题

通过主题选择器可以查看已安装的主题并预览它们，您可以通过命令面板中的 `theme selector: toggle`（绑定到 {#kb theme_selector::Toggle}）操作来打开它。

通过上下移动浏览主题列表会实时更改主题，按 Enter 键会将所选主题保存到您的设置文件中。

## 安装新主题

您可以在 Zed 的扩展商店中找到数百种不同的主题选项，您可以通过命令面板中的 `zed: extensions` 或 [Zed 网站](https://zed.dev/extensions?filter=themes) 访问它。

许多流行的主题已被移植到 Zed，如果您难以选择，请访问 [zed-themes.com](https://zed-themes.com)，这是一个第三方主题库，其中包含许多主题的可见预览。

## 构建您的主题

您可以使用 [Zed 的主题构建器](https://zed.dev/theme-builder) 在现有主题的基础上设计您自己的自定义主题。

此工具可让您微调和预览 Zed 应用程序中每个界面的外观。
然后，您可以将其 JSON 导出用于[本地使用](./themes.md#local-themes)或在 [Zed 的扩展商店中发布](./extensions/themes.md)。

## 配置主题

您选择的主题会存储在您的设置文件中。
您可以通过命令面板中的 {#action zed::OpenSettingsFile}（绑定到 {#kb zed::OpenSettingsFile}）打开您的设置文件。

默认情况下，Zed 维护两个主题：一个用于浅色模式，一个用于深色模式。
您可以将模式设置为 `"dark"` 或 `"light"` 以忽略当前系统模式。

```json [settings]
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  }
}
```

### 从键盘切换主题模式

使用 {#kb theme::ToggleMode} 在浅色和深色主题模式之间切换。

如果您的设置当前使用静态主题值，例如：

```json [settings]
{
  "theme": "Any Theme"
}
```

第一次切换会将其转换为使用默认主题的动态主题选择：

```json [settings]
{
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  }
}
```

第一次切换后，您需要手动设置 `light` 和 `dark` 主题。

之后，切换只会更新 `theme.mode`。
如果 `light` 和 `dark` 是同一个主题，那么在您为 `light` 和 `dark` 设置不同的值之前，第一次切换可能不会产生可见的 UI 变化。

## 主题覆盖

要覆盖主题的特定属性，请使用 `theme_overrides` 设置。
此设置可用于配置主题特定的覆盖。

例如，如果您想覆盖编辑器的背景颜色并将注释和文档注释显示为斜体，请将以下内容添加到您的 `settings.json` 中：

```json [settings]
{
  "theme_overrides": {
    "One Dark": {
      "editor.background": "#333",
      "syntax": {
        "comment": {
          "font_style": "italic"
        },
        "comment.doc": {
          "font_style": "italic"
        }
      },
      "accents": [
        "#ff0000",
        "#ff7f00",
        "#ffff00",
        "#00ff00",
        "#0000ff",
        "#8b00ff"
      ]
    }
  }
}
```

要查看捕获（如 `comment` 和 `comment.doc`）的完整列表，请参阅 [语言扩展：语法高亮](./extensions/languages.md#syntax-highlighting)。

要查看可用的主题属性列表，请查看您主题的 JSON 文件。
例如，默认的 One Dark 和 One Light 主题请查看 [assets/themes/one/one.json](https://github.com/zed-industries/zed/blob/main/assets/themes/one/one.json)。

## 本地主题 {#local-themes}

通过将新主题放置在 `~/.config/zed/themes` 目录（macOS 和 Linux）或 `%USERPROFILE%\AppData\Roaming\Zed\themes\`（Windows）中来本地存储它们。

例如，要创建一个名为 `my-cool-theme` 的新主题，请在该目录中创建一个名为 `my-cool-theme.json` 的文件。
下次 Zed 加载时，它将在主题选择器中可用。
```