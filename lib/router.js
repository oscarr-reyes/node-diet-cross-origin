var utils = require("utils-pkg");
var match = require("path-match")();

/**
 * List of ignored route handers on diet
 * 
 * @type {Array}
 */
var ignore = ["header", "footer", "missing", "error"];

/**
 * Checks if the provided url is registrered in any method
 * in the server
 * 
 * @param  {String}  url The url to check methods
 * @param  {Object}  map The map object of the route application
 * @return {Boolean}     Whether the url is registrered in any route
 */
module.exports.isRegistrered = (url, map) => {
	return this.getMethods(url, map).length > 0;
}

/**
 * Checks if the provided url is registrered in the provided route
 * 
 * @param  {String}  url The url to check the route
 * @param  {Object}  arr The route method of the application
 * @return {Boolean}     Whether the url is registrered in the route
 */
module.exports.hasRoute = (url, arr) => {
	// Check if the provided url matches with the list of registrered routes
	for(route in arr){
		if(route == url || match(route)(url) !== false){
			return true;
		}
	}

	return false;
}

/**
 * Gathers a list of all methods that have the provided url
 * 
 * @param  {String} url The url to find the methods
 * @param  {Object} map The route map object of the application
 * @return {Array}      List of all methods that holds the provided url
 */
module.exports.getMethods = (url, map) => {
	var methods = [];

	for(method in map){;
		// Do not check on ignored route handlers
		if(!utils.inArray(ignore, method) && this.hasRoute(url, map[method])){
			methods.push(method.toUpperCase());
		}
	}

	return methods;
}