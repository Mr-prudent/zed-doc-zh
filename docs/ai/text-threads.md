---
title: 在编辑器中的 AI 聊天 - Zed 文本线程
description: 使用 Zed 的文本线程直接在您的编辑器中与 LLM 聊天。完全掌控上下文、消息角色和斜杠命令。
---

# 文本对话

[智能体面板](./agent-panel.md) 中的文本线程的工作方式与普通编辑器类似。
在聊天时，您可以使用自定义快捷键、多光标以及所有标准的编辑功能。

## 文本线程与线程

文本线程是 Zed 最初的 AI 界面。
2025 年 5 月，Zed 引入了当前的 [智能体面板](./agent-panel.md)，专为代理式工作流而设计。

主要区别：文本线程不支持工具调用以及许多其他更现代的代理功能。
它们无法自动读取文件、编写代码或代表您运行命令。
文本线程用于更简单的对话交互，即您发送文本并接收文本回复。

因此，[MCP 服务器](./mcp.md) 和 [外部智能体](./external-agents.md) 在文本线程中也不可用。

## 使用概述

文本线程将内容按角色组织成消息块：

- `您`
- `助手`
- `系统`

首先，在 `您` 的消息块中输入您的消息。
输入时，所选模型的剩余标记计数会自动更新。

要添加来自编辑器的上下文，请高亮显示文本并运行 `agent: add selection to thread` ({#kb agent::AddSelectionToThread})。
如果选中的是代码，Zed 会将其包裹在代码块中。

要提交消息，请使用 {#kb assistant::Assist} (`assistant: assist`)。
在文本线程中，{#kb editor::Newline} 用于插入新行而不是提交，这保留了标准编辑器的行为。

提交消息后，回复会流式显示在下方的 `助手` 消息块中。
您可以随时按 <kbd>escape</kbd> 取消流式传输，或者随时通过 <kbd>cmd-n|ctrl-n</kbd> 开始新的对话。

文本线程支持简单的对话，但您也可以返回并编辑早期的消息——包括之前的 LLM 回复——以改变方向、完善上下文或纠正错误，而无需启动新的线程或在后续修正上消耗标记。
如果您想完全删除一个消息块，请将光标放在块的开头并使用 `delete` 键。

一个典型的工作流程可能包括在整个上下文中进行编辑和调整，以完善您的问题或提供更多信息。例如：

1. 在 `您` 的消息块中写入文本。
2. 使用 {#kb assistant::Assist} 提交消息。
3. 收到一个 `助手` 回复，但它不符合您的预期。
4. 按 <kbd>escape</kbd> 取消回复。
5. 清空 `助手` 消息块的内容并完全删除该块。
6. 在您的原始消息中添加更多上下文。
7. 使用 {#kb assistant::Assist} 提交消息。

您还可以通过单击角色的名称来循环切换消息块的角色，这在当您在 `助手` 块中收到一条回复，并想将其编辑后作为 `您` 的消息块发回时非常有用。

## 命令概述 {#commands}

在行首键入 `/` 以查看可用的斜杠命令：

- `/default`: 插入默认规则
- `/diagnostics`: 注入项目语言服务器报告的错误
- `/fetch`: 获取网页内容并插入
- `/file`: 插入单个文件或一个目录中的所有文件
- `/now`: 插入当前日期和时间
- `/prompt`: 向上下文添加一个自定义配置的提示（[参见规则库](./rules.md#rules-library)）
- `/symbols`: 插入当前标签页的活动符号
- `/tab`: 插入活动标签页或所有打开标签页的内容
- `/terminal`: 从终端插入选定数量的输出行
- `/selection`: 插入当前选中的文本

> **注意：** 请记住，命令仅在创建文本线程或插入命令时才会被评估，因此像 `/now` 这样的命令不会持续更新，或者 `/file` 命令的内容也不会保持最新。

### `/default`

在 [规则：编辑默认规则](./rules.md#default-rules) 部分了解更多关于 `/default` 的信息。

用法：`/default`

### `/diagnostics`

将项目语言服务器报告的错误注入上下文。

用法：`/diagnostics [--include-warnings] [path]`

- `--include-warnings`: 可选标志，用于包含警告以及错误。
- `path`: 可选路径，用于将诊断范围限制在特定文件或目录。

### `/file`

将文件或目录的内容插入上下文。支持 glob 模式。

用法：`/file <path>`

示例：

- `/file src/index.js` - 将 `src/index.js` 的内容插入上下文。
- `/file src/*.js` - 将 `src` 目录中所有 `.js` 文件的内容插入上下文。
- `/file src` - 将 `src` 目录中所有文件的内容插入上下文。

### `/now`

插入当前日期和时间。对于告知模型其知识截止时间与当前时间的关系很有用。

用法：`/now`

### `/prompt`

将规则库中的一条规则插入上下文。规则可以嵌套其他规则。

用法：`/prompt <prompt_name>`

相关：`/default`

### `/symbols`

从当前标签页插入活动符号（函数、类等），为文件提供结构概述。

用法：`/symbols`

### `/tab`

插入活动标签页或所有打开标签页的内容。

用法：`/tab [tab_name|all]`

- `tab_name`: 可选参数，用于指定要插入的特定标签页的名称。
- `all`: 插入所有打开标签页的内容。

示例：

- `/tab` - 插入活动标签页的内容。
- `/tab "index.js"` - 插入名为 "index.js" 的标签页的内容。
- `/tab all` - 插入所有打开标签页的内容。

### `/terminal`

插入最近的终端输出（默认为 50 行）。

用法：`/terminal [<number>]`

- `<number>`: 可选参数，用于指定要插入的行数（默认为 50）。

### `/selection`

插入当前选中的文本。等同于 `agent: add selection to thread` ({#kb agent::AddSelectionToThread})。

用法：`/selection`

## 规则库中的命令 {#slash-commands-in-rules}

[命令](#commands) 可以在规则中使用，即在规则库（以前称为提示库）中使用，以插入动态内容或执行操作。
例如，如果您想创建一条规则，其中模型知道日期很重要，您可以使用 `/now` 命令来插入当前日期。

<div class="warning">

规则中的斜杠命令**仅**在文本线程中使用时才有效。不支持在非文本线程中使用。

</div>

> **注意：** 规则中的斜杠命令**必须**位于单独的一行。

有关命令的更多信息以及可用的斜杠命令，请参见上面的[命令列表](#commands)。

### 示例

```plaintext
You are an expert Rust engineer. The user has asked you to review their project and answer some questions.

Here is some information about their project:

/file Cargo.toml
```

在上面的示例中，使用了 `/file` 命令来将 `Cargo.toml` 文件（或项目中存在的所有 `Cargo.toml` 文件）的内容插入到规则中。

## 嵌套规则

与将规则添加到默认规则类似，您可以使用 `/prompt` 命令在其他规则中嵌套规则（目前仅在文本线程中受支持）。

您可能希望嵌套规则以：

- 即时创建模板
- 将文档或参考等集合分解为更小、可自由组合的部分
- 创建相似规则的变体（例如 `Async Rust - Tokio` 与 `Async Rust - Async-std`）

### 示例

```plaintext
Title: Zed-Flavored Rust

## About Zed

/prompt Zed: Zed (a rule about what Zed is)

## Rust - Zed Style

/prompt Rust: Async - Async-std (zed doesn't use tokio)
/prompt Rust: Zed-style Crates (we have some unique conventions)
/prompt Rust - Workspace deps (bias towards reusing deps from the workspace)
```

_上方的括号中的文本是注释，不是规则的一部分。_

> **注意：** 从技术上讲，您可以在规则内嵌套自身，但我们不建议这样做。

通过使用嵌套规则，您可以创建模块化且可重用的规则组件，它们可以以多种方式组合，以适应不同的场景。

> **注意：** 当使用斜杠命令来引入额外的上下文时，注入的内容可以直接在文本线程中进行内联编辑——这里的编辑不会传播到已保存的规则中。

## 可扩展性

附加的斜杠命令可以由扩展提供。

请参阅[扩展：斜杠命令](../extensions/slash-commands.md) 了解如何创建您自己的斜杠命令。

## 高级概念

### 规则模板 {#rule-templates}

Zed 使用规则模板来支持内部的助手功能，例如终端助手或行内助手中使用的内容规则。

Zed 具有以下内部规则模板：

- `content_prompt.hbs`: 用于在编辑器中生成内容。
- `terminal_assistant_prompt.hbs`: 用于终端助手功能。

目前尚不清楚我们是否会进一步扩展模板，使其对用户可创建。

### 覆盖模板

> **注意：** 除非您知道自己在做什么，否则不建议覆盖模板。错误地编辑模板会破坏您的助手。

Zed 允许您通过在 `~/.config/zed/prompt_overrides` 目录中放置自定义的 Handlebars (.hbs) 模板来覆盖用于各种助手功能的默认规则。

可以覆盖以下模板：

1. [`content_prompt.hbs`](https://github.com/zed-industries/zed/tree/main/assets/prompts/content_prompt.hbs): 用于在编辑器中生成内容。

2. [`terminal_assistant_prompt.hbs`](https://github.com/zed-industries/zed/tree/main/assets/prompts/terminal_assistant_prompt.hbs): 用于终端助手功能。

> **注意：** 请确保您确实想要覆盖这些模板，因为您将错过我们内置功能的迭代。
> 这主要应在开发 Zed 时使用。

您可以自定义这些模板，以更好地满足您的需求，同时保持 Zed 使用的核心结构和变量。
当磁盘上的模板覆盖文件发生更改时，Zed 会自动重新加载它们。

查阅 Zed 的 [assets/prompts](https://github.com/zed-industries/zed/tree/main/assets/prompts) 目录以获取您可以尝试的当前版本。

### 历史记录 {#history}

在您在文本线程中提交第一条消息后，语言模型会为您的上下文生成一个名称，并且上下文将自动保存到您的文件系统中，位置如下：

- `~/.config/zed/conversations` (macOS)
- `~/.local/share/zed/conversations` (Linux)
- `%LocalAppData%\Zed\conversations` (Windows)

您可以通过点击智能体面板左上角的历史记录按钮来访问和加载之前的上下文。

![查看助手历史记录](https://zed.dev/img/assistant/assistant-history.png)
