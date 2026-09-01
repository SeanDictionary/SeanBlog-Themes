# Cardinal

高自由度可配置主题，Aurora/Lazzaro 风格。暗色优先，侧边栏 + 卡片/列表 + Hero + 全量自定义。

## 功能概览

- **布局结构**：侧栏位置/固定方式/内容/列表样式/分隔/Hero/精选/导航/顶栏行为
- **视觉风格**：主题/字体/主题色/圆角/阴影/毛玻璃/正文标题样式/代码块配色/行号
- **文章详情**：元信息多选/阅读时间/目录序号
- **页脚浮动**：返回顶部/主题切换按钮/跳转评论

所有 select 设置经 `<body data-*>` 属性驱动 CSS 变量，无需 JS 切换。

## 设置项

详见 `theme.yaml` 的 `settingsSchema`，共 4 组：

| 组 | 设置项 |
|---|---|
| 布局结构 | showTopBar / headerBehavior / sidebarPosition / sidebarSticky / sidebarContent / contentWidth / articleListStyle / listSeparator / showHeroSection / heroWidth / heroBgImage / heroHeight / heroBgFallback / showPinned |
| 视觉风格 | colorMode / showThemeToggle / themeTogglePosition / fontFamily / headingFontFamily / accentColor / accentImmersion / borderRadius / shadowStyle / headerBlur / articleHeadingStyle / codeBlockTheme / showCodeLineNumbers |
| 文章详情 | articleMetaItems / showReadingTime / showTocNumbers |
| 页脚浮动 | showBackToTop / showCommentJumpButton |

## 代码块配色

5 套 prism 配色变体，经 `body[data-code-theme]` 切换：

- `one-dark`（默认）
- `github-dark`
- `github-light`
- `nord`
- `dracula`

## 代码块行号

框架始终输出 `<span class="line">` 行结构，主题 CSS 用 `counter()` 控制：
- `showCodeLineNumbers=true` → `body[data-show-line-numbers="true"]` → `.line::before { content: counter(codeline) }` 显示行号
- `showCodeLineNumbers=false` → 默认不显示

## 技术栈

- 模板：Handlebars（.hbs）
- 样式：手写 CSS + CSS 变量 + body data-属性驱动
- 交互：`assets/js/main.js`（深浅色/TOC/回顶/回复 UX），平台 `enhance.js`（评论提交/搜索）
- 无第三方 CSS/JS 依赖（Font Awesome 经 CDN 引入）
