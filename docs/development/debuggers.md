---
title: 使用调试器
description: "关于Zed开发中使用调试器的指南。"
---

# 使用调试器

> 本页内容不是关于[配置Zed的调试器](../debugger.md)。
> 它介绍在开发Zed本身时如何使用调试器。

## 使用Zed内置的调试器

在Zed项目打开状态下，你可以打开`新进程模态框`并选择`调试`标签页。在那里你可以看到两个用于调试Zed的配置，一个用于GDB，一个用于LLDB。选择你想要的配置，Zed将会构建并启动��二进制文件。

GDB在Apple Silicon Mac上不支持。

## 发布构建配置注意事项

默认情况下，使用发布配置（用于nightly、preview和stable的配置）构建时，包含有限的调试信息。

这是通过在根目录`Cargo.toml`文件中设置`profile.(release).debug`字段为`"limited"`来实现的。

`debug`字段的官方文档请见[这里](https://doc.rust-lang.org/cargo/reference/profiles.html#debug)。
简而言之，`"limited"`会移除类型级别和变量级别的调试信息。

在发布构建中，这可以减少二进制文件的大小。对于有用的堆栈跟踪来说，类型级别和变量级别的调试信息并非必需。

然而，当你在积极调试时，这些数据很重要。没有它们，调试器就无法解析局部变量、检查值或使用漂亮的打印格式化输出。

要在发布构建中获得完整的调试器体验，请使用完整的调试信息编译Zed二进制文件。

最简单的方法是在运行`cargo run`或`cargo build`时使用`--config`来覆盖根目录`Cargo.toml`中的`debug`字段：

```sh
cargo run --config 'profile.release.debug="full"'
cargo build --config 'profile.release.debug="full"'
```

> 如果你不想在每个`cargo`命令中都传递`--config`，你也可以修改[根目录`Cargo.toml`](https://github.com/zed-industries/zed/blob/main/Cargo.toml)中的相应部分
>
> 从
>
> ```toml
> [profile.release]
> debug = "limited"
> ```
>
> 改为
>
> ```toml
> [profile.release]
> debug = "full"
> ```
>
> 这样所有`cargo run --release`或`cargo build --release`的调用都会使用完整调试信息进行编译。
>
> **警告**：不要提交这些更改。

## 使用shell调试器GDB/LLDB运行Zed

### 背景

当你通过rustup安装Rust（Zed开发的推荐设置；参见你的平台指南[这里](../development.md)）时，rustup也会为调试Rust二进制文件安装辅助脚本。

这些脚本是`rust-gdb`和`rust-lldb`。

你可以阅读更多关于这些脚本的信息[这里](https://michaelwoerister.github.io/2015/03/27/rust-xxdb.html)。

它们是围绕`gdb`和`lldb`的包装脚本，注入了用于Rust特定功能的命令和标志，例如漂亮的打印机和类型信息。

要使用`rust-gdb`或`rust-lldb`，请在你的系统上安装`gdb`或`lldb`。

[链接的文章](https://michaelwoerister.github.io/2015/03/27/rust-xxdb.html)指出，最低支持的版本是GDB 7.7和LLDB 310。实际上，更新版本通常更好。

> **注意**：由于Windows上的`gdb`支持不稳定，`rust-gdb`默认不会安装在Windows上。请使用`rust-lldb`。

如果你不熟悉这些工具，请参见`gdb`的文档[这里](https://www.gnu.org/software/gdb/)和`lldb`的文档[这里](https://lldb.llvm.org/)。

### 在Zed中使用

启用完整调试信息并使用`cargo build`构建后，对编译好的Zed二进制文件运行`rust-gdb`或`rust-lldb`：

```
rust-gdb target/debug/zed
rust-lldb target/debug/zed
```

你也可以附加到一个正在运行的Zed进程上（例如，使用`cargo run`启动的进程）：

```
rust-gdb -p <pid>
rust-lldb -p <pid>
```

`<pid>`是你想要附加到的Zed实例的进程ID。

要查找PID，使用你系统的进程工具，例如Windows的任务管理器或macOS的活动监视器。

你也可以在macOS和Linux上运行`ps aux | grep zed`，或在Windows的PowerShell中运行`Get-Process | Select-Object Id, ProcessName`。

#### 调试Panics和崩溃

调试器对于查找panics和崩溃的原因很有用，在Zed中也是如此。

默认情况下，当附加到`gdb`或`lldb`的进程遇到panic等异常时，调试器会在该点停止，以便你可以检查程序状态。

初始停止点通常在Rust标准库的panic或异常处理代码中，所以通常需要回溯堆栈以找到根本原因。

在`lldb`中，使用`backtrace`配合`frame select`。`gdb`提供等效的命令。

程序在异常停止后，通常无法继续正常执行。你仍然可以在堆栈帧之间移动并检查变量和表达式，这通常足以识别崩溃原因。

你可以在[这里](./debugging-crashes.md)找到更多关于调试Zed崩溃的附加信息。