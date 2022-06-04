'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('schedulermaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','SchedulerMaster_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,SchedulerMaster_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	//console.log($rootScope.userdetails);
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	 $scope.fetchSchedulerMaster = function(offset,limit,colName,order,search){		
		 
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
			 
			 SchedulerMaster_Service.fetchSchedulerMaster(offset,limit,colName,order,search).then(function(response){	 			 
			  $scope.schedulermaster = response.data;	
			//console.log("schedulermaster------------------");
			//console.log($scope.schedulermaster);
			  $(".loader").fadeOut("slow");
			},function(response){	
				$(".loader").fadeOut("slow");
				});				 
	 };
	 $scope.fetchSchedulerMaster(0,10,null,null,null);

	// ----------------Sorting of column------------------------------------------------
	 $scope.Sortingschedulerlist = function(colname,searchterm){
		  $scope.offset =0 ;
		  $scope.start = 0;
		  $scope.colName=colname;
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
			$scope.fetchSchedulerMaster(0,10,$scope.colName,$scope.order,$scope.search);	
		};
	 
						
				
	//	------------	GetSchedulerlistCount--------------------------------------------------------	
				$scope.getActiveSchedulerCount=function(search){
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
					 SchedulerMaster_Service.getActiveSchedulerCount($scope.search).then(function(response){
						$scope.count = response.data;				
						
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						$(".loader").fadeOut("slow");		
					});		
				};
				$scope.getActiveSchedulerCount(null);
//	----------------------------------------------------------------------------------------------------------------
				
//-------------------------------------------------pagination start--------------------------------------------------------------				
			
		 $scope.setButton = function(){
		 $scope.navButtons = [];			
		 	for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
		     $scope.navButtons.push(j);
			}						
		 $scope.fetchSchedulerMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
			 
		
				
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
	        $scope.fetchSchedulerMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
//--------------------------------------pagination end-----------------------------------------	
		 
	    
	    $scope.getCheckedtemplateid=[];
		
	    $scope.checkedSchedulerList = function(id){			  
			  
			  if($scope.getCheckedtemplateid.indexOf(id) !== -1)
			  {		
			  var array  = $scope.getCheckedtemplateid;
			  var index = array.indexOf(id);
			  $scope.getCheckedtemplateid.splice(index,1);
			  }else
				  {		    	
		      $scope.getCheckedtemplateid.push(id);				      
				  };	
		  };
	    
	    $scope.checkedAllList = function(listedScheduler,rd){				  
			  if(rd == true || rd == undefined){				 
			  for(var i=0; i<listedScheduler.length; i++){					  
				  
				  //if not already exist in getCheckedtemplateid than pass
				  if($scope.getCheckedtemplateid.indexOf(listedScheduler[i].id) == -1)   {  		
					  $scope.checkedSchedulerList(listedScheduler[i].id);	
				  }
				  
			  }			
			  }else{
				  $scope.getCheckedtemplateid=[];
			  }
		  };
		  
		  $scope.check = function(){				  
			  if($scope.getCheckedtemplateid.length == 0){
				  GlobalModule_notificationService.notification("error","Please select any record");}
			  else{				  
				  $('#deletelist').modal('show');
				  }			  
			  };			 
			 
			  
			  $scope.deletefromList = function(formlist){
				  $scope.formlist=formlist;
				 //alert($scope.formlist+" "+$scope.getCheckedId.length);
				  if($scope.getCheckedtemplateid.length == 0) 
				  {
					  GlobalModule_notificationService.notification("error","Please select any record");
				  }
				  else
				  {
					  SchedulerMaster_Service.deleteFromList($scope.formlist,$scope.getCheckedtemplateid).then(function(response){
					  $scope.postjobflag = response.data;	
					  $scope.getActiveSchedulerCount(null);
					  $scope.fetchSchedulerMaster(0,10,null,null,null);
					 
					  if($scope.postjobflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");						 
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");					  
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
			  }
				  $scope.getCheckedtemplateid = [];
			  };
		  
//----------------------------------------Navigate to scheduler details -----------------------------------------------------	  
			$scope.fetchschedulerId = function(id){		
				GlobalModule_dataStoreService.storeData('LoginModule','schedulerid',id);			
				SchedulerMaster_Service.fetchSchedulerDetailById(id).then(function(response){
						  $scope.schedulerdetail = response.data;	
						  
						  $scope.data = $scope.schedulerdetail[0];
						 
						  GlobalModule_dataStoreService.storeData('LoginModule','data',$scope.data);
						  GlobalModule_dataStoreService.storeData('LoginModule','flag',false);	
						 $state.go("restricted.admin.editscheduleractivity");		
						
					  },function(response){						
						});
				  };
				  
				  $scope.addNewScheduler = function(){
					  $state.go("restricted.admin.createscheduleractivity");	
						$scope.flag = true;
						GlobalModule_dataStoreService.storeData('LoginModule','flag',$scope.flag);		
					    GlobalModule_dataStoreService.storeData('LoginModule','data',$scope.data);       
				  };
					
		  
}]);