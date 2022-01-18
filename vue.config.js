module.exports = {
  publicPath: '/vue-football-data/',
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(args => {
          args.compilerOptions.whitespace = 'preserve'
        })
  },
  runtimeCompiler: true
}
