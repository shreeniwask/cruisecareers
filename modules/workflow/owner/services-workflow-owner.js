'use strict';

var services = angular.module('LoginModule');


services.service('Workflow_Owner_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
   this.fetchWorkflowOwnerList = function(offset,limit,colName,order,search,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/listWorkflowOwner/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getWorkflowOwnerListCount = function(search,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/fetchWorkflowOwnerListCount/'+search+'/'+userId,
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
