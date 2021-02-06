var webpack = require('webpack');
var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var sourcePath = path.resolve(__dirname, 'src');
var jsSourcePath = path.resolve(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'dist');

var config = {
  mode: 'development',
  entry: sourcePath + '/main.js',
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      // {
      //     loader: 'postcss-loader',
      //     options: {
      //       ident: 'postcss',
      //       plugins: [
      //         require('tailwindcss'),
      //         require('autoprefixer'),
      //       ],
      //     },
      // }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', jsSourcePath],
    alias: {
      'vuejs-datatable': 'vuejs-datatable/dist/vuejs-datatable.esm.js',
    },
  },
  devServer: {
    port: 3003,
    publicPath: '/',
    contentBase: path.join(__dirname, 'public/'),
  },
  devtool: 'eval-source-map',
};

module.exports = config;
