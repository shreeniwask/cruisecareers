	$scope.offset1=0;
			$scope.limit1=10;
			$scope.navButtons1 = [];
		 $scope.setButton1 = function(){
				$scope.navButtons1 = [];
				
					for(var j = $scope.start1, len= $scope.count1/$scope.limit1; j < $scope.start1+5 && j < len; j++){
					$scope.navButtons1.push(j);
					}		
					 $scope.fetchSurveyMaster($scope.offset1,$scope.limit1,$scope.colName,$scope.order,$scope.search,0,0,0);
				};
				
		  $scope.getSurveycount1=function(search){
				$scope.offset1 =0 ;
				$scope.navButtons1 = [];
				$scope.count1= 0 ;
				$scope.start1 = 0;
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
				 Master_Service.getSurveycount1($scope.search).then(function(response){
					$scope.count1 = response.data;
					if($scope.count1>$scope.limit1){
						$scope.setButton1();
					}
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getSurveycount1(null);
		    
			
			$scope.previous1 = function() {
				$scope.start1 =  $scope.start1 - 5;
		        $scope.offset1 = $scope.start1 * $scope.limit1;
		        $scope.setButton1();
		     
		    };

		    $scope.next1 = function() {
		    	$scope.start1 =  $scope.start1 + 5;
		        $scope.offset1 = $scope.start1 * $scope.limit1;
		      
		        $scope.setButton1(); 
		      
		    };
		    
		    $scope.current1= function(page) {  
		        $scope.offset1 = page * $scope.limit1;
		        $scope.fetchSurveyMaster($scope.offset1,$scope.limit1,$scope.colName,$scope.order,$scope.search,0,0,0);
		    };