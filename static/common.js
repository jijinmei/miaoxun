var se
function locations(name, url){
  if (!url) {
    url = window.location.href;
    console.log(url)
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}




function JSONS(obj,where){
  console.log(where)
  console.log(JSON.parse(JSON.stringify(obj)))
}
var Boss="http://m1-ymboss.leanapp.cn/api/v1/"
console.log(Boss)
var Boss1="http://m1-ymboss.leanapp.cn/"//公共地址
var sd = window.localStorage.getItem('user_id');
var sessiontoken=sd//'rmdqrg8ayjm104o1q6m5uayvd'//6qzpmkebwv13gm481b8h56945   rmdqrg8ayjm104o1q6m5uayvd
var sp = window.localStorage.getItem('user_phone');

function aa(){
  console.log("aa")
}

function tree_prop(){
  let that = this;
  _ = that.trees;
  let _json = that.$store.state.json;
  _.forEach(function(val){
    let _type = _json.type[val.mu_type];
    let _required = "必填项：";
    let _optional = "选填项：";
    let _arr_type = ["required","optional"];
    for(let i = 0 ; i < _arr_type.length ; i++){
      _type[_arr_type[i]].forEach(function(val1){
        let _att = _json.company[val1];
        let _str = "";
        if(_att.status==1&&val["mu_"+_att.name+"_min"]){
          let _min = val["mu_"+_att.name+"_min"];
          let _max = val["mu_"+_att.name+"_max"];       
          if(_min!=_max){
            _str = val1 + ":" + _min + "-" + _max + _att.unit + ",";
          }else{
            _str = val1 + ":" + _min + _att.unit + ",";
          }
        }else
        if(_att.status==2&&val["mu_"+_att.name]){
          _str = val1 + ":" + val["mu_"+att.name];
        }       
        if(_att.status=="no"){
          let _unit = "";
          if(JSON.stringify(_att.exception.name).indexOf(val.mu_type)!=-1){
            _unit = _att.exception.unit;
          }else{
            _unit = _att.unit;
          }
          let _min = val["mu_"+_att.name+"_min"];
          let _max = val["mu_"+_att.name+"_max"];
          if(_min){
            if(_min!=_max){
              _str = val1 + ":" + _min + "-" + _max + unit + ",";
            }else{
              _str = val1 + ":" + _min + unit + ",";
            }
          }
        }
        if(i == 0){
          _required += _str;
        }else{
          _optional += _str;
        }
      })
    }
    val.required = _required;
    val.optional = _optional;
  })
}

