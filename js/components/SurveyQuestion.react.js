var React = require('react');
var StarRating = require('./StarRating.react');
var Utils = require('../webutils/Surveyajax');
var id=1;
var SurveyQuestion = React.createClass({
    handleRatingSelected: function(rating) {
	    var optionId;
	    if(rating>2){	// This if condition for convert rating value to makeing option id...
	    	optionId=32+rating;
	    }
	    else{
	    	optionId=11+rating;
	    }
	    Utils.submitUserSurveyResponses({"proposalId":this.props.question.proposalId,"surveySetId":this.props.question.surveySetId,"questionId":this.props.question.questionId,"optionId":JSON.stringify(optionId)});
	},
	render : function(){
		console.log("calling SurveyQuestion");
		return(
			<div className="row">
				<div className="col-md-12">
				{this.props.question.questionName}
				</div>
				<div className="col-md-12">
					<StarRating value={Number(this.props.question.userLastResponse)} max="10" id={id++} onRatingSelected={this.handleRatingSelected}/>
				</div>
			</div>
		);
	}
});
module.exports = SurveyQuestion;