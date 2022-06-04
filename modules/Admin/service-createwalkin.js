'use strict';

var services = angular.module('LoginModule');


services.service('Create_Walkin_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
this.saveJobFairDetail = function(jobfair){  
		
		var promise = $http({
			method : 'POST',
			data:jobfair,
			url : 'rest/createjobfair/savejobfairdetail',
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
