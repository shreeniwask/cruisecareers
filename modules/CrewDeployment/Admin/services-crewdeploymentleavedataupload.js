'use strict';

var services = angular.module('LoginModule');


services.service('CrewDeploymentLeaveDataUpload_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.brandsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/brandslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchSampleDoc = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/fetchsampledoc/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	this.fetchUploadFileList = function(offset,limit,colName,order,search,brandid){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/fetchUploadFileList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+brandid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchUploadFileListCount = function(search,brandid){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/fetchUploadFileListCount/'+search+'/'+brandid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchFileUploadLogList = function(fileid){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/fetchFileUploadLogList/'+fileid,
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