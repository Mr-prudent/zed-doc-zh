---
title: Erlang
description: "在 Zed 中配置 Erlang 语言支持，包括语言服务器、格式化和调试。"
---

# Erlang

Erlang 支持可通过 [Erlang 扩展](https://github.com/zed-extensions/erlang) 使用。

- Tree-sitter: [WhatsApp/tree-sitter-erlang](https://github.com/WhatsApp/tree-sitter-erlang)
- 语言服务器：
  - [erlang-ls/erlang_ls](https://github.com/erlang-ls/erlang_ls)
  - [WhatsApp/erlang-language-platform](https://github.com/WhatsApp/erlang-language-platform)

## 选择语言服务器

Erlang 扩展为 `erlang_ls` 和 `erlang-language-platform` 提供语言服务器支持。

默认启用 `erlang_ls`。

在设置 ({#kb zed::OpenSettings}) 中的“语言” > “Erlang”下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Erlang": {
      "language_servers": ["elp", "!erlang-ls", "..."]
    }
  }
}
```

## 另请参阅：

- [Elixir](./elixir.md)
- [Gleam](./gleam.md)