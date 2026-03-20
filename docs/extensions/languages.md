---
title: 语言扩展
description: "Zed 中编程语言支持的概览，包括内置语言和基于扩展的语言。"
---

# 语言扩展

Zed 中的语言支持包含以下几个组件：

- 语言元数据和配置
- 语法（Grammar）
- 查询（Queries）
- 语言服务器（Language Servers）

## 语言元数据

Zed 支持的每种语言都必须在扩展的 `languages` 目录下的子目录中进行定义。

该子目录必须包含一个名为 `config.toml` 的文件，其结构如下：

```toml
name = "我的语言"
grammar = "my-language"
path_suffixes = ["myl"]
line_comments = ["# "]
```

- `name`（必需）是在"选择语言"下拉菜单中显示的可读名称。
- `grammar`（必需）是一个语法的名称。语法需要单独注册，将在下文中描述。
- `path_suffixes` 是一个文件后缀数组，应与此语言关联。与设置中的 `file_types` 不同，它不支持 glob 模式。
- `line_comments` 是一个字符串数组，用于标识语言中的行注释。这用于 `editor::ToggleComments` 键绑定：{#kb editor::ToggleComments} 来切换代码行的注释状态。
- `tab_size` 定义了此语言使用的缩进/制表符大小（默认为 `4`）。
- `hard_tabs` 是使用制表符（`true`）还是空格（`false`，默认值）进行缩进。
- `first_line_pattern` 是一个正则表达式，可以与上面的 `path_suffixes` 或设置中的 `file_types` 结合使用，以匹配应使用此语言的文件。例如，Zed 通过匹配脚本第一行的 [shebang 行](https://github.com/zed-industries/zed/blob/main/crates/languages/src/bash/config.toml) 来识别 Shell 脚本。
- `debuggers` 是一个字符串数组，用于标识语言中的调试器。在启动调试器的"新进程模态"时，Zed 将按照此数组中的条目顺序排列可用的调试器。

<!--
TBD: 文档 `language_name/config.toml` 的键

- autoclose_before
- brackets (start, end, close, newline, not_in: ["comment", "string"])
- word_characters
- prettier_parser_name
- opt_into_language_servers
- code_fence_block_name
- scope_opt_in_language_servers
- increase_indent_pattern, decrease_indent_pattern
- collapsed_placeholder
- auto_indent_on_paste, auto_indent_using_last_non_empty_line
- overrides: `[overrides.element]`, `[overrides.string]`
-->

## 语法

Zed 使用 [Tree-sitter](https://tree-sitter.github.io) 解析库来提供内置的特定语言功能。许多语言都有可用的语法，你也可以[开发自己的语法](https://tree-sitter.github.io/tree-sitter/creating-parsers/3-writing-the-grammar.html)。越来越多的 Zed 功能是使用 Tree-sitter 查询在语法树上进行模式匹配构建的。如上所述，在扩展中定义的每种语言都必须指定用于解析的 Tree-sitter 语法名称。然后，这些语法会在扩展的 `extension.toml` 文件中单独注册，如下所示：

```toml
[grammars.gleam]
repository = "https://github.com/gleam-lang/tree-sitter-gleam"
rev = "58b7cac8fc14c92b0677c542610d8738c373fa81"
```

`repository` 字段必须指定一个 Tree-sitter 语法应从哪个仓库加载，`rev` 字段必须包含要使用的 Git 版本，例如 Git 提交的 SHA。如果你正在本地开发扩展并希望从本地文件系统加载语法，可以使用 `file://` URL 作为 `repository`。扩展可以通过引用多个 tree-sitter 仓库来提供多个语法。

## Tree-sitter 查询

Zed 使用由 [Tree-sitter](https://tree-sitter.github.io) 查询语言生成的语法树来实现
多种功能：

- 语法高亮
- 括号匹配
- 代码大纲/结构
- 自动缩进
- 代码注入
- 语法覆盖（Overrides）
- 文本编辑
- 可运行代码检测
- 选择类、函数等

以下部分将详细说明 [Tree-sitter 查询](https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html) 如何在 Zed 中启用这些功能，以 [JSON 语法](https://www.json.org/json-en.html) 为指导示例。

### 语法高亮

在 Tree-sitter 中，`highlights.scm` 文件为特定语法定义了语法高亮规则。

以下是来自 JSON 的 `highlights.scm` 示例：

```scheme
(string) @string

(pair
  key: (string) @property.json_key)

(number) @number
```

此查询标记字符串、对象键和数字以进行高亮。以下是主题支持的捕获（capture）的完整列表：

| 捕获                    | 描述                               |
| ----------------------- | ---------------------------------- |
| @attribute              | 捕获属性                           |
| @boolean                | 捕获布尔值                         |
| @comment                | 捕获注释                           |
| @comment.doc            | 捕获文档注释                       |
| @constant               | 捕获常量                           |
| @constant.builtin       | 捕获内置常量                       |
| @constructor            | 捕获构造函数                       |
| @embedded               | 捕获嵌入的内容                     |
| @emphasis               | 捕获强调文本                       |
| @emphasis.strong        | 捕获强烈强调的文本                 |
| @enum                   | 捕获枚举                           |
| @function               | 捕获函数                           |
| @hint                   | 捕获提示                           |
| @keyword                | 捕获关键字                         |
| @label                  | 捕获标签                           |
| @link_text              | 捕获链接文本                       |
| @link_uri               | 捕获链接 URI                       |
| @number                 | 捕获数值                           |
| @operator               | 捕获操作符                         |
| @predictive             | 捕获预测文本                       |
| @preproc                | 捕获预处理指令                     |
| @primary                | 捕获主要元素                       |
| @property               | 捕获属性                           |
| @punctuation            | 捕获标点符号                       |
| @punctuation.bracket    | 捕获括号                           |
| @punctuation.delimiter  | 捕获分隔符                         |
| @punctuation.list_marker | 捕获列表标记                       |
| @punctuation.special    | 捕获特殊标点符号                   |
| @string                 | 捕获字符串字面量                   |
| @string.escape          | 捕获字符串中的转义字符             |
| @string.regex           | 捕获正则表达式                     |
| @string.special         | 捕获特殊字符串                     |
| @string.special.symbol  | 捕获特殊符号                       |
| @tag                    | 捕获标签                           |
| @tag.doctype            | 捕获文档类型（例如 HTML 中的）     |
| @text.literal           | 捕获文本字面量                     |
| @title                  | 捕获标题                           |
| @type                   | 捕获类型                           |
| @type.builtin           | 捕获内置类型                       |
| @variable               | 捕获变量                           |
| @variable.special       | 捕获特殊变量                       |
| @variable.parameter     | 捕获函数/方法参数                  |
| @variant                | 捕获变体                           |

### 括号匹配

`brackets.scm` 文件定义了匹配的括号。

以下是来自 JSON 的 `brackets.scm` 文件示例：

```scheme
("[" @open "]" @close)
("{" @open "}" @close)
("\"" @open "\"" @close)
```

此查询标识开闭括号、花括号和引号。

| 捕获 | 描述                                 |
| ---- | ------------------------------------ |
| @open | 捕获开括号、开花括号和开引号         |
| @close | 捕获闭括号、闭花括号和闭引号         |

Zed 使用这些来高亮匹配的括号：用不同的颜色（"彩虹括号"）绘制每个括号对，如果光标在括号对内部，则高亮显示这些括号。

若要禁用彩虹括号着色，请将以下内容添加到相应的 `brackets.scm` 条目中：

```scheme
(("\"" @open "\"" @close) (#set! rainbow.exclude))
```

### 代码大纲/结构

`outline.scm` 文件定义了代码大纲的结构。

以下是来自 JSON 的 `outline.scm` 文件示例：

```scheme
(pair
  key: (string (string_content) @name)) @item
```

此查询为大纲结构捕获对象键。

| 捕获 | 描述                                                                      |
| ---- | ------------------------------------------------------------------------- |
| @name | 捕获对象键的内容                                                          |
| @item | 捕获整个键值对                                                           |
| @context | 捕捉为大纲项目提供上下文的元素                                          |
| @context.extra | 捕捉大纲项目的额外上下文信息                                              |
| @annotation | 捕捉注释大纲项目的节点（文档注释、属性、装饰器）[^1] |

[^1]: 这些注释由 Assistant 在生成代码修改步骤时使用。

### 自动缩进

`indents.scm` 文件定义了缩进规则。

以下是来自 JSON 的 `indents.scm` 文件示例：

```scheme
(array "]" @end) @indent
(object "}" @end) @indent
```

此查询标记数组和对象的结束部分以用于缩进。

| 捕获 | 描述                       |
| ---- | -------------------------- |
| @end | 捕获闭合的括号和花括号     |
| @indent | 捕获整个数组和对象以进行缩进 |

### 代码注入

`injections.scm` 文件定义了将一种语言嵌入到另一种语言中的规则，例如 Markdown 中的代码块或 Python 字符串中的 SQL 查询。

以下是来自 Markdown 的 `injections.scm` 文件示例：

```scheme
(fenced_code_block
  (info_string
    (language) @injection.language)
  (code_fence_content) @injection.content)

((inline) @content
 (#set! injection.language "markdown-inline"))
```

此查询识别围栏代码块，捕获信息字符串中指定的语言以及块内的内容。它还捕获内联内容并将其语言设置为 "markdown-inline"。

| 捕获 | 描述                                                |
| ---- | --------------------------------------------------- |
| @injection.language | 捕获代码块的语言标识符                            |
| @injection.content | 捕获应视为不同语言的内容                          |

注意，我们不能在这里使用 JSON 作为示例，因为它不支持语言注入。

### 语法覆盖

`overrides.scm` 文件定义了可以用来覆盖特定语言构造中某些编辑器设置的语法_作用域_。

例如，有一个名为 `word_characters` 的特定语言设置，用于控制哪些非字母字符被视为单词的一部分，例如当你双击选择变量时。在 JavaScript 中，"$" 和 "#" 被视为单词字符。

还有一个名为 `completion_query_characters` 的特定语言设置，用于控制触发自动补全建议的字符。在 JavaScript 中，当光标在_字符串_内部时，"-" 应被视为补全查询字符。为此，JavaScript 的 `overrides.scm` 文件包含以下模式：

```scheme
[
  (string)
  (template_string)
] @string
```

并且 JavaScript 的 `config.toml` 包含以下设置：

```toml
word_characters = ["#", "$"]

[overrides.string]
completion_query_characters = ["-"]
```

你还可以在特定作用域内禁用某些自动闭合括号。例如，要防止在字符串内自动闭合单引号，你可以在 JavaScript 的 `config.toml` 中放入以下内容：

```toml
brackets = [
  { start = "'", end = "'", close = true, newline = false, not_in = ["string"] },
  # 其他括号对...
]
```

#### 范围包含性

默认情况下，`overrides.scm` 中定义的范围是_排除_的。因此，在上面的例子中，如果你的光标在界定字符串的引号_外部_，则 `string` 作用域将不会生效。有时，你可能希望使范围变为_包含_性的。你可以通过在查询中的捕获名称后添加 `.inclusive` 后缀来实现这一点。

例如，在 JavaScript 中，我们还禁用了在注释内自动闭合单引号。并且注释作用域必须一直扩展到行注释后的换行符。为此，JavaScript 的 `overrides.scm` 包含以下模式：

```scheme
(comment) @comment.inclusive
```

### 文本对象

`textobjects.scm` 文件定义了按文本对象导航的规则。这是在 Zed v0.165 中添加的，目前仅在 Vim 模式下使用。

Vim 提供了两个级别的粒度来在文件中导航：按区块使用 `[]` 等，按方法使用 `]m` 等。即使是不支持函数和类的语言，也可以通过定义类似的概念来良好工作。例如，CSS 将规则集定义为方法，将媒体查询定义为类。

对于带有闭包的语言，这些通常不应算作 Zed 中的函数。然而，这只是一个尽力而为的方案，因为像 JavaScript 这样的语言在语法上并不区分闭包和顶层函数声明。

对于像 C 这样带有声明的语言，请提供匹配 `@class.around` 或 `@function.around` 的查询。如果没有“内部”对象，`if` 和 `ic` 文本对象将默认使用这些。

如果你不确定 `textobjects.scm` 中该放什么，可以参考 [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) 和 [Helix editor](https://github.com/helix-editor/helix) 对许多语言的查询。你可以参考 Zed 的[内置语言](https://github.com/zed-industries/zed/tree/main/crates/languages/src) 来了解如何调整这些。

| 捕获 | 描述 | Vim 模式 |
| ---- | ---- | ---- |
| @function.around | 整个函数定义或文件中一个等效的小区块。 | `[m`, `]m`, `[M`,`]M` 移动。 `af` 文本对象 |
| @function.inside | 函数体（花括号内的内容）。 | `if` 文本对象 |
| @class.around | 整个类定义或文件中一个等效的大区块。 | `[[`, `]]`, `[]`, `][` 移动。 `ac` 文本对象 |
| @class.inside | 类定义的内容。 | `ic` 文本对象 |
| @comment.around | 整个注释（例如，所有相邻的行注释，或一个块注释） | `gc` 文本对象 |
| @comment.inside | 注释的内容 | `igc` 文本对象（很少支持） |

例如：

```scheme
; 仅将方法的内容包含在函数中
(method_definition
    body: (_
        "{"
        (_)* @function.inside
        "}")) @function.around

; 匹配没有函数体的函数声明的 @function.around
(function_signature_item) @function.around

; 将所有相邻的注释合并为一个
(comment)+ @comment.around
```

### 文本编辑

`redactions.scm` 文件定义了文本编辑规则。在协作和共享屏幕时，它能确保某些语法节点以编辑模式呈现，以防止信息泄露。

以下是来自 JSON 的 `redactions.scm` 文件示例：

```scheme
(pair value: (number) @redact)
(pair value: (string) @redact)
(array (number) @redact)
(array (string) @redact)
```

此查询标记键值对和数组中的数字和字符串值以进行编辑。

| 捕获 | 描述 |
| ---- | ---- |
| @redact | 捕获需要编辑的值 |

### 可运行代码检测

`runnables.scm` 文件定义了检测可运行代码的规则。

以下是来自 JSON 的 `runnables.scm` 文件示例：

```scheme
(
    (document
        (object
            (pair
                key: (string
                    (string_content) @_name
                    (#eq? @_name "scripts")
                )
                value: (object
                    (pair
                        key: (string (string_content) @run @script)
                    )
                )
            )
        )
    )
    (#set! tag package-script)
    (#set! tag composer-script)
)
```

此查询检测 `package.json` 和 `composer.json` 文件中的可运行脚本。

`@run` 捕获指定了运行按钮应在编辑器中的何处出现。其他以 `_` 开头的捕获之外的捕获，在运行代码时会作为以 `ZED_CUSTOM_$(capture_name)` 为前缀的环境变量暴露。

| 捕获 | 描述 |
| ---- | ---- |
| @\_name | 捕获 "scripts" 键 |
| @run | 捕获脚本名称 |
| @script | 也捕获脚本名称（用于不同目的） |

<!--
TBD: `#set! tag`
-->

## 语言服务器

Zed 使用 [语言服务器协议](https://microsoft.github.io/language-server-protocol/) 来提供高级语言支持。

扩展可以提供任意数量的语言服务器。要从你的扩展中提供语言服务器，请在你的 `extension.toml` 中添加一个条目，其中包含你的语言服务器的名称及其适用的语言。`languages` 列表中的条目必须与该语言的 `config.toml` 文件中的 `name` 字段匹配：

```toml
[language_servers.my-language-server]
name = "我的语言 LSP"
languages = ["我的语言"]
```

然后，在你扩展的 Rust 代码中，在你的扩展上实现 `language_server_command` 方法：

```rust
impl zed::Extension for MyExtension {
    fn language_server_command(
        &mut self,
        language_server_id: &LanguageServerId,
        worktree: &zed::Worktree,
    ) -> Result<zed::Command> {
        Ok(zed::Command {
            command: get_path_to_language_server_executable()?,
            args: get_args_for_language_server()?,
            env: get_env_for_language_server()?,
        })
    }
}
```
你可以使用 `Extension` trait 中的几个可选方法来自定义语言服务器的处理方式。例如，你可以使用 `label_for_completion` 方法控制补全的样式。有关方法的完整列表，请参阅 [Zed 扩展 API 的 API 文档](https://docs.rs/zed_extension_api)。

### 使用语义令牌进行语法高亮

Zed 支持使用附加的语言服务器中的语义令牌进行语法高亮。默认情况下，此功能是禁用的，但可以在你的设置文件中启用：

```json [settings]
{
  // 启用全局语义令牌，由每种语言的 tree-sitter 高亮支持：
  "semantic_tokens": "combined",
  // 或者，按语言指定：
  "languages": {
    "Rust": {
      // 不使用 tree-sitter，仅使用 LSP 语义令牌：
      "semantic_tokens": "full"
    }
  }
}
```

`semantic_tokens` 设置接受以下值：

- `"off"`（默认）：不请求来自语言服务器的语义令牌。
- `"combined"`：将 LSP 语义令牌与 tree-sitter 高亮一起使用。
- `"full"`：仅使用 LSP 语义令牌，替换 tree-sitter 高亮。

#### 扩展提供的语义令牌规则

语言扩展可以为它们语言服务器的自定义令牌类型提供默认的语义令牌规则。为此，请将一个 `semantic_token_rules.json` 文件放在与 `config.toml` 相同的语言目录中：

```
my-extension/
  languages/
    my-language/
      config.toml
      highlights.scm
      semantic_token_rules.json
```

该文件使用与用户设置中的 `semantic_token_rules` 数组相同的格式——一个由规则对象组成的 JSON 数组：

```json
[
  {
    "token_type": "lifetime",
    "style": ["lifetime"]
  },
  {
    "token_type": "builtinType",
    "style": ["type"]
  },
  {
    "token_type": "selfKeyword",
    "style": ["variable.special"]
  }
]
```

当语言服务器报告 Zed 内置默认规则未涵盖的自定义（非标准）语义令牌类型时，这很有用。扩展提供的规则充当该语言的合理默认值——用户总是可以通过设置文件中的 `semantic_token_rules` 覆盖它们，并且只有当用户和扩展规则都不匹配时才使用内置的默认规则。

#### 自定义语义令牌样式

Zed 支持自定义用于语义令牌的样式。你可以在设置文件中定义规则，以自定义语义令牌如何映射到你主题中的样式。

```json [settings]
{
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        // 将宏高亮为关键字。
        "token_type": "macro",
        "style": ["syntax.keyword"]
      },
      {
        // 将未解析的引用加粗并显示为红色。
        "token_type": "unresolvedReference",
        "foreground_color": "#c93f3f",
        "font_weight": "bold"
      },
      {
        // 为所有可变变量/引用等添加下划线。
        "token_modifiers": ["mutable"],
        "underline": true
      }
    ]
  }
}
```

所有匹配给定 `token_type` 和 `token_modifiers` 的规则都会被应用。较早的规则优先级更高。如果没有规则匹配，则该令牌不会高亮。

规则按以下优先顺序应用（从高到低）：

1. **用户设置** — 来自你设置文件中的 `semantic_token_rules` 的规则。
2. **扩展规则** — 来自扩展语言目录中的 `semantic_token_rules.json` 的规则。
3. **默认规则** — Zed 用于标准 LSP 令牌类型的内置规则。

`semantic_token_rules` 数组中的每个规则定义如下：

- `token_type`: 根据 [LSP 规范](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_semanticTokens) 定义的语义令牌类型。如果省略，则该规则匹配所有令牌类型。
- `token_modifiers`: 要匹配的语义令牌修饰符列表。必须存在所有修饰符才能匹配。
- `style`: 要使用的当前语法主题中的样式列表。找到的第一个样式将被使用。以下任何设置都会覆盖该样式。
- `foreground_color`: 用于该令牌类型的前景色，采用十六进制格式（例如，`"#ff0000"`）。
- `background_color`: 用于该令牌类型的背景色，采用十六进制格式（例如，`"#ff0000"`）。
- `underline`: 一个布尔值或用于下划线的颜色，采用十六进制格式。如果为 `true`，则该令牌将使用文本颜色进行下划线。
- `strikethrough`: 一个布尔值或用于删除线的颜色，采用十六进制格式。如果为 `true`，则该令牌将使用文本颜色添加删除线。
- `font_weight`: `"normal"` 或 `"bold"` 之一。
- `font_style`: `"normal"` 或 `"italic"` 之一。

### 多语言支持

如果你的语言服务器支持额外的语言，你可以使用 `language_ids` 将 Zed `languages` 映射到所需的 [LSP 特定的 `languageId`](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocumentItem) 标识符：

```toml

[language-servers.my-language-server]
name = "Whatever LSP"
languages = ["JavaScript", "HTML", "CSS"]

[language-servers.my-language-server.language_ids]
"JavaScript" = "javascript"
"TSX" = "typescriptreact"
"HTML" = "html"
"CSS" = "css"
```