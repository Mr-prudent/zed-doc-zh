---
title: Shell 脚本
description: "在 Zed 中配置 Shell 脚本语言支持，包括语言服务器、格式化和调试。"
---

# Shell 脚本

Zed 原生支持 Shell 脚本（bash、zsh、dash、sh）。

- Tree-sitter: [tree-sitter/tree-sitter-bash](https://github.com/tree-sitter/tree-sitter-bash)

## 设置

在设置（{#kb zed::OpenSettings}）中的“语言”>“Shell 脚本”下进行配置，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Shell Script": {
      "tab_size": 2,
      "hard_tabs": false
    }
  }
```

### 格式化

Zed 支持使用外部工具（如 [`shfmt`](https://github.com/mvdan/sh)）自动格式化 Shell 脚本。

1. 安装 `shfmt`：

```sh
brew install shfmt            # macOS (homebrew)
sudo apt-get install shfmt    # debian/ubuntu
dnf install shfmt             # fedora
yum install shfmt             # redhat
pacman -Sy shfmt              # archlinux
choco install shfmt           # windows (chocolatey)
```

2. 确保 `shfmt` 在您的路径中可用，并检查版本：

```sh
which shfmt
shfmt --version
```

3. 在设置（{#kb zed::OpenSettings}）中的“语言”>“Shell 脚本”下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Shell Script": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "shfmt",
          // 将 `--indent 2` 更改为与您首选的 tab_size 匹配
          "arguments": ["--filename", "{buffer_path}", "--indent", "2"]
        }
      }
    }
  }
```

## 另请参阅：

- [Zed 文档：语言支持：Bash](./bash.md)
- [Zed 文档：语言支持：Fish](./fish.md)