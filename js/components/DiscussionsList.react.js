var React = require('react');
var DiscussionsActions = require('../actions/DiscussionsActions');
var Discussions = require('./Discussions.react');
var DiscussionsList = React.createClass({
	render : function(){
		var AllDiscussions = this.props.discussions.map(function(discussion, index){
			return (
				<Discussions discussion={discussion} id = {index} key = {index}>
				</Discussions>
			);
		});
		return(
			<div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
				{AllDiscussions}
			</div>
		);
	}
});
module.exports = DiscussionsList;