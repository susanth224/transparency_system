var React = require('react');
var PollsDisplay = require('./PollsDisplay.react');
var a=0;
var length;
var PollsQuestions = React.createClass({
	render : function(){
		console.log("in Poll Questions Objects ===>",this.props.feeds,"<===");
		
		if(a!=0)
		{length=this.props.feeds.length
		var AllDiscussions = this.props.feeds.map(function(feed, index){
			return (<div>
				<PollsDisplay feed={feed} length={length} id = {Number(index)} key = {index}>
				</PollsDisplay>
				</div>
			);
		});
	}
	a++;
		return(
			<div className="col-md-12s">
				{AllDiscussions}
			</div>
		);
	}
});
module.exports = PollsQuestions;