---
title: 在 Zed 中使用 Claude Agent、Gemini CLI 和 Codex
description: 通过 Agent Client Protocol (ACP) 直接在 Zed 中运行 Claude Agent、Gemini CLI、Codex 和其他 AI 编程代理。
---

# 外部智能体

Zed 通过 [Agent Client Protocol (ACP)](https://agentclientprotocol.com) 支持许多外部智能体，包括基于命令行的代理。

Zed 支持 [Gemini CLI](https://github.com/google-gemini/gemini-cli) (ACP 的参考实现)、[Claude Agent](https://platform.claude.com/docs/en/agent-sdk/overview)、[Codex](https://developers.openai.com/codex)、[GitHub Copilot](https://github.com/github/copilot-language-server-release)，以及你可以配置的[其他代理](#add-more-agents)。

有关 Zed 的内置代理及其可以原生动使用的完整工具列表，请参阅 [Agent Tools](./tools.md)。

> 请注意，Zed 与外部智能体的交互严格基于 UI；计费、法律和条款安排直接在你和代理提供商之间进行。
> Zed 不对使用外部智能体收费，我们的[零数据保留协议/隐私保证](./ai-improvement.md)仅适用于 Zed 托管的模型。

## Gemini CLI {#gemini-cli}

Zed 提供了在 [智能体面板](./agent-panel.md) 中直接运行 [Gemini CLI](https://github.com/google-gemini/gemini-cli) 的能力。
我们在后台运行 Gemini CLI，并通过 ACP 与其通信。

### 入门

首先使用 {#kb agent::ToggleFocus} 打开智能体面板，然后使用右上角的 `+` 按钮启动一个新的 Gemini CLI 线程。

如果您希望将其绑定到键盘快捷键，可以通过 `zed: open keymap file` 命令编辑您的 `keymap.json` 文件来添加以下内容：

```json [keymap]
[
  {
    "bindings": {
      "cmd-alt-g": [
        "agent::NewExternalAgentThread",
        { "agent": { "custom": { "name": "gemini" } } }
      ]
    }
  }
]
```

#### 安装

第一次创建 Gemini CLI 线程时，Zed 将安装 [@google/gemini-cli](https://github.com/google-gemini/gemini-cli)。
此安装仅供 Zed 使用，并会随着您使用代理而保持更新。

#### 身份验证

启动 Gemini CLI 后，系统会提示您进行身份验证。

点击“登录”按钮以交互式地打开 Gemini CLI，您可以在其中使用 Google 账户或 [Vertex AI](https://cloud.google.com/vertex-ai) 凭据登录。
在这种情况下，Zed 不会看到您的 OAuth 或访问令牌。

如果 `GEMINI_API_KEY` 环境变量（或 `GOOGLE_AI_API_KEY`）已经设置，或者您已在 Zed 的[语言模型提供商设置](./llm-providers.md#google-ai)中配置了 Google AI API 密钥，它将自动传递给 Gemini CLI。

有关更多信息，请参阅 [Gemini CLI 文档](https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md)。

### 使用

Gemini CLI 支持 Zed 官方代理的相同工作流：代码生成、重构、调试和问答。通过 @ 提及文件、最近的线程或符号来添加上下文。

> 某些智能体面板功能尚未在 Gemini CLI 中可用：编辑过去的消息、从历史记录中恢复线程以及检查点。

## Claude Agent

与 Gemini CLI 类似，您也可以通过 Zed 的 [智能体面板](./agent-panel.md) 直接运行 [Claude Agent](https://platform.claude.com/docs/en/agent-sdk/overview)。
在底层，Zed 运行 Claude Agent SDK，该 SDK 在后台运行 Claude Code，并通过 [专用适配器](https://github.com/zed-industries/claude-agent-acp) 经由 ACP 与其通信。

### 入门

使用 {#kb agent::ToggleFocus} 打开智能体面板，然后使用右上角的 `+` 按钮启动一个新的 Claude Agent 线程。

如果您希望将其绑定到键盘快捷键，可以通过 `zed: open keymap file` 命令编辑您的 `keymap.json` 文件来添加以下内容：

```json [keymap]
[
  {
    "bindings": {
      "cmd-alt-c": [
        "agent::NewExternalAgentThread",
        { "agent": { "custom": { "name": "claude-acp" } } }
      ]
    }
  }
]
```

### 身份验证

从版本 `0.202.7` 开始，Zed 的 Claude Agent 安装的身份验证已完全与 Zed 的代理分离。
也就是说，通过 [Zed Agent 的设置](./llm-providers.md#anthropic) 添加的 Anthropic API 密钥将**不会**被 Claude Agent 用于身份验证和计费。

为确保您使用的是自己选择的计费方式，[打开一个新的 Claude Agent 线程](./agent-panel.md#new-thread)。
然后，运行 `/login`，并通过 API 密钥或 `Log in with Claude Code` 进行身份验证，以使用 Claude Pro/Max 订阅。

#### 安装

第一次创建 Claude Agent 线程时，Zed 将安装 [@zed-industries/claude-agent-acp](https://github.com/zed-industries/claude-agent-acp)。
此安装仅供 Zed 使用，并会随着您使用代理而保持更新。

Zed 将始终使用此管理的 Claude Agent 适配器版本，其中包含一个嵌入的 Claude Code CLI 版本，即使您已全局安装它。

如果您想覆盖适配器使用的可执行文件，您可以在设置中将 `CLAUDE_CODE_EXECUTABLE` 环境变量设置为您首选可执行文件的路径。

```json
{
  "agent_servers": {
    "claude-acp": {
      "type": "registry",
      "env": {
        "CLAUDE_CODE_EXECUTABLE": "/path/to/alternate-claude-code-executable"
      }
    }
  }
}
```

### 使用

Claude Agent 支持 Zed 官方代理的相同工作流。通过 @ 提及文件、最近的线程、诊断信息或符号来添加上下文。

除了通过 [ACP](https://agentclientprotocol.com) 与其通信外，Zed 还依赖于 [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) 来支持其部分特定功能。
然而，SDK 尚未暴露完全支持所有功能所需的一切：

- 斜杠命令：[自定义斜杠命令](https://code.claude.com/docs/en/slash-commands#custom-slash-commands) 已完全支持，并已合并到技能中。[内置命令](https://code.claude.com/docs/en/slash-commands#built-in-slash-commands) 的一个子集也已得到支持。
- [子代理](https://code.claude.com/docs/en/sub-agents) 已支持。
- [代理团队](https://code.claude.com/docs/en/agent-teams) 目前**不支持**。
- [钩子](https://code.claude.com/docs/en/hooks-guide) 目前**不支持**。

> 某些[智能体面板](./agent-panel.md)功能尚未在 Claude Agent 中可用：编辑过去的消息、从历史记录中恢复线程以及检查点。

#### CLAUDE.md

Zed 中的 Claude Agent 将自动使用在您项目根目录、项目子目录或根 `.claude` 目录中找到的任何 `CLAUDE.md` 文件。

如果您没有 `CLAUDE.md` 文件，您可以通过 `init` 斜杠命令要求 Claude Agent 为您创建一个。

## Codex CLI

您也可以通过 Zed 的 [智能体面板](./agent-panel.md) 直接运行 [Codex CLI](https://github.com/openai/codex)。
在底层，Zed 运行 Codex CLI 并通过 [专用适配器](https://github.com/zed-industries/codex-acp) 经由 ACP 与其通信。

### 入门

从版本 `0.208` 开始，您应该能够直接在 Zed 中使用 Codex。
使用 {#kb agent::ToggleFocus} 打开智能体面板，然后使用右上角的 `+` 按钮启动一个新的 Codex 线程。

如果您希望将其绑定到键盘快捷键，可以通过 `zed: open keymap file` 命令编辑您的 `keymap.json` 文件来添加以下内容：

```json
[
  {
    "bindings": {
      "cmd-alt-c": [
        "agent::NewExternalAgentThread",
        { "agent": { "custom": { "name": "codex-acp" } } }
      ]
    }
  }
]
```

### 身份验证

Zed 的 Codex 安装的身份验证已完全与 Zed 的代理分离。
也就是说，通过 [Zed Agent 的设置](./llm-providers.md#openai) 添加的 OpenAI API 密钥将**不会**被 Codex 用于身份验证和计费。

为确保您使用的是自己选择的计费方式，[打开一个新的 Codex 线程](./agent-panel.md#new-thread)。
第一次运行时，系统将提示您通过以下三种方法之一进行身份验证：

1. 使用 ChatGPT 登录 - 允许您使用现有的付费 ChatGPT 订阅。_注意：此方法目前在远程项目中不受支持_
2. `CODEX_API_KEY` - 使用您在环境变量 `CODEX_API_KEY` 下设置的 API 密钥。
3. `OPENAI_API_KEY` - 使用您在环境变量 `OPENAI_API_KEY` 下设置的 API 密钥。

如果您已经登录并想更改身份验证方法，请在线程中输入 `/logout` 然后重新进行身份验证。

如果您想与 Codex 一起使用第三方提供商，您可以使用您的 [Codex config.toml](https://github.com/openai/codex/blob/main/docs/config.md#model-selection) 进行配置，或在您的 Codex 代理服务器设置中传递额外的 [args/env 变量](https://github.com/openai/codex/blob/main/docs/config.md#model-selection)。

#### 安装

第一次创建 Codex 线程时，Zed 将安装 [codex-acp](https://github.com/zed-industries/codex-acp)。
此安装仅供 Zed 使用，并会随着您使用代理而保持更新。

即使您已全局安装，Zed 也始终使用此管理的 Codex 版本。

### 使用

Codex 支持 Zed 官方代理的相同工作流。通过 @ 提及文件或符号来添加上下文。

> 某些智能体面板功能尚未在 Codex 中可用：编辑过去的消息、从历史记录中恢复线程以及检查点。

## 添加更多代理 {#add-more-agents}

### 通过代理服务器扩展

<div class="warning">

从 `v0.221.x` 开始，[ACP 注册表](https://agentclientprotocol.com/registry) 是在 Zed 中安装外部智能体的首选方式。
请在[发布博客文章](https://zed.dev/blog/acp-registry)中了解更多信息。
在不久的将来，代理服务器扩展将被弃用。

</div>

通过安装 [Agent Server extensions](../extensions/agent-servers.md) 为 Zed 添加更多外部智能体。

通过在扩展页面中筛选“Agent Servers”来查看可用的代理，您可以通过命令面板中的 `zed: extensions` 命令或 [Zed 网站](https://zed.dev/extensions?filter=agent-servers) 访问该页面。

### 通过 ACP 注册表

#### 概述

如上所述，代理服务器扩展将在不久的将来被弃用，以便为 ACP 注册表腾出空间。

[ACP 注册表](https://github.com/agentclientprotocol/registry) 允许开发人员将 ACP 兼容的代理分发给任何实现该协议的客户端。从注册表安装的代理会自动更新。

目前，注册表是一个经过精心挑选的代理集合，仅包含那些[支持身份验证](https://agentclientprotocol.com/rfds/auth-methods)的代理。

#### 在 Zed 中使用它

使用 `zed: acp registry` 命令快速跳转到 ACP 注册表页面。
在智能体面板的配置视图中，还有一个（“添加代理”）按钮可以带您前往。

在那里，您可以点击安装您首选的代理，它将立即在智能体面板的 `+` 图标按钮中可用。

> 如果您同时通过扩展和注册表安装了同一个代理，注册表版本将优先。

### 自定义代理

您还可以通过设置文件（[如何编辑](../configuring-zed.md#settings-files)）通过在 `agent_servers` 下指定某些字段来添加代理，如下所示：

```json [settings]
{
  "agent_servers": {
    "My Custom Agent": {
      "type": "custom",
      "command": "node",
      "args": ["~/projects/agent/index.js", "--acp"],
      "env": {}
    }
  }
}
```
如果您正在开发一个支持该协议的新代理并想对其进行调试，这会很有用。

您也可以使用注册表名称（`claude-acp`, `codex-acp`, `gemini`）并在设置中使用 `"type": "registry"` 来为注册表安装的代理（如 Claude Agent、Codex 和 Gemini CLI）自定义环境变量。

## 调试代理

在 Zed 中使用外部智能体时，您可以通过命令面板中的 `dev: open acp logs` 访问调试视图。
这可以让您查看 Zed 和代理之间发送和接收的消息。

![ACP 日志的调试视图。](https://zed.dev/img/acp/acp-logs.webp)

如果您要打开关于 Claude Agent、Codex、OpenCode 等外部智能体的问题，附上此视图中的数据会很有帮助。

## MCP 服务器

请注意，对于外部智能体，对 [从 Zed 安装的](./mcp.md) MCP 服务器的访问权限可能因 ACP 实现而异。
例如，Claude Agent 和 Codex 都支持它，但 Gemini CLI 尚不支持。
