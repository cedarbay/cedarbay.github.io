# CedarBayInc

面向软件定制服务的中英双语门户页，采用原生 HTML、CSS、JavaScript，无第三方运行依赖。发布时仅将网站文件打包到 `dist/`，可部署到 GitHub Pages 等静态托管服务。

## 本地预览

需要 Node.js 18 或更高版本，无需安装依赖。

```sh
npm run dev
```

打开 http://127.0.0.1:4173 。静态文件位于仓库根目录。`npm run check` 检查脚本语法。

## 候补名单

表单校验后生成发往 **support@cedarbay.cc** 的邮件草稿，访客需要在自己的邮件应用中点击发送，才算完成申请。页面不会声称已收到邮件或已自动登记名单。

未配置默认邮件应用的访客可以复制完整项目介绍；剪贴板受限时会展示可手动复制的文本。此版本没有后端数据库，也不存储访客填写的信息。若以后需要网页内直接提交，应接入实际收件接口，并在接口确认后展示成功状态。

## 页面与内容

- 默认英文，右上角切换中文；仅语言偏好保存在浏览器中。
- 服务介绍、合作流程、候补表单、常见问题与隐私说明。
- 支持移动端、键盘操作、减少动态效果偏好和无 JavaScript 邮箱入口。
- `index.html`：结构和英文默认内容。
- `styles.css`：样式与响应式布局。
- `app.js`：双语文案、邮件草稿、复制与隐私弹窗。
- `assets/favicon.svg`：雪松标志。
- `assets/cedar-bay.png`：内置 image_gen 生成的品牌氛围主视觉，不代表公司所在地。

主视觉提示概要：电影感太平洋西北雪松海湾航拍；右下深绿森林、浅玉色静水、远方雾山、暖色晨光；柔和苔绿与奶油色，竖幅，无建筑、人物或文字。

## 自动发版与部署

沿用 `../../sunpebble/sunpebble.github.io` 的 release-please + GitHub Pages 流程：

1. 推送到 `main`，先运行语法检查和静态打包。
2. release-please 根据 Conventional Commits 创建或更新发版 PR，维护 `package.json` 版本、版本清单和 `CHANGELOG.md`。
3. 合并发版 PR 后，自动创建 GitHub Release 和版本标签。
4. 同一工作流检出该 Release 对应的提交，再次检查并打包，发布到 GitHub Pages。

普通 push 不直接更新线上页面；工作流不会自动合并发版 PR。`feat:`、`fix:`、`feat!:` 等提交驱动版本更新，`chore:` 通常不会单独触发发版。当前版本基线为 `1.0.0`，后续版本由 release-please 计算。

`.github/workflows/ci.yml` 为人工创建的普通 PR 提供检查；`.github/workflows/release.yml` 处理 `main` 推送、发版与部署。Dependabot 每周集中检查 GitHub Actions 版本。

### GitHub 仓库首次设置

- 将代码推送到目标 GitHub 仓库的 `main` 分支。
- 在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，不要选择从分支直接发布。
- 在 **Settings → Actions → General → Workflow permissions** 允许 **Allow GitHub Actions to create and approve pull requests**。如果组织限制该选项，需先由组织管理员允许。
- 工作流只使用自动提供的 `GITHUB_TOKEN`，不需要额外的 PAT 或部署密钥；部署使用 `github-pages` environment，其保护规则需要允许 `main` 部署。

使用默认 `GITHUB_TOKEN` 创建的发版 PR 不会自动触发另一条 PR CI 工作流。若将 PR CI 设为合并必需检查，需要另行配置 GitHub App/PAT 触发检查，或调整发版 PR 的检查策略。本流程会在 `main` 推送及实际部署前执行检查。

### 本地验证与产物

```sh
npm run check
npm run build
```

打包无需安装依赖，CI 使用 Node.js 24。`dist/` 仅包含 `index.html`、`styles.css`、`app.js`、`.nojekyll` 和 `assets/`；开发脚本、仓库配置与 `artifacts/` 截图不会发布。每次打包会先清理旧产物，`dist/` 不提交到 Git。

当前代码未包含第三方统计、远程字体或表单服务。

参考：[Release Please Action](https://github.com/googleapis/release-please-action)、[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
