

var services=angular.module("LoginModule");

services.service('InterviewRequestService',function($http){
	
	this.fetchInterviewRequestList = function(offset,limit,colName,order,search){ 
		var url='rest/interviewrequest/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search;
		var promise = $http({
			method : 'GET',
			url : url,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchInterviewRequestListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewrequest/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.updateApproveRejectStatus = function(slotid,userid,approvalid,aid,userdetail){
		var promise = $http({
			method : 'POST',
			data: userdetail,
			url : 'rest/interviewrequest/updateApproveRejectStatus/'+slotid+'/'+userid+'/'+approvalid+'/'+aid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	
	this.fetchUserDetails = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewrequest/fetchUserDetails/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
})