'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Wf_ticketStatusCount_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Wf_ticketStatusCount_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Wf_ticketStatusCount_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	
	$scope.fetchWorkFlowTicketStatusCount=function(){
		Wf_ticketStatusCount_Service.fetchWorkFlowTicketStatusCount($rootScope.userdetails.id).then(function(response){
			$scope.ticketStatusCount = response.data;
			
			console.log($scope.ticketStatusCount);
		});
	};
	$scope.fetchWorkFlowTicketStatusCount();
	
	
	$scope.fetchWfStatusColor=function(){
		Wf_ticketStatusCount_Service.fetchWfStatusColor().then(function(response){
			$scope.statusColor = response.data;
			
			console.log($scope.statusColor);
		});
	};
	$scope.fetchWfStatusColor();
	
	$scope.getTicketListByWorkflowId=function(workflowIdobj){
		
		workflowIdobj.setFlag=2;
		GlobalModule_dataStoreService.storeData('LoginModule','workflowObj',workflowIdobj);
		$state.go('restricted.admin.ticket');
	};
	
	
	$scope.goToGraph=function(workflowIdobj,index){
		console.log(workflowIdobj);
		var ticketsCount=$scope.ticketStatusCount[index].ticketAssignedCount +$scope.ticketStatusCount[index].ticketClosedCount+$scope.ticketStatusCount[index].ticketNotAssignedCount+$scope.ticketStatusCount[index].ticketOverDueCount;
		
		if(ticketsCount != 0)
		{
			GlobalModule_dataStoreService.storeData('LoginModule','userId',$rootScope.userdetails.id);
			GlobalModule_dataStoreService.storeData('LoginModule','workflowId',workflowIdobj.workFlowId);
			GlobalModule_dataStoreService.storeData('LoginModule','workflowName',workflowIdobj.name);
			GlobalModule_dataStoreService.storeData('LoginModule','workflowownerid',workflowIdobj.wf_Owner.ownerId);
			$state.go("restricted.admin.WfTicketsTasksStatusCount");
		}
		else
		{
			GlobalModule_notificationService.notification("error","This workflow does not contain any ticket(s)");
		}
	};
	
	
	
	
}]);