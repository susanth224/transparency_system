var React = require('react');
var StockBookActions = require('../actions/StockBookActions');
var StockBookStore = require('../stores/StockBookStore');
var base_url = "http://transparency-alpha.elasticbeanstalk.com";

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}

function getUrlParameters(billurl){
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = billurl,
    params = {},
    match;
    while(match = regex.exec(url)) {
            params[match[1]] = match[2];
    }
    return params["billId"];
}


var ajaxCalls = {
  getStockBookInfo: function(url){
    $.ajax({
      url: base_url+"/transparencydonations/getBillDetails/v1/",
      type: "POST",
      data: {"data":"'{\"billId\":'"+JSON.stringify(getUrlParameters(url))+"', \"length\":\"10\", \"offset\": \"0\"}'","clientKeyDetailsId":1},
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(data){
      console.log("StockBook Utils", data);
      StockBookActions.getStockBookInfo(data);
    });
  }
};

module.exports = ajaxCalls;