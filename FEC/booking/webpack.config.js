module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  watch: true,
  mode: "development",
  output: {
    filename: 'booking.js',
    path: __dirname + '/client/dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
};
