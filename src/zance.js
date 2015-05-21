function isFn(fn) {
	return Object.prototype.toString.call(fn) === '[object Function]';
}

function isObj(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function define(obj, items, type, options) {
	options = options || {
			writable: true,
			configurable: true
		};

	for (var m in items) {
		if (!items.hasOwnProperty(m)) {
			continue;
		}

		if (m === 'initalize') {
			console.log('found init!');
		}

		// TODO :: handle already staged objects
		obj[m] = options;
		obj[m][type] = items[m];
	}
}

var zance = function(obj) {
	return zance.create.call(this, obj);
};

zance.create = function(obj) {
	var base = isFn(obj) ? obj : function() {};

	return zance.extend.call(base, obj);
};

zance.extend = function(obj) {
	//var methods = isFn(obj) ? {} : obj;

	return new zance.initializator(this, obj);
};

zance.implement = function() {

};

zance.initializator = function(data) {
	this.contr = {
		obj: isFn(data) ? data : function() {},
		properties: {},
		methods: {
			extend: zance.extend,
			implement: zance.implement
		},
		initalize: isFn(data) ? data : null
	};

	if(isObj(data)) {
		this.methods(data);
	}
};

zance.initializator.prototype = {
	constructor: zance.initializator,

	constants: function(items) {
		define(this.contr.properties, items, 'value', {
			writable: false,
			configurable: true
		});

		return this;
	},

	properties: function(items) {
		define(this.contr.properties, items, 'value', {
			writable: true,
			configurable: true
		});

		return this;
	},

	methods: function(items) {
		define(this.contr.methods, items, 'value', {
			writable: true,
			configurable: true
		});

		return this;
	},

	getters: function(items) {
		define(this.contr.methods, items, 'get', {});

		return this;
	},

	setters: function(items) {
		define(this.contr.methods, items, 'set', {});

		return this;
	},

	create: function() {
		var obj = this.contr.obj;

		obj.prototype = Object.defineProperties(obj.prototype, this.contr.methods);
		obj = Object.create(obj.prototype, this.contr.properties);

		if (this.contr.initalize) {
			this.contr.initalize.apply(obj, arguments);
		}

		return obj;
	}
};

module.exports = zance;
