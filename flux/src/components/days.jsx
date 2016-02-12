var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');

var DayItem = React.createClass({
    render: function() {
        var totals = this.props.home_cols.map(function(c) {
            return (<td key={c}>{this.props.day.totals[c]}</td>);
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
        var totals = this.props.home_cols.map(function(c) {
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

                <script src={'/components/days.js'}></script>
            </div>
        );
    }
});

var Navs = React.createClass({
    render: function() {
        return (
            <ul className="nav navbar-nav">
                <li key="nd"><a href="#"><span className="glyphicon glyphicon-plus"></span> Day</a></li>
                <li key="vf"><a href="/foods">View Food</a></li>
                <li key="ss"><a href="/settings"><span className="glyphicon glyphicon-cog"></span></a></li>
            </ul>
        );
    }
});

module.exports = React.createFactory(DaysPage);

if (typeof window !== 'undefined') {
    window.onload = function() {
        var el = React.createElement(DaysPage, window.APP_PROPS);
        ReactDOM.render(el, document.getElementById('reactComponent'));
    }
}
