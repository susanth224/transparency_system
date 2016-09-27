var React = require('react');
var PollsQuestions = require('./PollsQuestions.react');
var PollsActions = require('../actions/PollsActions');
var PollsStore = require('../stores/PollsStore');
var Polls = React.createClass({
	getInitialState : function(){
		return ({data:[]});

	},
	onSubmit: function(feed){
		PollsActions.create(feed);
	},
	render : function(){
		if(this.state.data.length > 0){
			return(
				<div>
				<PollsQuestions feeds={this.state.data}/>
				</div>
			);
		}
		else{
			return(
				<div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}>
                <img src="images/Loading.gif"/>
                </div>
				);
		}
	},
    componentDidMount: function(){
        PollsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PollsStore.removeChangeListener(this._onChange);
    },
	_onChange: function(){
		this.setState({data: PollsStore.getAll()});
	}
});
module.exports = Polls;
