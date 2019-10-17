# cross_domain
使用node进行跨域处理，使用electron生成标准文件，打开文件即可处理跨域请求

## 使用方法

1. npm run start ( 运行开发环境 )
2. npm run build ( 打包生成环境 )

- 在打包完成的目录建立config.json（ 内容参照文件中的config.json ）
- publicPath 一定要写绝对路径不要写相对路径
- 添加完成，打开exe，可设置几个属性
    - hostname： 对应需要请求的ip地址
    - port： 端口号
    - cookie： 设置对应的登陆信息cookie

## 注意内容

2. 其余团队，需要添加对应的hostname以及port
3. 如有webpack启动的服务，暂时默认为启动的8080端口，开启本软件之后，需要访问localhost:8001，即可访问到可以跨域接口访问
4. 暂时不支持，多个项目的代理，只支持一个项目代理，即只支持代理一个端口的服务
