
'use strict';

var services = angular.module('LoginModule');


services.service('CreateWorkflow_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchWorkflowOwnerList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/createworkflow/fetchownerslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
			
	this.createWorkFlow = function(workflow){             
		var promise = $http({
			method : 'POST',
			data:workflow,
			url : 'rest/createworkflow/createoneworkflow',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.fetchGroupList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/createworkflow/fetchgrouplist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchFieldsList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/createworkflow/fetchfieldslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.saveWorkFlowField = function(workflow){             
		var promise = $http({
			method : 'POST',
			data:workflow,
			url : 'rest/createworkflow/saveworkflowfield',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchWorkFlowFieldsList= function(workflowId,colName,order){
		
		var promise = $http({
			method : 'GET',			
			url : 'rest/createworkflow/fetchworkflowfieldslist/'+workflowId+'/'+colName+'/'+order,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteWorkFlowFieldFromList= function(fieldObject,workflowId){
		
		var promise = $http({
			method : 'POST',
			data:fieldObject,
			url : 'rest/createworkflow/deleteworkflowfieldfromlist/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.fetchWorkflowFieldDetails= function(fieldId){
		
		var promise = $http({
			method : 'GET',			
			url : 'rest/createworkflow/fetchWorkflowFieldDetails/'+fieldId,
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