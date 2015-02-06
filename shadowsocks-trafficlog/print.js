var fs = require('fs')

var f = JSON.parse(fs.readFileSync('./trafficlog.json', 'utf-8'))

for (var i in f) {
    console.log('Port #' + i + ' = ' + f[i].meter + '\t + ' + f[i].last + '\t = ' + (f[i].last + f[i].meter))
}
