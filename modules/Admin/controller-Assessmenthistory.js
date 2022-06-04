var controllers = angular.module('LoginModule');

controllers.controller('AssessmentHistory_Ctrl',['$scope','$rootScope','$location','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$location,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
   
    
  //----------------View/fetch Assessment list ------------------------- 
	 $scope.fetchAssessmentHistoryList= function(offset,limit,colName,order,search){
	
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
			 
		 Master_Service.fetchAssessmentHistoryList(offset,limit,colName,order,search).then(function(response){
			 $scope.assessmentHistoryList=response.data;
			 //console.log($scope.assessmentHistoryList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 $scope.fetchAssessmentHistoryList(0,10,null,null,null);
	 
	 
	 //....... pagination of assessment History ..........
		
	 	$scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}		
				 $scope.fetchAssessmentHistoryList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
	  $scope.getAssessmentHistoryListCount=function(search){
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
			 Master_Service.getAssessmentHistoryListCount($scope.search).then(function(response){
				$scope.count = response.data;
				//console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getAssessmentHistoryListCount(null);
	    
		
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
	        $scope.fetchAssessmentHistoryList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	    
	    
	    $scope.formatDate = function(date){		     
	         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
	         return dateOut;
	   };
	    
	    
	    //----pagination end------
	    
}]);