# npm script

## 一、 初始化项目（npm init）

> 运行 npm init 将会对当前目录进行初始化并生成 package.json 依赖文件；

```shell
$ npm init
```

> 运行 npm init 过程中需要填写一些基本信息（当然也可以一路回车保持默认值），但其实我们可以使用 npm init -f（意指 --force，或者使用 --yes）告诉 npm 直接跳过参数问答环节采用默认值，快速生成 package.json；

```shell
$ npm init -f
$ npm init -y
```

> 在初始化项时大多都直接采用默认值来创建 package.json 文件，那么我们可以通过下面命令修改默认值；

```shell
$ npm config set init.author.email "wangshijun2010@gmail.com"
$ npm config set init.author.name "wangshijun"
$ npm config set init.author.url "http://github.com/wangshijun"
$ npm config set init.license "MIT"
$ npm config set init.version "0.1.0"
```

> package.json 基本字段描述

```json
{
  "name": "项目名称",
  "version": "版本号",
  "description": "项目描述",
  "main": "index.js",
  "scripts": {
    "脚本列表",
  },
  "keywords": [
    "关键字"
  ],
  "author": "作者信息",
  "license": "许可证"
}
```

## 二、 创建并运行 npm script

### 2.1 自定义 npm script

- 初始化项目后在 package.json 中会生成 script 字段， 在该字段中我们可以自定义我们自己的脚本命令；
- 默认情况下 package.json script 字段中只有一条测试脚本命令

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
  }
}
```

- 下面我们来自定义两条脚本命令: mkdir docker-start
  - mkdir 脚本： 删除 build 目录并重新创建 build 目录
  - docker-start 脚本： 执行 docker命令，运行 87e8440f2525 b0dc6136e7cc c84b069bbf63 容器

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "mkdir": "rm -rf build && mkdir build",
    "docker-start": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- npm run 查看 package.json 下的所有脚本信息：

```shell
$ npm run
Lifecycle scripts included in test:
  test
    echo "Error: no test specified" && exit 1

available via `npm run-script`:
  mkdir
    rm -rf build && mkdir build
  docker-start
    sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63
```

- 从 npm run 执行结果可以看出：
  - 当前项目下存在内置脚本命令： test
  - 当前项目下存在可操作命令： mkdir docker-start
- 通过 npm run <脚本命令> 运行自定义脚本命令

```shell
$ npm run mkdir
> test@1.0.0 mkdir /home/qianyin/MyNote/test
> rm -rf build && mkdir build

