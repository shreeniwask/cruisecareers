var controllers = angular.module('LoginModule');

controllers.controller('UserJobFair_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','UserJobFair_Service','Admin_Service','JobFairsList_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,UserJobFair_Service,Admin_Service,JobFairsList_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.slot={};
	$scope.Slotid=0;
	$scope.dateOutList=[];
	$scope.joblist;
	
	
	$scope.startInterview=false;
	var checkInterviewStartDateTime= function(){
		
		$(".loader").show();
     	
		if($scope.startInterviewDetails.event.slots[0] != undefined && $scope.startInterviewDetails.event.slots.length > 0)
    	{ 		
    		//console.log($scope.dateformate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)));
    		var d1 =new Date($scope.startInterviewDetails.event.slots[0].dateTime);
    		
    		d1.setMinutes( d1.getMinutes() - 30 );
    		/*console.log(d1);
    		console.log($scope.dateformate1(d1));*/
    		
    		if(($scope.dateformate3(d1) <= $scope.dateformate3(new Date())))
    		{
    			$scope.inteviewOver=false;
    			$scope.startInterview=true;
    		}
    		else
    		{
    			$scope.inteviewOver=false;
    			$scope.startInterview=false;
    		}
    	}
    	else
    	{
    		$scope.inteviewOver=true;
    		$scope.startInterview=true;
    	}
     	
		$(".loader").fadeOut("slow");
    };
	
    $scope.fetchStartInterviewDetails= function()
	{
		$(".loader").show();
		
		//$scope.jobFairId=183;
		UserJobFair_Service.fetchStartInterviewDetails($scope.jobfairjobObj.id,$rootScope.userdetails.id).then(function(response){
			$scope.startInterviewDetails=response.data;
			//	console.log($scope.startInterviewDetails);
			checkInterviewStartDateTime();
			$(".loader").fadeOut("slow");
			 
		},function(response){
			$(".loader").fadeOut("slow");
		});
	};
	
	$scope.getAppliedJobCountForUser=function(userId){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{
			  userid=$rootScope.userdetails.id;}
			 UserJobFair_Service.getAppliedJobCountForUser(userid,$scope.jobfairjobObj.id).then(function(response){
										
			$scope.appliedJobCount = response.data;
			//console.log($scope.appliedJobCount);
			if($scope.appliedJobCount != 0)
			{
				//$scope.hideArrowFunction
				$("#overlay_sec").css('display','block');
				
			}
			
			},function(response){
										
			$(".loader").fadeOut("slow");
				
			});		
		};
		
		
	var startDate;
	var endDate1;
	
	var changeDate;
	 $scope.joblist=[];
	$scope.fetchJobFairJobListForUser = function(search){
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
		
		  UserJobFair_Service.fetchJobFairJobListForUser(search,userid).then(function(response){
			  $scope.jobfairjobObj = response.data;
			  $scope.joblist=$scope.jobfairjobObj.job;
			  console.log( $scope.joblist);
			  $scope.jobFairId=$scope.jobfairjobObj.id;
			  startDate=$scope.jobfairjobObj.startDate;
			 endDate1=$scope.jobfairjobObj.endDate;
			//console.log(endDate1);
			
			var d1=endDate1.substring(0,2);
			
			var d2=endDate1.substring(3,5);
			
			var d3=endDate1.substring(6,11);
			changeDate = d2+"/"+d1+"/"+d3;
			//console.log(changeDate);
			
			//console.log(date12);
			 // enddatevalidation=$scope.jobfairjobObj.endDate;
			  
			  $scope.selectedSlotCount(null);
			  $scope.fetchDateAndTimeSlots();
			  $scope.fetchJobList();
			  $scope.fetchStartInterviewDetails();
			  $scope.getAppliedJobCountForUser(null);
			  
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
		  
	  };
	  $scope.fetchJobFairJobListForUser(null);
	  var endFormatedDate;
	  
	  
	  $scope.fetchJobFairImageListForUser = function(){
		  $(".loader").show();
	
		  UserJobFair_Service.fetchJobFairImageListForUser().then(function(response){
			  $scope.jobfairimagelist = response.data;
			  
			 // console.log($scope.jobfairimagelist);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchJobFairImageListForUser();
	  
	  
	  $scope.fetchJobFairImageListForLandingPage = function(){
		  $(".loader").show();
	
		  UserJobFair_Service.fetchJobFairImageListForLandingPage().then(function(response){
			  $scope.jobfairimagelistadmin = response.data;
			  
			//  console.log($scope.jobfairimagelistadmin);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchJobFairImageListForLandingPage();
	  
	  
	  $scope.getJobFairJobListForUsercount=function(search){
			
			 		
			 $scope.search=search;
			 
			 if($scope.search==null || $scope.search=="")
			 {
				 	$scope.search= undefined;
			 }
			
			 UserJobFair_Service.getJobFairJobListForUsercount($scope.search).then(function(response){
					
				 $scope.count = response.data;
				// console.log($scope.count);
			
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getJobFairJobListForUsercount(null);
			
			
			$scope.fetchJobById = function(jobid,vcfflag){		  
				  var userid;
				  if($rootScope.userdetails == undefined){
					  $state.go("user_job_fair_job_desc");
				  }else{
				  		$state.go("restricted.user_job_fair_job_desc");
				  		GlobalModule_dataStoreService.storeData('LoginModule','jobtypeflag',vcfflag);
				  }	
		   GlobalModule_dataStoreService.storeData('LoginModule','jobid',jobid);
 
				 
			  };
			
			  $scope.dateformate = function(date){		     
			        var dateOut = moment(date).format("DD");
			        
			        return dateOut;
			  };
			  $scope.dateformate2 = function(date){		     
			        var dateOut = moment(date).format("DD MMM, YYYY");
			        return dateOut;
			  };
			  $scope.dateformate1 = function(date){		     
			        var dateOut = moment(date).format("DD-MM-YYYY");
			        
			        return dateOut;
			  };
			  
			  $scope.dateformate3 = function(date){		     
			        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
			        
			        return dateOut;
			  };
			  //for slots 
			  
			  $scope.changedate1=function(){
				  $scope.dateSelected1=document.getElementById('calendar-date').value;
				  //console.log($scope.dateSelected1);
				    
				  $scope.datechangeformat();
				  $('#time-select').show();
				  $("#overlay_sec2").css('display','block');
				  $('.can').hide();
					 $('.canf').hide();
				  };
				  
			  $scope.datechangeformat=function(date){
				  
				  $scope.dateSelected = moment($scope.dateSelected1).format("YYYY-MM-DD");
			       // console.log( $scope.dateSelected);
				   
			        $scope.fetchDateAndTimeSlots(); 			        
			  };
			  
			  
			  var count=0;
			  $scope.date =[];
			  //$scope.date1=[];
			  $scope.listDate=[];
			  
			
			  $scope.fetchDateAndTimeSlots = function(){
				  $(".loader").show();
			
				  UserJobFair_Service.fetchDateAndTimeSlots($scope.jobFairId,$scope.dateSelected).then(function(response){
					  $scope.jobfairslotlist = response.data;
					 // console.log($scope.jobfairslotlist);
					 if($scope.dateSelected != undefined){
					 if($scope.jobfairslotlist.length != 0){
					  $scope.listDate=[];
					 
					  for(var i=0;i< $scope.jobfairslotlist.length;i++){
					  $scope.date= $scope.jobfairslotlist[i].dateTime;
					 // console.log($scope.date);
					  //$scope.date1=$scope.date.substring(20,10);
					  
					 // console.log($scope.date1);
					  var todaydate= new Date();
					 // todaydate.setHours(0,0,0,0);
					  //console.log(todaydate);
					  var newDate= new Date($scope.date);
					  //console.log(newDate);
					  
					  if(newDate >= todaydate){
						 
						  $scope.listDate.push($scope.jobfairslotlist[i]);
						 // console.log($scope.listDate);
 						  
						  for(var j=0;j< $scope.listDate.length;j++){
						  var dateString=$scope.listDate[j].dateTime;
						  var d = new Date(dateString);
						 $scope.dayName = d.toString().split(' ')[0];
						//  console.log($scope.dayName);
						  }
						  /*for(var i=0;i< $scope.listDate.length;i++){
						  $scope.date= $scope.listDate[i].dateTime;
							 // console.log($scope.date);
							  $scope.date1=$scope.date.substring(20,10);
							  
							  console.log($scope.date1);
						 //console.log(newDate) ;
						  }*/
						  count++;
						  
						  }
					 // $('time-select').show()
					  };
					 
					 if($scope.listDate.length == 0)
					  {
						  GlobalModule_notificationService.notification("error","Slots for the selected date are currently unavailable. However we would like to make time to speak with you .Please look out for upcoming VCFs. Good Luck.");
						  $('#time-select').hide();
						  $('.can').hide();
							 $('.canf').hide();
					  };
					 
					 }else{
						 GlobalModule_notificationService.notification("error","Slots for the selected date are currently unavailable. However we would like to make time to speak with you .Please look out for upcoming VCFs. Good Luck.");
						 $scope.hideArrowFunction();
						 $('#time-select').hide();
						 $('.can').hide();
						 $('.canf').hide();
					  } 
					 }
					// $('#time-select').show();
					  $(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");
					});
				  
			  };
			// $scope.fetchDateAndTimeSlots();
		
				
			  $scope.toDisplayTimeSlots = function(id){	
				  alert(id);
				  
			         $scope.dateOut = moment(date.dateTime,'MM/DD/YYYY hh:mm a').format("DD-MM-YYYY");
			         $scope.timeOut = moment(date.dateTime,'MM/DD/YYYY hh:mm a').format("hh:mm a");
			         
			         for(var i=0;i<$scope.jobfairslotlist.length;i++){
				        	
					        if(moment($scope.jobfairslotlist[i].dateTime,'MM/DD/YYYY hh:mm a').format("DD-MM-YYYY") == $scope.dateOut){	
					        	$scope.dateOutList.push(i);
					        	
					        }
					        
					        }
			    //     console.log($scope.dateOutList);
			         
			        };
			  
			  /*$scope.dateList=function(){      
			        for(var i=0;i<jobfairslotlist.length;i++){
			        	
			        if(jobfairslotlist[i].dateTime == dateOut){	
			        	$scope.jobfairslotlist.push(dateOut[i].id);
			        }
			        }
			  }; */
			        
				        $scope.fetchusersBysltId=function(id){
							//$(this).addClass('active');
				        	
				        	$scope.Slotid=id;
				        	
							Admin_Service.fetchusersBysltId(id).then(function(response){
								 $scope.userlistBySlotId=response.data;
								 $('.can').show();
								 $('.canf').show();
								 //$('#overlay_sec3').show();
								
							 });
						};
			      
		$scope.selectedSlotCount=function(userId){
			
			var userid;
			  if($rootScope.userdetails == undefined){
				   userid = 0;
			  }else{
				  userid=$rootScope.userdetails.id;}
						
		 UserJobFair_Service.selectedSlotCount(userid,$scope.jobFairId).then(function(response){
									
		$scope.count = response.data;
		
		if($scope.count == 0)
		{
			$scope.buttonflag=1;
			$('.cancelbtn').hide();
		}else{
			$scope.buttonflag=2;
			$scope.fetchSelectedUserSlot();
			if($scope.buttonflag ==2){
				$scope.hideArrowFunction();
				}
			
			
		//	$scope.fetchSelectedUserSlot();
			
		}
		// console.log($scope.count);
		},function(response){
									
		$(".loader").fadeOut("slow");
			
		});		
	};
	
	
			       
			  $scope.saveSlotsOfUser=function(id){
				  $(".loader").show();
				  $scope.slot.userid=$rootScope.userdetails.id;
				
					$scope.slot.id=$scope.Slotid;
					$scope.slot.flag="VCF";
					$scope.slot.createdby =$rootScope.userdetails.id;
				  if($scope.slot.id != 0 || $rootScope.userdetails.STATUS=='inactive' || $rootScope.userdetails.STATUS=='Shortlisted' || $rootScope.userdetails.STATUS=='Selected'
					  || $rootScope.userdetails.STATUS=='Pending Brand Approval' || $rootScope.userdetails.STATUS=='Hold'){
				  UserJobFair_Service.saveSlotsOfUser($scope.slot).then(function(response){
						$scope.flaguser=response.data;	
						 
						if($scope.flaguser == 'success'){
							$scope.buttonflag=2;
							if($scope.buttonflag ==2){
							$scope.hideArrowFunction();
							}
							$scope.fetchSelectedUserSlot();
							$('.cancelbtn').show();
							$("#overlay_sec").css('display','none');
							$("#sheduled_msg").modal("show");
						}
						else if($scope.flaguser == "Shortlisted" || $scope.flaguser == "Selected" ||
							$scope.flaguser == "Pending Brand Approval" || $scope.flaguser == "Hold"){
							GlobalModule_notificationService.notification("error","One of your applications is already being evaluated by the cruisecareers.in team. Please wait for further communication from us. Thank you.");
							
						}
						else if($scope.flaguser != 'active'){
							
							  GlobalModule_notificationService.notification("error","Uh-Oh! Looks like your previous application was already evaluated by our team. We do have a 'cool-off period' in force for applicants who have not been short-listed.But all is not lost - Here's what you can do - Log in to your profile after "+$scope.flaguser+" and reapply for your preferred position. We promise we will look at your application with fresh eyes. Good Luck!");
						}
						else{
							  GlobalModule_notificationService.notification("error","Slots for the selected date are currently unavailable. However we would like to make time to speak with you .Please look out for upcoming VCFs. Good Luck.");

						}
					 });
				  }else{
					  GlobalModule_notificationService.notification("error","Please select time slot");
				  }
			  };
			  
			  
			  $scope.fetchSelectedUserSlot = function(){
				  $(".loader").show();
			
				  UserJobFair_Service.fetchSelectedUserSlot($rootScope.userdetails.id,$scope.jobFairId).then(function(response){
					  $scope.userSelectedSlot = response.data;
				/*	  $scope.statusID=$scope.userSelectedSlot.statusId ;
					  
					  
					  if($scope.statusID == 3 || $scope.statusID == 0){
							$('.cancelbtn').hide();
							}else{
								$scope.buttonflag=2;
								$scope.hideArrowFunction();
								 $("#overlay_sec").css('display','none');
							}*/
					  
					  $("#overlay_sec").css('display','none');
					//  console.log($scope.userSelectedSlot);
					 
					  $(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");
					});
			  };
			//  $scope.fetchSelectedUserSlot();
					
			  
				 $scope.goStartInterview=function(){
					  var jobFair={name:$scope.jobfairjobObj.name,id:$scope.jobfairjobObj.id,startDate:$scope.jobfairjobObj.startDate,endDate:$scope.jobfairjobObj.endDate}
					  GlobalModule_dataStoreService.storeData('LoginModule','jobFairObj',jobFair);
					  GlobalModule_dataStoreService.storeData('LoginModule','inteviewOverFlag',$scope.inteviewOver);
					  $state.go("restricted.initiate_interview");
					  
				  };
				  
// for applied job count
				  
				  
					
					
					$scope.fetchJobList=function(){
						  
						  JobFairsList_Service.fetchJobList($scope.jobFairId).then(function(response){
								 
							  $scope.joblist1 = response.data;
							 // console.log($scope.joblist1);
							  $scope.job1=  $scope.joblist1[0];
							  if($scope.job1.jobTitle == undefined &&  $scope.job1.jobDescription == undefined)
							  {
								  $('#test1').hide();
							  }
							  //console.log( $scope.job1);
							  $scope.job2=  $scope.joblist1[1];
							  if($scope.job2.jobTitle1 == undefined &&  $scope.job2.jobDescription1 == undefined)
							  {
								  $('#test2').hide();
							  }
							 // console.log( $scope.job2);
								 $(".loader").fadeOut("slow");
							  },function(response){
								  $(".loader").fadeOut("slow");
							 }); 
					  };					
					 //$scope.getAppliedJobCountForUser(null);
					//$scope.job={};
					
					angular.element(document).ready(function () {
						 $(".time-div").click(function(){
							   alert("The paragraph was clicked.");
							 });
						 
						  $scope.Datepicker1=function(ev){
							  
							  if (!$.fn.bootstrapDP && $.fn.datepicker && $.fn.datepicker.noConflict) 
							   { var datepicker = $.fn.datepicker.noConflict(); $.fn.bootstrapDP = datepicker; } 
							   $('#calendar-date').bootstrapDP({
								   //format : "dd/mm/yyyy",
								   orientation: "bottom right",
								   container:'.customdate-picker',
								   startDate: "today",
								   endDate:changeDate
								 
							   });				  
							   
							   
							   $('#calendar-date').data('datepicker').hide = function () {};
							   $('#calendar-date').datepicker('show');							   
							   };
							  
							   $('.date-time-selector').hide();
							   $('.can').hide();
								 $('.canf').hide();
								
							   $('#calendar-date').click();
							   $('.shedule-a-meeting').click(function(){
								   $('.date-time-selector').show();
								   $("#overlay_sec1").css('display','block');
								   $('#time-select').hide();
								   $('.can').hide();
								   $('.canf').hide();
								   $('#calendar-date').click();
								   $('#calendar-date').focus();
								  // alert("The paragraph was clicked.");
								 });

							  
							 
						});
								   
				/*$scope.timediv=function(){
					//alert();
					var tt = $(this);
					alert (tt);
					  $(	).addClass("active")
					$(tt).hide();
				};	*/
				$scope.cancel=function(){
					$('.date-time-selector').hide();
					$(".modal-backdrop").hide();
					$state.reload();
				};
				/*$scope.demoDate=function(){				   
					var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                    var date=new Date('12/05/2019');
					$scope.day = days[ date.getDay() ];
					console.log($scope.day);
				    $scope.month = months[ date.getMonth() ];	
					console.log( $scope.month);
				};
				$scope.demoDate();*/
							
				$scope.acivteClass=function(index)
				{
					for (var i=0;i<$scope.listDate.length;i++)
					  {
						  if (i==index){
							  $('.time-div').removeClass('active');
							  $("#dates"+index).addClass('active');
						  }
						 
					  }
				};
				
				$scope.deleteUserSlot = function(){
					
					$scope.slot.id=$scope.Slotid;
					$scope.slot.flag="VCF";
					
					
					 UserJobFair_Service.deleteUserSlot($rootScope.userdetails.id,$scope.slot).then(function(response){
					  $scope.deleteSlotFlag = response.data;				   
								  
					if($scope.deleteSlotFlag == 'success')
						{
							 GlobalModule_notificationService.notification("success","Your slot has been cancelled successfully");
							 $scope.buttonflag=1;
							 //$state.go("restricted.user_job_fair");
							 $state.reload();
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
							
							$scope.hideArrowFunction=function(){
								$("#overlay_sec").css('display','none');
								$("#overlay_sec1").css('display','none');
								$("#overlay_sec2").css('display','none');
							};
						//	$scope.hideArrowFunction();
							
							
							
							
							
							
							 $scope.userid = $rootScope.userdetails.id;
							  $scope.fetchStatusOfCandidate=function(userid){
								  $scope.userid=userid;
								  UserJobFair_Service.fetchStatusOfCandidate($scope.userid).then(function(response){
							  			  $scope.getuserstatus = response.data;
							  			$rootScope.userdetails.STATUS = $scope.getuserstatus;
							  			  console.log($scope.getuserstatus);
							  	  });
							  }
							  $scope.fetchStatusOfCandidate($rootScope.userdetails.id);
							
							
							
							
							
							
							
							
							
}]);



