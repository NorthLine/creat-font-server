const Query=require('../sql/query');

function getAll(sucCallback, errCallback){
  Query.getAll(sucCallback, errCallback)
}


function getNewCode(getFn){
  Query.getRecent(function (suc) {
    try{
      var codeString=suc[0].code;
      var codeNumber=codeString.substring(4);
      var codeToTen=parseInt(codeNumber,16)+1;
      var final16=codeToTen.toString(16);
      getFn(final16)
    }catch (e) {
      console.log(e)
    }
  });
}

function setNewCode(code,name,succ){
  Query.setNewCode(code,name,function (suc) {
    try{
      succ(suc)
    }catch (e) {
      console.log(e)
    }
  });
}


module.exports={getAll,getNewCode,setNewCode};
