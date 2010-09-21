// see: http://github.com/joshuaclayton/specit

describe('Loading and sandboxing', function() {
	before(function() {
	});
	
	after(function() {
	});
	
	it('should pass a jQuery object into the callback', function() {
		expect(7);
		
		(typeof myJquery).should(eql, 'undefined');
		
		stop(3000); // start asynchronous test
		
		require(
			{ baseUrl: 'dist/' },
			['amaebi/jquery'],
			function(myJquery) {
				// is it defined?
				myJquery.shouldNot(equal, undefined);
				
				// is it a function?
				myJquery.should(beA, Function);
				
				// does it look like a jQuery?
				myJquery.should(respondTo, 'css');
				myJquery.fn.should(beA, Object);
				
				// does it work like jQuery?
				var result = myJquery('*');
				result.length.should(beA, Number);
				
				// is it the correct version of jQuery?
				myJquery.fn.jquery.should(eql, '1.4.2');
				
				start(); // end asynchronous test
			}
		);
	});
});