'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('JobResult_Ctrl',['$scope','$rootScope','$state','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService', function ($scope, $rootScope,$state,$stateParams,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	
	window.scrollTo(0, 0);
	 
	 
	 $scope.activity={};	 
	 
	 $scope.fetchHotJobs = function(){		  
		  Login_Service.fetchHotJobs().then(function(response){
			  $scope.hotJobs = response.data;			 
		  },function(response){
				
			});
	  };
	
	  $scope.fetchHotJobs();
	 
	  $scope.fetchJobSearchResult = function(job){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}		  
		
		  Login_Service.fetchJobSearchResult(job,userid).then(function(response){
			  $scope.jobSeachResult = response.data;
			  //GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobSeachResult);
			  //$route.reload();
			
			if( $scope.jobSeachResult.length==0){
				  $scope.flag=false;
			  }
			  else{
				  $scope.flag=true;
			  }
			/* if($scope.positionList.length>0){
			  for(var i=0;i<$scope.positionList.length;i++){
				  if($scope.positionList[i].active==true){
				  if( $scope.positionList[i].name==$scope.jobTyped){
					  $scope.flag=true
				  }}
				  else{
					  $scope.flag=false;
				  }
			  }
				  }*/
			  
			  
		  },function(response){
				
			});
	  };
	  
	  $scope.fetchJobById = function(jobid){		  
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
			   $state.go("jobdesc",{jobId: jobid});
		  }else{ userid = $rootScope.userdetails.id;
		  		$state.go("restricted.jobdesc",{jobId: jobid});
		  }
		 
	  };
	  
	  $scope.fetchPositionList = function(){
		  if($scope.jobTyped==''){
				return;
			}
		  Login_Service.fetchPositionList($scope.jobTyped).then(function(response){
			  $scope.positionList = response.data;
			
			  for(var i=0;i<$scope.positionList.length;i++){
			  if( $scope.positionList[i].name==$scope.jobTyped){
				  $scope.flag=false;
			  }
			  else{
				  $scope.flag=true;
			  }
			  }
			 
		  },function(response){
				
			});
	  };
	  
	  $scope.insertRecentSearch = function(positionid,jobtyped){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  $scope.recent = {};
		  $scope.recent.positionId = positionid;
		  $scope.recent.typedValue = jobtyped;
		  $scope.recent.id = userid;
		  Login_Service.insertRecentSearch($scope.recent).then(function(response){
			 
		  },function(response){
				
			});
	  };
	  
	  $scope.flag=undefined;
	  $scope.fetchJobResult = function(id,flag){
		  $scope.insertRecentSearch(id,$scope.jobTyped);
		  $(".loader").show();
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  
		  Login_Service.fetchJobResult(id,flag,userid).then(function(response){
			  $scope.jobResult = response.data;
			  console.log($scope.jobResult);
			  if( $scope.jobResult.length==0){
				  $scope.flag=false;
			  }
			  else{
				  $scope.flag=true;
			  }
			  
			  $(".loader").fadeOut("slow");	
			  
			  //GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobResult);
			  if($rootScope.userdetails != undefined){
				  $route.reload();
			  }
			 
		  },function(response){
			  $(".loader").fadeOut("slow");	
			});
	  };
	  if($stateParams.categoryId){
		  $scope.fetchJobResult($stateParams.categoryId,$stateParams.flag)
	  }
	  else if($stateParams.search){
		  $scope.fetchJobSearchResult($stateParams.search)
	  }
	  
	  $scope.fetchSelectedJobCallback = function(){
		  $scope.insertRecentSearch($scope.selectedJobId,$scope.jobTyped);
		  
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  Login_Service.fetchJobResult($scope.selectedJobId,'position',userid).then(function(response){
			  $scope.jobResult = response.data;
			  console.log($scope.jobResult);
			  //GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobResult);
			
		  },function(response){
				
			});
	  };
	  
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $rootScope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchAllReport($scope.offset,$scope.limit,$scope.colName,$scope.order);
			};
			
			$rootScope.count;
			
		$scope.getcount=function(){
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.start = 0;
			
			Tickets_Service.getTicketCount($scope.selectedUser,$scope.selectedCategory,$scope.fromDate,$scope.toDate,$scope.colName,$scope.order).then(function(response){
				$rootScope.count = response.data;
				if($rootScope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		//$scope.getcount();
		
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
	        $scope.fetchAllReport($scope.offset,$scope.limit,$scope.colName,$scope.order);
	    };
	    
	    $scope.fetchRecentSearch = function(){
	    	var userid;
			  if($rootScope.userdetails == undefined){
				   userid = 0;
			  }else{ userid = $rootScope.userdetails.id;}
			  
			  Login_Service.fetchRecentSearch(userid).then(function(response){
				  $scope.recentSearch = response.data;
				 
			  },function(response){
					
				});
		  };
		
		  $scope.fetchRecentSearch();
		  
		  
		  $scope.redirectToJobList = function(){
			  $("#apply").modal('hide');
			  $(".modal-backdrop").hide();
			  $state.go("job-result");
			  $route.reload();
			  $scope.fetchJobResult($scope.jobById.position.id,'position');
			 
				 
		  };
		  
		 
		  
		 
}]);