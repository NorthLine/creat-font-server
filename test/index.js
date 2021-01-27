var fs = require('fs')
//测试新建字体

var fontCarrier = require('../lib/index.js')
var circle = fs.readFileSync('test/svgs/love.svg').toString()

//创建空白字体，使用svg生成字体
var font = fontCarrier.create()

font.setGlyph('爱',{
  svg:circle,
  glyphName:'爱'
})
font.output({
  path:'views/font/creatfont'
})

console.log('由于需要读取转换2m的方正字体，所以会很慢。。。')

