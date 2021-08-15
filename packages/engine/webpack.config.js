const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.ts'),
    'index.min': path.resolve(__dirname, 'src', 'index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'dune',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        include: /\.min\.js$/
      })
    ]
  },
  plugins: [new CleanWebpackPlugin()]
}
