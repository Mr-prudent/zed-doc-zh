---
title: Diff
description: "在 Zed 中配置 Diff 语言支持，包括语言服务器、格式化和调试。"
---

# Diff

Diff 支持 Zed 原生支持。

- Tree-sitter: [zed-industries/the-mikedavis/tree-sitter-diff](https://github.com/the-mikedavis/tree-sitter-diff)

## 配置

Zed 不会尝试格式化 diff 文件，并且将 [`remove_trailing_whitespace_on_save`](https://zed.dev/docs/reference/all-settings#remove-trailing-whitespace-on-save) 和 [`ensure-final-newline-on-save`](https://zed.dev/docs/reference/all-settings#ensure-final-newline-on-save) 设置为 false。

Zed 会自动识别带有 `patch` 和 `diff` 扩展名的文件为 Diff 文件。要识别其他扩展名，请将它们添加到 Zed 的 settings.json 中的 `file_types` 中：

```json [settings]
  "file_types": {
    "Diff": ["dif"]
  },
```