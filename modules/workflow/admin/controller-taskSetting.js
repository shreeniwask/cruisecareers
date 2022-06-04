var controllers = angular.module('LoginModule');

controllers.controller('TaskSetting_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','CreateTask_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,CreateTask_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.taskId= GlobalModule_dataStoreService.loadData('LoginModule','taskId');
	
	//console.log($scope.taskId);
	
	$scope.fetchWorkFlowNotificationReceivers=function(eventId){
		
		$(".loader").show();
		
		CreateTask_Service.fetchWorkFlowNotificationReceivers(eventId,$scope.taskId).then(function(response){
			 
			 $scope.notificationReceivers=response.data;
			 			
			 //console.log($scope.notificationReceivers);
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
		$(".loader").fadeOut("slow");
	};
	
	$scope.fetchWorkFlowNotificationReceivers(0);
	
	var fetchWorkFlowNotificationEvents=function(){
		
		$(".loader").show();
		
		CreateTask_Service.fetchWorkFlowNotificationEvents().then(function(response){
			 
			 $scope.notificationEvents=response.data;
			 			
			 //console.log($scope.notificationEvents);
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
		
		$(".loader").fadeOut("slow");		
	};
	
	fetchWorkFlowNotificationEvents();
	
	$scope.settingTabFlag=true;
	$scope.fetchTaskNotificationSetting=function(){
		
		$(".loader").show();
		$scope.settingTabFlag=true;
		CreateTask_Service.fetchTaskNotificationSetting($scope.taskId).then(function(response){
			 
			 $scope.notificationEventsSetting=response.data;
			 			
			 //console.log($scope.notificationEventsSetting);
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
		
		$(".loader").fadeOut("slow");		
	};
	
	$scope.fetchTaskNotificationSetting();
	
	/*$scope.receiversIds=[];
	$scope.pushReceiversId=function(receiverId){
		
		if($scope.receiversIds.indexOf(id) !== -1)
		{		
			var array  = $scope.receiversIds;
			var index = array.indexOf(id);
			$scope.receiversIds.splice(index,1);
		}
		else
		{		    	
			$scope.receiversIds.push(id);				      
		};
		
	};*/
	
	$scope.saveTaskSetting=function(notificationSetting){
		
		$(".loader").show();
		
		//notificationSetting.receivers =$scope.notificationReceivers;
				
		if(notificationSetting == undefined)
		{
			 GlobalModule_notificationService.notification("error","Please select all fields");
			 $(".loader").fadeOut("slow");
			 return;
		}
		
		notificationSetting.receivers =$scope.notificationReceivers;
				
		CreateTask_Service.saveTaskSetting(notificationSetting,$scope.taskId).then(function(response){
			 
			 var saveSettingFlag=response.data;
			 			
			 //console.log(saveSettingFlag);
			 
			 if(saveSettingFlag == 'success')
			 {
				 GlobalModule_notificationService.notification("success","Task notification setting saved successfully");
				 $state.reload();
			 }
			 else if(saveSettingFlag == 'receiver not selected')
		     {
				 GlobalModule_notificationService.notification("error","Please select at least one receiver");
				 $(".loader").fadeOut("slow");
		     }
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
		
		$(".loader").fadeOut("slow");

	};
	
	$scope.saveTaskSLA=function(taskSLA){
		
		$(".loader").show();
		
		if(taskSLA == undefined)
		{
			 GlobalModule_notificationService.notification("error","Please select all fields");
			 $(".loader").fadeOut("slow");
		}
		
		taskSLA.statusColorCode=$("#colorpicker").val();
		//console.log(taskSLA);
			//return;	
		CreateTask_Service.saveTaskSLA(taskSLA,$scope.taskId).then(function(response){
			 
			 var saveStatus=response.data;
			 			
			 console.log(saveStatus);
			 
			 if(saveStatus == 'success')
			 {			  
				 //$('#colorpicker').val();
				 $("#colorpicker").css("background-color", '#cccccc');
				 $('#status-name').val(null);
				 $('#percent').val(null);
				 $('#time-remaining').val(null);
				 
				 GlobalModule_notificationService.notification("success","Task notification setting saved successfully");
				 $scope.fetchTaskSLAList();
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'missing status name')
			 {
				 GlobalModule_notificationService.notification("error","Please enter status name");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'missing criteria')
			 {
				 GlobalModule_notificationService.notification("error","Please select criteria");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'missing percentage')
			 {
				 GlobalModule_notificationService.notification("error","Please enter percentage");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'negative percentage')
			 {
				 GlobalModule_notificationService.notification("error","Please enter valid percentage value");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus=='large value')
			 {
				 GlobalModule_notificationService.notification("error","Percentage value should be within 100");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'missing status color')
			 {
				 GlobalModule_notificationService.notification("error","Please select colour for status");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'duplicate color')
			 {
				 GlobalModule_notificationService.notification("error","Color already used");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'duplicate status name')
			 {
				 GlobalModule_notificationService.notification("error","Duplicate status name");
				 $(".loader").fadeOut("slow");
			 }
			 else if(saveStatus == 'duplicate criteria')
			 {
				 GlobalModule_notificationService.notification("error","This criteria already set");
				 $(".loader").fadeOut("slow");
			 }
				 
			 
		   },function(response){
			   
			  $(".loader").fadeOut("slow");
			  
		    });
		
		$(".loader").fadeOut("slow");

	};
	
	$scope.fetchTaskSLAList=function(){
		
		$(".loader").show();
		
		$scope.settingTabFlag=false;
		
		CreateTask_Service.fetchTaskSLAList($scope.taskId).then(function(response){
			 
			 $scope.taskSLAList=response.data;			 			
			 console.log($scope.taskSLAList);
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
		
		$(".loader").fadeOut("slow");		
	};
	
	//$scope.fetchTaskSLAList();
	
}]);