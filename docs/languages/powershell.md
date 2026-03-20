---
title: PowerShell
description: "配置 Zed 中的 PowerShell 语言支持，包括语言服务器、格式化和调试。"
---

# PowerShell

Zed 中的 PowerShell 语言支持由社区维护的 [Zed PowerShell 扩展](https://github.com/wingyplus/zed-powershell) 提供。请在此报告问题：[github.com/wingyplus/zed-powershell/issues](https://github.com/wingyplus/zed-powershell/issues)

- Tree-sitter: [airbus-cert/tree-sitter-powershell](https://github.com/airbus-cert/tree-sitter-powershell)
- Language Server: [PowerShell/PowerShellEditorServices](https://github.com/PowerShell/PowerShellEditorServices)

## 设置

### 安装 PowerShell 7+ {#powershell-install}

- macOS: `brew install powershell/tap/powershell`
- Alpine: [在 Alpine Linux 上安装 PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-alpine)
- Debian: [在 Debian Linux 上安装 PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-debian)
- RedHat: [在 RHEL 上安装 PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-rhel)
- Ubuntu: [在 Ubuntu 上安装 PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/install-ubuntu)
- Windows: [在 Windows 上安装 PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)

Zed PowerShell 扩展将默认使用您路径中找到的 `pwsh` 可执行文件。

### 安装 PowerShell Editor Services (可选) {#powershell-editor-services}

Zed PowerShell 扩展将尝试自动下载 [PowerShell Editor Services](https://github.com/PowerShell/PowerShellEditorServices)。

如果您想使用特定的二进制文件，可以在您的 Zed settings.json 中进行指定：

```json [settings]
  "lsp": {
    "powershell-es": {
      "binary": {
        "path": "/path/to/PowerShellEditorServices"
      }
    }
  }
```