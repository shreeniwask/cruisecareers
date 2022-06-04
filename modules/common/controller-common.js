'use strict';

var contollers = angular.module('CommonModule');


controllers.controller('CommonModule_initialDataCtrl' , ['$scope','CommonModule_initialDataService', function ($scope,CommonModule_initialDataService){
	
	$scope.fetchFiltersData = function(){
		CommonModule_initialDataService.fetchFiltersData();
	};
	
	
}]);