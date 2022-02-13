const express = require('express');
const cors = require('cors');
const app = express()
// bodyParser = require("body-parser");
// app.use(bodyParser());
app.use(cors());
app.use(express.static('./static'));
const path = require('path')
const fs = require('fs');

/*//////////

    Global Logic

*///////////

var client_id = '7dd4375a157f4605986791b0aee9735d';
var redirect_uri = '/home';
var state = "hjkbasbfhmwkefsd";//generateRandomString(16);

Object.defineProperty(global, '__stack', {
    get: function() {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
    }
});
Object.defineProperty(global, '__function', {
    get: function() {
            return __stack[2].getLineNumber();
        }
});
console.log = (msg) => {
    console.debug("[ app->" + (__function) + " @ " + new Date().toLocaleString() + "]: ", msg)
}
app.get('/', (req, res) => {
    const options = {
        root: './static/'
    }
    res.sendFile('index.html', options)
})
app.post('/auth', (req, res) => {
    var scope = 'user-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
});
app.listen(8079);
