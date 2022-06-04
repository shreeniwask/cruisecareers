'use strict';

var services = angular.module('LoginModule');


services.service('CreateTask_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.createTask = function(wf_Task){             
		var promise = $http({
			method : 'POST',
			data:wf_Task,
			url : 'rest/taskcreation/createtask',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.updateTask = function(wf_Task){             
		var promise = $http({
			method : 'POST',
			data:wf_Task,
			url : 'rest/taskcreation/updatetask',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchTasksFieldsdetails = function(workflowId,taskId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtasksfieldsdetails/'+workflowId+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTasksFieldsdetailsByTaskId = function(workflowId,taskId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchTasksFieldsDetailsByTaskId/'+workflowId+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchTasksFieldsdetailsNotUsedInTask = function(workflowId,taskId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtasksfieldsdetailsNotUsedInTask/'+workflowId+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.deleteWorkFlowFieldFromListByTaskId = function(fieldId,workflowId,taskId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/deleteWorkFlowFieldFromListByTaskId/'+fieldId+'/'+workflowId+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchWorkFlowNotificationReceivers= function(eventId,taskId){
		
		
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtasknotificationreceiverslist/'+eventId+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		
		return promise;
		
	};
	
	this.fetchWorkFlowNotificationEvents= function(){
				
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtasknotificationeventlist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		
		return promise;		
	};
	
	this.fetchTaskNotificationSetting= function(taskId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtasknotificationsetting/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		
		return promise;		
	};
	
	
	this.saveTaskSetting= function(notificationSetting,taskId){
		
		var promise = $http({
			method : 'POST',
			data:notificationSetting,
			url : 'rest/taskcreation/savetasksetting/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		
		return promise;		
	};
	
	this.saveTaskSLA= function(taskSLA,taskId){
		
		var promise = $http({
			method : 'POST',
			data:taskSLA,
			url : 'rest/taskcreation/savetasksla/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		
		return promise;		
	};
	
	this.fetchTaskSLAList= function(taskId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/taskcreation/fetchtaskslalist/'+taskId,
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