const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

console.log("Static Path:", path.resolve(__dirname, '../backend/static/*'));
console.log("Templates Path:", path.resolve(__dirname, '../backend/templates/*'));


module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    index: 'index.html',
  },

  outputDir: 'dist',
  publicPath: '/',
  assetsDir: 'static',

  pages: {
    index: {
      template: 'public/index.html',
      entry: 'src/pages/main_home.js',
      filename: 'index.html',
      title: 'Donkey-Jim',
      minify: false,
    }
  },

  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [
              path.resolve(__dirname, '../backend/static/**'),
              path.resolve(__dirname, '../backend/templates/**'),
            ],
          },
          onEnd: {
            copy: [
              { source: path.resolve(__dirname, './dist/static'), destination: path.resolve(__dirname, '../backend/static/') },
              { source: path.resolve(__dirname, './dist/favicon.ico'), destination: path.resolve(__dirname, '../backend/static/img/') },
              { source: path.resolve(__dirname, './dist/index.html'), destination: path.resolve(__dirname, '../backend/templates/home.html') },
            ],
          },
        },
      }),
    ],
  },
};
