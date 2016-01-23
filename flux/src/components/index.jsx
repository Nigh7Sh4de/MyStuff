var React = require('react');

module.exports = React.createClass({
    render: function() {
        return(
            <html>
            <head>
                <title>Super Flux</title>
            </head>
            <body>
                {this.props.page}
            </body>
            </html>
        );
    }
})
