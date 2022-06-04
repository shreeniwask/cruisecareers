'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('notification_Ctrl',['$scope','$state','$rootScope','$location','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','GlobalModule_User_activityService','Notification_Service', function ($scope,$state,$rootScope,$location,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,GlobalModule_User_activityService,Notification_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];

	
	
	$scope.fetchNotification=function(offset,limit){
		
		$(".loader").show();
		
		var flag='All';
		
		Notification_Service.fetchNotification($scope.offset,$scope.limit,$rootScope.userdetails.id,flag).then(function(response){
			$scope.notificationList = response.data;	
		});

		$(".loader").fadeOut("slow");
		
	};$scope.fetchNotification(0,10);
	
	//redirect page
		
			$scope.redirectPage=function(workflowId)
			{
			
					$(".loader").show();
					
					Notification_Service.redirectPage(workflowId,$rootScope.userdetails.id).then(function(response){
						$scope.redirect=response.data;
						
						if($scope.redirect== true)
						{	
						   $state.go('restricted.admin.ownerworkflow');
						}else
						{
						$state.go('restricted.admin.mytask');
						}
			
					$(".loader").fadeOut("slow");
				},function(response){
						  $(".loader").fadeOut("slow");		
		
				});
			};
			
			$scope.dateformate = function(date){		     
		        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
		        return dateOut;
		  };
		  
		  //pagination
		  
		  $scope.setButton = function(){
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					 $scope.fetchNotification($scope.offset,$scope.limit);
				};
				
			$scope.getNotificationcount=function(userId){
			
				$(".loader").show();
				
			   $scope.offset =0 ;
			   $scope.navButtons = [];
			   $scope.count= 0 ;
			   $scope.start = 0;
			  // $scope.search=searchterm;
			   
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
				
			Notification_Service.getNotificationcount(userId).then(function(response){				
				$scope.count = response.data;
			  // console.log($scope.count);
			   //alert($scope.count);
			  //  console.log($scope.limit);
				if($scope.count>$scope.limit){
				$scope.setButton();					
			}
		     },function(response){
			   $(".loader").fadeOut("slow");		
		});	
			
			$(".loader").fadeOut("slow");	
		};
		$scope.getNotificationcount($rootScope.userdetails.id);
			
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
		    $scope.fetchNotification($scope.offset,$scope.limit);
		    $scope.setButton = function(){
		    $scope.navButtons = [];
				
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
			}
			//$scope.fetchNotification();
		};
		};

}]);