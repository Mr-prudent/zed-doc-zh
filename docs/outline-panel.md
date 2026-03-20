---
title: 大纲面板 - Zed
description: 使用 Zed 的大纲面板导航代码结构。查看符号，跳转到定义，并浏览文件大纲。
---

# 大纲面板

除了模态大纲（`cmd-shift-o`）之外，Zed 还提供大纲面板。您可以通过 `cmd-shift-b`（通过命令面板执行 `outline panel: toggle focus`）或在状态栏中点击“大纲面板”按钮来启用大纲面板。

当查看“单例”缓冲区（即选项卡上的单个文件）时，大纲面板的工作方式与大纲模态类似——它会显示当前缓冲区符号的大纲。每个符号条目都会显示其类型前缀（例如 "struct"、"fn"、"mod"、"impl"）以及符号名称，帮助您快速识别所查看的符号类型。点击条目可以跳转到文件中的相应部分。大纲视图还会自动滚动到文件中与当前光标位置相关的部分。

![在单例缓冲区中使用大纲面板](https://zed.dev/img/outline-panel/singleton.png)

## 在多缓冲区中使用

当与多缓冲区一起使用时，大纲面板才能真正发挥其优势。以下是一些展示其多功能性的示例：

### 项目搜索结果

概览项目中的搜索结果。

![在项目搜索多缓冲区中使用大纲面板](https://zed.dev/img/outline-panel/project-search.png)

### 项目诊断

查看语言服务器报告的所有错误和警告的摘要。

![在查看项目诊断多缓冲区时使用大纲面板](https://zed.dev/img/outline-panel/project-diagnostics.png)

### 查找所有引用

在使用 `editor: find all references` 操作时，快速浏览所有引用。

![在查看“查找所有引用”多缓冲区时使用大纲面板](https://zed.dev/img/outline-panel/find-all-references.png)

大纲视图提供了一种快速导航到代码特定部分的好方法，并且在处理多缓冲区中的大型结果集时帮助您保持上下文。