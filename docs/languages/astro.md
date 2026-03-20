---
title: Astro
description: "在 Zed 中配置 Astro 语言支持，包括语言服务器、格式化和调试。"
---

# Astro

Astro 支持可通过 [Astro 扩展](https://github.com/zed-extensions/astro) 使用。

- Tree-sitter: [virchau13/tree-sitter-astro](https://github.com/virchau13/tree-sitter-astro)
- 语言服务器: [withastro/language-tools](https://github.com/withastro/astro/tree/main/packages/language-tools/language-server)

## 在 Astro 中使用 Tailwind CSS 语言服务器

要在 Astro 文件中获取 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您需要配置语言服务器，使其知道在哪里查找 CSS 类。将以下内容添加到您的 `settings.json` 中：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "astro": "html"
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            "class:list=\"{([^}]*)}\"",
            "class:list='{([^}]*)}'"
          ]
        }
      }
    }
  }
}
```

通过这些设置，您将在 Astro 模板文件中获得 Tailwind CSS 类的自动补全。示例：

```astro
---
const active = true;
---

<!-- 标准 class 属性 -->
<div class="flex items-center <此处补全>">
  <p class="text-lg font-bold <此处补全>">Hello World</p>
</div>

<!-- class:list 指令 -->
<div class:list={["flex", "items-center", "<此处补全>"]}>
  内容
</div>

<!-- 条件类 -->
<div class:list={{ "flex <此处补全>": active, "hidden <此处补全>": !active }}>
  内容
</div>
```