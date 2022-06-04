var controllers = angular.module('LoginModule');

controllers.controller('JobFairsList_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','JobFairsList_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,JobFairsList_Service)
{
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.event={};
	$scope.jobfair=GlobalModule_dataStoreService.loadData('LoginModule','jobfair');
/* $scope.jobfairId=$scope.jobfair.id;
	alert($scope.jobfairId);*/
	
	$scope.fetchJobFairsList = function(offset,limit,colName,order,search){
		
		 $(".loader").show();
		 
		 if(search=="" || search==null)
	     {
			  search= undefined;
		 }
		 if(colName == null || colName== "")
		 {
			  colName = undefined;
		 }
		 if(order == null){
			  order = undefined;
		 }
		 var walkinflag=false
		 JobFairsList_Service.fetchJobFairsList(offset,limit,colName,order,search,walkinflag).then(function(response){
			 
			 $scope.jobFairsList=response.data;
			// console.log($scope.jobFairsList);
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchJobFairsList(0,10,null,null,null);
	 
	 /*$scope.matchedRecord=function(name){
		 	for(var i=0;i<jobFairsList.length;i++)
			 {
			   if(name == $scope.jobfair.name )
				   {
					GlobalModule_notificationService.notification("error","name already exists");

				   }
			 }
	 };*/
	 $scope.SortingJobFairsList = function(colName,searchterm){
		 
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
		  
		  $scope.fetchJobFairsList(0,10,$scope.colName,$scope.order,$scope.search);			
	 };
	 
	 $scope.fetchJobFairsListCount=function(search){
			
		 $scope.offset =0 ;	
		 $scope.navButtons = [];			
		 $scope.count= 0 ;			
		 $scope.start = 0;			
		 $scope.search=search;
		 
		 if($scope.search==null || $scope.search=="")
		 {
			 	$scope.search= undefined;
		 }
		 if($scope.colName == null || $scope.colName== "")
		 {
			  	$scope.colName = undefined;
		 }
		 if($scope.order == null)
		 {
				$scope.order = undefined;
		 }
		 var walkinflag=false
		 JobFairsList_Service.fetchJobFairsListCount($scope.search,walkinflag).then(function(response){
				
			 $scope.count = response.data;
		//	 console.log($scope.count);
				
			 if($scope.count>$scope.limit)
			 {
				 $scope.setButton();
			 }
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.fetchJobFairsListCount(null);
		
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
	        $scope.fetchJobFairsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    
	    $scope.setButton = function(){
		$scope.navButtons = [];
			
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			$scope.fetchJobFairsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
		
		$scope.checkedJobFairsids=[];
		  
		$scope.addCheckedJobFairId = function(jobfair){			  
					  
			if($scope.checkedJobFairsids.indexOf(jobfair.id) !== -1)
			{		
				var array  = $scope.checkedJobFairsids;
				var index = array.indexOf(jobfair.id);
				$scope.checkedJobFairsids.splice(index,1);
			}
			else
			{		    	
				$scope.checkedJobFairsids.push(jobfair);				      
			};						  
		};
				 
		$scope.checkedAllList = function(jobFairsList,rd){
			
			if(rd == true || rd == undefined)
			{				 
				for(var i=0; i<jobFairsList.length; i++)
				{					  
					if($scope.checkedJobFairsids.indexOf(jobFairsList[i].id) !== -1)  
					{  						 
					}
					else
					{
						 $scope.addCheckedJobFairId(jobFairsList[i].id);	
					}						  
				}			
			}
			else
			{
				$scope.checkedJobFairsids=[];
			}
		};
				  
				  
		$scope.check = function(){
			
			if($scope.checkedJobFairsids.length == 0)
			{
				GlobalModule_notificationService.notification("error","Please select any record");
			}
			else
			{				  
				$('#deletelist').modal('show');
			}			  
		};
		
		
		$scope.deleteJobFair = function(formlist){
			  
			$(".loader").show();			  
			
			$("#deletelist").modal('hide');
			var walkinflag=false;   
			JobFairsList_Service.deleteJobFair(formlist,$scope.checkedJobFairsids,walkinflag).then(function(response){
			    	
				 var deleteStatusFlag = response.data;				   
				 $scope.checkedJobFairsids=[];
				  
				 if(deleteStatusFlag.indexOf("success")!=-1)
				 {
					  GlobalModule_notificationService.notification("success","Job Fairs deleted successfully");
					  $scope.fetchJobFairsList(0,10,null,null,null);
				 }
				 else
				 {
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				 }
				 
				 $(".loader").fadeOut("slow");
				 
			 },function(response){
				  $(".loader").fadeOut("slow");
		});
	};
		
	$scope.openEditJobFairPage=function(jobfair,flag)
	{
		GlobalModule_dataStoreService.storeData('LoginModule','jobfair',jobfair);
		GlobalModule_dataStoreService.storeData('LoginModule','editflag',flag);
		GlobalModule_dataStoreService.storeData('LoginModule','eventslotFlag', flag);

		
		$state.go("restricted.admin.createjobfair");
	};
		
		$scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	        return dateOut;
	    };
	    
	    $scope.openMappedJobListPage=function(jobFairId){
			 
			 GlobalModule_dataStoreService.storeData('LoginModule','jobFairId',jobFairId);
			 GlobalModule_dataStoreService.storeData('LoginModule','redirectpage',"jobfair");
			 $state.go("restricted.admin.Job_Map_listing");
		 };    
		 
		 $scope.eventSlotflag=function(){
			 
				GlobalModule_dataStoreService.storeData('LoginModule','eventslotFlag', false);

		 };
		 
		 $scope.userdata = function(data){	
			 var obj={
					 id:data.eventSchedularId,
					 eventId: data.eventSchedularId,
					 jobfairId:data.id,
					 schedulerName: data.name,
					 totalSlots: data.schedulerSlotsCount,
					 startDate:data.startDate,
					 endDate:data.endDate,
					 userid: data.userid,
					 "delete": true,
					 edit: true,
					 fortype:'jobfair'
					
				};	
			  GlobalModule_dataStoreService.storeData('LoginModule','data',obj);
		//	 console.log(data);
			  GlobalModule_dataStoreService.storeData('LoginModule','eventdata',$scope.jobFairsList);
			 
			   $state.go("restricted.admin.createEventscheduler");
		  };
		  
		  $scope.dateformate1 = function(date){		     
		        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
		        return dateOut;
		    };
		  
}]);