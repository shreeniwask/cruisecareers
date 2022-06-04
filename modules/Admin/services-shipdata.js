
'use strict';

var services = angular.module('LoginModule');


services.service('Shipdata_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchShipDataList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/shipdata/fetchshipdatalist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
			
	this.getShipDatacount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/shipdata/getshipdatacount/'+searchterm,
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
			url : 'rest/shipdata/getshipdatalog/'+id,
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
			url : 'rest/shipdata/deletefromlist',
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
	
}]);