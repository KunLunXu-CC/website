# docker下安装Nginx

## 一、 环境说明

- docker: 18.03.1-ce
- nginx: 1.15.1

## 二、 拉取最新的 Nginx 镜像

- 拉取镜像

```shell
$ docker pull nginx
```

- 查看当前镜像

```shell
$ docker images
# 查询结果：
REPOSITORY    TAG     IMAGE ID      CREATED      SIZE
nginx       latest   8b89e48b5f15  7 hours ago   109MB
```

## 三、 准备工作

本次将web服务部署在 /srv/web 目录下：

### 3.1 创建 /srv/web 目录 并进入该目录

```shell
cd /srv && mkdir web && cd web
```

### 3.2 随便创建一个 Nginx 容器，并拷贝 Nginx 的默认配置：

- 创建容器：

```shell
$ docker run -d --name nginx nginx
```

- 从容器中拷贝配置文件至本地：

```shell
# 查看 ==> 获取容器ID
$ docker container ls
# 在当前目录下创建目录：conf (必须)
$ mkdir conf
# 拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录
$ docker cp a89b2c5f3dd1:/etc/nginx/nginx.conf $PWD/conf
```

- 删除容器：

```shell
# 停止容器
$ docker container stop a89b2c5f3dd1
# 删除容器
$ docker container rm a89b2c5f3dd1
```

## 四、 开始正式部署

- 部署命令：

```shell
$ docker run -d -p 8081:80 --name nginx-web-6666 -v $PWD/html:/usr/share/nginx/html -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/logs:/var/log/nginx nginx
```

- 命令详细说明：

```shell
-d # 表示在一直在后台运行容器
-p 8081:80 # 对端口进行映射，将本地8081端口映射到容器内部的80端口
--name # 设置创建的容器名称
-v # 将本地目录(文件)挂载到容器指定目录；
```

## 五、 测试

### 5.1 测试

​如果是本地测试部署则打开：localhost:8081 即可访问到 web 服务器；

### 5.2 补充：

​因为是将容器内的 nginx 的根目录给挂载到本地指定目录，所以上面访问到的页面应该会报 403 错误；接下来可以在 `/srv/web/html/` 开始我们的项目；

### 5.3 进入本地目录：/srv/web/html/ 创建测试文件 index.html 

```shell
$ cd /srv/web/html
# 创建并随便编写内容 重新刷新页面
$ vim index.html
```
