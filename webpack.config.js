const { join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const base = process.cwd();

module.exports = {
  entry: join(base, 'src/index.ts'),
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [{
      exclude: [
        /\.ts$/,
        /\.js$/,
        /\.html$/,
      ],
      use: {
        loader: 'file-loader',
        options: {
            limit: 1024,
            name: '[name].[ext]',
            outputPath: '',
        },
      },
    },
      {
        test: /\.[j|t]s$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'bundle-[hash].js',
    path: join(base, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(base, 'public/index.html'),
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      { from: 'public/*.png', to: '' },
    ])
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
};