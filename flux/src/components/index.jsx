var React = require('react');
var ReactDOM = require('react-dom');

var page = React.createClass({
    render: function() {

        var daysPageScriptText = "window.__params__ = "
                             + JSON.stringify(this.props)
                             + ";";
         var daysPageScript = {
             __html: daysPageScriptText
         }

        return(
            <html id="html">
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

                    <script src="/react.js"></script>

                    <script dangerouslySetInnerHTML={daysPageScript}></script>
                    <script src="/index.js"></script>


                </body>
            </html>

        );
    }
})
//<script src={'/components/' + this.props.name + '.js'}></script>
module.exports = { page: React.createFactory(page) }

if (typeof window !== 'undefined') {
  window.onload = function() {
    var params = window.__params__;
    console.log(JSON.stringify(params));
    ReactDOM.render(React.createElement(params.page, params), document.getElementById('html'));
  }
}
