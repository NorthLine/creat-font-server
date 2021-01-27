var connection=global.connection

function fixData(data){
  return JSON.parse(JSON.stringify(data))
}

function getAll(sucCallback, errCallback){
  try {
    connection.query('SELECT * FROM fontlist', function (error, results, fields) {
      if (error) {
        errCallback(error);
        return;
      }
      sucCallback(fixData(results));
    });
  } catch (e) {
    console.log(e)
    errCallback(e);
  }

}

function getRecent(sucCallback, errCallback){
  try {
    connection.query('SELECT code FROM fontlist ORDER BY creatDate DESC LIMIT 1', function (error, results, fields) {
      if (error) {
        errCallback(error);
        return;
      }
      sucCallback(fixData(results));
    });
  } catch (e) {
    console.log(e)
    errCallback(e);
  }
}

function dateFormat( date) {
  var fmt="YYYY-mm-dd HH:MM"
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
function setNewCode(code,name,succ){
  try {
    var getId=generateUUID();
    var Times=dateFormat(new Date())
    var queryStr="INSERT INTO fontlist (id, code, `group`, creatDate, delFalg) VALUES ('"+getId+"', '&#xe"+code+";', '"+name+"', '"+Times+"', 0)";
    console.log(queryStr+'_______________________________');
    connection.query(queryStr, function (error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      succ(fixData(results));
    });
  } catch (e) {
    console.log(e)
  }
}


module.exports={getAll,getRecent,setNewCode}
