var router = require("./lib/router");
var helper = require("./lib/helper");

module.options = {
	defaults: {
		'allow-origin': "*",
		'max-age': 36000,
		'allow-headers': null,
		'expose-headers': null,
		'allow-credentials': false
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

			/*
			 * Set CORS headers in the response
			 */
			$.header("Access-Control-Allow-Methods", methods.join(", "));
			$.header("Access-Control-Allow-Origin", module.options.values["allow-origin"]);
			$.header("Access-Control-Max-Age", module.options.values["max-age"]);

			// console.log(module.options.values);

			if(module.options.values["allow-headers"]){
				$.header("Access-Control-Allow-Headers", module.options.values["allow-headers"]);
			}

			if(module.options.values["expose-headers"]){
				$.header("Access-Control-Expose-Headers", module.options.values["expose-headers"]);
			}

			if(module.options.values["allow-credentials"]){
				$.header("Access-Control-Allow-Credentials", module.options.values["allow-credentials"]);
			}

			// Set status 204 with empty body when method is OPTIONS
			if($.method == "OPTIONS"){
				$.status(204);
				$.end();
			}
		}

		$.return();
	}
}