---
title: C++
description: "在 Zed 中配置 C++ 语言支持，包括语言服务器、格式化和调试。"
---

# C++

Zed 原生支持 C++。

- Tree-sitter: [tree-sitter/tree-sitter-cpp](https://github.com/tree-sitter/tree-sitter-cpp)
- 语言服务器: [clangd/clangd](https://github.com/clangd/clangd)

## 二进制文件

您可以配置 Zed 应该使用哪个 `clangd` 二进制文件。

默认情况下，Zed 会尝试在您的 `$PATH` 中查找一个 `clangd` 并尝试使用它。如果该二进制文件成功执行，则使用它。否则，Zed 将回退到安装自己的 `clangd` 版本并使用该版本。

如果您想安装预发布版的 `clangd`，您可以通过在 `settings.json` 中将 `pre_release` 设置为 `true` 来指示 Zed 这样做：

```json [settings]
{
  "lsp": {
    "clangd": {
      "fetch": {
        "pre_release": true
      }
    }
  }
}
```

如果您想禁用 Zed 查找 `clangd` 二进制文件，您可以在 `settings.json` 中将 `ignore_system_version` 设置为 `true`：

```json [settings]
{
  "lsp": {
    "clangd": {
      "binary": {
        "ignore_system_version": true
      }
    }
  }
}
```

如果您想使用位于自定义位置的二进制文件，您可以指定一个 `path` 和可选的 `arguments`：

```json [settings]
{
  "lsp": {
    "clangd": {
      "binary": {
        "path": "/path/to/clangd",
        "arguments": []
      }
    }
  }
}
```

这个 `"path"` 必须是一个绝对路径。

## 参数

您可以向 `clangd` 传递任意数量的参数。要查看所有可用的选项，请从命令行运行 `clangd --help`。例如，使用 `--function-arg-placeholders=0` 时，函数调用的补全只包含括号，而默认值（`--function-arg-placeholders=1`）的补全还包含方法参数的占位符。

```json [settings]
{
  "lsp": {
    "clangd": {
      "binary": {
        "path": "/path/to/clangd",
        "arguments": ["--function-arg-placeholders=0"]
      }
    }
  }
}
```

## 格式化

默认情况下，Zed 将使用 `clangd` 语言服务器来格式化 C++ 代码。Clangd 与 `clang-format` CLI 工具是相同的。要进行配置，您可以添加一个 `.clang-format` 文件。例如：

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/clang-format-21.x.json
---
BasedOnStyle: LLVM
IndentWidth: 4
---
Language: Cpp
# Force pointers to the type for C++.
DerivePointerAlignment: false
PointerAlignment: Left
---
```

有关完整选项列表，请参阅 [Clang-Format 样式选项](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)。

您可以通过 {#kb editor::Format} 或命令面板中的 `editor: format` 操作来触发格式化，或者在保存时启用格式化。

在“设置”({#kb zed::OpenSettings}) 下的“语言”> “C++”中配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "C++": {
      "format_on_save": "on",
      "tab_size": 2
    }
  }
```

## 更多服务器配置

在您的项目根目录中，通常创建一个 `.clangd` 文件来设置额外的配置是很常见的做法。

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/clangd.json
CompileFlags:
  Add:
    - "--include-directory=/path/to/include"
Diagnostics:
  MissingIncludes: Strict
  UnusedIncludes: Strict
```

有关 clangd 配置文件的更高级用法，请查看他们的[官方页面](https://clangd.llvm.org/config.html)。

## 编译命令

对于某些项目，Clangd 需要一个 `compile_commands.json` 文件来正确分析您的项目。该文件包含编译数据库，它告诉 clangd 应该如何构建您的项目。

### CMake 编译命令

使用 CMake，您可以通过将以下行添加到 `CMakeLists.txt` 中来自动生成 `compile_commands.json`：

```cmake
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

在构建您的项目后，CMake 将在构建目录中生成 `compile_commands.json` 文件，clangd 会自动拾取它。

## 调试

您可以使用 CodeLLDB 或 GDB 来调试原生二进制文件。（请确保您的构建过程将 `-g` 传递给 C++ 编译器，以便调试信息包含在生成的二进制文件中。）请参见下面的调试配置示例，您可以将它们添加到 `.zed/debug.json` 中。

- [CodeLLDB 配置文档](https://github.com/vadimcn/codelldb/blob/master/MANUAL.md#starting-a-new-debug-session)
- [GDB 配置文档](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Debugger-Adapter-Protocol.html)
  - GDB 版本需要至少为 v14.1

### 构建并调试二进制文件

```json [debug]
[
  {
    "label": "Debug native binary",
    "build": {
      "command": "make",
      "args": ["-j8"],
      "cwd": "$ZED_WORKTREE_ROOT"
    },
    "program": "$ZED_WORKTREE_ROOT/build/prog",
    "request": "launch",
    "adapter": "CodeLLDB"
  }
]
```

## 协议扩展

Zed 目前实现了以下 `clangd` [扩展](https://clangd.llvm.org/extensions):

### 非活动区域

由于预处理器指令（例如，计算结果为 `false` 的 `#if`、`#ifdef` 或 `#ifndef` 代码块）自动使非活动的代码部分变暗。

### 在源文件和头文件之间切换

允许在相应的 C++ 源文件（例如 `.cpp`）和头文件（例如 `.h`）之间切换。
通过从命令面板运行 {#action editor::SwitchSourceHeader} 命令，
或为 `editor::SwitchSourceHeader` 操作设置一个键绑定。

```json [keymap]
{
  "context": "Editor",
  "bindings": {
    "alt-enter": "editor::SwitchSourceHeader"
  }
}
```