---
title: GDScript
description: "在 Zed 中配置 GDScript 语言支持，包括语言服务器、格式化和调试。"
---

# GDScript

Zed 中的 Godot [GDScript](https://gdscript.com/) 语言支持由社区维护的 [GDScript 扩展](https://github.com/GDQuest/zed-gdscript) 提供。
问题反馈地址：[https://github.com/GDQuest/zed-gdscript/issues](https://github.com/GDQuest/zed-gdscript/issues)

- Tree-sitter: [PrestonKnopp/tree-sitter-gdscript](https://github.com/PrestonKnopp/tree-sitter-gdscript) 和 [PrestonKnopp/tree-sitter-godot-resource](https://github.com/PrestonKnopp/tree-sitter-godot-resource)
- Language Server: [gdscript-language-server](https://github.com/godotengine/godot)

## 先决条件

您需要：

- [Godot](https://godotengine.org/download/)。
- 系统的 PATH 中包含 netcat (`nc` 或 `ncat`)。

## 设置

1. 在您的 Godot 编辑器中，打开编辑器设置，找到 `Text Editor -> External` 并设置以下选项：
   - Exec Path: `/path/to/zed`
   - Exec Flags: `{project} {file}:{line}:{col}`
   - Use External Editor: "✅ 开启"
2. 通过 Godot 打开任何 \*.gd 文件，Zed 将会启动。

## 使用

当 Godot 运行时，GDScript 扩展将会连接到 Godot 运行时提供的语言服务器，并提供 `跳转到定义`、按住 Ctrl/cmd 时的悬停状态以及其他语言服务器功能。