# SeanBlog-Themes

SeanBlog Frame 第三方主题开发仓库。每个子目录是一个可独立打包上传的主题包。

## 主题包结构

```
cardinal/
  theme.yaml            # 清单（slug/name/version/engine/engineVersion/settingsSchema）
  templates/            # Handlebars 模板（.hbs）
    default.hbs         # 整页布局（<html><head><body>{{{body}}}</body>）
    index.hbs           # 首页
    post.hbs            # 文章详情
    taxonomy.hbs        # 分类/标签归档
    categories.hbs / tags.hbs
    search.hbs
  partials/             # 可复用片段（header/footer/post-card/pagination/...）
  assets/               # CSS/JS/图片/字体
    theme.css
```

## 开发流程

1. 在本仓库新建子目录（如 `my-theme/`），按上面结构编写。
2. 在 SeanBlog-Frame 本地，把主题目录链接/复制到 `themes/{slug}/`：
   ```bash
   # Windows 联接（无需管理员）
   mklink /J D:\Github\SeanBlog-Frame\themes\my-theme D:\Github\SeanBlog-Themes\my-theme
   ```
3. 启动 `npm run dev`，后台 `/admin/themes` 启用该主题（或 DB 写 `activeTheme`）。
4. 调试模板/样式/CSS 变量，HMR 之外的主题文件改动会被引擎 dev 模式自动重读。

## 打包上传

把主题目录的内容（`theme.yaml` 在 zip 根）打包成 zip：

```bash
cd cardinal && zip -r ../cardinal.zip . -x "*.git*"
```

后台 `/admin/themes` 上传 zip 即可安装启用，生产环境无需重新部署。

## 模板语法与契约

见 `SeanBlog-Frame/docs/theme-framework.md`。

## 内置主题

- `cardinal` — 高自由度可配置主题（侧栏/列表样式/Hero/字体/圆角/色彩模式等），作为高自定义参考实现。

SeanBlog-Frame 仓库自带 `seanblog-default` 主题（作为 fallback 兜底，不在此仓库）。
