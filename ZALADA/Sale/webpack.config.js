const webpack = require('webpack');
const path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'src/main/js/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        loaders: [
          'babel-loader'
        ]
      },
      {
        // สำหรับไฟล์นามสกุล css ให้ใช้ Loader สองตัวคือ css-loader และ style-loader
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        // ใช้ Loader สามตัวสำหรับ scss
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;