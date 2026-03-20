---
title: Fish
description: "在 Zed 中配置 Fish 语言支持，包括语言服务器、格式化和调试。"
---

# Fish

Zed 中的 Fish 语言支持由社区维护的 [Fish 扩展](https://github.com/hasit/zed-fish) 提供。
问题报告请提交至：[https://github.com/hasit/zed-fish/issues](https://github.com/hasit/zed-fish/issues)

- Tree-sitter: [ram02z/tree-sitter-fish](https://github.com/ram02z/tree-sitter-fish)

### 格式化

Zed 支持使用外部工具（如 [`fish_indent`](https://fishshell.com/docs/current/cmds/fish_indent.html)）自动格式化 fish 代码，该工具已包含在 fish 中。

1. 确保 `fish_indent` 在您的路径中可用，并检查版本：

```sh
which fish_indent
fish_indent --version
```

2. 配置 Zed 使用 `fish_indent` 自动格式化 fish 代码：

```json [settings]
  "languages": {
    "Fish": {
      "formatter": {
        "external": {
          "command": "fish_indent"
        }
      }
    }
  },
```