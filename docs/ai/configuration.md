---
title: 在 Zed 中配置 AI - 提供商、模型和设置
description: 通过托管的模型、您自己的 API 密钥或外部智能体来设置 Zed 中的 AI。包括如何完全禁用 AI。
---

# 配置

您可以在 Zed 中配置 AI 使用的多个方面：

1. 您可以使用哪些 LLM 提供商
   - Zed 的托管模型，需要 [身份验证](../authentication.md) 和 [订阅](./subscription.md)
   - [使用您自己的 API 密钥](./llm-providers.md)，不需要上述条件
   - 使用 [如 Claude Agent 的外部智能体](./external-agents.md)，也不需要上述条件
2. [模型参数和使用](./agent-settings.md#model-settings)
3. [与智能体面板的交互](./agent-settings.md#agent-panel-settings)

## 完全禁用 AI

要禁用所有 AI 功能，请将以下内容添加到您的设置文件中（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "disable_ai": true
}
```

有关此选项的更多背景信息，请参阅[这篇博客文章](https://zed.dev/blog/disable-ai-features)。
```
