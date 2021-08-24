const { transform } = require('@babel/core')
const fs = require('fs')

//读取需要转换的js字符串
const before = fs.readFileSync('./before.js', 'utf8');

// 使用babel-core的transform API和插件进行字符串到AST的转化
const res = transform(`${before}`, {
    plugins: [require('./plugin')]
})

// 如果存在after.js则删除
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
fs.writeFileSync('./after.js', res.code, 'utf8')
