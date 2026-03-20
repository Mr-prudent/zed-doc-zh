---
title: Zed 入门指南
description: 开始使用 Zed，快速开源的代码编辑器。包含基本命令、环境设置和导航基础。
---

# 入门指南

Zed 是一个内置协作和 AI 工具的开源代码编辑器。

本指南涵盖了基本命令、环境设置和导航基础知识。

## 快速开始

### 欢迎页面

当您不打开文件夹就启动 Zed 时，主编辑器区域会显示欢迎页面。欢迎页面提供了快速操作，可以打开文件夹、克隆仓库或查看文档。一旦您打开了文件夹或文件，欢迎页面就会消失。如果您将编辑器拆分为多个面板，欢迎页面仅在中心面板为空时显示——其他面板显示标准的空白状态。

要重新打开欢迎页面，请关闭中心面板中的所有项目，或使用命令面板搜索"Welcome"。

### 1. 打开项目

从命令行打开文件夹：

```sh
zed ~/projects/my-app
```

或者在 Zed 内使用 `Cmd+O` (macOS) / `Ctrl+O` (Linux/Windows) 打开文件夹。

### 2. 学习基本命令

| 操作            | macOS         | Linux/Windows  |
| --------------- | ------------- | -------------- |
| 命令面板        | `Cmd+Shift+P` | `Ctrl+Shift+P` |
| 转到文件        | `Cmd+P`       | `Ctrl+P`       |
| 转到符号        | `Cmd+Shift+O` | `Ctrl+Shift+O` |
| 在项目中查找    | `Cmd+Shift+F` | `Ctrl+Shift+F` |
| 切换终端        | `` Ctrl+` ``  | `` Ctrl+` ``   |
| 打开设置        | `Cmd+,`       | `Ctrl+,`       |

命令面板 (`Cmd+Shift+P`) 是您访问 Zed 中所有操作的入口。如果您忘记了快捷键，可以在其中搜索。

### 3. 配置您的编辑器

使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置编辑器。搜索任何设置并直接更改它。

常见的首次更改：

- **主题**：按 `Cmd+K Cmd+T` (macOS) 或 `Ctrl+K Ctrl+T` (Linux/Windows) 打开主题选择器
- **字体**：在设置中搜索 `buffer_font_family`
- **保存时格式化**：搜索 `format_on_save` 并设置为 `on`

### 4. 设置您的语言

Zed 内置了对多种语言的支持。对于其他语言，请安装扩展：

1. 使用 `Cmd+Shift+X` (macOS) 或 `Ctrl+Shift+X` (Linux/Windows) 打开扩展
2. 搜索您的语言
3. 点击安装

有关特定语言的设置说明，请参阅[语言支持](./languages.md)。

### 5. 尝试 AI 功能

Zed 包含内置的 AI 助手。使用 `Cmd+Shift+A` (macOS) 或 `Ctrl+Shift+A` (Linux/Windows) 打开智能体面板开始对话，或使用 `Cmd+Enter` (macOS) / `Ctrl+Enter` (Linux/Windows) 进行行内辅助。

请参阅 [AI 概览](./ai/overview.md) 以配置提供商并了解可实现的功能。

## 来自其他编辑器？

我们有专门针对从其他编辑器切换过来的指南：

- [VS Code](./migrate/vs-code.md) — 导入设置、映射键盘快捷键、查找等效功能
- [IntelliJ IDEA](./migrate/intellij.md) — 适应 Zed 的导航和重构方法
- [PyCharm](./migrate/pycharm.md) — 在 Zed 中设置 Python 开发
- [WebStorm](./migrate/webstorm.md) — 配置 JavaScript/TypeScript 工作流
- [RustRover](./migrate/rustrover.md) — 在 Zed 中进行 Rust 开发

您还可以启用熟悉的键盘快捷键：

- **Vim**：在设置中启用 `vim_mode`。请参阅 [Vim 模式](./vim.md)。
- **Helix**：在设置中启用 `helix_mode`。请参阅 [Helix 模式](./helix.md)。

## 加入社区

Zed 是开源的。在 GitHub 或 Discord 上加入我们，贡献代码、报告错误或提出功能建议。

- [Discord](https://discord.com/invite/zedindustries)
- [GitHub Discussions](https://github.com/zed-industries/zed/discussions)
- [Zed Reddit](https://www.reddit.com/r/ZedEditor)
