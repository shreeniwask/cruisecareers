'use strict';

var services = angular.module('LoginModule');


services.service('Report_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
 //----View Position Master List--------------------
	
	this.fetchEmpReadinessReport = function(offset,limit,colName,order,search,fromDate,toDate){             
		var promise = $http({
			method : 'GET',
			url : 'rest/readinessreport/fetchemplreadnessireportList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+fromDate+"/"+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getReportListCount = function(searchterm,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/readinessreport/getreportlistcount/'+searchterm+"/"+fromDate+"/"+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.saveEmployeeStatusDetails = function(status){
		
		var promise = $http({
			method : 'POST',
			data : status,
			url : 'rest/readinessreport/saveemployeestatusdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.fetchEmployeeStatusDetails = function(emplId,reqId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/readinessreport/fetchemployeestatusdetails/'+emplId+"/"+reqId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchEmployeeNumber = function(emplId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/readinessreport/fetchemployeenumber/'+emplId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchOtherIndosNumber = function(emplId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/readinessreport/fetchotherindosnumber/'+emplId,
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