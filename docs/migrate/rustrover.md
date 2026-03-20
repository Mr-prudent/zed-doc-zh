---
title: 如何从 RustRover 迁移到 Zed
description: "关于从 RustRover 迁移到 Zed 的指南，包括设置和快捷键。"
---

# 从 RustRover 迁移

本指南涵盖了快捷键、设置，以及作为 Rust 开发者从 RustRover 切换到 Zed 时会遇到的不同之处。

## 安装 Zed

Zed 支持 macOS、Windows 和 Linux 系统。

对于 macOS，您可以从 zed.dev/download 下载，或使用 Homebrew 安装：
```sh
brew install --cask zed
```

对于 Windows，请从 zed.dev/download 下载安装程序，或使用 winget 安装：
```sh
winget install Zed.Zed
```
对于大多数 Linux 用户，安装 Zed 最简单的方法是通过我们的安装脚本：
```sh
curl -f https://zed.dev/install.sh | sh
```
安装后，您可以从“应用程序”文件夹 (macOS)、“开始”菜单 (Windows) 或直接从终端启动 Zed，使用命令：
`zed .`
这会在 Zed 中打开当前目录。

## 设置 JetBrains 键盘映射

如果您来自 RustRover，最快适应 Zed 的方式是使用 JetBrains 键盘映射。在引导过程中，您可以选择它作为基础键盘映射。如果您错过了这一步，可以随时更改：

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 搜索 `Base Keymap`
3. 选择 `JetBrains`

这将映射熟悉的快捷键，例如 `Shift Shift` 用于全局搜索，`Cmd+O` 用于跳转到类，以及 `Cmd+Shift+A` 用于查找操作。

## 设置编辑器偏好设置

