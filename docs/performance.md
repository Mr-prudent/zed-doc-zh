---
title: 粗略快速的 CPU 分析（火焰图）
description: "Zed 开发的性能分析和优化。"
---

如何使用我们的内部工具来分析性能并保持 Zed 的快速运行。

# 粗略快速的 CPU 分析（火焰图）

查看 CPU 在哪些方面花费了最多的时间。强烈建议您使用 [samply](https://github.com/mstange/samply)。它会在浏览器中打开一个交互式分析文件（具体是 [firefox_profiler](https://profiler.firefox.com/) 的本地实例）。

有关如何安装和运行，请参阅 [samply](https://github.com/mstange/samply) 的 README。

profile.json 文件不包含任何符号。Firefox 分析器可以为配置文件添加本地符号。为此，请点击右上角的“上传本地分析文件”按钮。

<img width="851" height="613" alt="image" src="https://github.com/user-attachments/assets/cbef2b51-0442-4ee9-bc5c-95f6ccf9be2c" />

# 深入的 CPU 分析（追踪）

查看每个已标注函数调用耗时多久及其参数（如果已配置）。

使用 `instrument` 宏来标注任何需要在分析文件中出现的函数。更多详细信息请参阅 [tracing-instrument](https://docs.rs/tracing/latest/tracing/attr.instrument.html)：

```rust
// 在分析文件中显示此函数
#[instrument(skip_all)]
fn should_appear_in_profile(kitty: Cat) {
    sleep(QUITE_LONG)
}
```

然后使用 `ZTRACING=1 cargo r --features tracy --release` 编译 Zed。发布构建是可选的，但强烈推荐，因为和所有程序一样，Zed 的性能特征在优化后会发生显著变化。您不希望去解决在发布版本中并不存在的性能下降问题。

## 一次性设置/构建分析器：

下载分析器：
[linux x86_64 版本](https://zed-tracy-import-miniprofiler.nyc3.digitaloceanspaces.com/tracy-profiler-linux-x86_64)
[macos aarch64 版本](https://zed-tracy-import-miniprofiler.nyc3.digitaloceanspaces.com/tracy-profiler-0.13.0-macos-aarch64)

### 替代方案：自行构建

- 克隆仓库：`git@github.com:wolfpld/tracy.git`
- `cd profiler && mkdir build && cd build`
- 运行 cmake 生成构建文件：`cmake -G Ninja -DCMAKE_BUILD_TYPE=Release ..`
- 构建分析器：`ninja`
- [可选] 在 Linux 上将分析器移动到合适的位置，例如 `~/.local/bin`

## 使用方法

打开分析器（tracy-profiler），您应该在“已发现的客户端”列表中看到 zed，点击它。
<img width="392" height="287" alt="image" src="https://github.com/user-attachments/assets/b6f06fc3-6b25-41c7-ade9-558cc93d6033" />

要查找耗时较长的函数，请参考下图：
<img width="888" height="1159" alt="image" src="https://github.com/user-attachments/assets/77087617-f53a-4331-863d-e59f8a5b6f0b" />

# 任务/异步分析

获取 zed 前台执行器和后台执行器的分析文件。检查是否有任何任务在前台阻塞时间过长或在后台占用过多（时钟）时间。

分析器始终在后台运行。您可以从其 UI 保存追踪文件或实时查看结果。

## 设置/构建导入器：

下载导入器：
[linux x86_64 版本](https://zed-tracy-import-miniprofiler.nyc3.digitaloceanspaces.com/tracy-import-miniprofiler-linux-x86_64)
[mac aarch64 版本](https://zed-tracy-import-miniprofiler.nyc3.digitaloceanspaces.com/tracy-import-miniprofiler-macos-aarch64)

### 替代方案：自行构建

- 克隆 v0.12.2 分支上的仓库：`git@github.com:zed-industries/tracy.git`
- `cd import && mkdir build && cd build`
- 运行 cmake 生成构建文件：`cmake -G Ninja -DCMAKE_BUILD_TYPE=Release ..`
- 构建导入器：`ninja`
- 在追踪文件上运行导入器：`./tracy-import-miniprofiler /path/to/trace.miniprof.json /path/to/output.tracy`
- 在 tracy 中打开追踪文件：
  - 如果您在使用 Windows，请从上游仓库的发布版中下载 v0.12.2 版本
  - 如果您在使用其他平台，请在网站上打开：https://tracy.nereid.pl/（版本可能不匹配，所以您的体验可能有所不同，理想情况下我们应该托管自己的版本...）

## 保存追踪文件的方法：

- 运行命令：`zed open performance profiler`
- 点击保存按钮。这将打开一个保存对话框，如果对话框打开失败，追踪文件将保存在您的工作目录中。
- 使用导入器转换配置文件以便导入到 tracy：`./tracy-import-miniprofiler <performance_profile.miniprof.json的路径> output.tracy`
- 访问 <https://tracy.nereid.pl/>，点击左上角的“电源”按钮，然后打开保存的追踪文件。
- 现在可以放大查看任务及其耗时情况

# 当函数执行缓慢时发出警告

```rust
// 如果函数执行时间超过100毫秒则记录警告
let _timer = zlog::time!("my_function_name").warn_if_gt(std::time::Duration::from_millis(100));
```