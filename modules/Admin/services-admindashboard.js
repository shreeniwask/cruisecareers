'use strict';

var services = angular.module('LoginModule');


services.service('admindashBoard_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchnewApplicantCount = function(unixTimestamp){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetchnewApplicantCount/'+unixTimestamp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSchedularCount = function(unixTimestamp){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetchSchedularCount/'+unixTimestamp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchAppliedCandidatesCount = function(unixTimestamp){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetchAppliedCandidatesCount/'+unixTimestamp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTimeSlotsList = function(unixTimestamp){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetchtimeslotslist/'+unixTimestamp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTrendingJob = function(unixTimestamp){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetchTrendingJob/'+unixTimestamp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchEventListforWeek = function(unixTimestamp,timeSlots){
		var promise = $http({
			method : 'GET',
			url : 'rest/admindashboard/fetcheventlistforweek/'+unixTimestamp+"/"+timeSlots,
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