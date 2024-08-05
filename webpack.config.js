const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  devServer: {
    'static': {
      directory: './dist'
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' },
        { from: 'manifest.json' },
        { from: 'src/background.js' }
      ],
    })
  ]
};

module.exports = config;