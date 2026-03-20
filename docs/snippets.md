---
title: Snippets - Zed
description: 在 Zed 中创建和使用代码片段，包括标签页占位符、变量以及语言范围的触发器。
---

# 代码片段

使用 {#action snippets::ConfigureSnippets} 操作来创建新的代码片段文件，或为指定的[范围](#scopes)编辑现有的代码片段文件。

代码片段位于 `~/.config/zed/snippets` 目录，您可以使用 {#action snippets::OpenFolder} 操作导航到该目录。

## 示例配置

```json
{
  // 每个代码片段都必须有一个名称和主体，但前缀和描述是可选的。
  // 前缀用于触发代码片段，但如果省略，则使用名称。
  // 使用如 $1、$2 或 ${1:defaultValue} 这样的占位符来定义标签页停驻点。
  // $0 决定了最终的游标位置。
  // 具有相同值的占位符是相互链接的。
  // 如果代码片段中在占位符之外包含 $ 符号，则必须用两个反斜杠进行转义（例如 \\$var）。
  "Log to console": {
    "prefix": "log",
    "body": ["console.info(\"Hello, ${1:World}!\")", "$0"],
    "description": "输出到控制台"
  }
}
```

## Scopes (范围)

范围由小写的语言名称决定，例如 Python 的 `python.json`，Shell Script 的 `shell script.json`，但此规则有一些例外：

| Scope      | Filename        |
| ---------- | --------------- |
| Global     | snippets.json   |
| JSX        | javascript.json |
| Plain Text | plaintext.json  |

要创建 JSX 代码片段，您必须使用 `javascript.json` 代码片段文件，而不是 `jsx.json`，但这不适用于遵循上述规则的 TSX 和 TypeScript。

## 已知限制

- 当传入前缀列表时，只使用第一个前缀。
- 当前仅支持 `json` 格式的代码片段文件。