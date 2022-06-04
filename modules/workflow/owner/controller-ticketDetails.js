'use strict';

var controllers = angular.module('LoginModule');
controllers.directive('allow1', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, addTicket_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var transformedInput = text.replace(/[^0-9]/g, '');

	                if (transformedInput !== text) {
	                	addTicket_Ctrl.$setViewValue(transformedInput);
	                	addTicket_Ctrl.$render();
	                }
	                return transformedInput;
	            }
	            return undefined;
	        }            
	        addTicket_Ctrl.$parsers.push(fromUser);
	    }
	};
	});

controllers.directive('allow3', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, addTicket_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var decimal = text.replace(/[^0-9\.]/g, '');

	                if (decimal !== text) {
	                	addTicket_Ctrl.$setViewValue(decimal);
	                	addTicket_Ctrl.$render();
	                }
	                return decimal;
	            }
	            return undefined;
	        }            
	        addTicket_Ctrl.$parsers.push(fromUser);
	    }
	};
	});


	(function() {

		controllers.directive('allow2', onlyLettersInput);
		  
		  function onlyLettersInput() {
		      return {
		        require: 'ngModel',
		        link: function(scope, element, attr, addTicket_Ctrl) {
		          function fromUser(text) {
		            var transformedInput = text.replace(/[^a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]/g, '');
		            //console.log(transformedInput);
		            if (transformedInput !== text) {
		            	addTicket_Ctrl.$setViewValue(transformedInput);
		            	addTicket_Ctrl.$render();
		            }
		            return transformedInput;
		          }
		          addTicket_Ctrl.$parsers.push(fromUser);
		        }
		      };
		    };

		})();
	
	

