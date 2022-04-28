'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",
  
  module: {
    rules: [
      {
        test: /\.m?js$/, // находим файлы .js
        exclude: /(node_modules|bower_components)/, // файлы, которые нужно исключить
        use: { // описываем как и что мы будем использовать
          loader: 'babel-loader', //небольшая технология, ктоторая будет связывать webpack и babel
          options: { //опции, которые будут здесь использоваться
            presets: [['@babel/preset-env', { // пресет env- самый распространенный, который подходит почти под все проекты
                debug: true,
                corejs: 3, // библиотека js, которая вклюяает для полифилов все, что возможно
                useBuiltIns: "usage" // интеллектуально выбирает только те полифилы, которые нужны
            }]]
          }
        }
      }
    ]
  }
};
