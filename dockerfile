# 基础镜像: 表示在 node 镜像基础上进行扩展, node 镜像中自带 git
FROM node

# 维护者信息: 填写维护者的信息
LABEL moyuanjun moyuanjun@gmai.com


# 创建工作目录
RUN mkdir -p /var/website

# 将当前目录下的所有文件复制到 /var/website 目录下
COPY . /var/website

# 安装 pnpm 和 pm2
RUN npm install -g pnpm pm2

# 设置 npm home 目录
RUN mkdir -p /var/website/logs/pm2 && chmod -R 777 /var/website
ENV PM2_HOME /var/website/logs/pm2

# 安装依赖
RUN pnpm install

# 构建项目
RUN pnpm build

# 对外暴露端口
EXPOSE 3000

# 容器启动时执行指令: 指定新建容器在每次运行时需要执行的命令
CMD /bin/bash
