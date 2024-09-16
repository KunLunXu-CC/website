## 环境变量配置

根据 `.env.development`(模版)

在根目录下创建 `.env.local` 文件

> 注意: 如果请求页面没有请求任何接口是因为没有设置 NEXT_PUBLIC_BLACK_URL, 因为 Graphql 请求不能是相对路径

## 部署

```js
docker compose up -d
```

## 卸载

```js
docker compose down
```
