import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import SystemBellPlugin from 'system-bell-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';

import pkg from './package.json';

const TARGET = process.env.npm_lifecycle_event || '';
const ROOT_PATH = __dirname;
const config = {
    paths: {
        Main: path.join(ROOT_PATH, 'Main'),
        dist: path.join(ROOT_PATH, 'dist'),
        gh: path.join(ROOT_PATH, 'gh-pages'),
        src: path.join(ROOT_PATH, 'src'),
    },
    filename: 'index',
};

process.env.BABEL_ENV = TARGET;

const common = {
    resolve: {
        alias: {
            react: path.resolve('node_modules/react'),
        },
        extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg'],
    },
    module: {
        loaders: [
            {
                test: /\.(jpg|png)$/,
                loader: 'file',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.md$/,
                loader: 'raw',
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
        ],
    },
    plugins: [
        new SystemBellPlugin(),
    ],
};

const siteCommon = {
    plugins: [
        new webpack.DefinePlugin({
            NAME: JSON.stringify(pkg.name),
            USER: JSON.stringify(pkg.user),
            VERSION: JSON.stringify(pkg.version),
        }),
    ],
};

if (TARGET === 'start') {
    module.exports = merge(common, siteCommon, {
        devtool: 'cheap-module-source-map',
        entry: {
            Main: [config.paths.Main],
        },
        context: ROOT_PATH,
        plugins: [
            new HtmlWebpackPlugin({
                template: require('html-webpack-template'), // eslint-disable-line global-require
                inject: false,
                mobile: true,
                title: pkg.name,
                appMountId: 'app',
            }),
            new webpack.DefinePlugin({
                GH_PAGES: false,
                'process.env.NODE_ENV': '"development"',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel?cacheDirectory'],
                    include: [
                        config.paths.Main,
                        config.paths.src,
                    ]
                },
            ],
        },
        devServer: {
            historyApiFallback: true,
            inline: true,
            progress: true,
            host: process.env.HOST,
            port: process.env.PORT,
            stats: 'errors-only',
        },
    });
}

if (TARGET === 'gh-pages' || TARGET === 'gh-pages:stats') {
    module.exports = merge(common, siteCommon, {
        entry: {
            app: [config.paths.Main],
            vendors: [
                'react',
                'react-dom'
            ],
        },
        output: {
            filename: '[hash].js',
            path: config.paths.gh,
        },
        plugins: [
            new CleanWebpackPlugin(['gh-pages'], {
                verbose: false,
            }),
            new HtmlWebpackPlugin({
                template: 'lib/index_template.ejs',
                filename: 'index.html',

                // Context for the template
                title: pkg.name,
                description: pkg.description,
            }),
            new HtmlWebpackPlugin({
                template: 'lib/404_template.ejs',
                filename: '404.html',
                inject: false,

                // Context for the template
                title: pkg.name,
                remote: true,
            }),
            new webpack.DefinePlugin({
                GH_PAGES: true,
                // This affects the react lib size
                'process.env.NODE_ENV': '"production"',
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['oswaldo', 'vendors'],
                filename: '[name].[hash].bundle.js',
            }),
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel'],
                    include: [
                        config.paths.Main,
                        config.paths.src,
                    ],
                },
            ],
        },
    });
}

const distCommon = {
    output: {
        path: config.paths.dist,
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: [
                    config.paths.src,
                ],
            },
        ],
    },
    entry: {
        app: config.paths.src,
    },
};

if (TARGET === 'dist') {
    module.exports = merge(common, distCommon, {
        output: {
            filename: `${config.filename}.js`,
        },
    });
}

if (TARGET === 'dist:min') {
    module.exports = merge(common, distCommon, {
        output: {
            filename: `${config.filename}.min.js`,
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),
        ],
    });
}

if (!TARGET) {
    module.exports = common;
}