React=require('react');
var Select = require('react-select');
var Search = require('react-search');
var DateTimeField = require('react-bootstrap-datetimepicker');
var DonationActions = require('../actions/DonationActions');
var DonationsStore = require('../stores/DonationsStore');
var DonationCalls = require('../webutils/DonationCalls');
var SearchByFilterValue='';
var SearchField='';
var ToDateTime='';
var FromDateTime='';
var DonationBox=React.createClass({
	getInitialState : function(){
		DonationCalls.getListOfDonations();
		return ({DonationsList:DonationsStore.getAllList(),DonationTotalAmount:DonationsStore.getTotalDonation(),DonationTotalBill:DonationsStore.getTotalBill()});
		},
	componentDidMount: function(){
        DonationsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        DonationsStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
		this.setState({DonationsList:DonationsStore.getAllList(),DonationTotalAmount:DonationsStore.getTotalDonation(),DonationTotalBill:DonationsStore.getTotalBill()});
	},
	render : function(){
		var totalDonationsList=(this.state.DonationsList.length>0) ? <DonationsList donationsList={this.state.DonationsList}/>:<div className="col-md-2 col-md-offset-5 center" style={{'marginTop':"5%"}}><img className="img img-responsive img-center" src="images/Loading.gif"/></div>;
		console.log("list ",this.state.DonationsList,totalDonationsList);
		return(		
			<div className="container">
				<DonationsSearch/>
				<DonationAmount DonationTotalAmount={this.state.DonationTotalAmount} DonationTotalBill={this.state.DonationTotalBill} /><br/><br/>
				{totalDonationsList}
			</div>
			);
		}
});
var DonationsSearch=React.createClass({
	getInitialState : function(){
		return ({searchBy:'',value:'',SF:<InputputField/>});
	},
	FilterChange : function(){
		this.setState({searchBy:SearchByFilterValue,value:this.state.value,SF:SearchField});;
	},
	render: function render() {
		return (
			<div className="row">
				<div className="col-md-12">
			        <div className="col-md-4">
			        	<SearchByFilter Change={this.FilterChange}/>
			        </div>
					<div className="col-md-8">
			            {this.state.SF}
					</div>
			    </div>
		    </div>
		);
	}
});

var InputputField=React.createClass({
	getInitialState : function(){
		return ({searchBy:'',value:''});
	},
	onChangeSearch : function(e){
		e.preventDefault();
		this.setState({value:e.target.value});
	},
	onClickSearch : function(e){
		e.preventDefault();
		if(!this.state.searchBy && !this.state.value)
			return;
		console.log({"searchBy":SearchByFilterValue,"searchValue":this.state.value});
		DonationCalls.SearchDonation({"searchBy":SearchByFilterValue,"searchValue":this.state.value});
	},
	render: function render(){
		return(
				<div><Search items={[]} onChange={this.onChangeSearch}/>
			            <button id="searchbutton" type="button" className="btn btn-info icon" onClick={this.onClickSearch}>
			                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			            </button></div>
			);
	}
});

var DateTimeFields=React.createClass({
	onChangeFromDateTimeFields : function(e){
		FromDateTime=new Date(Number(e)).toISOString().slice(0,-1);
	},
	onChangeToDateTimeFields : function(e){
		ToDateTime=new Date(Number(e)).toISOString().slice(0,-1);
	},
	onClickDateSearch : function(e){
		e.preventDefault();
		if(!FromDateTime && !ToDateTime)
			return;
		console.log({"searchBy":SearchByFilterValue,"fromDateTime": FromDateTime,"toDateTime": ToDateTime});
		DonationCalls.SearchDonationByDateTime({"searchBy":SearchByFilterValue,"fromDateTime": FromDateTime,"toDateTime": ToDateTime});
	},
	render: function render(){
		return(<div>
			<div className="col-md-5">
				<DateTimeField defaultText="Please select From date" onChange={this.onChangeFromDateTimeFields}/></div>
			<div className="col-md-5">
				<DateTimeField defaultText="Please select To date" onChange={this.onChangeToDateTimeFields}/></div>
			<div className="col-md-2">
				<button id="datesearchbutton" type="button" className="btn btn-info" onClick={this.onClickDateSearch}>
					<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
			    </button></div>
			</div>
			);
	}
});

var SearchByFilter=React.createClass({
	changeFilter: function(value){
		SearchByFilterValue=value;
		if(value=="DATETIME"){
			SearchField=<DateTimeFields/>;
		}
		else{
			SearchField=<InputputField/>
		}
		this.props.Change();
	},
	render: function render() {
		options=[{"label":"PHONE NUMBER","value":"PHONE NUMBER"},{"label":"CATEGORY","value":"CATEGORY"},{"label":"FUNDS ABOVE","value":"FUNDS ABOVE"},{"label":"FUNDS BELOW","value":"FUNDS BELOW"},{"label":"DATETIME","value":"DATETIME"},{"label":"DONATION ID","value":"DONATION ID"}];
		return React.createElement(
			'div',null,
			React.createElement(Select, {
				value:SearchByFilterValue,
				multi: false,
				placeholder: 'Select Filter',
				options: options,
				onChange:this.changeFilter
				})
		);
	}
	
});

var DonationAmount=React.createClass({
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
                                    <span className="head text-warning">Total Amount Donated</span>
                                    <br/>
                                    <span className="amount text-success">{Math.round(Number(DonationTotalAmount))}</span>
                                </td>
                                <td className="totalAmount">
                                    <span className="head text-warning">Total Amount Spent</span>
                                    <br/>
                                    <span className="amount text-success">{Math.round(Number(DonationTotalBill))}</span>
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
		console.log("hit",this.props.donationsList);
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
	donatinsBills(){
		console.log("I am in div",this.props.donationDetails.donationId);
		document.cookie="DonationDetails="+JSON.stringify(this.props.donationDetails);
		DonationCalls.getListOfBillsForDonation(this.props.donationDetails.donationId);
	},
	render : function(){
		var donatedQuantity=Math.ceil(this.props.donationDetails.donatedQuantity);
		var spentAmount=Math.ceil(this.props.donationDetails.spentAmount);
		return(
	<div className="col-md-8 col-md-offset-2">
		<div className="row"  style={{"border":"1px solid grey"}} onClick={this.donatinsBills}>
			<a href={"#donationsbills"}>
				<div className="col-md-12">
					<div className="col-md-1">
						<img className="img-responsive userImage" src="images/user.png"/>
					</div>
					<div className="col-md-8">
						<h4 className="media-heading">{this.props.donationDetails.donorName}</h4>
						<p>time</p>
					</div>
					<div className="col-md-3">
						<h4>{this.props.donationDetails.categoryName}</h4>
						<text>{this.props.donationDetails.donationId}</text>
					</div>
				</div>
				<br/><br/>
				<hr/>
				<div className="col-md-12">
				  <div className="col-md-6">Amonunt Donated:{Math.round(Number(donatedQuantity))}</div>
				  <div className="col-md-6">Amonunt Spent: {Math.round(Number(spentAmount))}</div>
				</div><br/><br/>
			</a>
		</div>
		<br/><br/>

    </div>
			);
	}
});


module.exports = DonationBox;