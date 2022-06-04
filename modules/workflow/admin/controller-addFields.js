var controllers = angular.module('LoginModule');

controllers.controller('WorkflowField_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','WorkflowsList_Service','Admin_Service','CreateWorkflow_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,WorkflowsList_Service,Admin_Service,CreateWorkflow_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');

	$scope.workflow=GlobalModule_dataStoreService.loadData('LoginModule','workflowObject');
	console.log($scope.workflow);
	$scope.fieldId=GlobalModule_dataStoreService.loadData('LoginModule','fieldId');
	
	$scope.workflow.wf_FieldMaster={options:[],prefilledFlag:false};
	$scope.workflow.wf_FieldMaster.wf_ValidationMaster={fileType:[],fileSizeUnit:'kb',referenceId:3};

	var fetchFieldsList = function(){
		
		 $(".loader").show();
			 
		 CreateWorkflow_Service.fetchFieldsList().then(function(response){
			 $scope.fieldsList=response.data;
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 fetchFieldsList();
	 	 
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
			 console.log($scope.workflowFieldList);
			 $scope.workflowFieldList=response.data;
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });
		 
		 $(".loader").fadeOut("slow");
	 };
	 
	 fetchWorkFlowFieldsList($scope.workflow.id,null,null);
	 
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
	 
	 var validateDateFormat= function(workflow){
		 
		 var dateRegex1=/^([\d\D]{2})\-([\m\M]{2})\-([\y\Y]{4})$/;
		 var dateRegex2=/^([\d\D]{2})\/([\m\M]{2})\/([\y\Y]{4})$/;
		 var dateRegex3=/^([\y\Y]{4})\-([\m\M]{2})\-([\d\D]{2})$/;
		 var dateRegex4=/^([\y\Y]{4})\/([\m\M]{2})\/([\d\D]{2})$/;
		 var dateRegex5=/^([\m\M]{2})\/([\d\D]{2})\/([\y\Y]{4})$/;
		 var dateRegex6=/^([\m\M]{2})\-([\d\D]{2})\-([\y\Y]{4})$/;
		 
		 if(workflow.wf_FieldMaster.wf_ValidationMaster.dateFormat != undefined)
		 {
			 var dateString=workflow.wf_FieldMaster.wf_ValidationMaster.dateFormat;
			 
			 if(dateString.match(dateRegex1) || dateString.match(dateRegex2) || dateString.match(dateRegex3) || dateString.match(dateRegex4) || dateString.match(dateRegex5) || dateString.match(dateRegex6))
			 {
				 return true;
			 }
			 else
			 {
				 return false;
			 }
		 }
		 /*else
		 {
			 return false;
		 }*/
		 
		 
			 		 
	 };
	 
	 var validateField= function(workflow){
		 
		 var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		 
		 if(workflow.wf_FieldMaster.id == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please select field");
			 return false;
		 }
		 if(workflow.wf_FieldMaster.label == undefined || !(workflow.wf_FieldMaster.label.match(letterNumber)))
		 {
			 GlobalModule_notificationService.notification("error","Please enter label");
			 return false;
		 }
		 if(workflow.wf_FieldMaster.required == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please select 'Is Required' field");
			 return false;
		 }
		 if(workflow.wf_FieldMaster.id == 1 || workflow.wf_FieldMaster.id == 2)
		 {
			 if(workflow.wf_FieldMaster.id == 1 && (workflow.wf_FieldMaster.wf_ValidationMaster.characterOnly == undefined && workflow.wf_FieldMaster.wf_ValidationMaster.numberOnly == undefined && workflow.wf_FieldMaster.wf_ValidationMaster.password == undefined && workflow.wf_FieldMaster.wf_ValidationMaster.emailFormat == undefined))
			 {
				 GlobalModule_notificationService.notification("error","Please choose validation");
				 return false;
			 }
			 if((workflow.wf_FieldMaster.id == 2 || workflow.wf_FieldMaster.id == 1) && workflow.wf_FieldMaster.wf_ValidationMaster.fieldLength == undefined)
			 {
				 GlobalModule_notificationService.notification("error","Please enter maximum length for this field ");
				 return false;
			 }
			 else if((workflow.wf_FieldMaster.id == 2 || workflow.wf_FieldMaster.id == 1) && workflow.wf_FieldMaster.wf_ValidationMaster.fieldLength <= 0)
			 {
				 GlobalModule_notificationService.notification("error","Please enter valid value for length ");
				 return false;
			 }
		 }
		 else if(workflow.wf_FieldMaster.id == 8)
		 {
			 if(workflow.wf_FieldMaster.wf_ValidationMaster.dateFormat != undefined)
			{	 
			 var dateValidationFlag=validateDateFormat(workflow);
			 
			 if(!dateValidationFlag)
			 {
					GlobalModule_notificationService.notification("error","Please enter valid date format");
					return false;
			 }
		 }
		 }
		 else if(workflow.wf_FieldMaster.id >= 3 && workflow.wf_FieldMaster.id <= 5)
		 {
			 if(workflow.wf_FieldMaster.options.length == 0)
			 {
				 GlobalModule_notificationService.notification("error","Please provide at least one option for this field");				 
				 return false;
			 }
		 }
		 else if(workflow.wf_FieldMaster.id == 6)
		 {
			 if(workflow.wf_FieldMaster.wf_ValidationMaster.fileType.length == 0)
			 {
				 GlobalModule_notificationService.notification("error","Please select upload file type");				 
				 return false;
			 }
			 if(workflow.wf_FieldMaster.wf_ValidationMaster.fileSize == undefined)
			 {
				 GlobalModule_notificationService.notification("error","Please enter upload file size");				 
				 return false;
			 }
		 }
		 
		 for(var i=0;i<$scope.workflowFieldList.length;i++)
		 {
			 if($scope.workflowFieldList[i].label.localeCompare(workflow.wf_FieldMaster.label) == 0)
			 {
				 GlobalModule_notificationService.notification("error","This field already exist");
				 return false;
			 }
		 }
		 
		 return true;
	 };
	 	 
	 $scope.saveWorkFlowField= function(workflow){
		 						
		 $(".loader").show();

		 var validationFlag = validateField(workflow);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		if(workflow.wf_FieldMaster.id == 8 && workflow.wf_FieldMaster.wf_ValidationMaster.dateFormat == undefined)
		{
			workflow.wf_FieldMaster.wf_ValidationMaster.dateFormat="dd-mm-yyyy";
		}
		
		
		 workflow.createdby=$rootScope.userdetails.id;
		 //console.log(workflow.wf_FieldMaster.id);
		 
		 CreateWorkflow_Service.saveWorkFlowField(workflow).then(function(response){
			 var addFieldStatus=response.data;
			 
			 if(addFieldStatus == 'success')
			 {
					GlobalModule_notificationService.notification("success","Field has been added successfully");
					fetchWorkFlowFieldsList(workflow.id);
			 }
			 $state.reload();
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 
	 $scope.itemname="";
	 
	 $scope.addItemInList= function(optionvalue){
		
		 var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		 		 
		 if(optionvalue == '')
		 {
			 GlobalModule_notificationService.notification("error","Please enter option");
			 return;
		 }
		 
		 if(!(optionvalue.match(letterNumber)))
		 {
			 GlobalModule_notificationService.notification("error","Please enter valid option value");
			 return;
		 }
		 
		 if($scope.workflow.wf_FieldMaster.options.indexOf(optionvalue) != -1)
		 {
			 GlobalModule_notificationService.notification("error","Option already exist");
			 return;
		 }
		 
		 $scope.workflow.wf_FieldMaster.options.push(optionvalue);
		 	 
		 optionvalue="";
		 
		 document.getElementById('list-item').value="";		 
	 };
	 
	 $scope.pushIntoIdInFileTypeList= function(typeId,index){
		 
		 if($('#file' + index).is(":checked") && $scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileType.indexOf(typeId) == -1)
		 {
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileType.push(typeId);
		 }
		 else if(!($('#file' + index).is(":checked")) && $scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileType.indexOf(typeId) != -1)
		 {
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileType.splice($scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileType.indexOf(typeId),1);
		 }
	 };
	 
	 $scope.setFileUnit= function(index){
		 
		 if($("#"+index).prop("checked"))
		 {
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.fileSizeUnit=index;
		 }
	 };
	 
	 
	 $scope.changeFieldType= function(fieldId){
		 $scope.wf_FieldMaster={wf_ValidationMaster:{options:[]}};
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
	 
	 $scope.showDeleteModal= function(field){
		 
		 $scope.fieldObject=field;
		 $('#deletelist').modal('show');
	 };
	 
	 $scope.pushReferenceValue= function()
	 {
		 if($("#textCheck1").prop("checked"))
		 {
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.referenceId=3;			 
		 }
		 else if($("#textCheck2").prop("checked"))
		 {
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.referenceId=2;		 
		 }
	 };
	 
	 $scope.unCheckOther= function(checkBox){
		 
		 if(checkBox==1)
		{
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.numberOnly=false;
			 			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.password=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.emailFormat=false;
		}
		 else if(checkBox==2)
		{			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.characterOnly=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.password=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.emailFormat=false;
		}
		 else if(checkBox==3)
		{
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.numberOnly=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.characterOnly=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.emailFormat=false;
			 
		}
		 else if(checkBox==4)
		{
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.numberOnly=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.characterOnly=false;
			 
			 $scope.workflow.wf_FieldMaster.wf_ValidationMaster.password=false;
			 
		}		 
	 };
	 
	 
	 var fetchWorkflowFieldDetails= function(){
		 
		 $(".loader").show();
		 
		 CreateWorkflow_Service.fetchWorkflowFieldDetails($scope.fieldId).then(function(response){
			 
			 $scope.workFlowFieldDetail=response.data;			 			 			 
			 			 
		 },function(response){
			  $(".loader").fadeOut("slow");
		 });
		 
		 $(".loader").fadeOut("slow");
	 };
	 
	 $scope.selectedItemChanged= function(field){
		   if(field==1)
			   {
			    	$("#identifierField").show();
			   }
		   else{
			   		document.getElementById("prefilled-check1").checked = false;
			   		$("#identifierField").hide();
		   }
		 };
	 
		 $scope.checkFunction= function(flag){
			   if(flag == true)
				   {
				      $("#prefilled-check1").attr('disabled',false);
				   }
			   else{
				   $("#prefilled-check1").attr('disabled',true);
				   document.getElementById("prefilled-check1").checked = false;
				   
			   }
			 };
		 
		 
		 
		 
	 //fetchWorkflowFieldDetails();
	 
}]);