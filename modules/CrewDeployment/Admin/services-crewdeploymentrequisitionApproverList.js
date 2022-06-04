'use strict';

var services = angular.module('LoginModule');


services.service('CrewDeploymentRequisitionApproverList_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.brandsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/uploadcrewdeployleavedata/brandslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchCrewDeployApproverList = function(offset,limit,colName,order,search,brandid){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentapprover/crewdeploymentapproverlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+brandid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchCrewDeployApproverListCount = function(search,brandid){
		var promise = $http({
			method : 'GET',
			url : 'rest/crewdeploymentapprover/fetchCrewDeployApproverListCount/'+search+'/'+brandid,
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
				url : 'rest/crewdeploymentapprover/getrequisitionlog/'+id,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
		};
		
		this.updateApproverStatus = function(req,status,adminid){
			var promise = $http({
				method : 'POST',
				data : req,
				url : 'rest/crewdeploymentapprover/updateApproverStatus/'+status+"/"+adminid,
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