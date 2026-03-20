---
title: Zed 中的远程开发 - SSH 工作流
description: 使用 Zed 中的远程开发功能，通过 SSH 编辑代码，同时享受本地 UI 性能、远程终端、语言服务器和任务。
---

# 远程开发

远程开发允许你在本地运行 Zed 的同时，在远程服务器上编辑代码。UI 保持响应，因为它在你的机器上运行，而语言服务器、任务和终端则在服务器上运行。

对于日常工作流程，可以将远程开发与 [任务](./tasks.md)、[终端](./terminal.md) 和 [调试器](./debugger.md) 结合使用。

## 概述

远程开发需要两台计算机：一台运行 Zed UI 的本地计算机，以及一台运行 Zed 无头服务器的远程服务器。两者通过 SSH 通信，因此你需要能够从本地计算机通过 SSH 连接到远程服务器才能使用此功能。

![Zed 远程开发架构概览](https://zed.dev/img/remote-development/diagram.png)

在你的本地机器上，Zed 运行其 UI，与语言模型对话，使用 Tree-sitter 解析和语法高亮代码，并存储未保存的更改和最近的项目。源代码、语言服务器、任务和终端都在远程服务器上运行。[AI 功能](./ai/overview.md) 在远程会话中同样可用，包括 Agent Panel 和 Inline Assistant。

> **注意：** 远程开发的初始版本通过 Zed 的服务器传输流量。自 Zed v0.157 起，你不再能使用该模式。

## 设置

1. 下载并安装最新的 [Zed](https://zed.dev/releases)。你需要至少 Zed v0.159。
1. 使用 {#kb projects::OpenRemote} 打开“远程项目”对话框。
1. 点击“连接新服务器”，并输入你用于通过 SSH 连接到服务器的命令。有关可以传递的选项，请参阅 [支持的 SSH 选项](#supported-ssh-options)。
1. 你的本地机器将尝试使用你路径中的 `ssh` 二进制文件连接到远程服务器。假设连接成功，Zed 将在远程主机上下载服务器并启动它。
1. 一旦 Zed 服务器开始运行，系统会提示你选择要在远程服务器上打开的路径。
   > **注意：** Zed 目前还不能很好地处理打开非常大的目录（例如，可能包含超过 100,000 个文件的 `/` 或 `~`）。我们正在努力改进这一点，但建议在临时期间只打开特定的项目或非常大的单一代码仓库的子文件夹。

对于不需要任何 SSH 参数的简单情况，你可以运行 `zed ssh://[<user>@]<host>[:<port>]/<path>` 来直接打开远程文件夹/文件。如果你想热链接到 SSH 项目，请使用 `zed://ssh/[<user>@]<host>[:<port>]/<path>` 格式的链接。

## 支持的平台

远程机器必须能够运行 Zed 的服务器。以下平台应该可以工作，但请注意我们尚未彻底测试每一个 Linux 发行版：

- macOS Catalina 或更高版本（Intel 或 Apple Silicon）
- Linux (x86_64 或 arm64，我们目前不支持 32 位平台)
- Windows 尚不支持作为远程服务器，但可以用作连接到远程服务器的本地机器。

## 配置

远程服务器列表存储在你的设置文件 {#kb zed::OpenSettings} 中。你可以使用“远程项目”对话框 {#kb projects::OpenRemote} 编辑此列表，它提供了一些健壮性 - 例如，它在将连接写入设置文件之前会检查连接是否可以建立。

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "projects": [{ "paths": ["~/code/zed/zed"] }]
    }
  ]
}
```

Zed 会调用你路径中的 `ssh`，因此它将继承你在 `~/.ssh/config` 中为给定主机配置的任何设置。也就是说，如果你需要覆盖任何设置，你可以在每个连接上配置以下附加选项：

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "projects": [{ "paths": ["~/code/zed/zed"] }],
      // 传递给 ssh 主进程的任何参数
      "args": ["-i", "~/.ssh/work_id_file"],
      "port": 22, // 默认为 22
      // 默认为你本地机器上的用户名
      "username": "me"
    }
  ]
}
```
每个连接还有两个特定于 Zed 的附加选项，`upload_binary_over_ssh` 和 `nickname`：

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "projects": [{ "paths": ["~/code/zed/zed"] }],
      // 默认情况下，Zed 会从互联网下载服务器二进制文件到远程。
      // 当此选项为 true 时，它将被下载到你的笔记本电脑并通过 SSH 上传。
      // 当你的远程服务器网络访问受限时，这很有用。
      "upload_binary_over_ssh": true,
      // 显示在 Zed UI 中，以帮助区分多个主机。
      "nickname": "lil-linux"
    }
  ]
}
```

如果你使用命令行通过 `zed ssh://192.168.1.10/~/.vimrc` 打开到主机的连接，则会从你的设置文件中读取额外的选项，方法是通过查找与命令行上 URL 的主机/用户名/端口匹配的第一个连接。

