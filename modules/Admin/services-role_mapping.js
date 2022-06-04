'use strict';

var services = angular.module('LoginModule');


services.service('role_mapping_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchRoleMenuList = function(roleId){
		var promise = $http({
			method : 'GET',
			url : 'rest/rolemapping/fetchrolemenulist/'+roleId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchCreatedRoleList = function( offset, limit,searchOf,order, colName){
		var promise = $http({
			method : 'GET',
			
			url : 'rest/rolemapping/fetchcreatedrolelist/'+offset+"/"+limit+"/"+searchOf+"/"+order+"/"+colName,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	this.getCreatedRoleCount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/rolemapping/getcreatedrolecount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveCreatedRole = function(roleMenuMapping){		
		var promise = $http({
			method : 'POST',
			data : roleMenuMapping,
			url : 'rest/rolemapping/savecreatedrole/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.updateCreatedRole = function(roleMenuMapping){		
		var promise = $http({
			method : 'POST',
			data : roleMenuMapping,
			url : 'rest/rolemapping/updatecreatedrole/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.deleteRoleFromList = function(id){		
		var promise = $http({
			method : 'POST',
			data :id,
			url : 'rest/rolemapping/deleteRoleFromList/',
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