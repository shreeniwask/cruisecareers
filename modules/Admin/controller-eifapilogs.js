'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('EIFAPILogs_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','EIAPILog_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,EIAPILog_Service){
	
	$scope.totalcount = 0;
	$scope.successcount = 0;				
	$scope.failedcount = 0;
	
	$scope.fetchAPILogsCount = function(fromDate,toDate){
		$(".loader").show();
		var fromDatefltr = undefined;
		var toDatefltr = undefined;
		if(fromDate != null && toDate != null && fromDate != undefined && toDate != undefined  && fromDate != "" && toDate != ""){
		if(!$scope.isValidFromTo(fromDate,toDate)){
			GlobalModule_notificationService.notification("error","Select correct date range. From date cannot be greater then current date");
			return;
		}
		
		fromDatefltr = $scope.convertDatetoTs(fromDate,"from");
		toDatefltr = $scope.convertDatetoTs(toDate,"to");
		}
		$scope.getAPILogsCount(fromDatefltr,toDatefltr,"total");
		$scope.fetchAPIlogs(0,10,fromDatefltr,toDatefltr,"total");
		$(".loader").fadeOut("slow");
	}
	
	$scope.fetchAPIlogs = function(offset,limit,fromDatefltr,toDatefltr,status){
			EIAPILog_Service.fetchAPIlogs(offset,limit,fromDatefltr,toDatefltr,status).then(function(response){
				$scope.apilogs = response.data;
			});
	}
	
	$scope.isValidFromTo = function(fromDate,toDate){
		var isValid = false;
		var fArray = fromDate.split("-");
		var tArray = toDate.split("-");
		
		var d1 = new Date(fArray[2],fArray[1]-1,fArray[0]);
		var d2 = new Date(tArray[2],tArray[1]-1,tArray[0]);
		
		if(d1<=d2)
			isValid = true;
		else
			isValid = false;
		
		return isValid;
		
	}
	
	$scope.formatDate = function(date){
		 if(date != null || date == ' ' || date != undefined)
        {
			 //var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
			 var dateOut = moment(date).format("DD-MM-YYYY hh:mm:ss");
	         return dateOut;
        }
		 return;
    }
	
	$scope.showDetails = function(details){
		$('#reqresModal .modal-body').html("");
		if(details != null || details != undefined)
        {
			var jsonStr = "";
			try
			{
				var json = JSON.parse(details);
				jsonStr = JSON.stringify(json,null,2);
				$('#reqresModal .modal-body').html('<pre>'+jsonStr+'</pre>');
			}catch(e){
				jsonStr = details;
				$('#reqresModal .modal-body').html(jsonStr);
			}
			
			
			
        }
		$('#reqresModal').modal('show');
	}
	
	$scope.convertDatetoTs = function(inputdate,datetype){
		var ts="";
		var time="00:00:00";
		if(datetype=="to")
			 time="23:59:59"
		var textarry = inputdate.split("-");
		ts = textarry[2]+"-"+textarry[1]+"-"+textarry[0]+ " "+time;
		
		return ts;
	}
	
	//---------------pagination--------------------------------
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.setButton = function(){
		$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			var fromDatefltr = undefined;
			var toDatefltr = undefined;
			if($scope.fromDate != undefined && $scope.toDate != undefined){
				fromDatefltr = $scope.convertDatetoTs($scope.fromDate,"from");
				toDatefltr = $scope.convertDatetoTs($scope.toDate,"to");
			}
			
			$scope.fetchAPIlogs($scope.offset,$scope.limit,fromDatefltr,toDatefltr,$scope.status);
		};
		
		 $scope.getAPILogsCount=function(fromDate,toDate,status){	  
			  
				$scope.offset =0 ;
				$scope.navButtons = [];
				$scope.count= 0 ;
				$scope.start = 0;
				
				EIAPILog_Service.getAPILogsCount(fromDate,toDate,status).then(function(response){
					$scope.count = response.data.logscount;	
					$scope.totalcount = response.data.totalcount;				
					$scope.successcount = response.data.successcount;				
					$scope.failedcount = response.data.failedcount;
					console.log($scope.count);
					
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				});		
			};
			//$scope.getReportListCount(null,null,null);
		
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
	        var fromDatefltr =undefined;
	        var toDatefltr = undefined;
	        if($scope.fromDate != undefined && $scope.toDate != undefined){
	        	fromDatefltr = $scope.convertDatetoTs($scope.fromDate,"from");
	        	toDatefltr = $scope.convertDatetoTs($scope.toDate,"to");
	        }
	        $scope.fetchAPIlogs($scope.offset,$scope.limit,fromDatefltr,toDatefltr,$scope.status);
	    };
	    
	  //--------------pagination end---------------
	    $scope.getLogsbystatus = function(fromDate,toDate,status){
			
	    	$scope.status = status;
	    	
	    	var fromDatefltr  =undefined;
	    	var toDatefltr =undefined;
	    	
	    	if(fromDate != null && toDate != null && fromDate != undefined && toDate != undefined  && fromDate != "" && toDate != ""){
	    		fromDatefltr = $scope.convertDatetoTs(fromDate,"from");
				toDatefltr = $scope.convertDatetoTs(toDate,"to");
	    	}
			
			$scope.getAPILogsCount(fromDatefltr,toDatefltr,status);
			$scope.fetchAPIlogs(0,$scope.limit,fromDatefltr,toDatefltr,status).then(function(response){
				$scope.apilogs = response.data;
			});
			
		
	}
	    
	    $scope.fetchAPILogsCount(null,null);
}]);