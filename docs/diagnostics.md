---
title: 诊断信息 - Zed 中的错误和警告
description: 在 Zed 中查看和导航来自语言服务器的错误、警告和代码诊断信息。
---

# 诊断与快速修复

Zed 的诊断信息来源于语言服务器，并支持 LSP 的推送和拉取两种变体，这使得它与所有现有的语言服务器兼容。

# 常规诊断信息

默认情况下，Zed 在编辑器和滚动条中以带下划线的文本形式显示所有诊断信息。

可以使用

```json [设置]
"diagnostics_max_severity": null
```

编辑器设置来筛选编辑器中的诊断信息（可能的值：`"off"`（关闭）、`"error"`（错误）、`"warning"`（警告）、`"info"`（信息）、`"hint"`（提示）、`null`（默认，显示所有诊断信息））。

滚动条中的诊断信息由以下配置项控制：

```json [设置]
"scrollbar": {
  "diagnostics": "all",
}
```

（可能的值：`"none"`（无）、`"error"`（错误）、`"warning"`（警告）、`"information"`（信息）、`"all"`（全部，默认值））

将鼠标悬停在诊断信息上可以显示一个包含完整渲染诊断信息的工具提示。
或者，可以使用 `editor::GoToDiagnostic` 和 `editor::GoToPreviousDiagnostic` 在编辑器中导航诊断信息，当前活动的诊断信息会以弹出框的形式显示。

# 内联诊断信息（错误镜头）

Zed 支持在代码右侧以镜头（lens）的形式显示诊断信息。
此功能默认是禁用的，但可以通过编辑器菜单暂时开启（或关闭），或者通过以下配置永久启用：

```json [设置]
"diagnostics": {
  "inline": {
    "enabled": true,
    "max_severity": null, // 与编辑器设置中的 `diagnostics_max_severity` 取值相同
  }
}
```

# 其他用户界面位置

## 项目面板

项目面板中的条目可以根据文件中诊断信息的严重性进行着色。

要进行配置，请使用以下设置：

```json [设置]
"project_panel": {
  "show_diagnostics": "all",
}
```

（可能的值：`"off"`（关闭）、`"errors"`（仅错误）、`"all"`（全部，默认值））

## 编辑器标签页

与项目面板类似，编辑器标签页可以通过以下配置进行颜色标记：

```json [设置]
"tabs": {
  "show_diagnostics": "off",
}
```

（可能的值：`"off"`（关闭，默认值）、`"errors"`（仅错误）、`"all"`（全部））