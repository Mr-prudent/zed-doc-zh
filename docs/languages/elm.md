---
title: Elm
description: "在 Zed 中配置 Elm 语言支持，包括语言服务器、格式化和调试。"
---

# Elm

Elm 支���通过 [Elm 扩展](https://github.com/zed-extensions/elm) 提供。

- Tree-sitter: [elm-tooling/tree-sitter-elm](https://github.com/elm-tooling/tree-sitter-elm)
- Language Server: [elm-tooling/elm-language-server](https://github.com/elm-tooling/elm-language-server)

## 设置

Zed 对 Elm 的支持需要安装 `elm`、`elm-format` 和 `elm-review`。

1. [安装 Elm](https://guide.elm-lang.org/install/elm.html) (或在 macOS 上运行 `brew install elm`)。
2. 安装 `elm-review` 以支持代码 lint：
   ```sh
   npm install elm-review --save-dev
   ```
3. 安装 `elm-format` 以支持自动格式化
   ```sh
   npm install -g elm-format
   ```

## 配置 `elm-language-server`

Elm 语言服务器可以在您的 `settings.json` 中进行配置，例如：

```json [settings]
{
  "lsp": {
    "elm-language-server": {
      "initialization_options": {
        "disableElmLSDiagnostics": true,
        "onlyUpdateDiagnosticsOnSave": false,
        "elmReviewDiagnostics": "warning"
      }
    }
  }
}
```

`elm-format`、`elm-review` 和 `elm` 需要安装并在环境中可用，或在设置中进行配置。请在此处查看[完整的服务器设置列表](https://github.com/elm-tooling/elm-language-server?tab=readme-ov-file#server-settings)。