'use strict';

var services = angular.module('LoginModule');


services.service('Walk_In_List_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
this.fetchJobFairsList = function(offset,limit,colName,order,search,walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/jobfairslist/fetchjobfairslist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchJobFairsListCount = function(searchterm,walkinflag){
		var promise = $http({
			method : 'GET',
			url : 'rest/jobfairslist/fetchjobfairslistcount/'+searchterm+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteJobFair = function(fromlist,jobFairsIds,walkinflag){
		var promise = $http({
			method : 'POST',
			data:jobFairsIds,
			url : 'rest/jobfairslist/deletejobfair/'+walkinflag,
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
	
this.fetchUploadedJobfairImages = function(jobfairId,walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/jobfairslist/fetchuploadedjobfairimages/'+jobfairId+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchUploadedJobfairImagesForUser = function(jobfairId,walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/jobfairslist/fetchuploadedjobfairimagesforuser/'+jobfairId+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchJobList = function(jobfairId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/jobfairslist/fetchjoblist/'+jobfairId,
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
