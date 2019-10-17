const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const modifyVars = require('./webpack.config.antd.theme');
const ManifestPlugin =  require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    
    resolve: {
        alias:{

            src : path.resolve(__dirname , '../src'),
            STYLES: 'src/styles',
            CONTAINERS: 'src/containers',
            CMP: 'src/components',
            REDUX: 'src/redux',
            MODEL: 'src/model',
            UTILS: 'src/utils',

        },
        extensions: [
			".web.js",
			".js",
			".jsx",
			".less",
			".css",
			".json",
			".scss"
		] //自动解析的扩展
    },
    module:{

        rules:[
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                include: path.resolve(__dirname , '../src'),
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
							modifyVars: modifyVars,
							javascriptEnabled: true
						}
                    }
                ]                
            }
        ]

    },
    plugins:[
        new cleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: "views/index.tpl.ejs",
			filename: "index.html",
			minify: true,
			inject: true
        }),
        // new htmlWebpackPlugin({
        //     template: "views/index.tpl.ejs",
		// 	filename: "index2.html",
		// 	minify: true,
		// 	inject: true
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin(),
        // new webpack.optimize.CommonsChunkPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common'
        // })
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css'
        })
    ]

}