'use strict';

var services = angular.module('LoginModule');


services.service('CrewDeployCreateViewRequisition_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.fetchCrewDeployRequisitionList = function(offset,limit,colName,order,search,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/crewdeployreqlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+fromDate+"/"+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getCrewDeployRequisitionCount = function(searchterm,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/getcrewdeployrequisitioncount/'+searchterm+"/"+fromDate+"/"+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchpositonbydepartmentcrewdeployment = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/fetchpositonbydepartmentcd/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.fetchshipbybrand = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/fetchshipbybrand/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	

	this.fetchCategoryListCrewDeployment = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/fetchCategoryListCrewDeployment',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.saveCrewDeployRequisition = function(credeployrequisitionstn){
		var promise = $http({
			method : 'POST',
			data : credeployrequisitionstn,
			url : 'rest/crewdeploymentrequisition/saveCrewDeployRequisition',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updateCrewDeployRequisitionDetails = function(updatecredeployrequisitionstn){
		var promise = $http({
			method : 'POST',
			data : updatecredeployrequisitionstn,
			url : 'rest/crewdeploymentrequisition/updateCrewDeployRequisitionDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.deleteFromCDreqList = function(fromlist,id){
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/crewdeploymentrequisition/deleteFromCDreqList',
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
	
	this.fetchCrewDeployRequisitionById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentrequisition/fetchCrewDeployRequisitionById/'+id,
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