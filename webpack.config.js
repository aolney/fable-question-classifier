var path = require("path");
var webpack = require("webpack");
var fableUtils = require("fable-utils");

function resolve(filePath) {
    return path.join(__dirname, filePath)
}

var babelOptions = fableUtils.resolveBabelOptions({
    presets: [["es2015", { "modules": false }]],
    plugins: [["transform-runtime", {
        "helpers": true,
        // We don't need the polyfills as we're already calling
        // cdn.polyfill.io/v2/polyfill.js in index.html
        "polyfill": false,
        "regenerator": false
    }]]
});

var isProduction = process.argv.indexOf("-p") >= 0;
console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

module.exports = {
    devtool: isProduction ? undefined : "source-map",
    entry: resolve('./src/FableSpeechActClassifier.fsproj'),
    output: {
        filename: 'bundle.js',
        path: resolve('./public'),
    },
    resolve: {
         // BrowserFS: Use our versions of Node modules.
        alias: {
            'fs': 'browserfs/dist/shims/fs.js',
            'buffer': 'browserfs/dist/shims/buffer.js',
            'path': 'browserfs/dist/shims/path.js',
            'processGlobal': 'browserfs/dist/shims/process.js',
            'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
            'bfsGlobal': require.resolve('browserfs')
        },
        modules: [
            "node_modules", resolve("./node_modules/")
        ]
    },
    devServer: {
        contentBase: resolve('./public'),
        host: "0.0.0.0",
        port: 8080,
        hot: true,
        inline: true
    },
    module: {
        // REQUIRED to avoid issue "Uncaught TypeError: BrowserFS.BFSRequire is not a function"
        // See: https://github.com/jvilk/BrowserFS/issues/201
        noParse: /browserfs\.js/,
        rules: [
            {
                test: /\.fs(x|proj)?$/,
                use: {
                    loader: "fable-loader",
                    options: {
                        babel: babelOptions,
                        define: isProduction ? [] : ["DEBUG"]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions
                },
            },
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: isProduction ? [
        // BrowserFS globals
        new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' })
    ] : [
        // BrowserFS globals
        new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    // BrowserFS: DISABLE Webpack's built-in process and Buffer polyfills!
    node: {
        process: false,
        Buffer: false
    }
};
