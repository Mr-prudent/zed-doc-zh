---
title: Bash
description: "配置 Zed 中的 Bash 语言支持，包括语言服务器、格式化和调试。"
---

# Bash

Bash 支持通过 [Bash 扩展](https://github.com/zed-extensions/bash) 提供。

- Tree-sitter: [tree-sitter/tree-sitter-bash](https://github.com/tree-sitter/tree-sitter-bash)
- 语言服务器: [bash-lsp/bash-language-server](https://github.com/bash-lsp/bash-language-server)

## 配置

当 `shellcheck` 可用时，`bash-language-server` 将在内部使用它来提供诊断。

### 安装 `shellcheck`:

```sh
brew install shellcheck             # macOS (HomeBrew)
apt-get install shellcheck          # Ubuntu/Debian
pacman -S shellcheck                # ArchLinux
dnf install shellcheck              # Fedora
yum install shellcheck              # CentOS/RHEL
zypper install shellcheck           # openSUSE
choco install shellcheck            # Windows (Chocolatey)
```

并验证它可以从您的路径中访问：

```sh
which shellcheck
shellcheck --version
```

如果您希望自定义报告的警告/错误，您只需创建一个 `.shellcheckrc` 文件。您可以在项目根目录或您的主目录 (`~/.shellcheckrc`) 中创建它。更多内容请参见：[shellcheck 文档](https://github.com/koalaman/shellcheck/wiki/Ignore#ignoring-one-or-more-types-of-errors-forever)。

### 另请参阅：

- [Zed 文档：语言支持：Shell 脚本](./sh.md)