---
title: Semantic Tokens and Syntax Highlighting - Zed
description: 在 Zed 中启用和配置语义标记以获得更丰富、语言服务器感知的语法着色。
---

# 语义标记 (Semantic Tokens)

语义标记通过使用语言服务器的信息提供更丰富的语法高亮。与纯粹基于语法的 tree-sitter 高亮不同，语义标记理解代码的含义——区分局部变量和参数，或类定义和类引用。

## 启用语义标记

语义标记由 `semantic_tokens` 设置控制。默认情况下，语义标记是禁用的。

```json [settings]
{
  "semantic_tokens": "combined"
}
```

此设置接受三个值：

| 值        | 描述                                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"off"`      | 不向语言服务器请求语义标记。仅使用 tree-sitter 高亮。（默认）                                                                                                                                         |
| `"combined"` | 将 LSP 语义标记与 tree-sitter 高亮结合使用。Tree-sitter 提供基础高亮，语义标记则覆盖额外信息。                                                                                                                   |
| `"full"`     | 仅使用 LSP 语义标记。对于支持语义标记的缓冲区，完全禁用 tree-sitter 高亮。                                                                                                                         |

您可以全局配置或按语言配置：

```json [settings]
{
  "semantic_tokens": "off",
  "languages": {
    "Rust": {
      "semantic_tokens": "combined"
    },
    "TypeScript": {
      "semantic_tokens": "full"
    }
  }
}
```

> **注意：** 更改 `semantic_tokens` 模式可能需要重启语言服务器才能生效。如果高亮没有立即更新，请从命令面板使用 `lsp: restart language servers` 命令。

## 自定义标记颜色

语义标记使用将 LSP 标记类型和修饰符映射到主题样式或自定义颜色的规则进行样式设置。Zed 提供了合理的默认值，但您可以在 settings.json 中自定义这些规则：在 `global_lsp_settings.semantic_token_rules` 键下添加规则。

规则按顺序匹配，第一个匹配的规则生效。
用户定义的规则具有最高优先级，其次是扩展提供的语言规则，然后是 Zed 默认规则。

### 规则结构

每个规则可以指定：

| 属性           | 描述                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `token_type`       | 要匹配的 LSP 语义标记类型（例如 `"variable"`, `"function"`, `"class"`）。如果省略，则匹配所有类型。                               |
| `token_modifiers`  | 必须全部存在的修饰符列表（例如 `["declaration"]`, `["readonly", "static"]`）。                                                   |
| `style`            | 要尝试的主题样式名称列表。使用当前主题中找到的第一个样式。                                                                    |
| `foreground_color` | 覆盖前景颜色，采用十六进制格式（例如 `"#ff0000"`）。                                                                        |
| `background_color` | 覆盖背景颜色，采用十六进制格式。                                                                                             |
| `underline`        | 布尔值或十六进制颜色。如果为 `true`，则使用文本颜色下划线。                                                                  |
| `strikethrough`    | 布尔值或十六进制颜色。如果为 `true`，则使用文本颜色删除线。                                                                  |
| `font_weight`      | `"normal"` 或 `"bold"`。                                                                                                    |
| `font_style`       | `"normal"` 或 `"italic"`。                                                                                                  |

### 示例：高亮未解析的引用

使未解析的引用更加突出：

```json [settings]
{
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "unresolvedReference",
        "foreground_color": "#c93f3f",
        "font_weight": "bold"
      }
    ]
  }
}
```

### 示例：高亮不安全的代码

在 Rust 中高亮不安全操作：

```json [settings]
{
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "punctuation",
        "token_modifiers": ["unsafe"],
        "foreground_color": "#AA1111",
        "font_weight": "bold"
      }
    ]
  }
}
```

### 示例：使用主题样式

而不是硬编码颜色，从您的主题中引用样式：

```json [settings]
{
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "variable",
        "token_modifiers": ["mutable"],
        "style": ["variable.mutable", "variable"]
      }
    ]
  }
}
```

使用当前主题中找到的第一个样式，提供回退选项。

### 示例：禁用标记类型

要禁用特定标记类型的高亮，添加一个匹配它的空规则：

```json [settings]
{
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "comment"
      }
    ]
  }
}
```
由于用户规则具有最高优先级且第一个匹配项获胜，此空规则会阻止对注释标记应用任何样式。

## 默认规则

Zed 的默认语义标记规则将标准的 LSP 标记类型映射到常见的主题样式。例如：

- `function` → `function` 样式
- `variable` 带有 `constant` 修饰符 → `constant` 样式
- `class` → `type.class`、`class` 或 `type` 样式（找到的第一个）
- `comment` 带有 `documentation` 修饰符 → `comment.documentation` 或 `comment.doc` 样式

完整的默认配置可以通过 `zed: show default semantic token rules` 命令在 Zed 中显示。

## 标准标记类型

语言服务器使用标准化类型报告标记。常见类型包括：

| 类型            | 描述                        |
| --------------- | -------------------------- |
| `namespace`     | 命名空间或模块名称          |
| `type`          | 类型名称                     |
| `class`         | 类名称                       |
| `enum`          | 枚举类型名称                 |
| `interface`     | 接口名称                     |
| `struct`        | 结构体名称                   |
| `typeParameter` | 泛型类型参数                 |
| `parameter`     | 函数/方法参数                |
| `variable`      | 变量名称                     |
| `property`      | 对象属性或结构体字段         |
| `enumMember`    | 枚举变体                     |
| `function`      | 函数名称                     |
| `method`        | 方法名称                     |
| `macro`         | 宏名称                       |
| `keyword`       | 语言关键字                   |
| `comment`       | 注释                         |
| `string`        | 字符串字面量                  |
| `number`        | 数值字面量                   |
| `operator`      | 运算符                       |

常见修饰符包括：`declaration`、`definition`、`readonly`、`static`、`deprecated`、`async`、`documentation`、`defaultLibrary`，以及语言特定的修饰符，如 `unsafe`（Rust）或 `abstract`（TypeScript）。

有关完整规范，请参阅 [LSP Semantic Tokens documentation](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokenTypes)。

## 检查语义标记

要实时查看应用于代码的语义标记，请从命令面板使用 `dev: open highlights tree view` 命令。这将打开一个面板，显示当前缓冲区的所有高亮（包括语义标记），使您更容易理解应用了哪些标记并调试您的自定义规则。

## 故障排除

### 语义高亮未出现

1. 确保该语言的 `semantic_tokens` 设置为 `"combined"` 或 `"full"`
2. 验证语言服务器是否支持语义标记（并非所有都支持）
3. 尝试使用 `lsp: restart language servers` 重启语言服务器
4. 检查 LSP 日志（`workspace: open lsp log`）中的错误

### 更改设置后颜色未更新

对 `semantic_tokens` 模式的更改可能需要重启语言服务器。请从命令面板使用 `lsp: restart language servers`。

### 主题样式未应用

确保您规则中的样式名称与主题中定义的样式匹配。`style` 数组提供回退选项——如果找不到第一个样式，Zed 会尝试下一个。