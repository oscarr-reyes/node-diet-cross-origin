var utils = require("utils-pkg");

var ignore = ["header", "footer", "missing", "error"];

module.exports.isRegistrered = (url, map) => {
	return this.getMethods(url, map).length > 0;
}

module.exports.hasRoute = (url, arr) => {
	for(route in arr){
		if(route == url){
			return true;
		}
	}

	return false;
}

module.exports.getMethods = (url, map) => {
	var methods = [];

	for(method in map){;
		if(!utils.inArray(ignore, method) && this.hasRoute(url, map[method])){
			methods.push(method.toUpperCase());
		}
	}

	return methods;
}