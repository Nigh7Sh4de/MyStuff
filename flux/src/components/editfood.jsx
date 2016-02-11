var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

var EditableInfoProperty = React.createClass({
    render: function() {
        return (
            <div className={this.props.classes}>
                <span className="input-group-addon">{this.props.name}</span>
                <input className="form-control" id={this.props.name} type="text" onChange={this.props.onchange} ref="{this.props.name}"
                    defaultValue={this.props.value}/>
            </div>
        );
    }
})

var CreateFoodPage = React.createClass({
    getInitialState: function() {
        return this.props.food;
        //  || {
        //     name: this.props.food != null ? this.props.food.name : null,
        //     id: this.props.food != null ? this.props.food.id : _foods.generateId()
        // }
    },
    handleChange: function(e) {
        var state = this.state;
        var value = e.target.value;
        state[e.target.id] = e.target.id == 'name' || isNaN(value) || value == '' ?
                                    value : parseInt(value);
        this.setState(state);
    },
    edit: function() {
        return this.props.food != null && this.props.food.name != null;
    },
    valid: function(state) {
        state = state || this.state;
        var valid = true;
        this.props.props.forEach(function(p) {
            if (isNaN(state[p]) && state[p] != null && p != 'name')
                valid = false;
        });
        return valid;
    },
    render: function() {
        var valid = true;
        var props = this.props.props.map(function (p) {
            var classes = "input-group form-group";
            if (isNaN(this.state[p]) && this.state[p] != null && p != 'name'){
                classes += " has-error";
                valid = false;
            }
            return <EditableInfoProperty classes={classes} onchange={this.handleChange} ref={p} key={p} name={p} value={this.state[p]} />
        }.bind(this))
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Meelz</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <CreateFoodPageNav createfoodpage={this} />
                        </div>
                    </div>
                </nav>

                <form>
                    {props}
                </form>

                <script src="/components/editfood.js"></script>
            </div>
        );
    }
})

var CreateFoodPageNav = React.createClass({
    handleClick: function(event) {
        event.preventDefault();
        if (!this.valid())
            return false;

        var duplicates = false;

        axios.patch('/foods/' + this.props.createfoodpage.props.food._id, this.props.createfoodpage.state).then(function (response) {
            console.log('Saved.');
        }.bind(this));

        // var foundFood = this.props.createfoodpage.props.food != null ? _foods.findById(this.props.createfoodpage.props.food.id)
        //                 : null;
        // if (foundFood == null) {
        //     _foods.push(this.props.createfoodpage.state);
        // }
        // else {
            // _foods[_foods.indexOf(foundFood)] = this.props.createfoodpage.state;
        // }
        // redraw(FoodItemListPage);
    },
    valid: function() {
        return this.props.createfoodpage.state.name && this.props.createfoodpage.valid(this.props.createfoodpage.state);
    },
    back: function() {
        window.history.back();
    },
    render: function() {
        return (
            <ul className="nav navbar-nav">
                <li key="bk"><a href='#' onClick={this.back}>Back</a></li>
                <li key="cf" className={this.valid() ? "" : "disabled"} onClick={this.handleClick}><a href="#">{this.props.createfoodpage.edit() ? "Save" : "Create"}</a></li>
            </ul>
        )
    }
});


module.exports = React.createFactory(CreateFoodPage);

if (typeof window !== 'undefined') {
    window.onload = function() {
        var el = React.createElement(CreateFoodPage, window.APP_PROPS);
        ReactDOM.render(el, document.getElementById('reactComponent'));
    }
}
