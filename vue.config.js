
module.exports={
    configureWebpack: {
        resolve: {
          // configuration.resolve.extensions should be an array:
          extensions: [],
          alias: {
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'network': '@/network',
            'views': '@/views'
          }
        }
        },

}
