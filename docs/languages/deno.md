---
title: Deno
description: "在 Zed 中配置 Deno 语言支持，包括语言服务器、格式化和调试。"
---

# Deno

Deno 支持通过 [Deno 扩展](https://github.com/zed-extensions/deno) 提供。

- 语言服务器：[Deno Language Server](https://docs.deno.com/runtime/manual/advanced/language_server/overview/)

## Deno 配置

要将 Deno 语言服务器与 TypeScript 和 TSX 文件一起使用，您可能希望禁用默认语言服务器并启用 Deno。

在“设置”({#kb zed::OpenSettings}) 中配置语言服务器和格式化程序，位于 “语言” > “JavaScript/TypeScript/TSX” 下，或者将其添加到您的设置文件中：

```json [settings]
{
  "lsp": {
    "deno": {
      "settings": {
        "deno": {
          "enable": true
        }
      }
    }
  },
  "languages": {
    "JavaScript": {
      "language_servers": [
        "deno",
        "!typescript-language-server",
        "!vtsls",
        "!eslint"
      ],
      "formatter": "language_server"
    },
    "TypeScript": {
      "language_servers": [
        "deno",
        "!typescript-language-server",
        "!vtsls",
        "!eslint"
      ],
      "formatter": "language_server"
    },
    "TSX": {
      "language_servers": [
        "deno",
        "!typescript-language-server",
        "!vtsls",
        "!eslint"
      ],
      "formatter": "language_server"
    }
  }
}
```

有关更多信息，请参阅 Zed 文档中的 [配置支持的语言](../configuring-languages.md)。

<!--
待定：Deno TypeScript REPL 说明 [docs/repl#typescript-deno](../repl.md#typescript-deno)
-->

## 配置自动补全

要为 `deno.json` 或 `package.json` 获取自动补全，请将其添加到您的设置文件中（[如何编辑](../configuring-zed.md#settings-files)）。更多详细信息，请参阅 [JSON](./json.md)。

```json [settings]
"lsp": {
    "json-language-server": {
      "settings": {
        "json": {
          "schemas": [
            {
              "fileMatch": [
                "deno.json",
                "deno.jsonc"
              ],
              "url": "https://raw.githubusercontent.com/denoland/deno/refs/heads/main/cli/schemas/config-file.v1.json"
            },
            {
              "fileMatch": [
                "package.json"
              ],
              "url": "https://www.schemastore.org/package"
            }
          ]
        }
      }
    }
  }
```

## DAP 支持

要调试 deno 程序，请将其添加到 `.zed/debug.json`

```json [debug]
[
  {
    "adapter": "JavaScript",
    "label": "Deno",
    "request": "launch",
    "type": "pwa-node",
    "cwd": "$ZED_WORKTREE_ROOT",
    "program": "$ZED_FILE",
    "runtimeExecutable": "deno",
    "runtimeArgs": ["run", "--allow-all", "--inspect-wait"],
    "attachSimplePort": 9229
  }
]
```

## 可运行支持

要从 UI 运行诸如测试之类的 deno 任务，请将其添加到 `.zed/tasks.json`

```json [tasks]
[
  {
    "label": "deno test",
    "command": "deno test -A '$ZED_FILE'",
    "tags": ["js-test"]
  }
]
```

## 另请参阅：

- [TypeScript](./typescript.md)
- [JavaScript](./javascript.md)