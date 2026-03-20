---
title: 如何从 PyCharm 迁移到 Zed
description: "从 PyCharm 迁移到 Zed 的指南，包括设置和快捷键。"
---

# 从 PyCharm 迁移

本指南介绍如果您来自 PyCharm，如何设置 Zed，包括快捷键、设置以及您应该预期的差异。

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

对于大多数 Linux 用户，安装 Zed 最简单的方法是通过我们的安装脚本：

```sh
curl -f https://zed.dev/install.sh | sh
```

安装后，您可以从应用程序文件夹（macOS）、开始菜单（Windows）启动 Zed，或直接从终端使用以下命令启动：
`zed .`
这将在 Zed 中打开当前目录。

## 设置 JetBrains 键盘映射

如果您来自 PyCharm，感觉最熟悉的快速方式是使用 JetBrains 键盘映射。在入门过程中，您可以选择它作为基础键盘映射。如果错过了该步骤，您可以随时更改：

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 搜索 `Base Keymap`
3. 选择 `JetBrains`

这会将熟悉的快捷键（如 `Shift Shift` 用于搜索任何位置、`Cmd+O` 用于跳转到类、`Cmd+Shift+A` 用于查找操作）进行映射。

## 设置编辑器首选项

您可以在设置编辑器 ({#kb zed::OpenSettings}) 中配置大多数设置。对于高级设置，从命令面板运行 `zed: open settings file` 以直接编辑您的设置文件。

PyCharm 用户通常首先配置的���置：

| Zed 设置 | 作用 |
| ----------------------- | ------------------------------------------------------------------------------- |
| `format_on_save` | 保存时自动格式化。设置为 `"on"` 以启用。 |
| `soft_wrap` | 换行长行。选项：`"none"`, `"editor_width"`, `"preferred_line_length"` |
| `preferred_line_length` | 换行和标尺的列宽。默认为 80，PEP 8 建议为 79。 |
| `inlay_hints` | 内联显示参数名称和类型提示，类似于 PyCharm 的提示。 |
| `relative_line_numbers` | 如果您来自 IdeaVim，则很有用。 |

Zed 还支持按项目设置。在您的项目根目录创建一个 `.zed/settings.json` 文件，以覆盖该项目的全局设置，类似于您在 PyCharm 中使用 `.idea` 文件夹的方式。

> **提示：** 如果您要加入现有项目，请在进行第一次提交之前检查 `format_on_save`。否则，当您只想更改一行时，可能会意外地重新格式化整个文件。

## 打开或创建项目

设置完成后，按 `Cmd+Shift+O`（使用 JetBrains 键盘映射）打开一个文件夹。这将成为您在 Zed 中的工作区。与 PyCharm 不同，没有项目配置向导，没有解释器选择对话框，也不需要项目结构设置。

要启动新项目，请使用终端或文件管理器创建一个目录，然后在 Zed 中打开它。编辑器会将该文件夹视为您项目的根目录。

您还可以从终端在任何文件夹内启动 Zed：
`zed .`

进入项目后：

- 使用 `Cmd+Shift+O` 或 `Cmd+E` 在文件之间快速跳转（类似于 PyCharm 的“最近文件”）
- 使用 `Cmd+Shift+A` 或 `Shift Shift` 打开命令面板（类似于 PyCharm 的“搜索任何位置”）
- 使用 `Cmd+O` 搜索符号（类似于 PyCharm 的“跳转到符号”）

打开的缓冲区显示为顶部的标签页。项目面板显示您的文件树和 Git 状态。使用 `Cmd+1` 切换它（就像 PyCharm 的项目工具窗口一样）。

## 快捷键的差异

如果在入门过程中选择了 JetBrains 键盘映射，您的大多数快捷键应该已经感觉很熟悉。以下是一份快速参考，说明 Zed 与 PyCharm 的比较情况。

### 常用共享快捷键

| 操作 | 快捷键 |
| ----------------------------- | ----------------------- |
| 搜索任何位置 | `Shift Shift` |
| 查找操作/命令面板 | `Cmd + Shift + A` |
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
| 上移/下移行 | `Shift + Alt + Up/Down` |
| 展开/缩小选择 | `Alt + Up/Down` |
| 注释行 | `Cmd + /` |
| 后退/前进 | `Cmd + [` / `Cmd + ]` |
| 切换断点 | `Ctrl + F8` |

### 不同的快捷键（PyCharm → Zed）

| 操作 | PyCharm | Zed (JetBrains 键盘映射) |
| ---------------------- | ----------- | ------------------------ |
| 文件结构 | `Cmd + F12` | `Cmd + F12` (大纲) |
| 跳转到下一个错误 | `F2` | `F2` |
| 运行 | `Ctrl + R` | `Ctrl + Alt + R` (任务) |
| 调试 | `Ctrl + D` | `Alt + Shift + F9` |
| 停止 | `Cmd + F2` | `Ctrl + F2` |

### Zed 独有的功能

| 操作 | 快捷键 | 备注 |
| ----------------- | -------------------------- | ------------------------------ |
| 切换右侧面板 | `Cmd + R` | 助手面板、通知 |
| 拆分面板 | `Cmd + K`，然后方向键 | 在任何方向创建拆分 |

### 如何自定义快捷键

- 打开命令面板 (`Cmd+Shift+A` 或 `Shift Shift`)
- 运行 `Zed: Open Keymap Editor`

这将打开所有可用绑定的列表。您可以覆盖单个快捷键或删除冲突项。

Zed 还支持键序列（多键快捷键）。

## 用户界面的差异

### 无索引

如果您在大型项目中使用过 PyCharm，您就知道等待的痛苦：“正在索引...”可能需要 30 秒到几分钟不等，具体取决于项目大小和依赖项。PyCharm 构建整个代码库的全面索引以支持其代码智能，并且在依赖项更改或安装新包时它会重新索引。

Zed 不进行索引。您打开一个文件夹并立即开始工作。无论项目大小如何，文件搜索和导航都保持快速，无需等待索引暂停。

PyCharm 的索引支持诸如在整个代码库中查找所有用法、理解类层次结构和检测项目范围内未使用的导入等功能。Zed 将这项工作委托给语言服务器，语言服务器的分析深度或广度可能不及前者。

**如何适应：**

- 对于项目范围内的符号搜索，使用 `Cmd+O` / 跳转到符号（依赖于您的语言服务器）
- 对于按文件名查找文件，使用 `Cmd+Shift+O` / 跳转到文件
- 对于跨文件文本搜索，使用 `Cmd+Shift+F`——这在大型代码库中速度很快
- 对于深度静态分析，考虑从终端运行 `mypy`、`pylint` 或 `ruff check` 等工具

### LSP 与原生语言智能

PyCharm 拥有专门为 Python 构建的语言分析引擎。该引擎深度理解您的代码：它可以解析没有注解的类型，跟踪数据流，了解 Django 模型和 Flask 路由，并提供专门的重构功能。

Zed 使用语言服务器协议 (LSP) 进行代码智能处理。对于 Python，Zed 开箱即用地提供了多种语言服务器：

- **basedpyright** (默认) — 快速类型检查和代码补全
- **Ruff** (默认) — 代码检查和格式化
- **ty** — 来自 Astral 的新兴语言服务器，为速度而构建
- **Pyright** — 微软的类型检查器
- **PyLSP** — 具有工具集成的插件式服务器

Python 的 LSP 体验很强大。basedpyright 提供准确的代码补全、类型检查和导航。Ruff 以出色的性能处理格式化和代码检查。

您可能会注意到差异的地方：

- 框架特定的智能（Django ORM、Flask 路由）不是内置的
- 一些复杂的重构（带有适当作用域分析的重构方法）可能不够完善
- 自动导入建议取决于语言服务器对您环境的了解程度

**如何适应：**

- 使用 `Alt+Enter` 获取可用的代码操作——列表会因语言服务器而异
- 确保选择了您的虚拟环境，以便语言服务器可以解析您的依赖项
- 使用 Ruff 进行快速、一致的格式化（默认已启用）
- 对于类似于 PyCharm 的“检查代码”的代码检查，运行 `ruff check .` 或检查诊断面板 (`Cmd+6`)——basedpyright 和 Ruff 一起能捕获许多相同的问题

### 虚拟环境和解释器

在 PyCharm 中，您通过 GUI 选择 Python 解释器，PyCharm 管理您的项目与该解释器之间的连接。它显示可用的包，让您安装新包，并跟踪每个项目使用哪个环境。

Zed 通��其工具链系统处理虚拟环境：

- Zed 自动发现常见位置（`.venv`、`venv`、`.env`、`env`）中的虚拟环境
- 检测到虚拟环境时，终端会自动激活它
- 语言服务器会自动配置为使用发现的环境
- 如果自动检测选择了错误的工具链，您可以手动选择

**如何适应：**

- 使用 `python -m venv .venv` 或 `uv sync` 创建您的虚拟环境
- 在 Zed 中打开文件夹——它会自动检测环境
- 如果需要切换环境，请使用工具链选择器
- 对于 conda 环境，请在启动 Zed 之前确保它们在您的 shell 中已激活

> **提示：** 如果 basedpyright 显示您已安装的包的导入错误，请检查 Zed 是否选择了正确的虚拟环境。使用工具链选择器验证或更改活动环境。

### 无项目模型

PyCharm 通过包含 XML 配置文件、解释器分配和运行配置的 `.idea` 文件夹来管理项目。该模型让 PyCharm 能够记住您的解释器选择，通过 UI 管理依赖项，并保持复杂的运行/调试设置。

Zed 没有项目模型。项目就是一个文件夹。没有向导，没有解释器选择屏幕，没有项目结构配置。

这意味着：

- 不存在运行配置。您在 `tasks.json` 中定义任务或使用终端。您的 `.idea/` 中现有的 PyCharm 运行配置不会被读取——您需要在 `tasks.json` 中重新创建需要的配置。
- 解释器管理是外部的。Zed 发现环境但不创建它们。
- 依赖项通过 pip、uv、poetry 或 conda 进行管理——不是通过编辑器。
- 没有 Python 控制台（交互式 REPL）面板。在终端中使用 `python` 或 `ipython` 代替。

**如何适应：**

- 在您的项目根目录创建一个 `.zed/settings.json` 用于项目特定设置
- 在 `tasks.json` 中定义常用命令（通过命令面板打开：`zed: open tasks`）：

```json
[
  {
    "label": "run",
    "command": "python main.py"
  },
  {
    "label": "test",
    "command": "pytest"
  },
  {
    "label": "test current file",
    "command": "pytest $ZED_FILE"
  }
]
```

- 使用 `Ctrl+Alt+R` 快速运行任务
- 对于任务未涵盖的任何内容，依赖您的终端 (`Alt+F12`)

### 无框架集成

PyCharm Professional 在 Web 开发中的价值主要来自其框架集成。Django 模板是可理解和可导航的。Flask 路由被索引。SQLAlchemy 模型得到特殊处理。模板变量可以自动补全。

Zed 没有这些功能。语言服务器将 Python 代码视为普通的 Python 代码——它不理解 `@app.route` 定义了一个端点，或者 Django 模型类创建了数据库表。

**如何适应：**

- 充分使用 grep 和文件搜索。使用带正则表达式的 `Cmd+Shift+F` 可以找到路由定义、模型类或模板用法。
- 依赖语言服务器的“查找引用” (`Alt+F7`) 进行导航——它确实有效，只是没有框架上下文
- 考虑从 Zed 的终端使用框架特定的 CLI 工具（`python manage.py`、`flask routes`）

> **提示：** 对于数据库工作，选择专用的工具，如 DataGrip、DBeaver 或 TablePlus。许多切换到 Zed 的开发者会专门保留 DataGrip 用于 SQL。

### 工具窗口与停靠面板

PyCharm 将辅助视图组织到编号的工具窗口中（项目 = 1，Python 控制台 = 4，终端 = Alt+F12 等）。Zed 使用一个类似的概念称为“停靠面板”：

| PyCharm 工具窗口 | Zed 等效项 | 快捷键 (JetBrains 键盘映射) |
| ------------------- | -------------- | --------------------------- |
| Project (1) | Project Panel | `Cmd + 1` |
| Git (9 or Cmd+0) | Git Panel | `Cmd + 0` |
| Terminal (Alt+F12) | Terminal Panel | `Alt + F12` |
| Structure (7) | Outline Panel | `Cmd + 7` |
| Problems (6) | Diagnostics | `Cmd + 6` |
| Debug (5) | Debug Panel | `Cmd + 5` |

Zed 有三个停靠位置：左侧、底部和右侧。面板可以通过拖动或通过设置在停靠面板之间移动。

### 调试

PyCharm 和 Zed 都提供集成的调试功能，但体验有所不同：

- Zed 使用 `debugpy`（与 VS Code 使用的相同调试适配器）
- 使用 `Ctrl+F8` 设置断点
- 使用 `Alt+Shift+F9` 启动调试，或按 `F4` 并选择调试目标
- 使用 `F7`（单步进入）、`F8`（单步跳过）、`Shift+F8`（单步跳出）逐步执行代码
- 使用 `F9` 继续执行

Zed 可以自动检测可调试的入口点。按 `F4` 查看可用选项，包括：

- Python 脚本
- 模块
- pytest 测试

要获得更多控制，请创建一个 `.zed/debug.json` 文件：

```json
[
  {
    "label": "Debug Current File",
    "adapter": "Debugpy",
    "program": "$ZED_FILE",
    "request": "launch"
  },
  {
    "label": "Debug Flask App",
    "adapter": "Debugpy",
    "request": "launch",
    "module": "flask",
    "args": ["run", "--debug"],
    "env": {
      "FLASK_APP": "app.py"
    }
  }
]
```

### 运行测试

PyCharm 具有专用的测试运行器，带有显示每个测试通过/失败状态的视觉界面。Zed 通过以下方式提供测试运行：

- **边缘图标** — 单击测试函数或类旁边的播放按钮
- **任务** — 在 `tasks.json` 中定义 pytest 或 unittest 命令
- **终端** — 直接运行 `pytest`

测试输出出现在终端面板中。对于 pytest，使用 `--tb=short` 获取简洁的回溯信息，或使用 `-v` 获取详细输出。

### 扩展与插件

PyCharm 拥有庞大的插件目录，涵盖从额外语言支持到数据库工具再到部署集成的一切。

Zed 的扩展目录更小且更专注：

- 语言支持和语法高亮
- 主题
- AI 的斜杠命令
- 上下文服务器

许多在 PyCharm 中需要插件的功能已内置在 Zed 中：

- 具有语音聊天的实时协作
- AI 编码辅助
- 内置终端
- 任务运行器
- 基于 LSP 的代码智能
- Ruff 格式化和代码检查

### Zed 中没有的功能

为了明确期望，以下是 PyCharm 提供而 Zed 没有的功能：

- **科学模式 / Jupyter 集成** — 对于笔记本和数据工作流，请使用 JupyterLab 或 VS Code 以及 Jupyter 扩展，同时使用 Zed 进行 Python 编辑
- **数据库工具** — 使用 DataGrip、DBeaver 或 TablePlus
- **Django/Flask 模板导航** — 使用文件搜索和 grep
- **可视化包管理器** — 从终端使用 pip、uv 或 poetry
- **远程解释器** — Zed 具有远程开发功能，但工作方式不同
- **分析器集成** — 外部使用 cProfile、py-spy 或类似工具

## Zed 与 PyCharm 中的协作

PyCharm 提供 Code With Me 作为单独的插件用于协作。Zed 将协作构建到核心体验中。

- 在左侧停靠面板中打开 Collab 面板
- 创建一个频道并[邀请您的协作者](https://zed.dev/docs/collaboration#inviting-a-collaborator)加入
- [直接共享您的屏幕或代码库](https://zed.dev/docs/collaboration#share-a-project)

连接后，您将实时看到彼此的光标、选择和编辑。包含语音聊天。无需单独的工具或第三方登录。

## 在 Zed 中使用 AI

如果您习惯了 PyCharm 中的 AI 助手（如 GitHub Copilot 或 JetBrains AI Assistant），Zed 提供了类似但更灵活的功能。

### 配置 GitHub Copilot

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 导航至 **AI → Edit Predictions**
3. 在“Configure Providers”旁边点击 **Configure**
4. 在 **GitHub Copilot** 下，点击 **Sign in to GitHub**

登录后，只需开始输入。Zed 将会提供内联建议供您接受。

### 其他 AI 选项

要在 Zed 中使用其他 AI 模型，您有几个选择：

- 使用 Zed 托管的模型，具有更高的速率限制。需要[身份验证](https://zed.dev/docs/authentication)并订阅 [Zed Pro](https://zed.dev/docs/ai/subscription.html)。
- 使用您自己的[API 密钥](https://zed.dev/docs/ai/llm-providers.html)，无需身份验证
- 使用[外部智能体，如 Claude Agent](https://zed.dev/docs/ai/external-agents.html)

## 高级配置和生产力调整

Zed 为想要微调其环境的高级用户提供了高级设置。

以下是一些有用的调整：

**保存时格式化：**

```json
"format_on_save": "on"
```

**启用 direnv 支持（对使用 direnv 的 Python 项目很有用）：**

```json
"load_direnv": "shell_hook"
```

**自定义虚拟环境检测**（需要手动 JSON 编辑）：

```json
{
  "terminal": {
    "detect_venv": {
      "on": {
        "directories": [".venv", "venv", ".env", "env"],
        "activate_script": "default"
      }
    }
  }
}
```

**配置 basedpyright 类型检查严格性：**

如果您发现 basedpyright 太严格或太宽松，请在项目的 `pyrightconfig.json` 中进行配置：

```json
{
  "typeCheckingMode": "basic"
}
```

选项有 `"off"`、`"basic"`、`"standard"`（默认）、`"strict"` 或 `"all"`。

## 下一步

既然您已经设置完成，以下是一些资源可帮助您充分利用 Zed：

- [所有设置](../reference/all-settings.md) — 自定义设置、主题和编辑器行为
- [快捷键](../key-bindings.md) — 了解如何自定义和扩展您的键盘映射
- [任务](../tasks.md) — 为您的项目设置构建和运行命令
- [AI 功能](../ai/overview.md) — 探索 Zed 超出代码补全的 AI 功能
- [协作](../collaboration/overview.md) — 实时共享您的项目和代码
- [Python in Zed](../languages/python.md) — Python 特定的设置和配置
