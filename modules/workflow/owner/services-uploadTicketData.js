'use strict';

var services = angular.module('LoginModule');


services.service('UploadTicketData_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
this.fetchUploadedFileList=function(offset,limit,colName,order,search,workflowId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadticketdata/fetchuploadedfilelist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
this.fetchTicketLogList=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadticketdata/fetchticketdatalog/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.getTicketDatacount = function(searchterm,workflowId){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadticketdata/gettickedatacount/'+searchterm+"/"+workflowId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteTicketDataFileFromList = function(fromlist,id){
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/uploadticketdata/deletefromlist',
			headers : {
				'Content-Type' : 'application/json',
				'fromlist' :fromlist
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
}]);