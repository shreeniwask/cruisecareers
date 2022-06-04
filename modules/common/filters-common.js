'use strict';

var filters = angular.module('CommonModule');

filters.filter('orderObjectBy', function() {
  return function(tipsList, field, reverse) {
    var filtered = [];
    angular.forEach(tipsList, function(tips) {
      filtered.push(tips);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
