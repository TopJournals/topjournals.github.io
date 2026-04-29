# MetaWeb 项目移交与部署手册

本文档用于把 `MetaWeb` 整个项目移交给新的维护者。  
目标是让接手人可以完成以下事情：

1. 把项目压缩包解压到本地
2. 在本地运行前端网站
3. 在本地运行后台管理端
4. 把项目上传到 GitHub
5. 通过 GitHub Pages 部署静态网页
6. 后续通过本地后台维护论文、新闻、人员、专利、软著等内容

---

## 1. 项目说明

这个项目包含两部分：

- **前端静态网站**
  - 使用 `Astro + TypeScript + Tailwind CSS`
  - 用于展示课题组主页
  - 可以部署到 `GitHub Pages`

- **本地后台管理端**
  - 使用一个本地 `Node.js` 服务
  - 用于维护论文、新闻、人员、荣誉、会议、专利、软著等数据
  - **只在本地使用，不部署到 GitHub Pages**

请注意：

- GitHub Pages **只能部署静态前端**
- 后台管理端 **只能本地运行**

---

## 2. 项目目录结构

下面这些目录最重要：

```text
MetaWeb/
├─ src/
│  ├─ pages/                 # 前端页面
│  ├─ components/            # 前端组件
│  ├─ layouts/               # 页面布局
│  ├─ styles/                # 全局样式
│  └─ data/
│     ├─ content/            # 后台真正维护的数据 JSON
│     ├─ publications.ts     # 数据读取包装层
│     ├─ news.ts
│     ├─ people.ts
│     ├─ honors.ts
│     ├─ conference.ts
│     ├─ intellectualProperty.ts
│     └─ site.ts
├─ public/                   # 静态资源
├─ admin/                    # 本地后台管理端
│  ├─ index.html
│  ├─ server.mjs
│  ├─ credentials.example.json
│  └─ credentials.local.json # 本地后台账号密码，不进 git
├─ .github/workflows/
│  └─ deploy.yml             # GitHub Pages 自动部署配置
├─ package.json
├─ astro.config.mjs
└─ HANDOFF_GUIDE.md
```

---

## 3. 接手前需要安装的软件

建议先安装以下工具：

### 必装

1. **Node.js 24**
   - 建议安装 Node.js 24 LTS 或兼容版本
   - 验证命令：

   ```bash
   node -v
   npm -v
   ```

2. **Git**
   - 验证命令：

   ```bash
   git --version
   ```

### 推荐工具

1. **VS Code**
2. **GitHub Desktop**  
   如果不熟悉命令行，可以用它来提交和推送代码

---

## 4. 从压缩包恢复到本地

假设收到的是一个项目压缩包，例如：

```text
MetaWeb.zip
```

### 步骤

1. 解压到本地目录，例如：

```text
D:\Projects\MetaWeb
```

或

```text
C:\Users\YourName\Desktop\MetaWeb
```

2. 打开终端进入项目目录：

```bash
cd 路径/MetaWeb
```

3. 安装依赖：

```bash
npm install
```

如果安装成功，会生成或更新 `node_modules/`。

---

## 5. 本地运行前端网站

前端用于预览课题组主页。

在项目根目录运行：

```bash
npm run dev
```

运行后终端会显示类似地址：

```text
http://localhost:4321/
```

如果 `4321` 被占用，也可能自动换成：

```text
http://localhost:4322/
http://localhost:4323/
```

### 本地前端用途

- 检查网页是否正常显示
- 检查论文、新闻、人员等内容是否更新
- 检查样式、排版和图片

---

## 6. 本地运行后台管理端

后台管理端用于编辑网站数据。

### 6.1 首次配置后台账号密码

后台账号密码保存在：

```text
admin/credentials.local.json
```

如果这个文件不存在，请复制示例文件：

```text
admin/credentials.example.json
```

复制后重命名为：

```text
admin/credentials.local.json
```

然后修改内容，例如：

```json
{
  "username": "admin",
  "password": "your-strong-password"
}
```

请务必注意：

- `admin/credentials.local.json` **不能提交到 GitHub**
- 这个文件已经写入 `.gitignore`

### 6.2 启动后台

在项目根目录运行：

```bash
npm run admin
```

启动成功后，打开浏览器访问：

```text
http://127.0.0.1:4325/
```

浏览器会弹出账号密码框，输入：

- Username: `credentials.local.json` 中的 `username`
- Password: `credentials.local.json` 中的 `password`

### 6.3 后台能管理哪些内容

后台当前支持以下集合：

- `Publications`
- `News`
- `People`
- `Honors`
- `Conference`
- `Patents`
- `Software`
- `Standards`
- `Site Profile`

### 6.4 后台编辑流程

进入后台后：

1. 左侧点击想编辑的集合
2. 右侧选择已有条目，或者点击 `New Item`
3. 修改内容
4. 点击 `Save All`

保存后，会直接修改这些 JSON 文件：

```text
src/data/content/publications.json
src/data/content/news.json
src/data/content/people.json
src/data/content/honors.json
src/data/content/conference.json
src/data/content/patents.json
src/data/content/software.json
src/data/content/standards.json
src/data/content/site-profile.json
```

### 6.5 后台与前端的关系

后台改的是数据文件。  
前端页面会读取这些数据文件重新生成网页。

也就是说，标准维护流程是：

1. 打开后台改数据
2. 保存
3. 打开前端本地页面检查效果
4. 提交到 GitHub
5. GitHub Pages 自动更新线上网页

---

## 7. 本地检查构建是否正常

在提交到 GitHub 前，建议先本地检查一次：

```bash
npm run build
```

