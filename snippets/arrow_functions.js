const greeter = {
	greet: function (name) {
		console.log("Hello ", name);
	},
	greetAll: function (names) {
		names.forEach((name) => {
			this.greet(name);
		})
	}
};

greeter.greetAll(["abl", "dabl", "kill"]);
