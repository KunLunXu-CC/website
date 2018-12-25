#### 一、 工具介绍
##### 1.1 aria2
 Aria2 是一个命令行下轻量级、多协议、多来源的下载工具（支持 HTTP/HTTPS、FTP、BitTorrent、Metalink），内建 XML-RPC 和 JSON-RPC 用户界面。其实直白的说就是一下载工具；

##### 1.2 Chrome插件: BaiduExporter
 中文名称：百度网盘助手，该插件可以方便的把网盘的下载地址导出到aria2/aria2-rpc，支持YAAW。也就是说它可以导出一个下载地址，aria2 使用该下载地址就可以实现文件下载；甚至一键导出到 aria2 进行下载；

##### 1.3 YAAW
 借用 YAAW 并进行相应配置就可以连接到 aria2 查看下载列表和进度。 aria2 是一个命令行工具而 YAAW 说白了就是 aria2 的一个图形界面；YAAW 是 Chrome 的一个插件，当然它也有 web 版本；


##### 二、 Aria2的下载与使用
##### 2.1 下载：两种方式
**直接从本地源中进行下载**

```shell
$ npm install aria2
```

**下载源码进行编译**
- 从 GitHub 下载最新源码( \*.tar.gz 压缩包)： https://github.com/aria2/aria2/releases
- 对源码进行解压后编译：

```shell
# 解压
$ tar zxvf aria2-1.34.0.tar.gz
# 进入压缩目录
$ cd /aria2-1.34.0
# 安装
$ ./configure
$ make && make install
# 查看 aria2 版本信息：看是否成功安装
$ aria2c -v
```
##### 2.1 使用说明： 两种方式
**方法一： 直接调用命令进下载**
```shell
# 命令格式
$ aria2c -c -s10 -k1M -x16 -o "output.file" -d <下载文件存放路径>  <下载文件地址>
# 例：我要下载 https://xxxx.com.xx/xx.png 文件到 /home/qianyin/img 目录下则有：
$ aria2c -c -s10 -k1M -x16 -o "output.file" -d /home/qianyin/img  https://xxxx.com.xx/xx.png
```
**方法二（推荐）：编写本地配置文件来运行命令**
- 编写命令配置文件： aria2.conf

>配置文件路径： /home/qianyina/下载/aria2/aria2.conf (具体配置存放路径看个人喜好)
>下面给出部分配置内容（也是本人当前使用的配置），在文章的末尾会给出更多的配置信息；
>配置文件中 RPC 相关设置是为了使用 YAAW 所配置的，YAAW工具和命令行工具 aria2 是通过 RPC 进行通信的；

```conf
## 文件保存相关 ##
# 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置
dir=/home/qianyin/下载/aria2
# 断点续传
continue=true

## 下载连接相关 ##
# 同一服务器连接数, 添加时可指定, 默认:1
max-connection-per-server=5
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M

## 进度保存相关 ##
# 从会话文件中读取下载任务
input-file=/home/qianyin/下载/aria2/aria2.session
# 在Aria2退出时保存`错误/未完成`的下载任务到会话文件
save-session=/home/qianyin/下载/aria2/aria2.session

## RPC相关设置 ##
# 启用RPC, 默认:false
enable-rpc=true
# 允许所有来源, 默认:false
rpc-allow-origin-all=true
# 允许非外部访问, 默认:false
rpc-listen-all=true

## BT/PT下载相关 ##
# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
listen-port=51413
# 打开DHT功能, PT需要禁用, 默认:true
enable-dht=false
# 种子交换, PT需要禁用, 默认:true
enable-peer-exchange=false
# 客户端伪装, PT需要
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
seed-ratio=0
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true
```
- 编写会话文件：aria2.session
> 在上文配置文件中我们对进度保存的相关配置进行了相应配置，其中我们设置了会话文件 aria2.session，在执行 aria2 启动命令时发现若 aria2.session 文件不存在时，执行 aria2 后进程将会结束无法在后台执行；说白了就是在配置中我们设置了会话文件 aria2.session， 若在本地不存在该文件在后面执行 araia2 命令就有可能会失败；
>会话文件路径：/home/qianyin/下载/aria2/aria2.session （具体存放路径看个人喜好）

- 运行 aria2
```shell
# --conf-path 指定配置文件路径； -D 表示在后台运行
$ aria2c --conf-path=/home/qianyin/下载/aria2/aria2.conf -D
```
- 查看进程：查看是否成功运行 aria2
```shell
$ ps -e | grep aria2
```

