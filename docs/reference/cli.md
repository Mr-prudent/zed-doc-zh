---
title: CLI参考
description: "Zed命令行界面(CLI)的参考，包��打开文件和目录、集成工具以及通过脚本控制Zed。"
---

# CLI 参考

使用Zed的命令行界面(CLI)来打开文件和目录，与其他工具集成，并通过脚本控制Zed。

## 安装

**macOS:** 从命令面板({#kb command_palette::Toggle})运行 `cli: install` 命令，将 `zed` CLI安装到 `/usr/local/bin/zed`。

**Linux:** CLI随Zed包一起提供。二进制文件名可能因发行版而异（通常��� `zed` 或 `zeditor`）。

**Windows:** CLI随Zed一起提供。将Zed的安装目录添加到您的PATH中，或使用 `zed.exe` 的完整路径。

## 用法

```sh
zed [OPTIONS] [PATHS]...
```

## 打开文件和目录

打开一个文件：

```sh
zed myfile.txt
```

将目录作为工作区打开：

```sh
zed ~/projects/myproject
```

打开多个文件或目录：

```sh
zed file1.txt file2.txt ~/projects/myproject
```
在特定行和列打开文件：

```sh
zed myfile.txt:42        # 在第42行打开
zed myfile.txt:42:10     # 在第42行第10列打开
```

## 选项

### `-w`, `--wait`

等待所有打开的文件关闭后CLI才会退出。打开目录时，等待窗口关闭。

这对于将Zed与期望编辑器阻塞直到编辑完成的工具集成非常有用（例如 `git commit`）：

```sh
export EDITOR="zed --wait"
git commit  # 打开Zed并等待您关闭提交消息文件
```

### `-n`, `--new`

在新的工作区窗口中打开路径，即使这些路径已在现有窗口中打开：

```sh
zed -n ~/projects/myproject
```

### `-a`, `--add`

将路径添加到当前聚焦的工作区，而不是打开新窗口。当有多个工作区窗口打开时，文件在聚焦的窗口中打开：

```sh
zed -a newfile.txt
```

### `-r`, `--reuse`

重用现有窗口，将其当前工作区替换为新路径：

```sh
zed -r ~/projects/different-project
```

### `--diff <OLD_PATH> <NEW_PATH>`

打开一个差异视图来比较两个文件。可以多次指定：

```sh
zed --diff file1.txt file2.txt
zed --diff old.rs new.rs --diff old2.rs new2.rs
```

### `--foreground`

在前台运行Zed，保持终端连接。对于调试很有用：

```sh
zed --foreground
```

### `--user-data-dir <DIR>`

为所有用户数据（数据库、扩展、日志）使用自定义目录，而不是默认位置：

```sh
zed --user-data-dir ~/.zed-custom
```

默认位置：

- **macOS:** `~/Library/Application Support/Zed`
- **Linux:** `$XDG_DATA_HOME/zed`（通常为 `~/.local/share/zed`）
- **Windows:** `%LOCALAPPDATA%\Zed`

### `-v`, `--version`

打印Zed的版本并退出：

```sh
zed --version
```

### `--uninstall`

卸载Zed并删除所有相关文件（仅限macOS和Linux）：

```sh
zed --uninstall
```

### `--zed <PATH>`

指定Zed应用程序或二进制文件的自定义路径：

```sh
zed --zed /path/to/Zed.app myfile.txt
```

## 从标准输入读取

通过将 `-` 作为路径传递来从stdin读取内容：

```sh
echo "Hello, World!" | zed -
cat myfile.txt | zed -
ps aux | zed -
```

这会创建一个包含stdin内容的临时文件，并在Zed中打开它。

## URL处理

CLI可以打开 `zed://`、`http://` 和 `https://` URL：

```sh
zed zed://settings
zed https://github.com/zed-industries/zed
```

## 使用Zed作为默认编辑器

将Zed设置为Git和其他工具的默认编辑器：

```sh
export EDITOR="zed --wait"
export VISUAL="zed --wait"
```

将这些行添加到您的shell配置文件中（例如 `~/.bashrc`、`~/.zshrc`）。

## macOS: 切换发布渠道

在macOS上，您可以通过将渠道名称作为第一个参数来启动特定的发布渠道：

```sh
zed --stable myfile.txt
zed --preview myfile.txt
zed --nightly myfile.txt
```

## WSL集成（Windows）

在Windows上，CLI支持从WSL分发版打开路径。当从WSSL内部启动Zed时会自动处理。

## 退出代码

| 代码 | 含义                           |
| ---- | ------------------------------ |
| `0`  | 成功                           |
| `1`  | 错误（详细信息打印到stderr）   |

使用 `--wait` 时，退出代码反映了文件在关闭前是否已保存。