controllers.controller('TicketDetails_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','ticket_Service','TicketDetails_Service','CreateWorkflow_Service','survey_assignment_Service','addTicket_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,ticket_Service,TicketDetails_Service,CreateWorkflow_Service,survey_assignment_Service,addTicket_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.ticket=GlobalModule_dataStoreService.loadData('LoginModule','ticketObject');
	console.log($scope.ticket);
	$scope.workflow=GlobalModule_dataStoreService.loadData('LoginModule','ownerWorkflowObject');
	//console.log($scope.workflow);	
	//console.log($scope.ticket);	
	
	
	
	$scope.fetchTaskFields=function(taskDetails){
		
		$(".loader").show();
		
		$scope.taskName1=taskDetails.name;
		//if(taskDetails.taskShowFlag== true)
		//{
		$scope.taskName=taskDetails.name;
		//}
		$scope.taskId=taskDetails.id;
		$scope.taskInfo=taskDetails;
	   console.log($scope.taskInfo);
		$("#prefilled-fields").show();
		TicketDetails_Service.fetchTaskFields(taskDetails,$scope.ticket.ticketId,$scope.workflow.workFlowId).then(function(response){
			
			$scope.taskDetails=response.data;
			
				console.log($scope.taskDetails);
			$('#save').show();
			$('#prefilledsunmit').show();
			//$scope.fetchTicketDetailsPrefield();
			$("#task-fields").show();
		
			//$('#prefilledsunmit').hide();
			
			//$( "#task-fields" ).load(window.location.href + "#task-fields");
			//console.log($scope.taskDetails);
			
			  },function(response){
				  $(".loader").fadeOut("slow");
		    });	
		$(".loader").fadeOut("slow");
	};
	
	$scope.fetchTicketDetails=function(){
		
		$(".loader").show();
		
		TicketDetails_Service.fetchTicketDetails($scope.ticket.ticketId,$rootScope.userdetails,$scope.workflow.wf_Owner.ownerId).then(function(response){
			 
			$scope.prefilledLists=[];
			
			$("#task-fields").hide();
						
			$scope.ticketDetails=response.data;
			$scope.identifierFields=$scope.ticketDetails.identifierFields;
			console.log($scope.identifierFields);
			console.log($scope.ticketDetails);
			$scope.fetchTaskFields($scope.ticketDetails.ticketTasks[0]);
			// $("#prefilled-fields").show();
			
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 });		
	};
	
	
	
	
	$scope.fetchTicketDetails();
	
	
	
$scope.fetchTicketDetailsPrefield=function(){
		
		$(".loader").show();
		
		
		TicketDetails_Service.fetchTicketDetails($scope.ticket.ticketId,$rootScope.userdetails,$scope.workflow.wf_Owner.ownerId).then(function(response){
			
			$scope.prefilledLists=[];
			$("#task-fields").show();			
			$scope.ticketDetails1=response.data;
			 console.log($scope.ticketDetails1);
			$("#prefilled-fields").show();			 
			$(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 });		
	};
	
	$scope.fetchTicketDetailsPrefield();
	
	
  /*$scope.dateformate = function(date){		     
		if(date==null)
  	 {
  	 	return;
  	 }
		var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
		
		return dateOut;
 };*/
     /*$scope.validateUser=function(evt){
		var id = document.getElementById('userDetails-'+evt).options[0].getAttribute('data-id');
		$scope.ticketListWithTicket[evt].userid=id;
		
	};*/

     $scope.ownersList=[];
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
	$scope.usertypeid1;
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

	$scope.changeOwnersList=function(ownerTypeId){
		//console.log($scope.ticketListWithTicket);
		if(ownerTypeId == 2)
		{
			fetchGroupList();
		}
		else if(ownerTypeId == 3)
		{
			fetchCategoryList();
		}
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
	 $scope.assignTask=function(task){
		 $scope.ownerFlag=true;
		    $scope.ownersList=[];
		    fetchWorkflowOwnerList();
		    $scope.ticketListWithTicket=[];
		    $scope.ticketListWithTicket.push(task);
		  		//console.log($scope.ticketListWithTicket);
		  		 $('#assignnmentTaskUser').modal('show');
		  
			//console.log(ticketIdList);
			if(ticketIdList.length==0 || ticketIdList==null){
				GlobalModule_notificationService.notification("error","Select One ticket into ticket List");
			}
			if(ticketIdList.length==1){
				
				 if($scope.ticketStatusId1 ==1){
				
					 fetchWorkflowOwnerList();
			       var ticketId=13;
				    ticket_Service.fetchTaskListDetails(ticketIdList[0],$scope.workflowID,$rootScope.userdetails.id).then(function(response){
						$scope.ticketListWithTicket = response.data;
						if(response.data !=null){
							 $('#assignnment-Task-User').modal('show');
						   }else{
								 GlobalModule_notificationService.notification("error","this ticket number allready assign other");	 

						    }
						
						  //console.log($scope.ticketListWithTicket);
						 // data-target="#assignnment-details" data-toggle="modal"		  
							 
					     $(".loader").fadeOut("slow");
				         },function(response){
					  $(".loader").fadeOut("slow");
					});
				  
					ticket_Service.fetchOwnerType().then(function(response){
						$scope.OwnerTypeList = response.data;
						  //console.log(response.data);
						 // data-target="#assignnment-details" data-toggle="modal"		  
							 
					     $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
				 }else{
					 GlobalModule_notificationService.notification("error","this ticket number allready assign other");	 
				 }
				 
			}else{
				ticketIdList=[];
				GlobalModule_notificationService.notification("error","Select only one ticket into ticket List");
			}
			
		};
		$scope.assignTaskUserGroupDepartment = function(){
			 $(".loader").show();
			 var status=true;
			 var errorStayus=false;
			 var typeStatus=false;
			 //console.log($scope.ticketListWithTicket);
			 for(var i=0;i<$scope.ticketListWithTicket.length;i++)
			{     
				// if($scope.ticketListWithTicket[i].checkTaskStatus && $scope.ticketListWithTicket[i].checkTaskStatus!=""){
				   if($scope.ticketListWithTicket[i].userTypeId==1 ){
					   if($scope.ticketListWithTicket[i].userid==0|| $scope.ticketListWithTicket[i].userid=="" || $scope.ticketListWithTicket[i].userid==undefined){
						 {status=false; 
						errorStayus=true;
						}
					 }
					} 
				   else if($scope.ticketListWithTicket[i].userTypeId==2 ){
				        if($scope.ticketListWithTicket[i].groupId==0||$scope.ticketListWithTicket[i].groupId=="" || $scope.ticketListWithTicket[i].groupId==undefined){
						status=false; 
						errorStayus=true;
						
				    }
				   }
				   
				   else if($scope.ticketListWithTicket[i].userTypeId==3 ){
				   if($scope.ticketListWithTicket[i].departmentId==0||$scope.ticketListWithTicket[i].departmentId==""|| $scope.ticketListWithTicket[i].departmentId==undefined){
					  status=false; 
					  errorStayus=true;
					  
				    }
				   }
				 //}
			 else{
					 status=false; 
					 typeStatus=true;
				 }
				if($scope.ticketListWithTicket[i].userTypeId==1 && $scope.ticketListWithTicket[i].userid==0){
					status=false; 
					
				 }
			}
			 if(status){
			//console.log($scope.ticketListWithTicket);
			var ticketIdList=[];
			    ticketIdList.push(1);
			 ticket_Service.assignTaskUserGroupDepartment($scope.ticketListWithTicket,ticketIdList[0],$scope.workflowId,$rootScope.userdetails.id).then(function(response){
				 $scope.ownersList=response.data;
				 //$('#assignnment-details').hide();
				 if(response.data=="success"){
				 $('#assignnmentTaskUser').modal("hide");
				 //$scope.fetchTicketList1(0,10,null,null,null);
				 GlobalModule_notificationService.notification("success","Task Assign Successfully");
				 ticketIdList=[];
				 }
				 if(response.data=="failed"){
					// $scope.fetchTicketList1(0,10,null,null,null);
					 ticket_Service.fetchOwnerType().then(function(response){
							$scope.OwnerTypeList = response.data;
							  //console.log(response.data);
						     $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
					 
					 $('#assignnmentTaskUser').modal("hide");
					 GlobalModule_notificationService.notification("error","Select at least one task");

					 
					 }
				  //console.log($scope.ownersList);
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 });
			 }else if(errorStayus){
				 GlobalModule_notificationService.notification("error"," Plese select valid data from dropdown ");
				 $(".loader").fadeOut("slow");
			 }else if(typeStatus){
				 GlobalModule_notificationService.notification("error"," Plese select Owner Type ");
				 $(".loader").fadeOut("slow"); 
			 }
			 
			 else{
				 $scope.accessTypeList();
				 GlobalModule_notificationService.notification("error","select valid user from list");
				 $(".loader").fadeOut("slow");
			 }
		 };
 
 
 
 var colspsid=0;
 $scope.collapsedData=function(indexId){
	 if(colspsid==0){
		 colspsid=colspsid+1;
		 $('.collaps-div').removeClass('active');
		$("#tab"+indexId).show(); 
	 }else{
		 colspsid=colspsid-1;
		 $("#tab"+indexId).hide();  
	 }
	 
 };
 $scope.callbackTicketList= function(){
		// alert("hello");
		 $state.go('restricted.ticket');
		
		 
	 } ;
	 //$scope.workflowdDataFieldList=[];
	 $scope.updateTicket=function(ticketDetails,updateFlag,saveFlag,submitFlag,otherFlag){
		 $(".loader").fadeOut("slow");
		 $scope.workflowdDataFieldList=[];
		 $scope.workflowdDataFieldList.push(ticketfield);
		
		 var ticketUpdate=true;
		 for(var i=0;i<$scope.workflowdDataFieldList.length;i++){
	 			if($scope.workflowdDataFieldList[i].fieldmasterId==2 ||$scope.workflowdDataFieldList[i].fieldmasterId==1){
	 				if($scope.workflowdDataFieldList[i].fieldvalue!=null && $scope.workflowdDataFieldList[i].fieldvalue!="" && $scope.workflowdDataFieldList[i].fieldvalue!=undefined){
	 					if(!($scope.workflowdDataFieldList[i].fieldvalue.match(letterNumber)))
	 					 {
	 						 GlobalModule_notificationService.notification("error","Please Enter Valid Input "+$scope.workflowdDataFieldList[i].label);	
	 						 //$("#"+fieldValue+""+index).val('');
	 						// $("#textArea-2"+index).text('Enter Valid Input');
	 						 $(".loader").fadeOut("slow");
	 						ticketUpdate=false;
	 				  }
	 				}
	 			   // $scope.errorMsg="Please Enter ";
	 				//GlobalModule_notificationService.notification("error",""+$scope.workflowdDataFieldList[0].label+"should be "+$scope.workflowdDataFieldList.length);
	 			 }
	 		    }
		    if(ticketUpdate){
		     addTicket_Service.updateTicket1($scope.workflowdDataFieldList,$scope.workflow.workFlowId,$rootScope.userdetails.id).then(function(response){
			  //console.log(response.data);
			  if(response.data=="success"){
				GlobalModule_notificationService.notification("success","Ticket Updated Successfully");
				$scope.callbackTicketList();
			  }
			  },function(response){
				  $(".loader").fadeOut("slow");
		    });
		   }
		    if(ticketUpdate){
		    	TicketDetails_Service.updateTicketDetails($scope.ticketDetails,$scope.workflow.workFlowId,$scope.ticket.ticketId,$rootScope.userdetails.id,updateFlag,saveFlag,submitFlag,otherFlag).then(function(response){
					  //console.log(response.data);
					  if(response.data=="success"){
						GlobalModule_notificationService.notification("success","Ticket Updated Successfully");
						$scope.callbackTicketList();
					  }
					  },function(response){
						  $(".loader").fadeOut("slow");
				    });
		    	
		    }
			
		};
		
		/*$scope.validateFieldValue=function(fieldValue,index){
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			if(!(fieldValue.match(letterNumber)))
			 {
				 GlobalModule_notificationService.notification("error","Please Enter valid input");	
				 $("#"+fieldValue+""+index).val(' ');
				// $("#textArea-2"+index).text('Enter Valid Input');
				 //return false;
		  }
		};*/	 
		
		//$scope.taskName="Prefilled Fields";		
		
	
		$scope.showPrefilledFields=function(){
			
			$(".loader").show();
			$scope.taskName1="Prefilled Fields";
			//$scope.fetchTicketDetailsPrefield();
			$("#popup").css("display", "block");
			$("#popup").draggable(); 	
			$('#prefilledsunmit').show();
			
			$(".loader").fadeOut("slow");
		};
		
		//---------------save prefilled fields-------------------
		
		var validatePrefilledDetails=function(){
			
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			
			
			for(var i=0;i<$scope.ticketDetails.preFilledFields.length;i++)
			{
				if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 1 || $scope.ticketDetails.preFilledFields[i].fieldMasterId== 2)
				{
					if($scope.ticketDetails.preFilledFields[i].fieldValue == "" || $scope.ticketDetails.preFilledFields[i].fieldValue == undefined)
					{
						if($scope.ticketDetails.preFilledFields[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input For "+ $scope.ticketDetails.preFilledFields[i].label);	
							 return false;
						}						
					}
					else if($scope.ticketDetails.preFilledFields[i].validationList[0].id == 4 && (!(($scope.ticketDetails.preFilledFields[i].fieldValue).match(reg))))
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input For "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;						
					}
					else if(!(($scope.ticketDetails.preFilledFields[i].fieldValue).match(letterNumber)))
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;
					}				 
				}
				if(($scope.ticketDetails.preFilledFields[i].fieldMasterId== 3) && $scope.ticketDetails.preFilledFields[i].isRequired == true)
				{					
					if($scope.ticketDetails.preFilledFields[i].fieldValue != undefined || $scope.ticketDetails.preFilledFields[i].fieldValue != '')
					{
						GlobalModule_notificationService.notification("error","Please Select option for "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;						
					}
				}
				if(($scope.ticketDetails.preFilledFields[i].fieldMasterId== 4) && $scope.ticketDetails.preFilledFields[i].isRequired == true)
				{
					var temp=0;
					for(var j=0;j<$scope.ticketDetails.preFilledFields[i].wf_Options.length;j++)
					{
						//console.log($scope.ticketDetails.preFilledFields[i].wf_Options[j].optionValue);
						if($scope.ticketDetails.preFilledFields[i].wf_Options[j].optionValueFlag == true)
						{
							temp++;
							break;
						}
					}
					
					if(temp == 0)
					{
						GlobalModule_notificationService.notification("error","Please Select option for "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;
					}
				}
				if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 5 && $scope.ticketDetails.preFilledFields[i].isRequired == true && ($scope.ticketDetails.preFilledFields[i].fieldValue == "" || $scope.ticketDetails.preFilledFields[i].fieldValue == undefined))
				{
					GlobalModule_notificationService.notification("error","Please Select option for "+ $scope.ticketDetails.preFilledFields[i].label);	
					return false;
				}
				else if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 8)
				{
					var dateFields=$("#prefld-date"+$scope.ticketDetails.preFilledFields[i].id).val();
					
					if((dateFields == undefined || dateFields == null) && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == null || $scope.ticketDetails.preFilledFields[i].fieldValue == '') && $scope.ticketDetails.preFilledFields[i].isRequired == true)
					{
						GlobalModule_notificationService.notification("error","Please select date for field "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;
					}
					
					$scope.ticketDetails.preFilledFields[i].fieldValue=dateFields;
					
				}
				else if($scope.ticketDetails.preFilledFields[i].fieldMasterId == 7)
				{
					var userdetail=document.getElementById("userdetail"+$scope.ticketDetails.preFilledFields[i].id).value;
					
					//$scope.ticketDetails.preFilledFields[i].fieldValue=userdetail;
					
					/*if($scope.ticketDetails.preFilledFields[i].isRequired == true && (userdetail == undefined || userdetail == "") && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter employee/user email for "+ $scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}*/
					var m=0;
					var n=-1;
					if($scope.ticketDetails.preFilledFields[i].fieldValue != undefined && $scope.ticketDetails.preFilledFields[i].fieldValue != '' && $scope.ticketDetails.preFilledFields[i].fieldValue.includes('C'))
					{
						n=1;
					}
					if((userdetail != undefined || userdetail != '') && $scope.ticketDetails.preFilledFields[i].fieldValue != undefined && $scope.ticketDetails.preFilledFields[i].fieldValue != '' && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) == userdetail)
					{
						//$scope.ticketDetails.preFilledFields[i].fieldValue=userdetail;
						m++;
					}
										
					if($scope.ticketDetails.preFilledFields[i].isRequired == true && (userdetail == undefined || userdetail == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter reference Id/employee no. for field"+ $scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}		
					else if(userdetail != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == ''))
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if($scope.ticketDetails.preFilledFields[i].fieldValue != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					if($scope.userDetailsList != undefined && $scope.userDetailsList.length > 0)
					{
						for(var j=0;j<$scope.userDetailsList.length;j++)
						{
							if($scope.userDetailsList[j].empl_number == userdetail)
							{
								m++;
								$scope.ticketDetails.preFilledFields[i].fieldValue=$scope.userDetailsList[j].id +'-'+ $scope.userDetailsList[j].empl_number;
							}
						}
					}
					else if((m == 0 || $scope.userDetailsList == undefined || $scope.userDetailsList.length <= 0) && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+$scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					
					/*if($scope.userDetailsList != undefined)
					{
						var m=0;
						for(var j=0;j<$scope.userDetailsList.length;j++)
						{
							if($scope.userDetailsList[j].empl_number == userdetail)
							{
								m++;
								$scope.ticketDetails.preFilledFields[i].fieldValue=$scope.userDetailsList[j].id +'-'+ userdetail;
							}
						}
						if(m==0 || $scope.userDetailsList.length <= 0)
						{
							GlobalModule_notificationService.notification("error","Invalid Email for field "+$scope.ticketDetails.preFilledFields[i].label);
							$(".loader").fadeOut("slow");
							return;
						}
					}	*/				
				}
				if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 9 )
				{
					if($scope.ticketDetails.preFilledFields[i].fieldValue == "" || $scope.ticketDetails.preFilledFields[i].fieldValue == undefined)
					{
						if($scope.ticketDetails.preFilledFields[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input For "+ $scope.ticketDetails.preFilledFields[i].label);	
							 return false;
						}						
					}
					
					else if(!(($scope.ticketDetails.preFilledFields[i].fieldValue).match(letterNumber)))
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;
					}				 
				}
				
				if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 10)
				{
					if($scope.ticketDetails.preFilledFields[i].fieldValue == "" || $scope.ticketDetails.preFilledFields[i].fieldValue == undefined)
					{
						if($scope.ticketDetails.preFilledFields[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							 return false;
						}						
					}
					
				}
			}
			
			return true;
		};
		
		$scope.savePrefilledFields=function(){
			
			$(".loader").show();
			
			var validationFlag= validatePrefilledDetails();
			
			if(!validationFlag)
			{
				$(".loader").fadeOut("slow");
				return;
			}
				
			for(var i=0;i<$scope.ticketDetails.preFilledFields.length;i++)
			{
				if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 8)
				{
					var dateFields=$("#prefld-date"+$scope.ticketDetails.preFilledFields[i].id).val();
					
					if((dateFields == undefined || dateFields == null) && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == null || $scope.ticketDetails.preFilledFields[i].fieldValue == '') && $scope.ticketDetails.preFilledFields[i].isRequired == true)
					{
						GlobalModule_notificationService.notification("error","Please select date for field "+ $scope.ticketDetails.preFilledFields[i].label);	
						return false;
					}
					else
					{
						$scope.ticketDetails.preFilledFields[i].fieldValue=dateFields;
					}
				}
				else if($scope.ticketDetails.preFilledFields[i].fieldMasterId == 7)
				{
	
					var userdetail=document.getElementById("userdetail"+$scope.ticketDetails.preFilledFields[i].id).value;
					
					var m=0;
					var n=-1;
					if($scope.ticketDetails.preFilledFields[i].fieldValue != undefined && $scope.ticketDetails.preFilledFields[i].fieldValue != '' && $scope.ticketDetails.preFilledFields[i].fieldValue.includes('C'))
					{
						n=1;
					}
					if((userdetail != undefined || userdetail != '') && $scope.ticketDetails.preFilledFields[i].fieldValue != undefined && $scope.ticketDetails.preFilledFields[i].fieldValue != '' && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) == userdetail)
					{
						//$scope.ticketDetails.preFilledFields[i].fieldValue=userdetail;
						m++;
					}										
					if($scope.ticketDetails.preFilledFields[i].isRequired == true && (userdetail == undefined || userdetail == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter reference Id/employee no. for field"+ $scope.taskDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}	
					else if(userdetail != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == ''))
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if($scope.ticketDetails.preFilledFields[i].fieldValue != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					if($scope.userDetailsList != undefined && $scope.userDetailsList.length > 0)
					{
						for(var j=0;j<$scope.userDetailsList.length;j++)
						{
							if($scope.userDetailsList[j].empl_number == userdetail)
							{
								m++;
								$scope.ticketDetails.preFilledFields[i].fieldValue=$scope.userDetailsList[j].id +'-'+ $scope.userDetailsList[j].empl_number;
							}
						}
					}
					else if((m == 0 || $scope.userDetailsList == undefined || $scope.userDetailsList.length <= 0) && $scope.ticketDetails.preFilledFields[i].fieldValue.substr($scope.ticketDetails.preFilledFields[i].fieldValue.lastIndexOf('-')-n, $scope.ticketDetails.preFilledFields[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+$scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
	 			}
				else if($scope.ticketDetails.preFilledFields[i].fieldMasterId == 9)
				{
					
						var hours=$("#hours"+$scope.ticketDetails.preFilledFields[i].id).val();
						
						var minutes=$("#minutes"+$scope.ticketDetails.preFilledFields[i].id).val();
						
						if(hours == 0 || minutes == 0){
							  
							var hourscount=hours.length;
							var minutescount=minutes.length;
							
						}
						
						if(hours > 24  || minutes > 60 || hourscount == 1 ||minutescount == 1){
							GlobalModule_notificationService.notification("error","Please Enter valid time");
							$(".loader").fadeOut("slow");
							return;
							
						}
						
						
				
				$scope.timeMinHours = hours +":"+minutes;
				$scope.ticketDetails.preFilledFields[i].fieldValue=$scope.timeMinHours;
					}
			//	$scope.taskDetails[i].fieldValue.push($scope.timeMinHours);
				else if($scope.ticketDetails.preFilledFields[i].fieldMasterId== 10){
					
					if($scope.ticketDetails.preFilledFields[i].isRequired == true && ($scope.ticketDetails.preFilledFields[i].fieldValue == undefined || $scope.ticketDetails.preFilledFields[i].fieldValue == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter Amount for "+ $scope.ticketDetails.preFilledFields[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
				}
				
				}
		
			
			TicketDetails_Service.savePrefilledFields($scope.ticketDetails,$scope.ticket.ticketId,$scope.workflow.workFlowId,$rootScope.userdetails.id).then(function(response){
				
				var saveStatus=response.data;
				
				if(saveStatus == 'success')
				{
					GlobalModule_notificationService.notification("success","Prefilled fields saved successfully");
				}
				
			},function(response){
				$(".loader").fadeOut("slow");
			});
			
			$(".loader").fadeOut("slow");
		};
		
		var getFileSize=function(validationValue,input){
			
			var power=0;
			
			if(validationValue.includes('kb'))
			{
				power=1;
			}
			else if(validationValue.includes('mb'))
			{
				power=2;
			}
			else if(validationValue.includes('gb'))
			{
				power=3;
			}
			
			var filesize = input.files[0].size;
				
			filesize=(filesize/ Math.pow(1024, power));
			
			return filesize;
		};
		
		var validateFile=function(validationList,fileExtension){
			
			for(var j=0;j<validationList.length;j++)
			{
				if(validationList[j].fileSizeUnit.toLowerCase() == fileExtension.toLowerCase())
				{
					return true;
				}
			}
			
			return false;
		};
		
		
		var validateTaskDetails=function(){
			
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			
			for(var i=0;i<$scope.taskDetails.length;i++)
			{
				if($scope.taskDetails[i].fieldMasterId== 1 || $scope.taskDetails[i].fieldMasterId== 2)
				{
					if($scope.taskDetails[i].fieldValue == "" || $scope.taskDetails[i].fieldValue == undefined)
					{
						if($scope.taskDetails[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							 return false;
						}						
					}
					else if($scope.taskDetails[i].validationList[0].id == 4 && (!(($scope.taskDetails[i].fieldValue).match(reg))))
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input For "+ $scope.taskDetails[i].label);	
						return false;						
					}
					else if(!($scope.taskDetails[i].fieldValue.match(letterNumber)))
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
						return false;
					}				 
				}
				if(($scope.taskDetails[i].fieldMasterId== 3) && $scope.taskDetails[i].isRequired == true)
				{					
						if($scope.taskDetails[i].fieldValue == undefined || $scope.taskDetails[i].fieldValue == '')
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							return false;
						}
				}										
				if(($scope.taskDetails[i].fieldMasterId== 4) && $scope.taskDetails[i].isRequired == true)
				{
					var temp=0;
					for(var j=0;j<$scope.taskDetails[i].wf_Options.length;j++)
					{
						//console.log($scope.taskDetails[i].wf_Options[j].optionValue);
						if($scope.taskDetails[i].wf_Options[j].optionValueFlag == true)
						{
							temp++;
							break;
						}
					}					
					if(temp == 0)
					{
						GlobalModule_notificationService.notification("error","Please Select option for "+ $scope.taskDetails[i].label);	
						return false;
					}
				}
				if($scope.taskDetails[i].fieldMasterId== 5 && $scope.taskDetails[i].isRequired == true && ($scope.taskDetails[i].fieldValue == "" || $scope.taskDetails[i].fieldValue == undefined))
				{
					GlobalModule_notificationService.notification("error","Please Select option for "+ $scope.taskDetails[i].label);	
					return false;
				}
				if($scope.taskDetails[i].fieldMasterId== 6)
				{
					var input = document.getElementById('docfilepath'+i);
															
					if($scope.taskDetails[i].isRequired == true && input.files[0] == undefined && ($scope.taskDetails[i].fieldValue == undefined || $scope.taskDetails[i].fieldValue == '' || $scope.taskDetails[i].fieldValue == null))
					{
						GlobalModule_notificationService.notification("error","Please upload file for "+ $scope.taskDetails[i].label);	
						return false;
					}
					else if(input.files[0] != undefined)
					{	
						if($scope.taskDetails[i].fieldValue != '' && input.files[0] == undefined)
						{
							var fileExtension1=$scope.taskDetails[i].fieldValue.split(/\.(?=[^\.]+$)/)[1];
							
							for(var j=0;j<$scope.taskDetails[i].validationList.length;j++)
							{
								if($scope.taskDetails[i].validationList[j].fileSizeUnit.toLowerCase() == fileExtension1.toLowerCase())
								{
									return true;
								}
							}
							
							GlobalModule_notificationService.notification("error","Invalid file type for "+ $scope.taskDetails[i].label);	
							return false;
						}
						
						//var fileExtension=input.value.split('.')[1];
						var filename=input.value;
						var afterDot = filename.substr(filename.lastIndexOf('.') +1);
						
						var temp=false;	
					
						temp=validateFile($scope.taskDetails[i].validationList,afterDot);
						
						if(!temp)
						{
							GlobalModule_notificationService.notification("error","Invalid file type for "+ $scope.taskDetails[i].label);	
							return false;
						}
												
						var filesize=getFileSize($scope.taskDetails[i].validationList[0].validationValue,input);
												
						var limitForfileSize=$scope.taskDetails[i].validationList[0].validationValue.replace(/\D/g,'');
												
						if(filesize > parseInt(limitForfileSize))
						{
							GlobalModule_notificationService.notification("error","Please upload file with size less than "+ $scope.taskDetails[i].validationList[0].validationValue);	
							return false;
						}
					}
				}
				else if($scope.taskDetails[i].fieldMasterId== 8)
				{
					var dateFields=$("#task-date"+$scope.taskDetails[i].id).val();
					
					if((dateFields == undefined || dateFields == null) && ($scope.taskDetails[i].fieldValue == undefined || $scope.taskDetails[i].fieldValue == null || $scope.taskDetails[i].fieldValue == '') && $scope.taskDetails[i].isRequired == true)
					{
						GlobalModule_notificationService.notification("error","Please select date for field "+ $scope.taskDetails[i].label);	
						return false;
					}
					else
					{
						$scope.taskDetails[i].fieldValue=dateFields;
					}
				}
				else if($scope.taskDetails[i].fieldMasterId == 7)
				{
					var userdetail=document.getElementById("userdetail"+$scope.taskDetails[i].id).value;
					
					var m=0;
					var n=-1;
					if($scope.taskDetails[i].fieldValue != undefined && $scope.taskDetails[i].fieldValue != '' && $scope.taskDetails[i].fieldValue.includes('C'))
					{
						n=1;
					}
					if((userdetail != undefined || userdetail != '') && $scope.taskDetails[i].fieldValue != undefined && $scope.taskDetails[i].fieldValue != '' && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) == userdetail)
					{
						//$scope.taskDetails[i].fieldValue=userdetail;
						m++;
					}
										
					if($scope.taskDetails[i].isRequired == true && (userdetail == undefined || userdetail == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter reference Id/employee no. for field"+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if(userdetail != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && ($scope.taskDetails[i].fieldValue == undefined || $scope.taskDetails[i].fieldValue == ''))
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if($scope.taskDetails[i].fieldValue != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					if($scope.userDetailsList != undefined && $scope.userDetailsList.length > 0)
					{
						for(var j=0;j<$scope.userDetailsList.length;j++)
						{
							if($scope.userDetailsList[j].empl_number == userdetail)
							{
								m++;
								$scope.taskDetails[i].fieldValue=$scope.userDetailsList[j].id +'-'+ $scope.userDetailsList[j].empl_number;
							}
						}
					}
					else if((m == 0 || $scope.userDetailsList == undefined || $scope.userDetailsList.length <= 0) && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+$scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
				}else if($scope.taskDetails[i].fieldMasterId== 9)
				{
					if($scope.taskDetails[i].hours == "" || $scope.taskDetails[i].hours == undefined || $scope.taskDetails[i].minutes == "" || $scope.taskDetails[i].minutes == undefined)
					{
						if($scope.taskDetails[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							 return false;
						}						
					}
					
					else if($scope.taskDetails[i].hours == "" || $scope.taskDetails[i].hours == undefined || $scope.taskDetails[i].minutes == "" || $scope.taskDetails[i].minutes == undefined)
					{
						GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
						return false;
					}				 
				}else if($scope.taskDetails[i].fieldMasterId== 10)
				{
					if($scope.taskDetails[i].fieldValue == "" || $scope.taskDetails[i].fieldValue == undefined)
					{
						if($scope.taskDetails[i].isRequired == true)
						{
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							 return false;
						}						
					}
					
				}
			}
			
			return true;
		};
		
		
		/*var validateUserDetail=function() 
		{
			if((survey.employerName.charAt(0) >= 0 && survey.employerName.charAt(0) <= 9))
			  {
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{					
					if($scope.userDetailsList[i].empl_number == survey.employerName)
					{
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						$scope.surveyObject=survey;
						break;
					}					
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Employee number");
					$(".loader").fadeOut("slow");
					return;
				}
			  }
			else if((survey.employerName.charAt(0) == 'C' || survey.employerName.charAt(0) == 'c') && survey.employerName.charAt(1) == '-')
			  {
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{					
					if($scope.userDetailsList[i].empl_number == survey.employerName)
					{	
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						$scope.surveyObject=survey;
						break;
					}
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Reference number");
					$(".loader").fadeOut("slow");
					return;
				}
			  }
			else
			{				
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{
					if($scope.userDetailsList[i].email == survey.employerName)
					{
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						$scope.surveyObject=survey;
					}
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Email");
					$(".loader").fadeOut("slow");
					return;
				}
			}
		};*/
		
		//---------------------Save tasks fileds ----------
		
		$scope.saveTaskDetails=function(saveFlag){
			
			$(".loader").show();
			
			if(saveFlag == 4)				
			{				
				var validationFlag= validateTaskDetails();
				
				if(!validationFlag)
				{
					$(".loader").fadeOut("slow");
					return;
				}
			}
			var temp=0;
			for(var i=0;i<$scope.taskDetails.length;i++)
			{	
				if($scope.taskDetails[i].fieldMasterId == 8)
				{
					var dateFields=$("#task-date"+$scope.taskDetails[i].id).val();
					
					if((dateFields == undefined || dateFields == null) && $scope.taskDetails[i].isRequired == true)
					{
						GlobalModule_notificationService.notification("error","Please select date for field "+ $scope.taskDetails[i].label);	
						return false;
					}
					else
					{
						$scope.taskDetails[i].fieldValue=dateFields;
					}
				}				
				else if($scope.taskDetails[i].fieldMasterId == 6)
				{
					var input = document.getElementById('docfilepath'+i);
					
					
					if(input.files[0] != undefined)
					{									    		
						var filesize=getFileSize($scope.taskDetails[i].validationList[0].validationValue,input);
						
						var limitForfileSize=$scope.taskDetails[i].validationList[0].validationValue.replace(/\D/g,'');
												
						if(filesize > parseInt(limitForfileSize))
						{
							GlobalModule_notificationService.notification("error","Please upload file with size less than "+ $scope.taskDetails[i].validationList[0].validationValue);	
							$(".loader").fadeOut("slow");
							return false;
						}
					}										
					
		    		if(input.value!="")
		    	    {
		    				
		    		var file = input.files[0];
		    		var formData = new FormData();
		    		formData.append("file",file);
		     	      		
		    		 $.ajax({
		    			url: 'rest/ticketdetails/upload/uploadfieldfile',
		    			type: 'POST',
		    			data: formData,
		    			async: false,
		    			cache: false,
		    			contentType: false,
		    			processData: false,
		    			success: function (returndata) {
		    			 	$scope.filedtailsforProfile=JSON.parse(returndata);
		    				 if($scope.filedtailsforProfile != undefined)
		    					{
		    					 $scope.taskDetails[i].fieldValue=$scope.filedtailsforProfile.fileURL;
		    					 
		    					 $(".loader").fadeOut("slow");
		    					}
		    				 }		    			      
		    			 });
		    	    }
				}
				else if($scope.taskDetails[i].fieldMasterId == 7)
				{
					var userdetail=document.getElementById("userdetail"+$scope.taskDetails[i].id).value;
					
					var m=0;
					var n=-1;
					if($scope.taskDetails[i].fieldValue != undefined && $scope.taskDetails[i].fieldValue != '' && $scope.taskDetails[i].fieldValue.includes('C'))
					{
						n=1;
					}
					if((userdetail != undefined || userdetail != '') && $scope.taskDetails[i].fieldValue != undefined && $scope.taskDetails[i].fieldValue != '' && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) == userdetail)
					{
						//$scope.taskDetails[i].fieldValue=userdetail;
						m++;
					}
										
					if($scope.taskDetails[i].isRequired == true && (userdetail == undefined || userdetail == ""))
					{
						GlobalModule_notificationService.notification("error","Please enter reference Id/employee no. for field"+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if(userdetail != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && ($scope.taskDetails[i].fieldValue == undefined || $scope.taskDetails[i].fieldValue == ''))
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					else if($scope.taskDetails[i].fieldValue != undefined && ($scope.userDetailsList == undefined || $scope.userDetailsList.length == 0) && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+ $scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
					if($scope.userDetailsList != undefined && $scope.userDetailsList.length > 0)
					{
						for(var j=0;j<$scope.userDetailsList.length;j++)
						{
							if($scope.userDetailsList[j].empl_number == userdetail)
							{
								m++;
								$scope.taskDetails[i].fieldValue=$scope.userDetailsList[j].id +'-'+ $scope.userDetailsList[j].empl_number;
							}
						}
					}
					else if((m == 0 || $scope.userDetailsList == undefined || $scope.userDetailsList.length <= 0) && $scope.taskDetails[i].fieldValue.substr($scope.taskDetails[i].fieldValue.lastIndexOf('-')-n, $scope.taskDetails[i].fieldValue.length-1) != userdetail)
					{
						GlobalModule_notificationService.notification("error","Invalid reference Id/employee no. for field "+$scope.taskDetails[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
				} 
				if($scope.taskDetails[i].fieldMasterId == 9)
					{
					
					var hours=$("#hours"+$scope.taskDetails[i].id).val();
					
					var minutes=$("#minutes"+$scope.taskDetails[i].id).val();
					
					if(hours == 0 || minutes == 0){
					  
						var hourscount=hours.length;
						var minutescount=minutes.length;
						/*if(hourscount == 1 ||minutescount == 1){
							
							GlobalModule_notificationService.notification("error","Please Enter valid time");
							$(".loader").fadeOut("slow");
							return;
						}*/
					}
					
					
					if(hours > 24  || minutes > 60 || hourscount == 1 ||minutescount == 1){
						GlobalModule_notificationService.notification("error","Please Enter valid time");
						$(".loader").fadeOut("slow");
						return;
						
					}
					
					$scope.timeMinHours = hours +":"+minutes;
				//	$scope.taskDetails[i].fieldValue.push($scope.timeMinHours);
					$scope.taskDetails[i].fieldValue=$scope.timeMinHours;
					}
				
				else if($scope.taskDetails[i].fieldMasterId == 10)
				{
					if($scope.taskDetails[i].fieldValue == "" || $scope.taskDetails[i].fieldValue == undefined)
					{
						
							GlobalModule_notificationService.notification("error","Please Enter Valid Input for "+ $scope.taskDetails[i].label);	
							$(".loader").fadeOut("slow"); 
							return;
												
					}
					
				}
				
				temp++;
				
			}		
			
		        
				TicketDetails_Service.saveTaskDetails($scope.taskDetails,$scope.taskId,$scope.ticket.ticketId,$scope.workflow.workFlowId,$rootScope.userdetails.id,saveFlag).then(function(response){
					
					var saveStatus=response.data;
					
					if(saveStatus == 'success')
					{
						if(saveFlag == 3)
						{
							GlobalModule_notificationService.notification("success","Task details saved successfully");
							$state.reload();
						}
						if(saveFlag == 4)
						{
							GlobalModule_notificationService.notification("success","Task details submitted successfully");
							$state.reload();
						}					
					}
					
					  },function(response){
						  $(".loader").fadeOut("slow");
				    });
			
			$(".loader").fadeOut("slow");
		};
		
		$scope.showFileName= function(filename){
			
			if(filename == '' || filename == undefined)
			{
				return null;
			}
			return filename.substring(96, filename.length);
		};
		
		$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	        return dateOut;
	  };
	  
	  $scope.download = function(path){
		   
			if(path.includes("amazonaws"))
		   {
			$rootScope.getSignedURL(path).then(function(response){
				window.open(response.data);
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		   }
			else
				{
				window.open(path);
				}
		};
		
		
		$scope.openDocument = function(path){

			if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
			{
			$scope.imageFlag=true;
			if(path.includes(".pdf"))
			{
			$scope.imageFlag=false;
			$scope.pdfFlag=true;
			}else{
			$scope.imageFlag=true;
			$scope.pdfFlag=false;
			}
			if(path.includes("amazonaws"))
			{
			$rootScope.getSignedURL(path).then(function(response){

			$scope.fileurl=response.data;
			$scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
			console.log($scope.pdfDocPath);
			},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
			});
			 }
			}

			else
			$scope.imageFlag=false;
			if(!(path.includes(".pdf"))){
			 $scope.pdfFlag=false
			}
			};
  
	  $scope.getworkflowListTab=function(){
			$state.go('restricted.ownerworkflow');
		};
		
		$scope.getMyTaskListTab=function(){
			$state.go('restricted.mytask');
		};
		
		$scope.fileNameChanged = function(element)
		{			
			var textFieldId=element.id.replace('docfilepath', '');
			var input = element;
			if(input.value!="")
			{						
				var filename=input.value;
				filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
				$('#docfilename'+textFieldId).val(filename);				
			}
		};
		
		$scope.changeStyle= function(){
			$('.ui-datepicker-inline').attr('style','display: none;');
		};
		
		$scope.onloadFun = function(evt) {
			$(function(){
			$('.dateonly2').datetimepicker({
				widgetPositioning:{
                    horizontal: 'auto',
                    vertical: 'bottom'
                }
          });
			});
	      };
		 
	      $scope.fetchUserDetails=function(search,role){
	  		
	  		var roleId=0;
	  		
	  		if(role == 'Employee')
	  		{
	  			roleId=2;
	  		}
	  		else if(role == 'Candidate')
	  		{
	  			roleId=1;
	  		}
	  		
	  		var numval='^[0-9]$';
	  		
	  		if(search=="")
	  		{
	  		 
	  		}
	  		else if(search.charAt(0).match(numval) && roleId == 1)
	  		{
	  				GlobalModule_notificationService.notification("error","Ref. no. should start with 'C-'");
	  				return;
	  		}
	  	  else{
	  		  
	  	  if(search.length > 4){
	  		
	  		survey_assignment_Service.fetchEmployeeDetails(search,roleId).then(function(response){
	  			
	  		  $scope.userDetailsList1 = response.data;
	  		  
	  		 // console.log($scope.userDetailsList1);
	  		  
	  		  $scope.EmployeeNumberList=[];
	  		  
	  		  if(search.charAt(0) >= 0 && search.charAt(0) <= 9)
	  		  {
	  			  
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].empl_number});
	  			  }
	  		  }
	  		  else if((search.charAt(0) == 'C' || search.charAt(0) == 'c') && search.charAt(1) == '-')
	  		  {			 
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].empl_number});
	  			  }
	  		  }
	  		  else
	  		  {
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].email});
	  			  }
	  		  }
	  		  
	  	  },function(response){
	  		  
	  		});	 
	  	  }
	  	  }		
	  	};
	  	
	  	$scope.openUserProfile=function(userId){
	  		
	  		GlobalModule_dataStoreService.storeData('LoginModule','employeeflag',2);
	  		GlobalModule_dataStoreService.storeData('LoginModule','empId',userId);
	  		$state.go("restricted.admin.employeedescription");
	  	};
	  	
	  	$scope.userDetailsList=[];
		$scope.addUserDetailsList=function(){
			
			if($scope.userDetailsList1 != undefined)
			{
				$scope.userDetailsList=$scope.userDetailsList.concat($scope.userDetailsList1);
				//console.log($scope.userDetailsList);
			}
			
			//Array.prototype.push.apply($scope.userDetailsList, $scope.userDetailsList1);	
		};
		
		$scope.closePrefilledFieldModal=function(){
			$state.reload();
			//$("#popup").css("display", "none");
		};
		
		
		$scope.AddComma1=function (text,i) {
	        
        	//alert("kdjf" +i);
        	
           
              document.getElementById("txtNumber1"+i).value = "0.0" + text;
              var data = text.replace(".", "");
             // console.log(data);
              var first = data.substring(0, (data.length - 2));
             // console.log(first);
              var second = data.substring(data.length - 2);
            //  console.log(second);
              var temp = Math.abs(first) + "." + second;
            //  console.log(temp);
              document.getElementById("txtNumber1"+i).value = temp;
             
              i++;
      }
        		  
        
			
}]);