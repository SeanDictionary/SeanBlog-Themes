# Cardinal

高自由度可配置主题，Aurora/Lazzaro 风格。暗色优先，侧边栏 + 卡片/列表 + Hero + 全量自定义。

## 功能概览

- **布局结构**：顶栏（显隐/导航/搜索位置/对齐/菜单项/行为）、侧边栏（位置/固定/内容/简介/标签云/分类）、内容区（宽度/列表样式/分隔/卡片列数与头图）、首页 Hero（显隐/宽度/背景图/高度/底色/置顶区）
- **视觉风格**：色彩模式/切换按钮/主题色/气氛沉浸、正文与标题字体、圆角/阴影/毛玻璃/正文标题样式、代码块配色/行号
- **文章详情**：目录侧栏、上下篇排序依据与显隐、元信息多选、阅读时间
- **页脚浮动**：返回顶部、跳转评论

所有 select 设置经 `<body data-*>` 属性驱动 CSS 变量，无需 JS 切换。

## 设置项

详见 `theme.yaml` 的 `settingsSchema`，共 4 组（与下方子组一一对应）：

### 布局结构

| 子组 | 设置项 |
|---|---|
| 顶栏 | showTopBar / showSiteName / showSearch / searchPosition / navAlignment / navItems / headerBehavior |
| 侧边栏 | sidebarPosition / sidebarSticky / sidebarContent / profileAvatar / profileAvatarRadius / profileSignature / profileCustomHtml / sidebarTagsLimit / sidebarCategoriesLimit |
| 内容区 | contentWidth / articleListStyle / listSeparator / cardColumns / cardImageStyle / cardTitleColor |
| 首页 Hero | showHeroSection / heroWidth / heroBgImage / heroHeight / heroBgFallback / showPinned |

### 视觉风格

| 子组 | 设置项 |
|---|---|
| 色彩 | colorMode / showThemeToggle / themeTogglePosition / accentColor / accentImmersion |
| 字体 | fontFamily / headingFontFamily |
| 形态 | borderRadius / shadowStyle / headerBlur / articleHeadingStyle |
| 代码块 | codeBlockTheme / showCodeLineNumbers |

### 文章详情

| 设置项 | 说明 |
|---|---|
| showPostToc | 文章目录侧栏（滚动吸顶+容器内滚动）；关闭则跟随首页侧栏设置 |
| articleNavOrder | 上下篇排序依据：发布时间 / 更新时间 |
| articleMetaItems | 文章元信息多选：发布时间/修改时间/浏览量/评论数/分类/标签 |
| showReadingTime | 显示阅读时间 |
| showArticleNav | 上下篇导航 |

### 页脚浮动

| 设置项 | 说明 |
|---|---|
| showBackToTop | 返回顶部按钮 |
| showCommentJumpButton | 跳转评论按钮 |

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
- 样式：手写 CSS + CSS 变量 + body data-属性驱动；额外引入 Bootstrap 5（CDN）做弹窗等组件
- 交互：`assets/js/main.js`（深浅色/TOC/回顶/回复 UX），平台 `enhance.js`（评论提交/搜索）
- 图标：Font Awesome（经平台 `{{{font_awesome}}}` 注入）
- 数学公式：经平台 `{{{katex_css_link}}}` 注入 KaTeX 样式
