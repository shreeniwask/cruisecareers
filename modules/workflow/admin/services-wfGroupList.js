'use strict';

var services = angular.module('LoginModule');


services.service('group_mapping_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.deleteFromGroupList = function(id,senderid){		
		var promise = $http({
			method : 'POST',
			data :id,
			url : 'rest/grouplisting/deleteFromGroupList/'+senderid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		

	};
	this.fetchGroupList = function( offset, limit, colName,order,searchOf){
		
		var promise = $http({
			method : 'GET',

			url : 'rest/grouplisting/fetchgrouplist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+searchOf,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;	
	};
	this.fetchGroupCount = function(search){
		var promise = $http({
		method : 'GET',
		url : 'rest/grouplisting/grouplistcount/'+search,
		headers : {
		'Content-Type' : 'application/json'
		},
		cache : false
		}).then(function (response) {
		       return response;
		   });
		return promise;	
		};
		
		//For Insert Group
	/*	this.insertGroupList = function(groupMap){		
			var promise = $http({
				method : 'POST',
				data : groupMap,
				url : 'rest/grouplisting/insertGroupList/',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
			
		};
		
	*/	this.createGroup = function(groupMap){		
			var promise = $http({
				method : 'POST',
				data : groupMap,
				url : 'rest/grouplisting/creategroup/',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
			
		};
		
		
		this.fetchGroupOwnersList = function(groupId){
			
			var promise = $http({
				method : 'POST',

				url : 'rest/grouplisting/fetchgroupownerslist/'+groupId,
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

