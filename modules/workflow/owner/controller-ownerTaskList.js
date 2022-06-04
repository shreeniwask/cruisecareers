var controllers = angular.module('LoginModule');

controllers.controller('owner_TaskList_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Admin_Service','TasksList_Service','CreateWorkflow_Service','survey_assignment_Service','ticket_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Admin_Service,TasksList_Service,CreateWorkflow_Service,survey_assignment_Service,ticket_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.workflowId= GlobalModule_dataStoreService.loadData('LoginModule','workflowID');
	$scope.Wfshortname= GlobalModule_dataStoreService.loadData('LoginModule','Wfshortname');
	
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.usertypeid1;
	$scope.userId1;
	$scope.groupId1;
	$scope.departmentId1;
	$scope.tFlag=true;
	//fetch tasks list
	$scope.ticketListWithTicket=[];
	$scope.fetchTasksList = function(offset,limit,colName,order,search){
		
		 $(".loader").show();
		  if(search=="" || search==null)
			  {
			  search= undefined;
			  }
		  if(colName == null || colName== ""){
				 colName = undefined;
			 }
			 if(order == null){
				 order = undefined;
			 }
			 
			 TasksList_Service.fetchTaskownerList(offset,limit,colName,order,search,$scope.workflowId).then(function(response){
			 $scope.tasksList=response.data;
			 //console.log($scope.tasksList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchTasksList(0,10,null,null,null);
	
	 
	 $scope.SortingTasksList = function(colName,searchterm){
		// alert(colName);
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
			$scope.search=searchterm;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search=="" || $scope.search==null)
			  {
				$scope.search= undefined;			  
			  }
			if($scope.colName==null)
			  {
				$scope.colName= undefined; 
			  }
			$scope.fetchTasksList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		
		$scope.fetchTasksListCount=function(search){
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=search;
			if($scope.search==null || $scope.search=="")
			  {
				$scope.search= undefined;
			  }
		  if($scope.colName == null || $scope.colName== ""){
			  $scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 TasksList_Service.fetchTasksListCount($scope.search,$scope.workflowId).then(function(response){
				$scope.count = response.data;
				//console.log($scope.count);
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.fetchTasksListCount(null);
		
		$scope.previous = function() {
			$scope.start =  $scope.start - 5;
	        $scope.offset = $scope.start * $scope.limit;
	        $scope.setButton();
	     
	    };

	    $scope.next = function() {
	    	$scope.start =  $scope.start + 5;
	        $scope.offset = $scope.start * $scope.limit;
	      
	        $scope.setButton(); 
	      
	    };
	    
	    $scope.current = function(page) {  
	        $scope.offset = page * $scope.limit;
	        $scope.fetchTasksList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    
	    $scope.setButton = function(){
		$scope.navButtons = [];
			
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			$scope.fetchTasksList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
	
		
		//----------------delete work flow from list ------------------------- 
		  
		   //----------Get no of checked work flow-------
				  
		$scope.checkedTasksIds=[];
				  
		$scope.addCheckedTasksId = function(id){			  
					  
			if($scope.checkedTasksIds.indexOf(id) !== -1)
			{		
				var array  = $scope.checkedTasksIds;
				var index = array.indexOf(id);
				$scope.checkedTasksIds.splice(index,1);
			}
			else
			{		    	
				$scope.checkedTasksIds.push(id);				      
			};						  
		};
				 
		$scope.checkedAllList = function(tasksList,rd){
			
			if(rd == true || rd == undefined)
			{				 
				for(var i=0; i<tasksList.length; i++)
				{					  
					if($scope.checkedTasksIds.indexOf(tasksList[i].id) !== -1)  
					{  						 
					}
					else
					{
						 $scope.addCheckedTasksId(tasksList[i].id);	
					}						  
				}			
			}
			else
			{
				$scope.checkedTasksIds=[];
			}
		};
				  
				  
		$scope.check = function(){
			
			if($scope.checkedTasksIds.length == 0)
			{
				GlobalModule_notificationService.notification("error","Please select any record");
			}
			else
			{				  
				$('#deletelist').modal('show');
			}			  
		};
		
		
		$scope.deleteTaskFromList = function(formlist){
			  
				$(".loader").show();			  
			
			    $("#deletelist").modal('hide');
			    TasksList_Service.deleteTaskFromList(formlist,$scope.checkedTasksIds).then(function(response){
				  var deleteStatusFlag = response.data;	
				  /*$scope.fetchWorkflowsListCount(null);
				  $scope.fetchWorkflowsList(0,10,null,null,null);*/
				  $state.reload();
				  $scope.checkedTasksIds=[];
				  if(deleteStatusFlag.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Task deleted successfully");
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
		};
		
		
//------------Column Setting-------------------------------------------------
		
		var getSettings = function(){
			
			$(".loader").show();
			
			Admin_Service.getSettings($rootScope.userdetails.id,17).then(function(response){
				  $scope.columnlist = response.data;
				  //console.log($scope.columnlist);
				var count=0;
						for(var i=0;i<$scope.columnlist.length;i++){
							if($scope.columnlist[i].name=='Task Id' && $scope.columnlist[i].isActive==false){
								for(var j=0;j<$scope.columnlist.length;j++){
									if($scope.columnlist[j].name=='Task Id' || $scope.columnlist[j].name=='Task Name' || $scope.columnlist[j].name=='Created On' || $scope.columnlist[j].name=='SLA' || $scope.columnlist[j].name=='Dependencies' || $scope.columnlist[j].name=='Assign Task' || $scope.columnlist[j].name=='Escalate To'){
										$scope.columnlist[j].isActive=true;
									}
								}
							}
							if($scope.columnlist[i].isActive==true)
								{
								count++;
								}
						}
				
			if(count==$scope.columnlist.length)
				{
				$scope.colcheck=true;
				}else{
					$scope.colcheck=false;
				}
				  $(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				});
			$(".loader").fadeOut("slow");
		};
		
		getSettings();
		
		$scope.savesettings = function(){
			
			$(".loader").show();
			
			var count=0;
			for(var i=0;i<$scope.columnlist.length;i++){
				if($scope.columnlist[i].isActive==true)
					{
					count++;
					}
			}

			if(count==$scope.columnlist.length)
			{
			$scope.colcheck=true;
			}else{
				$scope.colcheck=false;
			}	
			Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
				  $scope.savesetFlag = response.data;	
			});
			$(".loader").fadeOut("slow");
		};
		
		$scope.activeColumn = function(columnName)
		{
			
			if($scope.columnlist != undefined){
			for(var i=0;i<$scope.columnlist.length;i++){
				if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
					return true;
				}
			}
			return false;
		};
		
		
		$scope.selectAllColoumns = function(check)
		{
			$(".loader").show();
			
			if(check==true)
				{
				for(var i=0;i<$scope.columnlist.length;i++){
					 $scope.columnlist[i].isActive=true;
						
				}
				}else{
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Task Id' || $scope.columnlist[i].name=='Task Name' || $scope.columnlist[i].name=='SLA' || $scope.columnlist[i].name=='Assign Task' || $scope.columnlist[i].name=='Escalate To'){
														
							$scope.columnlist[i].isActive=true;
							}else{
								$scope.columnlist[i].isActive=false;
							}
						
						}
						
					}
			$(".loader").fadeOut("slow");
		};
		
//-------------------------------------------------------------------------------
		
		$scope.fetchTasksForDependency=function(taskId){
			
			$(".loader").show();
			$scope.taskId=taskId;
			TasksList_Service.fetchTasksForDependecy(taskId,$scope.workflowId).then(function(response){
				 $scope.otherTasksList=response.data;
				 if($scope.otherTasksList.length <= 0)
				 {
					 GlobalModule_notificationService.notification("error","No other tasks to make dependency");
				 }
				 else
				 {
					 $('#depedencies').modal('show');
				 }
				 //console.log($scope.otherTasksList);
				 
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
			$(".loader").fadeOut("slow");
		};
		
		$scope.saveTaskDependency=function(){
			
			$(".loader").show();
			
			   TasksList_Service.saveTaskDependency($scope.taskId,$scope.dependentTasksIds).then(function(response){
				 var saveStatus=response.data;
				 
				 if(saveStatus == 'success')
				 {
					 GlobalModule_notificationService.notification("success","Dependency has been added");
					 $('#depedencies').modal('hide');
					 $scope.fetchTasksList(0,10,null,null,null);
				 }
				 
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
			
			$(".loader").fadeOut("slow");
		};
		
		$scope.dependentTasksIds=[];
		  
		$scope.addDependentTasksId = function(id){			  
					  
			if($scope.dependentTasksIds.indexOf(id) !== -1)
			{		
				var array  = $scope.dependentTasksIds;
				var index = array.indexOf(id);
				$scope.dependentTasksIds.splice(index,1);
			}
			else
			{		    	
				$scope.dependentTasksIds.push(id);				      
			};		
			//console.log($scope.dependentTasksIds);
		};
		
		
		$scope.createTask=function(){
			
			GlobalModule_dataStoreService.storeData('LoginModule','task',undefined);
			$state.go("restricted.admin.createtask");
		};
		
		$scope.formatDate = function(date){		     
			if(date==null)
	    	 {
	    	 	return;
	    	 }
			var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
			
			return dateOut;
	   };
		
		/*$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        return dateOut;
		};*/
		
		
		//generate Excel method
		
		
		$scope.generateExcel = function(){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+17+'&search='+$scope.search+'&workflowId='+$scope.workflowId+'&Wfshortname='+$scope.Wfshortname+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
		
		$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	        return dateOut;
	  };
	  
	  $scope.openAddFieldsPage=function(workflow){
		  
		  GlobalModule_dataStoreService.storeData('LoginModule','fieldId',undefined);
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.addworkflowfield");
	  };
	  
	  $scope.openEditWorkFlowPage=function(workflow){
		  
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.createworkflow");
	  };
		
	  $scope.openTasksListPage= function(workflow){
		  
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.taskslist");
	  };
	
		  
		  //task Esclarate method
		  $scope.openEsclateModel=function(task){
			    $scope.ownersList=[];
			    fetchWorkflowOwnerList();
			    $scope.ticketListWithTicket=[];
			    $scope.ticketListWithTicket.push(task);
			  $('#assignnment-details').modal('show');
		  };
		  
		  $scope.saveEscalate=function(){
			  $(".loader").show();
			  var saveEscalate=false;
			  for(var j=0;j<$scope.ticketListWithTicket.length;j++){
				 /*if($scope.ticketListWithTicket[j].userTypeId==0 && $scope.ticketListWithTicket[j].userid==0 ){
					 saveEscalate=false;*/
					 if($scope.ticketListWithTicket[j].userTypeId==0||$scope.ticketListWithTicket[j].userTypeId==""||$scope.ticketListWithTicket[j].userTypeId==undefined){
						 saveEscalate=false;
					 GlobalModule_notificationService.notification("error","select user type");
					 $(".loader").fadeOut("slow");
					 }else if($scope.ticketListWithTicket[j].userid==0 ||$scope.ticketListWithTicket[j].userid==""||$scope.ticketListWithTicket[j].userid==undefined){
						 saveEscalate=false;
						 GlobalModule_notificationService.notification("error","Select user or group");
						 $(".loader").fadeOut("slow");
						 }
				 else{
					 saveEscalate=true; 
				 }
			  }
			  if(saveEscalate){
				  TasksList_Service.saveEscalate($scope.ticketListWithTicket[0].userTypeId,$scope.ticketListWithTicket[0].userid,$scope.ticketListWithTicket[0].id,$scope.workflowId).then(function(response){
						 var saveStatus=response.data;
						 
						 if(saveStatus == 'success')
						 {
							 GlobalModule_notificationService.notification("success","Task  escalated successfully");
							 $('#assignnment-details').modal('hide');
							 $scope.fetchTasksList(0,10,null,null,null);
						 }
						 
					  },function(response){
						  $(".loader").fadeOut("slow");
					 }); 
					
					$(".loader").fadeOut("slow");
				  //console.log($scope.ticketListWithTicket);
				  
			  }
			  $(".loader").fadeOut("slow");
		  };
		  $scope.validateUser=function(evt){
				var id = document.getElementById('userDetails-'+evt).options[0].getAttribute('data-id');
				$scope.ticketListWithTicket[evt].userid=id;
				
			};
		  
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
 					 $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
				 }); 
			 };
			 
			 $scope.data=[];
			 $scope.fetchEmployeeDetails=function(search){
					
					//var numval='^[0-9]$';
					
				if(search=="")
				{
					 
				}
				else{
					  
					if(search.length>3){
						$scope.data=search;
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
								  console.log($scope.EmployeeNumberList);
							}
					    }
					    else
					    {
							for(var i=0;i<$scope.userDetailsList.length;i++)
							{
								  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].email,roleName:$scope.userDetailsList[i].roleMaster.roleName});
								  console.log($scope.EmployeeNumberList);
							}
					    }
					  
				  },function(response){
					  
					});	 
				 }
			}		
		 };
			 
			
			$scope.changeOwnersList=function(ownerType){
				
				//console.log($scope.ticketListWithTicket);
				if(ownerType== 2)
				{
					fetchGroupList();
				}
				else if(ownerType == 3)
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
			 $scope.reassignTask=1;
			 $scope.reAssignTask=function(task){
				 $scope.assignTaskLabel="Re-Assignment";
				 $scope.reassignTask=2;
				 $scope.ownersList=[];
				    fetchWorkflowOwnerList();
				    $scope.ticketListWithTicket=[];
				    
				    $scope.text = 'enter email';
			        $scope.word = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
				    
			      /*if (userDetails.$index==userDetails.id){*/
			        
				    $scope.ticketListWithTicket.push(task);
			      //}
				  		console.log($scope.ticketListWithTicket);
				  		 $('#assignnmentTaskUser').modal('show');
				  
					/*console.log(ticketIdList);
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
								
								  console.log($scope.ticketListWithTicket);
								 // data-target="#assignnment-details" data-toggle="modal"		  
									 
							     $(".loader").fadeOut("slow");
						         },function(response){
							  $(".loader").fadeOut("slow");
							});
						  
							ticket_Service.fetchOwnerType().then(function(response){
								$scope.OwnerTypeList = response.data;
								  console.log(response.data);
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
					}*/
				 
			 };
			 
			 $scope.assignTask=function(task){
				    $scope.assignTaskLabel="Assignment";
				    $scope.reassignTask=1;
				    $scope.ownersList=[];
				    fetchWorkflowOwnerList();
				    $scope.ticketListWithTicket=[];
				    $scope.ticketListWithTicket.push(task);
				  	
				  		 $('#assignnmentTaskUser').modal('show');
				  
					/*console.log(ticketIdList);
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
								
								  console.log($scope.ticketListWithTicket);
								 // data-target="#assignnment-details" data-toggle="modal"		  
									 
							     $(".loader").fadeOut("slow");
						         },function(response){
							  $(".loader").fadeOut("slow");
							});
						  
							ticket_Service.fetchOwnerType().then(function(response){
								$scope.OwnerTypeList = response.data;
								  console.log(response.data);
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
					}*/
					
				};
				
				$scope.selectOwnerType= function(ownerTypeId){
					$scope.ownerTypeId=ownerTypeId;
				};
				
				$scope.groupId=0;
				$scope.selectedGroup= function(groupId){
					$scope.groupId=groupId;
				};
						
				var equal=true;
				$scope.assignTaskUserGroupDepartment = function(actionFlag){
					
					 $(".loader").show();
					 /*var status=true;
					 var errorStayus=false;
					 var typeStatus=false;*/
					 if($scope.ownerTypeId == undefined)
					 {
						 GlobalModule_notificationService.notification("error","Please select owner type");
						 $(".loader").fadeOut("slow");
						 return;
					 }
					 
					 if($scope.ownerTypeId == 1)
					 {
						 var ownerId=document.getElementById("userdetail").value;
						 var ownerId= ownerId.split("  ");
						 
						 if(ownerId[0] == undefined || ownerId[0] == '')
						 {
							 GlobalModule_notificationService.notification("error","Please enter owner email");
							 $(".loader").fadeOut("slow");
							 return;
						 }
						 else 
						 {
							 var m=0;
							 for(var i=0;i<$scope.EmployeeNumberList.length;i++)
							 {
								 if(ownerId[0] == $scope.EmployeeNumberList[i].detail)
								 {
									 m=1;
									 $scope.ticketListWithTicket[0].userTypeId=$scope.ownerTypeId;
									 $scope.ticketListWithTicket[0].userid=$scope.EmployeeNumberList[i].id;
									 break;
								 }						 
							 }
							 if(m == 0)
							 {
								 GlobalModule_notificationService.notification("error","Please enter valid owner email");
								 $(".loader").fadeOut("slow");
								 return;
							 }
						 }
						 
						 /*if($scope.EmployeeNumberList.length==0)
						 {
							 status=false;
							 errorStayus=true;							 
						 }
					 
						 for(var i=0;i<$scope.EmployeeNumberList.length;i++)
						 {
							 if($scope.data!==$scope.EmployeeNumberList[i].detail)
							 {
								status=false;
								errorStayus=true;							 
							 }						 
						 }*/ 
					}
					else if($scope.ownerTypeId == 2)
					{
						if($scope.groupId == 0)
						{
							GlobalModule_notificationService.notification("error","Please select group");
							$(".loader").fadeOut("slow");
							 return;
						}
						$scope.ticketListWithTicket[0].userTypeId=$scope.ownerTypeId;
						$scope.ticketListWithTicket[0].groupId=$scope.groupId;
					}
					 				 	 
					 /*for(var i=0;i<$scope.ticketListWithTicket.length;i++)
					{     
						if($scope.ticketListWithTicket[i].userTypeId!="" && $scope.ticketListWithTicket[i].userTypeId!=undefined){
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
						   }
						
						   else{
							   GlobalModule_notificationService.notification("error","Select Owner Type !!!!");
						   }
				}*/
					
					 ticket_Service.assignTaskUserGroupDepartment($scope.ticketListWithTicket,$scope.workflowId,$rootScope.userdetails.id,actionFlag).then(function(response){
						 $scope.ownersList=response.data;
						  
						 if(response.data=="update")
						 {
							 $('#assignnmentTaskUser').modal("hide");						 
							 $scope.fetchTasksList(0,10,null,null,null);
							 GlobalModule_notificationService.notification("success","Task Re-Assigned Successfully");
							 ticketIdList=[];
						 }
						 if(response.data=="success")
						 {
							 $('#assignnmentTaskUser').modal("hide");
							 $scope.fetchTasksList(0,10,null,null,null);
							 GlobalModule_notificationService.notification("success","Task Assigned Successfully");
							 ticketIdList=[];
						 }
						 if(response.data=="failed")
						 {	
							 $('#assignnmentTaskUser').modal("hide");
							 GlobalModule_notificationService.notification("error","Select at least one task");
						 }
 
						 $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
					 });
					 
					 /*if(errorStayus){
						 GlobalModule_notificationService.notification("error"," Plese select valid data from dropdown ");
						 $(".loader").fadeOut("slow");
					 }else if(typeStatus){
						 GlobalModule_notificationService.notification("error"," Plese select Owner Type ");
						 $(".loader").fadeOut("slow"); 
					 }					 
					 else{
 						 GlobalModule_notificationService.notification("error","select valid user from list");
						 $(".loader").fadeOut("slow");
					 }*/
				 };
			
				 
			$scope.getMyTaskListTab=function(){
				$state.go('restricted.admin.mytask');
			};
		  
		  
}]);