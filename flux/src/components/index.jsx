var React = require('react');
var ReactDOM = require('react-dom');

var page = React.createClass({
    render: function() {

        // console.log(JSON.stringify(this.props.pageParams));
        // console.log('GO FUCK YOURSELF WITH A CACTUS YOU PIECE OF SHIT!!!!!!');
        // console.log(JSON.stringify({params: this.props.pageParams}));

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
