<h1 align="center">个人博客系统（搭建中）</h1>

博客模拟 Mac 桌面系统，以应用的形式来展示博客的功能，系统集合博客客户端和后台管理的所有功能并通过用户权限来限制访问者的操作

- [预览]: https://www.qianyin925.com

## 特性

- 以应用的形式展示系统的功能，展示出系统强大的扩展性
- 使用 React@16.8.0+ 新特性并配合 Redux + Antd 编写搭建前端基础页面
- 引入 Graphql 并配合 Koa 构建后端系统， 同时选用非关系型数据库 Mongo
- 基本配置: React 开发环境配置、eslint 配置、git commit 规范校验配置、版本发布配置......

## 运行开发环境

```shell
npm install
npm run start
```


```json
{
  "level": [
      [
          {
              "keyWords": [
                  {
                      "keys": [
                          "k1",
                          "k2",
                          "k3"
                      ],
                      "type": [
                          1,
                          2,between
                          3
                      ],
                      "between": 0,
                  },
                  {
                      "keys": [
                          "k4",
                          "k6"
                      ],
                      "type": [
                          2,
                          3
                      ],
                      "": [
                          0
                      ]
                  }
              ],
              "betweenWords": [
                  1
              ]
          }
      ],
      [
        {
          "keyWords": [
              {
                  "keys": [
                      "k5"  // 关键字
                  ],
                  "type": [
                      1   // 关键字类型
                  ],
                  "between": null  // 关系
              }
          ],
          "betweenWords": null   // 
        }
      ]
  ],
  "betweenLevel": 0
}


k5 && ((k1 && k2 || k3) || (k4 && k6))
```


```js
// 0 与 1 或
// k1 && k2
[
  {
    value: 'k1',
    type: 1,
    between: 0
  },
  {
    value: 'k1',
    type: 1,
    between: 0
  },
]

// k1 && (k2 && k3)
[
  {
    value: 'k1',
    type: 1,
    between: 0
  },
  {
    between: 0,
    children: [
      {
        value: 'k2',
        type: 1,
        between: 0
      },
      {
        value: 'k3',
        type: 1,
        between: 0
      },
    ]
  },
]

// k1 && ((k2 && k3) && k4)
[
  {
    value: 'k1',
    type: 1,
    between: 0
  },
  {
    between: 0,
    children: [
      {
        between: 0
        children: [
          { 
            value: 'k2',
            type: 1,
            between: 0
          },
          { 
            value: 'k3',
            type: 1,
            between: 0
          },
        ]
      },
      {
        value: 'k4',
        type: 1,
        between: 0
      },
    ]
  },
]
```
