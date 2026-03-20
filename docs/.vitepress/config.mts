import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zed 文档",
  description: "Zed 编辑器中文文档",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    sidebar: [
      // 欢迎
      {
        text: "欢迎",
        collapsed: true,
        items: [
          { text: "入门指南", link: "/" },
          {
            text: "安装",
            link: "/installation",
            items: [
              { text: "更新", link: "/update" },
              { text: "卸载", link: "/uninstall" },
            ],
          },
          { text: "故障排除", link: "/troubleshooting" },
        ],
      },
      // AI
      {
        text: "AI",
        collapsed: true,
        items: [
          { text: "概述", link: "/ai/overview" },
          {
            text: "智能体面板",
            link: "/ai/agent-panel",
            items: [
              { text: "工具", link: "/ai/tools" },
              { text: "工具权限", link: "/ai/tool-permissions" },
              { text: "外部智能体", link: "/ai/external-agents" },
            ],
          },
          { text: "行内助手", link: "/ai/inline-assistant" },
          { text: "编辑预测", link: "/ai/edit-prediction" },
          { text: "文本对话", link: "/ai/text-threads" },
          { text: "规则", link: "/ai/rules" },
          { text: "模型上下文协议", link: "/ai/mcp" },
          {
            text: "配置",
            link: "/ai/configuration",
            items: [
              { text: "LLM 提供商", link: "/ai/llm-providers" },
              { text: "智能体设置", link: "/ai/agent-settings" },
            ],
          },
          {
            text: "订阅",
            link: "/ai/subscription",
            items: [
              { text: "模型", link: "/ai/models" },
              { text: "套餐与用量", link: "/ai/plans-and-usage" },
              { text: "账单", link: "/ai/billing" },
            ],
          },
        ],
      },
      // 使用代码
      {
        text: "使用代码",
        collapsed: true,
        items: [
          {
            text: "编辑代码",
            link: "/editing-code",
            items: [
              { text: "代码补全", link: "/completions" },
              { text: "代码片段", link: "/snippets" },
              { text: "诊断与快速修复", link: "/diagnostics" },
              { text: "多缓冲区", link: "/multibuffers" },
            ],
          },
          {
            text: "查找与导航",
            link: "/finding-navigating",
            items: [
              { text: "命令面板", link: "/command-palette" },
              { text: "大纲面板", link: "/outline-panel" },
              { text: "标签页切换器", link: "/tab-switcher" },
            ],
          },
          {
            text: "运行与测试",
            link: "/running-testing",
            items: [
              { text: "终端", link: "/terminal" },
              { text: "任务", link: "/tasks" },
              { text: "调试器", link: "/debugger" },
              { text: "REPL", link: "/repl" },
            ],
          },
          { text: "Git", link: "/git" },
        ],
      },
      // 协作
      {
        text: "协作",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/collaboration/overview",
            items: [
              { text: "频道", link: "/collaboration/channels" },
              {
                text: "联系人与私人通话",
                link: "/collaboration/contacts-and-private-calls",
              },
            ],
          },
        ],
      },
      // 远程开发
      {
        text: "远程开发",
        collapsed: true,
        items: [
          { text: "概述", link: "/remote-development" },
          { text: "环境变量", link: "/environment" },
          { text: "开发容器", link: "/dev-containers" },
        ],
      },
      // 平台支持
      {
        text: "平台支持",
        collapsed: true,
        items: [
          { text: "macOS", link: "/macos" },
          { text: "Windows", link: "/windows" },
          { text: "Linux", link: "/linux" },
        ],
      },
      // 自定义
      {
        text: "自定义",
        collapsed: true,
        items: [
          {
            text: "外观",
            link: "/appearance",
            items: [
              { text: "主题", link: "/themes" },
              { text: "图标主题", link: "/icon-themes" },
              { text: "字体与视觉调整", link: "/visual-customization" },
            ],
          },
          {
            text: "按键绑定",
            link: "/key-bindings",
            items: [
              { text: "Vim 模式", link: "/vim" },
              { text: "Helix 模式", link: "/helix" },
            ],
          },
        ],
      },
      // 语言支持
      {
        text: "语言支持",
        collapsed: true,
        items: [
          { text: "所有语言", link: "/languages" },
          {
            text: "配置语言",
            link: "/configuring-languages",
            items: [
              { text: "工具链", link: "/toolchains" },
              { text: "语义标记", link: "/semantic-tokens" },
            ],
          },
          { text: "Ansible", link: "/languages/ansible" },
          { text: "AsciiDoc", link: "/languages/asciidoc" },
          { text: "Astro", link: "/languages/astro" },
          { text: "Bash", link: "/languages/bash" },
          { text: "Biome", link: "/languages/biome" },
          { text: "C", link: "/languages/c" },
          { text: "C++", link: "/languages/cpp" },
          { text: "C#", link: "/languages/csharp" },
          { text: "Clojure", link: "/languages/clojure" },
          { text: "CSS", link: "/languages/css" },
          { text: "Dart", link: "/languages/dart" },
          { text: "Deno", link: "/languages/deno" },
          { text: "Diff", link: "/languages/diff" },
          { text: "Docker", link: "/languages/docker" },
          { text: "Elixir", link: "/languages/elixir" },
          { text: "Elm", link: "/languages/elm" },
          { text: "Emmet", link: "/languages/emmet" },
          { text: "Erlang", link: "/languages/erlang" },
          { text: "Fish", link: "/languages/fish" },
          { text: "GDScript", link: "/languages/gdscript" },
          { text: "Gleam", link: "/languages/gleam" },
          { text: "GLSL", link: "/languages/glsl" },
          { text: "Go", link: "/languages/go" },
          { text: "Groovy", link: "/languages/groovy" },
          { text: "Haskell", link: "/languages/haskell" },
          { text: "Helm", link: "/languages/helm" },
          { text: "HTML", link: "/languages/html" },
          { text: "Java", link: "/languages/java" },
          { text: "JavaScript", link: "/languages/javascript" },
          { text: "Julia", link: "/languages/julia" },
          { text: "JSON", link: "/languages/json" },
          { text: "Jsonnet", link: "/languages/jsonnet" },
          { text: "Kotlin", link: "/languages/kotlin" },
          { text: "Lua", link: "/languages/lua" },
          { text: "Luau", link: "/languages/luau" },
          { text: "Makefile", link: "/languages/makefile" },
          { text: "Markdown", link: "/languages/markdown" },
          { text: "Nim", link: "/languages/nim" },
          { text: "OCaml", link: "/languages/ocaml" },
          { text: "OpenTofu", link: "/languages/opentofu" },
          { text: "PHP", link: "/languages/php" },
          { text: "PowerShell", link: "/languages/powershell" },
          { text: "Prisma", link: "/languages/prisma" },
          { text: "Proto", link: "/languages/proto" },
          { text: "PureScript", link: "/languages/purescript" },
          { text: "Python", link: "/languages/python" },
          { text: "R", link: "/languages/r" },
          { text: "Rego", link: "/languages/rego" },
          { text: "ReStructuredText", link: "/languages/rst" },
          { text: "Racket", link: "/languages/racket" },
          { text: "Roc", link: "/languages/roc" },
          { text: "Ruby", link: "/languages/ruby" },
          { text: "Rust", link: "/languages/rust" },
          { text: "Scala", link: "/languages/scala" },
          { text: "Scheme", link: "/languages/scheme" },
          { text: "Shell Script", link: "/languages/sh" },
          { text: "SQL", link: "/languages/sql" },
          { text: "Svelte", link: "/languages/svelte" },
          { text: "Swift", link: "/languages/swift" },
          { text: "Tailwind CSS", link: "/languages/tailwindcss" },
          { text: "Terraform", link: "/languages/terraform" },
          { text: "TOML", link: "/languages/toml" },
          { text: "TypeScript", link: "/languages/typescript" },
          { text: "Uiua", link: "/languages/uiua" },
          { text: "Vue", link: "/languages/vue" },
          { text: "XML", link: "/languages/xml" },
          { text: "YAML", link: "/languages/yaml" },
          { text: "Yara", link: "/languages/yara" },
          { text: "Yarn", link: "/languages/yarn" },
          { text: "Zig", link: "/languages/zig" },
        ],
      },
      // 扩展
      {
        text: "扩展",
        collapsed: true,
        items: [
          { text: "概述", link: "/extensions" },
          { text: "安装扩展", link: "/extensions/installing-extensions" },
          { text: "开发扩展", link: "/extensions/developing-extensions" },
          { text: "扩展功能", link: "/extensions/capabilities" },
          { text: "语言扩展", link: "/extensions/languages" },
          { text: "调试器扩展", link: "/extensions/debugger-extensions" },
          { text: "主题扩展", link: "/extensions/themes" },
          { text: "图标主题扩展", link: "/extensions/icon-themes" },
          { text: "代码片段扩展", link: "/extensions/snippets" },
          { text: "斜杠命令扩展", link: "/extensions/slash-commands" },
          { text: "智能体服务器扩展", link: "/extensions/agent-servers" },
          { text: "MCP 服务器扩展", link: "/extensions/mcp-extensions" },
        ],
      },
      // 从其他环境迁移
      {
        text: "从其他环境迁移",
        collapsed: true,
        items: [
          { text: "从 VS Code 迁移", link: "/migrate/vs-code" },
          { text: "从 IntelliJ IDEA 迁移", link: "/migrate/intellij" },
          { text: "从 PyCharm 迁移", link: "/migrate/pycharm" },
          { text: "从 WebStorm 迁移", link: "/migrate/webstorm" },
          { text: "从 RustRover 迁移", link: "/migrate/rustrover" },
        ],
      },
      // 参考
      {
        text: "参考",
        collapsed: true,
        items: [
          { text: "所有设置", link: "/reference/all-settings" },
          { text: "所有操作", link: "/all-actions" },
          { text: "CLI 参考", link: "/reference/cli" },
        ],
      },
      // 账户与隐私
      {
        text: "账户与隐私",
        collapsed: true,
        items: [
          { text: "身份验证", link: "/authentication" },
          { text: "角色", link: "/roles" },
          {
            text: "隐私与安全",
            link: "/ai/privacy-and-security",
            items: [
              { text: "工作区信任", link: "/worktree-trust" },
              { text: "AI 改进", link: "/ai/ai-improvement" },
            ],
          },
          { text: "遥测数据", link: "/telemetry" },
        ],
      },
      // 开发 Zed
      {
        text: "开发 Zed",
        collapsed: true,
        items: [
          {
            text: "开发 Zed",
            link: "/development",
            items: [
              { text: "macOS", link: "/development/macos" },
              { text: "Linux", link: "/development/linux" },
              { text: "Windows", link: "/development/windows" },
              { text: "FreeBSD", link: "/development/freebsd" },
              { text: "使用调试器", link: "/development/debuggers" },
              { text: "性能", link: "/performance" },
              { text: "术语表", link: "/development/glossary" },
            ],
          },
          { text: "发布说明", link: "/development/release-notes" },
          { text: "调试崩溃问题", link: "/development/debugging-crashes" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/zed-industries/zed" },
    ],

    outline: { label: "目录", level: [2, 3] },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: { text: "最后更新" },
    returnToTopLabel: "返回顶部",
  },
});
