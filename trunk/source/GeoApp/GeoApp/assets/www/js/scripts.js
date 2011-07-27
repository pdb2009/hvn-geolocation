(function($) {
	var methods = {
		initGlobal : function() {
			//TODO:
			$.mobile.autoBackBtn = true;
		},
		initPage1 : function() {
			var $page = $("#page1");
			//TODO:
			$page.find("a[href='#page2'],").click(function(){
				$("#page2").data('demo', 'lee2');
			});
			$page.find("a[href='#page3'],").click(function(){
				$("#page3").data('demo', 'lee3');
			});
		},
		initPage2 : function() {
			var $page = $("#page2");
			//TODO:
			$page.bind('pagebeforeshow', function(){
				var $demo = $page.data('demo');
				$page.find(".content").text($demo);
			});
		},
		initPage3 : function() {
			var $page = $("#page3");
			//TODO:
			$page.bind('pageshow', function(){
				var $demo = $page.data('demo');
				$page.find(".content").text($demo);
			});
		},
		initAll : function() {
			$().initApp("initGlobal");
			$().initApp("initPage1");
			$().initApp("initPage2");
			$().initApp("initPage3");
		}
	}
	$.fn.initApp = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.initAll.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist' );
		}
	}
})(jQuery);
$(document).ready(function(){
	$().initApp();
});