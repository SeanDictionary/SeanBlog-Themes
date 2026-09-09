# Changelog — Cardinal 主题

本文件记录 Cardinal 主题的显著变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- 新增移动端导航菜单：窄屏（≤640px）顶栏 `.cf-nav` 隐藏后，`.cf-header-actions` 出现汉堡按钮（`data-cf-menu-toggle`），点击展开 `.cf-mobile-menu` 抽屉式面板，复用 `theme.config.navItems` 与（`searchPosition` 为 `follow-menu` 时的）搜索入口。点击菜单项 / 外部点击 / Esc / 切回宽屏均自动关闭，`aria-expanded`/`aria-label` 随状态切换。修复此前窄屏无法从顶栏进入「分类」「标签」索引页的问题。

### Changed

- GitHub Repo 卡片与友链卡片圆角修复：`border-radius` 从未定义的 `var(--radius-lg)` 改为 `var(--cf-radius-lg)`，跟随站点圆角设置。
- 友链卡片布局改为 CSS Grid 自适应多列：平台侧将连续友链包裹在 `.friend-link-grid` 容器中，`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` 根据窗口宽度自动调整列数，卡片占据整个正文宽度。
- 友链卡片头像样式修复：覆盖 `.cf-post-content img` 的 `margin: 1.5rem 0` 与 `border-radius`，保证有头像与无头像的卡片高度一致；头像显示为圆形（`border-radius: 50%`）而非圆角。
- Callout 圆角修复：`border-radius` 从未定义的 `var(--radius)` 改为 `var(--cf-radius)`。

### Fixed

- 修复侧边栏「更多」弹窗（标签 / 分类全部列表）无法关闭的问题：当 `sidebarSticky` 为 `sticky`/`fixed` 时，`.cf-sidebar` 的 `position: sticky/fixed` 会创建层叠上下文，把 Bootstrap modal 的 `z-index:1055` 困在侧栏局部，导致 body 级 `.modal-backdrop`（`z-index:1050`）反而画在 modal 之上、遮住关闭按钮与遮罩点击区，关闭按钮 / 点击遮罩关闭均失效（仅 Esc 与 JS 调用 `hide()` 仍可用）。`assets/js/main.js` 在初始化时将 `.cf-sidebar` 内的 modal 提升至 `<body>` 直接子节点，脱离侧栏层叠上下文，关闭按钮与点击遮罩恢复正常。

## [3.8.0] - 2026-09-06

### Added

- 新增 `templates/404.hbs` 404 页模板：居中展示 404 状态码、标题、说明与「返回首页 / 返回上一页」按钮，复用 `.cf-archive-kicker` 与 `.cf-btn`，新增 `.cf-btn-ghost` 次要按钮变体与 `.cf-not-found*` 样式。主题未提供 404.hbs 时由平台内置 404 页兜底。
- 404 页布局调整：隐藏侧边栏，`.cf-body.cf-page-404` 设为 `min-height:100vh` 的 flex 列，`.cf-layout` 撑满视口且内容垂直居中，页脚自然贴底（不再吊在半空）。仅作用于 404 页，不影响其他页面。
- `.cf-btn` 补 `text-decoration: none`，修复 404 页「返回首页」作为 `<a>` 时默认带下划线的问题。

### Changed

- 移除 `profileName`（个人简介名称）设置项的多余说明文案「留空则不显示名称（不再自动使用站点名称）」；留空即不显示，无需额外提示。`profileSignature`（个人简介签名）本就无说明文案，行为一致。

## [3.7.0] - 2026-09-05

### Changed

- `articleHeadingStyle` 设置（原 label「正文二级标题样式」→「正文标题样式」）的装饰变体（彩色下划线 / 左侧竖条）从仅作用于 `h2` 扩展到 `h2`–`h4`，并按层级逐级递减装饰强度以保持视觉层级：`bar-left` 竖条宽度 h2 4px / h3 3px / h4 2px、内边距逐级收窄；`underline` 下边框 h2 2px 强调色 / h3 1px 强调色 / h4 1px 中性边框。`setting key` 与取值（`default`/`underline`/`bar-left`）及 `data-article-heading` 属性语义不变，向后兼容；默认主题未受影响。

### Added

- `.cf-post-content h4` 基础字号规则（1rem / 700 / 外边距），此前 h4 仅继承字体族与滚动偏移、无独立样式。

## [3.6.0] - 2026-09-04

### Added

- 侧边栏个人简介新增 `profileName`（个人简介名称）设置；名称与签名均由自定义设置指定，不再自动使用站点名称/站点描述。
- 搜索弹窗重构为全屏遮罩 + 居中对话框：头部搜索图标/输入框/ESC、结果项展示标题/摘要/分类、底部「查看完整搜索结果」入口；新增 `⌘K / Ctrl+K` 打开、关键词大小写不敏感高亮（`<mark class="sb-mark">`）。

### Fixed

- 修复代码块每行之间出现额外空行的问题：Shiki 在相邻 `.line` 之间输出 `\n`，叠加 `display:block` 与 `white-space:pre` 被渲染为空行；改用 `pre code { display:flex; flex-direction:column }` 消除空白匿名项，行号与自动换行开关不受影响。
- 修复顶栏菜单末项与右侧搜索图标紧贴（间距为 0）的问题：`.cf-header-actions` 增加 `margin-left`。

## [3.5.0] - 2026-09-03

### Added

- footer partial 接入站点级页脚自定义：`settings.publicFooterText` 非空时用 `{{{...}}}` 原样输出，否则回退 `© {{site.title}}`；RSS 入口按 `settings.publicFooterShowRss` 显隐（默认显示，仅显式 `false` 时隐藏）。
- 自定义页脚容器 `.cf-footer-text`：占满可用宽度、内部正常块流，只继承字体颜色/大小，不继承 footer 的 flex 排版；直接子元素 `margin` 清零，间距由用户内联 `style` 控制。

## [3.4.1]

- 主题细节迭代（见历史提交）。

## [3.4.0]

- 主题细节迭代（见历史提交）。
