# LifeToolbox

Free everyday online tools — tip calculator, BMI, unit converters, kitchen/image/PDF tools, and more.

## Requirements

- **Node.js ≥ 18.17** (Node 20 recommended — see `.node-version`)

## Setup

```bash
cd lifetoolbox
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export for Cloudflare Pages)

```bash
npm run pages:build
npm run og:generate   # regenerate cluster OG images (1200×630 PNG)
```

Output is in `out/`.

Production canonical URL is in `.env.production` (`https://life.hottoolsbox.com`).

## Deploy to Cloudflare Pages

### 方式 A：Cloudflare Dashboard 直连 GitHub（推荐）

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **lifetoolbox**
2. **Settings → Builds** 确认已连接 `etozqf/lifetoolbox`，Production 分支为 `main`
3. 构建设置：

| 配置项 | 值 |
|--------|-----|
| Build command | `npm run pages:build` |
| Build output directory | `out` |
| Root directory | `/` |

4. **Environment variables**（Production + Preview）：

| 变量 | 值 |
|------|-----|
| `NODE_VERSION` | `20` |
| `NEXT_PUBLIC_SITE_URL` | `https://life.hottoolsbox.com` |

5. 每次 `git push origin main` 后，在 **Deployments** 页应出现新构建。

#### 推送后没有自动部署？

按顺序检查：

1. **Deployments 页** — 是否有新记录？若完全没有 → Git  webhook 未触发
2. **GitHub** → 仓库 **Settings → Integrations → GitHub Apps** → **Cloudflare Workers and Pages** → 确认已授权 `lifetoolbox` 仓库
3. **Cloudflare** → lifetoolbox → **Settings → Builds** → **Disconnect** 后重新 **Connect to Git**
4. 手动触发：**Deployments → Create deployment → 选最新 commit → Deploy**
5. 若构建失败，点开失败记录查看日志（常见：`NODE_VERSION` 未设导致 Node 版本过低）

### 方式 B：GitHub Actions 部署（备用）

若 Cloudflare Git 集成不稳定，可用 Actions 自动部署：

1. GitHub 仓库 **Settings → Secrets and variables → Actions** 添加 Secrets：
   - `CLOUDFLARE_API_TOKEN` — 权限需包含 **Cloudflare Pages: Edit**
   - `CLOUDFLARE_ACCOUNT_ID` — Cloudflare Dashboard 右侧 Account ID

2. **Settings → Secrets and variables → Actions → Variables** 添加：
   - `ENABLE_ACTIONS_DEPLOY` = `true`

3. 可选 Variables：
   - `NEXT_PUBLIC_SITE_URL` = `https://life.hottoolsbox.com`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = 你的 GA4 ID

4. push 到 `main` 后，Actions 会 build + deploy。

也可手动：**Actions → Deploy to Cloudflare Pages → Run workflow**。

> 使用方式 A 时，**不要**设置 `ENABLE_ACTIONS_DEPLOY`，避免重复部署。

### 本地手动部署

```bash
export CLOUDFLARE_API_TOKEN="你的token"
npm run pages:deploy
```

## Current scope

- **Phase 3** — 37 tools, 26 blog posts, `/api/rates` exchange proxy
- Clusters: calc, health, date, convert, random, social, kitchen, image, pdf, **finance**

See `LifeToolbox-MVP-开发规格书.md` for full roadmap.
