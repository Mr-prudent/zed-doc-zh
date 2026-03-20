---
title: Rust
description: "在 Zed 中配置 Rust 语言支持，包括语言服务器、格式化和调试。"
---

# Rust

Zed 原生支持 Rust。

- Tree-sitter: [tree-sitter/tree-sitter-rust](https://github.com/tree-sitter/tree-sitter-rust)
- 语言服务器: [rust-lang/rust-analyzer](https://github.com/rust-lang/rust-analyzer)
- 调试适配器: [CodeLLDB](https://github.com/vadimcn/codelldb) (首选), [GDB](https://sourceware.org/gdb/) (次要，Apple silicon 上不可用)

<!--
TBD: 完善 Rust 文档。Zed 对 Rust 有强大的支持，文档应明确反映这一点。
TBD: 用户可能不知道什么是 inlayHints，不要从那里开始。
TBD: 提供具体的示例，而不仅仅是 `....`
-->

## 内联提示

以下配置可用于更改 Rust 中 `rust-analyzer` 的内联提示设置：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "inlayHints": {
          "maxLength": null,
          "lifetimeElisionHints": {
            "enable": "skip_trivial",
            "useParameterNames": true
          },
          "closureReturnTypeHints": {
            "enable": "always"
          }
        }
      }
    }
  }
}
```

有关更多信息，请参阅 Rust Analyzer 手册中的 [内联提示](https://rust-analyzer.github.io/book/features.html#inlay-hints)。

## 目标目录

可以在 `initialization_options` 中设置 `rust-analyzer` 的目标目录：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "rust": {
          "analyzerTargetDir": true
        }
      }
    }
  }
}
```

将 `analyzerTargetDir` 设置为 `true` 会将目标目录设置为 `target/rust-analyzer`。您也可以使用类似 `"target/analyzer"` 的字符串来设置自定义目录，而不是使用 `true`。

## 二进制文件

您可以配置 Zed 应该使用哪个 `rust-analyzer` 二进制文件。

默认情况下，Zed 会尝试在您的 `$PATH` 中找到一个 `rust-analyzer` 并尝试使用它。如果该二进制文件成功执行 `rust-analyzer --help`，则使用它。否则，Zed 将回退到安装其自己的稳定版 `rust-analyzer` 并使用它。

如果您想安装预发布版的 `rust-analyzer`，您可以在 `settings.json` 中将 `pre_release` 设置为 `true` 来指示 Zed 这样做：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "fetch": {
        "pre_release": true
      }
    }
  }
}
```

如果您想禁用 Zed 查找 `rust-analyzer` 二进制文件，您可以在 `settings.json` 中将 `ignore_system_version` 设置为 `true`：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "binary": {
        "ignore_system_version": true
      }
    }
  }
}
```

如果您想使用自定义位置的二进制文件，您可以指定一个 `path` 和可选的 `arguments`：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "binary": {
        "path": "/Users/example/bin/rust-analyzer",
        "arguments": []
      }
    }
  }
}
```

此 `"path"` 必须是绝对路径。

## 替代目标

如果您希望 `rust-analyzer` 为当前平台之外的目标（例如在 macOS 上运行时为 windows）提供诊断信息，您可以使用以下 Zed lsp 设置：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "cargo": {
          "target": "x86_64-pc-windows-msvc"
        }
      }
    }
  }
}
```

如果您使用的是 `rustup`，可以通过运行以下命令获取可用目标三元组（`aarch64-apple-darwin`, `x86_64-unknown-linux-gnu` 等）的列表：

```sh
rustup target list --installed
```

## LSP 任务

Zed 使用 tree-sitter 提供任务，但 rust-analyzer 有一种 LSP 扩展方法，可通过 LSP 查询与文件相关的任务。
此功能默认启用，可以配置为：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "enable_lsp_tasks": true,
    }
  }
}
```

## 手动获取 Cargo 诊断

默认情况下，`rust-analyzer` 启用了 `checkOnSave: true`，这会导致每次缓冲区保存都触发一个 `cargo check --workspace --all-targets` 命令。
如果通过 `checkOnSave: false`（参见上面的服务器配置 json 示例）禁用它，仍然可以使用 `editor: run/clear/cancel flycheck` 命令在 Rust 文件中手动刷新 cargo 诊断；当此设置启用时，项目诊断编辑器也会使用 `editor: run flycheck` 命令刷新 cargo 诊断。

## 更多服务器配置

<!--
TBD: 是否可以指定 RUSTFLAGS？https://github.com/zed-industries/zed/issues/14334
-->

Rust-analyzer [手册](https://rust-analyzer.github.io/book/) 描述了 rust-analyzer 语言服务器的各种功能和配置选项。
Zed 中的 Rust-analyzer 使用默认参数运行。

### 大型项目与性能

可能导致大型项目中资源使用过多的主要问题之一，是以下功能的组合：

```
rust-analyzer.checkOnSave (默认值: true)
    保存时运行检查命令以获取诊断信息。
```

```
rust-analyzer.check.workspace (默认值: true)
    是否将 --workspace 传递给 cargo check。如果为 false，则将传递 -p <package>。
