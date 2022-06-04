'use strict';

var services = angular.module('LoginModule');


services.service('Upload_Doc_List_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchDocumentList = function(offset,limit,colName,order,search,user){             
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/uploaddoc/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchDocumentListCount = function(searchterm,user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/uploaddoc/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
// for deleting emailConfigList
	
	//for updating EmailTypeRoleMap
	this.deleteFileLogs = function(getCheckedId){
		var promise = $http({
			method : 'POST',
			data:getCheckedId,
			url : 'rest/uploaddoc/deletefromlist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
	this.addExpirydate = function(id,date){             
		var promise = $http({
			method : 'GET',
			url : 'rest/uploaddoc/addExpirydate/'+id+"/"+date,
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
