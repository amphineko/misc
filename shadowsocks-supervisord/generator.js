var template = '\
[program:s{PORT}]\n\
command=ssserver -p {PORT} -k "{PASSWORD}" -m {METHOD} --fast-open --forbidden-ip 127.0.0.1,::1\n\
autorestart=true\n\
user=shadowsocks\n\n';

var csv = require('csv');
var fs  = require('fs');

csv.parse(fs.readFileSync('input.csv', 'utf-8'), function (error, data) {
    var c = '';

    if (!error) {
        for (var i in data)
            c += template
                .replace(/{PORT}/g, data[i][0])
                .replace(/{PASSWORD}/g, data[i][1])
                .replace(/{METHOD}/g, data[i][2]);
    } else {
        console.error(error);
    }

    fs.writeFileSync('output.conf', c, 'utf-8');
});
