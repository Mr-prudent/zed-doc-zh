---
title: Zed 在 Windows 上
description: "通过下载页面获取最新的稳定版本。如果您想下载我们的预览版本，可以在其 [发布页面](https://zed.dev/releases/preview) 找到..."
---

# Windows

## 安装 Zed

通过[下载页面](https://zed.dev/download)获取最新的稳定版本。如果您想下载我们的预览版本，可以在其[发布页面](https://zed.dev/releases/preview)找到。首次手动安装后，Zed 将会定期检查安装更新。

您也可以从源代码构建 zed，相关说明请参阅[这些文档](https://zed.dev/docs/development/windows)。

### 包管理器

此外，您还可以使用 winget 安装 Zed：

```sh
winget install -e --id ZedIndustries.Zed
```

## 卸载

- 通过安装程序安装：使用 `设置` → `应用` → `已安装应用`，搜索 Zed，然后点击卸载。
- 从源代码构建：删除您创建的构建输出目录（例如，您的目标/安装文件夹）。

您的设置和扩展存储在您的用户配置文件中。卸载时，您可以选择保留或删除它们。

## 远程开发 (SSH)

Zed 通过 SSH 和 WSL 支持在 Windows 上的远程开发。您可以通过 SSH 连接到远程服务器，或直接在 Zed 中处理 WSL 发行版中的文件。

有关设置和使用远程开发功能的详细说明，包括 SSH 配置、WSL 设置和故障排除，请参阅[远程开发文档](./remote-development.md)。

## 故障排除

### Zed 无法启动或显示空白窗口

- 检查您的硬件和操作系统版本是否与 Zed 兼容。更多信息请参阅我们的[安装指南](./installation.md)。
- 从您的 GPU 供应商（Intel/AMD/NVIDIA/Qualcomm）更新 GPU 驱动程序。
- 确保 Windows 中启用了硬件加速，并且没有被第三方软件阻止。
- 尝试不带扩展或自定义设置启动 Zed，以隔离冲突。

### 终端问题

如果激活脚本无法运行，请更新到最新版本，并验证您的 shell 配置文件是否没有过早退出。对于 Git 操作，确认 Git Bash 或 PowerShell 可用并且在 PATH 中。

### SSH 远程问题

当提示输入凭据时，使用图形化的 askpass 对话框。如果它没有出现，请检查凭据管理器冲突，以及 GUI 提示是否被您的终端阻止。

### 图形问题

#### Zed 无法打开 / 性能下降

Zed 需要 DirectX 11 兼容的 GPU 才能运行。如果 Zed 无法打开，您的 GPU 可能不满足最低要求。

要检查您的 GPU 是否支持 DirectX 11，请运行以下命令：

```
dxdiag
```

这将打开 DirectX 诊断工具，在 `系统` → `系统信息` → `DirectX 版本` 下显示您的 GPU 支持的 DirectX 版本。

如果您在虚拟机中运行 Zed，它将使用您的 VM 提供的模拟适配器。虽然 Zed 在这种环境中可以工作，但性能可能会下降。