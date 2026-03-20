---
title: C
description: "在 Zed 中配置 C 语言支持，包括语言服务器、格式化和调试。"
---

# C

C 支持在 Zed 中原生可用。

- Tree-sitter: [tree-sitter/tree-sitter-c](https://github.com/tree-sitter/tree-sitter-c)
- 语言服务器: [clangd/clangd](https://github.com/clangd/clangd)
- 调试适配器: [CodeLLDB](https://github.com/vadimcn) (主要), [GDB](https://sourceware.org/gdb/) (次要，在 Apple silicon 上不可用)

## Clangd: 强制检测为 C

默认情况下，clangd 假设是混合 C++/C 项目。如果您有一个纯 C 项目，您可能希望使用 `-xc` 标志指示 clangd 将所有文件视为 C 文件。为此，在项目根目录下创建一个 `.clangd` 文件，内容如下：

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/clangd.json
CompileFlags:
  Add: [-xc]
```

默认情况下，clang 和 gcc 会将 `*.C` 和 `*.H`（大写扩展名）识别为 C++ 而不是 C，Zed 也遵循此约定。如果您正在处理一个纯 C 项目（也许是一个具有传统大写路径的项目，如 `FILENAME.C`），您可以通过将以下内容添加到设置中来覆盖此行为：

```json [settings]
{
  "file_types": {
    "C": ["C", "H"]
  }
}
```

## 格式化

默认情况下，Zed 将使用 `clangd` 语言服务器来格式化 C 代码，就像 `clang-format` CLI 工具一样。为此，您可以添加一个 `.clang-format` 文件。例如：

```yaml
# yaml-language-server: $schema=https://json.schemastore.org/clang-format-21.x.json
---
BasedOnStyle: GNU
IndentWidth: 2
---
```

有关完整选项列表，请参见 [Clang-Format 样式选项](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)。

您可以通过 {#kb editor::Format} 或从命令面板中执行 `editor: format` 操作来触发格式化，或者在保存时启用格式化。

在设置 ({#kb zed::OpenSettings}) 的 Languages > C 下配置格式化，或将其添加到您的设置文件中：

```json [settings]
  "languages": {
    "C": {
      "format_on_save": "on",
      "tab_size": 2
    }
  }
```

## 编译命令

对于某些项目，Clangd 需要 `compile_commands.json` 文件来正确分析您的项目。该文件包含编译数据库，告诉 clangd 应该如何构建您的项目。

### CMake 编译命令

使用 CMake，您可以通过在 `CMakeLists.txt` 中添加以下行来自动生成 `compile_commands.json`：

```cmake
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

构建项目后，CMake 将在构建目录中生成 `compile_commands.json` 文件，clangd 会自动拾取它。

## 调试

您可以使用 CodeLLDB 或 GDB 来调试原生二进制文件。（确保您的构建过程将 `-g` 传递给 C 编译器，以便调试信息包含在生成的二进制文件中。）有关可以添加到 `.zed/debug.json` 的调试配置示例，请参见下文。

- [CodeLLDB 配置文档](https://github.com/vadimcn/codelldb/blob/master/MANUAL.md#starting-a-new-debug-session)
- [GDB 配置文档](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Debugger-Adapter-Protocol.html)

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