'use strict';

var services = angular.module('LoginModule');


services.service('Document_Log_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchDocumentLogList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/documentlog/fetchdocumentloglist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getDocumentLogListcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/documentlog/getdocumentLogListcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchDocumentUploadLogList = function(uploadId){
		var promise = $http({
			method : 'GET',
			url : 'rest/documentlog/fetchdocumentuploadloglist/'+uploadId,
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