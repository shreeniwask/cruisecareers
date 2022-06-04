'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Document_Log_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Document_Log_Service','Master_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Document_Log_Service,Master_Service,Admin_Service){
	
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.approverTabFlag=1;
	$scope.EmailType;
	
	$scope.fetchDocumentLogList = function(offset,limit,colName,order,search){
		
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
		 Document_Log_Service.fetchDocumentLogList(offset,limit,colName,order,search).then(function(response){
			  $scope.documentloglist = response.data;
			  console.log($scope.documentloglist);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});		  
	};
	$scope.fetchDocumentLogList(0,10,null,null,null);
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchDocumentLogList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getDocumentLogListcount=function(searchterm){
							
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
			
			 Document_Log_Service.getDocumentLogListcount($scope.search).then(function(response){				
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton();					
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getDocumentLogListcount(null);
		
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
	        $scope.fetchDocumentLogList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    
	    // for fetching documentuploadloglist
	    
	    $scope.fetchDocumentUploadLogList=function(uploadId){
	    	
	    	 Document_Log_Service.fetchDocumentUploadLogList(uploadId).then(function(response){				
					$scope.documentUploadLogList = response.data;
					console.log($scope.documentUploadLogList);
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});
	    };
	    
	    //--- sorting-----------------
	    
	    $scope.SortingDocumentUploadLogList = function(colName,searchterm){
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
	    	$scope.fetchDocumentLogList(0,10,$scope.colName,$scope.order,$scope.search);	
	    };

	    
	    
	    
	    
	
}]);
