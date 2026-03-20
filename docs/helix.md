---
title: Helix 模式 - Zed
description: Zed 中的 Helix 风格键盘快捷键和模态编辑。基于 Vim 模式构建的优先选择编辑。
---

# Helix 模式

_正在开发中。并非所有的 Helix 键盘快捷键都已实现。_

Zed 的 Helix 模式是一个模拟层，它将 Helix 风格的键盘快捷键和模态编辑带到了 Zed 中。它建立在 Zed 的 [Vim 模式](./vim.md) 之上，因此许多核心功能是共享的。启用 `helix_mode` 也会启用 `vim_mode`。

有关在 Helix 模式中也可用的与 Vim 相关的功能指南，请参阅我们的 [Vim 模式文档](./vim.md)。

要检查 Helix 模式的当前状态，或请求缺失的 Helix 功能，请参阅 [“我们 Helix 了吗？”讨论](https://github.com/zed-industries/zed/discussions/33580)。

有关 Helix 默认键盘快捷键的详细列表，请访问 [官方 Helix 文档](https://docs.helix-editor.com/keymap.html)。

## 核心差异

任何与 `m i` 或 `m a` 一起使用的文本对象，也与 `]` 和 `[` 一起工作，例如 `] (` 选择光标后的下一对括号。