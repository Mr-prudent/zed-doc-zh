---
title: Zed 中的模型上下文协议 (MCP)
description: 在 Zed 中安装和配置 MCP 服务器，以通过外部工具、数据源和集成来扩展您的 AI 智能体。
---

# 模型上下文协议

Zed 使用 [模型上下文协议 (Model Context Protocol)](https://modelcontextprotocol.io/) 与上下文服务器进行交互。

> 模型上下文协议 (MCP) 是一个开放协议，用于通过标准接口将 LLM 应用程序与外部工具和数据源连接起来。

## 支持的功能

Zed 当前支持 MCP 的 [工具 (Tools)](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) 和 [提示 (Prompts)](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts) 功能。
我们欢迎有助于扩展 Zed 的 MCP 功能覆盖范围（如发现、采样、引出等）的贡献。

Zed 还处理来自 MCP 服务器的 `notifications/tools/list_changed` 通知。当服务器在运行时添加、移除或修改其可用工具时，Zed 会自动重新加载工具列表，无需重启服务器。

## 安装 MCP 服务器

### 作为扩展

在 Zed 中使用 MCP 服务器的一种方式是将它们作为扩展进行暴露。
请查看 [MCP 服务器扩展](../extensions/mcp-extensions.md) 页面，了解如何创建您自己的扩展。

许多 MCP 服务器可作为扩展使用。您可以通过以下方式找到它们：

1. [Zed 官网](https://zed.dev/extensions?filter=context-servers)
2. 在应用中，打开命令面板并运行 `zed: extensions` 操作
3. 在应用中，转到智能体面板右上角的菜单，查找“查看服务器扩展”菜单项

可作为扩展提供的流行服务器包括：

- [Context7](https://zed.dev/extensions/context7-mcp-server)
- [GitHub](https://zed.dev/extensions/github-mcp-server)
- [Puppeteer](https://zed.dev/extensions/puppeteer-mcp-server)
- [Gem](https://zed.dev/extensions/gem)
- [Brave Search](https://zed.dev/extensions/brave-search-mcp-server)
- [Prisma](https://github.com/aqrln/prisma-mcp-zed)
- [Framelink Figma](https://zed.dev/extensions/framelink-figma-mcp-server)
- [Resend](https://zed.dev/extensions/resend-mcp-server)

### 作为自定义服务器

创建扩展并非在 Zed 中使用 MCP 服务器的唯一方法。
您可以通过将它们的命令直接添加到您的设置文件中（[如何编辑](../configuring-zed.md#settings-files)）来连接它们，如下所示：

```json [设置]
{
  "context_servers": {
    "local-mcp-server": {
      "command": "some-command",
      "args": ["arg-1", "arg-2"],
      "env": {}
    },
    "remote-mcp-server": {
      "url": "custom",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

或者，您也可以通过访问智能体面板的“设置”视图（也可通过 `agent: open settings` 操作访问）来添加自定义服务器。
从那里，您可以通过点击“添加自定义服务器”按钮时出现的模态框来添加它。

## 使用 MCP 服务器

### 配置检查

大多数 MCP 服务器在安装后都需要进行配置。

对于扩展，安装后，Zed 会弹出一个模态框，显示正确设置它所需的内容。
例如，GitHub MCP 扩展要求您添加一个 [个人访问令牌 (Personal Access Token)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

对于自定义服务器，请确保您查看提供商文档，以确定需要将哪种类型的命令、参数和环境变量添加到 JSON 中。

要检查您的 MCP 服务器是否正确配置，请转到智能体面板的设置视图，并观察其名称旁边的指示点。
如果它们正常运行，指示点将是绿色的，其工具提示将显示“服务器处于活动状态”。
如果不是，其他颜色和工具提示消息将指示发生了什么情况。

### 智能体面板使用

安装完成后，您可以返回智能体面板并开始提示。

MCP 工具被调用的可靠性可能因模型而异。
通过名称提及 MCP 服务器可以帮助模型从该服务器选择工具。

但是，如果您想**确保**使用给定的 MCP 服务器，您可以创建[一个自定义配置文件](./agent-panel.md#custom-profiles)，其中所有内置工具（或可能与服务器工具冲突的工具）都已关闭，仅开启来自 MCP 服务器的工具。

例如，[Dagger 团队建议](https://container-use.com/agent-integrations#zed)对其 [Container Use MCP 服务器](https://zed.dev/extensions/mcp-server-container-use) 执行此操作：

```json [设置]
"agent": {
  "profiles": {
    "container-use": {
      "name": "Container Use",
      "tools": {
        "fetch": true,
        "thinking": true,
        "copy_path": false,
        "find_path": false,
        "delete_path": false,
        "create_directory": false,
        "list_directory": false,
        "diagnostics": false,
        "read_file": false,
        "open": false,
        "move_path": false,
        "grep": false,
        "edit_file": false,
        "terminal": false
      },
      "enable_all_context_servers": false,
      "context_servers": {
        "container-use": {
          "tools": {
            "environment_create": true,
            "environment_add_service": true,
            "environment_update": true,
            "environment_run_cmd": true,
            "environment_open": true,
            "environment_file_write": true,
            "environment_file_read": true,
            "environment_file_list": true,
            "environment_file_delete": true,
            "environment_checkpoint": true
          }
        }
      }
    }
  }
}
```

### 工具权限

> **注意：** 在 Zed v0.224.0 及更高版本中，工具批准由 `agent.tool_permissions.default` 控制。
> 在早期版本中，它由 `agent.always_allow_tool_actions` 布尔值（默认为 `false`）控制。

Zed 的智能体面板提供了 `agent.tool_permissions.default` 设置，用于控制原生 Zed 智能体的工具批准行为：

- `"confirm"` (默认) — 在运行任何工具操作（包括 MCP 工具调用）之前提示批准
- `"allow"` — 自动批准工具操作，无需提示
- `"deny"` — 阻止所有工具操作

要对特定的 MCP 工具进行细粒度控制，您可以配置按工具的权限规则。
MCP 工具使用密钥格式 `mcp:<server>:<tool_name>` — 例如，`mcp:github:create_issue`。
按工具条目上的 `default` 密钥是 MCP 工具的主要机制，因为基于模式的规则会与空字符串匹配，而大多数模式不会匹配。

了解有关[工具权限如何工作](./tool-permissions.md)、如何进一步自定义它们以及其他详细信息。

### 外部智能体

请注意，对于通过 [智能体客户端协议 (Agent Client Protocol)](https://agentclientprotocol.com/) 连接的[外部智能体](./external-agents.md)，对从 Zed 安装的 MCP 服务器的访问可能因 ACP 智能体实现而异。

关于内置的智能体，Claude Agent 和 Codex 都支持它，而 Gemini CLI 尚不支持。
在此期间，请通过其[文档](https://github.com/google-gemini/gemini-cli?tab=readme-ov-file#using-mcp-servers)了解如何为 Gemini CLI 添加 MCP 服务器支持。

### 错误处理

当 MCP 服务器在处理工具调用时遇到错误，智能体会直接收到错误消息，操作失败。
常见的错误场景包括：

- 传递给工具的参数无效
- 服务器端故障（数据库连接问题、速率限制）
- 不支持的操作或资源缺失

来自上下文服务器的错误消息将显示在智能体的响应中，使您能够诊断和纠正问题。
有关特定错误代码的详细信息，请检查上下文服务器的日志或文档。