---
title: 内置终端 - Zed
description: Zed 的集成终端，支持多实例、自定义 shell 和深度编辑器集成。
---

# 终端

Zed 包含一个内置的终端模拟器，支持多终端实例、自定义 shell 和与编辑器的深度集成。

## 打开终端

| 操作                   | macOS           | Linux/Windows   |
| ----------------------- | --------------- | --------------- |
| 切换终端面板           | `` Ctrl+` ``    | `` Ctrl+` ``    |
| 打开新终端             | `Ctrl+~`        | `Ctrl+~`        |
| 在中心打开终端         | 命令面板        | 命令面板        |

您也可以从命令面板中使用 `terminal panel: toggle` 或 `workspace: new terminal` 打开终端。

### 终端面板与中心终端

终端可以在两个位置打开：

- **终端面板** — 默认停靠在工作区的底部、左侧或右侧。使用 `` Ctrl+` `` 切换。
- **中心窗格** — 作为常规标签页与您的文件一起打开。从命令面板中使用 `workspace: new center terminal`。

## 使用多个终端

在终端面板中聚焦时，使用 `Cmd+N` (macOS) 或 `Ctrl+N` (Linux/Windows) 创建更多终端。每个终端都会作为面板中的一个标签页出现。

使用 `Cmd+D` (macOS) 或 `Ctrl+Shift+5` (Linux/Windows) 水平分割终端。

## 配置 Shell

默认情况下，Zed 使用您系统的默认 shell（在 Unix 系统上为 `/etc/passwd` 中的 shell）。要使用不同的 shell：

```json [settings]
{
  "terminal": {
    "shell": {
      "program": "/bin/zsh"
    }
  }
}
```

要向您的 shell 传递参数：

```json [settings]
{
  "terminal": {
    "shell": {
      "with_arguments": {
        "program": "/bin/bash",
        "args": ["--login"]
      }
    }
  }
}
```

## 工作目录

控制新终端的启动位置：

| 值                                         | 行为                                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `"current_file_directory"`                    | 使用当前文件的目录，如果不可用则回退到项目目录，再回退到工作区中的第一个项目                                |
| `"current_project_directory"`                 | 使用当前文件的项目目录（默认）                                                                               |
| `"first_project_directory"`                   | 使用您工作区中的第一个项目                                                                                  |
| `"always_home"`                               | 始终从您的主目录启动                                                                                        |
| `{ "always": { "directory": "~/projects" } }` | 始终从特定目录启动                                                                                          |

```json [settings]
{
  "terminal": {
    "working_directory": "first_project_directory"
  }
}
```

## 环境变量

为所有终端会话添加环境变量：

```json [settings]
{
  "terminal": {
    "env": {
      "EDITOR": "zed --wait",
      "MY_VAR": "value"
    }
  }
}
```

> **提示：** 在单个变量中使用 `:` 分隔多个值：`"PATH": "/custom/path:$PATH"`

### Python 虚拟环境检测

打开终端时，Zed 可以自动激活 Python 虚拟环境。默认情况下，它会搜索 `.env`、`env`、`.venv` 和 `venv` 目录：

```json [settings]
{
  "terminal": {
    "detect_venv": {
      "on": {
        "directories": [".venv", "venv"],
        "activate_script": "default"
      }
    }
  }
}
```

`activate_script` 选项支持 `"default"`、`"csh"`、`"fish"` 和 `"nushell"`。

要禁用虚拟环境检测：

```json [settings]
{
  "terminal": {
    "detect_venv": "off"
  }
}
```

## 字体与外观

终端可以使用与编辑器不同的字体：

```json [settings]
{
  "terminal": {
    "font_family": "JetBrains Mono",
    "font_size": 14,
    "font_features": {
      "calt": false
    },
    "line_height": "comfortable"
  }
}
```

行高选项：

- `"comfortable"` — 1.618 比率，适合阅读（默认）
- `"standard"` — 1.3 比率，更适合带框绘图字符的 TUI 应用程序
- `{ "custom": 1.5 }` — 自定义比率

### 光标

配置光标外观：

```json [settings]
{
  "terminal": {
    "cursor_shape": "bar",
    "blinking": "on"
  }
}
```

光标形状：`"block"`、`"bar"`、`"underline"`、`"hollow"`

闪烁选项：`"off"`、`"terminal_controlled"`（默认）、`"on"`

### 最小对比度

Zed 会调整终端颜色以保持可读性。默认值 `45` 确保文本保持可见。设置为 `0` 可禁用对比度调整并使用精确的主题颜色：

```json [settings]
{
  "terminal": {
    "minimum_contrast": 0
  }
}
```

## 滚动

使用以下键绑定导航终端历史记录：

| 操作           | macOS                          | Linux/Windows    |
| ---------------- | ------------------------------ | ---------------- |
| 向上滚动一页   | `Shift+PageUp` 或 `Cmd+Up`     | `Shift+PageUp`   |
| 向下滚动一页   | `Shift+PageDown` 或 `Cmd+Down` | `Shift+PageDown` |
| 向上滚动一行   | `Shift+Up`                     | `Shift+Up`       |
| 向下滚动一行   | `Shift+Down`                   | `Shift+Down`     |
| 滚动到顶部      | `Shift+Home` 或 `Cmd+Home`     | `Shift+Home`     |
| 滚动到底部      | `Shift+End` 或 `Cmd+End`       | `Shift+End`      |

使用以下命令调整滚动速度：

```json [settings]
{
  "terminal": {
    "scroll_multiplier": 3.0
  }
}
```

## 复制与粘贴

| 操作 | macOS   | Linux/Windows  |
| ------ | ------- | -------------- |
| 复制   | `Cmd+C` | `Ctrl+Shift+C` |
| 粘贴   | `Cmd+V` | `Ctrl+Shift+V` |

### 选中时复制

自动将选中的文本复制到剪贴板：

```json [settings]
{
  "terminal": {
    "copy_on_select": true
  }
}
```

### 复制后保持选中

默认情况下，复制后文本保持选中状态。要清除选中状态：

```json [settings]
{
  "terminal": {
    "keep_selection_on_copy": false
  }
}
```

## 搜索

使用 `Cmd+F` (macOS) 或 `Ctrl+Shift+F` (Linux/Windows) 搜索终端内容。这会打开编辑器中使用的相同搜索栏。

## Vi 模式

使用 `Ctrl+Shift+Space` 切换终端中的 vi 风格导航。这允许您使用 vi 键绑定导航和选择文本。

## 清除终端

清除终端屏幕：

- macOS: `Cmd+K`
- Linux/Windows: `Ctrl+Shift+L`

## Option 键作为 Meta 键 (macOS)

对于 Emacs 用户或使用 Meta 键组合的应用程序，启用 Option 键作为 Meta 键：

```json [settings]
{
  "terminal": {
    "option_as_meta": true
  }
}
```

这会将 Option 键重新解释为 Meta 键，使 `Alt+X` 之类的序列能够正常工作。

## 替代滚动模式

启用后，鼠标滚动事件在 `vim` 或 `less` 等应用程序中会被转换为按键按下事件：

```json [settings]
{
  "terminal": {
    "alternate_scroll": "on"
  }
}
```

## 路径超链接

Zed 会检测终端输出中的文件路径并将其设为可点击。`Cmd+Click` (macOS) 或 `Ctrl+Click` (Linux/Windows) 会在 Zed 中打开文件，如果检测到行号，则会跳转到该行号。

识别的常见格式：

- `src/main.rs:42` — 在第 42 行打开
- `src/main.rs:42:10` — 在第 42 行、第 10 列打开
- `File "script.py", line 10` — Python traceback 信息

## 面板配置

### 停靠位置

```json [settings]
{
  "terminal": {
    "dock": "bottom"
  }
}
```

选项：`"bottom"`（默认）、`"left"`、`"right"`

### 默认大小

```json [settings]
{
  "terminal": {
    "default_width": 640,
    "default_height": 320
  }
}
```

### 终端按钮

在状态栏中隐藏终端按钮：

```json [settings]
{
  "terminal": {
    "button": false
  }
}
```

### 工具栏

在面包屑工具栏中显示终端标题：

```json [settings]
{
  "terminal": {
    "toolbar": {
      "breadcrumbs": true
    }
  }
}
```

标题可以通过您的 shell 使用转义序列 `\e]2;Title\007` 来设置。

## 与任务集成

终端与 Zed 的 [任务系统](./tasks.md) 集成。当您运行任务时，它会在终端中执行。从终端重新运行上一个任务：

- macOS: `Cmd+Alt+R`
- Linux/Windows: `Ctrl+Shift+R` 或 `Alt+T`

## AI 辅助

使用 [内联助手](./ai/inline-assistant.md) 获取终端命令的帮助：

- macOS: `Ctrl+Enter`
- Linux/Windows: `Ctrl+Enter` 或 `Ctrl+I`

这会打开内联助手，以帮助解释错误、建议命令或解决故障。 [智能体面板](./ai/agent-panel.md) 中的 AI 代理也可以作为其工作流的一部分运行终端命令。

## 发送文本和按键

对于高级键绑定自定义，您可以将原始文本或按键发送到终端：

```json [keymap]
{
  "context": "Terminal",
  "bindings": {
    "alt-left": ["terminal::SendText", "\u001bb"],
    "ctrl-c": ["terminal::SendKeystroke", "ctrl-c"]
  }
}
```

## 所有终端设置

有关终端设置的完整列表，请参阅 [全部设置中的终端部分](./reference/all-settings.md#terminal)。

## 接下来做什么

- [任务](./tasks.md) — 从 Zed 运行命令和脚本
- [REPL](./repl.md) — 交互式代码执行
- [CLI 参考](./reference/cli.md) — 在 Zed 中打开文件的命令行界面
