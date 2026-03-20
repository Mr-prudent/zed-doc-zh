---
title: Zed 中的 AI 规则 - .rules, .cursorrules, CLAUDE.md
description: 使用 .rules 文件、.cursorrules、CLAUDE.md、AGENTS.md 和规则库在 Zed 中配置 AI 行为，以实现项目级指令。
---

# 规则 {#using-rules}

规则是提示，可以自动插入到每个[智能体面板](./agent-panel.md)交互的开头，通过项目文件树中的 `.rules` 文件，或者按需通过 @-提及、从规则库中插入。

## `.rules` 文件

Zed 支持在项目文件树的根目录包含 `.rules` 文件，它们充当项目级指令，会自动包含在您与智能体面板的所有交互中。

为了与其他代理兼容，也支持此文件的其他名称，但请注意将使用此列表中第一个匹配的文件：

- `.rules`
- `.cursorrules`
- `.windsurfrules`
- `.clinerules`
- `.github/copilot-instructions.md`
- `AGENT.md`
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`

## 规则库 {#rules-library}

规则库是用于编写和管理规则的界面。
它是一个具有语法高亮和所有标准键绑定的完整编辑器。

您也可以在规则编辑器内直接使用内联助手，让您能够快速获得编写规则的 LLM 支持。

### 打开规则库

1.  打开智能体面板。
2.  点击右上角的代理菜单 (`...`)。
3.  从下拉菜单中选择 `Rules...`。

您也可以通过运行 {#action agent::OpenRulesLibrary} 操作或通过 {#kb agent::OpenRulesLibrary} 键绑定来打开它。

### 管理规则

选择规则文件后，您可以直接在内置编辑器中对其进行编辑。
其标题也可以从编辑器标题栏更改。

可以借助规则编辑器中的按钮来复制、删除规则或将规则添加到默认规则中。

### 创建规则 {#creating-rules}

要创建规则文件，只需打开 `Rules Library` 并点击 `+` 按钮。
规则文件存储在本地，可以随时从库中访问。

有关编写有效规则的指南：

- [Anthropic: Prompt Engineering](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [OpenAI: Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)

### 使用规则

您可以 @-提及通过规则库创建的每条规则。
这使您可以快速获取可重复使用的提示，节省了每次使用时输入它们的时间。

#### 默认规则 {#default-rules}

规则库中的所有规则都可以设置为默认规则，这意味着它们会自动插入到每个新智能体面板交互的上下文中。

您可以通过点击规则库中规则编辑器右上角的回形针图标按钮，将任何规则设置为默认规则。

## 从提示库迁移

以前，规则库被称为“提示库”。
新的规则系统取代了提示库，但少数几个特定情况除外，具体如下。

### 规则中的斜杠命令

以前，可以在自定义提示（现在的规则）中使用斜杠命令（现在的 @-提及）。
但是，目前不支持在规则文件中使用 @-提及，然而，当与文本线程结合使用时，规则文件中支持斜杠命令。
有关更多信息，请参阅使用[规则中的斜杠命令](./text-threads.md#slash-commands-in-rules)的文档。

### 提示模板

Zed 保持与其原始模板系统的向后兼容性，该系统允许您自定义在整个应用程序中使用的提示，包括内联助手。
虽然规则库现在是管理提示的主要方式，但您仍然可以使用这些旧版模板来覆盖默认提示。
更多详情，请参阅[文本线程](./text-threads.md)下的[规则模板](./text-threads.md#rule-templates)部分。
