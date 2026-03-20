---
title: Vue
description: "在 Zed 中配置 Vue 语言支持，包括语言服务器、格式化和调试。"
---

# Vue

Vue 支持可通过 [Vue 扩展](https://github.com/zed-extensions/vue) 使用。

- Tree-sitter: [tree-sitter-grammars/tree-sitter-vue](https://github.com/tree-sitter-grammars/tree-sitter-vue)
- 语言服务器: [vuejs/language-tools](https://github.com/vuejs/language-tools)

## 初始化选项

### 指定 TypeScript SDK 的位置

默认情况下，此扩展假定您正在使用 `node_modules` 目录的项目中工作，并在该目录内搜索 TypeScript SDK。

但这并不总是正确的；例如，在使用 Yarn PnP 的项目中工作时，没有 `node_modules`。为了获得编辑器支持，[文档中记录](https://yarnpkg.com/getting-started/editor-sdks) 的方法是运行类似 `yarn dlx @yarnpkg/sdks` 的命令。在这种情况下，您可以在 Zed 设置中提供以下初始化选项：

```json
{
  "lsp": {
    "vue": {
      "initialization_options": {
        "typescript": {
          "tsdk": ".yarn/sdks/typescript/lib"
        }
      }
    }
  }
}
```

## 设置选项

`lsp.vue.settings` 会传递给 Vue 语言服务器（Volar / [`vuejs/language-tools`](https://github.com/vuejs/language-tools)）。默认情况下启用以下设置：

```json
{
  "lsp": {
    "vue": {
      "settings": {
        // 显示内联事件处理程序中 `$event` 参数的嵌入提示。
        "vue.inlayHints.inlineHandlerLeading": true,
        // 当模板中缺少必需的组件属性时显示提示。
        "vue.inlayHints.missingProps": true,
        // 显示围绕组件选项的模式的嵌入提示。
        "vue.inlayHints.optionsWrapper": true,
        // 显示与 `v-bind` 简写（`:`）相关的嵌入提示。
        "vue.inlayHints.vBindShorthand": true
      }
    }
  }
}
```

您可以在上游设置配置模式中找到更多信息 [`这里`](https://github.com/vuejs/language-tools/blob/ee5041d27940cf6f9a5150635d3b13140a9dff54/extensions/vscode/package.json#L252)。

> 注意：某些设置（例如 `vue.editor.focusMode`）可能不会生效。

## 在 Vue 中使用 Tailwind CSS 语言服务器

要在 Vue 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您需要配置语言服务器，使其知道在哪里查找 CSS 类。在 `settings.json` 中添加以下内容：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "vue": "html"
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            ":class=\"([^\"]*)\"",
            ":class='([^']*)'"
          ]
        }
      }
    }
  }
}
```

使用这些设置后，您将在 Vue 模板文件中获得 Tailwind CSS 类的自动补全功能。示例：

```vue
<template>
  <!-- 静态 class 属性 -->
  <div class="flex items-center <completion here>">
    <p class="text-lg font-bold <completion here>">Hello World</p>
  </div>

  <!-- 动态 class 绑定 -->
  <div
    :class="
      active ? 'bg-blue-500 <completion here>' : 'bg-gray-200 <completion here>'
    "
  >
    Content
  </div>

  <!-- 数组语法 -->
  <div :class="['flex', 'items-center', '<completion here>']">Content</div>

  <!-- 对象语法 -->
  <div
    :class="{
      'flex <completion here>': isFlex,
      'block <completion here>': isBlock,
    }"
  >
    Content
  </div>
</template>
```