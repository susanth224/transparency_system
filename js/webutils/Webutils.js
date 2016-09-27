var React = require('react');
var NGOActions = require('../actions/NGOActions');
var NGODetailsStore = require('../stores/NGODetailsStore');
var cards=[];
var access_token;
var base_url="http://transparency-alpha.elasticbeanstalk.com";
var CampaignId;

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}


var webAPIUtils = {
	Logincheck:function(){
		console.log("hi i am Logincheck");
		name=$("#name").val();
    	pass = $("#pass").val();
    	console.log(name,pass);
    	name1=JSON.stringify(name);
	    $.ajax({
		  type: "POST",
		  url: base_url+"/transparencyprofilemodule/loginOrRegisterUser/v1/",
		  data:{

			"data":"'{\"userName\":'"+name1+"'}'",
			"clientKeyDetailsId":1
		  },
		  dataType: "json"
		})
		.done(function(msg){
			console.log(msg.userStatus);
			if(msg.userStatus=="OTP_SENT"){
					 $.ajax({
					  type: "POST",
					  url: "http://alpha-ibq.elasticbeanstalk.com/o/token/",
					  beforeSend: function(xhr) { 
					  	xhr.setRequestHeader("Authorization", "Basic " + btoa("transparencyweb:transparencyweb")); 
					  },
					  data:  {"grant_type":"password","username":name, "password": pass, 
					  "scope":"read write"}
					})
					.done(function( msg ) {
					    access_token = msg.access_token;
					    console.log(access_token);
					    document.cookie="access_token="+access_token;
					    document.cookie="phone_number="+name;
					    $("#logout").show();
					   // document.cookie=name+"="+access_token;
					    $(location).attr('href',"#home");

					})
					.fail(function() {
    				alert( "Invalid Creditionals" );
  					});
				
			}
		});

	},

	getDonorsList : function(){
		NGOActions.donorslist([{"Name":"U.Bhavani","Amount":"100","date":"20-12-1995"},{"Name":"R.RajKumar","Amount":"100","date":"20-12-1995"},{"Name":"M.David","Amount":"1000","date":"16-07-1995"}]);
		/*
		if(access_token==undefined){
				alert("please Login First");
    			$(location).attr('href',"#login");
    			return;
    			}
    			*/
    	},
	getCardsDetails : function(){
		  
	$.ajax({

		  type: "POST",
		  url: base_url+"/transparencyactivitymodule/getProposalBriefDetails/v1/",
		  data:{"data":"'{\"category\":\"6\",\"language\":\"English\",\"offset\":0,\"length\":10}'","clientKeyDetailsId":1},
		  beforeSend: function(xhr) { 
		  	console.log(access_token);
            xhr.setRequestHeader('Authorization','Bearer '+getCookie("access_token"));
          }
		  
		})
		.done(function(msg){
			NGOActions.receivedcards(msg);
		})
		.fail(function(){
			NGOActions.receivedcards([
							
							{"description": "Vegetable Bills description hello chitti how are you how is your day","header": "Vegetable Bills","proposalId": "14"},
							{"description": "Vegetable Bills description","header": "Vegetable Bills","proposalId": "21"}

						   ]);

            
         });
	},
	getCampaignsList :function(offset,length){
	console.log("access_token",access_token,offset,length);
	$.ajax({
		  type: "POST",
		  url: base_url+"/transparencycampaign/getListOfKampaigns/v1/",
		  data:{"data":"'{\"offset\":"+JSON.stringify(offset)+",\"length\":"+JSON.stringify(length)+" }'","clientKeyDetailsId":1},
		  beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','Bearer '+getCookie("access_token") );
          }
		  
		})
		.done(function(msg){
			console.log("I am done"+msg);
			console.log("After done"+access_token);
			NGOActions. getListOfCampaigns(msg);
			CampaignId=msg[0]["kampaignId"];
			console.log("Here "+CampaignId);
		})
		.fail(function(){
            console.log("In fail"+access_token);
			NGOActions.getListOfCampaigns([
							{
							  "kampaignId": "2",
							  "title": "Laptops",
							  "description": "I need 70 laptops",
							  "thumbnail": "image upload",
							  "timeLeft": "4",
							  "pledgedQuantity": "30",
							  "fulfilledQuantity": "20",
							  "goal": "70",
							  "fundedQunatity": "0",
							  "postfix": "laptops"
							},
							{
							  "kampaignId": "2",
							  "title": "Laptops",
							  "description": "I need 70 laptops",
							  "thumbnail": "image upload",
							  "timeLeft": "4",
							  "pledgedQuantity": "30",
							  "fulfilledQuantity": "20",
							  "goal": "70",
							  "fundedQunatity": "0",
							  "postfix": "laptops"
							}
						   ]);

            
         });

	},
	getListOfSubKampaigns :function(offset,length){

	$.ajax({
		  type: "POST",
		  url: base_url+"/transparencycampaign/getListOfSubKampaigns/v1/",
		  data:{"data":"'{\"kampaignId\":1,\"offset\":"+JSON.stringify(offset)+",\"length\":"+JSON.stringify(length)+" }'","clientKeyDetailsId":1},
		  beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','Bearer '+getCookie("access_token"));
          }
		  
		})
		.done(function(msg){
			console.log("I getListOfSubKampaigns"+msg+msg.length);
			console.log("After done"+access_token);
			NGOActions. getListOfSubKampaigns(msg);
		})
		.fail(function(){
            console.log("In fail"+access_token);
			NGOActions.getListOfSubKampaigns([
							{
 							 	"kampaignId": 2,
  								"title": "Laptops",
  								"subKampaignerName": "Salma",
  								"pledgedQuantity": 20,
 							 	"fulfilledQuantity": 10,
 							 	"postfix": "days"
							},
							{
 							 	"kampaignId": 2,
  								"title": "Laptops",
  								"subKampaignerName": "Salma",
  								"pledgedQuantity": 20,
 							 	"fulfilledQuantity": 10,
 							 	"postfix": "days"
							},
							{
 							 	"kampaignId": 2,
  								"title": "Laptops",
  								"subKampaignerName": "Salma",
  								"pledgedQuantity": 20,
 							 	"fulfilledQuantity": 10,
 							 	"postfix": "days"
							},
							
						   ]);

            
         });

	}
};
module.exports=webAPIUtils;
