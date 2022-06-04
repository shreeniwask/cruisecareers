'use strict';

var services = angular.module('LoginModule');


services.service('Free_Query_Candidate_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchFreeQueryCandidateList = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/freequery/fetchfreequerycandidatelist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.savepFreeQueryDetailCandidate = function(configList){
			
			var promise = $http({
				method : 'POST',
				data:configList,
				url : 'rest/freequery/savepfreequerydetailcandidate',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.fetchSuggestionList = function(tableName,name){
			
			var promise = $http({
				method : 'GET',
				url : 'rest/freequery/fetchsuggestion/'+tableName+"/"+name,
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