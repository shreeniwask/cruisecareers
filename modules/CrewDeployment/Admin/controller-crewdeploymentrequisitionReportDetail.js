'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewDeploymentRequisitionReportDetail_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CrewDeployRequisitionMaster_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CrewDeployRequisitionMaster_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
		
				console.log("Start@@@@@");
}]);