$ npm run docker-start
> test@1.0.0 docker-start /home/qianyin/MyNote/test
> sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63
[sudo] qianyin 的密码：
87e8440f2525
b0dc6136e7cc
c84b069bbf63
```

- 对于内置脚本命令可直接执行 npm <内置脚本命令> 来执行脚本命令

```shell
$ npm test
> test@1.0.0 test /home/qianyin/MyNote/test
> echo "Error: no test specified" && exit 1
Error: no test specified
npm ERR! Test failed.  See above for more details.
```

- 补充： 实际上 npm run 的完整命令是 npm run-script

### 2.2 npm script 执行的简化流程

> 以执行 npm run mkdir 为例下面简单描述 mkdir 脚本执行流程
- 从 package.json 文件中读取 scripts 对象里面的全部配置；
- 根据传给 npm run 的第一个参数作为键，本例中为 mkdir，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；
- 在系统默认的 shell 中执行上述命令

### 2.3 使用 npm script 完成 eslint 配置

- 初始化一个项目

```shell
$ npm init -f
```

- 添加 eslint 依赖: npm install <包名> 安装依赖至 devDependencies

```shell
$ npm install eslint -D
```

- npm script 配置 eslint 初始化脚本

```json
{
  "scripts": {
    "eslint-init": "eslint --init"
  }
}
```

- 执行 npm script 命令： 在项目下将生成 eslint 配置文件 `.eslintrc.js`

```shell
$ npm run eslint-init
> test@1.0.0 eslint-init /home/qianyin/MyNote/test
> eslint --init
? How would you like to configure ESLint? Answer questions about your style
? Which version of ECMAScript do you use? ES2016
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? Yes
? Do you use JSX? Yes
? Do you use React? Yes
? What style of indentation do you use? Tabs
? What quotes do you use for strings? Double
? What line endings do you use? Unix
? Do you require semicolons? Yes
? What format do you want your config file to be in? JavaScript
The config that you've selected requires the following dependencies:
eslint-plugin-react@latest
Successfully created .eslintrc.js file in /home/qianyin/MyNote/test
```

- 在上文我们完成了 eslint 的初始化过程， 但是你是否有这么一个疑问： npm script 中初始化脚本命令为 eslint --init，但问题来了 eslint 这个命令又是从何来的呢？
  - 在 npm init eslint -D 安装 eslint 依赖包时在项目下 node_modules/.bin/ 目录下会生成 eslint 命令
  - 那么在项目下安装完 eslint 后实际上我们可以通过 ./node_modules/.bin/eslint 执行 eslint 命令
  - 那么在 npm script 为什么可以直接执行 eslint 命令呢？
  - 其实，npm 在执行指定 script 之前会把 node_modules/.bin 加到环境变量 $PATH 的前面
  - 如此则意味 node_modules/.bin 内任何可执行文件都可以在 npm script 中直接调用

- 编写待检查代码：

```js
  const str = 'some value';
  function fn(){
      console.log('some log');
  }
```

- 新增 npm script 命令

```json
{
  "scripts": {
    "eslint-init": "eslint --init",
    "eslint": "eslint *.js"
  }
}
```

- 执行 npm script 命令 `eslint` 进行代码风格检查

```shell
$ npm run eslint

> test@1.0.0 eslint /home/qianyin/MyNote/test
> eslint *.js
/home/qianyin/MyNote/test/test.js
  1:7   error  'str' is assigned a value but never used          no-unused-vars
  1:13  error  Strings must use doublequote                      quotes
  2:10  error  'fn' is defined but never used                    no-unused-vars
  3:1   error  Expected indentation of 1 tab but found 4 spaces  indent
  3:5   error  Unexpected console statement                      no-console
  3:17  error  Strings must use doublequote  
