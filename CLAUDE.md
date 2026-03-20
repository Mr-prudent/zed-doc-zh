# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress documentation site for translating Zed editor documentation into Chinese (中文). The translated content is stored separately from the VitePress site configuration.

## Commands

```bash
# Start development server
pnpm docs:dev

# Build for production
pnpm docs:build

# Preview production build
pnpm docs:preview
```

## Project Structure

```
zed-doc/
├── docs/                    # VitePress site directory
│   ├── .vitepress/
│   │   └── config.mts       # VitePress configuration (nav, sidebar, etc.)
│   └── index.md             # Homepage
├── src-translated/          # Chinese translated documentation
│   ├── ai/                  # AI feature docs (19 files)
│   ├── collaboration/       # Collaboration docs (3 files)
│   ├── development/         # Development/platform docs (9 files)
│   ├── extensions/          # Extension docs (11 files)
│   └── *.md                 # Root-level docs (21 files)
└── package.json
```

## Key Information

- **Package Manager**: pnpm@10.32.1
- **Framework**: VitePress 2.0.0-alpha.17
- **Content Language**: Chinese (中文)
- **Source**: Translations of Zed editor documentation from zed.dev

## Working with Documentation

When adding new translated content:
1. Place markdown files in `src-translated/` following the existing structure
2. Update the VitePress sidebar configuration in `docs/.vitepress/config.mts` to reference new pages
3. Maintain consistent Chinese terminology with existing translations
