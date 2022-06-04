'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('ticket_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','ticket_Service','survey_assignment_Service','CreateWorkflow_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,ticket_Service,survey_assignment_Service,CreateWorkflow_Service,Admin_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.workflowID=1;
	$scope.workflowObj= GlobalModule_dataStoreService.loadData('LoginModule','ownerWorkflowObject');
	$scope.workflowID=$scope.workflowObj.workFlowId;
	$scope.workflowName=$scope.workflowObj.name;
	$scope.backflag=$scope.workflowObj.setFlag;
	console.log($scope.workflowObj);
	$scope.ticketIdexce=0;
	
	//GlobalModule_dataStoreService.storeData('LoginModule','workflowId',1);
	$scope.usertypeid1;
	//$scope.workflowId= GlobalModule_dataStoreService.loadData('LoginModule','workflowId');
	var ticketList=[];
	var ticketListWithTicket=[];
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.selectedEventId =-1;
	$scope.OwnerTypeList=[];
	var ticketIdList=[];
	$scope.ticketstatusid=[];
	$scope.fetchTicketList1 = function(offset,limit,colName,order,search,userId,fromDate,toDate){
		 $(".loader").show();
		 //console.log(fromDate);
		// console.log(toDate);
		 
		 $scope.search=search;
		/*	$scope.fromDate=fromDate;
			$scope.toDate=toDate;*/
			if($scope.fromDate == "" || $scope.fromDate == null)
			  {
				
			  $scope.fromDate= undefined;
			  
			  }
			if($scope.toDate == "" || $scope.toDate == null)
			{
				$scope.toDate= undefined;
			}
		  if(search=="" || search==null)
			  {
			  search= undefined;
			  }
		  if(colName == null || colName == ""){
				 colName = undefined;
			 }
			 if(order == null){
				 order = undefined;
			 }
			 
			ticket_Service.fetchTicketList(offset,limit,colName,order,search,$scope.workflowID,fromDate,toDate).then(function(response){
				$scope.ticketList = response.data;
			
				  console.log($scope.ticketList);
			     $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchTicketList1(0,10,null,null,null,null,null);
	  
	  
	  
	 /* $scope.checkedAllList = function(ticketList,rd){	
		  
		  if(rd == true || rd == undefined){				 
		  for(var i=0; i<ticketList.length; i++){					  
			  
			  
			  if($scope.getCheckedId.indexOf(ticketList[i].id) !== -1)   
			  {  						 
			  }
			  else{
				  $scope.checkedList(ticketList[i].id);	
			  }
			  }			
		  }
		  else{
			  $scope.getCheckedId=[];
		  }
	  };*/
	  $scope.checkedTicketIds=[];
	  
	  $scope.getCheckedTicketid = function(id){			  
		  
		  if($scope.checkedTicketIds.indexOf(id) !== -1)
		  {		
		  var array  = $scope.checkedTicketIds;
		  var index = array.indexOf(id);
		  $scope.checkedTicketIds.splice(index,1);
		  
		  }else
		  {		    	
	      $scope.checkedTicketIds.push(id);	
	     
		  };
		 
	  };
	  $scope.check1 = function(){
			
			if($scope.checkedTicketIds.length == 0)
			{
				GlobalModule_notificationService.notification("error","Please select any record");
			}
						  
		};
	 
	  $scope.checkedAllList = function(ticketList,rd){				  
		  if(rd == true){				 
		  for(var i=0; i<ticketList.length; i++){					  
			  if(ticketList[i].ticketStatusId==1){
				  $('#assignbtn').prop('disabled', false);
			  //if already exist in getCheckedpoitionid than don't pass
			  if($scope.checkedTicketIds.indexOf(ticketList[i].ticketId) !== -1)   { 
				  
			  }else{
				  $scope.getCheckedTicketid(ticketList[i].ticketId);	
			  }
			  
		  }	
		  }
		  }else{
			  $scope.checkedTicketIds=[];
		  }
		  
		  //console.log($scope.checkedTicketIds);
	  };
	  
	  
	  
/*----- Pagination of Event Scheduler page-----*/
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchTicketList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.workflowID,$scope.fromDate,$scope.toDate);
			};
			
		$scope.getTicketListCount1=function(searchterm,workflowID,fromDate,toDate){
			$(".loader").show();
			
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=searchterm;
			if($scope.colName == null){
				$scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 if($scope.search=="" || $scope.search == null)
			  {
			  $scope.search= undefined;  
			  }
			 if($scope.fromDate == "" || $scope.fromDate == null)
			  {
			  $scope.fromDate= undefined;
			  
			  }
			if($scope.toDate == "" || $scope.toDate == null)
			{
				$scope.toDate= undefined;
			}
			
			 ticket_Service.getTicketListCount($scope.search,$scope.workflowID,fromDate,toDate).then(function(response){
				
				$scope.count = response.data;
				//console.log(response.data);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getTicketListCount1(null,$rootScope.userdetails.userid,null,null);
		
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
	        $scope.fetchTicketList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.workflowID,$scope.fromDate,$scope.toDate);
	    };
	    /*----- End Of Pagination-----*/
	    /*search by Enter Key*/
	    $scope.searchByEnterKey=function(search){
	    	$scope.fetchTicketList1(0,10,null,null,search,$rootScope.userdetails.userid,null,null);
	    	$scope.getTicketListCount1(search,$rootScope.userdetails.userid,null,null);
	    };
	    ////////////////
	    
	    /*------Sorting parameters-----*/
	    $scope.sortByName = function(searchterm,colName){
			   $scope.offset =0 ;
				$scope.start = 0;
				$scope.colName = colName;
				$scope.search=searchterm;
				
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.search==null)
				  {
				  $scope.search= undefined;
				  }
				$scope.fetchTicketList1(0,10,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);
				
			};
			
			 $scope.editTicket = function(ticketId){
				 //console.log(ticketId);
				GlobalModule_dataStoreService.storeData('LoginModule','ticketID',ticketId); 
				GlobalModule_dataStoreService.storeData('LoginModule','workflowID',$scope.workflowID);
				 $state.go("restricted.admin.addTicket");
			 };
			 $scope.addNewTicket = function(){
					GlobalModule_dataStoreService.storeData('LoginModule','ticketID',0); 
					GlobalModule_dataStoreService.storeData('LoginModule','workflowID',$scope.workflowID);
					 $state.go("restricted.admin.addTicket");
				 };
			$scope.ticketStatusId1=0;
			$scope.taskStatus=function(id){
				$scope.ticketStatusId1=0;
				$scope.ticketStatusId1=id;
				
				if($scope.ticketStatusId1 == 1){
					  $('#assignbtn').prop('disabled', false);
				}else{
					  $('#assignbtn').prop('disabled', true);
				}
			};
			$scope.assignTicket=function(){
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
								 $('#assignnment-details').modal('show');
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
			
			$scope.assignFlag=true;
			$scope.checkTicket=function(ticketId,check){
				if(check){
					ticketIdList.push(ticketId);
				}else{
					if(ticketIdList.length==1){ticketIdList=[];}
					ticketIdList.splice(1,ticketId);
					
				}
				if(ticketIdList.length > 0 && $scope.ticketStatusId1!=1)
				{
					$scope.assignFlag=false;
				}
				else
				{
					$scope.assignFlag=true;
				}
				//console.log(ticketIdList);
			};
			var ownerTypeId=1;
			var ownerList=[];
			$scope.getOwnerTypeListById=function(ownerTypeId){
				ticket_Service.getOwnerTypeListById1(ownerTypeId).then(function(response){
					$scope.ownerList = response.data;
					  //console.log(response.data);
				     $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});


			};
			
			$scope.filterFlag=true;
			$scope.resetFlag=false;
			$scope.resetFilterInput=function(filterFlag){
				$scope.toDate=null;
				$scope.fromDate=null;
				$scope.filterFlag=true;
				$scope.resetFlag=false;
				$scope.getTicketListCount1(null,$rootScope.userdetails.userid,null,null);
				$scope.fetchTicketList1(0,10,null,null,null,$rootScope.userdetails.userid,null,null);
			};
			
			$scope.validateDate = function(element){ 
				//---------validate issue date and expiry date		
				
				var fromDate=$("#fromdate").val();
				var toDate=$("#todate").val();
				//console.log(fromDate+"---"+toDate);
		        if ( new Date(stringToDate(fromDate,"dd-mm-yyyy","-")) > new Date(stringToDate(toDate,"dd-mm-yyyy","-")) ) { 
		           				          
		          // $scope.compliance.expiryDate='';
				   GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
		        	$('#'+element).val(null);
		            return false;
		        }
		        return true;
			};  
		        function stringToDate(_date,_format,_delimiter)
				   {
				               var formatLowerCase=_format.toLowerCase();
				               var formatItems=formatLowerCase.split(_delimiter);
				               var dateItems=_date.split(_delimiter);
				               var monthIndex=formatItems.indexOf("mm");
				               var dayIndex=formatItems.indexOf("dd");
				               var yearIndex=formatItems.indexOf("yyyy");
				               var month=parseInt(dateItems[monthIndex]);
				               month-=1;
				               var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
				               return formatedDate;
				   }

			
		        $scope.filterFlag=true;
			$scope.searchByDate=function(fromDate,toDate,filterFlag){
				
				
				if(filterFlag=='filter')
				{
					if((fromDate==null || fromDate=="" || fromDate==undefined) && (toDate==null || toDate=="" || toDate==undefined)){
						GlobalModule_notificationService.notification("error","Select From Date And To Date");
						return;
						
					}
					
					 $scope.filterFlag=false;
					 
				}
				else if(filterFlag=='reset')
				{
					
					 $scope.filterFlag=true;
					 $scope.toDate="";
						$scope.fromDate="";
				}
				
				$scope.getTicketListCount1(null,$rootScope.userdetails.userid,fromDate,toDate);
				$scope.fetchTicketList1(0,10,null,null,null,$rootScope.userdetails.userid,fromDate,toDate);		
			};
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
			 $scope.fetchEmployeeDetails=function(search){
					
					//var numval='^[0-9]$';
					
				if(search=="")
				{
					 
				}
				else{
					  
					if(search.length>3){
				  
						survey_assignment_Service.fetchEmployeeDetails(search,2).then(function(response){
						
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
								  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].email});
							}
					    }
					  
				  },function(response){
					  
					});	 
				 }
			}		
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
			 // owner type
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
			
			$scope.assignTaskUserGroupDepartment = function(){
				 $(".loader").show();
				 var status=true;
				 var errorStayus=false;
				 var typeStatus=false;
				 console.log($scope.ticketListWithTicket);
				 for(var i=0;i<$scope.ticketListWithTicket.length;i++)
				{     
					 if($scope.ticketListWithTicket[i].checkTaskStatus && $scope.ticketListWithTicket[i].checkTaskStatus!=""){
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
					 }/*else{
						 status=false; 
						 typeStatus=true;
					 }*/
					/*if($scope.ticketListWithTicket[i].userTypeId==1 && $scope.ticketListWithTicket[i].userid==0){
						status=false; 
						
					 }*/
				}
				 if(status){
				console.log($scope.ticketListWithTicket);
				 ticket_Service.assignTaskUserGroupDepartment($scope.ticketListWithTicket,ticketIdList[0],$scope.workflowID,$rootScope.userdetails.id).then(function(response){
					 $scope.ownersList=response.data;
					 //$('#assignnment-details').hide();
					 if(response.data=="success"){
					 $('#assignnment-details').modal("hide");
					 $scope.fetchTicketList1(0,10,null,null,null);
					 GlobalModule_notificationService.notification("success","Task Assign Successfully");
					 ticketIdList=[];
					 }
					 if(response.data=="failed"){
						// $scope.fetchTicketList1(0,10,null,null,null);
						 /*ticket_Service.fetchOwnerType().then(function(response){
								$scope.OwnerTypeList = response.data;
								  console.log(response.data);
							     $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							});
						 */
						 $('#assignnment-details').modal("hide");
						 GlobalModule_notificationService.notification("error","Select at least one task");

						 
						 }
					  console.log($scope.ownersList);
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
			$scope.validateUser=function(evt){
				
				var id = document.getElementById('userDetails-'+evt).options[0].getAttribute('data-id');
				//alert(id);
				$scope.ticketListWithTicket[evt].userid=id;
				$("#userId-"+evt).val(id);
				$("#userId-"+evt).attr('ng-init','j.userid'+id);
				
			};
			$scope.accessTypeList=function(){
				ticket_Service.fetchOwnerType().then(function(response){
					$scope.OwnerTypeList = response.data;
					  console.log(response.data);
				     $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
			};
			$scope.accessTypeList();
			
			$scope.assignSingleAndMultipleTicket=function(){
				
				
				if($scope.checkedTicketIds.length == 0)
				{
					GlobalModule_notificationService.notification("error","Please select any record");
					return;
				}else{
					$(".loader").show();
				ticket_Service.assignSingleAndMultipleTicketUser($scope.checkedTicketIds,$scope.workflowID,$rootScope.userdetails.id).then(function(response){
					if(response.data=="success"){
						 $scope.fetchTicketList1(0,10,null,null,null);
						 GlobalModule_notificationService.notification("success","Ticket Assigned Successfully");
						 ticketIdList=[];
						 $(".loader").fadeOut("slow");
						 $state.reload();
						 }
					else{
						 GlobalModule_notificationService.notification("error","Tasks are unassigned. Please assign the tasks");	 
						 $(".loader").fadeOut("slow");
				    }
			        },function(response){
				  $(".loader").fadeOut("slow");
				});
				}
			};
			
			$scope.getworkflowListTab=function(){
				if($scope.backflag==2){
					$scope.workflowObj.setFlag=1;
					GlobalModule_dataStoreService.storeData('LoginModule','workflowObj',$scope.workflowObj);
					$state.go('restricted.admin.WfTicketStatusCount');
				}else{
					$state.go('restricted.admin.ownerworkflow');
				}
				
			};
			$scope.getMyTaskListTab=function(){
				$state.go('restricted.admin.mytask');
			};
			 
	//------------Column Setting-------------------------------------------------
var getSettings = function(){
				
				$(".loader").show();
				
				Admin_Service.getSettings($rootScope.userdetails.id,15).then(function(response){
					  $scope.columnlist = response.data;	
					var count=0;
							for(var i=0;i<$scope.columnlist.length;i++){
								
										if($scope.columnlist[i].name=='Ticket Number' && $scope.columnlist[i].isActive==false){
											for(var j=0;j<$scope.columnlist.length;j++){
												if($scope.columnlist[j].name=='Ticket Number' || $scope.columnlist[j].name=='Created On' || $scope.columnlist[j].name=='Ticket Status' ){
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
									if($scope.columnlist[i].name=='Ticket Number' || $scope.columnlist[i].name=='Created On'){
										$scope.columnlist[i].isActive=true;
									}else{
										$scope.columnlist[i].isActive=false;
									}
								}
								
							}
					$(".loader").fadeOut("slow");
				};
					
			//-------------------------------------------------------------------------------
				
				
				$scope.generateExcel = function(){		 
					  if($scope.search == undefined){
						  $scope.search ="";
					  }			 
					  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+15+'&search='+$scope.search+'&workflowId='+$scope.workflowID+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
				  };
				  $scope.generateExcelPerTicket = function(){		 
					 if($scope.search == undefined){
						  $scope.search ="";
					  }	
					 if($scope.fromDate == "" || $scope.fromDate == null)
					  {
						
					  $scope.fromDate= "";
					  
					  }
					if($scope.toDate == "" || $scope.toDate == null)
					{
						$scope.toDate= "";
					}
					 window.open('download?workflowName='+$scope.workflowObj.name+'&workflowId='+$scope.workflowID+'&userId='+$rootScope.userdetails.id+'&screenId='+15+'&search='+$scope.search+'&fromDate='+$scope.fromDate+'&toDate='+$scope.toDate+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&ticketId='+$scope.ticketIdexce+'&workflowOwnerId='+$scope.workflowObj.wf_Owner.ownerId);
					 // workflow_id, userId, screenId, search, fromdate, toDate, response, ticketId, workflowOwnerId, user
					 // window.open('download?workflowName='+$scope.workflowObj.name+'&workflowId='+$scope.workflowID+'&userId='+$rootScope.userdetails.id+'&screenId='+52+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&ticketId='+$scope.ticketIdexce+'&workflowOwnerId='+$scope.workflowObj.wf_Owner.ownerId);		 
				  };
				 
				  $scope.generateExcelPerWf_TicketData = function(){		 
						
						 // workflow_id, userId, screenId, search, fromdate, toDate, response, ticketId, workflowOwnerId, user
						  window.open('download?workflowName='+$scope.workflowObj.name+'&workflowId='+$scope.workflowID+'&userId='+$rootScope.userdetails.id+'&screenId='+52+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&ticketId='+$scope.ticketIdexce+'&workflowOwnerId='+$scope.workflowObj.wf_Owner.ownerId);		 
					  };
				$scope.dateformate = function(date){		     
			        var dateOut = moment(date).format("DD-MM-YYYY");
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
			
			
		$scope.openTicketDetailsPage= function(ticketObject){
			
			GlobalModule_dataStoreService.storeData('LoginModule','ownerWorkflowObject',$scope.workflowObj);	
			GlobalModule_dataStoreService.storeData('LoginModule','ticketObject',ticketObject);
			$state.go("restricted.admin.ticketdetails");
		};
		
		$scope.openClosureModal=function(){
			$('#pre-closure').modal('show');
		};
		
		$scope.changeTicketStatus=function(){
			
			$(".loader").show();
			ticket_Service.changeTicketStatus($scope.checkedTicketIds,$scope.workflowID,$rootScope.userdetails.id).then(function(response){
				if(response.data=="success"){
					 $scope.fetchTicketList1(0,10,null,null,null);
					 GlobalModule_notificationService.notification("success","Ticket Status Changed Successfully");
					 ticketIdList=[];
					 $(".loader").fadeOut("slow");
					 $state.reload();
					 }
				
		        },function(response){
			  $(".loader").fadeOut("slow");
			});
		};
}]);