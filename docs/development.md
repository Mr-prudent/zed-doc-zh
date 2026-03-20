---
title: 开发 Zed
description: "从源代码构建和开发 Zed 的指南。"
---

# 开发 Zed

有关从源代码构建 Zed 的平台特定说明，请参见：

- [macOS](./development/macos.md)
- [Linux](./development/linux.md)
- [Windows](./development/windows.md)

## 钥匙串访问

Zed 将密钥存储在系统钥匙串中。

然而，在 macOS（以及可能的其他平台）上运行 Zed 的开发版本时，尝试访问钥匙串会导致大量需要重复输入密码的钥匙串提示。

在 macOS 上，这是因为开发版本没有一个稳定的身份标识。即使您选择“始终允许”选项，当下次二进制文件发生变化时，操作系统仍会提示您再次输入密码。

这很快会变得令人烦恼，并影响开发速度。

因此，默认情况下，在运行 Zed 的开发版本时，会使用替代的凭据提供程序来绕过系统钥匙串。

> **注意：** 这**仅**适用于开发版本。对于所有非开发发布渠道，始终使用系统钥匙串。

如果您需要在开发版本中使用真实的系统钥匙串进行测试，请在运行 Zed 时设置以下环境变量：

```
ZED_DEVELOPMENT_USE_KEYCHAIN=1
```

## 性能测量

Zed 包含一个帧时间测量系统，可用于分析渲染每一帧所需的时间。这在比较不同版本的渲染性能或优化帧渲染代码时特别有用。

### 使用 ZED_MEASUREMENTS

要启用性能测量，请设置 `ZED_MEASUREMENTS` 环境变量：

```sh
export ZED_MEASUREMENTS=1
```

启用后，Zed 会将帧渲染计时信息打印到 stderr，显示每帧的渲染时间。

### 性能比较工作流程

以下是比较不同版本帧渲染性能的典型工作流程：

1. **启用测量：**

   ```sh
   export ZED_MEASUREMENTS=1
   ```

2. **测试第一个版本：**

   - 检出您要测量的提交
   - 以发布模式运行 Zed 并使用 5-10 秒：`cargo run --release &> version-a`

3. **测试第二个版本：**

   - 检出另一个您要比较的提交
   - 以发布模式运行 Zed 并使用 5-10 秒：`cargo run --release &> version-b`

4. **生成比较结果：**

   ```sh
   script/histogram version-a version-b
   ```

`script/histogram` 工具可以接受任意多个测量文件，并生成一个直方图可视化，用于比较所提供版本之间的帧渲染性能数据。

### 使用 `util_macros::perf`

用于基准测试单元测试，使用 `util_macros` 包中的 `#[perf]` 属性进行标注。然后运行 `cargo perf-test -p $CRATE` 来基准测试它们。有关深入示例和解释，请参见 `crates/util_macros` 和 `tooling/perf` 上的 rustdoc 文档。

## Windows 上的 ETW 性能分析

Zed 支持 Event Tracing for Windows (ETW) 进行性能分析，以捕获详细的性能数据，包括 CPU、GPU、内存、磁盘和文件 I/O 活动。数据将保存到 `.etl` 文件中，可以在标准分析工具中打开进行分析。

ETW 录制可能包含个人身份信息或安全敏感信息，例如访问的文件路径和注册表键，以及进程名称。在与其他人共享跟踪文件时请注意这一点。

### 录制跟踪

打开命令面板并运行以下命令之一：

- `zed: record etw trace`：录制 CPU、GPU、内存和 I/O 活动
- `zed: record etw trace with heap tracing`：包括 Zed 进程的堆分配数据

Zed 会提示您选择 `.etl` 文件的保存位置，然后请求管理员权限。一旦获得授权，录制将开始。

### 保存或取消

在录制跟踪时，打开命令面板并运行以下命令之一：

- `zed: save etw trace`：停止录制并将跟踪保存到磁盘
- `zed: cancel etw trace`：停止录制但不保存

如果未手动停止，录制将在 60 秒后自动保存。

## 贡献者链接

- [CONTRIBUTING.md](https://github.com/zed-industries/zed/blob/main/CONTRIBUTING.md)
- [调试崩溃](./development/debugging-crashes.md)
- [行为准则](https://zed.dev/code-of-conduct)
- [Zed 贡献者许可证](https://zed.dev/cla)