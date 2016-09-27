var React = require('react');
var StockBookStore = require('../stores/StockBookStore');
var StockBookUtils = require('../webutils/StockBookUtils')

var StockBookComponent = React.createClass({
	getInitialState: function(){
		return ({stockbookInfo : {}});
	},
	componentDidMount: function(){
		console.log(this.state.stockbookInfo["value"]);
		StockBookUtils.getStockBookInfo("http://www.domain.com/?billId=6");
        StockBookStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        StockBookStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
    	this.setState({stockbookInfo : StockBookStore.getStockBookInfo()});
	},
	render: function(){
		function objectSize(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
		};
		if(objectSize(this.state.stockbookInfo)>0){
		return(	
		<div className="billContainer">
		<div className="row">
			<div className="col-md-6 billCategory">
				<h3><span className="label label-default">Item balance left: {Math.round(this.state.stockbookInfo["value"])} kg</span></h3>
			</div>
			<div className="col-md-6 billCategory">
				<h3><span className="label label-default">{this.state.stockbookInfo["categoryName"]}</span></h3>
			</div>
		</div><br/>
		<StockBookTable stockbookInfo={this.state.stockbookInfo}/>
		<div className="row">
			<div className="col-md-4 col-md-offset-8">
				<a href="#" className="pull-right">Download stockbook</a><br/>
				<a href="#" className="pull-right">Download voucher</a><br/>
				<a href="#" className="pull-right">Download receipt</a>
			</div>
		</div>
		</div>
		);}
		else{
			return(
				<div className="spinner">
				<div className="row">
	                <div className="col-md-12 col-md-offset-4">
	                <img src="images/Loading.gif"/>
	                </div>
                </div>
                </div>
            );
		}
	}
});

var StockBookTable = React.createClass({
	render: function(){
		return(		
		<div className="row StockBookTable">
		<div className="col-md-12">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Date</th>
						<th>Details</th>
						<th>Opening balance</th>
						<th>Purchased/Received</th>
						<th>Issued</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1/07/2014</td>
						<td>Purchased at Sai Stores, Medchal by Ranjith</td>
						<td>10</td>
						<td>450</td>
						<td>1</td>
						<td>449</td>
					</tr>
					<tr>
						<td>2/07/2014</td>
						<td>Purchased at Sai Stores, Medchal by Ramana</td>
						<td>449</td>
						<td>150</td>
						<td>2</td>
						<td>148</td>
					</tr>
					<tr>
						<td>3/07/2014</td>
						<td>Purchased at Sai Stores, Medchal by Vasanth</td>
						<td>148</td>
						<td>200</td>
						<td>3</td>
						<td>197</td>
					</tr>
					<tr>
						<td>3/07/2014</td>
						<td>Purchased at Sai Stores, Medchal by Neerad</td>
						<td>197</td>
						<td>100</td>
						<td>4</td>
						<td>96</td>
					</tr>
					<tr>
						<td>4/07/2014</td>
						<td>Purchased at Sai Stores, Medchal by Ranjith</td>
						<td>96</td>
						<td>100</td>
						<td>5</td>
						<td>95</td>
					</tr>
				</tbody>
			</table>
		</div>
		</div>
		);
	}
});

module.exports = StockBookComponent;