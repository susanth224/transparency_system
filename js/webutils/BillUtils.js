var React = require('react');
var BillActions = require('../actions/BillActions');
var BillStore = require('../stores/BillStore');
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
  getBillInfo: function(url){
    $.ajax({
      url: base_url+"/transparencydonations/getBillDetails/v1/",
      type: "POST",
      data: {"data":"'{\"billId\":'"+JSON.stringify(getUrlParameters(url))+"', \"length\":\"10\", \"offset\": \"0\"}'","clientKeyDetailsId":1},
      beforeSend: function(xhr) { 
        xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
      }
    })
    .done(function(data){
      console.log("Bill Utils", data);
      BillActions.getBillInfo(data);
    });
  }
};

module.exports = ajaxCalls;