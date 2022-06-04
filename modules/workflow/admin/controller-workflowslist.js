var controllers = angular.module('LoginModule');

controllers.controller('WorkflowList_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','WorkflowsList_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,WorkflowsList_Service,Admin_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	//fetch workflows list
	$scope.fetchWorkflowsList = function(offset,limit,colName,order,search){
		
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
			 
			 WorkflowsList_Service.fetchWorkflowsList(offset,limit,colName,order,search,$rootScope.userdetails.id).then(function(response){
			 $scope.workFlowsList=response.data;
			 //console.log($scope.workFlowsList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchWorkflowsList(0,10,null,null,null);
	
	 
	 $scope.SortingWorkflowsList = function(colName,searchterm){
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
			$scope.fetchWorkflowsList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		
		$scope.fetchWorkflowsListCount=function(search){
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
			 WorkflowsList_Service.fetchWorkflowsListCount($scope.search,$rootScope.userdetails.id).then(function(response){
				$scope.count = response.data;
				//console.log($scope.count);
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.fetchWorkflowsListCount(null);
		
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
	        $scope.fetchWorkflowsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    
	    $scope.setButton = function(){
		$scope.navButtons = [];
			
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			$scope.fetchWorkflowsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
		
		//----------------delete work flow from list ------------------------- 
		  
		   //----------Get no of checked work flow-------
				  
		$scope.checkedWorkflowsids=[];
				  
		$scope.addCheckedWorkflowId = function(id){			  
					  
			if($scope.checkedWorkflowsids.indexOf(id) !== -1)
			{		
				var array  = $scope.checkedWorkflowsids;
				var index = array.indexOf(id);
				$scope.checkedWorkflowsids.splice(index,1);
			}
			else
			{		    	
				$scope.checkedWorkflowsids.push(id);				      
			};						  
		};
				 
		$scope.checkedAllList = function(workflowsList,rd){
			
			if(rd == true || rd == undefined)
			{				 
				for(var i=0; i<workflowsList.length; i++)
				{					  
					if($scope.checkedWorkflowsids.indexOf(workflowsList[i].id) !== -1)  
					{  						 
					}
					else
					{
						 $scope.addCheckedWorkflowId(workflowsList[i].id);	
					}						  
				}			
			}
			else
			{
				$scope.checkedWorkflowsids=[];
			}
		};
				  
				  
		$scope.check = function(){
			
			if($scope.checkedWorkflowsids.length == 0)
			{
				GlobalModule_notificationService.notification("error","Please select any record");
			}
			else
			{				  
				$('#deletelist').modal('show');
			}			  
		};
		
		
		$scope.deleteWorkflowFromList = function(formlist){
			  
				$(".loader").show();			  
			
			    $("#deletelist").modal('hide');
			    WorkflowsList_Service.deleteWorkflowFromList(formlist,$scope.checkedWorkflowsids).then(function(response){
				  var deleteStatusFlag = response.data;	
				  /*$scope.fetchWorkflowsListCount(null);
				  $scope.fetchWorkflowsList(0,10,null,null,null);*/
				  $state.reload();
				  $scope.checkedWorkflowsids=[];
				  if(deleteStatusFlag.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Workflow deleted successfully");
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
		  };
		
		//-----------------------------------------------------------------------	 
	 
//------------Column Setting-------------------------------------------------
		
		var getSettings = function(){
			
			$(".loader").show();
			
			Admin_Service.getSettings($rootScope.userdetails.id,13).then(function(response){
				  $scope.columnlist = response.data;	
				var count=0;
						for(var i=0;i<$scope.columnlist.length;i++){
							if($scope.columnlist[i].name=='Workflow Id' && $scope.columnlist[i].isActive==false){
								for(var j=0;j<$scope.columnlist.length;j++){
									if($scope.columnlist[j].name=='Workflow Id' || $scope.columnlist[j].name=='Workflow Name' || $scope.columnlist[j].name=='Owner Name' || $scope.columnlist[j].name=='Created On' || $scope.columnlist[j].name=='Workflow Short Name' || $scope.columnlist[j].name=='Created By'){
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
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+13+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
		
		$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        return dateOut;
	  };
	  
	  $scope.openAddFieldsPage=function(workflow){
		  
		  workflow.cloneFlag=false;
		  GlobalModule_dataStoreService.storeData('LoginModule','fieldId',undefined);
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.addworkflowfield");
	  };
	  
	  $scope.openEditWorkFlowPage=function(workflow){
		  
		  if(workflow != undefined)
		  {
			  workflow.cloneFlag=false;
		  }
		  
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.createworkflow");
	  };
		
	  $scope.openTasksListPage= function(workflow){
		  
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.taskslist");
	  };
	  
	  $scope.makeCloneOfWorkflow= function(){
		  
		  if($scope.checkedWorkflowsids.length == 0)
		  {
			  GlobalModule_notificationService.notification("error","please select one workflow");
			  return;
		  }
		  else if($scope.checkedWorkflowsids.length > 1)
		  {
			  GlobalModule_notificationService.notification("error","please select only one workflow for cloning");
			  return;
		  }
		  var workflow={workflowIdForClone:$scope.checkedWorkflowsids[0],cloneFlag:true};
		    
		  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
		  $state.go("restricted.admin.createworkflow");		  
	  };
	  
}]);