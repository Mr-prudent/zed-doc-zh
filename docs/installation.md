---
title: 安装 Zed - macOS, Linux, Windows
description: 在 macOS、Linux 或 Windows 上下载并安装 Zed。包括 Homebrew、直接下载和包管理器选项。
---

# 安装

## 下载 Zed

### macOS

通过[下载页面](https://zed.dev/download)获取最新的稳定版本。如果你想下载我们的预览版本，可以在其[发布页面](https://zed.dev/releases/preview)找到它。在第一次手动安装后，Zed 将定期检查安装更新。

你也可以通过 Homebrew 安装 Zed 稳定版本：

```sh
brew install --cask zed
```

以及 Zed 预览版本：

```sh
brew install --cask zed@preview
```

### Windows

通过[下载页面](https://zed.dev/download)获取最新的稳定版本。如果你想下载我们的预览版本，可以在其[发布页面](https://zed.dev/releases/preview)找到它。在第一次手动安装后，Zed 将定期检查安装更新。

此外，你也可以使用 winget 安装 Zed：

```sh
winget install -e --id ZedIndustries.Zed
```

### Linux

对于大多数 Linux 用户，安装 Zed 最简单的方法是通过我们的安装脚本：

```sh
curl -f https://zed.dev/install.sh | sh
```

你现在可以选择性地使用 `ZED_VERSION` 环境变量来指定要安装的 Zed **版本**：

```sh
# 安装最新稳定版本 (默认)
curl -f https://zed.dev/install.sh | sh

# 安装特定版本
curl -f https://zed.dev/install.sh | ZED_VERSION=0.216.0 sh
```

要安装预览版本（比稳定版本提前约一周收到更新）：

```sh
curl -f https://zed.dev/install.sh | ZED_CHANNEL=preview sh
```

该脚本支持 `x86_64` 和 `AArch64` 架构，以及常见的 Linux 发行版：Ubuntu、Arch、Debian、RedHat、CentOS、Fedora 等。

如果使用此安装脚本安装了 Zed，可以随时通过运行 shell 命令 `zed --uninstall` 来卸载它。然后 shell 会提示你希望保留还是删除你的偏好设置。做出选择后，你应该会看到一条消息，表明 Zed 已成功卸载。

如果此脚本不能满足你的使用场景，或者你在运行 Zed 时遇到问题，或者在卸载 Zed 时出现错误，请参阅我们的 [Linux 专用文档](./linux.md)。

## 系统要求

### macOS

Zed 支持以下 macOS 版本：

| 版本       | 代号     | Apple 状态 | Zed 状态  |
| ---------- | -------- | ---------- | --------- |
| macOS 26.x | Tahoe    | 已支持     | 已支持    |
| macOS 15.x | Sequoia  | 已支持     | 已支持    |
| macOS 14.x | Sonoma   | 已支持     | 已支持    |
| macOS 13.x | Ventura  | 已支持     | 已支持    |
| macOS 12.x | Monterey | 2024-09-16 终止支持 | 已支持    |
| macOS 11.x | Big Sur  | 2023-09-26 终止支持 | 部分支持  |
| macOS 10.15.x | Catalina | 2022-09-12 终止支持 | 部分支持  |

标记为“部分支持”的 macOS 版本（Big Sur 和 Catalina）不支持通过 Zed 协作进行屏幕共享。这些功能使用 [LiveKit SDK](https://livekit.io)，它依赖于 [ScreenCaptureKit.framework](https://developer.apple.com/documentation/screencapturekit/)，而该框架仅在 macOS 12 (Monterey) 及更高版本上可用。

#### Mac 硬件

Zed 支持使用满足上述 macOS 要求的 Intel (x86_64) 或 Apple (aarch64) 处理器的机器：

- MacBook Pro (2015 年初及更新机型)
- MacBook Air (2015 年初及更新机型)
- MacBook (2016 年初及更新机型)
- Mac Mini (2014 年末及更新机型)
- Mac Pro (2013 年末或更新机型)
- iMac (2015 年末及更新机型)
- iMac Pro (所有型号)
- Mac Studio (所有型号)

### Linux

Zed 支持 64 位 Intel/AMD (x86_64) 和 64 位 Arm (aarch64) 处理器。

Zed 需要 Vulkan 1.3 驱动和以下桌面门户：

- `org.freedesktop.portal.FileChooser`
- `org.freedesktop.portal.OpenURI`
- `org.freedesktop.portal.Secret` 或 `org.freedesktop.Secrets`

### Windows

Zed 支持以下 Windows 版本：
| 版本 | Zed 状态 |
| ------------------------- | ------------------- |
| Windows 11, 22H2 版本及更高版本 | 已支持 |
| Windows 10, 1903 版本及更高版本 | 已支持 |

运行 Zed 需要 64 位操作系统。

#### Windows 硬件

Zed 支持满足以下要求的 x64 (Intel, AMD) 或 Arm64 (Qualcomm) 处理器的机器：

- 显卡：支持 DirectX 11 的 GPU（2012 年以后的大多数 PC）。
- 驱动程序：当前的 NVIDIA/AMD/Intel/Qualcomm 驱动程序（不是 Microsoft 基本显示适配器）。

### FreeBSD

尚无官方下载版本。可以从[源代码](./development/freebsd.md)构建。

### Web

目前不支持。请参阅我们的 [平台支持问题](https://github.com/zed-industries/zed/issues/5391)。