var React = require('React');
var ReactDOM = require('react-dom/server')

var indexPage = require('./src/components/index');
var daysPage = require('./src/components/days');
var foodsPage = require('./src/components/foods');

var Page = {
    index: indexPage,
    days: daysPage,
    foods: foodsPage
}

Page.default = Page.days;

Page.Build = function(page, params) {
    if (typeof page == "string")
        page = Page[page.toLowerCase()];

    if (page == null)
        return "404";

        // console.log(JSON.stringify({things: React.createFactory(page.page)(params)}));

        // var s = ReactDOM.renderToString(Page.index.page({page: page.page, pageParams: params, navs: page.navs, name: page.name}));
    var s = ReactDOM.renderToString(Page.index.page({page: React.createFactory(page.page)(params), pageParams: params, navs: page.navs, name: page.name}));
    return s;
}

module.exports = Page;
