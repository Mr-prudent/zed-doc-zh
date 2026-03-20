---
title: Elixir
description: "配置 Zed 中的 Elixir 语言支持，包括语言服务器、格式化和调试。"
---

# Elixir

Elixir 支持可通过 [Elixir 扩展](https://github.com/zed-extensions/elixir) 获得。

- Tree-sitter:
  - [elixir-lang/tree-sitter-elixir](https://github.com/elixir-lang/tree-sitter-elixir)
  - [phoenixframework/tree-sitter-heex](https://github.com/phoenixframework/tree-sitter-heex)
- 语言服务器:
  - [elixir-lang/expert](https://github.com/elixir-lang/expert)
  - [elixir-lsp/elixir-ls](https://github.com/elixir-lsp/elixir-ls)
  - [elixir-tools/next-ls](https://github.com/elixir-tools/next-ls)
  - [lexical-lsp/lexical](https://github.com/lexical-lsp/lexical)

## 选择语言服务器

Elixir 扩展为 `expert`、`elixir-ls`、`next-ls` 和 `lexical` 提供语言服务器支持。

默认启用 `elixir-ls`。

### Expert

在设置 ({#kb zed::OpenSettings}) 中于 语言 > Elixir 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Elixir": {
      "language_servers": ["expert", "!elixir-ls", "!next-ls", "!lexical", "..."]
    },
    "HEEX": {
      "language_servers": ["expert", "!elixir-ls", "!next-ls", "!lexical", "..."]
    }
  }
```

### Next LS

在设置 ({#kb zed::OpenSettings}) 中于 语言 > Elixir 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Elixir": {
      "language_servers": ["next-ls", "!expert", "!elixir-ls", "!lexical", "..."]
    },
    "HEEX": {
      "language_servers": ["next-ls", "!expert", "!elixir-ls", "!lexical", "..."]
    }
  }
```

### Lexical

在设置 ({#kb zed::OpenSettings}) 中于 语言 > Elixir 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Elixir": {
      "language_servers": ["lexical", "!expert", "!elixir-ls", "!next-ls", "..."]
    },
    "HEEX": {
      "language_servers": ["lexical", "!expert", "!elixir-ls", "!next-ls", "..."]
    }
  }
```

## 设置 `elixir-ls`

1. 安装 `elixir`：

```sh
brew install elixir
```

2. 安装 `elixir-ls`：

```sh
brew install elixir-ls
```

3. 重启 Zed

> 如果 `elixir-ls` 在 elixir 项目中没有运行，请通过命令面板操作 `zed: open log` 检查错误日志。如果您发现错误消息提及：`invalid LSP message header "Shall I install Hex? (if running non-interactively, use \"mix local.hex --force\") [Yn]`，您可能需要安装 [`Hex`](https://hex.pm)。您可以从命令行运行 `elixir-ls` 并接受提示以安装 `Hex`。

### 使用 Mix 进行格式化

如果您更喜欢使用 [Mix](https://hexdocs.pm/mix/Mix.html) 格式化代码，请将其配置为外部格式化程序。格式化将在文件保存时进行。

在设置 ({#kb zed::OpenSettings}) 中于 语言 > Elixir 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Elixir": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "mix",
          "arguments": ["format", "--stdin-filename", "{buffer_path}", "-"]
        }
      }
    }
  }
}
```

### 其他工作区配置选项

您可以通过设置文件中的 `lsp` 设置（[如何编辑](../configuring-zed.md#settings-files)）传递额外的 elixir-ls 工作区配置选项。

以下示例禁用了 dialyzer：

```json [settings]
  "lsp": {
    "elixir-ls": {
      "settings": {
        "dialyzerEnabled": false
      }
    }
  }
```

有关更多选项，请参阅 [ElixirLS 配置设置](https://github.com/elixir-lsp/elixir-ls#elixirls-configuration-settings)。

### HEEx

Zed 也支持 HEEx 模板。HEEx 是 [EEx](https://hexdocs.pm/eex/1.12.3/EEx.html)（嵌入式 Elixir）和 HTML 的混合体，用于 Phoenix LiveView 应用程序中。

- Tree-sitter: [phoenixframework/tree-sitter-heex](https://github.com/phoenixframework/tree-sitter-heex)

#### 在 HEEx 中使用 Tailwind CSS 语言服务器

要在 HEEx 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查和悬停文档），请将以下内容添加到您的设置文件中（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "phoenix-heex": "html"
        },
        "experimental": {
          "classRegex": ["class=\"([^\"]*)\"", "class='([^']*)'"]
        }
      }
    }
  }
}
```

使用这些设置，您将在 HEEX 模板文件中获得 Tailwind CSS 类的补全。示例：

```heex
<%!-- 标准类属性 --%>
<div class="flex items-center <completion here>">
  <p class="text-lg font-bold <completion here>">Hello World</p>
</div>

<%!-- 使用 Elixir 表达式 --%>
<div class={"flex #{@custom_class} <completion here>"}>
  Content
</div>

<%!-- 使用 Phoenix 函数 --%>
<div class={class_list(["flex", "items-center", "<completion here>"])}>
  Content
</div>
```