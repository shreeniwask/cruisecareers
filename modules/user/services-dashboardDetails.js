'use strict';

var services = angular.module('LoginModule');


services.service('dashboardDetails_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchAssessmets = function(IsSelf_Assessment,user_id){
		var promise = $http({
			method : 'GET',
			url : 'rest/dashboardDetails/fetchAssessmets/'+IsSelf_Assessment+"/"+user_id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchqestn = function(assessmentObj){
		var promise = $http({
			method : 'POST',
			data : assessmentObj,
			url : 'rest/dashboardDetails/fetchqestn',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveAssessmentAns = function(questionListObj){
		var promise = $http({
			method : 'POST',
			data : questionListObj,
			url : 'rest/dashboardDetails/saveAssessmentAns',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveStatus = function(assessmentObj,userId){
		var promise = $http({
			method : 'POST',
			data : assessmentObj,
			url : 'rest/dashboardDetails/saveStatus/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSelfAssessments = function(userId,roleId,typeId){
		var promise = $http({
			method : 'POST',		 
			url : 'rest/dashboardDetails/fetchSelfAssessments/'+userId+"/"+roleId+"/"+typeId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.fetchSampleQuestion = function( ){
		var promise = $http({
			method : 'GET',
			url : 'rest/dashboardDetails/fetchSampleQuestion',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSurveysList =function(userDetails){
		
		var promise = $http({
			method : 'POST',
			data:userDetails,
			url : 'rest/dashboardDetails/fetchsurveyslist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.fetchSurveyQue = function(surveyObj){
		
		var promise = $http({
			method : 'POST',
			data : surveyObj,
			url : 'rest/dashboardDetails/fetchsurveyque',
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
