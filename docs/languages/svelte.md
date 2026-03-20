---
title: Svelte
description: "在 Zed 中配置 Svelte 语言支持，包括语言服务器、格式化和调试。"
---

# Svelte

Svelte 支持可通过 [Svelte 扩展](https://github.com/zed-extensions/svelte) 使用。

- Tree-sitter: [tree-sitter-grammars/tree-sitter-svelte](https://github.com/tree-sitter-grammars/tree-sitter-svelte)
- 语言服务器: [sveltejs/language-tools](https://github.com/sveltejs/language-tools)

## 额外的主题样式配置

您可以修改某些样式（如指令和修饰符）在属性中的显示方式：

```json
"syntax": {
  // 指令的样式（例如 `class:foo` 或 `on:click`）（属性中的 `on` 或 `class` 部分）。
  "attribute.function": {
    "color": "#ff0000"
  },
  // 属性末尾的修饰符的样式，例如 `on:<click|preventDefault|stopPropagation>`
  "attribute.special": {
    "color": "#00ff00"
  }
}
```

## 内联提示 (Inlay Hints)

当 Zed 中启用了内联提示，为了让语言服务器发送它们回来，Zed 会设置以下初始化选项：

```json
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
    "suppressWhenTypeMatchesName": false
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
```

要覆盖这些设置，请使用以下方法：

```json [settings]
"lsp": {
  "svelte-language-server": {
    "initialization_options": {
      "configuration": {
        "typescript": {
          // ......
        },
        "javascript": {
          // ......
        }
      }
    }
  }
}
```

更多信息请参见 [TypeScript 语言服务器的 `package.json`](https://github.com/microsoft/vscode/blob/main/extensions/typescript-language-features/package.json)。

## 在 Svelte 中使用 Tailwind CSS 语言服务器

要在 Svelte 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您需要配置语言服务器，使其知道在哪里查找 CSS 类，将以下内容添加到您的 `settings.json` 中：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "svelte": "html"
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            "class:\\s*([^\\s{]+)",
            "\\{\\s*class:\\s*\"([^\"]*)\"",
            "\\{\\s*class:\\s*'([^']*)'"
          ]
        }
      }
    }
  }
}
```

通过这些设置，您将在 Svelte 文件中获得 Tailwind CSS 类的补全功能。例如：

```svelte
<!-- 标准 class 属性 -->
<div class="flex items-center <completion here>">
  <p class="text-lg font-bold <completion here>">Hello World</p>
</div>

<!-- Class 指令 -->
<button class:active="bg-blue-500 <completion here>">Click me</button>

<!-- 表达式 -->
<div class={active ? "flex <completion here>" : "hidden <completion here>"}>
  Content
</div>
```