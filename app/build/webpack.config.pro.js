const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
module.exports = merge( base , {
    
    mode:'production',
    entry:{
        bundle: [path.resolve(__dirname , '../src/index.js')],
    },
    output:{
        path: path.resolve(__dirname , '../dist'),
        filename: 'js/build.[hash].js',
        chunkFilename: 'js/venders.[chunkhash].js',
        publicPath: './',
    },
    optimization:{
        splitChunks: {
            automaticNameDelimiter: '-',    //默认代码块之间的连接符
            chunks: 'all',                  //代码块进行优化
            maxAsyncRequests: 5,            //最大并行加载的js块数量
            maxInitialRequests: 1,          //入口处最小并行请求数
            minChunks: 1,                   //分割前必须共享的最小模块数
            minSize: 30000,                 //生成分割模块的最小大小
            name: true,                     //允许自己更改名字
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
                }
            }

        },
        minimizer:[
            // new UglifyJSPlugin({
            //     uglifyOptions:{
            //         compress :{
            //             drop_console:true,//去除console.log
            //         }
            //     }
            // }),
            new OptimizeCssAssetsPlugin({})
        ]

    },  
    plugins:[
        
        new WebpackMd5Hash(),                     //修改chunkhash使用md5格式
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css'
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use : [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader', //允许js中放css
                        options: {
                            config:{
                                path: path.resolve(__dirname , './postcss.config.js')
                            }
                        }
                    }
                ]
            },
            {

                test: /\.(scss|sass)$/,
                use : [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]--[hash:base64]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]

            }
        ]
    }

})