'use strict';

var IntroCtrl = function($scope) {
	var scrollIndex = 1;
	// 分辨率检测，宽度低于300px，分辨率过低转无效页
	var resolutionDetection = function() {
		if ($(window).width() < 300) {
			window.location.href = "../invalid.html";
		}
	}
				$(".next-button").hover(function() {
				$('.next-button').css("opacity", "0.6");
			}, function() {
				// console.log(scrollIndex)
				$('.next-button').css("opacity", "1");
			})
	$scope.jump = function(index) {
		if (index == 1) {

		}
		if ($(".page" + index).offset() != undefined) {
			scrollIndex = index;
			// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			$("html,body").animate({
				scrollTop: $(".page" + scrollIndex).offset().top
			}, {
				duration: 600
			}, {
				easing: "easeOutSine"
			});
			$scope.loadAnimate.addPageAnimate(); //加载页面动画
		}
	}
	$scope.nextPage = function() {
			if (scrollIndex > 4) {
				return;
			}
			scrollIndex++;
			$("html,body").animate({
				"scrollTop": $(".page" + scrollIndex).offset().top
			}, {
				duration: 600
			}, {
				easing: "easeOutSine"
			});
			$scope.loadAnimate.addPageAnimate(); //加载页面动画
		}
		/*鼠标滚轮事件*/
	var mywheel = {
			/*注册窗口滚动事件*/
			addScrollListener: function() {
				//注册事件FireFox
				if (document.addEventListener) {
					document.addEventListener("DOMMouseScroll", mywheel.scrollFnc, false);
				}
				//W3C
				document.onmousewheel = document.onmousewheel = mywheel.scrollFnc;
			},
			/*取消窗口滚动事件*/
			removeScrollListener: function() {
				if (document.addEventListener) {
					document.removeEventListener("DOMMouseScroll", mywheel.scrollFnc);
				}
				document.onmousewheel = null;
			},
			/*滚动响应事件*/
			scrollFnc: function(e) {
				e = e || window.event;
				var dictValue = "";
				if (e.wheelDelta) {
					dictValue = e.wheelDelta;
				} else if (e.detail) { //FireFox
					dictValue = -e.detail;
				}
				// console.log(dictValue);
				if (dictValue < 0) {
					if (scrollIndex < $("div[class*=page]").length) {
						scrollIndex++;
						$("html,body").animate({
							"scrollTop": $(".page" + scrollIndex).offset().top
						}, {
							duration: 600
						}, {
							easing: "easeOutSine"
						});
					}
				} else {
					if (scrollIndex > 1) {
						scrollIndex--;
						$("html,body").animate({
							"scrollTop": $(".page" + scrollIndex).offset().top
						}, {
							duration: 600
						}, {
							easing: "easeOutSine"
						});
					}
				}
				mywheel.removeScrollListener();
				setTimeout(function() {
					mywheel.addScrollListener();
				}, 600);
				$scope.loadAnimate.addPageAnimate(); //加载页面动画			
			},
			init: function() {
				var _self = this;
				_self.addScrollListener();
			}
		}
		/*加载页面动画*/
	$scope.loadAnimate = {
			addPageAnimate: function() {
				if ($(window).width() < 700) {
					$(".go_top").animate({
						right: "-100px"
					}, 600);
					$('.next-button').animate({
						opacity: 1
					}, 600);
					if (scrollIndex == 5) {
						$('.next-button').animate({
							opacity: 0
						}, 500);
						$(".go_top").animate({
							right: "20px"
						}, 600);
					}
					return;
				}
				// 导航字随翻页选中变色
				$(".nav li a").removeClass('nav_shade2 nav_shade3 nav_shade4 nav_shade5');
				$(".nav li a[value=" + scrollIndex + "]").addClass("nav_shade" + scrollIndex);
				$('.page3 .right .item').removeClass('animatePage3');
				$('.page3 .left').removeClass('animatePage3');
				$(".go_top").animate({
					right: "-100px"
				}, 600);
				$('.next-button').animate({
					opacity: 1
				}, 600);
				switch (scrollIndex) {
					case 1:
						$('.nav-bg-init').removeClass('nav-bg-effect').fadeIn();
						$('.nav').removeClass('nav-toTop').fadeIn();
						$(".page2 div ul li i").removeClass("fadeInLeft");
						$(".page2 div ul li span").removeClass("fadeInRight");
						break;
					case 2:
						$('.nav-bg-init').addClass('nav-bg-effect').fadeIn();
						$('.nav').addClass('nav-toTop').fadeIn();
						var arr = $scope.loadAnimate.randomArr(3);
						for (var i = 0; i < arr.length; i++) {
							// 闭包和异步的问题
							setTimeout((function(i) {
								return function() {
									$scope.loadAnimate.addClass('.page2 div ul li i', arr[i], 'fadeInLeft');
								}
							})(i), 600 * i);
							setTimeout((function(i) {
								return function() {
									$scope.loadAnimate.addClass('.page2 div ul li span', arr[i], 'fadeInRight')
								}
							})(i), 600 * i);
						}
						break;
					case 3:
						var arr = $scope.loadAnimate.randomArr(2);
						setTimeout((function() {
							return function() {
								$scope.loadAnimate.addClass('.page3 .right .item', arr[0], 'animatePage3');
							}
						})(), 600);
						setTimeout((function() {
							return function() {
								$scope.loadAnimate.addClass('.page3 .right .item', arr[1], 'animatePage3');
							}
						})(), 900);
						setTimeout((function() {
							return function() {
								$('.page3 .left').addClass('animatePage3');
							}
						})(), 300);
						break;
					case 4:
						break;
					case 5:
						$('.next-button').animate({
							opacity: 0
						}, 500);
						$(".go_top").animate({
							right: "20px"
						}, 600);
						break;
					default:
						return;
				}
			},
			// 随机数组生成函数
			randomArr: function(len) {
				var arr = [];
				for (var i = 0; i < len; i++) {
					arr[i] = i;
				}
				//打乱数组,sort返回大于小于0的数字，大于递减，小于递增排序
				arr.sort(function() {
					return 0.5 - Math.random()
				});
				return arr;
			},
			// 指定对象上添加类
			addClass: function(className, i, target) {
				$($(className)[i]).addClass(target);
			}
		}
		/*作品跳转到官网页*/
	$scope.jumpToDemo = function(index) {
		if (index == 1) {
			window.open("http://www.zetyun.com");
		} else {
			window.open("http://www.h3c.com");
		}
	}
	resolutionDetection();
	mywheel.init();
}

angApp
	.controller('IntroCtrl', ['$scope', IntroCtrl]);