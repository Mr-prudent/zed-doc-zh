---
title: 代码片段
description: "Zed 扩展的代码片段。"
---

# 代码片段

扩展可以为一种或多种语言提供代码片段。

每个包含代码片段的文件都可以在 `extensions.toml` 文件的 `snippets` 字段中指定。

引用的路径必须是相对于 `extension.toml` 的。

## 定义代码片段

给定的扩展可以提供一个或多个代码片段。每个代码片段都必须在 `extension.toml` 中注册。

Zed 根据语言的小写名称来匹配代码片段文件（例如，Rust 的 `rust.json`）。
你可以使用 `snippets.json` 作为文件名来定义无论当前缓冲区语言为何都可用代码片段。

例如，这里是一个为 Rust 和 TypeScript 提供代码片段的扩展：

```toml
snippets = ["./snippets/rust.json", "./snippets/typescript.json"]
```

有关如何创建代码片段的更多信息，请参阅 [代码片段文档](../snippets.md)。