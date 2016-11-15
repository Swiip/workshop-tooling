module.exports = {
  entry: __dirname + '/src/index',
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'},
    ]
  },
  output: {
    path: '.tmp',
    filename: 'bundle.js'
  }
};
