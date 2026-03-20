---
title: Dev Containers - Zed
description: 使用 Zed 在开发容器中打开项目。使用 devcontainer.json 配置创建可复现的开发环境。
---

# 开发容器 (Dev Containers)

开发容器通过在容器配置中定义项目的依赖项、工具和设置，提供了一致且可复现的开发环境。

如果您的仓库包含 `.devcontainer/devcontainer.json` 文件，Zed 可以在开发容器中打开项目。

## 先决条件

- 必须已安装 Docker 并且可用，且位于您的 `PATH` 中。Zed 需要 `docker` 命令可用。如果您使用 Podman，必须将其别名为 `docker`，例如通过创建符号链接：`sudo ln -s $(which podman) {some_known_path}/docker`。
- 您的项目必须包含 `.devcontainer/devcontainer.json` 目录/文件。

## 在 Zed 中使用开发容器

### 自动提示

当您打开包含 `.devcontainer/devcontainer.json` 目录/文件的项目时，Zed 将显示一个提示，询问是否在开发容器中打开项目。选择“在容器中打开”(Open in Container) 将：

1. 构建开发容器镜像（如果需要）。
2. 启动容器。
3. 重新打开项目并连接到容器环境。

### 手动打开

如果您关闭了提示或稍后想在容器中重新打开项目，可以使用 Zed 的命令面板运行“项目：打开远程”(Project: Open Remote) 命令，并选择在开发容器中打开项目的选项。
或者，您可以通过 {#kb projects::OpenRemote} 绑定访问远程项目模态框，然后选择“连接开发容器”(Connect Dev Container) 选项。

## 编辑开发容器配置

如果您修改了 `.devcontainer/devcontainer.json`，Zed 目前不会自动重建或重新加载容器。更改配置后：

- 手动停止或终止现有容器（例如，通过 `docker kill <container>`）。
- 在容器中重新打开项目。

## 在开发容器中工作

连接后，Zed 在容器环境中执行任务、终端和语言服务器操作。
根据开发容器规范，您工作区的文件会被链接到容器中。

## 已知限制

> **注意：** 此功能仍在开发中。

- **扩展：** Zed 尚未单独管理容器环境的扩展。主机的扩展会被直接使用。
- **端口转发：** 仅支持 `appPort` 字段。`forwardPorts` 和其他高级端口转发功能尚未实现。
- **配置更改：** 对 `devcontainer.json` 的更新不会触发自动重建或重新加载；必须手动重启容器。

## 另请参阅

- [远程开发](./remote-development.md)：通过 SSH 连接到远程服务器。
- [任务](./tasks.md)：在集成终端中运行命令。