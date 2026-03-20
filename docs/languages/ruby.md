---
title: Ruby
description: "在 Zed 中配置 Ruby 语言支持，包括语言服务器、格式化和调试。"
---

# Ruby

Ruby 支持可通过 [Ruby 扩展](https://github.com/zed-extensions/ruby) 使用。

- Tree-sitters:
  - [tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby)
  - [tree-sitter-embedded-template](https://github.com/tree-sitter/tree-sitter-embedded-template)
- 语言服务器:
  - [ruby-lsp](https://github.com/Shopify/ruby-lsp)
  - [solargraph](https://github.com/castwide/solargraph)
  - [rubocop](https://github.com/rubocop/rubocop)
  - [Herb](https://herb-tools.dev)
- 调试适配器: [`rdbg`](https://github.com/ruby/debug)

Ruby 扩展也为 ERB 文件提供支持。

## 语言服务器

有多种 Ruby 语言服务器可供选择。Zed 支持以下两种：

- [solargraph](https://github.com/castwide/solargraph)
- [ruby-lsp](https://github.com/Shopify/ruby-lsp)

它们都具有重叠的功能集，如自动补全、诊断、代码操作等，具体使用哪一个由您决定。请注意，您不能同时使用这两个服务器。

除了这两种语言服务器外，Zed 还支持：

- [rubocop](https://github.com/rubocop/rubocop)，这是一个 Ruby 的静态代码分析和 linter。在底层，Zed 也将其用作语言服务器，但其功能与 solargraph 和 ruby-lsp 互补。
- [sorbet](https://sorbet.org/)，这是一个具有自定义渐进式类型系统的 Ruby 静态类型检查器。
- [steep](https://github.com/soutaro/steep)，这是一个使用 Ruby Signature (RBS) 的 Ruby 静态类型检查器。
- [Herb](https://herb-tools.dev)，这是一个用于 ERB 文件的语言服务器。

在配置语言服务器时，使用 "dev: Open Language Server Logs" 命令打开 LSP 日志窗口会很有帮助。然后您可以选择相应的语言实例来查看任何已记录的信息。

## 配置语言服务器

[Ruby 扩展](https://github.com/zed-extensions/ruby) 同时提供 `solargraph` 和 `ruby-lsp` 语言服务器支持。

### 语言服务器激活

对于所有支持的 Ruby 语言服务器（`solargraph`、`ruby-lsp`、`rubocop`、`sorbet` 和 `steep`），Ruby 扩展遵循以下激活序列：

1. 如果在项目的 `Gemfile` 中找到语言服务器，它将通过 `bundle exec` 使用。
2. 如果在 `Gemfile` 中未找到，Ruby 扩展将在系统 `PATH` 中查找可执行文件。
3. 如果语言服务器在这两个位置都未找到，Ruby 扩展将将其作为全局 gem 自动安装（注意：这不会安装到您当前的 Ruby gemset）。

您可以通过在设置中将 `use_bundler` 设置为 `false` 来跳过步骤 1 并强制使用系统可执行文件：

```json [settings]
{
  "lsp": {
    "<SERVER_NAME>": {
      "settings": {
        "use_bundler": false
      }
    }
  }
}
```

### 使用 `solargraph`

`solargraph` 在 Ruby 扩展中默认启用。

### 使用 `ruby-lsp`

在设置 ({#kb zed::OpenSettings}) 中的 "语言">"Ruby" 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": ["ruby-lsp", "!solargraph", "!rubocop", "..."]
    },
    // 为 *.html.erb 文件启用 herb 和 ruby-lsp
    "HTML+ERB": {
      "language_servers": ["herb", "ruby-lsp", "..."]
    },
    // 为 *.js.erb 文件启用 ruby-lsp
    "JS+ERB": {
      "language_servers": ["ruby-lsp", "..."]
    },
    // 为 *.yaml.erb 文件启用 ruby-lsp
    "YAML+ERB": {
      "language_servers": ["ruby-lsp", "..."]
    }
  }
}
```

这样会禁用 `solargraph` 和 `rubocop` 并使用 `ruby-lsp`。

### 使用 `rubocop`

Ruby 扩展还为 `rubocop` 语言服务器提供支持，用于违规检测和自动纠正。

在设置 ({#kb zed::OpenSettings}) 中的 "语言">"Ruby" 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": ["ruby-lsp", "rubocop", "!solargraph", "..."]
    }
  }
}
```

或者，您可以禁用 `ruby-lsp` 并启用 `solargraph` 和 `rubocop`：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": ["solargraph", "rubocop", "!ruby-lsp", "..."]
    }
  }
}
```

## 设置 `solargraph`

默认情况下，Solargraph 的格式化和诊断功能是禁用的。我们可以通过将以下内容添加到 `settings.json` 中来告诉 Zed 启用它们：

```json [settings]
{
  "lsp": {
    "solargraph": {
      "initialization_options": {
        "diagnostics": true,
        "formatting": true
      }
    }
  }
}
```

### 配置

Solargraph 从项目根目录下的一个名为 `.solargraph.yml` 的文件中读取其配置。有关此文件的更多信息，请参阅 [Solargraph 配置文档](https://solargraph.org/guides/configuration)。

## 设置 `ruby-lsp`

您可以将 Ruby LSP 配置传递给 `initialization_options`，例如：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": ["ruby-lsp", "!solargraph", "..."]
    }
  },
  "lsp": {
    "ruby-lsp": {
      "initialization_options": {
        "enabledFeatures": {
          // "someFeature": false
        }
      }
    }
  }
}
```

有关完整的配置选项，请参阅 [Ruby LSP 网站](https://shopify.github.io/ruby-lsp/editors.html)。

LSP `settings` 和 `initialization_options` 也可以是项目特定的。例如，要使用 [standardrb/standard](https://github.com/standardrb/standard) 作为特定项目的格式化程序和 linter，请将其添加到项目仓库内的 `.zed/settings.json` 中：

```json [settings]
{
  "lsp": {
    "ruby-lsp": {
      "initialization_options": {
        "formatter": "standard",
        "linters": ["standard"]
      }
    }
  }
}
```

## 设置 `rubocop` LSP

默认情况下，Rubocop 的不安全自动纠正功能是禁用的。我们可以通过将以下内容添加到 `settings.json` 中来告诉 Zed 启用它：

```json [settings]
{
  "languages": {
    "Ruby": {
      // 使用 ruby-lsp 作为主要语言服务器，rubocop 作为辅助。
      "language_servers": ["ruby-lsp", "rubocop", "!solargraph", "..."]
    }
  },
  "lsp": {
    "rubocop": {
      "initialization_options": {
        "safeAutocorrect": false
      }
    },
    "ruby-lsp": {
      "initialization_options": {
        "enabledFeatures": {
          "diagnostics": false
        }
      }
    }
  }
}
```

## 设置 Sorbet

[Sorbet](https://sorbet.org/) 是一个流行的 Ruby 静态类型检查器，包含一个语言服务器。

要启用 Sorbet，请将 `\"sorbet\"` 添加到 Ruby 的 `language_servers` 列表中。如果 Sorbet 旨在成为您的主要 LSP，或者您计划将其与其他 LSP 结合使用以实现特定功能（如类型检查），您可能需要禁用其他语言服务器。

在设置 ({#kb zed::OpenSettings}) 中的 "语言">"Ruby" 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": [
        "ruby-lsp",
        "sorbet",
        "!rubocop",
        "!solargraph",
        "..."
      ]
    }
  }
}
```
有关安装 Sorbet、在项目中设置它以及配置其行为的所有方面，请参阅 [官方 Sorbet 文档](https://sorbet.org/docs/overview)。

## 设置 Steep

[Steep](https://github.com/soutaro/steep) 是一个使用 RBS 文件定义类型的 Ruby 静态类型检查器。

要启用 Steep，请将 `\"steep\"` 添加到 Ruby 的 `language_servers` 列表中。您可能需要根据您想要的设置调整顺序或禁用其他 LSP。

在设置 ({#kb zed::OpenSettings}) 中的 "语言">"Ruby" 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Ruby": {
      "language_servers": [
        "ruby-lsp",
        "steep",
        "!solargraph",
        "!rubocop",
        "..."
      ]
    }
  }
}
```

## 设置 Herb

`Herb` 默认为 `HTML+ERB` 语言启用。

## 在 Ruby 中使用 Tailwind CSS 语言服务器

要在 Ruby/ERB 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、linting 等），您需要配置该语言服务器，以便它知道在何处查找 CSS 类，方法是将以下内容添加到您的 `settings.json` 中：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "experimental": {
          "classRegex": ["\\bclass:\\s*['\"]([^'\"]*)['\"]"]
        }
      }
    }
  }
}
```

使用这些设置，您将获得 ERB 文件内部的 HTML 属性以及 `class:` 键后面的 Ruby/ERB 字符串中的 Tailwind CSS 类的补全。示例：

```rb
# Ruby 文件:
def method
  div(class: "pl-2 <completion here>") do
    p(class: "mt-2 <completion here>") { "Hello World" }
  end
end

# ERB 文件:
<%= link_to "Hello", "/hello", class: "pl-2 <completion here>" %>
<a href="/hello" class="pl-2 <completion here>">Hello</a>
```

## 运行测试

要在您的 Ruby 项目中运行测试，您可以在本地的 `.zed/tasks.json` 配置文件中设置自定义任务。这些任务可以定义为与不同的测试框架（如 Minitest、RSpec、quickdraw 和 tldr）一起工作。以下是如何设置这些任务以便在编辑器中运行测试的一些示例。

### 使用 Rails 的 Minitest

```json [tasks]
[
  {
    "label": "test $ZED_RELATIVE_FILE -n /$ZED_CUSTOM_RUBY_TEST_NAME/",
    "command": "bin/rails",
    "args": [
      "test",
      "$ZED_RELATIVE_FILE",
      "-n",
      "\"$ZED_CUSTOM_RUBY_TEST_NAME\""
    ],
    "cwd": "$ZED_WORKTREE_ROOT",
    "tags": ["ruby-test"]
  }
]
```

### Minitest

Plain minitest 不支持按行号运行测试，仅支持按名称运行，因此我们需要使用 `$ZED_CUSTOM_RUBY_TEST_NAME`：

```json [tasks]
[
  {
    "label": "-Itest $ZED_RELATIVE_FILE -n /$ZED_CUSTOM_RUBY_TEST_NAME/",
    "command": "bundle",
    "args": [
      "exec",
      "ruby",
      "-Itest",
      "$ZED_RELATIVE_FILE",
      "-n",
      "\"$ZED_CUSTOM_RUBY_TEST_NAME\""
    ],
    "cwd": "$ZED_WORKTREE_ROOT",
    "tags": ["ruby-test"]
  }
]
```

### RSpec

```json [tasks]
[
  {
    "label": "test $ZED_RELATIVE_FILE:$ZED_ROW",
    "command": "bundle",
    "args": ["exec", "rspec", "\"$ZED_RELATIVE_FILE:$ZED_ROW\""],
    "cwd": "$ZED_WORKTREE_ROOT",
    "tags": ["ruby-test"]
  }
]
```

类似的任务语法可用于其他测试框架，例如 `quickdraw` 或 `tldr`。

## 调试

Ruby 扩展提供了一个用于调试 Ruby 代码的调试适配器。Zed 中该适配器的名称（在 UI 和 `debug.json` 中）是 `rdbg`，它在底层使用 [`debug`](https://github.com/ruby/debug) gem。该扩展使用与[语言服务器相同的激活逻辑](#language-server-activation)。

### 示例

#### 调试 Ruby 脚本

```json [debug]
[
  {
    "label": "Debug current file",
    "adapter": "rdbg",
    "request": "launch",
    "script": "$ZED_FILE",
    "cwd": "$ZED_WORKTREE_ROOT"
  }
]
```

#### 调试 Rails 服务器

```json [debug]
[
  {
    "label": "Debug Rails server",
    "adapter": "rdbg",
    "request": "launch",
    "command": "./bin/rails",
    "args": ["server"],
    "cwd": "$ZED_WORKTREE_ROOT",
    "env": {
      "RUBY_DEBUG_OPEN": "true"
    }
  }
]
```

## 格式化工具

### `erb-formatter`

要格式化 ERB 模板，您可以使用 `erb-formatter` 格式化工具。此格式化工具使用 [`erb-formatter`](https://rubygems.org/gems/erb-formatter) gem 来格式化 ERB 模板。

在设置 ({#kb zed::OpenSettings}) 中的 "语言">"HTML+ERB" 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "HTML+ERB": {
      "formatter": {
        "external": {
          "command": "erb-formatter",
          "arguments": ["--stdin-filename", "{buffer_path}"]
        }
      }
    }
  }
}
```