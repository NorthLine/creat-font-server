var config=require('./configure')
var mysql=require('mysql')

global.connection = mysql.createConnection(config.mysql);

var stratConnect=function () {
  global.connection.connect(function(err) {
    if (err) {
      console.error('---------------------------------------------------------------------------------------------\n' +
        '--------------------------------------连接报错------------------------------------------\n' +
        '---------------------------------------------------------------------------------------------\n' +
        err.stack+'\n---------------------------------------------------------------------------------------------');
      return;
    }

    console.log('-------------------------------当前连接ID: ' + global.connection.threadId+'------------------------------------------------------------------------');
  });
}

var EndConnect=function () {
  console.log('-------------------------------当前连接ID: ' + global.connection.threadId+'  即将关闭------------------------');
  global.connection.destroy();
  console.log('-------------------------------mysql已断开-----------------------');
}

module.exports={ stratConnect, EndConnect }
