---
title: Proto
description: "在 Zed 中配置 Proto 语言支持，包括语言服务器、格式化和调试功能。"
---

# Proto

Proto/proto3（Protocol Buffers 定义语言）支持通过 [Proto 扩展](https://github.com/zed-industries/zed/tree/main/extensions/proto) 提供。

- Tree-sitter: [coder3101/tree-sitter-proto](https://github.com/coder3101/tree-sitter-proto)
- Language Servers: [protobuf-language-server](https://github.com/lasorda/protobuf-language-server)

<!--
待定：明确应使用哪个语言服务器 / 功能支持。

## 设置

### 安装 protobuf-language-server

安装 protobuf-language-server 并确保它在你的 PATH 中：

```
go install github.com/lasorda/protobuf-language-server@latest
which protobuf-language-server
```

### 安装 ProtoLS

安装 protols 并确保它在你的 PATH 中：

```
cargo install protols
which protols
```

## 配置

```json [settings]
"lsp": {
  "protobuf-language-server": {
    "binary": {
      "path": "protols"
    }
  }
}
```

## 格式化

如果您已安装 `clang-format`，ProtoLS 支持格式化功能。

```sh
# macOS:
brew install clang-format
# Ubuntu
sudo apt-get install clang-format
# Fedora
sudo dnf install clang-tools-extra
```

要自定义格式化偏好，请创建一个 `.clang-format` 文件，例如：

```clang-format
IndentWidth: 4
ColumnLimit: 120
```

或者，你也可以通过在设置中将 `clang-format` 指定为 [formatter](https://zed.dev/docs/reference/all-settings#formatter)，让 zed 直接调用它：

```json [settings]
  "languages": {
    "Proto": {
      "format_on_save": "on",
      "tab_size": 4,
      "formatter": {
        "external": {
          "command": "clang-format",
          "arguments": ["-style={IndentWidth: 4, ColumnLimit: 0}"]
        }
      }
    },
  }
```
-->