const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
  },

  outputDir: 'dist',
  publicPath: '/',
  assetsDir: 'static',

  pages: {
    index: {
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
    }
  },

  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [
              { source: path.resolve(__dirname, '../backend/static/css'), options: { force: true } },
              { source: path.resolve(__dirname, '../backend/static/js'), options: { force: true } },
              { source: path.resolve(__dirname, '../backend/static/img'), options: { force: true } },
              { source: path.resolve(__dirname, '../backend/templates/home.html'), options: { force: true } },
              { source: path.resolve(__dirname, '../backend/dashboard/templates/dashboard/dashboard.html'), options: { force: true } },
            ],
          },
          onEnd: {
            copy: [
              { source: path.resolve(__dirname, './dist/static/css'), destination: path.resolve(__dirname, '../backend/static/css') },
              { source: path.resolve(__dirname, './dist/static/js'), destination: path.resolve(__dirname, '../backend/static/js') },
              { source: path.resolve(__dirname, './dist/favicon.ico'), destination: path.resolve(__dirname, '../backend/static/img/favicon.ico') },
              { source: path.resolve(__dirname, './dist/home.html'), destination: path.resolve(__dirname, '../backend/templates/home.html') },
              { source: path.resolve(__dirname, './dist/dashboard.html'), destination: path.resolve(__dirname, '../backend/dashboard/templates/dashboard/dashboard.html') },
            ],
          },
        },
      }),
    ],
  },
};

