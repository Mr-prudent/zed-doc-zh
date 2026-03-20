---
title: Zed 中的 AI 代码补全 - Zeta、Copilot、Sweep、Mercury Coder
description: 在 Zed 中使用 Zeta（内置）、GitHub Copilot、Sweep、Codestral 或 Mercury Coder 设置 AI 代码补全。每次按键都支持多行预测。
---

# 编辑预测

编辑预测是 Zed AI 代码补全的工作方式：一个 LLM（大语言模型）会预测您想要编写的代码。
每次按键都会向编辑预测提供商发送一个新请求，该请求返回单行或多行建议，您可以通过按 `tab` 键快速接受。

默认提供商是 [Zeta，一个专有的开源和开放数据集模型](https://huggingface.co/zed-industries/zeta)，但您也可以使用 [其他提供商](#other-providers)，如 GitHub Copilot、Sweep、Mercury Coder 和 Codestral。

## 配置 Zeta

要使用 Zeta，请先[登录](../authentication.md#what-features-require-signing-in)。
登录后，预测会在您输入时出现。

您可以通过检查设置文件中是否包含以下代码来确认 Zeta 是否已正确配置：

```json [settings]
{
  "edit_predictions": {
    "provider": "zed"
  }
}
```

状态栏中的 Z 图标也表示 Zeta 处于活动状态。

### 定价和计划

免费计划每月包含 2000 次 Zeta 预测。[专业版计划](../ai/plans-and-usage.md) 移除了此限制。详细信息请参阅 [Zed 的定价页面](https://zed.dev/pricing)。

### 切换模式 {#switching-modes}

Zed 的编辑预测有两种不同的显示模式：

1. `eager`（默认）：只要不与语言服务器补全冲突，预测就会以内联方式显示
2. `subtle`：只有在按住修饰键（默认为 `alt`）时，预测才会以内联方式出现

您可以通过 `mode` ��在它们之间切换：

```json [settings]
"edit_predictions": {
  "mode": "eager" // 或 "subtle"
},
```

或者通过状态栏菜单直接在 UI 中切换：

![编辑预测状态栏菜单，带有模式切换开关。](https://zed.dev/img/edit-prediction/status-bar-menu.webp)

> 请注意，编辑预测模式适用于任何预测提供商。

### 与其他 `tab` 操作的冲突 {#edit-predictions-conflict}

默认情况下，当 `tab` 键通常执行其他操作时，Zed 需要按修饰键才能接受预测：

1. 当语言服务器补全菜单可见时。
2. 当您的光标不在正确的缩进级别时。

在这些情况下，使用 `alt-tab` 来接受预测。当语言服务器补全菜单打开时，先按住 `alt` 会导致菜单暂时消失，以便在缓冲区内预览预测。

在 Linux 上，`alt-tab` 通常被窗口管理器用于切换窗口，因此 `alt-l` 被设置为接受预测的默认绑定。`tab` 和 `alt-tab` 也可以使用，但默认不显示。

{#action editor::AcceptNextWordEditPrediction} ({#kb editor::AcceptNextWordEditPrediction}) 可用于接受当前编辑预测直到下一个单词边界。
{#action editor::AcceptNextLineEditPrediction} ({#kb editor::AcceptNextLineEditPrediction}) 可用于接受当前编辑预测直到新行边界。

## 配置编辑预测键位绑定 {#edit-predictions-keybinding}

默认情况下，使用 `tab` 键来接受编辑预测。您可以通过在键位映射文件中插入以下代码来使用其他键位绑定：

```json [keymap]
{
  "context": "Editor && edit_prediction",
  "bindings": {
    // 这里我们也允许使用 `alt-enter` 来接受预测
    "alt-enter": "editor::AcceptEditPrediction"
  }
}
```

当存在与 [`tab` 键的冲突](#edit-predictions-conflict)时，Zed 使用不同的键位上下文来接受键位绑定 (`edit_prediction_conflict`)。
如果您想使用其他键位，可以在键位映射文件中插入以下代码：

```json [keymap]
{
  "context": "Editor && edit_prediction_conflict",
  "bindings": {
    "ctrl-enter": "editor::AcceptEditPrediction" // 修改键位绑定的示例
  }
}
```

如果您的键位绑定包含修饰键（如上例中的 `ctrl`），它也将用于预览编辑预测并暂时隐藏语言服务器补全菜单。

您也可以将此操作绑定到不带修饰键的键位。
在这种情况下，Zed 将使用默认的修饰键（`alt`）来预览编辑预测。

```json [keymap]
{
  "context": "Editor && edit_prediction_conflict",
  "bindings": {
    // 这里我们将 tab 绑定为即使在存在语言服务器补全或光标不在正确缩进级别时也能接受
    "tab": "editor::AcceptEditPrediction"
  }
}
```

要在有语言服务器补全菜单时继续使用修饰键来接受预测，但允许 `tab` 在任何光标位置接受预测，您可以使用 `showing_completions` 进一步指定上下文：

```json [keymap]
{
  "context": "Editor && edit_prediction_conflict && !showing_completions",
  "bindings": {
    // 这里我们只在有语言服务器补全时才要求使用修饰键
    "tab": "editor::AcceptEditPrediction"
  }
}
```

### 键位绑定示例：始终使用 Tab

如果您想使用 `tab` 键来始终接受编辑预测，可以使用以下键位绑定：

```json [keymap]
{
  "context": "Editor && edit_prediction_conflict && showing_completions",
  "bindings": {
    "tab": "editor::AcceptEditPrediction"
  }
}
```
这将使 `tab` 键能够接受编辑预测，_即使_您同时也在查看语言服务器补全。
这意味着您需要依赖 `enter` 键来接受后者。

### 键位绑定示例：始终使用 Alt-Tab

下面的键位绑定示例会导致 `alt-tab` 总是被使用，而不是有时使用 `tab`。
您可能希望这样做，以便为接受编辑预测只使用一个（备选的）键位绑定，因为 `tab` 的行为会根据上下文而变化。

```json [keymap]
  {
    "context": "Editor && edit_prediction",
    "bindings": {
      "alt-tab": "editor::AcceptEditPrediction"
    }
  },
  // 将 `tab` 绑定回其原始行为。
  {
    "context": "Editor",
    "bindings": {
      "tab": "editor::Tab"
    }
  },
  {
    "context": "Editor && showing_completions",
    "bindings": {
      "tab": "editor::ComposeCompletion"
    }
  },
```

如果您正在使用 [Vim 模式](../vim.md)，则在上述绑定之后还需要额外的绑定来将 `tab` 恢复为其原始行为：

```json [keymap]
  {
    "context": "(VimControl && !menu) || vim_mode == replace || vim_mode == waiting",
    "bindings": {
      "tab": "vim::Tab"
    }
  },
  {
    "context": "vim_mode == literal",
    "bindings": {
      "tab": ["vim::Literal", ["tab", "\u0009"]]
    }
  },
```

### 键位绑定示例：在 Linux 上显示 Tab 和 Alt-Tab

虽然在 Linux 上支持 `tab` 和 `alt-tab`，但显示的是 `alt-l`。
如果您的窗口管理器没有保留 `alt-tab`，并且您更喜欢使用 `tab` 和 `alt-tab`，请将这些绑定添加到 `keymap.json` 中：

```json [keymap]
  {
    "context": "Editor && edit_prediction",
    "bindings": {
      "tab": "editor::AcceptEditPrediction",
      // 可选：这会使默认的 `alt-l` 绑定失效。
      "alt-l": null
    }
  },
  {
    "context": "Editor && edit_prediction_conflict",
    "bindings": {
      "alt-tab": "editor::AcceptEditPrediction",
      // 可选：这会使默认的 `alt-l` 绑定失效。
      "alt-l": null
    }
  },
```

### 缺少键位绑定 {#edit-predictions-missing-keybinding}

Zed 要求在 `Editor && edit_prediction` 和 `Editor && edit_prediction_conflict` 两个上下文中至少为 {#action editor::AcceptEditPrediction} 操作设置一个键位绑定（[了解更多](#edit-predictions-keybinding)）。

如果您之前在全局上下文中将默认键位绑定到了不同的操作，您将无法预览或接受编辑预测。例如：

```json [keymap]
[
  // 您的键位映射
  {
    "bindings": {
      // 在全局范围内将 `alt-tab` 绑定到另一个操作
      "alt-tab": "menu::SelectNext"
    }
  }
]
```

要解决此问题，您可以为自己接受编辑预测的键位绑定进行指定：

```json [keymap]
[
  // ...
  {
    "context": "Editor && edit_prediction_conflict",
    "bindings": {
      "alt-l": "editor::AcceptEditPrediction"
    }
  }
]
```

如果您想使用默认键位绑定，您可以通过将您的绑定移动到更具体的上下文或将其更改为其他内容来释放它。

## 禁用自动编辑预测

您可以在多个级别禁用编辑预测，或者完全关闭它们。

或者，如果您已将 Zed 设置为您的提供商，请考虑[使用微妙模式](#switching-modes)。

### 在缓冲区中

为了避免在输入时自动显示预测，请在您的设置文件中进行设置（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "show_edit_predictions": false
}
```
这会隐藏所有预测可用性的指示，无论您处于[哪种显示模式](#switching-modes)（仅在将 Zed 作为提供商时有效）。
不过，您仍然可以通过执行 {#action editor::ShowEditPrediction} 或按下 {#kb editor::ShowEditPrediction} 来手动触发编辑预测。

### 对于特定语言

为了在与特定语言工作时不会自动显示预测，请在您的设置文件中进行设置（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "languages": {
    "Python": {
      "show_edit_predictions": false
    }
  }
}
```

### 在特定目录中

要为特定目录或文件禁用编辑预测，请在您的设置文件中进行设置（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "edit_predictions": {
    "disabled_globs": ["~/.config/zed/settings.json"]
  }
}
```

### 完全关闭

要在所有提供商中完全关闭编辑预测，请将设置明确为 `none`，如下所示：

```json [settings]
{
  "edit_predictions": {
    "provider": "none"
  }
}
```

## 配置其他提供商 {#other-providers}

编辑预测也与其他提供商一起工作。

### GitHub Copilot {#github-copilot}

要将 GitHub Copilot 用作您的提供商，请在您的设置文件中进行设置（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "edit_predictions": {
    "provider": "copilot"
  }
}
```
要登录 GitHub Copilot，请点击状态栏中的 Copilot 图标。一个弹出窗口会显示一个设备代码。点击复制按钮复制代码，然后点击“连接到 GitHub”以在您的浏览器中打开 GitHub 验证页面。在提示时粘贴该代码。授权成功后，弹出窗口将自动关闭。

#### 使用 GitHub Copilot 企业版

如果您的组织使用 GitHub Copilot 企业版，您可以通过在设置文件中指定企业 URI 来配置 Zed 使用您的企业实例（[如何编辑](../configuring-zed.md#settings-files)）：

```json [settings]
{
  "edit_predictions": {
    "copilot": {
      "enterprise_uri": "https://your.enterprise.domain"
    }
  }
}
```

将 `"https://your.enterprise.domain"` 替换为您的 GitHub 企业管理员提供的 URL（例如，`https://foo.ghe.com`）。

设置后，Zed 将通过您的企业端点路由 Copilot 请求。
当您通过点击状态栏中的 Copilot 图标登录时，您将被重定向到配置好的企业 URL 以完成身份验证。
所有其他 Copilot 功能和使用情况保持不变。

Copilot 可以提供多种补全选项，您可以使用以下操作进行导航：

- {#action editor::NextEditPrediction} ({#kb editor::NextEditPrediction}): 循环到下一个编辑预测
- {#action editor::PreviousEditPrediction} ({#kb editor::PreviousEditPrediction}): 循环到上一个编辑预测

### Sweep {#sweep}

要将 [Sweep](https://sweep.dev/) 用作您的提供商：

1. 打开设置编辑器（macOS 上为 `Cmd+,`，Linux/Windows 上为 `Ctrl+,`）
2. 搜索“Edit Predictions”并点击 **Configure Providers**
3. 找到 Sweep 部分，并从
   [Sweep 仪表板](https://app.sweep.dev/) 输入您的 API 密钥

或者，点击状态栏中的编辑预测图标，然后从菜单中选择
**Configure Providers**。

添加您的 API 密钥后，Sweep 将出现在状态栏菜单的提供商下拉列表中，您可以在其中选择它。您也可以直接在设置文件中进行设置：

```json [settings]
{
  "edit_predictions": {
    "provider": "sweep"
  }
}
```

### Mercury Coder {#mercury-coder}

要将 Inception Labs 的 [Mercury Coder](https://www.inceptionlabs.ai/) 用作您的提供商：

1. 打开设置编辑器（macOS 上为 `Cmd+,`，Linux/Windows 上为 `Ctrl+,`）
2. 搜索“Edit Predictions”并点击 **Configure Providers**
3. 找到 Mercury 部分，并从
   [Inception Labs 仪表板](https://platform.inceptionlabs.ai/dashboard/api-keys) 输入您的 API 密钥

或者，点击状态栏中的编辑预测图标，然后从菜单中选择
**Configure Providers**。

添加您的 API 密钥后，Mercury Coder 将出现在状态栏菜单的提供商下拉列表中，您可以在其中选择它。您也可以直接在设置文件中进行设置：

```json [settings]
{
  "edit_predictions": {
    "provider": "mercury"
  }
}
```

### Codestral {#codestral}

要将 Mistral 的 Codestral 用作您的提供商：

1. 打开设置编辑器（macOS 上为 `Cmd+,`，Linux/Windows 上为 `Ctrl+,`）
2. 搜索“Edit Predictions”并点击 **Configure Providers**
3. 找到 Codestral 部分，并从
   [Codestral 仪表板](https://console.mistral.ai/codestral) 输入您的 API 密钥

或者，点击状态栏中的编辑预测图标，然后从菜单中选择
**Configure Providers**。

添加您的 API 密钥后，Codestral 将出现在状态栏菜单的提供商下拉列表中，您可以在其中选择它。您也可以直接在设置文件中进行设置：

```json [settings]
{
  "edit_predictions": {
    "provider": "codestral"
  }
}
```

### 自托管 OpenAI 兼容的服务器

您可以使用任何实现了 OpenAI 补全 API 格式的自托管服务器。这适用于 vLLM、llama.cpp 服务器、LocalAI 以及其他兼容的服务器。

#### 配置

将 `open_ai_compatible_api` 设置为您的提供商并配置 API 端点：

```json [settings]
{
  "edit_predictions": {
    "provider": "open_ai_compatible_api",
    "open_ai_compatible_api": {
      "api_url": "http://localhost:8080/v1/completions",
      "model": "deepseek-coder-6.7b-base",
      "prompt_format": "deepseek_coder",
      "max_output_tokens": 64
    }
  }
}
```

`prompt_format` 设置控制如何为模型格式化代码上下文。使用 `"infer"` 从模型名称中检测格式，或明确指定一种：

- `code_llama` - CodeLlama 格式：`<PRE> prefix <SUF> suffix <MID>`
- `star_coder` - StarCoder 格式：`<fim_prefix>prefix<fim_suffix>suffix<fim_middle>`
- `deepseek_coder` - DeepSeek 格式，带有特殊 unicode 标记
- `qwen` - Qwen/CodeGemma 格式：`<|fim_prefix|>prefix<|fim_suffix|>suffix<|fim_middle|>`
- `codestral` - Codestral 格式：`[SUFFIX]suffix[PREFIX]prefix`
- `glm` - GLM-4 格式，带有代码标记
- `infer` - 从模型名称自动检测（默认）

您的服务器必须实现 OpenAI `/v1/completions` 端点。编辑预测将发送以下格式的 POST 请求：

```json
{
  "model": "your-model-name",
  "prompt": "formatted-code-context",
  "max_tokens": 256,
  "temperature": 0.2,
  "stop": ["\n", ...]
}
```

## 另请参阅

- [智能体面板](./agent-panel.md)：具有文件读写和终端访问的智能编辑
- [行内助手](./inline-assistant.md)：对选定代码的提示驱动转换