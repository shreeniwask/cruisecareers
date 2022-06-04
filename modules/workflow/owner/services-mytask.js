'use strict';

var services = angular.module('LoginModule');


services.service('MyTask_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
   this.fetchMyTaskList = function(offset,limit,colName,order,search,userId,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/listMyTask/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search+'/'+userId+'/'+ticketNum+'/'+identifier+'/'+taskName+'/'+startDate+'/'+endDate+'/'+workFlowname+'/'+taskStatus,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getMyTaskListCount = function(search,userId,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus){
		var promise = $http({
			method : 'GET',
			url : 'rest/ownerDashboardDetails/fetchMyTaskListCount/'+search+'/'+userId+'/'+ticketNum+'/'+identifier+'/'+taskName+'/'+startDate+'/'+endDate+'/'+workFlowname+'/'+taskStatus,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.fetchStatusList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchstatuslist',
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
