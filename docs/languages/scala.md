---
title: Scala
description: "在 Zed 中配置 Scala 语言支持，包括语言服务器、格式化和调试。"
---

# Scala

Zed 中的 Scala 语言支持由社区维护的 [Scala 扩展](https://github.com/scalameta/metals-zed) 提供。
问题反馈请提交至：[https://github.com/scalameta/metals-zed/issues](https://github.com/scalameta/metals-zed/issues)

- Tree-sitter: [tree-sitter/tree-sitter-scala](https://github.com/tree-sitter/tree-sitter-scala)
- 语言服务器: [scalameta/metals](https://github.com/scalameta/metals)

## 安装设置

- 使用 `cs setup` (Coursier) 安装 Scala：https://www.scala-lang.org/download/
  - `brew install coursier/formulas/coursier && cs setup`
- REPL (Almond) 设置说明 https://almond.sh/docs/quick-start-install
  - `brew install --cask temurin` (Eclipse 基金会官方 OpenJDK 二进制文件)
  - `brew install coursier/formulas/coursier && cs setup`
  - `coursier launch --use-bootstrap almond -- --install`

## 配置

可以通过以下方式控制 Metals 语言服务器的行为：

- `.scalafix.conf` 文件 - 参见 [Scalafix 配置](https://scalacenter.github.io/scalafix/docs/users/configuration.html)
- `.scalafmt.conf` 文件 - 参见 [Scalafmt 配置](https://scalameta.org/scalafmt/docs/configuration.html)

您可以将这些文件放在项目的根目录，或在 Metals 配置中指定它们的位置。更多信息请参见 [Metals 用户配置](https://scalameta.org/metals/docs/editors/user-configuration)。

<!--
待办：在 Zed settings.json 中提供 metals 的 LSP 配置示例。metals.{javaHome,excludedPackages,customProjectRoot} 等。
-->