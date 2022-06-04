'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('ApproverDashboard_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Employee_Expenses','Owner_Dashboard_Service','Workflow_Dashboard_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Employee_Expenses,Owner_Dashboard_Service,Workflow_Dashboard_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
		
	var getExpenseListCount=function(search){	  
		
		$(".loader").show();
		
		var approverTabFlag=1;
		
		if(search==null || search=="")
		{
			search= undefined;
		}
	
		Employee_Expenses.getExpenseListCount(search,$rootScope.userdetails.roleId,approverTabFlag).then(function(response){
			$scope.pendingClaimsCount = response.data;				
						
		},function(response){			
			$(".loader").fadeOut("slow");			
		});	
		
		 $(".loader").fadeOut("slow");
	};
	getExpenseListCount(null);
	
	
	$scope.openMyClaims=function(approverTabFlag){
		
		GlobalModule_dataStoreService.storeData('LoginModule','approverTabFlag',approverTabFlag);
		$state.go("restricted.admin.employeeexpenselist");
		
	};
	
	//workflow
	
	$scope.fetchOwnerTaskCount= function(){	
			
			$(".loader").show();
			
			Owner_Dashboard_Service.fetchOwnerTaskCount($rootScope.userdetails.id).then(function(response){
				  $scope.myTaskCount = response.data;
				  console.log($scope.myTaskCount);
			  },function(response){	
					$(".loader").fadeOut("slow");	
				  
				});
			$(".loader").fadeOut("slow");	
		};
	        	
		$scope.fetchMyWorkflowCount= function(){	
			
			   $(".loader").show();
			
			  Owner_Dashboard_Service.fetchMyWorkflowCount($rootScope.userdetails.id).then(function(response){
				  $scope.myWorkflowCount = response.data;
				  console.log($scope.myWorkflowCount);
			  },function(response){	
					$(".loader").fadeOut("slow");	
				  
				});
			$(".loader").fadeOut("slow");	
		   };
		   $scope.fetchOwnerTaskCount();
		   $scope.fetchMyWorkflowCount();

		   //ticket and task count
		   
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
	$scope.fetchWfTaskStatusColor();

	$scope.openWorkflowWidgets=function(){
		
		if($scope.myWorkflowCount == 0)
		{
			GlobalModule_notificationService.notification("error","Owner does not contains any workflow");
			return;
		}
		
		$state.go("restricted.admin.WfTicketStatusCount");
	};

	$scope.myTasksList=function(){
		
		if($scope.myTaskCount == 0)
		{
			GlobalModule_notificationService.notification("error","No task has been assigned");
			return;
		}
		
		$state.go("restricted.admin.mytask");
	};
	
	
}]);