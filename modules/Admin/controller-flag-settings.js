'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('FlagSettings_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.fetchflag="";	
	$scope.addNewFlag = function(userFlag){

		
		$(".loader").show();
		if(userFlag == undefined)
		{
			 GlobalModule_notificationService.notification("error","Please select all fields");
			 $(".loader").fadeOut("slow");
		}
		
		userFlag.flagStyle=$("#colorpicker").val();
		   
		   Admin_Service.addNewFlag(userFlag).then(function(response){
		 $scope.flagresp = response.data;
		 if($scope.flagresp == "success"){
		 GlobalModule_notificationService.notification("success"," Your flag has been Added successfully");
		 
		 }else{
		 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		 }
		 $(".loader").fadeOut("slow");
		 $state.reload();
		 },function(response){
		 $(".loader").fadeOut("slow");
		 
		});
		 }; 
		 	
		 	
		 
	/*	 $scope.clear=function(){

			 $scope.userFlag = {
					 flagStatus:"",
			   
			 };
			};*/
		 
		 $scope.fetchNewFlag=function(){
		     
		     $(".loader").show();
		   
		 Admin_Service.fetchNewFlag().then(function(response){  
		 $scope.fetchflag= response.data;
		console.log($scope.fetchflag);
		console.log($scope.fetchflag.flagStatus);
		 $(".loader").fadeOut("slow");
		 
		},function(response){

		$(".loader").fadeOut("slow");
		});      
		     };
		     $scope.fetchNewFlag();	
		     
		     
		     $scope.checkDelete=function(id){
		    	 $scope.id=id; 
					 $("#deletelist").modal("show");
						   
		     }
		     $scope.deleteFlag = function(id){
					
					$(".loader").fadeOut("slow");
					
					  // $scope.id=$scope.fetchflag.id;
					    Admin_Service.deleteFlag($scope.id).then(function(response){
						  $scope.deleteflag = response.data;	
						  if($scope.deleteflag == "success"){
							  
							  GlobalModule_notificationService.notification("success","Flag deleted successfully");
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  $(".loader").fadeOut("slow");
						  $state.reload();
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
				  };	 
		
	
}]);