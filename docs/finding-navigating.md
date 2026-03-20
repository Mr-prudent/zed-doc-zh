---
title: 查找和导航代码 - Zed
description: 在 Zed 中使用文件查找器、项目搜索、跳转到定义、符号搜索和命令面板来导航您的代码库。
---

# 查找与导航

Zed 提供了多种快速在代码库中移动的方法。以下是主要导航工具的概述。

## 命令面板

命令面板 ({#kb command_palette::Toggle}) 是您访问 Zed 中几乎所有功能的入口。输入几个字符来过滤命令，然后按 Enter 执行。

[了解有关命令面板的更多信息 →](./command-palette.md)

## 文件查找器

使用 {#kb file_finder::Toggle} 打开项目中的任何文件。输入文件名或路径的一部分来缩小结果范围。

## 项目搜索

使用 {#kb pane::DeploySearch} 在所有文件中进行搜索。在搜索框中开始输入即可开始搜索——结果会随着输入实时显示。

结果会显示在一个 [多缓冲区](./multibuffers.md) 中，让您可以直接在结果位置进行编辑。

要禁用自动搜索并改为要求按 Enter 键，请打开设置编辑器 ({#kb zed::OpenSettings})，搜索“search on input”，然后关闭该设置。或者将其添加到您的 settings.json 中：

```json
{
  "search_on_input": false
}
```

## 跳转到定义

使用 {#kb editor::GoToDefinition}（或 `Cmd+Click` / `Ctrl+Click`）跳转到符号的定义位置。如果有多个定义，它们会在一个多缓冲区中打开。

## 跳转到符号

- **当前文件：** {#kb outline::Toggle} 打开活动文件中符号的大纲
- **整个项目：** {#kb project_symbols::Toggle} 在所有文件中搜索符号

## 大纲面板

大纲面板 ({#kb outline_panel::ToggleFocus}) 显示当前文件中符号的持久树状视图。与 [多缓冲区](./multibuffers.md) 结合使用时，对于导航搜索结果或诊断信息特别有用。

[了解有关大纲面板的更多信息 →](./outline-panel.md)

## 标签页切换器

使用 {#kb tab_switcher::Toggle} 在打开的标签页之间快速切换。标签页按最近使用排序——按住 Ctrl 并按 Tab 键可在它们之间循环切换。

[了解有关标签页切换器的更多信息 →](./tab-switcher.md)

## 快速参考

| 任务                | 快捷键                             |
| ------------------- | ---------------------------------- |
| 命令面板           | {#kb command_palette::Toggle}      |
| 打开文件           | {#kb file_finder::Toggle}          |
| 项目搜索           | {#kb pane::DeploySearch}           |
| 跳转到定义         | {#kb editor::GoToDefinition}      |
| 查找引用           | {#kb editor::FindAllReferences}    |
| 文件中的符号       | {#kb outline::Toggle}              |
| 项目中的符号       | {#kb project_symbols::Toggle}      |
| 大纲面板           | {#kb outline_panel::ToggleFocus}   |
| 标签页切换器       | {#kb tab_switcher::Toggle}         |