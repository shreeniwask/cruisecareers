
'use strict';

var services = angular.module('LoginModule');


services.service('Repate_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchUploadedRepatFileList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/fetchuploadedrepatfilelist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
			
	
	this.maxDaysUpdate = function(id,days){             
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/maxDaysUpdate/'+id+"/"+days,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.mmiDateUpdate = function(id,date){             
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/mmiDateUpdate/'+id+"/"+date,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.getUploadedListcount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/getUploadedListcount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.addShipDataDetails = function(shipdata){
		var promise = $http({
			method : 'POST',
			data:shipdata,
			url : 'rest/shipdata/addshipdatafile',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchLogList=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/getshipdatalog/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.deleteShipDataFileList = function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/repatDataUpload/deletefromlist',
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
	
	this.fetchOverLappingData = function(enumber,id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/shipdata/fetchoverlappingdata/'+enumber+"/"+id,
			headers : {
				'Content-Type' : 'application/json',				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	};
	
	this.keepRecords= function(keepId,remId,logId){
		
		var promise = $http({
			
			method : 'POST',
			url : 'rest/shipdata/keeprecords/'+keepId+"/"+remId+"/"+logId,
			headers : {
				'Content-Type' : 'application/json',				
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchRepatDataList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/fetchRepatDataList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
			
	this.getRepatDataListcount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/repatDataUpload/getRepatDataListcount/'+searchterm,
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