'use strict';

var services = angular.module('LoginModule');


services.service('consulate_verfication_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	
	this.checkNumberOfCandidate = function(passNo,newdate){
		var promise = $http({
			method : 'GET',
			url : 'rest/consulate/checkNumberOfCandidate/'+passNo+"/"+newdate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.userprofiledetails = function(dob,passNo){
		var promise = $http({
			method : 'GET',
			url : 'rest/consulate/userprofiledetails/'+dob+"/"+passNo,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.countCandidate = function(name,dob,passNo,refNo){
		var promise = $http({
			method : 'GET',
			url : 'rest/consulate/countCandidate/'+name+"/"+dob+"/"+passNo+"/"+refNo,
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