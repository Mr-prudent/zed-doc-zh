---
title: Go
description: "在 Zed 中配置 Go 语言支持，包括语言服务器、格式化和调试。"
---

# Go

Zed 原生支持 Go。

- Tree-sitter: [tree-sitter/tree-sitter-go](https://github.com/tree-sitter/tree-sitter-go)
- 语言服务器: [golang/tools/tree/master/gopls](https://github.com/golang/tools/tree/master/gopls)
- 调试适配器: [delve](https://github.com/go-delve/delve)

## 设置

我们建议通过 Go 的包管理器安装 gopls，而不是通过 Homebrew 或 Linux 发行版的包管理器。

1. 确保你已经卸载了通过包管理器安装的任何版本的 gopls：

```sh
# MacOS homebrew
brew remove gopls
# Ubuntu
sudo apt-get remove gopls
sudo snap remove gopls
# Arch
sudo pacman -R gopls
```

2. 使用 go 模块工具安装/更新 `gopls` 到最新版本：

```sh
go install golang.org/x/tools/gopls@latest
```

3. 确保 `gopls` 在你的路径中：

```sh
which gopls
gopls version
```

如果找不到 `gopls`，你可能需要将 `export PATH="$PATH:$HOME/go/bin"` 添加到你的 `.zshrc` / `.bash_profile` 中。

## 内联提示

Zed 为内联提示设置了以下初始化选项：

```json
"hints": {
    "assignVariableTypes": true,
    "compositeLiteralFields": true,
    "compositeLiteralTypes": true,
    "constantValues": true,
    "functionTypeParameters": true,
    "parameterNames": true,
    "rangeVariableTypes": true
}
```

以便在 Zed 的设置中启用这些选项时，语言服务器能够返回内联提示。

使用

```json
"lsp": {
    "gopls": {
        "initialization_options": {
            "hints": {
                // ....
            }
        }
    }
}
```

来覆盖这些设置。

有关更多信息，请参阅 [gopls inlayHints 文档](https://github.com/golang/tools/blob/master/gopls/doc/inlayHints.md)。

## 调试

Zed 支持 Delve 对 Go 测试和入口点（`func main`）的零配置调试。运行 {#action debugger::Start} ({#kb debugger::Start}) 以查看这些预配置的调试任务的上下文列表。

为了获得更多控制，你可以将调试配置添加到 `.zed/debug.json`。示例见下文。

- [Delve 配置文档](https://github.com/go-delve/delve/blob/master/Documentation/api/dap/README.md#launch-and-attach-configurations)

### 调试 Go 包

要调试特定的包，你可以通过将 Delve 模式设置为 "debug" 来实现。在这种情况下，"program" 应设置为包名。

```json [debug]
[
  {
    "label": "Go (Delve)",
    "adapter": "Delve",
    "program": "$ZED_FILE",
    "request": "launch",
    "mode": "debug"
  },
  {
    "label": "运行服务器",
    "adapter": "Delve",
    "request": "launch",
    "mode": "debug",
    // 对于 Delve，program 可以是包名
    "program": "./cmd/server"
    // "args": [],
    // "buildFlags": [],
  }
]
```

### 调试 Go 测试

要调试一个包的测试，请将 Delve 模式设置为 "test"。
"program" 仍然是包名，你可以使用 "buildFlags" 来设置标签，使用 "args" 来为测试二进制文件设置参数。（有关更多信息，请参阅 `go help testflags`）。

```json [debug]
[
  {
    "label": "运行集成测试",
    "adapter": "Delve",
    "request": "launch",
    "mode": "test",
    "program": ".",
    "buildFlags": ["-tags", "integration"]
    // 要筛选到光标所在的测试：
    // "args": ["-test.run", "$ZED_SYMBOL"]
  }
]
```

### 分别构建和调试

如果你需要使用特定命令构建你的应用程序，你可以使用 Delve 的 "exec" 模式。在这种情况下，"program" 应指向一个可执行文件，并且 "build" 命令应该构建它。

```json [debug]
[
  {
    "label": "调试预构建的单元测试",
    "adapter": "Delve",
    "request": "launch",
    "mode": "exec",
    "program": "${ZED_WORKTREE_ROOT}/__debug_unit",
    "args": ["-test.v", "-test.run=${ZED_SYMBOL}"],
    "build": {
      "command": "go",
      "args": [
        "test",
        "-c",
        "-tags",
        "unit",
        "-gcflags\"all=-N -l\"",
        "-o",
        "__debug_unit",
        "./pkg/..."
      ]
    }
  }
]
```

### 附加到现有的 Delve 实例

你可能需要连接到一个不一定在你的机器上运行的现有 Delve 实例；在这种情况下，你可以使用 `tcp_arguments` 来配置 Zed 到 Delve 的连接。

```json [debug]
[
  {
    "adapter": "Delve",
    "label": "连接到正在运行的 Delve 实例",
    "program": "/Users/zed/Projects/language_repositories/golang/hello/hello",
    "cwd": "/Users/zed/Projects/language_repositories/golang/hello",
    "args": [],
    "env": {},
    "request": "launch",
    "mode": "exec",
    "stopOnEntry": false,
    "tcp_connection": { "host": "127.0.0.1", "port": 53412 }
  }
]
```

在这种情况下，Zed 不会生成一个新的 Delve 实例，而是选择使用现有的一个。这样做的后果是 _Zed 中不会有终端_；你必须直接与 Delve 实例交互，因为它处理调试对象的 stdin/stdout。

## Go Mod

- Tree-sitter: [camdencheek/tree-sitter-go-mod](https://github.com/camdencheek/tree-sitter-go-mod)
- 语言服务器: N/A

## Go Sum

- Tree-sitter: [amaanq/tree-sitter-go-sum](https://github.com/amaanq/tree-sitter-go-sum)
- 语言服务器: N/A

## Go Work

- Tree-sitter:
  [tree-sitter-go-work](https://github.com/d1y/tree-sitter-go-work)
- 语言服务器: N/A