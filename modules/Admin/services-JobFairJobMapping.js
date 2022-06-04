'use strict';

var services = angular.module('LoginModule');


services.service('jobMapping_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	this.fetchMappedJobList = function( offset, limit,search,colName,order,jobFairId){
		var promise = $http({
			method : 'GET',
			
			url : 'rest/jobmappimg/fetchmappedjoblist/'+offset+"/"+limit+"/"+search+"/"+colName+"/"+order+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.deleteMappedJob = function(fromlist,jobfairId,jobListIds){
		var promise = $http({
			method : 'POST',
			data:jobListIds,
			url : 'rest/jobmappimg/deletemappedjob/'+jobfairId,
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
	
	this.fetchJobListForMapping = function(offset,limit,colName,order,search,jobFairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/jobmappimg/fetchjoblistformapping/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveJobMapping = function(jobfairId,jobListIds,senderid){
		var promise = $http({
			method : 'POST',
			data:jobListIds,
			url : 'rest/jobmappimg/savejobmapping/'+jobfairId+'/'+senderid,
			headers : {
				'Content-Type' : 'application/json',
				

				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	
	this.fetchMappedJobListCount = function(searchterm,jobfairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/jobmappimg/fetchmappedjoblistcount/'+searchterm+"/"+jobfairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchJobListForMappingCount = function(searchterm,jobfairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/jobmappimg/fetchjoblistformappingcount/'+searchterm+"/"+jobfairId,
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