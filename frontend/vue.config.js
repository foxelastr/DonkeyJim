const FileManagerPlugin = require('filemanager-webpack-plugin-fixed');
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      staticOptions: {
        index: 'home.html',
      },
    },
  },

  outputDir: 'dist',
  publicPath: '/',
  assetsDir: 'static',

  pages: {
    home: {
      template: 'public/index.html',
      entry: 'src/pages/main_home.js',
      filename: 'home.html',
      title: 'Donkey-Jim_home',
      minify: false,
    },

    dashboard: {
      template: 'public/index.html',
      entry: 'src/pages/main_dashboard.js',
      filename: 'dashboard.html',
      title: 'Donkey-Jim_dashboard',
      minify: false,
    },
  },

  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [
              '../backend/static/**',
              '../backend/templates/**',
            ],
          },
          onEnd: {
            copy: [
              { source: './dist/static', destination: '../backend/static/' },
              { source: './dist/favicon.ico', destination: '../backend/static/img/' },
              { source: './dist/home.html', destination: '../backend/templates/' },
              { source: './dist/dashboard.html', destination: '../backend/templates/dashboard/' },
            ],
          },
        },
      }),
    ],
  },
};
