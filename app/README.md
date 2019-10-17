# 使用规范

## npm install

初始化modules

## npm run dev

运行文件

## npm run build

打包项目

## git操作

> git clone XXX.git

不要在master分支进行操作

> git checkout dev/yourName/date

新建分支名称：  dev/你的名字/日期

上传分支到master必须通过**管理员**审核

## 文件目录

1. build ： webpack配置文件目录

2. public： 公共静态资源目录

3. src   ： 主要文件代码目录

    - containers ： 主要页面以及入口目录
    - redux      ： redux配置以及设置目录
    - store      ： redux输出口
    - styles     ： 公共scss
    - app.js     ： 主要使用文件
    - index.js   ： 入口文件

4. view  ： dev生成是的模板文件