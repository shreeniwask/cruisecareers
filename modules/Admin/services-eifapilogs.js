'use strict';

var services = angular.module('LoginModule');


services.service('EIAPILog_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	this.fetchAPIlogs = function(offset,limit,fromDate,toDate,status){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/fetchAPIlogs/'+offset+'/'+limit+'/'+fromDate+'/'+toDate+'/'+status,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	}
	
	this.getAPILogsCount = function(fromDate,toDate,status){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/getAPILogsCount/'+fromDate+"/"+toDate+'/'+status,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	
	
}]);