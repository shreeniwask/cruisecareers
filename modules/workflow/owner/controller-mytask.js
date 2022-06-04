'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('mytask_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','MyTask_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,MyTask_Service,Admin_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	var myTaskList=[];
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.selectedEventId =-1;
	
	//console.log($rootScope.userdetails);
	
	$scope.fetchMyTaskList1 = function(offset,limit,colName,order,search,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus){
		
		
		 $(".loader").show();
		 startDate= $("#startDate").val();
		 endDate=$("#endDate").val();
		 taskStatus=$("#taskStatus").val().split(':');
		 taskStatus=taskStatus[1];
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
			 if(ticketNum == null || ticketNum== ""){
				 ticketNum = undefined;
			 }
			 if(taskName == null || taskName== ""){
				 taskName = undefined;
			 }
			 if(startDate == null || startDate== ""){
				 startDate = undefined;
			 }
			 if(endDate == null || endDate== ""){
				 endDate = undefined;
			 }
			 if(workFlowname == null || workFlowname== ""){
				 workFlowname = undefined;
			 }
			 if(taskStatus == null || taskStatus== ""){
				 taskStatus = undefined;
			 }
			 if(identifier == null || identifier== ""){
				 identifier = undefined;
			 }
			 
			MyTask_Service.fetchMyTaskList(offset,limit,colName,order,search,$rootScope.userdetails.id,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus).then(function(response){
				$scope.myTaskList = response.data;
				console.log($scope.myTaskList);
				  if(response.data=="")
				  {
					  GlobalModule_notificationService.notification("error","No Records Available");
				  }
			     $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchMyTaskList1(0,10,null,null,null,null,null,null,null,null,null,null);
	  
/*----- Pagination of Event Scheduler page-----*/
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);	 
				}
				 $scope.fetchMyTaskList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.ticketNum,$scope.identifier,$scope.taskName,$scope.startDate,$scope.endDate,$scope.workFlowname,$scope.taskStatus);
			};
			
		$scope.getMyTaskListCount=function(searchterm,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus){
			$(".loader").show();
			
			startDate= $("#startDate").val();
			 endDate=$("#endDate").val();
			 taskStatus=$("#taskStatus").val().split(':');
			 taskStatus=taskStatus[1];
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
			 if(ticketNum == null || ticketNum== ""){
				 ticketNum = undefined;
			 }
			 if(taskName == null || taskName== ""){
				 taskName = undefined;
			 }
			 if(startDate == null || startDate== ""){
				 startDate = undefined;
			 }
			 if(endDate == null || endDate== ""){
				 endDate = undefined;
			 }
			 if(workFlowname == null || workFlowname== ""){
				 workFlowname = undefined;
			 }
			 if(taskStatus == null || taskStatus== ""){
				 taskStatus = undefined;
			 }
			 if(identifier == null || identifier== ""){
				 identifier = undefined;
			 }
			 MyTask_Service.getMyTaskListCount($scope.search,$rootScope.userdetails.id,ticketNum,identifier,taskName,startDate,endDate,workFlowname,taskStatus).then(function(response){
				
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getMyTaskListCount(null,null,null,null,null,null,null,null);
		
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
	        $scope.fetchMyTaskList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.ticketNum,$scope.identifier,$scope.taskName,$scope.startDate,$scope.endDate,$scope.workFlowname,$scope.taskStatus);
	    };
	    /*----- End Of Pagination-----*/
	    
	    /*------Sorting parameters-----*/
	    $scope.sortByName = function(searchterm,colName){
	    	//alert(colName);
			   $scope.offset =0 ;
				$scope.start = 0;
				$scope.colName = colName;
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
				$scope.fetchMyTaskList1(0,10,$scope.colName,$scope.order,$scope.search);
				
			};
			$scope.getworkflowListTab=function(){
				$state.go('restricted.ownerworkflow');
			};
			$scope.getMyTaskListTab=function(){
				$state.go('restricted.mytask');
			};
			
			
			
			
			
			/*------column setting-----*/
			
			
			var getSettings = function(){
				
				$(".loader").show();
				
				Admin_Service.getSettings($rootScope.userdetails.id,16).then(function(response){
					  $scope.columnlist = response.data;
					  
					  var columnsList= $scope.columnlist;
					 
					  $scope.columnlist=[];
					  for(var i=0;i<columnsList.length;i++){						
							if(!(columnsList[i].name=='Workflow Id' || columnsList[i].name=='SLA' || columnsList[i].name=='Assigned By' || columnsList[i].name=='Actual Date'))
							{
								$scope.columnlist.push(columnsList[i]);
							}
						}
					 
					var count=0;
							for(var i=0;i<$scope.columnlist.length;i++){
								
								if($scope.columnlist[i].name=='Workflow Name' && $scope.columnlist[i].isActive==false){
									for(var j=0;j<$scope.columnlist.length;j++){
										if($scope.columnlist[j].name=='Workflow Name' || $scope.columnlist[j].name=='Task Name' || $scope.columnlist[j].name=='Ticket Number' || $scope.columnlist[j].name=='Start Date' || $scope.columnlist[j].name=='Estimated End Date' || $scope.columnlist[j].name=='Task Status' || $scope.columnlist[j].name=='Identifier'){
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
						$(".loader").fadeOut("slow");
					};
					
					getSettings();
					
					$scope.savesettings = function(){
						
						$(".loader").show();
						
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
						$(".loader").fadeOut("slow");
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
						$(".loader").show();
						
						if(check==true)
							{
							for(var i=0;i<$scope.columnlist.length;i++){
								 $scope.columnlist[i].isActive=true;
									
							}
							}else{
								for(var i=0;i<$scope.columnlist.length;i++){
									if($scope.columnlist[i].name=='Workflow Name' || $scope.columnlist[i].name=='Task Name' || $scope.columnlist[i].name=='Ticket Number' || $scope.columnlist[i].name=='Task Status' || $scope.columnlist[i].name=='Identifier'){
										$scope.columnlist[i].isActive=true;
										}else{
											$scope.columnlist[i].isActive=false;
										}
									}
									
								}
						$(".loader").fadeOut("slow");
					};
			
			
					$scope.dateformate = function(date){	
						if(date == undefined || date == '')
						{
							return;
						}
				        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
				        return dateOut;
				  };
				  
				  
		//-----generate excel downlod	-----
			
				  $scope.generateExcel = function(){		 
					  if($scope.search == undefined){
						  $scope.search ="";
					  }		
					 var startDate= $("#startDate").val();
					 var endDate=$("#endDate").val();
					var	 taskStatusdata=$("#taskStatus").val().split(':');
					 taskStatusdata=taskStatusdata[1];
					var workFlowname=$("#workFlowname").val();
					var taskName=$("#taskName").val();
					var ticketNum=$("#ticketNum").val();
					var identifier=$("#identifier").val();
					  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+16+'&search='+$scope.search+
							  '&ticketNum='+ticketNum+'&identifier='+identifier+'&taskName='+taskName+'&startDate='+startDate+
							  '&endDate='+endDate+'&workFlowname='+workFlowname+'&taskStatus='+taskStatusdata+'&workflowId='+workFlowname+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
				  };
				
				/*$scope.dateformate = function(date){		     
			        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
			        return dateOut;
			  };*/
			  
			  $scope.openAddFieldsPage=function(workflow){
				  
				  GlobalModule_dataStoreService.storeData('LoginModule','fieldId',undefined);
				  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
				  $state.go("restricted.admin.addworkflowfield");
			  };
			  
			  $scope.openEditWorkFlowPage=function(workflow){
				  
				  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
				  $state.go("restricted.admin.createworkflow");
			  };
				
			  $scope.openTasksListPage= function(workflow){
				  
				  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
				  $state.go("restricted.admin.taskslist");
			  };
			
		
			  $scope.openTicketDetailsPage= function(task){
				  				  
				  var ticket={};
				  var workflow={wf_Owner:{}};
				  workflow.workFlowId=task.workFlow.workFlowId;
				  workflow.name=task.workFlow.name;				  
				  workflow.wf_Owner.ownerId=task.workFlow.wf_Owner.ownerId;
				  ticket.ticket_number=task.ticket_number;
				  ticket.ticketId=task.ticketId;
				  GlobalModule_dataStoreService.storeData('LoginModule','ticketObject',ticket);
				  GlobalModule_dataStoreService.storeData('LoginModule','ownerWorkflowObject',workflow);				  
				  $state.go("restricted.admin.ticketdetails");
			  };
			
			
	/*------Delete list on click-----*/
			
		/*	$scope.getCheckedId=[];
			  
			  $scope.checkedList=function(id){
				  
				  $scope.selectedEventId = id;
				  
				  if($scope.getCheckedId.indexOf(id) !== -1)
				  {		
				  var array  = $scope.getCheckedId;
				  var index = array.indexOf(id);
				  $scope.getCheckedId.splice(index,1);
				  }else
					  {		    	
			      $scope.getCheckedId.push(id);
			     
					  }
			  };
			
			  
			  $scope.deletefromList = function(formlist){
				  $scope.formlist=formlist;
				  $scope.deleteId=[];
				  $scope.deleteId.push($scope.getCheckedId[$scope.getCheckedId.length-1]);
					  Admin_Service.deleteFromList($scope.formlist,$scope.deleteId).then(function(response){
					  $scope.postjobflag = response.data;	
					  
					  $scope.getMyTaskListCount(null,null);
					  $scope.setButton();
					//  $scope.fetchEventSchedulerList(0,10,null,null,null);
					 
					  if($scope.postjobflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});		  
			  };
			
			  $scope.userdata = function(data){					  
				  GlobalModule_dataStoreService.storeData('LoginModule','data',data);
				  GlobalModule_dataStoreService.storeData('LoginModule','eventdata',$scope.EventSchedulerList);
				 
				   $state.go("restricted.admin.createEventscheduler");
			  };
			  
			 
			  
			  --------Add slots -------
			  
			  $scope.addEventSlot = function()
			  {
				  	//slot.id= $scope.selectedEventId;
				  	$scope.slot={};
				  	$scope.slot.dateTime = $("#datetimepickercns").data('date') ;
				  	$scope.slot.candidates=document.getElementById('candidates').value;
					 //alert($scope.slot.candidates);
					  if($scope.slot.candidates <= 0 || $scope.slot.candidates=="" || $scope.slot.candidates == undefined || $scope.slot.candidates==null) 
					  {
						  
						  GlobalModule_notificationService.notification("error","Please add number of candidates");
					  }
					  else
					  {
						  Admin_Service.addEventSlot($scope.slot,$scope.selectedEventId).then(function(response){
						  $scope.postjobflag = response.data;	
						  $scope.getMyTaskListCount(null,null);
						  $scope.fetchEventSchedulerList(0,10,null,null,null);
						  $scope.setButton();
						  $scope.slot.dateTime=$("#datetimepickercns").data({defaultDate:'now'});
						  $scope.slot.candidates="";
						  document.getElementById('candidates').value="";
						
						  if($scope.postjobflag.indexOf("success")!=-1){
							  GlobalModule_notificationService.notification("success","Slot added successfully");
							  $scope.slot={};
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
					  }
			  };
			  
			  
			  -----add button----
			  $scope.addScheduler = function(){	
					 $state.go("restricted.admin.createNewScheduler");	      
					};
	  
	
	*/
	
        
/*	
	$scope.fetchMyWorkflowCount= function(){	
		
		   $(".loader").show();
		
		  Owner_Dashboard_Service.fetchMyWorkflowCount($rootScope.userdetails.id).then(function(response){
			  $scope.myWorkflowCount = 10;
			  //console.log($scope.UserComplianceCompleted);
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		$(".loader").fadeOut("slow");	
	   };*/
	/*
	$scope.fetchDashboarddata();	
	
	$scope.fetchSelfAssessments = function(){
		
		$(".loader").show();

		dashboardDetails_Service.fetchSelfAssessments($scope.userdetails.id,$scope.userdetails.roleId).then(function(response){
			$scope.SelfAssessmentList = response.data;	 			 
			$scope.selfAssessmentCount = $scope.SelfAssessmentList.length;
		});	
		
		$(".loader").fadeOut("slow");	

	};$scope.fetchSelfAssessments();
	
	$scope.fetchUserProfile = function(){
		
		$(".loader").show();

		Profile_Service.fetchUserProfile($rootScope.userdetails.id).then(function(response){
			  $scope.userProfile = response.data;
			  if( $scope.userProfile.userContact.city.id !=0){
			  $scope.userProfile.countryName = "India";
			  }
			  //console.log($scope.userProfile);
			 //$scope.checkNotification();
			  //GlobalModule_dataStoreService.storeData('LoginModule','userProfile',$scope.userProfile);			  
		  },function(response){
				$(".loader").fadeOut("slow");	

			});
		$(".loader").fadeOut("slow");	

	  };	
	 $scope.fetchUserProfile();
	 
	 $scope.fetchHotJobs = function(){
		 
			$(".loader").show();
			
		  Login_Service.fetchHotJobs().then(function(response){
			  $scope.hotJobs = response.data;
			 
			 
		  },function(response){	
				$(".loader").fadeOut("slow");	
			});
		  
			$(".loader").fadeOut("slow");	
	  };
	
	  $scope.fetchHotJobs();  
	  
	  
	  $scope.fetchJobResult = function(id,flag){
		  
			$(".loader").show();
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  
		  Login_Service.fetchJobResult(id,flag,userid).then(function(response){
			  $scope.jobResult = response.data;
			  //GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobResult);
			  $state.go("restricted.job_result");
			 
		  },function(response){
				$(".loader").fadeOut("slow");					
			});
			$(".loader").fadeOut("slow");					
	  };
	  
	  $scope.profileCompletedCount = function(){
		  
			$(".loader").show();

		  $scope.total = $scope.userProfile.profileCompletion;
		  
		
		  *//**var personalCount = 20;
		  var contactcount = 10;var usercvcount=20;var compliancecount=10;
		  var educationcount = 20;var workExperiancecount=20;
		  
		  if($scope.userProfile.dob && $scope.userProfile.profilePic){
			  $scope.total = $scope.total + personalCount;
		  }
		  if($scope.userProfile.userCV.cvPath){
			  $scope.total = $scope.total + usercvcount;
		  }
		  if($scope.userProfile.userContact.address && $scope.userProfile.userContact.phoneNumber){
			  $scope.total = $scope.total + contactcount;
		  }
		  if($scope.userProfile.userComplianceList.length != 0){
			  $scope.total = $scope.total + compliancecount;
		  }
		  if($scope.userProfile.userEducationList.length != 0){
			  $scope.total = $scope.total + educationcount;
		  }
		  if($scope.userProfile.userWorkList.length != 0){
			  $scope.total = $scope.total + workExperiancecount;
		  }**//*
			$(".loader").fadeOut("slow");					
  
	  };
	  
	  
	  $scope.checkNotification=function()
	  {			  		  
		  Login_Service.fetchNotification($rootScope.userdetails.id).then(function(response){
			  
			  $scope.noficationStatus=response.data;
			  $scope.count=$scope.noficationStatus.length;
			  cosole.log( $scope.noficationStatus);
			  if($scope.noficationStatus.length > 0)
				{
					 $scope.noStatusflag= false;
					 $scope.countflag= true;
				}
				 else
				{
					 $scope.noStatusflag= true;
				}						  
			 //console.log($scope.noficationStatus.length);
			  //console.log($scope.noficationStatus[0].notificationBody);
			 // $scope.notificationflag= true;
			  
		  },function(response){
				
			});
	  };
	  $scope.checkNotification();
	  $scope.seenNotification=function()
	  {				
		  Login_Service.makeSeenNotification($rootScope.userdetails.id).then(function(response){
			  $scope.seenNotificationFlag=response.data;
			  $scope.countflag= false;
		  },function(response){
				
			});
	  };
	  
	  $scope.assessmentList=function()
	  {	
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',1);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',1);
		  $state.go("restricted.dashboardDetails");
	  };
	  
	  $scope.gotoAppliedJob = function(){
		  Profile_Service.fetchMyApplications($rootScope.userdetails.id).then(function(response){
				$rootScope.myApplications = response.data;
				$state.go("restricted.myapplication");
			},function(response){				 
			});
	  };
	 
	  
	  $scope.gotomyprofile = function(){
		  $state.go("restricted.profile");
	  };
	  
	  $scope.gotoTodoList = function(){
		  $state.go("restricted.todolist");
	  };
	  
	  
	  $scope.goToEmplToDoList=function()
	  {	
		  $scope.showFlag=2;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);		
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");		  
	  };
	  
	  $scope.goToJobPostings=function()
	  {
		  $scope.showFlag=1;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);		
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");	
	  };
	  
	  $scope.goToAssessment=function()
	  {
		  $scope.showFlag=3;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',1);
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");	
	  };
	  
	  $scope.goToReimbursment=function()
	  {
		  $scope.showFlag=4;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);		
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");	
	  };
	
	  $scope.goToSurvey=function(role){
		  
		  if(role == 2)
		{
			  $scope.showFlag=2;
			  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);
			  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',2);
			  $state.go("restricted.dashboardDetails");	  
		}
		 else if(role == 3)
		{
		  $scope.showFlag=5;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',2);		  
		  $state.go("restricted.eprofile");	
		}
	  };*/
			 /* $scope.changeFieldType= function(){
					 $scope.Wf_Task={wf_ValidationMaster:{options:[]}};
				 };*/
	 
				 
				 var fetchTaskStatusDetails= function(){
					 
					 $(".loader").show();
					 MyTask_Service.fetchStatusList().then(function(response){
						 
						 $scope.taskStatusList=response.data;			 			 			 
						 console.log(response.data); 
					 },function(response){
						  $(".loader").fadeOut("slow");
					 });
					 
					 $(".loader").fadeOut("slow");
				 };
				 fetchTaskStatusDetails(); 
				 
}]);