---
title: Yarn
description: "在 Zed 中配置 Yarn 语言支持，包括语言服务器、格式化和调试。"
---

# Yarn

[Yarn](https://yarnpkg.com/) 是一个 JavaScript 包管理器，它提供确定性的依赖解析和离线缓存功能。

## 设置

1. 运行 `yarn dlx @yarnpkg/sdks base` 以生成一个 `.yarn/sdks` 目录。
2. 在 [LSP 初始化选项](../reference/all-settings.md#lsp) 中，将您的语言服务器（例如 VTSLS）设置为使用 `.yarn/sdks/typescript/lib` 目录中的 TypeScript SDK。具体设置取决于您的语言服务器；例如，对于 VTSLS，请设置 [`typescript.tsdk`](https://github.com/yioneko/vtsls/blob/6adfb5d3889ad4b82c5e238446b27ae3ee1e3767/packages/service/configuration.schema.json#L5)。

配置完成后，语言服务器功能（跳转到定义、自动补全、悬停文档提示）应该可以正常工作。