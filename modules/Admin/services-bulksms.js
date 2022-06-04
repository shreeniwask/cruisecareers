'use strict';

var services = angular.module('LoginModule');


services.service('Bulk_Sms_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchBulkSmsData = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/bulkSms/fetchBulkSmsData/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchBulkSmsDataListCount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/bulkSms/fetchBulkSmsDataListCount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	
	this.fetchTemplateTypeList = function(){		
		var promise = $http({
			method : 'GET',
			url : 'rest/bulkSms/fetchTemplateTypeList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	
	this.fetchTemplatepreview = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/bulkSms/fetchTemplatepreview/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	
	this.fetchSmsStatusLog = function(search,column,order,id){
		var promise = $http({
			method : 'GET',
			url : 'rest/bulkSms/fetchSmsStatusLog/'+search+"/"+column+"/"+order+"/"+id,
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