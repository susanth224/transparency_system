    var access_token;
    var base_url="http://transparency-alpha.elasticbeanstalk.com";

    $("#login-user").click(function(){
	    $.ajax({
		  type: "POST",
		  url: base_url+"/transparencyprofilemodule/loginOrRegisterUser/v1/",
		  data:{
			"data":"'{\"userName\":\"9666851953\"}'","clientKeyDetailsId":1
		  },
		  dataType: "json"
		})
		.done(function(msg){
			console.log(msg.userStatus);
		});
	});
	$("#access-token").click(function(){
	    $.ajax({
		  type: "POST",
		  url: "http://alpha-ibq.elasticbeanstalk.com/o/token/",
		  beforeSend: function(xhr) { 
		  	xhr.setRequestHeader("Authorization", "Basic " + btoa("transparencyweb:transparencyweb")); 
		  },
		  data:  {"grant_type":"password","username":"9666851953", "password": "123456", 
		  "scope":"read write"}
		})
		.done(function( msg ) {
		    access_token = msg.access_token;
		    console.log(access_token);
		});
	});
	$("#submituserdetails").click(function(){
	    $.ajax({
	      url: base_url+"/transparencyprofilemodule/insertOrUpdateFullProfileDetails/v1/",
		  type: "POST",
		  data:{
			"data":"'{\"referralUserName\":\"9666851953\",\"userDetails\":{\"emailId\":\"ranjith@gmail.com\",\"interestedIn\":\"Donation\",\"college\":\"BITS\",\"company\":\"iBrain\",\"deviceType\":\"Android\",\"homeCountry\":\"India\",\"homeDistrict\":\"East Godavari\",\"homePIN\":\"533003\",\"primaryNumber\":\"9666851953\",\"gender\":\"male\",\"age\":\"21\", \"homeState\":\"AP\",\"stayingCountry\":\"India\",\"name\":\"Deepak\",\"completedFieldsCount\":0,\"presentOccupation\":\"STUDENT\"},\"userName\":{\"username\":\"9666851953\"}}'","clientKeyDetailsId":1
		  },
		  beforeSend: function(xhr) { 
		   	xhr.setRequestHeader('Authorization','Bearer ' + access_token);
		  }
	 	})
		.done(function(msg){
		  console.log("Submit user details", msg);
		});
	});
	$("#profile-details").click(function(){
	    $.ajax({
	      url: base_url+"/transparencyprofilemodule/getProfileDetails/v1/",
		  type: "POST",
		  data:{
			"data":"'{\"childUserName\":\"9666851953\"}'","clientKeyDetailsId":1
		  },
		  beforeSend: function(xhr){ 
		   	xhr.setRequestHeader('Authorization','Bearer ' + access_token);
		  }
	 	})
		.done(function(msg){
		  console.log( "Profile Details", msg);
		});
	});