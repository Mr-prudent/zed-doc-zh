---
title: 遥测
description: "Zed 收集的数据以及如何控制遥测设置。"
---

# 遥测数据

Zed 收集匿名遥测数据，以了解使用模式并诊断问题。

遥测分为两类：

- **客户端**：使用指标和崩溃报告。您可以在设置中禁用这些功能。
- **服务器端**：在使用 AI 或协作等托管服务时收集。这些功能的正常运行需要这些数据。

## 配置遥测设置

您可以完全控制 Zed 发送的数据。
要启用或禁用部分或全部类型的遥测，请打开设置 ({#kb zed::OpenSettings}) 并搜索 "telemetry"，或者将以下内容添加到您的设置文件中：

```json [设置]
"telemetry": {
    "diagnostics": false,
    "metrics": false
},
```

## 数据流

遥测数据每 5 分钟从应用程序发送到我们的服务器（或当事件累积到 50 个时），然后路由到相应的服务。我们目前使用：

- [Sentry](https://sentry.io): 崩溃监控服务 - 存储诊断事件
- [Snowflake](https://snowflake.com): 数据仓库 - 存储诊断和指标事件
- [Hex](https://www.hex.tech): 仪表盘和数据探索 - 访问存储在 Snowflake 中的数据
- [Amplitude](https://www.amplitude.com): 仪表盘和数据探索 - 访问存储在 Snowflake 中的数据

## 遥测类型

### 诊断信息

崩溃报告包括一个 [minidump](https://learn.microsoft.com/en-us/windows/win32/debug/minidump-files) 文件和调试元数据。报告在崩溃后的下次启动时发送，这使得 Zed 能够识别和修复问题，而无需您提交错误报告。

您可以在 [crates/telemetry_events/src/telemetry_events.rs](https://github.com/zed-industries/zed/blob/main/crates/telemetry_events/src/telemetry_events.rs) 文件中的 `Panic` 结构体中检查发送的数据。另请参阅：[调试崩溃](./development/debugging-crashes.md)。

### 客户端指标

客户端遥测包括：

- 打开文件的文件扩展名
- 编辑器内使用的功能和工具
- 项目统计信息（例如，文件数量）
- 在您的项目中检测到的框架

这些数据不包括您的代码或敏感的项目详细信息。事件通过 HTTPS 发送，并进行速率限制。

使用数据与一个随机的遥测 ID 相关联。如果您已通过身份验证，该 ID 可能与您的电子邮件相关联，以便 Zed 可以随时间分析模式并请求反馈。

要审核 Zed 已报告的内容，请从命令面板运行 {#action zed::OpenTelemetryLog} 或点击 `帮助 > 查看遥测日志`。

有关事件类型的完整列表，请参阅 [telemetry_events.rs](https://github.com/zed-industries/zed/blob/main/crates/telemetry_events/src/telemetry_events.rs) 中的 `Event` 枚举。

### 服务器端指标

使用 Zed 的托管服务时，我们会收集用于速率限制和计费的元数据（例如，令牌使用情况）。除非您通过反馈评分明确分享，否则 Zed 不会存储您的提示或代码。

有关 AI 数据处理的详细信息，请参阅 [Zed AI 功能和隐私](./ai/ai-improvement.md)。

## 疑虑和问题

如果您对遥测有任何疑虑，可以[提交问题](https://github.com/zed-industries/zed/issues/new/choose)或发送电子邮件至 hi@zed.dev。