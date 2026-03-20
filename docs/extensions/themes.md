---
title: 主题
description: "Zed 扩展的主题。"
---

# 主题

扩展中的 `themes` 目录��包含一个或多个主题文件。

每个主题文件都应符合在 [`https://zed.dev/schema/themes/v0.2.0.json`](https://zed.dev/schema/themes/v0.2.0.json) 中指定的 JSON schema。

有关创建主题的更多背景信息，请参阅[这篇博客文章](https://zed.dev/blog/user-themes-now-in-preview)。

## 主题 JSON 结构

Zed 主题的结构在 [Zed 主题 JSON Schema](https://zed.dev/schema/themes/v0.2.0.json) 中定义。

一个 Zed 主题包含一个主题系列对象，包括：

- `name`: 主题系列的名称
- `author`: 主题系列作者的姓名
- `themes`: 属于该主题系列的主题数组

主题对象的核心组件包括：

1. 主题元数据：

   - `name`: 主题的名称
   - `appearance`: "light"（浅色）或 "dark"（深色）

2. `style` 下的样式属性，例如：

   - `background`: 主背景颜色
   - `foreground`: 主文本颜色
   - `accent`: 用于高亮和强调的强调色

3. 语法高亮：

   - `syntax`: 一个包含各种语法元素（如关键字、字符串、注释）颜色定义的对象

4. UI 元素：

   - 各种 UI 组件的颜色，例如：
     - `element.background`: UI 元素的背景色
     - `border`: 不同状态（正常、聚焦、选中）的边框颜色
     - `text`: 不同状态（正常、弱化、强调）的文本颜色

5. 编辑器特定颜色：

   - 与编辑器相关的元素颜色，例如：
     - `editor.background`: 编辑器背景色
     - `editor.gutter`: 装饰列颜色
     - `editor.line_number`: 行号颜色

6. 终端颜色：
   - 集成终端的 ANSI 颜色定义

## 设计您的主题

您可以使用 [Zed 的主题构建器](https://zed.dev/theme-builder) 基于现有主题来设计您自己的自定义主题。

此工具可让您微调和预览 Zed 中各个界面的外观。
然后，您可以导出 JSON 文件并将其发布到 Zed 的扩展商店中。