'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('sms_configuration_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Sms_Configuration_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Sms_Configuration_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($rootScope.userdetails);
	//fetch sms mode configurtion
	$scope.getSmsModeConfig = function(){
		$scope.id=$rootScope.userdetails.id;
		Sms_Configuration_Service.getSmsModeConfig($scope.id).then(function(response){
			  $scope.selectedsmsmode = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	$scope.getSmsModeConfig();
	
	$scope.saveSmsMode = function(selectedsmsmode1){
		if(selectedsmsmode1 == undefined)
			$scope.smsmodeid=Number($scope.selectedsmsmode);
		else
			$scope.smsmodeid=selectedsmsmode1;
		$scope.userid=$rootScope.userdetails.id;
		Sms_Configuration_Service.saveSmsMode($scope.smsmodeid,$scope.userid).then(function(response){
			  $scope.selectedsmsmode = response.data;
			  if($scope.selectedsmsmode = 'success'){
				  GlobalModule_notificationService.notification("success","Woo Hoo! SMS Configuration Saved successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Error in saving records");
			  }	
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
		  
	};
}]);