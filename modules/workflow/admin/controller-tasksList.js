var controllers = angular.module('LoginModule');

controllers.controller('TasksList_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','WorkflowsList_Service','Admin_Service','TasksList_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,WorkflowsList_Service,Admin_Service,TasksList_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.workflow= GlobalModule_dataStoreService.loadData('LoginModule','workflowObject');
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	//fetch tasks list
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
			 
			 TasksList_Service.fetchTasksList(offset,limit,colName,order,search,$scope.workflow.id).then(function(response){
			 $scope.tasksList=response.data;
			 //$(".modal-backdrop").remove();
			 console.log($scope.tasksList);
			 //$scope.init();
			 //console.log($scope.tasksList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 
	 
	 $scope.fetchTasksTree = function(){
			
		 $(".loader").show();
		 
			 TasksList_Service.fetchTasksTree($scope.workflow.id).then(function(response){
			 $scope.taskstree=response.data;
			 //$scope.init();
			 //console.log($scope.tasksList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchTasksList(0,10,null,null,null);
	 $scope.fetchTasksTree();
	 $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		 $scope.init();
		});
	 
	 $scope.sortByName = function(searchterm,colName){
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
			 TasksList_Service.fetchTasksListCount($scope.search,$scope.workflow.id).then(function(response){
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
			
			Admin_Service.getSettings($rootScope.userdetails.id,14).then(function(response){
				  $scope.columnlist = response.data;
				  //console.log($scope.columnlist);
				var count=0;
						for(var i=0;i<$scope.columnlist.length;i++){
							if($scope.columnlist[i].name=='Task Id' && $scope.columnlist[i].isActive==false){
								for(var j=0;j<$scope.columnlist.length;j++){
									if($scope.columnlist[j].name=='Task Id' || $scope.columnlist[j].name=='Task Name' || $scope.columnlist[j].name=='Created On' || $scope.columnlist[j].name=='SLA' || $scope.columnlist[j].name=='Workflow Short Name' || $scope.columnlist[j].name=='Dependencies'){
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
						if($scope.columnlist[i].name=='Task Id' || $scope.columnlist[i].name=='Task Name' || $scope.columnlist[i].name=='Created On' || $scope.columnlist[i].name=='SLA' || $scope.columnlist[i].name=='Workflow Short Name' || $scope.columnlist[i].name=='Dependencies'){
														
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
			TasksList_Service.fetchTasksForDependecy(taskId,$scope.workflow.id).then(function(response){
				 $scope.otherTasksList=response.data;
				 if($scope.otherTasksList.length <= 0)
				 {
					 GlobalModule_notificationService.notification("error","No other tasks to make dependency");
				 }
				 else
				 {
					 for(var i=0;i<$scope.otherTasksList.length;i++)
					 {
						 if($scope.otherTasksList[i].dependentTaskFlag)
						 {
							 $scope.dependentTasksIds.push($scope.otherTasksList[i].id);
						 }						 
					 }
					 
					 $('#depedencies').modal('show');
				 }
				 //console.log($scope.otherTasksList);
				 //console.log($scope.dependentTasksIds);
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
					 $scope.dependentTasksIds = [];
					 $scope.fetchTasksList(0,10,null,null,null);
					 $scope.fetchTasksTree();
					 $scope.init();
				 }
				 
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
			
			//$state.reload();
			
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
			 GlobalModule_dataStoreService.storeData('LoginModule','saveTaskFlag',true);
			GlobalModule_dataStoreService.storeData('LoginModule','selectedFiledFlag',true);
			GlobalModule_dataStoreService.storeData('LoginModule','updateTaskFlag',false);
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
		
		$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        return dateOut;
		};
		
		$scope.generateExcel = function(){
			
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+14+'&workflowId='+$scope.workflow.id+'&search='+$scope.search+'&WfShortname='+$scope.workflow.shortName+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
		  
		  
		  $scope.openEditTaskPage= function(task){
			  
			  GlobalModule_dataStoreService.storeData('LoginModule','task',task);
			  
			  GlobalModule_dataStoreService.storeData('LoginModule','selectedFiledFlag',false);
			  GlobalModule_dataStoreService.storeData('LoginModule','updateTaskFlag',true);
			  GlobalModule_dataStoreService.storeData('LoginModule','saveTaskFlag',false);
			  $state.go("restricted.admin.createtask");
		  };
		  
		    $scope.init=function(){
		    	jsPlumb.ready(function() {
		    		
		    		console.log( $scope.taskstree);
		    		 for(var k=0;k< $scope.taskstree.length;k++){ 
		    			    console.log($scope.taskstree[k]);
		    			 	for(var i=0;i< $scope.taskstree[k].length;i++){
		    			 		
		    			 		 console.log($scope.taskstree[k][i]);
		            	       if(null!=$scope.taskstree[k][i].childtasks)
		            		  {
	            	               for(var j=0;j< $scope.taskstree[k][i].childtasks.length;j++){
	            		            console.log('source'+$scope.taskstree[k][i].id);
	            		            console.log('target'+$scope.taskstree[k][i].childtasks[j].id);
	            	            	   jsPlumb.connect({
	            	            		   	connector: ["Straight"],
		                    source:'node'+$scope.taskstree[k][i].id,
		                    target:'node'+$scope.taskstree[k][i].childtasks[j].id, 
		                     anchors:["Bottom","Top" ],
		                 endpoint:"Rectangle",
						overlays:[ ["Arrow" , { width:12, length:12, location:0.67 }] ]
		                });
	            	}
		            		}
		            }
		    		 }
		    	});   		        
		    };

		    $scope.openTaskSetting=function(task){			
				GlobalModule_dataStoreService.storeData('LoginModule','taskId',task.id);
				$state.go("restricted.admin.tasksetting");		
			};

}]);