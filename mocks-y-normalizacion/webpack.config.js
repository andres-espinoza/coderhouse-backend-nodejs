const path = require('path');
// @ts-ignore
const nodeExternals = require('webpack-node-externals');

var clientConfig = Object.assign({}, {
  entry: path.join(__dirname, '/src/public/index.ts'),
  // mode: 'production',
  mode: 'development',
  watch: true,
  output: {
    path: path.join(__dirname, '/src/public'),
    filename: 'index.js',
    publicPath: ''
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.js', '.mts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.client.json"
          }
      }],
      exclude: /node_modules/,
      },
    ]
  }
});

var serverConfig = Object.assign({}, {
  entry: path.join(__dirname, '/src/server.ts'),
  mode: 'development',
  watch: false,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js'
  },
  target: 'node',
  externals: nodeExternals(),
  resolve: {
    extensions: ['.ts', '.js', '.mts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader',
          options: {
              configFile: "tsconfig.json"
          }
      }],
        exclude: /node_modules/
      },
    ]
  }

});

module.exports = [clientConfig]