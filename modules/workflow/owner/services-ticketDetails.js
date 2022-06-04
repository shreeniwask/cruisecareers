'use strict';

var services = angular.module('LoginModule');


services.service('TicketDetails_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
		
	this.fetchTicketDetails = function(ticketId,userObject,workflowOwnerId){  
		
		var promise = $http({
			method : 'POST',
			data:userObject,
			url : 'rest/ticketdetails/fetchticketdetails/'+ticketId+'/'+workflowOwnerId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
    this.updateTicketDetails = function(ticketDetails,workFlowId,ticketId,userId,updateFlag,saveFlag,submitFlag,otherFlag){  
		
		var promise = $http({
			method : 'POST',
			data:ticketDetails,
			url : 'rest/ticketdetails/updateTicketDetails/'+workFlowId+'/'+ticketId+'/'+userId+'/'+updateFlag+'/'+saveFlag+'/'+submitFlag+'/'+otherFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.saveTaskDetails= function(ticketDetails,taskId,ticketId,workflowId,userId,saveFlag){  
		
		var promise = $http({
			method : 'POST',
			data:ticketDetails,
			url : 'rest/ticketdetails/savetaskdetails/'+ticketId+'/'+workflowId+'/'+userId+'/'+saveFlag+'/'+taskId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.fetchTaskFields= function(taskDetails,ticketId){  
		
		var promise = $http({
			method : 'POST',
			data:taskDetails,
			url : 'rest/ticketdetails/fetchtaskfields/'+ticketId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;				
	};
	
	this.savePrefilledFields= function(ticketDetails,ticketId,workflowId,userId){  
		
		var promise = $http({
			method : 'POST',
			data:ticketDetails,
			url : 'rest/ticketdetails/saveprefilledfields/'+ticketId+'/'+workflowId+'/'+userId,
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