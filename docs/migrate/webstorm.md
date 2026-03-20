---
title: 如何从 WebStorm 迁移到 Zed
description: "从 WebStorm 迁移到 Zed 的指南，包括设置和快捷键。"
---

# 从 WebStorm 迁移

本指南涵盖了如果您来自 WebStorm，如何设置 Zed，包括快捷键、设置以及作为 JavaScript/TypeScript 开发者应预期的差异。

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

安装后，您可以从“应用程序”文件夹（macOS）、“开始”菜单（Windows）启动 Zed，或直接从终端使用以下命令启动：
`zed .`
这会在 Zed 中打开当前目录。

## 设置 JetBrains 键盘映射

如果您来自 WebStorm，感觉最自在的方法是使用 JetBrains 键盘映射。在入门过程中，您可以选择它作为基础键盘映射。如果您错过了该步骤，可以随时更改它：

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 搜索 `Base Keymap`
3. 选择 `JetBrains`

这会将熟悉的快捷键映射过来，例如 `Shift Shift` 用于搜索 everywhere，`Cmd+O` 用于跳转到类，`Cmd+Shift+A` 用于查找操作。

## 设置编辑器偏好设置

您可以在设置编辑器 ({#kb zed::OpenSettings}) 中配置大多数设置。对于高级设置，从命令面板运行 `zed: open settings file` 以直接编辑您的设置文件。

WebStorm 用户通常首先配置的设置：

| Zed 设置 | 功能 |
| ----------------------- | ------------------------------------------------------------------------------- |
| `format_on_save` | 保存时自动格式化。设置为 `"on"` 以启用。 |
| `soft_wrap` | 换行长行。选项：`"none"`, `"editor_width"`, `"preferred_line_length"` |
| `preferred_line_length` | 换行和标尺的列宽。默认为 80。 |
| `inlay_hints` | 内联显示参数名称和类型提示，类似于 WebStorm 的提示。 |
| `relative_line_numbers` | 如果您来自 IdeaVim，此设置很有用。 |

Zed 还支持每个项目的设置。在您的项目根目录创建一个 `.zed/settings.json` 文件，以覆盖该项目的全局设置，类似于您在 WebStorm 中使用 `.idea` 文件夹的方式。

> **提示：** 如果您要加入一个现有项目，请在进行第一次提交之前检查 `format_on_save`。否则，当您只想更改一行时，可能会意外地重新格式化整个文件。

## 打开或创建项目

设置完成后，按 `Cmd+Shift+O`（使用 JetBrains 键盘映射）打开一个文件夹。这将成为您在 Zed 中的工作区。与 WebStorm 不同，Zed 没有项目配置向导，没有框架选择对话框，也不需要项目结构设置。

要开始一个新项目，请使用您的终端或文件管理器创建一个目录，然后在 Zed 中打开它。编辑器会将该文件夹视为您项目的根目录。对于新项目，您通常首先会运行 `npm init`、`pnpm create` 或您框架的 CLI 工具，然后在 Zed 中打开生成的文件夹。

您也可以在任何文件夹内的终端中启动 Zed：
`zed .`

进入项目后：

- 使用 `Cmd+Shift+O` 或 `Cmd+E` 在文件之间快速跳转（类似于 WebStorm 的“最近文件”）
- 使用 `Cmd+Shift+A` 或 `Shift Shift` 打开命令面板（类似于 WebStorm 的“搜索 everywhere”）
- 使用 `Cmd+O` 搜索符号（类似于 WebStorm 的“跳转到符号”）

打开的缓冲区显示为顶部的选项卡。项目面板显示您的文件树和 Git 状态。使用 `Cmd+1` 切换它（就像 WebStorm 的项目工具窗口一样）。

## 快捷键的差异

如果您在入门过程中选择了 JetBrains 键盘映射，您的大多数快捷键应该已经感觉很熟悉了。以下是一个快速参考，说明 Zed 与 WebStorm 的比较。

### 常见的共享快捷键

| 操作 | 快捷键 |
| ----------------------------- | ----------------------- |
| 搜索 Everywhere | `Shift Shift` |
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
| 上移/下移行 | `Shift + Alt + Up/Down` |
| 扩展/缩小选择 | `Alt + Up/Down` |
| 注释行 | `Cmd + /` |
| 返回 / 前进 | `Cmd + [` / `Cmd + ]` |
| 切换断点 | `Ctrl + F8` |

### 不同的快捷键（WebStorm → Zed）

| 操作 | WebStorm | Zed (JetBrains 键盘映射) |
| ---------------------- | ----------- | ------------------------ |
| 文件结构 | `Cmd + F12` | `Cmd + F12` (大纲) |
| 导航到下一个错误 | `F2` | `F2` |
| 运行 | `Ctrl + R` | `Ctrl + Alt + R` (任务) |
| 调试 | `Ctrl + D` | `Alt + Shift + F9` |
| 停止 | `Cmd + F2` | `Ctrl + F2` |

### Zed 独有的快捷键

| 操作 | 快捷键 | 备注 |
| ----------------- | -------------------------- | ------------------------------ |
| 切换右侧停靠面板 | `Cmd + R` | 助手面板、通知 |
| 拆分窗格 | `Cmd + K`，然后方向键 | 向任何方向创建拆分 |

### 如何自定义快捷键

- 打开命令面板 (`Cmd+Shift+A` 或 `Shift Shift`)
- 运行 `Zed: Open Keymap Editor`

这将打开所有可用绑定的列表。您可以覆盖单个快捷键或删除冲突。

Zed 还支持键序列（多键快捷键）。

## 用户界面的差异

### 无索引

如果您在大型项目上使用过 WebStorm，您知道等待的感觉。打开一个具有许多依赖项的项目可能意味着要观看“正在索引...”长达 30 秒到几分钟。WebStorm 索引您的整个代码库和 `node_modules` 以为其代码智能提供支持，并在依赖项更改时重新索引。

Zed 不进行索引。您打开一个文件夹并立即开始编码——没有进度条，没有“索引已暂停”的横幅。无论项目大小或您有多少 `node_modules` 依赖项，文件搜索和导航都保持快速。

WebStorm 的索引启用了在整个代码库中查找所有用法、跟踪导入层次结构以及标记整个项目中未使用的导出等功能。Zed 依赖语言服务器进行此分析，但可能覆盖范围不够广。

**如何适应：**

- 使用 `Cmd+O` 搜索项目中的符号（由 TypeScript 语言服务器提供支持）
- 使用 `Cmd+Shift+O` 按名称查找文件
- 使用 `Cmd+Shift+F` 进行文本搜索——即使在大型 monorepo 中它也能保持快速
- 当您需要更深层次的项目级分析时，从终端运行 `tsc --noEmit` 或 `eslint .`

### LSP 与原生语言智能

WebStorm 拥有 JetBrains 自己构建的 JavaScript 和 TypeScript 分析引擎。该引擎能深入理解您的代码：它可以解析类型、跟踪数据流、了解特定框架的模式，并提供专门的重构功能。

Zed 使用语言服务器协议 (LSP) 进行代码智能。对于 JavaScript 和 TypeScript，Zed 支持：

- **vtsls** (默认) — 性能出色的快速 TypeScript 语言服务器
- **typescript-language-server** — 标准 TypeScript LSP 实现
- **ESLint** — Linting 集成
- **Prettier** — 代码格式化（内置）

TypeScript LSP 体验得到了很好的支持。您可以获得准确的补全、类型检查、跳转到定义以及查找引用。其体验与使用相同底层 TypeScript 服务的 VS Code 相当。

您可能注意到差异的地方：

- 特定框架的智能（Angular 模板、Vue SFC）可能集成度较低
- 一些复杂的重构（提取组件并正确导入）可能不够精细
- 自动导入建议取决于语言服务器对您项目的了解程度

**如何适应：**

- 使用 `Alt+Enter` 获取可用的代码操作——列表会因语言服务器而异
- 确保您的 `tsconfig.json` 已正确配置，以便语言服务器了解您的项目结构
- 使用 Prettier 进行一致的格式化（对于 JS/TS 默认启用）
- 对于类似于 WebStorm“检查代码”的代码检查，请检查诊断面板 (`Cmd+6`)——ESLint 和 TypeScript 一起捕获了许多相同的问题

### 无项目模型

WebStorm 通过 `.idea` 文件夹管理项目，其中包含 XML 配置文件、框架检测和运行配置。该模型让 WebStorm 能够记住您的项目设置，通过 UI 管理 npm 脚本，并保留运行/调试设置。

Zed 采用了不同的方法：项目只是一个文件夹。没有设置向导，没有框架选择对话框，也不需要配置项目结构。

这在实际中的含义：

- 没有运行配置。在 `tasks.json` 中定义可重用的命令。请注意，您现有的 `.idea/` 配置不会迁移过来——您需要重新设置所需的配置。
- npm 脚本位于终端中。直接运行 `npm run dev`、`pnpm build` 或 `yarn test`——没有专用的 npm 面板。
- 没有框架检测。Zed 以相同的方式对待 React、Angular、Vue 和原生 JS/TS。

**如何适应：**

- 在项目根目录创建一个 `.zed/settings.json` 用于项目特定的设置
- 在 `tasks.json` 中定义常用命令（通过命令面板打开：`zed: open tasks`）：

```json
[
  {
    "label": "dev",
    "command": "npm run dev"
  },
  {
    "label": "build",
    "command": "npm run build"
  },
  {
    "label": "test",
    "command": "npm test"
  },
  {
    "label": "test current file",
    "command": "npm test -- $ZED_FILE"
  }
]
```

- 使用 `Ctrl+Alt+R` 快速运行任务
- 对于任务未涵盖的任何内容，依赖您的终端 (`Alt+F12`)

### 无框架集成

WebStorm 在 Web 开发中的价值很大程度上来自于其框架集成。React 组件得到了特殊待遇。Angular 有专用的工具。Vue 单文件组件被完全理解。npm 工具窗口显示您所有的脚本。

Zed 没有这些内置功能。TypeScript 语言服务器将您的代码视为 TypeScript——它不理解一个函数是 React 组件或一个文件是 Angular 服务。

**如何适应：**

- 充分使用 grep 和文件搜索。`Cmd+Shift+F` 与正则表达式结合可以找到组件定义、路由配置或 API 端点。
- 依赖语言服务器的“查找引用” (`Alt+F7`) 进行导航——它有效，只是没有框架上下文
- 考虑从 Zed 的终端使用特定框架的 CLI 工具（`ng`、`next`、`vite`）
- 对于 React，JSX/TSX 语法和 TypeScript 类型仍然能提供良好的智能

> **提示：** 对于具有复杂配置的项目，请随时准备好您框架的文档。Zed 的速度是以减少对特定框架功能的辅助为代价的。

### 工具窗口与停靠面板

WebStorm 将辅助视图组织成编号的工具窗口（项目 = 1，npm = Alt+F11，终端 = Alt+F12，等等）。Zed 使用一个类似的概念称为“停靠面板”：

| WebStorm 工具窗口 | Zed 等效物 | 快捷键 (JetBrains 键盘映射) |
| -------------------- | -------------- | --------------------------- |
| 项目 (1) | 项目面板 | `Cmd + 1` |
| Git (9 或 Cmd+0) | Git 面板 | `Cmd + 0` |
| 终端 (Alt+F12) | 终端面板 | `Alt + F12` |
| 结构 (7) | 大纲面板 | `Cmd + 7` |
| 问题 (6) | 诊断 | `Cmd + 6` |
| 调试 (5) | 调试面板 | `Cmd + 5` |

Zed 有三个停靠位置：左侧、底部和右侧。面板可以通过拖动或在设置中在停靠面板之间移动。

请注意，Zed 中没有专用的 npm 工具窗口。使用终端或为您常用的 npm 脚本定义任务。

### 调试

WebStorm 和 Zed 都为 JavaScript 和 TypeScript 提供集成的调试功能：

- Zed 使用 `vscode-js-debug`（与 VS Code 相同的调试适配器）
- 使用 `Ctrl+F8` 设置断点
- 使用 `Alt+Shift+F9` 开始调试或按 `F4` 并选择调试目标
- 使用 `F7`（单步进入）、`F8`（单步跳过）、`Shift+F8`（单步跳出）逐步执行代码
- 使用 `F9` 继续执行

Zed 可以调试：

- Node.js 应用程序和脚本
- Chrome/浏览器 JavaScript
- Jest、Mocha、Vitest 等其他测试框架
- Next.js（服务器端和客户端）

要获得更多控制权，请创建一个 `.zed/debug.json` 文件：

```json
[
  {
    "label": "Debug Current File",
    "adapter": "JavaScript",
    "program": "$ZED_FILE",
    "request": "launch"
  },
  {
    "label": "Debug Node Server",
    "adapter": "JavaScript",
    "request": "launch",
    "program": "${workspaceFolder}/src/server.js"
  },
  {
    "label": "Attach to Chrome",
    "adapter": "JavaScript",
    "request": "attach",
    "port": 9222
  }
]
```

Zed 还能识别 `.vscode/launch.json` 配置，因此现有的 VS Code 调试设置通常可以即用即得。

### 运行测试

WebStorm 具有一个专用的测试运行器，带有可视化界面，显示每个测试的通过/失败状态。Zed 通过以下方式提供测试运行：

- **边缘图标** — 单击测试函数或 describe 块旁边的播放按钮
- **任务** — 在 `tasks.json` 中定义测试命令
- **终端** — 直接运行 `npm test`、`jest`、`vitest` 等

Zed 支持对常见测试框架的自动检测：

- Jest
- Mocha
- Vitest
- Jasmine
- Bun test
- Node.js test runner

测试输出出现在终端面板中。对于 Jest，使用 `--verbose` 获取详细输出，或在开发期间使用 `--watch` 进行持续测试。

### 扩展与插件

WebStorm 有一个插件目录，涵盖了额外的语言支持、主题和工具集成。

Zed 的扩展目录更小且更专注于：

- 语言支持和语法高亮
- 主题
- AI 的斜杠命令
- 上下文服务器

在 WebStorm 中需要插件的许多功能已内置在 Zed 中：

- 带有语音聊天的实时协作
- AI 编码助手
- 内置终端
- 任务运行器
- 基于 LSP 的代码智能
- Prettier 格式化
- ESLint 集成

### Zed 中没有的功能

为了明确期望，以下是 WebStorm 提供而 Zed 没有的功能：

- **npm 工具窗口** — 使用终端或任务代替
- **HTTP 客户端** — 使用 Postman、Insomnia 或 curl 等工具
- **数据库工具** — 使用 DataGrip、DBeaver 或 TablePlus
- **特定框架的工具**（Angular schematics、React 重构）— 使用 CLI 工具
- **可视化的 package.json 编辑器** — 直接编辑该文件
- **内置 REST 客户端** — 使用外部工具或扩展
- **分析器集成** — 使用 Chrome DevTools 或 Node.js 分析工具

## Zed 与 WebStorm 中的协作

WebStorm 将 Code With Me 作为单独的功能提供协作。Zed 将协作构建到核心体验中。

- 在左侧停靠面板中打开协作面板
- 创建一个频道并[邀请您的协作者](https://zed.dev/docs/collaboration#inviting-a-collaborator)加入
- [直接共享您的屏幕或代码库](https://zed.dev/docs/collaboration#share-a-project)

连接后，您将实时看到彼此的光标、选择和编辑。包含语音聊天。无需单独的工具或第三方登录。

## 在 Zed 中使用 AI

如果您习惯了 WebStorm 中的 AI 助手（如 GitHub Copilot、JetBrains AI Assistant 或 Junie），Zed 提供了更灵活的类似功能。

### 配置 GitHub Copilot

1. 使用 `Cmd+,` (macOS) 或 `Ctrl+,` (Linux/Windows) 打开设置
2. 导航到 **AI → Edit Predictions**
3. 在“配置提供程序”旁边单击 **Configure**
4. 在 **GitHub Copilot** 下，单击 **Sign in to GitHub**

登录后，只需开始输入。Zed 将内联提供建议供您接受。

### 其他 AI 选项

要在 Zed 中使用其他 AI 模型，您有几个选择：

- 使用 Zed 托管的模型，具有更高的速率限制。需要[身份验证](https://zed.dev/docs/authentication)并订阅[Zed Pro](https://zed.dev/docs/ai/subscription.html)。
- 使用您自己的[API 密钥](https://zed.dev/docs/ai/llm-providers.html)，无需身份验证
- 使用[外部智能体如 Claude Agent](https://zed.dev/docs/ai/external-agents.html)

## 高级配置和生产力调整

Zed 为想要微调其环境的高级用户提供了高级设置。

以下是一些对 JavaScript/TypeScript 开发者有用的调整：

**保存时格式化：**

```json
"format_on_save": "on"
```

**将 Prettier 配置为默认格式化程序**（需要手动 JSON 编辑）：

```json
{
  "formatter": {
    "external": {
      "command": "prettier",
      "arguments": ["--stdin-filepath", "{buffer_path}"]
    }
  }
}
```

**启用 ESLint 代码操作**（需要手动 JSON 编辑）：

```json
{
  "lsp": {
    "eslint": {
      "settings": {
        "codeActionOnSave": {
          "rules": ["import/order"]
        }
      }
    }
  }
}
```

**配置 TypeScript 严格模式提示：**

在您的 `tsconfig.json` 中，启用严格模式以获得更好的类型检查：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**启用 direnv 支持**（对于使用 direnv 管理环境变量的项目很有用）：

```json
"load_direnv": "shell_hook"
```

## 下一步

现在您已经设置好了，以下是一些资源，可帮助您充分利用 Zed：

- [所有设置](../reference/all-settings.md) — 自定义设置、主题和编辑器行为
- [键绑定](../key-bindings.md) — 学习如何自定义和扩展您的键盘映射
- [任务](../tasks.md) — 为您的项目设置构建和运行命令
- [AI 功能](../ai/overview.md) — 探索 Zed 超出代码补全的 AI 能力
- [协作](../collaboration/overview.md) — 实时共享您的项目和代码
- [Zed 中的 JavaScript](../languages/javascript.md) — JavaScript 特定的设置和配置
- [Zed 中的 TypeScript](../languages/typescript.md) — TypeScript 特定的设置和配置
