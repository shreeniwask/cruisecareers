'use strict';

var services = angular.module('LoginModule');


services.service('SchedulerMaster_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	this.fetchSchedulerMaster = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
		
			url : 'rest/scheduler/fetchSchedulerMaster/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getActiveSchedulerCount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/getActiveSchedulerCount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSchedulerDetailById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/scheduler/fetchSchedulerDetailById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteFromList = function(fromlist,id){
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/scheduler/deletefromlist',
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