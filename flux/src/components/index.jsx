var React = require('react');
var ReactDOM = require('react-dom');

var page = React.createClass({
    render: function() {
        var innerHtml = {__html: 'window.APP_PROPS = ' + JSON.stringify(this.props.pageParams) + ';'};

        return(
            <html>
                <head>
                    <title>Super Flux</title>

                    <link rel="stylesheet" href="/css/bootstrap.css" />

                </head>
                <body>

                    <div id="reactComponent">
                        {this.props.page}
                    </div>

                    <script dangerouslySetInnerHTML={innerHtml}></script>

                </body>
            </html>

        );
    }
})

module.exports = React.createFactory(page)
