module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  // 定义语法检查规则(0表示不检查)
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": 0,         // 语句强制分号结尾
    "eol-last": 0,     // 文件末尾强制换行
    "indent": 0,  // 缩进风格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
