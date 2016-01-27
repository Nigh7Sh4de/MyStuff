var React = require('react');

var page = React.createClass({
    render: function() {
        return(
            <html>
                <head>
                    <title>Super Flux</title>

                    <link rel="stylesheet" href="/css/bootstrap.css" />

                </head>
                <body>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="/">Meelz</a>
                            </div>
                            <div className="collapse navbar-collapse">
                            {this.props.navs}
                            </div>
                        </div>
                    </nav>

                    <div id="reactComponent">
                        {this.props.page}
                    </div>

                    <script src={'/components/' + this.props.name + '.js'}></script>

                </body>
            </html>

        );
    }
})

module.exports = { page: React.createFactory(page) }
