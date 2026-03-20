---
title: OCaml
description: "在 Zed 中配置 OCaml 语言支持，包括语言服务器、格式化和调试。"
---

# OCaml

OCaml 支持通过 [OCaml 扩展](https://github.com/zed-extensions/ocaml) 提供。

- Tree-sitter: [tree-sitter/tree-sitter-ocaml](https://github.com/tree-sitter/tree-sitter-ocaml)
- Language Server: [ocaml/ocaml-lsp](https://github.com/ocaml/ocaml-lsp)

## 设置说明

如果您已经设置了开发环境，可以跳到 [启动 Zed](#launching-zed)

### 使用 Opam

Opam 是 OCaml 的官方包管理器，强烈推荐用于开始 OCaml 开发。要开始使用 Opam，请遵循 [此处](https://ocaml.org/install) 提供的说明。

一旦您按照说明安装了 opam 并使用您的开发环境设置了 switch (切换环境)，您就可以继续了。

### 启动 Zed

此时您应该已经安装了 `ocamllsp`，您可以通过在终端中运行

```sh
ocamllsp --help
```

来验证。如果您看到帮助信息，那就一切就绪。如果没有，请重新查阅 `ocamllsp` 的安装说明，确保它已正确安装。

除此之外，我们现在可以启动 Zed。考虑到 OCaml 包管理器的工作方式，我们要求您从终端运行 Zed，因此请确保您已经安装了 [Zed cli](https://zed.dev/features#cli)。

一旦您拥有了 cli，只需从终端导航到您的项目并运行

```sh
zed .
```

现在您应该已经运行了带有 OCaml 支持的 Zed，无需进行其他设置。