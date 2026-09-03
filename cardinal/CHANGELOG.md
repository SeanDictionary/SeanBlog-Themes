# Changelog — Cardinal 主题

本文件记录 Cardinal 主题的显著变更。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [3.5.0] - 2026-09-03

### Added

- footer partial 接入站点级页脚自定义：`settings.publicFooterText` 非空时用 `{{{...}}}` 原样输出，否则回退 `© {{site.title}}`；RSS 入口按 `settings.publicFooterShowRss` 显隐（默认显示，仅显式 `false` 时隐藏）。
- 自定义页脚容器 `.cf-footer-text`：占满可用宽度、内部正常块流，只继承字体颜色/大小，不继承 footer 的 flex 排版；直接子元素 `margin` 清零，间距由用户内联 `style` 控制。

## [3.4.1]

- 主题细节迭代（见历史提交）。

## [3.4.0]

- 主题细节迭代（见历史提交）。