```

```
rust-analyzer.cargo.allTargets (默认值: true)
    在 cargo 调用中传递 --all-targets
```

这意味着每次 Zed 保存时，都会运行一个 `cargo check --workspace --all-targets` 命令，检查整个项目（工作区）、lib、doc、test、bin、bench 和 [其他目标](https://doc.rust-lang.org/cargo/reference/cargo-targets.html)。

虽然这在小型项目上运行良好，但可伸缩性不佳。

替代方法是使用 [任务](../tasks.md)，因为 Zed 已经提供了一个 `cargo check --workspace --all-targets` 任务，并且能够通过 cmd/ctrl-click 终端输出以导航到错误，并且可以限制或完全关闭保存时检查功能。

保存时检查功能负责根据 cargo check 输出返回部分诊断信息，因此关闭它将限制 rust-analyzer 使用其自身的 [诊断功能](https://rust-analyzer.github.io/book/diagnostics.html)。

考虑从手册中获取更多 `rust-analyzer.cargo.` 和 `rust-analyzer.check.` 以及 `rust-analyzer.diagnostics.` 设置，以获得更精细的配置。
以下是 Zed settings.json 的代码片段（编辑并保存 `lsp.rust-analyzer` 部分后，语言服务器将自动重启）：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        // 从 rust-analyzer 获取更多不依赖 cargo 的诊断信息，
        // 其中可能包含误报（可以通过名称关闭这些误报）
        "diagnostics": {
          "experimental": {
            "enable": true
          }
        },
        // 完全禁用检查
        //（忽略下方的所有 cargo 和 check 设置）
        "checkOnSave": false,
        // 仅检查 `lib` 目标。
        "cargo": {
          "allTargets": false
        },
        // 对 cargo check 使用 `-p` 而不是 `--workspace`
        "check": {
          "workspace": false
        }
      }
    }
  }
}
```

### 多项目工作区

如果您希望 `rust-analyzer` 分析同一文件夹中未在 Cargo 工作区的 `[members]` 中列出的多个 Rust 项目，您可以在本地项目设置中的 `linkedProjects` 中列出它们：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "linkedProjects": ["./path/to/a/Cargo.toml", "./path/to/b/Cargo.toml"]
      }
    }
  }
}
```

### 代码片段

有一种方法可以从 rust-analyzer 获取自定义补全项，这些补全项会根据代码段正文转换代码：

```json [settings]
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "completion": {
          "snippets": {
            "custom": {
              "Arc::new": {
                "postfix": "arc",
                "body": ["Arc::new(${receiver})"],
                "requires": "std::sync::Arc",
                "scope": "expr"
              },
              "Some": {
                "postfix": "some",
                "body": ["Some(${receiver})"],
                "scope": "expr"
              },
              "Ok": {
                "postfix": "ok",
                "body": ["Ok(${receiver})"],
                "scope": "expr"
              },
              "Rc::new": {
                "postfix": "rc",
                "body": ["Rc::new(${receiver})"],
                "requires": "std::rc::Rc",
                "scope": "expr"
              },
              "Box::pin": {
                "postfix": "boxpin",
                "body": ["Box::pin(${receiver})"],
                "requires": "std::boxed::Box",
                "scope": "expr"
              },
              "vec!": {
                "postfix": "vec",
                "body": ["vec![${receiver}]"],
                "description": "vec![]",
                "scope": "expr"
              }
            }
          }
        }
      }
    }
  }
}
```

## 调试

Zed 开箱即用地支持使用 `CodeLLDB` 和 `GDB` 调试 Rust 二进制文件和测试。运行 {#action debugger::Start} ({#kb debugger::Start}) 来启动其中一个预配置的调试任务。

为了获得更多控制，您可以向 `.zed/debug.json` 添加调试配置。请参见下面的示例。

- [CodeLLDB 配置文档](https://github.com/vadimcn/codelldb/blob/master/MANUAL.md#starting-a-new-debug-session)
- [GDB 配置文档](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Debugger-Adapter-Protocol.html)

### 先构建二进制文件再调试

```json [debug]
[
  {
    "label": "构建 & 调试原生二进制文件",
    "build": {
      "command": "cargo",
      "args": ["build"]
    },
    "program": "$ZED_WORKTREE_ROOT/target/debug/binary",
    // 使用 Rust 时，CodeLLDB（非 GDB）需要 sourceLanguages
    "sourceLanguages": ["rust"],
    "request": "launch",
    "adapter": "CodeLLDB"
  }
]
```

### 根据构建命令自动定位调试目标

当您使用 `cargo build` 或 `cargo test` 作为构建命令时，Zed 可以推断输出二进制文件的路径。

```json [debug]
[
  {
    "label": "构建 & 调试原生二进制文件",
    "adapter": "CodeLLDB",
    "build": {
      "command": "cargo",
      "args": ["build"]
    },
    // 使用 Rust 时，CodeLLDB（非 GDB）需要 sourceLanguages
    "sourceLanguages": ["rust"]
  }
]
```