'use strict';

var services = angular.module('LoginModule');


services.service('resetPassword_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	this.resetUserPassword = function(user){
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/user/resetuserpassword',
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
	