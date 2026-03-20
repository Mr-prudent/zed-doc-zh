---
title: SQL
description: "在 Zed 中配置 SQL 语言支持，包括语言服务器、格式化和调试。"
---

# SQL

SQL 文件由 [SQL 扩展](https://github.com/zed-extensions/sql) 处理。

- Tree-sitter: [nervenes/tree-sitter-sql](https://github.com/nervenes/tree-sitter-sql)

### 格式化

Zed 支持使用外部工具（如 [`sql-formatter`](https://github.com/sql-formatter-org/sql-formatter)）自动格式化 SQL。

1. 安装 `sql-formatter`：

```sh
npm install -g sql-formatter
```

2. 确保 `sql-formatter` 在你的路径中可用，并检查版本：

```sh
which sql-formatter
sql-formatter --version
```

3. 在设置 ({#kb zed::OpenSettings}) 的“语言” > “SQL”下配置格式化，或将其添加到你的设置文件中：

```json [settings]
  "languages": {
    "SQL": {
      "formatter": {
        "external": {
          "command": "sql-formatter",
          "arguments": ["--language", "mysql"]
        }
      }
    }
  },
```

将上述的 `mysql` 替换为你偏好的 [SQL 方言]（如 `duckdb`、`hive`、`mariadb`、`postgresql`、`redshift`、`snowflake`、`sqlite`、`spark` 等）。

你可以将此添加到 Zed 项目设置（`.zed/settings.json`）或通过 Zed 用户设置（`~/.config/zed/settings.json`）来配置。

### 高级格式化

Sql-formatter 还允许通过提供 [sql-formatter 配置选项](https://github.com/sql-formatter-org/sql-formatter#configuration-options) 进行更精确的控制。要提供这些配置，请在你的项目中创建一个 `.sql-formatter.json` 文件：

```json
{
  "language": "postgresql",
  "tabWidth": 2,
  "keywordCase": "upper",
  "linesBetweenQueries": 2
}
```

使用 `.sql-formatter.json` 文件时，你可以使用简化的 Zed 设置配置：

```json [settings]
{
  "languages": {
    "SQL": {
      "formatter": {
        "external": {
          "command": "sql-formatter"
        }
      }
    }
  }
}
```