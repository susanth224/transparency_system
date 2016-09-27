React=require('react');
var MyDonationActions =  require('../actions/profileDetailsActions');
var MyDonationsStore =require('../stores/profileDetailsStore');
var DonationCalls = require('../webutils/profileDetailscalls');
var DonationBillsCalls = require('../webutils/DonationCalls');
var MyDonationBox=React.createClass({
	getInitialState : function(){
		DonationCalls.getListOfMyDonations();
		return ({MyDonationsList:MyDonationsStore.getMyList(),MyDonationTotalAmount:MyDonationsStore.getMyTotalDonation(),MyDonationTotalBill:MyDonationsStore.getMyTotalBill()});
		},
	componentDidMount: function(){
        MyDonationsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        MyDonationsStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
		this.setState({MyDonationsList:MyDonationsStore.getMyList(),MyDonationTotalAmount:MyDonationsStore.getMyTotalDonation(),MyDonationTotalBill:MyDonationsStore.getMyTotalBill()});
	},
	render : function(){
		var myDonationDetailsList=(this.state.MyDonationsList.length>0)?<MyDonationsList donationsList={this.state.MyDonationsList}/>:<div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}><img className="img img-responsive img-center" src="images/Loading.gif"/></div>;
		return(		
			<div className="container">
				<MyDonationAmount DonationTotalAmount={this.state.MyDonationTotalAmount} DonationTotalBill={this.state.MyDonationTotalBill} /><br/><br/>
				{myDonationDetailsList}
			</div>
			);
		}
});
var MyDonationAmount=React.createClass({
	render : function(){
		var DonationTotalAmount=Math.ceil(this.props.DonationTotalAmount);
		var DonationTotalBill=Math.ceil(this.props.DonationTotalBill);
		return(
			<div className="row">
                <div className="col-md-offset-3 col-md-6">
                    <table className="table table-responsive total">
                        <tbody>
                            <tr>
                                <td className="totalAmount">
                                    <span className="head">Total Amount Donated</span>
                                    <br/>
                                    <span className="amount text-success">{DonationTotalAmount}</span>
                                </td>
                                <td className="totalAmount">
                                    <span className="head text-warning">Total Amount Spent</span>
                                    <br/>
                                    <span className="amount text-success">{DonationTotalBill}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
			);
	}
});

var MyDonationsList=React.createClass({
	render : function(){
		var allDonations=this.props.donationsList.map(function(donation, index){
			var identity=index;
			return (
				<MyDonation donationDetails={donation}/>
				);
			});
		return(
			<div>
				{allDonations}
			</div>
			);
	}
});
var MyDonation=React.createClass({
	getBills : function(){
		document.cookie="DonationDetails="+JSON.stringify(this.props.donationDetails);
		DonationBillsCalls.getListOfBillsForDonation(this.props.donationDetails.donationId);
	},
	render : function(){
		var donatedQuantity=Math.ceil(this.props.donationDetails.donatedQuantity);
		var spentAmount =Math.ceil(this.props.donationDetails.spentAmount);
		return(
	<div className="col-md-8 col-md-offset-2">
		<div className="row"  style={{"border":"1px solid grey"}} onClick={this.getBills}>
			<a href={"#donationsbills"}>
				<div className="col-md-12 media">
					<div className="col-md-1">
						<img className="img-responsive userImage" src="images/user.png"/>
					</div>
					<div className="col-md-8">
						<h4 className="media-heading">{this.props.donationDetails.donationId}</h4>
						<p>time</p>
					</div>
					<div className="col-md-3">
						<div className="media"><span className="price">{this.props.donationDetails.categoryName}</span></div>
					</div>
				</div>
				<br/><br/>
				<hr/>
				<div className="col-md-12">
				  <div className="col-md-6">Amonunt Donated:{donatedQuantity}</div>
				  <div className="col-md-6">Amonunt Spent: {spentAmount}</div>
				</div><br/><br/>
			</a>
		</div>
		<br/><br/>
    </div>
			);
	}
});


module.exports = MyDonationBox;