var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var axios = require('axios');

var CurrentDay = null;

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
        CurrentDay = this.props.day;
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
    addday: function(day) {
        this.props.data.days.unshift(day);
        this.forceUpdate();
    },
    render: function() {
        var c = 1;
        var days = this.props.data.days.map(function(d) {
            if (c++ > 1)
                return <DayItem day={d} key={d._id} home_cols={this.props.data.home_cols} />
            else {
                return <DayToday day={d} key={d._id} home_cols={this.props.data.home_cols} />
            }
        }.bind(this));

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
                            <Navs dayspage={this} />
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
    createday: function(e) {
        if (e.target.id != "override" && CurrentDay.date == new Date().toDateString()) {
            this.open();
            return;
        }
        console.log('Ready to create new day');
        CurrentDay["archive"] = true;
        axios.all([
            axios.patch('/days/' + CurrentDay._id, { archive: true }),
            axios.post('/days', {
                date: new Date().toDateString(),
                food: [],
                archive: false
            })
        ]).then(function (response) {
            console.log(response);

            // (function () {
            //     this.addday(response[1].data.result);
            // }.bind(this.props.dayspage))();

            this.props.dayspage.addday(Object.assign(response[1].data.result, {totals: []}));



            // if (this.props.refresh != null)
                // this.props.refresh();
        }.bind(this))
        //  _days.push(CurrentDay = {
            // id: _days.generateId(),
            // food: [],
            // date: new Date().toDateString()
        // });
        this.close();
        // dayspage.forceUpdate();
        // redraw(DaysPage);
    },
    open: function() {
        this.setState({showModal: true});
    },
    close: function() {
        this.setState({showModal: false});
    },
    getInitialState: function() {
        return ({showModal: false});
    },
    render: function() {
        return (
            <div>
                <ul className="nav navbar-nav">
                    <li key="nd"><a href="#" onClick={this.createday}><span className="glyphicon glyphicon-plus"></span> Day</a></li>
                    <li key="vf"><a href="/foods">View Food</a></li>
                    <li key="ss"><a href="/settings"><span className="glyphicon glyphicon-cog"></span></a></li>
                </ul>

                <ReactBootstrap.Modal show={this.state.showModal} onHide={this.close}>
                    <ReactBootstrap.Modal.Body>
                        <h4>Confirm new day</h4>
                        <p>You already made a new day today. Are you sure you want to generate a new day with today&#39;s date?</p>
                    </ReactBootstrap.Modal.Body>
                    <ReactBootstrap.Modal.Footer>
                        <button className="btn btn-warning" id="override" onClick={this.createday}>Confirm</button>
                        <button className="btn btn-default" onClick={this.close}>Close</button>
                    </ReactBootstrap.Modal.Footer>
                </ReactBootstrap.Modal>
            </div>
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
