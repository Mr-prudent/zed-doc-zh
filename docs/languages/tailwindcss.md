---
title: Tailwind CSS
description: "在 Zed 中配置 Tailwind CSS 语言支持，包括语言服务器、格式化和调试功能。"
---

# Tailwind CSS

Zed 内置了对 Tailwind CSS 的自动补全、代码检查和悬停预览功能的支持。

- 语言服务器：[tailwindlabs/tailwindcss-intellisense](https://github.com/tailwindlabs/tailwindcss-intellisense)

在 Zed 中可以与 Tailwind CSS 一起使用的语言：

- [Astro](./astro.md#using-the-tailwind-css-language-server-with-astro)
- [CSS](./css.md)
- [ERB](./ruby.md#using-the-tailwind-css-language-server-with-ruby)
- [Gleam](./gleam.md)
- [HEEx](./elixir.md#using-the-tailwind-css-language-server-with-heex)
- [HTML](./html.md#using-the-tailwind-css-language-server-with-html)
- [TypeScript](./typescript.md#using-the-tailwind-css-language-server-with-typescript)
- [JavaScript](./javascript.md#using-the-tailwind-css-language-server-with-javascript)
- [PHP](./php.md#using-the-tailwind-css-language-server-with-php)
- [Svelte](./svelte.md#using-the-tailwind-css-language-server-with-svelte)
- [Vue](./vue.md#using-the-tailwind-css-language-server-with-vue)

## 配置

如果默认的语言服务器不足以让 Tailwind 在特定语言中正常工作，你可以配置语言服务器设置，并将它们添加到 `settings.json` 文件的 `lsp` 部分：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "classFunctions": ["cva", "cx"],
        "experimental": {
          "classRegex": ["[cls|className]\\s\\:\\=\\s\"([^\"]*)"]
        }
      }
    }
  }
}
```

有关更多信息，请参阅 [Tailwind CSS 语言服务器设置文档](https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#extension-settings)。

### 在 CSS 文件中使用 Tailwind CSS 模式

Zed 包含对 Tailwind CSS 语言模式的支持，即使在使用 `@apply`、`@layer` 和 `@theme` 等 Tailwind 特定的 at-rules 时，也能提供完整的 CSS IntelliSense 支持。
在设置 ({#kb zed::OpenSettings}) 中的“语言”>“CSS”下配置语言服务器，或将其添加到你的设置文件中：

```json [settings]
{
  "languages": {
    "CSS": {
      "language_servers": [
        "tailwindcss-intellisense-css",
        "!vscode-css-language-server",
        "..."
      ]
    }
  }
}
```

`tailwindcss-intellisense-css` 语言服务器是默认 CSS 语言服务器的替代方案，它保留了所有标准的 CSS IntelliSense 功能，同时增加了对 Tailwind 特定语法的支持。

### Prettier 插件

Zed 开箱即用地支持 Prettier，这意味着如果你安装了 [Tailwind CSS Prettier 插件](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)，只需将其添加到你的 Prettier 配置中即可自动使用：

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```