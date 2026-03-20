---
title: JSON
description: "在 Zed 中配置 JSON 语言支持，包括语言服务器、格式化和调试。"
---

# JSON

Zed 原生支持 JSON。

- Tree-sitter: [tree-sitter/tree-sitter-json](https://github.com/tree-sitter/tree-sitter-json)
- 语言服务器: [zed-industries/json-language-server](https://github.com/zed-industries/json-language-server)

## JSONC

Zed 也支持 JSON 的超集——JSONC，它允许在 JSON 文件中使用单行注释 (`//`)。
在编辑这些文件时，你可以使用 `cmd-/` (macOS) 或 `ctrl-/` (Linux) 来切换当前行或选中部分的注释。

## JSONC Prettier 格式化

当使用 `Format Document` 或启用了 `format_on_save` 时，如果你使用的是 `*.jsonc` 扩展名的文件，Zed 会调用 Prettier 作为格式化工具。Prettier 存在一个[已知问题](https://github.com/prettier/prettier/issues/15956)，它会给具有 `jsonc` 扩展名的文件添加尾随逗号。扩展名为 `.json` 的 JSONC 文件不受影响。

要解决此问题，你可以将以下内容添加到你的 `.prettierrc` 配置文件中：

```json
{
  "overrides": [
    {
      "files": ["*.jsonc"],
      "options": {
        "parser": "json",
        "trailingComma": "none"
      }
    }
  ]
}
```

## JSON 语言服务器

Zed 开箱即用地支持对 `package.json` 和 `tsconfig.json` 文件进行 JSON Schema 验证，但 `json-language-server` 可以使用项目文件、[JSON Schema Store](https://www.schemastore.org) 或其他公开可用的 URL 中的 JSON Schema 定义来进行 JSON 验证。

### 内联 Schema 规范

要与 JSON 文件内联指定 schema，请添加一个顶层 `$schema` 键，该键链接到你的 JSON schema 文件。

例如，为与 [lua-language-server](https://github.com/LuaLS/lua-language-server/) 一起使用的 `.luarc.json` 文件：

```json
{
  "$schema": "https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4"
}
```

### 通过设置指定 Schema

你可以在语言服务器设置中使用相对路径将 JSON Schema 与文件路径关联起来。Zed 会解析相对于项目根目录的路径：

```json [settings]
"lsp": {
  "json-language-server": {
    "settings": {
      "json": {
        "schemas": [
          {
            "fileMatch": ["config/*.json"],
            "url": "./schemas/custom-schema.json"
          },
          {
            "fileMatch": ["*.config.json"],
            "url": "~/global-schemas/shared.json"
          },
          {
            "fileMatch": ["*/*.luarc.json"],
            "url": "https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json"
          }
        ]
      }
    }
  }
}
```

以 `./` 开头的路径会相对于工作树根目录进行解析。以 `~/` 开头的路径会展开到你的主目录。

你也可以通过在你的 Zed settings.json 中指定它们，将任何[受支持设置](https://github.com/Microsoft/vscode/blob/main/extensions/json-language-features/server/README.md#settings)传递给 json-language-server：

<!--
TBD: 添加格式化工具 (prettier) 设置 (自动格式化、tab_size 等)
-->