#### 三、Chrome插件: BaiduExporter 安装
- 从GitHub源文件中找到文件：BaiduExporter.crx 进行下载( GitHub: https://github.com/acgotaku/BaiduExporter )
- 在浏览上打开：chrome://extensions/ 并拖动下载的 BaiduExporter.crx 至浏览器进行安装
- 若拖动安装失败请看下是否忘记开启了开发者模式；
- 插件使用：浏览器直接打开登录百度云，具体操作看图：

  @import "./img/Peek 2018-09-16 11-13.gif"
- 当然我们也可以使用插件导出下载链接然后添加到 aria2 的会话文件同样应该也能实现下载（当然我这里只是猜测有兴趣的可以尝试尝试）


#### 四、YAAW 的下载
&nbsp;  在上文我们通过 aria2 成功实现了对百度云文件的下载，然而实际上我们并不确定 aria2 是否真的在进行下载，我们也并不清楚 aria2 的下载情况； YAAW 是 aria2 的一个图像界面，它通过 RPC 和 aria2 进行通信，可以实现查看文件的下载情况，可以添加、暂停、删除 下载任务；
- web 版：http://aria2c.com/
- 插件版： 在 Chrome 应用商店直接进行搜索下载安装；
- YAAW 在配置文件中我们只是简单开启了 RPC 并为进行多余的配置那么，我们只需要打开 YAAW 即可使用，保持默认的配置即可；


#### 五、aria2 更多配置说明：
```conf
## '#'开头为注释内容, 选项都有相应的注释说明, 根据需要修改 ##
## 被注释的选项填写的是默认值, 建议在需要修改时再取消注释  ##

## 文件保存相关 ##

# 文件的保存路径(可使用绝对路径或相对路径), 默认: 当前启动位置
dir=/home/qianyin/下载/aria2
# 启用磁盘缓存, 0为禁用缓存, 需1.16以上版本, 默认:16M
#disk-cache=32M
# 文件预分配方式, 能有效降低磁盘碎片, 默认:prealloc
# 预分配所需时间: none < falloc ? trunc < prealloc
# falloc和trunc则需要文件系统和内核支持
# NTFS建议使用falloc, EXT3/4建议trunc, MAC 下需要注释此项
#file-allocation=none
# 断点续传
continue=true

## 下载连接相关 ##

# 最大同时下载任务数, 运行时可修改, 默认:5
#max-concurrent-downloads=5
# 同一服务器连接数, 添加时可指定, 默认:1
max-connection-per-server=5
# 最小文件分片大小, 添加时可指定, 取值范围1M -1024M, 默认:20M
# 假定size=10M, 文件为20MiB 则使用两个来源下载; 文件为15MiB 则使用一个来源下载
min-split-size=10M
# 单个任务最大线程数, 添加时可指定, 默认:5
#split=5
# 整体下载速度限制, 运行时可修改, 默认:0
#max-overall-download-limit=0
# 单个任务下载速度限制, 默认:0
#max-download-limit=0
# 整体上传速度限制, 运行时可修改, 默认:0
#max-overall-upload-limit=0
# 单个任务上传速度限制, 默认:0
#max-upload-limit=0
# 禁用IPv6, 默认:false
#disable-ipv6=true
# 连接超时时间, 默认:60
#timeout=60
# 最大重试次数, 设置为0表示不限制重试次数, 默认:5
#max-tries=5
# 设置重试等待的秒数, 默认:0
#retry-wait=0

## 进度保存相关 ##

# 从会话文件中读取下载任务
input-file=/home/qianyin/下载/aria2/aria2.session
# 在Aria2退出时保存`错误/未完成`的下载任务到会话文件
save-session=/home/qianyin/下载/aria2/aria2.session
# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
#save-session-interval=60

## RPC相关设置 ##

# 启用RPC, 默认:false
enable-rpc=true
# 允许所有来源, 默认:false
rpc-allow-origin-all=true
# 允许非外部访问, 默认:false
rpc-listen-all=true
# 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同
#event-poll=select
# RPC监听端口, 端口被占用时可以修改, 默认:6800
#rpc-listen-port=6800
# 设置的RPC授权令牌, v1.18.4新增功能, 取代 --rpc-user 和 --rpc-passwd 选项
#rpc-secret=<TOKEN>
# 设置的RPC访问用户名, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-user=<USER>
# 设置的RPC访问密码, 此选项新版已废弃, 建议改用 --rpc-secret 选项
#rpc-passwd=<PASSWD>
# 是否启用 RPC 服务的 SSL/TLS 加密,
# 启用加密后 RPC 服务需要使用 https 或者 wss 协议连接
#rpc-secure=true
# 在 RPC 服务中启用 SSL/TLS 加密时的证书文件,
# 使用 PEM 格式时，您必须通过 --rpc-private-key 指定私钥
#rpc-certificate=/path/to/certificate.pem
# 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件
#rpc-private-key=/path/to/certificate.key

## BT/PT下载相关 ##

# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
#follow-torrent=true
# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
listen-port=51413
# 单个种子最大连接数, 默认:55
#bt-max-peers=55
# 打开DHT功能, PT需要禁用, 默认:true
enable-dht=false
# 打开IPv6 DHT功能, PT需要禁用
#enable-dht6=false
# DHT网络监听端口, 默认:6881-6999
#dht-listen-port=6881-6999
# 本地节点查找, PT需要禁用, 默认:false
#bt-enable-lpd=false
# 种子交换, PT需要禁用, 默认:true
enable-peer-exchange=false
# 每个种子限速, 对少种的PT很有用, 默认:50K
#bt-request-peer-speed-limit=50K
# 客户端伪装, PT需要
peer-id-prefix=-TR2770-
user-agent=Transmission/2.77
# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
seed-ratio=0
# 强制保存会话, 即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
#force-save=false
# BT校验相关, 默认:true
#bt-hash-check-seed=true
# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true
# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true
```
