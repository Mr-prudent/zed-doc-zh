---
title: AI Agent 设置 - Zed
description: "自定义 Zed 的 AI 代理：默认模型、温度、工具审批、自动运行命令、通知和面板选项。"
---

# 智能体设置

Zed 的 Agent 面板设置，包括模型选择、UI 偏好和工具权限。

## 模型设置 {#model-settings}

### 默认模型 {#default-model}

如果您正在使用 [Zed 托管的 LLM 服务](./subscription.md)，它会将 `claude-sonnet-4-5` 设置为代理工作（智能体面板、内联助手）的默认模型，并将 `gpt-5-nano` 设置为默认的"快速"模型（线程摘要、git 提交信息）。如果您未订阅或想要更改这些默认设置，您可以在设置中手动编辑 `default_model` 对象：

```json [settings]
{
  "agent": {
    "default_model": {
      "provider": "openai",
      "model": "gpt-4o"
    }
  }
}
```

### 功能特定模型 {#feature-specific-models}

您可以为以下 AI 功能分配不同的特定模型：

- 线程摘要模型：用于生成线程摘要
- 内联助手模型：用于内联助手功能
- 提交信息模型：用于生成 Git 提交信息

```json [settings]
{
  "agent": {
    "default_model": {
      "provider": "zed.dev",
      "model": "claude-sonnet-4-5"
    },
    "inline_assistant_model": {
      "provider": "anthropic",
      "model": "claude-3-5-sonnet"
    },
    "commit_message_model": {
      "provider": "openai",
      "model": "gpt-4o-mini"
    },
    "thread_summary_model": {
      "provider": "google",
      "model": "gemini-2.0-flash"
    }
  }
}
```

> 如果没有为这些功能中的某一个设置自定义模型，它们将自动回退到使用默认模型。

### 内联助手的替代模型 {#alternative-assists}

特别是对于内联助手，您可以同时将相同的提示发送到多个模型。

您可以通过自定义设置文件（[如何编辑](../configuring-zed.md#settings-files)）来添加此功能：

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
        "model": "gpt-5-mini"
      }
    ]
  }
}
```

当配置了多个模型时，您将在内联助手 UI 中看到按钮，允许您循环切换由每个模型生成的输出。

您在此处指定的模型始终会与您的[默认模型](#default-model)一同使用。

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
        "model": "gpt-5-mini"
      },
      {
        "provider": "zed.dev",
        "model": "gemini-3-flash"
      }
    ]
  }
}
```

### 模型温度

为特定提供商和/或模型指定自定义温度：

```json [settings]
{
  "agent": {
    "model_parameters": [
      // 为所有 OpenAI 模型的请求设置参数：
      {
        "provider": "openai",
        "temperature": 0.5
      },
      // 为所有一般性请求设置参数：
      {
        "temperature": 0
      },
      // 为特定提供商和模型设置参数：
      {
        "provider": "zed.dev",
        "model": "claude-sonnet-4-5",
        "temperature": 1.0
      }
    ]
  }
}
```

## Agent 面板设置 {#agent-panel-settings}

请注意，其中一些设置也会在 Agent 面板的设置 UI 中显示，您可以通过 `agent: open settings` 操作或通过面板右上角的下拉菜单访问。

### 默认视图

使用 `default_view` 设置来更改 Agent 面板的默认视图。
您可以选择 `thread`（默认）和 `text_thread`：

```json [settings]
{
  "agent": {
    "default_view": "text_thread"
  }
}
```

### 字体大小

使用 `agent_ui_font_size` 设置来更改面板中渲染的代理响应的字体大小。

```json [settings]
{
  "agent_ui_font_size": 18
}
```

> Agent 面板中的编辑器（例如主消息文本区域）使用等宽字体，并由 `agent_buffer_font_size` 控制（当未设置时默认为 `buffer_font_size`）。

### 默认工具权限

> **注意：** 在 Zed v0.224.0 及更高版本中，工具审批使用下面描述的 `agent.tool_permissions` 设置。

`agent.tool_permissions.default` 设置控制 Zed 原生代理的基本工具审批行为：

- `"confirm"`（默认）— 在运行任何工具操作前提示批准
- `"allow"`— 自动批准工具操作，不提示
- `"deny"`— 阻止所有工具操作

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "default": "confirm"
    }
  }
}
```
即使设置了 `"default": "allow"`，每个工具的 `always_deny` 和 `always_confirm` 模式仍然会被遵守，因此您可以自动批准大多数操作，同时对危险或敏感的操作保持防护。

### 按工具的权限规则 {#per-tool-permission-rules}

要对单个工具操作进行精细控制，请在 `tool_permissions` 内部使用 `tools` 键来配置基于正则表达式的规则，以自动批准、自动拒绝或始终要求对特定输入进行确认。

每个工具条目支持以下键：

- `default` — 当没有模式匹配时的回退选项：`"confirm"`、`"allow"` 或 `"deny"`
- `always_allow` — 自动批准匹配操作的模式数组
- `always_deny` — 立即阻止匹配操作的模式数组
- `always_confirm` — 总是提示确认匹配操作的模式数组

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "default": "allow",
      "tools": {
        "terminal": {
          "default": "confirm",
          "always_allow": [
            { "pattern": "^cargo\\s+(build|test|check)" },
            { "pattern": "^git\\s+(status|log|diff)" }
          ],
          "always_deny": [{ "pattern": "rm\\s+-rf\\s+(/|~)" }],
          "always_confirm": [{ "pattern": "sudo\\s" }]
        },
        "edit_file": {
          "always_deny": [
            { "pattern": "\\.env" },
            { "pattern": "\\.(pem|key)$" }
          ]
        }
      }
    }
  }
}
```

