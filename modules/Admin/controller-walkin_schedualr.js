'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Walkins_Scheduler_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){
	   
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.updateevent={};
	$scope.selectedschedular = GlobalModule_dataStoreService.loadData('LoginModule','data');
 console.log($scope.selectedschedular);
	$scope.eventid = $scope.selectedschedular.id;
	
	$scope.totalSlotCount=$scope.selectedschedular.totalSlots;
	
	
    
	// alert($scope.eventid);
	$scope.slotindex =0;	
	$scope.slot;

	
	 $scope.updateevent.schedulerName = $scope.selectedschedular.schedulerName;
	
	 
	 // $scope.eventslotFlag=true;

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
			  	
			  	
			  		/*
					 * if($('#a'+i).is(":checked")) {
					 * $scope.userpermission[i].edit = true; }else{
					 * $scope.userpermission[i].edit = false; }
					 */
			  	
			  	/*
				 * if(val == 2) { if($('#b'+i).is(":checked")) {
				 * $scope.userpermission[i].del = true; } }
				 */
			}
		  
	  };
	  
	  
	  
	 
	  $scope.addnewuser = function(){
		  $scope.userpermission.push({ 
			  'add': "true"
		  });  		
	  };
	 
	  
	  
	  $scope.formatDate1 = function(date){		     
	         var dateOut = moment(date,'DD-MM-YYYY').format("MM/DD/YYYY");
	         return dateOut;
	   };
	  
	   
	  
	  /*$scope.addslot = function(newslot){
		  $scope.slotm = {};
		  
		 var dates= document.getElementById("Dates").value;
		 var dates1=$scope.formatDate1(dates);
		 var selectedDates=dates1.split(",");
		var time= document.getElementById("time").value;
		
		for(var i=0;i<selectedDates.length;i++){
			$scope.slotm.candidates = document.getElementById('candidate').value;
			$scope.slotm.dateTime = selectedDates[i] +" " + time ;
			 if($scope.slotm.candidates <= 0 || $scope.slotm.candidates=="" || $scope.slotm.candidates == undefined || $scope.slotm.candidates==null) 
			  {				  
				  GlobalModule_notificationService.notification("error","Please add number of candidates");
			  }else{
			
				  $scope.slot.push($scope.slotm);
				  console.log($scope.slot);
			  }
		}
		
		 
	  };*/	
	   
	   $scope.addslot = function(newslot){
			  $scope.slotm = {};
			  $scope.slotm.dateTime =  $("#datetimepickercns").data('date');	
			  $scope.slotm.candidates = document.getElementById('candidate').value;
				
				  if($scope.slotm.candidates <= 0 || $scope.slotm.candidates=="" || $scope.slotm.candidates == undefined || $scope.slotm.candidates==null) 
				  {				  
					  GlobalModule_notificationService.notification("error","Please add number of candidates");
				  }else{
					  $scope.slot.push($scope.slotm);
					  console.log($scope.slot);
				  }  
		  };
	   
	  $scope.clear=function(){
			 $scope.slotm = {
					 candidates: '' 
			 };
			 $('#datepicker').data('datepicker').setDate(null);
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
	  
	  $scope.formatDate2 = function(date){		     
	         var dateOut = moment(date,'DD-MM-YYYY').format("MM/DD/YYYY");
	         return dateOut;
	   };
	  
	/*  $scope.updateslot = function(newslot){		  
		  $scope.slotnew = {};		  
		  $scope.slotnew.candidates = document.getElementById('candidate').value;
		 
		  
		  if($scope.slotnew.candidates == null || $scope.slotnew.candidates == undefined || $scope.slotnew.candidates == ""){
			  $('#edit_sloter').modal("show");
		  }else{
			  
			  
			  var dates1= document.getElementById("Dates").value;
				 var dates2=$scope.formatDate2(dates1);
				 var selectedDates1=dates2.split(",");
				var time1= document.getElementById("time").value;
				$scope.slotnew.candidates = document.getElementById('candidate').value;
				$scope.slotnew.dateTime = selectedDates1 +" " + time1 ;
				
			//  $scope.slotnew.dateTime =  $("#datetimepickercns").data('date');	
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
*/	  
	   
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
	// $scope.updateevent.totalSlots=$scope.totalSlotCount;
		$scope.updateevent.jobfairId=$scope.selectedschedular.jobfairId; 
		if($scope.selectedschedular.fortype=='jobfair'){
			 $scope.updateevent.schedulerType = 2;
			 $scope.updateevent.emailTemplateId = 0;
			 $scope.updateevent.smsTemplateId = 0;
		}
		// alert($scope.updateevent.totalSlots);
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
			  
			  if($scope.result.indexOf("success")!=-1)
			  {
				  if($scope.eventslotFlag == false){
				  GlobalModule_notificationService.notification("success","Record updated successfully");
				 
					 $state.go("restricted.admin.walkinlist");

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
		 /*
			 * if($scope.eventslotFlag == false) {
			 */
			 $state.go("restricted.admin.walkinlist");
			 
		 /*
			 * } else{ $state.go("restricted.admin.eventScheduler"); }
			 */
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
		  		 		 
		  window.open('download?screenId=0&surveyId=0&slotId='+$scope.slotid+'&eventId='+$scope.eventid+'&slotDateTime='+$scope.slotDateTime+'&eventName='+$scope.updateevent.schedulerName+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  
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
	   var endDate1=new Date($scope.endDate);//added
 	  $scope.today=today;//added
	  if(startDate < today){
		  calanderStartDate = today;
	  }else{
		  console.log(calanderStartDate);//added
		 // calanderStartDate = startDate;
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
	  
	 // console.log(endDateWith12Hours);
	  /*
		 * $('#datetimepickercns').datetimepicker({ inline: true, sideBySide:
		 * true, //multidate: true, minDate:calanderStartDate,
		 * maxDate:endDateWith12Hours });
		 */
	   
	/*   $(document).ready(function() {
		    $('#datepicker').datepicker({
		        multidate: true,
		        format: "dd-mm-yyyy",
		        language: 'en',
		        startDate : startDate,
			     endDate : new Date($scope.endDate)
		    }).on('changeDate', function(e) {
		        // `e` here contains the extra attributes
		        $(this).find('.input-group-addon .count').text(' ' + e.dates.length);
		    });
		});*/

	   
	 /*  $(function () {
           $('#datetimepicker3').datetimepicker({
               format: 'LT',
               inline: true
           });
       });*/
 /*
	 * }else{ $('#datetimepickercns').datetimepicker({ inline: true, sideBySide:
	 * true, minDate: new Date() }); }
	 */
}]);