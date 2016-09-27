/** @jsx React.DOM */
var React = require('react');
var NGODetailsStore = require('../stores/NGODetailsStore');
var webAPIUtils = require('../webutils/Webutils');
var DiscussionForum = require('./DiscussionForum.react');
var SubNavigation = require('./Navigationpill');
var Utils = require('../webutils/ajax');

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
var colWidth = '',divIndex=0;
var numberOfCardsPerRow=0,prevCardsPerRow = 0;
var divClicked=-1,cardProposalId=0;

var prevPid=-1

var categoryFlag=0;

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
    return (
      <div>
        <Card cards={this.props.cards} cardRow = {this.props.cardRow}/>
        
          <div style={{"display":"none"}} id={"up_"+this.props.cardRow} className="col-md-11 col-sm-11 col-xs-11 col-lg-11 col-xs-offset-1 col-sm-offset-1 col-lg-offset-1 col-md-offset-1" >
       
        </div>
      </div>
    );
  }
});

function showSlide(divID,pid){
  if(categoryFlag==2)  React.render(<TaskForum PID={pid}/>, document.getElementById(divID));
  if(categoryFlag==3)  React.render(<Survey PID={pid}/>, document.getElementById(divID));
  if(categoryFlag==4)  React.render(<Polls PID={pid}/>, document.getElementById(divID));
  if(categoryFlag==5)  React.render(<DiscussionForum PID={pid}/>, document.getElementById(divID));

  slidingDiv(divID,pid);

}

function slideArrow(divID,arrowId){

}

function setPrevColWidth(){
  setColWidth(getCurrentScreenSize());
}

