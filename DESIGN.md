# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-05-16
- Primary product surfaces: 首页、登录/注册、用户中心、订阅中心、套餐、订单、节点状态、工单、帮助文档
- Evidence reviewed:
  - `README.md`
  - `src/index.css`
  - `src/components/auth-layout.tsx`
  - `src/components/brand-logo.tsx`
  - `src/components/page-header.tsx`
  - `src/pages/dashboard-page.tsx`
  - `src/pages/login-page.tsx`

## Brand
- Personality: 冷静、自信、国际化、克制奢华、基础设施级可信
- Trust signals: 大留白、单色主导、精准排版、超低干扰界面、克制材质感
- Avoid: 模板式创业站、廉价渐变、发光特效、赛博朋克、密集卡片堆砌、后台感

## Product goals
- Goals:
  - 让首页像高端科技品牌官网，而非传统机场后台入口
  - 通过强叙事、高级感和少字表达建立品牌信任
  - 用极简高转化路径承接登录、注册、套餐与客户端下载
- Non-goals:
  - 首页不做拥挤的信息堆砌
  - 首页不承担后台功能解释
- Success signals:
  - 首屏形成强烈的 premium 第一印象
  - 用户能在极少文字下理解“快、稳、私密、高端”
  - 首页 CTA 清晰导向登录/注册/套餐

## Personas and jobs
- Primary personas:
  - 寻找高端机场服务的新用户
  - 对品牌气质与稳定性敏感的回访用户
  - 已登录但仍希望从官网入口回到产品的用户
- User jobs:
  - 快速形成“这是高端服务”的认知
  - 无阻力进入注册、登录或套餐页
  - 感知到服务覆盖、客户端下载与支持路径
- Key contexts of use:
  - 桌面端为主
  - 移动端需要保留完整 CTA 与核心卖点

## Information architecture
- Primary navigation: 首页、套餐、客户端下载、帮助、登录/控制台
- Core routes/screens:
  - `/`
  - `/login`
  - `/register`
  - `/dashboard`
  - `/plans`
  - `/knowledge`
- Content hierarchy:
  - Hero
  - Product theater stage
  - Performance
  - Editorial storytelling blocks
  - Ecosystem
  - CTA

## Design principles
- Principle 1: 先建立高端感，再解释产品能力
- Principle 2: 每一屏只讲一个核心感受，避免模板式信息并列
- Principle 3: 动效必须像材质惯性，而不是营销装饰
- Tradeoffs:
  - 首页优先 premium 感知与品牌节奏，而非参数密度

## Visual language
- Color: 单色主导，浅色模式近 Apple 官网白灰；暗色模式偏墨黑与深炭灰，仅允许极轻暖灰/冷灰明暗变化
- Typography: 超大 display heading、极紧字距、双语气质的小号 eyebrow、短句化正文
- Spacing/layout rhythm: 12/16/24/40/64/96/128 为主，首屏与大区块必须有明显“停顿感”
- Shape/radius/elevation: 使用大型 theater frame 与极细边框，减少通用卡片感
- Motion: 仅允许 fade-up、轻微 scale、sticky navbar 与滚动入场，不做漂浮炫技
- Imagery/iconography: 主视觉依赖抽象网络舞台、精密线条、节点和构图，而非图标堆砌

## Components
- Existing components to reuse:
  - `BrandLogo`
  - `ThemeToggle`
  - `Badge`
  - `Button`
  - `Card`
  - `AuthGlobe`
- New/changed components:
  - 首页 section shell
  - Sticky navbar
  - Hero theater stage
  - Editorial storytelling visuals
  - Reveal motion primitives
- Variants and states:
  - 主 CTA 为高对比实体按钮
  - 次 CTA 为低干扰描边按钮
  - 展示面板统一为“产品舞台”而不是通用卡片
- Token/component ownership:
  - 优先复用 `src/index.css` 变量与现有 `ui/*` 组件

## Accessibility
- Target standard: WCAG AA
- Keyboard/focus behavior: 首屏 CTA、导航链接、支持链接均需键盘可达
- Contrast/readability: 浅色模式正文保持深灰，次级文案不低于现有 muted 对比
- Screen-reader semantics: 首屏使用清晰标题结构与语义化 section
- Reduced motion and sensory considerations: 仅保留轻量 hover/过渡

## Responsive behavior
- Supported breakpoints/devices: mobile / tablet / desktop
- Layout adaptations:
  - 桌面端大幅左右分栏
  - 移动端保持大标题与充足垂直节奏
- Touch/hover differences:
  - 移动端移除对 hover 的依赖

## Interaction states
- Loading: 首页不引入阻塞式加载骨架
- Empty: 以静态内容为主，无复杂空态
- Error: 外链失败不影响核心 CTA
- Success: CTA 跳转到登录、注册、控制台
- Disabled: 已登录与未登录状态通过不同 CTA 文案区分
- Offline/slow network, if applicable: 首页核心内容应在静态构建下可直接展示

## Content voice
- Tone: 冷静、极简、贵气、少字
- Tone: 冷静、极简、贵气、少字，中英混合但以中文主叙事
- Terminology: 首页优先品牌语气；后台术语只在必要时出现
- Microcopy rules:
  - 文案必须短
  - 每屏只保留一个核心信息
  - 避免吵闹营销语和功能罗列

## Implementation constraints
- Framework/styling system: React 19 + Vite + Tailwind CSS v4
- Design-token constraints: 以 `src/index.css` 现有 OKLCH 变量为准
- Performance constraints: 动效库允许使用 `framer-motion`，但必须克制
- Compatibility constraints: 与现有明暗主题兼容
- Test/screenshot expectations: 至少通过 build；首页视觉品质高于后台，像独立品牌官网

## Open questions
- [ ] 是否需要更高级的品牌素材（自定义 logo / 产品渲染图 / 品牌摄影）
- [ ] 是否需要公开套餐摘要与公开节点卖点数据
