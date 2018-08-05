const { join} = require('path');

const base = process.cwd();

module.exports = {
  entry: join(base, 'src/index.ts'),
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [{
      exclude: [
        /\.tsx?$/
      ],
      use: {
        loader: 'url-loader',
        options: {
            limit: 1024,
            name: '[name].[ext]',
            outputPath: '',
        },
      },
    },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: join(base, 'dist')
  }
};