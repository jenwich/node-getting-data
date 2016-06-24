
var path = require('path')
var jsdom = require('jsdom')
var fs = require('fs')
var jquerySource = fs.readFileSync(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js'), 'utf8')

module.exports = function(url, reducer, callback) {
    jsdom.env({
        url,
        src: [jquerySource],
        done: function(err, window) {
            reducer(window.$, callback)
        }
    })
}
