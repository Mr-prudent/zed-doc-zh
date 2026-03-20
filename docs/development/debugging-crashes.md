---
title: 调试崩溃
description: "Zed 开发中调试崩溃的指南。"
---

# 调试崩溃问题

当 Zed 发生 panic 或崩溃时，它会向一个辅助进程发送消息，该进程会检查编辑器的内存并在 `~/Library/Logs/Zed` 或 `$XDG_DATA_HOME/zed/logs` 目录下创建一个 [minidump](https://chromium.googlesource.com/breakpad/breakpad/+/master/docs/getting_started_with_breakpad.md#the-minidump-file-format)。你可以使用这个 minidump 来生成所有线程栈的回溯信息。

如果遥测功能已启用，Zed 会在您重启应用时上传这些报告。报告会发送到一个 [Slack 频道](https://zed-industries.slack.com/archives/C0977J9MA1Y) 和 [Sentry](https://zed-dev.sentry.io/issues)（两者仅供 Zed 员工访问）。

这些崩溃报告包含有用的数据，但没有范围（span）或符号信息就很难阅读。您可以通过下载您 Zed 版本的源代码和未剥离的二进制文件（或单独的符号文件），然后在本地运行以下命令来分析它们：

```sh
zstd -d ~/.local/share/zed/<uuid>.dmp -o minidump.dmp
minidump-stackwalk minidump.dmp
```

在您的日志目录中，除了 minidump 文件外，您还应该看到一个 `<uuid>.json` 文件，其中包含 panic 消息、范围（span）和系统规格等元数据。

## 使用调试器

如果您可以稳定地重现崩溃，请使用调试器来检查崩溃点处的程序状态。

有关设置详情，请参阅 [使用调试器](./debuggers.md#debugging-panics-and-crashes)。