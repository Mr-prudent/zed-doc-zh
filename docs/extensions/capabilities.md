---
title: 扩展能力
description: "Zed 扩展的扩展能力。"
---

# 扩展功能

Zed 扩展能够执行的操作由一个能力系统控制。

## 限制能力

作为用户，您可以选择限制授予扩展的能力。

这通过 `granted_extension_capabilities` 设置进行控制。

限制或移除某项能力会导致当扩展在尝试调用相应的扩展 API 但能力不足时返回错误。

例如，要将下载限制为来自 GitHub 的文件，请为 `download_file` 能力设置 `host`：

```diff
{
  "granted_extension_capabilities": [
    { "kind": "process:exec", "command": "*", "args": ["**"] },
-   { "kind": "download_file", "host": "*", "path": ["**"] },
+   { "kind": "download_file", "host": "github.com", "path": ["**"] },
    { "kind": "npm:install", "package": "*" }
  ]
}
```

如果您不希望扩展能够执行 _任何_ 能力，您可以移除所有已授予的能力：

```json
{
  "granted_extension_capabilities": []
}
```

> 注意，这很可能会使许多扩展无法正常工作，至少在其默认配置下是这样。

## 能力

### `process:exec`

`process:exec` 能力允许扩展使用 [`zed_extension_api::process::Command`](https://docs.rs/zed_extension_api/latest/zed_extension_api/process/struct.Command.html) 来调用命令。

#### 示例

允许执行任何命令和任何参数：

```toml
{ kind = "process:exec", command = "*", args = ["**"] }
```

允许执行特定命令（例如 `gem`）并使用任何参数：

```toml
{ kind = "process:exec", command = "gem", args = ["**"] }
```

### `download_file`

`download_file` 能力允许扩展使用 [`zed_extension_api::download_file`](https://docs.rs/zed_extension_api/latest/zed_extension_api/fn.download_file.html) 来下载文件。

#### 示例

允许下载任何文件：

```toml
{ kind = "download_file", host = "*", path = ["**"] }
```

允许从 `github.com` 下载任何文件：

```toml
{ kind = "download_file", host = "github.com", path = ["**"] }
```

允许从特定的 GitHub 仓库下载任何文件：

```toml
{ kind = "download_file", host = "github.com", path = ["zed-industries", "zed", "**"] }
```

### `npm:install`

`npm:install` 能力允许扩展使用 [`zed_extension_api::npm_install_package`](https://docs.rs/zed_extension_api/latest/zed_extension_api/fn.npm_install_package.html) 来安装 npm 包。

#### 示例

允许安装任何 npm 包：

```toml
{ kind = "npm:install", package = "*" }
```

允许安装特定的 npm 包（例如 `typescript`）：

```toml
{ kind = "npm:install", package = "typescript" }
```