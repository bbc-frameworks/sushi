// see: http://github.com/mmonteleone/pavlov
// see: http://cjohansen.no/sinon/

QUnit.specify('Loading Javascript modules.', function() {
	describe('Loading and sandboxing', function() {
		it('should pass a jQuery object into the callback', function() {
			expect(9);
			
			stop(3000); // start asynchronous test
			
			require(
				{ baseUrl: 'area' },
				['jquery-1.4'],
				function(myJquery) {
					assert(window.myJquery).isUndefined('loaded modules should not appear in the global scope');
					assert(myJquery).isDefined('loaded modules should be passed into the callback');

					assert(typeof myJquery).equals('function', 'the jQuery argument should be a function');
					
					// does it look like a jQuery?
					assert(typeof myJquery.css).equals('function', 'the jQuery argument should have the expected methods');
					assert(typeof myJquery.fn).equals('object', 'the jQuery argument should be extensible');
					
					// does it work like jQuery?
					var spy = sinon.spy(myJquery, 'isArray');
					var arrResult = myJquery.isArray([]);
					assert(arrResult).isTrue('calling a method on jQuery should return the expected result');
					assert(spy.calledOnce).isTrue();
					
					var result = myJquery('*');
					assert(typeof result.length).equals('number', 'querying a selector in selector should return a number');
					
					// is it the correct version of jQuery?
					assert(myJquery.fn.jquery).equals('1.4.2', 'the jQuery argument should be the expected version of jQuery');
					
					start(); // end asynchronous test
				}
			);
		});
	});

	describe('Adding plugins to jQuery', function() {
		it('should be possible to modify the jQuery object with a plugin', function() {
			expect(4);
			
			stop(3000); // start asynchronous test
			
			require(
				{ baseUrl: 'area' },
				['jquery-1.4', 'plugins/foo'],
				function(/*function*/myJquery, /*undefined*/foo) {
					assert(myJquery).isDefined('the jQuery function should be passed into the callback');
					assert(foo).isUndefined('plugins should not be passed into the callback');
					
					// is the plugin feature defined?
					assert(typeof myJquery.fn.foo).equals('function', 'the plugin should modify the jQuery function');
					
					// is it usable?
					myJquery('body').foo();
					assert(myJquery('body').attr('title')).equals('foo', 'calling the plugin method should affect the given DOM nodes');
					
					start(); // end asynchronous test
				}
			);
		});
	});
	
	describe('Adding jQueryUI to jQuery', function() {
		it('should be possible to modify the jQuery object with jQueryUI extensions', function() {
			expect(2);
			
			stop(3000); // start asynchronous test
			
			require(
				{ baseUrl: 'area' },
				['jquery-1.4', 'plugins/jqueryui-1.8'],
				function(myJquery) {
					assert(myJquery).isDefined('the jQuery function should be passed into the callback');
					
					// is the plugin feature defined?
					assert(typeof myJquery.ui).equals('object', 'jQueryUI should add a ui object to jQuery');
					
					// manual test?
					myJquery('#test-element').draggable();
					
					start(); // end asynchronous test
				}
			);
		});
	});
	
	describe('Depending on a CSS file.', function() {
		it('should be possible to depend on a CSS file', function() {
			expect(3);
			
			stop(3000); // start asynchronous test
			
			require(
				{ baseUrl: 'mock' },
				['jquery-1.4', 'a'],
				function($, a) {
					assert(a).isDefined('the required module should be passed into the callback');
					assert(a.name).equals('Bee', 'the required module should have access to its dependencies data');
					assert( $('#a').css('z-index') ).equals(12345, 'the dependent css should be applied when the callback is evaluated');
					start(); // end asynchronous test
				}
			);
		});
	});
});