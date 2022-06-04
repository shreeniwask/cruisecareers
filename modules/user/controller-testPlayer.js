'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('testPlayer_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','dashboardDetails_Service','GlobalModule_User_activityService', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,dashboardDetails_Service,GlobalModule_User_activityService){
	
	$(".loader").show();
	
	$scope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
	
	$scope.typeFlag = GlobalModule_dataStoreService.loadData('LoginModule','typeFlag');
	
	if($scope.typeFlag == 1){
		
		$scope.selectedAssessment = GlobalModule_dataStoreService.loadData('LoginModule','SelectedAssessment');	

	}else{
		
		$scope.selectedAssessment = GlobalModule_dataStoreService.loadData('LoginModule','selectedSurvey');

	}
  
	//console.log($scope.selectedAssessment);
	
	
	
	
	//$scope.cameraStatus=GlobalModule_dataStoreService.loadData('LoginModule','CameraStatus');
	//$scope.cameraStatus=localStorage.getItem('CameraStatus');
	//console.log('$scope.cameraStatus' + $scope.cameraStatus);
	//console.log('$scope.cameraStatus' + $scope.cameraStatus);
	
	//alert($scope.typeFlag);
	
  $scope.questionList =[]; 		  
	$scope.fetchqestn = function(){  		
			$(".loader").show();			 
			$scope.selectedAssessment.typeId=$scope.typeFlag;
			$scope.selectedAssessment.userid=$scope.userdetails.id;
			dashboardDetails_Service.fetchqestn($scope.selectedAssessment).then(function(response){
			$scope.questionList = response.data;
			//console.log($scope.questionList);
			if($scope.typeFlag == 1)
			{
				$scope.startTimer($scope.selectedAssessment.assessmentTime);
			}			
			$scope.currentQuestionNo = 1;				
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
			//console.log($scope.questionList );
			$(".loader").fadeOut("slow"); 
		});	
	};
	
	$scope.fetchSurveyQue=function(){		
		$(".loader").show();		
		dashboardDetails_Service.fetchSurveyQue($scope.selectedAssessment).then(function(response){
		
		$scope.questionList = response.data;
		
		//console.log($scope.questionList);
		
		$scope.currentQuestionNo = 1;				
		$scope.question = $scope.questionList[$scope.currentQuestionNo-1];
		//console.log($scope.question);
	},function(response){
		  
	});	
	
	$(".loader").fadeOut("slow");
};
		
		
	$(document).ready(function(){
		$('#start-assessment-question').on('hidden.bs.modal', function () {
			if($scope.question.questionMediaType==2){
			 var audio = document.getElementById("audioMedia");
			 audio.load();
			 }
			else if($scope.question.questionMediaType==3){
			    var video = document.getElementById("mediaVideo");
			    video.load();
			}
			    $scope.MediaLink="";			    
	    });
		});
	
	 	 
	
	$scope.currentQuestionFlag=0;
	$scope.LastPageFlag = false;
	$scope.Next = function(ans){ 
		
		$(".loader").show();
		
			
		$scope.reachToFirstFLag = false;
		
	 	 var index = $scope.SkipQuestion.indexOf($scope.currentQuestionNo);
	 	 if(index > -1){
	 		$scope.SkipQuestion.splice(index, 1);   
	 	 } 		
		if($scope.currentQuestionNo+1 > $scope.currentQuestionFlag){
			$scope.currentQuestionFlag = $scope.currentQuestionNo;
		}	 
		if($scope.currentQuestionNo == $scope.questionList.length){				 
			//hide all stuff only show submit
			$scope.LastPageFlag = true;
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo+1;		
			//console.log($scope.questionList);
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];		
			$scope.audioRecorded=false;
			if($scope.question.audioAns == "" || $scope.question.audioAns == undefined){
				
				$scope.audioRecorded=false;
			}else{
				$scope.question.audioAns= $scope.generatedSignUrl($scope.question.audioAns);
				$scope.audioRecorded=true;
			}
			
			if($scope.question.questionType == 1){
				if($scope.question.shortAns != ""){
					$scope.AnsSelectedFlag = true;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
			
			
		}; 		 
		
		if($scope.question.audioAns == "" || $scope.question.audioAns == undefined){
			$scope.audioRecorded=false;
			$scope.AnsSelectedFlag = false;			
		}else{
			$scope.audioRecorded=true;
			$scope.AnsSelectedFlag = true;
		}
		
		
		if($scope.question.questionType == 2 || $scope.question.questionType == 3){
			for(var i=0;i<$scope.question.ans.length;i++){
				if($scope.question.ans[i].isCorrect == true){
					$scope.AnsSelectedFlag = true;
					break;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
		}
		
			if($scope.question.questionType == 4)
			{				
					if($scope.question.selectedAns != '')
					{
						$scope.AnsSelectedFlag = true;
						
						$('#set-range').val($scope.question.selectedAns);
						$('#set-slider-value').val($scope.question.selectedAns);
					}
				else
				{
					 
					$('#set-range').val(0);
					$('#set-slider-value').val(0);
					$scope.AnsSelectedFlag = false;
				}
			}
				
		
		$(".loader").fadeOut("slow");
	}; 
	
	$scope.sliderFlag=false;
	$scope.reachToFirstFLag = true;	
	$scope.previous = function(){	 		
		if($scope.currentQuestionNo == 1){				 
			$scope.reachToFirstFLag = true;		 
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo-1;		
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
			$scope.reachToFirstFLag = false;
			
		}		
		if($scope.currentQuestionNo == 1)
		{
			$scope.reachToFirstFLag = true;	
		}
		$scope.audioRecorded=false;
		
		if($scope.question.audioAns == "" || $scope.question.audioAns == undefined){
			
			$scope.audioRecorded=false;
			$scope.AnsSelectedFlag = false;
			if($scope.question.questionType == 1){
				if($scope.question.shortAns != ""){
					$scope.AnsSelectedFlag = true;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
		}
		else{
			
			$scope.AnsSelectedFlag = true;
			$scope.audioRecorded=true;
			$scope.question.audioAns= $scope.generatedSignUrl($scope.question.audioAns);
			//console.log($scope.AnsSelectedFlag);
		}
		
		if($scope.question.questionType == 2 || $scope.question.questionType == 3){
			for(var i=0;i<$scope.question.ans.length;i++){
				if($scope.question.ans[i].isCorrect == true){
					$scope.AnsSelectedFlag = true;
					break;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
		}
		
		if($scope.question.questionType == 4)
		{
				if($scope.question.selectedAns != '')
				{
					$scope.AnsSelectedFlag = true;
					$scope.sliderValue=$scope.question.selectedAns;
				$('#set-range').val($scope.question.selectedAns);
				$('#set-slider-value').val($scope.question.selectedAns);
			
				}
			else
			{
				 
				$('#set-range').val(0);
				$('#set-slider-value').val(0);
				$scope.AnsSelectedFlag = false;
			}
		}
	 
	};
	$scope.audioRecorded=false;
 
	$scope.SkipQuestion =[];
	$scope.skip = function(){
		
		$scope.reachToFirstFLag = false;
	 $scope.SkipQuestion.push($scope.currentQuestionNo);	  
		if($scope.currentQuestionNo == $scope.questionList.length){				 
			//hide all stuff only show submit
			$scope.LastPageFlag = true;	
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo+1;		
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
			$scope.audioRecorded=false;
			if($scope.question.audioAns == "" || $scope.question.audioAns == undefined){
				$scope.audioRecorded = false;
				$scope.AnsSelectedFlag = false;
			}else{
				$scope.audioRecorded=true;
				$scope.AnsSelectedFlag = true;
				$scope.question.audioAns= $scope.generatedSignUrl($scope.question.audioAns);
			}
		}
		if($scope.question.questionType == 4)
		{			
				if($scope.question.selectedAns != '')
				{
					$scope.AnsSelectedFlag = true;
					$scope.sliderValue=$scope.question.selectedAns;
					$('#set-range').val($scope.question.selectedAns);
					$('#set-slider-value').val($scope.question.selectedAns);
					return;
				}
				else
				{				 
					$('#set-range').val(0);
					$('#set-slider-value').val(0);
					$scope.AnsSelectedFlag = false;
					return;
				}
		}
		$scope.AnsSelectedFlag = false;		
	};
	
	$scope.checkSkip=function(number){	 
			 if($scope.SkipQuestion.indexOf(number) !== -1) {
				 return true;
				}else{
					 return false;
				}
	};
	
	  
	
	$scope.reachToquestion=function(number){	 
		//alert(number);
		$scope.currentQuestionNo = number;		
		$scope.question = $scope.questionList[number-1];
		$scope.audioRecorded=false;
		if($scope.question.audioAns != "" || $scope.question.audioAns != undefined){
			$scope.audioRecorded=true;
			$scope.AnsSelectedFlag = true;
			if($scope.question.audioAns != undefined){
			$scope.question.audioAns= $scope.generatedSignUrl($scope.question.audioAns);
		}
		}
		else{
			$scope.AnsSelectedFlag = false;
			if($scope.question.questionType == 1){
				if($scope.question.shortAns != ""){
					$scope.AnsSelectedFlag = true;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
			
		}
		$scope.LastPageFlag = false; 			
		
		if(number == 1){
			$scope.reachToFirstFLag = true;
		}else{
			$scope.reachToFirstFLag = false;
		}
		
		
		if($scope.question.questionType == 2 || $scope.question.questionType == 3){
			for(var i=0;i<$scope.question.ans.length;i++){
				if($scope.question.ans[i].isCorrect == true){
					$scope.AnsSelectedFlag = true;
					break;
				}else{
					$scope.AnsSelectedFlag = false;
				}
			}
		}
		
		if($scope.question.questionType == 4)
		{
			$('#set-range').val($scope.questionList[number-1].selectedAns);
			$('.range-slider__value').val($scope.questionList[number-1].selectedAns);
			
			if($scope.question.selectedAns != '')
			{
				$scope.sliderFlag=true;
				$scope.AnsSelectedFlag = true;
			}
			else
			{
				$scope.AnsSelectedFlag = false;
			}
		}
			
		
	};
	
	$scope.SubmitSample = function(){				 
	$state.reload();
	};
 var endtest=0;
	$scope.Submit = function(){
		endtest=1;

		$scope.SubmitFlag = GlobalModule_dataStoreService.loadData('LoginModule','IscomingFromAssMaster');	
		if($scope.SubmitFlag ==true){
			//close tab
			window.top.close();
		}else{	
			$scope.selectedAssessment.roleId=$scope.userdetails.roleId;

			for(var i=0;i<$scope.questionList.length;i++){
				
				$scope.selectedAssessment.roleId=$scope.userdetails.roleId;
				$scope.questionList[i].assessment = $scope.selectedAssessment;
				$scope.questionList[i].createdby = $scope.userdetails.id;	
				$scope.questionList[i].userid = $scope.userdetails.id;
				if($scope.questionList[i].audioAns == undefined)
					{
					$scope.questionList[i].audioAns="";
					}
		 
			}
			$scope.questionList[0].imageFiles=$scope.imageFiles;
			 //console.log($scope.questionList);		
			
		 $scope.questionList[0].assessment.typeId=$scope.typeFlag;
		 
		 dashboardDetails_Service.saveAssessmentAns($scope.questionList).then(function(response){
			$scope.responseAnsSave = response.data;
			
			if($scope.selectedAssessment.roleId==3)
			{
			$state.go("restricted.eprofile");
			}
			else
				{
				$state.go("restricted.dashboardDetails");
				}
				
			if($scope.responseAnsSave == "success"){
				
				if($scope.typeFlag == 1)
				{
					GlobalModule_notificationService.notification("success","Assessment has been submitted successfully");
					stopWebcam();
					window.top.close();
				}
				else if($scope.typeFlag == 2)
				{
					GlobalModule_notificationService.notification("success","Survey has been submitted successfully");						 					
				}
				
				if($scope.userdetails.roleId == 2)
				{
					$state.go("restricted.dashboardDetails");
				}
				else if($scope.userdetails.roleId == 3)
				{
					$state.go("restricted.eprofile");
				}				
				
			}else{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error.");
			 
				$state.go("restricted.dashboardDetails");				 
			}
		}); 
		}
	}; 
	  
		$scope.sampleQuestionFlag = false;
	    $scope.openSampleQuestion = function(){ 	    	
	    	$scope.sampleQuestionFlag = true;
	    	 $scope.currentQuestionNo = 1;				
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1]; 
			/*$('#start-assessment').modal("hide");
			$('#sampleQuestion').modal({backdrop: 'static', keyboard: false});*/
	    };
	    
	    $scope.StartquestionFlag = false;
	    $scope.openquestionModel = function(){	
	    	
	    	$scope.StartquestionFlag = true;
	    	
	    	if($scope.typeFlag == 1)
	    	{
	    		startWebcam();
	    	}
	    	
		/*	$scope.currentQuestionNo = 1;				
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1]; */
			/*$('#start-assessment').modal("hide");
			$('#start-assessment-question').modal({backdrop: 'static', keyboard: false});*/
/*			$scope.startTimer($scope.selectedAssessment.assessmentTime);
 * 
*/		};
	    
	    
	    $scope.questionList =[];//questionList
	    $scope.fetchSampleQuestion =function(){
	    	  $(".loader").show();
	    	dashboardDetails_Service.fetchSampleQuestion().then(function(response){
	    		$scope.questionList = response.data; 
	    		 $scope.questionList[0].imageFiles=[];
	    		$scope.currentQuestionNo = 1;				
				$scope.question = $scope.questionList[$scope.currentQuestionNo-1];
				  $(".loader").fadeOut("slow");	  
				 
			});	
	    };
	    
	    $scope.AnsSelectedFlag = false;
	    $scope.checkvalueSelected=function(Ans){
	    	if(Ans != "" || Ans==true){
	    		$scope.AnsSelectedFlag = true;
	    	}else{
	    		$scope.AnsSelectedFlag = false;
	    	}
	    	  
	    };
	    
	    $scope.StartFlag = false;
	    $scope.StartTest = function(checked){	    	 
	    	if(checked == true){
	    		$scope.StartFlag = true;
	    	}else{
	    		$scope.StartFlag = false;
	    	}
	    };
	    
		$scope.startTimer = function (time){
			var duration=time;
			var today = new Date();
		
			var d2 = new Date (today);

			d2.setMinutes ( today.getMinutes() + duration );

			
			var countDowntime = new Date(d2).getTime();


			// Update the count down every 1 second
			var x = setInterval(function() {

			    // Get todays date and time
			    var now = new Date().getTime();
			    
			    // Find the distance between now an the count down date
			    var distance = countDowntime - now;
			    
			    // Time calculations for days, hours, minutes and seconds
			    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			    
			    $scope.hours=hours;
			    $scope.minutes=minutes;
			    $scope.seconds=seconds;
			   
			    if(hours<10){
			    	document.getElementById("hour").innerHTML = "0"+hours;
			    }else{
			    document.getElementById("hour").innerHTML = hours;
			    }
			    if(minutes<10){
			    	document.getElementById("minutes").innerHTML = "0"+minutes;
			    }else{
			    document.getElementById("minutes").innerHTML = minutes;
			    }
			    if(seconds<10){
			    	document.getElementById("seconds").innerHTML = "0"+seconds;
			    }else{
			    document.getElementById("seconds").innerHTML = seconds;
			    }
			    if(minutes==time-1 && seconds==58)
			    	{
			    	snapshot();
			    	}
			    if((minutes%3==0 || minutes==Math.floor(Math.random()*100)) && (seconds%28==0 || seconds==Math.floor(Math.random()*100)))      //Math.floor(Math.random()*100))
			    	{
			    	
			    	snapshot();
			    	}
			   /* if(seconds%3==0){
			    	snapshot();
			    }*/
			    // If the count down is over, write some text 
			    if (distance < 0 || endtest==1) {
			        clearInterval(x);
			   
				    document.getElementById("hour").innerHTML = "00";
				    document.getElementById("minutes").innerHTML = "00";
				    document.getElementById("seconds").innerHTML = "00";
			       // document.getElementById("demo").innerHTML = "EXPIRED";
				    if(endtest!=1){
			        $scope.sessionOverSubmit();
			        $('#session-over').modal({
					    backdrop: 'static',
					    keyboard: false
					});
			        $('#session-over').modal('show');
			       
				    }
				 
			        
			    }
			}, 1000);
		};
		
		$scope.sessionOverSubmit = function(){
			
			for(var i=0;i<$scope.questionList.length;i++){
		 
				$scope.questionList[i].assessment = $scope.selectedAssessment;
				$scope.questionList[i].createdby = $scope.userdetails.id;	
				$scope.questionList[i].userid = $scope.userdetails.id;
				if($scope.questionList[i].audioAns == undefined)
				{
				$scope.questionList[i].audioAns="";
				}
		 
			}
			$scope.questionList[0].imageFiles=$scope.imageFiles;
			//console.log($scope.questionList);
			 
			 dashboardDetails_Service.saveAssessmentAns($scope.questionList).then(function(response){
				$scope.responseAnsSave = response.data;	 
				stopWebcam();
				
			}); 
			 
		};
		
		
		$scope.sessionEnded = function(){
			
				GlobalModule_notificationService.notification("success","Assessment has been submited successfully");
				/*$state.go("restricted.dashboardDetails");*/
				 /*$('#session-over').modal("hide");*/
				$('#session-over').hide();				 
				$('.modal-backdrop').hide();
				$state.go("restricted.dashboardDetails");
				
				$scope.fetchAssessmets(false);
			
		};
		
		/*----- video recording and clicking pictures--- */
		$scope.webcamStream;
		  /* navigator.mediaDevices.getUserMedia = ( navigator.getUserMedia ||
                   navigator.mediaDevices.webkitGetUserMedia ||
                   navigator.mediaDevices.mozGetUserMedia ||
                   navigator.mediaDevices.msGetUserMedia);*/

				var video;
				//$scope.webcamStream;
				var recorder,stream;
				function startWebcam() {
				/*if (navigator.mediaDevices.getUserMedia) {
				 navigator.mediaDevices.getUserMedia (
				
				    // constraints
				    {
				       video: true,
				       audio: false
				    },
				
				    // successCallback
				    function(localMediaStream) {
				        video = document.querySelector('video');
				       video.src = window.URL.createObjectURL(localMediaStream);
				       $scope.webcamStream = localMediaStream;
				    },
				
				    // errorCallback
				    function(err) {
				       console.log("The following error occured: " + err);
				    }
				    
				 );
				// startRecording();
				} else {
				 console.log("getUserMedia not supported");
				}*/ 
					
					navigator.mediaDevices.getUserMedia({
					       video: true,
					       audio: false,
					    }).then(function(stm)  {	
					    	
					    	 video = document.querySelector('video');
						       //video.src = window.URL.createObjectURL(stm);
						       video.srcObject=stm;	
						       $scope.webcamStream = stm;
					    	 
					    	
						    }),function(error){
						    
						    	console.log(error);
				    };
					
				}
				/*
				function startRecording() {
					
					
				  recorder = new MediaRecorder(stream, {
				    mimeType: 'video/webm'
				  });
				  recorder.start();
				}


				function stopRecording() {
					 var videoName = ['assessment_video_', (new Date() + '').slice(4, 28), '.webm'].join('');
				  recorder.ondataavailable = function(e) {
				    
				  //  $scope.uploadvideo(e.data,videoName);
				  };
				  recorder.stop();
				 
				}*/
				$scope.imageFiles=[];
				$scope.uploadimages = function(data,Name)
				{
					
						var formData = new FormData();
						formData.append("file",data);
						formData.append("file-name",Name);
						formData.append("file-type",'Images');
						formData.append("user_id",$scope.userdetails.id);
						//formData.append("questionId",questionId);
						
										
						
						$.ajax({
								url: 'rest/assessmentengine/uploadFile',
								type: 'POST',
								data: formData,
								
								async: true,
								cache: false,
								contentType: false,
								processData: false,
								success: function (response) {
									$scope.fetchfiledata =JSON.parse(response);
									$scope.imageFiles.push({name:$scope.fetchfiledata});
									//$scope.questionList[0].imageFiles.push({name:$scope.fetchfiledata});
									//console.log($scope.imageFiles);
									
								}
							});
									
						
				};
				
				function stopWebcam() {
					$scope.webcamStream.getVideoTracks()[0].stop();
				}
/*--------------------- TAKE A SNAPSHOT CODE---------------------
*/				var canvas, ctx;
				
				
				
				canvas = document.getElementById("myCanvas");
				ctx = canvas.getContext('2d');
				

				function snapshot() {
				ctx.drawImage(video, 0,0, canvas.width, canvas.height);
				//var dataURL = canvas.toDataURL();
				var dataURL = canvas.toDataURL('image/jpg', 0.5);
				var blob = dataURItoBlob(dataURL);
				 var imageName = ['img_', (new Date() + '').slice(4, 28), '.jpg'].join('');
				//console.log(dataURL);
				$scope.uploadimages(blob,imageName);
				//document.getElementById('covanceImg').src = dataURL;
				}
				
				function dataURItoBlob(dataURI) {
				    // convert base64/URLEncoded data component to raw binary data held in a string
				    var byteString;
				    if (dataURI.split(',')[0].indexOf('base64') >= 0)
				        byteString = atob(dataURI.split(',')[1]);
				    else
				        byteString = unescape(dataURI.split(',')[1]);

				    // separate out the mime component
				    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

				    // write the bytes of the string to a typed array
				    var ia = new Uint8Array(byteString.length);
				    for (var i = 0; i < byteString.length; i++) {
				        ia[i] = byteString.charCodeAt(i);
				    }

				    return new Blob([ia], {type:mimeString});
				}
				
				
				//-------audio recording for voice response--------
				
				$scope.recordAudio = function(check,index,q){
					//alert(index);
					$scope.voiceQuestionIndex=index;
					if(check){
						$('#button_play').attr('disabled','disabled');
						$('#button_stop').removeAttr('disabled');
						 
						requestAideo(q);
						//startRecording();
					}else{
						$('#button_stop').attr('disabled','disabled');
						$('#button_play').removeAttr('disabled');
						stopRecording(q);
					}
				};

				var stream, recorder,recordedBlobs;
				
				function handleDataAvailable(event) {
					  console.log('handleDataAvailable', event);
				
						
					  if (event.data && event.data.size > 0) {
					    recordedBlobs.push(event.data);
					  }
					}
				
				function requestAideo(q) {
					recordedBlobs=[];			
				if(q.isVoiceEnabled){
				  navigator.mediaDevices.getUserMedia({
				     
				      audio: true
				    }).then(function(stm)  {
				      stream = stm;
				      recorder = new MediaRecorder(stream);
					  recorder.start();
				     // audioVoice.src = URL.createObjectURL(stream);
				    });
				}else if(q.isvideoEnabled){
					$scope.audioRecorded=true;
					var constraints = {
						    audio: true,

						    video: true
					};
					
					 navigator.mediaDevices.getUserMedia(constraints).then(function(stm)  {
					    	/* var options = {
					    			 audioBitsPerSecond: 128000,
					    		        videoBitsPerSecond: 2500000,
	                        	        mimeType: 'video/webm'
	                        	      }*/
                          stream = stm;
                          var videoResponse= document.getElementById('video-respnce'+$scope.voiceQuestionIndex);
						  videoResponse.srcObject  = stream;
						  videoResponse.muted = true;
					      recorder = new MediaRecorder(stream);
					     // recorder.mimeType;
					      recorder.ondataavailable = handleDataAvailable;
						  recorder.start();	  
					    });
				}
				}
				
				/*function startRecording() {
					requestAideo();
				  recorder = new MediaRecorder(stream);
				  recorder.start();
				  
				}*/

				$scope.audioRecorded=false;
				function stopRecording(q) {
					$scope.audioRecorded=true;
				  recorder.ondataavailable = function(e) {
					  $scope.audioRecorded=true;
					  if(q.isVoiceEnabled){
				    var audioName = ['audio_', (new Date() + '').slice(4, 28), '.ogg'].join('');
				  //  console.log($scope.voiceQuestionIndex);
				    
				    var audioVoice= document.getElementById('voice-respnce'+$scope.voiceQuestionIndex);
				    audioVoice.src  = e.data;
				  
				    $scope.uploadaudio(e.data,audioName);
					  }
					  else if(q.isvideoEnabled){
						 
						  handleDataAvailable(e);
						  var eventdata = new Blob(recordedBlobs, {type: 'video/webm'});
						  var videoName = ['video_', (new Date() + '').slice(4, 28), '.webm'].join('');
						//  var videoResponse= document.getElementById('video-respnce'+$scope.voiceQuestionIndex);
						//    videoResponse.src  = e.data;
						    $scope.uploadaudio(eventdata,videoName);
						    
						    
						    
						    /* ul.style.display = 'block';
						    var a = document.createElement('a'),
						      li = document.createElement('li');
						    var input = document.getElementById('imgInp');*/
						    
						    //console.log($scope.voiceQuestionIndex);
						  //a.href = URL.createObjectURL(e.data);
						   
						    //audioVoice.src  = e.data;
						    //$scope.uploadaudio(e.data,videoName);
						   
					  }
				  };
				  
				  recorder.stop();
				 
				}
				
				

				$scope.uploadaudio = function(data,Name)
				{
					
					var formData = new FormData();
					formData.append("file",data);
					formData.append("file-name",Name);
					formData.append("file-type",'Audio');
					formData.append("user_id",$scope.userdetails.id);
					
					$.ajax({
							url: 'rest/assessmentengine/uploadFile',
							type: 'POST',
							data: formData,
							
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (response) {
								$scope.fetchfiledata =JSON.parse(response);
								$scope.questionList[$scope.voiceQuestionIndex].audioAns=$scope.fetchfiledata;
								//console.log($scope.fetchfiledata);
							    $scope.question.audioAns= $scope.generatedSignUrl($scope.fetchfiledata);
							}
						});
									
						$(".loader").fadeOut("slow");
				};
					
				//--------------------------
				
				 $scope.generatedSignUrl = function(path){
					   
						if(path.includes("amazonaws"))
					   {
						$rootScope.getSignedURL(path).then(function(response){
							path=response.data;
						},function(response){
							GlobalModule_dataStoreService.errorResponseHandler(response);
						});
					   }
						return path;
					};
					
					
					$scope.rangeSlider=function(nm)
					{						
						var slider = $(".range-slider"),
					      range = $(".range-slider__range"),
					      value = $(".range-slider__value");
					    
					  	slider.each(function(){
					  		
						  value.each(function(){
						  var value = $(this).prev().attr("value");
						  var val1= $('#set-slider-value').html();
						  /* console.log(val1); */
						  $(this).html(val1);
						  value=val1;
						 });
	
					    range.on("input", function(){
					    	
					      $(this).next(value).html(this.value);
					      	
					    });
					  });
					  	
					  	$scope.sliderValue=$scope.question.selectedAns; 
					  	//document.getElementById("set-range").value;
					  	if($scope.sliderValue != 0)
					  	{
					  		$scope.AnsSelectedFlag = true;
					  		$scope.question.selectedAns=$scope.sliderValue;
					  	}
					  	else
					  		$scope.AnsSelectedFlag = false;		
					  	
					  	//console.log($scope.question);
				};	
					
					$(".loader").fadeOut("slow");
					
}]);
