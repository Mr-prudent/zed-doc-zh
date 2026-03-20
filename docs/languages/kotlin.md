---
title: Kotlin
description: "在 Zed 中配置 Kotlin 语言支持，包括语言服务器、格式化和调试。"
---

# Kotlin

Zed 中的 Kotlin 语言支持由社区维护的 [Kotlin 扩展](https://github.com/zed-extensions/kotlin) 提供。
问题反馈请提交至：[https://github.com/zed-extensions/kotlin/issues](https://github.com/zed-extensions/kotlin/issues)

- Tree-sitter: [fwcd/tree-sitter-kotlin](https://github.com/fwcd/tree-sitter-kotlin)
- 语言服务器: [fwcd/kotlin-language-server](https://github.com/fwcd/kotlin-language-server)
- 替代语言服务器: [kotlin/kotlin-lsp](https://github.com/kotlin/kotlin-lsp)

## 配置

工作区配置选项可以通过 `settings.json` 中的 lsp 设置传递给语言服务器。

完整的 lsp `settings` 列表可以在
[这里](https://github.com/fwcd/kotlin-language-server/blob/main/server/src/main/kotlin/org/javacs/kt/Configuration.kt)
的 `class Configuration` 类下的 `initialization_options` 和 `InitializationOptions` 类中找到。

### JVM 目标

以下示例将 JVM 目标从 `default`（即 1.8）更改为 `17`：

```json [settings]
{
  "lsp": {
    "kotlin-language-server": {
      "settings": {
        "compiler": {
          "jvm": {
            "target": "17"
          }
        }
      }
    }
  }
}
```

### JAVA_HOME

要使用特定的 Java 安装，只需通过以下方式指定 `JAVA_HOME` 环境变量：

```json [settings]
{
  "lsp": {
    "kotlin-language-server": {
      "binary": {
        "env": {
          "JAVA_HOME": "/Users/whatever/Applications/Work/Android Studio.app/Contents/jbr/Contents/Home"
        }
      }
    }
  }
}
```