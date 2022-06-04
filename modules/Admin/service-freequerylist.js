'use strict';

var services = angular.module('LoginModule');


services.service('Free_Query_List_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchqueryList = function(offset,limit,colName,order,search,userId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/freequerylist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getQueryListCount = function(search,userId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/freequerylistcount/'+search+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.executeQuery = function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/executequery/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.executeQuery2 = function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/executequery2/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteFreeQuery = function(getCheckedId){
		var promise = $http({
			method : 'POST',
			data:getCheckedId,
			url : 'rest/freequery/deletefreequery',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
	this.editFreeQuery = function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/editfreequerydetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
this.fetchAccessRightForUser = function(userId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/fetchaccessrightforuser/'+userId,
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