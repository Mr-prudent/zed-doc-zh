---
title: 在 Linux 上构建 Zed
description: "在 Linux 上构建 Zed 以进行 Zed 开发的指南。"
---

# Linux

## 代码仓库

克隆 [Zed 代码仓库](https://github.com/zed-industries/zed)。

## 依赖项

- 安装 [rustup](https://www.rust-lang.org/tools/install)

- 安装必要的系统库：

  ```sh
  script/linux
  ```

  如果您希望手动安装系统库，可以在 `script/linux` 文件中找到所需的软件包列表。

### 链接器 {#linker}

在 Linux 上，Rust 的默认链接器是 [LLVM 的 `lld`](https://blog.rust-lang.org/2025/09/18/Rust-1.90.0/)。其他链接器，特别是 [Wild](https://github.com/davidlattimore/wild) 和 [Mold](https://github.com/rui314/mold)，可以改进完全和增量构建时间。

Zed 目前在 CI 中使用 Mold，因为它更成熟。对于本地开发，推荐使用 Wild，因为它通常比 Mold 快 5-20%。

可以使用 `script/install-mold` 和 `script/install-wild` 安装这些链接器。

要将 Wild 设为默认链接器，请将以下几行添加到您的 `~/.cargo/config.toml` 文件中：

```toml
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=--ld-path=wild"]

[target.aarch64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=--ld-path=wild"]
```

要将 Mold 设为默认链接器：

```toml
[target.'cfg(target_os = "linux")']
rustflags = ["-C", "link-arg=-fuse-ld=mold"]
```

## 从源码构建

安装完依赖项后，您可以使用 [Cargo](https://doc.rust-lang.org/cargo/) 来构建 Zed。

构建编辑器的调试版本：

```sh
cargo run
```

运行测试：

```sh
cargo test --workspace
```

在发布模式下，主要用户界面是 `cli` crate。您可以在开发模式下运行它：

```sh
cargo run -p cli
```

## 安装开发版本

您可以使用以下命令在本地机器上安装构建好的版本：

```sh
./script/install-linux
```

此命令会在发布模式下构建 `zed` 和 `cli`，将二进制文件安装到 `~/.local/bin/zed`，并将 `.desktop` 文件安装到 `~/.local/share`。

> **_注意_**: 如果您遇到类似以下的链接器错误：
>
> ```bash
> error: linking with `cc` failed: exit status: 1 ...
> = note: /usr/bin/ld: /tmp/rustcISMaod/libaws_lc_sys-79f08eb6d32e546e.rlib(f8e4fd781484bd36-bcm.o): in function `aws_lc_0_25_0_handle_cpu_env':
>           /aws-lc/crypto/fipsmodule/cpucap/cpu_intel.c:(.text.aws_lc_0_25_0_handle_cpu_env+0x63): undefined reference to `__isoc23_sscanf'
>           /usr/bin/ld: /tmp/rustcISMaod/libaws_lc_sys-79f08eb6d32e546e.rlib(f8e4fd781484bd36-bcm.o): in function `pkey_rsa_ctrl_str':
>           /aws-lc/crypto/fipsmodule/evp/p_rsa.c:741:(.text.pkey_rsa_ctrl_str+0x20d): undefined reference to `__isoc23_strtol'
>           /usr/bin/ld: /aws-lc/crypto/fipsmodule/evp/p_rsa.c:752:(.text.pkey_rsa_ctrl_str+0x258): undefined reference to `__isoc23_strtol'
>           collect2: error: ld returned 1 exit status
>   = note: some `extern` functions couldn't be found; some native libraries may need to be installed or have their path specified
>   = note: use the `-l` flag to specify native libraries to link
>   = note: use the `cargo:rustc-link-lib` directive to specify the native libraries to link with Cargo (see https://doc.rust-lang.org/cargo/reference/build-scripts.html#rustc-link-lib)
> error: could not compile `remote_server` (bin "remote_server") due to 1 previous error
> ```
>
> **原因**:
> 这是由于 aws-lc-rs 的已知错误（不支持 GCC >= 14）造成的：[FIPS fails to build with GCC >= 14](https://github.com/aws/aws-lc-rs/issues/569)
> & [GCC-14 - build failure for FIPS module](https://github.com/aws/aws-lc/issues/2010)
>
> 您可以参考 [linux: Linker error for remote_server when using script/install-linux](https://github.com/zed-industries/zed/issues/24880) 了解更多信息。
>
> **解决方法**:
> 将远程服务器目标设置为 `x86_64-unknown-linux-gnu`，如 `export REMOTE_SERVER_TARGET=x86_64-unknown-linux-gnu; script/install-linux`

## Wayland 和 X11

Zed 同时支持 X11 和 Wayland。默认情况下，我们会在运行时选择能够找到的任何一个。如果您在 Wayland 上并希望以 X11 模式运行，请使用环境变量 `WAYLAND_DISPLAY=''`。

## Zed 打包说明

此部分面向正在打包 Zed 的发行版维护者。

### 技术要求

Zed 有两个主要的二进制文件：

- 您需要构建 `crates/cli` 并将其二进制文件以 `zed` 的名称放置在 `$PATH` 中。
- 您需要构建 `crates/zed` 并将其放置在 `$PATH/to/cli/../../libexec/zed-editor`。例如，如果您打算将 cli 放在 `~/.local/bin/zed`，则将 zed 放在 `~/.local/libexec/zed-editor`。由于某些 Linux 发行版（特别是 Arch）不鼓励使用 `libexec`，您也可以将此二进制文件放在 `$PATH/to/cli/../../lib/zed/zed-editor`（例如 `~/.local/lib/zed/zed-editor`）。
- 如果您要提供 `.desktop` 文件，您可以在 `crates/zed/resources/zed.desktop.in` 中找到一个模板，并使用 `envsubst` 来填充所需的值。该文件也应重命名为 `$APP_ID.desktop`，以便文件[遵循 FreeDesktop 标准](https://github.com/zed-industries/zed/issues/12707#issuecomment-2168742761)。您还应使此桌面文件可执行（`chmod 755`）。
- 您需要确保安装了必要的库。您可以通过在您的系统上[检查构建的二进制文件](https://github.com/zed-industries/zed/blob/935cf542aebf55122ce6ed1c91d0fe8711970c82/script/bundle-linux#L65-L67)来获取当前的列表。
- 有关完整构建脚本的示例，请参阅 [script/bundle-linux](https://github.com/zed-industries/zed/blob/935cf542aebf55122ce6ed1c91d0fe8711970c82/script/bundle-linux)。
- 您可以通过使用环境变量 `ZED_UPDATE_EXPLANATION` 构建（或运行）Zed 来禁用 Zed 的自动更新，并为尝试手动更新 Zed 的用户提供说明。例如：`ZED_UPDATE_EXPLANATION="Please use flatpak to update zed."`。
- 确保 `crates/zed/RELEASE_CHANNEL` 文件的内容已更新为 'nightly'、'preview' 或 'stable'，且没有换行符。这会导致 Zed 使用凭证管理器记住用户的登录信息。

### 其他注意事项

Zed 更新迅速，发行版维护者通常有不同的限制和优先级。以下几点描述了当前的权衡：

- Zed 是一个快速发展的项目。我们通常每周发布 2-3 个构建版本来解决报告的问题并发布更大的变更。
- Linux 系统上可能存在其他名为 `zed` 的二进制文件（[1](https://openzfs.github.io/openzfs-docs/man/v2.2/8/zed.8.html), [2](https://zed.brimdata.io/docs/commands/zed)）。如果您因为这些问题想重命名我们的 CLI 二进制文件，我们建议使用 `zedit`、`zeditor` 或 `zed-cli`。
- Zed 会自动安装常用开发工具的版本，类似于 rustup/rbenv/pyenv。此处的讨论[链接](https://github.com/zed-industries/zed/issues/12589)。
- 用户可以在本地和从 [zed-industries/extensions](https://github.com/zed-industries/extensions) 安装扩展。扩展可能会安装额外的工具，例如语言服务器。计划的安全改进在此[链接](https://github.com/zed-industries/zed/issues/12358)中跟踪。
- 默认情况下，Zed 会连接到几个在线服务（AI、遥测、协作）。AI 和我们的遥测可以被用户通过他们的 zed 设置或修补我们的[默认设置文件](https://github.com/zed-industries/zed/blob/main/assets/settings/default.json)来禁用。
- 由于以上几点，Zed 目前不能很好地与沙箱配合使用。请参阅[此讨论](https://github.com/zed-industries/zed/pull/12006#issuecomment-2130421220)。

## Flatpak

> Zed 当前的 Flatpak 集成在启动时会退出沙箱。依赖 Flatpak 沙箱功能的工作流程可能无法按预期工作。

要在本地构建并安装 Flatpak 包，请按照以下步骤操作：

1. 按照此处的说明为您的发行版安装 Flatpak：[https://flathub.org/setup](https://flathub.org/setup)。
2. 运行 `script/flatpak/deps` 脚本来安装所需的依赖项。
3. 运行 `script/flatpak/bundle-flatpak`。
4. 现在包已安装，并且在 `target/release/{app-id}.flatpak` 处有一个可用的包。

## 内存分析

[`heaptrack`](https://github.com/KDE/heaptrack) 对于诊断内存泄漏非常有用。要安装它：

```sh
$ sudo apt install heaptrack heaptrack-gui
$ cargo install cargo-heaptrack
```

然后，要构建并附加分析器运行 Zed：

```sh
$ cargo heaptrack -b zed
```

当退出此 zed 实例时，终端输出将包含一个运行 `heaptrack_interpret` 的命令，用于将 `*.raw.zst` 分析文件转换为 `*.zst` 文件，该文件可以传递给 `heaptrack_gui` 进行查看。

## Perf 记录

如何从正在运行的 Zed 实例获取带有解析符号的火焰图。
当 Zed 占用大量 CPU 时使用它。对于卡顿情况没有用。

### 事故期间

- 使用以下命令找到 PID（进程 ID）：
  `ps -eo size,pid,comm | grep zed | sort | head -n 1 | cut -d ' ' -f 2`
  或者在 htop/btop/top 类似的工具中找到 RAM 使用率最高的 `zed-editor` 的 PID。

- 安装 perf：
  在 Ubuntu（及其衍生版）上运行 `sudo apt install linux-tools`。

- Perf 记录：
  运行 `sudo perf record -p <您刚找到的 pid>`，等待几秒钟以收集数据，然后按 Ctrl+C。现在您应该有一个 `perf.data` 文件。

- 使输出文件归用户所有：
  运行 `sudo chown $USER:$USER perf.data`

- 获取构建信息：
  再次运行 zed 并在命令面板中输入 `zed: about` 以获取确切的 commit。

可以将 `perf.data` 文件和确切的 commit 发送给 Zed 团队。

### 事后分析

此步骤可由 Zed 工作人员完成。

- 使用符号构建 Zed：
  检出先前找到的 commit 并修改 `Cargo.toml`。
  应用以下差异，然后进行发布构建。

```diff
[profile.release]
-debug = "limited"
+debug = "full"
```

- 将符号添加到 perf 数据库：
  `perf buildid-cache -v -a <path to release zed binary>`

- 从数据库解析符号：
  `perf inject -i perf.data -o perf_with_symbols.data`

- 安装火焰图工具：
  `cargo install cargo-flamegraph`

- 渲染火焰图：
  `flamegraph --perfdata perf_with_symbols.data`

## 故障排除

### Cargo 错误，声称某个依赖项使用了不稳定的功能

尝试运行 `cargo clean` 和 `cargo build`。