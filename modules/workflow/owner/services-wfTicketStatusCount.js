'use strict';

var services = angular.module('LoginModule');


services.service('Wf_ticketStatusCount_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
   this.fetchWorkFlowTicketStatusCount = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowdashboard/fetchWorkFlowTicketStatusCount/'+userid,
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

}]);