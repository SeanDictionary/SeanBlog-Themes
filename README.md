# SeanBlog Themes

SeanBlog Frame 的主题仓库。存放、开发、分发平台兼容的主题包。

每个子目录是一个可独立打包上传的主题包。仓库设计为可承载多个不同风格的主题，欢迎持续新增。

## 现有主题

| 主题                     | 说明                                                                                                                    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [`cardinal`](./cardinal) | 高自由度可配置主题，Aurora/Lazzaro 风格。侧栏、列表样式、Hero、字体、色彩模式、圆角、阴影、毛玻璃、代码块等全量自定义。 |

## 仓库结构

```
seanblog-themes/
  theme/             # 一个主题包 = 一个子目录
  README.md          # 本文件（仓库用途与开发流程，不放主题具体内容）
```

每个主题包子目录内自行维护：

```
my-theme/
  theme.yaml          # 清单（slug/name/version/engine/settingsSchema…）
  templates/*.hbs     # Handlebars 页面模板
  partials/*.hbs      # 可复用片段
  assets/             # 样式 / 脚本 / 图片
  README.md           # 该主题的功能与设置说明
```

## 权威开发文档

主题开发请以 SeanBlog-Frame 的 **[主题开发指引](../SeanBlog-Frame/docs/theme-development.md)** 为准——它基于实际引擎源码编写，涵盖包结构、`theme.yaml` 清单、`settingsSchema`、模板与上下文（ctx）数据契约、全部 helpers、`data-*` 渐进增强契约、CSS 规范、资源、设置快照、上传启用预览、安全边界、完整示例与常见坑。

> 同目录还有 [`theme-framework.md`](../SeanBlog-Frame/docs/theme-framework.md)，但那是**框架架构/设计决策文档**，部分 API 为设计期描述，**开发不要以它为准**。

## 开发流程

1. 在本仓库新建子目录（如 `my-theme/`），按 [主题开发指引](../SeanBlog-Frame/docs/theme-development.md) 的结构与清单编写。
2. 本地开发时，把主题目录联接到 SeanBlog-Frame 的 `themes/` 目录（开发模式每次从磁盘重读模板，改完刷新即生效）：

   ```bash
   # Windows（目录联接，无需管理员）
   mklink /J D:\Github\SeanBlog-Frame\themes\my-theme D:\Github\SeanBlog-Themes\my-theme
   # macOS / Linux
   ln -s "$PWD/my-theme" /d/Github/SeanBlog-Frame/themes/my-theme
   ```

3. 启动 SeanBlog-Frame 的 `npm run dev`，后台 `/admin/themes` 启用该主题。
4. 用 `/theme-preview?theme=<slug>&page=home|article`（管理员会话）预览验证。
5. 打包上传：

   ```bash
   cd my-theme && zip -r ../my-theme.zip .
   ```

   后台 `/admin/themes` 上传 zip → 安装 → 切换。安装时会校验清单、模板语法、CSS、zip 安全性（见开发指引 §10/§13/§14）。

## 新增一个主题

1. 复制 `cardinal/` 或从 [开发指引 §15 的最小示例](../SeanBlog-Frame/docs/theme-development.md#15-完整最小主题示例) 起步，改 `slug`/`name`/`version` 等。
2. `theme.yaml` 的 `base: seanblog-default` 可让你只写要改的模板/partial，其余继承默认主题。
3. 在主题子目录写 `README.md` 描述功能与设置项（与 `theme.yaml.settingsSchema` 保持同步）。
4. 提交到本仓库对应子目录。

## 主题清单要点（速查）

- `slug`：`^[a-z0-9][a-z0-9_-]{0,63}$`，须与目录名一致，不能是 `seanblog-default`。
- `engine`：必须为字面量 `seanblog-theme`；`engineVersion`：正整数，大于当前引擎版本（2）会被拒绝。
- `assets.css`：主样式相对路径（**`assets.js` 等其他字段被引擎忽略**，JS 靠模板里 `{{asset "..."}}` 引用）。
- 设置写在 `theme.yaml.settingsSchema`（不是独立 `settings.yaml`）；声明 `cssVariable` 的项自动注入 `:root`。
- 布局用 `{{{body}}}` 注入（**不支持** Ghost 的 `{{!< default}}`）；文章正文用 `{{{content}}}`，评论 `content/author/link` 必须双花括号转义。

详见 [开发指引](../SeanBlog-Frame/docs/theme-development.md)。

## 提交规范

- 每个主题包的文件提交到各自子目录，不要把打包出的 `.zip` 提交进仓库（已在 `.gitignore` 忽略）。
- 仓库根 README 仅描述仓库用途与流程，不放任何主题包的具体内容。
- 主题升级时同步更新该主题的 `README.md` 与 `theme.yaml.version`。
