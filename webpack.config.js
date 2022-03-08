const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    main: './src/main.ts'
    
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./bin/js')
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']      
  },

  module: {
    rules: [{
        test: /\.ts$/,
        loader: 'ts-loader',
		
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
		
        enforce: 'pre'
      },
      {
        test: /\.tsx?$/,
        loader: 'source-map-loader',
		
        enforce: 'pre'
      }
    ]
  },

  plugins: [
  ],

  devtool: 'source-map'
}