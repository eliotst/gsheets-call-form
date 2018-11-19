const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");

const envConfig = dotenv.config();

module.exports = (env = {}) => ({
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
    devtool: "source-map",
    entry: {
        app: "./src/js/index.jsx",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                path.join(__dirname, "node_modules/materialize-css/sass/"),
                            ],
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: "js/[name].js",
        path: path.join(__dirname, "./dist"),
    },
    plugins: [
        new webpack.DefinePlugin({
            DEFAULT_SPREADSHEET_ID: JSON.stringify(envConfig.parsed.DEFAULT_SPREADSHEET_ID),
            OAUTH_CLIENT_ID: JSON.stringify(envConfig.parsed.OAUTH_CLIENT_ID),
            GOOGLE_MAPS_API_KEY: JSON.stringify(envConfig.parsed.GOOGLE_MAPS_API_KEY),
        }),
        new CleanWebpackPlugin(["dist/*"]),
        new CopyWebpackPlugin([
            { from: "src/static/" },
        ]),
    ],
    resolve: {
        extensions: [".js", ".json", ".jsx"],
    },
});
