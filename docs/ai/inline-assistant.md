---
title: 内联 AI 代码编辑 - Zed
description: 在 Zed 中使用 AI 进行内联代码转换。将选择的内容发送到任何 LLM 以进行重构、生成或编辑，支持多光标。
---

# 行内助手

## 使用概览

在编辑器、文本线程、规则库、频道笔记和终端面板中使用 {#kb assistant::InlineAssist} 打开内联助手。

内联助手会将您当前的选择（或行）发送给语言模型，并用响应内容替换它。

## 入门指南

如果您是第一次使用内联助手，需要至少配置一个 LLM 提供商或外部智能体。您可以通过以下方式实现：

1. [订阅我们的专业版计划](https://zed.dev/pricing)，以便使用我们的托管模型
2. [使用您自己的 API 密钥](./llm-providers.md#use-your-own-keys)，可以来自 Anthropic 等模型提供商，或 OpenRouter 等模型网关。

如果您已经设置了 LLM 提供商以与[智能体面板](./agent-panel.md#getting-started)交互，那么该设置也同样适用于内联助手。

> 但与智能体面板不同的是，目前唯一的例外是[外部智能体](./external-agents.md)。
> 它们目前不能用于内联助手的生成更改。

## 添加上下文

您可以通过与[智能体面板](./agent-panel.md#adding-context)相同的方式在内联助手中添加上下文：

- @ 提及文件、目录、过去的线程、规则和符号
- 粘贴复制到剪贴板中的图像

您还可以在智能体面板中创建一个线程，然后在内联助手中使用 `@thread` 引用它。这样您就可以从较大的线程中细化特定更改，而无需重新解释上下文。

## 并行生成

内联助手可以一次生成多个更改：

### 多光标

使用多光标时，按下 {#kb assistant::InlineAssist} 会将相同的提示发送到每个光标位置，同时在所有位置生成更改。

这在[多缓冲区](../multibuffers.md)中的摘录中效果很好。

### 多模型

您可以使用内联助手一次将相同的提示发送到多个模型。

以下是如何自定义您的设置文件（[如何编辑](../configuring-zed.md#settings-files)）以添加此功能：

```json [settings]
{
  "agent": {
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-sonnet-4-5"
    },
    "inline_alternatives": [
      {
        "provider": "zed.dev",
        "model": "gpt-4-mini"
      }
    ]
  }
}
```

当配置了多个模型时，您会在内联助手 UI 中看到按钮，允许您循环切换每个模型生成的输出。

您在此处指定的模型总是与您的[默认模型](#default-model)一起使用。

例如，以下配置将为每次辅助生成三个输出。
一个使用 Claude Sonnet 4.5（默认模型），另一个使用 GPT-5-mini，还有一个使用 Gemini 3 Flash。

```json [settings]
{
  "agent": {
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-sonnet-4-5"
    },
    "inline_alternatives": [
      {
        "provider": "zed.dev",
        "model": "gpt-4-mini"
      },
      {
        "provider": "zed.dev",
        "model": "gemini-3-flash"
      }
    ]
  }
}
```

## 内联助手与编辑预测

这两个功能都生成内联代码，但工作方式不同：

- **内联助手**：您编写提示并选择要转换的内容。您控制上下文。
- **[编辑预测](./edit-prediction.md)**：Zed 基于您的最近更改、访问的文件和光标位置自动建议编辑。无需提示。

关键区别：内联助手是显式的和提示驱动的；编辑预测是自动的和上下文推断的。

## 预填充提示

要创建一个预填充提示的自定义键绑定，您可以在键映射中添加以下格式：

```json [keymap]
[
  {
    "context": "Editor && mode == full",
    "bindings": {
      "ctrl-shift-enter": [
        "assistant::InlineAssist",
        { "prompt": "Build a snake game" }
      ]
    }
  }
]
```
