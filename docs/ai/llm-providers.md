---
title: LLM 提供商 - 在 Zed 中使用您自己的 API 密钥
description: 将您自己的 API 密钥带入 Zed。配置 Anthropic、OpenAI、Google AI、Ollama、DeepSeek、Mistral、OpenRouter、Vercel AI Gateway 等。
---

# LLM 提供商

要在 Zed 中使用 AI，您需要至少设置一个大语言模型提供商。一旦配置完成，这些提供商将在 [Agent Panel](./agent-panel.md)、[Inline Assistant](./inline-assistant.md) 和 [Text Threads](./text-threads.md) 中可用。

您可以通过订阅 [Zed 的任一计划](./plans-and usage.md) 来实现，或者使用您已支持的提供商的 API 密钥。有关通用 AI 设置，请参阅 [Configuration](./configuration.md)。

## 使用您自己的密钥 {#use-your-own-keys}

如果您已经拥有 Anthropic 或 OpenAI 等提供商的 API 密钥，您可以将其添加到 Zed。无需 Zed 订阅。

要将现有的 API 密钥添加到指定的提供商，请转到 Agent Panel 设置 (`agent: open settings`)，找到所需的提供商，将密钥粘贴到输入框中，然后按回车键。

> 注意：API 密钥不会以纯文本形式存储在您的设置文件中，而是存储在您操作系统的安全凭证存储中。

## 支持的提供商

Zed 支持使用您自己的 API 密钥的以下提供商：

