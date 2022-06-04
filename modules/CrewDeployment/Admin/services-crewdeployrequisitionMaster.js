'use strict';

var services = angular.module('LoginModule');


services.service('CrewDeployRequisitionMaster_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
 //----Fetch Crew DEployment Configuration brand-wise--------------------
	
	this.fetchCrewDeployConfigbyBrandData = function(brand_id){             
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentconfiguration/fetchCrewDeployConfigByBrand/'+brand_id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.brandsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentconfiguration/brandslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.saveCrewDeployConfig = function(crewdeployConfig){
		var promise = $http({
			method : 'POST',
			data : crewdeployConfig,
			url : 'rest/crewdeploymentconfiguration/saveCrewDeployConfig',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updateCrewDeployConfigDetails = function(updatecrewdeployConfig){
		var promise = $http({
			method : 'POST',
			data : updatecrewdeployConfig,
			url : 'rest/crewdeploymentconfiguration/updateCrewDeployConfigDetails',
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