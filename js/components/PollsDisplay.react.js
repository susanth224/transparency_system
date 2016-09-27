var React = require('react');
var Utils=require('../webutils/polls_utils');
var index=0;
var count=0;
var yes=0;
var no=0;
var total;
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
    return '';

}

var PollsDisplay = React.createClass({
  Percentages_Calculations : function(val1,val2){
          console.log("val1 val2",val1,val2);
          yes=val1;
          no=val2;
          total=(yes+no);
          console.log("yes no total",yes,no,total);
          yes=Math.round(((yes/total)*100));
          no=Math.round(((no/total)*100));

  },
  drawChart: function(e){
    var flag=0;
    if (this.props.feed.userLastResponse<=0)
    {
     flag=1; 
      console.log(e.target.id);
      console.log("lastresponce",this.props.feed.userLastResponse);
      console.log(this.props.feed.options[0].optionPollCount,this.props.feed.options[1].optionPollCount)
      var proposalId=this.props.feed.proposalId;
      var pollSetId=this.props.feed.pollSetId;
      var questionId=this.props.feed.questionId;
      var optionId=e.target.id;
      Utils.UpdateRequest(proposalId,pollSetId,questionId,optionId);
      if(Number(optionId)===Number(this.props.feed.options[0].optionId))
            {
              this.Percentages_Calculations(Number(this.props.feed.options[0].optionPollCount)+1,Number(this.props.feed.options[1].optionPollCount));
            }
      else {  
              this.Percentages_Calculations(Number(this.props.feed.options[0].optionPollCount),Number(this.props.feed.options[1].optionPollCount)+1);
           }

      console.log(this.props.feed.options[0].optionPollCount,this.props.feed.options[1].optionPollCount)
    }
      if(flag===0)
      {
      this.Percentages_Calculations(Number(this.props.feed.options[0].optionPollCount),Number(this.props.feed.options[1].optionPollCount));
      }
      
      var values=[yes,no];
      var left=35;
      var width=35;
      var  bar1= document.querySelector("#bar1");
      var newbar1 = document.createElement('div');
      if(yes>=50)
      {
      newbar1.setAttribute("class", "BAR1");
    }
    else 
    {
       newbar1.setAttribute("class", "BAR2");
    }
      newbar1.textContent=values[0]+"%";
      newbar1.style.width=width+"px";
      newbar1.style.height=values[0]+"%";
      newbar1.style.left=left+"px";
      this.refs.bar1.getDOMNode().appendChild(newbar1);
      var  bar2= document.querySelector("#bar2");
      var newbar2 = document.createElement('div');
      if(no>=50)
      {
      newbar2.setAttribute("class", "BAR1");
      }
      else 
      {
        newbar2.setAttribute("class", "BAR2");
      }
     
      newbar2.textContent=values[1]+"%";
      newbar2.style.width=width+"px";
      newbar2.style.height=values[1]+"%";
      newbar2.style.left=left+"px";
      bar2.appendChild(newbar2);
      this.refs.bar2.getDOMNode().appendChild(newbar2);
   

      document.getElementById(this.props.feed.options[0].optionId+this.props.feed.questionId).style.display='none';
      document.getElementById(this.props.feed.options[0].optionId+this.props.feed.options[1].optionId+this.props.feed.questionId).style.display='block';
      document.getElementById(this.props.feed.questionId+this.props.feed.options[0].optionId).style.display='block';
      console.log("After Ajax Call",this.props.feed);
      
  },  
  componentDidMount : function()
  { 
    console.log(this.props.id,Number(this.props.length)-1)
    if(this.props.id==0)
    {   
        document.getElementById("polls_"+this.props.id).style.display='block';
        document.getElementById(this.props.feed.options[0].optionId+this.props.feed.options[1].optionId).style.display='none';
        
          if(this.props.feed.userLastResponse>0)
          {
            document.getElementById(this.props.feed.options[0].optionId+this.props.feed.options[1].optionId).style.display='none';
            this.drawChart();
          }
          else{
            this.refs.optiondisplay.getDOMNode().style.display='block';
        }
      }
    else if(this.props.id==(Number(this.props.length)-1))
      { 
          console.log("Question",this.props.feed.questionName);
          document.getElementById(this.props.feed.options[1].optionId+this.props.feed.options[0].optionId).style.display='none';
          if(this.props.feed.userLastResponse>0)
          {
            this.drawChart();
          }
          else{
            this.refs.optiondisplay.getDOMNode().style.display='block';
        }

      }
    else
        {
          
           if(this.props.feed.userLastResponse>0)
          {
            this.drawChart();
          }
          else{
            this.refs.optiondisplay.getDOMNode().style.display='block';
          }
        }
  },
  nextQuestion : function()
  { console.log(this.props.id,Number(this.props.length)-1);
     document.getElementById("polls_"+this.props.id).style.display='none';
     document.getElementById("polls_"+Number(this.props.id+1)).style.display='block';
  },
  PreviousQuestion : function()
  {
     document.getElementById("polls_"+this.props.id).style.display='none';
     document.getElementById("polls_"+Number(this.props.id-1)).style.display='block';
  },  
  render : function(){
    console.log("Length",Number(this.props.length));
    return(
      <div className="row col-md-11" id={"polls_"+this.props.id} hidden>
        <div  className="col-md-1 col-md-offset-2">
          <button type="button" className="btn btn-info"  id={this.props.feed.options[0].optionId+this.props.feed.options[1].optionId} onClick={this.PreviousQuestion}>
            <span className="prev glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          </button>
        </div>
        <div className="col-md-8" >
           <div className="media" >

              <div className="col-md-11" id={this.props.feed.options[0].optionId+this.props.feed.questionId}>
                <h4 className="media-heading">{this.props.feed.questionId} ) {this.props.feed.questionName}</h4>
                  <form ref="optiondisplay" hidden >
                           <button type="button" className="btn btn-info" style={{"marginTop": "5%",
                           "marginLeft": "20%"}} id={this.props.feed.options[0].optionId} onClick={this.drawChart}>{this.props.feed.options[0].optionName}</button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-info"  style={{"marginTop": "5%",
                            "marginLeft": "20%"}} id={this.props.feed.options[1].optionId} onClick={this.drawChart}>{this.props.feed.options[1].optionName}</button>
                  </form>
              </div>

              <div className="col-md-12" id={this.props.feed.questionId+this.props.feed.options[0].optionId} hidden>
                <div className="wrapper row "> 
                     <div id="chart" className="col-md-8 col-md-offset-2"  >
                        <div className="col-md-1 col-xs-1 col-md-offset-1 col-xs-offset-1" id="bar1-main" >
                           <div id="bar1" ref="bar1"className="col-md-12 col-xs-8 col-sm-6" ></div>  
                           <div className="col-md-1 col-xs-1 col-sm-1" id="bar1-text">{this.props.feed.options[0].optionName}</div>
                        </div>
                        <div className="col-md-2 col-xs-1 col-sm-1 col-md-offset-3 col-xs-offset-3 col-sm-offset-2" id="bar2-main">
                           <div id="bar2" ref="bar2"className="col-md-12 col-xs-12 col-sm-12"></div>
                           <div className="col-md-1 col-xs-1 col-sm-1 lead" id="bar2-text">{this.props.feed.options[1].optionName}</div>
                        </div>
                     </div>  
                  </div>
              </div>

              <div className="col-md-11 col-md-offset-1" id={this.props.feed.options[0].optionId+this.props.feed.options[1].optionId+this.props.feed.questionId} hidden>
                <h4 className="media-heading">{this.props.feed.questionId} ) {this.props.feed.questionName}</h4>
              </div>
          </div>
        </div>
      <div className="col-md-1 col-xs-2 col-sm-1" >
      <button type="button" className="btn btn-info" id={this.props.feed.options[1].optionId+this.props.feed.options[0].optionId} onClick={this.nextQuestion}>
    <span className="next glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    </button>
      </div>
      </div>
    );
}
  
});

module.exports = PollsDisplay;
