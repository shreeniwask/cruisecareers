'use strict';

var services = angular.module('LoginModule');


services.service('My_Interview_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	

	
	this.fetchInterviewList = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/dashboardDetails/fetchInterviewList/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.fetchVideoCallData = function(calldetailid){
		var promise = $http({
			method : 'GET',
			url : 'rest/call/fetchVideoCallData/'+calldetailid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	

	
	this.checkStartDateTime = function(slot,userid){		
		var promise = $http({
			method : 'POST',
			data:slot,
			url : 'rest/dashboardDetails/checkStartDateTime/'+userid,
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