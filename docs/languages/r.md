---
title: R
description: "在 Zed 中配置 R 语言支持，包括语言服务器、格式化和调试。"
---

# R

R 支持可通过多种 R Zed 扩展获得：

- [ocsmit/zed-r](https://github.com/ocsmit/zed-r)

  - Tree-sitter: [r-lib/tree-sitter-r](https://github.com/r-lib/tree-sitter-r)
  - Language-Server: [REditorSupport/languageserver](https://github.com/REditorSupport/languageserver)

- [posit-dev/air](https://github.com/posit-dev/air/tree/main/editors/zed)
  - Formatter: [posit-dev/air](https://posit-dev.github.io/air/)

## 安装

1. [下载并安装 R](https://cloud.r-project.org/)。
2. 安装 R 包 `languageserver` 和 `lintr`：

```R
install.packages("languageserver")
install.packages("lintr")
```

3. 通过 Zed 的扩展管理器安装 [R](https://github.com/ocsmit/zed-r) 扩展，以获得基本的 R 语言支持（语法高亮、tree-sitter 支持）以及 [REditorSupport/languageserver](https://github.com/REditorSupport/languageserver) 支持。

4. 通过 Zed 的扩展管理器安装 [Air](https://posit-dev.github.io/air/) 扩展，以通过 Air 进行 R 代码格式化。

## 代码检查

`REditorSupport/languageserver` 捆绑了 [r-lib/lintr](https://github.com/r-lib/lintr) 作为代码检查器。这可以通过在您的项目中使用 `.lintr` 文件（或在您的主目录中设置全局默认值）进行配置。

```r
linters: linters_with_defaults(
    line_length_linter(120),
    commented_code_linter = NULL
  )
exclusions: list(
    "inst/doc/creating_linters.R" = 1,
    "inst/example/bad.R",
    "tests/testthat/exclusions-test"
  )
```

或者将其排除在代码检查之外，

```r
exclusions: list(".")
```

有关完整选项列表，请参阅 [使用 lintr](https://lintr.r-lib.org/articles/lintr.html)。

## 格式化

### Air

[Air](https://posit-dev.github.io/air/) 为 R 提供代码格式化，包括支持保存时格式化。[Air 的 Zed 文档](https://posit-dev.github.io/air/editor-zed.html) 包含了在 Zed 中运行 Air 的最新建议。

确保您已安装 [ocsmit/zed-r](https://github.com/ocsmit/zed-r) 扩展（用于 Zed 中通用的 R 语言支持）和 [Air](https://posit-dev.github.io/air/) 扩展。

在设置 ({#kb zed::OpenSettings}) 中配置语言服务器，路径为 语言 > R，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "R": {
      "language_servers": ["air"]
    }
  }
}
```

如果您使用来自 `REditorSupport/languageserver` 的 `"r_language_server"`，但仍希望使用 Air 进行格式化，请在设置 ({#kb zed::OpenSettings}) 中进行配置，路径为 语言 > R，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "R": {
      "language_servers": ["air", "r_language_server"],
      "use_on_type_format": false
    }
  }
}
```

请注意，此列表中 `"air"` 必须排在第一位，否则 [r-lib/styler](https://github.com/r-lib/styler) 将会通过 `"r_language_server"` 被调用。

`"r_language_server"` 提供的即时格式化规则与 Air 的格式化规则不同。为了避免这种情况，并让 Air 完全负责格式化您的 R 文件，如上所示，还需要设置 `"use_on_type_format": false`。

#### 配置 Air

Air 可以通过在您项目的根目录下放置一个 `air.toml` 文件进行最小配置：

```toml
[format]
line-width = 80
indent-width = 2
```

有关更多详细信息，请参阅 Air 关于[配置](https://posit-dev.github.io/air/configuration.html)的文档。

### Styler

`REditorSupport/languageserver` 捆绑了 [r-lib/styler](https://github.com/r-lib/styler) 作为格式化器。有关如何自定义其行为的更多信息，请参阅[自定义 Styler](https://cran.r-project.org/web/packages/styler/vignettes/customizing_styler.html)。

<!--
TBD: Get this working

### REditorSupport/languageserver 配置

您可以通过 Zed 项目设置 `.zed/settings.json` 或 Zed 用户设置 `~/.config/zed/settings.json` 来配置 [R languageserver 设置](https://github.com/REditorSupport/languageserver#settings)：

例如，要禁用 Lintr 代码检查并禁止代码片段建议（默认两者都启用）：

```json [settings]
{
  "lsp": {
    "r_language_server": {
      "settings": {
        "r": {
          "lsp": {
            "diagnostics": false,
            "snippet_support": false
          }
        }
      }
    }
  }
}
```

-->

<!--
TBD: R REPL 文档

## REPL

### Ark 安装

要在 Zed 中使用 R 的 REPL，您需要安装 [Ark](https://github.com/posit-dev/ark)，这是一个用于 Jupyter 应用的 R 内核。
您可以从 [Ark GitHub Releases](https://github.com/posit-dev/ark/releases) 下载最新版本，然后将 `ark` 二进制文件解压到您 `PATH` 中的目录。

例如，安装最新的非调试版本：

```sh
# macOS
cd /tmp
curl -L -o ark-latest-darwin.zip \
    $(curl -s "https://api.github.com/repos/posit-dev/ark/releases/latest" | \
    jq -r '.assets[] | select(.name | contains("darwin-universal") and (contains("debug") | not)) | .browser_download_url')
unzip ark-latest-darwin.zip ark
sudo mv /tmp/ark /usr/local/bin/
```

```sh
# Linux X86_64
cd /tmp
curl -L -o ark-latest-linux.zip \
    $(curl -s "https://api.github.com/repos/posit-dev/ark/releases/latest" \
        | jq -r '.assets[] | select(.name | contains("linux-x64") and (contains("debug") | not)) | .browser_download_url'
    )
unzip ark-latest-linux.zip ark
sudo mv /tmp/ark /usr/local/bin/
```

-->