'use strict';

var services = angular.module('LoginModule');


services.service('UserJobFair_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
this.fetchJobFairJobListForUser = function(search,userId,walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchjobfairjoblistforuser/'+search+"/"+userId+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
this.fetchJobFairJobListForUserforlandingpage = function(search,userId,walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchjobfairjoblistforuseforlandingpage/'+search+"/"+userId+"/"+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
this.fetchJobFairImageListForUser = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchjobfairimagelistforuser/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchJobFairImageListForLandingPage = function(walkinflag){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchjobfairimagelistforlandingpage/'+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getJobFairJobListForUsercount = function(searchterm,jobfairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/getjobfairjoblistforusercount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchJobFairJobById = function(id,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchjobfairjobbyid/'+id+"/"+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
this.fetchDateAndTimeSlots = function(jobfairId,selectedDate){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchdateandtimeslots/'+jobfairId+'/'+selectedDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.saveSlotsOfUser = function(slot){
		var promise = $http({
			method : 'POST',
			data:slot,
			url : 'rest/userjobfair/saveslotsofuser',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchSelectedUserSlot = function(userId,jobFairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchselecteduserslot/'+userId+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchStartInterviewDetails = function(jobFairId,userId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchstartinterviewdetails/'+jobFairId+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.selectedSlotCount = function(userId,jobFairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/selectedslotcount/'+userId+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteUserSlot = function(userId,slot){
		var promise = $http({
			method : 'POST',
			data:slot,
			url : 'rest/userjobfair/deleteuserslot/'+userId,
			headers : {
				'Content-Type' : 'application/json',
				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	
	this.getAppliedJobCountForUser = function(userId,jobFairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/getappliedjobcountforuser/'+userId+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getActiveJobfairCount = function(walkinflag){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/getactivejobfaircount/'+walkinflag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.fetchInterviewCallLogId = function(userid,jobFairId){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchinterviewcalllogid/'+userid+"/"+jobFairId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchStatusOfCandidate = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/userjobfair/fetchStatusOfCandidate/'+userid,
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