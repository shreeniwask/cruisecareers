'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Job_fair_map_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','jobMapping_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,jobMapping_Service){
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.jobfairId= GlobalModule_dataStoreService.loadData('LoginModule','jobFairId');
	$scope.redirectpage= GlobalModule_dataStoreService.loadData('LoginModule','redirectpage');
	
	$scope.redirectPage=function(){
		
		if($scope.redirectpage == "jobfair"){
			$state.go('restricted.admin.jobfairslist');
			
		}else if($scope.redirectpage == "waklins"){
			$state.go('restricted.admin.walkinlist');
		}
	}
	
	
	$scope.fetchMappedJobList = function(offset,limit,search,colName,order,jobFairId){
		 // $(".loader").show();
		  
		  $scope.getCheckedId=[];
		  
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
		 
			 jobMapping_Service.fetchMappedJobList(offset,limit,search,colName,order,$scope.jobfairId).then(function(response){
			  $scope.mappedjoblist = response.data;
			 
			// console.log($scope.mappedjoblist);
			 $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchMappedJobList(0,10,null,null,null,null);
	  
	  //sorting
	  $scope.SortingJobMapList = function(colName,search){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
		  $(".loader").show();
			
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
			 	

			 $(".loader").fadeOut("slow");
			 
			 $scope.fetchMappedJobList(0,10,$scope.search,$scope.colName,$scope.order,$scope.jobFairId);
		};
		  
		// $scope.fetchMappedJobList(0,10,$scope.colName,$scope.order,$scope.search,jobFairId);	
		
		//count
		
		$scope.fetchMappedJobListCount=function(search,jobfairId){
			
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
			
			 jobMapping_Service.fetchMappedJobListCount($scope.search,$scope.jobfairId).then(function(response){
					
				 $scope.count = response.data;
				// console.log($scope.count);
					
				 if($scope.count>$scope.limit)
				 {
					 $scope.setButton();
				 }
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.fetchMappedJobListCount(null,null);
			
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
		       
		        
				 $scope.fetchMappedJobList($scope.offset,$scope.limit,$scope.search,$scope.colName,$scope.order,$scope.jobFairId);

		    };
		    
		    $scope.setButton = function(){
			$scope.navButtons = [];
				
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchMappedJobList($scope.offset,$scope.limit,$scope.search,$scope.colName,$scope.order,$scope.jobFairId);
			};
	 
		
		$scope.checkquestionId = function(Qid){
			
			for(var i=0;i<$scope.AssessmentquestionList.length;i++){	
			 
				if(Qid == $scope.AssessmentquestionList[i].id){ 					
					return true;
					break;
				}			
			}	 
				return false;		
		};
	
	  
	  //for deleting jobs
	  
	  $scope.getCheckedId=[];
	  
	  $scope.checkedList=function(id){
		  
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
	  
	  $scope.checkedAllList = function(mappedjoblist,rd){	
		  
		  if(rd == true || rd == undefined){				 
		  for(var i=0; i<mappedjoblist.length; i++){					  
			  
			  //if already exist in getCheckedtemplateid than don't pass
			  if($scope.getCheckedId.indexOf(mappedjoblist[i].id) !== -1)   
			  {  						 
			  }
			  else{
				  $scope.checkedList(mappedjoblist[i].id);	
			  }
			  }			
		  }
		  else{
			  $scope.getCheckedId=[];
		  }
	  };
	  
	  $scope.check = function(){	
	  if($scope.getCheckedId.length == 0){
		  
		  GlobalModule_notificationService.notification("error","Please select any record");
		  }
	  else{				  
		  $('#deletelist').modal('show');
		  }			  
	  };
	  $scope.addJobs = function(){	
		  $scope.searchterm='';
		  $scope.fetchJobListForMapping(0,10,null,null,null);	
			  $('#add-jobs-in-jobfair').modal('show');
					  
		  };
	  
	
	  $scope.deleteMappedJob = function(formlist,jobfairId){
		  
			$(".loader").show();			  
			
			$("#deletelist").modal('hide');
			    
			jobMapping_Service.deleteMappedJob(formlist,$scope.jobfairId,$scope.getCheckedId).then(function(response){
			    	
				 var deleteStatusFlag = response.data;				   
				 $scope.getCheckedId=[];
				  
				 if(deleteStatusFlag.indexOf("Success")!=-1)
				 {
					  GlobalModule_notificationService.notification("success","Jobs deleted successfully");
					  $scope.fetchMappedJobList(0,10,null,null,null);
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
	  
	//for mapping jobs
	
	 $scope.fetchJobListForMapping = function(offset,limit,colName,order,search,jobFairId){
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
		
			 jobMapping_Service.fetchJobListForMapping(offset,limit,colName,order,search,$scope.jobfairId).then(function(response){
			 
			  $scope.mappingJobList = response.data;
		  
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	 // $scope.fetchJobListForMapping(0,10,null,null,null);	
	  
	  
	  
	  
	  
	  
	  $scope.saveJobMapping = function(jobListIds,jobfairId){
		  
			$(".loader").show();			  
			
			$("#add-jobs-in-jobfair").modal('hide');
			    
			jobMapping_Service.saveJobMapping($scope.jobfairId,$scope.getCheckedId,$rootScope.userdetails.id).then(function(response){
			    	
				 var saveFlag = response.data;				   
				 $scope.getCheckedId=[];
				  
				 if(saveFlag.indexOf("success")!=-1)
				 {
					  GlobalModule_notificationService.notification("success","Jobs added  successfully");
					  $scope.fetchMappedJobList(0,10,null,null,null);
					  //$scope.fetchJobListForMapping(0,10,null,null,null);	

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
	
	/*$scope.checkJobId = function(Qid){
		
		for(var i=0;i<$scope.MappingJobList.length;i++){	
		 
			if(Qid == $scope.MappingJobList[i].id){ 					
				return true;
				break;
			}			
		}	 
			return false;		
	};*/
	
	$scope.checkedAllListMappingJobs = function(mappingJobList,rd1){	
		   
		  if(rd == true || rd == undefined){				 
		  for(var i=0; i<mappingJobList.length; i++){					  
			  
			  //if already exist in getCheckedtemplateid than don't pass
			  if($scope.getCheckedId.indexOf(mappingJobList[i].id) !== -1)   
			  {  						 
			  }
			  else{
				  $scope.checkedList(mappingJobList[i].id);	
			  }
			  }			
		  }
		  else{
			  $scope.getCheckedId=[];
		  }
	  };
	
	//sorting job mapping
	$scope.Sorting = function(colName,search){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
		  $(".loader").show();
			
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
			  $scope.fetchJobListForMapping(0,10,$scope.colName,$scope.order,$scope.search);	

			 $(".loader").fadeOut("slow");
		};
		
		//count for job mapping
		
		$scope.fetchJobListForMappingCount=function(search,jobfairId){
			
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
			
			 jobMapping_Service.fetchJobListForMappingCount($scope.search,$scope.jobfairId).then(function(response){
					
				 $scope.count = response.data;
				// console.log($scope.count);
					
				 /*if($scope.count>$scope.limit)
				 {
					 $scope.setButton();
				 }*/
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.fetchJobListForMappingCount(null,null);

}]);