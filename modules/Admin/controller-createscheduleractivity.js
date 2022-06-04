'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateSchedulerActivity_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CreateSchedulerActivity_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CreateSchedulerActivity_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($rootScope.userdetails);
	$scope.schedulerdata={};
	$('#immediate-check').prop('checked', true);
	
	 //fetch activity for list
    $scope.fetchActivityForList = function(){
    	$(".loader").show();	 
    	CreateSchedulerActivity_Service.fetchActivityForList().then(function(response){	    		
    		$scope.activityforlist=response.data;
    		 //console.log("Activity For list:");
			 //console.log($scope.activityforlist);
    		$(".loader").fadeOut("slow");	
    	},function(response){
    		$(".loader").fadeOut("slow");	
    	});
    };
    $scope.fetchActivityForList();
    
    //fetch activity list based on activityforid
    $scope.fetchActivityList = function(id){
    	$(".loader").show();	 
    	CreateSchedulerActivity_Service.fetchActivityList(id).then(function(response){	    		
    		$scope.activitylist=response.data;
    		 //console.log("Activity list:");
			 //console.log($scope.activitylist);
    		$(".loader").fadeOut("slow");	
    	},function(response){
    		$(".loader").fadeOut("slow");	
    	});
    };
    
    //fetch category
	 $scope.fetchTmplttypeslist= function(){
		    
	    	$(".loader").show();	 
	    	CreateSchedulerActivity_Service.fetchTemplatetypeList().then(function(response){	    		
	    		$scope.temptypelist=response.data;
	    		// console.log("category list:");
				// console.log($scope.temptypelist);
	    		$(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");	
	    	});
	    };
	    $scope.fetchTmplttypeslist();
	    
	   //fetch sms template list by category id 
	    $scope.fetchSmsTemplateList=function(id){
			 $(".loader").show();	 
			 CreateSchedulerActivity_Service.fetchSmsOrEmailTemplateList(id,2).then(function(response){
				 $scope.smsTemplateList=response.data;
				 //console.log("sms template id:");
				 //console.log($scope.smsTemplateList);
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
		
		   //fetch email template list by category id
		 $scope.fetchEmailTemplateList=function(id){
			 $(".loader").show();	 
			 CreateSchedulerActivity_Service.fetchSmsOrEmailTemplateList(id,1).then(function(response){
				 $scope.emailTemplateList=response.data;
				 //console.log("email template id:");
				 //console.log($scope.emailTemplateList);
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
		 
		 $scope.Immediatecheck=function(){	
				
				if($("#immediate-check").is(":checked"))
					$('#immediate-check').prop('checked', true);
	   		
			};
		 
		 $scope.saveNewSchedulerData = function(event,actid,smstempid,emailtempid){
			 
			 if($("#immediate-check").is(":checked"))
	    			$scope.immediate = true;
	    		else
	    			$scope.immediate = false;
			 
				 if($scope.schedulerdata.schedulerName == null || $scope.schedulerdata.schedulerName == "")
					{
					 GlobalModule_notificationService.notification("error","Please Enter Scheduler name !");
					 return ;
					} 
				 else if(actid==null || actid=="" || actid==undefined)
					 {
					 GlobalModule_notificationService.notification("error","Please Select Activity  !");
					 return ;
					 }
				 else if(($("#sms-check").is(":checked")==false) && ($("#email-check").is(":checked")==false)){
					 GlobalModule_notificationService.notification("error","Please Select Atleast 1 Delivery Type!");
					 return ;
				 }
				 
				 else if($("#sms-check").is(":checked") && (smstempid==null || smstempid=="" || smstempid==undefined)){
					 GlobalModule_notificationService.notification("error","Please Select Sms Template  From Dropdown!");
					 return ;
				 }
				 else if($("#email-check").is(":checked") && (emailtempid==null || emailtempid=="" || emailtempid==undefined)){
					 GlobalModule_notificationService.notification("error","Please Select Email Template  From Dropdown!");
					 return ;
				 }
				 else{
				 }
				 
					 CreateSchedulerActivity_Service.checkDuplicateSchedulerName($scope.schedulerdata.schedulerName).then(function(response)
					{
					  $scope.schname = response.data;
					  if( $scope.schname == true)
					   {
						 GlobalModule_notificationService.notification("error","Scheduler  name already exist");
						 return;
						}
		
			 $scope.schedulerdata.smstempid=smstempid;
			 $scope.schedulerdata.emailtempid=emailtempid;
			 $scope.schedulerdata.activityid=actid;
			 $scope.schedulerdata.updatedBy=$rootScope.userdetails.id;
			 $scope.schedulerdata.isimmediate=$scope.immediate;
			
			 CreateSchedulerActivity_Service.saveNewSchedulerData($scope.schedulerdata).then(function(response){
				  $scope.flag = response.data;
				  $state.go("restricted.admin.schedulermaster");
				  if($scope.flag != "Failed"){
					  GlobalModule_notificationService.notification("success","New Scheduler has been created successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
				  $(".loader").fadeOut("slow");
			
					  },function(response){
						 
						});
						 
							 },function(response){
									
								});	
			 $(".loader").fadeOut("slow");
		 };
		 
		 $scope.cancelScheduler = function(){	    	
		    	$state.go("restricted.admin.schedulermaster");			
		    };
	
}]);