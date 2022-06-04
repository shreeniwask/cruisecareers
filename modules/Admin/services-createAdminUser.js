

'use strict';

var services = angular.module('LoginModule');


services.service('createAdminUser_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.getUserList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/createAdminUser/getUserList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getUserListCount = function(search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/createAdminUser/getUserCount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteUserList = function(getCheckedId,senderId){             
		var promise = $http({
			method : 'POST',
			data:getCheckedId,
			url : 'rest/createAdminUser/deleteUserList/'+senderId,   //+userlist+"/"+getCheckedId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchRole = function(){           
	 
		var promise = $http({
			method : 'GET',
			url : 'rest/createAdminUser/fetchRole',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveNewUserData = function(userDataObj,senderId){		
		var promise = $http({
			method : 'POST',
			data : userDataObj,
			url : 'rest/createAdminUser/saveNewUserData/'+senderId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	
	this.UpdateDataResponse = function(userDataObj,senderId){		
		var promise = $http({
			method : 'POST',
			data : userDataObj,
			url : 'rest/createAdminUser/UpdateDataResponse/'+senderId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	

	
	
	this.fetchUserRole = function(id){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/createAdminUser/fetchUserRole/'+id,
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

