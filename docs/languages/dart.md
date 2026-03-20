---
title: Dart
description: "在 Zed 中配置 Dart 语言支持，包括语言服务器、格式化和调试。"
---

# Dart

Dart 支持可通过 [Dart 扩展](https://github.com/zed-extensions/dart) 使用。

- Tree-sitter: [UserNobody14/tree-sitter-dart](https://github.com/UserNobody14/tree-sitter-dart)
- 语言服务器: [dart language-server](https://github.com/dart-lang/sdk)

## 先决条件

你需要安装 Dart SDK。

你可以从 [dart.dev/get-dart](https://dart.dev/get-dart) 安装 dart，或者通过 [Flutter 版本管理 CLI (fvm)](https://fvm.app/documentation/getting-started/installation) 进行安装。

## 配置

如果你将 `dart` 添加到了环境变量路径中，dart 扩展无需额外配置：

```sh
which dart
dart --version
```

如果你想使用特定的 dart 可执行文件，或者通过 FVM 使用 dart，你可以在 Zed 的 settings.json 文件中指定 `dart` 可执行文件的路径：

```json [settings]
{
  "lsp": {
    "dart": {
      "binary": {
        "path": "/opt/homebrew/bin/fvm",
        "arguments": ["dart", "language-server", "--protocol=lsp"]
      }
    }
  }
}
```

### 格式化

默认情况下，Dart 使用一个非常保守的最大行长度（80）。如果你希望 dart LSP 在自动格式化时允许更长的行长度，请将以下内容添加到你的 Zed settings.json 中：

```json [settings]
{
  "lsp": {
    "dart": {
      "settings": {
        "lineLength": 140
      }
    }
  }
}
```

有关 [dart language-server 功能](https://github.com/dart-lang/sdk/blob/main/pkg/analysis_server/tool/lsp_spec/README.md) 的更多信息，请参阅 Dart 文档。