var React = require('react');
var ProfileDetailsActions = require('../actions/profileDetailsActions');
var ProfileDetailsStore = require('../stores/profileDetailsStore');
var base_url = "http://transparency-alpha.elasticbeanstalk.com";

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
var ajaxRequests = {
getProfileDetails: function(){
  var phoneNumber = getCookie('phone_number');
  phoneNumber=JSON.parse(phoneNumber);
  console.log(phoneNumber);
  $.ajax({
    url: base_url+"/transparencyprofilemodule/getProfileDetails/v1/",
    type: "POST",
    data:{
      "data":"'{\"childUserName\":"+phoneNumber+"}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr){
      console.log("access_token",getCookie("access_token"));
      xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
    },
    async: true
  })
  .done(function(msg){
    ProfileDetailsActions.getProfileDetails(msg);
  })
  .fail(function(msg){
      alert("Server Not Found");
    });
  },
  getListOfMyDonations: function(){
  $.ajax({
    url: base_url+"/transparencydonations/getMyDonations/v1/",
    type: "POST",
    data:{
      "data":"'{\"offset\": 0,\"length\": 1000}'","clientKeyDetailsId":1
    },
    beforeSend: function(xhr) { 
      // change access token later
      xhr.setRequestHeader('Authorization','Bearer ' + "3uOjbVhgWGGffLeS1lVwacFddAICF6");
    },
    async: true
  })
  .done(function(msg){
    console.log("msg profile",msg);
    ProfileDetailsActions.getMyDonations(msg);
  })
  .fail(function(msg){
      alert("my donations Found");
    });
  }
};

module.exports = ajaxRequests;