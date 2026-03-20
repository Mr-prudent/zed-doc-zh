---
title: Markdown
description: "在 Zed 中配置 Markdown 语言支持，包括语言服务器、格式化和调试功能。"
---

# Markdown

Markdown 支持在 Zed 中原生可用。

- Tree-sitter: [tree-sitter-markdown](https://github.com/tree-sitter-grammars/tree-sitter-markdown)
- 语言服务器: N/A

## 语法高亮代码块

Zed 通过利用 [tree-sitter 语言语法](../extensions/languages.md#grammar) 支持对 Markdown 代码块进行特定语言的语法高亮。所有 [Zed 支持的语言](../languages.md)，包括官方或社区扩展提供的语言，都可以在 Markdown 代码块中使用。您所需要做的只是在开始代码块 <kbd>```</kbd> 后提供一个语言名称，如下所示：

````python
```python
# 使用 functools 的 lru_cache 缓存函数结果
import functools as ft

@ft.lru_cache(maxsize=500)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
```
````

## 配置

### 格式化

Zed 支持使用 Prettier 自动重新格式化 Markdown 文档。您可以通过 {#action editor::Format} 操作手动触发此功能，或使用 {#kb editor::Format} 键盘快捷键。或者，您也可以启用保存时自动格式化。

在设置 ({#kb zed::OpenSettings}) 中的 "语言 > Markdown" 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Markdown": {
      "format_on_save": "on"
    }
  },
```

### 列表续行

当您在列表项末尾按下 Enter 键时，Zed 会自动继续列表。支持的列表类型：

- 无序列表（使用 `-`、`*` 或 `+` 作为标记）
- 有序列表（数字会自动递增）
- 任务列表（`- [ ]` 和 `- [x]`）

在空列表项上按下 Enter 键会移除标记并退出列表。

要禁用此行为，请在设置 ({#kb zed::OpenSettings}) 中的 "语言 > Markdown" 下进行配置，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Markdown": {
      "extend_list_on_newline": false
    }
  },
```

### 列表缩进

当光标位于仅包含列表标记的行上时，按下 Tab 键，Zed 会缩进列表项。这使您可以快速创建嵌套列表。

要禁用此行为，请在设置 ({#kb zed::OpenSettings}) 中的 "语言 > Markdown" 下进行配置，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Markdown": {
      "indent_list_on_tab": false
    }
  },
```

### 末尾空白字符

默认情况下，Zed 会在保存时移除末尾的空白字符。如果您依赖 Markdown 文件中不可见的末尾空白字符转换为 `<br />`，您可以禁用此行为。

在设置 ({#kb zed::OpenSettings}) 中的 "语言 > Markdown" 下配置，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "Markdown": {
      "remove_trailing_whitespace_on_save": false
    }
  },
```