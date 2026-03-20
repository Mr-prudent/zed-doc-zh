# 工具权限

配置哪些 [Agent Panel](./agent-panel.md) 工具自动运行，哪些需要您的批准。
有关可用工具的列表，请参阅[工具页面](./tools.md)。

> **注意：** 在 Zed v0.224.0 及以上版本中，工具审批由 `agent.tool_permissions.default` 控制。
> 在早期版本中，它由布尔值 `agent.always_allow_tool_actions` 控制（默认为 `false`）。

## 快速开始

使用 Zed 的设置编辑器 [配置工具权限](zed://settings/agent.tool_permissions)，或将规则直接添加到您的设置文件中：

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
            { "pattern": "^npm\\s+(install|test|run)" }
          ],
          "always_confirm": [{ "pattern": "sudo\\s+/" }]
        }
      }
    }
  }
}
```

此示例自动批准终端工具中的 `cargo` 和 `npm` 命令，而对 `sudo` 命令则需要逐个手动确认。
非终端命令遵循全局 `"default": "allow"` 设置，但工具特定的默认值和 `always_confirm` 规则仍可能提示。

## 工作原理

`tool_permissions` 设置允许您通过指定正则表达式模式来自定义工具权限，这些模式可以：

- **自动批准** 您信任的操作
- **自动拒绝** 危险操作（即使当 `tool_permissions.default` 设置为 `"allow"` 时也会被阻止）
- **始终确认** 敏感操作，无论其他设置如何

## 支持的工具

| 工具 | 匹配的输入 |
| ------------------------ | ---------------------------- |
| `terminal` | shell 命令字符串 |
| `edit_file` | 文件路径 |
| `delete_path` | 正在被删除的路径 |
| `move_path` | 源和目标路径 |
| `copy_path` | 源和目标路径 |
| `create_directory` | 目录路径 |
| `restore_file_from_disk` | 文件路径 |
| `save_file` | 文件路径 |
| `fetch` | URL |
| `web_search` | 搜索查询 |

对于 MCP 工具，使用格式 `mcp:<server>:<tool_name>`。
例如，名为 `create_issue` 的工具位于名为 `github` 的服务器上，则表示为 `mcp:github:create_issue`。

## 配置

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "default": "confirm",
      "tools": {
        "<tool_name>": {
          "default": "confirm",
          "always_allow": [{ "pattern": "...", "case_sensitive": false }],
          "always_deny": [{ "pattern": "...", "case_sensitive": false }],
          "always_confirm": [{ "pattern": "...", "case_sensitive": false }]
        }
      }
    }
  }
}
```

### 选项

| 选项 | 描述 |
| ---------------- | ------------------------------------------------------------------------------ |
| `default` | 当没有模式匹配时的回退值：`"confirm"`（默认）、`"allow"` 或 `"deny"` |
| `always_allow` | 自动批准的模式（除非拒绝或确认模式也匹配） |
| `always_deny` | 立即阻止匹配的模式——优先级最高，无法被覆盖 |
| `always_confirm` | 始终提示的模式，即使当 `tool_permissions.default` 设置为 `"allow"` |

### 模式语法

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "edit_file": {
          "always_allow": [
            {
              "pattern": "your-regex-here",
              "case_sensitive": false
            }
          ]
        }
      }
    }
  }
}
```

模式使用 Rust 正则表达式语法。
默认情况下，匹配不区分大小写。

## 规则优先级

从高到低优先级：

1. **内置安全规则**：硬编码的保护措施（例如 `rm -rf /`）。无法被覆盖。
2. **`always_deny`**：阻止匹配的操作
3. **`always_confirm`**：对匹配的操作要求确认
4. **`always_allow`**：自动批准匹配的操作
5. **工具特定的 `default`**：当没有模式匹配时的工具级回退（例如 `tools.terminal.default`）
6. **全局 `default`**：当没有设置工具特定默认值时，回退到 `tool_permissions.default`

## 全局自动批准

要自动批准所有工具操作：

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "default": "allow"
    }
  }
}
```

这将绕过大多数工具的确认提示，但 `always_deny`、`always_confirm`、内置安全规则以及 Zed 设置目录内的路径仍会提示或阻止。

## Shell 兼容性

对于 `terminal` 工具，Zed 会解析链式命令（例如 `echo hello && rm file`）以将每个子命令与您的模式进行匹配。

