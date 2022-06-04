'use strict';

/* Directives */

var directives = angular.module('GlobalModule');

directives.directive('appVersion',
	[ 'version',
	  function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	  }
	]
);

directives.directive('setFocus', function(){
	  return{
	      scope: {setFocus: '='},
	      link: function(scope, element){
	         if(scope.setFocus) element[0].focus();             
	      }
	  };
	});

directives.directive('onFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('focus', function() {
                scope.$apply(attrs.onFocus);
            });
        }
    };        
});

directives.directive('onBlur', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('blur', function() {
                scope.$apply(attrs.onBlur);
            });
        }
    };        
});

directives.directive('onEnter', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('keyup', function() {
            	if(event.keyCode == 13){
            		scope.$apply(attrs.onEnter);
            	}
            });
        }
    };        
});


directives.directive('onKeyUp', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            elm.bind('keyup', function() {
            	if(event.keyCode != 13){
            		scope.$apply(attrs.onKeyUp);
            	}
            });
        }
    };        
});

directives.directive('jqueryUiDialog',['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	$timeout(function(){
        		var setup = scope.$eval(attrs.jqueryUiDialog);
        		scope[setup.dialogRef] = elm.dialog(setup.dialogOptions);
        	});
        }
    };        
}]);

directives.directive('jqueryUiDatepicker',function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
    		elm.datepicker({
    	        changeMonth: true,
    	        changeYear: true,
    	        dateFormat:"dd-MM-yy"
    	      }).attr('readonly','readonly').keyup(function(e) {
    	    	    if(e.keyCode == 8 || e.keyCode == 46) {
    	    	        $.datepicker._clearDate(this);
    	    	    }
    	    	});
        }
    };        
});


directives.directive('toolTipInnerText',['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	$timeout(function(){
        	elm.qtip({
        		   content: elm.html(),
        		   style: { 
        			  name: 'orange', // Inherit from preset style
        			  textAlign: 'center',
        			  border:{width:0},
        			tip: { // Now an object instead of a string
        				 corner: 'bottomMiddle', // We declare our corner within the object using the corner sub-option
        				 color: '#F05423',
        				 size: { x:7, y:4 }			 
        				 }
        		   },
        		   position: {
        			  corner: {
        				target: 'topMiddle',
        				tooltip: 'bottomMiddle'
        			  }
        		   }
        		});
        	});
        	
        }
    };        
}]);


directives.directive('jqueryUiDatepickerMinDate',function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
		scope.$watch(attrs.jqueryUiDatepickerMinDate, function() {
			if(scope.$eval(attrs.jqueryUiDatepickerMinDate) != undefined){
				elm.datepicker('option', 'minDate', new Date(scope.$eval(attrs.jqueryUiDatepickerMinDate)));
			}
		});
		elm.datepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat:"dd-MM-yy"
		}).attr('readonly','readonly').keyup(function(e) {
			if(e.keyCode == 8 || e.keyCode == 46) {
				$.datepicker._clearDate(this);
			}
		});
	}
	};        
});


directives.directive('excelExport',['GlobalModule_exporterService','$timeout', function(GlobalModule_exporterService,$timeout) {
	return function(scope, element, attrs) {		    
		if (scope.$last){
			$timeout(function(){
				var values = scope.$eval(attrs.excelExport);
				GlobalModule_exporterService.exportToExcel(values.tableId,values.worksheetName);
			});
		}
	};
}]);