- [Amazon Bedrock](#amazon-bedrock)
- [Anthropic](#anthropic)
- [DeepSeek](#deepseek)
- [GitHub Copilot Chat](#github-copilot-chat)
- [Google AI](#google-ai)
- [LM Studio](#lmstudio)
- [Mistral](#mistral)
- [Ollama](#ollama)
- [OpenAI](#openai)
- [OpenAI API Compatible](#openai-api-compatible)
- [OpenRouter](#openrouter)
- [Vercel AI Gateway](#vercel-ai-gateway)
- [Vercel v0](#vercel-v0)
- [xAI](#xai)

### Amazon Bedrock {#amazon-bedrock}

> 支持对支持流式工具调用的模型使用工具。
> 更多细节可以在 [Amazon Bedrock 的工具使用文档](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-supported-models-features.html) 中找到。

要使用 Amazon Bedrock 的模型，需要 AWS 身份验证。
确保您的凭证已设置以下权限：

- `bedrock:InvokeModelWithResponseStream`
- `bedrock:InvokeModel`

您的 IAM 策略应如下所示：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}
```

完成后，从以下三种身份验证方法中选择一种：

#### 通过命名配置文件进行身份验证（推荐）

1. 确保您已安装 AWS CLI 并使用命名配置文件进行了配置
2. 打开您的设置文件 (`zed: open settings file`) 并在 `language_models` 下包含 `bedrock` 键，并使用以下设置：
   ```json [settings]
   {
     "language_models": {
       "bedrock": {
         "authentication_method": "named_profile",
         "region": "your-aws-region",
         "profile": "your-profile-name"
       }
     }
   }
   ```

#### 通过静态凭据进行身份验证

虽然可以通过在 Agent Panel 设置 UI 中直接输入您的 AWS 访问密钥和密钥来进行配置，但我们建议使用命名配置文件以获得更好的安全实践。
为此：

1. 在 [IAM 控制台](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users) 中创建一个 IAM 用户。
2. 为该用户创建安全凭证，保存并妥善保管它们。
3. 使用 (`agent: open settings`) 打开 Agent 配置并转到 Amazon Bedrock 部分
4. 将步骤 2 中的凭证分别复制到 **Access Key ID**、**Secret Access Key** 和 **Region** 字段中。

#### 通过 Bedrock API 密钥进��身份验证

Amazon Bedrock 还支持 [API 密钥](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-use.html)，它无需 IAM 用户或命名配置文件即可直接进行身份验证。

1. 在 [Amazon Bedrock 控制台](https://console.aws.amazon.com/bedrock/) 中创建一个 API 密钥
2. 使用 (`agent: open settings`) 打开 Agent 配置并转到 Amazon Bedrock 部分
3. 在 **API Key** 字段中输入您的 Bedrock API 密钥，然后选择您的 **Region**

```json [settings]
{
  "language_models": {
    "bedrock": {
      "authentication_method": "api_key",
      "region": "your-aws-region"
    }
  }
}
```

API 密钥本身安全地存储在您的操作系统钥匙串中，而不是在您的设置文件中。

#### 跨区域推理

Zed 对 Amazon Bedrock 的实现使用 [跨区域推理](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html) 来提高可用性和吞吐量。
通过跨区域推理，您可以将流量分布在多个 AWS 区域，从而实现更高的吞吐量。

##### 区域性与全局性推理配置文件

Bedrock 支持两种类型的跨区域推理配置文件：

- **区域性配置文件**（默认）：在特定地理区域内（美国、欧盟、亚太地区）路由请求。例如，`us-east-1` 使用 `us.*` 配置文件，该配置文件在 `us-east-1`、`us-east-2` 和 `us-west-2` 之间路由。
- **全局性配置文件**：跨所有商业 AWS 区域路由请求，以实现最高的可用性和性能。

默认情况下，Zed 使用**区域性配置文件**，这会将您的数据保留在相同的地理区域内。您可以通过在 Bedrock 配置中添加 `"allow_global": true` 来选择使用全局配置文件：

```json [settings]
{
  "language_models": {
    "bedrock": {
      "authentication_method": "named_profile",
      "region": "your-aws-region",
      "profile": "your-profile-name",
      "allow_global": true
    }
  }
}
```

**注意**：只有部分较新的模型支持全局推理配置文件。有关支持全局推理的当前模型列表，请参阅 [AWS Bedrock 支持的模型文档](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html#inference-profiles-support-system)。如果您在区域中遇到模型的可用性问题，启用 `allow_global` 可能会解决这些问题。

尽管数据仅存储在源区域中，但在跨区域推理期间，您的输入提示和输出结果可能会移出您的源区域。
所有数据都将通过亚马逊的安全网络进行加密传输。

我们将尽最大努力为每个模型支持跨区域推理，请参考 [跨区域推理方法代码](https://github.com/zed-industries/zed/blob/main/crates/bedrock/src/models.rs#L297)。

有关最新的支持区域和模型，请参阅 [跨区域推理的支持模型和区域](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html)。

#### 扩展上下文窗口 {#bedrock-extended-context}

Bedrock 上的 Anthropic 模型通过 `anthropic_beta` API 参数支持 1M token 的扩展上下文窗口。要启用此功能，请在您的 Bedrock 配置中设置 `"allow_extended_context": true`：

```json [settings]
{
  "language_models": {
    "bedrock": {
      "authentication_method": "named_profile",
      "region": "your-aws-region",
      "profile": "your-profile-name",
      "allow_extended_context": true
    }
  }
}
```

Zed 为支持的模型（Claude Sonnet 4.5 和 Claude Opus 4.6）启用扩展上下文。扩展上下文的使用可能会增加 API 成本—有关详细信息，请参阅 AWS Bedrock 定价。

#### 图像支持 {#bedrock-image-support}

支持视觉的 Bedrock 模型（Claude 3 及更高版本、Amazon Nova Pro 和 Lite、Meta Llama 3.2 Vision 模型、Mistral Pixtral）可以在对话和工具结果中接收图像。

### Anthropic {#anthropic}

您可以通过在 Agent Panel 中的模型下拉列表中选择 Anthropic 模型来使用它们。

1. 注册 Anthropic 并 [创建一个 API 密钥](https://console.anthropic.com/settings/keys)
2. 确保您的 Anthropic 账户有信用额度
3. 打开设置视图 (`agent: open settings`) 并转到 Anthropic 部分
4. 输入您的 Anthropic API 密钥

即使您为 Claude Pro 付费，您仍然需要 [为额外的信用额度付费](https://console.anthropic.com/settings/plans) 才能通过 API 使用它。

如果定义了 `ANTHROPIC_API_KEY` 环境变量，Zed 也会使用它。

#### 自定义模型 {#anthropic-custom-models}

您可以通过将以下内容添加到您的 Zed 设置文件中来向 Anthropic 提供商添加自定义模型（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "anthropic": {
      "available_models": [
        {
          "name": "claude-3-5-sonnet-20240620",
          "display_name": "Sonnet 2024-June",
          "max_tokens": 128000,
          "max_output_tokens": 2560,
          "cache_configuration": {
            "max_cache_anchors": 10,
            "min_total_token": 10000,
            "should_speculate": false
          },
          "tool_override": "some-model-that-supports-toolcalling"
        }
      ]
    }
  }
}
```

自定义模型将列在 Agent Panel 中的模型下拉列表中。

您可以通过将模型配置中的模式更改为 `thinking` 来配置模型使用 [扩展思考](https://docs.anthropic.com/en/docs/about-claude/models/extended-thinking-models)（如果支持），例如：

```json
{
  "name": "claude-sonnet-4-latest",
  "display_name": "claude-sonnet-4-thinking",
  "max_tokens": 200000,
  "mode": {
    "type": "thinking",
    "budget_tokens": 4096
  }
}
```

### DeepSeek {#deepseek}

1. 访问 DeepSeek 平台并 [创建一个 API 密钥](https://platform.deepseek.com/api_keys)
2. 打开设置视图 (`agent: open settings`) 并转到 DeepSeek 部分
3. 输入您的 DeepSeek API 密钥

DeepSeek API 密钥将保存在您的钥匙串中。

如果定义了 `DEEPSEEK_API_KEY` 环境变量，Zed 也会使用它。

#### 自定义模型 {#deepseek-custom-models}

Zed agent 已预配置为使用常见模型（DeepSeek Chat, DeepSeek Reasoner）的最新版本。
如果您希望使用替代模型或自定义 API 端点，您可以通过将以下内容添加到您的 Zed 设置文件中来实现（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "deepseek": {
      "api_url": "https://api.deepseek.com",
      "available_models": [
        {
          "name": "deepseek-chat",
          "display_name": "DeepSeek Chat",
          "max_tokens": 64000
        },
        {
          "name": "deepseek-reasoner",
          "display_name": "DeepSeek Reasoner",
          "max_tokens": 64000,
          "max_output_tokens": 4096
        }
      ]
    }
  }
}
```

自定义模型将列在 Agent Panel 中的模型下拉列表中。
如果需要，您也可以修改 `api_url` 以使用自定义端点。

### GitHub Copilot Chat {#github-copilot-chat}

您可以在 Agent Panel 中的模型下拉列表中选择它来使用 GitHub Copilot Chat。

1. 打开设置视图 (`agent: open settings`) 并转到 GitHub Copilot Chat 部分
2. 点击 `Sign in to use GitHub Copilot`，并按照模态框中显示的步骤操作。

或者，您可以通过 `GH_COPILOT_TOKEN` 环境变量提供 OAuth 令牌。

> **注意**：如果您在下拉列表中看不到特定模型，您可能需要在您的 [GitHub Copilot 设置](https://github.com/settings/copilot/features) 中启用它们。

要在 Zed 中使用 Copilot Enterprise（用于 agent 和补全），您必须按照 [配置 GitHub Copilot Enterprise](./edit-prediction.md#github-copilot-enterprise) 中的说明配置您的企业端点。

### Google AI {#google-ai}

您可以在 Agent Panel 中的模型下拉列表中选择它来使用 Gemini 模型。

1. 访问 Google AI Studio 网站并 [创建一个 API 密钥](https://aistudio.google.com/app/apikey)。
2. 打开设置视图 (`agent: open settings`) 并转到 Google AI 部分
3. 输入您的 Google AI API 密钥并按回车。

Google AI API 密钥将保存在您的钥匙串中。

如果定义了 `GEMINI_API_KEY` 环境变量，Zed 也会使用它。有关更多信息，请参阅 Gemini 文档中的 [使用 Gemini API 密钥](https://ai.google.dev/gemini-api/docs/api-key)。

#### 自定义模型 {#google-ai-custom-models}

默认情况下，Zed 将使用模型的 `stable` 版本，但您可以使用特定版本的模型，包括 [实验性模型](https://ai.google.dev/gemini-api/docs/models/experimental-models)。您可以通过在模型中添加 `mode` 配置来配置模型使用 [思考模式](https://ai.google.dev/gemini-api/docs/thinking)（如果支持）。这对于控制推理 token 的使用和响应速度很有用。如果未指定，Gemini 将自动选择思考预算。

以下是您可以添加到 Zed 设置文件中的自定义 Google AI 模型的示例（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "google": {
      "available_models": [
        {
          "name": "gemini-3.1-pro-preview",
          "display_name": "Gemini 3.1 Pro",
          "max_tokens": 1000000,
          "mode": {
            "type": "thinking",
            "budget_tokens": 24000
          }
        },
        {
          "name": "gemini-3-flash-preview",
          "display_name": "Gemini 3 Flash (Thinking)",
          "max_tokens": 1000000,
          "mode": {
            "type": "thinking",
            "budget_tokens": 24000
          }
        }
      ]
    }
  }
}
```

自定义模型将列在 Agent Panel 中的模型下拉列表中。

### LM Studio {#lmstudio}

1. 下载并安装 [LM Studio 的最新版本](https://lmstudio.ai/download)
2. 在应用中按下 `cmd/ctrl-shift-m` 并下载至少一个模型（例如，qwen2.5-coder-7b）。或者，您可以通过 LM Studio CLI 获取模型：

   ```sh
   lms get qwen2.5-coder-7b
   ```

3. 通过执行以下命令确保 LM Studio API 服务器正在运行：

   ```sh
   lms server start
   ```

提示：将 [LM Studio 设置为登录项](https://lmstudio.ai/docs/advanced/headless#run-the-llm-service-on-machine-login) 以自动运行 LM Studio 服务器。

### Mistral {#mistral}

1. 访问 Mistral 平台并 [创建一个 API 密钥](https://console.mistral.ai/api-keys/)
2. 打开配置视图 (`agent: open settings`) 并导航到 Mistral 部分
3. 输入您的 Mistral API 密钥

Mistral API 密钥将保存在您的钥匙串中。

如果定义了 `MISTRAL_API_KEY` 环境变量，Zed 也会使用它。

#### 自定义模型 {#mistral-custom-models}

Zed agent 已预配置了几个 Mistral 模型（codestral-latest, mistral-large-latest, mistral-medium-latest, mistral-small-latest, open-mistral-nemo, and open-codestral-mamba）。
所有默认模型都支持工具使用。
如果您希望使用替代模型或自定义其参数，您可以通过将以下内容添加到您的 Zed 设置文件中来实现（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "mistral": {
      "api_url": "https://api.mistral.ai/v1",
      "available_models": [
        {
          "name": "mistral-tiny-latest",
          "display_name": "Mistral Tiny",
          "max_tokens": 32000,
          "max_output_tokens": 4096,
          "max_completion_tokens": 1024,
          "supports_tools": true,
          "supports_images": false
        }
      ]
    }
  }
}
```

自定义模型将列在 Agent Panel 中的模型下拉列表中。

### Ollama {#ollama}

从 [ollama.com/download](https://ollama.com/download)（Linux 或 macOS）下载并安装 Ollama，并确保它通过 `ollama --version` 运行。

1. 下载其中一个 [可用模型](https://ollama.com/models)，例如，对于 `mistral`：

   ```sh
   ollama pull mistral
   ```

2. 确保 Ollama 服务器正在运行。您可以通过运行 Ollama.app (macOS) 或启动以下命令来启动它：

   ```sh
   ollama serve
   ```

3. 在 Agent Panel 中，使用模型下拉列表选择其中一个 Ollama 模型。

#### Ollama 自动发现

Zed 将自动发现 Ollama 已拉取的模型。您可以通过在 Ollama 设置中设置 `auto_discover` 字段来关闭此功能。如果这样做，您应该手动指定哪些模型可用。

```json [settings]
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434",
      "auto_discover": false,
      "available_models": [
        {
          "name": "qwen2.5-coder",
          "display_name": "qwen 2.5 coder",
          "max_tokens": 32768,
          "supports_tools": true,
          "supports_thinking": true,
          "supports_images": true
        }
      ]
    }
  }
}
```

#### Ollama 上下文长度 {#ollama-context}

Zed 向 Ollama 发出的 API 请求将上下文长度作为 `num_ctx` 参数包含。默认情况下，Zed 对所有 Ollama 模型使用 4096 tokens 的上下文长度。

> **注意**：Agent Panel 中显示的 Token 数只是估计值，并且会与模型的原生分词器不同。

您可以使用 `context_window` 设置为所有 Ollama 模型设置上下文长度。这也可以在 Ollama 提供商设置 UI 中配置：

```json [settings]
{
  "language_models": {
    "ollama": {
      "context_window": 8192
    }
  }
}
```

或者，您可以使用 `available_models` 中的 `max_tokens` 字段为每个模型配置上下文长度：

```json [settings]
{
  "language_models": {
    "ollama": {
      "api_url": "http://localhost:11434",
      "available_models": [
        {
          "name": "qwen2.5-coder",
          "display_name": "qwen 2.5 coder 32K",
          "max_tokens": 32768,
          "supports_tools": true,
          "supports_thinking": true,
          "supports_images": true
        }
      ]
    }
  }
}
```

> **注意**：如果设置了 `context_window`，它将覆盖任何单模型的 `max_tokens` 值。

如果您指定的上下文长度对于您的硬件来说过大，Ollama 将记录一个错误。
您可以通过运行以下命令来查看这些日志：`tail -f ~/.ollama/logs/ollama.log` (macOS) 或 `journalctl -u ollama -f` (Linux)。
根据您机器上可用的内存，您可能需要将上下文长度调整为较小的值。

您还可以为每个可用模型选择性地指定 `keep_alive` 的值。
这可以是一个整数（秒），或者是字符串持续时间，如 "5m", "10m", "1h", "1d" 等。
例如，`"keep_alive": "120s"` 将允许远程服务器在 120 秒后卸载模型（释放 GPU VRAM）。

`supports_tools` 选项控制模型是否会使用额外的工具。
如果模型在 Ollama 目录中被标记为 `tools`，则应提供此选项，并且可以使用内置的 `Ask` 和 `Write` 配置文件。
如果模型在 Ollama 目录中没有被标记为 `tools`，此选项仍然可以设置为 `true`；但请注意，只有 `Minimal` 内置配置文件会有效。

`supports_thinking` 选项控制模型在产生最终答案之前是否会执行明确的“思考”（推理）过程。
如果模型在 Ollama 目录中被标记为 `thinking`，请设置此选项，您就可以在 Zed 中使用它。

`supports_images` 选项启用模型的视觉功能，允许它处理包含在对话上下文中的图像。
如果模型在 Ollama 目录中被标记为 `vision`，请设置此选项，您就可以在 Zed 中使用它。

#### Ollama 身份验证

除了在您自己的硬件上运行 Ollama（通常不需要身份验证）之外，Zed 还支持连接到远程 Ollama 实例。API 密钥是身份验证所必需的。

[Ollama Turbo](https://ollama.com/turbo) 就是这样一个服务。要将 Zed 配置为使用 Ollama Turbo：

1. 登录您的 Ollama 账户并订阅 Ollama Turbo
2. 访问 [ollama.com/settings/keys](https://ollama.com/settings/keys) 并创建一个 API 密钥
3. 打开设置视图 (`agent: open settings`) 并转到 Ollama 部分
4. 粘贴您的 API 密钥并按回车。
5. 对于 API URL，输入 `https://ollama.com`

如果定义了 `OLLAMA_API_KEY` 环境变量，Zed 也会使用它们。

### OpenAI {#openai}

1. 访问 OpenAI 平台并 [创建一个 API 密钥](https://platform.openai.com/account/api-keys)
2. 确保您的 OpenAI 账户有信用额度
3. 打开设置视图 (`agent: open settings`) 并转到 OpenAI 部分
4. 输入您的 OpenAI API 密钥

OpenAI API 密钥将保存在您的钥匙串中。

如果定义了 `OPENAI_API_KEY` 环境变量，Zed 也会使用它。

#### 自定义模型 {#openai-custom-models}

Zed agent 已预配置为使用常见 OpenAI 模型（GPT-5.2, GPT-5 mini, GPT-5.2 Codex 等）的最新版本。
要使用替代模型，也许是预览版本，或者您希望控制请求参数，您可以通过将以下内容添加到您的 Zed 设置文件中来实现（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "openai": {
      "available_models": [
        {
          "name": "gpt-5.2",
          "display_name": "gpt-5.2 high",
          "reasoning_effort": "high",
          "max_tokens": 272000,
          "max_completion_tokens": 20000
        },
        {
          "name": "gpt-5-nano",
          "display_name": "GPT-5 Nano",
          "max_tokens": 400000
        },
        {
          "name": "gpt-5.2-codex",
          "display_name": "GPT-5.2 Codex",
          "max_tokens": 128000,
          "capabilities": {
            "chat_completions": false
          }
        }
      ]
    }
  }
}
```

您必须在 `max_tokens` 参数中提供模型的上下文窗口；这可以在 [OpenAI 模型文档](https://platform.openai.com/docs/models) 中找到。

对于专注于推理的模型，也请设置 `max_completion_tokens` 以避免产生高昂的推理 token 费用。

如果模型不支持 `/chat/completions` 端点（例如 `gpt-5.2-codex`），请通过将 `capabilities.chat_completions` 设置为 `false` 来禁用它。Zed 将使用 Responses 端点。

自定义模型将列在 Agent Panel 中的模型下拉列表中。

### OpenAI API Compatible {#openai-api-compatible}

Zed 支持通过为 OpenAI 提供商指定自定义的 `api_url` 和 `available_models` 来使用 [OpenAI 兼容的 API](https://platform.openai.com/docs/api-reference/chat)。
这对于连接到其他托管服务（如 Together AI, Anyscale 等）或本地模型非常有用。

您可以通过 UI 或编辑您的设置文件来添加自定义的、OpenAI 兼容的模型。

要通过 UI 实现，请转到 Agent Panel 设置 (`agent: open settings`) 并在 "LLM Providers" 部分标题的右侧查找 "Add Provider" 按钮。
然后，填充模态框中可用的输入字段。

要通过您的设置文件实现（[如何编辑](../configuring-zed.md#settings-files)），请在 `language_models` 下添加以下代码片段：

```json [settings]
{
  "language_models": {
    "openai_compatible": {
      // 以 Together AI 为例
      "Together AI": {
        "api_url": "https://api.together.xyz/v1",
        "available_models": [
          {
            "name": "mistralai/Mixtral-8x7B-Instruct-v0.1",
            "display_name": "Together Mixtral 8x7B",
            "max_tokens": 32768,
            "capabilities": {
              "tools": true,
              "images": false,
              "parallel_tool_calls": false,
              "prompt_cache_key": false
            }
          }
        ]
      }
    }
  }
}
```

默认情况下，OpenAI 兼容的模型继承以下功能：

- `tools`: true (支持工具/函数调用)
- `images`: false (不支持图像输入)
- `parallel_tool_calls`: false (不支持 `parallel_tool_calls` 参数)
- `prompt_cache_key`: false (不支持 `prompt_cache_key` 参数)
- `chat_completions`: true (调用 `/chat/completions` 端点)

如果某个提供商的模型仅适用于 Responses API，请为这些条目设置 `chat_completions` 为 `false`。Zed 对这些模型使用 Responses 端点。

请注意，LLM API 密钥不会存储在您的设置文件中。
因此，请确保将其设置在您的环境变量中（`<PROVIDER_NAME>_API_KEY=<your api key>`），以便您的设置可以拾取它。在上面的示例中，它将是 `TOGETHER_AI_API_KEY=<your api key>`。

### OpenRouter {#openrouter}

OpenRouter 通过单个 API 提供对多个 AI 模型的访问。它支持对兼容模型的工具使用。

1. 访问 [OpenRouter](https://openrouter.ai) 并创建一个账户
2. 从您的 [OpenRouter 密钥页面](https://openrouter.ai/keys) 生成一个 API 密钥
3. 打开设置视图 (`agent: open settings`) 并转到 OpenRouter 部分
4. 输入您的 OpenRouter API 密钥

OpenRouter API 密钥将保存在您的钥匙串中。

如果定义了 `OPENROUTER_API_KEY` 环境变量，Zed 也会使用它。

当使用 OpenRouter 作为您的 assistant 提供商时，您必须在设置中明确选择一个模型。OpenRouter 不再提供默认的模型选择。

在 `settings.json` 中配置您首选的 OpenRouter 模型：

```json [settings]
{
  "agent": {
    "default_model": {
      "provider": "openrouter",
      "model": "openrouter/auto"
    }
  }
}
```

`openrouter/auto` 模型会自动将您的请求路由到最合适的可用模型。您也可以指定 OpenRouter API 提供的任何模型。

#### 自定义模型 {#openrouter-custom-models}

您可以通过将以下内容添加到您的 Zed 设置文件中来向 OpenRouter 提供商添加自定义模型（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "open_router": {
      "api_url": "https://openrouter.ai/api/v1",
      "available_models": [
        {
          "name": "google/gemini-2.0-flash-thinking-exp",
          "display_name": "Gemini 2.0 Flash (Thinking)",
          "max_tokens": 200000,
          "max_output_tokens": 8192,
          "supports_tools": true,
          "supports_images": true,
          "mode": {
            "type": "thinking",
            "budget_tokens": 8000
          }
        }
      ]
    }
  }
}
```

每个模型可用的配置选项包括：

- `name` (必需): OpenRouter 使用的模型标识符
- `display_name` (可选): 在 UI 中显示的可读名称
- `max_tokens` (必需): 模型的上下文窗口大小
- `max_output_tokens` (可选): 模型可以生成的最大 token 数
- `max_completion_tokens` (可选): 最大完成 token 数
- `supports_tools` (可选): 模型是否支持工具/函数调用
- `supports_images` (可选): 模型是否支持图像输入
- `mode` (可选): 思考模型的特殊模式配置

您可以在 [OpenRouter 模型页面](https://openrouter.ai/models) 上查找可用模型及其规格。

自定义模型将列在 Agent Panel 中的模型下拉列表中。

#### 提供商路由

您可以选择性地通过每个模型条目上的 `provider` 对象来控制 OpenRouter 如何在底层的上游提供商之间路由给定的自定义模型请求。

支持的字段（均为可选）：

- `order`: 要首先尝试的提供商 slug 数组，按顺序排列（例如 `["anthropic", "openai"]`）
- `allow_fallbacks` (默认: `true`): 如果首选提供商不可用，是否可以使用备用提供商
- `require_parameters` (默认: `false`): 仅使用支持您提供的所有参数的提供商
- `data_collection` (默认: `allow`): `"allow"` 或 `"disallow"`（控制可能存储数据的提供商的使用）
- `only`: 此请求允许的提供商 slug 白名单
- `ignore`: 要跳过的提供商 slug
- `quantizations`: 限制到特定的量化变体（例如 `["int4","int8"]`）
- `sort`: 候选提供商的排序策略（例如 `"price"` 或 `"throughput"`)

示例向模型添加路由首选项：

```json [settings]
{
  "language_models": {
    "open_router": {
      "api_url": "https://openrouter.ai/api/v1",
      "available_models": [
        {
          "name": "openrouter/auto",
          "display_name": "Auto Router (Tools Preferred)",
          "max_tokens": 2000000,
          "supports_tools": true,
          "provider": {
            "order": ["anthropic", "openai"],
            "allow_fallbacks": true,
            "require_parameters": true,
            "only": ["anthropic", "openai", "google"],
            "ignore": ["cohere"],
            "quantizations": ["int8"],
            "sort": "price",
            "data_collection": "allow"
          }
        }
      ]
    }
  }
}
```

这些路由控制让您可以微调成本、能力和可靠性之间的权衡，而无需更改您在 UI 中选择的模型名称。

### Vercel AI Gateway {#vercel-ai-gateway}

[Vercel AI Gateway](https://vercel.com/ai-gateway) 通过单个 OpenAI 兼容的端点提供对许多模型的访问。

1. 从您的 [Vercel AI Gateway 密钥页面](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys&title=Go+to+AI+Gateway) 创建一个 API 密钥
2. 打开设置视图 (`agent: open settings`) 并转到 **Vercel AI Gateway** 部分
3. 输入您的 Vercel AI Gateway API 密钥

Vercel AI Gateway API 密钥将保存在您的钥匙串中。

如果定义了 `VERCEL_AI_GATEWAY_API_KEY` 环境变量，Zed 也会使用它。

您也可以在设置文件中为 Vercel AI Gateway 设置自定义端点：

```json [settings]
{
  "language_models": {
    "vercel_ai_gateway": {
      "api_url": "https://ai-gateway.vercel.sh/v1"
    }
  }
}
```

### Vercel v0 {#vercel-v0}

[Vercel v0](https://v0.app/docs/api/model) 是一个用于生成全栈应用的模型，对 Next.js 和 Vercel 等堆栈具有框架感知的补全功能。
它支持文本和图像输入，并提供快速的流式响应。

v0 模型是 [OpenAI 兼容的模型](/#openai-api-compatible)，并且在面板的设置视图中 Vercel 作为一个专用的提供商出现。

要在 Zed 中开始使用它，请确保您首先创建了一个 [v0 API 密钥](https://v0.dev/chat/settings/keys)。
一旦拥有它，直接将其粘贴到面板设置视图中的 Vercel 提供商部分。

然后，您应该在 Agent Panel 的模型下拉列表中找到它作为 `v0-1.5-md`。

### xAI {#xai}

Zed 包含一个专用的 [xAI](https://x.ai/) 提供商。您可以使用自己的 API 密钥来访问 Grok 模型。

1. [在 xAI 控制台中创建一个 API 密钥](https://console.x.ai/team/default/api-keys)
2. 打开设置视图 (`agent: open settings`) 并转到 **xAI** 部分
3. 输入您的 xAI API 密钥

xAI API 密钥将保存在您的钥匙串中。如果定义了 `XAI_API_KEY` 环境变量，Zed 也会使用它。

> **注意**：xAI API 是 OpenAI 兼容的，并且 Zed 还包含一个专用的 xAI 提供商。我们建议使用专用的 `x_ai` 提供商配置，而不是 [OpenAI API Compatible](#openai-api-compatible) 方法。

#### 自定义模型 {#xai-custom-models}

Zed agent 已预配置了常见的 Grok 模型。如果您希望使用替代模型或自定义其参数，您可以通过将以下内容添加到您的 Zed 设置文件中来实现（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "language_models": {
    "x_ai": {
      "api_url": "https://api.x.ai/v1",
      "available_models": [
        {
          "name": "grok-1.5",
          "display_name": "Grok 1.5",
          "max_tokens": 131072,
          "max_output_tokens": 8192
        },
        {
          "name": "grok-1.5v",
          "display_name": "Grok 1.5V (Vision)",
          "max_tokens": 131072,
          "max_output_tokens": 8192,
          "supports_images": true
        }
      ]
    }
  }
}
```

## 自定义提供商端点 {#custom-provider-endpoint}

只要它与提供商的 API 结构兼容，您就可以为不同的提供商使用自定义 API 端点。
为此，请将以下内容添加到您的设置文件中（[如何编辑](../configuring-zed.md#settings-files)）：

```json
{
  "language_models": {
    "some-provider": {
      "api_url": "http://localhost:11434"
    }
  }
}
```

目前，`some-provider` 可以是以下任何值：`anthropic`, `google`, `ollama`, `openai`。

这与例如 [OpenAI-compatible](#openai-api-compatible) 模型所使用的基础设施相同。