'use strict';

var services = angular.module('LoginModule');


services.service('EIForm_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	
	
	this.fetchEIFormDetails = function(userid,rolid){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/fetchEIFormDetails/'+userid+'/'+rolid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getEIFormDetailsCount = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/eifDetailsCount/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveComments = function(eifid,comments,user_id){
		var promise = $http({
			method : 'POST',
			url : 'rest/eif/saveComments/'+eifid+'/'+comments+'/'+user_id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchAdminComments = function(eifid){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/fetchAdminComments/'+eifid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.saveEIFormDetails = function(eifDetails,userid,rolid,button,senderid){
		var promise = $http({
			method : 'POST',
			data:eifDetails,
			url : 'rest/eif/saveEIFormDetails/'+userid+'/'+rolid+'/'+button+'/'+senderid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.previewEIFormDetails = function(eifDetails,userid,rolid){
		var promise = $http({
			method : 'POST',
			data:eifDetails,
			url : 'rest/eif/previewEIFormDetails/'+userid+'/'+rolid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.checkLogsPresent = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/checkLogsPresent/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.sendtoMistral = function(userid){
		var promise = $http({
			method : 'POST',
			url : 'rest/eif/sendtoMistral/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	
	this.sendtoCandidate = function(roleId,userId,senderid,status){
		var promise = $http({
			method : 'POST',
			url : 'rest/eif/sendtoCandidate/'+roleId+'/'+userId+'/'+senderid+'/'+status,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchHomeAirport = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/eif/airportlist/'+id,
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
