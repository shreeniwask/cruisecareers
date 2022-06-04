'use strict';

var services = angular.module('LoginModule');


services.service('Passport_Upload_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	this.checkValidRefno = function(refno){
		var promise = $http({
			method : 'GET',
			url : 'rest/passportUpload/checkValidRefno/'+refno,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPassportDetail = function(refno){
		var promise = $http({
			method : 'GET',
			url : 'rest/passportUpload/fetchpassportdetailData/'+refno,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchUserDetail = function(pass){
		var promise = $http({
			method : 'GET',
			url : 'rest/passportUpload/fetchUserDetail/'+pass,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.checkValidPassportNo = function(passNo){
		var promise = $http({
			method : 'GET',
			url : 'rest/passportUpload/checkValidPassportNo/'+passNo,
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