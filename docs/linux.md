---
title: Zed 在 Linux 上的安装
description: "下载页面上的安装脚本是安装 Zed 的最快方式："
---

# Linux

## 标准安装

[下载](https://zed.dev/download) 页面上的安装脚本是安装 Zed 的最快方式：

```sh
curl -f https://zed.dev/install.sh | sh
```

我们还提供 Zed 的预览版，它比稳定版大约提前一周收到更新。您可以使用以下命令安装它：

```sh
curl -f https://zed.dev/install.sh | ZED_CHANNEL=preview sh
```

通过脚本安装的 Zed 在以下系统上运行效果最佳：

- 拥有兼容 Vulkan 的 GPU（例如在 M 系列 MacBook 上的 Linux）
- 拥有系统级 glibc（NixOS 和 Alpine 默认没有）
  - x86_64 (Intel/AMD): glibc 版本 >= 2.31 (Ubuntu 20 及更新版本)
  - aarch64 (ARM): glibc 版本 >= 2.35 (Ubuntu 22 及更新版本)

Nix 和 Alpine 都有第三方的 Zed 软件包可用（尽管它们目前落后几周）。如果您想使用我们的构建版本，只要安装了 glibc 兼容层也可以正常工作。在 NixOS 上，您可以尝试 [nix-ld](https://github.com/Mic92/nix-ld)，在 Alpine 上则使用 [gcompat](https://wiki.alpinelinux.org/wiki/Running_glibc_programs)。

您需要从源代码构建的情况包括：

- 非 64 位 Intel 或 64 位 ARM 架构的机器（例如 32 位或 RISC-V 机器）
- 所有架构上的 Redhat Enterprise Linux 8.x、Rocky Linux 8、AlmaLinux 8、Amazon Linux 2
- aarch64 (ARM) 架构上的 Redhat Enterprise Linux 9.x、Rocky Linux 9.3、AlmaLinux 8、Amazon Linux 2023（x86_x64 架构正常）

## 在 Linux 上安装 Zed 的其他方式

Zed 是开源的，[您可以从源代码安装](./development/linux.md)。

### 通过包管理器安装

有多个针对不同 Linux 发行版和包管理器的第三方 Zed 软件包，有时名称为 `zed-editor`。您可能能够使用这些软件包安装 Zed：

- Flathub: [`dev.zed.Zed`](https://flathub.org/apps/dev.zed.Zed)
- Arch: [`zed`](https://archlinux.org/packages/extra/x86_64/zed/)
- Arch (AUR): [`zed-git`](https://aur.archlinux.org/packages/zed-git), [`zed-preview`](https://aur.archlinux.org/packages/zed-preview), [`zed-preview-bin`](https://aur.archlinux.org/packages/zed-preview-bin)
- Alpine: `zed` ([aarch64](https://pkgs.alpinelinux.org/package/edge/testing/aarch64/zed)) ([x86_64](https://pkgs.alpinelinux.org/package/edge/testing/x86_64/zed))
- Conda: [`zed`](https://anaconda.org/conda-forge/zed)
- Nix: `zed-editor` ([unstable](https://search.nixos.org/packages?channel=unstable&show=zed-editor))
- Fedora/Ultramarine (Terra): [`zed`](https://github.com/terrapkg/packages/tree/frawhide/anda/devs/zed/stable), [`zed-preview`](https://github.com/terrapkg/packages/tree/frawhide/anda/devs/zed/preview), [`zed-nightly`](https://github.com/terrapkg/packages/tree/frawhide/anda/devs/zed/nightly)
- Solus: [`zed`](https://github.com/getsolus/packages/tree/main/packages/z/zed)
- Parabola: [`zed`](https://www.parabola.nu/packages/extra/x86_64/zed/)
- Manjaro: [`zed`](https://packages.manjaro.org/?query=zed)
- ALT Linux (Sisyphus): [`zed`](https://packages.altlinux.org/en/sisyphus/srpms/zed/)
- AOSC OS: [`zed`](https://packages.aosc.io/packages/zed)

有关各种仓库中 Zed 软件包的列表，请参阅 [Repology](https://repology.org/project/zed-editor/versions)。

### 社区

在安装第三方软件包时，请注意它可能不是完全最新的，并且可能与我们打包的 Zed 有所不同（一个常见的更改是将二进制文件重命名为 `zedit` 或 `zeditor` 以避免与其他软件包冲突）。

我们很乐意帮助您让 Zed 为每个人可用。如果您的包管理器尚不支持 Zed，而您希望解决这个问题，我们有一些关于[如何操作](./development/linux.md#notes-for-packaging-zed)的说明。

本节中的软件包提供了 Zed 的二进制安装，但不是相关发行版中的官方软件包。这些软件包由社区成员维护，因此安装时应采取更高程度的谨慎。

#### Debian 和 Ubuntu

Zed 可在[这个由社区维护的仓库](https://debian.griffo.io/)中获得。

每个版本的说明都在构建软件包的仓库的 README 中可用。
每个版本的构建、打包和说明都可在 [repository](https://github.com/dariogriffo/zed-debian) 的 README 中找到。

### 手动下载

如果您愿意，可以通过下载我们预构建的 .tar.gz 文件来安装 Zed。这与我们的安装脚本使用的工件相同，但您可以通过修改以下说明来自定义安装位置：

下载 `.tar.gz` 文件：

- [zed-linux-x86_64.tar.gz](https://cloud.zed.dev/releases/stable/latest/download?asset=zed&arch=x86_64&os=linux&source=docs)
  ([预览版](https://cloud.zed.dev/releases/preview/latest/download?asset=zed&arch=x86_64&os=linux&source=docs))
- [zed-linux-aarch64.tar.gz](https://cloud.zed.dev/releases/stable/latest/download?asset=zed&arch=aarch64&os=linux&source=docs)
  ([预览版](https://cloud.zed.dev/releases/preview/latest/download?asset=zed&arch=aarch64&os=linux&source=docs))

然后确保 tar 包中的 `zed` 二进制文件位于您的 PATH 中。最简单的方法是解压 tar 包并创建一个符号链接：

```sh
mkdir -p ~/.local
# 将 zed 解压到 ~/.local/zed.app/
tar -xvf <path/to/download>.tar.gz -C ~/.local
# 将 zed 二进制文件链接到 ~/.local/bin（或 $PATH 中的其他目录）
ln -sf ~/.local/zed.app/bin/zed ~/.local/bin/zed
```

如果您希望与 XDG 兼容的桌面环境集成，您还需要安装 `.desktop` 文件：

```sh
install -D ~/.local/zed.app/share/applications/dev.zed.Zed.desktop -t ~/.local/share/applications
sed -i "s|Icon=zed|Icon=$HOME/.local/zed.app/share/icons/hicolor/512x512/apps/zed.png|g" ~/.local/share/applications/dev.zed.Zed.desktop
sed -i "s|Exec=zed|Exec=$HOME/.local/zed.app/bin/zed|g" ~/.local/share/applications/dev.zed.Zed.desktop
```

## 卸载 Zed

### 标准卸载

如果 Zed 是使用默认安装脚本安装的，可以通过向 `zed` shell 命令提供 `--uninstall` 标志来卸载它

```sh
zed --uninstall
```

如果没有错误，shell 将会提示您是否要保留或删除您的偏好设置。做出选择后，您应该会看到一条消息，表明 Zed 已成功卸载。

如果在您的 PATH 中找不到 `zed` shell 命令，可以尝试以下命令之一

```sh
$HOME/.local/bin/zed --uninstall
```

或者

```sh
$HOME/.local/zed.app/bin.zed --uninstall
```

如果未在 `$HOME/.local/bin/zed` 和 `$HOME/.local/zed.app/bin.zed` 之间正确建立符号链接，第一种情况可能会失败。但只要 Zed 安装在其默认位置，第二种情况应该可以工作。

如果 Zed 安装在其他位置，您必须调用存储在该安装目录中的 `zed` 二进制文件，并以与前述命令相同的格式向其传递 `--uninstall` 标志。

### 包管理器

如果 Zed 是使用包管理器安装的，请查阅该包管理器的文档以了解如何卸载软件包。

## 故障排除

Linux 运行在以许多不同方式配置的大量系统上。我们主要在原生 Ubuntu 环境中测试 Zed，因为这是我们的用户最常用的发行版，也就是说，我们确实期望它能在各种机器上正常工作。

### Zed 无法启动

如果您看到类似 "/lib64/libc.so.6: version 'GLIBC_2.29' not found" 的错误，这意味着您的发行版的 glibc 版本太旧。您可以升级您的系统，或者[从源代码安装 Zed](./development/linux.md)。

### 图形问题

#### Zed 无法打开窗口

Zed 需要 GPU 才能有效运行。在底层，我们使用 [Vulkan](https://www.vulkan.org/) 与您的 GPU 通信。如果您遇到性能问题，或者 Zed 无法加载，Vulkan 可能是罪魁祸首。

如果您看到一条通知，显示 `Zed failed to open a window: NoSupportedDeviceFound`，这意味着 Vulkan 找不到兼容的 GPU。您可以尝试运行 [vkcube](https://github.com/krh/vkcube)（通常在 `vulkaninfo` 或 `vulkan-tools` 软件包中提供）来尝试排查问题来源，如下所示：

```
vkcube
```

> **_注意_**: 尝试通过运行 `vkcube -m [x11|wayland]` 在 X11 和 wayland 模式下运行。某些版本的 `vkcube` 使用 `vkcube` 在 X11 中运行，使用 `vkcube-wayland` 在 wayland 中运行。

这应该会输出一行描述您当前图形设置的内容，并显示一个旋转的立方体。如果这不起作用，您应该能够通过安装兼容 Vulkan 的 GPU 驱动程序来修复它，但在某些情况下，可能还没有 Vulkan 支持。

您可以通过查看 Zed 日志 (`~/.local/share/zed/logs/Zed.log`) 中的 `Using GPU: ...` 来找出 Zed 使用的是哪张显卡。

如果您看到类似 `ERROR_INITIALIZATION_FAILED` 或 `GPU Crashed` 或 `ERROR_SURFACE_LOST_KHR` 的错误，您可能可以通过安装不同的 GPU 驱动程序或选择运行在不同的 GPU 上来解决此问题。（参见 [#14225](https://github.com/zed-industries/zed/issues/14225)）

在某些系统上，文件 `/etc/prime-discrete` 可用于通过 [PRIME](https://wiki.archlinux.org/title/PRIME) 强制使用独立显卡。根据您的设置详情，您可能需要将该文件的内容更改为 "on"（强制使用独立显卡）或 "off"（强制使用集成显卡）。

在其他系统上，您可以在运行 Zed 时使用环境变量 `DRI_PRIME=1` 来强制使用独立显卡。

如果您使用的是 AMD GPU，您可能会遇到 "Broken Pipe" 错误。尝试使用 RADV 或 Mesa 驱动程序。（参见 [#13880](https://github.com/zed-industries/zed/issues/13880)）

如果您使用的是 `amdvlk`（默认的开源 AMD 图形驱动程序），您可能会发现 Zed 一致无法启动。这对某些用户来说是一个已知问题，例如在 Omarchy 上（参见问题 [#28851](https://github.com/zed-industries/zed/issues/28851)）。要解决此问题，您需要使用不同的驱动程序。我们建议删除 `amdvlk` 和 `lib32-amdvlk` 软件包，然后安装 `vulkan-radeon`（参见问题 [#14141](https://github.com/zed-industries/zed/issues/14141)）。

有关更多信息，[Arch 的 Vulkan 指南](https://wiki.archlinux.org/title/Vulkan)有一些很好的步骤，这些步骤很好地转换到了大多数发行版中。

#### 强制 Zed 使用特定的 GPU

有几种不同的方法可以强制 Zed 使用特定的 GPU：

##### 选项 A

您可以使用 `ZED_DEVICE_ID={device_id}` 环境变量来指定您希望 Zed 使用的 GPU 的设备 ID。

您可以通过运行 `lspci -nn | grep VGA` 来获取您 GPU 的设备 ID，这将在一行中输出每个 GPU，如下所示：

```
08:00.0 VGA compatible controller [0300]: NVIDIA Corporation GA104 [GeForce RTX 3070] [10de:2484] (rev a1)
```

这里的设备 ID 是 `2484`。这个值是十六进制的，因此为了强制 Zed 使用这个特定的 GPU，您应该像这样设置环境变量：

```
ZED_DEVICE_ID=0x2484 zed
```

如果您选择在 `.bashrc` 或类似的文件中全局定义它，请确保导出该变量。

##### 选项 B

如果您使用的是 Mesa，可以运行 `MESA_VK_DEVICE_SELECT=list zed --foreground` 来获取可用 GPU 的列表，然后导出 `MESA_VK_DEVICE_SELECT=xxxx:yyyy` 来选择特定的设备。此外，您可以通过额外导出 `WAYLAND_DISPLAY=""` 回退到 xwayland。

##### 选项 C

使用 [vkdevicechooser](https://github.com/jiriks74/vkdevicechooser)。

#### 报告图形问题

如果 Vulkan 配置正确，而 Zed 仍然对您不起作用，请[提交一个问题](https://github.com/zed-industries/zed)，并提供尽可能多的信息。

在 GitHub 上报告因图形初始化错误导致 Zed 无法启动的问题时，可能无法像我们在问题模板中指示的那样运行 `zed: copy system specs into clipboard` 命令。我们为此情况提供了一种替代的收集系统规格的方法。

将 `--system-specs` 标志传递给 Zed，例如

```sh
zed --system-specs
```

将系统规格打印到终端，如下所示。强烈建议将输出原样复制到 GitHub 的问题中，因为它使用 markdown 格式以确保输出可读。

此外，在报告此类问题时，提供您的 Zed 日志内容也极其有益。日志通常位于 `~/.local/share/zed/logs/Zed.log`。生成有用的日志文件的推荐过程如下：

```sh
truncate -s 0 ~/.local/share/zed/logs/Zed.log # 清空日志文件
ZED_LOG=wgpu=info zed .
cat ~/.local/share/zed/logs/Zed.log
# 复制输出
```

或者，如果您设置了 Zed cli，可以执行

```sh
ZED_LOG=wgpu=info /path/to/zed/cli --foreground .
# 复制输出
```

在将日志粘贴到 GitHub 问题时，也强烈建议使用以下模板：

> **_注意_**: 模板中的空格很重要，如果不保留会导致格式不正确。

````
<details><summary>Zed 日志</summary>

```
{zed 日志内容}
```

</details>
````

这将导致日志默认折叠，使问题更易于阅读。

### 我无法打开任何文件

### 点击链接不起作用

这些功能由 XDG 桌面门户提供，具体是：

- `org.freedesktop.portal.FileChooser`
- `org.freedesktop.portal.OpenURI`

某些窗口管理器（如 `Hyprland`）默认不提供文件选择器。请参阅[此列表](https://wiki.archlinux.org/title/XDG_Desktop_Portal#List_of_backends_and_interfaces)作为备选方案的起点。

### Zed 不记得我的 API 密钥

### Zed 不记得我的登录信息

这些功能也需要 XDG 桌面门户，具体是：

- `org.freedesktop.portal.Secret` 或
- `org.freedesktop.Secrets`

Zed 需要一个地方来安全地存储您的 Zed 登录 cookie 或您的 OpenAI API 密钥等机密信息，我们使用系统提供的钥匙串来做到这一点。提供此功能的软件包示例有 `gnome-keyring`、`KWallet` 和 `keepassxc` 等。

### 无法启动 inotify

Zed 依赖 inotify 来监视您的文件系统的更改。如果您无法启动 inotify，Zed 将无法可靠地工作。

如果您看到 "too many open files"（打开的文件太多），首先尝试 `sysctl fs.inotify`。

- 您应该看到 `max_user_instances` 是 128 或更高（您可以使用 `sudo sysctl fs.inotify.max_user_instances=1024` 更改限制）。Zed 只需要 1 个 inotify 实例。
- 您应该看到 `max_user_watches` 是 8000 或更高（您可以使用 `sudo sysctl fs.inotify.max_user_watches=64000` 更改限制）。Zed 需要为每个打开的项目的所有目录 + 每个 git 存储库 + 设置、主题、键映射、扩展等额外的几个监视。

您也可能用尽了文件描述符。您可以使用 `ulimit` 检查限制，并通过编辑 `/etc/security/limits.conf` 来更新它们。

### 没有声音或输出设备错误

如果您在 Zed 中听不到任何声音，或者音频被路由到错误的设备，这可能是由于音频系统不匹配造成的。Zed 依赖 ALSA，而您的系统可能正在使用 PipeWire 或 PulseAudio。要解决这个问题，您需要配置 ALSA 通过 PipeWire/PulseAudio 路由音频。

如果您的系统使用 PipeWire：

1. **安装 PipeWire ALSA 插件**

   在基于 Debian 的系统上，运行：

   ```bash
   sudo apt install pipewire-alsa
   ```

2. **配置 ALSA 使用 PipeWire**

   将以下配置添加到您的 ALSA 设置文件中。您可以使用 `~/.asoundrc`（用户级别）或 `/etc/asound.conf`（系统范围）：

   ```bash
   pcm.!default {
       type pipewire
   }

   ctl.!default {
       type pipewire
   }
   ```

3. **重新启动您的系统**

### 强制 X11 缩放因子

在 X11 系统上，Zed 会自动检测适合高 DPI 显示器的缩放因子。缩放因子按以下优先级顺序确定：

1. `GPUI_X11_SCALE_FACTOR` 环境变量（如果已设置）
2. 来自 X 资源数据库（xrdb）的 `Xft.dpi`
3. 基于 RandR 的自动检测，基于监视器分辨率和物理尺寸

如果您想自定义超出 Zed 自动检测的缩放因子，您有几个选项：

#### 检查您当前的缩放因子

您可以验证是否设置了 `Xft.dpi`：

```sh
xrdb -query | grep Xft.dpi
```

如果此命令没有输出，Zed 正在使用 RandR（X11 的监视器管理扩展）根据您的监视器报告的分辨率和物理尺寸自动计算缩放因子。

#### 选项 1：设置 Xft.dpi（X 资源数据库）

`Xft.dpi` 是许多应用程序用于一致的字体和 UI 缩放的标准 X11 设置。设置此设置可确保 Zed 与其他尊重此设置的 X11 应用程序以相同的方式缩放。

编辑或创建 `~/.Xresources` 文件：

```sh
vim ~/.Xresources
```

添加一行您想要的 DPI：

```sh
Xft.dpi: 96
```

常见的 DPI 值：

- `96` 用于标准 1x 缩放
- `144` 用于 1.5x 缩放
- `192` 用于 2x 缩放
- `288` 用于 3x 缩放

加载配置：

```sh
xrdb -merge ~/.Xresources
```

重启 Zed 以使更改生效。

#### 选项 2：使用 GPUI_X11_SCALE_FACTOR 环境变量

这个 Zed 特定的环境变量直接设置缩放因子，绕过所有自动检测。

```sh
GPUI_X11_SCALE_FACTOR=1.5 zed
```

您可以使用小数值（例如 `1.25`、`1.5`、`2.0`），或设置 `GPUI_X11_SCALE_FACTOR=randr` 来强制基于 RandR 的检测，即使 `Xft.dpi` 已设置。

要使其永久化，请将其添加到您的 shell 配置文件或桌面条目中。

#### 选项 3：调整系统范围的 RandR DPI

这会更改您的整个 X11 会话的 DPI，影响 RandR 为所有使用它的应用程序计算缩放的方式。

将其添加到您的 `.xprofile` 或 `.xinitrc` 中：

```sh
xrandr --dpi 192
```

将 `192` 替换为您想要的 DPI 值。这会影响整个系统，并且当 `Xft.dpi` 未设置时，Zed 的自动 RandR 检测将使用它。

### 字体渲染参数

在 Linux 上，Zed 读取 `ZED_FONTS_GAMMA` 和 `ZED_FONTS_GRAYSCALE_ENHANCED_CONTRAST` 环境变量作为用于字体渲染的值。

`ZED_FONTS_GAMMA` 对应 [getgamma](https://learn.microsoft.com/en-us/windows/win32/api/dwrite/nf-dwrite-idwriterenderingparams-getgamma) 值。
允许范围 [1.0, 2.2]，其他值将被裁剪。
默认值：1.8

`ZED_FONTS_GRAYSCALE_ENHANCED_CONTRAST` 对应 [getgrayscaleenhancedcontrast](https://learn.microsoft.com/en-us/windows/win32/api/dwrite_1/nf-dwrite_1-idwriterenderingparams1-getgrayscaleenhancedcontrast) 值。
允许范围：[0.0, ..)，其他值将被裁剪。
默认值：1.0