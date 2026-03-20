---
title: 如何从 IntelliJ IDEA 迁移到 Zed
description: "从 IntelliJ IDEA 迁移到 Zed 的指南，包括设置和快捷键。"
---

# 从 IntelliJ IDEA 迁移

本指南涵盖了如果您从 IntelliJ IDEA 过来，如何设置 Zed，包括快捷键、设置以及您应该注意到的差异。

## 安装 Zed

Zed 适用于 macOS、Windows 和 Linux。

对于 macOS，您可以从 zed.dev/download 下载，或通过 Homebrew 安装：

```sh
brew install --cask zed
```

对于 Windows，请从 zed.dev/download 下载安装程序，或通过 winget 安装：

```sh
winget install Zed.Zed
```

对于大多数 Linux 用户，安装 Zed 最简单的方法是通过��们的安装脚本：

```sh
curl -f https://zed.dev/install.sh | sh
```

安装后，您可以从应用程序文件夹 (macOS)、开始菜单 (Windows) 启动 Zed，或者直接从终端使用以下命令启动：
`zed .`
这会在 Zed 中打开当前目录。

## 设置 JetBrains 键盘映射

如果您来自 IntelliJ，感觉最自在最快的方式是使用 JetBrains 键盘映射。在入门引导期间，您可以选择它作为基础键盘映射。如果您错过了这一步，您可以随时更改：

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 搜索 `Base Keymap`
3. 选择 `JetBrains`

这会将熟悉的快捷键（如 `Shift Shift` 用于搜索 everywhere，`Cmd+O` 用于跳转到类，`Cmd+Shift+A` 用于查找操作）映射到 Zed 中。

## 设置编辑器首选项

