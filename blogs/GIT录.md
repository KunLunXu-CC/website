# GIT录

## 一、 如何将本地代码关联到 GITHUB

- [参考](https://www.jianshu.com/p/08656eb84974)

- 初始化本地仓库：

```shell
git init
```

- 为git仓库设置（添加）远程库

```shell
git remote add origin <url>
```

## 二、 生成 ssh key

- 生成 key

```shell
ssh-keygen -t rsa -C "youremail@example.com"

```

- 将公钥添加到 github (或者其他)中

## 切换远程（未完成）

### 查看关联的远程仓库信息

```shell
git remote -v
```

### 删除远程仓库的关联

```shell
# 通过 name 删除指定远程库
git remote remove <name>
```

### 修改远程库的关联

- 方法一： 更新远程仓库的 url

```shell
# 设置修改远程库 origin 的 url
git remote set-url origin <newurl>
```

- 方法二： 删除关联的远程仓库 然后重新添加新的远程库

```shell
# 通过 name 删除指定远程库
git remote remove <name>
# 添加新的远程库
git remote add <name>  <url>
```

- 方法三： 直接修改项目目录下的 .git 目录中的 config 配置文件(可以直接修改也能使用下面命令来修改)

```shell
# 直接修改配置文件中远程库 origin 的 url
git config remote.origin.url <url>
```

2 全局变量
添加

```shell
git remote --global set-url origin <url>
git config --global remote.origin.url <url>
```
