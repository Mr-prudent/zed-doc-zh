---
title: 为 FreeBSD 构建 Zed
description: "为 Zed 开发构建 FreeBSD 版本的 zed 的指南。"
---

# FreeBSD

FreeBSD 目前尚不受支持，因此本指南仍为开发中状态。

## 代码仓库

克隆 [Zed 代码仓库](https://github.com/zed-industries/zed)。

## 依赖项

- 安装必要的系统包和 rustup：

  ```sh
  script/freebsd
  ```

  如果您愿意，可以查看 [`script/freebsd`](https://github.com/zed-industries/zed/blob/main/script/freebsd) 并手动执行这些步骤。

## 从源码构建

安装完依赖项后，您可以使用 [Cargo](https://doc.rust-lang.org/cargo/) 构建 Zed。

构建编辑器的调试版本：

```sh
cargo run
```

并运行测试：

```sh
cargo test --workspace
```

在发布模式下，主用户界面是 `cli` 包。您可以使用以下命令在开发环境中运行它：

```sh
cargo run -p cli
```

### WebRTC 注意事项

由于上游支持缺失且无预编译二进制文件，当前在 FreeBSD 上构建 `webrtc-sys` 会失败。因此，依赖 WebRTC 的协作功能（音频通话和屏幕共享）已暂时禁用。

更多信息请参阅 [问题 #15309：FreeBSD 支持] 和 [讨论 #29550：Zed 的非官方 FreeBSD 端口]。

## 故障排除

### Cargo 错误提示某个依赖项使用了不稳定功能

尝试运行 `cargo clean` 和 `cargo build`。