---
title: Helm
description: "在 Zed 中配置 Helm 语言支持，包括语言服务器、格式化和调试。"
---

# Helm

Zed 对 Helm 的支持由社区维护的 [Helm 扩展](https://github.com/cabrinha/helm.zed) 提供。

- Tree-sitter: [tree-sitter-go-template](https://github.com/ngalaiko/tree-sitter-go-template/tree/master)
- 语言服务器: [mrjosh/helm-ls](https://github.com/mrjosh/helm-ls)

## 设置

通过编辑你的 `.zed/settings.json` 并添加以下内容来为 Helm 文件启用 Helm 语言：

```json [settings]
  "file_types": {
    "Helm": [
      "**/templates/**/*.tpl",
      "**/templates/**/*.yaml",
      "**/templates/**/*.yml",
      "**/helmfile.d/**/*.yaml",
      "**/helmfile.d/**/*.yml",
      "**/values*.yaml"
    ]
  }
```

由于 helm-ls 支持，这也会将 values.yaml 文件标记为 helm 类型。