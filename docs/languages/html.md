---
title: HTML
description: "在 Zed 中配置 HTML 语言支持，包括语言服务器、格式化和调试。"
---

# HTML

HTML 支持可通过 [HTML 扩展](https://github.com/zed-industries/zed/tree/main/extensions/html) 获得。

- Tree-sitter: [tree-sitter/tree-sitter-html](https://github.com/tree-sitter/tree-sitter-html)
- 语言服务器: [microsoft/vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice)

该扩展会自动安装，但如果您不想使用它，可以将其添加到您的设置中：

```json [settings]
{
  "auto_install_extensions": {
    "html": false
  }
}
```

## 格式化

默认情况下，Zed 使用 [Prettier](https://prettier.io/) 进行 HTML 格式化。

在“设置”({#kb zed::OpenSettings}) 中于“语言” > “HTML”下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "HTML": {
      "format_on_save": "off",
    }
  }
```

您仍然可以通过 {#kb editor::Format} 手动触发格式化，或通过打开[命令面板](..//getting-started.md#command-palette) ({#kb command_palette::Toggle}) 并选择“格式化文档”。

### LSP 格式化

要使用 `vscode-html-language-server` 语言服务器的自动格式化功能而不是 Prettier，请在“设置”({#kb zed::OpenSettings}) 中于“语言” > “HTML”下配置格式化程序，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "HTML": {
      "formatter": "language_server",
    }
  }
```

您可以通过 Zed 的 `settings.json` 为 `vscode-html-language-server` 自定义各种[格式化选项](https://code.visualstudio.com/docs/languages/html#_formatting)：

```json [settings]
  "lsp": {
    "vscode-html-language-server": {
      "settings": {
        "html": {
          "format": {
            // 在 <html> 和 <head> 下缩进（默认：false）
            "indentInnerHtml": true,
            // 禁止在 <svg> 或 <script> 内部格式化
            "contentUnformatted": "svg,script",
            // 在 <div> 和 <p> 前添加一个额外的换行
            "extraLiners": "div,p"
          }
        }
      }
    }
  }
```

## 在 HTML 中使用 Tailwind CSS 语言服务器

要在 HTML 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您需要配置语言服务器，使其知道在哪里查找 CSS 类。将以下内容添加到您的 `settings.json` 中：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "experimental": {
          "classRegex": ["class=\"([^\"]*)\""]
        }
      }
    }
  }
}
```

通过这些设置，您将在 HTML 的 `class` 属性中获得 Tailwind CSS 类的自动补全。示例如下：

```html
<div class="flex items-center <completion here>">
  <p class="text-lg font-bold <completion here>">Hello World</p>
</div>
```

## 另请参阅

- [CSS](./css.md)
- [JavaScript](./javascript.md)
- [TypeScript](./typescript.md)