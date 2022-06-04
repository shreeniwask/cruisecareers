'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateEventScheduler_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){
	   
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.updateevent={};
	$scope.updateevent1={};
	$scope.selectedschedular = GlobalModule_dataStoreService.loadData('LoginModule','data');
 console.log($scope.selectedschedular);
	$scope.eventid = $scope.selectedschedular.id;
	
	$scope.totalSlotCount=$scope.selectedschedular.totalSlots;
	
	
    
	//alert($scope.eventid);
	$scope.slotindex =0;	
	$scope.slot;

	
	 $scope.updateevent.schedulerName = $scope.selectedschedular.schedulerName;
	 $scope.updateevent.schedulerType = $scope.selectedschedular.schedulerType;
	 $scope.updateevent.emailTemplateId = $scope.selectedschedular.emailTemplateId;
	 $scope.updateevent.smsTemplateId = $scope.selectedschedular.smsTemplateId;
	 if($scope.updateevent.emailTemplateId==0){
		 $scope.updateevent.emailTemplateId=null; 
	 }
	 if($scope.updateevent.smsTemplateId==0){
		 $scope.updateevent.smsTemplateId=null;
	 }
	 //$scope.updateevent.categoryid=0;

		//fetch category
		 $scope.fetchTmplttypeslist= function(){
			    
		    		 
		    	Admin_Service.fetchTemplatetypeList().then(function(response){	    		
		    		$scope.temptypelist=response.data;
		    		 console.log(" template Type:");
					 console.log($scope.temptypelist);
		    		$(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");	
		    	});
		    };
		    
		  
	 if($scope.updateevent.smsTemplateId!=null && $scope.updateevent.smsTemplateId!=0)
	{
		
		  Admin_Service.fetchCategoryIdByTempId($scope.updateevent.smsTemplateId).then(function(response){
			  $scope.updateevent1.category=response.data;
			  $scope.categoryid=$scope.updateevent1.category[0].typeId;
			  if($scope.updateevent1.category!=null){
				    $scope.fetchTmplttypeslist();
				    $scope.fetchSmsTemplateList($scope.categoryid); 
				    $scope.fetchEmailTemplateList($scope.categoryid);
			  }
			  console.log("$scope.updateevent.categoryid:------------------------");
			  console.log($scope.categoryid);
			 
			  $(".loader").fadeOut("slow");	
		  },function(response){
	    		$(".loader").fadeOut("slow");
			 });
		  
	}
	 else if($scope.updateevent.emailTemplateId!=null && $scope.updateevent.emailTemplateId!=0){
		
		  Admin_Service.fetchCategoryIdByTempId($scope.updateevent.emailTemplateId).then(function(response){
			  $scope.updateevent1.category=response.data;
			  $scope.categoryid=$scope.updateevent1.category[0].typeId
			//fetch category
				 if($scope.updateevent1.category!=null){
				    $scope.fetchTmplttypeslist();
				    $scope.fetchSmsTemplateList($scope.categoryid);
				    $scope.fetchEmailTemplateList($scope.categoryid);
				 }
				
			  
			  $(".loader").fadeOut("slow");	
		  },function(response){
	    		$(".loader").fadeOut("slow");
			 });
	 }
	 else{
		
		 
		    $scope.fetchTmplttypeslist();
		
	 }
	 
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
				 console.log("email template id:");
				 console.log($scope.emailTemplateList);
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
	
	 
	 //$scope.eventslotFlag=true;

	 $scope.eventslotFlag = GlobalModule_dataStoreService.loadData('LoginModule','eventslotFlag');	
		
	 $scope.fetchschedulardata = function(eventid){			
		 Admin_Service.fetchschedulardata(eventid).then(function(response){
			  $scope.schedulardata = response.data;			  
			  $scope.userpermission = $scope.schedulardata.userPermissions;			
			  $scope.slot = $scope.schedulardata.slots;	
			  console.log($scope.schedulardata);
		  },function(response){			
			});	
	  };	   
	  $scope.fetchschedulardata($scope.eventid);
	  
	  $scope.selectAll = function(val) {
		  
		  for(var i=0;i< $scope.userpermission.length;i++)
			{
			  if(val == 1){
				  $scope.userpermission[i].edit = true;
			  }
			 
			  if(val == 2){
				  $scope.userpermission[i].del = true;
			  }
			  	
			  	
			  		/*if($('#a'+i).is(":checked"))
			  		{
			  			$scope.userpermission[i].edit = true;
			  		}else{
			  			$scope.userpermission[i].edit = false;
			  		}*/
			  	
			  	/*if(val == 2)
			  	{
			  		if($('#b'+i).is(":checked"))
			  		{
			  			$scope.userpermission[i].del = true;
			  		}
			  		
			  	}*/
			}
		  
	  };
	  
	  
	  
	 
	  $scope.addnewuser = function(){
		  $scope.userpermission.push({ 
			  'add': "true"
		  });  		
	  };
	 
	  
	  $scope.addslot = function(newslot){
		  $scope.slotm = {};
		  $scope.slotm.dateTime =  $("#datetimepickercns").data('date');	
		  $scope.slotm.candidates = document.getElementById('candidate').value;
			
			  if($scope.slotm.candidates <= 0 || $scope.slotm.candidates=="" || $scope.slotm.candidates == undefined || $scope.slotm.candidates==null) 
			  {				  
				  GlobalModule_notificationService.notification("error","Please add number of candidates");
			  }else{
				  $scope.slot.push($scope.slotm);	
			  }  
	  };
	  $scope.clear=function(){
			 $scope.slotm = {
					 candidates: '' 
			 };
			 
		 };
		
		$scope.serachAdminUsers = function(){			
			Admin_Service.serachAdminUsers(-1,"-1",$rootScope.userdetails.id).then(function(response){
			  $scope.adminUsers = response.data;
			  
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
		
		};
	  $scope.serachAdminUsers();
		
		
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
	  
	  $scope.removeslot = function(id) {		 
		 $scope.slot.splice(id, 1);
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
	  
	  $scope.set = function(boolean){			  
		  $scope.flag = boolean;
	  };	  
	  

	  $scope.disabled = 0; 
	 $scope.updateEvent =  function(j){	
	 $scope.disabled = 1;
 
		$scope.match = false;
		$scope.updateevent.userPermissions = $scope.userpermission;
		$scope.updateevent.slots = $scope.slot;		
		$scope.updateevent.id = $scope.eventid;
		$scope.updateevent.userid = $rootScope.userdetails.id;	
	//	$scope.updateevent.totalSlots=$scope.totalSlotCount;
		$scope.updateevent.jobfairId=$scope.selectedschedular.jobfairId; 
		if($scope.selectedschedular.fortype=='jobfair'){
			 $scope.updateevent.schedulerType = 1;
			 $scope.updateevent.emailTemplateId = 0;
			 $scope.updateevent.smsTemplateId = 0;
		}
		//alert($scope.updateevent.totalSlots);
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
		else if($scope.updateevent.schedulerName == null || $scope.updateevent.schedulerName == "")
		{
		 GlobalModule_notificationService.notification("error","Please Enter Event name !");
		}
		else{  
		Admin_Service.updateEvent($scope.updateevent).then(function(response){
			  $scope.result = response.data;
			  
			  if($scope.result.indexOf("success")!=-1)
			  {
				  if($scope.eventslotFlag == false){
				  GlobalModule_notificationService.notification("success","Record updated successfully");
					 $state.go("restricted.admin.jobfairslist");

				  }else{
					  GlobalModule_notificationService.notification("success","Record updated successfully");
					  $state.go("restricted.admin.eventScheduler");

				  }
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }			   
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
		}
	
	 };
	 
	 $scope.setdata = function(index,x){
		 $scope.slotm=x;
		 $('#datetimepickercns').data("DateTimePicker").date(x.dateTime);
		 $scope.slotindex= index;		 
	 };	
	 
	 
	
	 $scope.cancelled = function(){
		 if($scope.eventslotFlag == false)
		 {
			 $state.go("restricted.admin.jobfairslist");
			 
		 }
		 else{
			 $state.go("restricted.admin.eventScheduler");
		 }
	 };	 
	 
	 $scope.fetchcandidatelist = function(slotId,userCount,DateTime){	 
	 
	 	 
		 $scope.slotDateTime = DateTime;
		 $scope.slotid = slotId;
		 Admin_Service.fetchcandidatelist(slotId,$scope.eventid).then(function(response){
			 $scope.filledcandidates = response.data;	
			 
			if(userCount !=0){
				 $("#print_candidates").modal('show');
			 };
			 
			
		  },function(response){			
			});		 
	 };
	 
	 
	 $scope.showerror =function(data){		
		 
		 if(data == 0){			
		 GlobalModule_notificationService.notification("error","No user present in this slot");
		 
		 }
	 };
	  
	 $scope.removeuserListassignSlot=[];
	 $scope.removeselectedcandidate = function(user) 
     {
		 $scope.removeuserListassignSlot.push(user);
		 var index = $scope.filledcandidates.indexOf(user);
		 if (index > -1) {
			 $scope.filledcandidates.splice(index,1);
			}	
		 
     };
	 
     $scope.slots = {};
	  $scope.removeuUserBySlotId = function(){		  
		  	 $scope.slots.userid = $rootScope.userdetails.id;
	    	 $scope.slots.id = $scope.slotid;
	    	 $scope.slots.user=$scope.removeuserListassignSlot;	    	 
	    	 Admin_Service.removeuUserBySlotId($scope.slots).then(function(response){
	    		 $scope.result = response.data;	    		
	    		 
	    		 if($scope.result = 'success'){	    			
	    			 GlobalModule_notificationService.notification("success","Users deleted successfully");	    			 
	    		 }else{
	    			 GlobalModule_notificationService.notification("error","Users not deleted successfully");
	    		 }	    		 
	    		 $scope.fetchschedulardata($scope.eventid);
	    		 });
	  };
	  
	  $scope.generateExcel = function(){
		  		 		 
		//  window.open('download?screenId=0&surveyId=0&slotId='+$scope.slotid+'&eventId='+$scope.eventid+'&slotDateTime='+$scope.slotDateTime+'&eventName='+$scope.updateevent.schedulerName+'&AccessToken='+getCookie('ACCESS_TOKEN'));
		  window.open('download?screenId=0&surveyId=0&slotId='+$scope.slotid+'&eventId='+$scope.eventid+'&slotDateTime='+$scope.slotDateTime+'&AccessToken='+getCookie('ACCESS_TOKEN'));
	  
	  };
	  
	  $scope.formatDate = function(date){
		  var dateOut = moment(date).format("DD-MM-YYYY");
	      return dateOut;
    };
   
    if($scope.selectedschedular.jobfairId != 0){
   	 $scope.startDate=$scope.selectedschedular.startDate;
   	  // console.log($scope.startDate);
   	  $scope.endDate=$scope.selectedschedular.endDate;
   	// console.log($scope.endDate);
   	  var today=new Date();
   	  var startDate = new Date($scope.startDate);
   	  var calanderStartDate ={};
   	  var endDate1=new Date($scope.endDate);
   	  $scope.today=today;
   	 if(startDate < today){
   	 calanderStartDate = today;
   	 }else{
   	 calanderStartDate = startDate;
   	 }
   	 console.log(calanderStartDate);
   	 
   	 var hours  = 24 * 60 * 60 * 1000 ;
   	 var endDateWith12Hours =  new Date($scope.endDate).getTime() + hours;
   	 if(endDate1 < today){
   	 endDateWith12Hours =  new Date(today).getTime() + hours;
   	 }
   	 
   	 console.log(endDateWith12Hours);
   	  $('#datetimepickercns').datetimepicker({
   	  inline: true,
   	      sideBySide: true,
   	      // multidate: true,
   	      minDate:calanderStartDate,
   	      maxDate:endDateWith12Hours
   	  }); 
 }else{
	  $('#datetimepickercns').datetimepicker({
		  inline: true,
         sideBySide: true,         
         minDate: new Date()
	   });  
 }
}]);