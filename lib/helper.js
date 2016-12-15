var utils = require("utils-pkg");

/**
 * Parses options of the package
 * 
 * @param  {Object} options The object options provided
 * @return {Object}         The parsed object options
 */
module.exports.parseOptions = (options) => {
	if(options == null){
		throw new Error("Options is undefined");
	}

	else if(!utils.isObject(options)){
		throw new Error("Options parameter must be an object");
	}

	else{
		var values = {};

		// Iterate for each default option from the module
		for(prop in module.parent.options.defaults){
			var property = module.parent.options.defaults[prop];

			values[prop] = options.defaults ? options.defaults[prop] : property;
		}

		return {
			values: values
		};
	}
};