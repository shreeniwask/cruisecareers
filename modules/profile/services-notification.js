'use strict';

var services = angular.module('LoginModule');


services.service('Notification_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
this.fetchNotification=function(offset,limit,id,flag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/mynotificaion/fetchnotification/'+offset+'/'+limit+'/'+id+'/'+flag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.redirectPage=function(workflowId,userId){
		//alert();
		var promise = $http({
			method : 'GET',
			url : 'rest/mynotificaion/fetchownerids/'+workflowId+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getNotificationcount = function(userId){
	
		var promise = $http({
			method : 'GET',
			url : 'rest/mynotificaion/getnotificationcount/'+userId,
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