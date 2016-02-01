var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var axios = require('axios');

Array.prototype.findById = function(ID) {
    for (var i=0;i<this.length;i++) {
        if (this[i]._id == ID) {
            return this[i];
        }
    }
    return null;
}

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
    editfood: function(e) {
        redraw(CreateFoodPage,{food:this.props.food});
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
                    <button onClick={this.editfood} className="btn btn-default">
                        <span className="glyphicon glyphicon-cog"></span>
                    </button>
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
            return <FoodItem count={count} refresh={this.refresh} food={food} key={food.name} />
        }.bind(this));

        if (CurrentDay != null && CurrentDay.archive) {
            for (var i=0,j=0;i<foods.length;i++,j++)
                if (CurrentDay.food.indexOf(j) < 0)
                    foods.splice(i--, 1);
        }

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

        return (
            <div>
                <ReactBootstrap.Table hover style={{width: "1%", whiteSpace: "nowrap"}}>
                    <FoodItemList data={this.props.data} />
                </ReactBootstrap.Table>
            </div>
        );
    }
});

var navs = (
    <ul className="nav navbar-nav">
        <li key="bk"><a href="/days">Back</a></li>
        <li key="cf"><a href="/foods/new"><span className="glyphicon glyphicon-plus"></span> Food</a></li>
    </ul>
);

module.exports = { page: FoodItemListPage, navs: navs, name: 'foods' };

if (typeof window !== 'undefined') {
    window.onload = function() {
        var el = React.createElement(FoodItemListPage, window.APP_PROPS);
        ReactDOM.render(el, document.getElementById('reactComponent'));
    }
}
