'use strict';

var services = angular.module('LoginModule');


services.service('Admin_dashBoard_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	this.fetchRegistrationAndAppliedCount = function(brandId,pastMonthId,betweenYears){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboardscheduler/fetchregistrationandappliedcount/'+brandId+'/'+pastMonthId+'/'+betweenYears,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchInterviewSelectionCount = function(pastMonthId,betweenYears){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboardscheduler/fetchinterviewselectioncount/'+pastMonthId+'/'+betweenYears,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchRequisitionSLACount = function(brandid,pastMonthId,betweenYears){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboardscheduler/fetchrequisitionslacount/'+brandid+'/'+pastMonthId+'/'+betweenYears,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchOpenPositionCount = function(brandid,pastMonthId,betweenYears){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboardscheduler/fetchopenpositioncount/'+brandid+'/'+pastMonthId+'/'+betweenYears,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.checkadmindashboardcount = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/checkschedular',
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