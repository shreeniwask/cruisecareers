'use strict';

var services = angular.module('LoginModule');


services.service('Cms_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	

	this.saveHomeImageDerails = function(imageDetails){
		var promise = $http({
			method : 'POST',
			data:imageDetails,
			url : 'rest/Cms/saveimagedetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.fetchhomeimgdetails = function(){
		var promise = $http({
			method : 'GET',			
			url : 'rest/Cms/fetchhomeimgdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.removedimg = function(id){
		var promise = $http({
			method : 'GET',			
			url : 'rest/Cms/removedimg/'+id,
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
