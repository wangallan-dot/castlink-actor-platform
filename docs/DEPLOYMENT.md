# GitHub Pages 部署

本项目通过 `.github/workflows/pages.yml` 自动部署到 GitHub Pages。

## 公开地址

`https://wangallan-dot.github.io/castlink-actor-platform/`

## 部署流程

1. 推送代码到 `main`；
2. GitHub Actions 安装依赖；
3. 执行代码检查和生产构建；
4. 上传 `dist`；
5. 部署到 `github-pages` 环境。

## 仓库设置

首次使用时，进入仓库：

`Settings → Pages → Build and deployment → Source → GitHub Actions`

如果该选项已经自动启用，则无需再次操作。

## 路由说明

项目使用 `HashRouter`，公开链接形式如下：

- 首页：`https://wangallan-dot.github.io/castlink-actor-platform/`
- 演员库：`https://wangallan-dot.github.io/castlink-actor-platform/#/actors`
- 角色广场：`https://wangallan-dot.github.io/castlink-actor-platform/#/roles`

Hash 路由可以避免 GitHub Pages 静态服务器在直接打开子页面时返回 404。
