FROM node AS base

# RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN npm install --global pm2 pnpm

# ------------------------- deps -----------------------------------

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat bash
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* .npmrc ./
RUN pnpm i --frozen-lockfile

# ------------------------- builder -----------------------------------

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# ------------------------- runner -----------------------------------

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# 创建 ecosystem.config.js 文件, 用于 pm2 启动不想直接在项目中创建
RUN echo "module.exports = {" > ecosystem.config.js && \
    echo "  apps: [" >> ecosystem.config.js && \
    echo "    {" >> ecosystem.config.js && \
    echo "      name: 'klx-website'," >> ecosystem.config.js && \
    echo "      script: 'node server.js'," >> ecosystem.config.js && \
    echo "      watch: false," >> ecosystem.config.js && \
    echo "    }," >> ecosystem.config.js && \
    echo "  ]," >> ecosystem.config.js && \
    echo "};" >> ecosystem.config.js

# ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Set the correct permission for prerender cache
RUN mkdir pm2
RUN mkdir .next
ENV PM2_HOME /app/pm2
RUN chown nextjs:nodejs pm2
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD pm2 start ecosystem.config.js --no-daemon
