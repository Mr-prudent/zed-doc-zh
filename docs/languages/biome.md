---
title: Biome
description: "在 Zed 中配置 Biome 语言支持，包括语言服务器、格式化和调试功能。"
---

# Biome

Zed 中的 [Biome](https://biomejs.dev/) 支持由社区维护的 [Biome 扩展](https://github.com/biomejs/biome-zed) 提供。
问题反馈地址：[https://github.com/biomejs/biome-zed/issues](https://github.com/biomejs/biome-zed/issues)

- 语言服务器：[biomejs/biome](https://github.com/biomejs/biome)

## Biome 语言支持

Biome 扩展支持以下语言：

- JavaScript
- TypeScript
- JSX
- TSX
- JSON
- JSONC
- Vue.js
- Astro
- Svelte
- CSS

## 配置

默认情况下，`biome.json` 文件必须位于工作区的根目录。

```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json"
}
```

有关 `biome.json` 选项的完整列表，请参阅 [Biome 配置](https://biomejs.dev/reference/configuration/) 文档。

有关完整的功能和配置选项列表，请参阅 [Biome Zed 扩展 README](https://github.com/biomejs/biome-zed)。