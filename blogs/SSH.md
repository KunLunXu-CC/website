#### 一、SSH简介
&nbsp;	SSH为Secure Shell的缩写，由 IETF 的网络工作小组（Network Working Group）所制定；SSH 为建立在应用层和传输层基础上的安全协议。

&nbsp;	SSH是目前可靠的，专为远程登录会话和其他网络服务提供安全性的协议。常用于远程登录，以及用户之间进行资料拷贝。利用SSH协议可以有效防止远程管理过程中的信息泄露问题

&nbsp;	使用SSH服务，需要安装相应的服务器和客户端。客户端和服务器的关系：如果，A机器想被B机器远程控制，那么，A机器需要安装SSH服务器，B机器需要安装SSH客户端。

#### 二、Ubuntu 下SSH服务 openssh-server 的安装和使用

&nbsp;	openssh-server的功能主要是作为一个服务运行在后台，如果这个服务开启，我们就可以用一些远程连接工具来连接该机器。

##### 2.1 安装
```shell
$ sudo apt-get update
$ sudo apt-get install openssh-server
```
##### 7.2 SSH服务进程的查看、启动、关闭、重启

- 查看openssh-server是否启动
```shell
$ ps -e | grep ssh
#进程ssh-agent是客户端，sshd为服务器端，如果结果中有sshd的进程说明openssh-server已经启动，如果没有则需进行手动运行。
```
- 启动、停止和重启openssh-server的命令如下

```shell
$ /etc/init.d/ssh start
$ /etc/init.d/ssh stop
$ /etc/init.d/ssh restart
```

##### 7.3 openssh-server 配置文件
- 通过修改配置文件修改配置：
```shell
$ vim /etc/ssh/sshd_config
# 这里可以配置SSH的服务端口等，例如：默认端口是22，可以自定义为其他端口号，如222，然后需要重启SSH服务。
```
#### 三、 openssh-client 安装



关于客户端连接
客户端可以用putty、SecureCRT、SSH Secure Shell Client等SSH 客户端软件，输入您服务器的IP地址，并且输入登录的用户和密码就可以登录了。我常选择的客户端软件是putty。

关于ssh的加密
实际上ssh的使用远不止这些，ssh还有很重要的一部分内容，那就是ssh通过公钥私钥进行加密，例如git就可以采用加密ssh的方式访问。关于ssh的加密这里暂不讨论，有机会再补充，可以查看相关资料了解。

openssh-server的功能主要是作为一个服务运行在后台，如果这个服务开启，我们就可以用一些远程连接工具来连接该机器。
openssh-client的功能我觉得类似于XShell，可以作为一个客户端连接上openssh-server，但是Centos6.4的minimal版本不包括openssh-client，所以centos之前出现无法使用ssh登录的情况，centos可以使用如下命令安装客户端：

Ubuntu下可以使用如下命令安装（好像安装openssh-server时也会自动安装openssh-clients）

```
openssh-server
```
ssh 连接服务器
ssh root@域名或者ip
例：ssh root@www.54mn.com.cn
断开连接：exit











安装了ssh服务，但是不希望他开机自动启动，可以如下设置： 在/etc/init/ssh.conf中，找到 
start on filesystem or runlevel [2345]
一行注释掉，结果如下


ssh - OpenBSD Secure Shell server
The OpenSSH server provides secure shell access to the system.
description "OpenSSH server"
start on filesystem or runlevel [2345]
stop on runlevel [!2345]

respawn
respawn limit 10 5
umask 022
重新启动，使用

$ ps -e | grep ssh
1604 ? 00:00:00 ssh-agent
检查没有自动启动，如果希望手动启动，可以

sudo service ssh start  #手动启动服务
sudo service ssh stop  #手动停止服务
sudo service ssh status  #查看服务状态












