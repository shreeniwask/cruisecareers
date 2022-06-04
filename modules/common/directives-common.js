'use strict';

/* Directives */

var directives = angular.module('CommonModule');

directives.directive('convertToNumber', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {                
            ngModel.$parsers.push(function(val) {                    
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {                    
                return '' + val;
            });
        }
    };
});
directives.directive('serverSideSorting', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
    		scope.sortOn;
    		scope.sortOrderAsc;
            elm.bind('click', function() {
            	elm.siblings().children().attr("src", "resources/img/sort_both.gif");
    			if(elm.children().attr("src") === 'resources/img/sort_both.gif'){
    				elm.children().attr("src",'resources/img/sort_asc.gif');
    				scope.sortOrderAsc = true;
    			} else if(elm.children().attr("src") === 'resources/img/sort_asc.gif'){
    				elm.children().attr("src",'resources/img/sort_desc.gif');
    				scope.sortOrderAsc = false;
    			} else {
    				elm.children().attr("src",'resources/img/sort_both.gif');
    				scope.sortOn = undefined;
    			}
    			scope.$apply(attrs.serverSideSorting);
            });
        }
    };        
});


directives.directive('jobsInitDirective',['$timeout', function($timeout) {
	  return function(scope, element, attrs) {		    
		    if (scope.$last){
		    	$timeout(function() {
		    		scope.converHighlightStringToArray(scope.jobList);
		        },0);
		    	
		    }
		  };
		}]);