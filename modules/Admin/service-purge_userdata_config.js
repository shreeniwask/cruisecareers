'use strict';

var services = angular.module('LoginModule');


services.service('Purge_Userdata_Config_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	//for purgedatacandidate list
	this.fetchPurgeDataCandidateList = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/purgeconfig/fetchCandiddateConfigDataList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPurgeDataEmployeeList = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/purgeconfig/fetchEmployeeConfigDataList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	// for saving purge configuration candiddate
	this.saveCandiadateConfiguration = function(purgeDataCandidateList){
		var promise = $http({
			method : 'POST',
			data:purgeDataCandidateList,
			url : 'rest/purgeconfig/saveCandiadateConfiguration',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
	// for saving purge configuration employee
	this.saveEmployeeConfiguration = function(purgeDataEmployeeList){
		var promise = $http({
			method : 'POST',
			data:purgeDataEmployeeList,
			url : 'rest/purgeconfig/saveEmployeeConfiguration',
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