var React = require('react');
var Select = require('react-select');
var CommentActions = require('../actions/CommentActions')
var CommentStore = require('../stores/CommentStore')
var transparencyAPIUtils = require('../webutils/ajax')
var DiscussionsActions = require('../actions/DiscussionsActions');
var DiscussionsStore = require('../stores/DiscussionsStore');
var discussionIds={};
var discussionData={};
var check=true;
var val='';
var filter="Popular";
var tags=[];
var commentTags=[];
var n=0;
var flag2=0;
var category;
var indexOfCategory;
var discussionDetails={};
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
var Filter=React.createClass({
	getInitialState: function(){
		var commetnssFilters1 = CommentStore.getCommentFliterList().map(function(filter, index)
			{
				return({'label':filter.filterDescription,'value':filter.filterDescription});
			});
		return ({commetnssFilters:commetnssFilters1});
	},
	changeFilter: function(value){
		if(value==='')
		{
			value="Popular";
			filter="Popular";
		}
		else
		filter=value;
		var discussionData = JSON.parse(transparencyAPIUtils.getCookie("Discussion"));
		transparencyAPIUtils.genericWebAPICall(
		"/transparencyactivitymodule/getListOfCommentsNew/v1/",
      	{"proposalId":transparencyAPIUtils.getProposalId(),"discussionId":discussionData.discussionId,"filterBy":filter},
      	function(msg){
      	  console.log("List of comments", msg);
	      CommentActions.getAllComments(msg);
	    },function(msg){
	      console.log("Failed to get the list of comments!");
	    });
	},
	render: function render() {
		return React.createElement(
			'div',null,
			React.createElement(Select, {
				onOptionLabelClick: this.onLabelClick,
				value:filter,
				multi: false,
				placeholder: 'Select Filter',
				options: this.state.commetnssFilters,
				onChange:this.changeFilter
				})
		);
	}
	
});
var CommentBox=React.createClass({
	getInitialState : function(){
		discussionIds=JSON.parse(getCookie("Discussion"));
		var discussionData = JSON.parse(transparencyAPIUtils.getCookie("Discussion"));
		transparencyAPIUtils.genericWebAPICall(
		"/transparencyactivitymodule/getListOfCommentsNew/v1/",
      	{"proposalId":transparencyAPIUtils.getProposalId(),"discussionId":discussionData.discussionId,"filterBy":filter},
      	function(msg){
      	  console.log("List of comments", msg);
	      CommentActions.getAllComments(msg);
	    },function(msg){
	      console.log("Failed to get the list of comments!");
	    });
		return ({Comments_info:CommentStore.getAll({"discussionId":discussionIds.discussionId, "proposalId":discussionIds.proposalId})});
		},
	componentDidMount: function(){
        CommentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        CommentStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
    	discussionDetails=CommentStore.getDiscussion();
		this.setState({Comments_info:CommentStore.getAll({"discussionId":discussionIds.discussionId, "proposalId":discussionIds.proposalId})});
	},
	onSubmit : function(comment)
	{
		CommentActions.createComment(comment);
	},
	upvote : function(){
		if(discussionData.id!=0)
		{
			if(discussionData.vote!="UPVOTE")
				DiscussionsActions.upvote({"id":discussionData.id,"identity":this.props.id});
		}
	},
	downvote : function(){
		if(discussionData.id!=0)
		{
			if(discussionData.vote!="DOWNVOTE")
				DiscussionsActions.downvote({"id":discussionData.id,"identity":this.props.id});
		}
	},
	render : function(){
		var all_comments=[];
		if(this.state.Comments_info.length>0)
			flag2=1;
		var commentFilters=(flag2===1) ? <Filter/> : '';
		return(				
			<div className="col-md-10 col-md-offset-1">
				<div className="col-md-12 well">
					<div className="col-md-10 col-md-offset-1">
						<div className="media">
							<div className="media-left"><img className="media-object" src="img\discussion.png" aria-hidden="true" style={{width:"3em"}}/></div>
	      					<div className="media-body">
	        					<h4 className="media-heading">{discussionDetails.username}</h4>
	        					<p className="media-heading lead">{discussionDetails.name}</p>
	      					</div>
	    				</div>
					</div>
					<div className="col-md-10 col-md-offset-1">
						<div className="col-md-3"><span style={{'cursor':'pointer'}}>Comments {discussionDetails.commentsCount}</span></div>
						<div className="col-md-4">Disscussion value {discussionDetails.points}</div>
					</div>
				</div>
				<div className="col-md-11 col-md-offset-1">
					<div>
						<CommentForm discussionId={discussionIds.discussionId} proposalId={discussionIds.proposalId} onCommentSubmit={this.onSubmit}/>
					</div>
					<div className="row">
						<div className="col-md-3 col-md-offset-8">
						{commentFilters}
						</div>
					</div>
					<div>
						<CommentList discussionId={discussionIds.discussionId} proposalId={discussionIds.proposalId} comments={this.state.Comments_info}/>
					</div>
				</div>
			</div>
			);
		}
});
var SelectCategory = React.createClass({
	onLabelClick: function onLabelClick(data, event) {
		console.log(data, event);
	},
	logChange: function (value) {
	console.log('Select value changed: ' + value);
	if(value==='')
	{	
		check=true;
		discussionCategoryTags=[];
	}
	else
	{
		category=value;
		indexOfCategory=CommentStore.getCommentCategoryList().indexOf(value);
		commentTagsList=CommentStore.getCommentTagList();
		commentCategoryTags=commentTagsList[indexOfCategory].map(function(tag, index){
			return({'label':tag,'value':tag});
		});
		check=false;
	}
	CommentStore.emitChange();
	},
	render: function render() {
		commentCategorys = CommentStore.getCommentCategoryList().map(function(tag, index){
			return({'label':tag,'value':tag});
		});
		return React.createElement(
			'div',null,
			React.createElement(Select, {
				onOptionLabelClick: this.onLabelClick,
				value:val ,
				multi: false,
				placeholder: 'Select catagory',
				options: commentCategorys,
				onChange:this.logChange})
		);
	}
});
var SelectCommentTags = React.createClass({
	change: function(value){
		tags=[];
		commentTags=[];
		var categoryIds=CommentStore.getCommentCategoryIds();
		while(value.indexOf(',')!=-1)
		{
			tags[n]={'categoryId':categoryIds[indexOfCategory],"tag":value.substr(0,(value.indexOf(',')))};
			commentTags[n]=value.substr(0,(value.indexOf(',')));
			value=value.substr((value.indexOf(','))+1,value.length);
			n++;
		}
		tags[n]={'categoryId':categoryIds[indexOfCategory],"tag":value};
	},
	render: function render() {
		return React.createElement(
			'div',null,
			React.createElement(Select, {
				value:'' ,
				disabled:check,
				multi: true,
				placeholder: 'Select your tag(s)',
				options: commentCategoryTags,
				onChange:this.change})
		);
	}
});
var CommentForm=React.createClass({
	
	CommentSubmit: function(e)
	{
		e.preventDefault();
		{this._onChange}
		var name="sar";
		var comment = React.findDOMNode(this.refs.comment).value.trim();
		var discussionId=this.props.discussionId;
		var proposalId=this.props.proposalId;
		if(!comment)
			{return;}
		React.findDOMNode(this.refs.comment).value='';
		this.props.onCommentSubmit({"comment":comment,"tags":tags,"commentTags":commentTags,"discussionId":discussionId,"proposalId":proposalId,"upVotes":0,"downVotes":0,"id":0});
	},
	render:function()
	{
		var selectCommentTags=(check)?'':<SelectCommentTags/>;
		return(
		<div className="row well">
		<form  onSubmit={this.CommentSubmit}>
			<div className="col-md-10">
				<div className="col-md-12">
					<input className="form-control" type="textarea" ref="comment" placeholder="Enter your Comment"/>
				</div>
				<div className="col-md-6"><SelectCategory/></div>
				<div className="col-md-6">{selectCommentTags}</div>
			</div>
			<div className="col-md-1">
				<br/><br/>
				<input className="btn btn-primary" type="submit" value="post"/>
			</div>
		</form>
		</div>
		
		);
	}
});
var CommentList = React.createClass({
	render : function(){
		var proposalId=this.props.proposalId;
		var discussionId=this.props.discussionId
		var commentNodes = this.props.comments.map(function(comment_info, index){
			var identity=index;
			return (
				<Comment proposalId={proposalId} identity={identity} key={index} comment_info={comment_info}/>
				);
			});
		return(
			<div>
				{commentNodes}
			</div>
			);
	 }
});
var Comment=React.createClass({
	comment_Upvote: function(){
		if(this.props.comment_info.id!=0 && this.props.comment_info.vote!="UPVOTE")
		{
			var discussionId=this.props.comment_info.discussion;
			var commentId=this.props.comment_info.id;
			var proposalId=this.props.proposalId;
			console.log("here",this.props.identity);
			CommentActions.VoteComment({vote:"UPVOTE","discussionId":discussionId,"commentId":commentId,"proposalId":proposalId,"identity":this.props.identity});
		}
	},
	comment_Downvote: function(){
		if(this.props.comment_info.id!=0  && this.props.comment_info.vote!="DOWNVOTE")
		{
			var discussionId=this.props.comment_info.discussion;
			var commentId=this.props.comment_info.id;
			var proposalId=this.props.proposalId;
			CommentActions.VoteComment({vote:"DOWNVOTE","discussionId":discussionId,"commentId":commentId,"proposalId":proposalId,"identity":this.props.identity});
		}

	},
	comment_Delete: function(){
		if(this.props.comment_info.id!=0)
		{	
			var discussionId=this.props.comment_info.discussion;
			var commentId=this.props.comment_info.id;
			var proposalId=this.props.proposalId;
			CommentActions.deleteComment({"discussionId":discussionId,"commentId":commentId,"proposalId":proposalId,"identity":this.props.identity});
			//transparencyAPIUtils.deleteComment({"discussionId":discussionId,"commentId":commentId,"proposalId":proposalId});
		}
	},
	comment_Report: function(){
		if(this.props.comment_info.id!=0)
		{
			var discussionId=this.props.comment_info.discussion;
			var commentId=this.props.comment_info.id;
			var proposalId=this.props.proposalId;
			transparencyAPIUtils.genericWebAPICall(
		"/transparencyactivitymodule/reportAComment/v1/",
      	{"discussionId":discussionId,"commentId":commentId,"proposalId":proposalId},
      	function(data){
      	  console.log("Report on a comment", data);
	      CommentActions.Report(data);
	    },function(msg){
	      console.log("Failed to report the comments!");
	    });	
		}
	},
	render:function(){
		var newtime=new Date().getTime();
		var tags=this.props.comment_info.commentTags.map(function(tag, index)
			{
				return(<span className="badge">{tag}</span>);
			});
		return(
		<div>
			<div  className="row well">
				<div className="col-md-10">
					<div className="col-md-12">
						<text id="name">{this.props.comment_info.username}</text><br/>
						<text id="name" className="lead">{this.props.comment_info.comment}</text><br/>
					</div>
					<div className="col-md-3">
						<span className="badge">{this.props.comment_info.upVotes}</span>&nbsp;
						<span className="glyphicon glyphicon-thumbs-up gicons_up" style={(this.props.comment_info.vote==="UPVOTE")?{'cursor':'pointer',"color":"blue"}:{'cursor':'pointer',"color":"green"}} onClick={this.comment_Upvote}></span>&nbsp;&nbsp;&nbsp;
						<span className="glyphicon glyphicon-thumbs-down gicons_down" style={(this.props.comment_info.vote==="DOWNVOTE")?{'cursor':'pointer',"color":"blue"}:{'cursor':'pointer',"color":"orange"}} onClick={this.comment_Downvote}></span>
						<span className="badge">{this.props.comment_info.downVotes}</span>&nbsp;
					</div>
					<div className="col-md-9">
						{tags}
					</div>
				</div>
				<div className="col-md-2">
					<span className="glyphicon glyphicon-remove gicons_remove" style={{'cursor':'pointer','color':'tomato'}} onClick={this.comment_Delete}></span><br/>
					<span className="glyphicon glyphicon-flag gicons_flag" style={{'cursor':'pointer'}} onClick={this.comment_Report}></span><br/>
				</div>
			</div>
		</div>
		
);
	}
});
module.exports = CommentBox;
