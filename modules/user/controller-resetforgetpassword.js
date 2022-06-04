'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('resetfrgtpass_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS){
	$scope.Validateuser = GlobalModule_dataStoreService.loadData('LoginModule','Validateuser');	
	$scope.Validateotp = GlobalModule_dataStoreService.loadData('LoginModule','validateotp');	
	
	if($scope.Validateotp == false){
		$state.go("chooseopts");
	}
	/*if($scope.Validateuser == false){
		$state.go("forgotpassword");
	}*/
	$scope.resetForgetPassword=function(user){
		$(".loader").show();
		if(user.newpassword == "" || user.newpassword == undefined || user.confirmPassword == "" || user.confirmPassword == undefined){
			GlobalModule_notificationService.notification("error","Please enter password");
			$(".loader").fadeOut("slow");
			return;
		}
		if(user.newpassword != user.confirmPassword){
			GlobalModule_notificationService.notification("error","Password does not match.");
			$(".loader").fadeOut("slow");
			return;
		}
		$scope.usereailid1 = GlobalModule_dataStoreService.loadData('LoginModule','useremailid');	
		user.email=$scope.usereailid1;
		Login_Service.resetForgetPassword(user).then(function(response){

			$scope.resetstatus = response.data;
			if($scope.resetstatus == "success"){
				GlobalModule_notificationService.notification("success","Password reset successfully.");
				
				
				setTimeout(function(){
					$state.go("login");
				},1000);
			}
			$(".loader").fadeOut("slow");
		},function(response){

			$(".loader").fadeOut("slow");

		});	
	};

}]);