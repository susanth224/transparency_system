var React = require('react');
var Select = require('react-select');
var DiscussionsActions = require('../actions/DiscussionsActions');
var DiscussionsStore = require('../stores/DiscussionsStore');
var discussionCategoryTags=[];
var discussionCategorys=[];
var category;
var check=true;
var val='';
var tags=[];
var discussionTags=[];
var n=0;
var indexOfCategory;
var SelectComponent = React.createClass({
	onLabelClick: function onLabelClick(data, event) {
		console.log(data, event);
	},
	logChange: function (value) {
	if(value==='')
	{	
		check=true;
		discussionCategoryTags=[];
	}
	else
	{
		category=value;
		indexOfCategory=DiscussionsStore.getCategoryList().indexOf(value);
		discussionTagsList=DiscussionsStore.getTagList();
		discussionCategoryTags=discussionTagsList[indexOfCategory].map(function(tag, index){
			return({'label':tag,'value':tag});
		});
		check=false;
	}
	DiscussionsStore.emitChange();
	},
	render: function render() {
		discussionCategorys = DiscussionsStore.getCategoryList().map(function(tag, index){
			return({'label':tag,'value':tag});
		});
		return React.createElement(
			'div',null,
			React.createElement(Select, {
				onOptionLabelClick: this.onLabelClick,
				value:val ,
				multi: false,
				placeholder: 'Select catagory',
				options: discussionCategorys,
				onChange:this.logChange})
		);
	}
});
var MultiSelectComponent = React.createClass({
	change: function(value){
		tags=[];
		discussionTags=[];
		var categoryIds=DiscussionsStore.getCategoryIds();
		while(value.indexOf(',')!=-1)
		{
			tags[n]={'categoryId':categoryIds[indexOfCategory],"tag":value.substr(0,(value.indexOf(',')))};
			discussionTags[n]=value.substr(0,(value.indexOf(',')));
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
				options: discussionCategoryTags,
				onChange:this.change})
		);
	}
});
var AddDiscussion = React.createClass({
	handleSubmit : function(e){
		e.preventDefault();
		var topic = React.findDOMNode(this.refs.topic).value.trim();
		if(!topic)
			{return;}
		React.findDOMNode(this.refs.topic).value='';
		this.props.onFeedSubmit({"name": topic,"id":0,"upVotes":0,"downVotes":0,"commentsComment":0,"discussionTags":discussionTags,"tags":tags});
	},
	render : function(){
		var selectTags=(check)?'':<MultiSelectComponent/>;
			return(<div className="row col-md-11 col-lg-11 col-sm-11 col-xs-11" style={{"border":"1px solid #898989","backgroundColor":"#e5e5e5", "padding":"0% 3% 3% 0%"}}>
				<form className="form-group">
				<div className="col-md-10 col-lg-10 col-sm-10 col-xs-10"><br/>
						<input type="text" className="form-control" ref="topic" placeholder="Topic"/>
				</div><br/><br/>
					<div className="col-md-5" style={{"margin-top":"1%", "position":"relative"}}><SelectComponent/></div>
					<div className="col-md-5" >{selectTags}</div>
				<div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
				<input type="Submit" className="btn btn-info buttn" value="Initiate Discussion" onClick={this.handleSubmit}/></div>
				</form></div>);
	}

});
module.exports = AddDiscussion;