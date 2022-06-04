'use strict';

/* Filters */

var filters = angular.module('GlobalModule');




filters.filter('slice', function() {
	  return function(arr, start, end) {
	    return (arr || []).slice(start, end);
	  };
	});