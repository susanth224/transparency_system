var React = require('react');
var SurveyQuestion = require('./SurveyQuestion.react');
var SurveyQuestionsList = React.createClass({
	render : function(){
		var AllSurveyQuestions = this.props.questionslist.map(function(question, index){
			return (
				<SurveyQuestion question={question} key = {index}>
				</SurveyQuestion>
			);
		});
		return(
			<div className="col-md-12">
				{AllSurveyQuestions}
			</div>
		);
	}
});
module.exports = SurveyQuestionsList;