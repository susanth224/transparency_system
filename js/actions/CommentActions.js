var AppDispatcher = require('../dispatcher/AppDispatcher');
var CommentConstants = require('../constants/CommentConstants');

var CommentActions = {
	getAllComments: function(comments_info){
		AppDispatcher.dispatch({actionType: 
            CommentConstants.COMMENT_GETALL,comments_info:comments_info});
		},
	createComment: function(comment){
		console.log("new");
		AppDispatcher.dispatch({actionType: 
            CommentConstants.COMMENT_NEWCREATE,comment:comment});
	},
    create: function(comment){
		console.log("created in comments",comment);
		
		AppDispatcher.dispatch({actionType: 
            CommentConstants.COMMENT_CREATE,comment:comment});
	},
	Delete:function(comment_info){
		AppDispatcher.dispatch({actionType: 
         CommentConstants.COMMENT_DELETE,comment_info:comment_info});
	},
	VoteComment:function(comment_info)
	{
		AppDispatcher.dispatch({actionType: 
         CommentConstants.COMMENT_VOTE,comment_info:comment_info});
	},
	deleteComment:function(comment_info)
	{
		AppDispatcher.dispatch({actionType: 
         CommentConstants.COMMENT_DELETES,comment_info:comment_info});
	},
	Vote:function(comment_info)
	{
		AppDispatcher.dispatch({actionType: 
         CommentConstants.COMMENT_VOTES,comment_info:comment_info});
	},
	Report:function(comment_info)
	{
		AppDispatcher.dispatch({actionType: 
            CommentConstants.COMMENT_REPORT,comment_info:comment_info});
	},

};
module.exports = CommentActions;
