'use strict';

var services = angular.module('LoginModule');


services.service('Emaillogdetail_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchEmailLogDetailList = function(offset,limit,colName,order,search,user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/emaillogdetail/fetchemailloglist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getEmailLogDetailListcount = function(search,user){
		
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/emaillogdetail/getEmailLogDetailListcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	// for deleting emailConfigList
	
	//for updating EmailTypeRoleMap
	this.deleteEmailLogs = function(getCheckedId){
		var promise = $http({
			method : 'POST',
			data:getCheckedId,
			url : 'rest/emaillogdetail/deletefromlist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
			
	};

	/*this.addExpirydate = function(id,date){             
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/addExpirydate/'+id+"/"+date,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
*/
	
	this.getIndosNumber = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/emaillogdetail/getIndosNumber/'+id,
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