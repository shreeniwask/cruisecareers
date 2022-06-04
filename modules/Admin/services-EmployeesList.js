'use strict';

var services = angular.module('LoginModule');


services.service('Employee_List_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchEmployeeList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/fetchemployeelist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getEmployeeListcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/getemployeelistcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.fetchEmployeDetails = function(empId){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/fetchemployedetails/'+empId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSelectJobDetailsOfEmployee = function(empId,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/fetchselectjobdetailsofemployee/'+empId+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchIndosNumber = function(empId){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/fetchIndosNumber/'+empId,
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
	
	this.fetchMissingIndosNumber = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/employee/fetchMissingIndosNumber',
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