---
title: 使用 Zed 进行身份验证
description: "登录 Zed 以访问协作功能和 AI 服务。"
---

# 身份验证

登录 Zed 并非必需。你无需登录即可使用代码编辑器中的大多数功能。我们在此将概述需要登录的少数功能，以及如何操作。

## 哪些功能需要登录？

1. 所有的实时 [协作功能](./collaboration/overview.md)。
2. [由 LLM 提供的功能](./ai/overview.md)，如果你使用 Zed 作为你的 LLM 模型提供商。要使用 AI 而无需登录，你可以 [引入并配置你自己的 API 密钥](./ai/llm-providers.md#use-your-own-keys)。

## 登录

Zed 使用 GitHub 的 OAuth 流程对用户进行身份验证，只需要 `read:user` GitHub 权限，该权限授予对你的 GitHub 个人资料的只读访问权限。

1. 打开 Zed，然后单击窗口右上角的 `Sign In` 按钮，或者从命令面板（macOS 上为 `cmd-shift-p`，Windows/Linux 上为 `ctrl-shift-p`）运行 `client: sign in` 命令。
2. 你的默认网络浏览器将打开并显示 Zed 登录页面。
3. 当提示时，使用你的 GitHub 账户进行身份验证。
4. 身份验证成功后，你的浏览器将显示一个确认信息，并且你将自动登录 Zed。

**注意**：如果你在公司防火墙后面，请确保允许与 `zed.dev` 和 `collab.zed.dev` 的连接。

## 登出

要退出 Zed，你可以使用以下任一方法：

- 单击右上角的个人资料图标，然后从下拉菜单中选择 `Sign Out`。
- 打开命令面板并运行 `client: sign out` 命令。

## 电子邮件地址 {#email}

你的 Zed 账户的电子邮件地址是由 GitHub OAuth 提供的地址。如果你有公开的电子邮件地址，则将使用该地址，否则将使用你的主要 GitHub 电子邮件地址。在 GitHub 上更改你的电子邮件地址可以通过 [登录 zed.dev](https://zed.dev/sign_in) 同步到你的 Zed 账户。

Stripe 用于计费，并且在开始订阅时将使用你的 Zed 账户的电子邮件地址。目前，更改 Zed 账户的电子邮件地址并不会更新 Stripe 中使用的电子邮件地址。有关如何更改此电子邮件地址，请参阅 [更新计费信息](./ai/billing.md#updating-billing-info)。

## 从界面中隐藏登录按钮

如果不使用登录功能，可以通过使用 `show_sign_in` 设置属性从界面中隐藏它。
有关更多详细信息，请参阅 [视觉定制页面](./visual-customization.md)。