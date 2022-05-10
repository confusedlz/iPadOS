const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module:{
      rules:[
          {
              test:/\.css$/,
              use:[
                  MiniCssExtractPlugin.loader,
                  'css-loader'
              ]
          }
        ]
  },
  plugins:[
      new MiniCssExtractPlugin({
          filename:'css/build.css'
      })
  ],
  performance: {
    hints:'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
});