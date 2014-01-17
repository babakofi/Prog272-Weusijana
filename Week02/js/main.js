var foo = {
	firstName : 'Able',
	lastName : 'Thomas',
	func : function() {
		return this.firstName;
	}
};
// Foo foo = new Foo();
console.log('foo.func():', foo.func());
