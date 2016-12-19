var helper = require("./../lib/helper");

module.options = {
	defaults: {
		'allow-origin': "*",
		'max-age': 36000,
		'allow-headers': null,
		'expose-headers': null,
		'allow-credentials': false
	}
};

var options = module.options;

describe("parsing values through helper", () => {
	it("should parse proper arguement type", () => {
		expect(() => {helper.parseOptions()})
			.to.throw("Options is undefined");
		
		expect(() => {helper.parseOptions(false)})
			.to.throw("Options parameter must be an object");
	});

	it("should return an object containing \"values\" object", () => {
		expect(helper.parseOptions(options)).to.include.keys("values");
	});

	describe("value for \"allow-headers\" in \"values\" object on either String or Array", () => {
		it("should throw error when provided value is not valid", () => {
			options.defaults["allow-headers"] = true;
			
			expect(() => {helper.parseOptions(options)})
				.to.throw(`Default Header for "allow-headers" must be Array or String`);
		});

		it("should contain multiple headers as string when Array is passed", () => {
			options.defaults["allow-headers"] = ["ORIGIN", "content-type"];

			expect(helper.parseOptions(options).values)
				.to.include.keys("allow-headers");

			assert.isString(helper.parseOptions(options).values["allow-headers"]);
		});

		it("should have same provided value if provided value is String", () => {
			options.defaults["allow-headers"] = "Content-Type";

			expect(helper.parseOptions(options).values)
				.to.include.keys("allow-headers");
			
			assert.isString(helper.parseOptions(options).values["allow-headers"]);
		});
	});

	describe("value for \"expose-headers\" in \"values\" object on either String or Array", () => {
		it("should throw error when provided value is not valid", () => {
			options.defaults["expose-headers"] = true;
			
			expect(() => {helper.parseOptions(options)})
				.to.throw(`Default Header for "expose-headers" must be Array or String`);
		});

		it("should contain multiple headers as string when Array is passed", () => {
			options.defaults["expose-headers"] = ["ORIGIN", "content-type"];

			expect(helper.parseOptions(options).values)
				.to.include.keys("expose-headers");

			assert.isString(helper.parseOptions(options).values["expose-headers"]);
		});

		it("should have same provided value if provided value is String", () => {
			options.defaults["expose-headers"] = "Content-Type";

			expect(helper.parseOptions(options).values)
				.to.include.keys("expose-headers");
			
			assert.isString(helper.parseOptions(options).values["expose-headers"]);
		});
	});

	describe("value for \"allow-credentials\" in \"values\" object to be Boolean", () => {
		it("should throw error when value is not boolean", () => {
			options.defaults["allow-credentials"] = "true";

			expect(() => {helper.parseOptions(options)})
				.to.throw(`Default option for "allow-credentials" must be boolean`);
		});

		it("should be Boolean value", () => {
			options.defaults["allow-credentials"] = true;

			assert.isBoolean(helper.parseOptions(options).values["allow-credentials"]);
		});
	});
});