'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Workflow_Owner_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Workflow_Owner_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Workflow_Owner_Service,Admin_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	var ownerWorkflowList=[];
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.selectedEventId =-1;
	
	$scope.fetchWorkFlowOwnerList1 = function(offset,limit,colName,order,search){
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
		
			Workflow_Owner_Service.fetchWorkflowOwnerList(offset,limit,colName,order,search,$rootScope.userdetails.id).then(function(response){
				$scope.ownerWorkflowList = response.data;
				  //console.log(response.data);
			     $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchWorkFlowOwnerList1(0,10,null,null,null);
	  
/*----- Pagination of Event Scheduler page-----*/
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchWorkFlowOwnerList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getWorkflowOwnerListCount=function(searchterm){
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
			
			 Workflow_Owner_Service.getWorkflowOwnerListCount($scope.search,$rootScope.userdetails.id).then(function(response){
				
				$scope.count = response.data;
				//console.log(response.data);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getWorkflowOwnerListCount(null,null);
		
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
	        $scope.fetchWorkFlowOwnerList1($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    /*----- End Of Pagination-----*/
	    
	    /*------Sorting parameters-----*/
	    $scope.sortByName = function(searchterm,colName){
	    //	alert(colName);
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
				$scope.fetchWorkFlowOwnerList1(0,10,$scope.colName,$scope.order,$scope.search);
				
			};
			
			$scope.getTicketListByWorkflowId=function(workflowId,workflowObject){
				//alert(workflowId);
				GlobalModule_dataStoreService.storeData('LoginModule','workflowID',workflowId);
				GlobalModule_dataStoreService.storeData('LoginModule','ownerWorkflowObject',workflowObject);
				$state.go('restricted.admin.ticket');
			};
			$scope.getTaskDetailsByWorkflowId=function(workflow){
				GlobalModule_dataStoreService.storeData('LoginModule','workflowID',workflow.workFlowId);
				GlobalModule_dataStoreService.storeData('LoginModule','Wfshortname',workflow.shortName);
				$state.go('restricted.admin.ownertasklist');
			};
			$scope.getworkflowListTab=function(){
				$state.go('restricted.admin.ownerworkflow');
			};
			$scope.getMyTaskListTab=function(){
				$state.go('restricted.admin.mytask');
			};
			
			//------------Column Setting-------------------------------------------------
			
			var getSettings = function(){
				
				$(".loader").show();
				
				Admin_Service.getSettings($rootScope.userdetails.id,13).then(function(response){
					  $scope.columnlist = response.data;	
					var count=0;
							for(var i=0;i<$scope.columnlist.length;i++){
								if($scope.columnlist[i].name=='Workflow Id' && $scope.columnlist[i].isActive==false){
									for(var j=0;j<$scope.columnlist.length;j++){
										if($scope.columnlist[j].name=='Workflow Id' || $scope.columnlist[j].name=='Workflow Name' || $scope.columnlist[j].name=='Owner Name' || $scope.columnlist[j].name=='Created On' || $scope.columnlist[j].name=='Short Name' || $scope.columnlist[j].name=='Created By'){
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
							if($scope.columnlist[i].name=='Workflow Id' || $scope.columnlist[i].name=='Workflow Name' || $scope.columnlist[i].name=='Owner Name' || $scope.columnlist[i].name=='Created On'){
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
				  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+13+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&ownerFlag='+'owner');		 
			  };
			
			$scope.dateformate = function(date){		     
		        var dateOut = moment(date).format("DD-MM-YYYY");
		        return dateOut;
		  };
		  
		  $scope.generateWFTemplate = function(data){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }		
			  var wfname = data.name;
			  var wfid=data.workFlowId; 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+13+'&workflowId='+wfid+'&workflowname='+wfname+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&ownerFlag='+'owner');		 
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
			
		  $scope.openUploadTicketPage= function(workflow){
			  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
			  $state.go("restricted.uploadticketdata");
		  };
		  
		  $scope.openWorkflowPage= function(workflow){
			  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
			  //$state.go("restricted.ownerworkflow");
		  };
		  
}]);