
module.exports = function($, callback) {
    var imgList = $('img').map(function() {
        return $(this).prop('src')
    }).toArray()
    callback(imgList)
}

