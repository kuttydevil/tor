const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/, // Only minify files ending with .min.js
        parallel: true, // Enable parallel minification for faster builds
      })
    ],
  },
  mode: 'production',
  entry: {
    index: './src/index.js', // Entry point for regular version
    'index.min': './src/index.js', // Entry point for minified version
  },
  output: {
    path: path.resolve('dist'), // Output directory
    filename: '[name].js', // Use '[name]' to differentiate filenames
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/, // Exclude Node.js modules
        use: {
          loader: 'babel-loader', // Use Babel loader for transpilation
        }
      }
    ]
  },
  node: {
    fs: 'empty', // Prevent errors when using node modules that rely on fs
  },
  resolve: {
    extensions: ['.js'], // Resolve extensions for imports
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version), // Define the version for your code
    }),
  ],
};