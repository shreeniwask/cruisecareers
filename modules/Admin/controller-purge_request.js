'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('purge_request_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Purge_Request_Service','Master_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Purge_Request_Service,Master_Service,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.listFlag=1;
	$scope.fetchPurgeRequestList = function(offset,limit,colName,order,search){
		
		$(".loader").show();
		
		$scope.getCheckedId=[];
		
		 if(search==null || search=="")
		  {
		  search= undefined;		  
		  }
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		 Purge_Request_Service.fetchPurgeRequestList(offset,limit,colName,order,search,$scope.listFlag).then(function(response){
			  $scope.purgerequestlist = response.data;
			  console.log($scope.purgerequestlist);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});
		 $(".loader").fadeOut("slow");
	};
	
	$scope.getPurgeRequestCount=function(searchterm){
		
		$(".loader").show();
		
		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=searchterm;
		//$scope.listFlag=listFlag;
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
		
		 Purge_Request_Service.getPurgeRequestCount($scope.search,$scope.listFlag).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}
		
			$scope.fetchPurgeRequestList(0,10,$scope.colName,$scope.order,$scope.search);
			
		},function(response){
			$(".loader").fadeOut("slow");		
		});
		 
		$(".loader").fadeOut("slow");
	};
	$scope.getPurgeRequestCount(null);
	
	
	// for pagination
	
	// for pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchPurgeRequestList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
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
       $scope.fetchPurgeRequestList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
   };
   
   //for sorting 
   $scope.sortingPurgeReqList = function(colName,searchterm){
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
			$scope.fetchPurgeRequestList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
	
// for enter key in search
	  $scope.searchOnEnter = function($event,search){
	  
	 	 var keyCode = $event.which || $event.keyCode;
	 	    if (keyCode === 13) {
	 	    	$scope.fetchPurgeRequestList(0,10,null,null,search);
	 	    	$scope.getPurgeRequestCount(search);
	 	    }
	  };
	  
	$scope.dateformate = function(date){	
		  
		  if(date == undefined || date == '')
		  {
			  return null;
		  }
		  
	     var dateOut = moment(date).format("DD-MM-YYYY");
	     return dateOut;
	  };
	$scope.displayComment= function(comment){
		
		$scope.requestComment=comment
		
		 // $('#warning-modal').html();
		  $("#comment-modal").modal('show');
	};
	// for setting request id which going to be deleted
	$scope.reqObj;
	$scope.setRequestObj= function(obj){
		$scope.reqObj=obj;
		$("#purge-modal").modal('show');
	};
	
	$scope.acceptRequest =function(req){
		
		$(".loader").show();
		
		 Purge_Request_Service.acceptRequest($scope.reqObj).then(function(response){
			  
			 var status = response.data;
			 
			 
			 console.log(status);
			 
			 if(status == 'success')
			 {
				 GlobalModule_notificationService.notification("success","Data has been purged successfully");
				 $scope.fetchPurgeRequestList(0,10,$scope.colName,$scope.order,$scope.search);
			 }
			 //console.log($scope.emaillogdetaillist);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		 
		 $(".loader").fadeOut("slow");
	};
}]);	