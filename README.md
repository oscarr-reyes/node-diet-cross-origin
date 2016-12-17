# diet-cross-origin
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

##Credits

Oscar Reyes [Nosthertus]

##License

[MIT](https://github.com/Nosthertus/node-diet-cross-origin/blob/master/LICENSE)