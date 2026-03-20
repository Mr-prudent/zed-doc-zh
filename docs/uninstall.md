---
title: 卸载
description: "本指南介绍如何在不同的操作系统上卸载 Zed。"
---

# ���载

本指南介绍如何在不同的操作系统上卸载 Zed。

## macOS

### 标准安装

如果您是通过从网站下载的方式安装 Zed 的：

1. 如果 Zed 正在运行，请退出
2. 打开 Finder 并进入您的应用程序文件夹
3. 将 Zed 拖到废纸篓（或右键点击并选择"移到废纸篓"）
4. 清空废纸篓

### Homebrew 安装

如果您是使用 Homebrew 安装的 Zed，请使用以下命令：

```sh
brew uninstall --cask zed
```

或者用于预览版本：

```sh
brew uninstall --cask zed@preview
```

### 删除用户数据（可选）

要完全删除所有 Zed 配置文件和数据：

1. 打开 Finder
2. 按 `Cmd + Shift + G` 打开"前往文件夹"
3. 如果存在，请删除以下目录：
   - `~/Library/Application Support/Zed`
   - `~/Library/Saved Application State/dev.zed.Zed.savedState`
   - `~/Library/Logs/Zed`
   - `~/Library/Caches/dev.zed.Zed`

## Linux

### 标准卸载

如果 Zed 是使用默认安装脚本安装的，请运行：

```sh
zed --uninstall
```

系统会提示您选择保留还是删除您的首选项。做出选择后，您应该会看到一条消息，表明 Zed 已成功卸载。

如果在您的 PATH 中找不到 `zed` 命令，请尝试：

```sh
$HOME/.local/bin/zed --uninstall
```

或者：

```sh
$HOME/.local/zed.app/bin/zed --uninstall
```

### 包管理器

如果您是使用包管理器（如 Flatpak、Snap 或发行版特定的包管理器）安装的 Zed，请查阅该包管理器的文档以获取卸载说明。

### 手动移除

如果卸载命令失败或 Zed 是安装到自定义位置的，您可以手动删除：

- 安装目录：`~/.local/zed.app`（或您的自定义安装路径）
- 二进制符号链接：`~/.local/bin/zed`
- 配置和数据：`~/.config/zed`

## Windows

### 标准安装

1. 如果 Zed 正在运行，请退出
2. 打开设置（Windows 键 + I）
3. 转到"应用">"已安装的应用"（Windows 10 上为"应用和功能"）
4. 搜索"Zed"
5. 点击 Zed 旁边的三个点菜单，然后选择"卸载"
6. 按照提示完成卸载

或者，您可以：

1. 打开开始菜单
2. 右键点击 Zed
3. 选择"卸载"

### 删除用户数据（可选）

要完全删除所有 Zed 配置文件和数据：

1. 按 `Windows 键 + R` 打开运行
2. 输入 `%APPDATA%` 并按 Enter
3. 如果存在，请删除 `Zed` 文件夹
4. 再次按 `Windows 键 + R`，输入 `%LOCALAPPDATA%` 并按 Enter
5. 如果存在，请删除 `Zed` 文件夹

## 故障排除

如果您在卸载过程中遇到问题：

- **macOS/Windows**：在尝试卸载之前，请确保 Zed 已完全退出。检查活动监视器（macOS）或任务管理器（Windows）是否有任何正在运行的 Zed 进程。
- **Linux**：如果卸载脚本失败，请检查错误消息并考虑手动删除上述目录。
- **所有平台**：如果您想在保留 Zed 安装的同时重新开始，可以删除配置目录，而不是完全卸载应用程序。

如需更多帮助，请参阅我们的 [Linux 特定文档](./linux.md) 或访问 [Zed 社区](https://zed.dev/community-links)。