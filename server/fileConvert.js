var fs = require('fs')
var fontCarrier = require('../lib/index.js')
var exec = require('child_process').execFile;
var pngTosvg =function(fn){

  console.log("fun() start");

  exec('.\\pngtosvg.exe', function(err, data) {
    console.log('-------------------png成功转成SVG！----------------------')
    fn()
  });
}




//获取字体
var getFont = fontCarrier.transfer('./views/font/creatfont.ttf')

function addFontToTTF(str,name,suc){
  setTimeout(function () {
    pngTosvg(function () {
      var fontsvg = fs.readFileSync('./'+name+'.svg').toString()
      var setStr='&#xe'+str+';';
      getFont.setSvg(setStr,fontsvg);
      getFont.output({
        path:'./views/font/creatfont'
      })
      console.log('-------------------字体输出成功！----------------------')
      setTimeout(function () {
        suc()
      },1000)
    })



  },500)
}
module.exports=addFontToTTF
