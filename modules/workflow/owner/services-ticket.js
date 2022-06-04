'use strict';

var services = angular.module('LoginModule');


services.service('ticket_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
   this.fetchTicketList = function(offset,limit,colName,order,search,userId,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/fetchTicketList/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search+'/'+userId+'/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getTicketListCount = function(search,workflowID,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/fetchTicketListCount/'+search+'/'+workflowID+'/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.fetchOwnerType=function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/fetchOwnerTypeList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	};
	this.getOwnerTypeListById1=function(ownerTypeId){
		var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/getOwnerTypeListById1/'+ownerTypeId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	};   
	this.fetchTaskListDetails=function(ticketId,workflowId,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/taskDetails/fetchTaskList/'+ticketId+'/'+workflowId+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	}; 
	
	this.assignTaskUserGroupDepartment = function(ticketListWithTicket,workflowId,userId,actionFlag){
		var promise = $http({
			method : 'POST',
			data:ticketListWithTicket,
			url : 'rest/ticketDetails/assignTaskUserGroupDepartment/'+workflowId+'/'+userId+'/'+actionFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	 this.fetchTicketListByDate = function(offset,limit,colName,order,search,workflowId,fromDate,toDate){
		
		 var promise = $http({
			method : 'GET',
			url : 'rest/ticketDetails/getTicketListFromToDate/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search+'/'+workflowId+'/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.assignSingleAndMultipleTicketUser = function(listTicketId,workflowId,userId){
		
		 var promise = $http({
			 method : 'POST',
		     data:listTicketId,
			url : 'rest/ticketDetails/updateTicketStatus/'+workflowId+'/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.changeTicketStatus = function(listTicketId,workflowId,userId){
		
		 var promise = $http({
			 method : 'POST',
		     data:listTicketId,
			url : 'rest/ticketDetails/changeticketstatus/'+workflowId+'/'+userId,
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
