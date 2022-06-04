

var services=angular.module("LoginModule");

services.service('RegionService',function($http){

	this.fetchRegionList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/region/list',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchSupportGroupList = function(regionId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/supportGroup/list/'+regionId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchSubSupportGroupList = function(supportGroupId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/subSupportGroup/list/'+supportGroupId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
})

