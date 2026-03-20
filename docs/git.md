---
description: Zed 是一个文本编辑器，支持大量 Git 功能
title: Zed Editor Git 集成文档
---

# Git

Zed 具有内置的 Git 支持，让您可以在不离开编辑器的情况下管理版本控制。Git 面板显示您的工作树状态、暂存区和分支信息。您在命令行上所做的更改会立即在 Zed 中反映出来。

对于 Zed 原生不支持的操作，您可以使用集成终端。

## Git 面板

Git 面板显示您工作树和 Git 暂存区的状态。

您可以使用 {#action git_panel::ToggleFocus} 打开 Git 面板，或通过单击状态栏中的 Git 图标。

在面板中，您可以一目了然地看到项目的状态：哪个仓库和分支是活动的，哪些文件已更改，以及每个文件的当前暂存状态。

Zed 会监控您的仓库，以便您在命令行上所做的更改能立即反映出来。

### 配置

打开设置编辑器（macOS 上为 `Cmd+,`，Linux/Windows 上为 `Ctrl+,`）来自定义 Git 行为。设置分布在两个页面上：

- **面板 > Git 面板**：面板位置、树状视图与平面视图、状态显示样式
- **版本控制**：侧边栏指示器、内联 blame、hunk 样式

#### 移动 Git 面板

默认情况下，Git 面板停靠在左侧。转到 **面板 > Git 面板** 并更改 **Git 面板停靠位置**，将其移动到右侧或底部。

#### 切换到树状视图

默认情况下，Git 面板以平面列表形式显示已更改的文件。要改为按文件夹层次结构查看文件，请在面板的上下文菜单中切换**树状视图**，或在 **面板 > Git 面板** 中启用它。

#### 内联 Blame

Zed 在当前行显示 Git blame 信息。要关闭此功能或添加延迟，请转到 **版本控制 > 内联 Git Blame**。

#### 隐藏侧边栏指示器

显示添加、修改和删除行的彩色侧边栏条可以被隐藏。转到 **版本控制 > Git Gutter** 并将**可见性**设置为“隐藏”。

#### 提交消息行长度

Zed 会在 72 个字符处换行提交消息（这是一个 Git 约定）。要更改此设置，请在设置中搜索 "Git Commit" 并调整**首选行长度**。

## 项目差异

您可以通过打开项目差异 ({#kb git::Diff}) 来查看 Zed 中捕获的所有 Git 更改，该功能可通过命令面板或 Git 面板中的 {#action git::Diff} 操作访问。

项目差异中显示的所有更改的行为与其他多缓冲区完全相同：它们都是文件的可编辑摘录。

您可以通过单击选项卡栏上的按钮或其相应的键绑定来暂存或取消暂存每个 hunk 以及整个文件。

### 单词差异高亮

默认情况下，Zed 会高亮显示修改行中已更改的单词，以便更容易地准确找出更改的内容。要全局禁用此功能，请打开设置编辑器并转到 **语言和工具 > 杂项**，然后关闭**单词差异已启用**。

仅为特定语言禁用单词差异，请将其添加到您的 `settings.json` 中：

```json
{
  "languages": {
    "Markdown": {
      "word_diff_enabled": false
    }
  }
}
```

### 差异视图样式

Zed 以两种模式显示差异：**分割**（并排比较）或**统一**（内联更改）。分割视图是默认模式。

#### 更改差异视图

打开设置编辑器 ({#kb zed::OpenSettings}) 并搜索 "diff view style"。选择**分割**或**统一**。

要更改默认设置，请将其添加到您的 `settings.json` 中：

```json
{
  "diff_view_style": "unified"
}
```

有关设置编辑器的更多信息，请参阅 [配置 Zed](./configuring-zed.md)。

#### 分割与统一

- **分割**：并排显示原始版本和修改后的版本。适用于比较文件结构或审查大量更改。
- **统一**：在单个视图中以内联方式显示更改，包含添加和删除的内容。适用于专注于特定行的更改。

您可以随时在这些模式之间切换。您的偏好将应用于[项目差异](#project-diff)、[文件历史](#file-history)和[暂存差异视图](#stash-diff-view)。这些差异视图作为[多缓冲区](./multibuffers.md)运行，允许您同时编辑多个摘录。

## 文件历史

文件历史显示单个文件的提交历史。每个条目显示提交的作者、时间戳和消息。选择某个提交将打开一个差异视图，该视图经过筛选，仅显示在该次提交中对该文件所做的更改。

要查看文件历史：

- 在项目面板中右键单击文件，然后选择“查看文件历史”
- 在 Git 面板中右键单击文件，然后选择“查看文件历史”
- 在编辑器选项卡上右键单击，然后选择“查看文件历史”
- 使用命令面板并搜索“file history”

## 获取、推送和拉取

通过 Git 面板上可用的按钮或通过命令面板查看相应的操作：{#action git::Fetch}、{#action git::Push} 和 {#action git::Pull}，在 Zed 中从您的 Git 仓库获取、推送或拉取。

### 推送配置

Zed 遵循 Git 的推送配置。推送时，Zed 按顺序检查以下内容：

1. 为当前分支配置的 `pushRemote`
2. 您 Git 配置中的 `remote.pushDefault`
3. 分支的跟踪远程

这与 Git 的标准行为相匹配，因此，如果您在 `.gitconfig` 中或通过 `git config` 配置了 `pushRemote` 或 `pushDefault`，Zed 将使用这些设置。

## 远程仓库

当您的仓库有多个远程仓库时，Zed 会在 Git 面板中显示一个远程选择器。单击推送/拉取旁边的远程按钮，为该操作选择要使用的远程仓库。

## 暂存工作流

Zed 有两种主要的暂存工作流，分别使用项目差异或直接使用面板。

### 使用项目差异

在项目差异视图中，您可以专注于每个 hunk，并通过单击选项卡栏按钮或使用键绑定 {#action git::StageAndNext} 来单独暂存它们。

类似地，使用 {#action git::StageAll} ({#kb git::StageAll}) 键绑定一次性暂存所有 hunk，然后立即使用 {#action git::Commit} ({#kb git::Commit}) 进行提交。

### 使用 Git 面板

从面板中，您可以简单地输入提交消息并单击提交按钮，或使用 {#action git::Commit}。这将自动暂存所有已跟踪的文件（条目标签中带有 `[·]`），并提交它们。

<!-- 使用默认暂存状态显示一组更改 -->

可以使用每个单独条目的复选框来暂存条目。可以使用面板顶部的按钮或 {#action git::StageAll} 来暂存所有更改。

<!-- 添加媒体 -->

## 提交

Zed 提供了两个提交文本区域：

1. 第一个位于 Git 面板的正下方。按下 {#kb git::Commit} 会立即提交您所有的暂存更改。
2. 第二个可通过操作 {#action git::ExpandCommitEditor} 访问，或在 Git 面板提交文本区域获得焦点时按下 {#kb git::ExpandCommitEditor}。

### 撤销提交

在 Zed 中提交后，您会在 Git 面板的提交文本区域正下方看到一个栏，其中会显示最近提交的提交信息。
在那里，您可以使用“Uncommit”按钮，它会执行 `git reset HEADˆ--soft` 命令。

### 配置提交行长度

默认情况下，Zed 将提交行长度设置为 `72`，但可以在您的本地 `settings.json` 文件中进行配置。

有关设置 `preferred-line-length` 的更多信息，请参阅[配置](#configuration)部分。

## 分支管理

### 创建和切换分支

使用 {#action git::Branch} 创建一个新分支，或使用 {#action git::Switch} 或 {#action git::CheckoutBranch} 切换到现有分支。

### 删除分支

要删除分支，请使用 {#action git::Switch} 打开分支切换器，找到您要删除的分支，然后使用删除选项。Zed 在删除前会进行确认，以防止意外数据丢失。

> **注意**：您无法删除当前已检出的分支。请先切换到另一个分支。

## 合并冲突

当您在合并、变基或拉取后遇到合并冲突时，Zed 会高亮显示文件中的冲突区域，并在每个冲突上方显示解决按钮。

### 查看冲突

带有警告图标的冲突文件会出现在 Git 面板中。您也可以在项目差异视图中看到冲突，其中每个冲突区域都会高亮显示：
- 当前分支的更改以绿色高亮显示
- 传入分支的更改以蓝色高亮显示

### 解决冲突

每个冲突显示三个按钮：

- **使用 [分支名]**：保留一个分支的更改（显示实际的分支名，如 "main"）
- **使用 [其他分支]**：保留另一个分支的更改（如 "feature-branch"）
- **使用两者**：保留两组更改，当前分支的更改在前

单击一个按钮即可解决该冲突。冲突标记将被移除，并替换为您选择的内容。在文件中解决所有冲突后，暂存它并提交以完成合并。

> **提示**：对于需要手动编辑的复杂冲突，您可以直接编辑文件。删除冲突标记（`<<<<<<<`、`=======`、`>>>>>>>`）并保留您想要的内容。

## 存藏

Git stash 允许您临时保存未提交的更改，并将您的工作目录恢复到干净的状态。这在您需要快速切换分支或拉取更新而不提交未完成的工作时特别有用。

### 创建存藏

要暂存您当前的所有更改，请使用 {#action git::StashAll} 操作。这将把已暂存和未暂存的更改保存到一个新的存藏条目中，并清理您的工作目录。

### 管理存藏

Zed 提供了一个可通过 {#action git::ViewStash} 或从 Git 面板的溢出菜单访问的存藏选择器。在存藏选择器中，您可以：

- **查看存藏列表**：浏览所有已保存的存藏及其描述和时间戳
- **打开差异**：查看每个存藏中存储的具体更改
- **应用存藏**：将存藏的更改应用到您的工作目录，同时保留存藏条目
- **弹出存藏**：应用存藏的更改并从列表中删除该存藏条目
- **删除存藏**：在不应用的情况下删除不需要的存藏条目

### 快速存藏操作

为了更高效的工作流，Zed 提供了直接操作来处理最新的存藏：

- **应用最新存藏**：使用 {#action git::StashApply} 来应用最新的存藏，而不删除它
- **弹出最新存藏**：使用 {#action git::StashPop} 来应用并删除最新的存藏

### 存藏差异视图

要查看存藏的内容，请在存藏选择器中选择它并按下 {#kb stash_picker::ShowStashItem}。在差异视图中，您可以使用以下键绑定：

| 操作                               | 键绑定                   |
| ---------------------------------- | ------------------------ |
| 应用存藏                           | {#kb git::ApplyCurrentStash} |
| 弹出存藏（应用并删除）             | {#kb git::PopCurrentStash}   |
| 删除存藏（不应用直接删除）         | {#kb git::DropCurrentStash}  |

## Git 中的 AI 支持

Zed 目前支持由 LLM 提供的提交消息生成。
您可以通过在 Git 面板中关注消息编辑器，然后单击左下角的铅笔图标，或按下 {#action git::GenerateCommitMessage} ({#kb git::GenerateCommitMessage}) 键绑定，来让 AI 生成提交消息。

> 请注意，您需要通过自己的 API 密钥或通过 Zed 托管的 AI 模型来配置 LLM 提供商。
> 访问 [AI 配置页面](./ai/configuration.md) 了解如何操作。

您可以通过提供 `commit_message_model` 代理设置来指定要使用的首选模型。
有关更多信息，请参阅 [特定功能的模型](./ai/agent-settings.md#feature-specific-models)。

```json [settings]
{
  "agent": {
    "commit_message_model": {
      "provider": "anthropic",
      "model": "claude-3-5-haiku"
    }
  }
}
```

要自定义生成提交消息的格式，请运行 {#action agent::OpenRulesLibrary} 并在左侧选择"Commit message"规则。
从那里，您可以修改提示以匹配您想要的格式。

<!-- 添加媒体 -->

添加到[规则文件](./ai/rules.md)中的任何特定提交消息说明也会被负责撰写您的提交消息的模型所获取。

## Git 集成

Zed 与流行的 Git 托管服务集成，以确保 Git 提交哈希以及对问题、拉取请求和合并请求的引用成为可点击的链接。

Zed 目前支持托管版本的链接：
[GitHub](https://github.com),
[GitLab](https://gitlab.com),
[Bitbucket](https://bitbucket.org),
[SourceHut](https://sr.ht) 和
[Codeberg](https://codeberg.org)。

### 自托管实例

Zed 通过检查 Git 远程 URL 中的关键字来自动识别 Git 托管提供商。例如，如果您的自托管 URL 包含 `gitlab`、`gitea` 或其他公认的服务商名称，Zed 将自动注册该托管提供商，无需任何配置。

但是，如果您的自托管 Git 实例 URL 不包含识别关键字，您可以通过添加 `git_hosting_providers` 设置来手动配置 Zed，以创建指向您实例的可点击链接，这样提交哈希和永久链接就可以解析到您的域名：

```json [settings]
{
  "git_hosting_providers": [
    {
      "provider": "gitlab",
      "name": "Corp GitLab",
      "base_url": "https://git.example.corp"
    }
  ]
}
```

`provider` 字段指定您正在使用的托管服务类型。支持的 `provider` 值为 `github`、`gitlab`、`bitbucket`、`gitea`、`forgejo` 和 `sourcehut`。`name` 是可选的，用作您实例的显示名称，`base_url` 是您自托管服务器的根 URL。

如果您使用多个自托管实例，可以配置多个自定义提供商。

### 永久链接

Zed 还有一个“复制永久链接”功能，用于在您的 Git 托管服务上创建代码段的永久链接。
这些链接对于在特定提交中共享文件中的特定行或行范围非常有用。
通过 [命令面板](./index.md#command-palette)（搜索 `permalink`）、
为 `editor::CopyPermalinkToLine` 或 `editor::OpenPermalinkToLine` 操作
[创建自定义键绑定](key-bindings.md#custom-key-bindings)，
或直接在编辑器中选择一行或多行并右键单击选择“复制永久链接”来触发此操作。

## Diff Hunk 键盘快捷键

在查看带有更改的文件时，Zed 会显示可以展开或折叠以进行详细检查的 diff hunk：

- **展开所有 diff hunk**：{#action editor::ExpandAllDiffHunks} ({#kb editor::ExpandAllDiffHunks})
- **折叠所有 diff hunk**：按 `Escape`（绑定到 {#action editor::Cancel}）
- **切换选中的 diff hunk**：{#action editor::ToggleSelectedDiffHunks} ({#kb editor::ToggleSelectedDiffHunks})
- **在 hunk 之间导航**：{#action editor::GoToHunk} 和 {#action editor::GoToPreviousHunk}

> **提示**：`Escape` 键是折叠所有展开的 diff hunk并返回到更改概览的最快方法。

## 操作参考

| 操作                                    | 键绑定                            |
| --------------------------------------- | --------------------------------- |
| {#action git::Add}                      | {#kb git::Add}                    |
| {#action git::StageAll}                 | {#kb git::StageAll}               |
| {#action git::UnstageAll}               | {#kb git::UnstageAll}             |
| {#action git::ToggleStaged}             | {#kb git::ToggleStaged}           |
| {#action git::StageAndNext}             | {#kb git::StageAndNext}           |
| {#action git::UnstageAndNext}           | {#kb git::UnstageAndNext}         |
| {#action git::Commit}                   | {#kb git::Commit}                 |
| {#action git::ExpandCommitEditor}       | {#kb git::ExpandCommitEditor}     |
| {#action git::Push}                     | {#kb git::Push}                   |
| {#action git::ForcePush}                | {#kb git::ForcePush}              |
| {#action git::Pull}                     | {#kb git::Pull}                   |
| {#action git::PullRebase}               | {#kb git::PullRebase}             |
| {#action git::Fetch}                    | {#kb git::Fetch}                  |
| {#action git::Diff}                     | {#kb git::Diff}                   |
| {#action git::Restore}                  | {#kb git::Restore}                |
| {#action git::RestoreFile}              | {#kb git::RestoreFile}            |
| {#action git::Branch}                   | {#kb git::Branch}                 |
| {#action git::Switch}                   | {#kb git::Switch}                 |
| {#action git::CheckoutBranch}           | {#kb git::CheckoutBranch}         |
| {#action git::Blame}                    | {#kb git::Blame}                  |
| {#action git::StashAll}                 | {#kb git::StashAll}               |
| {#action git::StashPop}                 | {#kb git::StashPop}               |
| {#action git::StashApply}               | {#kb git::StashApply}             |
| {#action git::ViewStash}                | {#kb git::ViewStash}              |
| {#action editor::ToggleGitBlameInline}  | {#kb editor::ToggleGitBlameInline}|
| {#action editor::ExpandAllDiffHunks}    | {#kb editor::ExpandAllDiffHunks}  |
| {#action editor::ToggleSelectedDiffHunks} | {#kb editor::ToggleSelectedDiffHunks} |

> 并非所有操作都有默认键绑定，但可以通过[自定义您的键映射](./key-bindings.md#user-keymaps)来绑定。

## Git CLI 配置

如果您想在从命令行提交时也将 Zed 用作 [git 提交消息编辑器](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_core_editor)，您可以使用 `zed --wait`：

```sh
git config --global core.editor "zed --wait"
```

或者将其添加到您的 shell 环境中（在 `~/.zshrc`、`~/.bashrc` 等）：

```sh
export GIT_EDITOR="zed --wait"
```
