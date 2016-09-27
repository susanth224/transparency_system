var React = require('react');
var Select = require('react-select');
var AddDiscussion = require('./AddDiscussion.react');
var DiscussionsList = require('./DiscussionsList.react');
var DiscussionsActions = require('../actions/DiscussionsActions');
var DiscussionsStore = require('../stores/DiscussionsStore');
var transparencyAPIUtils = require('../webutils/ajax');
var filter="Popular";
var Filter=React.createClass({
	getInitialState: function(){
		var discussionFilters1 = DiscussionsStore.getDiscussionFliterList().map(function(filter, index)
			{
				return({'label':filter.filterDescription,'value':filter.filterDescription});
			});
		return ({discussionFilters:discussionFilters1});
	},
	changeFilter: function(value){
		if(value==='')
		{
			value="Popular";
			filter="Popular";
		}
		else
			filter=value;
		transparencyAPIUtils.genericWebAPICall(
		"/transparencyactivitymodule/getDiscussionAndComments/v1/",
      	{"proposalId":transparencyAPIUtils.getProposalId(),"filterBy":filter},
      	function(msg){
      	  console.log("List of Discussions", msg);
	      DiscussionsActions.receiveDiscussions(msg);
	    },function(msg){
	      console.log("Failed to get the list of discussions!");
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
				options: this.state.discussionFilters,
				onChange:this.changeFilter
				})
		);
	}
	
});
var DiscussionsForum = React.createClass({
	getInitialState : function(){
		/*
		transparencyAPIUtils.genericWebAPICall(
		"/transparencyactivitymodule/getDiscussionAndComments/v1/",
      	{"proposalId":transparencyAPIUtils.getProposalId(),"filterBy":filter},
      	function(msg){
      	  console.log("List of Discussions", msg);
	      DiscussionsActions.receiveDiscussions(msg);
	    },function(msg){
	      console.log("Failed to get the list of discussions!");
	    });
*/
		return ({data:DiscussionsStore.getAll()});

	},
	onSubmit: function(discussion){
		DiscussionsActions.createDiscussion(discussion);
	},
	render : function(){
		var discussionList = (this.state.data.length>0) ? <DiscussionsList discussions={this.state.data}/> :'';
		var Discussionfilters=(this.state.data.length>0) ? <Filter/> : '';
		
		return(
			<div className="col-md-12 col-md-offset-1">
				<AddDiscussion onFeedSubmit={this.onSubmit}/>
				<div className="row discussionFilterStyle"><div className="col-xs-8 col-sm-8 col-lg-3 col-md-3 col-xs-offset-2 col-sm-offset-2  col-md-offset-8 col-md-offset-8 ">{Discussionfilters}</div></div>
				<br/><br/>
				{discussionList}
			</div>
		);
	},
    componentDidMount: function(){
        DiscussionsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        DiscussionsStore.removeChangeListener(this._onChange);
    },
	_onChange: function(){
		this.setState({data: DiscussionsStore.getAll()});
	}
});
module.exports = DiscussionsForum;
