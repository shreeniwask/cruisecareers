'use strict';

var services = angular.module('LoginModule');


services.service('interview_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
 //----View InterviewTemplate  List--------------------
	
	this.fetchInterviewTemplateList= function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/fetchInterviewTemplateList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPositionList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/fetchPositionList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
  
	this.fetchTemplateQuestion = function(id){
		var promise = $http({
			method : 'GET',
			//data:id,
			url : 'rest/interviewtemplate/fetchTemplateQuestion/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	
	
	// interview Template count....//
	
	this.getInterviewTemplateyListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/getInterviewTemplateyListCount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//-------------------------------------------------------	
	 
	//----Interview Template  Delete from  List--------------------
	
	this.deleteInterviewTemplateList= function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/interviewtemplate/deleteInterviewTemplateList',
			headers : {
				'Content-Type' : 'application/json',
				'fromlist' :fromlist
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
//----Interview Template Question   Delete from  List--------------------
	
	this.deleteInterviewTemplateQuestion= function(squence,fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/interviewtemplate/deleteInterviewTemplateQuestion',
			headers : {
				'Content-Type' : 'application/json',
				'fromlist' :fromlist
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
//----------------------------------------------------------
	
	
//----insert interview Template in List--------------------------
	
	this.SaveInterviewTemplate = function(interviewtemplate){
		var promise = $http({
			method : 'POST',
			data : interviewtemplate,
			url : 'rest/interviewtemplate/SaveInterviewTemplate',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
//----------------------------------------------------------	

	//----update interview Template   from  List------------------------
	/*
	this.updateInterviewTemplate= function(req){
		var promise = $http({
			method : 'POST',
			data : req,
			url : 'rest/interviewtemplate/updateInterviewTemplate',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/

	this.updateInterviewTemplate = function(interviewtemplate){
		var promise = $http({
			method : 'POST',
			data:updateinterviewtemplate,
			url : 'rest/interviewtemplate/updateInterviewTemplate',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//updateInterviewTemplate question 
	
	this.updateInterviewTemplateQuestion = function(squence,question){
		var promise = $http({
			method : 'POST',
			//data:,
			url : 'rest/interviewtemplate/updateInterviewTemplateQuestion/'+squence+"/"+question,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//--------------------------------------------------
	
	/*this.fetchPositionById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/fetchPositionById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	
}]);
