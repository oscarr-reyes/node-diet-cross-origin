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

			// Check for allow-headers option
			if(prop == "allow-headers" && options.defaults[prop]){
				property = parseHeader(options.defaults[prop], prop);
			}

			// Check for expose-headers option
			if(prop == "expose-headers" && options.defaults[prop]){
				property = parseHeader(options.defaults[prop], prop);
			}

			// Check for allow-credentials option
			if(prop == "allow-credentials" && options.defaults[prop]){
				if(!utils.isBoolean(options.defaults[prop])){
					throw new Error(`Default option for "${prop}" must be boolean`);
					break;
				}

				// Set passed value
				property = options.defaults[prop];
			}

			values[prop] = options.defaults ? property : options.defaults[prop];
		}

		return {
			values: values
		};
	}
};

/**
 * Parses the value for header data in response
 * 
 * @param  {String|Array} value The value of the data to be parsed for the header
 * @param  {String}       name  The name of the header that is going to be parsed
 * @return {String}             The parsed value for the header
 */
function parseHeader(value, name){
	// Throw error if value is not array or string
	if(value && (!utils.isArray(value) && !utils.isString(value))){
		throw new Error(`Default Header for "${name}" must be Array or String`);
	}

	// In case when no error was threw, check if value is array
	// Set all values to UpperCase and join the values into a string
	else if(utils.isArray(value)){
		// Capitalize each string in the array
		value.forEach((element, index) => {
			var stringParts = element.split("-");
			var arr = [];

			stringParts.forEach((e, i) => {
				arr.push(firstUpperCase(e));
			});

			value[index] = arr.join("-");
		});

		value = value.join(", ");
	}

	return value;
}

/**
 * Capitalizes to upper case the string on the first letter only
 * @param  {String} str The string to capitalize
 * @return {String}     The capitalized string
 */
function firstUpperCase(str){
	return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}