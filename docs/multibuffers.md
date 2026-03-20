---
title: 多缓冲区 - 在 Zed 中同时编辑多个文件
description: 使用多缓冲区在 Zed 中同时编辑多个��件。结合多光标功能进行快速的跨文件重构。
---

# 多缓冲区

Zed 赋予你的一个强大功能是能够同时编辑多个文件。当与多光标功能结合使用时，这使得大范围的重构速度显著加快。

## 在多缓冲区中编辑

<div class="video" style="position: relative; padding-top: 71.71314741035857%;">
  <iframe
    src="https://customer-snccc0j9v3kfzkif.cloudflarestream.com/bda0a6584c19f4b39e58a263c0ae4358/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-snccc0j9v3kfzkif.cloudflarestream.com%2Fbda0a6584c19f4b39e58a263c0ae4358%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

编辑多缓冲区与编辑普通文件的方式相同。你所做的更改将反映在编辑器其余部分该文件的打开副本中，并且你可以使用 `editor: Save` 命令保存所有文件（在 macOS 上绑定到 `cmd-s`，在 Windows/Linux 上绑定到 `ctrl-s`，或者在 Vim 模式下使用 `:w`）。

在多缓冲区中，使用多个光标同时编辑每个文件通常很有用。如果你想编辑几个实例，可以使用鼠标（在 macOS 上为 `option-click`，在 Windows/Linux 上为 `alt-click`）或键盘选择它们。在 macOS 上为 `cmd-d`，在 Windows/Linux 上为 `ctrl-d`，或者在 Vim 模式下使用 `gl`，将选择光标下单词的下一个匹配项。

当你想编辑所有匹配项时，可以通过运行 `editor: Select All Matches` 命令来选择它们（在 macOS 上为 `cmd-shift-l`，在 Windows/Linux 上为 `ctrl-shift-l`，或者在 Vim 模式下使用 `g a`）。

## 导航到源文件

虽然你可以在多缓冲区中轻松编辑文件，但直接导航到源文件通常更有益。你可以通过单击任何摘录之间的分隔线，或者将光标放在摘录中并执行 `editor: open excerpts` 命令来实现这一点。需要注意的是，如果使用了多个光标，该命令将在多缓冲区内每个光标下方的位置打开源文件。

此外，如果你更喜欢使用鼠标，并且希望双击摘录以打开它，你可以通过设置 `"double_click_in_multibuffer": "open"` 来启用此功能。

## 项目搜索

要开始搜索，请运行 `pane: Toggle Search` 命令（在 macOS 上为 `cmd-shift-f`，在 Windows/Linux 上为 `ctrl-shift-f`，或者在 Vim 模式下使用 `g/`）。搜索完成后，结果将在一个新的多缓冲区中显示。整个项目中每个匹配行都将有一个摘录。

## 诊断信息

如果你安装了语言服务器，诊断面板可以显示你项目中的所有错误。你可以通过单击状态栏中的图标或运行 `diagnostics: Deploy` 命令来打开它（在 macOS 上为 `cmd-shift-m`，在 Windows/Linux 上为 `ctrl-shift-m`，或者在 Vim 模式下使用 `:clist`）。

## 查找引用

如果你安装了语言服务器，你可以使用 `editor: Find References` 命令查找光标下符号的所有引用（在 macOS 上为 `cmd-click`，在 Windows/Linux 上为 `ctrl-click`，或者在 Vim 模式下使用 `g A`）。

根据你的语言服务器，像 `editor: Go To Definition` 和 `editor: Go To Type Definition` 这样的命令，如果存在多个可能的定义，也会打开一个多缓冲区。