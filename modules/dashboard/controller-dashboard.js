'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Dashboard_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Dashboard_Service','dashboardDetails_Service','Owner_Dashboard_Service','Workflow_Dashboard_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Dashboard_Service,dashboardDetails_Service,Owner_Dashboard_Service,Workflow_Dashboard_Service){
		
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$rootScope.isselected = GlobalModule_dataStoreService.loadData('LoginModule','isselected');
	$scope.iseifnotified = GlobalModule_dataStoreService.loadData('LoginModule','isEIFNotified');
	$rootScope.eif_status = GlobalModule_dataStoreService.loadData('LoginModule','eifstatus');
	
	//$scope.userProfile = GlobalModule_dataStoreService.loadData('LoginModule','userProfile');	
	$scope.fetchDashboarddata= function() {	
		
		$(".loader").show();
		
		Dashboard_Service.fetchDashboarddata($rootScope.userdetails.id,$rootScope.userdetails.roleId).then(function(response){
			  $scope.appliedjob = response.data.job;
			  $scope.interviewcount = response.data.interviewCount;
			  $scope.total = response.data.profile;
			  $scope.EmployeeIncompleteCompliances=response.data.EmployeeIncompleteCompliances;
			  $scope.UserIncompleteCompliances = response.data.UserIncompleteCompliances;
			  $scope.surveysCount=response.data.surveyCount;
			  
			  $scope.assignedAssessment = response.data.assignedAssessment;
			  //console.log($scope.UserComplianceCompleted);
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		
		$(".loader").fadeOut("slow");	
	};	
	$scope.fetchDashboarddata();	
	
	$scope.fetchSelfAssessments = function(){
		
		$(".loader").show();

		var typeId=1
		dashboardDetails_Service.fetchSelfAssessments($scope.userdetails.id,$scope.userdetails.roleId,typeId).then(function(response){
			$scope.SelfAssessmentList = response.data;	 			 
			$scope.selfAssessmentCount = $scope.SelfAssessmentList.length;
		});	
		
		$(".loader").fadeOut("slow");	

	};
	$scope.fetchSelfAssessments();
	
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
	 
	 $scope.checkEIFstatus = function(){
		 if($rootScope.isselected){
			 if($rootScope.eif_status == "1" && !$scope.iseifnotified){
		    		$('#messageModal').modal('show');
			 }else{
				 $('#messageModal').modal('hide');
			 }
			 GlobalModule_dataStoreService.storeData('LoginModule','isEIFNotified',true);
		 }
	 };
	 $scope.checkEIFstatus();
	 
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
		  
		
		  /**var personalCount = 20;
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
		  }**/
			$(".loader").fadeOut("slow");					
  
	  };
	  
	  
	 /* $scope.checkNotification=function()
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
	  };*/
	  
	  $scope.assessmentList=function()
	  {	
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',1);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',1);
		  $state.go("restricted.dashboardDetails");
	  };
	  
	  $scope.gotointerviewList=function()
	  {	
		 
		  $state.go("restricted.myinterview");
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
	  };
	  
	  // fro job seeker
	  $scope.goToEmails1=function(role){
		  $scope.showFlag=3;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',2);
		  $state.go("restricted.dashboardDetails");	
	  }
	  $scope.goToDocuments1=function(role){
		  $scope.showFlag=4;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);
		  GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',2);
		  $state.go("restricted.dashboardDetails");	
	  }
	  
	  
	    //for emails Listing
	  $scope.goToEmails=function()
	  {
		  $scope.showFlag=6;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);		
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");	
	  };
	  
	  //for Documents Listing
	  $scope.goToDocuments=function()
	  {
		  $scope.showFlag=7;
		  GlobalModule_dataStoreService.storeData('LoginModule','showFlag',$scope.showFlag);		
		  $rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag');
		  $state.go("restricted.eprofile");	
	  };
	
		/*//$scope.userProfile = GlobalModule_dataStoreService.loadData('LoginModule','userProfile');	
		$scope.fetchOwnerTaskCount= function(){	
			
			$(".loader").show();
			
			Owner_Dashboard_Service.fetchOwnerTaskCount($rootScope.userdetails.id).then(function(response){
				  $scope.myTaskCount = response.data;
				  //console.log($scope.UserComplianceCompleted);
			  },function(response){	
					$(".loader").fadeOut("slow");	
				  
				});
			$(".loader").fadeOut("slow");	
		};
	        
		
		$scope.fetchMyWorkflowCount= function(){	
			
			   $(".loader").show();
			
			  Owner_Dashboard_Service.fetchMyWorkflowCount($rootScope.userdetails.id).then(function(response){
				  $scope.myWorkflowCount = response.data;
				  //console.log($scope.UserComplianceCompleted);
			  },function(response){	
					$(".loader").fadeOut("slow");	
				  
				});
			$(".loader").fadeOut("slow");	
		   };
		   $scope.fetchOwnerTaskCount();
		   $scope.fetchMyWorkflowCount();
	  
		   
		   
		   //for count of ticket and task
		   
			   $scope.getTicketStatusCount= function(){	
					
					$(".loader").show();
					
					Workflow_Dashboard_Service.getTicketStatusCount($rootScope.userdetails.id).then(function(response){
						  $scope.myTicketStatusCount = response.data;
						  						  
					  },function(response){	
							$(".loader").fadeOut("slow");	
						  
						});
					$(".loader").fadeOut("slow");	
				};
				
				$scope.getTaskStatusCount= function(){	
					
					   $(".loader").show();
					
					   Workflow_Dashboard_Service.getTaskStatusCount($rootScope.userdetails.id).then(function(response){
						  $scope.myTaskStatusCount = response.data;						  
						  
					  },function(response){	
							$(".loader").fadeOut("slow");	
						  
						});
					$(".loader").fadeOut("slow");	
				   };
				   $scope.getTicketStatusCount();
				   $scope.getTaskStatusCount();
				   
				   
		   
		  $scope.fetchWfStatusColor=function(){
			  
					   Workflow_Dashboard_Service.fetchWfStatusColor().then(function(response){
							$scope.statusColor = response.data;
							
						});
					};
					$scope.fetchWfStatusColor(); 
					
		 $scope.fetchWfTaskStatusColor=function(){
						  
						   Workflow_Dashboard_Service.fetchWfTaskStatusColor().then(function(response){
								$scope.taskstatusColor = response.data;
								
							});
						};
		$scope.fetchWfTaskStatusColor();*/   

	 
}]);

