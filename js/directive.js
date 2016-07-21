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
	// button hover effect
var buttonHover = function() {
	return {
		restrict: 'A',
		link: function() {
			$(".next-button").hover(function() {
				$('.next-button').css("opacity", "0.6");
			}, function() {
				// console.log(scrollIndex)
				$('.next-button').css("opacity", "1");
			})
		}
	}
}


angApp
	.directive('adaptiveHeight', adaptiveHeight)
	.directive('buttonHover', buttonHover)