const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: path.resolve("src/index.tsx"),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.sass$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {modules: true}
                }, "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {modules: true}
                }]
            },
            {
                test: /\.(svg|jpg|png|jpeg|webp|bmp)$/,
                use: ["url-loader"]
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".*", ".ts", ".js", ".tsx", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 3000,
        hot: true
    },
    plugins: [
        new ESLintPlugin({
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        })
    ]
};