var controllers = angular.module('LoginModule');

controllers.controller('UserJobFairJobDesc_Ctrl',['$scope','$rootScope','$stateParams','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','UserJobFair_Service','Profile_Service','Login_Service','Admin_Service','GlobalModule_User_activityService', function ($scope, $rootScope,$stateParams,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,UserJobFair_Service,Profile_Service,Login_Service,Admin_Service,GlobalModule_User_activityService)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	$scope.activity={};
	$scope.jobid = GlobalModule_dataStoreService.loadData('LoginModule','jobid');
	$scope.jobtypeflag = GlobalModule_dataStoreService.loadData('LoginModule','jobtypeflag');
	$scope.slot={};
	$scope.slotCount=0;
	$scope.input=[];
	$scope.file=[];
	$scope.usercomplianceid =[];
	
	$scope.jobFairId= GlobalModule_dataStoreService.loadData('LoginModule','jobFairId');
	
	
	$scope.fetchJobFairJobById = function(jobid){
		$(".loader").show();
		var userid;
		if($rootScope.userdetails == undefined || $rootScope.userdetails.id==null){
			userid = 0;
		}else{ userid = $rootScope.userdetails.id;}

		Login_Service.fetchJobById($scope.jobid,userid).then(function(response){
			$scope.jobById = response.data;
			$scope.jobById.userid = userid;
		//	console.log($scope.jobById);
			$(".loader").fadeOut("slow");	
		},function(response){
			$(".loader").fadeOut("slow");	
		});
	};
	$scope.fetchJobFairJobById($stateParams.jobId);
	$scope.fetchconfigproperties = function(){
		Login_Service.fetchconfigproperties($scope.user).then(function(response){	    		 
			$scope.propertiesList = response.data;	
			$scope.age_limit=$scope.propertiesList.age_limit;
			$scope.passport_check_mandatory=$scope.propertiesList.passport_check_mandatory;
			console.log($scope.age_limit);
		});
	};
	$scope.fetchconfigproperties();
	$scope.selectedSlotCount=function(userId){
		
		var userid;
		if($rootScope.userdetails == undefined || $rootScope.userdetails.id==null){
			userid = 0;
		}else{ userid = $rootScope.userdetails.id;}
		 UserJobFair_Service.selectedSlotCount(userid,$scope.jobFairId).then(function(response){
									
		$scope.count = response.data;
		$scope.slotCount=$scope.count;
		/*if($scope.count == 0)
		{
			$("#apply").modal();
		}else{
			$("#apply1").modal();
		}*/
		 //console.log($scope.count);
		},function(response){
									
		$(".loader").fadeOut("slow");
			
		});		
	};
	$scope.selectedSlotCount(null);
	
	$scope.reload = function(){
		$("#alreadyappliedforjob").modal('hide');
		$(".modal-backdrop").hide();
		$state.reload();
		
	};	
	
$scope.applyForJob = function(){
	
	
	if($rootScope.userdetails == undefined || $rootScope.userdetails.id==null){
		$state.go("login");

	}else{
		
		$(".loader").show();
		
		if($scope.passport_check_mandatory=='false'){
			 $scope.flag = false;
		}else{
		  Profile_Service.checkUserPassport($rootScope.userdetails.id).then(function(response)
	                {
	                	  $scope.flag = response.data;
	          			$(".loader").fadeOut("slow");	
	          		},function(response){
	          			$(".loader").fadeOut("slow");	
	          		});
          
		}		      
		Profile_Service.fetchUserProfile($rootScope.userdetails.id).then(function(response){
			$scope.userProfile=response.data;
		
			//console.log($scope.userProfile);
			if($scope.userProfile.userEducationList.length != 0  && $scope.userProfile.userContact.city.id > 0){

				$scope.userjob ={user:{},job:{}};
				delete $scope.userProfile.updatedDate;
				$scope.userjob.user = $scope.userProfile;
				$scope.userjob.job.id = $scope.jobById.id;
				$scope.positionName=$scope.jobById.position.name;	
				  var dob = $scope.userProfile.dob;
	 			  /*var todaysDate=$scope.dateformate(new Date());
		          var dateParts1 = dob.split('-');
				  var dateParts2 = todaysDate.split('-');
				  var bDate=new Date(dateParts2[2],parseInt((dateParts2[1]))-1,dateParts2[0]);
				  var toDate1=new Date(dateParts1[2],parseInt((dateParts1[1]))-1,dateParts1[0]);
				  bDate.setYear(bDate.getYear() - 18);
				  var checkdt= $scope.dateformate(bDate);
				
				  var checkdt1 = checkdt.split('-');
				 // console.log(checkdt1);
    		      var checkdt2=new Date(checkdt1[2],parseInt((checkdt1[1]))-1,checkdt1[0]);
				//  console.log(checkdt2);
				  var greaterDt=checkDates(checkdt2,toDate1);						
				
				  if(greaterDt == true)
				  {
					  	GlobalModule_notificationService.notification("error","Age limit for applying job is 18 and above");
						$(".loader").fadeOut("slow");
						return;
				  }
*/					  var dateParts1 = dob.split('-');
//var dateParts2 = todaysDate.split('-');
					var toDate1=new Date(dateParts1[2],parseInt((dateParts1[1]))-1,dateParts1[0]);
					var today = new Date();
					var birthDate = toDate1;
					var age = today.getFullYear() - birthDate.getFullYear();
					var m = today.getMonth() - birthDate.getMonth();
					if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
					    age--;
					}
					var agecompare=$scope.age_limit;
					if(age<agecompare)
					{
						  GlobalModule_notificationService.notification("error","Age limit for applying job is " +  $scope.age_limit  + " and above");
							$(".loader").fadeOut("slow");
							return;
					}
					if($scope.flag == true)
          		  {
          		    GlobalModule_notificationService.notification("error","A copy of your passport has to be mandatorily uploaded. Please try again");
						$(".loader").fadeOut("slow");
						return;
          		  }
          		  
					 if($scope.userProfile.STATUS == "Shortlisted" || $scope.userProfile.STATUS == "Selected" ||
		                	  $scope.userProfile.STATUS == "Pending Brand Approval" || $scope.userProfile.STATUS == "Hold"){
		                	  GlobalModule_notificationService.notification("error","One of your applications is already being evaluated by the cruisecareers.in team. Please wait for further communication from us. Thank you.");
								$(".loader").fadeOut("slow");
								return;
		                  }else if($scope.userProfile.STATUS == "inactive"){
		                	  
	          	            GlobalModule_notificationService.notification("error","Uh-Oh! Looks like your previous application was already evaluated by our team. We do have a 'cool-off period' in force for applicants who have not been short-listed.But all is not lost - Here's what you can do - Log in to your profile after "+ $scope.userProfile.inactiveenddate +" and reapply for your preferred position. We promise we will look at your application with fresh eyes. Good Luck!");
						$(".loader").fadeOut("slow");
						return;
		                  }
				  else
			     {
					  Login_Service.checkUserAppliedForAnotherjob($rootScope.userdetails.id).then(function(response){
						  $scope.alreadyapplied = response.data;
	                	  if($scope.alreadyapplied){
					  Profile_Service.checkRoleSpecificCompliances($scope.jobById).then(function(response)
				                {
				                	  $scope.checkRoleSpecificCompliances = response.data;
				                	  if($scope.checkRoleSpecificCompliances=="true"){
				                		  $("#update_compliances_modal").modal();
				                	  }
				          			$(".loader").fadeOut("slow");	
				          		
					 if($scope.checkRoleSpecificCompliances=="false"){
					Login_Service.applyForJob($scope.userjob).then(function(response){
						$scope.activity.activityid=5;
						$scope.activity.userid=$rootScope.userdetails.id;
						GlobalModule_User_activityService.addUserActivity($scope.activity);

						$scope.applyForJob = response.data;
						if($scope.applyForJob == -1){
							$("#alreadyappliedforjob").modal();
							//GlobalModule_notificationService.notification("error","You have already applied for a position. Withdraw the previous applied position and then try to apply for this.");
							//$state.reload();
						}
						else if(($scope.applyForJob != 0 && $scope.applyForJob != -1) && $scope.slotCount ==0)
						{
							if($scope.jobtypeflag=="walkin"){
							$("#apply").modal('show');
							$scope.fetchJobFairJobById($stateParams.jobId);
							}
							else if($scope.jobtypeflag=="VCF"){
								$("#applyvcf").modal('show');
								$scope.fetchJobFairJobById($stateParams.jobId);	
							}
						  
						}else if($scope.applyForJob != 0 && $scope.slotCount !=0)
							{
							$("#apply1").modal();
							$scope.fetchSelectedUserSlot();
							}
						else if($scope.applyForJob == 0)
						{
							GlobalModule_notificationService.notification("error","You have already applied for this job");
						}
						$(".loader").fadeOut("slow");
					
					},function(response){
						$(".loader").fadeOut("slow");
						GlobalModule_notificationService.notification("error","Uh Oh! Error in Application. Please try again.");
					});
					 }
				                });
					  }else{
						// GlobalModule_notificationService.notification("error","You have already applied for a position. Withdraw the previous applied position and then try to apply for this.");
							//$state.reload();
							$(".loader").fadeOut("slow");
							$("#alreadyappliedforjob").modal();
					 
                	  }
			     });
					  }
			}
			
			else{
				GlobalModule_notificationService.notification("error","Please complete your profile");
				$(".loader").fadeOut("slow");
				//$state.go("restricted.profile");
			};
		},function(response){
			$state.go("restricted.myprofile");
			$(".loader").fadeOut("slow");
		});
	}

} ;
	


	$scope.dateformate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY");
        return dateOut;
  };
  
	 /* function checkDates(checkdt2,toDate) { 				 
			
		  return (checkdt2.getTime() < toDate.getTime());
	 };*/
 
	 $scope.redirectToJobListPage=function(){
		 
		$state.go("restricted.user_job_fair");
	 };
 
	    $scope.notify = function(){
			$(".loader").show();		
			if($rootScope.userdetails == undefined){
	
				$state.go("login");
				$(".loader").fadeOut("slow");
			}else{
				$scope.job ={};
				$scope.job.userid = $rootScope.userdetails.id;
				$scope.job.jobId = $scope.jobById.id;
	
				Login_Service.notify($scope.job).then(function(response){
					$scope.notifya = response.data;
					GlobalModule_notificationService.notification("success","Done! We will notify you once this position opens up.");
					$scope.activity.activityid=7;
					$scope.activity.userid=$rootScope.userdetails.id;
					GlobalModule_User_activityService.addUserActivity($scope.activity);
					$state.reload();
					$(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				});
	
			}
	
		};
		
		
		$scope.openModalForRefer = function(){

			if($rootScope.userdetails == undefined){
				$state.go("login");
			}else{
				$("#refer").modal();
			}
		};
		
		$scope.referFriends = function(refer){
			$(".loader").show();
			
			if(refer == undefined)
			{
				GlobalModule_notificationService.notification("error","Please enter email-id");
				$(".loader").fadeOut("slow");
				return;
			}
			
			refer.userid = $rootScope.userdetails.id;
			refer.jobId = $scope.jobById.id;

			Login_Service.referFriends(refer).then(function(response){
				
				$scope.notifya = response.data;
				GlobalModule_notificationService.notification("success","Yay!! You have successfully referred this job to your friends!");

				$('#refer').modal('hide');
				$scope.activity.activityid=2;
				$scope.activity.userid=$rootScope.userdetails.id;
				GlobalModule_User_activityService.addUserActivity($scope.activity);
				refer.emails = "";
				
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			});

		};
		
		$scope.fetchSelectedUserSlot = function(){
			  $(".loader").show();
		
			  UserJobFair_Service.fetchSelectedUserSlot($rootScope.userdetails.id,$scope.jobFairId).then(function(response){
				  $scope.userSelectedSlot = response.data;
				  
				//  console.log($scope.userSelectedSlot);
				 
				  $(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				});
		  };
		 
		// $scope.fetchSelectedUserSlot();
		  $scope.closeModal=function(){
			  {
				  //window.location.href = 'restricted.user_job_fair';
				 // $('#modal').modal('toggle');
				  $("#modal").modal('hide');
					$(".modal-backdrop").hide();
					$state.reload();
					$state.go('restricted.user_walkin');
				  	
				  }
		  };
		  
		  $scope.closeModalvcf=function(){
			  {
				  //window.location.href = 'restricted.user_job_fair';
				 // $('#modal').modal('toggle');
				  $("#modal").modal('hide');
					$(".modal-backdrop").hide();
					$state.reload();
					
				  $state.go('restricted.user_job_fair');
					
				  }
		  };
		
		  $scope.fetchUserComplianceMandatorydetails = function(){
				$(".loader").show();		
				
				Profile_Service.fetchUserComplianceMandatoryDetails($scope.jobById).then(function(response){
						$scope.fetchUserComplianceMandatoryDetails = response.data;
						if($scope.fetchUserComplianceMandatoryDetails!=null){
							$scope.fetchCountries();
							for(var i=0;i<$scope.fetchUserComplianceMandatoryDetails.length;i++)
							{
							if($scope.fetchUserComplianceMandatoryDetails[i].countryOfIssue==0){
								$scope.fetchUserComplianceMandatoryDetails[i].countryOfIssue=null;
							}
							}
							 $("#apply_job_modal").modal();
						}
						$(".loader").fadeOut("slow");
					},function(response){
						$(".loader").fadeOut("slow");
						GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
					});

			} ;

			  
		      $scope.addForUserCompliance = function(user) 
		      {		
$scope.flagForEmptyField=false;
var count=0;
for(var i=0;i<user.length;i++)
{

	if(user[i].documentNumber != "" && user[i].documentNumber != null && user[i].issueDate != "" && user[i].issueDate != null && user[i].expiryDate != "" && user[i].expiryDate != null && user[i].countryOfIssue != null){
		
	}
	else if(user[i].documentNumber != "" || user[i].documentNumber != null || user[i].issueDate != "" || user[i].issueDate != null || user[i].expiryDate != "" || user[i].expiryDate != null || user[i].countryOfIssue != null){
		if(user[i].documentNumber == undefined && (user[i].issueDate == undefined || user[i].issueDate == "") && (user[i].expiryDate == undefined || user[i].expiryDate == "" ) && user[i].countryOfIssue == null){
			count++;			
		}else{
		GlobalModule_notificationService.notification("error","Please Fill mandatory fields.");
		$scope.flagForEmptyField=true;
		return;
		}
	}else{
		GlobalModule_notificationService.notification("error","Please Fill mandatory fields.");
		$scope.flagForEmptyField=true;
		return;
	}
	if(user.length==count){
		GlobalModule_notificationService.notification("success","Please Add Compliance Info");
		  return;
	}
if(user[i].compliance.id == 13){

var letterNumber = /^[A-Z][1-9]\d\s?\d{4}[1-9]$/ig;
$scope.docNumber = user[i].documentNumber.replace(" " , "");;
user[i].documentNumber=$scope.docNumber;
if(!($scope.docNumber.match(letterNumber)))
{
GlobalModule_notificationService.notification("error","Please enter valid passport number");
return;
}
}
	}
  if($scope.flagForEmptyField==false)
  {
	 
		    	  var hasfile=0;
		    	  var counter = 0;
		    	  $(".loader").show();
				  for(var i=0;i<user.length;i++){
				  user[i].userid = $rootScope.userdetails.id;
				  user[i].issueDate= $("#issuedate"+i).val();
				  user[i].expiryDate= $("#expirydate"+i).val();
				 
				  $scope.input[i] = document.getElementById('documentfile'+i);
					if($scope.input[i].value!="")
					{
					hasfile = 1;
						$scope.file[i]=$scope.input[i].files[0];
				
					var formData = new FormData();
						formData.append("file",$scope.file[i]);
						formData.append("ind",i);
						
						$.ajax({
							url: 'rest/user/upload/compliancedocument',
							type: 'POST',
							data: formData,
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (returndata) {

								$scope.filedtailsForDocument=JSON.parse(returndata);
								user[$scope.filedtailsForDocument.index].path=$scope.filedtailsForDocument.fileURL;
								  counter=counter+1;
								   if(counter == user.length){
								   
								   if($scope.usercomplianceid.length > 0){
									   for(var i=0;i<$scope.usercomplianceid.length;i++){
										   var obj ={};obj.id = $scope.usercomplianceid[i];
											user.push(obj); 
									   }
									}
									 Profile_Service.addComplianceDetails(user).then(function(response){
									$scope.flagForCompliance = response.data;
									$scope.usercomplianceid =[];
									if($scope.flagForCompliance != "Failed" && $scope.flagForCompliance != "duplicate"){
										GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
										 $scope.activity.activityid=10;
										 $scope.activity.userid=$rootScope.userdetails.id;
										  GlobalModule_User_activityService.addUserActivity($scope.activity);
										  $scope.fetchUserComplianceMandatorydetails();
										}else if($scope.flagForCompliance == "duplicate") {
											  GlobalModule_notificationService.notification("error","Duplicate INDos Number  Complaince is not saved.");
										  }
									else{
											GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
									}
					
									$(".loader").fadeOut("slow");
									},function(response){
										GlobalModule_notificationService.notification("error","Error In User Compliance add");
										$(".loader").fadeOut("slow");
								});  									   
							};
							}
						});
				}else{
			counter =counter+1;
			}
				  }
		 if(hasfile == 0 ){
			 if($scope.usercomplianceid.length > 0){
				   for(var i=0;i<$scope.usercomplianceid.length;i++){
					   var obj ={};obj.id = $scope.usercomplianceid[i];
						user.push(obj); 
				   }
				}
				 
				  Profile_Service.addComplianceDetails(user).then(function(response){
					  $scope.flagForCompliance = response.data;
					  $scope.usercomplianceid = [];
					  if($scope.flagForCompliance != "Failed" && $scope.flagForCompliance != "duplicate"){
						  GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
						  $scope.activity.activityid=10;
							 $scope.activity.userid=$rootScope.userdetails.id;
							  GlobalModule_User_activityService.addUserActivity($scope.activity);
							  $scope.fetchUserComplianceMandatorydetails();
						  }else if($scope.flagForCompliance == "duplicate") {
							  GlobalModule_notificationService.notification("error","Duplicate INDos Number  Complaince is not saved.");
						  }
							  else{
						  
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
					
					  $(".loader").fadeOut("slow");
				  },function(response){
					  GlobalModule_notificationService.notification("error","Error In User Compliance add");
					  $(".loader").fadeOut("slow");
					}); 
		 }
				}		
		      };
		      
			$scope.fetchCountries = function(){		  
				Profile_Service.fetchCountries().then(function(response){
					  $scope.countryList = response.data;	
					  console.log($scope.countryList);
				  },function(response){
						
					});
			  };	
		
			  $scope.fileNameChanged = function(element)
			   {
				   var index = angular.element(element).scope().$index;
				   $scope.input[index] = document.getElementById('documentfile'+index);
					if($scope.input[index].value!="")
					{
						var filename=$scope.input[index].value;
						filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);
						$('#docfilepath'+index).val(filename);
					}
			   };
			   
			   $scope.download = function(path){
				   
					if(path.includes("amazonaws"))
				   {
					$rootScope.getSignedURL(path).then(function(response){
						window.open(response.data);
					},function(response){
						GlobalModule_dataStoreService.errorResponseHandler(response);
					});
				   }
					else
						{
						window.open(path);
						$(".loader").show();
						}
					
				};
				
				
				
				$scope.PreviewDocument = function(path){
					   
					if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
					 {
						 $scope.imageFlag=true;
						 if(path.includes(".pdf"))
						 {
							 $scope.imageFlag=false;
							 $scope.pdfFlag=true;
						 }else{
							 $scope.imageFlag=true;
							 $scope.pdfFlag=false; 
						 }
							 if(path.includes("amazonaws"))
							 {
								 $rootScope.getSignedURL(path).then(function(response){
							
									 $scope.fileurl=response.data;
									 $scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
									 console.log($scope.pdfDocPath);
							},function(response){
								GlobalModule_dataStoreService.errorResponseHandler(response);
							});
					   }
					 }
					
				  else
					  $scope.imageFlag=false;
					 if(!(path.includes(".pdf"))){
						   $scope.pdfFlag=false
					 }
				};
				
				 $scope.validateDate = function(compliance,element){  //---------validate issue date and expiry date					   					   
				        if ( new Date(stringToDate(compliance.issueDate,"dd-mm-yyyy","-")) > new Date(stringToDate(compliance.expiryDate,"dd-mm-yyyy","-")) ) { 
				           				          
				          // $scope.compliance.expiryDate='';
						   GlobalModule_notificationService.notification("error","You seem to have entered a date from the past. Please enter the correct date");							   
				        	$('#'+element).val(null);
				            return false;
				        }
				        return true;
				        
			   };
			   
			   function stringToDate(_date,_format,_delimiter)
			   {
			               var formatLowerCase=_format.toLowerCase();
			               var formatItems=formatLowerCase.split(_delimiter);
			               var dateItems=_date.split(_delimiter);
			               var monthIndex=formatItems.indexOf("mm");
			               var dayIndex=formatItems.indexOf("dd");
			               var yearIndex=formatItems.indexOf("yyyy");
			               var month=parseInt(dateItems[monthIndex]);
			               month-=1;
			               var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
			               return formatedDate;
			   }

}]);
