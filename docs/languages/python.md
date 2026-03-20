---
title: Python
description: "在 Zed 中配置 Python 语言支持，包括语言服务器、格式化和调试。"
---

# 如何在 Zed 中设置 Python

Python 支持在 Zed 中原生提供。

- Tree-sitter: [tree-sitter-python](https://github.com/zed-industries/tree-sitter-python)
- 语言服务器:
  - [DetachHead/basedpyright](https://github.com/DetachHead/basedpyright)
  - [astral-sh/ruff](https://github.com/astral-sh/ruff)
  - [astral-sh/ty](https://github.com/astral-sh/ty)
  - [microsoft/pyright](https://github.com/microsoft/pyright)
  - [python-lsp/python-lsp-server](https://github.com/python-lsp/python-lsp-server) (PyLSP)
- 调试适配器: [debugpy](https://github.com/microsoft/debugpy)

## 安装 Python

在开始之前，你需要同时安装 Zed 和 Python。

### 第 1 步：安装 Python

Zed 不捆绑 Python 运行时，因此您需要自己安装一个。
从以下选项中选择一个：

- uv (推荐)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

要了解更多信息，请访问 [Astral 的安装指南](https://docs.astral.sh/uv/getting-started/installation/)。

- Homebrew:

```bash
brew install python
```

- Python.org 安装程序：从 [python.org/downloads](https://python.org/downloads) 下载最新版本。

### 第 2 步：验证 Python 安装

确认 Python 已在您的 shell 中安装并可用：

```bash
python3 --version
```

您应该会看到类似 `Python 3.x.x` 的输出。

## 在 Zed 中打开您的第一个 Python 项目

安装 Zed 和 Python 后，打开一个包含 Python 代码的文件夹即可开始工作。

### 第 1 步：使用 Python 项目启动 Zed

打开 Zed。
从菜单栏中，选择文件 > 打开文件夹，或从终端启动：

```bash
zed path/to/your/project
```

Zed 将使用其原生的 tree-sitter-python 解析器自动识别 `.py` 文件，无需插件或手动设置。

### 第 2 步：使用集成终端 (可选)

Zed 包含一个集成终端，可通过底部面板访问。如果 Zed 检测到您的项目正在使用 [虚拟环境](#virtual-environments)，它将在新创建的终端中自动激活。您可以使用 [`detect_venv`](../reference/all-settings.md#terminal-detect_venv) 设置来配置此行为。

## 在 Zed 中配置 Python 语言服务器

Zed 开箱即用提供了多个 Python 语言服务器。默认情况下，[basedpyright](https://github.com/DetachHead/basedpyright) 是主要的语言服务器，[Ruff](https://github.com/astral-sh/ruff) 用于格式化和代码检查。

其他内置语言服务器有：

- [ty](https://docs.astral.sh/ty/)&mdash;来自 Astral 的新兴语言服务器，为速度而构建。
- [Pyright](https://github.com/microsoft/pyright)&mdash;basedpyright 的基础。
- [PyLSP](https://github.com/python-lsp/python-lsp-server)&mdash;基于插件的语言服务器，可与 `pycodestyle`、`autopep8` 和 `yapf` 等工具集成。

这些默认处于禁用状态，但可以在您的设置中启用。

在设置 ({#kb zed::OpenSettings}) 下的语言 > Python 中配置语言服务器，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Python": {
      "language_servers": [
        // 启用 ty，禁用 basedpyright，并启用所有其他
        // 已注册的语言服务器（ruff, pylsp, pyright）。
        "ty",
        "!basedpyright",
        "..."
      ]
    }
  }
}
```
有关如何启用和禁用语言服务器的更多信息，请参见：[使用语言服务器](https://zed.dev/docs/configuring-languages#working-with-language-servers)。

### Basedpyright

从 Zed v0.204.0 开始，[basedpyright](https://docs.basedpyright.com/latest/) 是 Zed 中主要的 Python 语言服务器。它提供核心语言服务器功能，如导航（转到定义/查找所有引用）和类型检查。与 Pyright 相比，它增加了对额外的语言服务器功能（如内联提示）和检查规则的支持。

请注意，虽然独立的 basedpyright 默认使用 `recommended` [类型检查模式](https://docs.basedpyright.com/latest/benefits-over-pyright/better-defaults/#typecheckingmode)，但 Zed 默认将其配置为使用不太严格的 `standard` 模式，这与 Pyright 的行为相匹配。您可以在 `pyrightconfig.json` 或 `pyproject.toml` 中使用 `typeCheckingMode` 设置为您项目设置类型检查模式，这将覆盖 Zed 的默认设置。继续阅读以获取有关如何配置 basedpyright 的更多详细信息。

#### Basedpyright 配置

basedpyright 从两种不同类型的源读取配置选项：

- 语言服务器设置（“工作区配置”），必须按编辑器配置（在 Zed 中使用 `settings.json`），但适用于在该编辑器中打开的所有项目
- 配置文件 (`pyrightconfig.json`, `pyproject.toml`)，它们与编辑器无关，但特定于放置它们的项目

根据经验，仅当从编辑器使用 basedpyright 时才相关的选项必须设置在语言服务器设置中，并且即使您将其[作为命令行工具](https://docs.basedpyright.com/latest/configuration/command-line/)运行时也相关的选项必须设置在配置文件中。与内联提示相关的设置是第一类别的示例，而[诊断类别](https://docs.basedpyright.com/latest/configuration/config-files/#diagnostic-categories)设置是第二类别的示例。

下面提供了两种配置的示例。有关可用选项的完整列表，请参阅基于 pyright 的文档 [语言服务器设置](https://docs.basedpyright.com/latest/configuration/language-server-settings/) 和 [配置文件](https://docs.basedpyright.com/latest/configuration/config-files/)。

##### 语言服务器设置

在 Zed 中，basedpyright 的语言服务器设置可以在 `settings.json` 的 `lsp` 部分中设置。

例如，要：

- 诊断工作区中的所有文件，而不仅仅是默认的打开文件
- 禁用函数参数的内联提示

您可以使用以下配置：

```json [settings]
{
  "lsp": {
    "basedpyright": {
      "settings": {
        "basedpyright.analysis": {
          "diagnosticMode": "workspace",
          "inlayHints": {
            "callArgumentNames": false
          }
        }
      }
    }
  }
}
```

##### 配置文件

basedpyright 从 `pyrightconfig.json` 配置文件以及 `pyproject.toml` 清单中的 `[tool.basedpyright]` 和 `[tool.pyright]` 部分读取项目特定的配置。如果两个地方都存在配置，`pyrightconfig.json` 将覆盖 `pyproject.toml`。

这是一个示例 `pyrightconfig.json` 文件，它将 basedpyright 配置为使用 `strict` 类型检查模式，并且不为 `__pycache__` 目录中的任何文件发出诊断信息：

```json
{
  "typeCheckingMode": "strict",
  "ignore": ["**/__pycache__"]
}
```

### PyLSP

[python-lsp-server](https://github.com/python-lsp/python-lsp-server/)，更常被称为 PyLSP，默认集成了许多外部工具（autopep8, mccabe, pycodestyle, yapf），而其他一些是可选的，必须明确启用和配置（flake8, pylint）。

有关更多信息，请参见 [Python 语言服务器配置](https://github.com/python-lsp/python-lsp-server/blob/develop/CONFIGURATION.md)。

## 虚拟环境

[虚拟环境](https://docs.python.org/3/library/venv.html) 是一个有用的工具，用于为特定项目固定 Python 版本和依赖集，并且与同一台机器上的其他项目隔离。Zed 内置了对发现、配置和激活虚拟环境的支持，这基于与语言无关的 [toolchain](../toolchains.md) 概念。

请注意，如果您有一个全局 Python 安装，出于 Zed 的目的，它也被计为一个 toolchain。

### 创建虚拟环境

如果您的项目还没有设置虚拟环��，可以按如下方式创建：

```bash
python3 -m venv .venv
```

或者，如果您使用的是 `uv`，第一次运行 `uv sync` 将会创建一个虚拟环境。

### Zed 如何使用 Python Toolchain

Zed 通过以下方式为您的项目使用所选的 Python toolchain：

- 内置语言服务器将自动配置为使用 toolchain 的 Python 解释器路径，并且如果适用，还有虚拟环境。这对于它们能够解析依赖关系非常重要。（请注意，目前扩展提供的语言服务器无法像这样自动配置。）
- Python 任务（例如 pytest 测试）将使用 toolchain 的 Python 解释器运行。
- 如果 toolchain 是一个虚拟环境，当您在 Zed 的集成终端中启动新 shell 时，环境的激活脚本将自动运行，从而为您提供对所选 Python 解释器和依赖集的便捷访问。
- 如果内置语言服务器安装在活动的虚拟环境中，将使用该二进制文件，而不是 Zed 的私有自动安装的二进制文件。这也适用于 debugpy。

### 选择 Toolchain

对于大多数项目，Zed 将自动选择正确的 Python toolchain。在具有多个虚拟环境的复杂项目中，可能需要覆盖此选择。您可以使用 [toolchain 选择器](../toolchains.md#selecting-toolchains) 从 Zed 发现的列表中选择一个 toolchain，或者如果它不在列表中，[手动指定 toolchain 的路径](../toolchains.md#adding-toolchains-manually)。

## 代码格式化和代码检查

Zed 使用 [Ruff](https://github.com/astral-sh/ruff) 来格式化和检查 Python 代码。具体来说，它使用 `ruff server` 子命令将 Ruff 作为 LSP 服务器运行。

### 配置格式化

Zed 中的格式化遵循一个两阶段管道：首先，执行格式化上的代码操作 (`code_actions_on_format`)，然后是配置的格式化器。

在设置 ({#kb zed::OpenSettings}) 下的语言 > Python 中配置格式化，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Python": {
      "code_actions_on_format": {
        "source.organizeImports.ruff": true
      },
      "formatter": {
        "language_server": {
          "name": "ruff"
        }
      }
    }
  }
}
```

这两个阶段是独立的。例如，如果您更喜欢使用 [Black](https://github.com/psf/black) 进行代码格式化，但又想保留 Ruff 的导入排序，则只需更改格式化器阶段即可。

在设置 ({#kb zed::OpenSettings}) 下的语言 > Python 中配置，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Python": {
      "code_actions_on_format": {
        // 第 1 阶段：Ruff 仍然处理导入整理
        "source.organizeImports.ruff": true
      },
      "formatter": {
        // 第 2 阶段：Black 处理格式化
        "external": {
          "command": "black",
          "arguments": ["--stdin-filename", "{buffer_path}", "-"]
        }
      }
    }
  }
}
```

要完全切换到另一个工具并完全防止 Ruff 修改您的代码，除了更改格式化器外，您还必须在 `code_actions_on_format` 部分将 `source.organizeImports.ruff` 明确设置为 false。

要在保存时禁用任何格式化操作，您可以禁用 Python 文件的保存时格式化。

在设置 ({#kb zed::OpenSettings}) 下的语言 > Python 中配置，或将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Python": {
      "format_on_save": "off"
    }
  }
}
```

### 配置 Ruff

与 basedpyright 一样，在 Zed 中使用时，Ruff 会从 Zed 的语言服务器设置和配置文件 (`ruff.toml`) 中读取选项。与 basedpyright 不同，_所有_ 选项都可以在这两个位置中的任何一个进行配置，因此，将 Ruff 配置放在哪里的选择归结为您是希望它在项目之间共享但特定于 Zed（在这种情况下，您应该使用语言服务器设置），还是特定于一个项目但在所有 Ruff 调用中通用（在这种情况下，您应该使用 `ruff.toml`）。

下面是在 Zed 的 `settings.json` 中使用语言服务器设置来禁用 Zed 中所有 Ruff 代码检查（同时仍将 Ruff 用作格式化器）的示例：

```json [settings]
{
  "lsp": {
    "ruff": {
      "initialization_options": {
        "settings": {
          "exclude": ["*"]
        }
      }
    }
  }
}
```

下面是一个带有代码检查和格式化选项的 `ruff.toml` 示例，改编自 Ruff 文档：

```toml
[lint]
# 避免强制执行行长度违规 (`E501`)
ignore = ["E501"]

[format]
# 格式化时使用单引号。
quote-style = "single"
```

有关更多详细信息，请参阅 Ruff 关于 [配置文件](https://docs.astral.sh/ruff/configuration/) 和 [语言服务器设置](https://docs.astral.sh/ruff/editors/settings/) 的文档，以及 [选项列表](https://docs.astral.sh/ruff/settings/)。

### 嵌入式语言高亮

Zed 支持对嵌入在 Python 字符串中的代码进行语法高亮，方法是用注释添加语言名称。

```python
# sql
query = "SELECT * FROM users"

#sql
query = """
    SELECT *
    FROM users
"""

result = func( #sql
    "SELECT * FROM users"
)
```

## 调试

Zed 通过 `debugpy` 适配器支持 Python 调试。您可以从无配置开始，或者在 `.zed/debug.json` 中定义自定义启动配置。

### 无设置开始调试

Zed 可以自动检测可调试的 Python 入口点。按 F4（或从命令面板运行 debugger: start）查看您当前项目的可用选项。
这适用于：

- Python 脚本
- 模块
- pytest 测试

Zed 在后台使用 `debugpy`，但不需要手动适配器配置。

### 定义自定义调试配置

对于可重用的设置，请在您的项目根目录中创建一个 `.zed/debug.json` 文件。这使您可以更好地控制 Zed 如何运行和调试您的代码。

- [debugpy 配置文档](https://github.com/microsoft/debugpy/wiki/Debug-configuration-settings#launchattach-settings)

#### 调试活动文件

```json [debug]
[
  {
    "label": "Python Active File",
    "adapter": "Debugpy",
    "program": "$ZED_FILE",
    "request": "launch"
  }
]
```

这会运行当前在编辑器中打开的文件。

#### 调试 Flask 应用

对于使用 Flask 的项目，您可以定义完整的启动配置：

```
.venv/
app/
  init.py
  main.py
  routes.py
templates/
  index.html
static/
  style.css
requirements.txt
```

...可以使用以下配置：

```json [debug]
[
  {
    "label": "Python: Flask",
    "adapter": "Debugpy",
    "request": "launch",
    "module": "app",
    "cwd": "$ZED_WORKTREE_ROOT",
    "env": {
      "FLASK_APP": "app",
      "FLASK_DEBUG": "1"
    },
    "args": [
      "run",
      "--reload", // 启用监视文件更改的 Flask 重新加载器
      "--debugger" // 启用 Flask 调试器
    ],
    "autoReload": {
      "enable": true
    },
    "jinja": true,
    "justMyCode": true
  }
]
```

可以组合这些配置，以针对 Web 服务器、测试运行器或自定义脚本定制体验。

## 故障排除

Zed 中 Python 的问题通常涉及虚拟环境、语言服务器或工具配置。

### 解决语言服务器启动问题

如果语言服务器未响应，或者诸如诊断或自动补全等功能不可用：

- 检查您的 Zed 日志（使用 {#action zed::OpenLog} 操作）以查找与您尝试使用的语言服务器相关的错误。如果语言服务器根本无法启动，您可能会在这里找到有用的信息。
- 使用语言服务器日志视图来了解受影响语言服务器的生命周期。您可以使用 {#action dev::OpenLanguageServerLogs} 操作访问此视图，或通过单击状态栏中的闪电图标并选择您的语言服务器。此视图中最有用的数据是：
  - “服务器日志”，显示语言服务器打印的任何错误
  - “服务器信息”，显示有关语言服务器启动方式详细信息
- 验证您的 `settings.json` 或 `pyrightconfig.json` 语法是否正确。
- 重启 Zed 以重新初始化语言服务器连接，或尝试使用 {#action editor::RestartLanguageServer} 操作重启语言服务器。

如果语言服务器未能解析导入，并且您正在使用虚拟环境，请确保选择器中选择了正确的环境。您可以使用“服务器信息”视图来确认 Zed 发送给语言服务器的虚拟环境&mdash;查找末尾的 `* Configuration` 部分。