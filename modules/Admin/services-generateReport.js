'use strict';

var services = angular.module('LoginModule');


services.service('generateReport_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.fetchallassignetime = function(surveyId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchallassignetime/'+surveyId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchquestionData = function(surveycombinationId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchquestionData/'+surveycombinationId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchsurveyAssigneCount = function(surveycombinationId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchsurveyAssigneCount/'+surveycombinationId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchsurveyAttemptCount = function(surveycombinationId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchsurveyAttemptCount/'+surveycombinationId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchuserList = function(ansId,qId,surveycombinationId){
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchuserList/'+ansId+'/'+qId+'/'+surveycombinationId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//--------------------------cross tab-------------------------------------------------------
	
	this.fetchSurveyQuestions = function(surveyId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/surveyassignment/fetchsurveyquestions/'+surveyId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	
	
	
	this.fetchCommonAnsUsers = function(quensList,surveyId,surveyCombinationId){
		
		var promise = $http({
			method : 'POST',
			data:quensList,
			url : 'rest/surveyassignment/fetchcommonansusers/'+surveyId+'/'+surveyCombinationId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.fetchUsersList = function(answerIds,surveyId,surveyCombinationId){
		
		var promise = $http({
			method : 'GET',			
			url : 'rest/surveyassignment/fetchuserslist/'+answerIds+'/'+surveyId+'/'+surveyCombinationId,
			headers : {
				'Content-Type' : 'application/json',				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
}]);