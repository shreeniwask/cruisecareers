'use strict';

var services = angular.module('LoginModule');


services.service('chatAdmin_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchonlineusers = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/AdminChat/fetchonlineusers',
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
