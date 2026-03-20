---
title: OpenTofu
description: "在 Zed 中配置 OpenTofu 语言支持，包括语言服务器、格式化和调试。"
---

# OpenTofu

OpenTofu 支持可通过 [OpenTofu 扩展](https://github.com/ashpool37/zed-extension-opentofu) 获得。

- Tree-sitter: [MichaHoffmann/tree-sitter-hcl](https://github.com/MichaHoffmann/tree-sitter-hcl)
- Language Server: [opentofu/tofu-ls](https://github.com/opentofu/tofu-ls)

## 配置

要在编辑 `.tf` 和 `.tfvars` 文件时自动使用 OpenTofu 扩展和语言服务器，
请卸载 Terraform 扩展或在您的 settings.json 中添加以下内容：

```json
"file_types": {
  "OpenTofu": ["tf"],
  "OpenTofu Vars": ["tfvars"]
},
```

有关服务器设置的完整列表，请参阅[此处的文档](https://github.com/opentofu/tofu-ls/blob/main/docs/SETTINGS.md)。