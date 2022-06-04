'use strict';

var services = angular.module('LoginModule');


services.service('Customer_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
this.fetchCustRequisitionList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/customreqlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getCustRequisitionCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/getcustomerrequisitioncount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.savecustomerRequisition = function(req){
		var promise = $http({
			method : 'POST',
			data : req,
			url : 'rest/customerreq/addrequisitionDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchRequisitionById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/fetchRequisitionById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updateRequiDetails = function(req){
		var promise = $http({
			method : 'POST',
			data : req,
			url : 'rest/customerreq/updateCustomerRequiDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchrequisitionListForUser = function(offset,limit,colName,order,search,jobId){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/fetchrequisitionlistforuser/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+jobId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.selectUserRequisition = function(req,userId,action){
		var promise = $http({
			method : 'POST',
			data : req,
			url : 'rest/customerreq/selectuserrequisition',
			headers : {
				'Content-Type' : 'application/json',
				'userId' : userId,
				'action' : action
				
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.changeAppliedJobsStatus = function(checkedappliedjobs,action,decisioncomment,loginuserid){
		var promise = $http({
			method : 'POST',
			data : checkedappliedjobs,
			url : 'rest/customerreq/changeappliedjobsstatus',
			headers : {
				'Content-Type' : 'application/json',
				'action' : action,
				'decisioncomment' : decisioncomment,
				'loginuserid' : loginuserid
						
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.selectedRequistion = function(reqId,userAppliedJobId){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/selectedrequistion/'+reqId+"/"+userAppliedJobId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.decisionLoglistForUser = function(userAppliedJobId){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/decisionloglistforuser/'+userAppliedJobId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchReqforSelected = function(userJobId){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/fetchreqforselected/'+userJobId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getSettings = function(userId,screanId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchscreensettings/'+userId+"/"+screanId,			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.savesettings = function(columnlist,userId){		
		var promise = $http({
			method : 'POST',
			data : columnlist,
			url : 'rest/admin/savesettings/'+userId,
			headers : {
				'Content-Type' : 'application/json',
														
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchassessmentlist = function(brand_id,dept_id,position_id){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/fetchassessmentlist/'+brand_id+"/"+dept_id+"/"+position_id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.fetchRequisitionAssessment = function(colName,order,req_id){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/fetchRequisitionAssessment/'+colName+"/"+order+"/"+req_id,
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