```

## 三、 运行多个 npm script

### 3.1 串行（&&）： 让多条 npm script 按给定顺序依次执行

- 假设有如下 npm script

```json
{
  "scripts": {
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- 现在我们需要完成如下操作：
  - 先执行 npm script rm 命令删除 build 目录
  - 然后执行 npm script mkdir 命令新建 build 目录
  - 最后执行 npm script docker 运行 docker 容器
- 可以看出上面需求中多条 npm script 的执行是串行的， 后条命令需要在上一条命令执行完毕后才开始执行
- 新增 npm script 命令实现上面需求

```patch
{
  "scripts": {
+   "start": "npm run rm && npm run mkdir && npm run docker",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- 尝试执行 npm script start 命令

```shell
$ npm run start
> test@1.0.0 start /home/qianyin/MyNote/test
> npm run rm && npm run mkdir && npm run docker


> test@1.0.0 rm /home/qianyin/MyNote/test
> rm -rf build


> test@1.0.0 mkdir /home/qianyin/MyNote/test
> mkdir build


> test@1.0.0 docker /home/qianyin/MyNote/test
> sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63
```

- 补充说明：需要注意的是，串行执行的时候如果前序命令失败（通常进程退出码非0），后续全部命令都会终止；
- 修改 npm script

```patch
{
  "scripts": {
+   "start": "npm run rm && npm run dev && npm run mkdir && npm run docker",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- 执行 npm script start 命令

```shell
$ npm run start
> test@1.0.0 start /home/qianyin/MyNote/test
> npm run rm && npm run dev && npm run mkdir && npm run docker

> test@1.0.0 rm /home/qianyin/MyNote/test
> rm -rf build

npm ERR! missing script: dev
npm ERR! A complete log of this run can be found in:
npm ERR!     /home/qianyin/.npm/_logs/2018-10-21T09_04_54_238Z-debug.log
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! test@1.0.0 start: `npm run rm && npm run dev && npm run mkdir && npm run docker`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the test@1.0.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
npm ERR!     /home/qianyin/.npm/_logs/2018-10-21T09_04_54_293Z-debug.log
```

- 从上文的执行结果可以看出 npm script start 命令只执行了 npm run rm , 在执行 npm run dev 时因为不存在 npm script dev 命令所以 npm run dev 命令报错，导致  npm script start 命令直接退出，后续命令不再执行；

### 3.2 并行（&）： 实现多条 npm script 命令并行执行

- 修改 npm script start 修改为并行

```patch
{
  "scripts": {
+   "start": "npm run rm & npm run dev & npm run mkdir & npm run docker",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- npm script start 执行结果：

```shell
qianyin@qianyin:~/MyNote/test$ npm run start
> test@1.0.0 start /home/qianyin/MyNote/test
> npm run rm & npm run dev & npm run mkdir & npm run docker


> test@1.0.0 rm /home/qianyin/MyNote/test
> rm -rf build

npm ERR! missing script: dev

> test@1.0.0 docker /home/qianyin/MyNote/test
> sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63


> test@1.0.0 mkdir /home/qianyin/MyNote/test
> mkdir build

87e8440f2525
b0dc6136e7cc
c84b069bbf63
qianyin@qianyin:~/MyNote/test$
npm ERR! A complete log of this run can be found in:
npm ERR!     /home/qianyin/.npm/_logs/2018-10-21T09_21_57_839Z-debug.log
```

- 从上文执行结果可以看出多条 npm script 脚本命令的执行是串行的， 并且在执行 npm run dev 时也并不会影响后续命令的执行；
- 但是呢从执行信息可以看到一个奇怪的现象， npm run dev 命令结果的收集是 npm run start 命令结束后才输出；
- npm 内置支持的多条命令并行跟 js 里面同时发起多个异步请求非常类似，它只负责触发多条命令，而不管结果的收集，如果并行的命令执行时间差异非常大的话命令执行结果就可能比较奇怪，所以一般情况下在执行并行命令时会在命令的最后增加 & wait；
- 加上 wait 的额外好处是，如果我们在任何子命令中启动了长时间运行的进程，比如启用了 react 项目；可以使用 ctrl + c 来结束进程，如果没加的话，你就没办法直接结束启动到后台的进程。
- 修改 npm script

```patch
{
  "scripts": {
+   "start": "npm run rm & npm run dev & npm run mkdir & npm run docker & wait",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  }
}
```

- 执行 npm run start

```shell
qianyin@qianyin:~/MyNote/test$ npm run start

> test@1.0.0 start /home/qianyin/MyNote/test
> npm run rm & npm run dev & npm run mkdir & npm run docker & wait

npm ERR! missing script: dev

> test@1.0.0 rm /home/qianyin/MyNote/test
> rm -rf build


> test@1.0.0 mkdir /home/qianyin/MyNote/test
> mkdir build


npm ERR! A complete log of this run can be found in:
npm ERR!     /home/qianyin/.npm/_logs/2018-10-21T09_33_29_545Z-debug.log

> test@1.0.0 docker /home/qianyin/MyNote/test
> sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63

87e8440f2525
b0dc6136e7cc
c84b069bbf63
```

### 3.3 使用 npm-run-all 来管理多条 npm script 的执行

- 安装 npm-run-all 依赖

```shell
$ npm install npm-run-all -D
```

- npm-run-all 使用（串行执行）

```patch
{
  "scripts": {
+   "start": "npm-run-all rm mkdir docker",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  },
}
```

- npm-run-all 使用（并行执行）： 并行执行的时候，我们并不需要在后面增加 & wait，因为 npm-run-all 已经帮我们做了。

```patch
{
  "scripts": {
+   "start": "npm-run-all --parallel rm mkdir docker",
    "rm": "rm -rf build",
    "mkdir": "mkdir build",
    "docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  },
}
```

- 补充说明： npm-run-all 还支持通配符匹配分组

```json
{
  "scripts": {
   "start": "npm-run-all --parallel init:*",
    "init:rm": "rm -rf build",
    "init:mkdir": "mkdir build",
    "init:docker": "sudo docker start 87e8440f2525 b0dc6136e7cc c84b069bbf63"
  },
}
```

- 补充说明： npm-run-all 还提供了很多配置项支持更复杂的命令编排，比如多个命令并行之后接串行的命令；

## 四、npm script 传递参数、添加注释、调整执行命令时的日志输出

### 4.1 多条 npm script 组合使用通过 -- 来进行传参

- 如下 npm script 在 docker 命令中 执行 npm run docker:start 时通过 -- 进行传参(指定一个容器)

```json
{
  "script": {
    "docker:start": "sudo docker start",
    "docker": "npm run docker:start -- 87e8440f2525"
  }
}
```

- 执行 npm run docker

```shell
$ npm run docker
> test@1.0.0 docker /home/qianyin/MyNote/test
> npm run docker:start -- 87e8440f2525

> test@1.0.0 docker:start /home/qianyin/MyNote/test
> sudo docker start "87e8440f2525"

87e8440f2525
```

### 4.2 为 npm script 添加注释

  由于 json 不支持注释所以下面给出了两种 trick 方式为 npm script 添加注释

> 方法一： 在 script 添加 "//" 键，并添加注释（当然也可以使用其他， 比如： "desc"）

```json
{
  "scripts": {
    "//":"测试脚本",
    "test": "mocha",
    "//":"运行容器",
    "docker:start": "sudo docker start",
    "//":"运行指定容器",
    "docker": "npm run docker:start -- 87e8440f2525"
  }
}
```

- 上述方法虽然可以，但是在对象中存在多个相同的 key 在语法风格校验上是会给出警告的，而且通过 npm run 查看当前所有 npm script 只能查看到最后一条注释，这也很好理解，在对象中 key 值是唯一的；

```shell
$ npm run
Lifecycle scripts included in test:
  test
    mocha

available via `npm run-script`:
  //
    运行指定容器
  docker:start
    sudo docker start
  docker
    npm run docker:start -- 87e8440f2525
```

> 方法二: 直接在 script 声明中添加注释；
- npm script 命令的本质上是 shell 命令， 所以可以类似编写 shell 脚本添加注释（适用于 Linux）

```shell
{
  "scripts": {
    "test": "#测试脚本\n    mocha",
    "docker:start": "#运行容器\n    sudo docker start",
    "docker": "#运行指定容器\n    npm run docker:start -- 87e8440f2525"
  }
}

```

- 上述方法中通过 # 为命令添加注释， 使用 \n 进行换行， 该方式主要缺点就是可读性极差， 优点主要是在执行 npm run 查看命令时能够查看所有命令的注释； 换行符和命令之间多个空格是为了执行 npm run 查看 npm script 命令时将注释和命令进行对齐；

```shell
$ npm run
Lifecycle scripts included in test:
  test
    #测试脚本
    mocha

available via `npm run-script`:
  docker:start
    #运行容器
    sudo docker start
  docker
    #运行指定容器
    npm run docker:start -- 87e8440f2525
```

### 4.3 调整 npm script 运行时日志的输出

- 默认情况下（不天机任何参数） 运行日志只能看到执行的命令以及命令执行的结果；

```shell
$ npm run docker
> test@1.0.0 docker /home/qianyin/MyNote/test
> #运行指定容器
    npm run docker:start -- 87e8440f2525

> test@1.0.0 docker:start /home/qianyin/MyNote/test
> #运行容器
    sudo docker start "87e8440f2525"

87e8440f2525
```

- 执行npm script 时添加 -s 参数（完整参数为： --loglevel silent 或 --silent）， 只会输出命令执行结果；

```shell
$ npm run docker -s
87e8440f2525
```

- 执行npm script 时添加 -d 参数(完整参数为：使用 --loglevel verbose 或 --verbose)， 详细打印出了命令执行过程的每个步骤的参数、返回值；

```shel
$ npm run docker -d
npm info it worked if it ends with ok
npm info using npm@6.4.1
npm info using node@v10.10.0
npm info lifecycle test@1.0.0~predocker: test@1.0.0
npm info lifecycle test@1.0.0~docker: test@1.0.0

> test@1.0.0 docker /home/qianyin/MyNote/test
> #运行指定容器
    npm run docker:start -- 87e8440f2525

npm info it worked if it ends with ok
npm info using npm@6.4.1
npm info using node@v10.10.0
npm info lifecycle test@1.0.0~predocker:start: test@1.0.0
npm info lifecycle test@1.0.0~docker:start: test@1.0.0

> test@1.0.0 docker:start /home/qianyin/MyNote/test
> #运行容器
    sudo docker start "87e8440f2525"

87e8440f2525
npm info lifecycle test@1.0.0~postdocker:start: test@1.0.0
npm timing npm Completed in 183ms
npm info ok
npm info lifecycle test@1.0.0~postdocker: test@1.0.0
npm timing npm Completed in 449ms
npm info ok
```

## 五、 npm script 钩子的使用

- npm script 的设计者为命令的执行增加了类似生命周期的机制，即在 npm script 执行的某个时刻执行给定的钩子；
- npm script 有 pre post 两个钩子；
- 在执行 npm run test 时一般有以下几个步骤：
  - 检查 scripts 对象中是否存在 pretest 命令，如果有，先执行该命令
  - 检查是否有 test 命令，有的话运行 test 命令，没有的话报错
  - 检查是否存在 posttest 命令，如果有，执行 posttest 命令

### 5.1 pre 钩子

- 假如有如下 npm script

```json
{
  "scripts": {
    "docker": "sudo docker start 87e8440f2525"
  }
}
```

- 执行 npm run docker -s

```shell
$ npm run docekr
87e8440f2525
```

- 为 npm script docker 添加 pre 钩子： 在执行 npm run docker 前输出提示信息 '容器运行中……'
- pre 钩子本质上也是一条 npm script 命令， 由 pre + docker（要添加钩子的命令）组成；

```json
{
  "scripts": {
    "docker": "sudo docker start 87e8440f2525",
    "predocker":"echo '容器运行中……'"
  }
}

```

- 执行 npm run docker -s

```shell
$ npm run docker -s
容器运行中……
87e8440f2525
```

### 5.2 post 钩子

- 继续上文，为 npm script docker post 钩子， 在执行 npm run docker 后输出提示信息 '容器运行完成！'
- 同 pre 钩子， post 钩子本质上也是一条 npm script 命令， 由 post + docker（要添加钩子的命令）组成；

```json
{
  "scripts": {
    "docker": "sudo docker start 87e8440f2525",
    "predocker":"echo '容器运行中……'",
    "postdocker":"echo '容器运行完成！'"
  }
}
```

- 执行 npm run docker -s

```shell
$ npm run docker -s
容器运行中……
87e8440f2525
容器运行完成！
```

## 六、 npm script 中变量的使用

### 6.1 预定义变量的使用

- 查看预定义变量 `npm run env` : 下面只列出了查询到的部分信息

```shell
$ npm run env
LESSOPEN=| /usr/bin/lesspipe %s
npm_package_dependencies_opn=^5.4.0
npm_config_cache_lock_stale=60000
npm_config_ham_it_up=
npm_package_scripts_postdocker=echo '容器运行完成！'
npm_config_legacy_bundling=
npm_config_sign_git_tag=
USER=qianyin
no_proxy=localhost,127.0.0.0/8,::1
LANGUAGE=zh_CN:zh:en_US:en
LC_TIME=zh_CN.UTF-8
npm_config_user_agent=npm/6.4.1 node/v10.10.0 linux x64
npm_config_always_auth=
TEXTDOMAIN=im-config
XDG_SEAT=seat0
npm_config_bin_links=true
npm_config_key=
SSH_AGENT_PID=4012
XDG_SESSION_TYPE=x11
npm_config_allow_same_version=
npm_config_description=true
```

- 查看预定义变量并过滤出 package.json 中定义的变量

```shell
$ npm run env | grep npm_package
npm_package_dependencies_opn=^5.4.0
npm_package_scripts_postdocker=echo '容器运行完成！'
npm_package_description=
npm_package_scripts_docker=sudo docker start 87e8440f2525
npm_package_name=test
npm_package_scripts_env=env
npm_package_main=index.js
npm_package_version=1.0.0
npm_package_author=
npm_package_scripts_predocker=echo '容器运行中……'
npm_package_license=ISC
```

- 上文命令执行信息中列出了 package.json 中定义的所有信息，json 对象间的层级使用 _ 进行展开；
- 变量的使用： 假如我有这么一个需求， 需要根据当前项目版本在项目根目录下创建目录（目录名称为：build + 版本号）
- 在 npm script (shell) 中通过 `$` 调用 npm script 变量
- 编写 npm script 脚本实现上述需求

```json
{
  "scripts": {
    "mkdir":"mkdir build$npm_package_version"
  }
}
```

- 执行 npm run mkdir 将在项目目录下创建目录 build1.0.0 (当前项目版本为 1.0.0)

### 6.2 自定义变量的使用

- 在 package.json 定义变量:

```patch
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
+ "projectInfo":{
+   "desc": "这是项目的简单描述"
 },
  "scripts": {
    "mkdir":"mkdir build$npm_package_version"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "opn": "^5.4.0"
  }
}
```

- 在 npm script 中新增脚本： 输出项目描述（通过 `$` 来使用变量）

```patch
{
  "scripts": {
    "mkdir":"mkdir build$npm_package_version",
+   "projectDesc":"echo $npm_package_projectInfo_desc"
  },
}
```

- 执行 npm run projectDesc 查看项目描述

```shell
$ npm run projectDesc
这是项目的简单描述
```

## 七、 快速预览 npm script && 配置实现 npm run 命令自动补齐

### 7.1 快速预览 npm script

- 已知 npm run 可以查看所有的 npm script, 但如果 npm script 很多的情况下如何快速预览所有的 npm script 并进行查找；
- 使用 `npm run | less` 命令实现对 npm script 进行快速查看、查找；

```shell
$ npm run | less

Lifecycle scripts included in maintenance:
  start
    npm run dev
  test
    gulp test

available via `npm run-script`:
  dev-server
    NODE_ENV=development gulp dev:client
  dev
    rm -rf build && NODE_ENV=development gulp dev
  debug
    rm -rf build && NODE_ENV=development node --debug-brk=9922 ./.vscode/server.debug.js
  db:init
:
```

- 基本使用
  - 通过空格键进行快速翻页
  - 通过 Q 键退出预览；
  - 通过 /+搜索词条 可对内容进行查找定位；

### 7.2 为 npm run 命令配置 shell 实现命令自动补齐功能

- 通过下面命令将配置写入 bash 或者 zsh 的配置中

```shell
# 为 bash 添加配置
$ npm completion >> ~/.bashrc
# 为 zsh 添加配置
$ npm completion >> ~/.zshrc
```

- 通过 npm completion 可查看往 .bashrc 添加的配置信息；

```shell
$ npm completion

###-begin-npm-completion-###
#
# npm command completion script
#
# Installation: npm completion >> ~/.bashrc  (or ~/.zshrc)
# Or, maybe: npm completion > /usr/local/etc/bash_completion.d/npm
#

if type complete &>/dev/null; then
  _npm_completion () {
    local words cword
    if type _get_comp_words_by_ref &>/dev/null; then
      _get_comp_words_by_ref -n = -n @ -n : -w words -i cword
    else
      cword="$COMP_CWORD"
      words=("${COMP_WORDS[@]}")
    fi

    local si="$IFS"
    IFS=$'\n' COMPREPLY=($(COMP_CWORD="$cword" \
                           COMP_LINE="$COMP_LINE" \
                           COMP_POINT="$COMP_POINT" \
                           npm completion -- "${words[@]}" \
                           2>/dev/null)) || return $?
    IFS="$si"
    if type __ltrim_colon_completions &>/dev/null; then
      __ltrim_colon_completions "${words[cword]}"
    fi
  }
  complete -o default -F _npm_completion npm
elif type compdef &>/dev/null; then
  _npm_completion() {
    local si=$IFS
    compadd -- $(COMP_CWORD=$((CURRENT-1)) \
                 COMP_LINE=$BUFFER \
                 COMP_POINT=0 \
                 npm completion -- "${words[@]}" \
                 2>/dev/null)
    IFS=$si
  }
  compdef _npm_completion npm
elif type compctl &>/dev/null; then
  _npm_completion () {
    local cword line point words si
    read -Ac words
    read -cn cword
    let cword-=1
    read -l line
    read -ln point
    si="$IFS"
    IFS=$'\n' reply=($(COMP_CWORD="$cword" \
                       COMP_LINE="$line" \
                       COMP_POINT="$point" \
                       npm completion -- "${words[@]}" \
                       2>/dev/null)) || return $?
    IFS="$si"
  }
  compctl -K _npm_completion npm
fi
###-end-npm-completion-###
```

- 如果你也有代码洁癖，为了保持 .zshrc 或者 .bashrc 文件的整洁，可以用下面的方法：
- 将配置信息导出到单独的文件中：

```shell
$ npm completion >> ~/.npm-completion.bash
```

- 在 .bashrc 或者 .zshrc 中引入这个文件

```shell
$ echo "[ -f ~/.npm-completion.bash ] && source ~/.npm-completion.bash;" >> ~/.bashrc
$ echo "[ -f ~/.npm-completion.bash ] && source ~/.npm-completion.bash;" >> ~/.zshrc...
```

## 八、 npm script 跨平台兼容

### 8.1 文件系统： 文件和目录的创建、删除、移动、复制等命令的兼容方案

- 下载相应的依赖包
  - rimraf 或 del-cli，用来删除文件和目录，实现类似于 rm -rf 的功能；
  - cpr，用于拷贝、复制文件和目录，实现类似于 cp -r 的功能；
  - make-dir-cli，用于创建目录，实现类似于 mkdir -p 的功能；

```shell
$ npm i rimraf cpr make-dir-cli -D
```

- 修改 npm script 命令
  - rimraf 替换 rm 命令
  - make-dir 替换 mkdir命令
  - cpr 替换 cp 命令
- 更多关于上面依赖包的使用请查阅 npm

### 8.2 变量引用兼容方案： cross-var

在上文中介绍了可以在npm script 中通过 $ 引用变量，但实际上 Linux 和 Windows 下引用变量的方式是不同的，Linux 下直接可以用 $ + 变量名 即可引用变量，而 Windows 下必须使用 % + 变量名 + %才能实现对变量名的引用；而实际上我们可以使用 cross-var 实现跨平台的变量引用；

- 安装依赖包： cross-var

```shell
$ npm install cross-var -D
```

- 使用 cross-var 修改 npm script 实现跨平台引用变量
  - 引用方法同 Linux 下通过 `$` 进行引用变量， 不同的是需要在 npm script 命令前添加 cross-var 命令

```patch
{
  "script": {
-   "mkdir": "mkdir $server"
+   "mkdir": "cross-var mkdir $server"
  }
}
```

### 8.3 环境变量设置： cross-env

- 不同平台的环境变量语法不同，我们可以使用 cross-env 来实现 npm script 的跨平台兼容；
- 安装依赖： cross-env

```shell
$ npm install cross-env -D
```

- 修改 npm script 使用 cross-env 添加环境变量

```patch
{
  "scripts": {
-    "test": "NODE_ENV=test mocha tests/",
+    "test": "cross-env NODE_ENV=test mocha tests/",
  },
}
```

## 九、 把庞大的npm script 拆分到独立的文件中： scripty

### 9.1 编写相应的 shell 脚本替换 npm script 并借用 scripty 依赖包来运行相应的 shell

- 安装依赖包： scripty

```shell
$ npm install scripty -D
```

- 创建 script 目录以及 shell 脚本： 假如有如下 shel 脚本
  - script/test.sh
  - script/foo/bar.sh
- 编写 npm script 运行对应的 shell 脚本

```json
{
  "script":{
    "test":"scripty",
    "foo:bar":"scripty"
  }
}
```

- npm run test 将运行 script/test.sh 脚本
- npm run foo:bar 将运行 script/foo/bar.sh 脚本
- 补充： 在运行 shell 脚本前需确保当前用户具有执行权限 `chmod -R a+x *.sh`

### 9.2 编写 node.js 脚本替换复杂的 npm  script

对于前端工程师来说，使用 Node.js 来编写复杂的 npm script 具有明显的 2 个优势：首先，编写简单的工具脚本对前端工程师来说额外的学习成本很低甚至可以忽略不计，其次，因为 Node.js 本身是跨平台的，用它编写的脚本出现跨平台兼容问题的概率很小。

- 安装 shell.js
- 安装  chalk 来给输出加点颜色，让脚本变的更有趣

```shell
$ npm install shelljs chalk -D
```

- 创建 node 脚本 script/test.js
- 编写 node 脚本

```js
// script/test.js
const { rm, cp, mkdir, exec, echo } = require('shelljs');
const chalk = require('chalk');

console.log(chalk.green('1. remove old coverage reports...'));
rm('-rf', 'coverage');
rm('-rf', '.nyc_output');

console.log(chalk.green('2. run test and collect new coverage...'));
exec('nyc --reporter=html npm run test');

console.log(chalk.green('3. archive coverage report by version...'));
mkdir('-p', 'coverage_archive/$npm_package_version');
cp('-r', 'coverage/*', 'coverage_archive/$npm_package_version');

console.log(chalk.green('4. open coverage report for preview...'));
exec('npm-run-all --parallel cover:serve cover:open');
```

- 编写 npm script 运行 node 脚本

```json
{
  "script":{
    "test": "node script/test.js"
  }
}
```

## 十、 监听文件变化：

onchange 可以方便的让我们在文件被修改、添加、删除时运行需要的命令。

- 安装依赖： onchange

```shell
$ npm install onchange -D
```

- 新增 npm script: 监听当前项目下的所有 js 文件当文件发生变化时在终端输出 '文件发生变化'

```json
{
  "script": {
    "each":"echo '文件发生改变'",
    "onchange": "onchange ./**/*.js -- npm run each"
  },
  }
}
```

## 十一、 实现自动刷新： livereload

- 安装 livereload 到项目依赖中：

```shell
$ npm install livereload -D
```

- 编写 npm script : 监听当前项目

```json
{
  "script":{
    "start": "livereload ./"
  }
}
```

- 在当前项目下创建任意 html 文件并在页面添加如下代码：

```html
<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
</script>
```

- 执行： npm run start
- 在浏览器上打开 html 文件并尝试修改 html 文件内容页面将会自动进行刷新；

## 十二、 是