/** @jsx React.DOM */
var React = require('react');
var DonationsStore = require('../stores/DonationsStore');
var DiscussionForum = require('./DiscussionForum.react');
var Utils = require('../webutils/ajax');
var DiscussionsActions = require('../actions/DiscussionsActions');
var Polls = require('./Polls.react');
var PollsActions = require('../actions/PollsActions');
var PollsStore = require('../stores/PollsStore');
var Polls_Utils = require('../webutils/polls_utils');
var TaskForum = require('./TaskForum.react');
var Tasks_Utils = require('../webutils/Tasks_ajax');
var Survey = require('./SurveyQuestionsForum.react');
var Survey_Utils = require('../webutils/Surveyajax');
var detailsFlag=1,tasksFlag=1,surveysFlag=1,pollsFlag=1,discussionsFlag=1;
var xs=768,sm=991,md=1199;
var colWidth = '',divIndex=0,cardRowId=-1;
var numberOfCardsPerRow=0,prevCardsPerRow = 0;
var divClicked=-1,cardProposalId=0;
var prevPid=-1,prevcategoryFlag=-1,prevRowId=-1;
var categoryFlag=0;
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}
function getCurrentScreenSize(){
  var size=document.documentElement.clientWidth;
  return (size < xs) ?  'xs' : (size <= sm) ? 'sm' : (size <= md) ? 'md' : 'lg';
}

function getCardsPerRow(){
  var colWidth = getCurrentScreenSize();
  return (colWidth === 'xs') ? 1 : (colWidth === 'sm') ? 2 : 2;
}

function findCurrentRow(screenWidth,cardIndex){
  
  cardsPerRow = (prevColWidth === 'xs') ? 1 : (prevColWidth === 'sm') ? 2 : 2;
  var cardClicked = (screenWidth-1) * cardsPerRow + divIndex+1;
  var currentRow= Math.ceil( cardClicked / getCardsPerRow() );
  return "up_"+currentRow;

}
 


var CardWithDiv = React.createClass({
  render: function(){
    var cardsDetails=(this.props.cards.length>0)?<Card cards={this.props.cards} cardRow = {this.props.cardRow}/> :<div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}><img className="img img-responsive img-center" src="images/Loading.gif"/></div>;
    return (
      <div>
        {cardsDetails}
        
          <div style={{"display":"none"}} id={"up_"+this.props.cardRow} className="col-md-11 col-sm-11 col-xs-11 col-lg-11 col-xs-offset-1 col-sm-offset-1 col-lg-offset-1 col-md-offset-1" >
       
        </div>
      </div>
    );
  }
});



function setPrevColWidth(){
  setColWidth(getCurrentScreenSize());
}

