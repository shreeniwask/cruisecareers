'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('UserInterviewAssessment_Ctrl',['$scope','$rootScope','$state','$stateParams','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','dashboardDetails_Service', function ($scope,$rootScope,$state,$stateParams,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,dashboardDetails_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.userid = GlobalModule_dataStoreService.loadData('LoginModule','appliedJobs');
	$scope.interviewAssessmentTemplates=GlobalModule_dataStoreService.loadData('LoginModule','interviewAssessTemplates');
	console.log($scope.interviewAssessmentTemplates);
	$scope.temp=GlobalModule_dataStoreService.loadData('LoginModule','SelectedAssessment');
	$scope.checkpreview=GlobalModule_dataStoreService.loadData('LoginModule','checkpreview');
	//$scope.typeFlag = GlobalModule_dataStoreService.loadData('LoginModule','typeFlag');
	
	
				
				
/////------------------fetching question and answer --------------------------//
			
				$scope.questionList =[]; 		  
				$scope.fetchInterviewAssessmentQuestions = function(temp){  		
						$(".loader").show();			 
						//$scope.selectedAssessment.typeId=$scope.typeFlag;
						
						if($scope.checkpreview == "nonpreview"){
							$scope.temp=temp;
						}
						
						
						$scope.temp.userid=$rootScope.userdetails.id;
						console.log("Fetching questions");
						
						dashboardDetails_Service.fetchqestn($scope.temp).then(function(response){
						$scope.questionList = response.data;
						console.log($scope.questionList);
						
						$scope.question = $scope.questionList;	
						
						console.log($scope.question);
						
						 for(var i=0;i<$scope.questionList.length;i++){
							  $scope.questionList[i].count = i+1;
						  }
						 
						 if($scope.checkpreview == "nonpreview"){
								$scope.showSubmitButton='checked';
								}
						
						
					
						$(".loader").fadeOut("slow"); 
					});	
				};
				if($scope.checkpreview == "preview"){
				$scope.fetchInterviewAssessmentQuestions();
				}
				
				
				$scope.OnChangeTemplate = function(temp){
					
					 navigator.mediaDevices.getUserMedia({
					       video: true,
					       audio: false,
					    }).then(function(stm)  {
					    	
					    	$scope.errorFlag=true;
					    	
						    }).catch(function(error){
						    
						    	//console.log(error);
						    	$(".loader").fadeOut("slow");
						    	$scope.errorFlag=false;
						    	$(".loader").fadeOut("slow");
						       
						       alert("The following error occured: Web-cam not found.Please enable your webcam and launch the test again");		 			 
						    });
					
				};
				
