var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var axios = require('axios');

CurrentDay = {};
SetCurrentDay = function(day) {
    CurrentDay = day;
}

var FoodItem = React.createClass({
    addfood: function() {
        CurrentDay.food.push(this.props.food._id);
        axios.patch('/days/' + CurrentDay._id, {
            food: CurrentDay.food
        }).then(function (response) {
            if (this.props.refresh != null)
                this.props.refresh();
        }.bind(this));
    },
    render: function () {
        return (
            <tr>
                <td>
                    <button onClick={this.addfood} disabled={CurrentDay == null || CurrentDay.archive} className="btn btn-success">+</button>
                </td>
                <td style={{verticalAlign:"middle"}}>
                    <span className="badge">{this.props.count}</span>&nbsp;
                    {this.props.food.name}
                </td>
                <td>
                    <a href={'/editfood/' + this.props.food._id} className="btn btn-default">
                        <span className="glyphicon glyphicon-cog"></span>
                    </a>
                </td>
            </tr>
        );
    }
})

var FoodItemList = React.createClass({
    refresh: function() {
        this.forceUpdate();
    },
    render: function() {
        var foods = this.props.data.foods.map(function(food) {
            if (CurrentDay == null)
                return <FoodItem food={food} key={food.name} />
            var count = CurrentDay.food.filter(function(d) {
                return d == food._id;
            }).length;
            return <FoodItem count={count} refresh={this.refresh} food={food} key={food._id} />
        }.bind(this));

        return (
                <tbody>
                    {foods}
                </tbody>
        );
    }
})

var FoodItemListPage = React.createClass({
    render: function() {
        SetCurrentDay(this.props.data.day);
        var foodname = this.props.data.day == null ? 'All food' : this.props.data.day.date;
        return (
            <div>
                <nav className="navbar navbar-default" style={{marginBottom: 0}}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Meelz</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <Navs />
                        </div>
                    </div>
                </nav>

                <ul className="breadcrumb">
                    <li><a href="/days">Home</a></li>
                    <li className="active">{foodname}</li>
                </ul>

                <ReactBootstrap.Table hover style={{width: "1%", whiteSpace: "nowrap"}}>
                    <FoodItemList data={this.props.data} />
                </ReactBootstrap.Table>

                <script src={'/components/foods.js'}></script>

            </div>
        );
    }
});

var Navs = React.createClass({
    render: function() {
        return (
            <ul className="nav navbar-nav">
                <li key="cf"><a href="/foods/new"><span className="glyphicon glyphicon-plus"></span> Food</a></li>
            </ul>
        )
    }
});

module.exports = React.createFactory(FoodItemListPage);

if (typeof window !== 'undefined') {
    window.onload = function() {
        var el = React.createElement(FoodItemListPage, window.APP_PROPS);
        ReactDOM.render(el, document.getElementById('reactComponent'));
    }
}
