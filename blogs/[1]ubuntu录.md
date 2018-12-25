#### 一、简述
&nbsp;	本篇博文主要用于记录在工作学习过程所遇到的有关 ubuntu 使用上的一些问题；

#### 二、 GIT可视化录制工具 keep 安装

- keep 录制 git 演示：有些掉帧
@import "./img/Peek 2018-08-28 13-19.gif"
- 官网：https://github.com/phw/peek

- 安装步骤：可直接查看官网

```shell
$ sudo add-apt-repository ppa:peek-developers/stable
$ sudo apt update
$ sudo apt install peek
```
- 配置快捷键( 具体如何设置 ubuntu 快捷键请自行百度 )
> 打开系统设置 --> 键盘 --> 快捷键 --> 添加设置快捷键

#### 三、文件/目录权限设置命令：chmod

&nbsp;	一般情况下我们登录的用户并不会是 root，这时在访问/操作一些文件或者目录的时候可能不具有相应的权限，我们就需要用到该命令对文件或目录的权限进行修改；
- 下面只列出最常用的一条命令，关于chmod 更多的用法就自行百度；
```shell
$ sudo chmod -R 777 ./file
# -R 递归修改指定文件/目录下所有文件的权限
# 777表示，给所有群组都设置最高权限
# file 表示要修改的文件/目录
```



#### 四、ps 查看进程并杀死指定进程

##### 4.1 查看进程：ps 命令
- 命令参数说明
```
-e   显示所有进程
-f   全格式
-h   不显示标题
-l   长格式
-w   宽输出
-a   显示终端上的所有进程，包括其他用户的进程
-r   只显示正在运行的进程
-u 　以用户为主的格式来显示程序状况
-x   显示所有程序，不以终端机来区分
```
- 常用组合命令
```shell
# 查看 http 相关进程
ps -ef | grep http
# 命令参数说明
# -e :显示所有进程。列出程序时，显示每个程序所使用的环境变量。
# -f :全格式。用ASCII字符显示树状结构，表达程序间的相互关系
# |  : 表示管道
# grep : 命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。 grep全称是Global Regular Expression Print，表示全局正则表达式版本，它的使用权限是所有用户。
```

- 命令查看结果
```shell
$ ps -ef | grep http
UID        PID  PPID  C STIME TTY          TIME CMD
qianyin   7822  6657  0 09:22 pts/1    00:00:00 grep --color=auto http
```
- 命令结果说明
```
UID       用户ID
PID       进程ID
PPID      父进程ID
C         CPU占用率
STIME     开始时间
TTY       开始此进程的TTY----终端设备
TIME      此进程运行的总时间
CMD       命令名
```

##### 4.2 杀死进程：kii
```shell
# 通过 pid 杀死指定进程
$ kill pid
```

#### 五、 查看端口占用情况并杀死指定进程
##### 5.1 通过 lsof -i:props 查看端口占用情况并杀死指定进程
&nbsp;	lsof命令用于查看进程中开打的文件、打开文件的进程、进程打开的端口(TCP、UDP)、找回/恢复删除的文件等。是十分方便的系统监视工具，因为lsof命令需要访问核心内存和各种文件，所以需要root用户执行。
```shell
# 查看 3000 端口占用情况
$ lsof -i:3000
# 查看结果
COMMAND  PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    5675 qianyin   13u  IPv4  54891      0t0  TCP *:3000 (LISTEN)
# 通过 pid 并使用 kill 杀死指定进程
$ kill 5675
```
##### 5.2 通过 netstat 查看端口占用情况并杀死指定进程
&nbsp;	netstat命令用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。
```shell
$ netstat -tunlp|grep 3000
# 结果：
tcp6   0   0 :::3000       :::*    LISTEN      9752/node
$ kill 9752
```

#### 六、 ping 不通本地虚拟机内的 window7 的解决办法
#### 6.1 问题描述
```text
	因为需要在本地虚拟机内安装了 window7 系统，在虚拟机内可以正常联网的情况下，window7 内能够 ping 通本地；但是呢，在本地却 ping 不通虚拟机下的 window7;
```
##### 6.2 问题所在
```text
最后其实发现是 window7 虚拟机开启了防火墙，只要将防火墙关闭后即可实现 虚拟机和本地的互 ping
```

#### 七、 命令 grep 配合管道 | 实现对查询结果的过滤
&nbsp;	下面列举了 grep 命令的几个使用场景，目的是为了演示 grep 的使用方法并不能代表是 grep 的所有使用场景；grep 后面接的实际上是正则表达式；
```shell
# 列出出开头为app的文件
$ ls | grep app   
# 先列出开头为app的文件  再从结果中过滤出以js结尾的文件
$ ls | grep app | grep *.js  
# 过滤出含有 ssh 的进程
$ ps -e | grep ssh
```

#### 八、 根据 deb 包名进行模糊查询已安装的所有软件包并进行卸载
```shell
$ sudo apt-geapt list --installed | grep weixin

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
deepin.com.weixin.work/now 2.4.16.1347deepin0 i386 [已安装，本地]

$ sudo apt-get remove --purge deepin.com.weixin.work

```

#### tree 命令

忽略某个文件夹下的内容：

```shell
tree -I "node_modules"
```