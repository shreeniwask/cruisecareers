'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('WalkIn_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
}]);