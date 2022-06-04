'use strict';

var services = angular.module('LoginModule');


services.service('Sms_Configuration_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	//for sms mode configuration
	this.getSmsModeConfig = function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/smsconfigdetail/getsmsmodeconfig/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//for sms mode configuration
	this.saveSmsMode = function(smsmodeid,userid){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/smsconfigdetail/savesmsmode/'+smsmodeid+'/'+userid,
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