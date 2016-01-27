var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var _db = require('../../db');
var _days = _db._days;
var _foods = _db._foods;
var _settings = _db._settings;

var GetTotal = function(prop, dayId) {
    var day = _days.findById(dayId);
    var total = 0;
    day.food.forEach(function (foodId) {
        var food = _foods.findById(foodId);
        total += food[prop] || 0;
    });
    return total;
}

Array.prototype.findById = function(ID) {
    for (var i=0;i<this.length;i++) {
        if (this[i].id == ID) {
            return this[i];
        }
    }
    return null;
}

var DayItem = React.createClass({
    viewfood: function() {
        // CurrentDay = _days.findById(this.props.id);
        // redraw(FoodItemListPage)
    },
    render: function() {
        var totals = _settings.home_cols.map(function(c) {
            var t =  GetTotal(c, this.props.id);
            return (<td key={c}>{t}</td>);
        }.bind(this));
        return (
            <tr key={this.props.id}>
                <td>
                    <a href={"/foods/" + this.props.id} className="btn btn-default"><span className="glyphicon glyphicon-tasks"></span></a>
                </td>
                <td>
                    {this.props.date}
                </td>
                {totals}
            </tr>
        );
    }
})

var DayToday = React.createClass({
    addfood: function() {
        // CurrentDay = _days.findById(this.props.id);
        // redraw(FoodItemListPage);
    },
    render: function() {
        var totals = _settings.home_cols.map(function(c) {
            var t =  GetTotal(c, this.props.id);
            return (<td key={c}>{t}</td>);
        }.bind(this));
        return (
            <tr key={this.props.id}>
                <td>
                    <a href={"/foods/" + this.props.id} className="btn btn-success"><span className="glyphicon glyphicon-plus"></span></a>
                </td>
                <td>
                    {this.props.date}
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
        var days = _days.map(function(d) {
            if (c++ < _days.length)
                return <DayItem date={d.date} total={d.total} id={d.id} key={d.id} />
            else {
                return <DayToday date={d.date} total={d.total} id={d.id} key={d.id} />
            }
        }.bind(this)).reverse();

        var home_cols = _settings.home_cols.map(function(c) {
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
    React.renderComponent(<DaysPage />, document.getElementById('reactComponent'));
  }
}
