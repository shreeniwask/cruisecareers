'use strict';

var services = angular.module('LoginModule');


services.service('Dashboard_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchDashboarddata = function(userid,rolid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/dashboarddata/'+userid+'/'+rolid,
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
