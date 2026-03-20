---
title: 图标主题
description: "Zed 内置了一个图标主题，同时还有更多图标主题可以作为扩展使用。"
---

# 图标主题

Zed 内置了一个图标主题，同时还有更多图标主题可以作为扩展使用。

## 选择图标主题

通过图标主题选择器，您可以查看已安装的图标主题并进行预览。您可以通过命令面板中的 `icon theme selector: toggle` 来打开它。

在图标主题列表中上下导航将实时更改图标主题，按回车键即可将其保存到您的设置文件中。

## 安装更多图标主题

更多图标主题可以在扩展页面中找到，您可以通过命令面板中的 `zed: extensions` 或访问 [Zed 官网](https://zed.dev/extensions?filter=icon-themes) 来访问该页面。

## 配置图标主题

您选择的图标主题会存储在您的设置文件中。
您可以通过命令面板中的 {#action zed::OpenSettingsFile}（快捷键为 {#kb zed::OpenSettingsFile}）来打开您的设置文件。

与主题类似，Zed 允许为浅色模式和深色模式配置不同的图标主题。
您可以将模式设置为 `"light"` 或 `"dark"` 以忽略当前的系统模式。

```json [settings]
{
  "icon_theme": {
    "mode": "system",
    "light": "Light Icon Theme",
    "dark": "Dark Icon Theme"
  }
}
```

## 图标主题开发

参见：[开发 Zed 图标主题](./extensions/icon-themes.md)