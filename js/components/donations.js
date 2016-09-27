React=require('react');
var DonationActions = require('../actions/DonationActions');
var DonationStore = require('../stores/DonationsStore');
var DonationCalls = require('../webutils/DonationCalls');
var DonationBox=React.createClass({
	getInitialState : function(){
		Donations.getListOfDonations();
				return ({DonationsList:DonationsStore.getAllList(),DontionTotalAmount:DonationsStore.getTotalDonation(),DonationTotalBill:DonationsStore.getTotalBill()});
		},
	componentDidMount: function(){
        CommentStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        CommentStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
		this.setState({Comments_info:CommentStore.getAllDonations()});
	},
	onSubmit : function(comment)
	{
		CommentActions.createComment(comment);
	},
	render : function(){
		return(		
			<div className="container">
				<DonationsSearch/>
				<DonationAmount/>
				<DonationsList donationsList={this.state.DonationsList}/>
			</div>
			);
		}
});
var DonationsSearch=React.createClass({
	render : function(){
		return(
			<div className="row">
				<div className="col-md-12">
					<div className="col-md-6">
			            <div className="input-group" id="adv-search">
			                <input type="text" className="form-control" placeholder="Searching....." />
			                <div className="input-group-btn">
			                	<button type="button" className="btn btn-primary icon" >
			                		<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			                	</button>
							</div>
			            </div>
			        </div>
			        <div className="col-md-6">
			        	<select className="form-control">
						  <option>User</option>
						  <option>Donation Id</option>
						  <option>Place</option>
						  <option>Category</option>
						  <option>Caterer</option>
						</select>
			        </div>
			    </div>
		    </div>
			);
	}
});

var DonationAmount=React.createClass({
	render : function(){
		return(
			<div className="row">
                <div className="col-md-offset-3 col-md-6">
                    <table className="table table-responsive total">
                        <tbody>
                            <tr>
                                <td className="totalAmount">
                                    <span className="head text-warning">Total Amount Donated</span>
                                    <br/>
                                    <span className="amount text-success">120000</span>
                                </td>
                                <td className="totalAmount">
                                    <span className="head text-warning">Total Amount Spent</span>
                                    <br/>
                                    <span className="amount text-success">1200000</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
			);
	}
});

var DonationsList=React.createClass({
	render : function(){
		var allDonations=this.props.donationsList.map(function(donation, index){
			var identity=index;
			return (
				<Donation donationDetails={donation}/>
				);
			});
		return(
			<div>
				{allDonations}
			</div>
			);
	}
});
var Donation=React.createClass({
	render : function(){
		return(
			<div>
				<text>{this.props.dontaionDetails.donorName}</text>
			</div>
			);
	}
});