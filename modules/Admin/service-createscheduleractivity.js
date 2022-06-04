'use strict';

var services = angular.module('LoginModule');


services.service('CreateSchedulerActivity_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	//fetch activity for list
	this.fetchActivityForList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchActivityForList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//fetch activity list based on activity for id
	this.fetchActivityList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchActivityList/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//fetch category for sms and email
	this.fetchTemplatetypeList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchTemplatetypeList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//fetch sms or email for specific category
	this.fetchSmsOrEmailTemplateList = function(id,mode){		
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchSmsOrEmailTemplateList/'+id+"/"+mode,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	// fetch category id
	this.fetchCategoryIdByTempId = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchCategoryIdByTempId/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	// check scheduler name is duplicate or not
	this.checkDuplicateSchedulerName = function(name){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/checkDuplicateSchedulerName/'+name,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveNewSchedulerData = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/scheduler/saveNewSchedulerData',
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