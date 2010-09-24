// require.def( 'plugins/foo', {
// 	build: function(jQuery) {
// 		
// /******* start plugin code *****/
// 		(function( $ ){
// 			$.fn.foo = function() {
// 				return this.each(function() {
// 					var $this = $(this);
// 					$this.attr('title', 'foo');
// 				});
// 			};
// 		})( jQuery );
// /******* end plugin code *****/
// 		
// 	}
// });


require.modify(
    'jquery-1.4',
    'plugins/foo',
    ['jquery-1.4'],
    function(jQuery) {

/******* start plugin code *****/

		//@modifies amaebi/jquery as jQuery
		(function( $ ){
			$.fn.foo = function() {
				return this.each(function() {
					var $this = $(this);
					$this.attr('title', 'foo');
				});
			};
		})( jQuery );
/******* end plugin code *****/

    }
);