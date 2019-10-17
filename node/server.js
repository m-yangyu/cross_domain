const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const readFile = require('./readFile');

const app = new express();
const httpApp = new express();

const fileName = readFile.readConfig().publicPath;
const proxy = httpProxy.createProxyServer();
const body_request={

    hostname:'',
    port:8081,
    Cookie: '',

};

app.use(express.static( fileName ));
app.use((req,res,next)=>{
    let params = '';
    console.log(req.url);
    req.on('data',(chunk)=>{
        params += chunk;
        req.body = params;
    })

    req.on('end',()=>{
        next();
    })
})

// 8001 页面转发至8080端口，接口转发至8000进行代理，默认8080为webpack启动的端口
httpApp.all('/*',(req,res)=>{
    if( req.url.match(/\/static|\.js|.css/) || req.url === '/' ){
        if( req.url === '/static/test.json' ){
            res.status(200).json({
                "test": true,
                "timeout": 1200000
            })
        }else{
            proxy.web(req,res,{target:'http://localhost:8080'});
        }   
    }
    else{
        proxy.web(req,res,{target:'http://localhost:8000'});
    }

}).listen(8001)

app.post('/set_config',(req,res)=>{
    const param = JSON.parse(req.body);

    body_request.hostname = param.hostname;
    body_request.port = param.port;
    body_request.Cookie = param.cookie;

    res.send({
        success: true,
        data: null,
        msg: '设置成功',
    });
})

app.all('/*',(req,res)=>{
    const request = {
        hostname: body_request.hostname,
        port: body_request.port,
        path:req.url,
        method: req.method,
        headers:{
            Cookie: req.headers.Cookie || body_request.Cookie,
            "Content-Type": req.headers['content-type'] || 'application/json;charset=UTF-8',
        }
    }

    const r = http.request(request,(httpRes)=>{
        // console.log(body_request.Cookie , 'cookie');
        let content='';
        httpRes.setEncoding('utf-8');

        httpRes.on('data',(chunk)=>{
            content+=chunk;
        });

        httpRes.on('end',()=>{
            if( /dzswj_tgc/.test(content) ){
                const json = JSON.parse(content);
                body_request.Cookie = `DZSWJ_TGC=${json.data.dzswj_tgc}`;
            }
            console.log(body_request.Cookie);
            if( /json/.test(httpRes.headers['content-type']) ){
                res.status(httpRes.statusCode).send(JSON.parse(content));
            }else{
                res.status(httpRes.statusCode).send(content);
            }
        })

    });


    if( req.method !== 'GET' && req.body ){

        r.write(req.body);

    }
    r.end();

})

// 8000 接口静态文件的路径内容
// 也是转发接口的中心端口
app.listen(8000);