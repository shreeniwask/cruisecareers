

var services=angular.module("LoginModule");

services.service('SupportOptionsService',function($http){
	this.insertCommunicationOptionSelectionDetails = function(attachments,userCallDetails,audioFile,audioFileName){             

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

		payload.append('userCallDetails', JSON.stringify(userCallDetails));

		return $http({
			url: 'rest/call/option_selection',
			method: 'POST',
			data: payload,
			//assign content-type as undefined, the browser
			//will assign the correct boundary for us
			headers: { 'Content-Type': undefined},
			//prevents serializing payload.  don't do it.
			transformRequest: angular.identity
		});
	};

})