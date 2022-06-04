var controllers = angular.module('templatemodule');

controllers.controller('CreateTemplate_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){

	$rootScope.Loginuserdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.data = GlobalModule_dataStoreService.loadData('LoginModule','data');	
    $scope.flag = GlobalModule_dataStoreService.loadData('LoginModule','flag'); 
    $scope.templateid = GlobalModule_dataStoreService.loadData('LoginModule','templateid'); 
    
 
    $("#fulldesc").ckeditor();		
	window.scrollTo(0, 0);	
   
	  $scope.setsystemmail = function(typeid){	
			 for(var i=0; i<$scope.templatetype.length; i++){			
				  if($scope.templatetype[i].id == typeid){				  
					  $scope.data.system_mail = $scope.templatetype[i].system_mail;				
				  }			  
			  };		  
		  };
	
	
	  $scope.saveOrUPdateTemplate = function(data){	
		  
		  data.createdby = $rootScope.Loginuserdetails.id;
		  
		  if(data.system_mail == 0){			
			  if($scope.flag == true){
				  $scope.saveTemplate(data);
			  }else{
				  $scope.updateTemplate(data);
			  }	
			  
		  }else{			  
			 $scope.insertTemplate(data);			  
		  }; 
	  };
	
	  $scope.insertTemplate = function(data){
		  if(data.modeId==1){
		  if($("#fulldesc").val() == "" || $("#fulldesc").val() == null){
			  GlobalModule_notificationService.notification("error","please add template description");
			  return;
		  }
		  
		  $(".loader").show();
		 
		  data.bodyForTemplate =  $("#fulldesc").val();
		  }else{
				
				 if($("#smsdesc").val() == "" || $("#smsdesc").val() == null){
					  GlobalModule_notificationService.notification("error","please add sms description");
					  return;
				  }
				  
				  $(".loader").show();
				 
				  data.bodyForTemplate =  $("#smsdesc").val();
				  /*data.bodyForSms =  $("#smsdesc").val();
				  data.bodyForTemplate = undefined;*/
			}
		
		
		  Admin_Service.insertTemplate(data).then(function(response){	 			 
			  $scope.result=response.data;
			 
			  $state.go("restricted.admin.templateMaster");	
			  
			  if($scope.result.indexOf("success")!=-1){
			  GlobalModule_notificationService.notification("success","Your template has been saved successfully");
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
	  
	  $scope.saveTemplate = function(data){			 
		  
		  if(data.modeId==1)
			{  
		  if($("#fulldesc").val() == "" || $("#fulldesc").val() == null){
			  GlobalModule_notificationService.notification("error","please add template description");
			  return;
		  }
		  
		  $(".loader").show();
		 
		  data.bodyForTemplate =  $("#fulldesc").val();
			}else{
			
				 if($("#smsdesc").val() == "" || $("#smsdesc").val() == null){
					  GlobalModule_notificationService.notification("error","please add sms description");
					  return;
				  }
				  
				  $(".loader").show();
				 
				  data.bodyForTemplate =  $("#smsdesc").val();
				 /* data.bodyForSms =  $("#smsdesc").val();
				  data.bodyForTemplate = undefined;*/
			}
		
		  Admin_Service.saveTemplate(data).then(function(response){	 			 
			  $scope.result=response.data;
			
			  $state.go("restricted.admin.templateMaster");			  
			  if($scope.result.indexOf("success")!=-1){
			  GlobalModule_notificationService.notification("success","Your template has been saved successfully");
			  }
			  else if($scope.result == "failed"){
				  GlobalModule_notificationService.notification("error","template already exist!!!");
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
	 
	  $scope.updateTemplate = function(data){
		  if(data.modeId==1)
			{  
		  if($("#fulldesc").val() == "" || $("#fulldesc").val() == null){
			  GlobalModule_notificationService.notification("error","please add template description");
			  return;
		  }
		  
		  $(".loader").show();
		 
		  data.bodyForTemplate =  $("#fulldesc").val();
			}else{
			
				 if($("#smsdesc").val() == "" || $("#smsdesc").val() == null){
					  GlobalModule_notificationService.notification("error","please add sms description");
					  return;
				  }
				  
				  $(".loader").show();
				  
				  data.bodyForTemplate =  $("#smsdesc").val();
				  /*data.bodyForSms =  $("#smsdesc").val();
				  data.bodyForTemplate = undefined;*/
			}
		  data.id = $scope.templateid;
		
		  Admin_Service.updateTemplate(data).then(function(response){	 			 
			  $scope.result=response.data;	
			  $state.go("restricted.admin.templateMaster");			  
			  if($scope.result = "success"){
			  GlobalModule_notificationService.notification("success","Your template has been updated successfully");
		  }
		  else{
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		  }
			  $(".loader").fadeOut("slow");
			},function(response){	
				 $(".loader").fadeOut("slow");
				});		
	  };
	  
	  
	  
	  $scope.fetchtemplatetype = function(){
		  Admin_Service.fetchtemplatetype().then(function(response){	 			 
			  $scope.templatetype=response.data;	
			  
			},function(response){							
				});		
	  };
	  $scope.fetchtemplatetype();
	  
	  
	  
	  $scope.myfunc = function(id){
		  $scope.emailFlag=false;
		  $scope.smsFlag=false;
		   if(id==1){
			   $scope.emailFlag=true;
			}else{
			$scope.smsFlag=true;
			}
			
		/*  
		  Admin_Service.fetchCommunicationModes().then(function(response){	 			 
			  $scope.mode=response.data;	
			 
			},function(response){							
				});*/
	  };
	  
	  
	  
	  
	  $scope.fetchCommunicationModes = function(){
		  Admin_Service.fetchCommunicationModes().then(function(response){	 			 
			  $scope.mode=response.data;	
			 
			},function(response){							
				});
	  };	  
	  $scope.fetchCommunicationModes();
    
	  $scope.canceltemplate = function(){	    	
	    	$state.go("restricted.admin.templateMaster");			
	    };
    
    
    
	
}]);