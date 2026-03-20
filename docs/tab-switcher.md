---
title: 标签页切换器
description: "标签页切换器提供了一种在 Zed 中快速切换打开标签页的方法。它会按最近使用情况显示打开标签页的列表，方便您快速跳转回之前正在工作的内容..."
---

# 标签页切换器

标签页切换器提供了一种在 Zed 中快速切换打开标签页的方法。它会按最近使用情况显示打开标签页的列表，方便您快速跳转回之前正在工作的内容。

![带有多个面板的标签页切换器](https://zed.dev/img/features/tab-switcher.png)

## 快速切换

当使用 {#kb tab_switcher::Toggle} 打开标签页切换器时（而非从命令面板执行 {#action tab_switcher::Toggle}），只要按住 <kbd class="keybinding">ctrl</kbd> 键，它将保持激活状态。

在按住 <kbd class="keybinding">ctrl</kbd> 的同时，每次按下 <kbd class="keybinding">tab</kbd> 会切换到下一个项目（按 <kbd class="keybinding">shift</kbd> 可反向切换），当松开 <kbd class="keybinding">ctrl</kbd> 时，选中的项目将被确认，切换器将关闭。

## 打开标签页切换器

您也可以通过 {#action tab_switcher::Toggle} ({#kb tab_switcher::Toggle}) 或 {#action tab_switcher::ToggleAll} 来打开标签页切换器。

当标签页切换器打开时，您可以执行以下操作：

- 按 {#kb menu::SelectNext} 移动到列表中的下一个标签页
- 按 {#kb menu::SelectPrevious} 移动到上一个标签页
- 按 <kbd class="keybinding">enter</kbd> 确认选中的标签页并关闭切换器
- 按 <kbd class="keybinding">escape</kbd> 关闭切换器并返回打开切换器的原始标签页
- 按 {#kb tab_switcher::CloseSelectedItem} 关闭当前选中的标签页

当您在列表中导航时，Zed 会更新面板的激活项以匹配选中的标签页。

## 操作参考

| 操作                                    | 描述                                       |
| ----------------------------------------- | ------------------------------------------------- |
| {#action tab_switcher::Toggle}            | 为当前面板打开标签页切换器        |
| {#action tab_switcher::ToggleAll}         | 打开标签页切换器，显示所有面板的标签页 |
| {#action tab_switcher::CloseSelectedItem} | 在标签页切换器中关闭选中的标签页        |