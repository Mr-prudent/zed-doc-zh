---
title: Ansible
description: "在 Zed 中配置 Ansible 语言支持，包括语言服务器、格式化和调试。"
---

# Ansible

Zed 对 Ansible 的支持通过社区维护的 [Ansible 扩展](https://github.com/kartikvashistha/zed-ansible) 提供。

- Tree-sitter: [zed-industries/tree-sitter-yaml](https://github.com/zed-industries/tree-sitter-yaml)
- 语言服务器: [ansible/vscode-ansible](https://github.com/ansible/vscode-ansible/tree/main/packages/ansible-language-server)

## 设置

### 文件检测

为避免错误处理非 Ansible YAML 文件，Ansible 语言默认不与任何文件扩展名关联。

若要更改此行为，您可以在项目内的 Zed 设置（`.zed/settings.json`）或您的 Zed 用户设置（`~/.config/zed/settings.json`）中添加一个 `"file_types"` 部分，以匹配您的文件夹/命名约定。例如：

```json [settings]
{
  "file_types": {
    "Ansible": [
      "**.ansible.yml",
      "**.ansible.yaml",
      "**/defaults/*.yml",
      "**/defaults/*.yaml",
      "**/meta/*.yml",
      "**/meta/*.yaml",
      "**/tasks/*.yml",
      "**/tasks/*.yaml",
      "**/handlers/*.yml",
      "**/handlers/*.yaml",
      "**/group_vars/*.yml",
      "**/group_vars/*.yaml",
      "**/host_vars/*.yml",
      "**/host_vars/*.yaml",
      "**/playbooks/*.yml",
      "**/playbooks/*.yaml",
      "**playbook*.yml",
      "**playbook*.yaml"
    ]
  }
}
```

请根据您的需求自由修改此列表。

#### 清单

如果您的清单文件是 YAML 格式，您可以：

- 通过在清单文件顶部添加以下注释，将 `ansible-lint` 清单 JSON 架构附加到文件中：

```yml
# yaml-language-server: $schema=https://raw.githubusercontent.com/ansible/ansible-lint/main/src/ansiblelint/schemas/inventory.json
```

- 或者在您的 Zed 设置中配置 YAML 语言服务器设置，为所有符合您的清单模式的清单文件设置此架构 ([ref](https://zed.dev/docs/languages/yaml))：

```json [settings]
{
  "lsp": {
    "yaml-language-server": {
      "settings": {
        "yaml": {
          "schemas": {
            "https://raw.githubusercontent.com/ansible/ansible-lint/main/src/ansiblelint/schemas/inventory.json": [
              "./inventory/*.yaml",
              "hosts.yml"
            ]
          }
        }
      }
    }
  }
}
```

### LSP 配置

默认情况下，以下配置会传递给 Ansible 语言服务器。它方便地镜像了 [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/blob/03bc581e05e81d33808b42b2d7e76d70adb3b595/lua/lspconfig/configs/ansiblels.lua) 为 Ansible 语言服务器设置的默认值：

```json
{
  "ansible": {
    "ansible": {
      "path": "ansible"
    },
    "executionEnvironment": {
      "enabled": false
    },
    "python": {
      "interpreterPath": "python3"
    },
    "validation": {
      "enabled": true,
      "lint": {
        "enabled": true,
        "path": "ansible-lint"
      }
    }
  }
}
```

> **注意：** 为了使代码检查正常工作，请确保 `ansible-lint` 已安装并且在您的 `$PATH` 中可被发现。

需要时，您可以在 Zed 设置文件的 `"lsp"` 部分覆盖上述任何默认设置。例如：

```json [settings]
{
  "lsp": {
    // Zed Ansible 扩展会在所有设置前加上 `ansible` 前缀，
    // 因此请使用 `ansible.path` 而不是 `ansible.ansible.path`。
    "ansible-language-server": {
      "settings": {
        "ansible": {
          "path": "ansible"
        },
        "executionEnvironment": {
          "enabled": false
        },
        "python": {
          "interpreterPath": "python3"
        },
        "validation": {
          "enabled": false,
          "lint": {
            "enabled": false,
            "path": "ansible-lint"
          }
        }
      }
    }
  }
}
```

可以在项目的页面 [这里](https://github.com/ansible/vscode-ansible/blob/main/docs/als/settings.md) 找到可以传递给服务器的完整选项/设置列表。