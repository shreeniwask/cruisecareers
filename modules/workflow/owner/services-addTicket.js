'use strict';

var services = angular.module('LoginModule');


services.service('addTicket_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
   this.fetchWorkflowDataFieldList1 = function(workflowId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/fetchWorkflowField/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response){
	        return response;
	    });
		return promise;		
	};
	this.addNewTicket1 = function(workflowdDataFieldList,workflowId){
		var promise = $http({
			method : 'POST',
			data:workflowdDataFieldList,
			url : 'rest/ticketDetails/addTicket/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchWorkflowDataFieldListByTicketId=function(ticketId,workflowId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/fetchWorkflowDataFieldListByTicketId/'+ticketId+'/'+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response){
	        return response;
	    });
		return promise;		
		
	};
	this.updateTicket1 = function(workflowdDataFieldList,workflowId,userId,ticketId){
		var promise = $http({
			method : 'POST',
			data:workflowdDataFieldList,
			url : 'rest/ticketDetails/updateTicket/'+workflowId+'/'+userId+'/'+ticketId,
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
