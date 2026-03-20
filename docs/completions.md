---
title: Code Completions - Zed
description: Zed 的代码补全功能，来自语言服务器和编辑预测。配置自动补全行为、代码片段和文档显示。
---

# 代码补全

Zed 支持两种补全来源：

1. 由 Zed 自动安装或通过 [Zed 语言扩展](languages.md) 提供的语言服务器提供的 "代码补全"。
2. 由 Zed 自身的 Zeta 模型或 [GitHub Copilot](#github-copilot) 等外部提供商提供的 "编辑预测"。

## 语言服务器代码补全 {#code-completions}

当有可用的语言服务器时，Zed 将提供当前文件中变量名、函数和其他符号的补全。你可以通过将以下内容添加到 Zed 的 `settings.json` 文件中来禁用这些补全：

```json [设置]
"show_completions_on_input": false
```

你可以使用 `ctrl-space` 手动触发补全，或者通过命令面板触发 `editor::ShowCompletions` 操作。

> 注意：在 Zed 中使用 `ctrl-space` 需要禁用 macOS 的全局快捷键。
> 打开 **系统设置** > **键盘** > **快捷键** > **输入源**，然后取消勾选 **选择上一个输入源**。

有关更多信息，请参阅：

- [配置支持的语言](./configuring-languages.md)
- [Zed 支持的语言列表](./languages.md)

## 编辑预测 {#edit-predictions}

Zed 内置了对一次预测多个编辑的支持 [通过 Zeta](https://huggingface.co/zed-industries/zeta)，Zed 的开源和开放数据模型。
编辑预测会在你输入时出现，大多数情况下，你可以通过按 `tab` 键来接受它们。

有关如何设置和配置 Zed 编辑预测的更多信息，请参阅 [编辑预测文档](./ai/edit-prediction.md)。