
var path = require('path')
var fs = require('fs')
var download = require('download')

var title = process.argv[2] || "default"
var reducer = require('./reducer-core')
var defaultReducer = require(path.join(__dirname, 'reducers', process.argv[3] || 'default'))

fs.readFile('tmp', (err, data) => {
    var arr = data.toString().split('\n')
    arr.pop()
    downloadList(arr)
})

function downloadList(list) {
    var dir = './dist/'+ title
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    Promise.all(listPromisify(list)).then(() => {
        console.log(`Finish all ${list.length} files`)
    })
}

function listPromisify(list) {
    var promises = list.map(item => download(item))
    promises.forEach((item, index) => {
        var ext = list[index].split('.').slice(-1)[0]
        var filename = `${title}-${fillZero(index+1, list.length)}.${ext}`;
        var dir = path.join(__dirname, 'dist', title, filename)
        item.pipe(fs.createWriteStream(dir))
        item.then(() => {
            console.log(`Finish download '${dir}'`)
        })
    })
    return promises
}

function fillZero(n, max) {
    var width = (max + '').length
    n = n + ''
    return n.length >= width? n: new Array(width - n.length + 1).join(0) + n;
}
