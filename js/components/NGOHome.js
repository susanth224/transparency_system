var React = require('react');
var Infinite = require('react-infinite');
var NGODetailsStore = require('../stores/NGODetailsStore')
var webAPIUtils = require('../webutils/Webutils');
var NotificationBox=require("../components/NotificationBox");
var offset=0;
var length=6;
var NGOCardDisplay = React.createClass({
    navigate: function(){
      window.location="#/campaigns/about";
    },  
  render : function(){
     var campaignFundingPercentage=( this.props.card.fundedQunatity / this.props.card.goal) * 100; 
		return(
			<div>
			<div className="fluid-container">
			<div className="col-md-3 col-lg-3 col-sm-5 col-xs-12 " id="idPadding" onClick={this.navigate} style={{"cursor":"pointer"}}> 
			
  						<div id="gridStyle">

								<div className="triangle-down pull-right">
	  								<div></div>
	  							</div>
	  							<h5 className="text-right fundedPercentage"><strong>{campaignFundingPercentage}%</strong></h5>
					       <div className="pull-right"></div>
                 <img className="img img-responsive img-center" style={{"height":"150px","width":"300px"}} src="images/carosel/campaign.jpg" alt="NGO Logo">
	  								<br/>
	  								</img>
	  								<small>
			  						<p>
		  							<strong><center>{this.props.card.title}</center></strong>
		  							
	  						</p>
	  						<table className="table table-bordered fundingTable" cellPadding="10">
								<tr>
									<td>
										<strong>
										<span className="campaignText">Pledged</span><br/>
										{this.props.card.pledgedQuantity}
										</strong>
									</td>
									<td>
										<strong>
										<span className="campaignText">Fullfilled</span>
										<br/>
										{this.props.card.fulfilledQuantity }
										</strong>

									</td>
								</tr>
								</table>
								<table className="table table-bordered fundedTable" cellPadding="5">
								<tr>
									<td>
										<strong>
										<span className="campaignText">Funded</span>
										<br/>
										{this.props.card.fundedQunatity }
										</strong>
									</td>
									<td>
										<strong>
										<span className="campaignText">Goal</span>
										<br/>
										{this.props.card.goal}
										</strong>
									</td>
									<td>
										<strong>
										<span className="campaignText">Days Left</span>
										<br/>
										{this.props.card.timeLeft}
										</strong>
									</td>
								</tr>
							</table>
							</small>
	  					</div>	
  					</div>		
  				</div>
			</div>

          );

    }
  });
var Carousel= React.createClass({
    render: function () {
      return (

        <div>
      <div id="carousel-example" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel-example" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example" data-slide-to="1"></li>
          <li data-target="#carousel-example" data-slide-to="2"></li>
          <li data-target="#carousel-example" data-slide-to="3"></li>
          <li data-target="#carousel-example" data-slide-to="4"></li>
          <li data-target="#carousel-example" data-slide-to="5"></li>
          <li data-target="#carousel-example" data-slide-to="6"></li>
        </ol>
        <div className="carousel-inner">
            

          <div className="item active">
             <div style={{"background":"url(images/carosel/5.png) center center","backgroundSize":"cover"}} className="slider-size">
          </div>
            <div className="carousel-caption">
              My Image1
            </div>
          </div>
          <div className="item">
             <div style={{"background":"url(images/carosel/1.png) center center","backgroundSize":"cover"}} className="slider-size">
          </div>
            <div className="carousel-caption">
              My Image1
            </div>
          </div>
          <div className="item">
             <div style={{"background":"url(images/carosel/2.jpg) center center","backgroundSize":"cover"}} className="slider-size">
          </div>
            <div className="carousel-caption">
              My Image1
            </div>
          </div>
          <div className="item">
             <div style={{"background":"url(images/carosel/3.jpg) center center","backgroundSize":"cover"}} className="slider-size">
              <div className="carousel-caption">
                <h2>My Laptop Image</h2>
                <p>This is acer v5 model system </p>
              </div>
          </div>
            <div className="carousel-caption">
              My Image1
            </div>
          </div>
          <div className="item">
             <div style={{"background":"url(images/carosel/4.png) center center", "backgroundSize":"cover"}} className="slider-size">
              <div className="carousel-caption">
                <h2>ProgrammingImage</h2>
                <p>Image of progrmaming text in a graphical way </p>
              </div>
          </div>
            <div className="carousel-caption">
              My Image2
            </div>
          </div>
          <div className="item">
             <div style={{"background":"url(images/carosel/6.png) center center", "backgroundSize":"cover"}}  className="slider-size">
              <div className="carousel-caption">
                <h2>I am spider</h2>
                <p>this is a spiderman image </p>
              </div>
          </div>
            <div className="carousel-caption">
              My Image3
            </div>
          </div>
        </div>
        <a className="left carousel-control" href="javascript:void(0)" 
             data-slide="prev" data-target="#carousel-example">
        <span className="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a className="right carousel-control" href="javascript:void(0)" 
             data-slide="next" data-target="#carousel-example">
        <span className="glyphicon glyphicon-chevron-right"></span>
        </a>
    </div>
    <hr/>
  </div>);
    }
    });

var Navbar = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default">
  <div className="container-fluid">
    
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Brand</a>
    </div>

    
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>);
  }
});

var NGOHome = React.createClass({
    getInitialState : function(){
		    webAPIUtils.getCampaignsList(offset,length);
        return ({campaigns : NGODetailsStore.getCampaignsList(),isLoading: false,});
        },
    componentDidMount: function(){
        NGODetailsStore.addChangeListener(this._onChange);
        window.addEventListener("scroll", this.handleScroll);
        this.notificationsRender() ;
    },
     notificationsRender: function(){
        React.render(<NotificationBox/>,document.getElementById("Show_Right"));
    },
    componentWillUnmount: function(){
        NGODetailsStore.removeChangeListener(this._onChange);
        window.removeEventListener("scroll", this.handleScroll);
    },
    _onChange: function(){
        this.setState({campaigns : NGODetailsStore.getCampaignsList()});
         data=this.state.campaigns;
        console.log("_onChange",data);
    },
    handleScroll:function(){
      var windowHeight = $(window).height();
      var inHeight = window.innerHeight;
      var scrollT = $(window).scrollTop();
      var totalScrolled = scrollT+inHeight;

      if(totalScrolled+10>windowHeight && scrollT!=0){ 
        console.log("handleScroll");
        if(!this.state.isloading){ 
        this.setState({
        isloading:true,
        });
        this.getMore();
      }
      }
    },
    getMore:function(){
      offset = offset+length; 
      webAPIUtils.getCampaignsList(offset,length);  
      this.setState({
      isloading:false,
      });
      },
    
  
	render : function(){
		if(this.state.campaigns.length>0){
      var Nodes = this.state.campaigns.map(function(card, index){
      return (
            <NGOCardDisplay card={card}/>);
      });
    return(
      <div >
        <div><Carousel/></div>
           <div>
              {Nodes}
          </div>
        </div>
     
      );
      }
    
    else{
      return(
      <div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}>
                <img src="images/Loading.gif"/>
                </div>);
    }

	}
});
module.exports = NGOHome;
