---
title: 安装扩展
description: "从 Zed 扩展市场浏览、安装和管理扩展。"
---

# 安装扩展 {#installing-extensions}

扩展可以为 Zed 添加功能，包括语言、主题和 AI 工具。您可以从扩展市场浏览并安装它们。

使用 {#kb zed::Extensions} 打开扩展市场，或从菜单栏中选择 "Zed > 扩展"。

## 安装位置

- 在 macOS 上，扩展安装在 `~/Library/Application Support/Zed/extensions`。
- 在 Linux 上，它们安装在 `$XDG_DATA_HOME/zed/extensions` 或 `~/.local/share/zed/extensions`。
- 在 Windows 上，目录为 `%LOCALAPPDATA%\Zed\extensions`。

该目录包含两个子目录：

- `installed`：包含每个扩展的源代码。
- `work`：包含扩展自身创建的文件，例如下载的语言服务器。

## 自动安装

要自动化扩展的安装/卸载，请参阅 [auto_install_extensions](../reference/all-settings.md#auto-install-extensions) 的文档。