所有支持的 shell 都支持工具权限模式，包括 sh、bash、zsh、dash、fish、PowerShell 7+、pwsh、cmd、xonsh、csh、tcsh、Nushell、Elvish 和 rc（Plan 9）。

## 编写模式

- 使用 `\b` 表示单词边界：`\brm\b` 匹配 "rm" 但不匹配 "storm"
- 使用 `^` 和 `$` 将模式锚定到输入的开始/结束
- 转义特殊字符：`\.` 表示字面点，`\\` 表示反斜杠

<div class="warning">

仔细测试——否认模式中的拼写错误会阻止合法操作。
您可以使用每个工具页面中提供的"测试您的规则"检查器，确认模式是否正确落入所需条件。

</div>

## 内置安全规则

Zed 包含一小部分硬编码的安全规则，**无法被任何设置覆盖**。
这些规则仅适用于 **terminal** 工具，并阻止递归删除关键目录：

- `rm -rf /` 和 `rm -rf /*` — 文件系统根目录
- `rm -rf ~` 和 `rm -rf ~/*` — 主目录
- `rm -rf $HOME` / `rm -rf ${HOME}`（以及 `$HOME/*`）— 通过环境变量访问的主目录
- `rm -rf .` 和 `rm -rf ./*` — 当前目录
- `rm -rf ..` 和 `rm -rf ../*` — 父目录

这些模式会捕获任何标志组合（例如 `-fr`、`-rfv`、`-r -f`、`--recursive --force`），并且不区分大小写。
它们会针对原始命令和链式命令中的每个解析的子命令进行检查（例如 `ls && rm -rf /`）。

没有其他内置规则。
默认设置文件 ({#action zed::OpenDefaultSettings}) 包含注释掉的示例，用于保护 `.env` 文件、secrets 目录和私钥 — 您可以取消注释或调整这些示例以适应您的需求。

## UI 中的权限请求

当代理请求权限时，您将在线程视图中看到一个带有菜单的工具卡片，其中包括：

- **允许一次** / **拒绝一次** — 单次决定
- **总是允许 <工具>** — 设置工具级默认值为允许或拒绝
- **总是允许 <模式>** — 添加一个 `always_allow` 或 `always_deny` 模式（当可以安全提取模式时）

选择"总是允许 <工具>"会将 `tools.<tool>.default` 设置为允许或拒绝。
当可以安全提取模式时，选择"总是允许 <模式>"会为该输入添加一个 `always_allow` 或 `always_deny` 规则。
MCP 工具只支持工具级选项。

## 示例

### 终端：自动批准构建命令

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "terminal": {
          "default": "confirm",
          "always_allow": [
            { "pattern": "^cargo\\s+(build|test|check|clippy|fmt)" },
            { "pattern": "^npm\\s+(install|test|run|build)" },
            { "pattern": "^git\\s+(status|log|diff|branch)" },
            { "pattern": "^ls\\b" },
            { "pattern": "^cat\\s" }
          ],
          "always_deny": [
            { "pattern": "rm\\s+-rf\\s+(/|~)" },
            { "pattern": "sudo\\s+rm" }
          ],
          "always_confirm": [
            { "pattern": "sudo\\s" },
            { "pattern": "git\\s+push" }
          ]
        }
      }
    }
  }
}
```

### 文件编辑：保护敏感文件

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "edit_file": {
          "default": "confirm",
          "always_allow": [
            { "pattern": "\\.(md|txt|json)$" },
            { "pattern": "^src/" }
          ],
          "always_deny": [
            { "pattern": "\\.env" },
            { "pattern": "secrets?/" },
            { "pattern": "\\.(pem|key)$" }
          ]
        }
      }
    }
  }
}
```

### 路径删除：阻止关键目录

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "delete_path": {
          "default": "confirm",
          "always_deny": [
            { "pattern": "^/etc" },
            { "pattern": "^/usr" },
            { "pattern": "\\.git/?$" },
            { "pattern": "node_modules/?$" }
          ]
        }
      }
    }
  }
}
```

### URL 获取：控制外部访问

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "fetch": {
          "default": "confirm",
          "always_allow": [
            { "pattern": "docs\\.rs" },
            { "pattern": "github\\.com" }
          ],
          "always_deny": [{ "pattern": "internal\\.company\\.com" }]
        }
      }
    }
  }
}
```

### MCP 工具

```json [settings]
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "mcp:github:create_issue": {
          "default": "confirm"
        },
        "mcp:github:create_pull_request": {
          "default": "confirm"
        }
      }
    }
  }
}
```