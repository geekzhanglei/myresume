'use strict';

// 百度网站统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?8b862c4499c172dd6b669e1428cc3798";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

 //创建一个模块，防止控制器直接使用污染全局作用域
var angApp = angular.module('myApp', []);   