var SingleCard = React.createClass({
  setFlag1:function(e){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
 
    categoryFlag=1;
    
    // Add coresponding server calls for details
    // Tasks_Utils.getProfileBriefDetails();

    cardRowId=this.props.cardRow;
    
    // change the component that to be renered
    // React.render(<TaskForum PID={cardPid}/>, document.getElementById("up_"+cardRowId));

    console.log(prevPid,cardPid);
    if(prevPid == cardPid && prevcategoryFlag==categoryFlag){
      //$('#card_'+prevPid).find(".arrow").removeClass("is-collapsed");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
      $("#up_"+cardRowId).slideUp(0); 
      prevPid=-1;
    }

    else{
      if(prevRowId!=cardRowId) {
        $("#up_"+prevRowId).slideUp(0);
        }

      //$('[id^=card_]').find(".arrow").removeClass("is-collapsed");
      //$('[id^=card_]').find(".arrow").removeClass("is-expanded");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
     
      $('#card_'+cardPid).find(".arrow#1").addClass("is-expanded");
      $("#up_"+cardRowId).slideDown(TIME_MILLI_SECONDS);
      
      prevPid=cardPid;
      prevcategoryFlag=categoryFlag;
      prevRowId=cardRowId;

      // scrool top the current clicked div
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top -220},'slow');


    }
    detailsFlag=0;
  },

  setFlag2:function(){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
 
    categoryFlag=2;

    Tasks_Utils.getProfileBriefDetails();

    cardRowId=this.props.cardRow;
    React.render(<TaskForum PID={cardPid}/>, document.getElementById("up_"+cardRowId));
    if(prevPid == cardPid && prevcategoryFlag==categoryFlag){
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
      $("#up_"+cardRowId).slideUp(0); 
      prevPid=-1;
    }

    else{
      if(prevRowId!=cardRowId) {
        $("#up_"+prevRowId).slideUp(0);
        }

      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
     
      $('#card_'+cardPid).find(".arrow#2").addClass("is-expanded");
      $("#up_"+cardRowId).slideDown(TIME_MILLI_SECONDS);
      prevPid=cardPid;
      prevcategoryFlag=categoryFlag;
      prevRowId=cardRowId;

      // scrool top the current clicked div
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top -220},'slow');

    }

    tasksFlag=0;
  },
  setFlag3:function(){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
 
    categoryFlag=3;

    Survey_Utils.getListOfSurveyQuestions();

    cardRowId=this.props.cardRow;
    React.render(<Survey PID={cardPid}/>, document.getElementById("up_"+cardRowId));
    if(prevPid == cardPid && prevcategoryFlag==categoryFlag){
      console.log("i am if");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
      $("#up_"+cardRowId).slideUp(0); 
      prevPid=-1,prevcategoryFlag=-1;
    }

    else{
      if(prevRowId!=cardRowId) {
        $("#up_"+prevRowId).slideUp(0);
        }

      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
     
      $('#card_'+cardPid).find(".arrow#3").addClass("is-expanded");
      $("#up_"+cardRowId).slideDown(TIME_MILLI_SECONDS);
      prevPid=cardPid;
      prevcategoryFlag=categoryFlag;
      prevRowId=cardRowId;

      // scrool top the current clicked div
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top -220},'slow');

    }
    surveysFlag=0;

  },  
  setFlag4:function(){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
 
    categoryFlag=4;

    Polls_Utils.getListOfPollQuestions();

    cardRowId=this.props.cardRow;
    React.render(<Polls PID={cardPid}/>, document.getElementById("up_"+cardRowId));
    if(prevPid == cardPid && prevcategoryFlag==categoryFlag){
      console.log("i am if");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
      $("#up_"+cardRowId).slideUp(0); 
      prevPid=-1,prevcategoryFlag=-1;
    }

    else{
      if(prevRowId!=cardRowId) {
        $("#up_"+prevRowId).slideUp(0);
        }

      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
     
      $('#card_'+cardPid).find(".arrow#4").addClass("is-expanded");
      $("#up_"+cardRowId).slideDown(TIME_MILLI_SECONDS);

      prevPid=cardPid;
      prevcategoryFlag=categoryFlag;
      prevRowId=cardRowId;

      // scrool top the current clicked div
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top -220},'slow');

    }

    pollsFlag=0;
  },

    setFlag5:function(){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
    
    categoryFlag=5;

    Utils.getListOfDiscussions("Popular");

    cardRowId=this.props.cardRow;
    React.render(<DiscussionForum PID={cardPid}/>, document.getElementById("up_"+cardRowId));

    if(prevPid == cardPid && prevcategoryFlag==categoryFlag){
      console.log("i am if");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");
      $("#up_"+cardRowId).slideUp(0);       
      prevPid=-1,prevcategoryFlag=-1;
    }

    else{
      console.log("new testing");
      if(prevRowId!=cardRowId) {
        $("#up_"+prevRowId).slideUp(0);
        }
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");

      $('#card_'+cardPid).find(".arrow#5").addClass("is-expanded");
      $("#up_"+cardRowId).slideDown(TIME_MILLI_SECONDS);
      console.log("slideDown");
      prevPid=cardPid;
      prevcategoryFlag=categoryFlag;
      prevRowId=cardRowId;

      // scrool top the current clicked div
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top -220},'slow');
    }

    discussionsFlag=0;
  },
  


  render : function(){
    var CARD = this.props.card;
    return (
      <div id={"card_"+CARD.card.proposalId} className="col-xs-11 col-sm-5 col-md-4 col-lg-4 col-md-offset-1 col-lg-offset-1 col-sm-offset-1 col-xs-offset-1 panel panel-primary card" >
        <div className="panel-heading cardHeader">
           <strong> {CARD.card.header}
                    
            </strong>
        </div>
        <div className="panel-body cardContent">
            {CARD.card.description}
        </div>
         <div className="panel-footer cardFooter">
            <div >
                <table className="table" style={{"marginBottom": "0px"}}>
                    <tr>
                        <td >
                          <span  className="arrow is-collapsed" id="1">
                            <a id="Details" onClick={this.setFlag1}>
                              Details
                            </a>  
                          </span>
                        </td> 
                        
                        <td>
                          <span  className="arrow is-collapsed" id="2">
                            <a href="#donationsbills" onClick={this.setFlag2}><strong>Tasks</strong></a>
                          </span>
                        </td>
                        
                        <td>
                          <span  className="arrow is-collapsed" id="3">                        
                            <a href="#donationsbills" onClick={this.setFlag3}><strong>Surveys</strong></a>
                          </span>
                        </td>                       
                        
                        <td>
                          <span  className="arrow is-collapsed" id="4">                        
                            <a href="#donationsbills" onClick={this.setFlag4}><strong> Polls</strong></a>
                          </span>
                        </td>
                        
                        <td>
                          <span  className="arrow is-collapsed" id="5">
                            <a href="#donationsbills" onClick={this.setFlag5} ref="proposalidcard" ><strong>Discussions</strong></a>
                          </span>
                        </td>
                    </tr>
                </table>
           </div>  
        </div>
      </div>
    );
  }
});

