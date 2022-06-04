'use strict';
 
var controllers = angular.module('LoginModule');

controllers.controller('EIForm_Ctrl',['$scope','$rootScope','$state','Login_Service','Profile_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','EIForm_Service', function ($scope, $rootScope,$state,Login_Service,Profile_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,EIForm_Service){
		
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	//$scope.eifstatus = GlobalModule_dataStoreService.loadData('LoginModule','eifstatus');
	$scope.senderid=$rootScope.userdetails.id;
	$scope.userstatusid = GlobalModule_dataStoreService.loadData('LoginModule','userstatusid');
	$("#l0").addClass("active");
	$scope.count=0;
	
//	/$scope.submitbutton = "false";
	if($rootScope.userdetails.roleId==1){
		$scope.userId = GlobalModule_dataStoreService.loadData('LoginModule','userId');
		$scope.roleId = $rootScope.userdetails.roleId;
	}else{
		$scope.userId = $rootScope.userdetails.id;
		$scope.roleId = $rootScope.userdetails.roleId;
	}
	
	$scope.buttonlabel = "Send to Mistral";
	
	$scope.checkLogsPresent = function(){
		EIForm_Service.checkLogsPresent($scope.userId).then(function(response){
			$scope.islogpresent = response.data;
			if($scope.islogpresent)
				$scope.buttonlabel = "Resend to Mistral";
		});
	}
	$scope.checkLogsPresent();
	
	$scope.fetchEIFormDetails= function() {	
		
		$(".loader").show();
		$scope.eiform=0;
		
		EIForm_Service.fetchEIFormDetails($scope.userId,$scope.roleId).then(function(response){
			  $scope.eifdetails = response.data;
			 
			  var selecteddate=$scope.formatDate($scope.eifdetails.selectedDate);
			  $scope.eifdetails.selectedDate=selecteddate;
			  
			  
			 console.log($scope.eifdetails);
			 
			 if( $scope.eifdetails.brandid != 0){
				 $scope.fetchHomeAirport($scope.eifdetails.brandid);
			 }
			 
			 $scope.fetchStateList($scope.eifdetails.userContact.countryId);
			 $scope.fetchCityList($scope.eifdetails.userContact.state.id);
			 $scope.fetchBenStateList($scope.eifdetails.bencountry);
			 $scope.fetchBenCityList($scope.eifdetails.benstate);
			 $scope.fetchEcStateList($scope.eifdetails.eccountry);
			 $scope.fetchEcCityList($scope.eifdetails.ecstate);
			 $scope.fetchAdminComments($scope.eifdetails.id); 
			 
			 
			 
			 $('.modal-backdrop').hide();
				$(".loader").show();
				$(".loader").fadeOut("slow");	
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		
		$(".loader").fadeOut("slow");	
	};	
	$scope.fetchEIFormDetails();	
	

	$scope.fetchHomeAirport = function(id){
		  
		 EIForm_Service.fetchHomeAirport(id).then(function(response){
				  $scope.airportList = response.data;

				  
			  },function(response){
				  $(".loader").fadeOut("slow");	
				});
			$(".loader").fadeOut("slow");	
		  };
	
	
		  $scope.getEmpStatus = function(){
			  
			  Login_Service.getEmpStatus($scope.userId).then(function(response){
						  $scope.eifstatus = response.data.eif_status_id;

						  
					  },function(response){
						  $(".loader").fadeOut("slow");	
						});
					$(".loader").fadeOut("slow");	
				  };
				  $scope.getEmpStatus();

		  
		  ///UserContact 
		  $scope.fetchCountries = function(){		  
				Profile_Service.fetchCountries().then(function(response){
					  $scope.countryList = response.data;	
					  console.log($scope.countryList);
				  },function(response){
						
					});
			  };
			 
			 $scope.fetchCountries();
			 
		  
			 $scope.fetchStateList = function(id){			  
					Profile_Service.fetchStateList(id).then(function(response){
						  $scope.statelist = response.data;		
						  	console.log($scope.statelist);
						 //for first empty dropdown fix
						  if($scope.statelist.length == 0){
							  $scope.eifdetails.userContact.state.id = 0;						  
							  $scope.eifdetails.userContact.city.id = 0;
							 // $scope.cityList = "";
						  }			  
						  
					  },function(response){
							
						});		
				  };
				 
				  $scope.fetchCityList = function(id){
					  
						Profile_Service.fetchCityList(id).then(function(response){
							  $scope.citylist = response.data;
								console.log($scope.citylist);
							  
						  },function(response){
								
							});
					  };
					  
					  //Beneficiary
					  
					  $scope.fetchBenStateList = function(id){			  
							Profile_Service.fetchStateList(id).then(function(response){
								  $scope.benstatelist = response.data;		
								  	console.log($scope.benstatelist);
								 //for first empty dropdown fix
								  if($scope.benstatelist.length == 0){
									  $scope.eifdetails.benstate= 0;						  
									  $scope.eifdetails.bencity = 0;
									 // $scope.cityList = "";
								  }			  
								  
							  },function(response){
									
								});		
						  };
						 
						  $scope.fetchBenCityList = function(id){
							  
								Profile_Service.fetchCityList(id).then(function(response){
									  $scope.bencitylist = response.data;
										console.log($scope.bencitylist);
									  
								  },function(response){
										
									});
							  };
			
			
							  //Emergency Contact
							  $scope.fetchEcStateList = function(id){			  
									Profile_Service.fetchStateList(id).then(function(response){
										  $scope.ecstatelist = response.data;		
										  	console.log($scope.ecstatelist);
										 //for first empty dropdown fix
										  if($scope.ecstatelist.length == 0){
											  $scope.eifdetails.ecstate= 0;						  
											  $scope.eifdetails.eccity = 0;
											 // $scope.cityList = "";
										  }			  
										  
									  },function(response){
											
										});		
								  };
								 
								  $scope.fetchEcCityList = function(id){
									  
										Profile_Service.fetchCityList(id).then(function(response){
											  $scope.eccitylist = response.data;
												console.log($scope.eccitylist);
											  
										  },function(response){
												
											});
									  };
			
	
	
/*$scope.getEIFormDetailsCount= function() {	
		
		$(".loader").show();
		$scope.eiform=0;
		
		EIForm_Service.getEIFormDetailsCount($scope.userId).then(function(response){
			  $scope.eifdetailscount = response.data;
			 
			 console.log($scope.eifdetailscount);
			 
			
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		
		$(".loader").fadeOut("slow");	
	};	
	$scope.getEIFormDetailsCount();	*/
	
	 $scope.fetchconfigproperties = function(){
			Login_Service.fetchconfigproperties().then(function(response){	    		 
				$scope.propertiesList = response.data;	
				$scope.age_limit=$scope.propertiesList.age_limit;
				//console.log($scope.age_limit);
			});
		};
		$scope.fetchconfigproperties();
	
		
	$scope.saveComments= function(id,eifcomments) {	
		
		
		$(".loader").show();
	//	$scope.comments=$('textarea#comment').val();
		
		if(eifcomments==undefined || eifcomments==""){
			  GlobalModule_notificationService.notification("error","Please enter comment"); 
				$(".loader").fadeOut("slow");
			  return false;
		}
		
		EIForm_Service.saveComments(id,eifcomments,$rootScope.userdetails.id).then(function(response){
			  $scope.savedetails = response.data;
			  if($scope.savedetails == "success"){
				  $('#eif-comment-admin').modal('hide');
				//  GlobalModule_notificationService.notification("success","Comments have been saved successfully");  
				  $scope.sendtoCandidate(1);
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again"); 
			  }
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		
		$state.reload();
		$(".loader").fadeOut("slow");	
		
	}
	
	$scope.viewAdminComments=function(eifid){
		$scope.fetchAdminComments(eifid);
		if($rootScope.userdetails.roleId==1){
			$("#eif-comment-admin").modal('show');
		}else{
			$("#eif-comment").modal('show');
		}
		
		
	};
	
	$scope.admincommentlist = [];
	
	$scope.fetchAdminComments = function(eifid){
		EIForm_Service.fetchAdminComments(eifid).then(function(response){
			$scope.admincommentlist = response.data;
			if($scope.admincommentlist.length>0){
				$scope.button="Resend To Candidate";
			}else{
				$scope.button="Send To Candidate";
			}
		});
	};
		
$scope.saveEIForm= function(eifDetails,buttonid) {	
	    
	eifDetails.nationOfBirth = document.getElementById('nationofbirth').value;
	eifDetails.issueByIndia = document.getElementById('issuebyindia').value;
	//eifDetails.nationOfIssue = document.getElementById('nationofissue').value;
	eifDetails.manningagent=document.getElementById('manningagent').value;
	
	
	
		//check validation for BIOGRAPHIC DETAILS tab
		/*if($scope.eiform==0){
			
			if(eifDetails.user.email!=undefined){
				 if(eifDetails.user.email!=""){
			 var emailid = document.getElementById('email').value;
			// var emailPattern = "/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/"; 
			 var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			 
			if(isNaN(emailid)) {
				if(!(emailid.match(emailPattern))) {
					GlobalModule_notificationService.notification("error","Please enter valid email");
					$(".loader").fadeOut("slow");
					return ;
				}	    
			}
				 }else{
				GlobalModule_notificationService.notification("error","Please enter valid email");
				return ;
			}
			}else{
				GlobalModule_notificationService.notification("error","Please enter valid email");
				return ;
			}
		}*/
		
		 if($scope.eiform==1){
			
			if(eifDetails.userContact.altEmail!=undefined){
				 if(eifDetails.userContact.altEmail!=""){
			 var altemailid = document.getElementById('altemail').value;
			 var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			  
			if(isNaN(altemailid)) {
				if(!(altemailid.match(emailPattern))) {
					GlobalModule_notificationService.notification("error","Please enter valid alternate email");
					$(".loader").fadeOut("slow");
					return ;
				}	    
			  }
		    }
		  }
			
			
			if(eifDetails.pancardno != undefined){
				if(eifDetails.pancardno != ""){
				 if(eifDetails.pancardno.length<10)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid Pancard number");
					  $(".loader").fadeOut("slow");
					  return;	
				  }	
				}
			}		
			
			if(eifDetails.aadharcardno != undefined){
				if(eifDetails.aadharcardno != ""){
				 if(eifDetails.aadharcardno.length<12)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid Aadhar card");
					  $(".loader").fadeOut("slow");
					  return;	
				  }	
			}	
			}
			
			
		}
		
		//check validation for DEMOGRAPHIC DETAILS tab
		else if($scope.eiform==2){
			
		
			if(eifDetails.userContact.pincode!=undefined){
				 if(eifDetails.userContact.pincode.length<6)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid Pin/Zip code");
					  $(".loader").fadeOut("slow");
					  return;	
				  }	
			}		
		
			
			   
			
		      if(eifDetails.userContact.phoneNumber!=undefined){
		    	  if(eifDetails.userContact.phoneNumber.length<10){
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 1");
				  $(".loader").fadeOut("slow");
				  return;	
			  }  
		    }
		      
			if(eifDetails.userContact.altPhoneNumber != undefined){
				if(eifDetails.userContact.altPhoneNumber.length<10)
			  {
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 2");
				  $(".loader").fadeOut("slow");
			      return;
			  }
			}
			
		}
		
		
		
		//check validation for NEXT OF KIN DETAILS tab
		else if($scope.eiform==3){
			
			if(eifDetails.benzipcode!=undefined){
				if(eifDetails.benzipcode!=""){
				 if(eifDetails.benzipcode.length<6)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid Pin/Zip code");
					  $(".loader").fadeOut("slow");
					  return;	
				  }
				}
			}		
		
			
			   
			
		      
		      if(eifDetails.benmobile1!=undefined){
		    	  if(eifDetails.benmobile1!=""){
		    	  if(eifDetails.benmobile1.length<10){
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 1");
				  $(".loader").fadeOut("slow");
				  return;	
			  }  
		    	  }
		    }
		      
			if(eifDetails.benmobile2 != undefined){
				if(eifDetails.benmobile2 != ""){
				if(eifDetails.benmobile2.length<10){
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 2");
				  $(".loader").fadeOut("slow");
			      return;
			  }
			}
			}
			
			
		}
		
		
		
		//check validation for EMERGENCY CONTACT tab
		else if($scope.eiform==4){
			
			
			if(eifDetails.eczipcode!=undefined){
				if(eifDetails.eczipcode!=""){
				 if(eifDetails.eczipcode.length<6)
				  {
					  GlobalModule_notificationService.notification("error","Please enter valid Pin/Zip code");
					  $(".loader").fadeOut("slow");
					  return;	
				  }	
				}
			}		
		
			
		      
		      if(eifDetails.ecmobile1!=undefined){
		    	  if(eifDetails.ecmobile1!=""){
		    	  if(eifDetails.ecmobile1.length<10){
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 1");
				  $(".loader").fadeOut("slow");
				  return;	
			  }  
		    	  }
		    }
		      
			if(eifDetails.ecmobile2 != undefined){
				if(eifDetails.ecmobile2 != ""){
				if(eifDetails.ecmobile2.length<10){
				  GlobalModule_notificationService.notification("error","Please enter valid Cell phone 2");
				  $(".loader").fadeOut("slow");
			      return;
			  }
			}
			
			}
			
		}
		
		
		
		//check validation for DOCUMENTS tab
		else if($scope.eiform==5){
			
			if(eifDetails.user.roleId==1){
			var matchreg="[A-Z]"; 
			var matchnumber=  "^(0|[1-9][0-9]*)$";
			var passNo=eifDetails.passport.passportNo;
			var validp1=passNo.substring(0, 1);
			var validnumbers=passNo.substring(1, 8);
			var passvalidnum=parseInt(validnumbers);
			if(eifDetails.passport.passportNo != undefined   ){
			if(!(validp1.match(matchreg)) || ( eifDetails.passport.passportNo.length != 8) || (validnumbers.length != 7) ){
				 GlobalModule_notificationService.notification("error","Please enter valid passport number");
		         return false;
				}
			}
		}
		}
		
		

	
			//insert values
			 $scope.saveEIFormDetails(eifDetails,buttonid)
		
		
			 $scope.eiformdiv=$('#eifdiv'+$scope.eiform).data("hc_id");
			 $scope.eiform=$scope.eiformdiv+1;
			 console.log($scope.eiform);
			 $scope.redirect($scope.eiform);
}
	

$scope.redirect = function(id) {
	$scope.eiform=id;
	if($scope.eiform==0 || $scope.eiform==1){
		$("#l0").addClass("active");
	}else{
		$("#l0").removeClass("active");
	}
	if($scope.eiform==2){
		$("#l1").addClass("active");
	}else{
		$("#l1").removeClass("active");
	}
	if($scope.eiform==3){
		$("#l2").addClass("active");
	}else{
		$("#l2").removeClass("active");
	}
	if($scope.eiform==4){
		$("#l3").addClass("active");
	}else{
		$("#l3").removeClass("active");
	}
	if($scope.eiform==5){
		$("#l4").addClass("active");
	}else{
		$("#l4").removeClass("active");
	}
	if($scope.eiform==6){
		$("#l5").addClass("active");
	}else{
		$("#l5").removeClass("active");
	}
	if($scope.eiform==7){
		$("#l6").addClass("active");
	}else{
		$("#l6").removeClass("active");
	}

	
}
	
$scope.submitEIForm= function(eifDetails,buttonid) {	
	eifDetails.nationOfBirth = document.getElementById('nationofbirth').value;
	eifDetails.issueByIndia = document.getElementById('issuebyindia').value;
	//eifDetails.nationOfIssue = document.getElementById('nationofissue').value;
	eifDetails.manningagent=document.getElementById('manningagent').value;
	
	
	//check mandatory fields for BIOGRAPHIC DETAILS 
	
	if(eifDetails.user.refNo == undefined || eifDetails.user.refNo == ""){
		$("#cnumber").addClass("red-border");
	}else{
		$("#cnumber").removeClass("red-border");
	}
	
	if(eifDetails.user.gender == undefined || eifDetails.user.gender == ""){
		$("#gender").addClass("red-border");
	}else{
		$("#gender").removeClass("red-border");
	}
	
	if(eifDetails.nationalities == undefined || eifDetails.nationalities == ""){
		$("#nationality").addClass("red-border");
	}else{
		$("#nationality").removeClass("red-border");
	}
	
	if(eifDetails.nationOfBirth == undefined || eifDetails.nationOfBirth == ""){
		$("#nationofbirth").addClass("red-border");
	}else{
		$("#nationofbirth").removeClass("red-border");
	}
	
	if(eifDetails.passport.dateOfBirth == undefined || eifDetails.passport.dateOfBirth == ""){
		$("#dateofbirth").addClass("red-border");
	}else{
		$("#dateofbirth").removeClass("red-border");
	}
	
	if(eifDetails.user.email == undefined || eifDetails.user.email == ""){
		$("#email").addClass("red-border");
	}else{
		$("#email").removeClass("red-border");
	}
	
	
	//check mandatory fields for DEMOGRAPHIC DETAILS 
	
	if(eifDetails.userContact.houseNo == undefined || eifDetails.userContact.houseNo == ""){
		$("#houseno").addClass("red-border");
	}else{
		$("#houseno").removeClass("red-border");
	}
	
	if(eifDetails.userContact.houseName == undefined || eifDetails.userContact.houseName == ""){
		$("#housename").addClass("red-border");
	}else{
		$("#housename").removeClass("red-border");
	}
	
	if(eifDetails.userContact.society == undefined || eifDetails.userContact.society == ""){
		$("#society").addClass("red-border");
	}else{
		$("#society").removeClass("red-border");
	}
	
	if(eifDetails.userContact.pincode == undefined || eifDetails.userContact.pincode == ""){
		$("#pincode").addClass("red-border");
	}else{
		$("#pincode").removeClass("red-border");
	}
	
	if(eifDetails.userContact.street == undefined || eifDetails.userContact.street == ""){
		$("#street").addClass("red-border");
	}else{
		$("#street").removeClass("red-border");
	}
	
	
	if(eifDetails.userContact.countryName == undefined || eifDetails.userContact.countryName == ""){
		$("#country").addClass("red-border");
	}else{
		$("#country").removeClass("red-border");
	}
	
	
	if(eifDetails.userContact.state.stateName == undefined || eifDetails.userContact.state.stateName == ""){
		$("#state").addClass("red-border");
	}else{
		$("#state").removeClass("red-border");
	}
	
	if(eifDetails.userContact.city.cityName == undefined || eifDetails.userContact.city.cityName == ""){
		$("#city").addClass("red-border");
	}else{
		$("#city").removeClass("red-border");
	}
	
	
	if(eifDetails.homeairport == undefined || eifDetails.homeairport == ""){
		$("#homeairport").addClass("red-border");
	}else{
		$("#homeairport").removeClass("red-border");
	}
	
	if(eifDetails.userContact.phoneNumber == undefined || eifDetails.userContact.phoneNumber == ""){
		$("#phonenumber").addClass("red-border");
	}else{
		$("#phonenumber").removeClass("red-border");
	}
	
	if(eifDetails.userContact.altPhoneNumber == undefined || eifDetails.userContact.altPhoneNumber == ""){
		$("#phonenumber2").addClass("red-border");
	}else{
		$("#phonenumber2").removeClass("red-border");
	}
	
	
	
	
	//check mandatory fields for EMERGENCY CONTACT 
	if(eifDetails.ecsurname == undefined || eifDetails.ecsurname == ""){
		$("#ecsurname").addClass("red-border");
	}else{
		$("#ecsurname").removeClass("red-border");
	}
	
	
	
	if(eifDetails.ecname == undefined || eifDetails.ecname == ""){
		$("#ecname").addClass("red-border");
	}else{
		$("#ecname").removeClass("red-border");
	}
	
	

	if(eifDetails.ecrelation == undefined || eifDetails.ecrelation == ""){
		$("#relationship").addClass("red-border");
	}else{
		$("#relationship").removeClass("red-border");
	}
	
	if(eifDetails.echouse_no == undefined || eifDetails.echouse_no == ""){
		$("#echouse").addClass("red-border");
	}else{
		$("#echouse").removeClass("red-border");
	}
	
	if(eifDetails.ecbuilding == undefined || eifDetails.ecbuilding == ""){
		$("#ecbulding").addClass("red-border");
	}else{
		$("#ecbulding").removeClass("red-border");
	}
	
	if(eifDetails.ecsociety == undefined || eifDetails.ecsociety == ""){
		$("#ecsociety").addClass("red-border");
	}else{
		$("#ecsociety").removeClass("red-border");
	}
	
	if(eifDetails.eczipcode == undefined || eifDetails.eczipcode == ""){
		$("#ecpincode").addClass("red-border");
	}else{
		$("#ecpincode").removeClass("red-border");
	}
	
	if(eifDetails.ecstreet == undefined || eifDetails.ecstreet == ""){
		$("#ecstreet").addClass("red-border");
	}else{
		$("#ecstreet").removeClass("red-border");
	}
	
	if(eifDetails.eccountry == undefined || eifDetails.eccountry == ""){
		$("#eccountry").addClass("red-border");
	}else{
		$("#eccountry").removeClass("red-border");
	}
	
	if(eifDetails.ecstate == undefined || eifDetails.ecstate == ""){
		$("#ecstate").addClass("red-border");
	}else{
		$("#ecstate").removeClass("red-border");
	}
	
	if(eifDetails.eccity == undefined || eifDetails.eccity == ""){
		$("#eccity").addClass("red-border");
	}else{
		$("#eccity").removeClass("red-border");
	}
	
	
	if(eifDetails.ecmobile1 == undefined || eifDetails.ecmobile1 == ""){
		$("#ecmobile1").addClass("red-border");
	}else{
		$("#ecmobile1").removeClass("red-border");
	}
	
	
	if(eifDetails.ecmobile2 == undefined || eifDetails.ecmobile2 == ""){
		$("#ecmobile2").addClass("red-border");
	}else{
		$("#ecmobile2").removeClass("red-border");
	}
	
	
	//check mandatory fields for DOCUMENTS 
	
	if(eifDetails.passport.passportNo == undefined || eifDetails.passport.passportNo == ""){
		$("#passportno").addClass("red-border");
	}else{
	$("#passportno").removeClass("red-border");
	}
	
	if(eifDetails.passport.dateOfIssue == undefined || eifDetails.passport.dateOfIssue == ""){
	$("#dateofissue").addClass("red-border");
	}else{
	$("#dateofissue").removeClass("red-border");
	}
	
	if(eifDetails.passport.expiryDate == undefined || eifDetails.passport.expiryDate == ""){
		$("#expirydate").addClass("red-border");
	}else{
	$("#expirydate").removeClass("red-border");
	}
	
	if(eifDetails.passport.placeOfIssue == undefined || eifDetails.passport.placeOfIssue == ""){
		$("#placeofissue").addClass("red-border");
	}else{
	$("#placeofissue").removeClass("red-border");
	}
	
	if(eifDetails.passport.countryOfissue == undefined || eifDetails.passport.countryOfissue == ""){
		$("#nationofissue").addClass("red-border");
	}else{
		$("#nationofissue").removeClass("red-border");
	}
	
	
	
	
	
	
	//Check the checkboxes checked are not
	/*if(eifDetails.cnumber==false || eifDetails.checkposition==false || eifDetails.checkbrand==false || eifDetails.dateofhire==false || eifDetails.surname==false || eifDetails.givenname==false
		|| eifDetails.gender==false || eifDetails.dateofbirth==false || eifDetails.checkmanningagent==false || eifDetails.dd_house_no==false || eifDetails.dd_building==false 
		|| eifDetails.dd_society==false || eifDetails.dd_zip_code==false || eifDetails.dd_street==false || eifDetails.dd_city==false ||  eifDetails.dd_state==false 
		|| eifDetails.dd_country==false || eifDetails.dd_cell_phone_1==false || eifDetails.email==false)	{
		
		GlobalModule_notificationService.notification("error","Please check all the check boxes");
		return false;
	}*/
	
	if($scope.roleId == 1){
		if(eifDetails.passport.lastName ==  undefined && eifDetails.passport.firstName == undefined){
			GlobalModule_notificationService.notification("error","Please enter either firstname or lastname");
			return false;
		}
		
		if(eifDetails.passport.lastName.trim() ==  "" && eifDetails.passport.firstName.trim() == ""){
			GlobalModule_notificationService.notification("error","Please enter either firstname or lastname");
			return false;
		}
		
		if(eifDetails.passport.lastName.trim() ==  "" && eifDetails.passport.firstName == undefined){
			GlobalModule_notificationService.notification("error","Please enter either firstname or lastname");
			return false;
		}
		
		if(eifDetails.passport.lastName ==  undefined && eifDetails.passport.firstName.trim() == ""){
			GlobalModule_notificationService.notification("error","Please enter either firstname or lastname");
			return false;
		}
	}
	
	if(eifDetails.user.refNo == undefined || eifDetails.user.refNo == "" 
	|| eifDetails.user.gender == undefined || eifDetails.user.gender == "" 
	|| eifDetails.nationalities == undefined || eifDetails.nationalities == "" 
	|| eifDetails.nationOfBirth == undefined || eifDetails.nationOfBirth == "" 
	|| eifDetails.passport.dateOfBirth == undefined || eifDetails.passport.dateOfBirth == "" 
	|| eifDetails.user.email == undefined || eifDetails.user.email == "" 
	|| eifDetails.userContact.houseNo == undefined || eifDetails.userContact.houseNo == "" 
	|| eifDetails.userContact.houseName == undefined || eifDetails.userContact.houseName == "" 
	|| eifDetails.userContact.society == undefined || eifDetails.userContact.society == "" 
	|| eifDetails.userContact.pincode == undefined || eifDetails.userContact.pincode == "" 
	|| eifDetails.userContact.street == undefined || eifDetails.userContact.street == "" 
	|| eifDetails.userContact.city.cityName == undefined || eifDetails.userContact.city.cityName == "" 
	|| eifDetails.userContact.state.stateName == undefined || eifDetails.userContact.state.stateName == "" 
	|| eifDetails.userContact.countryName == undefined || eifDetails.userContact.countryName == "" 
	|| eifDetails.homeairport == undefined || eifDetails.homeairport == "" 
	|| eifDetails.userContact.phoneNumber == undefined || eifDetails.userContact.phoneNumber == "" 
	|| eifDetails.userContact.altPhoneNumber == undefined || eifDetails.userContact.altPhoneNumber == "" 
	|| eifDetails.ecsurname == undefined || eifDetails.ecsurname == "" 
	|| eifDetails.ecname == undefined || eifDetails.ecname == "" 
	|| eifDetails.ecrelation == undefined || eifDetails.ecrelation == "" 
	|| eifDetails.echouse_no == undefined || eifDetails.echouse_no == "" 
	|| eifDetails.ecbuilding == undefined || eifDetails.ecbuilding == "" 
	|| eifDetails.ecsociety == undefined || eifDetails.ecsociety == ""  
	|| eifDetails.eczipcode == undefined || eifDetails.eczipcode == "" 
	|| eifDetails.ecstreet == undefined || eifDetails.ecstreet == "" 
		/*	|| eifDetails.eccity == undefined || eifDetails.eccity == "" 
	|| eifDetails.ecstate == undefined || eifDetails.ecstate == "" 
	|| eifDetails.eccountry == undefined || eifDetails.eccountry == "" */
	|| eifDetails.ecmobile1 == undefined || eifDetails.ecmobile1 == "" 
	|| eifDetails.ecmobile2 == undefined || eifDetails.ecmobile2 == "" 
	|| eifDetails.passport.passportNo == undefined || eifDetails.passport.passportNo == "" 
	|| eifDetails.passport.dateOfIssue == undefined || eifDetails.passport.dateOfIssue == "" 
	|| eifDetails.passport.expiryDate == undefined || eifDetails.passport.expiryDate == ""  
	|| eifDetails.passport.placeOfIssue == undefined || eifDetails.passport.placeOfIssue == ""
	|| eifDetails.passport.countryOfissue == undefined || eifDetails.passport.countryOfissue == ""){
		
		
		GlobalModule_notificationService.notification("error","Please fill all mandatory fields.\n Please enter either firstname or lastname");
		return false;
		
	}
	
	
	
	
	
	
	//insert values
	$scope.saveEIFormDetails(eifDetails,buttonid)

}

		
		
		
		
		
		
	
	
$scope.saveEIFormDetails= function(eifDetails,buttonid) {	
		
		$(".loader").show();
		
	
		
		
	
		var input = document.getElementById('educationalfile');
		if((input.value!= "" && input.value != undefined)){
		 
		var file = input.files[0];
		//  var file = $scope.input;
			var formData = new FormData();
			formData.append("file",file);
			
			
			$.ajax({
				url: 'rest/eif/upload/educationaldocument',
				type: 'POST',
				data: formData,
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returndata) {
					$scope.filedtailsForDocument=JSON.parse(returndata);
					eifDetails.highesteducation=$scope.filedtailsForDocument.fileURL;
					
					
					EIForm_Service.saveEIFormDetails(eifDetails,$scope.userId,$scope.roleId,buttonid,$scope.senderid).then(function(response){
						  $scope.savedetails = response.data;
						  if( buttonid==1){
							  if($scope.savedetails == "success"){
							  GlobalModule_notificationService.notification("success","Your Details have been submitted successfully");  
							  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again"); 
							  }
					}
						  if( buttonid==3){
							EIForm_Service.sendtoMistral(eifDetails.userid).then(function(response){
								if(response.data == 200){
									GlobalModule_notificationService.notification("success","Request sent successfully"); 
								}else{
									GlobalModule_notificationService.notification("error","Request failed, Check Integration Report"); 
								}
							});//Details Sending to mistral
							$state.reload();
						}
					  },function(response){	
							$(".loader").fadeOut("slow");	
						  
						});
				
				}

			

		});
		}
		else{
		
		
		
		EIForm_Service.saveEIFormDetails(eifDetails,$scope.userId,$scope.roleId,buttonid,$scope.senderid).then(function(response){
			  $scope.savedetails = response.data;
			  
			  if( buttonid==1){                   //Details Submitted by admin or candidate
				  if($scope.savedetails == "success"){
				  GlobalModule_notificationService.notification("success","Your Details have been submitted successfully");  
				  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again"); 
				  }
			  }
			  
			  if( buttonid==3){
				EIForm_Service.sendtoMistral(eifDetails.userid).then(function(response){
					if(response.data == 200){
						GlobalModule_notificationService.notification("success","Request sent successfully"); 
					}else{
						GlobalModule_notificationService.notification("error","Request failed, Check Integration Report"); 
					}
					$state.reload();
				});          //Details Sending to mistral
			  }
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			})
		}
		
		$(".loader").fadeOut("slow");	
	};	

$scope.previous= function(eifDetails) {	
		
		$(".loader").show();
	
		$scope.eiform=$scope.eiform-1;
		console.log($scope.eiform);
		 $scope.redirect($scope.eiform);
		$(".loader").fadeOut("slow");	
	};
	
	
	
$scope.previewEIForm= function(eifDetails,id) {	
		
		$(".loader").show();
		
		
		EIForm_Service.previewEIFormDetails(eifDetails,$scope.userId,$scope.roleId).then(function(response){
			  $scope.pdfdetailspath = response.data;
			 
			 console.log($scope.pdfdetailspath);
			$scope.PreviewDocument($scope.pdfdetailspath,id);
			 
		
			 
				$(".loader").fadeOut("slow");	
		  },function(response){	
				$(".loader").fadeOut("slow");	
			  
			});
		
		$(".loader").fadeOut("slow");	
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
	
		$scope.PreviewDocument = function(path,id){
			   
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
					if(id==1){
							 $scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
							 console.log($scope.pdfDocPath);
					}
					if(id==2){
							$scope.eifPdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
							console.log($scope.eifPdfDocPath);
					}
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
		
		 $scope.validateDate1 = function(eif){  //---------validate issue date and expiry date	
			 
		        if ( new Date(stringToDate(eif.passport.dateOfIssue,"dd-mm-yyyy","-")) > new Date(stringToDate(eif.passport.expiryDate,"dd-mm-yyyy","-")) ) { 
		           			
		        //	eif.passport.expiryDate='';
		         //  $scope.eifdetails.passport.expiryDate='';
				   GlobalModule_notificationService.notification("error","You seem to have entered a date from the future.Please enter the correct date");							   
		        	//$('#'+element).val(null);
		            return false;
		        }
		        return true;
		        
	   };
	   
		  $scope.dateFormat = function(data){  
				 
			   var letterNumber = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
				 if(!data.match(letterNumber)) {
					 GlobalModule_notificationService.notification("error","Invalid date");							   
			        	return;
				 };
			   
		   }
		
		 $scope.dateBirthcheck= function(dob,eif){
			
             var dateParts1 = dob.split('-');
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
            	 //eif.passport.dateOfBirth = '';
            	// $scope.eifdetails.passport.dateOfBirth = '';
            	 GlobalModule_notificationService.notification("error","Please enter proper date of birth");
               return;
             }
             
             
		  };
		
	
	
	 $scope.formatDate = function(date){
		 if(date != null || date == ' ' || date != undefined)
         {
			 //var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
			 var dateOut = moment(date).format("DD-MM-YYYY");
	         return dateOut;
         }
		 return;
   };
	
   $scope.sendtoMistral = function(eifDetails,id){
			
		$scope.submitEIForm(eifDetails,id);
		//EIForm_Service.sendtoMistral(eifDetails.userid);
	}
   
   $scope.sendtoCandidate = function(status){
	  /* if($scope.count==0){
			GlobalModule_notificationService.notification("error","Please enter Comment");
			$scope.count++
			return false;
	   }*/
	 /*  var comments=document.getElementById('comment').value;
	   if(comments==undefined || comments ==""){
			GlobalModule_notificationService.notification("error","Please enter Comment");
			return false;
	   }*/
	   
	   
	   EIForm_Service.sendtoCandidate($scope.roleId,$scope.userId,$scope.senderid,status).then(function(response){
		  $scope.status = response.data;
		  if($scope.status == "success"){
			 // $('#eif-comment-admin').modal('hide');
			  GlobalModule_notificationService.notification("success","Resend to candidate successfully");  
		  }else{
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again"); 
		  }
		  $(".loader").fadeOut("slow");	
	  },function(response){	
			$(".loader").fadeOut("slow");	
		  
		});
	
	
	
   };
   
   
	

   
   
   $scope.fileNameChanged = function(element)
	{
				  
		//var index = angular.element(element).scope().$index;
		$scope.input = document.getElementById('educationalfile');			   
		if($scope.input.value!="")
		{						
			var filename=$scope.input.value;
			filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
			$('#edufilepath').val(filename);				
		}
	};
   
   /*		if($scope.eiform==7){
	
	
	
	
	
	
	if(eifDetails.user.refNo == undefined && eifDetails.user.refNo == "" && eifDetails.user.gender == undefined && eifDetails.user.gender == "" &&	eifDetails.nationalities == undefined 
		&& eifDetails.nationalities == "" && eifDetails.nationOfBirth == undefined && eifDetails.nationOfBirth == "" && eifDetails.passport.dateOfBirth == undefined && eifDetails.passport.dateOfBirth == "" 
		&& eifDetails.user.email == undefined && eifDetails.user.email == "" && eifDetails.userContact.houseNo == undefined && eifDetails.userContact.houseNo == "" && eifDetails.userContact.houseName == undefined 
		&& eifDetails.userContact.houseName == "" && eifDetails.userContact.society == undefined && eifDetails.userContact.society == "" && eifDetails.userContact.pincode == undefined 
		&& eifDetails.userContact.pincode == "" && eifDetails.userContact.street == undefined &&  eifDetails.userContact.street == ""  && eifDetails.userContact.city.cityName == undefined 
		&&  eifDetails.userContact.city.cityName == "" && eifDetails.userContact.state.stateName == undefined &&  eifDetails.userContact.state.stateName == "" && eifDetails.userContact.countryName == undefined 
		&& eifDetails.userContact.countryName == "" &&  eifDetails.homeairport == undefined && eifDetails.homeairport == ""  && eifDetails.userContact.phoneNumber == undefined && eifDetails.userContact.phoneNumber == ""   
		&& eifDetails.userContact.altPhoneNumber == undefined && eifDetails.userContact.altPhoneNumber == "" && eifDetails.ecsurname == undefined && eifDetails.ecsurname == "" && eifDetails.ecname == undefined && eifDetails.ecname == "" 
		&& eifDetails.ecrelation == undefined && eifDetails.ecrelation == "" && eifDetails.echouse_no == undefined && eifDetails.echouse_no == "" &&eifDetails.ecbuilding == undefined && eifDetails.ecbuilding == ""   
		&& eifDetails.ecsociety == undefined &&  eifDetails.ecsociety == ""  &&eifDetails.eczipcode == undefined &&  eifDetails.eczipcode == "" && eifDetails.ecstreet == undefined &&  eifDetails.ecstreet == ""   
		&& eifDetails.eccity == undefined &&  eifDetails.eccity == ""   && eifDetails.ecstate == undefined &&  eifDetails.ecstate == ""   && eifDetails.eccountry == undefined && eifDetails.eccountry == ""   
		&& eifDetails.ecmobile1 == undefined && eifDetails.ecmobile1 == "" && eifDetails.ecmobile2 == undefined && eifDetails.ecmobile2 == ""  && eifDetails.passport.passportNo == undefined && eifDetails.passport.passportNo == ""
		&& eifDetails.passport.dateOfIssue == undefined && eifDetails.passport.dateOfIssue == "" && eifDetails.passport.expiryDate == undefined && eifDetails.passport.expiryDate == "" 
		&& eifDetails.passport.placeOfIssue == undefined && eifDetails.passport.placeOfIssue == "" && eifDetails.nationOfIssue == undefined && eifDetails.nationOfIssue == ""){
		
		
		$scope.submitbutton = "true";
		
			}
			
			
			
		}*/
   

}]);

