var React = require('react');
var SurveyQuestionsList = require('./SurveyQuestionsList.react');
var SurveyQuestionsActions = require('../actions/SurveyQuestionsActions');
var SurveyQuestionsStore = require('../stores/SurveyQuestionsStore');
var SurveyQuestionsForum = React.createClass({
	getInitialState : function(){
		SurveyQuestionsStore.getAll();
		console.log("calling get all");
		return ({data:SurveyQuestionsStore.getAll()});

	},
	render : function(){
		console.log("i am SurveyQuestionsForum");
		if(this.state.data.length>0){
			return(
				<div>
				<SurveyQuestionsList questionslist={this.state.data}/>
				</div>
			);
		}
		else{
			return(
				<div className="spinner">
				<img src="img/spinner.gif"/>
				</div>
			);
		}
	},
    componentDidMount: function(){
        SurveyQuestionsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        SurveyQuestionsStore.removeChangeListener(this._onChange);
    },
	_onChange: function(){
		this.setState({data: SurveyQuestionsStore.getAll()});
	}
});
module.exports = SurveyQuestionsForum;
