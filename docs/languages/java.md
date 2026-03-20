---
title: Java
description: "在 Zed 中配置 Java 语言支持，包括语言服务器、格式化和调试。"
---

# Java

Zed 中的 Java 语言支持由以下组件提供：

- Zed Java: [zed-extensions/java](https://github.com/zed-extensions/java)
- Tree-sitter: [tree-sitter/tree-sitter-java](https://github.com/tree-sitter/tree-sitter-java)
- Language Server: [eclipse-jdtls/eclipse.jdt.ls](https://github.com/eclipse-jdtls/eclipse.jdt.ls)

## 安装 OpenJDK

您需要安装一个 Java 运行时环境 (OpenJDK)。

- macOS: `brew install openjdk`
- Ubuntu: `sudo add-apt-repository ppa:openjdk-23 && sudo apt-get install openjdk-23`
- Windows: `choco install openjdk`
- Arch Linux: `sudo pacman -S jre-openjdk-headless`

或者手动下载并安装 [OpenJDK 23](https://jdk.java.net/23/)。

## 扩展安装

您可以通过打开 {#action zed::Extensions}({#kb zed::Extensions}) 并搜索 `java` 来进行安装。

## 快速上手和配置

对于大多数用户来说，Java 支持应该开箱即用。

- 通常建议将 Zed 项目的根目录设置为 Java 项目的根文件夹（通常在这里会有您的 `pom.xml` 或 `build.gradle` 文件）。

- 默认情况下，扩展程序会为您下载并运行最新版本的 JDTLS，但这要求您的系统上可通过 `$JAVA_HOME` 环境变量或 `$PATH` 上的 `java(.exe)` 可执行文件提供 Java 21。如果您的项目需要在环境中使用较低的 Java 版本，您可以通过 `java_home` 配置选项指定要用来运行 JDTLS 的不同 JDK。

- 您可以通过向您的 `$PATH` 环境变量中添加一个名为 `jdtls`（在 Windows 上为 `jdtls.bat`）的可执行文件，来为 JDTLS 提供一个**自定义启动脚本**。如果存在此文件，扩展程序将跳过下载和启动托管实例，而是使用环境中的那个。

- 要支持 [Lombok](https://projectlombok.org/)，必须在启动 JDTLS 时下载 lombok-jar 并将其注册为 Java-Agent。默认情况下，扩展程序会自动处理这一点，但如果您不希望这样做，可以将 `lombok_support` 配置选项设置为 `false`。

这是一个包含上述配置的常用 `settings.json`：

```jsonc
{
  "lsp": {
    "jdtls": {
      "settings": {
        "java_home": "/path/to/your/JDK21+",
        "lombok_support": true,
      },
    },
  },
}
```

## 调试

调试支持通过我们分叉的 [Java Debug](https://github.com/zed-industries/java-debug) 启用，扩展程序将为您自动下载并启动它。有关 Zed 中调试工作原理的通用信息，请参阅 [调试器文档](https://zed.dev/docs/debugger#getting-started)。

要开始使用 Java 调试，请在调试菜单中点击 `edit debug.json` 按钮，并将文件内容替换为以下内容：

```jsonc
[
  {
    "adapter": "Java",
    "request": "launch",
    "label": "Launch Debugger",
    // 如果您的项目有多个入口点，请指定要使用的那个：
    // "mainClass": "com.myorganization.myproject.MyMainClass",
    //
    // 这实际上会在您的程序入口处设置一个断点：
    "stopOnEntry": true,
    // 调试进程的工作目录
    "cwd": "$ZED_WORKTREE_ROOT",
  },
]
```

之后，您应该能够通过调试菜单中的 "Launch Debugger" 场景启动新的调试会话。

## Windows 中的启动脚本（即任务）

此扩展程序提供了通过 Zed 内部的测试/入口点旁边的小播放按钮来运行您的应用程序和测试的任务。然而，由于当前 Zed 扩展接口的限制，我们无法提供在 Windows 和类 Unix 系统上同时适用于 Maven 和 Gradle 的脚本，因此开箱即用的启动脚本仅在 Mac 和 Linux 上有效。

有一个相当简单的修复方法，您可以通过提供自己的任务脚本使其在 Windows 上工作。有关如何操作的信息，请参阅 [此问题](https://github.com/zed-extensions/java/issues/94)，并阅读 Zed 文档中的 [任务部分](https://zed.dev/docs/tasks) 以获取更多信息。

## 高级配置/JDTLS 初始化选项

JDTLS 提供了许多可通过 `initialize` LSP 请求传递的配置选项。扩展程序会将您设置中 `lsp.jdtls.settings.initialization_options` 的 JSON 对象传递给 JDTLS。有关可用选项和值的信息，请参阅 [JDTLS 配置 Wiki 页面](https://github.com/eclipse-jdtls/eclipse.jdt.ls/wiki/Running-the-JAVA-LS-server-from-the-command-line#initialize-request)。下面是一个 `settings.json` 示例，它会将上述 Wiki 页面中的示例配置传递给 JDTLS：

```jsonc
{
  "lsp": {
    "jdtls": {
      "settings": {
        // 这将作为 initializationOptions 发送给 JDTLS：
        "initialization_options": {
          "bundles": [],
          // 如果您的 zed 项目根文件夹与 java 项目根文件夹不同，请使用此选项：
          "workspaceFolders": ["file:///home/snjeza/Project"],
          "settings": {
            "java": {
              "home": "/usr/local/jdk-9.0.1",
              "errors": {
                "incompleteClasspath": {
                  "severity": "warning",
                },
              },
              "configuration": {
                "updateBuildConfiguration": "interactive",
                "maven": {
                  "userSettings": null,
                },
              },
              "import": {
                "gradle": {
                  "enabled": true,
                },
                "maven": {
                  "enabled": true,
                },
                "exclusions": [
                  "**/node_modules/**",
                  "**/.metadata/**",
                  "**/archetype-resources/**",
                  "**/META-INF/maven/**",
                  "/**/test/**",
                ],
              },
              "referencesCodeLens": {
                "enabled": false,
              },
              "signatureHelp": {
                "enabled": false,
              },
              "implementationCodeLens": "all",
              "format": {
                "enabled": true,
              },
              "saveActions": {
                "organizeImports": false,
              },
              "contentProvider": {
                "preferred": null,
              },
              "autobuild": {
                "enabled": false,
              },
              "completion": {
                "favoriteStaticMembers": [
                  "org.junit.Assert.*",
                  "org.junit.Assume.*",
                  "org.junit.jupiter.api.Assertions.*",
                  "org.junit.jupiter.api.Assumptions.*",
                  "org.junit.jupiter.api.DynamicContainer.*",
                  "org.junit.jupiter.api.DynamicTest.*",
                ],
                "importOrder": ["java", "javax", "com", "org"],
              },
            },
          },
        },
      },
    },
  },
}
```

## 另请参阅

[Zed Java 仓库](https://github.com/zed-extensions/java)
[Eclipse JDTLS 仓库](https://github.com/eclipse-jdtls/eclipse.jdt.ls)