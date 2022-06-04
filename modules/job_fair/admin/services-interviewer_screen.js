'use strict';

var services = angular.module('LoginModule');


services.service('interviewerScreen_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.fetchListOfCandidatesForInterview = function(offset,limit,colName,order,search){ 
		
		var url='rest/interviewerscreen/candidatesforinterview/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search;
		
		var promise = $http({
			method : 'GET',
			url : url,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		
		return promise;		
	};
	
	this.fetchCountOfCandidatesForInterviewList = function(search){ 
		
		var url='rest/interviewerscreen/candidatesforinterviewlistcount/'+search;
		
		var promise = $http({
			method : 'GET',
			url : url,
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