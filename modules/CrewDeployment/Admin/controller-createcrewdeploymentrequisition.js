'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateCrewDeploymentRequisition_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CrewDeployRequisitionMaster_Service','CrewDeployCreateViewRequisition_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CrewDeployRequisitionMaster_Service,CrewDeployCreateViewRequisition_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.crewDeployRequisitionFlag =  GlobalModule_dataStoreService.loadData('LoginModule','crewDeployRequisitionFlag');
	
	 $scope.fetchpositonbydipartment = function(id){	
		 CrewDeployCreateViewRequisition_Service.fetchpositonbydepartmentcrewdeployment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
			  //console.log($scope.positionbydepartment);		  
		  },function(response){				
			});		  
		  };
		  
	  $scope.fetchshipbybrand = function(id){	
			 CrewDeployCreateViewRequisition_Service.fetchshipbybrand(id).then(function(response){
				  $scope.shipbybrand = response.data;
				  //console.log($scope.positionbydepartment);		  
			  },function(response){				
				});		  
			  };
	
	if($scope.crewDeployRequisitionFlag == true){
		$scope.credeployrequisitionstn = GlobalModule_dataStoreService.loadData('LoginModule','crewDeployRequisition');
		$scope.fetchpositonbydipartment($scope.credeployrequisitionstn.category_id);
		$scope.fetchshipbybrand($scope.credeployrequisitionstn.brand_id);
		
	}else{
		$scope.credeployrequisitionstn = {};
	}
	
	$scope.saveCrewDeployRequisition=function(credeployrequisitionstn){		
		  
		  $(".loader").show();
		 
		  credeployrequisitionstn.userid=$rootScope.userdetails.id;		 
		  credeployrequisitionstn.username=$rootScope.userdetails.firstName;
		  credeployrequisitionstn.joining_date  = $("#joining_date").val();
		  if($scope.TriggerCDRequisitionStatus==true){
			  credeployrequisitionstn.status='Started';
		  }else{
			  credeployrequisitionstn.status='Created';
		  }
		  
			   	
		  CrewDeployCreateViewRequisition_Service.saveCrewDeployRequisition(credeployrequisitionstn).then(function(response){
				  $scope.savecrewdeployrequisition = response.data;
				  
				  $state.go('restricted.admin.crewdeploymentrequisitionlist');
				 if($scope.savecrewdeployrequisition.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Your Crew Deployment Requisition has been saved successfully");
				  }
				 else if($scope.savecrewdeployrequisition =='duplicate')
					{
						GlobalModule_notificationService.notification("error","Requisition Name already exist");
						$(".loader").fadeOut("slow");
	 				}
				 else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
			 
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				}); 
		  }; 
			  $scope.updateCrewDeployRequisitionDetails=function(updatecredeployrequisitionstn){
				 
				  $(".loader").show();
				  updatecredeployrequisitionstn.userid=$rootScope.userdetails.id;	
				  updatecredeployrequisitionstn.joining_date  = $("#joining_date").val();
				  if($scope.TriggerCDRequisitionStatus==true){
					  updatecredeployrequisitionstn.status='Started';
				  }else{
					  updatecredeployrequisitionstn.status='Created';
				  }
				  
				  CrewDeployCreateViewRequisition_Service.updateCrewDeployRequisitionDetails(updatecredeployrequisitionstn).then(function(response){
					  $scope.updatecrewdeployrequisition = response.data;
					  
					  $state.go('restricted.admin.crewdeploymentrequisitionlist');
					  if($scope.updatecrewdeployrequisition.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Your Crew Deployment Configuration has been updated successfully");
						  //$state.go('restricted.admin.crewdeploymentconfiguration');
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					});
					  
			 
			  };
			  $scope.TriggerCDRequisition=function(){		
				 $scope.TriggerCDRequisitionStatus=true;
			  };
			  			  
			  $scope.saveOrUpdateCrewDeployRequisition = function(req){
				  if($scope.crewDeployRequisitionFlag == true){
					  console.info("#updateCrewDeployRequisitionDetails");
					  $scope.updateCrewDeployRequisitionDetails(req);
				  }else{  
					  console.info("#saveCrewDeployRequisition");
					  $scope.saveCrewDeployRequisition(req);	  
				       }
			  };
			  
		$scope.brandsList = function(){
				  
			CrewDeployRequisitionMaster_Service.brandsList().then(function(response){
					  $scope.brandsList = response.data;
				  },function(response){
						
					});
			  };
			    
			  $scope.brandsList();
			  
			  $scope.fetchCategoryListCrewDeployment = function(){		  
				  CrewDeployCreateViewRequisition_Service.fetchCategoryListCrewDeployment().then(function(response){
					  $scope.categoryList = response.data;			
				  },function(response){
						
					});
			  };
			  $scope.fetchCategoryListCrewDeployment();
			  
			  $scope.cancel=function(){
					 $state.go('restricted.admin.crewdeploymentrequisitionlist');
				 }; 
}]);