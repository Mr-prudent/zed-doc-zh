---
title: "Zed 开发：术语表"
description: "Zed 开发指南：Zed 开发术语表。"
---

# 术语表

本页面定义了 Zed 代码库中使用的术语和结构。

这是一个尽力而为的列表，并且仍在进行中。

<!--
TBD: 术语表改进

问题：

- 我们能从 zed 中的文档注释自动生成这个列表吗？
- 我们应该有一个部分来展示各种 UI 部件及其名称。（在频道中无法做到这一点。）
-->

## 命名约定

这些是代码库中常见的命名模式。`Name` 是任何类型名称的占位符，例如 `AnyElement` 或 `LspStore`。

- `AnyName`: `_name_` 的类型擦除版本。可以理解为 `Box<dyn NameTrait>`。
- `NameStore`: 一个包装类型，它抽象了操作是在本地运行还是在远程运行。

## GPUI

### 状态管理

- `App`: 一个持有完整应用程序状态的单例，包括所有实体。`App` 不是 `Send` 的，所以它只存在于创建它的线程上（通常是主/UI 线程）。如果你看到 `&mut App`，说明你正在 UI 线程上。
- `Context`: 一个围绕 `App` 的包装器，为特定的 `Entity` 提供专门的行为。你可以把它看作是 `(&mut App, Entity<V>)`。例如，`App::spawn` 接受 `AsyncFnOnce(AsyncApp) -> Ret`，而 `Context::spawn` 接受 `AsyncFnOnce(WeakEntity<V>, AsyncApp) -> Ret`。
- `AsyncApp`: `App` 的拥有版本，用于异步上下文。它仍然不是 `Send` 的，所以它仍在主线程上运行，如果 `App` 已经终止，操作可能会失败。
  `AsyncApp` 的存在是因为 `App` 通常被访问为 `&mut App`，这在异步边界之间持有会很麻烦。
- `AppContext`: 一个抽象了 `App`、`AsyncApp`、`Context` 及其测试变体的 trait。
- `Task`: 一个在后台或前台执行器上运行（或计划运行）的 future。与常规 future 不同，任务不需要 `.await` 来启动。你仍然需要等待它们来读取其结果。
- `Executor`: 用于生成在前台或后台线程上运行的任务。尽量在后台线程上运行任务。
  - `BackgroundExecutor`: 一个运行 `Task`s 的线程池。
  - `ForegroundExecutor`: 运行 `Task`s 的主线程。
- `Entity`: 一个由 gpui 管理的结构的强类型、类型安全的引用。实际上是 `App::EntityMap` 中的一个指针/映射键。
- `WeakEntity`: 对可能不再存在的 `Entity` 的运行时检查的引用。类似于 [`std::rc::Weak`](https://doc.rust-lang.org/std/rc/struct.Weak.html)。
- `Global`: 一个单例类型，只有一个值，该值存储在 `App` 中。
- `Event`: 一种数据类型，可由 `Entity` 发送给订阅者。
- `Action`: 一个代表用户键盘输入的事件，可由监听器处理
  示例: `file finder: toggle`
- `Observing`: 对实体已更改的通知做出反应。
- `Subscription`: 一个用于对应用程序中状态变化做出反应的事件处理器。
  1. 发出的事件处理
  2. 观察 `{new,release,on notify}` 一个实体

### UI

- `View`: 一个 `Entity`，它可以通过实现 `Render` 来产生一个 `Element`。
- `Element`: 一种可以布局并绘制到屏幕上的类型。
- `element expression`: 一个构建元素树的表达式，例如：

```rust
h_flex()
    .id(text[i])
    .relative()
    .when(selected, |this| {
        this.child(
            div()
                .h_4()
                .absolute()
                etc etc
```

- `Component`: 一个可以渲染成 `Element` 的构建器。
- `Dispatch tree`: 待定
- `Focus`: 首先处理按键击键的位置
- `Focus tree`: 从当前焦点所在位置到 UI 根的路径。示例 <img> 待定

## Zed UI

- `Window`: 一个代表你桌面环境中 Zed 窗口的结构体（见下图）。你可以同时打开多个窗口。这主要在渲染时传递。
- `Modal`: 一个浮在其他 UI 顶部的 UI 元素
- `Picker`: 一个表示浮在 UI 顶部的项目列表（Modal）的结构体。你可以选择一个项目并确认。选择或确认后发生什么由 Picker 的委托决定。（下图中的 'Modal' 是一个 Picker。）
- `PickerDelegate`: 一个用于专门化 `Picker` 行为的 trait。`Picker` 将 `PickerDelegate` 存储在 delegate 字段中。
- `Center`: Zed 窗口的中间部分，中心被分割成多个 `Pane`。在代码库中，这是 `Workspace` 结构体的一个字段。（见下图）。
- `Pane`: `Center` 中的一个区域，我们可以在其中放置项目，例如编辑器、多缓冲区或终端（见下图）。
- `Panel`: 一个实现 `Panel` trait 的 `Entity`。面板可以放置在 `Dock` 中。在下图中：`ProjectPanel` 在左侧停靠栏，`DebugPanel` 在底部停靠栏，`AgentPanel` 在右侧停靠栏。`Editor` 不实现 `Panel`。
- `Dock`: 一个类似于 `Pane` 的 UI 元素，可以打开和隐藏。一次最多可以打开三个停靠栏：左侧、右侧和底部。一个停靠栏包含一个或多个 `Panel`，而不是 `Pane`。

<img width="1921" height="1080" alt="Pane 和 Dock 功能的截图" src="https://github.com/user-attachments/assets/2cb1170e-2850-450d-89bb-73622b5d07b2" />

- `Project`: 一个或多个 `Worktree`
- `Worktree`: 代表本地或远程文件。

<img width="552" height="1118" alt="Worktree 功能的截图" src="https://github.com/user-attachments/assets/da5c58e4-b02e-4038-9736-27e3509fdbfa" />

- [Multibuffer](https://zed.dev/docs/multibuffers): 一个编辑器列表，多缓冲区允许同时编辑多个文件。当 Zed 中的某个操作返回多个位置时，会打开多缓冲区，例如：_搜索_ 或 _转到定义_。见下图中的项目搜索。

<img width="800" height="886" alt="MultiBuffer 功能的截图" src="https://github.com/user-attachments/assets/d59dcecd-8ab6-4172-8fb6-b1fc3c3eaf9d" />

## Editor

- `Editor`: 文本编辑器类型。Zed 中大多数可编辑的表面都是一个 `Editor`，包括单行输入。上图中的每个窗格都包含一个或多个 `Editor` 实例。
- `Workspace`: 窗口的根
- `Entry`: 一个文件、目录、待处理目录或未加载的目录。
- `Buffer`: '文件' 的内存表示，以及相关数据，如语法树、git 状态和诊断。
- `pending selection`: 你已经按下鼠标并正在拖动，但尚未释放。

## Collab

- `Collab session`: 多个用户在共享的 `Project` 中工作
- `Upstream client`: 已共享其工作区的 zed 客户端
- `Downstream client`: 加入共享工作区的 zed 客户端

## Debugger

- `DapStore`: 一个管理调试器会话的实体
- `debugger::Session`: 一个管理调试会话生命周期以及与 DAPs 通信的实体。
- `BreakpointStore`: 一个管理 Zed 本地和远程实例中断点状态的实体
- `DebugSession`: 管理调试会话的 UI 和运行状态
- `RunningState`: 直接管理调试会话的所有视图
- `VariableList`: 调试会话的变量和监视列表视图
- `Console`: 待定
- `Terminal`: 待定
- `BreakpointList`: 待定