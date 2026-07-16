# 幕见 CastLink

面向演员和剧组方的 **移动端优先** 剧组招募与演员发现平台。

在线预览：`https://wangallan-dot.github.io/castlink-actor-platform/`

当前版本：**Mobile MVP 0.4.0**

## 当前产品范围

暂时只服务两个身份：

- 演员
- 剧组方

核心内容对象：

- 演员资料
- 剧组招募

核心行为：

```text
浏览 → 收藏 → 申请或邀请 → 沟通 → 试镜
```

当前阶段不考虑会员、套餐、广告、付费曝光和其他商业化功能。

## v0.4.0 主要结构

### 顶部双层导航

第一层频道：

```text
推荐｜剧组招募｜演员
```

第二层地区：

```text
全国｜北京｜上海｜横店｜杭州｜广州｜深圳｜成都｜更多
```

### 演员端底部导航

```text
首页｜剧组招募｜消息｜申请｜我的
```

### 剧组端底部导航

```text
首页｜演员｜消息｜招募管理｜我的
```

### 剧组招募信息流

- 单列高信息密度卡片
- 拍摄地区和具体区域
- 拍摄日期和驻组时长
- 申请截止时间和剩余时长
- 今日截止、3天内、7天内筛选
- 报酬、住宿和外地演员条件
- 已截止招募禁止继续申请

### 演员浏览信息流

- 手机双列视觉卡片
- 常驻城市和可工作地区
- 是否接受跨城
- 是否可以驻组
- 推荐、本地、档期开放、最近活跃和已认证筛选

## 本地运行

```bash
npm install
npm run dev
```

质量检查：

```bash
npm run lint
npm run build
```

## 主要路由

| 路由 | 页面 |
|---|---|
| `/` | 身份化推荐首页 |
| `/recruitments` | 剧组招募信息流 |
| `/recruitments/:roleId` | 剧组招募详情 |
| `/actors` | 演员浏览信息流 |
| `/actors/:actorId` | 演员详情 |
| `/messages` | 项目沟通中心 |
| `/applications` | 演员申请与试镜 |
| `/recruitment/manage` | 剧组招募管理 |
| `/profile/edit` | 我的资料 |

## 当前技术边界

当前仍为可交互前端原型：

- 演员和剧组招募均为演示数据
- 身份、地区、收藏和资料草稿保存在浏览器
- 未接入真实登录和数据库
- 未接入真实图片、视频和附件上传
- 消息尚未接入服务器和跨设备同步
- 申请和邀请按钮尚未形成服务端业务状态

详细规划见：

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)
- [`docs/DEVELOPMENT_LOG.md`](docs/DEVELOPMENT_LOG.md)
