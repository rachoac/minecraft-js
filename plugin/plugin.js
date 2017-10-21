var http = require('http/request');
exports.plugin = function(script) {
    var options = {
        url: 'http://localhost:3000/plugin/' + self.name + '/' + script,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Content-length': body.length
        },
        params: {}
    };
    echo('Saving plugin...');
    http.request(options, function(c, r) {
        echo('...done');
    });
}