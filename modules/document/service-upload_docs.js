'use strict';

var services = angular.module('LoginModule');


services.service('Upload_Docs_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.saveUserUploadDocsDetail = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/uploaddoc/adduploaddocdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getDocumnetUploadId = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/uploaddoc/getdocumentuploadid',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updateDocumentUpload = function(docUpload){
		var promise = $http({
			method : 'POST',
			data:docUpload,
			url : 'rest/uploaddoc/updatedocumentupload',
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