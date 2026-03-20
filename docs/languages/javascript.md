---
title: JavaScript
description: "在 Zed 中配置 JavaScript 语言支持，包括语言服务器、格式化和调试。"
---

# JavaScript

Zed 原生支持 JavaScript。

- Tree-sitter: [tree-sitter/tree-sitter-javascript](https://github.com/tree-sitter/tree-sitter-javascript)
- 语言服务器: [yioneko/vtsls](https://github.com/yioneko/vtsls)
- 替代语言服务器: [typescript-language-server/typescript-language-server](https://github.com/typescript-language-server/typescript-language-server)
- 调试适配器: [vscode-js-debug](https://github.com/microsoft/vscode-js-debug)

## 代码格式化

默认情况下，Zed 会在保存时使用 TypeScript 内置的代码格式化功能来格式化 JavaScript。
但许多 JavaScript 项目使用其他命令行代码格式化工具，例如 [Prettier](https://prettier.io/)。
您可以在设置中为 JavaScript 指定一个 _外部_ 代码格式化工具来使用这些工具之一。
有关更多信息，请参阅[配置文档](../reference/all-settings.md)。

例如，如果您已安装 Prettier 并且它在您的 `PATH` 环境变量中，您可以使用它来格式化 JavaScript 文件。

在“设置”({#kb zed::OpenSettings}) 下的“语言”>“JavaScript”中配置格式化，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "JavaScript": {
      "formatter": {
        "external": {
          "command": "prettier",
          "arguments": ["--stdin-filepath", "{buffer_path}"]
        }
      }
    }
  }
}
```

## JSX

Zed 开箱即用地支持 JSX 语法高亮。

在 JSX 字符串中，使用 [`tailwindcss-language-server`](./tailwindcss.md) 来提供 Tailwind CSS 类的自动补全。

## JSDoc

Zed 支持 JavaScript 和 TypeScript 注释中符合 JSDoc 语法的 JSDoc。
Zed 使用 [tree-sitter/tree-sitter-jsdoc](https://github.com/tree-sitter/tree-sitter-jsdoc) 来解析和突出显示 JSDoc。

## ESLint

您可以通过在格式化时运行 ESLint 代码操作来配置 Zed 使用 `eslint --fix` 格式化代码。

在“设置”({#kb zed::OpenSettings}) 下的“语言”>“JavaScript”中配置格式化时的代码操作，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```
在使用 `fixAll` 时，您也可以只执行单个 ESLint 规则：

```json [settings]
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  },
  "lsp": {
    "eslint": {
      "settings": {
        "codeActionOnSave": {
          "rules": ["import/order"]
        }
      }
    }
  }
}
```

> **注意：** 您配置的其他格式化器仍将在 ESLint 之后运行。
> 因此，如果您的语言服务器或 Prettier 配置没有按照 ESLint 的规则进行格式化，
> 那么它们将覆盖 ESLint 修复的内容，最终导致错误。

如果您**只想**在保存时运行 ESLint，您可以将代码操作配置为格式化器。

在“设置”({#kb zed::OpenSettings}) 下的“语言”>“JavaScript”中配置，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "JavaScript": {
      "formatter": [],
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```

### 配置 ESLint 的 `nodePath`：

您可以配置 ESLint 的 `nodePath` 设置：

```json [settings]
{
  "lsp": {
    "eslint": {
      "settings": {
        "nodePath": ".yarn/sdks"
      }
    }
  }
}
```

### 配置 ESLint 的 `problems`：

您可以配置 ESLint 的 `problems` 设置。

例如，以下是设置 `problems.shortenToSingleLine` 的方法：

```json [settings]
{
  "lsp": {
    "eslint": {
      "settings": {
        "problems": {
          "shortenToSingleLine": true
        }
      }
    }
  }
}
```

### 配置 ESLint 的 `rulesCustomizations`：

您可以配置 ESLint 的 `rulesCustomizations` 设置：

```json [settings]
{
  "lsp": {
    "eslint": {
      "settings": {
        "rulesCustomizations": [
          // 将所有 eslint 错误/警告显示为警告
          { "rule": "*", "severity": "warn" }
        ]
      }
    }
  }
}
```

### 配置 ESLint 的 `workingDirectory`：

您可以配置 ESLint 的 `workingDirectory` 设置：

```json [settings]
{
  "lsp": {
    "eslint": {
      "settings": {
        "workingDirectory": {
          "mode": "auto"
        }
      }
    }
  }
}
```

## 在 JavaScript 中使用 Tailwind CSS 语言服务器

为了在纯 JavaScript 文件 (`.js`) 中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您可以在 `settings.json` 中自定义其下的 `classRegex` 字段：

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

## 调试

Zed 使用 `vscode-js-debug` 开箱即用地支持 JavaScript 代码调试。
以下内容无需编写额外配置即可进行调试：

- 来自 `package.json` 的任务
- 使用几种流行框架编写的测试（Jest, Mocha, Vitest, Jasmine, Bun, Node）

运行 {#action debugger::Start} ({#kb debugger::Start}) 以查看这些预定义调试任务的上下文列表。

> **注意：** 当 `package.json` 中存在 `@types/bun` 时，Bun 测试会自动被检测到。

> **注意：** 当 `package.json` 中存在 `@types/node` 时，Node 测试会自动被检测到（需要 Node.js 20+）。

与所有语言一样，来自 `.vscode/launch.json` 的配置也可用于在 Zed 中调试。

如果您的用例未被上述任何一项涵盖，您可以通过向 `.zed/debug.json` 添加调试配置来完全掌控。请参阅下面的示例配置。

### 配置 JavaScript 调试任务

JavaScript 调试比其他语言更复杂，因为它有两个不同的环境：Node.js 和浏览器。`vscode-js-debug` 暴露了一个 `type` 字段，您可以使用它来指定环境，无论是 `node` 还是 `chrome`。

- [vscode-js-debug 配置文档](https://github.com/microsoft/vscode-js-debug/blob/main/OPTIONS.md)

### 使用 Node 调试当前文件

```json [debug]
[
  {
    "adapter": "JavaScript",
    "label": "调试 JS 文件",
    "type": "node",
    "request": "launch",
    "program": "$ZED_FILE",
    "skipFiles": ["<node_internals>/**"]
  }
]
```

### 在 Chrome 中启动 Web 应用

```json [debug]
[
  {
    "adapter": "JavaScript",
    "label": "在 Chrome 中调试应用",
    "type": "chrome",
    "request": "launch",
    "file": "$ZED_WORKTREE_ROOT/index.html",
    "webRoot": "$ZED_WORKTREE_ROOT",
    "console": "integratedTerminal",
    "skipFiles": ["<node_internals>/**"]
  }
]
```

## 另请参阅

- [Yarn 文档](./yarn.md) 了解如何配置您的项目以使用 Yarn。
- [TypeScript 文档](./typescript.md)