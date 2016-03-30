## IFE 阶段任务

> 任务地址：[http://ife.baidu.com/task/all](http://ife.baidu.com/task/all)

> 希望每个人都参与进来，共同进步

### 规范文档
请看百度FEX团队整理的规范文档：
[fex-team/styleguide](https://github.com/fex-team/styleguide/blob/master/project.md)

### 简要说明
接下来的任务就在这个项目中进行啦！使用gulp进行一些简单的管理，具体请看`gulpfile.js`文件（大家也可以进行修改和改进哇，这个只是初步的样例吧，嘻嘻~）。

### 环境要求
1. 安装配置NodeJs 	
	- [https://nodejs.org/en/#download](https://nodejs.org/en/#download)
	- [淘宝NPM镜像](http://npm.taobao.org/)
	
2. 全局安装gulp：`npm install -g gulp`
3. 使用 `npm install` 安装依赖包
4. 在本地项目的根目录中新建`config.json`文件，示例内容（我的配置文件的设置，大家可以将angelzou改成自己的名称）如下所示：
    
        {
            "root": "./task2",
            "css": {
                "less": "/less/*.less",
                "sass": "/sass/*.scss",
                "dest": "/assets/angelzou/css"
            },
            "js": {
                "src": "/js/angelzou/*.js",
                "dest": "/assets/angelzou/js"
            },
            "html": "/angelzou/*.html"
        }

	请结合`gulpfile.js`文件来了解这个配置文件。这个配置文件的作用的定义`gulpfile.js`文件读取JavaScript文件、Less文件、Sass文件、HTML文件源目录地址以及进行相应解析和压缩等处理之后存储的目的目录地址。（因为第二阶段任务主要是学习JavaScript相关的知识，所以大家可以根据各自的情况配置目录结构）。

	接下来**第三阶段**以及**第四阶段**的任务更加注重团队协作的任务，那时候在统一一下`config.json`文件。

### 项目访问地址

[2016-ife-tasks](http://angelzou.github.io/2016-ife-tasks/)