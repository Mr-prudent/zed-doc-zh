---
title: AI 功能改进与数据收集 - Zed
description: Zed 为改进智能体面板和编辑预测而采用的可选 AI 数据收集方法。
---

# AI 改进

## 概述

Zed 中的 AI 功能包括：

- [智能体面板](./agent-panel.md)
- [编辑预测](./edit-prediction.md)
- [行内辅助](./inline-assistant.md)
- [文本线程](./text-threads.md)
- 自动 Git 提交信息生成

默认情况下，Zed 不会存储您的提示或代码上下文。这些数据会发送到您选择的 AI 提供商（例如 Anthropic、OpenAI、Google 或 xAI）以生成响应，然后被丢弃。除非您明确分享（请参阅 [AI 反馈与评分](#ai-feedback-with-ratings)）或您选择加入编辑预测训练数据收集（请参阅 [编辑预测](#edit-predictions)），否则 Zed 不会使用您的数据来评估或改进 AI 功能。

Zed 的设计是模型无关的，无论您选择哪个提供商，这一点都不会改变。您可以使用自己的 API 密钥或 Zed 托管的模型，而不会保留任何数据。

### 数据保留与训练

Zed 的智能体面板可通过以下方式使用：

- [Zed 的托管的模型](./subscription.md)
- [通过 API 密钥连接非 Zed AI 服务](./llm-providers.md)
- 通过 ACP 使用 [外部智能体](./external-agents.md)

使用 Zed 托管的模型时，我们要求我们的服务提供商保证您的用户内容不会被用于模型训练。

| 提供商 | 不用于训练的保证 | 零数据保留 |
| --- | --- | --- |
| Anthropic | [是](https://www.anthropic.com/legal/commercial-terms) | [是](https://privacy.anthropic.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to) |
| Google | [是](https://cloud.google.com/terms/service-terms) | [是](https://cloud.google.com/terms/service-terms)，请参阅服务条款第 17 和 19h 节 |
| OpenAI | [是](https://openai.com/enterprise-privacy/) | [是](https://platform.openai.com/docs/guides/your-data) |
| xAI | [是](https://x.ai/legal/faq-enterprise) | [是](https://x.ai/legal/faq-enterprise) |

当您使用自己的 API 密钥或外部智能体时，**Zed 无法控制该服务提供商如何使用您的数据。**
您应参考与每个服务提供商的协议，以了解适用的条款和条件。

### AI 反馈与评分

您可以通过对 Zed 中特定的 AI 响应进行评分，并分享与此类对话相关的详细信息来提供对 Zed AI 功能的反馈。每次分享都是自愿的，分享一次不会导致未来的内容或数据被再次分享。

> **评分 = 数据共享**：当您对响应进行评分时，您的整个对话线程都会发送给 Zed。这包括消息、AI 响应和线程元数据。
> **如果您不希望数据持久化存储在 Zed 的服务器上，请勿评分**。除非您明确对响应进行评分，否则我们不会收集用于改进 AI 功能的数据。

### 收集的数据（AI 反馈）

对于您通过评分明确分享给我们的对话，Zed 可能会存储：

- 线程中的所有消息（您的提示和 AI 响应）
- 您包含在评分中的任何评论
- 线程元数据（使用的模型、标记数、时间戳）
- 关于您的 Zed 安装的元数据

如果您不对响应进行评分，Zed 不会存储与您使用 AI 功能相关的客户数据（代码、对话、响应）。

与 Zed AI 功能相关的遥测数据会被收集。这包括诸如正在使用的 AI 功能以及与该功能的高级交互等元数据，以了解性能（例如，代理响应时间，智能体面板中编辑的接受/拒绝，或编辑完成情况）。您可以在 Zed 的 [遥测](../telemetry.md) 文档中了解更多信息。

收集的数据存储在 Snowflake（一个私有数据库）中。我们定期审查这些数据，以完善代理的系统提示和工具使用。所有数据都被匿名化，并已移除敏感信息（访问令牌、用户 ID、电子邮件地址）。

## 编辑预测

编辑预测可以由 **Zed 的 Zeta 模型** 或 ** GitHub Copilot 等第三方提供商** 提供支持。

### Zed 的 Zeta 模型（默认）

Zed 会向模型发送一个有限的上下文窗口以生成预测：

- 光标周围的代码片段（不是整个文件）
- 最近的编辑差异
- 相关打开文件中的摘录

此数据是临时处理的，用于生成预测，之后不会被保留。

### 第三方提供商

当使用 GitHub Copilot 等第三方提供商时，**Zed 无法控制该提供商如何处理您的数据**。您应直接查阅他们的服务条款。

注意：Zed 的 `disabled_globs` 设置将阻止请求预测，但第三方提供商在打开文件时可能会接收到文件内容。

### 训练数据：开源项目的可选项

除非满足以下条件，否则 Zed 不会为我们的编辑预测模型收集训练数据：

1. **您选择加入** – 在编辑预测状态栏菜单的 **隐私** 部分切换“训练数据收集”（单击状态栏中的编辑预测图标）。
2. **项目是开源的** – 通过 LICENSE 文件检测（[请参阅检测逻辑](https://github.com/zed-industries/zed/blob/main/crates/edit_prediction/src/license_detection.rs)）
3. **文件未被排除** – 通过 `disabled_globs`

### 文件排除

某些文件始终被排除在编辑预测之外——无论是否选择加入：

```json [settings]
{
  "edit_predictions": {
    "disabled_globs": [
      "**/.env*",
      "**/*.pem",
      "**/*.key",
      "**/*.cert",
      "**/*.crt",
      "**/secrets.yml"
    ]
  }
}
```

用户可以通过在 Zed 设置文件中将路径和/或文件扩展名添加到 [`edit_predictions.disabled_globs`](https://zed.dev/docs/reference/all-settings#edit-predictions) 来明确排除更多路径和/或文件扩展名（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "edit_predictions": {
    "disabled_globs": ["secret_dir/*", "**/*.log"]
  }
}
```

### 收集的数据（编辑预测训练数据）

对于您选择加入的开源项目，Zed 可能会收集：

- 光标周围的代码摘录
- 最近的编辑差异
- 生成的预测
- 仓库 URL 和 git 修订版本
- 缓冲区大纲和诊断信息

收集的数据存储在 Snowflake 中。我们定期审查这些数据，以选择用于模型训练数据集的训练样本。我们确保包含的任何数据都是匿名的，并且不包含敏感信息（访问令牌、用户 ID、电子邮件地址等）。此训练数据集可在 [huggingface.co/datasets/zed-industries/zeta](https://huggingface.co/datasets/zed-industries/zeta) 公开获取。

### 模型输出

然后，我们使用此训练数据集对 [Qwen2.5-Coder-7B](https://huggingface.co/Qwen/Qwen2.5-Coder-7B) 进行微调，并将生成的模型发布在 [huggingface.co/zed-industries/zeta](https://huggingface.co/zed-industries/zeta)。

## 适用条款

请参阅 [Zed 服务条款](https://zed.dev/terms) 了解更多信息。
