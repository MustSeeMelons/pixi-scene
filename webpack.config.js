const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    module: {
        rules: [{
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: "url-loader"
            },
            {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        "outputPath": "sounds"
                    }
                }
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    },
    plugins: [
        new CleanWebpackPlugin(["dist/*"], {
            watch: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/resources/template.ejs",
            title: "pixi-starter",
            description: "basic setup of pixi + typescript",
            url: "",
            type: "",
            name: "",
            twitterCard: "",
            twitterAlt: "",
            inject: true
        })
    ]
};