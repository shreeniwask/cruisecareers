'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('changePassword_Ctrl',['$scope','$rootScope','$state','$stateParams','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','GlobalModule_User_activityService','Login_Service','Profile_Service','resetPassword_Service', function ($scope, $rootScope,$state,$stateParams,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,GlobalModule_User_activityService,Login_Service,Profile_Service,resetPassword_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	console.log($rootScope.userdetails);
	
	
	var validation=function(user){
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		
		if(user.password == undefined || user.password == "")
		{
			GlobalModule_notificationService.notification("error"," Please enter valid current password");
			return false;
			
		}
		else if(!(user.password.match(letterNumber))){
			GlobalModule_notificationService.notification("error"," Please enter valid current password");
			return false;
		}
		else if(user.newPassword == undefined || user.newPassword =="")
		{
			GlobalModule_notificationService.notification("error"," Please enter valid new password");
			return false;
		}
		else if(!(user.newPassword.match(letterNumber))){
			
			GlobalModule_notificationService.notification("error"," Please enter valid new password");
			return false;
		}
		else if(user.confirmPassword == undefined || user.confirmPassword == "")
		{
			GlobalModule_notificationService.notification("error","Please enter valid confirm password");
			return false;
		}
		else if(!(user.confirmPassword.match(letterNumber))){
			
			GlobalModule_notificationService.notification("error"," Please enter valid confirm password");
			return false;
		}else if(user.password == user.newPassword && user.password == user.confirmPassword )
		{
			GlobalModule_notificationService.notification("error","Password already exists");
			return false; 
		}
		return true;
	};
	
	
	
	
	$scope.resetPassword=function(user)
	{
		$(".loader").show();
		
		if(user == undefined){
			 GlobalModule_notificationService.notification("Please enter mandatory fileds");
			  $(".loader").fadeOut("slow");	
		}
		
		var validationFlag=validation(user);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }	
		
		if(user.newPassword == user.confirmPassword)
		{
			user.id=$rootScope.userdetails.id;
		
				resetPassword_Service.resetUserPassword(user).then(function(response){
				var savedStatus=response.data;
				
				if(savedStatus == 'success')
				{
					
					 $('#logout').modal({
						    backdrop: 'static',
						    keyboard: false
						})
					//GlobalModule_notificationService.notification("success","password changed successfully");
				}
				else if(savedStatus == 'worng Password'){
					  GlobalModule_notificationService.notification("error","Please enter valid current password");
	 				  $(".loader").fadeOut("slow");				 
				 }
				
			$(".loader").fadeOut("slow");
			},function(response){
				
				GlobalModule_notificationService.notification("error","Error in updating job fair");
				$(".loader").fadeOut("slow");
			});
		
		}else{
			GlobalModule_notificationService.notification("error","Please enter same new password and confirm password");
			$(".loader").fadeOut("slow");
		}	
		
	};
		
	
	
	$scope.logout = function(){			  			 
		Login_Service.logout($rootScope.userdetails);
		GlobalModule_dataStoreService.storeData('LoginModule','user',undefined);
		GlobalModule_dataStoreService.logout();
		 $(".modal-backdrop").hide();
	};
	
	
	$scope.cancel=function(){
		
		if($rootScope.userdetails.roleId ==1)
		{							
			$state.go("restricted.admin.admindashboard");					
		}
		else if($rootScope.userdetails.roleId == 8 || $rootScope.userdetails.roleId == 12){

			$state.go("restricted.admin.ownerdashboarddetails");
		}
		else if($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8)
		{
			$state.go("restricted.admin.approverdashboard");						
		}else if($rootScope.userdetails.roleId == 9){
			$state.go("restricted.admin.consulateverification");
		}
		else
		{							
			$state.go("restricted.dashboard");				  
		}			
	};
	
}]);