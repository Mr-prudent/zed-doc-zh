---
title: Glob 模式 - Zed
description: Glob 模式在 Zed 中用于文件匹配、搜索过滤和配置的工作原理。语法参考和示例。
---

# Globs

Zed 支持 [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) 模式的使用，这是 sh、bash、zsh 等支持的 Unix shell 风格路径匹配通配符（如 `*.md` 或 `docs/src/**/*.md`）的正式名称。Glob 与 [regex (正则表达式)](https://en.wikipedia.org/wiki/Regular_expression) 相似但有区别。在 Zed 中，glob 通常在匹配文件名时使用。

## Glob 风格

Zed 使用两个不同的 rust crate 来匹配 glob 模式：

- [ignore crate](https://docs.rs/ignore/latest/ignore/) 用于匹配存储在 `.gitignore` 文件中的 glob 模式
- [glob crate](https://docs.rs/glob/latest/glob/) 用于匹配 Zed 中的文件路径

虽然简单表达式在不同环境中是可移植的（例如在 gitignore 中运行 `ls *.py` 或 `*.tmp`），但对于更高级功能的支持和语法存在显著差异（字符类、排除、`**` 等），具体实现各不相同。在本文档的其余部分，我们将描述通过 `glob` crate 实现的 Zed 所支持的 glob。有关 `.gitignore`、shell 和其他编程语言的 glob 模式语法文档链接，请参阅下面的 [参考资料](#references)。

`glob` crate 完全用 rust 实现，不依赖您平台 libc 提供的 `glob` / `fnmatch` 接口。这意味着 Zed 中的 glob 在跨平台时应表现出相似的行为。

## 简介

Glob "模式" 用于匹配文件名或完整的文件路径。例如，当使用“搜索所有文件” {#kb project_search::ToggleFocus} 时，您可以点击漏斗状的“切换过滤器”按钮或 {#kb project_search::ToggleFilters}，它将显示额外的搜索字段“包含”和“排除”，这些字段支持用于匹配文件路径和文件名的 glob 模式。

### 多个模式

您可以通过逗号分隔在项目搜索过滤器中指定多个 glob 模式。使用逗号分隔的模式时，Zed 会正确处理单个模式中的花括号：

- `*.ts, *.tsx` — 匹配 TypeScript 和 TSX 文件
- `src/{components,utils}/**/*.ts, tests/**/*.test.ts` — 匹配特定目录中的 TypeScript 文件以及测试文件

每个模式都是独立评估的。花括号内的逗号（如 `{a,b}`）被视为模式的一部分，而不是分隔符。

**重要：** 虽然花括号在模式中被保留，但 Zed 不会将它们扩展为多个模式。模式 `src/{a,b}/*.ts` 匹配字面的路径结构，而不是 `src/a/*.ts` 或 `src/b/*.ts`。这与 shell 行为不同。

创建 glob 模式时，您可以使用一个或多个特殊字符：

| 特殊字符 | 含义                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `?`               | 匹配任何单个字符                                              |
| `*`               | 匹配任意（可能为空）的字符序列                                 |
| `**`              | 匹配当前目录和任意子目录                                      |
| `[abc]`           | 匹配括号中的任意一个字符                                       |
| `[a-z]`           | 匹配字符范围内的任意一个字符（按 Unicode 排序）                 |
| `[!...]`          | 与 `[...]` 取反（匹配不在括号中的字符）                         |

注意：

1. 花括号字符 `{` 和 `}` 是字面模式字符，而不是扩展运算符。模式 `src/{a,b}/*.ts` 匹配包含字面文本 `{a,b}` 的路径，而不是像 shell globbing 中匹配 `src/a/*.ts` 或 `src/b/*.ts` 的路径。
2. 要在括号内匹配字面 `-` 字符，它必须放在第一位 `[-abc]` 或最后一位 `[abc-]`。
3. 要匹配字面的 `[` 字符，请使用 `[[]` 或将其作为组中的第一个字符 `[[abc]`。
4. 要匹配字面的 `]` 字符，请使用 `[]]` 或将其作为组中的最后一个字符 `[abc]]`。

## 示例

### 匹配文件扩展名

如果您只想搜索 Markdown 文件，请在“包含”搜索字段中添加 `*.md`。

### 不区分大小写的匹配

Zed 中的 glob 是区分大小写的，因此 `*.c` 将不会匹配 `main.C`（即使在 macOS 上不区分大小写的文件系统如 HFS+/APFS 上也是如此）。请改用括号来匹配字符。因此，不要使用 `*.c`，而是使用 `*.[cC]`。

### 匹配目录

如果您想在 [zed 仓库](https://github.com/zed-industries/zed) 中搜索 [配置语言服务器](https://zed.dev/docs/configuring-languages#configuring-language-servers) 的示例（在 Zed 的 settings.json 中的 `"lsp"` 下），您可以搜索 `"lsp"`，并在“包含”过滤器中指定 `docs/**/*.md`。这将只匹配路径在 `docs` 目录或任何嵌套子目录 `**/` 下且文件名以 `.md` 结尾的文件。

如果您想将自己限制在仅 [Zed 语言特定文档](https://zed.dev/docs/languages) 页面，您可以定义一个更窄的模式：`docs/src/languages/*.md`。这将匹配 [`docs/src/languages/rust.md`](https://github.com/zed-industries/zed/blob/main/docs/src/languages/rust.md) 和 [`docs/src/languages/cpp.md`](https://github.com/zed-industries/zed/blob/main/docs/src/languages/cpp.md)，但不匹配 [`docs/src/configuring-languages.md`](https://github.com/zed-industries/zed/blob/main/docs/src/configuring-languages.md)。

### 隐式通配符

在项目搜索上使用“包含”/“排除”过滤器时，每个 glob 都被包装在隐式通配符中。例如，要从搜索中排除路径或文件名中包含 license 的任何文件，只需在排除框中键入 `license`。在后台，Zed 将 `license` 转换为 `**license**`。这意味着文件名为 `license.*`、`*.license` 或在 `license` 子目录中的文件都将被过滤掉。这使用户可以轻松过滤 `*.ts` 而不必每次都记住输入 `**/*.ts`。

或者，如果在您的 Zed 设置中，您想要一个仅应用于特定目录的 [`file_types`](./reference/all-settings.md#file-types) 覆盖，则必须显式包含通配符 glob。例如，如果您有一个带有 `html` 扩展名的模板文件目录，您希望将其识别为 Jinja2 模板，您可以使用以下方法：

```json [设置]
{
  "file_types": {
    "C++": ["[cC]"],
    "Jinja2": ["**/templates/*.html"]
  }
}
```

## 参考资料

尽管 Zed 中的 glob 如上所述实现，但在使用其他语言编写代码时使用 glob，请参考您平台的 glob 文档：

- [macOS fnmatch](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man3/fnmatch.3.html) (BSD C Standard Library)
- [Linux fnmatch](https://www.gnu.org/software/libc/manual/html_node/Wildcard-Matching.html) (GNU C Standard Library)
- [POSIX fnmatch](https://pubs.opengroup.org/onlinepubs/9699919799/functions/fnmatch.html) (POSIX Specification)
- [node-glob](https://github.com/isaacs/node-glob) (Node.js `glob` package)
- [Python glob](https://docs.python.org/3/library/glob.html) (Python Standard Library)
- [Golang glob](https://pkg.go.dev/path/filepath#Match) (Go Standard Library)
- [gitignore patterns](https://git-scm.com/docs/gitignore) (Gitignore Pattern Format)
- [PowerShell: About Wildcards](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_wildcards) (Wildcards in PowerShell)