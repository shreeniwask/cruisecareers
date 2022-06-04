'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('UserCareerFair_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Master_Service','Admin_Service','UserCareerFair_Service',function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Master_Service,Admin_Service,UserCareerFair_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
}]);