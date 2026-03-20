---
title: 语言服务器和 Tree-sitter 配置 - Zed
description: 通过 Tree-sitter 进行语法高亮，并通过 LSP 进行诊断、自动补全和格式化，从而在 Zed 中配置语言支持。
---

# 配置语言

Zed 的语言支持建立在两项技术之上：

1. **Tree-sitter** 处理语法高亮和基于结构的功能，如大纲面板。
2. **语言服务器协议 (LSP)** 提供语义功能：代码自动补全、诊断、跳转到定义和重构。

本页面涵盖特定语言的设置、文件关联、语言服务器配置、格式化、代码检查和语法高亮。

有关支持的语言列表，请参阅[支持的语言](./languages.md)。要添加对新语言的支持，请参阅[语言扩展](./extensions/languages.md)。

## 特定语言的设置

Zed 允许您为单个语言覆盖全局设置。这些自定义配置在您的 `settings.json` 文件中的 `languages` 键下定义。

以下是特定语言设置的示例：

```json [settings]
"languages": {
  "Python": {
    "tab_size": 4,
    "formatter": "language_server",
    "format_on_save": "on"
  },
  "JavaScript": {
    "tab_size": 2,
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": ["--stdin-filepath", "{buffer_path}"]
      }
    }
  }
}
```

您可以为每种语言定制广泛的设置，包括：

