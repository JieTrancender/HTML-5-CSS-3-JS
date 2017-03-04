//理解对象
var person =  {
	name: "Jason",
	age: 20,
	job: "Software Engineer",

	sayName: function() {
		alert(this.name);
	}
}

alert("Name: " + person.name + ", Age: " + person.age + ", Job: " + person.job);
person.sayName()

// 属性类型
var person = new Object()
Object.defineProperty(person, "name", {
	writable: false,
	value: "Jason"
});

alert(person.name);
person.name = "MingEr";
alert(person.name);


//访问其属性
var book = {
	_year: 2004,
	version: 1
};

Object.defineProperty(book, "year", {
	get: function() {
		return this._year;
	},
	set: function(newValue) {
		if (newValue > this._year) {
			this.version += newValue - this._year;
			this._year = newValue;
		}
	}
});

book.year = 2005;
alert(book.version);

//定义多个属性
var book = {};

Object.defineProperties(book, {
	_year: {
		value: 2004,
		writable: true
	},

	version: {
		value: 1,
		writable: true
	},

	year: {
		get: function() {
			return this._year;
		},

		set: function(newValue) {
			if (newValue > this._year) {
				this.version += newValue - this._year;
				this._year = newValue;
			}
		}
	}
});

alert(book.year);
alert(book.version);
book.year = 2016;
alert(book.year);
alert(book.version);
