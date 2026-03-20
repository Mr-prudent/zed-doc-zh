---
title: Agent Server 扩展
description: "Zed 扩展的 Agent Server 扩展。"
---

# Agent Server 扩展

<div class="warning">

请注意，从 `v0.221`.x 开始，[ACP Registry](https://agentclientprotocol.com/registry) 是在 Zed 中安装外部智能体的首选方式。
您可以在[发布博客文章](https://zed.dev/blog/acp-registry)中了解更多信息。

在不久的将来，Agent Server 扩展将被弃用。

</div>

Agent Server 是通过 [Agent Client Protocol (ACP)](https://agentclientprotocol.com) 提供 AI 代理实现的程序。
Agent Server 扩展允许您打包一个 Agent Server，以便用户可以安装扩展并在 Zed 中使用您的代理。

您可以通过在 Zed 中打开"扩展"选项卡（执行 `zed: extensions` 命令）并将筛选器从"全部"更改为"Agent Servers"，或访问 [Zed 网站](https://zed.dev/extensions?filter=agent-servers)来查看当前的 Agent Server 扩展。

## 定义 Agent Server 扩展

扩展可以在 `extension.toml` 中注册一个或多个代理服务器：

```toml
[agent_servers.my-agent]
name = "我的代理"

[agent_servers.my-agent.targets.darwin-aarch64]
archive = "https://github.com/owner/repo/releases/download/v1.0.0/agent-darwin-arm64.tar.gz"
cmd = "./agent"
args = ["--serve"]

[agent_servers.my-agent.targets.linux-x86_64]
archive = "https://github.com/owner/repo/releases/download/v1.0.0/agent-linux-x64.tar.gz"
cmd = "./agent"
args = ["--serve"]

[agent_servers.my-agent.targets.windows-x86_64]
archive = "https://github.com/owner/repo/releases/download/v1.0.0/agent-windows-x64.zip"
cmd = "./agent.exe"
args = ["--serve"]
```

### 必填字段

- `name`: 代理服务器的可读显示名称（在菜单中显示）
- `targets`: 用于下载和运行代理的平台特定配置

### 目标配置

每个目标键使用 `{os}-{arch}` 格式，其中：

- **os**: `darwin` (macOS), `linux`, 或 `windows`
- **arch**: `aarch64` (ARM64) 或 `x86_64`

每个目标必须指定：

- `archive`: 用于下载存档的 URL（支持 `.tar.gz`、`.zip` 等）
- `cmd`: 运行代理服务器的命令（相对于解压后的存档）
- `args`: 传递给代理服务器的命令行参数（可选）
- `sha256`: 存档字节的 SHA-256 哈希字符串（可选，但建议用于安全）
- `env`: 特定于此目标的环境变量（可选，会覆盖同名的代理级别环境变量）

### 可选字段

您还可以在代理服务器级别选择性地指定：

- `env`: 在代理的子进程中设置的环境变量。默认情况下，这些变量适用于所有目标。
- `icon`: 用于在菜单中显示的 SVG 图标路径（相对于扩展根目录）。

### 环境变量

环境变量可以在两个级别配置：

1. **代理级别** (`[agent_servers.my-agent.env]`): 适用于所有平台的变量
2. **目标级别** (`[agent_servers.my-agent.targets.{platform}.env]`): 特定于平台的变量

当同时指定两者时，目标级别的环境变量会覆盖同名的代理级别变量。仅在代理级别定义的变量会被所有目标继承。

### 完整示例

这是一个包含所有可选字段的更完整示例：

```toml
[agent_servers.example-agent]
name = "示例代理"
icon = "icon/agent.svg"

[agent_servers.example-agent.env]
AGENT_LOG_LEVEL = "info"
AGENT_MODE = "production"

[agent_servers.example-agent.targets.darwin-aarch64]
archive = "https://github.com/example/agent/releases/download/v2.0.0/agent-darwin-arm64.tar.gz"
cmd = "./bin/agent"
args = ["serve", "--port", "8080"]
sha256 = "abc123def456..."

[agent_servers.example-agent.targets.linux-x86_64]
archive = "https://github.com/example/agent/releases/download/v2.0.0/agent-linux-x64.tar.gz"
cmd = "./bin/agent"
args = ["serve", "--port", "8080"]
sha256 = "def456abc123..."

[agent_servers.example-agent.targets.linux-x86_64.env]
AGENT_MEMORY_LIMIT = "2GB"  # Linux 特定覆盖
```

## 安装过程

当用户安装您的扩展并选择代理服务器时：

1. Zed 为用户的平台下载相应的存档
2. 存档被解压到缓存目录
3. Zed 使用指定的命令和参数启动代理
4. 环境变量按配置设置
5. 代理服务器在后台运行，准备协助用户

存档被缓存到本地，因此后续启动速度很快。

## 分发最佳实践

### 使用 GitHub Releases

GitHub Releases 是分发代理服务器二进制文件的可靠方式：

1. 为每个平台构建您的代理（macOS ARM64、macOS x86_64、Linux x86_64、Windows x86_64）
2. 将每个构建打包为压缩存档（`.tar.gz` 或 `.zip`）
3. 创建一个 GitHub release 并上传存档
4. 在您的 `extension.toml` 中使用 release URL

## SHA-256 哈希

为了更好的供应链安全，请在 `extension.toml` 中包含您存档的 SHA-256 哈希。生成方法如下：

### macOS 和 Linux

```bash
shasum -a 256 agent-darwin-arm64.tar.gz
```

### Windows

```bash
certutil -hashfile agent-windows-x64.zip SHA256
```

然后将该字符串添加到您的目标配置中：

```toml
[agent_servers.my-agent.targets.darwin-aarch64]
archive = "https://github.com/owner/repo/releases/download/v1.0.0/agent-darwin-arm64.tar.gz"
cmd = "./agent"
sha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
```

## 测试

要测试您的 Agent Server 扩展：

1. [将其作为开发扩展安装](./developing-extensions.md#developing-an-extension-locally)
2. 打开 [Agent Panel](../ai/agent-panel.md)
3. 从列表中选择您的 Agent Server
4. 验证它是否正确下载、安装和启动
5. 通过与代理对话并查看 [ACP 日志](../ai/external-agents.md#debugging-agents)来测试其功能

## 图标指南

如果您的代理服务器有徽标，请将其添加为 SVG 图标。
为了保持一致的渲染效果，请遵循以下指南：

- 将您的 SVG 调整为适合 16x16 边界框，并留出一两个像素的填充
- 通过 [SVGOMG](https://jakearchibald.github.io/svgomg/) 处理 SVG 标记，以保持其简洁
- 避免使用渐变，这通常会增加 SVG 的复杂性并可能导致渲染不一致

请注意，我们会自动将您的图标转换为单色，以保持 Zed 的设计一致性。
（您仍然可以在 SVG 的不同路径中使用不透明度来增加视觉层次。）

## 发布

当您的扩展准备就绪后，请参阅[发布您的扩展](./developing-extensions.md#publishing-your-extension)了解如何将其提交到 Zed 扩展注册表。
