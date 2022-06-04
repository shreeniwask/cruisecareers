var controllers=angular.module("LoginModule")

controllers.controller('ControllerInterviewerScreen',function($rootScope,$scope,CallLogService,InterviewRequestService,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$interval,interviewerScreen_Service,$timeout){
	
	$scope.callLog=[];
	$scope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.redirected = GlobalModule_dataStoreService.loadData('LoginModule','redirectflag');
	$scope.offset=0;
	$scope.limit=10;
	var audioFile;
	var audioFileName;
	$scope.files;
	$scope.answeredCall=false;
	$scope.missedCall=false;
	$scope.screen=1;	
	$scope.userVideoCallDetails=[];
	$scope.redirect=0;
	
	
	$scope.userCallAttachmentList=[];
	$scope.fetchCallsList = function(offset,limit,colName,order,search,answeredCall,missedCall){
		
		$scope.answeredCall=answeredCall;
		$scope.missedCall=missedCall;
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
		var callSourceId=2;
		CallLogService.fetchCallsList(offset,limit,colName,order,search,answeredCall,missedCall,callSourceId,false,false).then(function(response){
			$scope.callLogs=response.data;
			 console.log($scope.callLogs);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};

	//$scope.fetchCallsList(0,10,null,null,null);
	

	/*$scope.generateInterview = function(callId,userId,callType,index){
		
		CallLogService.generateInterview($scope.callLogs[index].jobFairId,$scope.callLogs[index].user.id,$scope.userdetails.id).then(function(response){
			 $scope.generateInterviewId =response.data;
			 
			 $scope.initiateCommunication(callId,userId,callType);
			
		 },function(response){
			});
	};*/
	
	$scope.initiateCommunication=function(callId,userId,callType){ 
			
		var callFor=2;
		
		GlobalModule_dataStoreService.storeData('LoginModule','callFor',callFor);
		
		$state.go("restricted.admin.ongoing_interview",{callId: callId,userId: userId,callType: callType});
	}
	
	
	
	$scope.storeuserdetails=function(callId,userId,slotid,urldetail,passworddetail,jobfairid,eventID,filename){ 
		$(".loader").show();
		$scope.interviewlog=[];
		$scope.tested=[];
		$scope.callidetail=callId;
		$scope.useriddetail=userId;
		$scope.slotiddetail=slotid;
		$scope.urldata=urldetail;
		$scope.passworddata=passworddetail;
		$scope.jobFairId=jobfairid;
		$scope.eventId=eventID;
		if(filename!=undefined){
			$scope.interviewlog=filename.split(",");
			htmlelement = "";
			$("#filesdetails").html("");
			for(var i=0;i<$scope.interviewlog.length;i++){
				$scope.tested.push($scope.interviewlog[i]);
			
			      htmlelement += "<li>"+$scope.interviewlog[i]+"</li>";
			  
				
			}
			console.log($scope.tested);
			 $("#filesdetails").append(htmlelement);
			
			
	}else{
		$("#filesdetails").html("");
	}
		  $(".loader").fadeOut("slow");	
		//$scope.recdata;
	
	}
	
	$scope.updateInterviewComplete=function(callId,userid,slotid,jobFairId){ 
		$(".loader").show();
	
	
		CallLogService.updateInterviewComplete(callId,userid,slotid,$scope.userdetails.id,jobFairId).then(function(response){
			  $scope.result=response.data;
		
			  
			  if($scope.result.indexOf("success") != -1)
			  {
				  GlobalModule_notificationService.notification("success","Meeting of the candidate is completed. Please check the record in the activity log.");
				  $state.reload();
					$('.modal-backdrop').hide();
			      $(".loader").fadeOut("slow");	
			  }
		  else
			  {				  	
			      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			      $(".loader").fadeOut("slow");	
			  }
			
			 
		
				
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
		
	
	}
	
	
	$scope.sendLinkToCandidate=function(url,password){ 
		$(".loader").show();
		var userVideoCallDetails={};
		userVideoCallDetails.id=$scope.userdetails.id;
		userVideoCallDetails.callid=$scope.callidetail;
		userVideoCallDetails.userid=$scope.useriddetail;
		userVideoCallDetails.url=url;
		userVideoCallDetails.password=password;
		userVideoCallDetails.slotid=$scope.slotiddetail;
		
		if(userVideoCallDetails.url == "" || userVideoCallDetails.url == undefined){
			GlobalModule_notificationService.notification("error","Please Enter Url");	       
		       $(".loader").fadeOut("slow");
		       return;
		}
		
		
		CallLogService.insertVideoCallLink(userVideoCallDetails).then(function(response){
			  $scope.result=response.data;
			  $("#meeting_link").modal('hide');
			  
			  if($scope.result.indexOf("success") != -1)
			  {
		          GlobalModule_notificationService.notification("success","Meeting Link sent successfully");
		      	var channel = pusher.subscribe('my-channel-'+userVideoCallDetails.callid);
				channel.bind('user-registered', function(data) {
					 window.alert("hello!");
					console.log("hello!");
					//console.log(JSON.stringify(data));
					 $scope.$apply(function () {
						 $scope.callDetail=data.message;
						 if($scope.callDetail != undefined)
						 {
							 $scope.requestForStartFlag=false;
							 $scope.startFlag=true;
							 }
				     });
					
				});	
				$state.reload();
				$('.modal-backdrop').hide();
		          $(".loader").fadeOut("slow");
			  }
		  else
			  {				  	
			      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			      $(".loader").fadeOut("slow");	
			  }
			  console.log("------------------data send-------------------------------");
			 
		
				
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
		
	
	}

	$scope.fetchCommunicationNotes=function(callLog){
		$(".loader").show();
		$scope.callLog=callLog;
		CallLogService.fetchCommunicationNotes($scope.callLog.userid,$scope.callLog.id).then(function(response){

			$scope.callLog.communicationNotes=response.data;
			//console.log($scope.callLogList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};

	$scope.showTxtMessage=function(callLog){
		$(".loader").show();
		$scope.callLog=callLog;
		CallLogService.fetchUserCallAttachmentByUserCallId($scope.callLog.id).then(function(response){

			$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
			$("#text_message").modal();
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	
	$scope.showAudioMessage=function(callLog){
		$(".loader").show();
		$scope.callLog=callLog;
		
		$rootScope.getSignedURL($scope.callLog.voiceMessage).then(function(response){
			$scope.voiceMessage=response.data;
			$("#audio-details").modal();
			start('audio-only','audio_msg',response.data)
			
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
	}
	$scope.replyViaVoiceMessage=function(message){
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

			var audioVoice= document.getElementById('voice-respnce');
			audioVoice.src  = URL.createObjectURL(e.data);
			//console.log(e.data);
			audioFile=e.data;
			audioFileName=audioName;

		};

		recorder.stop();
		$('#button_stop').show()
	}

		//code for sorting and pagination
		
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		if($scope.screen==1)
		{
			$scope.fetchCallsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.answeredCall,$scope.missedCall);
		}
		else if($scope.screen==2)
		{
			$scope.fetchListOfCandidatesForInterview(0,10,null,null,$scope.search);
		}
		else if($scope.screen==3)
		{
			$scope.fetchInterviewRequestList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		}
		
	};

	$scope.setButton1 = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
	
		$scope.fetchListOfCandidatesForInterview(0,10,null,null,$scope.search);
		
		
	};
	
	$scope.fetchCallListCount=function(searchterm,answeredCall,missedCall){
		$scope.screen=1;
		$scope.redirectflag=1
		$scope.answeredCall=answeredCall;
		$scope.missedCall=missedCall;
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
		
		var callSourceId=2;
		
		CallLogService.fetchCallListCount($scope.search,answeredCall,missedCall,callSourceId,false,false).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});	
		$scope.fetchCallsList(0,10,null,null,null,answeredCall,missedCall);
	};
	$scope.fetchCallListCount(null,false,false);

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
		$scope.fetchCallsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.answeredCall,$scope.missedCall);
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
		
		$scope.SortingfetchCallList1 = function(colName,searchterm){
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
			$scope.fetchListOfCandidatesForInterview(0,10,$scope.colName,$scope.order,$scope.search);	
		
		
		};
		
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
	
	$scope.previous1 = function() {
		$scope.start =  $scope.start - 5;
		$scope.offset = $scope.start * $scope.limit;
		$scope.setButton();

	};

	$scope.next1 = function() {
		$scope.start =  $scope.start + 5;
		$scope.offset = $scope.start * $scope.limit;	      
		$scope.setButton(); 

	};

	$scope.current1 = function(page) {  
		$scope.offset = page * $scope.limit;
		$scope.fetchListOfCandidatesForInterview($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};
	
	$scope.fetchListOfCandidatesForInterview = function(offset,limit,colName,order,search){
		
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
 		
		interviewerScreen_Service.fetchListOfCandidatesForInterview(offset,limit,colName,order,search).then(function(response){
			
			$scope.callLogs=response.data;
			
			//console.log($scope.callLogs);
			
			$(".loader").fadeOut("slow");
			
		},function(response){
			
			$(".loader").fadeOut("slow");
			
		}); 
	};
	
	$scope.fetchCountOfCandidatesForInterviewList = function(searchterm){
		
		$(".loader").show();
		
		$scope.screen=2;
		$scope.redirectflag=2
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
		
		interviewerScreen_Service.fetchCountOfCandidatesForInterviewList($scope.search).then(function(response){
			
			$scope.count = response.data;
			 
			if($scope.count>$scope.limit){
				$scope.setButton1();					
			}
			
			//console.log($scope.callLogs);
			
			$(".loader").fadeOut("slow");
			
			$scope.fetchListOfCandidatesForInterview(0,10,null,null,$scope.search);
			
		},function(response){
			
			$(".loader").fadeOut("slow");
			
		}); 
	};
	
	$scope.fetchAppliedJobsByUser= function(userId){

		$(".loader").show();

		CallLogService.fetchAppliedJobsByUser(userId).then(function(response){

			$scope.appliedJobs = response.data;

			$('#candidate-info').modal('show');
			
			//console.log($scope.appliedJobs);

			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};
	//$scope.fetchAppliedJobsByUser();
	
	$scope.fetchUserProfile = function(userId){
		$(".loader").show();
		CallLogService.fetchUserProfile(userId).then(function(response){
			$scope.profile = response.data;
			
			$scope.fetchAppliedJobsByUser(userId);
			//console.log($scope.profile);
			//call($stateParams.callId);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};	
	//$scope.fetchUserProfile();
	$scope.menuFlag=1;
	$scope.showFlag = function(id){			  
		  
		 $scope.menuFlag  = id;
		  
		  for (var i=1;i<=5;i++)
			  {
				  if (i==id)
					  document.getElementById("list"+id).setAttribute("class", "active"); 
				  else 
					  document.getElementById("list"+i).setAttribute("class", ""); 
			  }
	  };
	
	$scope.dateformate = function(date){
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        return dateOut;
  };
 
  var channel = pusher.subscribe('my-channel-interview');
  console.log("------------------candidate get data-------------------------------");
	channel.bind('candidate-joined', function(data) {
		 console.log(data);
	//	  window.alert("open!");
		 $scope.$apply(function () {
			 $scope.fetchCallListCount(null,false,false);
			 $('#call_master_tab').click();
	     });
		
	});  
	
	
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
	
	
	$scope.buttondisable = function(path) {	
		if (path == null || path == undefined || path == "") { 
			path={};
		   return true; //disable
		  }
		  else {
			  path={};
		   return false; //enable
		  };
		  
		  
		};
		
		$scope.cleardata=function(){
			
			$("#filepath").val(null);
			$("#filename").val(null);
			$("#mp4file").val(null);
			  				  
		}; 
		
		$scope.fileNameChanged = function(element)
		{
		
			//var index = angular.element(element).scope().$index;
			$scope.input = document.getElementById('mp4file').files;			   
			if($scope.input!=0)
			{		
				var multiplefilename='';
				for(var i=0;i<$scope.input.length;i++){	
					
					
					if($scope.input.length>1){
					 filename=$scope.input[i].name;
					 multiplefilename	+= filename+",";
				}else{
					 filename=$scope.input[i].name;
					 multiplefilename	= filename;
				}
					
					
				}
				$('#filepath').val(multiplefilename);	
			
			}
			
			
		};
		
		$scope.uploadInterviewFile=function(recordinglink)
		{							
			
			$(".loader").show();
			
			var userVideoCallDetails={};
			userVideoCallDetails.id=$scope.userdetails.id;
			userVideoCallDetails.callid=$scope.callidetail;
			userVideoCallDetails.userid=$scope.useriddetail;
			userVideoCallDetails.recording=recordinglink;
			userVideoCallDetails.slotid=$scope.slotiddetail;
			userVideoCallDetails.jobFairId=$scope.jobFairId;
			userVideoCallDetails.eventid=$scope.eventId;
			var data = document.getElementById('mp4file').files;
		//	var data = document.getElementById('userdoc').files;
			
			if((userVideoCallDetails.recording !="" && userVideoCallDetails.recording != undefined) && ( data.length != 0)){
				GlobalModule_notificationService.notification("error","  Please upload only one file type (.mp4, .webm or recording link).");
				$("#file_upload").modal('hide');
				$(".loader").fadeOut("slow");
			}else{
			if(userVideoCallDetails.recording !="" && userVideoCallDetails.recording != undefined ){

				
				
				CallLogService.uploadRecordingUrl(userVideoCallDetails).then(function(response){
					$scope.uploadstatus = response.data;
					console.log($scope.uploadstatus);
					
					if($scope.uploadstatus.indexOf("success")!=-1){
						
						$("#file_upload").modal('hide');
						
						GlobalModule_notificationService.notification("success","Recording link Uploaded Successfully.");
						$state.reload();
						$('.modal-backdrop').hide();								   							         
						$(".loader").fadeOut("slow");
											
						}
					else {
								
						GlobalModule_notificationService.notification("error","Recording link Uploaded failed");
						$("#file_upload").modal('hide');
						
													   							         
						$(".loader").fadeOut("slow");
						
					}
					
					
					$(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");

				});
				
			}else if(data.length != 0){
				
			
			
			var letterNumber = /^[a-zA-Z0-9)\(\_\-" "\.]+$/;	
			
			//var input = document.getElementById('files');
			
			if(data.length == 0)
			{
				
				GlobalModule_notificationService.notification("error","Please browse file.");	       
			       $(".loader").fadeOut("slow");
			       return;
			}
			
			
			/*var allowedExtensions = /(\.mp4)$/i;
			
			if(!allowedExtensions.exec(input.value)){
					////console.log(input.value);
					////console.log(addshipdatafile.filename);
				$(".loader").show();
				GlobalModule_notificationService.notification("error","Please upload excel(.mp4) file only.");
				$("#employeefilepath").val(null);
				$(".loader").fadeOut("slow");			
				return;
			}		
			*/
			else if(data.length!=0)
				{
				  for(var i=0;i<data.length;i++){
					
					//addshipdatafile.userid = $rootScope.userdetails.id;
					  $scope.input = data[i];
					//var file = input.files[0];
					  var file = $scope.input;
					var formData = new FormData();
					formData.append("file",file);
					//formData.append("filename",addshipdatafile.filename);
					formData.append("aid",$rootScope.userdetails.id);	
					formData.append("callId",$scope.callidetail);	
					formData.append("slotid",$scope.slotiddetail);	
					formData.append("userid",$scope.useriddetail);	
					formData.append("jobFairId",$scope.jobFairId);
					formData.append("eventId",$scope.eventId);
				
				
				$.ajax({
						url: 'rest/call/upload/uploaddata',
						type: 'POST',
						data: formData,					
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (response) {
							
							
							$scope.interviewdetails = response;
							////console.log($scope.addshipdatadetails);
							$(".loader").fadeOut("slow");
							if($scope.interviewdetails.indexOf("success")!=-1){
											
								$("#file_upload").modal('hide');
								
								GlobalModule_notificationService.notification("success","File uploaded successfully you can view the file in Career Fair Interview Log.");
								$state.reload();
								$('.modal-backdrop').hide();
																	   							         
								$(".loader").fadeOut("slow");
													
								}
							else {
										
								GlobalModule_notificationService.notification("error","File Uploaded failed");
								$("#file_upload").modal('hide');
								
															   							         
								$(".loader").fadeOut("slow");
								
							}
							
							
							$(".loader").fadeOut("slow");
							//$state.go('restricted.admin.uploadmaster');
						}
					});
				}
				}
				else
				{				
					GlobalModule_notificationService.notification("error","Please Enter valid file");
					$(".loader").fadeOut("slow");
					return;
				}
			}else{
				
				GlobalModule_notificationService.notification("error"," Please browse video file  or recording link.");
				$(".loader").fadeOut("slow");
				return;
			}
		}
			
			
			
		};
		
		
		$scope.fetchInterviewRequestList = function(offset,limit,colName,order,search){
		
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
			
			InterviewRequestService.fetchInterviewRequestList(offset,limit,colName,order,search).then(function(response){
				$scope.requestList=response.data;
				 console.log($scope.requestList);
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		};

		//$scope.fetchInterviewRequestList(0,10,null,null,null);
		
		$scope.fetchInterviewRequestListCount=function(searchterm){
			$scope.screen=3;
			$scope.redirectflag=3
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
			
				
			InterviewRequestService.fetchInterviewRequestListCount($scope.search).then(function(response){				
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton3();					
				}

			},function(response){
				$(".loader").fadeOut("slow");		
			});	
			$scope.fetchInterviewRequestList(0,10,null,null,null);
		};
		if($scope.redirected==3){
			
			
			 $scope.fetchInterviewRequestListCount(null);
				
			    	 
			    	 var tab03=angular.element(document.getElementById('activetab03'));
			    	 tab03.attr("class", "active");	
			    	 
			    	 var tab02=angular.element(document.getElementById('activetab02'));
			    	 tab02.attr("class", "");	
			    	 
			    	 var tab01=angular.element(document.getElementById('activetab01'));		    	 	    	 
			    	 tab01.attr("class", "");	
			    	 
			    	 
			    	$scope.redirectflag=$scope.redirected;
			    	GlobalModule_dataStoreService.storeData('LoginModule','redirectflag',1);
			    	
				  $("#interview_request").modal('show');
				  $('.modal-backdrop').hide();
			      $(".loader").fadeOut("slow");	
		}
	//	$scope.fetchInterviewRequestListCount(null);
		
		
		$scope.previous3 = function() {
			$scope.start =  $scope.start - 5;
			$scope.offset = $scope.start * $scope.limit;
			$scope.setButton3();

		};

		$scope.next3 = function() {
			$scope.start =  $scope.start + 5;
			$scope.offset = $scope.start * $scope.limit;	      
			$scope.setButton3(); 

		};

		$scope.current3 = function(page) {  
			$scope.offset = page * $scope.limit;
			$scope.fetchInterviewRequestList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.answeredCall,$scope.missedCall);
		};


//			--------------------sorting---------------------------------

			$scope.SortingfetchInterviewRequestList = function(colName,searchterm){
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
				$scope.fetchInterviewRequestList(0,10,$scope.colName,$scope.order,$scope.search);	
			
			
			};
			
			$scope.setButton3 = function(){
				$scope.navButtons = [];

				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
				}
			
				$scope.fetchInterviewRequestList(0,10,null,null,$scope.search);
				
				
			};
			
			
			$scope.updateApproveRejectStatus=function(slotid,userid,approvalid,userdetail){ 
				$(".loader").show();
			
			
				InterviewRequestService.updateApproveRejectStatus(slotid,userid,approvalid,$scope.userdetails.id,userdetail).then(function(response){
					  $scope.result=response.data;
				
					  
					  if($scope.result == 1)
					  {
						  GlobalModule_notificationService.notification("success","Candidate Slot Approved Successfully");
						  
							$scope.screen=2;
							  $scope.fetchCountOfCandidatesForInterviewList(null);
							//  $("#interview_request").modal('hide');
						    	 
						    	 var tab03=angular.element(document.getElementById('activetab03'));
						    	 tab03.attr("class", "");	
						    	 
						    	 var tab02=angular.element(document.getElementById('activetab02'));
						    	 tab02.attr("class", "active");	
						    	 
						    	 var tab01=angular.element(document.getElementById('activetab01'));		    	 	    	 
						    	 tab01.attr("class", "");	
						    	 
						    	$scope.redirectflag=2;
						    	
							  $("#answered-calls").modal('show');
							  $('.modal-backdrop').hide();
						      $(".loader").fadeOut("slow");	
						  
					  }
					  else if($scope.result == 2)
					  {
						  GlobalModule_notificationService.notification("error","Candidate slot rejected captured in Activity logs");
						  $scope.fetchInterviewRequestListCount(null);
					  }
				  else
					  {				  	
					      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
					      $(".loader").fadeOut("slow");	
					  }
					
					 
				
						
				},function(response){
					$(".loader").fadeOut("slow");
				}); 
				
			
			}
			
			
			   $scope.openUserDetailPage =function(candidate){
				   $(".loader").show();
				   
				   InterviewRequestService.fetchUserDetails(candidate.id).then(function(response){
						  $scope.userdetails=response.data;
						  console.log($scope.userdetails);
							
						  if($scope.userdetails.userid!=0){
							 	var flag=$scope.enableDisableToDo($scope.userdetails.userid,$scope.userdetails.jobId);

								GlobalModule_dataStoreService.storeData('LoginModule','applicationStatus',$scope.applicationStatus);
								GlobalModule_dataStoreService.storeData('LoginModule','selectedPostion',$scope.selectedPostion);
						    	GlobalModule_dataStoreService.storeData('LoginModule','flag',flag);
								GlobalModule_dataStoreService.storeData('LoginModule','appliedJobs',$scope.userdetails);
								GlobalModule_dataStoreService.storeData('LoginModule','backbutton','interviewerscreen');
								$state.go("restricted.admin.candidatelist");
						  }
						
							
							
					},function(response){
						$(".loader").fadeOut("slow");
					}); 
				   
				  
			    	
			    
				};
				
				
				
				
				
				
				
				 $scope.enableDisableToDo= function(id,jobId){
	 				 
					 if(id!=undefined){
					 
					 $scope.flag=false;
					 for(var i=0;i<$scope.userdetails.length;i++){
						 
					 if($scope.userdetails[i].userid == id && $scope.userdetails[i].status == 'Selected' && $scope.userdetails[i].jobId==jobId)
						 {
						 //$scope.flag=true;   
						 	$scope.applicationStatus=false;
			    			$scope.selectedPostion=$scope.appliedJobs[i].position;
						 	return true;
						 }				 
					 }		
					 }
					 
					 
				 };			
		
});