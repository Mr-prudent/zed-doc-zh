---
title: YAML
description: "在 Zed 中配置 YAML 语言支持，包括语言服务器、格式化和调试功能。"
---

# YAML

YAML 支持在 Zed 中原生可用。

- Tree-sitter: [zed-industries/tree-sitter-yaml](https://github.com/zed-industries/tree-sitter-yaml)
- 语言服务器: [redhat-developer/yaml-language-server](https://github.com/redhat-developer/yaml-language-server)

## 配置

您可以通过将各种 [yaml-language-server 设置](https://github.com/redhat-developer/yaml-language-server?tab=readme-ov-file#language-server-settings) 添加到您 Zed 的 settings.json 文件中，在 `lsp` 键下的 `yaml-language-server` 块内进行配置。

您可以使用相对路径配置自定义 YAML 模式。Zed 会相对于您的项目根目录解析路径：

```json [settings]
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "keyOrdering": true,
          "format": {
            "singleQuote": true
          },
          "schemas": {
              "https://getcomposer.org/schema.json": ["/*"],
              "./schemas/kubernetes.yaml": "k8s/**/*.yaml",
              "~/global-schemas/docker-compose.yaml": "docker-compose*.yml"
          }
        }
      }
    }
  }
```

以 `./` 开头的路径会相对于工作树根目录解析。以 `~/` 开头的路径会扩展到您的主目录。

注意，设置键必须嵌套，因此 `yaml.keyOrdering` 会变成 `{"yaml": { "keyOrdering": true }}`。

## 格式化

默认情况下，Zed 使用 Prettier 来格式化 YAML 文件。

### Prettier 格式化

您可以自定义 Prettier 的格式化行为。例如，要在 YAML 文件中使用单引号，请将以下内容添加到您的 `.prettierrc` 配置文件中：

```json
{
  "overrides": [
    {
      "files": ["*.yaml", "*.yml"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### yaml-language-server 格式化

要使用 `yaml-language-server` 而不是 Prettier 进行 YAML 格式化，请在设置（{#kb zed::OpenSettings}）下的“语言” > “YAML”中配置，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "YAML": {
      "formatter": "language_server"
    }
  }
```

## 模式

默认情况下，yaml-language-server 会尝试为给定的 YAML 文件确定正确的模式，并从 [Json Schema Store](https://schemastore.org/) 检索相应的 JSON 模式。

您可以通过 `schemas` 设置键（如上所示）或通过在 YAML 文件顶部提供一个 [内联模式](https://github.com/redhat-developer/yaml-language-server#using-inlined-schema) 引用注释来覆盖任何自动检测到的模式：

```yaml
# yaml-language-server: $schema=https://www.schemastore.org/github-action.json
name: Issue Assignment
on:
  issues:
    types: [opened]
```

如果需要，您可以禁用从 JSON 模式自动检测和检索模式：

```json [settings]
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "schemaStore": {
            "enable": false
          }
        }
      }
    }
  }
```

## 自定义标签

Yaml-language-server 支持 [自定义标签](https://github.com/redhat-developer/yaml-language-server#adding-custom-tags)，可用于在运行时将自定义应用程序功能注入到您的 YAML 文件中。

例如，Amazon CloudFormation YAML 使用了许多自定义标签，要支持这些标签，您可以将以下内容添加到您的 settings.json 中：

```json [settings]
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "customTags": [
            "!And scalar",
            "!And mapping",
            "!And sequence",
            "!If scalar",
            "!If mapping",
            "!If sequence",
            "!Not scalar",
            "!Not mapping",
            "!Not sequence",
            "!Equals scalar",
            "!Equals mapping",
            "!Equals sequence",
            "!Or scalar",
            "!Or mapping",
            "!Or sequence",
            "!FindInMap scalar",
            "!FindInMap mapping",
            "!FindInMap sequence",
            "!Base64 scalar",
            "!Base64 mapping",
            "!Base64 sequence",
            "!Cidr scalar",
            "!Cidr mapping",
            "!Cidr sequence",
            "!Ref scalar",
            "!Ref mapping",
            "!Ref sequence",
            "!Sub scalar",
            "!Sub mapping",
            "!Sub sequence",
            "!GetAtt scalar",
            "!GetAtt mapping",
            "!GetAtt sequence",
            "!GetAZs scalar",
            "!GetAZs mapping",
            "!GetAZs sequence",
            "!ImportValue scalar",
            "!ImportValue mapping",
            "!ImportValue sequence",
            "!Select scalar",
            "!Select mapping",
            "!Select sequence",
            "!Split scalar",
            "!Split mapping",
            "!Split sequence",
            "!Join scalar",
            "!Join mapping",
            "!Join sequence",
            "!Condition scalar",
            "!Condition mapping",
            "!Condition sequence"
          ]
        }
      }
    }
  }
```