---
title: REPL - Zed 中的 Jupyter Kernels
description: 在 Zed 中使用内置的 Jupyter kernel 支持交互式运行代码。内联执行 Python、TypeScript、R 等代码。
---

# REPL

## 入门

Zed 的内置 REPL 使用 [Jupyter kernels](https://docs.jupyter.org/en/latest/projects/kernels.html)，因此您可以在常规的编辑器文件中交互式地运行代码。

<figure style="width: 100%; margin: 0; overflow: hidden; border-top-left-radius: 2px; border-top-right-radius: 2px;">
    <video loop controls playsinline>
        <source
            src="https://customer-snccc0j9v3kfzkif.cloudflarestream.com/aec66e79f23d6d1a0bee5e388a3f17cc/downloads/default.mp4"
            type='video/webm; codecs="vp8.0, vorbis"'
        />
        <source
            src="https://customer-snccc0j9v3kfzkif.cloudflarestream.com/aec66e79f23d6d1a0bee5e388a3f17cc/downloads/default.mp4"
            type='video/mp4; codecs="avc1.4D401E, mp4a.40.2"'
        />
        <source
          src="https://zed.dev/img/post/repl/typescript-deno-kernel-markdown.png"
          type="image/png"
        />
    </video>
</figure>

## 安装

Zed 支持多种语言的代码运行。要开始使用，您需要为您想使用的语言安装一个 kernel。

**当前支持的语言：**

- [Python (ipykernel)](#python)
- [TypeScript (Deno)](#typescript-deno)
- [R (Ark)](#r-ark)
- [R (Xeus)](#r-xeus)
- [Julia](#julia)
- [Scala (Almond)](#scala)

安装后，您可以在相应的语言文件中使用 REPL，或其他支持这些语言的地方，例如 Markdown。如果您最近添加了 kernels，请运行 `repl: refresh kernelspecs` 命令以使它们在编辑器中可用。

## 使用 REPL

要启动 REPL，请打开一个您想使用语言的文件，然后使用 `repl: run` 命令（在 macOS 上默认为 `ctrl-shift-enter`）来运行代码块、选区或行。您也可以点击工具栏中的 REPL 图标。

`repl: run` 命令将在您的选区上执行，结果将显示在选区下方。

可以使用 `repl: clear outputs` 命令或工具栏中的 REPL 菜单清除输出。

### 单元格模式

Zed 支持 [将笔记本作为脚本运行](https://jupytext.readthedocs.io/en/latest/formats-scripts.html)，在 Python 中使用 `# %%` 单元格分隔符，在 TypeScript 中使用 `// %%`。这使您可以在单个文件中编写代码，并像笔记本一样逐单元运行它。

`repl: run` 命令会将 `# %%` 标记之间的每个代码块作为一个独立的单元格运行。

```python
# %% 单元格 1
import time
import numpy as np

# %% 单元格 2
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')
```

## 各语言特定说明

### Python {#python}

#### 全局环境

<div class="warning">

在 macOS 上，您的系统 Python 将无法工作。请设置 [pyenv](https://github.com/pyenv/pyenv?tab=readme-ov-file#installation) 或使用虚拟环境。

</div>

要将您当前的 Python 设置为可用 kernel，请运行：

```sh
pip install ipykernel
python -m ipykernel install --user
```

#### Conda 环境

```sh
source activate myenv
conda install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

#### 使用 pip 的 Virtualenv

```sh
source activate myenv
pip install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"
```

### R (Ark Kernel) {#r-ark}

通过为您的操作系统下载发行版来安装 [Ark](https://github.com/posit-dev/ark/releases)。例如，在 macOS 上，只需解压 `ark` 二进制文件并将其放入 `/usr/local/bin`。然后运行：

```sh
ark --install
```

### R (Xeus Kernel) {#r-xeus}

- 安装 [Xeus-R](https://github.com/jupyter-xeus/xeus-r)
- 为 Zed 安装 R 扩展（在 Zed 扩展中搜索 `R`）

<!--
待办：改进 R REPL (Ark Kernel) 说明
-->

### TypeScript: Deno {#typescript-deno}

- [安装 Deno](https://docs.deno.com/runtime/manual/getting_started/installation/)，然后安装 Deno jupyter kernel：

```sh
deno jupyter --install
```

<!--
待办：改进 R REPL (Ark Kernel) 说明
-->

### Julia

- 从 [官方网站](https://julialang.org/downloads/) 下载并安装 Julia。
- 为 Zed 安装 Julia 扩展（在 Zed 扩展中搜索 `Julia`）

<!--
待办：改进 Julia REPL 说明
-->

### Scala

- 使用 `cs setup` (Coursier) [安装 Scala](https://www.scala-lang.org/download/)：
  - `brew install coursier/formulas/coursier && cs setup`
- REPL (Almond) [设置说明](https://almond.sh/docs/quick-start-install)：
  - `brew install --cask temurin` (Eclipse foundation 官方 OpenJDK 二进制文件)
  - `brew install coursier/formulas/coursier && cs setup`
  - `coursier launch --use-bootstrap almond -- --install`

## 更改每种语言使用的 kernel {#changing-kernels}

Zed 自动检测可用的 kernels 并在 kernel 选择器中组织它们：

- **推荐**：与您活动的 toolchain 匹配的 Python 环境（如果检测到）
- **Python 环境**：虚拟环境 (venv, virtualenv, Poetry, Pipenv, Conda, uv 等)
- **Jupyter Kernels**：已安装的 Jupyter kernelspecs
- **远程服务器**：已连接的远程 Jupyter 服务器

### 安装 ipykernel

即使没有安装 ipykernel，Python 环境也会显示在选择器中。缺少 ipykernel 的环境会显示为暗淡，并标记为 "ipykernel not installed"。当您选择其中一个时，Zed 会在该环境中自动运行 `pip install ipykernel`，并在安装完成后激活它。

### Zed 如何推荐 Kernels

当您运行代码时，Zed 会自动选择一个 kernel：

1. **活动 toolchain 匹配**：如果 Python 环境与您的活动 toolchain 匹配并且有 ipykernel，Zed 会使用它
2. **第一个可用的 Python 环境**：否则，使用第一个有 ipykernel 的 Python 环境
3. **基于语言的备用**：如果没有 Python 环绪准备就绪，Zed 会选择一个与代码块语言匹配的 Jupyter kernel

您可以通过从选择器中显式选择一个 kernel 来覆盖此设置。

### 设置默认 Kernels

要为语言配置不同的默认 kernel，您可以在 `settings.json` 中为任何支持的语言分配一个 kernel：

```json [settings]
{
  "jupyter": {
    "kernel_selections": {
      "python": "conda-env",
      "typescript": "deno",
      "javascript": "deno",
      "r": "ark"
    }
  }
}
```

## 交互式输入

当代码执行需要用户输入（例如 Python 的 `input()` 函数）时，REPL 会在单元格输出下方显示一个输入提示。

在文本字段中输入您的响应，然后按 `Enter` 提交。kernel 会接收您的输入并继续执行。

对于密码输入，出于安全考虑，字符会显示为星号。

如果在输入提示处于活动状态时执行被中断，当 kernel 返回空闲状态时，提示会自动清除。

## 调试 Kernelspecs

可用的 kernels 通过 `repl: sessions` 命令显示。要刷新您可以运行的 kernels，请使用 `repl: refresh kernelspecs` 命令。

如果您安装了 `jupyter`，可以运行 `jupyter kernelspec list` 来查看可用的 kernels。

```sh
$ jupyter kernelspec list
Available kernels:
  ark                   /Users/z/Library/Jupyter/kernels/ark
  conda-base            /Users/z/Library/Jupyter/kernels/conda-base
  deno                  /Users/z/Library/Jupyter/kernels/deno
  python-chatlab-dev    /Users/z/Library/Jupyter/kernels/python-chatlab-dev
  python3               /Users/z/Library/Jupyter/kernels/python3
  ruby                  /Users/z/Library/Jupyter/kernels/ruby
  rust                  /Users/z/Library/Jupyter/kernels/rust
```

> 注意：Zed 尽力使用 `sys.prefix` 和 `CONDA_PREFIX` 来查找 Python 环境中的 kernels。如果您想进行显式控制，请在环境中直接运行 `python -m ipykernel install --user --name myenv --display-name "Python (myenv)"` 来安装 kernel。