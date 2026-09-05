# Changelog — Cardinal 主题

本文件记录 Cardinal 主题的显著变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

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
