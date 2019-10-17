const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge( base , {

    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname , '../dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash:5].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase : './dist',
        hot: true,
        compress: true,
        port: 8080,
        // disableHostCheck: true,  // 当需要局域网内被访问的时候，开启dns不验证
        // host:  0.0.0.0,          // 外部链接可访问
        headers:{

        },
        // https: true,             // 开启https 
        inline: true,
        // noInfo: true,            // 开启之后控制台不显示构建信息
        open: true,                 // 开启页面 
        openPage: '/',
        // quiet: true,             // 默认不展示所有控制器内容
        
    },
    module:{
        
        rules: [
            {
                test: /\.css$/,
                use : [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    }
                ],
                // include: path.resolve( __dirname , 'src' ),
            },
            {
                test: /\.(scss|sass)$/,
                use : [
                    {
                        loader : 'style-loader',
                    },
                    {
                        loader : 'css-loader',// 将js字符串生成style节点
                        options: {
							modules: true, //class局部作用域
							localIdentName: "[local]--[hash:base64]"
						}
                    },
                    {
                        loader : 'sass-loader',  //将sass编译成css
                    }
                ],
                // include: path.resolve( __dirname , 'src' ),
            }
        ]

    }

})