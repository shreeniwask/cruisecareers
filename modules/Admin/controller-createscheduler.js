'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateScheduler_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	//console.log( $rootScope.EventDetails);
	/*--------Add New Users to event on plus button action ------*/
	$scope.schedulerevent={};
	$scope.eventUserList=[{
		id:"1",
		user:{id:"",name:""},
		'name': "",
		  'edit':false,
		  'del':false,
	}];
	
	$scope.addEventUsers = function()
	{
		var size =  $scope.eventUserList.length;
		$scope.eventUserList.push({ 
			 
			  'id' : size+1+"",
			  'edit':false,
			  'del':false,
		 
		 });
				
	}; 
	
	/*--------remove users from list -----*/
	
	 $scope.removeEventUser = function(item) 
     {
		 $scope.eventUserList.splice(item, 1);
     };
	
	/*--------creating new Event -------*/
     
   
	$scope.addNewScheduler = function(emailtempid,smstemplateid){
		
		$(".loader").show();
		
		$scope.match = false;
		var eventnameCount=0;
		$scope.match = false;
		$scope.schedulerevent.emailTemplateId=emailtempid;
		$scope.schedulerevent.smsTemplateId=smstemplateid;
		var len=$scope.eventUserList.length;
		
		$scope.schedulerevent.slots=$scope.slot;
		
		for (var i=0;i<$rootScope.EventDetails.length;i++)
		{
		if($rootScope.EventDetails[i].schedulerName==$scope.schedulerevent.name)
		{
			eventnameCount++;
		}
		}
		
		var userid=-1;
		for (var i=0;i<len;i++)
			{
			
				for(var j=i+1;j<len;j++)
					{
					if($scope.eventUserList[i].user.id==$scope.eventUserList[j].user.id)
						{$scope.match = true;	
					    break;}
					}
			}
		if($scope.match==true)
			{
			GlobalModule_notificationService.notification("error","You can't add same user more than one, Please remove duplicate users!");
			}
		else if($scope.schedulerevent.name == null || $scope.schedulerevent.name == "")
			{
			 GlobalModule_notificationService.notification("error","Please Enter Event name !");
			}
		else if(eventnameCount>0)
		{
			GlobalModule_notificationService.notification("error","The Event has been already created. Enter another name!!");
			
		}
		else {
		$scope.schedulerevent.userid=$rootScope.userdetails.id;
		$scope.schedulerevent.userPermissions = $scope.eventUserList;
		for(var i=0;i< $scope.eventUserList.length;i++)
			{
			if ($('#ed'+i).is(":checked"))
				{
				$scope.eventUserList[i].edit=true;
				}
			if ($('#dl'+i).is(":checked"))
			{
			$scope.eventUserList[i].del=true;
			}
			}
		Admin_Service.addNewScheduler($scope.schedulerevent).then(function(response){
		  $scope.flag = response.data;
		  $state.go("restricted.admin.eventScheduler");
		  if($scope.flag != "Failed"){
			  GlobalModule_notificationService.notification("success","New Scheduler has been created successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
		  $(".loader").fadeOut("slow");
	  },function(response){
		 
		});
		}
		 $(".loader").fadeOut("slow");
	};
	
	/*--------Admin user list-----*/
	$scope.serachAdminUsers = function(search){
		
		Admin_Service.serachAdminUsers(-1,"-1",$rootScope.userdetails.id).then(function(response){
		  $scope.adminUsers = response.data;
		  
		  $(".loader").fadeOut("slow");
	  },function(response){
		  $(".loader").fadeOut("slow");
		});
	
	};
	
	$scope.serachAdminUsers("");
	
	$scope.updateEvent =  function(j){	
		  
		$scope.match = false;
		$scope.updateevent.userPermissions = $scope.userpermission;
		$scope.updateevent.slots = $scope.slot;		
		/*$scope.updateevent.id = $scope.eventid;*/
		$scope.updateevent.userid = $rootScope.userdetails.id;				
		
		for (var j=0;j<$scope.updateevent.userPermissions.length;j++) {
		    for (var k=j+1;k<$scope.updateevent.userPermissions.length;k++) {
		        if ($scope.updateevent.userPermissions[k].user.id == $scope.updateevent.userPermissions[j].user.id){ 		        	
		        	$scope.match = true;		            
		        }
		    }
		}	
		
		if($scope.match == true){
		GlobalModule_notificationService.notification("error","You can't add the same user more than once. Please remove duplicate users!");	
		} 
		else{  
		Admin_Service.updateEvent($scope.updateevent).then(function(response){
			  $scope.result = response.data;
			  
			  if($scope.result.indexOf("success")!=-1){					  
				  GlobalModule_notificationService.notification("success","Record updated successfully");
				 
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }			   
			  $state.go("restricted.admin.eventScheduler");
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
		}	
	 };
	 
	 $scope.set = function(boolean){
		 $scope.slotm={};
		  $scope.flag = boolean;
	  };
	 
	 $scope.setdata = function(index,x){
		  
		 $scope.slotm=x;
		 $scope.slotm.candidates=parseInt(x.candidates);
		 $('#datetimepickercns').data("DateTimePicker").date(x.dateTime);
		 $scope.slotindex= index;		 
	 };	
	
	 $scope.cancelled = function(){
		 $state.go("restricted.admin.eventScheduler");
	 };
	 
	 $scope.removeslot = function(id) {		 
		 $scope.slot.splice(id, 1);
	  };
	  
	  $scope.removeuser = function(id) {
		  var userp = $scope.userpermission[id];
		  if(null!=userp.user)
			  {
		  var adminUser={};
		  adminUser.id=userp.user.id;
		  adminUser.name=userp.user.firstName+" "+userp.user.lastName;
		  $scope.adminUsers.push(adminUser);
			  }
		  $scope.userpermission.splice(id, 1);
	  };
	  
	  $scope.updateslot = function(newslot){
  		  
		  $scope.slotnew = {};		  
		  $scope.slotnew.candidates = document.getElementById('candidate').value;
		  
		  
		  if($scope.slotnew.candidates == null || $scope.slotnew.candidates == undefined || $scope.slotnew.candidates == ""){
			  $('#edit_sloter').modal("show");
		  }else{
			  
			  $scope.slotnew.dateTime =  $("#datetimepickercns").data('date');	
			  $scope.slotnew.id = newslot.id;
			  $scope.slotnew.assignedUsers = newslot.assignedUsers;
			  
			  
			  for(var i=0;i<$scope.slot.length;i++)
			  {
			    if (i==$scope.slotindex)
			    	$scope.slot[i] =  $scope.slotnew;
			  }
			  $('#edit_sloter').modal("hide");
		  }
	  };
	  
	  
	  $scope.slot=[];
	  $scope.slotm={};
	  $scope.addslot = function(newslot){
		  $scope.slotnew = {};
		  $scope.slotnew.dateTime =  $("#datetimepickercns").data('date');	
		  $scope.slotnew.candidates = document.getElementById('candidate').value;
			
			  if($scope.slotnew.candidates <= 0 || $scope.slotnew.candidates=="" || $scope.slotnew.candidates == undefined || $scope.slotnew.candidates==null) 
			  {				  
				  GlobalModule_notificationService.notification("error","Please add number of candidates");
			  }else{
				  $scope.slot.push($scope.slotnew);	
			  } 
			  $scope.slotm={};
			  /*$('#candidate').removeAttr( "value" );*/
			  //document.getElementById('').value=0;  
	  };
	  
	  $scope.formatDate = function(date){
		  var dateOut = moment(date).format("DD-MM-YYYY");
	      return dateOut;
    };
    
    $scope.showerror =function(data){		
		 
		 if(data == 0){			
		 GlobalModule_notificationService.notification("error","No user present in this slot");
		 
		 }
	 };
	 
	 //fetch category
	 $scope.fetchTmplttypeslist= function(){
		    
	    	$(".loader").show();	 
	    	Admin_Service.fetchTemplatetypeList().then(function(response){	    		
	    		$scope.temptypelist=response.data;
	    		 console.log("sms template Type:");
				 console.log($scope.temptypelist);
	    		$(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");	
	    	});
	    };
	    $scope.fetchTmplttypeslist();
	   
	    //fetch template sms
	 $scope.fetchSmsTemplateList=function(id){
		 $(".loader").show();	 
		 Admin_Service.fetchSmsOrEmailTemplateList(id,2).then(function(response){
			 $scope.smsTemplateList=response.data;
			 console.log("sms template id:");
			 console.log($scope.smsTemplateList);
			 $(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");
		 });			 
	 } ;
	
	//fetch template email
	 $scope.fetchEmailTemplateList=function(id){
		 $(".loader").show();	 
		 Admin_Service.fetchSmsOrEmailTemplateList(id,1).then(function(response){
			 $scope.emailTemplateList=response.data;
			 console.log("sms template id:");
			 console.log($scope.emailTemplateList);
			 $(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");
		 });			 
	 } ;
	
	  
}]);