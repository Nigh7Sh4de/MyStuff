var React = require('React');

var indexPage = React.createFactory(require('./src/components/index'));
var daysPage = React.createFactory(require('./src/components/days'));
var foodsPage = React.createFactory(require('./src/components/foods'));

var Page = {
    index: indexPage(),
    days: daysPage(),
    foods: foodsPage()
}

Page.default = Page.index;

Page.Build = function(page) {
    console.log(page);
    if (typeof page == String)
        page = Page[page.toLowerCase()];
    var s = React.renderToString(indexPage({page: page}));
    console.log(s);
    return s;
}

module.exports = Page;
