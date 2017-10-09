var http = require('http/request');
exports.save = function(script, body) {
    var options = {
        url: 'http://localhost:3000/script/' + script,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Content-length': body.length
        },
        params: { script: body }
    };
    echo('Saving script...');
    http.request(options, function(c, r) {
        echo('...done');
    });
}