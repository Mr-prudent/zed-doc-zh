---
title: TypeScript
description: "在 Zed 中配置 TypeScript 语言支持，包括语言服务器、格式化和调试。"
---

# TypeScript

TypeScript 和 TSX 支持在 Zed 中原生可用。

- Tree-sitter: [tree-sitter/tree-sitter-typescript](https://github.com/tree-sitter/tree-sitter-typescript)
- 语言服务器: [yioneko/vtsls](https://github.com/yioneko/vtsls)
- 备用语言服务器: [typescript-language-server/typescript-language-server](https://github.com/typescript-language-server/typescript-language-server)
- 调试适配器: [vscode-js-debug](https://github.com/microsoft/vscode-js-debug)

<!--
待定：记录不同语言服务器之间的区别
-->

## 语言服务器

默认情况下，Zed 对 TypeScript、TSX 和 JavaScript 文件使用 [vtsls](https://github.com/yioneko/vtsls)。
在“设置”（{#kb zed::OpenSettings}）中的“语言” > “TypeScript/TSX/JavaScript”下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "TypeScript": {
      "language_servers": ["typescript-language-server", "!vtsls", "..."]
    },
    "TSX": {
      "language_servers": ["typescript-language-server", "!vtsls", "..."]
    },
    "JavaScript": {
      "language_servers": ["typescript-language-server", "!vtsls", "..."]
    }
  }
}
```

默认情况下，Prettier 也会用于 TypeScript 文件。要禁用它，请在“设置”（{#kb zed::OpenSettings}）中的“语言” > “TypeScript”下进行配置，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "TypeScript": {
      "prettier": { "allowed": false }
    }
    //...
  }
}
```

## 在 TypeScript 中使用 Tailwind CSS 语言服务器

要在普通的 TypeScript 文件（`.ts`）中获得来自 [Tailwind CSS language server](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您可以在 `settings.json` 中自定义其下的 `classRegex` 字段：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "experimental": {
          "classRegex": [
            "\\.className\\s*[+]?=\\s*['\"]([^'\"]*)['\"]",
            "\\.setAttributeNS\\(.*,\\s*['\"]class['\"],\\s*['\"]([^'\"]*)['\"]",
            "\\.setAttribute\\(['\"]class['\"],\\s*['\"]([^'\"]*)['\"]",
            "\\.classList\\.add\\(['\"]([^'\"]*)['\"]",
            "\\.classList\\.remove\\(['\"]([^'\"]*)['\"]",
            "\\.classList\\.toggle\\(['\"]([^'\"]*)['\"]",
            "\\.classList\\.contains\\(['\"]([^'\"]*)['\"]",
            "\\.classList\\.replace\\(\\s*['\"]([^'\"]*)['\"]",
            "\\.classList\\.replace\\([^,)]+,\\s*['\"]([^'\"]*)['\"]"
          ]
        }
      }
    }
  }
}
```

## 大型项目

在非常大的项目中，`vtsls` 可能会耗尽内存。我们将默认限制设置为 8092（8 GiB），而不是默认的 3072，但这可能对您来说还不够：

```json [settings]
{
  "lsp": {
    "vtsls": {
      "settings": {
        // 对于 TypeScript:
        "typescript": { "tsserver": { "maxTsServerMemory": 16184 } },
        // 对于 JavaScript:
        "javascript": { "tsserver": { "maxTsServerMemory": 16184 } }
      }
    }
  }
}
```

## 内联提示 (Inlay Hints)

Zed 设置了以下初始化选项，以便让语言服务器返回内联提示（即，当 Zed 在设置中启用了内联提示时）。

使用 `typescript-language-server` 时，您可以在 Zed 的 `settings.json` 中覆盖这些设置：

```json [settings]
{
  "lsp": {
    "typescript-language-server": {
      "initialization_options": {
        "preferences": {
          "includeInlayParameterNameHints": "all",
          "includeInlayParameterNameHintsWhenArgumentMatchesName": true,
          "includeInlayFunctionParameterTypeHints": true,
          "includeInlayVariableTypeHints": true,
          "includeInlayVariableTypeHintsWhenTypeMatchesName": true,
          "includeInlayPropertyDeclarationTypeHints": true,
          "includeInlayFunctionLikeReturnTypeHints": true,
          "includeInlayEnumMemberValueHints": true
        }
      }
    }
  }
}
```

有关更多信息，请参阅 [typescript-language-server 内联提示文档](https://github.com/typescript-language-server/typescript-language-server?tab=readme-ov-file#inlay-hints-textdocumentinlayhint)。

当使用 `vtsls` 时：

```json [settings]
{
  "lsp": {
    "vtsls": {
      "settings": {
        // 对于 JavaScript:
        "javascript": {
          "inlayHints": {
            "parameterNames": {
              "enabled": "all",
              "suppressWhenArgumentMatchesName": false
            },
            "parameterTypes": {
              "enabled": true
            },
            "variableTypes": {
              "enabled": true,
              "suppressWhenTypeMatchesName": true
            },
            "propertyDeclarationTypes": {
              "enabled": true
            },
            "functionLikeReturnTypes": {
              "enabled": true
            },
            "enumMemberValues": {
              "enabled": true
            }
          }
        },
        // 对于 TypeScript:
        "typescript": {
          "inlayHints": {
            "parameterNames": {
              "enabled": "all",
              "suppressWhenArgumentMatchesName": false
            },
            "parameterTypes": {
              "enabled": true
            },
            "variableTypes": {
              "enabled": true,
              "suppressWhenTypeMatchesName": true
            },
            "propertyDeclarationTypes": {
              "enabled": true
            },
            "functionLikeReturnTypes": {
              "enabled": true
            },
            "enumMemberValues": {
              "enabled": true
            }
          }
        }
      }
    }
  }
}
```

## 调试

Zed 使用 `vscode-js-debug` 开箱即用地支持调试 TypeScript 代码。
无需编写额外配置即可调试以下内容：

- 来自 `package.json` 的任务
- 使用几种流行框架（Jest、Mocha、Vitest、Jasmine、Bun、Node）编写的测试

运行 {#action debugger::Start} ({#kb debugger::Start}) 以查看这些预定义调试任务的上下文列表。

> **注意：** 当 `package.json` 中存在 `@types/bun` 时，Bun 测试会被自动检测。

> **注意：** 当 `package.json` 中存在 `@types/node` 时，Node 测试会被自动检测（需要 Node.js 20+）。

与所有语言一样，来自 `.vscode/launch.json` 的配置也可用于在 Zed 中进行调试。

如果您的用例未被上述任何一项涵盖，您可以通过向 `.zed/debug.json` 添加调试配置来完全控制。请参阅下面的示例配置。

### 配置 JavaScript 调试任务

JavaScript 调试比其他语言更复杂，因为它有两种不同的环境：Node.js 和浏览器。`vscode-js-debug` 暴露了一个 `type` 字段，您可以使用它来指定环境，即 `node` 或 `chrome`。

- [vscode-js-debug 配置文档](https://github.com/microsoft/vscode-js-debug/blob/main/OPTIONS.md)

### 将调试器附加到在 Web 浏览器中运行的服务器（`npx serve`）

对于在外部运行的网络服务器（例如，使用 `npx serve` 或 `npx live-server`），可以附加到它并用浏览器打开它。

```json [debug]
[
  {
    "label": "启动 Chrome (TypeScript)",
    "adapter": "JavaScript",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:5500",
    "program": "$ZED_FILE",
    "webRoot": "${ZED_WORKTREE_ROOT}",
    "build": {
      "command": "npx",
      "args": ["tsc"]
    },
    "skipFiles": ["<node_internals>/**"]
  }
]
```

## 另请参阅

- 有关将项目配置为使用 Yarn的详细说明，请参阅 [Zed Yarn 文档](./yarn.md)。
- [Zed Deno 文档](./deno.md)