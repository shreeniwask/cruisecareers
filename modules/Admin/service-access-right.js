'use strict';

var services = angular.module('LoginModule');


services.service('AccessRight_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
this.fetchUserForAccessRights = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/accessrights/fetchuserforaccessrights/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.SaveAccessRightsFreeQuery = function(freequery){
		var promise = $http({
			method : 'POST',
			data:freequery,
			url : 'rest/accessrights/saveaccessrightsfreequery',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchFreeQueryAccessRight = function(freeQueryId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/accessrights/fetchfreequeryaccessright/'+freeQueryId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.getUserRightsCount = function(freeQueryId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/accessrights/getuserrightscount/'+freeQueryId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.deleteUserAccess = function(accessRightId){
		var promise = $http({
			method : 'POST',
			
			url : 'rest/accessrights/deleteuseraccess/'+accessRightId,
			headers : {
				'Content-Type' : 'application/json',
				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
}]);