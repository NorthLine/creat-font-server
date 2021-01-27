var connectObj=require('./sql/connect');
//启动数据库连接
connectObj.stratConnect();
//启动服务
var log4js = require('log4js');
var fs = require("fs");
var bodyParser = require('body-parser');
//加载服务模块
const express = require('express');
const app = express();
const service=require('./server/service');
var exphbs=require('express-handlebars');
var path=require('path');
var addFontToTTF=require('./server/fileConvert')

//获取server根目录
var appPath=path.resolve(__dirname);
app.use(express.static(appPath + '/views'));
//允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(bodyParser.urlencoded({ extended: true,limit :"50mb"}));
app.use(bodyParser.json({ limit: '50mb' }));

app.engine('html', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.html'
}));
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.type('html');
  res.reader('index.html')
});

app.get('/getAll', function (req, res) {
  service.getAll(function (suc) {
    res.send({code: 200, message: "Success!", data: suc, total: suc.length});
  }, function (err){
    res.send({code: 500, message: "Error!", data: err});
  })
});

app.get('/getRecent', function (req, res) {
  service.getRecent(function (suc) {
    res.send({code: 200, message: "Success!", data: suc, total: suc.length});
  }, function (err){
    res.send({code: 500, message: "Error!", data: err});
  })
});

app.post('/saveFile',function (req,res) {
  var logger = log4js.getLogger("webrtc");

  try {
    logger.debug(req.Body);
    var base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
    logger.debug(base64Data);
    var fileName= req.body.name+parseInt(Math.random()*99999);
    var codeName= req.body.name
    var result = "ok";
    fs.writeFile(fileName+'.png', base64Data, 'base64', function (err) {
      if(!err){
        console.log('----------------------------文件存储成功-------------------------------------')
        service.getNewCode(function (str) {
          addFontToTTF(str,fileName,function () {
            service.setNewCode(str,codeName,function (code) {
              console.log('----------------------------数据库保存成功-------------------------------------')
              fs.unlink(fileName+'.png', function(err){
                if(err){
                  throw err;
                }
                console.log('文件:'+fileName+'.png   删除成功！');
              })
              fs.unlink(fileName+'.svg', function(err){
                if(err){
                  throw err;
                }
                console.log('文件:'+fileName+'.svg   删除成功！');
              })
              res.send({code: 200, message: "Success", data: true})
            })
          })
        })
      }else{
        res.send(err)
      }
    });


  } catch (ex) {
    logger.error(ex);
    res.send(ex);
  }
})

  const server = app.listen(8082, function () {
    console.log('Express app server listening on port %d', server.address().port);
  });




