'use strict';

var services = angular.module('LoginModule');


services.service('Email_Configuration_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	//for emailtypemaster configuration
	this.getEmailConfigBean = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/getemailconfig',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	//for updating emailconfigbean
	this.updateEmailConfigBean = function(emailConfigBean){
		var promise = $http({
			method : 'POST',
			data:emailConfigBean,
			url : 'rest/emaillogdetail/updateemailconfig',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
/*	// getEmailTypeRoleMasterPojo
	this.getEmailTypeRoleMasterPojo = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/getemailtyperolemap',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	
	/*// getEmailTypeRoleMasterList
	this.getEmailTypeRoleMapList = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/getemailtyperolemaplist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	
	// getemailTypeAssignToBeanList fetchEmailTypeAssignToBeanList
	this.emailTypeAssignToBeanList = function(offset,limit,colName,order){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/getemailtypeassigntolist/'+offset+'/'+limit+'/'+colName+'/'+order,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//for updating EmailTypeRoleMap
	this.updateEmailTypeRoleMap = function(emailTypeAssignToBean,offset,limit,colName,order){
		var promise = $http({
			method : 'POST',
			data:emailTypeAssignToBean,
			url : 'rest/emaillogdetail/updateemailtyperolemap/'+offset+'/'+limit+'/'+colName+'/'+order,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
	// fetchEmailTypeAssignToBeanList
	this.fetchEmailTypeAssignToBeanList = function(offset,limit,colName,order){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/fetchemailtypeassigntolist/'+offset+'/'+limit+'/'+colName+'/'+order,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	this.addNewEmail = function(emailConfigBean){
		var promise = $http({
			method : 'POST',
			data:emailConfigBean,
			url : 'rest/emaillogdetail/addnewemail',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	this.fetchEmailListCount = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/fetchemaillistcount',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteEmailTypeLogs = function(getCheckedId){
		var promise = $http({
			method : 'POST',
			data:getCheckedId,
			url : 'rest/emaillogdetail/deletefromtypelist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};
	
	
	this.retentionDaysUpdate = function(id,days){             
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/retentionDaysUpdate/'+id+"/"+days,
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