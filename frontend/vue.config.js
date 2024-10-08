const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
  },

  outputDir: 'dist',
  publicPath: '/',
  assetsDir: 'static',
  filenameHashing: true,

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
	              { source: './src/assets/img', destination: './dist/static/img' },

              { source: path.resolve(__dirname, './dist/daemoon.png'), destination: path.resolve(__dirname, '../backend/static/img/daemoon.png') },
              { source: path.resolve(__dirname, './dist/LOGO.png'), destination: path.resolve(__dirname, '../backend/static/img/LOGO.png') },
              { source: path.resolve(__dirname, './dist/home.html'), destination: path.resolve(__dirname, '../backend/templates/home.html') },
              { source: path.resolve(__dirname, './dist/dashboard.html'), destination: path.resolve(__dirname, '../backend/dashboard/templates/dashboard/dashboard.html') },
            ],
          },
        },
      }),
    ],
  },
};
