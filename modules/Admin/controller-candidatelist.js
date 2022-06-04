'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CandidateDetail_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Customer_Service','assessEngine_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Customer_Service,assessEngine_Service,Master_Service){

	
	$rootScope.j = GlobalModule_dataStoreService.loadData('LoginModule','appliedJobs');
	console.log($rootScope.j);
 	$scope.applicationStatus=GlobalModule_dataStoreService.loadData('LoginModule','applicationStatus');
	$scope.selectedPostion=GlobalModule_dataStoreService.loadData('LoginModule','selectedPostion');
	$scope.flag=GlobalModule_dataStoreService.loadData('LoginModule','flag');
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.backbutton = GlobalModule_dataStoreService.loadData('LoginModule','backbutton');
	$scope.slots={};
	$scope.slot={};
	$scope.Slotid=0;
	$scope.removeusersBySlotId={};
	$scope.senderId=$rootScope.userdetails.id;
	$scope.selectedEvent;
	$scope.showmessge="";	  
	$scope.showflag= 1;
	$scope.status_req="";
	console.info("****************8"+$scope.status_req);
	  $scope.showFlag = function(id){			  
		  $scope.showflag  = id;
		  for (var i=1;i<=13;i++)
			  {
			  if (i==id){
				  $scope.showflag  = id;
		      document.getElementById("list"+id).setAttribute("class", "active"); 
		      if(id == 13 && $scope.showmessge!=""){
	    			 GlobalModule_notificationService.notification("success","You can also view the statuses of the other jobs applied by the candidate");
	    			// $scope.fetchCandidateJourneyButtonStatus($rootScope.j.userid,$rootScope.j.jobId,$rootScope.j.status,$rootScope.j.inprocess);
	    			 $scope.fetchUserAppliedJobs($rootScope.j.userid);
             }
			  } else {
				  if(i != 12){
				  document.getElementById("list"+i).setAttribute("class", ""); 
				  }
			  }
               
			  }
	  };
	  
	  $scope.reloadpage=function(){
		//  $state.reload();
		  $scope.fetchCandidateJourneyButtonStatus($rootScope.j.userid,$rootScope.j.jobId,$rootScope.j.status,$rootScope.j.inprocess);
	  }
	  
	  $scope.username = $rootScope.j.name;	
	  $scope.location = $rootScope.j.location;
	  $scope.status=$rootScope.j.status;
	  
	  //Start get updated user status
	  $scope.userid = $rootScope.j.userid;
	  $scope.getUpdatedStatusOfUser=function(userid){
		  $scope.userid=userid;
	  		  Admin_Service.getUpdatedStatusOfUser($scope.userid).then(function(response){
	  			  $scope.getuserstatus = response.data;
	  			$rootScope.j.user.STATUS = $scope.getuserstatus;
	  			//$rootScope.j.requisition.assignassessflag=$scope.assignassessflag;
	  			  console.log($scope.getuserstatus);
	  	  });
	  }
	  $scope.getUpdatedStatusOfUser($rootScope.j.userid);
	//end get updated user status
	  $scope.emptyDate=function(){
		  $("#decisionDate").val('');
	  }
	  
	  $scope.appliedJobContactInfo = function(id){
			 $(".loader").show();
			 Admin_Service.appliedJobContactInfo($rootScope.j.userid).then(function(response){	 			 
				  $scope.contactInfo = response.data;
				  console.log($scope.contactInfo);
				  $(".loader").fadeOut("slow");	
				},function(response){			
					$(".loader").fadeOut("slow");	
					});				 
		 };
		  $scope.fetchUserProfileDetails = function(id){
			  $(".loader").show();
			  $scope.edituserid=id;
			  Admin_Service.fetchUserProfileDetails(id).then(function(response){	 
				  $scope.useralldata = response.data;
				  $scope.usercompliancelist = $scope.useralldata.userComplianceList;
				  $scope.userworklist = $scope.useralldata.userWorkList; 		
				
			   	  $scope.picpath =  $scope.useralldata.profilePic;
			   	  $scope.cvpath = $scope.useralldata.userCV.cvPath;	
			   	  $scope.position = $scope.useralldata.currentPosition;		
			   	  $scope.refNo = $scope.useralldata.refNo;   	
			   	  
			   	$(".loader").fadeOut("slow");	
			});
		  };
		  
		  $scope.fetchAssignAssessment = function(userId,roleId){	
		    	$scope.assignAssessmentSave = false;
		    	$(".loader").show();		    	
				  Admin_Service.fetchAssignAssessment($rootScope.j.userid,$rootScope.j.user.roleId).then(function(response){					  
						  $scope.AssignAssessmentList = response.data; 				  
						  if(!($scope.AssignAssessmentList.length > 0)){
							  $scope.assignAssessmentSave = true;							
						  }	
					  $(".loader").fadeOut("slow");			  				
				});	 
		    };
		    
		    
		    $scope.saveAltcontact= function(userContact)
		    {
		    	
		    	if(userContact.altPhoneNumber){
		    	if(userContact.altPhoneNumber.length<10)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid mobile number");
					  $(".loader").fadeOut("slow");
					  return;	
				  }
		    	}
		    	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		    	if(userContact.altEmail){
		    	if(!(userContact.altEmail).match(mailformat))
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid email");
					  $(".loader").fadeOut("slow");
					  return;	
				  }
		    	
		    	}
		    	$(".loader").show();		
		    	userContact.id=$rootScope.j.userid;
		    	Admin_Service.saveAltcontact(userContact,$scope.senderId).then(function(response){					  
		    		
		    		GlobalModule_notificationService.notification("success","saved successfully");
					
				  $(".loader").fadeOut("slow");			  				
			});	 
		    };
		    
		    //$scope.saveAltcontact(null);
		    $scope.saveAssignAssessment = function(){	    	
		    	
		    	var letterNumber = /^[0-9a-zA-Z]+$/;  
		    	var aphabet = /^[a-zA-Z]+$/;
		    	var numbers = /^[0-9]*$/;
		    	
		    	for(var i=0; i<$scope.AssignAssessmentList.length; i++){	    		
		    		if($scope.AssignAssessmentList[i].score == undefined || !$scope.AssignAssessmentList[i].score.match(letterNumber) || $scope.AssignAssessmentList[i].score.match(aphabet) || $scope.AssignAssessmentList[i].score.match(numbers))
	    			{	    			
		    			 $scope.validate = true;	 
			     	}else
	    			{
		    			$scope.validate = false;
		    			break;		    		
		    			}  
		    		if( $scope.AssignAssessmentList[i].comment == undefined || !$scope.AssignAssessmentList[i].comment.match(letterNumber) || $scope.AssignAssessmentList[i].comment.match(aphabet) || $scope.AssignAssessmentList[i].comment.match(numbers))   		
			  	      {  	
			    			 $scope.validate = true;	    			
			  	      }	else
			    			{
			    			$scope.validate = false;
			    			break;		    		
			    			} 	  		  
		    	}
		    	
		    	for(var i=0; i<$scope.AssignAssessmentList.length; i++){
		    		
		    		
		    		$scope.AssignAssessmentList[i].userid = $scope.id;
		    		//$scope.AssignAssessmentList[i].jobid = $scope.jobId;
		    		$scope.AssignAssessmentList[i].createdby = $rootScope.userdetails.id;	    		
		    		//$scope.AssignAssessmentList[i].completedon = $("#date"+i).val();	
		    		
		    		if(($scope.AssignAssessmentList[i].id) != -1){		    			
		    			$scope.AssignAssessmentList[i].assessby = $rootScope.userdetails.id;
		    		}else{
		    			$scope.AssignAssessmentList[i].assessby = $scope.AssignAssessmentList[i].assessby;
		    		}	    		
		    	}
		    	
		    	var assessmentObj = [];	 
		    	angular.extend(assessmentObj,$scope.AssignAssessmentList);	    
		    	
		    	if($scope.validate){	
		    		
		    		 $(".loader").show();
				 Admin_Service.saveAssignAssessment(assessmentObj).then(function(response){	 				  
					  $scope.status = response.data;
					  
					 // console.log($scope.status);
					  
					  if($scope.status = 'success'){
						  GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
						  $scope.fetchAssignAssessment($scope.id,$scope.roleId);
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Error in saving records");
					  }				  
					  $(".loader").fadeOut("slow");					  
				});	 		 
		
		    }	
		    else{
		    	GlobalModule_notificationService.notification("error","Please enter valid value! Either numeric or aphabets allowed");
		    }
		    };
		    
		    
		    
		    
		    
		    $scope.SaveScore=function(){      
		    	 
		    	//save short Ans and finalscore		    
		    	 Admin_Service.SaveShortAns($scope.SelectedAssessment.id,$scope.SelectedAssessment.user_asmt_id,$scope.id,$scope.QuestionAnsList,$rootScope.userdetails.id).then(function(response){					  
					  $scope.ShortAnsStausResponse = response.data; 						 
					  if($scope.ShortAnsStausResponse == "success"){
						  GlobalModule_notificationService.notification("success","Woo Hoo! Answer(s) has been saved successfully");
						  $scope.fetchAssignAssessment($scope.id,$scope.roleId);
					  }					  
					  	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
				    	 tab31.attr("class", "");		    	 
				    	 var tab21=angular.element(document.getElementById('activetab21'));
				    	 tab21.attr("class", "active");								    	 
				    	 var tab11=angular.element(document.getElementById('activetab11'));		
				    	 tab11.attr("class", "");			
				    	 $scope.AssessmentFlag(2);
			});		  
		    	 
		    	 
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
		  
				$scope.checkedReqId = function(reqId,candidateNo,selectedUsers)
				{
					$scope.reqId=reqId;
					$scope.candidateNo=candidateNo;
					$scope.selectedUsers=selectedUsers;
					$scope.selectedRequistion($scope.reqId);
				};
				
				$scope.selectedRequistion = function(reqId){
					
					 Customer_Service.selectedRequistion(reqId,$scope.userAppliedJobId).then(function(response){
			    		 
					 });
					};
						
				 $scope.rejectFlag=0;
			     $scope.showDecisionModal=function(flag)
			     {
			    	 $scope.rejectFlag=flag;
			     }
		  
			     $scope.decisionSuitable=function(action)
				 {   
					   if(($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "" && action=='Not Suitable')
							{
						       GlobalModule_notificationService.notification("error","Please select date");
								return;
							}
					   else{
						   $('#rejectbutton').modal('show');
					   }
				  };
				  
				  $scope.isEnabledButton=function(menuName)
			      {
			    	  for(var i=0;i<$rootScope.userdetails.roleMenuMapping.menus.length;i++)
			    	  {
			    		  if( menuName == $rootScope.userdetails.roleMenuMapping.menus[i].name  )
			    			  {
			    			    return true;
			    			  }
			    		  
			    	  }	return false;  
			      };
			      
			      $scope.decisionSuccess=function(action)
					 {   
						   if(($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "" && action=='Not Successful')
								{
							       GlobalModule_notificationService.notification("error","Please select date");
									return;
								}
						   else{
							   $('#rejectbutton').modal('show');
						   }
					  };
				  
			      
			      
					 $scope.selectUserRequisition = function(action){
							
						 

							if((($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "") && action != "Peer Review Started")
							{
								
								GlobalModule_notificationService.notification("error","Please select date");
								
								return;
							    }
							else if(action=='Abandoned' && ($scope.selectReq.decisionComment == '' || $scope.selectReq.decisionComment == undefined)){
								GlobalModule_notificationService.notification("error","Please Add Comment");
								
								return;
							}
							else if(action=='Shortlisted' && $scope.applicationStatus==false){
									
									 GlobalModule_notificationService.notification("error","Already selected, Can't short list");
								     }
								    else if((($scope.reqId==0 || $scope.reqId==null) && action=='Selected') || (($scope.reqId==0 || $scope.reqId==null) && action=='Shortlisted') || (($scope.reqId==0 || $scope.reqId==null) && action=='Peer Review Ready')){
									 
									 GlobalModule_notificationService.notification("error","please select requisition first !!");
							    	}
							    	else if(($scope.reqId==$scope.selectedRequisitionId && action=='Shortlisted')){
							    		 GlobalModule_notificationService.notification("error","Already selected , Please Select another requisition");
							    	}
							    	else if(($scope.candidateNo==$scope.selectedUsers && action=='Selected') || ($scope.candidateNo==$scope.selectedUsers && action=='Shortlisted')){
							    		 GlobalModule_notificationService.notification("error","Requistion is full, Select another requisition !!");
							    	}
							    	/*else if(action == 'Not Successful' && ($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == ""){
							    		GlobalModule_notificationService.notification("error","Please enter valid date");
							    		$('#rejectbutton').modal('hide'); 
										return;
							    	}*/
							    	else{
							    		$(".loader").show();
							    		
							    		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
							    		/*if($scope.selectFlag=='false' && action=='Reject'){
							    			action='Not selected';
								    	}*/
							    		$scope.selectReq.id=$scope.reqId;
							    		$scope.selectReq.jobid=$scope.jobId;
							    		$scope.selectReq.userAppliedJobId=$scope.userAppliedJobId;
							    		$scope.selectReq.userid=$scope.id;
							    		$scope.selectReq.decisionDate=$('#decisionDate').val();
							    		$scope.decisionDate=$('#decisionDate').val();
							    		if($scope.selectReq.decisionComment != '' && $scope.selectReq.decisionComment != undefined)
							    		{
							    			if(!($scope.selectReq.decisionComment.match(letterNumber)))
							    			{
							    				GlobalModule_notificationService.notification("error","Invalid text in Comment");
							    				$(".loader").fadeOut("slow");
							    				return;
							    			}
							    		}				    		
							    		
							    		$scope.reqId=0;
							    			
							    	//	$scope.decisionDate=$('#decisionDate').val();

							    	 Customer_Service.selectUserRequisition($scope.selectReq,$rootScope.userdetails.id,action).then(function(response){
							    		 $scope.reqFlag=response.data;
							    		 
							    		 $scope.decisionLoglistForUser();
							    		 $scope.fetchReqforSelected($scope.userAppliedJobId);
							    		 $scope.fetchrequisitionListForUser(0,100,null,null,null,$scope.jobId);
							    		 
								    	 //$scope.fetchAppliedJobs(0,10,null,null,$scope.searchterm);
								    	// $scope.getAppliedJobcount($scope.searchterm);
							    		 if($scope.reqFlag  == 'inactive'){
							    			  $scope.status='inactive';
							    			  $("#inactiveUser").modal('hide');
							    			 //$scope.applicationStatus=true;
							    			 //GlobalModule_notificationService.notification("success","Status Changed successfully");
							    			  GlobalModule_notificationService.notification("error","The selected candidate is inactive and cannot be selected. Please mark the candidate as Active to proceed.");
							    			
							    		 }
							    		 else if($scope.reqFlag  == 'Invalid Reviewer'){
							    			 $scope.status='Peer Review Ready';
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("error","You cannot be a peer reviewer");
							    		 }
							    		 else{
							    		 if( action=='Selected'){
							    			 
							    			 $scope.status='Selected';
							    			 $scope.status_req="";
							    			 $scope.applicationStatus=false;
							    			 GlobalModule_notificationService.notification("success","User selected successfully");
							    			 $scope.reqId=0;
							    			
							    		 }
							    		 else if( action=='Not Successful'){
							    			 $scope.status='Not Successful';
							    			 $scope.status_req="";
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
							    			
							    		 }
							    		 else if(action == 'Hold'){
							    			 $scope.status='Hold';
							    			 $scope.status_req="";
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","User kept on hold");
							    			
							    		 }
							    		 else if(action == 'Shortlisted'){
							    			 $scope.status='Shortlisted';
							    			 $scope.applicationStatus=true;
							    			 $scope.searchReqAssessMappData($scope.selectReq.id);
							    			 GlobalModule_notificationService.notification("success","User short listed");
							    			
							    		 }
							    		 
							    			 else if(action == 'No Show'){
							    			 $scope.status='No Show';
							    			 $scope.applicationStatus=true;
							    			 $scope.status_req="";
							    			 GlobalModule_notificationService.notification("success","Status Changed to No Show");
							    			
							    		 }
							    		
							    		 else if(action == 'Pending Brand Approval'){
							    			 $scope.status='Pending Brand Approval';
							    			 $scope.status_req="";
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Status Changed to Pending Brand Approval");
							    			 
							    		 }
							    		 else if(action == 'Not Suitable'){
							    			 $scope.status='Not Suitable';
							    			 $scope.status_req="";
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
							    			
							    		 }
							    		 else if(action == "Abandoned"){
							    			 $scope.status='Closed';
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Successfully Abandoned"); 
							    		 }
							    		 else if(action == "Peer Review Ready"){
							    			 $scope.status='Peer Review Ready';
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Status Changed to Peer Review Ready"); 
							    		 }
							    		 else if(action == "Peer Review Started"){
							    			 $scope.status='Peer Review Started';
							    			 $scope.applicationStatus=true;
							    			 GlobalModule_notificationService.notification("success","Status Changed to Peer Review Started"); 
							    			 $state.reload();
							    		 }
							    		 else{
							    			 GlobalModule_notificationService.notification("error","Failed to take any action");
							    			 
							    		 }
							    		 $state.reload();
							    		 }
							    		 $scope.selectReq={decisionComment:""};
							    		// $scope.selectReq={decisionDate:""};
							    		 $('#decisionDate').val("");	
							    		 $scope.selectFlag = 'false';
							    		 $(".loader").fadeOut("slow");
							    		 setTimeout(function(){ 
							    			// $scope.showFlag(13);
							    			 //$scope.showmessge="yes";
							    			 //document.getElementById("showbtn").click();
							    		 
							    		 }, 4000);
							    		
							    			
							    			// $scope.showFlag(13);
							    				
							    		 },function(response){
							    				
							 			});
							    	 
							     };
							     };
							 
		  $scope.appliedJobComplianceLog = function(id){	 
				
				$(".loader").show();
				  Admin_Service.appliedJobComplianceLog($rootScope.j.userid).then(function(response){	 			 
				  $scope.compliancelog = response.data;
				  $(".loader").fadeOut("slow");			  
				},function(response){	
					$(".loader").fadeOut("slow");		
					});
				 };
			  
				 $scope.appliedJobEducationalInfo = function(id){
					 $(".loader").show();
					 Admin_Service.appliedJobEducationalInfo($rootScope.j.userid).then(function(response){	 			 
						  $scope.educationalInfo = response.data;
						  $(".loader").fadeOut("slow");
						},function(response){	
							$(".loader").fadeOut("slow");	
							});				 
				 };
				 $scope.FormateAnsScore=function(shortAnsScore){
				    	//alert(shortAnsScore);parseFloat parseInt
				    	var a = parseFloat(shortAnsScore);
				    	return a;
				    };
				    
				    $scope.getAssessmentTestImages = function(assessmentObj){
				    	$(".loader").show();
				    	
				    	 Admin_Service.getAssessmentTestImages(assessmentObj.id,$scope.id).then(function(response){					  
							  $scope.assessmentTestImages = response.data; 	
							 $(".loader").fadeOut("slow");  				
					});	
				    };
				    
				    $scope.checkedUserAns  = function (ansId,UserAns){ 		    	 
					    var Ids = [];
					    	
					    	for(var i=0;i<UserAns.length;i++){
					    		Ids.push(UserAns[i].id);
					    	}	    	
					    	
					    	if(Ids.indexOf(ansId) != -1){	 
					    		$scope.setRedioFlag = true;
					    		return true;		    		 
					    	}else{ 
					    		
					    		$scope.setRedioFlag = false;
					    		return false;
					    	}  
					    	
					    };
					    $scope.selecttabflag=0;
				 $scope.switchTab=function(assessmentObj){	
				    	$(".loader").show();
				    	 $scope.SelectedAssessment = assessmentObj;
				    	
				    	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
				    	 tab31.attr("class", "active");		    	 
				    	 var tab21=angular.element(document.getElementById('activetab21'));
				    	 tab21.attr("class", "");
				    	 $scope.assessmentFlag = 3;		   
				    	 
				    	
				    	 
				    	 Admin_Service.fetchQuestionAns($scope.SelectedAssessment,$scope.id,$scope.selecttabflag).then(function(response){					  
							  $scope.QuestionAnsList = response.data; 	
							  if($scope.QuestionAnsList!=null){
							  for(var i=0;i<$scope.QuestionAnsList.length;i++){
								  $scope.QuestionAnsList[i].shortAnsScore = $scope.FormateAnsScore($scope.QuestionAnsList[i].shortAnsScore);
								  $scope.QuestionAnsList[i].count = i+1;
							  }
							  }
							 $(".loader").fadeOut("slow");  				
					});			    	 
				    };
				    $scope.AnsSaveFlag = false;
					$scope.setSaveButtonFlag=function(q){
						$scope.assessmentobjectforuserclickpic=q;
						if(q.scoringType ==  "Manual" || q.scoringType ==  "Auto/Manual"){ 
							$scope.AnsSaveFlag = true;
						}
						if(q.scoringType ==  "Auto"){
							$scope.AnsSaveFlag = false;
						}
					};
				 
				 
		  
		  
				 $scope.appliedJobAssessmentLog = function(jobId){		    	
				    	$scope.savFlage = false;
				    	$(".loader").show();		    	
						  Admin_Service.appliedJobAssessmentLog($rootScope.j.jobId,$rootScope.j.userid).then(function(response){					  
								  $scope.assessments = response.data; 					 
								  if(!($scope.assessments.length > 0)){
									  $scope.savFlage = true;							
								  }						  
								  $scope.tempassessments = $scope.assessments;					  
							  $(".loader").fadeOut("slow");			  				
						});	    	
				    };	
				    $scope.appliedJobAssessmentLog($rootScope.j.jobId);	
				    
				    $scope.change = [];
				    $scope.myFunc = function(x) {	
				    	var index = $scope.change.indexOf(x.id);
				    	if (index > -1) {
				    		$scope.change.splice(index,1);
							}
				    	
				    	$scope.change.push(x.id);	    	
				    };
				    
				    $scope.saveassessmentslog = function(){	    	
				    	var letterNumber = /^[0-9a-zA-Z]+$/;  
				    	var aphabet = /^[a-zA-Z]+$/;
				    	var numbers = /^[0-9]*$/;
				    	for(var i=0; i<$scope.assessments.length; i++){	    		
				    		if($scope.assessments[i].score == undefined || !$scope.assessments[i].score.match(letterNumber) || $scope.assessments[i].score.match(aphabet) || $scope.assessments[i].score.match(numbers))
			    			{	    			
				    			 $scope.validate = true;	 
					     	}else
			    			{
				    			$scope.validate = false;
				    			break;		    		
				    			}  
				    		if( $scope.assessments[i].comment == undefined || !$scope.assessments[i].comment.match(letterNumber) || $scope.assessments[i].comment.match(aphabet) || $scope.assessments[i].comment.match(numbers))   		
					  	      {  	
					    			 $scope.validate = true;	    			
					  	      }	else
					    			{
					    			$scope.validate = false;
					    			break;		    		
					    			} 	  		  
				    	}
				    	
				    	for(var i=0; i<$scope.assessments.length; i++){	    		
				    		$scope.assessments[i].userid = $scope.id;
				    		$scope.assessments[i].jobid = $scope.jobId;
				    		$scope.assessments[i].createdby = $rootScope.userdetails.id;	    		
				    		$scope.assessments[i].completedon = $("#date"+i).val();	
				    		
				    		if($scope.change.indexOf($scope.assessments[i].id) != -1){		    			
				    			$scope.assessments[i].assessby = $rootScope.userdetails.id;
				    		}else{
				    			$scope.assessments[i].assessby = $scope.assessments[i].assessby;
				    		}	    		
				    	}
				    	
				    	var assessmentObj = [];	 
				    	angular.extend(assessmentObj,$scope.assessments);	    
				    	
				    	if($scope.validate){	
				    		
				    	$(".loader").show();
						  Admin_Service.saveassessmentslog(assessmentObj).then(function(response){	 				  
							  $scope.result = response.data;
							  
							  if($scope.result = 'success'){
								  GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
								  $scope.appliedJobAssessmentLog($scope.jobId);
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Error in saving records");
							  }				  
							  $(".loader").fadeOut("slow");					  
						});	 			 
				
				    }	
				    else{
				    	GlobalModule_notificationService.notification("error","Please enter valid value! Either numeric or aphabets allowed");
				    }
				    };
				    
				    $scope.getUserActivityList=function(id){
						/* $scope.userid=$scope.edituserid;*/
					
						 Admin_Service.getUserActivityList($rootScope.j.userid).then(function(response){
							 $scope.useractivityList=response.data;
							 //console.log($scope.useractivityList);
						
						 });			
					 } ;
					 
					 
					 $scope.getStatusOfCandidate=function(id){
							/* $scope.userid=$scope.edituserid;*/
						
							 Admin_Service.getStatusOfCandidate(id).then(function(response){
								 $scope.candidatestatus=response.data;
								 console.log($scope.candidatestatus);
							
							 });			
						 } ;
					 
				    
				    $scope.assessmentFlag = 1;
				    $scope.AssessmentFlag = function(data){		    	
				    	if(data == 1){
				    	$scope.assessmentFlag = 1;		    	
				    	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
				    	 tab31.attr("class", "");		    	 
				    	 var tab21=angular.element(document.getElementById('activetab21'));
				    	 tab21.attr("class", "");								    	 
				    	 var tab11=angular.element(document.getElementById('activetab11'));		
				    	 tab11.attr("class", "active");			    	
				    	}
				    	if(data == 2){
				    		$scope.assessmentFlag = 2;
				    		var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
					    	 tab31.attr("class", "");		    	 
					    	 var tab21=angular.element(document.getElementById('activetab21'));
					    	 tab21.attr("class", "active");								    	 
					    	 var tab11=angular.element(document.getElementById('activetab11'));		
					    	 tab11.attr("class", "");	
				    	}
				    	if(data == 3){
				    		$scope.assessmentFlag = 3;
				    		var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
					    	 tab31.attr("class", "active");		    	 
					    	 var tab21=angular.element(document.getElementById('activetab21'));
					    	 tab21.attr("class", "");								    	 
					    	 var tab11=angular.element(document.getElementById('activetab11'));		
					    	 tab11.attr("class", "");	
				    	}
				    	if(data==4)
				    		{
				    		$scope.assessmentFlag = 4;	
				    		}
				    };
				    
				    
				    $scope.fetchProfileCompletion = function(id){	
				    	$(".loader").show();
						  Admin_Service.fetchProfileCompletion($rootScope.j.userid).then(function(response){	 				  
							  $scope.percent = response.data;	 
							  $('.chart').data('easyPieChart').update($scope.percent);
							  $(".loader").fadeOut("slow");	
						});
					  };
					  
					  $scope.fetchUserRatings = function(id,jobId){	
					    	$(".loader").show();
					    	
							  Admin_Service.fetchUserRatings($rootScope.j.userid,$rootScope.j.jobId).then(function(response){	 				  
								  $scope.ratingPercent = response.data;	 
								  $('.chartnew').data('easyPieChart').update($scope.ratingPercent);
								  $(".loader").fadeOut("slow");	
							});
						  };
				    
						  
						  $scope.fetchUserRatingValue=function(userid,jobId){
					    	  
					    	  $(".loader").show();
						    	
							  Admin_Service.fetchUserRatingValue($rootScope.j.userid,$rootScope.j.jobId).then(function(response){	 				  
								  $scope.ratingValueList = response.data;	 
								  $(".loader").fadeOut("slow");	
								  
							},function(response){
							$(".loader").fadeOut("slow");	
							});
					    	  
					      };
						  
				    
				    $scope.offset=0;
				 	$scope.limit=10;
				 	$scope.navButtons = [];
				     $scope.fetchrequisitionListForUser = function(offset,limit,colName,order,search,jobId){
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
						 $scope.jobId=jobId;
						 
					Customer_Service.fetchrequisitionListForUser(offset,limit,colName,order,search,$scope.jobId).then(function(response){
						 $scope.requisitionList =response.data;
						 console.log($scope.requisitionList);
						  $(".loader").fadeOut("slow");
					 },function(response){
							$(".loader").fadeOut("slow");
						});
					 };
				    
					 $scope.decisionLoglistForUser = function(){
							$(".loader").show();
							Customer_Service.decisionLoglistForUser($rootScope.j.id).then(function(response){
								 $scope.decisionLoglist =response.data;
								 $(".loader").fadeOut("slow");
							 },function(response){
									$(".loader").fadeOut("slow");
								});
							
						};
						
						$scope.fetchReqforSelected = function(userJobId)
						{
							Customer_Service.fetchReqforSelected($rootScope.j.id).then(function(response){
					    		 $scope.selectedRequisitionId=response.data;	 
							 });
						};
						
						 $scope.fetchComplianceDetails=function(id){
							 
							 Admin_Service.fetchComplianceDetails($rootScope.j.userid).then(function(response){
								  					 					
								  $scope.compliancesDetails = response.data;
									console.log($scope.compliancesDetails);				  					  
							  },function(response){
								  							
							});					  
						 };
						 $scope.onloadFun = function(evt) {
								$(function(){
								$('#decisionDate').datetimepicker({
									 format: 'DD-MM-YYYY',
									// useCurrent: false,
									 maxDate: new Date()
							
					          });
								});
						      };
						      
						      $scope.getflag=function(id){
									 
									for(var i =0; i<$scope.compliancesDetails.length;i++)
										{
										
										
										if(id==$scope.compliancesDetails[i].compliance.id)
											{
											if($scope.compliancesDetails[i].countryOfIssue != "" && $scope.compliancesDetails[i].issueDate != "" && $scope.compliancesDetails[i].expiryDate != "" && $scope.compliancesDetails[i].path != null && $scope.compliancesDetails[i].createdDate != "")
											
											{
										     return true;			     
											}
										else
											return false;
									        }	
								           }			 
									   };
						 
								$scope.communicatioLogList = function(id){
									
									 Admin_Service.getcommunicatioLogList(id).then(function(response){
										 $scope.comLogList = response.data;
										
									 });
								};
								
								$scope.schedulerLogList = function(id){

									Admin_Service.getSchedulerLogList(id).then(function(response){
										$scope.scheLogList = response.data;
									});
								};
								
								$scope.alreadySelected = function()
						    	{
						    		alert('User is already selected for position : '+$scope.selectedPostion);
							    	//GlobalModule_notificationService.notification("error","User is already selected for "+$scope.selectedPostion);

						    	};
						    	
						    	  //ravali jobapplication
							      
								   $scope.fetchUserAppliedJobs = function(userid){
									   
									   Admin_Service.fetchUserAppliedJobs(userid).then(function(response){
										   $scope.userappliedjobslist = response.data;   
									       console.log($scope.userappliedjobslist);
									   });
								   };
								   
								   
								   $scope.checkedappliedjobids=[];
								   $scope.checkeduserappliedjobids=[];
									  
									$scope.addCheckedappliedjob = function(userappliedjobslist){			  
									
										if($scope.checkeduserappliedjobids.indexOf(userappliedjobslist.id) !== -1)
										{		
											var array  = $scope.checkedappliedjobids;
											var index = array.indexOf(userappliedjobslist.id);
											$scope.checkedappliedjobids.splice(index,1);
											$scope.checkeduserappliedjobids.splice(index,1);
										}
										else
										{	
											 $scope.checkeduserappliedjobids.push(userappliedjobslist.id);
											$scope.checkedappliedjobids.push(userappliedjobslist);				      
										};						  
									};
								   
								   
								   $scope.checkedAllJobList = function(userappliedjobslist,rd){
										
										if(rd == true || rd == undefined)
										{				 
											for(var i=0; i<userappliedjobslist.length; i++)
											{					  
												if($scope.checkedappliedjobids.indexOf(userappliedjobslist[i].id) !== -1)  
												{  						 
												}
												else
												{
													if(userappliedjobslist[i].jobId != $rootScope.j.jobId){
													 $scope.addCheckedappliedjob(userappliedjobslist[i]);	
													}
												}						  
											}			
										}
										else
										{
											$scope.checkedappliedjobids=[];
										}
									};
									
									$scope.check = function(action){
										
										if($scope.checkedappliedjobids.length == 0)
										{
											GlobalModule_notificationService.notification("error","Please select any record");
										}else{
										$scope.selectionaction=action;	
										$('textarea#message').val('');
											$("#confirm_msg_modal").modal('show');
										}
												  
									};
									
									$scope.changeAppliedJobsStatus=function(){
										
										$(".loader").show();
										var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;

										if($('textarea#message').val() != ""){
											$scope.checkedappliedjobids.decisioncomment=$('textarea#message').val();
											var decisioncomments=$('textarea#message').val();
											if(!($scope.checkedappliedjobids.decisioncomment.match(letterNumber)))
							    			{
							    				GlobalModule_notificationService.notification("error","Invalid text in Comment");
							    				$(".loader").fadeOut("slow");
							    				return;
							    			}
										
										}else{
											GlobalModule_notificationService.notification("error","Please add comments");
											$(".loader").fadeOut("slow");
											return;

										}
									//	$scope.checkedappliedjobids.userid=$rootScope.userdetails.id;
										
										Customer_Service.changeAppliedJobsStatus($scope.checkedappliedjobids,$scope.selectionaction,decisioncomments,$rootScope.userdetails.id).then(function(response){
											   $scope.userappliedjobslist = response.data;   
										       console.log($scope.userappliedjobslist);
										       $("#confirm_msg_modal").modal('hide');
										        
										       $scope.checkedappliedjobids=[];
										       $("#selectall").prop('checked',false);
										        $scope.fetchUserAppliedJobs($rootScope.j.userid);
										        
										        
										        
										        if($scope.userappliedjobslist  == 'inactive'){
									    			  $scope.status='inactive';
									    			 // $("#inactiveUser").modal('hide');
									    			 //$scope.applicationStatus=true;
									    			 //GlobalModule_notificationService.notification("success","Status Changed successfully");
									    			  GlobalModule_notificationService.notification("error","The selected candidate is inactive and cannot be selected. Please mark the candidate as Active to proceed.");
									    			
									    		 }else{
									    		  if( $scope.selectionaction=='Not Successful'){
									    			 $scope.status1='Not Successful';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
									    			 
									    		 }
									    		 else if($scope.selectionaction == 'Hold'){
									    			 $scope.status1='Hold';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","User kept on hold");
									    			 
									    		 }
									    		 
									    			 else if($scope.selectionaction == 'No Show'){
									    			 $scope.status1='No Show';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","Status Changed to No Show");
									    			 
									    		 }
									    		
									    		 else if($scope.selectionaction == 'Pending Brand Approval'){
									    			 $scope.status1='Pending Brand Approval';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","Status Changed to Pending Brand Approval");
									    			 
									    		 }
									    		 else if($scope.selectionaction == 'Not Suitable'){
									    			 $scope.status1='Not Suitable';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
									    			 
									    		 }
									    		 else if($scope.selectionaction == 'Abandoned'){
									    			 $scope.status1='Closed';
									    			 $scope.applicationStatus=true;
									    			 GlobalModule_notificationService.notification("success","Abandoned Done successfully");
									    			 
									    		 }
									    		 else{
									    			 GlobalModule_notificationService.notification("error","Failed to take any action");
									    			 
									    		 }
									    		  $('.modal-backdrop').hide();
									    		  $state.reload();
									    		 }

										      $(".loader").fadeOut("slow");
										},function(response){
											$(".loader").fadeOut("slow");
										});
										
									}
								   
								   //end jobapplication
									
									//Fetch Disable button based on user_job_status
								    $scope.fetchCandidateJourneyButtonStatus = function(userid,jobid,applicationstatus,process) {
								    	Admin_Service.fetchCandidateJourneyButtonStatus(userid,$rootScope.userdetails.id,jobid,applicationstatus,process).then(function(response){
											  $scope.candidatejourneycheck = response.data;
											  console.log("-----------$scope.candidatejourneycheck----------");
											  console.log($scope.candidatejourneycheck);
											  $scope.notsuitablecj=$scope.candidatejourneycheck.notsuitable;
											  $scope.shortlistedcj=$scope.candidatejourneycheck.shortlisted;
											  $scope.notsuccessfullcj=$scope.candidatejourneycheck.notsuccessful;
											  $scope.keeponholdcj=$scope.candidatejourneycheck.keeponhold;
											  $scope.noshowcj=$scope.candidatejourneycheck.noshow;
											  $scope.pendingbrandapprovalcj=$scope.candidatejourneycheck.pendingbrandapproval;
											  $scope.selectedcj=$scope.candidatejourneycheck.selected;
											  $scope.abandonedcj=$scope.candidatejourneycheck.abandoned;
											  $scope.peerreviewreadycj=$scope.candidatejourneycheck.peerreviewready;
											  $scope.peerreviewstartedcj=$scope.candidatejourneycheck.peerreviewstarted;
											  $scope.status=$scope.candidatejourneycheck.status;
											  	  },function(response){
												
											});
								   };
				
								
				    $scope.userdata = function(){
				    	$scope.searchterm1='';
 				    	$scope.showflag= 1;
				    	document.getElementById("list1").setAttribute("class", "active"); 
				    	 for (var i=2;i<=10;i++)
						  {
							  document.getElementById("list"+i).setAttribute("class", ""); 
						  }
				    	$scope.applicationStatus=true;
				    	$scope.fetchUserProfileDetails($rootScope.j.userid);
				    	$scope.fetchProfileCompletion($rootScope.j.userid);
				    	$scope.fetchUserRatings($rootScope.j.userid,$rootScope.j.jobId);
				        $scope.communicatioLogList($rootScope.j.userid);
				        $scope.schedulerLogList($rootScope.j.userid);
				        $scope.fetchUserAppliedJobs($rootScope.j.userid);
				        $scope.fetchrequisitionListForUser(0,100,null,null,null,$rootScope.j.jobId);
				        $scope.fetchAssignAssessment();
				        $scope.fetchCandidateJourneyButtonStatus($rootScope.j.userid,$rootScope.j.jobId,$rootScope.j.status,$rootScope.j.inprocess);
 				       // $scope.status=$rootScope.j.status;
 				        $scope.mappreqid=$rootScope.j.requisition.mappreqid;
 				       console.info("****************8"+$scope.status_req);
 				        if($scope.status_req!=""){
 				        	 $scope.status_req=$scope.assignmappreqassessment;
 				        }else{
 				        	 $scope.status_req=$rootScope.j.status;
 				        }
 				       console.info("****************8"+$scope.status_req);
				    	$scope.username = $rootScope.j.name;	  
				    	$scope.location = $rootScope.j.location;
				    	$scope.id = $rootScope.j.userid;
				    	$scope.roleId=$rootScope.j.user.roleId;
				    	$scope.decisionDate=$rootScope.j.requisition.decisionDate;
				    	$scope.jobId = $rootScope.j.jobId; 
				    	$scope.userAppliedJobId=$rootScope.j.id;
				    	$('#decisionDate').val("");
				    	$scope.selectReq={decisionComment:"",decisionDate:""};
				    	
				    	$scope.decisionLoglistForUser();
				    	 $scope.fetchReqforSelected($rootScope.j.userid);
				    	 $scope.fetchComplianceDetails($rootScope.j.userid);
				    	 
				    	// $scope.fetchRatingForAll();   //Dont call this method. it is to update rating for all applications
				    	 
				    	// GlobalModule_dataStoreService.storeData('LoginModule','appliedJobs',j);
				    };
				    $scope.userdata();
				    
				    
				    
				    

					 $scope.formatDate = function(date){		     
				         var dateOut = moment(date,'DD/MM/YYYY').format("DD-MM-YYYY");
				         return dateOut;
				   };
				   
				   $scope.AssessmentdateFormat = function(date){
					   var dateOut = new Date(date);       
				        return dateOut;
				   };
				   
				   $scope.formatDate1 = function(date){	
					   
					     if(date==null)
					    	 {
					    	 	return;
					    	 }
				         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
				         return dateOut;
				   };
				   $scope.formatDate2 = function(date){
					   
					   if(date==null)
				    	 {
				    	 	return;
				    	 }
				         var dateOut = moment(date,'ll').format("DD-MM-YYYY");
				         return dateOut;
				   };
				   
				   $scope.formatDate3 = function(date){
					   
					   if(date==null)
				    	 {
				    	 	return;
				    	 }
					   if(date.indexOf('-') < 4)
					   {
						   return date;
					   }
				         var dateOut = moment(date).format("DD-MM-YYYY");
				         return dateOut;
				   };
				   $scope.dateformate = function(date){
				         var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
				         return dateOut;
				   };
				   
				   $scope.dateformodal = function(date){		     
				         var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
				         return dateOut;
				   };
				   
				   $scope.dateformodalstd = function(date){	
					   
					   	  if(date == undefined || date == '')
						  {
							  return null;
						  }
					   
				         var dateOut = moment(date).format("DD-MM-YYYY");
				         return dateOut;
				   };
				   
				   $scope.showThisBigImage = function(imagePath){
						  $scope.bigImage=imagePath;
						  $("#lightbox-new").modal("show");
					  };
					  
					  
					  var assessmentTestImages=[];	  
					  $(document).ready(function() {
						  for(var i=0;i<assessmentTestImages.length;i++) { 
						    var $lightbox = $('#lightbox-new'+i);
						    
						    
						    $('[data-target="#lightbox-new"]').on('click', function(event) {
						        var $img = $(this).find('img'), 
						            src = $img.attr('src'),
						            alt = $img.attr('alt'),
						            css = {
						                'maxWidth': $(window).width() - 100,
						                'maxHeight': $(window).height() - 100
						            };
						       
						    $scope.bigImage=src;
						        $lightbox.find('img').attr('src', src);
						        $lightbox.find('img').attr('alt', alt);
						        $lightbox.find('img').css(css);
						    });
						    
						    $lightbox.on('shown.bs.modal', function (e) {
						    	var $img = $lightbox.find('img');
						        //alert($img.src);
						        $lightbox.find('.modal-dialog').css({'width': $img.width()});
						    });
						  }
					  });
				   /*$scope.closeUserDetailPage =function(){			 		 
					$state.go("restricted.admin.appliedjobs");
					};*/ 
					  
	
				   
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
					
					$scope.PreviewDownload = function(path){
						   
						if(path==undefined){
							 $scope.imageFlag=false;
						}else{
						if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png") || path.includes(".jpeg"))
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
						
					  else{
						  $scope.imageFlag=false;
						 if(!(path.includes(".pdf"))){
							   $scope.pdfFlag=false
						 }
					  }
						}
					};
					
					$scope.PreviewDownloadEdu = function(path){
						   
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
										 window.open($scope.fileurl,'_blank');
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
					
					
					
					
					$scope.refreshModal = function()
					{		
					 $scope.showflag = 1;  
					 $scope.array = null;				
					};
					
					//------------------------candidate flag--------------------------------------			
			        
					 $scope.clear=function(){

						 $scope.flag = {
						 flagComment:"",
						 flagId:{
						 id:0
					          }    
						 };
						};
					
					 $scope.changeFlagForUser=function(id){
							$scope.flaguserid=id;
							
								//$("#update_Flag").modal("show");
							
						};
						
						$scope.insertUserFlag = function(userFlag){

							$(".loader").show();
							//userFlag.userids=$scope.checkedcandidateids;
							userFlag.id=$rootScope.userdetails.id

							   //$("#assign_Flag").modal('show');
							   
							   Admin_Service.insertUserFlag(userFlag).then(function(response){
							 $scope.insertstatus = response.data;
							 if($scope.insertstatus == "success"){
							 $("#assign_Flag").modal("hide");
							 GlobalModule_notificationService.notification("success"," Your flag has been set successfully");
							 }else{
							 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 }
							 $(".loader").fadeOut("slow");
							 },function(response){
							 $(".loader").fadeOut("slow");
							});
							 };
			           
					
		           $scope.updateUserFlag=function(userFlag){
		        	   
		        	   $(".loader").show();
		        	  
		        	 //  $("#update_Flag").modal('show');
		        	   userFlag.userid=$scope.flaguserid;
					   userFlag.id=$rootScope.userdetails.id;
						Admin_Service.updateUserFlag(userFlag).then(function(response){
							$scope.Flag = response.data;
							 if($scope.Flag == "success"){
								$("#update_Flag").modal('hide'); 
								 $("#assign_Flag").modal("hide");
								 $scope.noflag="";
							 GlobalModule_notificationService.notification("success"," Your flag has been set successfully");
							 $scope.fetchAssignedUserFlag();
							 }else{
							 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 }
							 $(".loader").fadeOut("slow");
							 },function(response){
							 $(".loader").fadeOut("slow");
							});
						};  
						
						 $scope.fetchCandidateFlag=function(){ 
					    	  
					    	  $(".loader").show();
						    	
							  Admin_Service.fetchCandidateFlag().then(function(response){	 				  
								  $scope.userFlag= response.data;	 
								 console.log($scope.userFlag);
								 
								  $(".loader").fadeOut("slow");	
								  
							},function(response){
								
							$(".loader").fadeOut("slow");	
							});	    	  
					      };
					      $scope.fetchCandidateFlag();
					      
					      
					      
	                     $scope.fetchUpdatedUserFlag=function(){ 
					    	  
					    	  $(".loader").show();
						    	
							  Admin_Service.fetchUpdatedUserFlag($rootScope.j.userid,$rootScope.userdetails.id).then(function(response){	 				  
								  $scope.uflag= response.data;	
								  
								 console.log($scope.uflag);
								 $scope.fetchAssignedUserFlag();
								 if($scope.uflag == null){
									 $scope.noflag="noflag";
								 }
								 else{
									 $scope.noflag="";
									 //$scope.flagcomment= $scope.uflag.flagComment;
								 }
								 if($scope.uflag== null ){
									 $("#assign_Flag").modal("show");
								 }else{
									 $("#update_Flag").modal("show");
								 }
								 
								  $(".loader").fadeOut("slow");	
								  
							},function(response){
								
							$(".loader").fadeOut("slow");	
							});	    	  
					      };
					   //  $scope.fetchUpdatedUserFlag();
					     
					     $scope.fetchAssignedUserFlag=function(){ 
					    	  
					    	  $(".loader").show();
						    	
							  Admin_Service.fetchUpdatedUserFlag($rootScope.j.userid,$rootScope.userdetails.id).then(function(response){	 				  
								  $scope.uflag= response.data;	 
								 console.log($scope.uflag);
								 
								 if($scope.uflag == null){
									 $scope.noflag="noflag";
								 }
								 
								 
								  $(".loader").fadeOut("slow");	
								  
							},function(response){
								
							$(".loader").fadeOut("slow");	
							});	    	  
					      };
					     $scope.fetchAssignedUserFlag();
					     
					     $scope.checkRemoveUpdateUserFlag=function(){
									$("#remove_UpdateFlag").modal("show");
							}; 
   
   
					    
					      
					      $scope.removeUpdatedUserFlag=function(){ 
					    	  
					    	  $(".loader").fadeOut("slow");
						    	
							  Admin_Service.removeUpdatedUserFlag($scope.flaguserid).then(function(response){	 				  
								  $scope.rflag= response.data;	 
								 console.log($scope.rflag);
								 if($scope.rflag == "success"){
									 $("#update_Flag").modal('hide'); 
								 GlobalModule_notificationService.notification("success"," Your flag has been remove successfully");
								
								 $scope.fetchAssignedUserFlag();
								 }else{
								 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								 }
					
								  $(".loader").fadeOut("slow");	
								  
							},function(response){
								
							$(".loader").fadeOut("slow");	
							});	    	  
					      };
					//pullof period
					      
				$scope.savePullOfStatus=function(status){
				    
					$(".loader").show();
					var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
			    	var aphabet = /^[a-zA-Z]+$/;
			    	var numbers = /^[0-9]*$/;
					$scope.pullof={};
					if(status == "inactive"){
						
						if($("#inactiveenddate").val() == ""){
							GlobalModule_notificationService.notification("error","Please select end date");
							$(".loader").fadeOut("slow");
							return;
						}
						
						if($('textarea#inactivecomments').val() != "" && $('textarea#inactivecomments').val() != undefined){
							 
							$scope.pullof.comments=$('textarea#inactivecomments').val();
							 
							 
							if(!($scope.pullof.comments.match(letterNumber)))
			    			{ 
			    				GlobalModule_notificationService.notification("error","Invalid text in Comment");
			    				$(".loader").fadeOut("slow");
			    				return;
			    			}
						
						}else{
							GlobalModule_notificationService.notification("error","Please add comments");
							$(".loader").fadeOut("slow");
							return;

						}	
						
						$scope.pullof.updated_by=$rootScope.userdetails.id;
						$scope.pullof.userid=$rootScope.j.userid
						$scope.pullof.id=$rootScope.j.id
						$scope.pullof.end_date=$("#inactiveenddate").val();
						//item.date = $filter('date')(item.date, "dd/MM/yyyy");
						$scope.pullof.status="inactive";	
					}else{
						
						if($('textarea#activecomments').val() != ""){
							$scope.pullof.activated_comment=$('textarea#activecomments').val();
							if(!($scope.pullof.activated_comment.match(letterNumber)))
			    			{
			    				GlobalModule_notificationService.notification("error","Invalid text in Comment");
			    				$(".loader").fadeOut("slow");
			    				return;
			    			}
						}else{
							GlobalModule_notificationService.notification("error","Please add comments");
							$(".loader").fadeOut("slow");
							return;
						}

						$scope.pullof.updated_by=$rootScope.userdetails.id;
						$scope.pullof.userid=$rootScope.j.userid	
						$scope.pullof.id=$rootScope.j.id
						$scope.pullof.status="active";			
					}
					  Admin_Service.savePullOfStatus($scope.pullof).then(function(response){	 	
						  $scope.statusofuser= response.data;	
						  $rootScope.j.user.STATUS = status;
						  if(status=="active" && $scope.statusofuser == "success"){
							  GlobalModule_notificationService.notification("success","Candidate is Activated");
							  $state.reload();
							  $(".modal-backdrop").hide();
						  } 
						  if(status=="inactive" && $scope.statusofuser == "success"){
							  GlobalModule_notificationService.notification("success","Candidate is Deactivated");
						  }
						  if($scope.rflag == "error"){
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  
				    		$('#jainactive').modal('hide');
				    		$('#jaactive').modal('hide');
						  $(".loader").fadeOut("slow");	
						  $('textarea#activecomments').val("");
						  $('#inactiveenddate').val("");
						  $('textarea#inactivecomments').val("");
						  
					},function(response){
						
					$(".loader").fadeOut("slow");	
					});
					
				}	      
				$scope.onloadActiveDate=function(){
					$('#activation-date').datetimepicker({
						  minDate: new Date(),
						  format: 'DD-MM-YYYY',
						  });
					};
					
					
					$scope.backToInterviewRequest = function() {	
						
						$scope.redirectflag=3;
						GlobalModule_dataStoreService.storeData('LoginModule','redirectflag',$scope.redirectflag);
						$state.go("restricted.admin.interviewer_screen");	  
						};
		    
	
						 $scope.assignReqMappAssessment = function(userId,userjobId,reqId,roleId){	 
								
								$(".loader").show();
								  var req={};
								  req.id=userId;
								  req.userAppliedJobId=userjobId;
								  req.requisition_id=reqId;
								  req.roleId=roleId;
								  
								  Admin_Service.assignReqMappAssessment(req,$rootScope.userdetails.id).then(function(response){	 			 
								  $scope.assignmappreqassessment = response.data;
								  if($scope.assignmappreqassessment != ""){
									  $rootScope.j.requisition.assignassessflag=false;
									  GlobalModule_notificationService.notification("success","Assessment successfully assigned to user");
									  $state.reload();
								  }else{
									  GlobalModule_notificationService.notification("error","Assessment is not assigned to user");
									  
								  }
								  $(".loader").fadeOut("slow");			  
								},function(response){	
									$(".loader").fadeOut("slow");		
									});
								 };
								 
								 $scope.fetchCandidateJourneyLog = function(){
									 $(".loader").show();
									 Admin_Service.fetchCandidateJourneyLog($rootScope.j.userid,$rootScope.j.id).then(function(response){	 			 
										  $scope.candidatelogs = response.data;
										  console.log($scope.candidatelogs);
										  $(".loader").fadeOut("slow");	
										},function(response){			
											$(".loader").fadeOut("slow");	
											});				 
								 };
								 
								 $scope.displayCandidateJourneyLogsInactive = function(){
									   $(".loader").show();
									   // 2 means onclick demand logs
									   Profile_Service.displayCandidateJourneyLogsInactiveJobs(2,$rootScope.j.id,$rootScope.j.userid).then(function(response){
										   $scope.displayCandidateJourneyLogsInactiveJobs = response.data;
										   for(var i=0;i<$scope.displayCandidateJourneyLogsInactiveJobs.length;i++){
												
												if($scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Closed" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Not Suitable" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Abandoned" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="No Show" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Failed Assessment" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Inactive" ||
												   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Not Successful" ){
													
													$scope.displayCandidateJourneyLogsInactiveJobs[i].tab='failedStatus';
													break;
												}
												else if($scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Selected"){
													$scope.displayCandidateJourneyLogsInactiveJobs[i].tab="passedStatus";
												}
											}
										   $(".loader").fadeOut("slow");	
									   },function(response){	
											$(".loader").fadeOut("slow");		
											});
										 };
										 
										 $scope.displayCandidateJourneyLogsInactive();
										 
										 $scope.searchReqAssessMappData = function(req_id)
											{
											 Admin_Service.searchReqAssessMappData(req_id).then(function(response){
												 $(".loader").show();
												 $rootScope.j.requisition.assignassessflag=response.data;	 
										    		 $(".loader").fadeOut("slow");	
											 },function(response){	
													$(".loader").fadeOut("slow");		
													});
											};
}]);