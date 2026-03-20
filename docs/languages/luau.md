---
title: Luau
description: "在 Zed 中配置 Luau 语言支持，包括语言服务器、格式化和调试。"
---

# Luau

[Luau](https://luau.org/) 是一种快速、小巧、安全、渐进式类型、可嵌入的脚本语言，源自 Lua。Luau 由 Roblox 开发，并根据 MIT 许可证提供。

Zed 中的 Luau 语言支持由社区维护的 [Luau 扩展](https://github.com/4teapo/zed-luau) 提供。
问题报告地址：[https://github.com/4teapo/zed-luau/issues](https://github.com/4teapo/zed-luau/issues)

- Tree-sitter: [4teapo/tree-sitter-luau](https://github.com/4teapo/tree-sitter-luau)
- 语言服务器: [JohnnyMorganz/luau-lsp](https://github.com/JohnnyMorganz/luau-lsp)

## 配置

配置说明可在 [Luau Zed 扩展 README](https://github.com/4teapo/zed-luau) 中找到。

## 格式化

为了支持自动格式化您的代码，您可以使用 [JohnnyMorganz/StyLua](https://github.com/JohnnyMorganz/StyLua)，这是一个 Lua 代码格式化工具。

安装方法：

```sh
# 通过 Homebrew 在 macOS 上安装
brew install stylua
# 或通过 Cargo 安装
cargo install stylua --features lua52,lua53,lua54,luau
```

在 设置 ({#kb zed::OpenSettings}) 的 语言 > Luau 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Luau": {
      "formatter": {
        "external": {
          "command": "stylua",
          "arguments": ["-"]
        }
      }
    }
  }
```