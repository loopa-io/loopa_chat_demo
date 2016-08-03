var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "client"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
    "./js/app.js",
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080/'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/client/dist/",
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