- [`tab_size`](./reference/all-settings.md#tab-size): 每个缩进级别的空格数
- [`formatter`](./reference/all-settings.md#formatter): 用于代码格式化的工具
- [`format_on_save`](./reference/all-settings.md#format-on-save): 保存时是否自动格式化代码
- [`enable_language_server`](./reference/all-settings.md#enable-language-server): 切换语言服务器支持
- [`hard_tabs`](./reference/all-settings.md#hard-tabs): 使用制表符而非空格进行缩进
- [`preferred_line_length`](./reference/all-settings.md#preferred-line-length): 建议的最大行长度
- [`soft_wrap`](./reference/all-settings.md#soft-wrap): 如何换行长代码
- [`show_completions_on_input`](./reference/all-settings.md#show-completions-on-input): 输入时是否显示自动补全
- [`show_completion_documentation`](./reference/all-settings.md#show-completion-documentation): 是否为自动补全菜单中的项目显示内联和并排的文档
- [`colorize_brackets`](./reference/all-settings.md#colorize-brackets): 是否使用 tree-sitter 括号查询来检测和编辑器中着色括号（也称为“彩虹括号”）

这些设置允许您在不同语言和项目中保持特定的编码风格。

## 文件关联

Zed 根据文件扩展名自动检测文件类型，但您可以自定义这些关联以适应您的工作流。

要设置自定义文件关联，请在您的 `settings.json` 中使用 [`file_types`](./reference/all-settings.md#file-types) 设置：

```json [settings]
"file_types": {
  "C++": ["c"],
  "TOML": ["MyLockFile"],
  "Dockerfile": ["Dockerfile*"]
}
```

此配置告诉 Zed：

- 将 `.c` 文件视为 C++ 而非 C
- 将名为 "MyLockFile" 的文件识别为 TOML
- 将 Dockerfile 语法应用于任何以 "Dockerfile" 开头的文件

您可以使用 glob 模式进行更灵活的匹配，从而处理项目中的复杂命名约定。

## 使用语言服务器

语言服务器是 Zed 智能编码功能的重要组成部分，提供自动补全、跳转到定义和实时错误检查等功能。

### 什么是语言服务器？

语言服务器实现了语言服务器协议 (LSP)，该协议标准化了编辑器与语言特定工具之间的通信。这使得 Zed 能够为多种编程语言支持高级功能，而无需分别实现每个功能。

语言服务器提供的一些关键功能包括：

- 代码自动补全
- 错误检查和诊断
- 代码导航（跳转到定义、查找引用）
- 代码操作（重命名、提取方法）
- 悬停信息
- 工作区符号搜索

### 管理语言服务器

Zed 简化了用户的语言服务器管理：

1. **自动下载**：当您打开具有匹配文件类型的文件时，Zed 会自动下载相应的语言服务器。Zed 可能会提示您为已知文件类型安装扩展。

2. **存储位置**：
   - macOS: `~/Library/Application Support/Zed/languages`
   - Linux: `$XDG_DATA_HOME/zed/languages`, `$FLATPAK_XDG_DATA_HOME/zed/languages`, 或 `$HOME/.local/share/zed/languages`

3. **自动更新**：Zed 会保持您的语言服务器为最新状态，确保您始终拥有最新的功能和改进。

### 选择语言服务器

Zed 中的一些语言提供多种语言服务器选项。您可能安装了多个捆绑了针对同一语言的语言服务器的扩展，这可能导致功能重叠。为确保您获得所需的功能，Zed 允许您确定优先使用哪些语言服务器及其顺序。

您可以使用 `language_servers` 设置指定您的偏好：

```json [settings]
  "languages": {
    "PHP": {
      "language_servers": ["intelephense", "!phpactor", "!phptools", "..."]
    }
  }
```

在此示例中：

- `intelephense` 被设置为主要语言服务器。
- `phpactor` 和 `phptools` 被禁用（注意 `!` 前缀）。
- `"..."` 扩展到为 PHP 注册的其余语言服务器，这些服务器尚未在列表中。

`"..."` 条目充当通配符，包含您未明确提及的任何已注册的语言服务器。您按名称列出的服务器保持其位置，`"..."` 在列表中的该点填充其余的。前缀为 `!` 的服务器被完全排除。这意味着如果安装了新的语言服务器扩展或为语言注册了新服务器，`"...""` 将自动包含它。如果您想要完全控制哪些服务器被启用，请省略 `"...""` — 只有您按名称列出的服务器才会被使用。

#### 示例

假设您正在使用 Ruby。默认配置是：

```json [settings]
{
  "language_servers": [
    "solargraph",
    "!ruby-lsp",
    "!rubocop",
    "!sorbet",
    "!steep",
    "!kanayago",
    "..."
  ]
}
```

当您在设置中覆盖 `language_servers` 时，您的列表**会完全替换**默认列表。这意味着默认禁用的服务器（如 `kanayago`）会被 `"..."` 重新启用，除非您再次明确禁用它们。

| 配置                                                   | 结果                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `["..."]`                                              | `solargraph`, `ruby-lsp`, `rubocop`, `sorbet`, `steep`, `kanayago`        |
| `["ruby-lsp", "..."]`                                  | `ruby-lsp`, `solargraph`, `rubocop`, `sorbet`, `steep`, `kanayago`        |
| `["ruby-lsp", "!solargraph", "!kanayago", "..."]`       | `ruby-lsp`, `rubocop`, `sorbet`, `steep`                                    |
| `["ruby-lsp", "solargraph"]`                           | `ruby-lsp`, `solargraph`                                                   |

> 注意：在第一个示例中，`"..."` 包含 `kanayago`，即使它默认被禁用。覆盖替换了默认列表，因此 `"!kanayago"` 条目不再存在。要使其保持禁用状态，您必须在配置中包含 `"!kanayago"`。

### 工具链

一些语言服务器需要使用当前的“工具链”进行配置，工具链是特定版本的编程语言编译器和/或解释器的安装，并且可能包含项目的完整依赖项集合。
Zed 认为工具链的一个例子是 Python 中的虚拟环境。
并非 Zed 中的所有语言都支持工具链的发现和选择，但对于那些支持的，您可以从工具链选择器（通过 {#action toolchain::Select}）中指定工具链。要了解有关 Zed 中工具链的更多信息，请参阅[`工具链`](./toolchains.md)。

### 配置语言服务器

在 `settings.json` 中配置语言服务器时，自动补全建议包括 Zed 识别的所有可用的 LSP 适配器，而不仅限于当前为已加载语言激活的那些。这有助于您在打开使用它们的文件之前发现和配置语言服务器。

许多语言服务器接受自定义配置选项。您可以在 `settings.json` 的 `lsp` 部分中设置这些选项：

```json [settings]
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "check": {
          "command": "clippy"
        }
      }
    }
  }
```

此示例配置 Rust Analyzer 以在保存文件时使用 Clippy 进行额外的代码检查。

#### 嵌套对象

在 Zed 中配置语言服务器选项时，使用嵌套对象而非点分隔的字符串非常重要。这在处理更复杂的配置时尤其相关。让我们看一个使用 TypeScript 语言服务器的实际示例：

假设您要为 TypeScript 配置以下设置：

- 启用严格的空值检查
- 将目标 ECMAScript 版本设置为 ES2020

以下是您如何在 Zed 的 `settings.json` 中构建这些设置：

```json [settings]
"lsp": {
  "typescript-language-server": {
    "initialization_options": {
      // 这些是不支持的（VSCode 点分隔样式）：
      // "preferences.strictNullChecks": true,
      // "preferences.target": "ES2020"
      //
      // 这是正确的（嵌套表示法）：
      "preferences": {
        "strictNullChecks": true,
        "target": "ES2020"
      },
    }
  }
}
```

#### 可能的配置选项

根据特定语言服务器的实现方式，它们可能依赖于不同的配置选项，这些选项都在 LSP 中指定。

- [initializationOptions](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#version_3_17_0)

在语言服务器启动时发送一次，需要重新启动服务器以重新应用更改。

例如，rust-analyzer 和 clangd 仅依赖这种配置方式。

```json [settings]
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "checkOnSave": false
      }
    }
  }
```

- [Configuration Request](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#workspace_configuration)

服务器可能会多次查询。
大多数服务器仅依赖这种配置方式。

```json [settings]
"lsp": {
  "tailwindcss-language-server": {
    "settings": {
      "tailwindCSS": {
        "emmetCompletions": true,
      },
    }
  }
}
```

除了 LSP 相关的服务器配置选项外，Zed 中的某些服务器允许配置 Zed 启动二进制文件的方式。

语言服务器会自动从互联网下载或在您的路径中找到时启动，如果您想指定明确的替代二进制文件，可以在设置中指定：

```json [settings]
  "lsp": {
    "rust-analyzer": {
      "binary": {
        // 是从互联网获取二进制文件，还是尝试在本地查找。
        "ignore_system_version": false,
        "path": "/path/to/langserver/bin",
        "arguments": ["--option", "value"],
        "env": {
          "FOO": "BAR"
        }
      }
    }
  }
```

### 启用或禁用语言服务器

您可以全局或按语言切换语言服务器支持：

```json [settings]
  "languages": {
    "Markdown": {
      "enable_language_server": false
    }
  }
```

这将禁用 Markdown 文件的语言服务器，这对于大型文档项目中的性能很有用。您可以在 `~/.config/zed/settings.json` 中全局配置此设置，或在项目目录下的 `.zed/settings.json` 中配置。

## 格式化和代码检查

Zed 提供代码格式化和代码检查支持，以保持一致的代码风格并及早发现潜在问题。

### 配置格式化工具

Zed 支持内置和外部格式化工具。有关更多信息，请参阅[`formatter`](./reference/all-settings.md#formatter)文档。您可以在 `settings.json` 中全局或按语言配置格式化工具：

```json [settings]
"languages": {
  "JavaScript": {
    "formatter": {
      "external": {
        "command": "prettier",
        "arguments": ["--stdin-filepath", "{buffer_path}"]
      }
    },
    "format_on_save": "on"
  },
  "Rust": {
    "formatter": "language_server",
    "format_on_save": "on"
  }
}
```

此示例对 JavaScript 使用 Prettier，对 Rust 使用语言服务器的格式化工具，两者都设置为在保存时格式化。

要禁用特定语言的格式化：

```json [settings]
"languages": {
  "Markdown": {
    "format_on_save": "off"
  }
}
```

### 设置代码检查器

Zed 中的代码检查通常由语言服务器处理。许多语言服务器允许您配置代码检查规则：

```json [settings]
"lsp": {
  "eslint": {
    "settings": {
      "codeActionOnSave": {
        "rules": ["import/order"]
      }
    }
  }
}
```

此配置设置 ESLint 以在保存时组织 JavaScript 文件的导入。

要在保存时自动运行代码检查器修复：

```json [settings]
"languages": {
  "JavaScript": {
    "formatter": {
      "code_action": "source.fixAll.eslint"
    }
  }
}
```

### 集成格式化和代码检查

Zed 允许您在保存时同时运行格式化和代码检查。以下是使用 Prettier 进行格式化，并使用 ESLint 对 JavaScript 文件进行代码检查的示例：

```json [settings]
"languages": {
  "JavaScript": {
    "formatter": [
      {
        "code_action": "source.fixAll.eslint"
      },
      {
        "external": {
          "command": "prettier",
          "arguments": ["--stdin-filepath", "{buffer_path}"]
        }
      }
    ],
    "format_on_save": "on"
  }
}
```

### 故障排除

如果您遇到格式化或代码检查问题：

1. 检查 Zed 的日志文件以获取错误消息（使用命令面板：`zed: open log`）
2. 确保外部工具（格式化工具、代码检查器）已正确安装并在您的 PATH 中
3. 验证 Zed 设置和语言特定配置文件（例如 `.eslintrc`、`.prettierrc`）中的配置

## 语法高亮和主题

Zed 为语法高亮和主题提供自定义选项，允许您自定义代码的视觉外观。

### 自定义语法高亮

Zed 使用 Tree-sitter 语法进行语法高亮。使用 `theme_overrides` 设置覆盖默认高亮。

此示例使注释变为斜体并更改字符串的颜色：

```json [settings]
"theme_overrides": {
  "One Dark": {
    "syntax": {
      "comment": {
        "font_style": "italic"
      },
      "string": {
        "color": "#00AA00"
      }
    }
  }
}
```

### 选择和自定义主题

更改您的主题：

1. 使用主题选择器（{#kb theme_selector::Toggle}）
2. 或在您的 `settings.json` 中设置：

```json [settings]
"theme": {
  "mode": "dark",
  "dark": "One Dark",
  "light": "GitHub Light"
}
```

通过在 `~/.config/zed/themes/` 中创建 JSON 文件来创建自定义主题。Zed 将自动检测并使此目录中的任何主题可用。

### 使用主题扩展

Zed 支持主题扩展。从扩展面板 ({#kb zed::Extensions}) 中浏览并安装主题扩展。

要创建您自己的主题扩展，请参阅[开发主题扩展](./extensions/themes.md)指南。

## 使用语言服务器功能

### 语义标记

语义标记通过使用来自语言服务器的类型和作用域信息提供更丰富的语法高亮。使用 `semantic_tokens` 设置启用它们：

```json [settings]
"semantic_tokens": "combined"
```

- `"off"` — 仅使用 Tree-sitter 高亮（默认）
- `"combined"` — LSP 语义标记覆盖在 Tree-sitter 上
- `"full"` — LSP 语义标记完全替代 Tree-sitter

您可以通过设置中的 `global_lsp_settings.semantic_token_rules` 自定义标记的颜色和样式。

→ [语义标记文档](./semantic-tokens.md)

### 行内提示

行内提示在您的代码中内联提供额外信息，例如参数名称或推断类型。在您的 `settings.json` 中配置行内提示：

```json [settings]
"inlay_hints": {
  "enabled": true,
  "show_type_hints": true,
  "show_parameter_hints": true,
  "show_other_hints": true
}
```
有关特定语言的行内提示设置，请参阅每种语言的文档。

### 代码操作

代码操作提供快速修复和重构选项。使用 `editor: Toggle Code Actions` 命令或通过单击光标旁出现的灯泡图标来访问代码操作。

### 跳转到定义和引用

使用以下命令在您的代码库中导航：

- `editor: Go to Definition` (<kbd>f12|f12</kbd>)
- `editor: Go to Type Definition` (<kbd>cmd-f12|ctrl-f12</kbd>)
- `editor: Find All References` (<kbd>shift-f12|shift-f12</kbd>)

### 重命名符号

要在您的项目中重命名符号：

1. 将光标放在符号上
2. 使用 `editor: Rename Symbol` 命令（<kbd>f2|f2</kbd>）
3. 输入新名称并按 Enter

这些功能取决于每种语言的语言服务器功能。

当重命名跨越多个文件的符号时，Zed 将在一个多缓冲区中打开一个预览。这使您可以在应用更改之前审查整个项目中的所有更改。要确认重命名，只需保存多缓冲区。如果您决定不继续重命名，可以撤消更改或不保存多缓冲区。

### 悬停信息

使用 `editor: Hover` 命令显示光标下符号的信息。这通常包括类型信息、文档和相关资源的链接。

### 工作区符号搜索

{#action project_symbols::Toggle} 命令允许您在整个项目中搜索符号（函数、类、变量）。这对于快速导航大型代码库非常有用。

### 代码自动补全

Zed 在您输入时提供智能的代码自动补全建议。您可以使用 `editor: Show Completions` 命令手动触发自动补全。使用 <kbd>tab|tab</kbd> 或 <kbd>enter|enter</kbd> 接受建议。

### 诊断

语言服务器在您编码时提供实时诊断（错误、警告、提示）。使用 {#action diagnostics::Deploy} 命令查看您项目的所有诊断。