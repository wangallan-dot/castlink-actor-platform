# 幕见 CastLink

面向演员、选角导演、制片公司与经纪机构的数字演员卡和在线选角协作平台。

## 在线预览

GitHub Pages：`https://wangallan-dot.github.io/castlink-actor-platform/`

当前仓库为 **MVP 0.1**。重点验证以下闭环：

1. 演员建立标准化数字演员卡；
2. 项目方按角色条件搜索演员；
3. 项目方收藏演员并管理候选人；
4. 演员浏览角色、接收邀请并跟踪试镜进度；
5. 演员资料在浏览器本地保存，验证编辑体验。

## 当前功能

- 平台首页与双角色入口
- 演员数据库
  - 姓名、城市、角色气质、技能关键词搜索
  - 城市、性别、年龄、角色标签、认证状态筛选
  - 演员收藏，本地持久化
- 演员详情页
  - 基础资料、形象标签、技能、语言、履历、视频展示
  - 试镜邀请与隐私提示界面
- 角色招募广场
  - 项目类型、城市和关键词筛选
  - 角色详情、报酬、拍摄周期与试镜要求
- 演员工作台
  - 曝光、收藏、试镜邀请和角色申请概览
  - 试镜进度与资料完整度
- 项目方选角工作台
  - 项目概览
  - 候选演员看板
  - 团队动态和角色完成度
- 演员卡编辑器
  - 基础资料编辑
  - 浏览器 `localStorage` 保存
  - 照片、视频、履历等后续模块入口
- 响应式布局

## 技术栈

- React 19
- TypeScript 6
- Vite 8
- React Router
- Lucide Icons
- 原生 CSS 设计系统
- localStorage 原型数据层

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

代码检查：

```bash
npm run lint
```

## 页面路由

| 路由 | 页面 |
|---|---|
| `/` | 平台首页 |
| `/actors` | 演员搜索 |
| `/actors/:actorId` | 演员详情 |
| `/roles` | 角色招募广场 |
| `/roles/:roleId` | 角色详情 |
| `/dashboard/actor` | 演员工作台 |
| `/dashboard/producer` | 项目方选角工作台 |
| `/profile/edit` | 演员卡编辑器 |

## 当前数据边界

当前版本采用演示数据和浏览器本地存储，没有接入真实账号、服务器数据库、文件上传、在线聊天和支付。所有演员、项目和公司名称均为产品演示内容。

后端接入建议采用：

- PostgreSQL
- 对象存储与视频转码服务
- 手机号或微信登录
- 实名认证服务
- WebSocket 或托管实时消息服务
- RBAC 项目团队权限

详细规划见：

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)
- [`docs/DEVELOPMENT_LOG.md`](docs/DEVELOPMENT_LOG.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

## 产品原则

- 演员基础建卡与接收邀请免费；
- 项目方为搜索效率和选角协作工具付费；
- 不出售演员联系方式；
- 不采用“付费保证进组”或虚假曝光；
- 公开资料、认证资料和私密资料分级管理；
- AI 仅辅助匹配和资料整理，不替代最终选角判断。