#### 模式优先级

在评估工具操作时，规则按以下顺序检查（优先级从高到低）：

1. **内置安全规则** — 硬编码的保护措施（例如 `rm -rf /`），无法被覆盖
2. **`always_deny`** — 立即阻止匹配的操作
3. **`always_confirm`** — 要求对匹配的操作进行确认
4. **`always_allow`** — 自动批准匹配的操作。对于链式命令的终端工具（例如 `echo hello && rm file`），**所有**子命令都必须匹配一个 `always_allow` 模式
5. **工具特定的 `default`** — 当没有模式匹配时的按工具回退（例如 `tools.terminal.default`）
6. **全局 `default`** — 回退到 `tool_permissions.default`

#### 大小写敏感性

默认情况下，模式是**不区分大小写**的。要使模式区分大小写，请将 `case_sensitive` 设置为 `true`：

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "edit_file": {
          "always_deny": [
            {
              "pattern": "^Makefile$",
              "case_sensitive": true
            }
          ]
        }
      }
    }
  }
}
```

#### `copy_path` 和 `move_path` 模式

对于 `copy_path` 和 `move_path` 工具，模式会独立匹配源路径和目标路径。在**任一**路径上匹配到 `deny` 或 `confirm` 都会生效。对于 `always_allow`，**两个**路径都必须匹配才能自动批准。

#### MCP 工具权限

MCP 工具在 `tools` 配置中使用 `mcp:<server_name>:<tool_name>` 格式的键。例如：

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "mcp:github:create_issue": {
          "default": "confirm"
        },
        "mcp:github:create_pull_request": {
          "default": "deny"
        }
      }
    }
  }
}
```

每个 MCP 工具条目上的 `default` 键是控制 MCP 工具权限的主要机制。基于模式的规则（`always_allow`、`always_deny`、`always_confirm`）对于 MCP 工具会匹配一个空字符串，因此大多数模式不会匹配 — 请改用工具级别的 `default`。

更多示例和完整细节，请参见[工具权限](./tool-permissions.md)文档。

> **注意：** 在 Zed v0.224.0 之前，工具审批由布尔值 `agent.always_allow_tool_actions` 控制（默认为 `false`）。将其设置为 `true` 可自动批准工具操作，或保留为 `false` 以要求对编辑和工具调用进行确认。

### 编辑显示模式

控制代理执行完编辑后，是否在单个缓冲区中显示审查操作（接受 & 拒绝）。
默认值为 `false`。

```json [settings]
{
  "agent": {
    "single_file_review": false
  }
}
```

### 声音通知

控制代理在完成更改生成或需要您输入时是否播放通知声音。
默认值为 `false`。

```json [settings]
{
  "agent": {
    "play_sound_when_agent_done": true
  }
}
```

### 消息编辑器大小

使用 `message_editor_min_lines` 设置来控制代理消息编辑器的最小行数高度。
默认设置为 `4`，最大行数始终是最小值的两倍。

```json [settings]
{
  "agent": {
    "message_editor_min_lines": 4
  }
}
```

### 发送修饰键

要求使用修饰键（macOS 上为 `cmd`，Linux 上为 `ctrl`）来发送消息。防止在编辑时意外发送。
默认值为 `false`。

```json [settings]
{
  "agent": {
    "use_modifier_to_send": true
  }
}
```

### 编辑卡片

使用 `expand_edit_card` 设置来控制编辑卡片是否在 Agent 面板中显示完整差异。
默认设置为 `true`，但如果设置为 `false`，卡片高度将限制在一定行数内，需要点击才能展开。

```json [settings]
{
  "agent": {
    "expand_edit_card": false
  }
}
```

### 终端卡片

使用 `expand_terminal_card` 设置来控制终端卡片是否在 Agent 面板中显示命令输出。
默认设置为 `true`，但如果设置为 `false`，即使命令正在运行，卡片也会完全折叠，需要点击才能展开。

```json [settings]
{
  "agent": {
    "expand_terminal_card": false
  }
}
```

### 反馈控制

控制是否在每个代理响应的底部显示向上/向下的拇指按钮，以便您就代理的性能向 Zed 提供反馈。
默认值为 `true`。

```json [settings]
{
  "agent": {
    "enable_feedback": false
  }
}
```