如果成功，会生成：

```text
dist/
```

这个目录就是最终静态网页产物。

---

## 8. 上传到 GitHub

如果这是第一次把项目上传到 GitHub，请按下面步骤。

### 8.1 在 GitHub 创建仓库

进入 GitHub，新建一个仓库。

建议两种方式：

#### 方式 A：普通项目仓库

仓库名例如：

```text
MetaWeb
```

将来网页地址会是：

```text
https://你的用户名.github.io/MetaWeb/
```

#### 方式 B：根域名仓库

仓库名必须是：

```text
你的用户名.github.io
```

将来网页地址会是：

```text
https://你的用户名.github.io/
```

如果只是先用起来，建议先用 **方式 A**。

### 8.2 本地初始化 Git

如果当前项目还不是 git 仓库，在项目根目录运行：

```bash
git init
git branch -M main
git add .
git commit -m "Initial site handoff"
```

### 8.3 连接远程仓库

把下面命令中的地址替换成你的 GitHub 仓库地址：

```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

如果仓库已经存在并且本地已经是 git 仓库，只需要正常：

```bash
git add .
git commit -m "Update site"
git push
```

---

## 9. 部署到 GitHub Pages

项目中已经包含 GitHub Pages 自动部署工作流：

```text
.github/workflows/deploy.yml
```

### 9.1 在 GitHub 打开 Pages

打开仓库网页，进入：

```text
Settings -> Pages
```

在 `Build and deployment` 中选择：

```text
Source -> GitHub Actions
```

### 9.2 自动部署

只要你把代码推送到 `main` 分支：

```bash
git push
```

GitHub 就会自动：

1. 安装依赖
2. 构建 Astro 网站
3. 发布到 GitHub Pages

### 9.3 查看部署状态

去仓库的：

```text
Actions
```

可以看到 `Deploy to GitHub Pages` 工作流是否成功。

### 9.4 线上网址

部署完成后，网址通常是：

#### 普通项目仓库

```text
https://你的用户名.github.io/仓库名/
```

#### 用户主页仓库

```text
https://你的用户名.github.io/
```

---

## 10. 日常维护流程

以后日常维护建议按下面流程：

### 步骤 1：更新本地代码

如果多人协作，先拉最新代码：

```bash
git pull
```

### 步骤 2：启动后台

```bash
npm run admin
```

浏览器打开：

```text
http://127.0.0.1:4325/
```

### 步骤 3：启动前端预览

新开一个终端窗口，在项目根目录运行：

```bash
npm run dev
```

### 步骤 4：改数据

在后台里修改论文、新闻、人员、荣誉等内容，点击 `Save All`。

### 步骤 5：检查页面

打开本地前端地址，确认：

- 内容是否正确
- 链接是否正确
- 样式是否正常
- 图片是否显示

### 步骤 6：本地构建检查

```bash
npm run build
```

### 步骤 7：提交并推送

```bash
git add .
git commit -m "Update site content"
git push
```

### 步骤 8：等待 GitHub 自动部署

在 GitHub 的 `Actions` 页面查看部署进度。

---

## 11. 常见问题

### 11.1 为什么 GitHub Pages 上没有后台

因为 GitHub Pages 只能部署静态网页。  
后台是本地的 Node.js 服务，不能直接部署到 GitHub Pages。

### 11.2 为什么本地前端能打开，后台打不开

可能原因：

1. 没有运行后台命令：

```bash
npm run admin
```

2. `127.0.0.1:4325` 端口被占用
3. `admin/credentials.local.json` 不存在
4. 用户名或密码输入错误

### 11.3 为什么修改后台后网页没有变化

因为后台只改了数据文件，还没有重新预览或重新部署。

请检查：

1. 是否点击了 `Save All`
2. 是否刷新了前端页面
3. 是否运行了 `npm run dev`
4. 是否推送到 GitHub 并等待 Actions 完成

### 11.4 为什么 `git add .` 没有提交后台密码文件

这是正常的。  
`admin/credentials.local.json` 被 `.gitignore` 忽略了，防止后台密码泄露。

### 11.5 可以直接手改 JSON 吗

可以。  
如果后台临时不可用，也可以直接编辑：

```text
src/data/content/*.json
```

但建议优先用后台，减少格式错误。

---

## 12. 当前内容数据位置

如果需要手工维护，重点看这些文件：

```text
src/data/content/publications.json   # 论文
src/data/content/news.json           # 新闻
src/data/content/people.json         # 学生与成员
src/data/content/honors.json         # 荣誉与奖励
src/data/content/conference.json     # 会议论文与报告
src/data/content/patents.json        # 专利
src/data/content/software.json       # 软件著作权
src/data/content/standards.json      # 标准
src/data/content/site-profile.json   # 站点信息、Biography、Professional Activities
```

---

## 13. 建议的交接说明

正式移交给新维护者时，建议同时交付以下内容：

1. 项目压缩包
2. 本文档 `HANDOFF_GUIDE.md`
3. GitHub 仓库地址
4. GitHub 仓库管理员权限
5. 后台本地密码设置方式
6. 若已上线，提供线上网址

如果要彻底完成交接，建议接手人至少亲自跑通一次：

1. `npm install`
2. `npm run dev`
3. `npm run admin`
4. 后台新增一条测试 News
5. `npm run build`
6. `git push`
7. 查看 GitHub Pages 是否更新

---

## 14. 一句话总结

这个项目的工作模式是：

- **本地后台改数据**
- **本地前端检查效果**
- **推到 GitHub**
- **GitHub Pages 自动发布静态网站**

如果只记住这一条，后续维护基本就不会乱。
