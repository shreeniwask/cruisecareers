'use strict';

var services = angular.module('LoginModule');


services.service('Workflow_Dashboard_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.getTicketStatusCount = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowdashboard/getticketstatuscount/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getTaskStatusCount = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowdashboard/gettaskstatuscount/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchWfStatusColor = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowdashboard/fetchWfStatusColor/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchWfTaskStatusColor = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowdashboard/fetchwftaskstatuscolor/',
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