---
title: 调试器扩展
description: "Zed 扩展的调试器扩展。"
---

# 调试器扩展

[调试器适配器协议](https://microsoft.github.io/debug-adapter-protocol) 服务器可以作为扩展暴露出来，供 [调试器](../debugger.md) 中使用。

## 定义调试器扩展

一个扩展可以提供一个或多个 DAP 服务器。
每个 DAP 服务器必须在 `extension.toml` 中注册：

```toml
[debug_adapters.my-debug-adapter]
# 调试器适配器配置模式的 JSON 模式的可选相对路径。默认为 `debug_adapter_schemas/$DEBUG_ADAPTER_NAME_ID.json`。
# 请注意，虽然此字段是可选的，但模式是必需的。
schema_path = "relative/path/to/schema.json"
```

然后，在您扩展的 Rust 代码中，在您的扩展上实现 `get_dap_binary` 方法：

```rust
impl zed::Extension for MyExtension {
    fn get_dap_binary(
        &mut self,
        adapter_name: String,
        config: DebugTaskDefinition,
        user_provided_debug_adapter_path: Option<String>,
        worktree: &Worktree,
    ) -> Result<DebugAdapterBinary, String>;
}
```

此方法应返回启动调试器适配器协议服务器的命令，以及其运行所需的任何参数或环境变量。

如果您需要从外部源（GitHub Releases、npm 等）下载 DAP 服务器，也可以在此函数中执行。请确保只定期检查更新，因为每当用户使用您的调试器适配器启动新的调试会话时，都会调用此函数。

您还必须实现 `dap_request_kind`。此函数用于确定给定的调试场景是 _启动_一个新的调试目标还是 _附加_到一个已存在的调试目标。
我们也使用它来确定给定的调试场景是否需要运行一个 _定位器_。

```rust
impl zed::Extension for MyExtension {
    fn dap_request_kind(
        &mut self,
        _adapter_name: String,
        _config: Value,
    ) -> Result<StartDebuggingRequestArgumentsRequest, String>;
}
```

这两个函数足以在基于 `debug.json` 的用户工作流中暴露您的调试器适配器，但您也应该强烈考虑实现 `dap_config_to_scenario`。

```rust
impl zed::Extension for MyExtension {
    fn dap_config_to_scenario(
        &mut self,
        _adapter_name: DebugConfig,
    ) -> Result<DebugScenario, String>;
}
```

当用户通过新进程模态 UI 启动会话时，会使用 `dap_config_to_scenario`。从高层次上讲，它接收一个通用的调试配置（不特定于任何调试器适配器），并尝试将其转换为您的适配器的具体调试场景。
换句话说，它应该回答这个问题：“给定一个程序、一个参数列表、当前工作目录和环境变量，启动此调试器适配器的配置会是什么样子？”。

## 定义调试定位器

Zed 提供了一种使用 _调试定位器_ 自动创建调试场景的方法。
定位器会定位调试目标并弄清楚如何为其启动调试会话。得益于定位器，我们可以自动转换现有的用户任务（例如 `cargo run`）并将它们转换为调试场景（例如执行 `cargo build`，然后使用 `target/debug/my_program` 作为要调试的程序来启动调试器）。

> 即使您的扩展不暴露调试器适配器，也可以定义自己的调试定位器。当您的扩展已经暴露了语言任务时，我们强烈建议您这样做，因为它允许用户启动调试会话，而无需手动配置调试器适配器。

定位器可以（但不必须）与它们所使用的调试器适配器无关。它们负责定位调试目标并弄清楚如何为其启动调试会话。这使得扩展可以在适配器之间共享定位器逻辑。

您的扩展可以定义一个或多个调试定位器。每个调试定位器必须在 `extension.toml` 中注册：

```toml
[debug_locators.my-debug-locator]
```

定位器有两个组成部分。
首先，每个定位器都会在每个可用的任务上运行，以确定是否有任何可用的定位器可以为给定的任务提供调试场景。这是通过调用 `dap_locator_create_scenario` 来完成的。

```rust
impl zed::Extension for MyExtension {
    fn dap_locator_create_scenario(
        &mut self,
        _locator_name: String,
        _build_task: TaskTemplate,
        _resolved_label: String,
        _debug_adapter_name: String,
    ) -> Option<DebugScenario>;
}
```

当该场景定义了给定用户任务的调试对应项时，此函数应返回 `Some` 调试场景。
请注意，`DebugScenario` 可以包含一个 [构建任务](../debugger.md#build-tasks)。如果存在，我们将在构建任务成功完成后执行 `run_dap_locator`。

```rust
impl zed::Extension for MyExtension {
    fn run_dap_locator(
        &mut self,
        _locator_name: String,
        _build_task: TaskTemplate,
    ) -> Result<DebugRequest, String>;
}
```
如果您无法确定性确定构建目标，`run_dap_locator` 会很有用。某些构建系统可能会生成其名称事先未知的工件。
但是，请注意您并不需要经过两阶段解析；如果您仅使用 `dap_locator_create_scenario` 就可以确定完整的调试配置，则可以在返回的 `DebugScenario` 上省略 `build` 属性。另请注意，您的定位器 **将会** 被调用到它不太可能接受的任务；因此，您应该努力在执行任何昂贵操作之前尽早返回 `None`。

## 可用扩展

查看作为扩展发布的 DAP 服务器，请访问 [Zed 官网](https://zed.dev/extensions?filter=debug-adapters)。

查看它们的存储库以了解常见的实现模式和结构。

## 测试

要测试您新的调试器适配器协议服务器扩展，您可以 [将其作为开发扩展安装](./developing-extensions.md#developing-an-extension-locally)。