您可以在设置编辑器 ({#kb zed::OpenSettings}) 中配置大多数设置。对于高级设置，从命令面板中运行 `zed: open settings file` 来直接编辑您的设置文件。

RustRover 用户通常首先配置的设置：

| Zed 设置 | 作用 |
| ----------------------- | ------------------------------------------------------------------------------- |
| `format_on_save` | 保存时自动格式化。设置为 `"on"` 以启用（默认使用 rustfmt）。 |
| `soft_wrap` | 换行长行。选项：`"none"`, `"editor_width"`, `"preferred_line_length"` |
| `preferred_line_length` | 换行和标尺的列宽。Rust 约定为 100。 |
| `inlay_hints` | 内联显示类型提示、参数名和链式提示。 |
| `relative_line_numbers` | 如果您来自 IdeaVim，会很有用。 |

Zed 还支持每个项目的设置。在项目根目录创建一个 `.zed/settings.json` 文件，以覆盖该项目的全局设置。

> **提示：** 如果您要加入一个现有项目，请在进行第一次提交前检查 `format_on_save`。否则，当您只想更改一行时，可能会意外地重新格式化整个文件。

## 打开或创建项目

设置完成后，按 `Cmd+Shift+O` (在 JetBrains 键盘映射下) 打开一个文件夹。这将成为您在 Zed 中的工作区。

要启动一个新项目，请在终端中使用 Cargo：
```sh
cargo new my_project
cd my_project
zed .
```
或者，对于库：
```sh
cargo new --lib my_library
```
您还可以在任何现有的 Cargo 项目中从终端启动 Zed：
`zed .`
进入项目后：

- 使用 `Cmd+Shift+O` 或 `Cmd+E` 在文件之间快速跳转（类似于 RustRover 的“最近文件”）
- 使用 `Cmd+Shift+A` 或 `Shift Shift` 打开命令面板（类似于 RustRover 的“全局搜索”）
- 使用 `Cmd+O` 搜索符号（类似于 RustRover 的“跳转到符号”）

打开的缓冲区显示为顶部的标签页。项目面板显示您的文件树和 Git 状态。使用 `Cmd+1` 切换它（就像 RustRover 的项目工具窗口一样）。

## 快捷键的差异

如果在引导过程中选择了 JetBrains 键盘映射，您的大多数快捷键应该已经感觉很熟悉了。这是 Zed 与 RustRover 的快速对比参��。

### 通用共享快捷键

| 操作 | 快捷键 |
| ----------------------------- | ----------------------- |
| 全局搜索 | `Shift Shift` |
| 查找操作 / 命令面板 | `Cmd + Shift + A` |
| 跳转到文件 | `Cmd + Shift + O` |
| 跳转到符号 | `Cmd + O` |
| 最近文件 | `Cmd + E` |
| 跳转到定义 | `Cmd + B` |
| 查找用法 | `Alt + F7` |
| 重命名符号 | `Shift + F6` |
| 重新格式化代码 | `Cmd + Alt + L` |
| 切换项目面板 | `Cmd + 1` |
| 切换终端 | `Alt + F12` |
| 复制行 | `Cmd + D` |
| 删除行 | `Cmd + Backspace` |
| 上移/下移动 | `Shift + Alt + Up/Down` |
| 展开/缩小选择范围 | `Alt + Up/Down` |
| 注释行 | `Cmd + /` |
| 返回 / 前进 | `Cmd + [` / `Cmd + ]` |
| 切换断点 | `Ctrl + F8` |

### 不同的快捷键 (RustRover → Zed)

| 操作 | RustRover | Zed (JetBrains 键盘映射) |
| ---------------------- | ----------- | ------------------------ |
| 文件结构 | `Cmd + F12` | `Cmd + F12` (大纲) |
| 转到下一个错误 | `F2` | `F2` |
| 运行 | `Ctrl + R` | `Ctrl + Alt + R` (任务) |
| 调试 | `Ctrl + D` | `Alt + Shift + F9` |
| 停止 | `Cmd + F2` | `Ctrl + F2` |
| 展开宏 | `Alt+Enter` | `Cmd + Shift + M` |

### Zed 独有的功能

| 操作 | 快捷键 | 备注 |
| ----------------- | -------------------------- | ------------------------------ |
| 切换右侧停靠面板 | `Cmd + R` | 助手面板、通知 |
| 拆分窗格 | `Cmd + K`，然后方向键 | 可向任意方向创建拆分 |

### 如何自定义快捷键

- 打开命令面板 (`Cmd+Shift+A` 或 `Shift Shift`)
- 运行 `Zed: Open Keymap Editor`

这将打开所有可用绑定的列表。您可以覆盖单个快捷键或删除冲突。

Zed 还支持按键序列（多键快捷键）。

## 用户界面的差异

### 不同的分析引擎

RustRover 使用自己专有的代码分析引擎进行 Rust 智能分析。Zed 通过语言服务器协议 (LSP) 使用 rust-analyzer。

这对您意味着：

- **代码补全、跳转到定义、查找用法、类型推断** — 所有功能在 Zed 中都可通过 rust-analyzer 使用
- **宏展开** — 两者都支持（在 Zed 中使用 `Cmd+Shift+M`）
- **内联提示** — 两者都支持类型提示、参数提示和链式提示

您可能会注意到差异的地方：

- RustRover 中的一些重构操作在 rust-analyzer 中可能没有等效功能
- RustRover 特有的检查（除 Clippy 外）在 Zed 中不存在
- 在 Zed 中，rust-analyzer 通过 JSON 配置，而不是通过图形用户界面 (GUI)

**如何适应：**

- 使用 `Alt+Enter` 调用可用的代码操作 — rust-analyzer 提供了许多操作
- 在 `.zed/settings.json` 中配置 rust-analyzer 设置以满足项目特定需求
- 运行 `cargo clippy` 进行代码检查（它集成在 rust-analyzer 的诊断中）

### 项目配置

两个编辑器都将每个项目的配置存储在一个隐藏文件夹中。RustRover 使用 `.idea`（含 XML 文件），Zed 使用 `.zed`（含 JSON 文件）。

**运行配置无法迁移。** RustRover 将运行/调试配置存储在 `.idea` 中。这些配置没有自动迁移路径。您需要将它们重新创建为 Zed [任务](../tasks.md)（存储在 `.zed/tasks.json` 中）和调试配置（存储在 `.zed/debug.json` 中）。

**没有 Cargo 工具窗口。** RustRover 提供了您工作区成员、目标、特性和依赖项的可视化树。Zed 没有这个功能。您直接与 `Cargo.toml` 和 Cargo CLI 一起工作。

**工具链管理是外部的。** RustRover 允许您在其设置 UI 中选择和切换工具链。在 Zed 中，您通过 `rustup` 管理工具链。

**配置是可选的。** RustRover 在打开项目时会自动生成 `.idea`。Zed 不会生成任何东西。您可以根据需要创建 `.zed/settings.json`、`tasks.json` 和 `debug.json`。

**如何适应：**

- 在项目根目录创建一个 `.zed/settings.json` 用于项目特定设置
- 在 `tasks.json` 中定义常用命令（通过命令面板打开：`zed: open tasks`）：
```json
[
  {
    "label": "cargo run",
    "command": "cargo run"
  },
  {
    "label": "cargo build",
    "command": "cargo build"
  },
  {
    "label": "cargo test",
    "command": "cargo test"
  },
  {
    "label": "cargo clippy",
    "command": "cargo clippy"
  },
  {
    "label": "cargo run --release",
    "command": "cargo run --release"
  }
]
```
- 使用 `Ctrl+Alt+R` 快速运行任务
- 对于任务未涵盖的任何操作，请依赖您的终端 (`Alt+F12`)

### 没有 Cargo 集成 UI

RustRover 的 Cargo 工具窗口提供了对您项目的目标、依赖项和常用 Cargo 命令的可视化访问。您可以单击运行构建、测试和基准测试。

Zed 没有 Cargo 图形用户界面。您通过以下方式使用 Cargo：

- **终端** — 直接运行任何 Cargo 命令
- **任务** — 为常用命令定义快捷方式
- **边缘图标** — 通过可点击的图标运行测试和二进制文件

**如何适应：**

- 熟悉 Cargo CLI 命令：`cargo build`、`cargo run`、`cargo test`、`cargo clippy`、`cargo doc`
- 对您经常运行的命令使用任务
- 对于依赖管理，直接编辑 `Cargo.toml`（rust-analyzer 为包名称和版本提供补全）

### 工具窗口 vs. 停靠面板

RustRover 将辅助视图组织到编号的工具窗口中（项目 = 1，Cargo = Alt+1，终端 = Alt+F12，等等）。Zed 使用一个称为“停靠面板”的类似概念：

| RustRover 工具窗口 | Zed 等效物 | 快捷键 (JetBrains 键盘映射) |
| --------------------- | -------------- | --------------------------- |
| Project (1) | 项目面板 | `Cmd + 1` |
| Git (9 or Cmd+0) | Git 面板 | `Cmd + 0` |
| Terminal (Alt+F12) | 终端面板 | `Alt + F12` |
| Structure (7) | 大纲面板 | `Cmd + 7` |
| Problems (6) | 诊断 | `Cmd + 6` |
| Debug (5) | 调试面板 | `Cmd + 5` |

Zed 有三个停靠位置：左侧、底部和右侧。面板可以通过拖动或在设置中移动停靠位置。

请注意，Zed 中没有专门的 Cargo 工具窗口。使用终端或为您的常用 Cargo 命令定义任务。

### 调试

RustRover 和 Zed 都为 Rust 提供集成调试，但使用不同的后端：

- RustRover 使用自己集成的调试器
- Zed 使用 **CodeLLDB**（在 VS Code 中流行的相同调试适配器）

要在 Zed 中调试 Rust 代码：

- 使用 `Ctrl+F8` 设置断点
- 使用 `Alt+Shift+F9` 启动调试，或按 `F4` 并选择一个调试目标
- 使用 `F7`（单步进入）、`F8`（单步跳过）、`Shift+F8`（单步跳出）单步执行代码
- 使用 `F9` 继续执行

Zed 可以自动检测您的 Cargo 项目中可调试的目标。按 `F4` 查看可用选项。

为了获得更多控制，请创建一个 `.zed/debug.json` 文件：
```json
[
  {
    "label": "Debug Binary",
    "adapter": "CodeLLDB",
    "request": "launch",
    "program": "${workspaceFolder}/target/debug/my_project"
  },
  {
    "label": "Debug Tests",
    "adapter": "CodeLLDB",
    "request": "launch",
    "cargo": {
      "args": ["test", "--no-run"],
      "filter": {
        "kind": "test"
      }
    }
  },
  {
    "label": "Debug with Arguments",
    "adapter": "CodeLLDB",
    "request": "launch",
    "program": "${workspaceFolder}/target/debug/my_project",
    "args": ["--config", "dev.toml"]
  }
]
```

### 运行测试

RustRover 有一个专用的测试运行器，带有图形界面，显示每个测试的通过/失败状态。Zed 通过以下方式提供测试运行：

- **边缘图标** — 点击 `#[test]` 函数或测试模块旁边的播放按钮
- **任务** — 在 `tasks.json` 中定义 `cargo test` 命令
- **终端** — 直接运行 `cargo test`

测试输出显示在终端面板中。要获得更详细的输出，请使用：
- `cargo test -- --nocapture` 查看 `println!` 的输出
- `cargo test -- --test-threads=1` 进行顺序测试执行
- `cargo test specific_test_name` 运行单个测试

### 扩展 vs. 插件

RustRover 拥有完整的 JetBrains 插件目录。

Zed 的扩展目录更小且更专注：

- 语言支持和语法高亮
- 主题
- 用于 AI 的斜杠命令
- 上下文服务器

在其他编辑器中可能需要插件的几个功能已内置在 Zed 中：

- 实时协作和语音聊天
- AI 编程助手
- 内置终端
- 任务运行器
- rust-analyzer 集成
- rustfmt 格式化

### Zed 中没有的功能

以下是 RustRover 提供而 Zed 没有的功能：

- **性能分析器集成** — 使用 `cargo flamegraph`、`perf` 或外部性能分析工具
- **数据库工具** — 使用 DataGrip、DBeaver 或 TablePlus
- **HTTP 客户端** — 使用 `curl`、`httpie` 或 Postman 等工具
- **覆盖率可视化** — 外部使用 `cargo tarpaulin` 或 `cargo llvm-cov`

## 关于许可和遥测的说明

关于许可和遥测：

- **Zed 是开源的**（编辑器采用 MIT 许可，协作服务采用 AGPL 许可）
- **遥测是可选的**，可以在引导过程中禁用或在设置中禁用

## Zed vs. RustRover 中的协作

RustRover 将 Code With Me 作为独立功能提供协作。Zed 将协作功能内置到核心体验中。

- 在左侧停靠面板中打开协作面板
- 创建一个频道并 [邀请您的协作者](https://zed.dev/docs/collaboration#inviting-a-collaborator) 加入
- 直接 [共享您的屏幕或代码库](https://zed.dev/docs/collaboration#share-a-project)

连接后，您将实时看到彼此的光标、选择和编辑。语音聊天已包含在内。无需单独的工具或第三方登录。

## 在 Zed 中使用 AI

Zed 具有内置的 AI 功能。如果您使用过 JetBrains AI Assistant，以下是如何进行设置。

### 配置 GitHub Copilot

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 导航到 **AI → Edit Predictions**
3. 在“Configure Providers”旁边单击 **Configure**
4. 在 **GitHub Copilot** 下，单击 **Sign in to GitHub**

登录后，只需开始输入。Zed 将为您提供内联建议以供接受。

### 其他 AI 选项

要在 Zed 中使用其他 AI 模型，您有几个选项：

- 使用 Zed 托管的模型，有更高的速率限制。需要 [身份验证](https://zed.dev/docs/authentication) 并订阅 [Zed Pro](https://zed.dev/docs/ai/subscription.html)。
- 使用您自己的 [API 密钥](https://zed.dev/docs/ai/llm-providers.html)，无需身份验证
- 使用 [外部智能体，如 Claude Agent](https://zed.dev/docs/ai/external-agents.html)

## 高级配置和生产力调整

Zed 为希望微调其环境的高级用户提供了高级设置。

以下是一些对 Rust 开发者有用的调整：

**保存时格式化（默认使用 rustfmt）：**
```json
"format_on_save": "on"
```
**为 Rust 配置内联提示：**
```json
{
  "inlay_hints": {
    "enabled": true,
    "show_type_hints": true,
    "show_parameter_hints": true,
    "show_other_hints": true
  }
}
```
**配置 rust-analyzer 设置**（需要手动 JSON 编辑）：
```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "checkOnSave": {
          "command": "clippy"
        },
        "cargo": {
          "allFeatures": true
        },
        "procMacro": {
          "enable": true
        }
      }
    }
  }
}
```
**为 rust-analyzer 使用单独的目标目录（构建更快）：**
```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "rust-analyzer.cargo.targetDir": true
      }
    }
  }
}
```
这会告诉 rust-analyzer 使用 `target/rust-analyzer` 而不是 `target`，这样 IDE 分析就不会与您的手动 `cargo build` 命令冲突。

**启用 direnv 支持（对使用 direnv 的 Rust 项目很有用）：**
```json
"load_direnv": "shell_hook"
```
**为工作区配置链接项目：**
如果您使用多个不在工作区中的 Cargo 项目，可以告诉 rust-analyzer 这些项目：
```json
{
  "lsp": {
    "rust-analyzer": {
      "initialization_options": {
        "linkedProjects": ["./project-a/Cargo.toml", "./project-b/Cargo.toml"]
      }
    }
  }
}
```

## 下一步

现在您已经设置完毕，这里有一些资源可以帮助您充分利用 Zed：

- [所有设置](../reference/all-settings.md) — 自定义设置、主题和编辑器行为
- [快捷键](../key-bindings.md) — 学习如何自定义和扩展您的键盘映射
- [任务](../tasks.md) — 为您的项目设置构建和运行命令
- [AI 功能](../ai/overview.md) — 探索 Zed 超出代码补全的 AI 能力
- [协作](../collaboration/overview.md) — 实时共享您的项目和代码
- [Zed 中的 Rust](../languages/rust.md) — Rust 特定的设置和配置
