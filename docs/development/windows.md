---
title: 在Windows上构建Zed
description: "在Windows上构建Zed的开发指南。"
---

# Windows

> 以下命令可以在任何shell中执行。

## 代码库

克隆 [Zed 代码库](https://github.com/zed-industries/zed)。

## 依赖项

- 安装 [rustup](https://www.rust-lang.org/tools/install)

- 安装 [Visual Studio](https://visualstudio.microsoft.com/downloads/)，并选择性地安装 `MSVC v*** - VS YYYY C++ x64/x86 build tools` 和 `MSVC v*** - VS YYYY C++ x64/x86 Spectre-mitigated libs (latest)` 组件（`v***` 是您的 VS 版本，`YYYY` 是发布年份。根据需要调整架构）。
- 或者，如果您希望安装更精简，仅安装 [Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)（以及上述库）和 "使用 C++ 的桌面开发" 工作负载。
  rustup 无法自动检测到此设置。在编译前，通过启动开始菜单或 Windows Terminal 中安装的开发人员 shell（cmd/PowerShell）来初始化环境变量。
- 为您的系统安装 Windows 11 或 10 SDK，并确保至少安装了 `Windows 10 SDK version 2104 (10.0.20348.0)`。您可以从 [Windows SDK Archive](https://developer.microsoft.com/windows/downloads/windows-sdk/) 下载它。
- 安装 [CMake](https://cmake.org/download)（[一个依赖项](https://docs.rs/wasmtime-c-api-impl/latest/wasmtime_c_api/) 需要）。或者您也可以通过 Visual Studio Installer 安装，然后将 `bin` 目录手动添加到您的 `PATH` 中，例如：`C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin`。

如果您无法编译 Zed，请确保 Visual Studio 安装至少包含以下组件：

```json
{
  "version": "1.0",
  "components": [
    "Microsoft.VisualStudio.Component.CoreEditor",
    "Microsoft.VisualStudio.Workload.CoreEditor",
    "Microsoft.VisualStudio.Component.VC.Tools.x86.x64",
    "Microsoft.VisualStudio.ComponentGroup.WebToolsExtensions.CMake",
    "Microsoft.VisualStudio.Component.VC.CMake.Project",
    "Microsoft.VisualStudio.Component.Windows11SDK.26100",
    "Microsoft.VisualStudio.Component.VC.Runtimes.x86.x64.Spectre"
  ],
  "extensions": []
}
```

如果您仅使用 Build Tools，请确保安装了这些组件：

```json
{
  "version": "1.0",
  "components": [
    "Microsoft.VisualStudio.Component.Roslyn.Compiler",
    "Microsoft.Component.MSBuild",
    "Microsoft.VisualStudio.Component.CoreBuildTools",
    "Microsoft.VisualStudio.Workload.MSBuildTools",
    "Microsoft.VisualStudio.Component.Windows10SDK",
    "Microsoft.VisualStudio.Component.VC.CoreBuildTools",
    "Microsoft.VisualStudio.Component.VC.Tools.x86.x64",
    "Microsoft.VisualStudio.Component.VC.Redist.14.Latest",
    "Microsoft.VisualStudio.Component.Windows11SDK.26100",
    "Microsoft.VisualStudio.Component.VC.CMake.Project",
    "Microsoft.VisualStudio.Component.TextTemplating",
    "Microsoft.VisualStudio.Component.VC.CoreIde",
    "Microsoft.VisualStudio.ComponentGroup.NativeDesktop.Core",
    "Microsoft.VisualStudio.Workload.VCTools",
    "Microsoft.VisualStudio.Component.VC.Runtimes.x86.x64.Spectre"
  ],
  "extensions": []
}
```

您可以按如下方式导出此组件列表：

- 打开 Visual Studio Installer
- 在 `已安装` 选项卡中点击 `更多`
- 点击 `导出配置`

### 注意事项

在 `data` 目录中更新 `pg_hba.conf`，将 `host` 方法的认证方式从 `scram-sha-256` 改为 `trust`。否则，连接将因 `password authentication failed` 而失败。该文件通常位于 `C:\Program Files\PostgreSQL\17\data\pg_hba.conf`。更改后，它应如下所示：

```conf
# IPv4 本地连接:
host    all             all             127.0.0.1/32            trust
# IPv6 本地连接:
host    all             all             ::1/128                 trust
```

如果您使用的是非拉丁语系的 Windows 语言环境，请将 `postgresql.conf`（在 `data` 目录中）中的 `lc_messages` 参数设置为 `English_United States.1252`（或您系统上可用的其他 UTF-8 兼容编码）。否则，数据库可能会出现 panic。该文件应如下所示：

```conf
# lc_messages = 'Chinese (Simplified)_China.936' # 系统错误消息字符串的语言环境
lc_messages = 'English_United States.1252'
```

之后，重启 `postgresql` 服务。按 `Win`+`R` 打开运行对话框，输入 `services.msc`，然后选择 **确定**。在服务管理器中，找到 `postgresql-x64-XX`，右键单击它，然后选择 **重启**。

## 从源代码构建

安装好依赖项后，您可以使用 [Cargo](https://doc.rust-lang.org/cargo/) 构建 Zed。

用于调试构建：

```sh
cargo run
```

用于发布构建：

```sh
cargo run --release
```

以及运行测试：

```sh
cargo test --workspace
```

> **注意：** 视觉回归测试目前仅适用于 macOS，并且需要屏幕录制权限。有关详细信息，请参阅 [在 macOS 上构建 Zed](./macos.md#visual-regression-tests)。

## 从 msys2 安装

Zed 不支持为 Mingw-w64 构建的非官方 MSYS2 Zed 包。如果您在使用 [mingw-w64-zed](https://packages.msys2.org/base/mingw-w64-zed) 时遇到任何问题，请向 [msys2/MINGW-packages/issues](https://github.com/msys2/MINGW-packages/issues?q=is%3Aissue+is%3Aopen+zed) 报告。

请先参考 [MSYS2 文档](https://www.msys2.org/docs/ides-editors/#zed)。

## 故障排除

### 设置 `RUSTFLAGS` 环境变量会破坏构建

如果您设置了 `RUSTFLAGS` 环境变量，它将覆盖 `.cargo/config.toml` 中的 `rustflags` 设置，而这对于正确构建 Zed 是必需的。

由于这些设置会随着时间变化，因此产生的构建错误可能从链接器故障到其他难以诊断的错误不等。

如果您需要额外的 Rust 标志，请使用以下方法之一在 `.cargo/config.toml` 中：

在构建部分添加您的标志

```toml
[build]
rustflags = ["-C", "symbol-mangling-version=v0", "--cfg", "tokio_unstable"]
```

在 Windows 目标部分添加您的标志

```toml
[target.'cfg(target_os = "windows")']
rustflags = [
    "--cfg",
    "windows_slim_errors",
    "-C",
    "target-feature=+crt-static",
]
```

或者，在 Zed 代码库的父目录中创建一个新的 `.cargo/config.toml`（见下文）。这在 CI 中很有用，因为您无需编辑代码库原始的 `.cargo/config.toml`。

```
upper_dir
├── .cargo          // <-- 创建此文件夹
│   └── config.toml // <-- 创建此文件
└── zed
    ├── .cargo
    │   └── config.toml
    └── crates
        ├── assistant
        └── ...
```

在新的（上述）`.cargo/config.toml` 中，如果我们要向 rustflags 添加 `--cfg gles`，它看起来像这样

```toml
[target.'cfg(all())']
rustflags = ["--cfg", "gles"]
```

### Cargo 声称依赖项使用了不稳定功能的错误

尝试 `cargo clean` 和 `cargo build`。

### `STATUS_ACCESS_VIOLATION`

如果您正在使用 "rust-lld.exe" 链接器，可能会发生此错误。请尝试使用其他链接器。

如果您正在使用全局配置，请考虑将 Zed 代码库移动到一个嵌套目录中，并在父目录中添加一个带有自定义链接器配置的 `.cargo/config.toml`。

有关更多信息，请参阅此问题 [#12041](https://github.com/zed-industries/zed/issues/12041)

### 选择了无效的 RC 路径

有时，根据应用于您笔记本电脑的安全规则，在编译 Zed 时可能会收到以下错误：

```
error: failed to run custom build command for `zed(C:\Users\USER\src\zed\crates\zed)`

Caused by:
  process didn't exit successfully: `C:\Users\USER\src\zed\target\debug\build\zed-b24f1e9300107efc\build-script-build` (exit code: 1)
  --- stdout
  cargo:rerun-if-changed=../../.git/logs/HEAD
  cargo:rustc-env=ZED_COMMIT_SHA=25e2e9c6727ba9b77415588cfa11fd969612adb7
  cargo:rustc-link-arg=/stack:8388608
  cargo:rerun-if-changed=resources/windows/app-icon.ico
  package.metadata.winresource does not exist
  Selected RC path: 'bin\x64\rc.exe'

  --- stderr
  The system cannot find the path specified. (os error 3)
warning: build failed, waiting for other jobs to finish...
```

要解决此问题，手动将 `ZED_RC_TOOLKIT_PATH` 环境变量设置为 RC 工具包路径。通常这是：
`C:\Program Files (x86)\Windows Kits\10\bin\<SDK_version>\x64`。

有关更多信息，请参阅此 [问题](https://github.com/zed-industries/zed/issues/18393)。

### 构建失败：路径过长

在构建时，您可能会收到类似以下的错误：

```
error: failed to get `pet` as a dependency of package `languages v0.1.0 (D:\a\zed-windows-builds\zed-windows-builds\crates\languages)`

Caused by:
  failed to load source for dependency `pet`

Caused by:
  Unable to update https://github.com/microsoft/python-environment-tools.git?rev=ffcbf3f28c46633abd5448a52b1f396c322e0d6c#ffcbf3f2

Caused by:
  path too long: 'C:/Users/runneradmin/.cargo/git/checkouts/python-environment-tools-903993894b37a7d2/ffcbf3f/crates/pet-conda/tests/unix/conda_env_without_manager_but_found_in_history/some_other_location/conda_install/conda-meta/python-fastjsonschema-2.16.2-py310hca03da5_0.json'; class=Filesystem (30)
```

要解决此问题，为 Git 和 Windows 启用长路径支持。

对于 git：`git config --system core.longpaths true`

对于 Windows，使用以下 PS 命令：

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

有关此问题的更多信息，请参阅 [win32 文档](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell)

（启用长路径支持后，您需要重新启动系统。）

### 图形问题

#### Zed 无法启动

Zed 目前在 Windows 上使用 Vulkan 作为其图形 API。如果 Zed 无法启动，Vulkan 通常是原因。

您可以检查 Zed 日志：
`C:\Users\YOU\AppData\Local\Zed\logs\Zed.log`

如果您看到类似以下的消息：

- `Zed failed to open a window: NoSupportedDeviceFound`
- `ERROR_INITIALIZATION_FAILED`
- `GPU Crashed`
- `ERROR_SURFACE_LOST_KHR`

Vulkan 在您的系统上可能无法正常工作。更新 GPU 驱动程序通常可以解决此问题。

如果日志中没有任何与 Vulkan 相关的内容，而您碰巧安装了 Bandicam，请尝试卸载它。Zed 目前与 Bandicam 不兼容。