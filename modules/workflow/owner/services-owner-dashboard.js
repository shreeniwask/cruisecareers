'use strict';

var services = angular.module('LoginModule');


services.service('Owner_Dashboard_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchOwnerTaskCount = function(userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/getUserAssignTaskCount/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchMyWorkflowCount = function(userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/getCreatedWorkFlowCount/'+userId,
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
