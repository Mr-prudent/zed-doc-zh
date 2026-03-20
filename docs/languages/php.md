---
title: PHP
description: "在 Zed 中配置 PHP 语言支持，包括语言服务器、格式化和调试。"
---

# PHP

PHP 支持通过 [PHP 扩展](https://github.com/zed-extensions/php) 提供。

- Tree-sitter: [tree-sitter/tree-sitter-php](https://github.com/tree-sitter/tree-sitter-php)
- 语言服务器: [phpactor/phpactor](https://github.com/phpactor/phpactor)
- 替代语言服务器: [bmewburn/vscode-intelephense](https://github.com/bmewburn/vscode-intelephense/)

## 安装 PHP

PHP 扩展需要 PHP 已安装并且在您的 `PATH` 中可用：

```sh
# macOS 使用 Homebrew
brew install php

# Debian/Ubuntu
sudo apt-get install php-cli

# CentOS 8+/RHEL
sudo dnf install php-cli

# Arch Linux
sudo pacman -S php

# 检查 PHP 路径
## macOS 和 Linux
which php

## Windows
where php
```

## 选择语言服务器

PHP 扩展使用 [LSP 语言服务器](https://microsoft.github.io/language-server-protocol)，默认为 Phpactor。如果您想使用其他支持 Zed 的语言服务器（例如 Intelephense 或 PHP Tools），请务必遵循文档说明进行实现。

### Intelephense

[Intelephense](https://intelephense.com/) 是一个采用免费增值模式的[专有](https://github.com/bmewburn/vscode-intelephense/blob/master/LICENSE.txt#L29) PHP 语言服务器。某些功能需要购买[高级许可证](https://intelephense.com/buy)。

在设置 ({#kb zed::OpenSettings}) 中的 语言 > PHP 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "PHP": {
      "language_servers": ["intelephense", "!phpactor", "!phptools", "..."]
    }
  }
}
```

要使用高级功能，您可以将许可证文件放置在 macOS 和 Linux 的主目录 `~/intelephense/licence.txt` 中，或在 Windows 上放置在 `%USERPROFILE%/intelephense/licence.txt`。

或者，您可以将许可证密钥或包含许可证密钥的文件路径作为初始化选项传递。为此，请将以下内容添加到您的 `settings.json`：

```json [settings]
{
  "lsp": {
    "intelephense": {
      "initialization_options": {
        "licenceKey": "/path/to/licence.txt"
      }
    }
  }
}
```

### PHP Tools

[PHP Tools](https://www.devsense.com/) 是一个提供免费和高级功能的专有语言服务器。您需要[购买许可证](https://www.devsense.com/en/purchase)才能激活高级功能。

在设置 ({#kb zed::OpenSettings}) 中的 语言 > PHP 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "PHP": {
      "language_servers": ["phptools", "!intelephense", "!phpactor", "..."]
    }
  }
}
```

要使用高级功能，您可以在 `settings.json` 的 `initialization_options` 中添加您的许可证：

```json [settings]
{
  "lsp": {
    "phptools": {
      "initialization_options": {
        "0": "your_license_key"
      }
    }
  }
}
```

或者，在您项目中的 `.env` 文件中设置环境变量 `DEVSENSE_PHP_LS_LICENSE`。

```env
DEVSENSE_PHP_LS_LICENSE="your_license_key"
```

有关更多详细信息，请查阅 [Zed 的 PHP Tools 文档](https://docs.devsense.com/other/zed/)。

### Phpactor

在设置 ({#kb zed::OpenSettings}) 中的 语言 > PHP 下配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "PHP": {
      "language_servers": ["phpactor", "!intelephense", "!phptools", "..."]
    }
  }
}
```

## PHPDoc

Zed 支持 PHPDoc 注释的语法高亮。

- Tree-sitter: [claytonrcarter/tree-sitter-phpdoc](https://github.com/claytonrcarter/tree-sitter-phpdoc)

## 调试

PHP 扩展通过 Xdebug 为 PHP 提供调试适配器。有几种使用方法：

```json
[
  {
    "label": "PHP: Listen to Xdebug",
    "adapter": "Xdebug",
    "request": "launch",
    "port": 9003
  },
  {
    "label": "PHP: Debug this test",
    "adapter": "Xdebug",
    "request": "launch",
    "program": "vendor/bin/phpunit",
    "args": ["--filter", "$ZED_SYMBOL"]
  }
]
```

如果您遇到问题，以下是一些常见的故障排除提示：

- 确保您已为正在运行的 PHP 版本安装了 Xdebug。
- 确保 Xdebug 配置为在 `debug` 模式下运行。
- 确保 Xdebug 实际上正在启动调试会话。
- 确保 Xdebug 和 Zed 之间的主机和端口匹配。
- 通过在您要调试的页面中使用 `xdebug_info()` 函数来查看诊断日志。

## 在 PHP 中使用 Tailwind CSS 语言服务器

要在 PHP 文件中获得 [Tailwind CSS 语言服务器](https://github.com/tailwindlabs/tailwindcss-intellisense/tree/HEAD/packages/tailwindcss-language-server#readme) 的所有功能（自动补全、代码检查等），您需要配置该语言服务器，使其知道在哪里查找 CSS 类，方法是将以下内容添加到您的 `settings.json`：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "php": "html"
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            "class=\\\"([^\\\"]*)\\\""
          ]
        }
      }
    }
  }
}
```

通过这些设置，您将在 PHP 文件中 HTML 属性内获得 Tailwind CSS 类的自动补全。示例：

```php
<?php
// 带有 HTML 的 PHP 文件：
?>
<div class="flex items-center <completion here>">
  <p class="text-lg font-bold <completion here>">Hello World</p>
</div>
```

### Laravel/Blade

对于 Laravel/Blade 文件，您可能需要额外的配置来处理 Blade 指令：

```json [settings]
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "php": "html",
          "blade": "html"
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            "class=\\\"([^\\\"]*)\\\"",
            "@class\\(\\[([^\\]]*)\\]\\)"
          ]
        }
      }
    }
  }
}
```

这也将提供 Blade 指令中的自动补全，例如：

```blade
{{-- Blade 文件 --}}
<div class="flex {{ $customClass }} <completion here>">
  @class(['flex', 'items-center', '<completion here>'])
</div>
```