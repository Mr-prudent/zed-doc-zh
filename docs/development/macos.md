---
title: 在 macOS 上构建 Zed
description: "在 macOS 上构建 Zed 以进行 Zed 开发的指南。"
---

# macOS

## 代码仓库

克隆 [Zed 代码仓库](https://github.com/zed-industries/zed)。

## 依赖项

- 安装 [rustup](https://www.rust-lang.org/tools/install)

- 从 macOS App Store 或 [Apple Developer](https://developer.apple.com/download/all/) 网站安装 [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)。Apple Developer 下载需要开发者账户。

> 安装后启动 Xcode，并安装 macOS 组件（默认选项）。

- 安装 [Xcode 命令行工具](https://developer.apple.com/xcode/resources/)

  ```sh
  xcode-select --install
  ```

- 确保 Xcode 命令行工具使用您新安装的 Xcode 版本：

  ```sh
  sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
  sudo xcodebuild -license accept
  ```

- 安装 `cmake`（[某个依赖项](https://docs.rs/wasmtime-c-api-impl/latest/wasmtime_c_api/) 所需）

  ```sh
  brew install cmake
  ```

## 从源码构建 Zed

安装好依赖项后，您可以使用 [Cargo](https://doc.rust-lang.org/cargo/) 构建 Zed。

调试构建：

```sh
cargo run
```

发布构建：

```sh
cargo run --release
```

以及运行测试：

```sh
cargo test --workspace
```

## 视觉回归测试

Zed 包含视觉回归测试，这些测试会捕获真实 Zed 窗口的屏幕截图并与基准图像进行比较。这些测试需要授予屏幕录制权限的 macOS。

### 前置条件

您必须授予终端屏幕录制权限：

1. 运行一次视觉测试运行器 - macOS 会提示您授予权限
2. 或者手动操作：系统设置 > 隐私与安全 > 屏幕录制
3. 启用您的终端应用程序（例如 Terminal.app、iTerm2、Ghostty）
4. 授予权限后重启您的终端

### 运行视觉测试

```sh
cargo run -p zed --bin zed_visual_test_runner --features visual-tests
```

### 基准图像

基准图像存储在 `crates/zed/test_fixtures/visual_tests/` 中，但被 **gitignored** 以避免代码库臃肿。您必须在运行测试前在本地生成它们。

#### 初始设置

在进行任何 UI 更改之前，从已知良好状态生成基准图像：

```sh
git checkout origin/main
UPDATE_BASELINE=1 cargo run -p zed --bin zed_visual_test_runner --features visual-tests
git checkout -
```

这将创建反映当前预期 UI 的基准线。

#### 更新基准线

当 UI 更改是故意的时，在更改后更新基准图像：

```sh
UPDATE_BASELINE=1 cargo run -p zed --bin zed_visual_test_runner --features visual-tests
```

> **注意：** 未来，基准图像可能会存储在外部。目前，它们保持为本地存储，以保持 git 代码库的轻量级。

## 故障排除

### 编译 Metal 着色器时出错

```sh
error: failed to run custom build command for gpui v0.1.0 (/Users/path/to/zed)`

xcrun: error: unable to find utility "metal", not a developer tool or in PATH
```

尝试 `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`

如果您使用的是 macOS 26，请尝试 `xcodebuild -downloadComponent MetalToolchain`。
如果该命令失败，请运行 `xcodebuild -runFirstLaunch` 然后再次尝试下载工具链。

### Cargo 错误称某个依赖项使用了不稳定功能

尝试 `cargo clean` 和 `cargo build`。

### 错误：找不到 'dispatch/dispatch.h' 文件

如果遇到类似错误：

```sh
src/platform/mac/dispatch.h:1:10: fatal error: 'dispatch/dispatch.h' file not found

Caused by:
  process didn't exit successfully

  --- stdout
  cargo:rustc-link-lib=framework=System
  cargo:rerun-if-changed=src/platform/mac/dispatch.h
  cargo:rerun-if-env-changed=TARGET
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS_aarch64-apple-darwin
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS_aarch64_apple_darwin
  cargo:rerun-if-env-changed=BINDGEN_EXTRA_CLANG_ARGS
```

该文件是 Xcode 的一部分。请确保 Xcode 命令行工具已安装且路径设置正确：

```sh
xcode-select --install
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

此外，设置 `BINDGEN_EXTRA_CLANG_ARGS` 环境变量：

```sh
export BINDGEN_EXTRA_CLANG_ARGS="--sysroot=$(xcrun --show-sdk-path)"
```

然后清理并重新构建项目：

```sh
cargo clean
cargo run
```

### 测试因 `打开的文件过多 (os error 24)` 而失败

此错误似乎是由 OS 资源限制引起的。使用 `cargo-nextest` 安装并运行测试应可解决问题。

- `cargo install cargo-nextest --locked`
- `cargo nextest run --workspace --no-fail-fast`

## 技巧与提示

### 避免持续重建

如果 Zed 持续重建根级 crate，可能是因为您在自己的开发构建中打开了 Zed 代码库。

这会导致问题，因为 `cargo run` 会导出一堆环境变量，这些变量会被开发构建中运行的 `rust-analyzer` 拾取。这些环境变量随后会传递给 `cargo check`，这会使我们依赖的一些 crate 的构建缓存失效。

为避免这种情况，请在另一个项目上运行已构建的二进制文件，例如 `cargo run ~/path/to/other/project`。

### 加速验证

如果您频繁构建 Zed，macOS 可能会持续验证新构建，这可能会为每次迭代增加几秒钟。

要解决此问题，您可以：

- 运行 `sudo spctl developer-mode enable-terminal` 以在系统设置中启用开发者工具面板。
- 在系统设置中，搜索“开发者工具”，并将您的终端（例如 iTerm 或 Ghostty）添加到“允许应用使用开发者工具”列表中
- 重启您的终端。

感谢 nextest 开发者发布了[此内容](https://nexte.st/docs/installation/macos/#gatekeeper)。