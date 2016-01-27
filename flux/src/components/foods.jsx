var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var axios = require('axios');
var _db = require('../../db');
var _foods = _db._foods;
var _days = _db._days;

Array.prototype.findById = function(ID) {
    for (var i=0;i<this.length;i++) {
        if (this[i].id == ID) {
            return this[i];
        }
    }
    return null;
}

CurrentDay = {};

var SetCurrentDay = function(id) {
    CurrentDay = _days.findById(id);
}

var FoodItem = React.createClass({
    addfood: function() {
        CurrentDay.food.push(this.props.food.id);

        axios.patch('/days', {
            id: CurrentDay.id,
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
        var foods = _foods.map(function(food) {
            if (CurrentDay == null)
                return <FoodItem food={food} key={food.name} />

            var count = CurrentDay.food.filter(function(d) {
                return d == food.id;
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

        SetCurrentDay(this.props.id);

        return (
            <div>
                <ReactBootstrap.Table hover style={{width: "1%", whiteSpace: "nowrap"}}>
                    <FoodItemList />
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


if (typeof window !== 'undefined') {
  window.onload = function() {
      var pageId = 3;
      ReactDOM.render(<FoodItemListPage id={pageId} />, document.getElementById('reactComponent'));
    //  ReactDOM.render(<FoodItemListPage id="3" />, document.getElementById('reactComponent'));
  }
}

module.exports = { page: FoodItemListPage, navs: navs, name: 'foods' };

// if (typeof window !== 'undefined') {
//   window.onload = function() {
//     var params = window.__params__;
//      ReactDOM.render(React.createElement(FoodItemListPage, params), document.getElementById('reactComponent'));
//   }
// }
