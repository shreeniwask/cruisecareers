'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('EventScheduler_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	 $scope.selectedEventId =-1;
	
	$scope.fetchEventSchedulerList = function(offset,limit,colName,order,search){
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
		
		 Admin_Service.fetchEventSchedulerList(offset,limit,colName,order,search,$rootScope.userdetails.id).then(function(response){
			  //console.log(response.data);
			  $scope.EventSchedulerList = response.data;
			  $rootScope.EventDetails = $scope.EventSchedulerList;
		
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchEventSchedulerList(0,10,null,null,null);	
	  
	 
	/*----- Pagination of Event Scheduler page-----*/
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchEventSchedulerList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getEventSchedulerListcount=function(searchterm){
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
			
			Admin_Service.getEventSchedulerListcount($scope.search,$rootScope.userdetails.id).then(function(response){
				
				$scope.count = response.data;
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getEventSchedulerListcount(null,null);
		
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
	        $scope.fetchEventSchedulerList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    /*----- End Of Pagination-----*/
	    
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
				$scope.fetchEventSchedulerList(0,10,$scope.colName,$scope.order,$scope.search);
				
			};
			
			
	/*------Delete list on click-----*/
			
			$scope.getCheckedId=[];
			  
			  $scope.checkedList=function(id){
				  
				  $scope.selectedEventId = id;
				  
				  if($scope.getCheckedId.indexOf(id) !== -1)
				  {		
				  var array  = $scope.getCheckedId;
				  var index = array.indexOf(id);
				  $scope.getCheckedId.splice(index,1);
				  }else
					  {		    	
			      $scope.getCheckedId.push(id);
			     
					  }
			  };
			
			  
			  $scope.deletefromList = function(formlist){
				  $scope.formlist=formlist;
				  $scope.deleteId=[];
				  $scope.deleteId.push($scope.getCheckedId[$scope.getCheckedId.length-1]);
					  Admin_Service.deleteFromList($scope.formlist,$scope.deleteId).then(function(response){
					  $scope.postjobflag = response.data;	
					  
					  $scope.getEventSchedulerListcount(null,null);
					  $scope.setButton();
					//  $scope.fetchEventSchedulerList(0,10,null,null,null);
					 
					  if($scope.postjobflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});		  
			  };
			
			  $scope.userdata = function(data){					  
				  GlobalModule_dataStoreService.storeData('LoginModule','data',data);
				  console.log(data);
				  GlobalModule_dataStoreService.storeData('LoginModule','eventdata',$scope.EventSchedulerList);
				 
				   $state.go("restricted.admin.createEventscheduler");
			  };
			  
			  $scope.eventSlotflag=function(){
					 
					GlobalModule_dataStoreService.storeData('LoginModule','eventslotFlag', true);
					


			 };
			 
			  
			  /*--------Add slots -------*/
			  
			  $scope.addEventSlot = function()
			  {
				  	//slot.id= $scope.selectedEventId;
				  	$scope.slot={};
				  	$scope.slot.dateTime = $("#datetimepickercns").data('date') ;
				  	$scope.slot.candidates=document.getElementById('candidates').value;
					 //alert($scope.slot.candidates);
					  if($scope.slot.candidates <= 0 || $scope.slot.candidates=="" || $scope.slot.candidates == undefined || $scope.slot.candidates==null) 
					  {
						  
						  GlobalModule_notificationService.notification("error","Please add number of candidates");
					  }
					  else
					  {
						  Admin_Service.addEventSlot($scope.slot,$scope.selectedEventId).then(function(response){
						  $scope.postjobflag = response.data;	
						  $scope.getEventSchedulerListcount(null,null);
						  /*$scope.fetchEventSchedulerList(0,10,null,null,null);*/
						  $scope.setButton();
						 /* $scope.slot.dateTime=$("#datetimepickercns").data({defaultDate:'now'});
						  $scope.slot.candidates="";*/
						  document.getElementById('candidates').value="";
						
						  if($scope.postjobflag.indexOf("success")!=-1){
							  GlobalModule_notificationService.notification("success","Slot added successfully");
							  $scope.slot={};
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
					  }
			  };
			  
			  
			  /*-----add button----*/
			  $scope.addScheduler = function(){	
					 $state.go("restricted.admin.createNewScheduler");	
					 
			$scope.EventId=function(){
				
				GlobalModule_dataStoreService.storeData('LoginModule','eventId');

			};
					};
}]);