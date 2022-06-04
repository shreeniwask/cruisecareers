
'use strict';

var services = angular.module('LoginModule');


services.service('TasksList_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchTasksList = function(offset,limit,colName,order,search,workflowId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/taskslist/fetchtaskslist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTasksTree = function(workflowId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/taskslist/fetchtaskstree/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTasksListCount = function(searchterm,workflowId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskslist/fetchtaskslistcount/'+searchterm+"/"+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteTaskFromList = function(fromlist,tasksIdsList){
		var promise = $http({
			method : 'POST',
			data:tasksIdsList,
			url : 'rest/taskslist/deletetaskfromlist',
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
	
	this.fetchTasksForDependecy = function(taskId,workflowId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/taskslist/fetchtasksfordependency/'+taskId+'/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveTaskDependency = function(taskId,dependentTasksIds){
		var promise = $http({
			method : 'POST',
			data:dependentTasksIds,
			url : 'rest/taskslist/savedependenttasks/'+taskId,
			headers : {
				'Content-Type' : 'application/json'			
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	this.saveEscalate = function(userTypeId,userGupDeptId,taskId,workflowId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskslist/saveEscalate/'+userTypeId+'/'+userGupDeptId+'/'+taskId+'/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'			
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	this.fetchTaskownerList = function(offset,limit,colName,order,search,workflowId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/taskDetails/fetchtaskownerlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+workflowId,
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