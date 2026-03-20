---
title: Rego
description: "在 Zed 中配置 Rego 语言支持，包括语言服务器、格式化和调试。"
---

# Rego

Zed 中的 Rego 语言支持由社区维护的 [Rego 扩展](https://github.com/StyraInc/zed-rego) 提供。

- Tree-sitter: [FallenAngel97/tree-sitter-rego](https://github.com/FallenAngel97/tree-sitter-rego)
- 语言服务器: [open-policy-agent/regal](https://github.com/open-policy-agent/regal)

## 安装

该扩展主要基于 [Regal](https://docs.styra.com/regal/language-server) 语言服务器，应安装该服务器以使用扩展。阅读 [入门指南](https://docs.styra.com/regal#getting-started) 获取更多信息。

## 配置

扩展的行为在 `.regal/config.yaml` 文件中进行配置。以下是一个示例配置，它禁用了 `todo-comment` 规则，自定义了 `line-length` 规则，并忽略了 `opa-fmt` 规则的测试文件：

```yaml
rules:
  style:
    todo-comment:
      # 不报告待办注释
      level: ignore
    line-length:
      # 自定义规则配置
      max-line-length: 100
      # 对过长的行发出警告，但不报错
      level: warning
    opa-fmt:
      # 不需要，因为错误是默认值，但
      # 明确指定也无妨
      level: error
      # 可以忽略任何单独规则的文件
      # 在此示例中，测试文件被忽略
      ignore:
        files:
          - "*_test.rego"
```

阅读 Regal 的 [配置文档](https://docs.styra.com/regal#configuration) 获取更多信息。