var React = require('react');
var DiscussionsActions = require('../actions/DiscussionsActions');
var DiscussionsStore = require('../stores/DiscussionsStore');

var Discussions = React.createClass({
	upVote : function(){
		if(this.props.discussion.id!=0)
		{
			if(this.props.discussion.vote!="UPVOTE")
				DiscussionsActions.discussionUpVote({"id":this.props.discussion.id,"identity":this.props.id});
		}
	},
	downVote : function(){
		if(this.props.discussion.id!=0)
		{
			if(this.props.discussion.vote!="DOWNVOTE")
				DiscussionsActions.discussionDownVote({"id":this.props.discussion.id,"identity":this.props.id});
		}
	},
	comments : function(){
		if(this.props.discussion.id!=0)
		{
			document.cookie = "DiscussionData"+"="+JSON.stringify(this.props.discussion);
			document.cookie = "Discussion"+"="+JSON.stringify({"discussionId":this.props.discussion.id});
		}
	},
	render : function(){
		var tags=this.props.discussion.discussionTags.map(function(tag, index)
			{
				return(<span className="badge">{tag}</span>);
			});
		
		return(
			<div className="row">
				<div className="col-md-12">
					<div className="media">
						<div className="media-left"><img className="media-object" src="img\discussion.png" aria-hidden="true" style={{width:"3em"}}/></div>
      					<div className="media-body">
        					<h4 className="media-heading">{this.props.discussion.username}</h4>
        					<p className="media-heading lead">{this.props.discussion.name}</p>
      					</div>
      					<div className="media-right">
      						<div className="media"><span className="glyphicon glyphicon-thumbs-up" style={(this.props.discussion.vote==="UPVOTE")?{'cursor':'pointer',"color":"blue"}:{'cursor':'pointer',"color":"green"}} aria-hidden="true" onClick={this.upVote}/></div>
							<div className="media">{this.props.discussion.upVotes-this.props.discussion.downVotes}</div>
							<div className="media"><span className="glyphicon glyphicon-thumbs-down" style={(this.props.discussion.vote==="DOWNVOTE")?{'cursor':'pointer',"color":"blue"}:{'cursor':'pointer',"color":"orange"}} aria-hidden="true" onClick={this.downVote}/></div>
      					</div>
    				</div>
				</div>
				<div className="col-md-12">
					<div className="col-md-3"><span style={{'cursor':'pointer'}} onClick={this.comments}><a href={"#vr1caps/discussion/"+this.props.discussion.id+"/commentbox"}>Comments {this.props.discussion.commentsCount}</a></span></div>
					<div className="col-md-3">Disscussion value {this.props.discussion.points}</div>
					<div className="col-md-6">
					{tags}

					</div>
					<hr/>
				</div>
			</div>
		);
	}
});
module.exports = Discussions;