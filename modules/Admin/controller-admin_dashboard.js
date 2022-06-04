'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Admin_Dashboard_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_dashBoard_Service','Login_Service','Owner_Dashboard_Service','Workflow_Dashboard_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_dashBoard_Service,Login_Service,Owner_Dashboard_Service,Workflow_Dashboard_Service){
	
	
	$scope.pastMonthId=0;
	
	$scope.pastMonthsList=[{id:0,pastMonth:''}];
	$scope.pastMonthsList.push({id:0,pastMonth:'This month'});
	$scope.pastMonthsList.push({id:1,pastMonth:'Past month'});
	$scope.pastMonthsList.push({id:2,pastMonth:'Past 6 months'});
	$scope.pastMonthsList.push({id:3,pastMonth:'12 months ended Nov yyyy'});
		 
	//console.log($scope.yearsList);
	
	$scope.fetchRegistrationAndAppliedCount=function(brandId,pastMonthId,betweenYears)
	{
		$(".loader").show();
		
		if(brandId == undefined)
		{
			brandId=0;
		}
				
		Admin_dashBoard_Service.fetchRegistrationAndAppliedCount(brandId,pastMonthId,betweenYears).then(function(response){
			
			 $scope.registrationAndAppliedCount=response.data;
			 console.log($scope.registrationAndAppliedCount);
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		
		$(".loader").fadeOut("slow");
	};
	$scope.fetchRegistrationAndAppliedCount(0,0,undefined);
	
	$scope.fetchRequisitionSLACount=function(brandid,pastMonthId,betweenYears)
	{		 
		$(".loader").show();
				
		Admin_dashBoard_Service.fetchRequisitionSLACount(brandid,pastMonthId,betweenYears).then(function(response){
			
			 $scope.requisitionSLACount=response.data;
			 console.log($scope.requisitionSLACount);
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		
		$(".loader").fadeOut("slow");
	};
	//$scope.fetchRequisitionSLACount(0,0,undefined);
	
	$scope.fetchOpenPositionCount=function(brandId,pastMonthId,betweenYears)
	{
			 
		$(".loader").show();
			
		Admin_dashBoard_Service.fetchOpenPositionCount(brandId,pastMonthId,betweenYears).then(function(response){
			
			 $scope.openPositionCount=response.data;
			  
			 console.log($scope.openPositionCount);
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		
		$(".loader").fadeOut("slow");
	};
	//$scope.fetchOpenPositionCount(0,0,undefined);
	
	$scope.fetchInterviewSelectionCount=function(pastMonthId,betweenYears)
	{
		$(".loader").show();
				
		Admin_dashBoard_Service.fetchInterviewSelectionCount(pastMonthId,betweenYears).then(function(response){
			
			 $scope.interviewSelectionCount=response.data;
			 console.log($scope.interviewSelectionCount);
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		
		$(".loader").fadeOut("slow");
	};
	//$scope.fetchInterviewSelectionCount(0,0,undefined);
	
	
	var brandsList=function()
	{
		$(".loader").show();
				
		Login_Service.brandsList().then(function(response){
			
			 $scope.brandsList=response.data;
			 //console.log($scope.brandsList);
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		
		$(".loader").fadeOut("slow");
	};
	brandsList();
	
	/*$scope.changeYear=function(year)
	{
		console.log(year);
	};*/
	
	$scope.fetchFilteredData=function(brandId,pastMonthId,betweenYears)
	{
		$(".loader").show();
		
		var year=undefined;
		
		if(betweenYears != undefined)
		{
			year=betweenYears.year;
		}
		
		if(pastMonthId == 3 && year == undefined)
		{
			$scope.yearsList=[];
			var start = 2016;
			var end = new Date().getFullYear();
			var lastYear=start;
			var i=0;
			for(var year = ++start ; year <=end; year++){	
			    i++;
			    $scope.yearsList.push({id:i,year:"DEC "+lastYear+" - NOV "+year});
				lastYear=year;
			}
			
			$(".loader").fadeOut("slow");
			return;
		}
		
		$scope.fetchRegistrationAndAppliedCount(brandId,pastMonthId,year);
		/*$scope.fetchRequisitionSLACount(brandId,pastMonthId,year);
		$scope.fetchOpenPositionCount(brandId,pastMonthId,year);
		$scope.fetchInterviewSelectionCount(pastMonthId,year);*/
		
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

$scope.checkadmindashboardcount = function(){		
	Admin_dashBoard_Service.checkadmindashboardcount().then(function(response){
		   $scope.ApplicantCount1sdf = response.data; 
	},function(response){			
		});
  };

}]);