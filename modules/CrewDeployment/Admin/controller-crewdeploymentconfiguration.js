'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewDeploymentConfiguration_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','CrewDeployRequisitionMaster_Service','GlobalModule_notificationService', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,CrewDeployRequisitionMaster_Service,GlobalModule_notificationService){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.crewDeployConfigFlag =  false;
	$scope.brand_id= GlobalModule_dataStoreService.loadData('LoginModule','brand_id');
	$scope.brandsList = function(){
		  
		CrewDeployRequisitionMaster_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
			  console.log($scope.brandsList);
			  $(".loader").fadeOut("slow");
		  },function(response){
				
			});
	  };
	$scope.brandsList();
	
	$scope.fetchCrewDeployConfigbyBrand = function(brand_id){
		$(".loader").show();
		$scope.brandid=brand_id;
		CrewDeployRequisitionMaster_Service.fetchCrewDeployConfigbyBrandData($scope.brandid).then(function(response){
			  $scope.CD_Config = response.data;
			  if($scope.CD_Config==null){
			  $scope.CD_Config =[];
			  $scope.CD_Config.brand_id=$scope.brandid;	
			  }
			  if($scope.CD_Config.length>0){
				  $scope.CD_Config.brand_id=$scope.brandid;	
				  $scope.CD_Config.batch_size=response.data[0].batch_size;
				  $scope.CD_Config.days_on_board=response.data[0].days_on_board;
				  $scope.CD_Config.days_on_leave=response.data[0].days_on_leave;
				  $scope.CD_Config.time_interval=response.data[0].time_interval;
				  
				  GlobalModule_dataStoreService.storeData('LoginModule','crewDeployConfigFlag', true);
				 
			  }else{
				  GlobalModule_dataStoreService.storeData('LoginModule','crewDeployConfigFlag', false);
			  }
			  $(".loader").fadeOut("slow");
			 
		  },function(response){
			  $(".loader").fadeOut("slow");
			});		  
		  };
		 $scope.saveOrUpdateCrewDeployConfig = function(req){
			  if(GlobalModule_dataStoreService.loadData('LoginModule','crewDeployConfigFlag') == true){
				  $scope.updateCrewDeployConfigDetails(req);
			  }else{  
				  $scope.saveCrewDeployConfig(req);	  
			       }
		  };
		  
		  $scope.saveCrewDeployConfig=function(crewdeployConfig){		
			  
			  $(".loader").show();
			  $scope.CD_Config = {};
			  $scope.CD_Config.batch_size  = crewdeployConfig.batch_size;
			  $scope.CD_Config.days_on_board=crewdeployConfig.days_on_board;
			  $scope.CD_Config.days_on_leave=crewdeployConfig.days_on_leave;
			  $scope.CD_Config.time_interval=crewdeployConfig.time_interval;		 
			  $scope.CD_Config.brand_id=$scope.brandid;	
			  $scope.CD_Config.userid=$rootScope.userdetails.id;		 
			  if($scope.CD_Config.days_on_board<$scope.CD_Config.days_on_leave){
				  GlobalModule_notificationService.notification("error","Invalid Days");
				  $(".loader").fadeOut("slow");
				  return;
			  }
				   	
			  CrewDeployRequisitionMaster_Service.saveCrewDeployConfig($scope.CD_Config).then(function(response){
					  $scope.savecrewdeployconfig = response.data;
					  
					 if($scope.savecrewdeployconfig.indexOf("success")!=-1){
						 $scope.fetchCrewDeployConfigbyBrand($scope.brandid);
						  GlobalModule_notificationService.notification("success","Your Crew Deployment Configuration has been saved successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					 GlobalModule_dataStoreService.storeData('LoginModule','crewDeployConfigFlag', false);
					 $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					}); 
			  }; 
				  $scope.updateCrewDeployConfigDetails=function(updatecrewdeployConfig){
					 
					  $(".loader").show();
					  $scope.CD_Config = {};
					  $scope.CD_Config.batch_size  = updatecrewdeployConfig.batch_size;
					  $scope.CD_Config.days_on_board=updatecrewdeployConfig.days_on_board;
					  $scope.CD_Config.days_on_leave=updatecrewdeployConfig.days_on_leave;
					  $scope.CD_Config.time_interval=updatecrewdeployConfig.time_interval;		 
					  $scope.CD_Config.brand_id=$scope.brandid;	
					  $scope.CD_Config.userid=$rootScope.userdetails.id;		 
					  
					  CrewDeployRequisitionMaster_Service.updateCrewDeployConfigDetails($scope.CD_Config).then(function(response){
						  $scope.updatecrewdeployconfig = response.data;
						  
						  if($scope.updatecrewdeployconfig.indexOf("success")!=-1){
							  $scope.fetchCrewDeployConfigbyBrand($scope.brandid);
							  GlobalModule_notificationService.notification("success","Your Crew Deployment Configuration has been updated successfully");

						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  GlobalModule_dataStoreService.storeData('LoginModule','crewDeployConfigFlag', false);
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						});
						  
				 
				  };

				  
		  $scope.cancelCD_Config=function(){
			  $state.reload();
			 };	
				
}]);