
'use strict';

var services = angular.module('LoginModule');


services.service('WorkflowsList_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	
	this.fetchWorkflowsList = function(offset,limit,colName,order,search,userId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowlist/fetchworkflowslist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchWorkflowsListCount = function(searchterm,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/workflowlist/fetchworkflowslistcount/'+searchterm+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.deleteWorkflowFromList = function(fromlist,workflowIdsList){
		var promise = $http({
			method : 'POST',
			data:workflowIdsList,
			url : 'rest/workflowlist/deleteworkflowfromlist',
			headers : {
				'Content-Type' : 'application/json',
				'fromlist' :fromlist
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
}]);