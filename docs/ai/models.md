---
title: AI 模型与定价 - Zed
description: 通过 Zed Pro 可用的 AI 模型，包括 Claude、GPT-5.2、Gemini 3.1 Pro 和 Grok。定价、上下文窗口和工具调用支持。
---

# 模型

Zed 的套餐提供主要 LLM 的托管版本，其速率限制高于直接 API 访问。模型可用性会定期更新。如需使用您自己的 API 密钥，请参阅 [LLM 提供商](./llm-providers.md)。有关常规设置，请参阅 [配置](./configuration.md)。

| 模型                  | 提供商    | 令牌类型            | 提供商每 100 万令牌价格 | Zed 每 100 万令牌价格 |
| ---------------------- | --------- | ------------------- | ---------------------------- | ----------------------- |
| Claude Opus 4.5        | Anthropic | 输入                | $5.00                        | $5.50                   |
|                        | Anthropic | 输出                | $25.00                       | $27.50                  |
|                        | Anthropic | 输入 - 缓存写入     | $6.25                        | $6.875                  |
|                        | Anthropic | 输入 - 缓存读取     | $0.50                        | $0.55                   |
| Claude Opus 4.6        | Anthropic | 输入                | $5.00                        | $5.50                   |
|                        | Anthropic | 输出                | $25.00                       | $27.50                  |
|                        | Anthropic | 输入 - 缓存写入     | $6.25                        | $6.875                  |
|                        | Anthropic | 输入 - 缓存读取     | $0.50                        | $0.55                   |
| Claude Sonnet 4.5      | Anthropic | 输入                | $3.00                        | $3.30                   |
|                        | Anthropic | 输出                | $15.00                       | $16.50                  |
|                        | Anthropic | 输入 - 缓存写入     | $3.75                        | $4.125                  |
|                        | Anthropic | 输入 - 缓存读取     | $0.30                        | $0.33                   |
| Claude Sonnet 4.6      | Anthropic | 输入                | $3.00                        | $3.30                   |
|                        | Anthropic | 输出                | $15.00                       | $16.50                  |
|                        | Anthropic | 输入 - 缓存写入     | $3.75                        | $4.125                  |
|                        | Anthropic | 输入 - 缓存读取     | $0.30                        | $0.33                   |
| Claude Haiku 4.5       | Anthropic | 输入                | $1.00                        | $1.10                   |
|                        | Anthropic | 输出                | $5.00                        | $5.50                   |
|                        | Anthropic | 输入 - 缓存写入     | $1.25                        | $1.375                  |
|                        | Anthropic | 输入 - 缓存读取     | $0.10                        | $0.11                   |
| GPT-5.2                | OpenAI    | 输入                | $1.25                        | $1.375                  |
|                        | OpenAI    | 输出                | $10.00                       | $11.00                  |
|                        | OpenAI    | 缓存输入            | $0.125                       | $0.1375                 |
| GPT-5.2 Codex          | OpenAI    | 输入                | $1.25                        | $1.375                  |
|                        | OpenAI    | 输出                | $10.00                       | $11.00                  |
|                        | OpenAI    | 缓存输入            | $0.125                       | $0.1375                 |
| GPT-5 mini             | OpenAI    | 输入                | $0.25                        | $0.275                  |
|                        | OpenAI    | 输出                | $2.00                        | $2.20                   |
|                        | OpenAI    | 缓存输入            | $0.025                       | $0.0275                 |
| GPT-5 nano             | OpenAI    | 输入                | $0.05                        | $0.055                  |
|                        | OpenAI    | 输出                | $0.40                        | $0.44                   |
|                        | OpenAI    | 缓存输入            | $0.005                       | $0.0055                 |
| Gemini 3.1 Pro         | Google    | 输入                | $2.00                        | $2.20                   |
|                        | Google    | 输出                | $12.00                       | $13.20                  |
| Gemini 3 Flash         | Google    | 输入                | $0.30                        | $0.33                   |
|                        | Google    | 输出                | $2.50                        | $2.75                   |
| Grok 4                 | X.ai      | 输入                | $3.00                        | $3.30                   |
|                        | X.ai      | 输出                | $15.00                       | $16.5                   |
|                        | X.ai      | 缓存输入            | $0.75                        | $0.825                  |
| Grok 4 Fast            | X.ai      | 输入                | $0.20                        | $0.22                   |
|                        | X.ai      | 输出                | $0.50                        | $0.55                   |
|                        | X.ai      | 缓存输入            | $0.05                        | $0.055                  |
| Grok 4 (Non-Reasoning) | X.ai      | 输入                | $0.20                        | $0.22                   |
|                        | X.ai      | 输出                | $0.50                        | $0.55                   |
|                        | X.ai      | 缓存输入            | $0.05                        | $0.055                  |
| Grok Code Fast 1       | X.ai      | 输入                | $0.20                        | $0.22                   |
|                        | X.ai      | 输出                | $1.50                        | $1.65                   |
|                        | X.ai      | 缓存输入            | $0.02                        | $0.022                  |

## 最近停用的模型

自 2026 年 2 月 19 日起，Zed Pro 提供以下更新版本的模型以替代已停用的模型：

- Claude Opus 4.1 → Claude Opus 4.5 或 Claude Opus 4.6
- Claude Sonnet 4 → Claude Sonnet 4.5 或 Claude Sonnet 4.6
- Claude Sonnet 3.7 (已于 2 月 19 日停用) → Claude Sonnet 4.5 或 Claude Sonnet 4.6
- GPT-5.1 和 GPT-5 → GPT-5.2 或 GPT-5.2 Codex
- Gemini 2.5 Pro → Gemini 3.1 Pro
- Gemini 3 Pro → Gemini 3.1 Pro
- Gemini 2.5 Flash → Gemini 3 Flash

## 使用方法 {#usage}

使用 Zed 托管的任何模型都将按 Zed 价格（即上表最右侧列）计费。有关 Zed 的套餐及使用托管模型的限制详情，请参阅 [套餐与用量](./plans-and-usage.md)。

> LLM 可能会陷入需要人工干预的非生产性循环。请监控长时间运行的任务，并在必要时中断。

## 上下文窗口 {#context-windows}

上下文窗口是指 LLM 一次可以考虑的文本和代码的最大跨度，包括输入提示和模型生成的输出。

| 模型             | 提供商    | Zed 托管上下文窗口 |
| ----------------- | --------- | ------------------------- |
| Claude Opus 4.5   | Anthropic | 200k                      |
| Claude Opus 4.6   | Anthropic | 1M                        |
| Claude Sonnet 4.5 | Anthropic | 200k                      |
| Claude Sonnet 4.6 | Anthropic | 1M                        |
| Claude Haiku 4.5  | Anthropic | 200k                      |
| GPT-5.2           | OpenAI    | 400k                      |
| GPT-5.2 Codex     | OpenAI    | 400k                      |
| GPT-5 mini        | OpenAI    | 400k                      |
| GPT-5 nano        | OpenAI    | 400k                      |
| Gemini 3.1 Pro    | Google    | 200k                      |
| Gemini 3 Flash    | Google    | 200k                      |

> 托管的 Gemini 3.1 Pro/3 Pro/Flash 的上下文窗口限制在未来版本中可能会增加。

Zed 中的每个 Agent 线程和文本线程都维护自己的上下文窗口。
会话中包含的提示、附件和响应越多，上下文窗口就越大。

为每个不同的任务启动一个新线程以保持上下文集中。

## 工具调用 {#tool-calls}

模型可以使用 [工具](./tools.md) 与您的代码交互、搜索网络以及执行其他有用的功能。