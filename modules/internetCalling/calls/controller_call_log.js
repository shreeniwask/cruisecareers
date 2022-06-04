var controllers=angular.module("LoginModule")

controllers.controller('CallLogController',function($rootScope,$scope,CallLogService,$state,GlobalModule_dataStoreService,$interval,GlobalModule_notificationService){
	$scope.callLog=[];
	$scope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	var audioFile;
	var audioFileName;
	$scope.files;
	$scope.answeredCall=false;
	$scope.missedCall=false;
	$scope.closed=false;
	$scope.outgoingCalls=false;
	$scope.attachments=[];
	$scope.textmessage=false;
	$scope.voicemessage=false;
	$scope.calloptions=false;
	$scope.recorded=false;
	
	
	$scope.userCallAttachmentList=[];
	$scope.fetchCallsList = function(offset,limit,colName,order,search,answeredCall,missedCall,closedCall,outgoingCalls){
		$scope.answeredCall=answeredCall;
		$scope.missedCall=missedCall;
		$scope.closed=closedCall;
		$scope.outgoingCalls=outgoingCalls;
		$scope.callLog=[];
		$(".loader").show();


		if(search==null || search=="")
		{
			search= undefined;

		}
		if(colName == null || colName== ""){
			colName = undefined;
		}
		if(order == null){
			order = undefined;
		}
		$(".loader").show();
		var callSourceId=1;
		CallLogService.fetchCallsList(offset,limit,colName,order,search,answeredCall,missedCall,callSourceId,closedCall,outgoingCalls).then(function(response){
			$scope.callLogs=response.data;
			//console.log($scope.callLogs);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};

	//$scope.fetchCallsList(0,10,null,null,null);
	

	$scope.initiateCommunication=function(callId,userId,callType){ 
		$(".loader").show();
		var callFor=1;

		CallLogService.checkIfCallClosed(callId).then(function(response){
			if(response.data){
				GlobalModule_notificationService.notification("error","Call has been terminated");
			}else{
				GlobalModule_dataStoreService.storeData('LoginModule','callFor',callFor);
				$state.go("restricted.admin.ongoing_call",{callId: callId,userId: userId,callType: callType});
			}
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}

	$scope.fetchCommunicationNotes=function(callLog){
		$(".loader").show();
		$scope.callLog=callLog;
		CallLogService.fetchCommunicationNotes($scope.callLog.userid,$scope.callLog.id).then(function(response){

			$scope.callLog.communicationNotes=response.data;
			console.log($scope.callLogList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	
	$scope.showOptions=function(textmessage,voicemessage,calloptions){
		$scope.textmessage=textmessage;
		$scope.voicemessage=voicemessage;
		$scope.recorded=false;
		sec = 0;
		min = 0;
		hr = 0;
		clearInterval(myTimer);
		recorder.stop();
	}
	
	$scope.callEndNotification=function(){
		GlobalModule_notificationService.notification("success","Communication ended by employee");
		//$state.go("restricted.support_feedback",{callId: $stateParams.callId});
		
	}
	

	$scope.showTxtMessage=function(callLog){
		$scope.textmessage=false;
		$scope.voicemessage=false;
		$(".loader").show();
		$scope.ticketDetails={};
		$scope.callLog=callLog;
		CallLogService.fetchTicketDetails(callLog.id).then(function(response){
			$scope.ticketDetails=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		});
		CallLogService.fetchUserCallAttachmentByUserCallId($scope.callLog.id).then(function(response){

			$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
			$('#text_message_user').show();
			$("#reply_header").html('Text Message from '+callLog.user.firstName);
			$('#voice_message_user').hide();
			$("#text_message").modal({backdrop: 'static'});
			
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.showMissedCall=function(callLog){
		$(".loader").show();
		$scope.ticketDetails={};
		$scope.userCallAttachmentList=[];
		$scope.callLog=callLog;
		CallLogService.checkIfUserIsOnline($scope.callLog.user.id).then(function(response){
			$scope.calloptions=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		});
		$('#text_message_user').show();
		$("#reply_header").html('Missed '+callLog.communicationOption.name+' from '+callLog.user.firstName);
		$('#voice_message_user').hide();
		$("#text_message").modal({backdrop: 'static'});
	};
	$scope.showAudioMessage=function(callLog){
		$scope.textmessage=false;
		$scope.voicemessage=false;
		$(".loader").show();
		$scope.ticketDetails={};
		$scope.callLog=callLog;
		$scope.userCallAttachmentList=[];
		CallLogService.fetchTicketDetails(callLog.id).then(function(response){
			$scope.ticketDetails=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		});
		$rootScope.getSignedURL($scope.callLog.voiceMessage).then(function(response){
			$scope.voiceMessage=response.data;
			$(".loader").fadeOut("slow");
			$('#text_message_user').hide();
			$('#voice_message_user').show();
			$("#reply_header").html('Voice Message from '+callLog.user.firstName);
			$("#text_message").modal({backdrop: 'static'});
			//start('audio-only','audio_msg',response.data)
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	};

	$scope.replyViaMessage=function(message,attachmentId){
		$(".loader").show();
		var usercallLog={};
		usercallLog.userCallId=$scope.callLog.id;
		usercallLog.textMessage=message;
		usercallLog.agentId=$scope.userdetails.id;
		usercallLog.callerid=$scope.callLog.userid;
		CallLogService.insertCommunicationOptionSelectionDetails($('#'+attachmentId)[0].files,usercallLog).then(function(response){
			usercallLog=response.data;
			$(".loader").fadeOut("slow");
			$('#audio-details').modal('hide');
			$('#text_message').modal('hide');
			$('#text_reply_form')[0].reset();
			$scope.attachments=[];
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}

	
	
	$scope.msToTime=function(duration) {
		if(duration){
			
		
		  var milliseconds = parseInt((duration % 1000) / 100),
		    seconds = parseInt((duration / 1000) % 60),
		    minutes = parseInt((duration / (1000 * 60)) % 60),
		    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		  hours = (hours < 10) ? "0" + hours : hours;
		  minutes = (minutes < 10) ? "0" + minutes : minutes;
		  seconds = (seconds < 10) ? "0" + seconds : seconds;

		  return hours + ":" + minutes + ":" + seconds ;
		}
		}
	$scope.fetchCommunicationHistory=function(callLog){
		$(".loader").show();
		$scope.callLog=callLog;
		CallLogService.fetchTicketDetails(callLog.id).then(function(response){
			$scope.ticketDetails=response.data;
			$(".loader").fadeOut("slow");
			$('#support_history').modal();
		},function(response){
			$(".loader").fadeOut("slow");
		});
		CallLogService.fetchUserCallAttachmentByUserCallId($scope.callLog.id).then(function(response){

			$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.replyViaVoiceMessage=function(){
		$(".loader").show();
		
		var usercallLog={};
		usercallLog.userCallId=$scope.callLog.id;
		usercallLog.agentId=$scope.userdetails.id;
		usercallLog.callerid=$scope.callLog.userid;
		
	CallLogService.insertCommunicationOptionSelectionDetails(undefined,usercallLog,audioFile,audioFileName).then(function(response){
		usercallLog=response.data;
			$(".loader").fadeOut("slow");
			$('#audio-details').modal('hide');
			$('#text_message').modal('hide');
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	var recorder;
	$scope.recordAudio = function(check){
		//alert(index);
		//$scope.voiceQuestionIndex=index;
		if(check){
			$('#button_play').attr('disabled','disabled');
			$('#button_stop').removeAttr('disabled');

			requestAideo();
			//startRecording();
		}else{
			$('#button_stop').attr('disabled','disabled');
			$('#button_play').removeAttr('disabled');
			stopRecording();
		}
	};



	function requestAideo() {

		navigator.mediaDevices.getUserMedia({

			audio: true
		}).then(function(stm)  {
			stream = stm;
			recorder = new MediaRecorder(stream);
			recorder.start();
			// audioVoice.src = URL.createObjectURL(stream);
		});

	}

	function stopRecording() {
		//$scope.audioRecorded=true;
		recorder.ondataavailable = function(e) {
			$scope.audioRecorded=true;

			var audioName = ['audio_', (new Date() + '').slice(4, 28), '.ogg'].join('');
			//console.log($scope.voiceQuestionIndex);

			var audioVoice= document.getElementById('voice-respnce');
			audioVoice.src  = URL.createObjectURL(e.data);
			console.log(e.data);
			audioFile=e.data;
			audioFileName=audioName;
			//$scope.uploadaudio(e.data,audioName);


		};

		recorder.stop();
		$scope.recorded=true;
		$('#button_stop').show()


	}
	
	
		//code for sorting and pagination
		
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchCallsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.answeredCall,$scope.missedCall,$scope.closed,$scope.outgoingCalls);
	};

	$scope.fetchCallListCount=function(searchterm,answeredCall,missedCall,closedCall,outgoingCalls){
		
		$scope.answeredCall=answeredCall;
		$scope.missedCall=missedCall;
		$scope.closed=closedCall;
		$scope.outgoingCalls=outgoingCalls;
		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		
		$scope.search=searchterm;
		
		if($scope.colName == null){
			$scope.colName = undefined;
		}
		if($scope.order == null){
			$scope.order = undefined;
		}
		if($scope.search=="" || $scope.search == null)
		{
			$scope.search= undefined;  
		}
		
		var callSourceId=1;

		CallLogService.fetchCallListCount($scope.search,answeredCall,missedCall,callSourceId,closedCall,outgoingCalls).then(function(response){				
			
			$scope.count = response.data;
			
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});	
		$scope.fetchCallsList(0,10,null,null,null,answeredCall,missedCall,closedCall,outgoingCalls);
	};
	$scope.fetchCallListCount(null,false,false,false,false);

	$scope.previous = function() {
		$scope.start =  $scope.start - 5;
		$scope.offset = $scope.start * $scope.limit;
		$scope.setButton();

	};

	$scope.next = function() {
		$scope.start =  $scope.start + 5;
		$scope.offset = $scope.start * $scope.limit;	      
		$scope.setButton(); 

	};

	$scope.current = function(page) {  
		$scope.offset = page * $scope.limit;
		$scope.fetchCallsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.answeredCall,$scope.missedCall,$scope.closed,$scope.outgoingCalls);
	};


//		--------------------sorting---------------------------------

		$scope.SortingfetchCallList = function(colName,searchterm){
			
			$scope.offset =0 ;
			$scope.start = 0;
			$scope.colName=colName;
			$scope.search=searchterm;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search=="" || $scope.search==null)
			{
				$scope.search= undefined;

			}
			if($scope.colName==null)
			{
				$scope.colName= undefined; 
			}
			$scope.fetchCallsList(0,10,$scope.colName,$scope.order,$scope.search);	
				
		};

		
	$scope.showCallRecording=function(callLog,url){
		$(".loader").show();
		$scope.callLog=callLog;
		$rootScope.getSignedURL(url).then(function(response){
			$scope.voiceMessage=response.data;
			$(".loader").fadeOut("slow");
			
			if(video){
				stop();
			}
			$("#video-details").modal({backdrop: 'static'});
			if($scope.callLog.communicationOption.name=="Audio Call"){
				start('audio-only','video_recording',response.data)
			}else{
			
				start(null,'video_recording',response.data)
			}
			
				
			
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	}
	 
	$scope.download = function(path){

		if(path.includes("amazonaws"))
		{
			$rootScope.getSignedURL(path).then(function(response){
				window.open(response.data);
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		}
		else
		{
			window.open(path);
		}
	};
	
	$scope.enableFileEvent=function(){
		$scope.attachments=[]
		console.log("1")
		$("#attachments_message").on('change', function() {
			if (this.files.length >= 1) {
			$.each(this.files, function(i, file) {
				
				$scope.$apply(function(){
					$scope.attachments.push(file);
				})
				
		        })
				
			}
		        
			
		});
	}
	$scope.getNumber = function(num) {
        return new Array(num);   
    }
	
	$scope.playAudioMessage=function(ticket){
		//$(".loader").show();
		
		$rootScope.getSignedURL(ticket.voiceMessage).then(function(response){
			$(".loader").fadeOut("slow");
			if(video){
				stop();
			}
			
			start('audio-only','player'+ticket.id,response.data)
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	};
	
	$scope.dateformate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        
        return dateOut;
  };
  
  $scope.replyToMissedCall=function(callId,userId,callType){ 

	  var callFor=1;

	  GlobalModule_dataStoreService.storeData('LoginModule','callFor',callFor);

	  $state.go("restricted.admin.missed_call_reply",{callId: callId,userId: userId,callType: callType});
  }
  
  

});