---
title: Lua
description: "在 Zed 中配置 Lua 语言支持，包括语言服务器、格式化和调试。"
---

# Lua

Lua 支持可通过 [Lua 扩展](https://github.com/zed-extensions/lua) 获得。

- Tree-sitter: [tree-sitter-grammars/tree-sitter-lua](https://github.com/tree-sitter-grammars/tree-sitter-lua)
- 语言服务器: [LuaLS/lua-language-server](https://github.com/LuaLS/lua-language-server)

## luarc.json

若要配置 LuaLS，您可以在项目根目录下创建一个 `.luarc.json` 文件。

```json
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "format.enable": true,
  "workspace.library": ["../somedir/library"]
}
```

有关所有可用的配置选项，请参阅 [LuaLS 设置文档](https://luals.github.io/wiki/settings/)，或者在 Zed 中编辑此文件时，可用的设置选项会自动补全（例如 `runtime.version` 会显示 `"Lua 5.1"`、`"Lua 5.2"`、`"Lua 5.3"`、`"Lua 5.4"` 和 `"LuaJIT"` 作为允许值）。注意，当从 VS Code 导入设置选项时，请移除 `Lua.` 前缀。（例如，使用 `runtime.version` 而不是 `Lua.runtime.version`）。

### LuaCATS 定义

借助 LuaCATS (Lua Comment and Type System) 定义，LuaLS 可以提供增强的 LSP 自动补全建议和类型验证。许多常见的 Lua 库都有这些定义，您可以通过 `luarc.json` 中的 `workspace.library` 指定包含它们的本地路径。如果将您的定义检出到项目的同一父目录下（例如 `../playdate-luacats`、`../love2d` 等），则可以通过相对路径来指定。或者，您可以在项目中为每个 LuaCATS 定义仓库创建子模块。

### LÖVE (Love2D) {#love2d}

要在 Zed 中使用 [LÖVE (Love2D)](https://love2d.org/)，请将 [LuaCATS/love2d](https://github.com/LuaCATS/love2d) 克隆到项目父目录下的名为 `love2d-luacats` 的文件夹中：

```sh
cd .. && git clone https://github.com/LuaCATS/love2d love2d-luacats
```

然后在您的 `.luarc.json` 中：

```json
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "workspace.library": ["../love2d-luacats"],
  "runtime.special": {
    "love.filesystem.load": "loadfile"
  }
}
```

### PlaydateSDK

要在 Zed 中使用 [Playdate Lua SDK](https://play.date/dev/)，请将 [playdate-luacats](https://github.com/notpeter/playdate-luacats) 克隆到项目的父目录中：

```sh
cd .. && git clone https://github.com/notpeter/playdate-luacats
```

然后在您的 `.luarc.json` 中：

```json
{
  "$schema": "https://raw.githubusercontent.com/LuaLS/vscode-lua/master/setting/schema.json",
  "runtime.version": "Lua 5.4",
  "runtime.nonstandardSymbol": [
    "+=",
    "-=",
    "*=",
    "/=",
    "//=",
    "%=",
    "<<=",
    ">>=",
    "&=",
    "|=",
    "^="
  ],
  "diagnostics.severity": { "duplicate-set-field": "Hint" },
  "diagnostics.globals": ["import"],
  "workspace.library": ["../playdate-luacats"],
  "format.defaultConfig": {
    "indent_style": "space",
    "indent_size": "4"
  },
  "format.enable": true,
  "runtime.builtin": { "io": "disable", "os": "disable", "package": "disable" }
}
```

### 内联提示

要在 Zed 中为 LuaLS 启用 [内联提示](../configuring-languages.md#inlay-hints)

1. 在“设置” ({#kb zed::OpenSettings}) 中，于“语言” > “Lua”下配置内联提示，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Lua": {
      "inlay_hints": {
        "enabled": true,
        "show_type_hints": true,
        "show_parameter_hints": true,
        "show_other_hints": true
      }
    }
  }
}
```

2. 在您的 `.luarc.json` 中添加 `"hint.enable": true`。

## 格式化

### LuaLS 格式化

要使用您的 LuaLS（由 [CppCXY/EmmyLuaCodeStyle](https://github.com/CppCXY/EmmyLuaCodeStyle) 提供）启用自动格式化，请确保您的 `.luarc.json` 中有 `"format.enable": true,`：

```json
{
  "$schema": "https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json",
  "format.enable": true
}
```

在“设置” ({#kb zed::OpenSettings}) 中，于“语言” > “Lua”下配置格式化，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Lua": {
      "format_on_save": "on",
      "formatter": "language_server"
    }
  }
}
```

您可以通过 `.editorconfig` 自定义各种 EmmyLuaCodeStyle 样式选项，所有可用选项请参见 [lua.template.editorconfig](https://github.com/CppCXY/EmmyLuaCodeStyle/blob/master/lua.template.editorconfig)。

### StyLua 格式化

或者，使用 [StyLua](https://github.com/JohnnyMorganz/StyLua) 进行自动格式化：

1. 安装 [StyLua](https://github.com/JohnnyMorganz/StyLua): `brew install stylua` 或 `cargo install stylua --features lua52,lua53,lua54,luau,luajit`（可以随时移除任何不需要的 Lua 版本）。
2. 在“设置” ({#kb zed::OpenSettings}) 中，于“语言” > “Lua”下配置格式化，或者将其添加到您的设置文件中：

```json [settings]
{
  "languages": {
    "Lua": {
      "format_on_save": "on",
      "formatter": {
        "external": {
          "command": "stylua",
          "arguments": [
            "--syntax=Lua54",
            "--respect-ignores",
            "--stdin-filepath",
            "{buffer_path}",
            "-"
          ]
        }
      }
    }
  }
}
```

您可以在上述命令行中指定各种 StyLua 选项（例如 `--syntax=Lua54`），或者在您的项目中创建一个 `stylua.toml` 文件：

```toml
syntax = "Lua54"
column_width = 100
line_endings = "Unix"
indent_type = "Spaces"
indent_width = 4
quote_style = "AutoPreferDouble"
call_parentheses = "Always"
collapse_simple_statement = "All"

[sort_requires]
enabled = true
```

有关可用选项的完整列表，请参阅：[StyLua 选项](https://github.com/JohnnyMorganz/StyLua?tab=readme-ov-file#options)。