const path = require('path');

module.exports = {
    entry: {
        sodaFrontEnd:path.resolve(__dirname,"public/main.js"),
        waiterFrontEnd:path.resolve(__dirname,"public/mainWaiter.js")
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname,"public/bundle")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, "server"),
                    path.resolve(__dirname, "node_modules")
                ],
                use: {loader:"babel-loader"}
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    }
                ]
            }
        ]
    }
}