---
title: Swift
description: "在 Zed 中配置 Swift 语言支持，包括语言服务器、格式化和调试。"
---

# Swift

Zed 中的 Swift 语言支持由社区维护的 [Swift 扩展](https://github.com/zed-extensions/swift) 提供。
问题反馈请提交至：[https://github.com/zed-extensions/swift/issues](https://github.com/zed-extensions/swift/issues)

- Tree-sitter: [alex-pinkus/tree-sitter-swift](https://github.com/alex-pinkus/tree-sitter-swift)
- Language Server: [swiftlang/sourcekit-lsp](https://github.com/swiftlang/sourcekit-lsp)
- Debug Adapter: [`lldb-dap`](https://github.com/swiftlang/llvm-project/blob/next/lldb/tools/lldb-dap/README.md)

## 语言服务器配置

您可以通过在主目录或项目根目录下创建 `.sourcekit-lsp/config.json` 来修改 SourceKit LSP 的行为。完整文档请参见 [SourceKit-LSP 配置文件](https://github.com/swiftlang/sourcekit-lsp/blob/main/Documentation/Configuration%20File.md)。

## 调试

Swift 扩展为调试 Swift 代码提供了调试适配器。
Zed 中该适配器的名称（在 UI 和 `debug.json` 中）为 `Swift`，其底层使用 Swift 工具链提供的 [`lldb-dap`](https://github.com/swiftlang/llvm-project/blob/next/lldb/tools/lldb-dap/README.md)。
扩展程序按以下优先级顺序尝试查找 `lldb-dap` 二进制文件：使用 `swiftly`、使用 `xcrun`、搜索 `$PATH`。
如果找不到 `lldb-dap`，扩展不会尝试下载它。

- [lldb-dap 配置文档](https://github.com/llvm/llvm-project/blob/main/lldb/tools/lldb-dap/README.md#configuration-settings-reference)

### 示例

#### 构建并调试 Swift 二进制文件

```json [debug]
[
  {
    "label": "调试 Swift",
    "build": {
      "command": "swift",
      "args": ["build"]
    },
    "program": "$ZED_WORKTREE_ROOT/swift-app/.build/arm64-apple-macosx/debug/swift-app",
    "request": "launch",
    "adapter": "Swift"
  }
]
```