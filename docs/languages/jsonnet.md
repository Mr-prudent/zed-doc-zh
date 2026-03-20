---
title: Jsonnet
description: "配置 Zed 中的 Jsonnet 语言支持，包括语言服务器、格式化和调试。"
---

# Jsonnet

Zed 中的 Jsonnet 语言支持由社区维护的 [Jsonnet 扩展](https://github.com/narqo/zed-jsonnet) 提供。

- Tree-sitter: [sourcegraph/tree-sitter-jsonnet](https://github.com/sourcegraph/tree-sitter-jsonnet)
- 语言服务器: [grafana/jsonnet-language-server](https://github.com/grafana/jsonnet-language-server)

## 配置

工作区配置选项可以通过 `settings.json` 中的 `lsp` 设置传递给语言服务器。

以下示例配置 `jsonnet-language-server` 以解析 [tanka](https://tanka.dev) 的导入路径：

```json [settings]
{
  "lsp": {
    "jsonnet-language-server": {
      "settings": {
        "resolve_paths_with_tanka": true // 使用 tanka 解析路径
      }
    }
  }
}
```