var SingleCard = React.createClass({
  setCookie:function(){
        
        setPrevColWidth();
        divIndex=this.props.keyIndex;
        var pid=this.props.card.card.proposalId;
        cardProposalId=pid;
        document.cookie="proposalId="+pid;

        if(categoryFlag==2){
        	Tasks_Utils.getProfileBriefDetails();
        }

        //list of surveys
        if(categoryFlag==3){
          console.log("i am surveys");
          Survey_Utils.getListOfSurveyQuestions();
        }
        //list of polls
        if(categoryFlag==4){
            Polls_Utils.getListOfPollQuestions();
          }

      // list of discussions
        if(categoryFlag==5){
              Utils.getListOfDiscussions("Popular");
            }
  
        var divID = this.props.cardRow;
        showSlide("up_"+divID,pid);
        //$('#'+divID).slideDown('slow');
        divClicked = divID;
    },
  setFlag2:function(){
    categoryFlag=2;
    this.setCookie();
    var cardPid=this.props.card.card.proposalId; 

    if(tasksFlag==0){
      $('#card_'+cardPid).find(".arrow#2").removeClass("is-expanded");
      tasksFlag=1;
      return;  
    }

    $('[id^=card_]').find(".arrow").removeClass("is-collapsed");
    $('[id^=card_]').find(".arrow").removeClass("is-expanded");
   
    $('#card_'+cardPid).find(".arrow#2").addClass("is-expanded");
    tasksFlag=0;
  },
  setFlag3:function(){
    categoryFlag=3;
    this.setCookie();
    var cardPid=this.props.card.card.proposalId; 

    if(surveysFlag==0){
      $('#card_'+cardPid).find(".arrow#3").removeClass("is-expanded");
      surveysFlag=1;
      return;  
    }

    $('[id^=card_]').find(".arrow").removeClass("is-collapsed");
    $('[id^=card_]').find(".arrow").removeClass("is-expanded");
   
    $('#card_'+cardPid).find(".arrow#3").addClass("is-expanded");
    surveysFlag=0;

  },  
  setFlag4:function(){
    categoryFlag=4;
    this.setCookie();
    var cardPid=this.props.card.card.proposalId; 
    if(pollsFlag==0){
      $('#card_'+cardPid).find(".arrow#4").removeClass("is-expanded");
      pollsFlag=1;
      return;  
    }

    $('[id^=card_]').find(".arrow").removeClass("is-collapsed");
    $('[id^=card_]').find(".arrow").removeClass("is-expanded");
   
    $('#card_'+cardPid).find(".arrow#4").addClass("is-expanded");
    pollsFlag=0;
  },
  setFlag5:function(){
    categoryFlag=5;
    this.setCookie();
    var cardPid=this.props.card.card.proposalId; 

    if(discussionsFlag==0){
      $('#card_'+cardPid).find(".arrow#5").removeClass("is-expanded");
      discussionsFlag=1;
      return;  
    }

    $('[id^=card_]').find(".arrow").removeClass("is-collapsed");
    $('[id^=card_]').find(".arrow").removeClass("is-expanded");
   
    $('#card_'+cardPid).find(".arrow#5").addClass("is-expanded");
    discussionsFlag=0;
  },
  setFlag1:function(e){
    categoryFlag=1;
    var cardPid=this.props.card.card.proposalId;
    console.log("target value=",e.target.id,e.target);

    console.log(prevPid,cardPid);
    if(prevPid == cardPid){
      $('#card_'+prevPid).find(".arrow").removeClass("is-collapsed");
      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded"); 
      prevPid=-1;
    }

    else{
      $('[id^=card_]').find(".arrow").removeClass("is-collapsed");
      $('[id^=card_]').find(".arrow").removeClass("is-expanded");
     
      $('#card_'+cardPid).find(".arrow#1").addClass("is-expanded");
      prevPid=cardPid;
    }
    detailsFlag=0;
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
                            <a href="#transperancy/vr1caps/Task" onClick={this.setFlag2}><strong>Tasks</strong></a>
                          </span>
                        </td>
                        
                        <td>
                          <span  className="arrow is-collapsed" id="3">                        
                            <a href="#transperancy/vr1caps/Surveys" onClick={this.setFlag3}><strong>Surveys</strong></a>
                          </span>
                        </td>                       
                        
                        <td>
                          <span  className="arrow is-collapsed" id="4">                        
                            <a href="#transperancy/vr1caps/Polls" onClick={this.setFlag4}><strong> Polls</strong></a>
                          </span>
                        </td>
                        
                        <td>
                          <span  className="arrow is-collapsed" id="5">
                            <a href={"#/transperancy/vr1caps/"+CARD.card.proposalId+"/discussions"} onClick={this.setFlag5} ref="proposalidcard" ><strong>Discussions</strong></a>
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
        webAPIUtils.getCardsDetails();
        var size=document.documentElement.clientWidth;
        
        return ({cards : NGODetailsStore.get_spent_details_Card(),screenSize:size,rowID:0});
        },
    handleResize: function(){
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
      if(flag==1){
      console.log("i am flag");
        if(categoryFlag==2)  React.render(<TaskForum PID={cardProposalId}/>, document.getElementById(presentRow));
        if(categoryFlag==4)  React.render(<Polls PID={cardProposalId}/>, document.getElementById(presentRow));
        if(categoryFlag==5)  React.render(<DiscussionForum PID={cardProposalId}/>, document.getElementById(presentRow));

      $("#"+presentRow).slideDown(TIME_MILLI_SECONDS);
      }
    },
    componentDidMount: function(){
        NGODetailsStore.addChangeListener(this._onChange);
        window.addEventListener("resize",this.handleResize);
    },
    componentWillUnmount: function(){
        NGODetailsStore.removeChangeListener(this._onChange);
        window.removeEventListener("resize", this.handleResize);
    },
    _onChange: function(){
        this.setState({cards: NGODetailsStore.get_spent_details_Card()});
    },

    render:function(){
        var Cards3=[];
        var Temp3=[];
        var rowID = this.state.rowID;
        var size=this.state.screenSize;
        colWidth = getCurrentScreenSize();
        numberOfCardsPerRow = getCardsPerRow();
        prevCardsPerRow = numberOfCardsPerRow;
        return(
          <div>
            <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
            <div><SubNavigation/></div>
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

