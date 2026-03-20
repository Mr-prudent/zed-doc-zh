---
title: Nim
description: "配置 Zed 中的 Nim 语言支持，包括语言服务器、格式化和调试。"
---

# Nim

Zed 中的 Nim 语言支持由社区维护的 [Nim 扩展](https://github.com/foxoman/zed-nim) 提供。
问题反馈请提交至: [https://github.com/foxoman/zed-nim/issues](https://github.com/foxoman/zed-nim/issues)

- Tree-sitter: [alaviss/tree-sitter-nim](https://github.com/alaviss/tree-sitter-nim)
- 语言服务器: [nim-lang/langserver](https://github.com/nim-lang/langserver)

## 格式化

要使用 [arnetheduck/nph](https://github.com/arnetheduck/nph) 作为格式化工具，请遵循 [nph 安装说明](https://github.com/arnetheduck/nph?tab=readme-ov-file#installation)。

在设置 ({#kb zed::OpenSettings}) 中的 "语言" > "Nim" 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Nim": {
      "formatter": {
        "external": {
          "command": "nph",
          "arguments": ["-"]
        }
      }
    }
  }
```