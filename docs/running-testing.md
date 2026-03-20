---
title: 在 Zed 中运行和测试代码
description: 在 Zed 中使用终端、任务、REPL 和调试器工作流程运行和测试代码，无需离开编辑器。
---

# 运行与测试

使用本部分在 Zed 中运行和测试代码，然后在无需离开编辑器的情况下调试问题。

## 内容概览

- **[终端](./terminal.md)**：Zed 的内置终端模拟器。打开多个终端，自定义您的 shell，并与编辑器集成。任务和命令在此运行。

- **[任务](./tasks.md)**：定义并运行可访问编辑器上下文（如当前文件、选择或符号）的 shell 命令。使用任务进行构建、代码检查、运行脚本或执行任何可重复的工作流程。

- **[调试器](./debugger.md)**：使用 Zed 的内置调试器设置断点、逐步执行代码和检查变量。通过调试适配器协议支持 C、C++、Go、JavaScript、Python、Rust、TypeScript 等语言。

- **[REPL](./repl.md)**：使用 Jupyter 内核交互式运行代码。执行选区或单元格并查看内联结果——适用于 Python、TypeScript (Deno)、R、Julia 和其他支持的语言。

## 快速开始

**打开终端**：按 `Ctrl+`` 切换终端面板，或按 `Ctrl+~` 打开新终端。

**运行命令**：按 `Cmd+Shift+R` (macOS) 或 `Ctrl+Shift+R` (Linux/Windows) 打开任务选择器，然后输入任何 shell 命令。

**开始调试**：按 `Cmd+Shift+D` (macOS) 或 `Ctrl+Shift+D` (Linux/Windows) 打开调试面板并选择配置。

**交互式运行代码**：在 Python 或 TypeScript 文件中，选择一些代码并按 `Ctrl+Shift+Enter` 在 REPL 会话中执行。