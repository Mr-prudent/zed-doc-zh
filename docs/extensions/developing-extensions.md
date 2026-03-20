---
title: 开发扩展
description: "创建 Zed 扩展：语言、主题、调试器、斜杠命令等。"
---

# 开发扩展 {#developing-extensions}

Zed 扩展是包含 `extension.toml` 清单的 Git 仓库。它们可以提供语言、主题、调试器、代码片段、斜杠命令和 MCP 服务器。

## 扩展功能 {#extension-features}

扩展可以提供：

- [语言](./languages.md)
- [调试器](./debugger-extensions.md)
- [主题](./themes.md)
- [图标主题](./icon-themes.md)
- [代码片段](./snippets.md)
- [斜杠命令](./slash-commands.md)
- [MCP 服务器](./mcp-extensions.md)

## 在本地开发扩展

在开始为 Zed 开发扩展之前，请确保通过 [rustup 安装 Rust](https://www.rust-lang.org/tools/install)。

> 必须通过 rustup 安装 Rust。如果您通过 homebrew 或其他方式安装了 Rust，开发扩展将无法工作。

在开发扩展时，您可以通过将其安装为 _开发扩展_ 来在 Zed 中使用它，而无需发布它。

在扩展页面，点击 `安装开发扩展` 按钮（或 {#action zed::InstallDevExtension} 动作），并选择包含您的扩展的目录。

如果需要故障排除，请检查 Zed.log ({#action zed::OpenLog}) 以获取更多输出。对于调试输出，请在命令行中使用 `zed --foreground` 关闭并重新启动 Zed，这将显示更详细的 INFO 级别日志。

如果您已经安装了扩展的已发布版本，则在安装开发扩展之前，已发布的版本将被卸载。安装成功后，`扩展` 页面将指示上游扩展“被开发扩展覆盖”。

## Zed 扩展的目录结构

Zed 扩展是一个包含 `extension.toml` 的 Git 仓库。该文件必须包含一些有关扩展的基本信息：

```toml
id = "my-extension"
name = "My extension"
version = "0.0.1"
schema_version = 1
authors = ["Your Name <you@example.com>"]
description = "Example extension"
repository = "https://github.com/your-name/my-zed-extension"
```

> **注意：** 如果您正在开发主题扩展并打算稍后发布，请在您的主题扩展 ID 后面加上 `-theme`。否则，在 [扩展发布](#publishing-your-extension) 过程中可能会出现问题。

除此之外，还有几个其他可选的文件和目录可用于为 Zed 扩展添加功能。一个提供所有功能的扩展的示例目录结构如下：

```
my-extension/
  extension.toml
  Cargo.toml
  src/
    lib.rs
  languages/
    my-language/
      config.toml
      highlights.scm
  themes/
    my-theme.json
  snippets/
    snippets.json
    rust.json
```

## WebAssembly

扩展的过程部分用 Rust 编写并编译为 WebAssembly。要开发包含自定义代码的扩展，请包含如下的 `Cargo.toml`：

```toml
[package]
name = "my-extension"
version = "0.0.1"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
zed_extension_api = "0.1.0"
```

使用 [`zed_extension_api`](https://crates.io/crates/zed_extension_api) 在 crates.io 上提供的最新版本。确保它仍然与您想要支持的 [Zed 版本](https://github.com/zed-industries/zed/blob/main/crates/extension_api#compatible-zed-versions) 兼容。

在您的 Rust 包的 `src/lib.rs` 文件中，您需要为您的扩展定义一个结构体并实现 `Extension` trait，同时使用 `register_extension!` 宏来注册您的扩展：

```rs
use zed_extension_api as zed;

struct MyExtension {
    // ... 状态
}

impl zed::Extension for MyExtension {
    // ...
}

zed::register_extension!(MyExtension);
```

> `stdout`/`stderr` 直接转发到 Zed 进程。为了看到您的扩展中的 `println!`/`dbg!` 输出，您可以在终端中使用 `--foreground` 标志启动 Zed。

## 分叉和克隆仓库

1. 分叉仓库

> **注意：** 如果您将 `zed-industries/extensions` 仓库分叉到个人 GitHub 账户而不是 GitHub 组织，会非常有帮助，因为这样 Zed 工作人员就可以将任何需要的更改推送到您的 PR 以加快发布过程。

2. 将仓库克隆到您的本地机器

```sh
# 在这里替换为您分叉仓库的 URL：
# git clone https://github.com/zed-industries/extensions
cd extensions
git submodule init
git submodule update
```

## 扩展许可证要求

从 2025 年 10 月 1 日起，扩展仓库必须包含许可证。
以下许可证是被接受的：

- [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [BSD 2-Clause](https://opensource.org/license/bsd-2-clause)
- [BSD 3-Clause](https://opensource.org/license/bsd-3-clause)
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0)
- [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
- [GNU LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.en.html)
- [MIT](https://opensource.org/license/mit)
- [Unlicense](https://unlicense.org)
- [zlib](https://opensource.org/license/zlib)

这允许我们将从您的扩展代码生成的二进制文件分发给我们的用户。
如果没有有效的许可证，在以下步骤中添加或更新您的扩展的拉取请求将无法通过 CI。

您的许可证文件应位于扩展仓库的根目录下。任何以 `LICENCE` 或 `LICENSE` 作为前缀（不区分大小写）的文件都将被检查，以确保它与接受的许可证之一匹配。请参阅 [许可证验证源代码](https://github.com/zed-industries/extensions/blob/main/src/lib/license.js)。

> 此许可证要求仅适用于您扩展本身的代码（编译到扩展二进制文件中的代码）。
> 它不适用于您的扩展可能下载或交互的任何工具，例如语言服务器或其他外部依赖项。
> 如果您的仓库同时包含扩展代码和其他项目（如语言服务器），您不需要重新许可那些其他项目——只有扩展代码需要是上述接受的许可证之一。

## 发布您的扩展

要发布扩展，请向 [the `zed-industries/extensions` repo](https://github.com/zed-industries/extensions) 开启一个 PR。

在您的 PR 中，执行以下操作：

1. 将您的扩展作为 Git 子模块添加到 `extensions/` 目录中

```sh
git submodule add https://github.com/your-username/foobar-zed.git extensions/foobar
git add extensions/foobar
```

> 所有扩展子模块必须使用 HTTPS URL 而不是 SSH URL (`git@github.com`)。

2. 在顶层的 `extensions.toml` 文件中添加一个包含您扩展的新条目：

```toml
[my-extension]
submodule = "extensions/my-extension"
version = "0.0.1"
```

> 如果您的扩展位于子模块的子目录中，您可以使用 `path` 字段指向扩展所在的位置。

3. 运行 `pnpm sort-extensions` 以确保 `extensions.toml` 和 `.gitmodules` 已排序

一旦您的 PR 被合并，扩展将被打包并发布到 Zed 扩展注册表。

> 扩展 ID 和名称不应包含 `zed` 或 `Zed`，因为它们都是 Zed 扩展。

## 更新扩展

要更新扩展，请向 [the `zed-industries/extensions` repo](https://github.com/zed-industries/extensions) 开启一个 PR。

在您的 PR 中，执行以下操作：

1. 将扩展的子模块更新到新版本的提交。为此，您可以运行

```sh
# 从仓库的根目录：
git submodule update --remote extensions/your-extension-name
```

以将您的扩展更新到远程仓库中可用的最新提交。

2. 在 `extensions.toml` 中更新扩展的 `version` 字段
   - 确保 `version` 与特定提交中 `extension.toml` 中设置的版本相匹配。

如果您想自动化此过程，可以使用一个 [社区 GitHub Action](https://github.com/huacnlee/zed-extension-action)。

> **注意：** 如果您的扩展仓库有不同的许可证，您需要在发布更新之前将其更新为 [接受的扩展许可证](#extension-license-requirements) 之一。