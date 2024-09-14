
![预览.gif](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Kapture%202023-05-15%20at%2010.48.45.gif)

## 一、前言

### 1.1 灵感来源

早年有幸看到国外大佬做的一个 [基于 Web 的 Windows XP 桌面娱乐系统](https://winxp.now.sh/), 那时刚好有自建网站的想法, 所以就想是否可以基于 WEB 实现一个仿 macOS 的个人博客, 以桌面应用的形式来呈现网站功能！

### 1.2 相关链接

1. 前端开源代码: https://github.com/KunLunXu-CC/website
2. 后端开源代码: https://github.com/KunLunXu-CC/service
3. 组件库(项目开发过程中抽离出独立的组件库): hhttps://github.com/KunLunXu-CC/brick
4. 抽离出来的编码规范配置包: https://github.com/KunLunXu-CC/norm
5. 在线预览(游客权限有限无法查看所有应用): https://www.kunlunxu.cc/   

## 二、为什么要写这个项目

1. 将自己所学应用到具体项目, 同时项目所有依赖、框架版本都尽可能保持最新, 以求能够及时掌握最新知识
2. 只有不断思考、头脑风暴才能更好的促进成长, 通过在项目对产品、架构、UI、交互、项目部署、需求管理等进行深入思考, 从而扩展自己的能力
3. 体验后端(node)开发, 了解每个功能模块整体运行的流程
4. 将自己的一些奇思妙想, 在具体项目中实现出来, 能够给自己带来满满成就感, 让自己对技术时刻保持着热情
……

## 三 技术栈

### 3.1 前端

1. 使用 `React Hooks` 以函数式组件来进行编码, 并使用新版 `Antd` 来进行开发
2. 使用个人组件库 `@kunlunxu/brick` 进行项目开发, 并将项目中部分组件封装到 `@kunlunxu/brick` 并进行发布
2. 使用 `zustand` 来管理状态
3. 使用 `Sass` 预处理器来编写样式
4. 使用 `Webpack` 从零搭建项目, 完成基本的项目配置
5. 使用 `Eslint` 规范代码语法、风格
6. 使用 `husky` + `commitlint` 规范 `git commit` 提交信息

### 3.2 后端

1. 使用 `Graphql` + `Koa` 构建后端系统
2. 使用 `Mongo` + `mongoose` 来存储后端数据
3. 使用 `node-rsa` 对用户登录密码进行 `rsa` 加解密
4. 使用 `jsonwebtoken` 对用户身份进行验证（`JWT`）
5. 使用 `tinify` 对上传的图片进行压缩
6. 使用 `cron` 来管理系统定时任务(目前已实现系统数据的每日定时备份)
7. 使用 `nodemailer` 实现邮件发送功能(主要用于数据备份, 将备份数据发送指定邮箱)
8. 使用 `pm2` 来部署后端主项目以及定时任务
9. 使用 `boxen` + `inquirer` + `ora` + `shelljs` + `chalk` 来实现交互式 `npm` 脚本, 可选脚本有: 数据备份、数据恢复、角色授权、创建秘钥、创建临时 `Token` ……
10. 使用 `winston` 记录日志, 包括日志文件的生成、终端日志的打印输出、 配合 `websocket` 将日志在前端进行可视化展示
11. 使用 `docker` + `docker-compose` 以容器的方式来部署项目

## 四、部分功能截图

### 4.1 编辑器

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_11-42-38.png)

> 用于管理个人文章, 左侧目录就相当于文件 `tag`  
> 已完成功能: 文章以及目录(`tag`) 增删改查、文章发布、缩略图设置、预览……

### 4.2 日记

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_14-17-18.png)

> 用于记录每天起居、体重、体脂、饮食、运动、账单    
> 已完成功能: 数据的增删改查、历史收支统计、每日账单统计图、身体体征(体征、体脂)统计图……

### 4.3 图片管理

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_11-43-08.png)

> 用于管理系统图片资源, 包括文章插图、缩略图、默认头像、桌面壁纸……    
> 已完成功能: 图片的批量上传、删除、图片压缩(后端实现)

### 4.4 系统偏好设置

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_11-44-11.png)

> 用于对系统的偏好进行设置    
> 以实现功能: 程序坞自动隐藏设置、菜单栏全屏图标显示、菜单栏是否显示星期、自定义菜单栏日期格式

### 4.5 用户管理

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_11-44-29.png)

### 4.6 系统通知栏

![image.png](https://github.com/KunLunXu-CC/website/blob/dev/tmp/Snipaste_2023-05-15_11-44-47.png)

> 仿 Mac 通知栏, 展示用户信息(包含登出功能)、天气预报……
> 已实现功能: 用户信息展示(包含登出功能)

### 4.7 日志监控

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e066721f03d40a4a9b7454c77c31028~tplv-k3u1fbpfcp-watermark.image)

> 用于实时查看后台服务输出的日志信息(websocket 实现)
> 已实现功能: 日志的获取、展示

### 4.8  Mac Touchbar 扩展功能(下图数据为模拟数据)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0093b7ec32cd4a3faea8b70238a3b839~tplv-k3u1fbpfcp-watermark.image)

> 在 Mac Touchbar 上展示每日体重以及本月开销

### 4.9 数据字典管理

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808b37b260ad48a4b36eafadba110b24~tplv-k3u1fbpfcp-watermark.image)

> 用于管理系统数据字段数据
> 已实现功能: 数据的增、删、改、查……

## 五、ToDo List

- [ ] 阅读器: 用于博客文章展示、查询、阅读
- [ ] 权限管理: 用角色设置权限(目前通过脚本设置)
- [ ] 脚本管理: 在线脚本指定的增删改查、可设置定时运行、可通过以聊天窗口方式发送指定来实现
- [ ] 音乐播发器: 播放音乐(尝试接入网易云)
- [ ] 评论留言模块: 在通知栏添加留言功能、文章添加评论功能、后台添加评论留言回复功能、桌面可开启弹幕(留言)功能
- [ ] 图形功能: 在线编辑流程图、思维导图……
- [ ] 系统配置: 桌面壁纸设置、动态壁纸实现(`canvas`、`webGL`)……
- [ ] 系统监控: 日志监控、系统资源监控、前后端埋点……

……