var Card=React.createClass({
    render:function(){
        var self = this;
        return(
            <div>
            <div className="row">
            <div className="col-md-11 col-sm-11 col-xs-11 col-lg-11 "  style={{'position':"relative",'margin':"2% 2% 1% 5%","color":"green"}}>
              {this.props.cards.map(function(CARD,index){
                return (<SingleCard keyIndex={index} card={CARD} cardRow={self.props.cardRow}  />);
              }
            )}
                </div>
            </div>    
        
           </div>
            );
    }
});

var CardFrame=React.createClass({
    getInitialState : function(){
        var size=document.documentElement.clientWidth;
        
        return ({cards : DonationsStore.getDonationsBills(),screenSize:size,rowID:0});
        },
    handleResize: function(){

      divClicked=prevRowId;
      console.log("divClicked",divClicked);
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");

      if(prevCardsPerRow === getCardsPerRow()){
        
        return;
      }
      if(divClicked!=-1){
        var divContent=document.getElementById("up_"+divClicked).innerHTML;
        document.getElementById("up_"+divClicked).innerHTML='';
        $("up_"+divClicked).slideUp(0);
      }
      this.setState({screenSize:document.documentElement.clientWidth,rowID:0});
  
      var presentRow=findCurrentRow(divClicked,divIndex);
     
      console.log("presentRow is >>",presentRow,"flag ",flag,"prev flag ",prevcategoryFlag);
      
        if(prevcategoryFlag==2)  React.render(<TaskForum PID={cardProposalId}/>, document.getElementById(presentRow));
        if(prevcategoryFlag==4)  React.render(<Polls PID={cardProposalId}/>, document.getElementById(presentRow));
        if(prevcategoryFlag==5)  React.render(<DiscussionForum PID={cardProposalId}/>, document.getElementById(presentRow));

      $("#"+presentRow).slideDown(TIME_MILLI_SECONDS);
      
    },
    componentDidMount: function(){
        DonationsStore.addChangeListener(this._onChange);
        window.addEventListener("resize",this.handleResize);
    },
    componentWillUnmount: function(){
        DonationsStore.removeChangeListener(this._onChange);
        window.removeEventListener("resize", this.handleResize);
    },
    _onChange: function(){
        this.setState({cards: DonationsStore.getDonationsBills()});
    },

    render:function(){
        var Cards3=[];
        var Temp3=[];
        var rowID = this.state.rowID;
        var size=this.state.screenSize;
        colWidth = getCurrentScreenSize();
        numberOfCardsPerRow = getCardsPerRow();
        prevCardsPerRow = numberOfCardsPerRow;
		donationDetails=JSON.parse(getCookie("DonationDetails"));
		var name=donationDetails.donorName;
		var donationId=donationDetails.donationId;
		var donatedQuantity=Math.ceil(donationDetails.donatedQuantity);
    console.log("round",donatedQuantity);
		var categoryName=donationDetails.categoryName;
		var spentAmount=Math.ceil(donationDetails.spentAmount);
        return(
          <div>
            <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
				<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1 col-sm-offset-1 col-xs-offset-1 panel panel-primary" >
					<div >
					    <table  className="table" style={{"marginBottom": "0px"}}>
                <tr>
                  <td>Name</td>
                  <td>DonationId</td>
                  <td>DonatedQuantity</td>
                  <td>SpentAmount</td>
                  <td>CategoryName</td>
                </tr>
  							<tr>
  								<td>{name}</td>
  								<td>{donationId}</td>
  								<td>{donatedQuantity}</td>
  								<td>{spentAmount}</td>
  								<td>{categoryName}</td>
  							</tr>
					   </table>
					</div>
				</div>  
            <div className="row">
              {this.state.cards.map(function(card,index){
                if(index==0 || index%numberOfCardsPerRow!=0){
                  Cards3.push({card});
                }
                else{
                    Temp3=Cards3;
                    Cards3=[];
                    Cards3.push({card});
                    rowID++;
                    return (
                      <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
                      <CardWithDiv cards={Temp3} cardRow={rowID}/>
                      </div>
                    );
                }
              } 
              )}
              <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
               <CardWithDiv cards={Cards3} cardRow={rowID+1}/>  
              </div>
              </div>
              </div>               
        </div>

        );
       
    }    
});
// Render the menu component on the page, and pass an array with menu options

module.exports=CardFrame;

