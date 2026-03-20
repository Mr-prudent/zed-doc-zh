---
title: Terraform
description: "在 Zed 中配置 Terraform 语言支持，包括语言服务器、格式化和调试。"
---

# Terraform

Terraform 支持可通过 [Terraform 扩展](https://github.com/zed-extensions/terraform) 使用。

- Tree-sitter: [MichaHoffmann/tree-sitter-hcl](https://github.com/MichaHoffmann/tree-sitter-hcl)
- 语言服务器: [hashicorp/terraform-ls](https://github.com/hashicorp/terraform-ls)

## 配置

<!--
TBD: 添加使用 `rootModulePaths` 的示例，以匹配上游示例 https://github.com/hashicorp/terraform-ls/blob/main/docs/SETTINGS.md#vs-code
-->

您可以在 `settings.json` 中配置 Terraform 语言服务器，例如：

```json [settings]
{
  "lsp": {
    "terraform-ls": {
      "initialization_options": {
        "experimentalFeatures": {
          "prefillRequiredFields": true
        }
      }
    }
  }
}
```

有关服务器设置的完整列表，请参见[此处](https://github.com/hashicorp/terraform-ls/blob/main/docs/SETTINGS.md)。