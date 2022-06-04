

var services=angular.module("LoginModule");

services.service('CallLogService',function($http){
	this.fetchCallsList = function(offset,limit,colName,order,search,answeredCalls,missedCall,callSourceId,isClosed,outgoingCalls){ 
		var url='rest/call/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+answeredCalls+"/"+missedCall+"/"+callSourceId+"/"+isClosed+"/"+outgoingCalls;
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
	this.fetchUserCallAttachmentByUserCallId=function(userCallId){
		var promise = $http({
			method : 'GET',
			url : 'rest/usercallattachment/fetch/'+userCallId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchCallListCount = function(searchterm,answeredCall,missedCall,callSourceId,isClosed,outgoingCalls){
		var promise = $http({
			method : 'GET',
			url : 'rest/call/count/'+searchterm+"/"+answeredCall+'/'+missedCall+'/'+callSourceId+"/"+isClosed+"/"+outgoingCalls,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchUserProfile = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/userprofiledetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchWorkExperience = function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchworkexperience/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchCommunicationNotes = function(userId,callId){
		var url='rest/communicationNotes/list/'+userId;
		if(callId){
			url=url+'?callId='+callId;
		}
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
	this.saveCommunicationNotes = function(notes){
		var promise = $http({
			method : 'POST',
			url : 'rest/communicationNotes/add',
			data: notes,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.insertCommunicationOptionSelectionDetails = function(attachments,usercallLog,audioFile,audioFileName){             

		var payload = new FormData();
		if(attachments){
			$.each(attachments, function(i, file) {
				payload.append("files", file);
			});

		}
		if(audioFileName){
			payload.append("voiceMessage", audioFile);
			payload.append("voiceMessageFilename", audioFileName);
		}

		payload.append('userCallLog', JSON.stringify(usercallLog));

		return $http({
			url: 'rest/call/reply',
			method: 'POST',
			data: payload,
			//assign content-type as undefined, the browser
			//will assign the correct boundary for us
			headers: { 'Content-Type': undefined},
			//prevents serializing payload.  don't do it.
			transformRequest: angular.identity
		});
	};

	this.fetchTicketDetails = function(ticketId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/call/ticketdetails/'+ticketId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.generateInterview = function(jobFairId,userId,callLogId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/call/generateinterview/'+jobFairId+"/"+userId+"/"+callLogId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchAppliedJobsByUser = function(userId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewerscreen/fetchappliedjobsbyuser/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.checkIfUserIsOnline = function(userId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/call/user_online_status/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.checkIfCallClosed = function(callId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/call/call_status/'+callId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

this.insertVideoCallLink = function(videocalldetail){             

		var promise = $http({
			method : 'POST',
			url : 'rest/call/insertVideoCallLink',
			data:videocalldetail,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchVideoCallData = function(slotdetailid,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/call/fetchVideoCallData/'+slotdetailid+'/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.fetchVideoCallCount = function(slotdetailid,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/call/fetchVideoCallCount/'+slotdetailid+'/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.uploadRecordingUrl = function(videocalldetail){
		var promise = $http({
			method : 'POST',
			url : 'rest/call/uploadRecordingUrl',
			data:videocalldetail,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.updateInterviewComplete = function(callid,userid,slotid,aid,jobfairid){
		var promise = $http({
			method : 'POST',
			url : 'rest/call/updateInterviewComplete/'+callid+'/'+userid+'/'+slotid+'/'+aid+'/'+jobfairid,
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