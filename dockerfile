FROM --platform=linux/amd64 node AS base

# 新增用户 & 用户组
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 安装 pm2 和 pnpm
RUN npm install --global pm2 pnpm

# ------------------------- deps -----------------------------------
FROM base AS deps
WORKDIR /app

# 拷贝 package.json 和 pnpm-lock.yaml 文件, 并安装相关依赖
COPY package.json pnpm-lock.yaml* .npmrc ./
RUN pnpm i --frozen-lockfile

# ------------------------- builder -----------------------------------
FROM base AS builder
WORKDIR /app

# 拷贝上一步安装的依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建项目
RUN pnpm run build

# ------------------------- runner -----------------------------------
FROM base AS runner
WORKDIR /app

# 创建 ecosystem.config.js 文件, 用于 pm2 启动不想直接在项目里创建
COPY <<EOF /app/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'klx-website',
      script: 'node server.js',
      watch: false,
  },
  ],
};
EOF

# 创建相关目录, 并设置权限
RUN mkdir pm2
RUN mkdir .next
ENV PM2_HOME /app/pm2
RUN chown nextjs:nodejs pm2
RUN chown nextjs:nodejs .next

# 复制运行服务所需要的产物, see: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 暴露端口、设置主机名
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

# 运行容器时, 启动 pm2
CMD pm2 start ecosystem.config.js --no-daemon
