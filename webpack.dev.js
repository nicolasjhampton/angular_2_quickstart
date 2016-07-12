var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var _root = path.resolve(__dirname, '.');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}


module.exports = {
  context: __dirname,
  entry: {
    app: './src/main.ts',
    vendor: './src/vendor.ts',
    polyfills: './src/polyfills.ts'
  },
  devtool: 'source-map',
  output: {
      path: root('dist/js'),
      publicPath: 'http://localhost:3000/',
      filename: '[name].bundle.js',
      sourceMapFilename: "[name].map.js",
      chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015', 'ts-loader'] //'angular2-template-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        // This loader needed when using separate css files for components
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        // This must be used with the corresponding plugin
      },
      {
        // This loader needed when styles: require(something.component.css) syntax is used
        test: /\.css$/,
        include: root('src', 'app'),
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('[name].css') // This must be used with the corresponding loader
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
};

//"core-js": "registry:dt/core-js#0.0.0+20160602141332",
