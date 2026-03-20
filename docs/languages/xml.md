---
title: XML
description: "在 Zed 中配置 XML 语言支持，包括语言服务器、格式化和调试。"
---

# XML

XML 支持通过 [XML 扩展](https://github.com/sweetppro/zed-xml/) 提供。

- Tree-sitter: [tree-sitter-grammars/tree-sitter-xml](https://github.com/tree-sitter-grammars/tree-sitter-xml)

## 配置

如果您有额外的文件扩展名未被自动识别为 XML，只需将它们添加到 Zed 设置中的 [file_types](../reference/all-settings.md#file-types)：

```json [设置]
  "file_types": {
    "XML": ["rdf", "gpx", "kml"]
  }
```