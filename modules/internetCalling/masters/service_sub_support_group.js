

var services=angular.module("LoginModule");

services.service('SubSupportGroupService',function($http){
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
	this.insertSubSupportGroup=function(subSupportGroup){
		var promise = $http({
			method : 'POST',
			url : 'rest/subSupportGroup/create',
			data: subSupportGroup,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		

	};
	this.fetchListingSubSupportGroupList=function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/subSupportGroup/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		

	};
	this.fetchSubSupportGroupListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/subSupportGroup/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchSubSupportGroupById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/subSupportGroup/edit/'+id,
			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		


	};
	this.updateSubSupportGroup = function(subSupportGroup){
		var promise = $http({
			method : 'POST',
			url : 'rest/subSupportGroup/update/',
			data : subSupportGroup,
			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		


	};
});




