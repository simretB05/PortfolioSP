const { defineConfig } = require( '@vue/cli-service' )
module.exports = defineConfig( {
  transpileDependencies: [
    'vuetify',
  ],
  // Don't publish source maps: they expose the full source code in production.
  productionSourceMap: false,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map'
  },
  devServer: {
    // In development, forward form submissions to the Cloudflare function (npm run functions).
    proxy: {
      '/api': { target: 'http://127.0.0.1:8788' }
    }
  }
} )
