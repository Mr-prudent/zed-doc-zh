---
title: Zed 在 macOS 上的使用
description: "Zed 主要在 macOS 上开发，因此它是一个功能齐全的一流平台。"
---

# macOS

Zed 主要在 macOS 上开发，因此它是一个功能齐全的一流平台。

## 安装 Zed

从 [下载页面](https://zed.dev/download) 下载 Zed。下载的文件是一个 `.dmg` 文件—打开它并将 Zed 拖到您的应用程序文件夹中。

对于预览构建（它比稳定版本提前约一周收到更新），请访问 [预览发布页面](https://zed.dev/releases/preview)。

安装后，Zed 会自动检查更新，并在有新版本可用时提示您。

### 使用 Homebrew

您也可以使用 Homebrew 安装 Zed：

```sh
brew install --cask zed
```

对于预览版本：

```sh
brew install --cask zed@preview
```

### 从源代码构建

要从源代码构建 Zed，请参阅 [macOS 开发文档](./development/macos.md)。

## 系统要求

- macOS 10.15.7 (Catalina) 或更高版本
- Apple Silicon (M1/M2/M3/M4) 或 Intel 处理器

Zed 使用 Metal 进行 GPU 加速渲染，这在所有支持的 macOS 版本上都可用。

## 安装 CLI

Zed 包含一个命令行工具，用于从终端打开文件和项目。要安装它：

1. 打开 Zed
2. 使用 `Cmd+Shift+P` 打开命令面板
3. 运行 `cli: install`

这将在 `/usr/local/bin` 中创建一个 `zed` 命令。然后您可以打开文件和文件夹：

```sh
zed .                    # 打开当前文件夹
zed file.txt             # 打开一个文件
zed project/ file.txt    # 打开一个文件夹和一个文件
```

有关所有可用选项，请参阅 [CLI 参考](./reference/cli.md)。

## 卸载

1. 如果 Zed 正在运行，请退出它
2. 将 Zed 从应用程序拖到废纸篓
3. 可选地，删除您的设置和扩展：

```sh
rm -rf ~/.config/zed
rm -rf ~/Library/Application\ Support/Zed
rm -rf ~/Library/Caches/Zed
rm -rf ~/Library/Logs/Zed
rm -rf ~/Library/Saved\ Application\ State/dev.zed.Zed.savedState
```

如果您安装了 CLI，请使用以下命令删除它：

```sh
rm /usr/local/bin/zed
```

## 故障排除

### Zed 无法打开或显示“已损坏”警告

如果 macOS 报告 Zed 已损坏或无法打开，这可能是 Gatekeeper 问题。请尝试：

1. 右键单击（或按住 Control 单击）应用程序中的 Zed
2. 从上下文菜单中选择“打开”
3. 在出现的对话框中单击“打开”

这会告诉 macOS 信任该应用程序。

如果这不起作用，请移除隔离属性：

```sh
xattr -cr /Applications/Zed.app
```

### 找不到 CLI 命令

安装后 `zed` 命令不可用：

1. 检查 `/usr/local/bin` 是否在您的 PATH 中
2. 尝试通过命令面板中的 `cli: install` 重新安装 CLI
3. 打开一个新的终端窗口以重新加载您的 PATH

### GPU 或渲染问题

Zed 使用 Metal 进行渲染。如果您遇到图形故障：

1. 确保 macOS 已更新到最新版本
2. 重新启动 Mac 以重置 GPU 状态
3. 检查活动监视器中其他应用的 GPU 压力

### 内存或 CPU 使用率过高

如果 Zed 使用的资源超出预期：

1. 在终端输出中检查是否有失控的语言服务器（`zed: open log`）
2. 尝试逐个禁用扩展以识别冲突
3. 对于大型项目，考虑使用 [项目设置](./reference/all-settings.md#file-scan-exclusions) 来排除不必要的文件夹进行索引

如需更多帮助，请参阅 [故障排除指南](./troubleshooting.md) 或访问 [Zed Discord](https://discord.gg/zed-community)。