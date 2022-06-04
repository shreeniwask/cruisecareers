'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('My_Interview_Ctrl',['$scope','$rootScope','$state','CallLogService','UserJobFair_Service','SupportOptionsService','My_Interview_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','$stateParams', function ($scope, $rootScope,$state,CallLogService,UserJobFair_Service,SupportOptionsService,My_Interview_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,$stateParams){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	
	
	
	$scope.startInterview=false;
	var checkInterviewStartDateTime= function(interviewList){
		
		$(".loader").show();
		 for(var i=0;i<=interviewList.length;i++){
		if(interviewList[i] != undefined && interviewList.length > 0)
    	{ 		
			
    		var eventdatetime =new Date(interviewList[i].dateTime);
    		//var d2 = $scope.dateformate3(interviewList[i].jobFair.endDate);
    		//var d3 = new Date(d2);
    		
    	//	var d3 =new Date(d2);
    	
    		//d1.setMinutes( d1.getMinutes() - 30 );
    		
    		
    		
    		if(eventdatetime <= new Date()  )
    		{
    			
    			$scope.startInterview=true;
    			interviewList[i].startInterview=$scope.startInterview;
    		}
    		else
    		{
    			
    			$scope.startInterview=false;
    			interviewList[i].startInterview=$scope.startInterview;
    		}
    	}
		 }
     	
		$(".loader").fadeOut("slow");
    };
	
	
    $scope.joblist=[];
	$scope.fetchJobFairJobListForUser = function(search,eventid,slotid,createdby,userID){
		  $(".loader").show();
		  if(search==null || search=="")
		  {
		  search= undefined;
		  
		  }
		 
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{
			  userid=$rootScope.userdetails.id;}
		
		  UserJobFair_Service.fetchJobFairJobListForUser(search,userid,false).then(function(response){
			  $scope.jobfairjobObj = response.data;
			  $scope.joblist=$scope.jobfairjobObj.job;
			  console.log( $scope.joblist);
			  $scope.jobFairId=$scope.jobfairjobObj.id;
			  $scope.goToInterviewInitiate(eventid,slotid,createdby,userID);
		
				 
				 //	  startDate=$scope.jobfairjobObj.startDate;
		//	 endDate1=$scope.jobfairjobObj.endDate;
			
			
			  
			 
			  
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
		  
	  };
	//  $scope.fetchJobFairJobListForUser(null);
    
    
	 $scope.fetchInterviewList=function(){
		 $(".loader").show();	 
		 My_Interview_Service.fetchInterviewList($rootScope.userdetails.id).then(function(response){
			 $scope.interviewList=response.data;
			 console.log($scope.interviewList);
			 
			/* for(var i=0;i<=$scope.interviewList.length;i++){
				 checkInterviewStartDateTime($scope.interviewList);
			 }
			 */
			
			 
			 
			 
			 
			 $(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");
		 });			 
	 } ;
	 $scope.fetchInterviewList();
	
	
	 $scope.goToInterviewInitiate=function(eventid,slotid,createdby,userID){
		//  var jobFair={name:$scope.jobfairjobObj.name,id:$scope.jobfairjobObj.id,startDate:$scope.jobfairjobObj.startDate,endDate:$scope.jobfairjobObj.endDate}
		 var jobFair;
		 var statusflag;
		 if(createdby==userID){
		 var jobFair={name:$scope.jobfairjobObj.name,id:$scope.jobfairjobObj.id,startDate:$scope.jobfairjobObj.startDate,endDate:$scope.jobfairjobObj.endDate}
		 statusflag="true"
		 } else{
			 statusflag="false"	 
		 } 
		 GlobalModule_dataStoreService.storeData('LoginModule','jobFairObj',jobFair);
		  GlobalModule_dataStoreService.storeData('LoginModule','eventId',eventid);
		  GlobalModule_dataStoreService.storeData('LoginModule','slotId',slotid);
		  GlobalModule_dataStoreService.storeData('LoginModule','statusflag',statusflag);
		//  GlobalModule_dataStoreService.storeData('LoginModule','inteviewOverFlag',$scope.inteviewOver);
		  $state.go("restricted.interview_initiate");
		  
	  };
	  
	  $scope.checkStartDateTime=function(eventid,slotid,dateTime,createdby,userID){
			 $(".loader").show();
			// $scope.slot.dateTime=dateTime;
			 var slot={};
			 slot.id=slotid;
			// slotid.userid=userID;
			 slot.dateTime=dateTime;
			 
			 My_Interview_Service.checkStartDateTime(slot,userID).then(function(response){
				 $scope.result=response.data;
				 console.log($scope.result);
				 if( $scope.result.flag == 'not started'){
						
					 GlobalModule_notificationService.notification("error","Your meeting is not started");	   
					
				 }else if($scope.result.flag == 'true'){
					// GlobalModule_notificationService.notification("success","Your meeting has started");	   
						
					 if(createdby==userID){
					 $scope.fetchJobFairJobListForUser(null,eventid,slotid,createdby,userID);
					 }else{ 
					 $scope.goToInterviewInitiate(eventid,slotid,createdby,userID);
				 }
				 }else{
					 GlobalModule_notificationService.notification("error","Your meeting is ended");	      
						
				 }
				 
				
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
	  
		
	  $scope.dateformate1 = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        
	        return dateOut;
	  }; 

	  $scope.dateformate3 = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	        
	        return dateOut;
	  };
	  
	  
	  $scope.dateformate4 = function(date){		     
	        var dateOut = moment(date).format("MM-DD-YYYY hh:mm a");
	        
	        return dateOut;
	  };
	

}]);

