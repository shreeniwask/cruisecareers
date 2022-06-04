'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('UserDescription_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Customer_Service','assessEngine_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Customer_Service,assessEngine_Service,Master_Service){

	
	
	
	//$scope.orderByLocation();
	$scope.applicationStatus=true;
$scope.userdata = function(j){
	//console.log(j);
	$scope.searchterm1='';
	$scope.userinfo=j;
	$scope.showflag= 1;
	document.getElementById("list1").setAttribute("class", "active"); 
	 for (var i=2;i<=9;i++)
	  {
		  document.getElementById("list"+i).setAttribute("class", ""); 
	  }
	 $scope.applicationStatus=true;
	$scope.fetchUserProfileDetails(j.userid);
	$scope.fetchProfileCompletion(j.userid);
	$scope.fetchUserRatings(j.userid,j.jobId);
    $scope.communicatioLogList(j.userid);
    $scope.schedulerLogList(j.userid);
    $scope.fetchrequisitionListForUser(0,100,null,null,null,j.jobId);
    $scope.status=j.status;
	$scope.username = j.name;	  
	$scope.location = j.location;
	$scope.id = j.userid;
	$scope.roleId=j.user.roleId;
	
	for(var i=0;i<$scope.appliedJobs.length;i++)
		{
		
		if($scope.appliedJobs[i].userid==j.userid && $scope.appliedJobs[i].status=='Selected')
			{
			$scope.applicationStatus=false;
			$scope.selectedPostion=$scope.appliedJobs[i].position;
			}
		}
	
	$scope.jobId = j.jobId; 
	$scope.userAppliedJobId=j.id;
	$scope.decisionLoglistForUser();
	 $scope.fetchReqforSelected($scope.userAppliedJobId);
	 $scope.fetchComplianceDetails(j.userid);
	 
	// $scope.fetchRatingForAll();   //Dont call this method. it is to update rating for all applications
};

$scope.userdata();
	
	$scope.Slotflag = false;
    $scope.communicationmanager={};
    $scope.fetchTmpltpreview= function(id){
    	$(".loader").show();	
    	Admin_Service.fetchTmpltpreview(id).then(function(response){	    		
    		$scope.tmptpreview=response.data;
    		
    		if($scope.tmptpreview[0].Body.indexOf("${schedule}") > -1){	
    			
    			if($scope.usersdetailforEmail.length == 1){	    				
    				$scope.Slotflag = true;	 
    				$scope.fetchUserEventsAndSlots($scope.selectedUserId);	    	
    			}else{	
    				$scope.communicationmanager={};
    				$scope.tmptpreview[0].Body = null;	    				
    				$('#comm-manager').modal("hide");
    				$scope.Slotflag = false;
    				GlobalModule_notificationService.notification("error","Please select only one user for scheduler mail");	  				
    			}	    			
    		}else{
    			$scope.Slotflag = false;	
    		}
    		
    		$(".loader").fadeOut("slow");	
    	},function(response){
    		$(".loader").fadeOut("slow");	
    	});
    	
    };
    
 
    $scope.fetchUserEventsAndSlots = function(userid){	    	
    	Admin_Service.fetchUserEventsAndSlots(userid).then(function(response){	    		
    		$scope.UserEventsAndSlots=response.data;	
    		   $scope.EventSolts=[];
    		for(var i=0; i<$scope.UserEventsAndSlots.length; i++){
    			
    			$scope.EventSolts[i] = $scope.UserEventsAndSlots[i].name +" - "+ $scope.dateformate($scope.UserEventsAndSlots[i].dateTime); 
    		}
    		
    		if($scope.EventSolts.length == 0){
    			$scope.communicationmanager={};
				$scope.tmptpreview[0].Body = null;	    				
				$('#comm-manager').modal("hide");
				$scope.Slotflag = false;
				GlobalModule_notificationService.notification("error","Please assign slot to selected user");
				}	    		
    	});	    	
    	 
    };
  

    $scope.changealias = function(s){	
    	$scope.slotTime = s.split(" - ")[1];
    	$scope.eventName = s.split(" - ")[0];	
    };
   
    $scope.getsubtemplateTypeList=function(id){	
		 Admin_Service.getsubtemplateTypeList(id).then(function(response){
			 $scope.SubTemplateTypeList=response.data;				
		 });			 
	 } ;
   
    

   $scope.usersdetailforEmail = [];
   $scope.selectedCandidatenames=[];
   
    $scope.getuserforemail= function(userid,jobid,jname,status,role){	    	
    	$scope.usersDetailsForEmail ={};
    	$scope.usersDetailsForEmail.userid = userid;
    	$scope.usersDetailsForEmail.id = jobid;	  
    	$scope.usersDetailsForEmail.status = status;
    	$scope.usersDetailsForEmail.rolId=role;
    	
      $scope.usersdetailforEmail.push($scope.usersDetailsForEmail);	
     
      $scope.selectedCandidate ={};
    	$scope.selectedCandidate.userid = userid;
    	$scope.selectedCandidate.name = jname;
      $scope.selectedCandidatenames.push($scope.selectedCandidate);	
 };	
 
 $scope.openModalForInterview=function(id){
	 
	 if($scope.usersdetailforEmail.length==0){
			GlobalModule_notificationService.notification("error","Please select user to assign slot");
			$scope.clearEvent();
		}
	 else
		 {
				if(true){
				for(var i=0;i<$scope.schedulernameList.length;i++)
				{						
				  if($scope.schedulernameList[i].id==id)
					  {
					   $scope.selectedEvent = $scope.schedulernameList[i].schedulerName;
					   break;
					  }			  
				}					
							 
				Admin_Service.getSlotsByEventId($scope.selectedEvent.id).then(function(response){
					 $scope.slotsListById=response.data;
					 
					 $scope.slot = $scope.slotsListById[$scope.slotsListById.length-1] ;
					 var date=$scope.slotsListById.dateTime;					 
					
				 });
				}
				
				$scope.checkuserinslot($scope.usersdetailforEmail,$scope.selectedEvent);
				 }
	};

	


	$scope.sure = function(){
		$("#interview_schedule").modal('show');	
	};
	
	$scope.clearEvent=function()
	{
		$scope.selectedEvent=undefined;
	};
	
 $scope.checkuserinslot = function(selectedUser,selectedEvent){
	 $scope.eventId = selectedEvent.id;		 
	 Admin_Service.checkuserinslot(selectedUser,$scope.eventId).then(function(response){	    		
    		$scope.slotresult = response.data;
    		
    		if($scope.slotresult == undefined || $scope.slotresult <=0 ||$scope.slotresult == null){					 
				$("#interview_schedule").modal('show');											
			}
			else
				{							
				$("#checkuserinslot").modal('show');
				}
    		
    		
    	},function(response){	    		
    	});
	 };

 
 
 $scope.removeuserforemail = function(userid,jobid) 
 {
	angular.forEach( $scope.usersdetailforEmail, function(value, key) 
  {
       if (value == userid) 
       {
       	 $scope.usersdetailforEmail.splice(key, 1);
       
       }
   });
	$scope.removeselectedcandidate(userid);
	
 };
 
 $scope.stateChanged = function (answers,userid,jobid,jname,status,role) {   
	
	 $scope.selectedUserId = userid;   	 
	 
	   if(answers){ //If it is checked
		   $scope.getuserforemail(userid,jobid,jname,status,role);
	   }else{
		  for(var i=0;i<$scope.usersdetailforEmail.length;i++){
				           if ($scope.usersdetailforEmail[i].id == jobid) 
				           {
				           	 $scope.usersdetailforEmail.splice(i, 1);
				           }
				       };
	   }    	
	   
	};
	
	$scope.sortByColumn = function(colname,searchterm){
		   $scope.offset =0 ;
			$scope.start = 0;
			$scope.colName = colname;
			$scope.search=searchterm;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search);
			
		};
	
   $scope.orderByPosition = function(searchterm){
	   $scope.offset =0 ;
		$scope.start = 0;
		$scope.colName = "pm.position_name";
		$scope.search=searchterm;
		if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
		{
			$scope.order ="asc";
		}
		else if($scope.order!=undefined && $scope.order=="asc")
		{
			$scope.order = "desc";
		}
		if($scope.search==null)
		  {
		  $scope.search= undefined;
		  
		  }
		$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search);
		
	};
	//$scope.orderByPosition();
	 $scope.orderByLocation= function(searchterm){
		 $scope.offset =0 ;
			$scope.start = 0;
		 	$scope.search=searchterm;
			$scope.colName = "c.cityname";
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
		
			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search);
		};
		$scope.orderByExperiance= function(searchterm){
			$scope.offset =0 ;
			$scope.start = 0;
			$scope.search=searchterm;
			$scope.colName = "experiance";
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search);
		};
		
		
		//$scope.orderByLocation();
		$scope.applicationStatus=true;
    $scope.userdata = function(j){
    	//console.log(j);
    	$scope.searchterm1='';
    	$scope.userinfo=j;
    	$scope.showflag= 1;
    	document.getElementById("list1").setAttribute("class", "active"); 
    	 for (var i=2;i<=9;i++)
		  {
			  document.getElementById("list"+i).setAttribute("class", ""); 
		  }
    	 $scope.applicationStatus=true;
    	$scope.fetchUserProfileDetails(j.userid);
    	$scope.fetchProfileCompletion(j.userid);
    	$scope.fetchUserRatings(j.userid,j.jobId);
        $scope.communicatioLogList(j.userid);
        $scope.schedulerLogList(j.userid);
        $scope.fetchrequisitionListForUser(0,100,null,null,null,j.jobId);
        $scope.status=j.status;
    	$scope.username = j.name;	  
    	$scope.location = j.location;
    	$scope.id = j.userid;
    	$scope.roleId=j.user.roleId;
    	
    	for(var i=0;i<$scope.appliedJobs.length;i++)
    		{
    		
    		if($scope.appliedJobs[i].userid==j.userid && $scope.appliedJobs[i].status=='Selected')
    			{
    			$scope.applicationStatus=false;
    			$scope.selectedPostion=$scope.appliedJobs[i].position;
    			}
    		}
    	
    	$scope.jobId = j.jobId; 
    	$scope.userAppliedJobId=j.id;
    	$scope.decisionLoglistForUser();
    	 $scope.fetchReqforSelected($scope.userAppliedJobId);
    	 $scope.fetchComplianceDetails(j.userid);
    	 
    	// $scope.fetchRatingForAll();   //Dont call this method. it is to update rating for all applications
    };	
    	
    $scope.fetchRatingForAll = function(jobId){		    	
    	$scope.savFlage = false;
    			    	
		  Admin_Service.fetchRatingForAll().then(function(response){					  
				  			  		  				
		});	    	
    };
    	$scope.alreadySelected = function()
    	{
    		alert('User is already selected for position : '+$scope.selectedPostion);
	    	//GlobalModule_notificationService.notification("error","User is already selected for "+$scope.selectedPostion);

    	};
    	
        $scope.change = [];
	    $scope.myFunc = function(x) {	
	    	var index = $scope.change.indexOf(x.id);
	    	if (index > -1) {
	    		$scope.change.splice(index,1);
				}
	    	
	    	$scope.change.push(x.id);	    	
	    };
	    
	    
	    
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
				  console.log($scope.QuestionAnsList);
				  
				  for(var i=0;i<$scope.QuestionAnsList.length;i++){
					  $scope.QuestionAnsList[i].shortAnsScore = $scope.FormateAnsScore($scope.QuestionAnsList[i].shortAnsScore);
				  }
				 //console.log($scope.QuestionAnsList);
				  				
				//Ans status 1=right 2=wrong  				
				 $(".loader").fadeOut("slow");  				
		});			    	 
	    };
	    
	    $scope.getAssessmentTestImages = function(assessmentObj){
	    	$(".loader").show();
	    	
	    	 Admin_Service.getAssessmentTestImages(assessmentObj.id,$scope.id).then(function(response){					  
				  $scope.assessmentTestImages = response.data; 	
				 		console.log($scope.assessmentTestImages);
				 $(".loader").fadeOut("slow");  				
		});	
	    };
	    
	    $scope.FormateAnsScore=function(shortAnsScore){
	    	//alert(shortAnsScore);parseFloat parseInt
	    	var a = parseFloat(shortAnsScore);
	    	return a;
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
	   
	    $scope.SaveScore=function(){      
	    	 
	    	//save short Ans and finalscore		    
	    	 Admin_Service.SaveShortAns($scope.SelectedAssessment.id,$scope.id,$scope.QuestionAnsList,$rootScope.userdetails.id).then(function(response){					  
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
	    
	    
	    
    $scope.appliedJobAssessmentLog = function(jobId){		    	
    	$scope.savFlage = false;
    	$(".loader").show();		    	
		  Admin_Service.appliedJobAssessmentLog(jobId,$scope.id).then(function(response){					  
				  $scope.assessments = response.data; 					 
				  if(!($scope.assessments.length > 0)){
					  $scope.savFlage = true;							
				  }						  
				  $scope.tempassessments = $scope.assessments;					  
			  $(".loader").fadeOut("slow");			  				
		});	    	
    };		    
    //$scope.appliedJobAssessmentLog($scope.jobId);	 	    
   
    $scope.fetchAssignAssessment = function(userId,roleId){	
    	$scope.assignAssessmentSave = false;
    	$(".loader").show();		    	
		  Admin_Service.fetchAssignAssessment(userId,roleId).then(function(response){					  
				  $scope.AssignAssessmentList = response.data; 				  
				  
				//  console.log($scope.AssignAssessmentList);
				  if(!($scope.AssignAssessmentList.length > 0)){
					  $scope.assignAssessmentSave = true;							
				  }	
			  $(".loader").fadeOut("slow");			  				
		});	 
    };
    
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
    		
    		if($scope.change.indexOf($scope.AssignAssessmentList[i].id) != -1){		    			
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

    
    
    
    $scope.fetchProfileCompletion = function(id){	
    	$(".loader").show();
		  Admin_Service.fetchProfileCompletion(id).then(function(response){	 				  
			  $scope.percent = response.data;	 
			  $('.chart').data('easyPieChart').update($scope.percent);
			  $(".loader").fadeOut("slow");	
		});
	  };
	  
	  $scope.fetchUserRatings = function(id,jobId){	
	    	$(".loader").show();
	    	
			  Admin_Service.fetchUserRatings(id,jobId).then(function(response){	 				  
				  $scope.ratingPercent = response.data;	 
				  $('.chartnew').data('easyPieChart').update($scope.ratingPercent);
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
		   	  $scope.refNo = $scope.useralldata.RefNo;   	
		   	  
		   	$(".loader").fadeOut("slow");	
		});
	  };
	  
	  $scope.showflag= 1;
	  $scope.showFlag = function(id){			  
		  $scope.showflag  = id;
		  for (var i=1;i<=9;i++)
			  {
			  if (i==id)
		  document.getElementById("list"+id).setAttribute("class", "active"); 
			  else 
				  document.getElementById("list"+i).setAttribute("class", ""); 

			  }
	  };

	    $scope.path = null;
	    /*$scope.download = function(path){
			if(path.includes("amazonaws"))
		   {
			$rootScope.getSignedURL(path).then(function(response){
				window.open(response.data);
			},function(response){
				Common_Service.errorResponseHandler(response);
			});
		   }
			else
				{
				window.open(path);
				}
				

		};*/
	    
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
	    
				
		 $scope.appliedJobComplianceLog = function(id){	 
			 				
		$(".loader").show();
		  Admin_Service.appliedJobComplianceLog(id).then(function(response){	 			 
		  $scope.compliancelog = response.data;	
		  $(".loader").fadeOut("slow");			  
		},function(response){	
			$(".loader").fadeOut("slow");		
			});
		 };
	  
		 $scope.appliedJobEducationalInfo = function(id){
			 $(".loader").show();
			 Admin_Service.appliedJobEducationalInfo(id).then(function(response){	 			 
				  $scope.educationalInfo = response.data;
				  $(".loader").fadeOut("slow");
				},function(response){	
					$(".loader").fadeOut("slow");	
					});				 
		 };
		 
		 $scope.appliedJobContactInfo = function(id){
			 $(".loader").show();
			 Admin_Service.appliedJobContactInfo(id).then(function(response){	 			 
				  $scope.contactInfo = response.data;					  
				  $(".loader").fadeOut("slow");	
				},function(response){			
					$(".loader").fadeOut("slow");	
					});				 
		 };
		 
		 
		$scope.checkUserformodal = function(){
			
			if($scope.usersdetailforEmail.length == 0){
				GlobalModule_notificationService.notification("error","Please select users");
			}else{
				 $('#comm-manager').modal('show');
			}				
		};
		 
		
		 
		 $scope.sendEmailtoUsers = function(templateid,typeid){
			$scope.templateid=typeid;	
			
			if($scope.Slotflag == false){
				$scope.eventName = "";
			    $scope.slotTime = "";
			}
			
			
			 if($scope.usersdetailforEmail.length != 0){
			 $(".loader").show();
			 
				$scope.usersdetailforEmail[0].eventName = $scope.eventName;
		    	$scope.usersdetailforEmail[0].slotTime = $scope.slotTime;
		    	$scope.usersdetailforEmail[0].rolId = 2;
		    	
			 Admin_Service.sendEmailtoUsers($scope.usersdetailforEmail,templateid).then(function(response){	 	
				
				 $scope.userdetails.id=$rootScope.userdetails.id;
				
				 Admin_Service.addEmailmanagerEntry($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id);
				 GlobalModule_notificationService.notification("success","Woo Hoo! Email has been sent successfully");
				 $('#comm-manager').modal('hide');
					
					$(".loader").fadeOut("slow");
					
					
				},function(response){		
					 GlobalModule_notificationService.notification("error","Uh Oh! Error in Email send");
					$(".loader").fadeOut("slow");	
					});	
		
			 
		 }else{
			 GlobalModule_notificationService.notification("success","Please select users.");
		 }
			 
			 	$scope.communicationmanager={};
 				$scope.tmptpreview[0].Body = null;	    				
 				$('#comm-manager').modal("hide");
 				$scope.Slotflag=false;
			 
		 };
		 
		$scope.refreshModal = function()
			{		
			 $scope.showflag = 1;  
			 $scope.array = null;				
			};				

			
		$scope.schedulerlist=function(){
			 Admin_Service.getSchedulerName().then(function(response){
				 $scope.schedulernameList=response.data;
				
			 });
		};
		$scope.schedulerlist();
		
		$scope.communicatioLogList = function(id){
			
			 Admin_Service.getcommunicatioLogList(id).then(function(response){
				 $scope.comLogList = response.data;
				
			 });
		};
	
	$scope.cancelAssignment=function()
	{
		$scope.clearEvent();
	};
	
	$scope.assignslotstouser=function(id){
	
		
		$state.go("restricted.admin.appliedjobs");
		
		if($scope.usersdetailforEmail.length==0){
			GlobalModule_notificationService.notification("error","Please select user to assign slot");
		}else{
		
			$scope.clearEvent();
		if($scope.usersdetailforEmail.length > $scope.slot.candidates-$scope.slot.assignedUsers)
			{
			GlobalModule_notificationService.notification("error","User exceeds available seats in the slot");
			}
		else
			{
		$scope.slot.userid=$rootScope.userdetails.id;
		$scope.slot.user=$scope.usersdetailforEmail;
		if($scope.sloteventId==0)
			{
			GlobalModule_notificationService.notification("error","Please select slot");
			}
		else{
		Admin_Service.assignslotstouser($scope.slot).then(function(response){
			$scope.flaguser=response.data;	
			$scope.sloteventId=0;
			if($scope.flaguser == 'success'){
				 GlobalModule_notificationService.notification("success","Users assigned successfully ");
			}else{
				 GlobalModule_notificationService.notification("error","Users not assigned successfully");
			}
		 });
		}
			}
		};
	};
	
	$scope.fetchusersBysltId=function(id,dateTime){
		$scope.selectedSlotDateTime = dateTime;
		$scope.removeuserListassignSlot=[];
$scope.Slotid=id;
		Admin_Service.fetchusersBysltId(id).then(function(response){
			 $scope.userlistBySlotId=response.data;
			$scope.removeusersBySlotId=response.data;
			if($scope.userlistBySlotId.length == 0){
				 GlobalModule_notificationService.notification("error","No users present in this slot");
			}else{
				$("#candidates_modal").modal('show');
			}
			
		 });
	};
	
	$scope.removeuserListassignSlot=[];
	 $scope.removeselectedcandidate = function(user) 
     {	
$scope.removeuserListassignSlot.push(user);	

		 var index = $scope.removeusersBySlotId.indexOf(user);
		 if (index > -1) {
			 $scope.removeusersBySlotId.splice(index,1);
			}		
	 
     };
     $scope.sloteventId=0;
     $scope.setEventId=function(slot){	    
    	$scope.slot  = slot;	 
    	$scope.Slotid = slot.id;
    	$scope.sloteventId =  slot.id;
     };
     
     $scope.deleteuserbySlotId=function(){
    	
    	if($scope.removeuserListassignSlot.length==0){
    		 GlobalModule_notificationService.notification("error","Select user for delete");
    	}else{
    	 $scope.slots.userid=$rootScope.userdetails.id;
    	 $scope.slots.id=$scope.Slotid;
    	 $scope.slots.user=$scope.removeuserListassignSlot;
    
    	 Admin_Service.removeuUserBySlotId($scope.slots).then(function(response){
    		 $scope.deleteFlag=response.data;
    		 if( $scope.deleteFlag != "success"){	    			 
    			 GlobalModule_notificationService.notification("error","User not deleted successfully");	    			 
    		 }else{
    			 GlobalModule_notificationService.notification("success","User deleted successfully");	    			
    		 }
    		
    		 });
     };
     
     Admin_Service.getSlotsByEventId($scope.selectedEvent.id).then(function(response){
		 $scope.slotsListById=response.data;
		 
		 $scope.slot = $scope.slotsListById[$scope.slotsListById.length-1] ;
		 var date=$scope.slotsListById.dateTime;					 
		
	 });
     		
     };
     
     $scope.interviewquestion = false;
     $scope.toggleQuestnDiv= function(data){
    	 
    	 if(data == 1){
    		 $scope.interviewquestion = false;
    	 }
    	 if(data == 2){
    	 $scope.interviewquestion = true;}
     };
     
   //--------------- Decision Log function-----------------
     
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
		 $(".loader").fadeOut("slow");
	 },function(response){
			$(".loader").fadeOut("slow");
		});
	 };
	 
	 
	 
	 
	/* 
	 $scope.setReqButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchrequisitionListForUser($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.jobId);
			};
			 
				
				$scope.currentReq = function(page) {  
			        $scope.offset = page * $scope.limit;
			        $scope.fetchrequisitionListForUser(0,5,$scope.colName,$scope.order,$scope.search,$scope.jobId);
			    };*/
			    $scope.SortingReqList = function(colName,searchterm){
					  $scope.offset1 =0 ;
						$scope.start1 = 0;
					  $scope.colName1=colName;
						$scope.search1=searchterm;
						if($scope.order1 == undefined || $scope.order1 == "desc" && $scope.order1 != undefined)
						{
							$scope.order1 ="asc";
						}
						else if($scope.order1 != undefined && $scope.order1 == "asc")
						{
							$scope.order1 = "desc";
						}
						if($scope.search1 == "" || $scope.search1 == null)
						  {
						  $scope.search1 = undefined;
						  
						  }
						if($scope.colName1 == null)
						  {
						  $scope.colName1 = undefined; 
						  }
						$scope.fetchrequisitionListForUser(0,100,$scope.colName1,$scope.order1,$scope.search1,$scope.jobId);	
					};
					
						 
					
					/*-----select, reject and hold candidate -----*/
					
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
						
					$scope.fetchReqforSelected = function(userJobId)
					{
						Customer_Service.fetchReqforSelected(userJobId).then(function(response){
				    		 $scope.selectedRequisitionId=response.data;
				    	//	 console.log($scope.selectedRequisitionId);
				    		 
						 });
					};
					
					 $scope.selectUserRequisition = function(action){
						if(action=='Shortlisted' && $scope.applicationStatus==false){
							 GlobalModule_notificationService.notification("error","Already selected, Can't short list");
						}
						else if((($scope.reqId==0 || $scope.reqId==null) && action=='Selected') || (($scope.reqId==0 || $scope.reqId==null) && action=='Shortlisted')){
					    		 GlobalModule_notificationService.notification("error","please select requisition first !!");
					    	}
					    	else if(($scope.reqId==$scope.selectedRequisitionId && action=='Shortlisted')){
					    		 GlobalModule_notificationService.notification("error","Already selected , Please Select another requisition");
					    	}
					    	else if(($scope.candidateNo==$scope.selectedUsers && action=='Selected') || ($scope.candidateNo==$scope.selectedUsers && action=='Shortlisted')){
					    		 GlobalModule_notificationService.notification("error","Requistion is full, Select another requisition !!");
					    	}
					    	else{
					    		$scope.selectReq={};
					    		/*if($scope.selectFlag=='false' && action=='Reject'){
					    			action='Not selected';
						    	}*/
					    		$scope.selectReq.id=$scope.reqId;
					    		$scope.selectReq.jobid=$scope.jobId;
					    		$scope.selectReq.userAppliedJobId=$scope.userAppliedJobId;
					    		$scope.selectReq.userid=$scope.id;
					    		$scope.reqId=0;
					    		 $(".loader").show();
					    	 Customer_Service.selectUserRequisition($scope.selectReq,$rootScope.userdetails.id,action).then(function(response){
					    		 $scope.reqFlag=response.data;
					    		 $scope.decisionLoglistForUser();
					    		 $scope.fetchReqforSelected($scope.userAppliedJobId);
					    		 $scope.fetchrequisitionListForUser(0,100,null,null,null,$scope.jobId);
						    	 $scope.fetchAppliedJobs(0,10,null,null,$scope.searchterm);
						    	 $scope.getAppliedJobcount($scope.searchterm);
					    		 if( action=='Selected'){
					    			 $scope.status='Selected';
					    			 $scope.applicationStatus=false;
					    			 GlobalModule_notificationService.notification("success","User selected successfully");
					    			 $scope.reqId=0;
					    		 }
					    		 else if( action=='Not Successful'){
					    			 $scope.status='Not Successful';
					    			 $scope.applicationStatus=true;
					    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
					    			 
					    		 }
					    		 else if(action == 'Hold'){
					    			 $scope.status='Hold';
					    			 $scope.applicationStatus=true;
					    			 GlobalModule_notificationService.notification("success","User kept on hold");
					    			 
					    		 }
					    		 else if(action == 'Shortlisted'){
					    			 $scope.status='Shortlisted';
					    			 $scope.applicationStatus=true;
					    			 GlobalModule_notificationService.notification("success","User short listed");
					    			 
					    		 }
					    		 else{
					    			 GlobalModule_notificationService.notification("error","Failed to take any action");
					    			
					    		 }
					    		 $scope.selectFlag = 'false';
					    		 $(".loader").fadeOut("slow");
					    		 },function(response){
					    				
					    				 
					 			});
					    	 
					     };
					     };
					     
		//--------------- Decisioon Log list-------------------
					     
		$scope.decisionLoglistForUser = function(){
			$(".loader").show();
			Customer_Service.decisionLoglistForUser($scope.userAppliedJobId).then(function(response){
				 $scope.decisionLoglist =response.data;
				
				 $(".loader").fadeOut("slow");
			 },function(response){
					$(".loader").fadeOut("slow");
				});
			
		};
					
		//--------------- Decision Log function end -----------------
	 
				 
	 $scope.getUserActivityList=function(id){
		/* $scope.userid=$scope.edituserid;*/
	
		 Admin_Service.getUserActivityList(id).then(function(response){
			 $scope.useractivityList=response.data;
		
		 });			
	 } ;
	 
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
	         var dateOut = moment(date,'ll').format("DD-MM-YYYY");
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
	   
		 
//-------------------to do list------------------------- 
		 
		 $scope.getflag=function(id){
			 							 
	for(var i =0; i<$scope.compliancesDetails.length;i++)
		{
		
		
		if(id==$scope.compliancesDetails[i].compliance.id)
			{
			if($scope.compliancesDetails[i].countryOfIssue != null && $scope.compliancesDetails[i].issueDate != null && $scope.compliancesDetails[i].expiryDate != null && $scope.compliancesDetails[i].path != null && $scope.compliancesDetails[i].createdDate != null)
			{
		     return true;			     
			}
		else
			return false;
	        }	
           }			 
	   };
		 
		 			 
		 $scope.fetchComplianceDetails=function(id){
			 
			 Admin_Service.fetchComplianceDetails(id).then(function(response){
				  					 					
				  $scope.compliancesDetails = response.data;
				  
									  					  
			  },function(response){
				  							
			});					  
		 };
		 
//---------interview template ------
		 $scope.interviewTemplates=[{
             id: 0,
             name:"" }
             ];
		 //$scope.temp;
	   $scope.fetchInterviewTemplates = function(job){

		   $scope.temp;
		   $scope.xpath=[];
		   $scope.interviewShowFlag=1;
		   document.getElementById("activetab1").setAttribute("class", "active"); 
			document.getElementById("activetab2").setAttribute("class", "");
			document.getElementById("video-part").setAttribute("style", "display: none !important;");
			/*$('#interview-sch').modal({
				   backdrop: 'static',
				   keyboard: false
				});*/
		//alert($scope.temp);
		$scope.changetemp=0;
		$scope.enabledTemp();
		   $scope.nameOfInterviewer=job.name;
		   $scope.positionNameInterview=job.position;
		   $scope.jobIdInterview=job.jobId;
		   $scope.userIdInterview=job.userid;
		   $scope.generateInterview();
		   $scope.templateQuestion=[];
		   $scope.interviewTemplates=[{
               id: 0,
               name:"" }
               ];
		   $scope.fetchinterviewListForUser(0,100,null,null,job.userid);
		   
			Admin_Service.fetchInterviewTemplates().then(function(response){
				 $scope.interviewTemplates =response.data;
			//	console.log($scope.interviewTemplates);
			 },function(response){
				});
			
		};
		
		$scope.fetchTemplateQuestion = function(id){
			 
			$(".loader").show();
			//$scope.currentPage = 1;
			
			document.getElementById("video-part").setAttribute("style", "display: block !important;");
			$('#start').show();
			$('#stop').hide();
			$scope.templateQuestion=[];
			//alert($scope.userIdInterview+"  "+$scope.jobIdInterview);
			Admin_Service.fetchTemplateQuestion(id,$scope.userIdInterview,$scope.jobIdInterview).then(function(response){
				 $scope.templateQuestion =response.data;
				// $scope.transalate();
				 $(".loader").fadeOut("slow");
			 },function(response){
					$(".loader").fadeOut("slow");
				});
			$scope.changetemp=0;
			
		};
		//-------to create interview log entry------
		$scope.generateInterview = function(){
			Admin_Service.generateInterview($scope.userIdInterview,$scope.jobIdInterview,$rootScope.userdetails.id).then(function(response){
				 $scope.generateInterviewId =response.data;
				
			 },function(response){
				});
		};
		
		$scope.changetemp=0;
		$scope.OnChangeTemplate = function(temp){
			 
			if($scope.templateQuestion.length > 0 && $scope.changetemp==0)
				{
				$('#changeTemplate').modal({
				    backdrop: 'static',
				    keyboard: false
				});
				$("#examselector").attr('disabled', 'disabled');
				$("#changeTemplate").modal("show");
				
				}
			else
				{
				requestVideo();
				$("#examselector").removeAttr('disabled');
				}
			
		};
		$scope.enabledTemp= function()
		{
			$("#examselector").removeAttr('disabled');
			$("#changeTemplate").modal('hide');
			
		};
		$scope.saveInteriewAns = function(template){
			$(".loader").show();
			for (var i=0;i<$scope.templateQuestion.length;i++)
				{
			$scope.templateQuestion[i].createdby=$rootScope.userdetails.id;
			$scope.templateQuestion[i].jobid=$scope.jobIdInterview;
			$scope.templateQuestion[i].userid=$scope.userIdInterview;
			$scope.templateQuestion[i].interviewId=$scope.generateInterviewId
				}
			Admin_Service.saveInteriewAns($scope.templateQuestion).then(function(response){
				 $scope.flagForAns =response.data;
				 
				 if( $scope.flagForAns.indexOf("success")!=-1){
	    			 GlobalModule_notificationService.notification("success","Saved Successfully ");
	    			 $state.go("restricted.admin.appliedjobs");
	    		 }
				 $(".loader").fadeOut("slow");
				 
			 },function(response){
					$(".loader").fadeOut("slow");
				});
			
		};
		var submitvideo = 0;
		var videosubmit =false;
		$scope.submitInteview = function()
		{
			$(".loader").show();
			if(submitvideo==1)
				{
				videosubmit=true;
				stopRecording();
				}else{
			$(".loader").show();
			 location.reload();
			 $('#examselector').modal('hide');
			 $(".Interview-que").modal('hide');
				}
		};
		
		$scope.recognizing=false;
		
		$scope.transalate = function(check){
			var index=-1;
			
			var a=check;
			//alert(check);
			$scope.recognizing=false;
			if (window.hasOwnProperty('webkitSpeechRecognition')) {

	             var recognition = new webkitSpeechRecognition();
	             recognition.continuous = false;
	             recognition.interimResults = false;
	            // Initialize();
	             recognition.lang = "en-US";
			/*for(var i=0;i<($scope.templateQuestion.length);i++)
				{*/
				$(".speaker"+a).hide();
			
			     if($("#ans-switch"+a).is(":checked")) {
			    	 index=a;
			    	 
			    	 var append= $('#transcript'+a).val();
			    	 $('#erase').prop('disabled', true);
			         $(".speaker"+a).show();
			         recognition.start();
			         $scope.recognizing=true;
			        
			         recognition.onresult = function(e) {
			         var ans=e.results[0][0].transcript;
			         $('#transcript'+a).val(append+" "+ans);
			         $scope.templateQuestion[check-1].answer=append+" "+ans;
			        // answer=answer+" "+append+" "+ans;
			              recognition.stop();
			         };
			         recognition.onend = function() {
			        	// recognition.start();
			        	 if($scope.recognizing==true){
			        	 $scope.transalate(check);
			        	 }
			        	
			        	};
			         recognition.onerror = function(e) {
			         recognition.stop();
			        	//$(".speaker"+a).hide();
			         }

			     	} else {
			        $(".speaker"+a).hide();
			       if($scope.recognizing==true)
			    	   {
			    	   recognition.stop();
			    	   $scope.recognizing=false;
			    	   $('#erase').prop('disabled', false);
			    	   }	 
			     }
			//	}
			
				}
		};
		
	  /* ---------video upload----------*/
		

		$scope.uploadvideo = function(data,videoName)
		{
			/*var data= $('#video').attr('src');*/
			//var data=$('#ul').find('a').attr('href');
			$(".loader").show();
			var hrf =   $('#ul').find('a').attr('download');
			var input = document.getElementById('imgInp');
				var created=$rootScope.userdetails.id;
				var formData = new FormData();
				formData.append("file",data);
				formData.append("file-name",videoName);
				//formData.append("questionId",questionId);
				formData.append("userid",$scope.userIdInterview);
				formData.append("jobId", $scope.jobIdInterview);
				formData.append("createdId",created);
				formData.append("interviewId", $scope.generateInterviewId);					
				
				$.ajax({
						url: 'rest/admin/upload/video',
						type: 'POST',
						data: formData,
						
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (response) {
							submitvideo=0;
							
							$(".loader").fadeOut("slow");
							if(videosubmit==true)
								{
								videosubmit=false;
								$(".loader").fadeOut("slow");
								location.reload();
								}
							//  GlobalModule_notificationService.notification("success","video save Successfully !!"); 
						}
					});
							
				$(".loader").fadeOut("slow");
		};
		
		$scope.checkboxstatus = function()
		{
			//alert($scope.currentPage);
			if( $scope.recognizing==true)
				{
       		 recognition.stop();
       		$scope.recognizing=false;
				}
			for(var i=0;i<($scope.templateQuestion.length);i++)
			{
				$('#ans-switch'+i).prop('checked', false);
				$(".speaker"+i).hide();
			}
		}
		
		$scope.deleteAns =function(id)
		{
			 $('#transcript'+id).val('');
			 $scope.templateQuestion[id-1].answer="";
		};
		
		//----Pagination for interview
		$scope.currentPage = 1;
	   
		//-----interview log---
		$scope.vedioflag=1;
		$scope.showvidolist = function(id)
		{
			//alert(id);
			$scope.vedioflag=id;
			if(id==1){					
				$scope.fetchInterViewVideoPath($scope.interviewId);
				document.getElementById("showvidolist1").setAttribute("class", "active"); 
				document.getElementById("showvidolist2").setAttribute("class", "");
				document.getElementById("showvidolist3").setAttribute("class", "");
			}
			if(id == 2){					
				$scope.xpath=[];
				document.getElementById("showvidolist2").setAttribute("class", "active"); 
				document.getElementById("showvidolist1").setAttribute("class", "");
				document.getElementById("showvidolist3").setAttribute("class", "");
				}
			
			if(id == 3){
				document.getElementById("showvidolist3").setAttribute("class", "active"); 
				document.getElementById("showvidolist1").setAttribute("class", "");
				document.getElementById("showvidolist2").setAttribute("class", "");
			}
			
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
		
		$scope.Activeflag=function(){
			document.getElementById("showvidolist3").setAttribute("class", ""); 
		};
		 
		$scope.showvideopath = function(x){
			$scope.xpath=[];
			var path = x.filepath;
			 
			if(path.includes("amazonaws"))
			   {
				$rootScope.getSignedURL(path).then(function(response){
					x.filepathsigned = response.data;
					$scope.xpath.push(x);
				},function(response){
					Common_Service.errorResponseHandler(response);
				});
			   } 				
		};
		
		
		$scope.time={};
		$scope.sharableLink="";			
		$scope.getpath = function(x){				
			$scope.PathObject = x;
			$scope.time={};
			$scope.sharableLink="";				 
		};
		
		$scope.setLinkVariable = function(){
			$scope.showspanFlag = false;
		};
		
		$scope.showspanFlag = false;
		 
		$scope.getSharableLink = function(time){
			 $(".loader").show();
			$scope.currentTime = moment(new Date()).unix();			 
			 
			$scope.videoId = $scope.PathObject.id; 
			
			$scope.showspanFlag = true;				
			if(time.hours==0 && time.minute == 0){
				GlobalModule_notificationService.notification("error","Please enter valid time set");
			}else{
				$scope.min = time.hours * 60 + time.minute;
				//$scope.sharableVideoPath($scope.PathObject,$scope.min);
			} 	 
			
			//SENDING mail as well as storing into db
			  Admin_Service.EmailSecretUrl(time.email,$scope.currentTime,$scope.videoId,$scope.min,$rootScope.userdetails.id).then(function(response){
				  $scope.EmailSecretUrlResponse = response.data; 
				  $(".loader").fadeOut("slow");
			 if($scope.EmailSecretUrlResponse == "success"){
				  GlobalModule_notificationService.notification("success","Secret link is successfully sent!");					 
			 }
				});
		
		};
		
		$scope.sharableVideoPath = function(x,time){
			
			var path = x.filepath;
			 
			if(path.includes("amazonaws"))
			   {
				$rootScope.getSignedURLcustomTime(path,time).then(function(response){
					x.filepathsigned = response.data;
					  $scope.sharableLink = response.data;
				},function(response){
					Common_Service.errorResponseHandler(response);
				});
			   } 	
			
		};
		
		 
		$scope.fetchinterviewListForUser =function(offset,limit,colName,order,search,userId){
			  $(".loader").show();
			  $scope.xpath=[];
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
				
			  Admin_Service.fetchInterviewListForUser(offset,limit,colName,order,$scope.userIdInterview).then(function(response){
				  $scope.interviewListForUser = response.data;	
				   
				  $(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				});
		  };
		  
		  $scope.SortinginterviewList = function(colName){
			  $scope.offset =0 ;
				$scope.start = 0;
			  $scope.colName=colName;
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.colName==null)
				  {
				  $scope.colName= undefined; 
				  }
				$scope.fetchinterviewListForUser(0,100,$scope.colName,$scope.order,$scope.userIdInterview);	
			};
		
			$scope.fetchInterviewAns = function(j)
			{
				$scope.createdDate=j.createdDate;
				$scope.tempName=j.name;
				$scope.positionNamefordetail=j.position.name;
				$scope.interviewShowFlag=3;
				$(".loader").show();
				
				Admin_Service.fetchInterviewAns(j.id,$scope.userIdInterview,$scope.jobIdInterview,j.interviewId).then(function(response){
					 $scope.interviewQuesAns =response.data;
					 $scope.vedioflag=1;
					 document.getElementById("showvidolist1").setAttribute("class", "active"); 
						document.getElementById("showvidolist2").setAttribute("class", "");
					 $(".loader").fadeOut("slow");
				 },function(response){
						$(".loader").fadeOut("slow");
					});			
				$scope.interviewId=j.interviewId;
				$scope.fetchInterViewVideoPath(j.interviewId);
			};
			
			$scope.fetchInterViewVideoPath = function(interviewId){
				Admin_Service.fetchInterViewVideoPath(interviewId).then(function(response){
					 $scope.InterViewVideoPath = response.data;
					 //console.log($scope.InterViewVideoPath);
					 $scope.xpath=[];
						var path = $scope.InterViewVideoPath[0].filepath;
						 
						if(path.includes("amazonaws"))
						   {
							$rootScope.getSignedURL(path).then(function(response){
								$scope.InterViewVideoPath[0].filepathsigned = response.data;
								$scope.xpath.push($scope.InterViewVideoPath[0]);
							},function(response){
								Common_Service.errorResponseHandler(response);
							});
						   }
				});
			};
			
			$scope.clearInterviewlog = function(id){
				$scope.xpath=[];
				if(id==1)
					{
					$('#interview-sch').hide();
					$('.modal-backdrop').hide();
					$scope.interviewTemplates=[];
					$("#video-part").hide();
					}
				//document.getElementById("video-part").setAttribute("style", "display: none !important;");
				
			};
	    //-----interview End------
					 	
		 $scope.enableDisableToDo= function(id,jobId){
			 				 
			 $scope.flag=false;
			 for(var i=0;i<$scope.appliedJobs.length;i++){
				 
			 if($scope.appliedJobs[i].userid == id && $scope.appliedJobs[i].status == 'Selected' && $scope.appliedJobs[i].jobId==jobId)
				 {
				 $scope.flag=true;    
				 return;
				 }				 
			 }				 
		 };			 
		 
		 $scope.reload = function(){
			 $scope.communicationmanager={};
				$scope.tmptpreview = null;	    				
				$('#comm-manager').modal("hide");
				$scope.Slotflag = false;
		 }; 
	
	   
	   //--------assessment assigne-----------
		 
		 
$scope.fetchbrandlist = function(){					 
	assessEngine_Service.fetchbrandlist().then(function(response){
		 $scope.brandlist=response.data;				 
	  }); 
 };$scope.fetchbrandlist(); 	 

 $scope.fetchdepartmentlist = function(){					 
			assessEngine_Service.fetchdepartmentlist().then(function(response){
				 $scope.departmentlist=response.data;	
			  }); 
		 };$scope.fetchdepartmentlist();
		 
 $scope.fetchpositionlist = function(deptId){					 
				assessEngine_Service.fetchpositionlist(deptId).then(function(response){
					 $scope.positionlist=response.data;	
				  }); 
			 }; 

 $scope.fetchAssessmentMaster = function(offset,limit,colName,order,search,brandId,departId,positionId,shipId){		
	 $(".loader").show();
	  if(search=="" || search==null)
		  {
		  search= undefined;
		  }
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		 
		 //only self Assessment false 'coz self assessment cant be assigne
	 Master_Service.fetchAssessmentToAssigne(offset,limit,colName,order,search,brandId,departId,positionId,shipId).then(function(response){
		 $scope.assessmentList=response.data;
		 //console.log($scope.assessmentList);
		 $(".loader").fadeOut("slow");
	  });
 };	 	 
 
 $scope.SortingAssessmentMasterList = function(colName,searchterm){
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
		$scope.fetchAssessmentMaster(0,1000,$scope.colName,$scope.order,$scope.search,0,0,0,0);	
	};
 
	 
 $scope.applyFilter = function(data){	
	 
	 if(data === undefined){			 
		 GlobalModule_notificationService.notification("error","please select filter data!");			 
	 }		 
	
	 if(data != undefined){		 
		 
		 if(data.brand == undefined || data.brand == ""){
			 data.brand = 0;
		 }
		 if(data.department == undefined || data.department == ""){
			 data.department = 0;
		 }
		 if(data.position == undefined || data.position == ""){
			 data.position = 0;
		 }			 
		 
		 $scope.fetchAssessmentMaster(0,1000,null,null,null,data.brand,data.department,data.position,0);
	 }		 
 };
 
 $scope.Userdata = [];
 $scope.saveuserlist = function(UserID,answers,rolId,refno){	
	  
	 var duplicateFlag = false;
     for(var i=0; i<$scope.Userdata.length; i++){
    	 if($scope.Userdata[i].id == UserID){	    		
    		 var duplicateFlag = true;
    	 }
     }  
     if(duplicateFlag == false && answers==true){
    	 $scope.Userdata.push({id:UserID,roleId:rolId});
    	 }
     
     if(answers == false || answers==undefined){
    	 for(var i=0; i<$scope.Userdata.length; i++){
	    	 if($scope.Userdata[i].id == UserID){		    		 
	    		 $scope.Userdata.splice(i, 1);		    		 
	    	 }
	     }  
    	 $('#'+refno+'').prop('checked', false);
     }
    
 };
 
 $scope.checkedall =function(all){ 
		
	 if(all == true){
		 for(var i=0;i<$scope.appliedJobs.length;i++){
			 var m=0;
			 for(var j=0;j<$scope.Userdata.length;j++){
			 if($scope.Userdata[j].id == $scope.appliedJobs[i].userid){
				 m++;
			 }
			
			 
			 }
			 if(m == 0)
			 {
					 $scope.Userdata.push({id:$scope.appliedJobs[i].userid,roleId:$scope.appliedJobs[i].user.roleId});
					 $scope.usersdetailforEmail.push({id:$scope.appliedJobs[i].userid,rolId:$scope.appliedJobs[i].user.roleId});
			}
		 }
		 
	 }else{ 
		 for(var i=0;i<$scope.Userdata.length;i++){
			 for(var j=0;j<$scope.appliedJobs.length;j++){
				 
				  if($scope.Userdata[i].id == $scope.appliedJobs[j].userid){
						 $scope.Userdata.splice(i, 1);		
						 $('#'+'C-'+$scope.appliedJobs[j].userid+'').prop('checked', false);
					  }
				  
				  if($scope.usersdetailforEmail[i].id == $scope.appliedJobs[j].userid){
						  $scope.usersdetailforEmail.splice(i, 1);		
						 $('#'+'C-'+$scope.appliedJobs[j].userid+'').prop('checked', false);
					  }
		  
		 }
			 }
	 } 
	 
 };
 
$scope.selectedcandinate =function(){		
	$(".loader").show();
	 $('#print_candidates').modal("show");
	
	 Admin_Service.fetchselectedUserData($scope.Userdata).then(function(response){
		  $scope.selectedUserData = response.data;
		  $(".loader").fadeOut("slow");
		  console.log($scope.selectedUserData);
	});  
};
  
$scope.removefromlist=function(index,refno){		
	
	 
	 $scope.Userdata.splice(index,1);
	 
	 $('#'+refno+'').prop('checked', false);
	 $scope.selectedcandinate();
	 
	 console.log($scope.Userdata);
};
$scope.checkIds=function(refno,userId){	
	 
	for(var i=0;i<$scope.Userdata.length;i++){
		if($scope.Userdata[i].id == userId){
			$('#'+refno+'').prop('checked', true);
		}
	} 
}; 


 $scope.selected = function(assessmentData,id){			 
	$(".back-tr").removeClass("back-tr");
	$('#back-tr'+id).addClass('back-tr');		
	 $scope.assessmentData = assessmentData;		  
 };
 
 $scope.assignAssessment = function(){
	 $scope.Validator = true;
	 if($("#assessDate").data('date') == undefined){
		 GlobalModule_notificationService.notification("error","please select date");
		 $scope.Validator = false;
	 } 	 
	 if($scope.assessmentData == undefined){
		 GlobalModule_notificationService.notification("error","please select Assesment");
		 $scope.Validator = false;
	 }
	 
	 if($scope.Validator == true){
	 $scope.assessmentId=$scope.assessmentData.id;			 
	 $scope.date = $("#assessDate").data('date');    	
	 $scope.assessmentDate = moment($scope.date, 'DD-MM-YYYY').unix();		
	 
	 Admin_Service.assignAssessment($scope.Userdata,$scope.assessmentId,$scope.assessmentDate).then(function(response){
		  var result = response.data;		
		  if(result == "success"){
			  GlobalModule_notificationService.notification("success","Assessment successfully assigned to user");
			  $('#assigned-assessments-modal').modal("hide");
		  }else{
			  if(result == "Duplicate"){
				  GlobalModule_notificationService.notification("error","Assessment already assigned to one or more users.It will not be assigned again");
			  }else{
				  GlobalModule_notificationService.notification("error","Assessment is not assigned to user");
			  }
		  }
		  
		  $scope.date = null;
		  $scope.data.brand =null;
		  $scope.data.department = null;
		  $scope.data.position = null;
		  
		  
	}); }
 };
 
 $scope.clearmodal = function(){ 
	 $('#assigned-assessments-modal').modal("hide");
	  $scope.date = null;
	  $scope.data.brand = null;
	  $scope.data.department = null;
	  $scope.data.position = null;
 };
 
 $scope.checkUserforAssessmentModal = function(){
		
		if($scope.usersdetailforEmail.length == 0){
			GlobalModule_notificationService.notification("error","Please select users");
		}else{
			 $('#assigned-assessments-modal').modal('show');
		}				
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
	
	 $scope.generateExcel = function(){		 
		  if($scope.search == undefined){
			  $scope.search ="";
		  }			 
		  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+1+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  };
	  
	  
	  //----------------------------------
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
	  		 
	  /*$scope.showAudioTrack=function(q,index){
		  
		  $scope.media=index;			  				
		  
		  $scope.isVoiceEnabledFlag=q.isVoiceEnabled;
		  
		  $scope.mediaLink = q.audioAns;			  														
			
		};*/
	  $scope.showThisBigImage = function(imagePath){
		  $scope.bigImage=imagePath;
	  };
	  //----------------
	  
	  $scope.generatedSignUrl = function(index){
		   
			if($scope.QuestionAnsList[index].audioAns.includes("amazonaws"))
		   {
				$(".loader").show();
			$rootScope.getSignedURL($scope.QuestionAnsList[index].audioAns).then(function(response){
				$scope.QuestionAnsList[index].audioAns=response.data;
				console.log($scope.QuestionAnsList);
				$(".loader").fadeOut("slow");
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		   }
			
		};
		
		$scope.displayUserAssessmentMedia = function()
		{
			for(var i=0;i<$scope.QuestionAnsList.length;i++){
			 var audio = document.getElementById("audioMedia"+i);
			 if(audio != null || audio != undefined)
			 audio.load();
			}
			
		};
	
		$scope.enableDisableToDo= function(id,jobId){
			 
			 $scope.flag=false;
			 for(var i=0;i<$scope.appliedJobs.length;i++){
				 
			 if($scope.appliedJobs[i].userid == id && $scope.appliedJobs[i].status == 'Selected' && $scope.appliedJobs[i].jobId==jobId)
				 {
				 $scope.flag=true;    
				 return;
				 }				 
			 }				 
		 };	
		
}]);