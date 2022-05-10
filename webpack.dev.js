const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module:{
      rules:[
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
      ]
  },
  devServer: {
    static: './dist',
    port:3000,
        hot:true,
        open:true,
        client: {
            progress: true,
          },
  },
});