directives.directive('autoCompleteJ',['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs){
			
			var setup = scope.$eval(attrs.autoCompleteJ);
			
			scope[setup.tempListName] = {};
			var extractStringList = function(list){
				if(list != undefined ){
					var tempList = [];
					for(var i =0;i<list.length; i++){
						tempList.push(list[i].name);
						scope[setup.tempListName][list[i].name] = list[i].id;
						
					}
				}
				return tempList;
			};

			var findIdFromList = function(name){
				return scope[setup.tempListName][name];
			};
			
			scope.$watch(setup.serverResultListName, function(newVal, oldVal){
				//alert("test");
				
				
				if(scope[setup.serverResultListName] != undefined){
				extractStringList(scope[setup.serverResultListName])
					elm.autocomplete({
						source: extractStringList(scope[setup.serverResultListName]),
						select: function(ui) {
							if(ui.toElement != undefined){
								scope[attrs.autoCompleteJValue] = findIdFromList(ui.toElement.textContent);
								localStorage.setItem(attrs.autoCompleteJValue,scope[attrs.autoCompleteJValue]);
								if(setup.callbackFunctionNoParam != undefined && setup.callbackFunctionNoParam != ""){
									scope.$eval(scope[setup.callbackFunctionNoParam]);
								}
							}else{
								scope[attrs.autoCompleteJValue] =findIdFromList(ui.target.value);
								//console.log(ui.target.value);
								localStorage.setItem(attrs.autoCompleteJValue,scope[attrs.autoCompleteJValue]);
								if(setup.callbackFunctionNoParam != undefined && setup.callbackFunctionNoParam != ""){
									scope.$eval(scope[setup.callbackFunctionNoParam]);
								}
							}
						}
					});
					elm.trigger('input');
					}
					
					
				}, true);
			
			
			

			}
		};
	}]);


directives.directive('toolTipMyText', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	elm.qtip({
        		   content: attrs.toolTipMyText,
        		   style: { 
        			  name: 'orange', // Inherit from preset style
        			  textAlign: 'center',
        			  border:{width:0},
        			tip: { // Now an object instead of a string
        				 corner: 'bottomMiddle', // We declare our corner within the object using the corner sub-option
        				 color: '#F05423',
        				 size: { x:7, y:4 }			 
        				 }
        		   },
        		   position: {
        			  corner: {
        				target: 'topMiddle',
        				tooltip: 'bottomMiddle'
        			  }
        		   }
        		});
        }
    };        
});

directives.directive('restrictInput', function(){
	   return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {
	           // this next if is necessary for when using ng-required on your input. 
	           // In such cases, when a letter is typed first, this parser will be called
	           // again, and the 2nd time, the value will be undefined
	           if (inputValue == undefined) return ''
	           if(attrs.restrictInput == "none"){
	        	   var transformedInput = inputValue.replace(/[^0-9]/g, '');
	           }else if(attrs.restrictInput == "dotalso"){
	        	   var transformedInput = inputValue.replace(/[^0-9.]/g, '');
	           }
	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }         

	           return transformedInput;         
	       });
	     }
	   };
	});


directives.directive('numbersOnly', function(){
	   return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {
	           // this next if is necessary for when using ng-required on your input. 
	           // In such cases, when a letter is typed first, this parser will be called
	           // again, and the 2nd time, the value will be undefined
	           if (inputValue == undefined) return '' 
	           var transformedInput = inputValue.replace(/[^0-9+.]/g, ''); 
	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }         

	           return transformedInput;         
	       });
	     }
	   };
	});


directives.directive('script', function() {
	return {
		restrict: 'E',
		scope: false,
		link: function(scope, elem, attr) {
			if (attr.type=='text/javascript-lazy') {
				var code = elem.text();
				var f = new Function(code);
				f();
			}
		}
	};
});
var table;
directives.directive('tableRepeat',['$timeout', function($timeout) {
	return function(scope, element, attrs) {		    
		if (scope.$last){
			$timeout(function() {
				table = $('#tableUsers').dataTable();
				table = $('#catTable').dataTable();
				table = $('#tableBolg').dataTable();
				
		    }, 0);
		}
	};
 }
]);


directives.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});


directives.directive('validPasswordC',['$timeout', function($timeout) {
	 return {
	        require: 'ngModel',
	        link: function (scope, elm, attrs, ctrl) {
	            ctrl.$parsers.unshift(function (viewValue, $scope) {
	                var noMatch = viewValue != scope.myForm.password.$viewValue
	                ctrl.$setValidity('noMatch', !noMatch)
	            });
	        }
	    }
 }
]);

