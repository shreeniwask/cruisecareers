/**
 * 
 */

var services=angular.module("LoginModule");

services.service('DocumentService',function($http){
	this.fetchDocumentList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/documents/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchDocumentListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/documents/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
})
