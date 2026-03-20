---
title: MCP 服务器扩展
description: "用于 Zed 扩展的 MCP 服务器扩展。"
---

# MCP 服务器扩展

[模型上下文协议 (Model Context Protocol) 服务器](../ai/mcp.md) 可以作为扩展暴露，以便在智能体面板中使用。

## 定义 MCP 扩展

一个扩展可以提供一个或多个 MCP 服务器。
每个 MCP 服务器必须在 `extension.toml` 中注册：

```toml
[context_servers.my-context-server]
```

然后，在扩展的 Rust 代码中，为你的扩展实现 `context_server_command` 方法：

```rust
impl zed::Extension for MyExtension {
    fn context_server_command(
        &mut self,
        context_server_id: &ContextServerId,
        project: &zed::Project,
    ) -> Result<zed::Command> {
        Ok(zed::Command {
            command: get_path_to_context_server_executable()?,
            args: get_args_for_context_server()?,
            env: get_env_for_context_server()?,
        })
    }
}
```

此方法应返回启动 MCP 服务器的命令，以及其运行所需的任何参数或环境变量。

如果您需要从外部来源（GitHub Releases、npm 等）下载 MCP 服务器，也可以在此函数中完成。

## 可用扩展

查看作为扩展发布的 MCP 服务器 [在 Zed 的网站上](https://zed.dev/extensions?filter=context-servers)。

查看其仓库以了解常见的实现模式和结构。

## 测试

要测试您的新 MCP 服务器扩展，您可以[将其作为开发扩展进行安装](./developing-extensions.md#developing-an-extension-locally)。
