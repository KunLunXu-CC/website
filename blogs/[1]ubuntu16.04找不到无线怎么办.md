#### 一、问题描述
通过 U 盘安装 Ubuntu 16.04，后发现找不到附近的 wifi ; 最后发现其实是因为没有安装无线驱动的问题，但是问题是连不上 wifi 也没办法有线连接的情况下如何进行安装无线驱动？

#### 二、 解决办法
##### 2.1 简述
其实系统镜像包里就有我们需要的无线驱动安装包；在 U 盘启动器内找到我们需要的安装包进行安装即可解决问题；

##### 2.2 无线驱动安装 
**dkms_2.3-3ubuntu9_all.deb 包安装**
- 在 /pool/main/d/dkms 目录下找到安装包：dkms_2.3-3ubuntu9_all.deb
- 当前目录下打开我们的终端进行软件包：
```shell
$ sudo dpkg -i  dkms_2.3-3ubuntu9_all.deb
```

**bcmwl-kernel-source_6.30.223.271+bdcom-0ubuntu4_amd64.deb 包安装**
- 在  /pool/restricted/b/bcmwl 目录下找到安装包：bcmwl-kernel-source_6.30.223.271+bdcom-0ubuntu4_amd64.deb
- 在当前目录下打开终端进行软件包的安装：
```shell
$ sudo dpkg -i bcmwl-kernel-source_6.30.223.271+bdcom-0ubuntu4_amd64.deb
```
