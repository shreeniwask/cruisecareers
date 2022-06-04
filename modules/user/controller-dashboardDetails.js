'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('dashboardDetails_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','dashboardDetails_Service','GlobalModule_User_activityService', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,dashboardDetails_Service,GlobalModule_User_activityService){
	
	$scope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	
	$scope.typeFlag= GlobalModule_dataStoreService.loadData('LoginModule','typeFlag');
	
	$scope.showFlag= GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		
	$scope.isCurrent = true;
	$scope.isSelf=false;
	$scope.switchAssessment =function(id){
		
		 $(".loader").show();
		
		if(id == 1){
			$scope.isCurrent = true;
			$scope.isSelf=false;
		}
		if(id == 2){
			$scope.isCurrent = false;
			$scope.isSelf=true;
		}		
		$(".loader").fadeOut("slow");
	};
 
	$scope.assessmentList = [{}];
	$scope.fetchAssessmets = function(IsSelf_Assessment){	
		$(".loader").show();
		$scope.cassessFlag=false;
		$scope.sassessFlag=undefined;
		
		$scope.assessFlag=1;
		$scope.isCurrent=true;
		$scope.isSelf=false;
		
		dashboardDetails_Service.fetchAssessmets(IsSelf_Assessment,$scope.userdetails.id).then(function(response){
			$scope.assessmentList = response.data;//assessmentList			 
			
			if($scope.assessmentList != null && $scope.assessmentList.length != 0 )
				$scope.cassessFlag=true;
			
			for(var i=0; i<$scope.assessmentList.length; i++){ 
				$scope.assessmentList[i].IsTodaysDate = $scope.compareDate($scope.assessmentList[i].assessmentDate);				 
			}

			$(".loader").fadeOut("slow");	
			//console.log($scope.assessmentList);
		});			
	};
	//$scope.fetchAssessmets(false);
	
	
	$scope.fetchSelfAssessments = function(typeId){	
		
		$(".loader").show();
		
		$scope.sassessFlag=false;
		$scope.cassessFlag=undefined;
		$scope.assessFlag=2;
		dashboardDetails_Service.fetchSelfAssessments($scope.userdetails.id,$scope.userdetails.roleId,typeId).then(function(response){
			$scope.SelfAssessmentList = response.data;		
			
			if($scope.SelfAssessmentList != null && $scope.SelfAssessmentList.length != 0)
				$scope.sassessFlag=true;
			
			for(var i=0; i<$scope.SelfAssessmentList.length; i++){ 
				$scope.SelfAssessmentList[i].IsTodaysDate = $scope.compareDate($scope.SelfAssessmentList[i].assessmentDate);				 
			} 	
			 
			$(".loader").fadeOut("slow");
		});	
	};
	
	$scope.formatDate = function(date){
        var dateOut = new Date(date);       
        return dateOut;
  };
  
  $scope.compareDate = function (dateOut){	   
	  var today = new Date();
	  var outDate = new Date(dateOut);
	  
	  $scope.isToday = (today.toDateString() == outDate.toDateString());
	  return $scope.isToday;
  };
  
  if( $scope.typeFlag==2)
	  {
	  $scope.showFlag = 2;
	  }
  
  if( $scope.typeFlag==1)
  {
  $scope.showFlag = 1;
  }
  $scope.fetchSurveyQestn=function(surveyObj){
	  $scope.typeFlag=2;
  	$scope.selectedSurvey=surveyObj;
  	GlobalModule_dataStoreService.storeData('LoginModule','selectedSurvey',$scope.selectedSurvey);			
		GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',$scope.typeFlag);	
		GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',false);
		
		$state.go('restricted.testPlayer');						 				    	
  };
  
   	  		  
	$scope.fetchqestn = function(assessmentObj){
	
	$scope.selectedAssessment = assessmentObj; 	
	
		/*GlobalModule_dataStoreService.storeData('LoginModule','SelectedAssessment',$scope.selectedAssessment);
		
		 var url = $state.href('restricted.testPlayer');
		 window.open(url,'_blank');*/
		/*if (navigator.getUserMedia) {
			//errorFlag= false;
			 navigator.getUserMedia (

			    {
			       video: true,
			       audio: false
			    },
			
			    // successCallback
			    function(localMediaStream) {
			    	
			    },
			
			    // errorCallback
			    function(err) {
			    	 errorFlag = true;
			       console.log("The following error occured: " + err);
			       alert("The following error occured: Web-cam not found");
			    }
			 );
			
			} else {
				 errorFlag = true;
				alert("Web-cam not found");
			 console.log("getUserMedia not supported");
			}  */
		//alert("Launch");
		if($scope.errorFlag==true){
			$scope.typeFlag=1;
			$scope.selectedAssessment = assessmentObj; 		
			GlobalModule_dataStoreService.storeData('LoginModule','SelectedAssessment',$scope.selectedAssessment);
			GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',false);
			GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',$scope.typeFlag);	
			
			$state.go('restricted.testPlayer');
			 //window.open(url,'_blank');
		}

		
		//window.top.close();
		
	};
	
	$scope.fetchSurveysList=function(){
		
		$(".loader").show();
		
		$scope.showFlag = 2;
		dashboardDetails_Service.fetchSurveysList($scope.userdetails).then(function(response){
			
			$scope.surveyList = response.data;
			
			//console.log($scope.surveyList);
			
		},function(response){
			  
		});	
		
		$(".loader").fadeOut("slow");
	};
	
	// for emails List

		
	if($scope.showFlag == 1)
	{	
		$(".loader").show();		
		$scope.fetchAssessmets(false);
		document.getElementById('assigned-assessment').setAttribute("class", "active");
		document.getElementById('survey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");
		//document.getElementById('emails').setAttribute("class", "");
	}
	else if($scope.showFlag == 2)
	{
		$(".loader").show();
		
		$scope.fetchSurveysList();		
		document.getElementById('survey').setAttribute("class", "active");
		document.getElementById('assigned-assessment').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");
		//document.getElementById('emails').setAttribute("class", "");
	}
	else if($scope.showFlag == 3)
	{
		$(".loader").show();
		
		//$scope.fetchSurveysList();		
		document.getElementById('survey').setAttribute("class", "");
		document.getElementById('assigned-assessment').setAttribute("class", "");
		
		document.getElementById('documents').setAttribute("class", "");
		//document.getElementById('emails').setAttribute("class", "active");
	}
	else if($scope.showFlag == 4)
	{
		$(".loader").show();
		
		//$scope.fetchSurveysList();		
		document.getElementById('survey').setAttribute("class", "");
		document.getElementById('assigned-assessment').setAttribute("class", "");
		
		document.getElementById('documents').setAttribute("class", "active");
		//document.getElementById('emails').setAttribute("class", "");
	}
	
	
	$scope.errorFlag=false;
	
	 $scope.checkCamera = function(a){
		 $(".loader").show();
		 if(a.questionCount == 0)
		 {
			 GlobalModule_notificationService.notification("error","This assessment don't have questions");
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',false);
		 /*if (navigator.getUserMedia) {
				//errorFlag= false;
			 console.log("getUserMedia supported");
				 navigator.getUserMedia(
	
				    {
				       video: true,
				       audio: false
				    }, success, error );
				 ,function (err) {
				    	return false;
				        next(new Error('user not found'));
				    },function (success){
				    	console.log("getUserMedia supported complete");
				    	return true;
				    }
				
				    // successCallback
				    function success() {
				    	//alert("camera found");
				    	$scope.errorFlag=true;
				    	//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',true);
				    	 console.log("getUserMedia supported complete");
				    	 $scope.fetchqestn(a); 
				    	
				    }
				
				    // errorCallback
				    function error() {
				    	$scope.errorFlag=false;
				    	$(".loader").fadeOut("slow");
				       console.log("The following error occured: ");
				       //GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
				       $('#error-over').modal('show');
				       //alert("The following error occured: Web-cam not found.Please enable your webcam and launch the test again");
				       
				    }
				    $scope.errorFlag=true;
				    console.log("getUserMedia supported complete");
				    $(".loader").fadeOut("slow");
				   // alert("Launch");
				} else {
					$scope.errorFlag=false;
					//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
					alert("Web-cam not found");
				 console.log("getUserMedia not supported");
				
				}*/
		 	
		 navigator.mediaDevices.getUserMedia({
		       video: true,
		       audio: false,
		    }).then(function(stm)  {
		    	
		    	$scope.errorFlag=true;
		    	//localStorage.setItem("CameraStatus", true);
		    	//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',true);
		    	// console.log("getUserMedia supported complete:camera found");
		    	 $scope.fetchqestn(a); 
		    	
			    }).catch(function(error){
			    
			    	//console.log(error);
			    	$(".loader").fadeOut("slow");
			    	$scope.errorFlag=false;
			    	$(".loader").fadeOut("slow");
			       //console.log("The following error occured: ");
			       //localStorage.setItem("CameraStatus", false);
			       //GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
			       alert("The following error occured: Web-cam not found.Please enable your webcam and launch the test again");		 			 
			    });
		 
	
	 };
	 
	 
	 $scope.PreviewDocumentCandidate = function(path){
		 
			if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
			{
			$scope.imageFlag=true;
			if(path.includes(".pdf"))
			{
			$scope.imageFlag=false;
			$scope.pdfFlag=true;
			}else{
			$scope.imageFlag=true;
			$scope.pdfFlag=false;
			}
			if(path.includes("amazonaws"))
			{
			$rootScope.getSignedURL(path).then(function(response){

			$scope.fileurl=response.data;
			$scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
			console.log($scope.pdfDocPath);
			},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
			});
			  }
			}

			 else
			 $scope.imageFlag=false;
			if(!(path.includes(".pdf"))){
			  $scope.pdfFlag=false
			}
			};

	 
	 
	/*
	 * 
	$scope.openLaunchModel = function(){		
		//$('#start-assessment').modal({backdrop: 'static', keyboard: false});			
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
	
	
	$scope.openquestionModel = function(){				
		$scope.currentQuestionNo = 1;				
		$scope.question = $scope.questionList[$scope.currentQuestionNo-1]; 
		$('#start-assessment').modal("hide");
		$('#start-assessment-question').modal({backdrop: 'static', keyboard: false});
	};
 
	
	$scope.currentQuestionFlag=0;
	$scope.LastPageFlag = false;
	$scope.Next = function(ans){
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
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];				
		}; 		 
	}; 
	
	$scope.previous = function(){	 		
		if($scope.currentQuestionNo == 1){				 
			GlobalModule_notificationService.notification("error","Can't go previous");			 
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo-1;		
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
		}
	};
	
 
	$scope.SkipQuestion =[];
	$scope.skip = function(){	 
	 $scope.SkipQuestion.push($scope.currentQuestionNo);	  
		if($scope.currentQuestionNo == $scope.questionList.length){				 
			//hide all stuff only show submit
			$scope.LastPageFlag = true;	
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo+1;		
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
		}		 
	 
	};
	
	$scope.checkSkip=function(number){	 
			 if($scope.SkipQuestion.indexOf(number) !== -1) {
				 return true;
				}else{
					 return false;
				}
	};
	
	  
	
	$scope.reachToquestion=function(number){	 
		$scope.currentQuestionNo = number;		
		$scope.question = $scope.questionList[number-1];	
		$scope.LastPageFlag = false; 		
	};
	
 
	$scope.Submit = function(){
		
		for(var i=0;i<$scope.questionList.length;i++){
	 
			$scope.questionList[i].assessment = $scope.selectedAssessment;
			$scope.questionList[i].createdby = $scope.userdetails.id;	
			$scope.questionList[i].userid = $scope.userdetails.id;
	 
		}
		console.log($scope.questionList);
		 
		 dashboardDetails_Service.saveAssessmentAns($scope.questionList).then(function(response){
			$scope.responseAnsSave = response.data;	 
			
			if($scope.responseAnsSave == "success"){
				GlobalModule_notificationService.notification("success","Assessment has been submited successfully");
				$state.go("restricted.dashboardDetails");
				$('#start-assessment-question').modal("hide");
				$scope.fetchAssessmets(false);
			}else{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error.");
				$state.go("restricted.dashboardDetails");
			}
			
		}); 
		 
	}; 
	  
	    
	    $scope.openSampleQuestion = function(){ 
	    	$scope.currentsampleQuestionNo = 1;				
			$scope.SampleQuestionquestion = $scope.sampleQuestionList[$scope.currentsampleQuestionNo-1]; 
			$('#start-assessment').modal("hide");
			$('#sampleQuestion').modal({backdrop: 'static', keyboard: false});
	    };
	    
	    $scope.fetchSampleQuestion =function(){
	    	dashboardDetails_Service.fetchSampleQuestion().then(function(response){
				$scope.sampleQuestionList = response.data; 
				 
			});	
	    };$scope.fetchSampleQuestion(); 
		
		$scope.SamplequestionNext = function(){		
			if($scope.currentsampleQuestionNo == $scope.sampleQuestionList.length){		
				$('#start-assessment-question').modal("hide");
				GlobalModule_notificationService.notification("success","Assessment question completed");				
				//take back to start modal				
				$('#start-assessment').modal("show");
				$('#sampleQuestion').modal("hide");				
				
			}else{
				$scope.currentsampleQuestionNo = $scope.currentsampleQuestionNo+1;		
				$scope.SampleQuestionquestion = $scope.sampleQuestionList[$scope.currentsampleQuestionNo-1];	
			}				
		};
	    
		$scope.Samplequestionpreviouse = function(){
			if($scope.currentsampleQuestionNo == 1){			 
				GlobalModule_notificationService.notification("error","Can't go previous");	
			}else{
				$scope.currentsampleQuestionNo = $scope.currentsampleQuestionNo-1;		
				$scope.SampleQuestionquestion = $scope.sampleQuestionList[$scope.currentsampleQuestionNo-1];	
			}	
		};
		
		$scope.SamplequestionSkip = function(){		
			if($scope.currentsampleQuestionNo == $scope.sampleQuestionList.length){		
				$('#start-assessment-question').modal("hide");
				GlobalModule_notificationService.notification("success","Assessment question completed");				
				//take back to start modal				
				$('#start-assessment').modal("show");
				$('#sampleQuestion').modal("hide");				
				
			}else{
				$scope.currentsampleQuestionNo = $scope.currentsampleQuestionNo+1;		
				$scope.SampleQuestionquestion = $scope.sampleQuestionList[$scope.currentsampleQuestionNo-1];	
			}				
		};
	 */
	
	 navigator.getUserMedia = ( navigator.getUserMedia ||
             navigator.webkitGetUserMedia ||
             navigator.mozGetUserMedia ||
             navigator.msGetUserMedia);
	 
	
		
		/*function startWebcam() {
		if (navigator.getUserMedia) {
		 navigator.getUserMedia (

		    {
		       video: true,
		       audio: false
		    },
		
		    // successCallback
		    function(localMediaStream) {
		        
		    },
		
		    // errorCallback
		    function(err) {
		       console.log("The following error occured: " + err);
		    }
		 );
		} else {
		 console.log("getUserMedia not supported");
		}  
		}*/
}]);
