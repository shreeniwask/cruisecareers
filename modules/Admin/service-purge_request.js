'use strict';

var services = angular.module('LoginModule');


services.service('Purge_Request_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchPurgeRequestList = function(offset,limit,colName,order,search,listFlag){
		var promise = $http({
			method : 'GET',
			url : 'rest/purgerequests/fetchpurgerequestlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+'/'+listFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getPurgeRequestCount = function(search,listFlag){
		var promise = $http({
			method : 'GET',
			url : 'rest/purgerequests/getpurgerequestlistcount/'+search+'/'+listFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.acceptRequest = function(req){
		var promise = $http({
			method : 'POST',
			data :req,
			url : 'rest/purgerequests/deactivateaccount/',
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