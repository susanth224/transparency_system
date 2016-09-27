/** @jsx React.DOM */
var React = require('react');
var NGODetailsStore = require('../stores/NGODetailsStore');
var webAPIUtils = require('../webutils/Webutils');
var DiscussionForum = require('./DiscussionForum.react');
var SubNavigation = require('./Navigationpill');

var Utils = require('../webutils/ajax');
var transparencyAPIUtils = require('../webutils/ajax');
var filter="Popular";

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

function getCurrentScreenSize(){
  var size=document.documentElement.clientWidth;
  return (size < xs) ?  'xs' : (size <= sm) ? 'sm' : (size <= md) ? 'md' : 'lg';
}

function getCardsPerRow(){
  var colWidth = getCurrentScreenSize();
  return (colWidth === 'xs') ? 1 : (colWidth === 'sm') ? 2 : 3;
}

function findCurrentRow(screenWidth,cardIndex){
  
  cardsPerRow = (prevColWidth === 'xs') ? 1 : (prevColWidth === 'sm') ? 2 : 3;
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
          <div style={{"display":"none"}} id={"up_"+this.props.cardRow} className="col-md-12 col-sm-12 col-xs-12 col-lg-12 billSubDivision" >
       
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
      $('html , body').animate({scrollTop:$("#up_"+cardRowId).offset().top-360 },'slow');


    }
    detailsFlag=0,divIndex=this.props.keyIndex;
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

    tasksFlag=0,divIndex=this.props.keyIndex;
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
    surveysFlag=0,divIndex=this.props.keyIndex;

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

    pollsFlag=0,divIndex=this.props.keyIndex;
  },

    setFlag5:function(){
    var cardPid=this.props.card.card.proposalId;
    document.cookie="proposalId="+cardPid;  
    
    categoryFlag=5;

    transparencyAPIUtils.genericWebAPICall(
    "/transparencyactivitymodule/getListOfDiscussionsNew/v1/",
        {"proposalId":transparencyAPIUtils.getProposalId(),"filterBy":filter},
        function(msg){
          console.log("List of Discussions", msg);
        DiscussionsActions.receiveDiscussions(msg);
      },function(msg){
        console.log("Failed to get the list of discussions!");
      });

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

    discussionsFlag=0,divIndex=this.props.keyIndex;
  },
  


  render : function(){
    var CARD = this.props.card;
    return (
      <div id={"card_"+CARD.card.proposalId} className="col-lg-4 col-md-6 col-sm-6 col-xs-6 panel panel-primary card" >
        <div className="panel-heading cardHeader">
           <strong> {CARD.card.header}&nbsp; key is {this.props.keyIndex}
                    
            </strong>
        </div>
        <div className="panel-body cardContent">
          <div className="col-lg-9">
            
            <p >
                <strong> {CARD.card.description} </strong><br/><br/>

            This is the description about the card and I dont know what it will be.</p><br/>
            24 <span className="ok img img-circle"> <span className="glyphicon glyphicon-ok" > </span></span>
          </div>
          <div className="col-lg-3"><img className="img img-responsive" src="images/user.png"/></div>
        </div>
         <div className="panel-footer cardFooter">
            <div className="cardlinks">
                <table className="table" >
                    <tr>
                        <td className="link" >
                          <span  className="arrow is-collapsed" id="1">
                            <a id="Details" onClick={this.setFlag1}>
                              <span className="linkName">Details</span>
                              <span className="glyphicon glyphicon-file visible-xs" aria-hidden="true"></span>
                            </a>  
                          </span>
                        </td> 
                        
                        <td className="link" >
                          <span  className="arrow is-collapsed" id="2">
                            <a href="#transperancy/vr1caps/Task" onClick={this.setFlag2}>
                  <span className="linkName">Tasks</span>
                  <span className="glyphicon glyphicon-pencil visible-xs" aria-hidden="true"></span>
                            </a>
                          </span>
                        </td>
                        
                        <td className="link" >
                          <span  className="arrow is-collapsed" id="3">                        
                            <a href="#transperancy/vr1caps/Surveys" onClick={this.setFlag3}>
                            <span className="linkName">Surveys</span>
                  <span className="glyphicon glyphicon-eye-open visible-xs" aria-hidden="true"></span>
                            </a>
                          </span>
                        </td>                       
                        
                        <td className="link" >
                          <span  className="arrow is-collapsed" id="4">                        
                            <a href="#transperancy/vr1caps/Polls" onClick={this.setFlag4}>
                            <span className="linkName">Polls</span>
                            <span className="glyphicon glyphicon-flag visible-xs" aria-hidden="true"></span>
                          
                            </a>
                          </span>
                        </td>
                        
                        <td className="link" >
                          <span  className="arrow is-collapsed" id="5">
                            <a href={"#/transperancy/vr1caps/"+CARD.card.proposalId+"/discussions"} onClick={this.setFlag5} ref="proposalidcard" >
                            <span className="linkName">Discussions</span>
                            <span className="glyphicon glyphicon-comment visible-xs" aria-hidden="true"></span>
                            </a>
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
  heightAdjustment : function(){
     var maxHeight=0;
     
      $(".row_"+this.props.cardRow).find('[class^="panel-body"]').each(function() { maxHeight = Math.max(maxHeight, $(this).height()); }).height(maxHeight);
      console.log(".row_"+this.props.cardRow,maxHeight);
      
  },
  componentDidMount : function(){
    {this.heightAdjustment()}
  },
  componentDidUpdate: function(){
    {this.heightAdjustment()}
  },
    render:function(){
        var self = this;
        return(
            <div>
            <div className={"row_"+this.props.cardRow}>
              {this.props.cards.map(function(CARD,index){
                return (<SingleCard keyIndex={index} card={CARD} cardRow={self.props.cardRow}  />);
              }
            )}
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
      divClicked=prevRowId;
      

      $('#card_'+prevPid).find(".arrow").removeClass("is-expanded");

      if(prevCardsPerRow === getCardsPerRow()){
        
        return;
      }
      
      if(divClicked!=-1){
        React.unmountComponentAtNode(document.getElementById("up_"+divClicked));
        $("up_"+divClicked).slideUp(0);
      }
      
      this.setState({screenSize:document.documentElement.clientWidth,rowID:0});
  
  	  console.log("divClicked ",divClicked,"divIndex",divIndex);
      var presentRow=findCurrentRow(divClicked,divIndex);
     
      console.log("presentRow is >>",presentRow,"flag ",flag,"prev flag ",prevcategoryFlag);
      
        if(prevcategoryFlag==2)  React.render(<TaskForum PID={cardProposalId}/>, document.getElementById(presentRow));
        if(prevcategoryFlag==3)  React.render(<Survey PID={cardProposalId}/>, document.getElementById(presentRow));
        if(prevcategoryFlag==4)  {
          console.log("calling server call");
          Polls_Utils.getListOfPollQuestions();
          React.render(<Polls PID={cardProposalId}/>, document.getElementById(presentRow));
        }
        if(prevcategoryFlag==5)  React.render(<DiscussionForum PID={cardProposalId}/>, document.getElementById(presentRow));

      $("#"+presentRow).slideDown(TIME_MILLI_SECONDS);
      
      console.log("prev Pid",prevPid,prevcategoryFlag);
      $('#card_'+prevPid).find(".arrow#"+prevcategoryFlag).addClass("is-expanded");
      //$("#card_"+prevPid+" "+".arrow#"+prevcategoryFlag).addClass("is-expanded");
    
    /*
    var presentFlag="#card_"+prevPid+" .arrow#"+prevcategoryFlag;
      console.log(presentFlag);
      $(presentFlag).addClass("is-expanded");
    */
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
            <div><SubNavigation focusIndex="0"/></div>
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
