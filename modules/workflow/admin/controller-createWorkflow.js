var controllers = angular.module('LoginModule');

controllers.controller('CreateWorkflow_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','WorkflowsList_Service','Admin_Service','CreateWorkflow_Service','survey_assignment_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,WorkflowsList_Service,Admin_Service,CreateWorkflow_Service,survey_assignment_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	//console.log($scope.workflow);	
	
	var fetchWorkflowOwnerList = function(){
		
		 $(".loader").show();
			 
		 CreateWorkflow_Service.fetchWorkflowOwnerList().then(function(response){
			 $scope.ownersList=response.data;
			 //console.log($scope.ownersList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	fetchWorkflowOwnerList();
	
	 var fetchCategoryList = function(){
			
		 $(".loader").show();
		 
		  Login_Service.fetchCategoryList().then(function(response){
			  $scope.categoryList = response.data;			
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
		  
		  $(".loader").fadeOut("slow");
	  };
	  	
	 
	var fetchGroupList = function(){
		
		 $(".loader").show();
			 
		 CreateWorkflow_Service.fetchGroupList().then(function(response){
			 $scope.groupsList=response.data;
			 //console.log($scope.groupsList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.workflow=GlobalModule_dataStoreService.loadData('LoginModule','workflowObject');

	 if($scope.workflow != undefined)
	 {
		 fetchGroupList();
		 fetchCategoryList();		 
	 }
	 
	 var fetchFieldsList = function(){
			
		 $(".loader").show();
			 
		 CreateWorkflow_Service.fetchFieldsList().then(function(response){
			 $scope.fieldsList=response.data;
			 //console.log($scope.fieldsList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 
	 $scope.fetchEmployeeDetails=function(search){
			
			//var numval='^[0-9]$';
			
		if(search=="")
		{
			 
		}
		else{
			  
			if(search.length>3){
		  
				search= search.split("  ");
				search=search[0];
				survey_assignment_Service.fetchEmployeeDetails(search,8).then(function(response){
				
				$scope.userDetailsList = response.data;

			    $scope.EmployeeNumberList=[];
			  
			    if(search.charAt(0) >= 0 && search.charAt(0) <= 9)
			    {
				  
					for(var i=0;i<$scope.userDetailsList.length;i++)
					{
						  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].empl_number});
					}
			    }
			    else
			    {
					for(var i=0;i<$scope.userDetailsList.length;i++)
					{
						  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].email,roleName:$scope.userDetailsList[i].roleMaster.roleName});
					}
			    }
			  
		  },function(response){
			  
			});	 
		 }
	}		
 };
	 
	
	$scope.changeOwnersList=function(ownerTypeId){
		
		if(ownerTypeId == 2)
		{
			fetchGroupList();
		}
		else if(ownerTypeId == 3)
		{
			fetchCategoryList();
		}
	};	
	
		
	var findEmployeeId = function(){
				
		var employeeDetails=document.getElementById("userdetail").value;
		var employeeDetails= employeeDetails.split("  ");
		var m=0;
		if(employeeDetails[0] != undefined && $scope.userDetailsList != undefined)
		{
			if(employeeDetails[0].charAt(0) >= 0 && employeeDetails[0].charAt(0) <= 9)
			{
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{
					if($scope.userDetailsList[i].empl_number == employeeDetails[0])
					{
						m++;
						return $scope.userDetailsList[i].id;
					}
				}
			}
			else
			{
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{
				 	if(employeeDetails[0] == $scope.userDetailsList[i].email)
				 	{
				 		m++;
				 		return $scope.userDetailsList[i].id;
				 	}
				}
			}
		}
		if(m==0)
		{
			return m;
		}
	};
	
	var validateWorkflow = function(workflow){
		
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		
		if(workflow == undefined)
		{
			GlobalModule_notificationService.notification("error","Please fill all mandatory fields");
			return false;
		}
		if(workflow.name == undefined || !(workflow.name.match(letterNumber))){
	    	
			GlobalModule_notificationService.notification("error","Please enter valid Workflow name");
			return false;
	    }
	    if(workflow.shortName == undefined || !(workflow.shortName.match(letterNumber))){
	    	
			GlobalModule_notificationService.notification("error","Please enter valid short name");
			return false;
	    }
	    else if(workflow.shortName != undefined && workflow.shortName.match(letterNumber) && workflow.shortName.length > 6)
	    {
	    	GlobalModule_notificationService.notification("error","Length Limit for short name exceeded");
			return false;
	    }
	    if(workflow.description == undefined || !(workflow.description.match(letterNumber))){
	    	
			GlobalModule_notificationService.notification("error","Please enter valid description");
			return false;
	    }
	    else if(workflow.description != undefined && (workflow.description.match(letterNumber)) && workflow.description.length > 500)
	    {
	    	GlobalModule_notificationService.notification("error","You are exceeding the length limit for description");
			return false;
	    }
		if(workflow.wf_Owner == undefined || workflow.wf_Owner.id == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select owner type");
			return false;
		}
		if(workflow.wf_Owner != undefined && workflow.wf_Owner.ownerId == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select owner");
			return false;
		}
		if(workflow.wf_Owner != undefined && workflow.wf_Owner.id == 1 && workflow.wf_Owner.ownerId == 0)
		{
			GlobalModule_notificationService.notification("error","Please enter valid owner email");
			return false;
		}
	    /*if(workflow.name != undefined)
	    {
	    	var nameFlag=checkWorkName(workflow);
	    }*/
		
	    return true;
	};
		
	 $scope.createWorkFlow = function(workflow){
		 
		 $(".loader").show();
		 
		 if(workflow != undefined && workflow.wf_Owner != undefined && workflow.wf_Owner.id == 1)
		 {
			 if(document.getElementById("userdetail").value != undefined)
			 {				 
				 workflow.wf_Owner.ownerId=findEmployeeId();
			 }
		 }
		 
		 var validationFlag=validateWorkflow(workflow);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }	 
		 
		 //console.log(workflow);	
		 if($scope.workflow != undefined && $scope.workflow.cloneFlag != undefined)
		 {
			 workflow.cloneFlag=$scope.workflow.cloneFlag;
		 }
		 else if($scope.workflow == undefined || $scope.workflow.cloneFlag == false)
		 {
			 workflow.cloneFlag=false;
		 }
		 
		 workflow.createdby=$rootScope.userdetails.id;
		 
		 CreateWorkflow_Service.createWorkFlow(workflow).then(function(response){
			 var createWorkFlowStatus=response.data;
			 //console.log(createWorkFlowStatus);			 
			 if(createWorkFlowStatus == 'success')
			 {
				 	if(workflow.id == undefined || workflow.id == 0)
				 	{
				 		GlobalModule_notificationService.notification("success","Workflow has been created successfully");
				 	}
				 	else if(workflow.id != 0 && workflow.cloneFlag == false)
				 	{
				 		GlobalModule_notificationService.notification("success","Workflow has been updated successfully");
				 	}
				 	else if(workflow.cloneFlag == true)
				 	{
				 		GlobalModule_notificationService.notification("success","Workflow has been cloned successfully");
				 	}
				 	
					$state.go("restricted.admin.workflowlist");
			 }
			 else if(createWorkFlowStatus == 'DuplicateWorkflowName')
			 {
					GlobalModule_notificationService.notification("error","This Workflow name already exists.");
					$(".loader").fadeOut("slow");
					return;
			 }
			 else if(createWorkFlowStatus == 'DuplicateWorkflowShortName')
			 {
					GlobalModule_notificationService.notification("error","This Shortname already exists. ");
					$(".loader").fadeOut("slow");
					return;
			 }
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 });		 
	 };
	 
	 
	 
	 //--------------------Edit Work Flow---------------
	 
	 var fetchWorkFlowFieldsList= function(workflowId,colName,order){
		 
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
	 
	 if($scope.workflow != undefined)
	 {
		 fetchWorkFlowFieldsList($scope.workflow.id,null,null);
	 }
	 
	 
	 $scope.SortingWorkFlowFieldsList = function(colName){
		  
		  $scope.colName=colName;
		 
			if($scope.order == undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order != undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			
			if($scope.colName == null)
			{
			  $scope.colName = undefined; 
			}
						
			fetchWorkFlowFieldsList($scope.workflow.id,$scope.colName,$scope.order);	
	};
	 
	
	$scope.openAddFieldsPage=function(fieldId,workflow,addEditFlag){
		  					 
		 /*if(addEditFlag == 'edit')
		 {
			 GlobalModule_dataStoreService.storeData('LoginModule','fieldId',fieldId);
		 }*/
		 GlobalModule_dataStoreService.storeData('LoginModule','fieldId',fieldId);
		 GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		 $state.go("restricted.admin.addworkflowfield");
	  };
	
	
	  $scope.showDeleteModal= function(field){
			 
			 $scope.fieldObject=field;
			 $('#deletelist').modal('show');
		 };
	  
		 $scope.deleteWorkFlowFieldFromList= function(){
			 
			 $(".loader").show();
			 
			 CreateWorkflow_Service.deleteWorkFlowFieldFromList($scope.fieldObject,$scope.workflow.id).then(function(response){
				 
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
		 
		 
		 var showHideOwner=function(){
			 if($scope.workflow == undefined || $scope.workflow.id == undefined)
			 {
				 $scope.ownerFlag=true;
				 $scope.ownerInfoFlag=false;
			 }
			 else if($scope.workflow != undefined && $scope.workflow.id != undefined)
			 {
				 $scope.ownerFlag=false;
				 $scope.ownerInfoFlag=true;
			 }			 
		 };
		 showHideOwner();
		 
		 $scope.showDeleteModal= function(field){
			 
			 $scope.fieldObject=field;
			 $('#deletelist').modal('show');
		 };
	 /*$scope.openAddFieldModal=function(workflow){
		
		 $(".loader").show();
		 
		 if(workflow != undefined && workflow.wf_Owner != undefined && workflow.wf_Owner.id == 1)
		 {
			 if(document.getElementById("userdetail").value != undefined)
			 {				 
				 workflow.wf_Owner.ownerId=findEmployeeId();
			 }
		 }
		 
		 var validationFlag= validateWorkflow(workflow);
		 		 		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 else if(validationFlag)
		 {
				$('#add_sub-head').modal('show');
				$(".loader").fadeOut("slow");
		 }
		 fetchFieldsList();
		 $('#add_sub-head').modal('show');
		 $(".loader").fadeOut("slow");
	};*/
	/*if($scope.workflow != undefined)
	{
		if($scope.workflow.wf_Owner.id == 1)
		 {
			 document.getElementById('userdetail').value=$scope.workflow.wf_Owner.employeeDetail;
		 }
	}*/
		 
}]);