此外，值得注意的是，虽然你可以在命令行上传递密码 `zed ssh://user:password@host/~`，但我们不支持将密码写入你的设置文件。如果你要重复连接到同一个主机，你应该配置基于密钥的认证。

## Windows 上的远程开发 (SSH)

Windows 上的 Zed 支持 SSH 远程访问，并在需要时提示输入凭据。

如果你遇到身份验证问题，请确认你的 SSH 代理正在运行（例如 ssh-agent 或你的 Git 客户端的代理），并且 ssh.exe 在 PATH 中。

### Windows 上的 SSH 故障排除

当提示输入凭据时，请使用图形化的 askpass 对话框。如果它没有出现，请检查凭据管理器冲突，以及 GUI 提示是否被你的终端阻止。

## WSL 支持

Zed 支持在 Windows 上原生打开 WSL 内部的文件夹。

### 在 WSL 中打开本地文件夹

要在 WSL 容器内打开一个本地文件夹，请使用 `projects: open in wsl` 操作并选择你想要打开的文件夹。系统将显示一个可用的 WSL 发行版列表供你选择打开文件夹。

### 打开已在 WSL 中的文件夹

要打开一个已经位于 WSL 容器内的文件夹，请使用 `projects: open wsl` 操作并选择 WSL 发行版。该发行版将被添加到“远程项目”窗口中，你可以在其中打开该文件夹。

## 端口转发

如果你想能够从本地计算机连接到远程服务器上的端口，你可以在设置文件中配置端口转发。这对于开发网站尤其有用，这样你可以在工作时在浏览器中加载网站。

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "port_forwards": [{ "local_port": 8080, "remote_port": 80 }]
    }
  ]
}
```

这将导致来自你本地计算机的 `localhost:8080` 请求被转发到远程机器的端口 80。在底层，这使用的是 ssh 的 `-L` 参数。

默认情况下，这些端口绑定到 localhost，因此与你的开发机器在同一网络中的其他计算机无法访问它们。你可以设置 `local_host` 来绑定到不同的接口，例如，`0.0.0.0` 将绑定到所有本地接口。

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "port_forwards": [
        {
          "local_port": 8080,
          "remote_port": 80,
          "local_host": "0.0.0.0"
        }
      ]
    }
  ]
}
```

这些端口在远程主机上也默认为 `localhost` 接口。如果需要更改这一点，你也可以设置远程主机：

```json [settings]
{
  "ssh_connections": [
    {
      "host": "192.168.1.10",
      "port_forwards": [
        {
          "local_port": 8080,
          "remote_port": 80,
          "remote_host": "docker-host"
        }
      ]
    }
  ]
}
```

## Zed 设置

打开远程项目时，有三个相关的设置位置：

- 本地机器上的本地 Zed 设置（在 macOS 上为 `~/.zed/settings.json`，在 Linux 上为 `~/.config/zed/settings.json`）。
- 远程服务器上的服务器 Zed 设置（在同一位置）。
- 项目的设置（在项目的 `.zed/settings.json` 或 `.editorconfig` 中）

本地 Zed 和服务器 Zed 都会读取项目设置，但它们不知道彼此的主设置文件。

你应该使用哪个设置文件取决于你想要设置的设置类型：

- 项目设置应用于影响项目的设置：缩进设置、使用哪个格式化程序/语言服务器等。
- 服务器设置应用于影响服务器的设置：语言服务器的路径、代理设置等。
- 本地设置应用于影响 UI 的设置：字体大小等。

此外，你在本地安装的任何扩展都将传播到远程服务器。这意味着语言服务器等将能够正确运行。

## 代理配置

远程服务器不会使用你本地机器的代理配置，因为它们可能受到不同的网络策略。如果你的远程服务器需要代理才能访问互联网，你必须在远程服务器本身上配置它。

在大多数情况下，你的远程服务器已经配置了代理环境变量。Zed 在下载语言服务器、与 LLM 模型通信等时会自动使用它们。

如果需要，你可以在服务器的 shell 配置中设置这些环境变量（例如 `~/.bashrc`）：

```bash
export http_proxy="http://proxy.example.com:8080"
export https_proxy="http://proxy.example.com:8080"
export no_proxy="localhost,127.0.0.1"
```

或者，你可以在远程机器的 `~/.config/zed/settings.json` (Linux) 或 `~/.zed/settings.json` (macOS) 中配置代理：

