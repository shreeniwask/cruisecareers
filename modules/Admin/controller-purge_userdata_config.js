'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('purge_userdata_config_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Purge_Userdata_Config_Service','Master_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Purge_Userdata_Config_Service,Master_Service,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.approverTabFlag=1;
	$scope.purgeDataCandidateList;
	$scope.purgeDataEmployeeList;
	
	
	$scope.fetchPurgeDataCandidateList = function(){
		
		$(".loader").show();
		
		Purge_Userdata_Config_Service.fetchPurgeDataCandidateList().then(function(response){
			  $scope.purgeDataCandidateList = response.data;
		
			  console.log($scope.purgeDataCandidateList);
			  //$scope.saveCandiadateConfiguration($scope.purgeDataCandidateList);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	$scope.fetchPurgeDataCandidateList();
	
	$scope.fetchPurgeDataEmployeeList = function(){
		
		$(".loader").show();
		
		Purge_Userdata_Config_Service.fetchPurgeDataEmployeeList().then(function(response){
			  $scope.purgeDataEmployeeList = response.data;
			  console.log($scope.purgeDataEmployeeList);
			 // $scope.saveEmployeeConfiguration($scope.purgeDataEmployeeList);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	$scope.fetchPurgeDataEmployeeList();
	
	// for saving purge configuration fro candidate
	$scope.saveCandiadateConfiguration = function(purgeDataCandidateList){
		
		$(".loader").show();
		
		Purge_Userdata_Config_Service.saveCandiadateConfiguration(purgeDataCandidateList).then(function(response){
			  $scope.configStatus = response.data;
			  if($scope.configStatus==="success"){
				  GlobalModule_notificationService.notification("success","User Data Configured Successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Error In Configuration");
			  }
			  $scope.approverTabFlag=2;
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
	};
	
	// for saving purge configuration fro employee
	$scope.saveEmployeeConfiguration = function(purgeDataCandidateList){
		
		$(".loader").show();
		
		Purge_Userdata_Config_Service.saveEmployeeConfiguration(purgeDataCandidateList).then(function(response){
			  $scope.configStatus = response.data;
			  if($scope.configStatus==="success"){
				  GlobalModule_notificationService.notification("success","Employee Data Configured Successfully");
				  $state.go("restricted.admin.dashboard");
			  }else{
				  GlobalModule_notificationService.notification("error","Error In Configuration");
			  }
			  $(".loader").fadeOut("slow");
			 
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	
	// for candiddate
	$scope.setAction = function(value,obj){
		obj.action=value;
		
	};
	
	// for employee
	$scope.setAction2 = function(value,obj){
		obj.action=value;
		
	};
	
	// for setting approver tab flag
	
	$scope.setapproverTabFlag= function(flag){
		
		if(flag===1){
			$scope.approverTabFlag=1;
			$scope.fetchPurgeDataCandidateList();
		}
		if(flag===2){
			$scope.approverTabFlag=2;
			$scope.fetchPurgeDataEmployeeList();
		}
	};
	
	
	
	
	
}]);