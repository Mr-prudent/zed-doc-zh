---
title: AI 代码编辑器文档 - Zed
description: 关于 Zed 开源 AI 代码编辑器的 AI 文档。代理式编程、行内编辑、AI 代码补全和多模型支持。
---

# AI

Zed 是一个开源的 AI 代码编辑器。AI 贯穿于整个编辑体验：可以读写你代码的代理、行内转换、每次按键的代码补全，以及在任意缓冲区中与模型的对话。

## Zed 如何处理 AI

Zed 的 AI 功能运行在一个使用 Rust 构建的、本地化且 GPU 加速的应用程序内。在你和模型输出之间没有 Electron 层。

- **开源。** 编辑器和所有 AI 功能都是 [开源的](https://github.com/zed-industries/zed)。你可以阅读 AI 是如何实现的、数据如何流向提供商、工具调用如何执行。
- **多模型。** 使用 Zed 托管的模型或从 Anthropic、OpenAI、Google、Ollama 和其他 8+ 个提供商处 [带来你自己的 API 密钥](./llm-providers.md)。可以运行本地模型、连接到云 API，或两者结合。按任务切换模型。
- **外部智能体。** 通过 [Agent Client Protocol](https://zed.dev/acp) 直接在 Zed 中运行 Claude Agent、Gemini CLI、Codex 和其他基于 CLI 的代理。参见 [外部智能体](./external-agents.md)。
- **默认隐私保护。** AI 数据共享是选择加入的。当你使用自己的 API 密钥时，Zed 与提供商签订了零数据保留协议。参见 [隐私与安全](./privacy-and-security.md)。

## 代理式编辑

[智能体面板](./agent-panel.md) 是你与 AI 代理协作的地方。代理可以读取文件、编辑代码、运行终端命令、搜索网络，并通过 [内置工具](./tools.md) 访问诊断信息。

你可以通过 [MCP 服务器](./mcp.md) 为代理添加额外的工具，使用 [工具权限](./tool-permissions.md) 控制它们可以访问的内容，并用 [规则](./rules.md) 来塑造它们的行为。

[行内助手](./inline-assistant.md) 的工作方式不同：选择代码或终端命令，描述你想要什么，然后模型会原地重写选中的内容。它支持多个光标。

## 代码补全

[编辑预测](./edit-prediction.md) 提供每次按键的 AI 代码补全。每次按键都会向预测提供商发送一个请求，返回单行或多行建议，你可以用 `tab` 键接受。

默认提供商是 Zeta，这是 Zed 在开放数据上训练的开源模型。你也可以使用 GitHub Copilot 或 Codestral。

## 文本线程

[文本线程](./text-threads.md) 是在任意缓冲区内与模型的对话。它们像一个常规编辑器，使用你的键绑定、多个光标和标准编辑功能。内容被组织成带有角色（你、助手、系统）的消息块。

## 入门指南

- [配置](./configuration.md)：连接到 Anthropic、OpenAI、Ollama、Google AI 或其他 LLM 提供商。
- [外部智能体](./external-agents.md)：在 Zed 内部运行 Claude Agent、Codex、Aider 或其他外部智能体。
- [订阅](./subscription.md)：Zed 托管的模型和计费。
- [隐私与安全](./privacy-and-security.md)：使用 AI 功能时 Zed 如何处理数据。

刚接触 Zed？请先从 [入门指南](../index.md) 开始，然后再回来这里设置 AI。有关更高层次的概述，请参阅 [zed.dev/ai](https://zed.dev/ai)。
