---
title: 故障排除
description: "所有平台上 Zed 的常见问题及解决方案。"
---

# 故障排除

本指南涵盖了 Zed 的常见故障排除技术。
有时，您可以使用此信息自行识别和解决问题。
在其他情况下，故障排除意味着收集正确的信息（日志、配置文件或复现步骤），以帮助我们诊断和解决问题。

> **注意**：要打开命令面板，在 macOS 上使用 `cmd-shift-p`，在 Windows / Linux 上使用 `ctrl-shift-p`。

## 获取 Zed 和系统信息

在报告问题或寻求帮助时，了解您的 Zed 版本和系统规格会很有帮助。您可以使用命令面板中的以下操作来获取这些信息：

- {#action zed::About}: 查找您的 Zed 版本号
- {#action zed::CopySystemSpecsIntoClipboard}: 将 Zed 版本号、操作系统版本和硬件规格填充到剪贴板中

## Zed 日志

在排查 Zed 中的任何问题时，Zed 日志通常是第一个值得查看的好地方，其中可能包含关于出了什么问题的线索。
您可以通过从命令面板运行 {#action zed::OpenLog} 操作来查看日志的最新 1000 行。
如果您想查看完整的文件，可以通过命令面板中的 {#action zed::RevealLogInFileManager} 在操作系统的原生文件管理器中显示它。

您可以在各个操作系统上的相应位置找到 Zed 日志：

- macOS: `~/Library/Logs/Zed/Zed.log`
- Windows: `C:\Users\YOU\AppData\Local\Zed\logs\Zed.log`
- Linux: `~/.local/share/zed/logs/Zed.log` 或 `$XDG_DATA_HOME`

> **注意**：在某些情况下，监视日志可能会有用，例如在[开发 Zed 扩展](https://zed.dev/docs/extensions/developing-extensions)时。
> 示例：`tail -f ~/Library/Logs/Zed/Zed.log`

日志可能包含足够的上下文来帮助您自己调试问题，或者您可能会发现一些特定的错误，这些错误在提交 [GitHub issue](https://github.com/zed-industries/zed/issues/new/choose) 或在我们的 [Discord 服务器](https://zed.dev/community-links#forums-and-discussions)中与 Zed 工作人员交谈时很有用。

## 性能问题（分析）

如果您在 Zed 中遇到性能问题（卡顿、挂起或一般无响应），附加性能分析文件将帮助我们准确定位卡住的位置。

### macOS

Xcode Instruments（随您的 [Xcode](https://apps.apple.com/us/app/xcode/id497799835) 下载捆绑提供）是 macOS 上进行性能分析的标准工具。

1. 在 Zed 运行时，打开 Instruments
1. 选择 `Time Profiler` 作为分析模板
1. 在 `Time Profiler` 配置中，将目标设置为正在运行的 Zed 进程
1. 开始录制
1. 如果性能问题是在 Zed 中执行特定操作时发生的，现在执行该操作
1. 停止录制
1. 保存跟踪文件
1. 将跟踪文件压缩为 zip 存档
1. 提交一个 [GitHub issue](https://github.com/zed-industries/zed/issues/new/choose)，并附上跟踪 zip 文件

<!--### Windows-->

<!--### Linux-->

## 启动和工作区问题

Zed 创建本地 SQLite 数据库来持久化与其工作区和您的项目相关的数据。例如，这些数据库存储了您在项目中打开的标签页和窗格、每个打开文件的滚动位置、您打开的所有项目列表（用于最近项目模态选择器）等。您可以在以下位置找到并探索这些数据库：

- macOS: `~/Library/Application Support/Zed/db`
- Linux 和 FreeBSD: `~/.local/share/zed/db`（或在 `XDG_DATA_HOME` 或 `FLATPAK_XDG_DATA_HOME` 内）
- Windows: `%LOCALAPPDATA%\Zed\db`

这些数据库的命名约定采用 `0-<zed_channel>` 的形式：

- Stable: `0-stable`
- Preview: `0-preview`
- Nightly: `0-nightly`
- Dev: `0-dev`

虽然很少见，但我们确实遇到过工作区数据库损坏的情况，这导致 Zed 无法启动。
如果您遇到启动问题，可以通过暂时移动数据库文件来测试是否与工作区有关，然后再次尝试启动 Zed。

> **注意**：移动工作区数据库将导致 Zed 创建一个新的。
> 您的最近项目、打开的标签页等将被重置为“工厂默认设置”。

如果在重新生成数据库后问题仍然存在，请[提交问题](https://github.com/zed-industries/zed/issues/new/choose)。

## 语言服务器问题

如果您遇到与语言服务器相关的问题，例如陈旧的诊断信息或无法跳转到定义，通常可以通过从命令面板运行 {#action editor::RestartLanguageServer} 来重启语言服务器以解决问题。

## 代理错误消息

### "达到最大令牌数"

当代理的响应超过模型的最大令牌限制时，您会看到此错误。这发生在：

- 代理生成了极长的响应
- 对话上下文加上响应超出了模型的容量
- 工具输出很大并消耗了可用的令牌预算

**解决方法：**

1. 开始一个新线程以减少上下文大小
2. 在 AI 设置中使用具有更大令牌限制的模型
3. 将您的请求分解为更小、更专注的任务
4. 使用线程控件清除工具输出或之前的消息

令牌限制因模型而异—请查看您的模型提供商文档以获取特定限制。