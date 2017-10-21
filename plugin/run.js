var request = require('http/request');
echo("run() version 1")
exports.run = function(script) {
    const startingIndex = script ? 1 : 0
    if (!script) {
        script = 'current.js';
    }

    const args = []
    for ( var i = startingIndex; i < arguments.length; i++ ){
        args.push(arguments[i])
    }

    var scriptName = '__current_' + self.name;
    request.request('http://localhost:3000/script/' + self.name + '/' + script + '?scriptName=' + scriptName,
        function(c, body) {
            echo(body);
            eval(body);
            eval(scriptName + '.apply(this, args);');
        });
}