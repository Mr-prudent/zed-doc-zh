---
title: 计费 - Zed AI
description: 管理 Zed AI 计费、支付方式、发票、阈值计费和销售税信息。
---

# 计费

本页涵盖 Zed [订阅套餐](./subscription.md) 的计费信息。有关每个套餐包含的内容以及令牌使用方式的详细信息，请参阅 [套餐与用量](./plans-and-usage.md)。

我们使用 Stripe 作为我们的支付提供商，Orb 用于开具发票和计量。所有 Pro 套餐都需要通过信用卡或其他支持的支付方式进行支付。
基于发票的计费需要企业套餐。更多信息请联系 [sales@zed.dev](mailto:sales@zed.dev)。

## 计费信息 {#settings}

在 [dashboard.zed.dev/account](https://dashboard.zed.dev/account) 访问计费信息和设置。
此页面嵌入了来自 Orb（我们的发票和计量合作伙伴）的数据。

## 计费周期 {#billing-cycles}

Zed 根据您最初订阅的日期按月计费。在您订阅 Zed Pro 的每个月内，您将收到至少一张来自 Zed 的发票，如果当月增量令牌支出超过 10 美元，则会收到多张发票。

## 阈值计费 {#threshold-billing}

Zed 采用阈值计费以确保及时收取欠款并防止滥用。每当您使用 Zed 托管模型的费用超过 10 美元的阈值时，就会生成一张新发票，并且阈值会重置为 0。

例如，

- 您在 2 月 1 日订阅。您的第一张发票是 10 美元。
- 您在 2 月份使用了 12 美元的增量令牌，其中前 10 美元于 2 月 15 日支出。您将在 2 月 15 日收到一张 10 美元的发票。
- 3 月 1 日，您将收到一张 12 美元的发票：10 美元（3 月 Pro 订阅费）和 2 美元的剩余令牌支出，因为您的用量没有超过 10 美元的阈值。

## 支付失败 {#payment-failures}

如果发票支付失败，Zed 将阻止您使用我们的托管模型，直至支付完成。请联系 [billing-support@zed.dev](mailto:billing-support@zed.dev) 获取帮助。

## 发票历史 {#invoice-history}

您可以通过导航到 [dashboard.zed.dev/account](https://dashboard.zed.dev/account) 并在嵌入的 Orb 门户中点击 `Invoice history` 来访问您的发票历史。

如果您需要历史 Stripe 发票，请发送邮件至 [billing-support@zed.dev](mailto:billing-support@zed.dev)

## 更新计费信息 {#updating-billing-info}

如需帮助更新支付方式、姓名、地址和税务信息，请发送邮件至 [billing-support@zed.dev](mailto:billing-support@zed.dev)。

> 自助计费更新功能将在未来的版本中提供。

请注意，计费信息的更改将**仅**影响未来的发票——**我们无法修改历史发票**。

## 销售税 {#sales-tax}

Zed 与 [Sphere](https://www.getsphere.com/) 合作，根据客户位置和所售产品计算发票的间接税率。税金作为单独的行项目列在发票上，优先基于您的账单地址，其次是 Stripe 已知的卡发行国家。

如果您有增值税/商品及服务税 (VAT/GST) ID，您可以在结账时添加它。勾选表明您是企业的复选框。

请注意，VAT/GST ID 和地址的更改将**仅**影响未来的发票——**我们无法修改历史发票**。
如有任何问题或疑问，请联系 [billing-support@zed.dev](mailto:billing-support@zed.dev)。