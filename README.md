# cross_domain
使用node进行跨域处理，使用electron生成标准文件，打开文件即可处理跨域请求，用于处理项目发送请求的时候，在本地开发环境的跨域问题

master有问题，只能打包对应的mac版本，win版本请切换分支为win

## 使用方法

1. npm run start （ 运行测试环境 ）
2. npm run build （ 打包运行 ）
    
    - 在打包完成的目录下，新建config.json文件
    - 在config.json 文件中添加publicPath: `${你的静态文件绝对路径}`
    - 添加之后，打开exe或者mac下的打包文件
    - 设置几个属性内容
        - hostname : 对应服务器的ip地址（一般是同局域网下的服务器ip地址，或者请求地址，公司内部使用）
        - port     : 端口号
        - cookie   : 如果需要登录信息，请设置cookie
