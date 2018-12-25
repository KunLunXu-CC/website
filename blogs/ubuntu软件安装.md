#### 六、 软件包管理（安装、卸载、查看）
##### 6.1 查看软件安装目录
```shell
# 查看软件 code 的安装目录
# 配合管道查看当前安装的所有软件包并过滤出包含 code 的信息（确定是否安装软件）
$ dpkg -l | grep code
# 查看软件 code 的所有文件的安装目录
$ dpkg -L code
```
```
#### 三、 deb软件包的增删改查
##### 3.1 卸载：
```
查看软件版本:
aptitude show xxx
也可用apt-show-versions (要先安装sudo apt-get install apt-show-versions)
查看软件安装位置:
dpkg -L xxxx
查看软件是否安装：
dpkg -l | grep filename
```
安装：deb包
dpkg -i xxxxxxx.deb

修复依赖

apt-get install -f


卸载：

```
apt-get --purge remove 
删除已安装包（不保留配置文件)。 
如软件包a，依赖软件包b，则执行该命令会删除a，而且不保留配置文件

apt-get autoremove 
删除为了满足依赖而安装的，但现在不再需要的软件包（包括已安装包），保留配置文件。

apt-get remove 
删除已安装的软件包（保留配置文件），不会删除依赖软件包，且保留配置文件。

apt-get autoclean 
APT的底层包是dpkg, 而dpkg 安装Package时, 会将 *.deb 放在 /var/cache/apt/archives/中，apt-get autoclean 只会删除 /var/cache/apt/archives/ 已经过期的deb。

apt-get clean 
使用 apt-get clean 会将 /var/cache/apt/archives/ 的 所有 deb 删掉，可以理解为 rm /var/cache/apt/archives/*.deb。

```

软件包升级

```
ubuntu 升级软件：

      sudo apt-get update 更新源
　　sudo apt-get upgrade 更新已安装的包
　　sudo apt-get dist-upgrade 升级系统

ubuntu升级特定软件：

      可以用   sudo apt-get  install pkgname

```
ubuntu *.sh 文件安装

*.sh文件安装方法：

运行终端到文件目录下

1.在终端输入：sudo sh *.sh直接运行

2.在终端输入：sudo chmod +x *.sh

再输入：sudo ./.sh可安装到任意目录，./.sh可安装到当前用户有权限的目录

*.bin文件安装方法：

运行终端到文件目录下

在终端输入：sudo chmod +x *.bin

再输入：sudo ./.bin可安装到任意目录，./.bin可安装到当前用户有权限的目录

```