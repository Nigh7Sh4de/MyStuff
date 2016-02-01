var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
// var _db = require('../../db');
// var _db = {
//     _foods: [],
//     _settings: {
//         home_cols: []
//     }
// };
// var _days = [];//_db._days;
// var _foods = _db._foods;
// var _settings = _db._settings;

var GetTotal = function(prop, day) {
    var total = 0;
    day.food.forEach(function (foodId) {
        var food = _foods.findById(foodId);
        total += food[prop] || 0;
    });
    return total;
}

Array.prototype.findById = function(ID) {
    for (var i=0;i<this.length;i++) {
        if (this[i]._id == ID) {
            return this[i];
        }
    }
    return null;
}

var DayItem = React.createClass({
    viewfood: function() {
        // CurrentDay = _days.findById(this.props._id);
        // redraw(FoodItemListPage)
    },
    render: function() {
        var totals = this.props.data.home_cols.map(function(c) {
            var t =  GetTotal(c, this.props.day);
            return (<td key={c}>{t}</td>);
        }.bind(this));
        return (
            <tr key={this.props.day._id}>
                <td>
                    <a href={"/foods/" + this.props.day._id} className="btn btn-default"><span className="glyphicon glyphicon-tasks"></span></a>
                </td>
                <td>
                    {this.props.day.date}
                </td>
                {totals}
            </tr>
        );
    }
})

var DayToday = React.createClass({
    render: function() {
        // console.log('totals:::' + JSON.stringify(this.props.day.totals));
        var totals = this.props.home_cols.map(function(c) {
            // console.log('totals[' + c + '] = ' + this.props.day.totals[c]);
            return (<td key={c}>{this.props.day.totals[c]}</td>);
        }.bind(this));

        return (
            <tr key={this.props.day._id}>
                <td>
                    <a href={"/foods/" + this.props.day._id} className="btn btn-success"><span className="glyphicon glyphicon-plus"></span></a>
                </td>
                <td>
                    {this.props.day.date}
                </td>
                {totals}
            </tr>
        );
    }
});

var DaysPage = React.createClass({
    somevar: 123,
    render: function() {

        var c = 1;
        var days = this.props.data.days.map(function(d) {
            // console.log(c + ':::'  + JSON.stringify(d));
            if (c++ < this.props.data.days.length)
                return <DayItem day={d} key={d._id} home_cols={this.props.data.home_cols} />
            else {
                return <DayToday day={d} key={d._id} home_cols={this.props.data.home_cols} />
            }
        }.bind(this)).reverse();

        var home_cols = this.props.data.home_cols.map(function(c) {
            return (<th key={c}>{c}</th>);
        });

        return (
            <div>
                <ReactBootstrap.Table responsive hover style={{width:"1%", whiteSpace:"nowrap"}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            {home_cols}
                        </tr>
                    </thead>
                    <tbody>
                        {days}
                    </tbody>
                </ReactBootstrap.Table>


            </div>
        );
    }
});

var navs = (
    <ul className="nav navbar-nav">
        <li key="nd"><a href="#"><span className="glyphicon glyphicon-plus"></span> Day</a></li>
        <li key="vf"><a href="/foods">View Food</a></li>
        <li key="ss"><a href="/settings"><span className="glyphicon glyphicon-cog"></span></a></li>
    </ul>
);

module.exports = { page: DaysPage, navs: navs, name: 'days' };

if (typeof window !== 'undefined') {
    window.onload = function() {
        var el = React.createElement(DaysPage, window.APP_PROPS);
        ReactDOM.render(el, document.getElementById('reactComponent'));
    }
}
