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

var person = {
	name: "Jason",
	age: 21,
	job: "student",

	sayName: function() {
		return this.name
	}
}

var person = {};
Object.defineProperty(person, "name", {
	writable: false,  //标记是否可更改
	configurable: false,  //标记是否可被删除，而且，一旦把属性定义为不可配置的，就不能再把它变回可配置了
	Enumerable: false,  //表示能否通过for-in循环返回属性
	value: "Jason"  //包含这个属性的数据值，读取属性值的时候从这个位置读取
});

function Person() {

}

Person.prototype.name = "Jason";
Person.prototype.age = 21;
Person.prototype.sayName = function() {
	return this.name;
};

var person1 = new Person();
person1.sayName();  //Jason

var person2 = new Person();
alert(person1.sayName == person2.sayName);  //true
//person1和person2都包含一个内部属性，该属性仅仅指向了Personprototype
//当时党委对象实例增加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性
//当对该属性进行delete之后，就恢复了对原型中对应属性的连接
//通过使用hasOwnProperty()方法，当对象实例重写属性之后就会返回true

//函数用来判断该属性到底存在于对象中还是存在于原型中
function hasPrototypeProperty(object, name) {
	return !object.hasOwnProperty(name) && (name in object);
}

//重设构造函数，只适用于ECMAScript5兼容的浏览器
//实例中的指针仅指向原型，而不指向构造函数
function Person() {
}

var friend = new Person();

Person.prototype = {
	constructor = Person,
	name: "Nicholas",
	age: 21,
	job: "Software Engineer",
	sayName: function() {
		return this.name;
	}
};

friend.sayName();  //error

//组合使用构造函数模式和原型模式
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["shelby", "Court"];
}

Person.prototype = {
	constructor: Person,
	sayName: function() {
		alert(this.name);
	}
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Grey", 23, "Doctor");

person1.friends.push("Van");
alert(person1.friends);
alert(person2.friends);
alert(person1.friends == person2.friends);
alert(person1.sayName == person2.sayName);

//动态原型模式
//这里对原型所做的修改，能够立即在所有的实例中得到反应
//谨记：使用动态原型模式时，不能使用对象字面量重写原型
//因为在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;

	if (typeof this.sayName != "function") {
		Person.prototype.sayName = function() {
			alert(this.name);
		};
	}
}

var friend = new Person("Jason", 21, "Software Engineer");
friend.sayName();

//寄生构造函数模式:返回的对象与构造函数或者与构造函数的原型属性之间没有关系
//  也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么区别。为此不能
//  依赖instanceof操作符来确定对象类型
//假设我们想创建一个具有额外方法的特殊数组
function SpecialArray() {
	//创建数组
	var values = new Array();

	//添加值
	values.push.apply(values, arguments);

	//添加方法
	values.toPipedString = function() {
		return this.join("|");
	};

	//返回数组
	return values;
}

var colors = new SpecialArray("red", "blue", "green");
colors.toPipedString();

// 不能依赖instanceof 操作符确定对象，所以尽量不用
colors instanceof SpecialArray;  //false
colors instanceof Array; //true

// 稳妥构造函数
function Person(name, age, job) {
	var o = new Object();

	o.sayName = function() {
		return name;
	};

	return o;
}

var friend = Person("MingEr", 21, "Software Engineer");
friend.sayName();


//原型链
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperValue = function() {
	return this.property;
}

//继承SuperType
function SubType() {
	this.subProperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
	return this.subProperty;
};

var instance = new SubType();
instance.getSuperValue();
//此时instance.constructor是SuperType
//因为SubType的原型指向了另一个对象--SuperType的原型

//给原型添加方法的代码一定要放在替换原型的语句之后
//在通过原型链实现继承时，不能使用对象字面量创建原型方法




JSValidation