您可以在设置编辑器 ({#kb zed::OpenSettings}) 中配置大多数设置。对于高级设置，从命令面板运行 `zed: open settings file` 以直接编辑您的设置文件。

IntelliJ 用户通常首先配置的设置：

| Zed 设置             | 功能                                                                     |
| ----------------------- | ------------------------------------------------------------------------ |
| `format_on_save`        | 保存时自动格式化。设置为 `"on"` 以启用。                                 |
| `soft_wrap`             | 自动换行。选项：`"none"`, `"editor_width"`, `"preferred_line_length"` |
| `preferred_line_length` | 换行和标尺的列宽。默认为 80。                                           |
| `inlay_hints`           | 内联显示参数名称和类型提示，类似于 IntelliJ 的提示。                      |
| `relative_line_numbers` | 如果您来自 IdeaVim，会很有用。                                           |

Zed 还支持每个项目的设置。在您的项目根目录中创建一个 `.zed/settings.json` 文件，以覆盖该项目的全局设置，这与您在 IntelliJ 中使用 `.idea` 文件夹的方式类似。

> **提示：** 如果您加入一个现有项目，在进行第一次提交之前，请检查 `format_on_save`。否则，当您只想更改一行时，可能会意外地重新格式化整个文件。

## 打开或创建项目

设置完成后，按 `Cmd+Shift+O`（使用 JetBrains 键盘映射）打开一个文件夹。这将成为您在 Zed 中的工作区。与 IntelliJ 不同，Zed 没有项目配置向导，没有 `.iml` 文件，也不需要 SDK 设置。

要启动一个新项目，请使用终端或文件管理器创建一个目录，然后在 Zed 中打开它。编辑器会将该文件夹视为您项目的根目录。

您也可以在任何文件夹内的终端中启动 Zed：
`zed .`

进入项目后：

- 使用 `Cmd+Shift+O` 或 `Cmd+E` 在文件之间快速跳转（类似于 IntelliJ 的“最近文件”）
- 使用 `Cmd+Shift+A` 或 `Shift Shift` 打开命令面板（类似于 IntelliJ 的“搜索 everywhere”）
- 使用 `Cmd+O` 搜索符号（类似于 IntelliJ 的“跳转到类”）

打开的缓冲区显示为顶部的标签页。项目面板显示您的文件树和 Git 状态。使用 `Cmd+1` 切换它（就像 IntelliJ 的项目工具窗口）。

## 快捷键的差异

如果您在入门引导期间选择了 JetBrains 键盘映射，您的大多数快捷键应该已经感觉很熟悉了。以下是 Zed 与 IntelliJ 对比的快速参考。

### 常用共享快捷键 (Zed 使用 JetBrains 键盘映射 ↔ IntelliJ)

| 操作                       | 快捷键                |
| -------------------------- | --------------------- |
| 搜索 everywhere            | `Shift Shift`         |
| 查找操作 / 命令面板         | `Cmd + Shift + A`     |
| 跳转到文件                 | `Cmd + Shift + O`     |
| 跳转到符号 / 类            | `Cmd + O`             |
| 最近文件                   | `Cmd + E`             |
| 跳转到定义                 | `Cmd + B`             |
| 查找用法                   | `Alt + F7`            |
| 重命名符号                 | `Shift + F6`          |
| 重新格式化代码             | `Cmd + Alt + L`       |
| 切换项目面板               | `Cmd + 1`             |
| 切换终端                   | `Alt + F12`           |
| 复制行                     | `Cmd + D`             |
| 删除行                     | `Cmd + Backspace`     |
| 上移/下移动行             | `Shift + Alt + 上/下` |
| 扩展/收缩选择             | `Alt + 上/下`         |
| 注释行                     | `Cmd + /`             |
| 返回 / 前进               | `Cmd + [` / `Cmd + ]` |
| 切换断点                   | `Ctrl + F8`           |

### 不同的快捷键 (IntelliJ → Zed)

| 操作                 | IntelliJ    | Zed (JetBrains 键盘映射)   |
| -------------------- | ----------- | ------------------------ |
| 文件结构             | `Cmd + F12` | `Cmd + F12` (大纲)       |
| 转到下一个错误       | `F2`        | `F2`                     |
| 运行                 | `Ctrl + R`  | `Ctrl + Alt + R` (任务)  |
| 调试                 | `Ctrl + D`  | `Alt + Shift + F9`       |
| 停止                 | `Cmd + F2`  | `Ctrl + F2`              |

### Zed 独有的快捷键

| 操作            | 快捷键                   | 备注                          |
| --------------- | ------------------------ | ------------------------------ |
| 切换右侧停靠栏   | `Cmd + R`                | 助手面板、通知                |
| 分割窗格         | `Cmd + K`，然后方向键    | 可向任意方向创建分割          |

### 如何自定义快捷键

- 打开命令面板 (`Cmd+Shift+A` 或 `Shift Shift`)
- 运行 `Zed: Open Keymap Editor`

这将打开所有可用绑定的列表。您可以覆盖单个快捷键或移除冲突。

Zed 还支持键序列（多键快捷键）。

## 用户界面的差异

### 无索引

如果您在大型项目上使用过 IntelliJ，您一定知道等待：“Indexing...” 根据项目大小可能需要 30 秒到 15 分钟不等。IntelliJ 构建整个代码库的全面索引以支持其代码智能，并且在依赖关系更改或构建后重新索引。

Zed 不进行索引。您打开一个文件夹即可立即开始工作。无论项目大小如何，文件搜索和导航都是即时的。

IntelliJ 的索引支持诸如在整个代码库中查找所有用法、理解类层次结构以及检测死代码等功能。Zed 将此工作委托给语言服务器，而语言服务器的分析深度可能不够。

**如何适应：**

- 对于项目范围的符号搜索，使用 `Cmd+O` / 跳转到符号（依赖于您的语言服务器）
- 对于按文件名查找文件，使用 `Cmd+Shift+O` / 跳转到文件
- 对于跨文件的文本搜索，使用 `Cmd+Shift+F`——这在大型代码库中速度很快
- 如果您需要对 JVM 代码进行深度静态分析，请考虑将 IntelliJ 的检查作为独立步骤运行，或使用诸如 Checkstyle、PMD 或 SpotBugs 之类的独立工具

### LSP 与原生语言智能

IntelliJ 为其支持的各种语言拥有自己构建的语言分析引擎。对于 Java、Kotlin 和其他 JVM 语言，该引擎能彻底理解您的代码：它可以解析类型、跟踪数据流、了解框架注释，并提供数十种专门的重构功能。

Zed 使用语言服务器协议 (LSP) 来实现代码智能。每种语言都有自己的服务器：Java 使用 `jdtls`，Rust 使用 `rust-analyzer`，等等。

对于某些语言，LSP 的体验非常出色。TypeScript、Rust 和 Go 拥有成熟的语言服务器，可以提供快速、准确的补全、诊断和重构功能。对于 JVM 语言，差距可能更为明显。基于 Eclipse 的 Java 语言服务器功能强大，但对于以下方面，它无法匹敌 IntelliJ 的深度：

- Spring 和 Jakarta EE 注释处理
- 复杂的重构（提取接口、将成员上拉、更改签名并更新所有调用方）
- 框架感知的检查
- 具有自定义排序规则的自动导入优化

**如何适应：**

- 使用 `Alt+Enter` 查看可用的代码操作——列表会因语言服务器而异
- 对于 Java，请确保在设置中正确配置了 `jdtls`，包括您的 JDK 路径

### 无项目模型

IntelliJ 通过包含 XML 配置文件、`.iml` 模块定义、SDK 分配和运行配置的 `.idea` 文件夹来管理项目。该模型使 IntelliJ 能够理解多模块项目、自动管理依赖项并保持复杂的运行/调试设置。

Zed 没有项目模型。项目就是一个文件夹。没有向导，没有 SDK 选择屏幕，没有模块配置。

这意味着：

- 构建命令是手动的。Zed 不会检测 Maven 或 Gradle 项目。
- 不存在运行配置。您需要定义任务或使用终端。
- SDK 管理是外部的。您的语言服务器使用 PATH 上的任何 JDK。
- 没有模块边界。Zed 看到的是文件夹，而不是项目结构。

**如何适应：**

- 在您的项目根目录中创建一个 `.zed/settings.json` 用于项目特定设置
- 在 `tasks.json` 中定义常用命令（通过命令面板打开：`zed: open tasks`）：

```json
[
  {
    "label": "build",
    "command": "./gradlew build"
  },
  {
    "label": "run",
    "command": "./gradlew bootRun"
  },
  {
    "label": "test current file",
    "command": "./gradlew test --tests $ZED_STEM"
  }
]
```

- 使用 `Ctrl+Alt+R` 快速运行任务
- 对于任务未涵盖的内容，依赖您的终端 (`Alt+F12`)
- 对于多模块项目，您可以将每个模块作为单独的 Zed 窗口打开，或者打开根目录并通过文件查找器进行导航

### 无框架集成

IntelliJ 在企业 Java 开发中的价值很大程度上源于其框架集成。Spring Bean 是可被理解和导航的。JPA 实体会得到特殊对待。端点被索引且可搜索。Jakarta EE 注释会修改 IDE 分析代码的方式。

Zed 没有这些功能。语言服务器将 Java 代码视为普通的 Java 代码，因此它不理解 `@Autowired` 有什么特殊含义，或者这个类是一个 REST 控制器。

其他框架也是如此：没有 Rails 集成，没有 Django 感知，除了 TypeScript 语言服务器提供的内容外，没有针对 Angular/React 的特定工具。

**如何适应：**

- 充分使用 grep 和文件搜索。使用正则表达式的 `Cmd+Shift+F` 可以找到端点定义、Bean 名称或注释用法。
- 依赖您的语言服务器的“查找引用” (`Alt+F7`) 进行导航——它有效，只是没有上下文感知
- 对于 Spring Boot，请保留 Actuator 端点或使用单独的工具来理解 Bean 的接线
- 考虑从 Zed 的终端使用框架特定的 CLI 工具（Spring CLI、Rails 生成器）

> **提示：** 对于数据库工作，请选择专门的工具，如 DataGrip、DBeaver 或 TablePlus。许多切换到 Zed 的开发人员会特意保留 DataGrip 用于 SQL——它与您现有的 JetBrains 许可证集成良好。

如果您的日常工作严重依赖框架感知的导航和重构，您会感觉到差距。当您习惯于通过搜索而不是专门的工具来导航代码，或者当您的语言拥有强大的 LSP 支持能覆盖您的大部分需求时，Zed 是最佳选择。

### 工具窗口与停靠栏

IntelliJ 将辅助视图组织成带编号的工具窗口（项目 = 1，Git = 9，终端 = Alt+F12 等）。Zed 使用一个类似的概念，称为“停靠栏”：

| IntelliJ 工具窗口 | Zed 对应项 | 快捷键 (JetBrains 键盘映射) |
| ----------------- | ---------- | --------------------------- |
| 项目 (1)          | 项目面板   | `Cmd + 1`                   |
| Git (9 或 Cmd+0)  | Git 面板   | `Cmd + 0`                   |
| 终端 (Alt+F12)    | 终端面板   | `Alt + F12`                 |
| 结构 (7)          | 大纲面板   | `Cmd + 7`                   |
| 问题 (6)          | 诊断       | `Cmd + 6`                   |
| 调试 (5)          | 调试面板   | `Cmd + 5`                   |

Zed 有三个停靠位置：左侧、底部和右侧。面板可以通过拖动或在设置中在停靠栏之间移动。

> **提示：** IntelliJ 有一个“覆盖 IDE 快捷键”的设置，它可以使 `Ctrl+Left/Right` 之类的终端快捷键正常工作。在 Zed 中，终端键盘绑定是分开的——如果熟悉的快捷键在终端面板中不起作用，请检查您的键盘映射。

### 调试

IntelliJ 和 Zed 都提供集成的调试体验，但有所不同：

- Zed 的调试器使用调试适配器协议 (DAP)，支持多种语言
- 使用 `Ctrl+F8` 设置断点
- 使用 `Alt+Shift+F9` 开始调试
- 使用 `F7`（单步进入）、`F8`（单步跳过）、`Shift+F8`（单步跳出）逐步执行代码
- 使用 `F9` 继续执行

调试面板 (`Cmd+5`) 显示变量、调用堆栈和断点——类似于 IntelliJ 的调试工具窗口。

### 扩展与插件

IntelliJ 拥有庞大的插件目录，涵盖从语言支持到数据库工具再到部署集成的一切。

Zed 的扩展目录更小且更专注：

- 语言支持和语法高亮
- 主题
- 用于 AI 的斜杠命令
- 上下文服务器

在其他编辑器中需要插件的几个功能是内置在 Zed 中的：

- 带语音聊天的实时协作
- AI 编码辅助
- 内置终端
- 任务运行器
- 基于 LSP 的代码智能

您不会为每个 IntelliJ 插件找到一一对应的替代品，特别是框架特定工具、数据库客户端或应用服务器集成。对于这些工作流程，您可能需要将外部工具与 Zed 结合使用。

## Zed 与 IntelliJ 中的协作

IntelliJ 通过名为 Code With Me 的独立插件提供协作功能。Zed 将协作功能构建到核心体验中。

- 打开左侧停靠栏中的协作面板
- 创建一个频道并[邀请您的协作者](https://zed.dev/docs/collaboration#inviting-a-collaborator)加入
- 直接[共享您的屏幕或代码库](https://zed.dev/docs/collaboration#share-a-project)

连接后，您会实时看到彼此的光标、选择和编辑。包含语音聊天。不需要单独的工具或第三方登录。

## 在 Zed 中使用 AI

如果您习惯于 IntelliJ 中的 AI 助手（如 GitHub Copilot 或 JetBrains AI），Zed 提供了更灵活的类似功能。

### 配置 GitHub Copilot

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 导航至 **AI → Edit Predictions**
3. 在“Configure Providers”旁边点击 **Configure**
4. 在 **GitHub Copilot** 下，点击 **Sign in to GitHub**

登录后，只需开始输入。Zed 将会内联提供建议供您接受。

### 其他 AI 选项

要在 Zed 中使用其他 AI 模型，您有几个选择：

- 使用 Zed 托管的模型，有更高的速率限制。需要 [身份验证](https://zed.dev/docs/authentication) 并订阅 [Zed Pro](https://zed.dev/docs/ai/subscription.html)。
- 使用您自己的 [API keys](https://zed.dev/docs/ai/llm-providers.html)，无需身份验证
- 使用 [外部智能体，如 Claude Agent](https://zed.dev/docs/ai/external-agents.html)

## 高级配置和生产力优化

Zed 为想要微调其环境的高级用户提供了高级设置。

这里有一些有用的技巧：

**保存时格式化：**

```json
"format_on_save": "on"
```

**启用 direnv 支持：**

```json
"load_direnv": "shell_hook"
```

**配置语言服务器**（需要手动 JSON 编辑）：对于 Java 开发，您可能需要在设置中配置 Java 语言服务器：

```json
{
  "lsp": {
    "jdtls": {
      "settings": {
        "java_home": "/path/to/jdk"
      }
    }
  }
}
```

## 下一步

现在您已经设置好了，以下是一些资源可帮助您充分利用 Zed：

- [所有设置](../reference/all-settings.md) — 自定义设置、主题和编辑器行为
- [键盘绑定](../key-bindings.md) — 学习如何自定义和扩展您的键盘映射
- [任务](../tasks.md) — 为您的项目设置构建和运行命令
- [AI 功能](../ai/overview.md) — 探索 Zed 超出代码补全的 AI 能力
- [协作](../collaboration/overview.md) — 实时共享您的项目和代码
- [语言支持](../languages.md) — 特定语言的设置指南，包括 Java 和 Kotlin
