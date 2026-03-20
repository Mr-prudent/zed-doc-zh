---
title: 协作
description: "Zed 中的实时协作：共享项目、协同编辑代码，并通过语音聊天进行沟通。"
---

# 概述 {#collaboration}

Zed 支持实时多人协作编辑。多人可以同时在同一个项目中工作，实时看到彼此的光标和编辑操作。

使用 {#kb collab_panel::ToggleFocus} 打开协作面板。你需要 [登录](../authentication.md#signing-in) 才能使用协作功能。

## 协作面板 {#collaboration-panel}

协作面板包含两个部分：

1. [频道](./channels.md)：用于团队协作的持久性项目房间，支持共享项目和语音聊天。
2. [联系人及私人通话](./contacts-and-private-calls.md)：用于临时私人会话的联系人列表。

> **警告**：共享项目会给协作者在该项目内访问你本地文件系统的权限。请仅与你信任的人进行协作。

更多详情请参阅 [数据与隐私常见问题](https://zed.dev/faq#data-and-privacy)。

## 音频设置 {#audio-settings}

### 选择音频设备

你可以选择特定的输入和输出音频设备，而不是使用系统默认值。要配置音频设备：

1. 打开 {#kb zed::OpenSettings}
2. 导航到 **协作** > **实验性功能**
3. 使用 **输出音频设备** 和 **输入音频设备** 下拉菜单选择你想要的设备

更改会立即生效。如果你选择的设备变得不可用，Zed 将回退到系统默认值。

要测试你的音频配置，请在同一部分中点击 **测试音频**。这将打开一个窗口，你可以验证你的麦克风和扬声器在所选设备上是否正常工作。

**JSON 配置：**

```json [settings]
{
  "audio": {
    "experimental.output_audio_device": "设备名称 (设备-id)",
    "experimental.input_audio_device": "设备名称 (设备-id)"
  }
}
```

将任一值设置为 `null` 以使用系统默认值。