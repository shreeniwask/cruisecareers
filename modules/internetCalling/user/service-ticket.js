

var services=angular.module("LoginModule");

services.service('TicketService',function($http){

	this.fetchTicketList = function(userId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/call/tickets/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
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
	
	this.closeTicket = function(ticketId){             
		var promise = $http({
			method : 'POST',
			url : 'rest/call/close_call/'+ticketId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.insertCallRating=function(callRating){
		var promise = $http({
			method : 'POST',
			url : 'rest/callRate/giveRating',
			data: callRating,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		

	};
	this.replyToTicket = function(attachments,usercallLog,audioFile,audioFileName){             

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
	}
})

