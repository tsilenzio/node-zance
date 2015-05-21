var expect = require('chai').expect,
	zance = require('../src/zance.js');

describe('Initalizing', function() {
	describe('with a function', function() {
		it('should create a property', function() {
			var cat = zance(function() {
				this.name = 'jerry';
			}).create();

			expect(cat.name).to.equal('jerry');
		});

		describe('and constants', function() {
			it('should create an unchangeable property', function() {
				var mouse = zance(function() {
					this.name = 'tom';
				}).constants({
					family: 'rodent'
				}).create();

				expect(mouse.family).to.equal('rodent');
				mouse.family = 'godzilla';
				expect(mouse.family).to.equal('rodent');
			});
		});

		describe('and properties', function() {
			it('should create a changable property', function() {
				var dog = zance(function() {
					this.name = 'spot';
				}).properties({
					sound: 'wolf'
				}).create();

				expect(dog.sound).to.equal('wolf');
				dog.sound = 'bark';
				expect(dog.sound).to.equal('bark');
			});
		});

		describe('and methods', function() {
			it('should create an invokable function', function() {
				var monkey = zance(function() {
					this.name = 'spike';
				}).methods({
					climb: function() {
						return 'climbing'
					}
				}).create();

				expect(monkey).to.respondTo('climb');
				expect(monkey.climb()).to.equal('climbing');
			});
		});

		describe('and getters', function() {
			it('should create a property getter', function() {
				var fish = zance(function() {
					this.name = 'bubbles';
				}).getters({
					action: function() {
						var action = this.status;

						if(this.status === undefined) {
							this.status = 'swimming';
						}

						return action;
					}
				}).create();

				expect(fish.action).to.be.undefined;
				expect(fish.action).to.equal('swimming');
			});
		});

		describe('and setters', function() {
			it('should create a property setter', function() {
				var bird = zance(function() {
					this.name = 'flapps';
				}).setters({
					action: function(value) {
						this.status = value;
					}
				}).create();

				expect(bird.action).to.be.undefined;
				bird.action = 'flying';
				expect(bird.status).to.equal('flying');
			});
		});
	});
});
