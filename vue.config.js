
module.exports={
    configureWebpack: {
        resolve: {
          // configuration.resolve.extensions should be an array:
          extensions: [],
          //简化文件路径依赖，便于文件导入和导出路径的简写
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
