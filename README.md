# diet-cross-origin
[![Build Status](https://travis-ci.org/Nosthertus/node-diet-cross-origin.svg?branch=master)](https://travis-ci.org/Nosthertus/node-diet-cross-origin)
[![Coverage Status](https://coveralls.io/repos/github/Nosthertus/node-diet-cross-origin/badge.svg?branch=master)](https://coveralls.io/github/Nosthertus/node-diet-cross-origin?branch=master)

A CORS module for diet.js that automatically sends CORS headers to the browser

##Installation
```bash
$ npm install diet-cross-origin
```

##Usage
```Javascript
var diet        = require("diet");
var crossOrigin = require("diet-cross-origin");

var app = diet();

var opts = {
	defaults: {
    	origin: "www.example.com"
    }
};

app.header(crossOrigin(opts));

app.listen(80);
```

##Documentation
`diet-cross-origin` contains a map object which defines the values sent in header for all requests, these options must be passed in `diet-cross-origin` module as object param

**defaults.allow-origin [String] - Optional (default: *)**

Origin from where CORS can accept calls in the server

* * *

**defaults.max-age [Integer] - Optional (default: 36000)**

Time on which prefligh validation CORS will cache in browser, **value is set in deltatime**

* * *

**defaults.allow-headers [Array | String] - Optional (default: null)**

Custom headers to be accepted on request upon preflight validation

* * *

**defaults.expose-headers [Array | String] - Optional (default: null)**

Custom headers that the server will have as whitelist on which the browser is allowed to access

* * *

**defaults.allow-credentials [Boolean] - Optional (default: false)**

Whether or not the response to the request can be exposed

* * *

##Example
The module will automatically detect which methods are registrered on the request route and add other headers specified on module instance
```HTTP
Request
OPTIONS: www.example.com/users

Response
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://www.example.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Max-Age: 360000
```

##Credits

Oscar Reyes [Nosthertus]

##License

[MIT](https://github.com/Nosthertus/node-diet-cross-origin/blob/master/LICENSE)
