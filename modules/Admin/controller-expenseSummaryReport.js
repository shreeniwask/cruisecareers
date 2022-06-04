'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('adminSummaryreport_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Employee_Expenses','Employee_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Employee_Expenses,Employee_Service){

	$scope.expenseObject=GlobalModule_dataStoreService.loadData('LoginModule','expenseObject');
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
	
	$scope.approverTabFlag=GlobalModule_dataStoreService.loadData('LoginModule','approverTabFlag');
	
	
	
	$scope.fetchSummaryReport=function(id){
		$(".loader").show();
		
		Employee_Service.fetchSummaryReport(id).then(function(response){
			$scope.summaryReportList = response.data;	
			//console.log($scope.summaryReportList);			
		});
		
		$(".loader").fadeOut("slow");
	};
	$scope.fetchSummaryReport($scope.expenseObject.claimedNumber);
		
	
	 
	/* $scope.generateExcelForClaim = function(){		 
		  if($scope.search == undefined){
			  $scope.search ="";
		  }			 
		 window.open('download?claimedId='+$scope.expenseObject.claimedNumber+'&userId='+$rootScope.userdetails.id+'&screenId='+19+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&approverTabFlag='+$scope.approverTabFlag+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  };*/
	
	  $scope.generateExcel = function(){		 
		  if($scope.search == undefined){
			  $scope.search ="";
		  }			 
		 window.open('download?claimedId='+$scope.expenseObject.claimedNumber+'&userId='+$rootScope.userdetails.id+'&screenId='+19+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&approverTabFlag='+$scope.approverTabFlag+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  };
	  $scope.dateformate = function(date){		     
		    var dateOut = moment(date).format("DD-MM-YYYY");
		    return dateOut;
		};
	
}]);