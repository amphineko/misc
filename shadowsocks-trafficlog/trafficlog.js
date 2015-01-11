var exec          = require('child_process').exec;
var moment        = require('moment');
var readFileSync  = require('fs').readFileSync;
var writeFileSync = require('fs').writeFileSync;

var r = /(\d*) ACCEPT.*\:(\d*)/g;

function getData(callback) {
    exec('iptables -L -x -v -n', function (error, data) {
        var d = parseData(data);
        callback(d);
    });
}

function parseData(text) {
    var rec = {};
    var lines = text.replace(r, function (raw, volume, port) {
        port = parseInt(port);
        if (port > 10240) {
            volume = volume.substr(0, volume.length - 6);
            if (volume == '')
                volume = '0';
            volume = parseInt(volume);
            if (rec[port])
                rec[port] += volume;
            else
                rec[port] = volume;
        }
    });
    return rec;
}

setInterval(function () {
    var local = JSON.parse(readFileSync('/root/trafficlog.json', { encoding: 'utf-8' }));
    getData(function (a) {
        for (var i in a) {
            if (local[i])
                /* port exists */
                if (local[i].last > a[i])
                    /* iptables has been reset */
                    local[i].meter += local[i].last, local[i].last = a[i], console.log('[' + i + '] Slot reset');
                else
                    /* update last field */
                    local[i].last = a[i];
            else
                /* port not exists */
                local[i] = {
                    meter: 0,
                    last: a[i]
                }, console.log('Created slot record [' + i + ']');
        }
        writeFileSync('/root/trafficlog.json', JSON.stringify(local), { encoding: 'utf-8' });
    });
    console.log(moment().format('Checkpoint: YYYY-MM-DD HH:mm:SS'));
}, 5000);
