require('dotenv').config()

const withCSS = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// const ExtrctTextPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV.trim() || 'development'
module.exports = withStylus({
  webpack(config, options) {
    return config
  },
})

module.exports = withCSS({
  cssModules: false,
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })

    config.module.rules.push({
      test: /\.(txt|md|png|jpg)$/i,
      use: 'raw-loader',
    })

    config.module.rules.push({
      // Transpile ES6 to ES5 with babel
      // Remove if your app does not use JSX or you don't need to support old browsers
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      options: {
        presets: ['@babel/preset-react'],
      },
    })

    // Read the .env file
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, '.env.' + env),
        systemvars: true,
      }),
    )

    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
})