//-------audio recording for voice response--------
				
				
				$scope.recordVideo = function(check,index,q){
					
					console.log("start")
					$scope.voiceQuestionIndex=index;
					if(check){
						if($scope.recording=="true"){
							GlobalModule_notificationService.notification("error","Complete the previous recording");
						}else{
						$('#play_button_'+q.id).attr('disabled','disabled');
						$('#stop_button_'+q.id).removeAttr('disabled');
						
						requestAideo(q);
						}
						//startRecording();
					}else{
						$('#stop_button_'+q.id).attr('disabled','disabled');
						$('#play_button_'+q.id).removeAttr('disabled');
						stopRecording(q);
					}
				};	
				
				
				
				
				
				$scope.recordAudio = function(check,index,q){
					
					
					
					console.log("start")
					$scope.voiceQuestionIndex=index;
					if(check){
						if($scope.recording=="true"){
							GlobalModule_notificationService.notification("error","Complete the previous recording");
						}else{
						$('#button_play_'+q.id).attr('disabled','disabled');
						$('#button_stop_'+q.id).removeAttr('disabled');
						 
						requestAideo(q);
						}
						//startRecording();
					}else{
						$('#button_stop_'+q.id).attr('disabled','disabled');
						$('#button_play_'+q.id).removeAttr('disabled');
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
					
					$scope.audioValue="true";
					$scope.recording="true";
				  navigator.mediaDevices.getUserMedia({
				     
				      audio: true
				    }).then(function(stm)  {
				      stream = stm;
				      recorder = new MediaRecorder(stream);
					  recorder.start();
				   
				    });
				}else if(q.isvideoEnabled){
					 $scope.videoValue="true";
					$scope.recording="true";
					$scope.audioRecorded=true;
					var constraints = {
						    audio: true,

						    video: true
					};
					
					 navigator.mediaDevices.getUserMedia(constraints).then(function(stm)  {
					   
                          stream = stm;
                          var videoResponse= document.getElementById('video-respnce'+$scope.voiceQuestionIndex);
                        
						  videoResponse.srcObject  = stream;
						  videoResponse.muted = true;
					      recorder = new MediaRecorder(stream);
					
					      recorder.ondataavailable = handleDataAvailable;
						  recorder.start();	  
					    });
				}
				}
				
				
				
				$scope.audioRecorded=false;
				function stopRecording(q) {
					 if(q.isVoiceEnabled){
						
						 $scope.audioValue="true";
						
					 }else{
						 $scope.videoValue="true";
						
					 }
					
					
					$scope.audioRecorded=true;
				  recorder.ondataavailable = function(e) {
					  $scope.audioRecorded=true;
					  if(q.isVoiceEnabled){
						  $scope.recording="false";
				    var audioName = ['audio_', (new Date() + '').slice(4, 28), '.ogg'].join('');
				  
				    
				   var audioVoice= document.getElementById('voice-respnce'+$scope.voiceQuestionIndex);
				  
				    audioVoice.src  = e.data;
				  
				    $scope.uploadaudio(e.data,audioName);
					  }
					  else if(q.isvideoEnabled){
						  $scope.recording="false";
						  handleDataAvailable(e);
						  var eventdata = new Blob(recordedBlobs, {type: 'video/webm'});
						  var videoName = ['video_', (new Date() + '').slice(4, 28), '.webm'].join('');
						
						  
						 //   var videoResponse= document.getElementById('video-respnce'+$scope.voiceQuestionIndex);         
						//	   videoResponse.src  = e.data;
						  
						  
						    $scope.uploadaudio(eventdata,videoName);
						    
						    
					
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
								//$scope.questionList.audioAns=$scope.fetchfiledata;
								//console.log($scope.fetchfiledata);
							    $scope.question.audioAns= $scope.generatedSignUrl($scope.fetchfiledata);
							}
						});
									
						$(".loader").fadeOut("slow");
				};
				
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
				  	
				  	if($scope.sliderValue != 0)
				  	{
				  		$scope.AnsSelectedFlag = true;
				  		$scope.question.selectedAns=$scope.sliderValue;
				  	}
				  	else
				  		$scope.AnsSelectedFlag = false;		
				  	
				  
			};	
				
				
	//////-------------------------------saving answer----------------------------------------///////			
				
		
			function stopWebcam() {
				$scope.webcamStream.getVideoTracks()[0].stop();
			}
			 
				$scope.saveInterviewAssessmentAns = function(){
					 
					  $(".loader").show();
					
						if($scope.checkpreview == "preview"){
							window.top.close();
							$state.go("restricted.admin.interviewassessmentmaster");
						}
						
						
						
						for(var i=0;i<$scope.questionList.length;i++){
				
							$scope.questionList[i].assessment = $scope.temp;
							$scope.questionList[i].createdby = $rootScope.userdetails.id;	
							$scope.questionList[i].userid =  $scope.userid;
						
							if($scope.questionList[i].audioAns == undefined)
								{
								$scope.questionList[i].audioAns="";
								}
					 
						}
						$scope.questionList[0].assessment.interviewassessmentid =$rootScope.userdetails.id;
					//	$scope.questionList[0].assessment.createdDate = document.getElementById('date-time1').value;
						$scope.questionList[0].assessment.catId=3;
						$scope.questionList[0].imageFiles=$scope.imageFiles;
						 console.log($scope.questionList);		
						$scope.questionList[0].assessment.typeId=1;
		
					 
					 dashboardDetails_Service.saveAssessmentAns($scope.questionList).then(function(response){
						$scope.responseAnsSave = response.data;
						
							
						if($scope.responseAnsSave == "success"){
						
								GlobalModule_notificationService.notification("success","Interview Assessment has been submitted successfully");
								//stopWebcam();
								 // $state.reload();
								window.top.close();
								$state.go("restricted.admin.appliedjobs");
						}else{
							GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error.");
						 
							//$state.go("user_Interview_Assessment");				 
						}
						$(".loader").fadeOut("slow");	
					}); 
						
				}; 
					
				$scope.cnacelInterviewAssessmentAns = function(){
					window.top.close();
					$state.go("restricted.admin.appliedjobs");
					 
				};
				
				$scope.onloadDateTime=function(){
					$('#date-time').datetimepicker({
						  minDate: new Date(),
						  format: 'DD-MM-YYYY',
						  });
					};
			
								  
				
					
			
					 $scope.selection = [];
					 $scope.question=[]
					 
					   $scope.myFunc = function myFunc(a) {
						   $scope.currentQuestionNo=a;
					    var index = $scope.selection.indexOf(a);
					    if (index > -1) {
					    $scope.selection.splice(index,1);
					   // $scope.question = $scope.questionList[$scope.currentQuestionNo-1];
					}else{
					//	$scope.currentQuestionNo = $scope.currentQuestionNo+1;
							
						$scope.selection.push(a);   
					}
					     
					   
					    
					   };
					   
					   
	
			
}]);

