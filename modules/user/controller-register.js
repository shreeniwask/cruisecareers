'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Register_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS','UserJobFair_Service','Userwalkin_Service', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS,UserJobFair_Service,Userwalkin_Service){

	$scope.error=$stateParams.error;

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	
	$scope.copydata = $rootScope.userdetails;
	$scope.userProfile = GlobalModule_dataStoreService.loadData('LoginModule','userProfile');	
	$scope.activity={};
	$scope.activeJobfairCount=0;
	$scope.activeWalkinCount=0;
	$scope.activeOnClickJourneyLogs=false;
	

	//$scope.notificationflag = false;
	$scope.getRegister = function(user){   

		$(".loader").show();

		Login_Service.isEmailPresent(user.email).then(function(response){
			$scope.flag = response.data;
			if($scope.flag == true){
				// GlobalModule_notificationService.notification("success","THis Email Id is already registered with us.");

				GlobalModule_notificationService.notification("success","We think you have already registered with us. Use 'Forgot Password' to reset your account.");
				$scope.user.email ="";
				$(".loader").fadeOut("slow");
			} 
			else
			{
				if(user.password != $scope.cofirmpassword){
					GlobalModule_notificationService.notification("error","Password not Matched");
					$scope.cofirmpassword = "";
					$(".loader").fadeOut("slow");
				}
				else{

					if($scope.emailFlag != true){
						user.userRegistrationUsing = 1;
						Login_Service.getRegister(user).then(function(response){
							//GlobalModule_notificationService.notification("success","Woo Hoo! You have successfully registered! Look out for the activation link in your email.");
							$scope.successresult=response.data;
							if($scope.successresult == "success"){
							$("#registration").modal('show');
							//$state.go("login");
							//GlobalModule_User_activityService.addUserActivity(user);
							$(".loader").fadeOut("slow");
							

							$scope.user ={};
							//$scope.user.tnc=false;
							$scope.cofirmpassword = "";
							}else{
								GlobalModule_notificationService.notification("success","We think you have already registered with us. Use 'Forgot Password' to reset your account.");
								$scope.user.email ="";
								$(".loader").fadeOut("slow");
							}


						

						},function(response){
							GlobalModule_notificationService.notification("error","Uh Oh! Error in User Registration. Please try again.");
							$(".loader").fadeOut("slow");
						});
					}
				};	 
			}
		});
	};
	
	$scope.buttonFlag=false;
	//storage.setItem(buttonFlag,checkbox);
	$scope.setbuttonFlag =function(checkbox){
		
		/*if(localStorage.getItem('buttonFlag')){
			$scope.buttonFlag = localStorage.getItem('buttonFlag');
		}
		else{
		    buttonFlag = false;
		}*/
		if(checkbox == true){
			$scope.buttonFlag=true;
		}else{
			$scope.buttonFlag=false;
		}
	};

	$scope.isEmailPresent = function(email){ alert(email);
	Login_Service.isEmailPresent(email).then(function(response){
		$scope.flag = response.data;
		if($scope.flag == true){
			// GlobalModule_notificationService.notification("success","THis Email Id is already registered with us.");

			GlobalModule_notificationService.notification("success","We think you have already registered with us. Use 'Forgot Password' to reset your account.");
			$scope.user.email ="";
		} 

	});


	};
 
	$scope.resendActivationLink = function(email){
		$(".loader").show();
		var emailid = GlobalModule_dataStoreService.loadData('LoginModule','emailforactivationlink');
		
		Login_Service.resendActivationLink(emailid).then(function(response){
			$scope.flag = response.data;
			if($scope.flag == true){
				GlobalModule_notificationService.notification("success","Activation link email send successfully");
				$(".loader").fadeOut("slow");
				
			} 

		});
	}
	
	$scope.getLogin = function(user){
		$scope.userid_activationlink="";
		$scope.LoginCredentials = user;
		GlobalModule_dataStoreService.storeData('LoginModule','emailforactivationlink',user.email);
		$(".loader").show();
		Login_Service.getLogin(user).then(function(response){
			if(response.status==200){
				$scope.user = response.data;
				console.log($scope.user);
				if($scope.user.isactivecheck == "Inactive"){
					$('#resendactivationlink').modal('show');
					$(".loader").fadeOut("slow");
					return;
				}
				GlobalModule_dataStoreService.storeData('LoginModule','user',$scope.user);		
				$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
				GlobalModule_dataStoreService.storeData('LoginModule','notificationflag',true);
				GlobalModule_dataStoreService.setCookie(APP_CONSTANTS.ACCESS_TOKEN,response.data.accessToken,1);
			   $scope.loginfrom =GlobalModule_dataStoreService.loadData('LoginModule','loginfrom');
				
				 if($scope.user == 'null'||$scope.user == null){
					GlobalModule_notificationService.notification("error","Oh no! The Username and Password seems to be wrong. Please try again.");
					$route.reload();
					$(".loader").fadeOut("slow");
				}else{
					$(".loader").fadeOut("slow");
					if($scope.loginfrom != "loginfromjobfair" && $scope.loginfrom != "loginfromwalkins"){
					if($scope.user.changePasswordFlag == false){
						$state.go("changepassword");	
					}else{
					if($scope.user.roleId ==1 || $scope.user.roleId == 10)
					{							
						$state.go("restricted.admin.admindashboard");					
					}
					else if($scope.user.roleId == 8 || $scope.user.roleId == 12){

						$state.go("restricted.admin.ownerdashboarddetails");
					}
					else if($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8)
					{
						$state.go("restricted.admin.approverdashboard");						
					}else if($scope.user.roleId == 9){
						$state.go("restricted.admin.consulateverification");
					}
					else
					{	
						GlobalModule_dataStoreService.storeData('LoginModule','isselected',false);
						GlobalModule_dataStoreService.storeData('LoginModule','isEIFNotified',false);
						var promise = Login_Service.getEmpStatus($scope.user.id).then(function(response){
							//GlobalModule_dataStoreService.storeData('LoginModule','empstatus',$scope.);
							if(response.data != null){
							GlobalModule_dataStoreService.storeData('LoginModule','eifstatus',response.data.eif_status_id);
							GlobalModule_dataStoreService.storeData('LoginModule','isselected',true);
							$state.go("restricted.dashboard");
							}
							else{
								GlobalModule_dataStoreService.storeData('LoginModule','isselected',false);
								$state.go("restricted.dashboard");
							}
						});
						/*promise.then(function(){
							
						});	*/		  
					}
					}
					
					}else{
						$state.go("restricted.user_job_fair");	
						
						GlobalModule_dataStoreService.storeData('LoginModule','loginfrom',undefined);
					}
					if($scope.loginfrom == "loginfromwalkins"){
						
						$state.go("restricted.user_walkin");	
						
						GlobalModule_dataStoreService.storeData('LoginModule','loginfrom',undefined);
					}
				}
			}
			$(".loader").fadeOut("slow");
		},function(response){
			if(response.status==404){
				GlobalModule_notificationService.notification("error","Oh no! The Username and Password seems to be wrong. Please try again.");
			}
			$(".loader").fadeOut("slow");
		});	
	};	  
	GlobalModule_dataStoreService.storeData('LoginModule','Validateuser',false);
	
	
	
	
	
	$scope.getUserContactByEmailId = function(email){
		Login_Service.getUserContactByEmailId(email).then(function(response){	    		 
			$scope.usercontact = response.data;
			if($scope.usercontact.active==-1){
				
			}else{
			$scope.usermobno=$scope.usercontact.phoneNumber;
			GlobalModule_dataStoreService.storeData('LoginModule','usermobno',$scope.usermobno);
			console.log($scope.usercontact);
			}
		});
	};
	
	
	
	$scope.forgetPassword = function(u){
		$(".loader").show();
		if(u == undefined){
			GlobalModule_notificationService.notification("error","Please enter email id.");
			$(".loader").fadeOut("slow");
			return;
		}
		if(u.email == "" || u.email == undefined){
			GlobalModule_notificationService.notification("error","Please enter email id.");
			$(".loader").fadeOut("slow");
			return;
		}
		$scope.useremailid=u.email;
		$(".loader").show();
		Login_Service.forgetPassword(u).then(function(response){			
			$(".loader").fadeOut("slow");
			$scope.userstatus = response.data;
		    if($scope.userstatus == false){
			GlobalModule_notificationService.notification("error","We can't seem to locate your email. Looks like you haven't registered with us. Please 'Sign-Up'.");
			return;
		    }else{
		    	$scope.getUserContactByEmailId($scope.useremailid);
		    	GlobalModule_dataStoreService.storeData('LoginModule','useremailid',$scope.useremailid);
		    	
		    	
		    	GlobalModule_dataStoreService.storeData('LoginModule','Validateuser',true)
		    	$state.go("chooseopts");		
		    }
			$scope.activity.activityid=6;
			if($rootScope.userdetails.id==0){
			    		$rootScope.userdetails=undefined;
			    	}else{
					$scope.activity.userid=$rootScope.userdetails.id;
			    	}
			GlobalModule_User_activityService.addUserActivity($scope.activity);
			//$state.go("login");

		},function(response){
			GlobalModule_notificationService.notification("error","We can't seem to locate your email. Looks like you haven't registered with us. Please 'Sign-Up'.");
			$(".loader").fadeOut("slow");
		});
	};
   
	
	
	
	window.fbAsyncInit = function() {
		// FB JavaScript SDK configuration and setup
		FB.init({
			appId      : $scope.propertiesList.fb_app_id, // FB App ID
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.8' // use graph api version 2.8
		});

		// Check whether the user already logged in
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				//display user data
				if(getCookie('ACCESS_TOKEN')){
					if($rootScope.userdetails!=null&&$rootScope.userdetails!=undefined&&$rootScope.userdetails!='null'&&$rootScope.userdetails!=''){ 

					}else{
						$scope.getFbUserData();
					}
				}else{
					$scope.getFbUserData();
				}
			}
		});
	};

	$scope.fetchconfigproperties = function(){
		Login_Service.fetchconfigproperties($scope.user).then(function(response){	    		 
			$scope.propertiesList = response.data;	
			//console.log($scope.propertiesList);
		});
	};
	$scope.fetchconfigproperties();
	// Load the JavaScript SDK asynchronously

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));



	// Facebook login with JavaScript SDK
	$scope.fbLogin = function() {
		FB.login(function (response) {
			if (response.authResponse) {
				// Get and display the user profile data
				$scope.getFbUserData();
			} else {
				//document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
			}
		}, {scope: 'email'});
	};

	// Fetch the user profile data from facebook
	$scope.getFbUserData = function(){
		FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,gender'},
				function (response) {    	
			$scope.user ={};
			$scope.user.firstName = response.first_name;
			$scope.user.lastName = response.last_name;
			$scope.user.userRegistrationUsing = 2;
			$scope.user.uniqueIdentification = response.id;
			$scope.user.email=response.email;
			Login_Service.registerSocialLogin($scope.user).then(function(response){	    		 
				$scope.resgisteredUser = response.data;
				GlobalModule_dataStoreService.setCookie(APP_CONSTANTS.ACCESS_TOKEN,response.data.accessToken,1);

				if($scope.resgisteredUser != undefined && $scope.resgisteredUser != null && $scope.resgisteredUser.id>0){
					$state.go("restricted.dashboard");
					GlobalModule_dataStoreService.storeData('LoginModule','user',$scope.resgisteredUser);
				}

			},function(response){

			});
			/*  document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
		        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
		        document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
			 */ });
	};

	// Logout from facebook
	$scope.fbLogout = function() {
		FB.logout(function() {		       
		});
		$state.go("home");
	};		

	$scope.UserGoogleRegistration=function(profile){

		$scope.userEmail ={};
		$scope.userEmail.firstName = profile.getGivenName();
		$scope.userEmail.lastName = profile.getFamilyName();
		$scope.userEmail.userRegistrationUsing = 3;
		$scope.userEmail.uniqueIdentification = profile.getId();
		$scope.userEmail.email = profile.getEmail();	    	


		Login_Service.isEmailPresent($scope.userEmail.email).then(function(response){
			$scope.flag = response.data;

			if($scope.flag == true){
				// GlobalModule_notificationService.notification("success","THis Email Id is already registered with us.");

				GlobalModule_notificationService.notification("success","We think you have already registered with us. Use 'Forgot Password' to reset your account.");
			}
			else
			{
				if(!$scope.flag)
				{
					Login_Service.registerSocialLogin($scope.userEmail).then(function(response){	    		 
						$scope.resgisteredUserEmail = response.data;
						GlobalModule_dataStoreService.setCookie(APP_CONSTANTS.ACCESS_TOKEN,response.data.accessToken,1);

						//console.log($scope.resgisteredUserEmail);
						if($scope.resgisteredUserEmail != undefined && $scope.resgisteredUserEmail != null && $scope.resgisteredUserEmail.id>0){
							$state.go("restricted.dashboard");
							GlobalModule_dataStoreService.storeData('LoginModule','user',$scope.resgisteredUserEmail);
						} 
					});
				}
			}	
		});			
	}; 

	$scope.checkLogin = function(id){		

		GlobalModule_dataStoreService.storeData('LoginModule','LoginFromFlag',id);			 
	};



	$scope.GmailsignOut = function() {			
		var win;
		win = window.open("http://accounts.google.com/logout", "something", "width=550,height=570");			
		setTimeout(function(){  win.close(); }, 4000);

	};	


	$scope.logoutAdmin = function(){

		GlobalModule_dataStoreService.storeData('LoginModule','user',undefined);
		GlobalModule_dataStoreService.logout();
		$state.go("home");			  
	};

	$scope.findJobs = function(){
		$state.go("job_result");

	};
	$scope.fetchMyApplications = function(){
		Profile_Service.fetchMyApplications($rootScope.userdetails.id).then(function(response){
			$rootScope.myApplications = response.data;
			//console.log($rootScope.myApplications);
			if($rootScope.myApplications.length>0){
           for(var i=0;i<1;i++){
				if($rootScope.myApplications[i].candidatejourneystatuslog != undefined){
				for(var k=0;k<$rootScope.myApplications[i].candidatejourneystatuslog.length;k++){
					
					if($rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Applied" ||
					  // $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Selected" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Hold" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Shortlisted" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Pending Brand Approval" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Assessment Assigned" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Assessment Completed" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Interview Scheduled" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Interview Completed" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Peer Review Ready" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Peer Review Started" ||
					   $rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="" ){
						$rootScope.myApplications[i].candidatejourneystatuslog[k].tab="";
						
					}else if($rootScope.myApplications[i].candidatejourneystatuslog[k].status_name=="Selected"){
						$rootScope.myApplications[i].candidatejourneystatuslog[k].tab="passedStatus";
					}
					else{
						$rootScope.myApplications[i].candidatejourneystatuslog[k].tab="failedStatus";
						
					}			
				}	
				}
			}
			}
	
			$state.go("restricted.myapplication");
		},function(response){				 
		});
	};
	//$scope.fetchMyApplications();

	$scope.checkStatus=function(){			  
		Profile_Service.fetchAppliedStatus($rootScope.userdetails.id).then(function(response){			  		
			$scope.statusflag= false;
			$scope.statusflag = response.data;
			if($scope.statusflag == true && $rootScope.userdetails.roleId == 2)
			{
				$scope.statusflag = true;
			}
			else if($scope.statusflag == true && $scope.userdetails.roleId == 3)
			{	
				$scope.statusflag=false;
			}
			return $rootScope.statusflag;				  				   				  
		});
	};  

	// for setting deactivate user comment comment
	$scope.reason="";
	$scope.removeMe = function(reason){
		$(".loader").show();

		if(reason == null || reason == undefined || reason == "" ||    reason.lenght == 0){
			GlobalModule_notificationService.notification("error","Reason should not be empty.");
		}else{
			$rootScope.userdetails.emailTemplate=reason;
			Profile_Service.deactivateAccount($rootScope.userdetails).then(function(response){
				GlobalModule_notificationService.notification("success","Your request sent for deactivation  successfully");

				$(".loader").fadeOut("slow");
				//$state.go("login");
				$scope.reason="";
			},function(response){
				$(".loader").fadeOut("slow");
				$scope.reason="";
			});
			$("#purgeConfm").modal('hide');
		}
		$(".loader").fadeOut("slow");

	};

	$scope.resetComment= function(){
		$scope.reason="";
	};

	$scope.checkToLogOut = function(){		   

		$scope.CheckFromFlag = GlobalModule_dataStoreService.loadData('LoginModule','LoginFromFlag');

		if($scope.CheckFromFlag == 1)//fb
		{
			$scope.fbLogout();
			$scope.logout();
		}
		if($scope.CheckFromFlag == 2)//gmail
		{   
			$scope.GmailsignOut();
			$scope.logout();
		}

		if($scope.CheckFromFlag == 0)//normal login
		{
			$scope.logout();
		}
	};


	/*$scope.deActivateAccount2 = function(){	
		$(".loader").show();

		Profile_Service.deactivateAccount($rootScope.userdetails).then(function(response){

			GlobalModule_notificationService.notification("success","Your Account Deactivated Successfully");

			$(".loader").fadeOut("slow");
			$state.go("login");

			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});

		Profile_Service.deactivateAccount($rootScope.userdetails).then(function(response){			  		
			GlobalModule_notificationService.notification("success","Your Account Deactivated Successfully");

			$(".loader").fadeOut("slow");
			$state.go("login");
		});

	}*/



	$scope.logout = function(){			  			 
		Login_Service.logout($rootScope.userdetails);
		GlobalModule_dataStoreService.storeData('LoginModule','user',undefined);
		GlobalModule_dataStoreService.logout();
	};

	$scope.propertylist = function(){		

		GlobalModule_dataStoreService.storeData('LoginModule','propertiesList',$scope.propertiesList);			 
	};

	
	
	$scope.getActiveJobfairCount=function(){

		var walkinflag=false;
		UserJobFair_Service.getActiveJobfairCount().then(function(response){

			$scope.activeJobfairCount1 = response.data;

			$scope.activeJobfairCount=$scope.activeJobfairCount1;
			console.log($scope.activeJobfairCount);

		},function(response){

			$(".loader").fadeOut("slow");

		});		
	};
	if($scope.activeJobfairCount ==0)
	{
		$scope.getActiveJobfairCount();
	}

	
	$scope.getActivewalkinCount=function(){
		
		var walkinflag=true;
		Userwalkin_Service.getActiveWalkinCount().then(function(response){

			$scope.activewalkinCount1 = response.data;

			$scope.activewalkinCount=$scope.activewalkinCount1;
			console.log($scope.activewalkinCount);

		},function(response){

			$(".loader").fadeOut("slow");

		});		
	};
	if($scope.activeWalkinCount ==0)
	{
		$scope.getActivewalkinCount();
	}

	
	
	$scope.goTOLogin=function()
	{
		$("#registration").modal('hide');
		$('.modal-backdrop').remove();
		$state.go("login");
	};
	
	//-------------------------------change application status Withdraw Application Status-----------------------------------
	   $scope.updateWithdrawApplication = function(){
		   $(".loader").show();
		   Profile_Service.updateWithdrawApplicationStatus($scope.userJobId,$rootScope.userdetails.id).then(function(response){
			   GlobalModule_notificationService.notification("success","Your application has been withdrawn successfully.");
			   $(".modal-backdrop").hide();
			   $state.reload();
			   $(".loader").fadeOut("slow");	
		   },function(response){	
			   GlobalModule_notificationService.notification("error","Your application withdrawn failed.");
				$(".loader").fadeOut("slow");		
				});
			 };	
			 
			 $scope.getIdForWithdrawJob = function(userJobId){
				 $scope.userJobId=userJobId;
				 $("#withdraw-app-modal").modal('show');
					 };
					 
					 $scope.displayCandidateJourneyLogsInactive = function(userJobId){
						   $(".loader").show();
						   // 2 means onclick demand logs
						   Profile_Service.displayCandidateJourneyLogsInactiveJobs(2,userJobId,$rootScope.userdetails.id).then(function(response){
							   $scope.displayCandidateJourneyLogsInactiveJobs = response.data;
							   for(var i=0;i<$scope.displayCandidateJourneyLogsInactiveJobs.length;i++){
									
									if($scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Closed" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Not Suitable" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Abandoned" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="No Show" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Failed Assessment" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Inactive" ||
									   $scope.displayCandidateJourneyLogsInactiveJobs[i].status_name=="Not Successful" ){
										
										$scope.displayCandidateJourneyLogsInactiveJobs[i].tab='failedStatus';						
									}
									
								}
							   
						
							   for(var x=0;x<$scope.displayCandidateJourneyLogsInactiveJobs.length;x++){
							   $scope.activeOnClickJourneyLogs=$scope.displayCandidateJourneyLogsInactiveJobs[x].user_jobid;
							   break;
							   //$scope.activeOnClickJourneyLogs=true;
							   }
							   $(".loader").fadeOut("slow");	
						   },function(response){	
								$(".loader").fadeOut("slow");		
								});
							 };	
					 
		/* $scope.displayCandidateJourneyLogs = function(){
			   $(".loader").show();
			   // 1 means on page load data
			   Profile_Service.displayCandidateJourneyLogs(1,$rootScope.userdetails.id).then(function(response){
				   $scope.displayCandidateJourneyLogs = response.data;
				   $(".loader").fadeOut("slow");	
			   },function(response){	
					$(".loader").fadeOut("slow");		
					});
				 };	
		$scope.displayCandidateJourneyLogs();
		*/
		
	/*$scope.sendOtp = function(button){
		$(".loader").show();
		var user={};
		var option="notSelected";
		var opts = document.getElementsByName("radio-group");
		var option = "NA";
		for(var x=0;x<opts.length;x++)
		{
			if(opts[x].checked)
			{
				option = opts[x].value;
				break;
			}
		}
		if(option == "notSelected"){
			
		}
		$scope.usereailid = GlobalModule_dataStoreService.loadData('LoginModule','useremailid');	
		user.mfaoption=option;
		user.email=$scope.usereailid;
		Login_Service.sendOtpToUsers(user).then(function(response){

			$scope.otpinserttatus = response.data;
			if($scope.otpinserttatus == "success"){
				$("#selectmfa").css("display","none");
				$("#validateotp").css("display","inline");
			}
			$(".loader").fadeOut("slow");	
		},function(response){

			$(".loader").fadeOut("slow");

		});	
		
	};
	
	$scope.validateUserOtp=function(userotp){
		$(".loader").show();
		Login_Service.validateUserOtp(userotp).then(function(response){

			$scope.validateotpstatus = response.data;
			if($scope.validateotpstatus == "present"){
				$state.go("resetpassword");
			}
			$(".loader").fadeOut("slow");
		},function(response){

			$(".loader").fadeOut("slow");

		});	
	};*/
	
	/*$scope.resetForgetPassword=function(user){
		$(".loader").show();
		if(user.newpassword != user.confirmPassword){
			GlobalModule_notificationService.notification("error","Password does not match.");
			return;
		}
		$scope.usereailid1 = GlobalModule_dataStoreService.loadData('LoginModule','useremailid');	
		user.email=$scope.usereailid1;
		Login_Service.resetForgetPassword(user).then(function(response){

			$scope.resetstatus = response.data;
			if($scope.resetstatus == "success"){
				GlobalModule_notificationService.notification("success","Password reset successfully.");
			}
			$(".loader").fadeOut("slow");
		},function(response){

			$(".loader").fadeOut("slow");

		});	
	};*/
	/*$scope.notificationflag = GlobalModule_dataStoreService.loadData('LoginModule','notificationflag');
		  $scope.checkNotification=function()
		  {			  

			  Login_Service.fetchNotification($rootScope.userdetails.id).then(function(response){

				  $scope.noficationStatus=response.data;

				 if($scope.noficationStatus.length > 0)
				{
					 $scope.noStatusflag= false;
					 $scope.countflag= true;
				}
				 else
				{
					 $scope.noStatusflag= true;
				}
				GlobalModule_dataStoreService.storeData('LoginModule','notificationflag',true);
				$scope.notificationflag = true;

			  });
		  };
		  if($scope.notificationflag == false)
		  {
			  	$scope.checkNotification();
		  }
		  $scope.seenNotification=function()
		  {				
			  Login_Service.makeSeenNotification($rootScope.userdetails.id).then(function(response){
				  $scope.seenNotificationFlag=response.data;
				  $scope.countflag= false;
			  });
		  };

		  $scope.fetchAllNotifications=function()
		  {	

			  Login_Service.fetchAllNotifications($rootScope.userdetails.id).then(function(response){

				  $scope.allNofications=response.data;				 
				  console.log($scope.allNofications);	
				  if($scope.allNofications.length > 0)
					{					  	
						 $scope.noNotificationflag= false;
						 $scope.countflag= false;					 
					}
					 else
					{
						 $scope.noNotificationflag= true;
					}	
				  GlobalModule_dataStoreService.storeData('LoginModule','notificationflag',true);
					$scope.notificationflag = true; 

			  },function(response){

				});
		  };
		  if($scope.notificationflag == false)
		  {
			  $scope.fetchAllNotifications();
		  }*/

	/*$scope.fetchUnseenNotifications=function()
	{
		//$scope.unSeenNotificationsCount=23;
		$(".loader").show();

		var flag='Unseen';

		Login_Service.fetchUnseenNotifications($rootScope.userdetails.id,flag).then(function(response){

			$scope.unSeenNotifications=response.data;

			console.log($scope.unSeenNotifications);

			if($scope.unSeenNotifications.length > 0)
			{
				$scope.unSeenNotificationsCount = $scope.unSeenNotifications.length;
			}

		 },function(response){

			  $(".loader").fadeOut("slow");

			});

		$(".loader").fadeOut("slow");
	};*/

	/*$scope.hoverIn= function(){

		//$scope.unSeenNotificationsCount=0;

		$("#notification-dropdown-list").delay(400).fadeToggle();

		//$("#notification-dropdown-list").dropdown("toggle");
	};

	$scope.hoverOut= function(){

		//$("#notification-dropdown-list").dropdown("toggle");

		$("#notification-dropdown-list").delay(400).fadeToggle();
	};*/

}]);
