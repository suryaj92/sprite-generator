const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


module.exports = {
    context: __dirname,
    entry: {
        main: path.resolve(__dirname, "../src", "index.js"),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    devServer: {
        port: 3042,
        historyApiFallback: true,
        overlay: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "babel-loader" }]
            },
            {
                test: /\.svg$/,
                use: [

                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: '/'
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options : {
                            reusePaths: true,
                        }
                    }
                ]
            },
            // {
            //     test: /\.svg$/,
            //     include: path.resolve(__dirname, '../src/assets/icons'),
            //     use: [
            //         {
            //             loader: 'file-loader'
            //         },
            //         {
            //             loader: 'svg-sprite-loader',
            //             options: {
            //                 extract: true,
            //                 publicPath: '/sprites/'
            //             }
            //         },
            //         {
            //             loader: 'svgo-loader',
            //             options: {
            //                 plugins: [
            //                     {removeTitle: true},
            //                     {convertColors: {shorthex: false}},
            //                     {convertPathData: false}
            //                 ]
            //             }
            //         }
            //     ]
            // },
            {
                test: /.*\.(gif|png|jp(e*)g)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 21000,
                            name: "images/[name]_[hash:7].[ext]"
                        }
                    }
                ]
            },
            // Vendor CSS loader
            // This is necessary to pack third party libraries like antd
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../node_modules'),
                use: [
                'style-loader',
                'css-loader'
                ],
            },
        ]
    },
    plugins: [
        new SpriteLoaderPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../public', 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}
