'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Admin_Layout_Cntrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	//console.log($rootScope.userdetails.roleMenuMapping.menus);	

	$scope.IsMenuEnabled = function(menuName){	
		//alert(menuName);
//	console.log($rootScope.userdetails.roleMenuMapping.menus);	

		for(var i=0;i<$rootScope.userdetails.roleMenuMapping.menus.length;i++)
		{
			if(menuName == $rootScope.userdetails.roleMenuMapping.menus[i].name)
			{
				return true;
			}
		}
		return false;
			
		
	};
	
}]);