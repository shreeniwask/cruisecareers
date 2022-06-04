'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Employee_List_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Customer_Service','assessEngine_Service','Master_Service','Employee_List_Service','Employee_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Customer_Service,assessEngine_Service,Master_Service,Employee_List_Service,Employee_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log("cishal");
	console.log($rootScope.userdetails );
	$scope.empId=GlobalModule_dataStoreService.loadData('LoginModule','empId');
	$scope.employeeflag=GlobalModule_dataStoreService.loadData('LoginModule','employeeflag');
	$scope.senderId=$rootScope.userdetails.id;
	
	//alert($scope.empId);
	//alert($scope.flag);
	
	$scope.slots={};
	$scope.slot={};
	$scope.Slotid=0;
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.removeusersBySlotId={};
	$scope.selectedEvent;
	
	/*----------------Column Settings----------------*/
	$scope.getSettings = function(){
		Admin_Service.getSettings($rootScope.userdetails.id,6).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Name' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Emp. No.' || $scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='Date of Employment' || $scope.columnlist[j].name=='Selected Position' || $scope.columnlist[j].name=='Current Position' || $scope.columnlist[j].name=='Location'){
									$scope.columnlist[j].isActive=true;
								}
							}
						}
						if($scope.columnlist[i].isActive==true)
							{
							count++;
							}
					}
			
		if(count==$scope.columnlist.length)
			{
			$scope.colcheck=true;
			}else{
				$scope.colcheck=false;
			}
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	};
	$scope.getSettings();
	
	$scope.savesettings = function(){
		var count=0;
		for(var i=0;i<$scope.columnlist.length;i++){
			if($scope.columnlist[i].isActive==true)
				{
				count++;
				}
		}

		if(count==$scope.columnlist.length)
		{
		$scope.colcheck=true;
		}else{
			$scope.colcheck=false;
		}	
		Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
			  $scope.savesetFlag = response.data;	
		});
	};
	
			$scope.activeColumn = function(columnName)
			{
				if($scope.columnlist != undefined){
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
						return true;
				}
				}
				return false;
			};
	
	
	$scope.selectAllColoumns = function(check)
	{
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Name' || $scope.columnlist[i].name=='Emp. No.'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
	};
	/*----------------Column Settings END----------------*/
	
	
	/*----------------Employee List----------------*/
	$scope.employeeList = [];
	  $scope.fetchEmployeeList = function(offset,limit,colName,order,search){
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
			
		  
			 Employee_List_Service.fetchEmployeeList(offset,limit,colName,order,search).then(function(response){
			  $scope.employeeList = response.data;
			 //console.log($scope.employeeList);
			  
			  
			  console.log($scope.employeeList);
			  if($scope.employeeList.length == 0){
				  GlobalModule_notificationService.notification("error","Please enter valid input");
				  return;
			  }
			  $('#rd').prop('checked', false);
			  
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchEmployeeList(0,10,null,null,null);
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchEmployeeList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getEmployeeListcount=function(searchterm){
			$(".loader").show();
			
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
			
			 Employee_List_Service.getEmployeeListcount($scope.search).then(function(response){
				
				$scope.count = response.data;
				
				
				 
				  console.log($scope.count);
				  if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getEmployeeListcount(null);
		
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
	        $scope.fetchEmployeeList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
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
	 			$scope.fetchEmployeeList(0,10,$scope.colName,$scope.order,$scope.search);
	 			
	 		};
	    /*----------------Employee List END----------------*/
	    
	    //fetch modes of communication
	    
	    $scope.fetchCommunicationModes = function(){
	    	$(".loader").show();
	    	Admin_Service.fetchCommunicationModes().then(function(response){
				  $scope.modesList = response.data;
				  $(".loader").fadeOut("slow");	
			},function(response){
				$(".loader").fadeOut("slow");	
				});
	    	
	    };
	    $scope.fetchCommunicationModes();
	    
	    
	    $scope.fetchTmplttypeslist= function(id){
	    
	    	$(".loader").show();	 
	    	$scope.modeid=id;
	    	Admin_Service.fetchTemplatetypeList(id).then(function(response){	    		
	    		$scope.temptypelist=response.data;	    		
	    		$(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");	
	    	});
	    };
	    
	 
	   
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
	    			
	    			$scope.EventSolts[i] = $scope.UserEventsAndSlots[i].name +" - "+ $scope.UserEventsAndSlots[i].dateTime; 
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
	   
	    $scope.getuserforemail= function(userid,jobid,jname,status,rolId,emplnumber){	    	
	    	$scope.usersDetailsForEmail ={};
	    	$scope.usersDetailsForEmail.userid = userid;
	    	$scope.usersDetailsForEmail.id = jobid;	  
	    	$scope.usersDetailsForEmail.status = status;
	    	$scope.usersDetailsForEmail.rolId=rolId;
	    	$scope.usersDetailsForEmail.employeeNo=emplnumber
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
     
     $scope.stateChanged = function (answers,userid,jobid,jname,status,rolId,emplnumber) {   
    	
    	 $scope.selectedUserId = userid;   	 
    	 
    	   if(answers){ //If it is checked
    		   $scope.getuserforemail(userid,jobid,jname,status,rolId,emplnumber);
    	   }else{
    		  for(var i=0;i<$scope.usersdetailforEmail.length;i++){
    				           if ($scope.usersdetailforEmail[i].id == jobid) 
    				           {
    				           	 $scope.usersdetailforEmail.splice(i, 1);
    				           }
    				       };
    	   }    	
    	   
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
			
			
			$scope.fetchSelectJobDetailsOfEmployee= function(employeeid){
				$scope.useridforjob = $scope.employeeData.user.id;
				Employee_List_Service.fetchSelectJobDetailsOfEmployee(employeeid,$scope.useridforjob).then(function(response){					  
					  $scope.employejobDetails = response.data; 	
					 console.log($scope.employejobDetails);
					 
					  
				})
			};
			
			//$scope.orderByLocation();
			$scope.applicationStatus=true;
	    $scope.userdata = function(j){
	    	
	    	$(".loader").show();
	    	console.log(j)
	    	console.log(88888888888888888)
	    	$scope.userinfo=j;
	    	$scope.showflag= 1;
	    	document.getElementById("list1").setAttribute("class", "active"); 
	    	 for (var i=2;i<=10;i++)
			  {
				  document.getElementById("list"+i).setAttribute("class", ""); 
			  }
	    	 $scope.applicationStatus=true;
	    	$scope.fetchUserProfileDetails(j.user.id);
	    	$scope.fetchProfileCompletion(j.user.id);
	    	//$scope.fetchUserRatings(j.user.id,j.jobId);
	        $scope.communicatioLogList(j.user.id);
	        $scope.schedulerLogList(j.user.id);
	        //$scope.fetchrequisitionListForUser(0,100,null,null,null,j.jobId);
	        //$scope.status=j.status;
	    	$scope.username = j.user.name;	  
	    	$scope.location = j.user.location;
	    	$scope.id = j.user.id;
	    	$scope.roleId=j.user.roleId;
	    	
	    	$scope.jobId = j.jobId; 
	    	$scope.userAppliedJobId=j.id;
	    	$scope.emp_num=j.empl_number;
	    	console.log($scope.emp_num);
	    	$scope.fetchSelectJobDetailsOfEmployee($scope.emp_num);
	    	$(".loader").fadeOut("slow");	    
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
		    
		    
		    
		    $scope.assessmentFlag = 2;
		    $scope.AssessmentFlag = function(data){		    	
		    	
		    	if(data == 2){
		    		$scope.fetchAssignAssessment($scope.id,$scope.roleId);
		    		$scope.assessmentFlag = 2;
		    	}
		    	if(data == 3){
		    		$scope.assessmentFlag = 3;
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
		    	 
		    	 
		    	 //console.log(assessmentObj);
		    	 Admin_Service.fetchQuestionAns(assessmentObj,$scope.id,$scope.selecttabflag).then(function(response){					  
					  $scope.QuestionAnsList = response.data; 
					  
					  for(var i=0;i<$scope.QuestionAnsList.length;i++){
						  $scope.QuestionAnsList[i].shortAnsScore = $scope.FormateAnsScore($scope.QuestionAnsList[i].shortAnsScore);
					  }
					  $(".loader").fadeOut("slow");	  
					  				 
			});	
		    	 $(".loader").fadeOut("slow");	
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
		   
	    	
	    /*$scope.appliedJobAssessmentLog = function(jobId){		    	
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
	    $scope.appliedJobAssessmentLog($scope.jobId);*/	 	    
	   
	    $scope.fetchAssignAssessment = function(userId,roleId){
	    	
	    	$scope.assignAssessmentSave = false;
	    	$(".loader").show();		    	
			  Admin_Service.fetchAssignAssessment(userId,roleId).then(function(response){					  
					  $scope.AssignAssessmentList = response.data; 		  
					  
					  //console.log($scope.AssignAssessmentList);
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
		  
		 /* $scope.fetchUserRatings = function(id,jobId){	
		    	$(".loader").show();
		    	
				  Admin_Service.fetchUserRatings(id,jobId).then(function(response){	 				  
					  $scope.ratingPercent = response.data;	 
					  $('.chartnew').data('easyPieChart').update($scope.ratingPercent);
					  $(".loader").fadeOut("slow");	
				});
			  };*/
	
		  $scope.fetchUserProfileDetails = function(id){
			  $(".loader").show();
			  $scope.edituserid=id;
			  $scope.profFlag=false;
			  
			  Admin_Service.fetchUserProfileDetails(id).then(function(response){	 
				  $scope.useralldata = response.data;
				  console.log($scope.useralldata);
				  $scope.usercompliancelist = $scope.useralldata.userComplianceList;
				  $scope.userworklist = $scope.useralldata.userWorkList;
				  
				  if($scope.userworklist != null && $scope.userworklist.length>0)
					  $scope.profFlag=true;
				  
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
			  for (var i=1;i<=13;i++)
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
			
			$scope.complianceFlag=false;
			
			  Admin_Service.appliedJobComplianceLog(id).then(function(response){	 			 
			  $scope.compliancelog = response.data;	
				console.log($scope.compliancelog);
			  if($scope.compliancelog != null && $scope.compliancelog.length>0)
				  $scope.complianceFlag=true;
			  
			  $(".loader").fadeOut("slow");			  
			},function(response){	
				$(".loader").fadeOut("slow");		
				});
			 };
		  
			 $scope.appliedJobEducationalInfo = function(id){
				 $(".loader").show();
				 $scope.educationFlag=false;
				 
				 Admin_Service.appliedJobEducationalInfo(id).then(function(response){	 			 
					  $scope.educationalInfo = response.data;
					  
					  if($scope.educationalInfo != null && $scope.educationalInfo.length > 0)
						  $scope.educationFlag=true;
					  
					  $(".loader").fadeOut("slow");
					},function(response){	
						$(".loader").fadeOut("slow");	
						});				 
			 };
			 
			 $scope.appliedJobContactInfo = function(id){
				 $(".loader").show();
				 $scope.contactFlag=false;
				 Admin_Service.appliedJobContactInfo(id).then(function(response){	 			 
					  $scope.contactInfo = response.data;
					  if($scope.contactInfo != null && $scope.contactInfo.length>0)
					  $scope.contactFlag=true;
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
				$scope.templateid=templateid;	
				
				if($scope.Slotflag == false){
					$scope.eventName = "";
				    $scope.slotTime = "";
				}
				
				
				 if($scope.usersdetailforEmail.length != 0){
				 $(".loader").show();
				 
					$scope.usersdetailforEmail[0].eventName = $scope.eventName;
			    	$scope.usersdetailforEmail[0].slotTime = $scope.slotTime;
			    	
			    	
				 Admin_Service.sendEmailtoUsers($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id).then(function(response){	 	
					
					 $scope.userdetails.id=$rootScope.userdetails.id;
					
					 Admin_Service.addEmailmanagerEntry($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id);
					 GlobalModule_notificationService.notification("success","Woo Hoo! Email has been sent successfully");
					 $scope.Userdata ;
					 $scope.usersdetailforEmail=[];
					 if($scope.Userdata != null){
						 for(var i=0;i<$scope.Userdata.length;i++){
						 var empno=$scope.Userdata[i].empId;
						
						 $('#'+empno+'').prop('checked', false);
					 }
					 }
					 $scope.Userdata=[];
					 
					 
					 
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
			
		/*	$scope.communicatioLogList = function(id){
				
				$scope.commFlag=false;
				 Admin_Service.getcommunicatioLogList(id).then(function(response){
					 $scope.comLogList = response.data;
					 	
				 });
			};*/
		
		$scope.cancelAssignment=function()
		{
			$scope.clearEvent();
		};
		
		$scope.assignslotstouser=function(id){
		
			
			$state.go("restricted.admin.employeelist");
			
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
			$scope.slot.userdetails = $scope.usersdetailforEmail;
			if($scope.sloteventId==0)
				{
				GlobalModule_notificationService.notification("error","Please select slot");
				}
			else{
			Admin_Service.assignslotstouser($scope.slot).then(function(response){
				$scope.flaguser=response.data;	
				$scope.sloteventId=0;
				if($scope.flaguser == 'success'){
					Admin_Service.insertScheduleEventSlots($scope.slot).then(function(response){
						$scope.flag=response.data;
						console.log("inserted in scheduler queue table");
						 for(var i=0;i<$scope.Userdata.length;i++){
							 var empno=$scope.Userdata[i].empId;
							
							 $('#'+empno+'').prop('checked', false);
						 }
	 					$(".loader").fadeOut("slow");
					},function(response){		
						 GlobalModule_notificationService.notification("error","Uh Oh! Error while inserting candidate eventslots");
						 $scope.usersdetailforEmail=[];
						$(".loader").fadeOut("slow");	
						});	
					 GlobalModule_notificationService.notification("success","Users assigned successfully ");
				}else{
					 GlobalModule_notificationService.notification("error","Users not assigned successfully");
				}
			 });
			}
				}
			};
		};
		
		$scope.fetchusersBysltId=function(id){
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
	     
	   
		 
		 
	
						
							 
					
						     
		
					 
		 $scope.getUserActivityList=function(id){
			/* $scope.userid=$scope.edituserid;*/
			 $scope.activityFlag=false;
			 
			 Admin_Service.getUserActivityList(id).then(function(response){
				 $scope.useractivityList=response.data;	
				 
				 if($scope.useractivityList != null && $scope.useractivityList.length > 0)
					 $scope.activityFlag=true;
			
			 });			
		 } ;
		 
		 $scope.communicatioLogList = function(id){
			 $scope.commFlag=false;
				Admin_Service.getcommunicatioLogList(id).then(function(response){
					$scope.comLogList = response.data;
					
					//console.log($scope.comLogList);
					 if($scope.comLogList != null && $scope.comLogList.length > 0)
						 $scope.commFlag=true;

				});
			};

			$scope.schedulerLogList = function(id){

				$scope.schedularFlag=false;
				
				Admin_Service.getSchedulerLogList(id).then(function(response){
					$scope.scheLogList = response.data;
					
					if($scope.scheLogList != null && $scope.scheLogList.length > 0)
						$scope.schedularFlag=true;
				});
			};
			
			 $scope.formatDate = function(date){		     
		         var dateOut = moment(date,'DD/MM/YYYY').format("DD-MM-YYYY");
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
		   $scope.dateformate55 = function(date){
			   
			   if(date==null)
		    	 {
		    	 	return;
		    	 }
			   
		         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
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
			 
			 			 
			 $scope.fetchToDoList=function(id){
				 
				 $(".loader").show();
				 
				 $scope.toDoFlag=false;
				 
				 Employee_Service.fetchCompliancebyJob(id).then(function(response){
					  					 					
					  $scope.compliancesDetails = response.data;
					  
					  if($scope.compliancesDetails !=null && $scope.compliancesDetails.length>0)
						  $scope.toDoFlag=true;
					  
					  //console.log($scope.compliancesDetails);
					  
					  $(".loader").fadeOut("slow");				  					  
				  },function(response){
					  							
				});					  
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
		 
		 if(data.brand == undefined || data.brand == ""){
			 data.brand = 0;
		 }
		 if(data.department == undefined || data.department == ""){
			 data.department = 0;
		 }
		 if(data.position == undefined || data.position == ""){
			 data.position = 0;
		 }
		 if(data.ship == undefined || data.ship == ""){
			 data.ship = 0;
		 }	 
		 if(data == undefined){
			 GlobalModule_notificationService.notification("error","please select filter data!");			 
		 }
		 if(data != undefined){
			 $scope.fetchAssessmentMaster(0,1000,null,null,null,data.brand,data.department,data.position,data.ship);
		 }		 
	 };
	 
	 $scope.Userdata = [];
	 $scope.saveuserlist = function(UserID,answers,rolId,emplnumber){
		 
		 $scope.roleId=rolId;
		 
		 var duplicateFlag = false;
	     for(var i=0; i<$scope.Userdata.length; i++){
	    	 if($scope.Userdata[i].id == UserID){	    		
	    		 var duplicateFlag = true;
	    	 }
	     }  
	     if(duplicateFlag == false && answers==true){
	    	 $scope.Userdata.push({id:UserID,roleId:rolId,empId:emplnumber});}
	     
	     if(answers == false || answers==undefined){
	    	 for(var i=0; i<$scope.Userdata.length; i++){
		    	 if($scope.Userdata[i].id == UserID){		    		 
		    		 $scope.Userdata.splice(i, 1);		    		 
		    	 }
		     }  
	    	 $('#'+emplnumber+'').prop('checked', false);
	     }
	 };
	 
	 $scope.checkedcandidateids=[];
	  
		$scope.addCheckedcandidateId = function(id){			  
					  
			if($scope.checkedcandidateids.indexOf(id) !== -1)
			{		
				var array  = $scope.checkedcandidateids;
				var index = array.indexOf(id);
				$scope.checkedcandidateids.splice(index,1);
			}
			else
			{		    	
				$scope.checkedcandidateids.push(id);				      
			};						  
		};
		
		$scope.checkedAllList = function(employeeList,rd){
			
			if(rd == true || rd == undefined)
			{				 
				for(var i=0; i<employeeList.length; i++)
				{					  
					if($scope.checkedcandidateids.indexOf(employeeList[i].empl_number) !== -1)  
					{  						 
					}
					else
					{
						 $scope.addCheckedcandidateId(employeeList[i].empl_number);	
					}						  
				}			
			}
			else
			{
				$scope.checkedcandidateids=[];
			}
		};
		
		
		 $scope.selectedemployee =function(){		
				$(".loader").show();
				 $('#print_employees').modal("show");
				
				 Admin_Service.fetchselectedUserData($scope.Userdata).then(function(response){
					  $scope.selectedUserData = response.data;
					  $(".loader").fadeOut("slow");
					  //console.log($scope.selectedUserData);
				});  
			};
			  
			$scope.removefromlist=function(index,empno){		
				
				 
				 $scope.Userdata.splice(index,1);
				 
				 $('#'+empno+'').prop('checked', false);
				 $scope.selectedemployee();
				 
				 //console.log($scope.Userdata);
			};
			
		
			
			
		$scope.checkIds=function(emplnumber,userId){	
			
			for(var i=0;i<$scope.Userdata.length;i++){
				var empno=emplnumber;
				if($scope.Userdata[i].id == userId){
					$('#'+empno+'').prop('checked', true);
				}
				
			} 
		}; 
		
		 $scope.checkedall =function(all){ 
				
			 if(all == true){
				 for(var i=0;i<$scope.employeeList.length;i++){
					 var m=0;
					 for(var j=0;j<$scope.Userdata.length;j++){
					 if($scope.Userdata[j].id == $scope.employeeList[i].user.id){
						 m++;
					 }
					
					 
					 }
					 if(m == 0)
					 {
							 $scope.Userdata.push({id:$scope.employeeList[i].user.id,roleId:$scope.employeeList[i].user.roleId,empId:$scope.employeeList[i].empl_number});
							 $scope.usersdetailforEmail.push({employeeNo:$scope.employeeList[i].empl_number,id:$scope.employeeList[i].id,userid:$scope.employeeList[i].user.id,rolId:$scope.employeeList[i].user.roleId});
					}
				 }
				 
			 }else{ 
				 for(var i=0;i<$scope.Userdata.length;i++){
					 for(var j=0;j<$scope.employeeList.length;j++){
						 
						  if($scope.Userdata[i].id == $scope.employeeList[j].user.id){
								 $scope.Userdata.splice(i, 1);		
								 $('#'+$scope.employeeList[j].empl_number+'').prop('checked', false);
							  }
						  
						  if($scope.usersdetailforEmail[i].id == $scope.employeeList[j].user.id){
								  $scope.usersdetailforEmail.splice(i, 1);		
								 $('#'+$scope.employeeList[j].empl_number+'').prop('checked', false);
							  }
				  
				 }
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
		 
		 Admin_Service.assignAssessment($scope.Userdata,$scope.assessmentId,$scope.senderId,$scope.assessmentDate).then(function(response){
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
		
		$scope.currentPosting=function(posting,id){
			
			$(".loader").show();
	
			//var posting='current';
			$scope.showflag = 10;
			$scope.cPostingFlag=false;
			$scope.pPostingFlag=false;
			$scope.fPostingFlag=false;
			
			Employee_Service.fetchPostings(posting,id).then(function(response){
				
				 $scope.postings=response.data;
				 
				 console.log($scope.postings);
				
				 
				 if(posting == 'current')
				{
					
					 
					 $scope.currentFlag=true;
					 $scope.pastFlag=false;
					 $scope.futureFlag=false;
					 if($scope.postings != null && $scope.postings.length > 0)
						 $scope.cPostingFlag=true;
					 
					/* var tab31=angular.element(document.getElementById('activetab22'));		    	 	    	 
			    	 tab31.attr("class", "");		    	 
			    	 var tab21=angular.element(document.getElementById('activetab11'));
			    	 tab21.attr("class", "active");								    	 
			    	 var tab11=angular.element(document.getElementById('activetab33'));		
			    	 tab11.attr("class", "");*/
	    	 
				}
				 else if(posting == 'past')
				{
				 	 $scope.pastFlag=true;
				 	$scope.currentFlag=false;			
					 $scope.futureFlag=false;
					 
				 	 if($scope.postings != null && $scope.postings.length > 0)
						 $scope.pPostingFlag=true;
				 	 
				 	/*var tab31=angular.element(document.getElementById('activetab22'));		    	 	    	 
			    	 tab31.attr("class", "");		    	 
			    	 var tab21=angular.element(document.getElementById('activetab33'));
			    	 tab21.attr("class", "active");								    	 
			    	 var tab11=angular.element(document.getElementById('activetab11'));		
			    	 tab11.attr("class", "");	*/		    	 			    	 
				}
				 else if(posting == 'future')
				{
				 	 $scope.futureFlag=true;
				 	$scope.currentFlag=false;
					 $scope.pastFlag=false;
					
				 	 if($scope.postings != null && $scope.postings.length > 0)
						 $scope.fPostingFlag=true;
				 	 
				 	/*var tab31=angular.element(document.getElementById('activetab33'));		    	 	    	 
			    	 tab31.attr("class", "");		    	 
			    	 var tab21=angular.element(document.getElementById('activetab22'));
			    	 tab21.attr("class", "active");								    	 
			    	 var tab11=angular.element(document.getElementById('activetab11'));		
			    	 tab11.attr("class", "");*/
				}
				 
				//console.log($scope.postings);
				
				$(".loader").fadeOut("slow");
				
			},function(response){
				
			});
		};
		
		$scope.fetchShipList=function(id){
			
			assessEngine_Service.fetchshiplist(id).then(function(response){
				 $scope.shipsList=response.data;
				 //console.log($scope.shipsList);
				
			 });
			
		};
		
		$scope.SaveScore=function(){      
	    	 
			$(".loader").show();
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
			    	 $scope.AssessmentFlag(2);
			    	 $(".loader").fadeOut("slow");		 
		});		   
	    };
	    
	    $scope.FormateAnsScore=function(shortAnsScore){
	    	//alert(shortAnsScore);parseFloat parseInt
	    	var a = parseFloat(shortAnsScore);
	    	return a;
	    };
					
	    $scope.generateExcel = function(){		 
	    	 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+6+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));	 
		  };
		  
		  
		  
		  //----------------------------------
		  
		  $(document).ready(function() {
			  if($scope.assessmentTestImages != undefined)
			  {
			  for(var i=0;i<$scope.assessmentTestImages.length;i++) { 
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
		  
		  
		  $scope.getAssessmentTestImages = function(assessmentObj){
		    	$(".loader").show();
		    	$scope.assessmentTestImages=[];
		    	 Admin_Service.getAssessmentTestImages(assessmentObj.id,$scope.id).then(function(response){					  
					  $scope.assessmentTestImages = response.data; 	
					 		//console.log($scope.assessmentTestImages);
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
		  //------------------------
		
			$scope.openEmployeeDescription = function(j){
				
				GlobalModule_dataStoreService.storeData('LoginModule','employeeData',j);
				
				GlobalModule_dataStoreService.storeData('LoginModule','employeeflag',1);
				
				$state.go("restricted.admin.employeedescription");
				
			};
			
			if($scope.employeeflag == 1)
			{
				$scope.employeeData = GlobalModule_dataStoreService.loadData('LoginModule','employeeData');
				
				$scope.userdata($scope.employeeData);
			}
			
		if($scope.employeeflag == 2)
		{
			var fetchEmployeDetails = function(){
				//alert();
				Employee_List_Service.fetchEmployeDetails($scope.empId).then(function(response){					  
					  $scope.employeDetails = response.data; 	
					 
					 $scope.userdata($scope.employeDetails);  							 
			});
				
			};
			fetchEmployeDetails();
		}
		/* $scope.emptyDate=function(){
			 $scope.showflag=13;
			  $("#decisionDate").val('');
		  }*/
		
		 $scope.clear=function(){

			 $scope.useractivity = {
			 change_status_comment:"",
			   
			 };
			};
		
		$scope.saveResetStatus = function(useractivity,userid){
			$(".loader").show();

			 Admin_Service.saveResetStatus(useractivity,$rootScope.userdetails.id,userid).then(function(response){
				 $scope.resetstatus=response.data;	
				 if($scope.resetstatus == "success"){
					  $("#change_status").modal('hide');
					  GlobalModule_notificationService.notification("success","Employee has successfully changed to candidate ");
					
					  setTimeout(function(){
						  $state.go("restricted.admin.employeelist");
						  $(".modal-backdrop").hide();
						  },1000);
					  
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				   
			  }); 
		 };
	
		 $scope.refreshPage=function(){
			 $state.reload();
			 $(".modal-backdrop").hide();	
		 }
		 
			//fetch indos number 
			$scope.fetchIndosNumber = function(id){					
					
					Employee_List_Service.fetchIndosNumber(id).then(function(response){					  
						  var indosnumber1 = response.data; 
						  $scope.indosnumber = indosnumber1[0].indosNo;
						 //console.log($scope.indosnumber);
						  
					},function(response){
						 
					  });
					return;
				};	
				//fetch other indos number except passed empId
				$scope.fetchOtherIndosNumber = function(emplId){
					Employee_List_Service.fetchOtherIndosNumber(emplId).then(function(response){			
						$scope.indosNumbersList=response.data;
						//console.log($scope.indosNumbersList);
						$scope.saveindosnumber(emplId);//calling save indos number method
						
						
					});
					
				};
			//Save Indos Number	
			$scope.saveindosnumber = function(id){
				$(".loader").show();
				/*if($("#indosnumbertextbox").val() == ""){
					GlobalModule_notificationService.notification("error","Please Enter Indos Number");
					$(".loader").fadeOut("slow");
					return;
					}*/

				 for(var i=0;i<$scope.indosNumbersList.length;i++)
				  {  
					  if( $("#indosnumbertextbox").val() == $scope.indosNumbersList[i].indosNo && $scope.indosNumbers[i].indosNo != undefined && $scope.indosNumbers[i].indosNo != "" && $scope.indosNumbers[i].indosNo != null)
					  {
						  GlobalModule_notificationService.notification("error","INDoS Number already exist");
						  $(".loader").fadeOut("slow");
						  return;
					  }					  
				  }	
				 if($("#indosnumbertextbox").val() == ""){
					 $scope.indosnumbertextbox="undefined";
				 }else{
					 $scope.indosnumbertextbox=$("#indosnumbertextbox").val();
				 }
					
					
					 Admin_Service.saveindosnumber(id,$scope.indosnumbertextbox).then(function(response){	 			 
						  $scope.indosnumbercheck = response.data;	
						  //console.log($scope.indosnumbercheck);
						  if($scope.indosnumbercheck == "success"){
							  $scope.indosnumbertextbox=$("#indosnumbertextbox").val();
							 // GlobalModule_notificationService.notification("success","INDoS Number saved successfully");
						  }
						  
								 
								
							$state.reload();
						  $(".loader").fadeOut("slow");			  
						},function(response){	
							$(".loader").fadeOut("slow");		
							});
					
			};
		 
		  $scope.fetchMissingIndosNumber = function(){
			   	console.log("started");
			   	Employee_List_Service.fetchMissingIndosNumber().then(function(response){
					
					 $scope.missingindosnumberlist =response.data;
					 //console.log($scope.missingindosnumberlist);
					 $(".loader").fadeOut("slow");
				
				 },function(response){
					 $(".loader").fadeOut("slow");
					});
				
			};
		

}]);

