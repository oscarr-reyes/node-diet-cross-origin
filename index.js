var router = require("./lib/router");
var helper = require("./lib/helper");

module.options = {
	defaults: {
		'allow-origin': "*",
		'max-age': 36000,
		'allow-headers': null,
		'expose-headers': null,
		'allow-credentials': null
	}
};

module.exports = options => {
	options = options == undefined ? {} : options;

	// Define and parse options
	module.options = helper.parseOptions(options);

	return $ => {
		// Check if the current request is registrered
		if(router.isRegistrered($.url.pathname, $.app.routes)){
			// Get all methods for the registrered request url
			var methods = router.getMethods($.url.pathname, $.app.routes);

			$.header("Access-Control-Allow-Methods", methods.join(", "));
			$.header("Access-Control-Allow-Origin", module.options.values["allow-origin"]);
			$.header("Access-Control-Max-Age", module.options.values["max-age"]);
		}

		$.return();
	}
}