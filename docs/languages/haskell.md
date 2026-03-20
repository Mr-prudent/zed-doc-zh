---
title: Haskell
description: "在 Zed 中配置 Haskell 语言支持，包括语言服务器、格式化和调试。"
---

# Haskell

Haskell 支持通过 [Haskell 扩展](https://github.com/zed-extensions/haskell) 提供。

- Tree-sitter: [tree-sitter-haskell](https://github.com/tree-sitter/tree-sitter-haskell)
- 语言服务器: [haskell-language-server](https://github.com/haskell/haskell-language-server)

## 安装 HLS

[安装 haskell-language-server](https://haskell-language-server.readthedocs.io/en/latest/installation.html) (HLS) 的推荐方法是使用 [ghcup](https://www.haskell.org/ghcup/install/) (`curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
`):

```sh
ghcup install hls
which haskell-language-server-wrapper
```

## 配置 HLS

如果您需要配置 haskell-language-server (hls)，您可以在 Zed 的 settings.json 中添加配置选项：

```json [settings]
{
  "lsp": {
    "hls": {
      "initialization_options": {
        "haskell": {
          "formattingProvider": "fourmolu"
        }
      }
    }
  }
}
```

有关更多选项，请参阅官方的 [haskell-language-server 配置](https://haskell-language-server.readthedocs.io/en/latest/configuration.html) 文档。

如果您想使用特定的 hls 二进制文件，或者使用 [static-ls](https://github.com/josephsumabat/static-ls) 作为直接替代品，您可以指定二进制文件路径和参数：

```json [settings]
{
  "lsp": {
    "hls": {
      "binary": {
        "path": "static-ls",
        "arguments": ["--experimentalFeatures"]
      }
    }
  }
}
```