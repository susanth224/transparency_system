var React = require('react');
var NotificationActions = require('../actions/NotificationActions')
var NotificationStore = require('../stores/NotificationStore')
var allNotifications=[{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"1 min ago"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"2 min ago"},{id:1,header:"About internship",body:"Internship is ready to over",read:true,time:"3 min ago"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"10 mins ago"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Today"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Today"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Today"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Today"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Today"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Yesterday"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Yesterday"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Yesterday"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Yesterday"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Yesterday"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Yesterday"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"Yesterday"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"Yesterday"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"10 July 2015 10:30AM"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"10 July 2015 10:30AM"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"10 July 2015 10:30AM"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"10 July 2015 10:30AM"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"10 July 2015 10:30AM"},{id:1,header:"About internship",body:"Internship is ready to over",read:false,time:"10 July 2015 10:30AM"},{id:2,header:"About iBgroups",body:"This is going to rock",read:true,time:"10 July 2015 10:30AM"},{id:1,header:"About Raj",body:"he he he",read:false,time:"10 July 2015 10:30AM"},{id:2,header:"About me",body:"Ha ha ha",read:true,time:"10 July 2015 10:30AM"}];
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';
}
var ServerCalls = {
	getNotifications: function(offset,length)
	{
		console.log("notification server call");
		$.ajax({
				url: "http://transparency-alpha.elasticbeanstalk.com/transparencyfeeds/getNotificationFeeds/v1/",
				type: "POST",
				data:{
				"data":"'{\"offset\":"+JSON.stringify(offset)+",\"length\":"+JSON.stringify(length)+"}'","clientKeyDetailsId":1
				},
				beforeSend: function(xhr) { 
					xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
				}
			})
			.done(function(msg){
			  console.log("done ha",msg);
			  NotificationActions.getdata(msg)
			  
			})
			.fail(function(msg){
			  console.log("failed to get notifications");
			  NotificationActions.getdata(allNotifications);
			});
			
	},
	markasRead: function(id)
	{
		console.log("mark as read server call");
		$.ajax({
				url: "http://transparency-alpha.elasticbeanstalk.com/transparencyprofilemodule/readAnnouncement/v1/",
				type: "POST",
				data:{
				"data":"'{\"announcementId\":"+id+"}'",
			"clientKeyDetailsId":1
				},
				beforeSend: function(xhr) { 
					xhr.setRequestHeader('Authorization','Bearer ' +getCookie("access_token"));
				}
			})
			.done(function(msg){
			  console.log("done marking",msg);
			  
			})
			.fail(function(msg){
			  console.log("failed to Report");
			});
			
	},
	getUnreadRead: function()
	{
		console.log("getting unreadcount");
		NotificationActions.getunreadcount(5);
		$.ajax({
				url: "http://transparency-alpha.elasticbeanstalk.com/transparencyprofilemodule/getUnreadAnnouncementsCount/v1/",
				type: "POST",
				data:{
				"data":"'{:}'",
			"clientKeyDetailsId":1
				},
				beforeSend: function(xhr) { 
					xhr.setRequestHeader('Authorization','Bearer ' + getCookie("access_token"));
				}
			})
			.done(function(msg){
			  console.log("done unreadcount",msg);
			  
			  
			})
			.fail(function(msg){
			  console.log("failed to Report");
			});
			
	},
};
module.exports = ServerCalls;
