const express = require('express');
const path = require('path');
const http = require('http');

const app = new express();
app.use(express.static( '/Users/maqixiang/Desktop/code/elecron/public' ));
console.log( path.resolve(__dirname , './public') );

const body_request={

    hostname:'192.168.149.99',
    port:8000,
    headers:{
        'Content-Type':'application/json;charset=utf-8',
        Cookie: 'JSESSIONID=Jav9VIIM6cB1VbHjKx2EfLred6x5j7_VH_allqQwizrVKoDApiC5!471438375'
    } 

};

app.get('/',function(req,res){
    console.log(req.url , '11122');
    res.send('hello world');
})

app.use('*',(req,res,next)=>{

    let params = '';

    req.on('data',(chunk)=>{
        params += chunk;
        req.body = params;
    })

    req.on('end',()=>{
        next();
    })

},(req,res)=>{

    const request = {
        path:req.url,
        method: req.method,
        ...body_request,
    }
    
    const r = http.request(request,(httpRes)=>{

        let content='';
        httpRes.setEncoding('utf-8');

        httpRes.on('data',(chunk)=>{
            content+=chunk;
        });

        httpRes.on('end',()=>{
            res.status(httpRes.statusCode).send(content);
        })

    });

    r.on('error',(data)=>{

        console.log(data);

    })

    if( req.method !== 'GET' ){

        r.write(req.body);

    }

    r.end();

})

app.listen(8000);