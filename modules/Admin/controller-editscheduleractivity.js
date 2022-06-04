'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('EditSchedulerActivity_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','EditSchedulerActivity_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,EditSchedulerActivity_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	//console.log($rootScope.userdetails);
	$scope.editschedulerdata1={};
	$scope.editschedulerdata = GlobalModule_dataStoreService.loadData('LoginModule','data');	
	console.log("editschedulerdata------------------------------");
	$scope.schedulername=$scope.editschedulerdata.schedulerName;
	console.log($scope.editschedulerdata);
	$scope.deliverytypes=$scope.editschedulerdata.deliverytypename;
	if($scope.editschedulerdata.isimmediate){
		$('#immediate-check').prop('checked', true);
	}else{
		$('#immediate-check').prop('checked', false);
	}
	//console.log("deliverytypes------------------------------");
	//console.log($scope.deliverytypes);
	$scope.templateids=$scope.editschedulerdata.templateids;
	//console.log("editschedulerdata------------------------------");
	//console.log($scope.templateids);
	$scope.smscheckbox=false;
	$scope.emailcheckbox=false;
	$scope.fetchCategoryIdByTempId = function(tempid){
		EditSchedulerActivity_Service.fetchCategoryIdByTempId(tempid).then(function(response){
		  $scope.editschedulerdata1.category=response.data;
		  $scope.categoryid=$scope.editschedulerdata1.category[0].typeId;
		  //console.log("$scope.updateevent.categoryid:------------------------");
		 // console.log($scope.categoryid);
		  if($scope.editschedulerdata1.category!=null){
			    $scope.fetchTmplttypeslist();
			    $scope.fetchSmsTemplateList($scope.categoryid); 
			    $scope.fetchEmailTemplateList($scope.categoryid);
		  }
		 
		  $(".loader").fadeOut("slow");	
	  },function(response){
    		$(".loader").fadeOut("slow");
		 });
	};
	if($scope.deliverytypes.includes(',')){
		var deltypeids=$scope.deliverytypes.split(',');
		//console.log(deltypeids);
		var tempids=$scope.templateids.split(',');
		//console.log(tempids);
		if(deltypeids[0]==1){
		$scope.editschedulerdata.emailtempid=parseInt(tempids[0]);	
		//console.log("$scope.editschedulerdata.emailtempid");
		//console.log($scope.editschedulerdata.emailtempid);
		$scope.fetchCategoryIdByTempId($scope.editschedulerdata.emailtempid);
		$scope.emailcheckbox=true;
			if($scope.editschedulerdata.emailtempid==0){
				$scope.editschedulerdata.emailtempid=null;
				$scope.emailcheckbox=false;
				$("#email-options").hide();
			}else{
				$("#email-options").show();
			}
		
		}
		else{
			$scope.editschedulerdata.smstempid=parseInt(tempids[0]);
			$scope.fetchCategoryIdByTempId($scope.editschedulerdata.smstempid);
			//console.log("$scope.editschedulerdata.smstempid");
			//console.log($scope.editschedulerdata.smstempid);
			$scope.smscheckbox=true;
				if($scope.editschedulerdata.smstempid==0){
					$scope.editschedulerdata.smstempid=null;
					$scope.smscheckbox=false;
					$("#sms-options").hide();
				}else{
					$("#sms-options").show();	
				}
			
		}
		if(deltypeids[1]==1){
		$scope.editschedulerdata.emailtempid=parseInt(parseInt(tempids[1]));
		$scope.fetchCategoryIdByTempId($scope.editschedulerdata.emailtempid);
		//console.log("$scope.editschedulerdata.emailtempid");
		//console.log($scope.editschedulerdata.emailtempid);
		$scope.emailcheckbox=true;
				if($scope.editschedulerdata.emailtempid==0){
					$scope.editschedulerdata.emailtempid=null;
					$scope.emailcheckbox=false;
					$("#email-options").hide();
				}else{
					$("#email-options").show();
				}
		}
		else{
			$scope.editschedulerdata.smstempid=parseInt(tempids[1]);
			$scope.fetchCategoryIdByTempId($scope.editschedulerdata.smstempid);
			//console.log("$scope.editschedulerdata.smstempid");
			//console.log($scope.editschedulerdata.smstempid);
			$scope.smscheckbox=true;
					if($scope.editschedulerdata.smstempid==0){
					$scope.editschedulerdata.smstempid=null;
					$scope.smscheckbox=false;
					$("#sms-options").hide();
				}else{
					$("#sms-options").show();
				}
			
		}	
	}
	else{
		$scope.editschedulerdata.emailtempid=null;
		$scope.editschedulerdata.smstempid=null;
		var deltypeids=$scope.deliverytypes;
		//console.log(deltypeids);
		var tempids=$scope.templateids;
		//console.log(tempids);
		if(deltypeids==1){
			$scope.editschedulerdata.emailtempid=parseInt(tempids);
			$scope.fetchCategoryIdByTempId($scope.editschedulerdata.emailtempid);
			//console.log("$scope.editschedulerdata.emailtempid");
			//console.log($scope.editschedulerdata.emailtempid);
			$scope.emailcheckbox=true;
			
					if($scope.editschedulerdata.emailtempid==0){
						$scope.editschedulerdata.emailtempid=null;
						$scope.emailcheckbox=false;
						$("#email-options").hide();
					}else{
						$("#email-options").show();
					}
		}else{
			$scope.editschedulerdata.smstempid=parseInt(tempids);
			$scope.fetchCategoryIdByTempId($scope.editschedulerdata.smstempid);
			//console.log("$scope.editschedulerdata.smstempid");
			//console.log($scope.editschedulerdata.smstempid);
			$scope.smscheckbox=true;
					if($scope.editschedulerdata.smstempid==0){
						$scope.editschedulerdata.smstempid=null;
						$scope.smscheckbox=false;
						$("#sms-options").hide();
					}else{
						$("#sms-options").show();
					}
			
		}
	}
    $scope.flag = GlobalModule_dataStoreService.loadData('LoginModule','flag'); 
    $scope.schedulerid = GlobalModule_dataStoreService.loadData('LoginModule','schedulerid');
	
	 //fetch activity for list
    $scope.fetchActivityForList = function(){
    	$(".loader").show();	 
    	EditSchedulerActivity_Service.fetchActivityForList().then(function(response){	    		
    		$scope.activityforlist=response.data;
    		 //console.log("Activity For list:");
			 //console.log($scope.activityforlist);
    		$(".loader").fadeOut("slow");	
    	},function(response){
    		$(".loader").fadeOut("slow");	
    	});
    };
    //$scope.fetchActivityForList();
    
    $scope.fetchActivityForIdByActivityId = function(){
    	$(".loader").show();	 
    	EditSchedulerActivity_Service.fetchActivityForIdByActivityId($scope.editschedulerdata.activityid).then(function(response){	    		
    		$scope.activityforid=response.data;
    		$scope.editschedulerdata1.activityfor=response.data;
			  $scope.activityforid1=$scope.editschedulerdata1.activityfor[0].activityforid;
    		// console.log("Activity For Id:");
			// console.log($scope.activityforid1);
			 if($scope.editschedulerdata1.activityfor!=null){
				    $scope.fetchActivityForList();
				    $scope.fetchActivityList($scope.activityforid1); 
			  }
    		$(".loader").fadeOut("slow");	
    	},function(response){
    		$(".loader").fadeOut("slow");	
    	});
    };
    
    $scope.fetchActivityForIdByActivityId();
    //fetch activity list based on activityforid
    
    $scope.fetchActivityList = function(id){
    	$(".loader").show();	 
    	EditSchedulerActivity_Service.fetchActivityList(id).then(function(response){	    		
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
	    	EditSchedulerActivity_Service.fetchTemplatetypeList().then(function(response){	    		
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
			 EditSchedulerActivity_Service.fetchSmsOrEmailTemplateList(id,2).then(function(response){
				 $scope.smsTemplateList=response.data;
				// console.log("sms template id:");
				// console.log($scope.smsTemplateList);
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
		
		   //fetch email template list by category id
		 $scope.fetchEmailTemplateList=function(id){
			 $(".loader").show();	 
			 EditSchedulerActivity_Service.fetchSmsOrEmailTemplateList(id,1).then(function(response){
				 $scope.emailTemplateList=response.data;
				// console.log("email template id:");
				// console.log($scope.emailTemplateList);
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
		 
		 $scope.UpdateSchedulerData = function(editschedulerdata){
			 editschedulerdata.updatedBy=$rootScope.userdetails.id;
			 if($("#immediate-check").is(":checked"))
	    			$scope.immediate = true;
	    		else
	    			$scope.immediate = false;
			 $scope.editschedulerdata.isimmediate=$scope.immediate;
			 if(editschedulerdata.schedulerName == null || editschedulerdata.schedulerName == "")
				{
				 GlobalModule_notificationService.notification("error","Please Enter Scheduler name !");
				 return ;
				} 
			 else if(editschedulerdata.activityid==null || editschedulerdata.activityid=="" || editschedulerdata.activityid==undefined)
				 {
				 GlobalModule_notificationService.notification("error","Please Select Activity  !");
				 return ;
				 }
			 else if(($("#sms-check").is(":checked")==false) && ($("#email-check").is(":checked")==false)){
				 GlobalModule_notificationService.notification("error","Please Select Atleast 1 Delivery Type!");
				 return ;
			 }
			 
			 else if($("#sms-check").is(":checked") && (editschedulerdata.smstempid==null || editschedulerdata.smstempid=="" || editschedulerdata.smstempid==undefined)){
				 GlobalModule_notificationService.notification("error","Please Select Sms Template  From Dropdown!");
				 return ;
			 }
			 else if($("#email-check").is(":checked") && (editschedulerdata.emailtempid==null || editschedulerdata.emailtempid=="" || editschedulerdata.emailtempid==undefined)){
				 GlobalModule_notificationService.notification("error","Please Select Email Template  From Dropdown!");
				 return ;
			 }
			 if($("#sms-check").is(":checked")==false){
				 editschedulerdata.smstempid=0;
			 }else if($("#email-check").is(":checked")==false){
				 editschedulerdata.emailtempid=0;
			 }else{
				 
			 }
			 EditSchedulerActivity_Service.checkDuplicateSchedulerName(editschedulerdata.schedulerName).then(function(response)
						{
						  $scope.schname = response.data;
						  if( $scope.schname == true && $scope.schedulername!=editschedulerdata.schedulerName)
						   {
							 GlobalModule_notificationService.notification("error","Scheduler  name already exist");
							 return;
							}
						  
						  EditSchedulerActivity_Service.updateSchedulerData(editschedulerdata).then(function(response){
							  $scope.flag = response.data;
							  $state.go("restricted.admin.schedulermaster");
							  if($scope.flag != "Failed"){
								  GlobalModule_notificationService.notification("success","Scheduler has been Updated successfully");
								  }else{
									  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								  }
							  $(".loader").fadeOut("slow");
						
								  },function(response){
									 
									});
						 },function(response){
								
							});
		 };
		 
		 $scope.cancelScheduler = function(){	    	
		    	$state.go("restricted.admin.schedulermaster");			
		    };

}]);