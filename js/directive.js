'use strict';

/*intro*/

// adaptive height for every page
var adaptiveHeight = function() {
		return {
			restrict: 'A',
			link: function() {
				$('.page').height($(window).height());
			}
		}
	}

angApp
	.directive('adaptiveHeight', adaptiveHeight)
