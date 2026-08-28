# SeanBlog Themes

SeanBlog Frame 第三方主题仓库。存放社区/自定义主题包。

## 结构

```
seanblog-themes/
  cardinal/          # 每个子目录是一个可独立打包的主题包
  another-theme/    # 将来的主题…
  README.md         # 本文件（仅描述仓库用途）
```

每个主题包子目录下有自己的 `README.md` 描述该主题的功能、设置项和自定义说明。

## 用途

- 开发、存放、分发第三方主题包。
- 主题包可打包为 `.zip` 上传到 SeanBlog-Frame 后台安装启用。

## 开发流程

1. 在本仓库新建子目录（如 `my-theme/`），按 [SeanBlog-Frame 主题框架文档](../SeanBlog-Frame/docs/theme-framework.md) 的结构编写。
2. 本地开发时，将主题目录联接到 SeanBlog-Frame 的 `themes/` 目录：
   ```bash
   # Windows（目录联接，无需管理员）
   mklink /J D:\Github\SeanBlog-Frame\themes\my-theme D:\Github\SeanBlog-Themes\my-theme
   ```
3. 启动 `npm run dev`，后台 `/admin/themes` 启用该主题。
4. 打包上传：
   ```bash
   cd my-theme && zip -r ../my-theme.zip .
   ```
   后台 `/admin/themes` 上传 zip → 安装 → 切换。

## 提交规范

- 主题包文件提交到各自子目录。
- 仓库根 README 仅描述仓库用途，不放任何主题包的具体内容。
