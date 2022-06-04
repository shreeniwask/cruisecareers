'use strict';

var services = angular.module('LoginModule');


services.service('survey_assignment_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchEmployeeDetails = function(search,roleId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchemployeedetails/'+search+"/"+roleId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.assignSurvey = function(survey){
		
		var promise = $http({
			method : 'POST',
			data : survey,
			url : 'rest/surveyassignment/assignsurvey',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.fetchAssignedList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchassignedlist/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteFromSurveyList = function(id){
		
		var promise = $http({
			method : 'POST',			
			url : 'rest/surveyassignment/removesurvey/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	
	this.publishSurveyList= function(id){
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/surveyassignment/publishsurvey/',
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
