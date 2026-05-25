---
title: "色码转换：HEX、RGB、HSL 简明指南"
description: "在 HEX、RGB、HSL 色码之间转换并实时预览——免费在线颜色转换，适合网页设计。"
date: "2026-05-24"
keywords: ["hex 转 rgb", "颜色转换", "hsl 转换", "rgb 转 hex"]
relatedTool: color-converter
---

## 快速回答

**快速回答：** 网页颜色常用 **HEX**（`#FF5733`）、**RGB**（`rgb(255,87,51)`）、**HSL**（`hsl(9,100%,60%)`）。 [色码转换器](/zh/tools/image/color-converter) 同步三种格式并实时显示色块。

## 格式速查

| 格式 | 示例 | 适用 |
|--------|---------|----------|
| HEX | `#3498db` | CSS、设计软件 |
| RGB | `rgb(52, 152, 219)` | 图形 API、Canvas |
| HSL | `hsl(204, 70%, 53%)` | 直观调整明度/饱和度 |

## 三位 HEX

三位 HEX 如 `#f00` 等价于 `#ff0000`。工具两种格式均支持。

## 理解 HSL

- **色相 H**（0–360°）— 色轮位置（红→绿→蓝）
- **饱和度 S**（0–100%）— 灰 vs 鲜艳
- **明度 L**（0–100%）— 黑→彩色→白

设计师常固定 **H**、微调 **L** 与 **S** 得到无障碍变体。

## 亲自试试

在 [色码转换器](/zh/tools/image/color-converter) 中选择或粘贴颜色。做二维码？见 [二维码生成](/zh/tools/image/qr-code)。

## 常见问题

### CSS 该用哪种格式？

现代浏览器均支持。HEX 最常见；HSL 便于做主题色变体。

### 透明度（Alpha）？

本 MVP 专注不透明色。RGBA/HSLA 可能在后续版本支持。

### 取色器不工作？

部分浏览器要求 HTTPS 才能用吸管 API；手动输入 HEX 始终可用。
