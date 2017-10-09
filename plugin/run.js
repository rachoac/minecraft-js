var request = require('http/request');
exports.run = function(script) {
    if (!script) {
        script = 'current.js'
    }
    var scriptName = '__current_' + self.name;
    request.request('http://localhost:3000/script/' + script + '?scriptName=' + scriptName,
        function(c, body) {
            echo(body);
            eval(body);
            eval(scriptName + '();');
        });
}