```json
{
  "proxy": "http://proxy.example.com:8080"
}
```
有关支持的代理类型和附加配置选项，请参阅 [代理文档](./reference/all-settings.md#network-proxy)。

## 初始化远程服务器

一旦你提供了 SSH 选项，Zed 就会在你的本地机器上调用 `ssh`，使用你提供的选项创建一个 ControlMaster 连接。

SSH 所需的任何提示都会显示在 UI 中，因此你可以验证主机密钥、输入密钥密码等。

一旦主连接建立，Zed 将检查远程服务器上的 `~/.zed_server` 中是否存在远程服务器二进制文件，并且其版本是否与你正在使用的当前 Zed 版本匹配。

如果它不存在或版本不匹配，Zed 将尝试下载最新版本。默认情况下，它将直接从 `https://zed.dev` 下载，但如果你在该服务器的设置中设置了 `{"upload_binary_over_ssh":true}`，它将二进制文件下载到你的本地机器，然后上传到远程服务器。

如果你想自己维护服务器二进制文件，可以。你可以从 [GitHub](https://github.com/zed-industries/zed/releases) 下载我们预先构建的版本，或者使用 `cargo build -p remote_server --release` [自己构建](https://zed.dev/docs/development)。如果你这样做，你必须将它上传到服务器上的 `~/.zed_server/zed-remote-server-{RELEASE_CHANNEL}-{VERSION}`，例如 `~/.zed_server/zed-remote-server-stable-0.217.3+stable.105.80433cb239e868271457ac376673a5f75bc4adb1`。该版本必须与你正在使用的 Zed 版本完全匹配。

## 维护 SSH 连接

服务器初始化后，Zed 将创建新的 SSH 连接（重用现有的 ControlMaster）来运行远程开发服务器。

每个连接都尝试以代理模式运行开发服务器。如果守护进程未运行，此模式将启动它；如果正在运行，则重新连接它。这样，当你的连接断开并重新启动时，你可以继续工作而不中断。

如果重新连接失败，则不会重用该守护进程。也就是说，默认情况下未保存的更改会持久化存储在本地，因此你不会丢失工作。你总是可以在以后重新连接到项目，Zed 将恢复未保存的更改。

如果你遇到连接问题，你应该能够在 Zed 日志 `cmd-shift-p Open Log` 中看到更多信息。如果你看到意想不到的事情，请提交一个 [GitHub 问题](https://github.com/zed-industries/zed/issues/new) 或在 [Zed Discord](https://zed.dev/community-links) 的 #remoting-feedback 频道中联系我们。

## 支持的 SSH 选项

在底层，Zed 调用 `ssh` 二进制文件连接到远程服务器。我们为每个项目创建一个 SSH control master，然后使用它来复用 Zed 协议本身、你打开的任何终端和运行的任务的 SSH 连接。我们从你的 SSH 配置文件中读取设置，但如果你想为 SSH control master 指定附加选项，你可以配置 Zed 来设置它们。

在“连接新服务器”对话框中输入时，可以使用类似 bash 的引号来传递包含空格的选项。一旦你创建了一个服务器，它将被添加到设置文件中的 `"ssh_connections": []` 数组中。你可以直接编辑设置文件来对 SSH 连接进行更改。

支持的选项：

- `-p` / `-l` - 这些等同于在主机字符串中传递端口和用户名。
- `-L` / `-R` 用于端口转发
- `-i` - 用于使用特定的密钥文件
- `-o` - 用于设置自定义选项
- `-J` / `-w` - 用于代理 SSH 连接
- `-F` 用于指定 `ssh_config`
- 还有... `-4`, `-6`, `-A`, `-B`, `-C`, `-D`, `-I`, `-K`, `-P`, `-X`, `-Y`, `-a`, `-b`, `-c`, `-i`, `-k`, `-l`, `-m`, `-o`, `-p`, `-w`, `-x`, `-y`

请注意，我们故意禁止一些 Zed 会为你设置的选项（例如 `-t` 或 `-T`）。

## 已知限制

- 你不能通过在远程终端中键入 `zed` 命令来打开文件。

## 反馈

请加入 [Zed Discord](https://zed.dev/community-links) 中的 #remoting-feedback 频道。

## 另请参阅

- [运行与测试](./running-testing.md)：在远程工作时运行任务、终端命令和调试器会话。
- [配置 Zed](./configuring-zed.md)：管理共享和项目设置，包括 `.zed/settings.json`。
- [Agent Panel](./ai/agent-panel.md)：在远程项目中使用 AI 工作流。
- [zed.dev 上的远程开发](https://zed.dev/remote-development)：产品概述和发布更新。