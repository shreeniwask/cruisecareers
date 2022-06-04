var controllers = angular.module('LoginModule');

controllers.controller('CreateTask_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','WorkflowsList_Service','Admin_Service','CreateWorkflow_Service','CreateTask_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,WorkflowsList_Service,Admin_Service,CreateWorkflow_Service,CreateTask_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');

	$scope.workflow= GlobalModule_dataStoreService.loadData('LoginModule','workflowObject');
	$scope.saveTaskButton;
	$scope.updateTaskButton;
	$scope.wf_Task=GlobalModule_dataStoreService.loadData('LoginModule','task');
	$scope.updateTaskFlag=GlobalModule_dataStoreService.loadData('LoginModule','updateTaskFlag');
	$scope.saveTaskFlag=GlobalModule_dataStoreService.loadData('LoginModule','saveTaskFlag');
	$scope.selectedFiledFlag=GlobalModule_dataStoreService.loadData('LoginModule','selectedFiledFlag',true);
	//console.log($scope.wf_Task);
	if($scope.updateTaskFlag){
		$scope.saveTaskButton=false;
		$scope.updateTaskButton=true;
	}
	if($scope.saveTaskFlag){
		$scope.saveTaskButton=true;
		$scope.updateTaskButton=false;
	}
	//$scope.wf_Task.slaDate=new Date();
	//$scope.wf_Task.slaDate=wf_Task.slaDate;
	/*$scope.onloadActiveDate=function(){
		$('#activation-date').datetimepicker({
			  minDate: new Date(),
		format: 'DD-MM-YYYY LT'
			  });
		};*/
	
	var fetchTasksFieldsdetails=function(){
		 
		 $(".loader").show();
		 
		 var taskId=0;
		 
		 if($scope.wf_Task != undefined)
		 {
			 taskId=$scope.wf_Task.id;
			 $scope.slatype=$scope.wf_Task.slaType;	
		 }
		 
		/* CreateTask_Service.fetchTasksFieldsdetails($scope.workflow.id,taskId).then(function(response){
			 
			 $scope.workflowFieldList=response.data;
			 			
			 console.log($scope.workflowFieldList);
			 		 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });*/
             CreateTask_Service.fetchTasksFieldsdetailsByTaskId($scope.workflow.id,taskId).then(function(response){
			 
			 $scope.workflowFieldList2=response.data;
			 			
			 //console.log($scope.workflowFieldList);
			 		 
		   },function(response){
			  $(".loader").fadeOut("slow");
		    });
              CreateTask_Service.fetchTasksFieldsdetailsNotUsedInTask($scope.workflow.id,taskId).then(function(response){
     			 
     			 $scope.workflowFieldList1=response.data;
     			 			
     			 //console.log($scope.workflowFieldList);
     			 		 
     		 },function(response){
     			  $(".loader").fadeOut("slow");
     		 });
		 $(".loader").fadeOut("slow");
		 
	 };
	 if($scope.workflow != undefined)
	 {
		 fetchTasksFieldsdetails();
		 
	 }
	
	/*var fetchWorkFlowFieldsList= function(workflowId,colName,order){
		 
		 $(".loader").show();

		 if(colName == null || colName== "")
		 {
			 colName = undefined;
		 }
		 if(order == null)
		 {
			 order = undefined;
		 }
		 
		 CreateWorkflow_Service.fetchWorkFlowFieldsList(workflowId,colName,order).then(function(response){
			 
			 $scope.workflowFieldList=response.data;
			 //console.log($scope.workflowFieldList);
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });
		 
		 $(".loader").fadeOut("slow");
	 };
	 
	 if($scope.workflow != undefined && $scope.wf_Task == undefined)
	 {
		 fetchWorkFlowFieldsList($scope.workflow.id,null,null);
	 }*/
	 	 
	 var validateTask= function(wf_Task){
		 
		 var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		 
		 if(wf_Task == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please fill all mandatory fields");			 
			 return false;
		 }
		 if(wf_Task.name == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Task name");			 
			 return false;
		 }
		 else
		 {
			 if(!(wf_Task.name.match(letterNumber)))
			 {
				 GlobalModule_notificationService.notification("error","Please Enter valid Task name");			 
				 return false;
			 }
		 }
		 if($scope.slatype == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Select SLA");			 
			 return false;
		 }
		 else if($scope.slatype == 1 && wf_Task.slaDays == undefined && wf_Task.slaHours == undefined && wf_Task.slaMinutes == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Estimated time");			 
			 return false;
		 }
		 else if($scope.slatype == 1 && (wf_Task.slaDays <= 0 && wf_Task.slaHours <= 0 && wf_Task.slaMinutes <= 0))
		 {
			 GlobalModule_notificationService.notification("error","Please Enter valid estimated time");			 
			 return false;
		 }
		 else if($scope.slatype == 2 && wf_Task.slaDate == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Fixed date");			 
			 return false;
		 }
		 
		 /*if($scope.workflowFieldList2.length == 0)
		 {
			 GlobalModule_notificationService.notification("error","Please Select at least one field");			 
			 return false;
		 }*/
		 
		 if($scope.workflowFieldList1.length != 0)
		 {
			 var temp=0;
			 
			 for(var i=0; i<$scope.workflowFieldList1.length; i++)
				{	
					 if($scope.workflowFieldList1[i].addedInTask == true || $scope.workflowFieldList2.length != 0)
					 {
					 	temp++;
					 	break;
					 }
				}	
				 		 
				if(temp == 0)
				{
					GlobalModule_notificationService.notification("error","Please Select at least one field");			 
					return false;
				}
		 }
		 
		 
		return true;
	 };
	 
	 //$scope.today = new Date();
	 
	 $scope.createTask= function(wf_Task){
		 
		 //console.log(wf_Task);
		 
		 $(".loader").show();
		 
		 if($("#datetimepicker").val() != undefined && $("#datetimepicker").val() != "")
		 {
			 wf_Task.slaDate =$("#datetimepicker").val();
		 }
		 
		 var validationFlag=validateTask(wf_Task);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 
		 wf_Task.wf_FieldMasters =$scope.workflowFieldList1;
		 //console.log($scope.workflowFieldList1);
		 
		 wf_Task.createdby=$rootScope.userdetails.id;
		 wf_Task.workFlow=$scope.workflow;
		
		 CreateTask_Service.createTask(wf_Task).then(function(response){
			 
			 var createTaskStatus=response.data;
			 //console.log(createTaskStatus);
			 
			 console.log(wf_Task.slaDate);
			 
			 if(createTaskStatus == 'success')
			 {
				 GlobalModule_notificationService.notification("success","Task has been created successfully");
				 $state.go("restricted.admin.taskslist");
			 }
			 if(createTaskStatus == 'duplicateTaskName')
			 {
				 GlobalModule_notificationService.notification("error","Duplicate Task name");
				 $(".loader").fadeOut("slow");
				 return;
			 }
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });
		 
		 $(".loader").fadeOut("slow");
	 };
	 
	 $scope.addAllFields=function(all){
		 		 				 
		for(var i=0; i<$scope.workflowFieldList1.length; i++)
		{					  
			$scope.workflowFieldList1[i].addedInTask=all;													  
		}
		
	 };
	 
	 $scope.showSLA=function(slatype){
	
		 $scope.slatype=slatype;
	 };
     $scope.deleteWorkFlowFieldFromList= function(){
		 
		 $(".loader").show();
		 
		 CreateTask_Service.deleteWorkFlowFieldFromListByTaskId($scope.fieldObject.id,$scope.workflow.id,$scope.wf_Task.id).then(function(response){
			 
			 var deleteWorkFlowField=response.data;
			 			 
			 if(deleteWorkFlowField == 'success')
			 {
					GlobalModule_notificationService.notification("success","Field has been deleted successfully");
					$state.reload();
			 }
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });	
		 
		 $(".loader").fadeOut("slow");
	 };
	 
	 $scope.showDeleteModal= function(field){
		 
		 $scope.fieldObject=field;
		 $('#deletelist').modal('show');
	 };
	 
      /*$scope.updateTask= function(wf_Task){
		 console.log(wf_Task);
		 
		 $(".loader").show();
		 if($("#datetimepicker").val() != undefined && $("#datetimepicker").val() != "")
		 {
			 wf_Task.slaDate =$("#datetimepicker").val();
		 }
		 
		 var validationFlag=validateUpdateTask(wf_Task);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 
		 wf_Task.wf_FieldMasters =$scope.workflowFieldList1;
		 console.log("hello");
		 console.log($scope.workflowFieldList1);
		 
		 wf_Task.createdby=$rootScope.userdetails.id;
		 wf_Task.workFlow=$scope.workflow;
		
		 CreateTask_Service.updateTask(wf_Task).then(function(response){
			 
			 var createTaskStatus=response.data;
			 //console.log(createTaskStatus);
			 
			 if(createTaskStatus == 'success')
			 {
				 GlobalModule_notificationService.notification("success","Task has been created successfully");
				 $state.go("restricted.admin.taskslist");
			 }
			 if(createTaskStatus == 'duplicateTaskName')
			 {
				 GlobalModule_notificationService.notification("error","Duplicate Task name");
				 $(".loader").fadeOut("slow");
				 return;
			 }
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });
		 
		 $(".loader").fadeOut("slow");
	 };
 var validateUpdateTask= function(wf_Task){
		 
		 var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		 
		 if(wf_Task == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please fill all mandatory fields");			 
			 return false;
		 }
		 if(wf_Task.name == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Task name");			 
			 return false;
		 }
		 else
		 {
			 if(!(wf_Task.name.match(letterNumber)))
			 {
				 GlobalModule_notificationService.notification("error","Please Enter valid Task name");			 
				 return false;
			 }
		 }
		 if($scope.slatype == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Select SLA");			 
			 return false;
		 }
		 else if($scope.slatype == 1 && wf_Task.slaDays == undefined && wf_Task.slaHours == undefined && wf_Task.slaMinutes == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Estimated time");			 
			 return false;
		 }
		 else if($scope.slatype == 1 && (wf_Task.slaDays < 0 || wf_Task.slaHours < 0 || wf_Task.slaMinutes < 0))
		 {
			 GlobalModule_notificationService.notification("error","Please Enter valid estimated time");			 
			 return false;
		 }
		 else if($scope.slatype == 2 && wf_Task.slaDate == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please Enter Fixed date");			 
			 return false;
		 }
		 
		 		 
		 var temp=0;
		 for(var i=0; i<$scope.workflowFieldList1.length; i++)
		{	
			 if($scope.workflowFieldList1[i].addedInTask == true)
			 {
			 	temp++;
			 	break;
			 }
		}	
		 		 
		if(temp == 0)
		{
			GlobalModule_notificationService.notification("error","Please Select at least one field");			 
			return false;
		}
		 
		return true;
	 };*/
	 
	 	 	 	
}]);