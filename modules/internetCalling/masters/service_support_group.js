

var services=angular.module("LoginModule");

services.service('SupportGroupService',function($http){


	this.fetchSupportGroupList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/supportGroup/all/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.createSupportGroup=function(SupportGroup){
		var promise = $http({
			method : 'POST',
			url : 'rest/supportGroup/create',
			data: SupportGroup,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		

	}
	this. fetchSupportGroupListing=function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/supportGroup/all/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
		headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
		
	};
	this.fetchSupportGroupListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/supportGroup/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchSupportGroupById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/supportGroup/edit/'+id,
			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		


	};
	this.updateSupportGroup = function(supportGroup){
		var promise = $http({
			method : 'POST',
			url : 'rest/supportGroup/update/',
			data : supportGroup,
			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.deleteSupportGroup = function(supportGroupIds,grouptype){
		
		var promise = $http({
			method : 'POST',
			data:supportGroupIds,
			url : 'rest/supportGroup/deletesupportgroup',
			headers : {
				'Content-Type' : 'application/json',
				'grouptype' :grouptype
 			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
})





	


