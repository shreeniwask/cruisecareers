'use strict';

var services = angular.module('LoginModule');


services.service('assessEngine_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchbrandlist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchbrandlist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchQuestionList = function(search,questionType){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchQuestionList/'+search+"/"+questionType,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchquestiontypelist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchquestiontypelist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchshiplist = function(brandId){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchshiplist/'+brandId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchdepartmentlist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchdepartmentlist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchQuestionCategorylist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchquestioncategorylist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchpositionlist = function(deptId){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchpositionlist/'+deptId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchassessmenttype = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchassessmenttype/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveAssessment = function(assessmentobj){		
		var promise = $http({
			method : 'POST',
			data : assessmentobj,
			url : 'rest/assessmentengine/saveAssessment',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.fetchquestionbank = function(offset,limit,colName,order,search,assessmenttype,level,questiontag,flag){
		var promise = $http({
			method : 'POST',
			data: questiontag,
			url : 'rest/assessmentengine/questionlistbyfilter/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+assessmenttype+"/"+level+"/"+flag,
			headers : {
				'Content-Type' : 'application/json'		
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.getquestionbanklistcount = function(search,level,questiontag,flag){
		var promise = $http({
			method : 'POST',
			data: questiontag,
			url : 'rest/assessmentengine/getquestionbanklistcount/'+search+"/"+level+"/"+flag,
			headers : {
				'Content-Type' : 'application/json',		
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.deleteQuestionList = function(id){
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/assessmentengine/deletequestion',
			headers : {
				'Content-Type' : 'application/json',
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.saveDynamicAssessments = function(assessments){
		var promise = $http({
			method : 'POST',
			data: assessments,
			url : 'rest/assessmentengine/saveDynamicAssessments',
			headers : {
				'Content-Type' : 'application/json'		
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.saveQustionbank = function(question){
		var promise = $http({
			method : 'POST',
			data: question,
			url : 'rest/assessmentengine/savequestion',
			headers : {
				'Content-Type' : 'application/json'		
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.UpdateFixedAssessment = function(assessmentobj){		
		var promise = $http({
			method : 'POST',
			data : assessmentobj,
			url : 'rest/assessmentengine/UpdateFixedAssessment',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.UpdateDynamicAssessment = function(assessmentobj){		
		var promise = $http({
			method : 'POST',
			data : assessmentobj,
			url : 'rest/assessmentengine/UpdateDynamicAssessment',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.fetchDynamicQstnDetails = function(assessmentobj){		
		var promise = $http({
			method : 'POST',
			data : assessmentobj,
			url : 'rest/assessmentengine/fetchDynamicQstnDetails',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.UpdateOfflineAssessment = function(assessmentobj){		
		var promise = $http({
			method : 'POST',
			data : assessmentobj,
			url : 'rest/assessmentengine/UpdateOfflineAssessment',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.checkQuestionCount = function(questionListObj){		
		var promise = $http({
			method : 'POST',
			data : questionListObj,
			url : 'rest/assessmentengine/checkQuestionCount',
			headers : {
				'Content-Type' : 'application/json'					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.fetchAnsList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentengine/fetchAnsList/'+id,
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

	
	