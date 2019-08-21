const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // baseUrl: '/',  // 根域上下文目录  (Vue CLI 3.3 起已弃用，请使用publicPath)
  publicPath: '/',  // 定义文件的根目录   例如: 该应用部署到https://www.my-app.com/my-app/，则publicPath为'/my-app/'
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  chainWebpack: config => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('#', resolve('src/components'))
      .set('v', resolve('src/views'))
      .set('less', resolve('src/assets/less'))
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        { loader: "vue-loader" },
        { loader: require.resolve("./src/assets/js/markdown-loader") }
      ]
    })
  }
}