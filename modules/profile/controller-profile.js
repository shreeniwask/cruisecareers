'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Profile_Ctrl',['$scope','$rootScope','$location','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService', function ($scope, $rootScope,$location,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($scope.userdetails);
		
	$scope.showFlag = 0;
	$scope.userProfile;
	  var filesizeLimit=2097152;
		$scope.input=[];
		$scope.file=[];
		$scope.filedtails;
		 $scope.activity={};
	
		 	
		 
		 
		 
		 $scope.fetchconfigproperties = function(){
				Login_Service.fetchconfigproperties($scope.user).then(function(response){	    		 
					$scope.propertiesList = response.data;	
					$scope.age_limit=$scope.propertiesList.age_limit;
					$scope.passport_check_mandatory=$scope.propertiesList.passport_check_mandatory;
					//console.log($scope.age_limit);
				});
			};
			$scope.fetchconfigproperties();
	$scope.fetchUserProfile = function(){
		  
		Profile_Service.fetchUserProfile($rootScope.userdetails.id).then(function(response){
			  $scope.userProfile = response.data;
			  console.log($scope.userProfile);
			  GlobalModule_dataStoreService.storeData('LoginModule','userProfile',$scope.userProfile);
			  
			  $scope.userPersonal = {sourceOfInfo:{}};
			  $scope.userPersonal.firstName = $scope.userProfile.firstName;
			  $scope.userPersonal.lastName=$scope.userProfile.lastName;
				 $scope.userPersonal.dob = $scope.userProfile.dob;
				 if($scope.userProfile.gender){
					 $scope.userPersonal.gender =$scope.userProfile.gender;
				 }else{$scope.userPersonal.gender = "male";}
				 
					 $scope.userPersonal.profilePic =$scope.userProfile.profilePic;
					 
					 if($scope.userProfile.sourceOfInfo != undefined)
				     {
						 $scope.userPersonal.sourceOfInfo.id = $scope.userProfile.sourceOfInfo.id;
				     }
					 
					 $scope.userEducation =	 $scope.userProfile.userEducationList;
					 $scope.userWork =[];
					 if($scope.userProfile.userWorkList != undefined)
					 {
						 $scope.userWork =	 $scope.userProfile.userWorkList;
					 }
					 					
					 $scope.userContact = $scope.userProfile.userContact;	
					 $scope.userContact.email=$scope.userProfile.email;
					 console.log($scope.userContact);				 
					 $scope.userCompliance = $scope.userProfile.userComplianceList;
					 $scope.userCompliance1 =$scope.userProfile.userComplianceListData;
					 $scope.JobBaseUserMandatoryCompliances =$scope.userProfile.JobBaseUserMandatoryCompliances;
					 $scope.langeageKnown = $scope.userProfile.languageKnown;
					 $scope.fetchStateList($scope.userContact.countryId);
					 $scope.fetchCityList($scope.userProfile.userContact.state.id);					 
					 $scope.fetchCompliancebyJob();
					 if($scope.userProfile.userCV.cvPath != null){
						 var filename_cv=GlobalModule_dataStoreService.loadData('LoginModule','filename_cv');
						 $scope.cvPath=filename_cv;
					 }
					
					
					 /*if( $scope.userCompliance!=null)
						 {
						 Profile_Service.userComplianceListData($scope.userProfile.id).then(function(response)
									{					
							 		
									     $scope.userComplianceListData = response.data;
									     
									  $(".loader").fadeOut("slow");
								  },function(response){
									  $(".loader").fadeOut("slow");
								});
						 }*/
					 /* console.log($scope.compliancesList);
					  if($scope.userCompliance.ocr!=1)
						  {
						        for(var i=0;i<$scope.compliancesList.length;i++)
						        	{
						        				if($scope.compliancesList[i].complianceName=="Passport")
						        					{
						        					
						        					      $scope.compliancesList[i].complianceName=null;
						        					     // $scope.compliancesList[i]=null;
						        					      
						        					   
						        					}
						        	}
						  }*/
					 
					 
		  },function(response){
				
			});
	  };
	  
	  
	$scope.fetchUserProfile();
	 	
	var fetchSourceOfInfoList= function(){
		  
		Profile_Service.fetchSourceOfInfoList().then(function(response){
			  $scope.sourceOfInfoList = response.data;
		  },function(response){
				
			});
	  };
	  fetchSourceOfInfoList();
	
		$scope.fetchQualifications = function(){
			  
			Profile_Service.fetchQualifications().then(function(response){
				  $scope.qualificationsList = response.data;
			  },function(response){
					
				});
		  };
		
		 $scope.fetchQualifications();
	 			
			 function calculateAge(checkdt,bDate) { 				 
				 
				 var diff =(checkdt.getTime() - bDate.getTime()) / 1000;
				   diff /= (60 * 60 * 24);
				  return Math.abs(Math.round(diff/365.25));
			 }

			 $scope.dateBirth= function(){
				 
                  var dob = $("#dob").val();
	 			 /* var todaysDate=$scope.dateformate(new Date());
		          var dateParts1 = dob.split('-');
				  var dateParts2 = todaysDate.split('-');
				  var bDate=new Date(dateParts2[2],parseInt((dateParts2[1]))-1,dateParts2[0]);
				  
				//  var toDate1=new Date(dateParts1[2],dateParts1[1],dateParts1[0]);
				  var toDate1=new Date(dateParts1[2],parseInt((dateParts1[1]))-1,dateParts1[0]);
				  bDate.setYear(bDate.getYear() - $scope.age_limit);
				  var checkdt= $scope.dateformate(bDate);
			
				  var checkdt1 = checkdt.split('-');
				  //console.log(checkdt1);
       		     var checkdt2=new Date(checkdt1[2],parseInt((checkdt1[1]))-1,checkdt1[0]);
				  console.log(checkdt2);
				  var greaterDt=checkDates(checkdt2,toDate1);
					
					if(greaterDt == true)
					{
						  $('#profileModel').modal('show');
					      return;
					} */
                  var dateParts1 = dob.split('-');
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
                  $('#profileModel').modal('show');
                    return;
                  }
                  
                  
			  };
			 
			/* function checkDates(checkdt2,toDate1) { 				 
				
				  return (checkdt2.getTime() < toDate1.getTime());
			 };
			*/
			 
			
	  $scope.savePersonaldetails = function(user){	
		  
		  
		  var option=document.getElementsByName('radiobtn');

		  if (!(option[0].checked || option[1].checked)) {
			  $(".loader").fadeOut("slow");
			 
			  return;
		  }
		  
		  user.id = $rootScope.userdetails.id;
				
		   user.dob = $("#dob").val();
		   event.preventDefault();
			var input = document.getElementById('getval');			
			if(input.value!="")
		    {
			var file = input.files[0];
		var formData = new FormData();
			formData.append("file",file);
	    	  
			 $.ajax({
				url: 'rest/user/upload/userprofile',
				type: 'POST',
				data: formData,
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returndata) {
				 	$scope.filedtailsforProfile=JSON.parse(returndata);
					 if($scope.filedtailsforProfile != undefined)
						{
						 user.profilePic = $scope.filedtailsforProfile.fileURL;
						}
					 	
					  Profile_Service.savePersonaldetails(user).then(function(response){
						  $scope.flag = response.data;	
						  
						  $rootScope.userdetails.profilePic=user.profilePic;
						 
						  //for profile pic changes in right-top corner
						 /* $rootScope.Credentials = GlobalModule_dataStoreService.loadData('LoginModule','LoginCredentials');
							 Login_Service.getLogin($scope.Credentials).then(function(response){
								 $scope.userRefresh = response.data;
								 
							 	 GlobalModule_dataStoreService.storeData('LoginModule','user',$scope.userRefresh);	
							 });*/
						  if(($scope.passportData == null || $scope.passportData.passportNo==" ") && $scope.passport_check_mandatory=='true'){
							  $scope.showFlag = 1;
							  $scope.setApplyClass(1);
							  GlobalModule_notificationService.notification("error","Please add your passport details");
							  return;
						  } 
						  else{
						  GlobalModule_notificationService.notification("success","Your Personal Details have been added successfully");
						  $scope.showFlag = 1;
						  $scope.setApplyClass(1);
						  
						
						  }
						 // GlobalModule_notificationService.notification("success","Your Personal Details have been added successfully");
						  /*if($scope.passportData == null){
							  GlobalModule_notificationService.notification("error","Please add your passport details");
							  return;
						  }*/
						  $scope.activity.activityid=4;
						  $scope.activity.userid=$rootScope.userdetails.id;
						  GlobalModule_User_activityService.addUserActivity($scope.activity);	
						  $state.reload();
						  $(".loader").fadeOut("slow");
					  },function(response){
						
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
						  
						  $(".loader").fadeOut("slow");
						});
				}
			
			
			});
			
			}else{
		  Profile_Service.savePersonaldetails(user).then(function(response){
			  $scope.personalflag = response.data;	
			  //$scope.passportData.flag=null;
			  //for profile pic changes in right-top corner
			  //$rootScope.Credentials = GlobalModule_dataStoreService.loadData('LoginModule','LoginCredentials');
			  /*cosnole.log($rootScope.Credentials);
				 Login_Service.getLogin($scope.Credentials).then(function(response){
					 $scope.userRefresh = response.data;					 
					 GlobalModule_dataStoreService.storeData('LoginModule','user',$scope.userRefresh);	
				 });*/
			  if(($scope.passportData == null || $scope.passportData.passportNo==" ") && $scope.passport_check_mandatory=='true'){
				  $scope.showFlag = 1;
				  $scope.setApplyClass(1);
				//  $scope.passportData.flag= $scope.personalflag;
				  GlobalModule_notificationService.notification("error","Please add your passport details");
				  return;
			  } 
			  else{
			  GlobalModule_notificationService.notification("success","Your Personal Details have been added successfully");
			  $scope.showFlag = 1;
			  $scope.setApplyClass(1);
			  }
			  $scope.activity.activityid=4;
			  $scope.activity.userid=$rootScope.userdetails.id;
			  GlobalModule_User_activityService.addUserActivity($scope.activity);
			  $(".loader").fadeOut("slow");			  
		  },function(response){
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			  $(".loader").fadeOut("slow");
			});
		} 	
			 
	  };
	  
	  $scope.addnewForEducation = function(){
		  $scope.userEducation.push({ 
			  'id': "", 
			  'yearOfPassing': "",
			  'board': "",
			  'gradeScore':"",
			  'certificatePath':"",
		  });
	  };
	  
	  $scope.educationid =[];
	  $scope.removeForEducation = function(item) 
      {
		if(item.id != undefined && item.id != ""){
			$scope.educationid.push(item.id);
		}
        angular.forEach( $scope.userEducation, function(value, key) 
       {
            if (value == item) 
            {
            	 $scope.userEducation.splice(key, 1);
            }
        });
    
      };
      $scope.addeducationfile = function(user){
    	  for(var i=0;i<user.length;i++){
    		  document.getElementById('file_name'+i).value = this.value;
    	  }
      };
	  
      $scope.setApplyClass = function(flag){
    	  $("#liPersonal").removeClass("active");
    	  $("#liPassport").removeClass("active");
    	  $("#liEducational").removeClass("active");
    	  $("#liWork").removeClass("active");
    	  $("#liResume").removeClass("active");
    	  $("#liContact").removeClass("active");
    	  $("#liCompliance").removeClass("active");
    	  $("#role_specific_compliances").removeClass("active");
    	  
    	  $scope.showFlag = flag;
    	  
    	  switch(flag)
      {
    	  case 0:
    		  $("#liPersonal").addClass("active");
    		  break;
    	  case 1:
    		  $("#liPassport").addClass("active");
    		  break;
    	  case 2:
    		  $("#liEducational").addClass("active");
    		  break;
    	  case 3:
    		  $("#liWork").addClass("active");
    		  break;
    	  case 4:
    		  $("#liResume").addClass("active");
    		  break;
    	  case 5: // case 4
    		  $("#liContact").addClass("active");
    		  break;
    	  case 6: // case 5
    		  $("#liCompliance").addClass("active");
    		  break;
    	  case 7: // case 6
    		  $("#role_specific_compliances").addClass("active");
    		  break;
    		  default:
    		$("#liPersonal").addClass("active");
      }    	    	 
      };
      
      
      $scope.addEducationDetails = function(user){
    	
    	  if(user  ==  "" || user == null)
    		  {
    		  GlobalModule_notificationService.notification("error","Please Add Educational Info");
    		  return;
    		  }
    	  var hasfile=0;
    	  var counter = 0;
		  $(".loader").show();
		  for(var i=0;i<user.length;i++){
			   user[i].userid = $rootScope.userdetails.id;
			   user[i].yearOfPassing= $("#yearpassing"+i).val();
		  
		 
		  $scope.input[i] = document.getElementById('file'+i);
			if($scope.input[i].value!="")
			{
				hasfile = 1;
				$scope.file[i]=$scope.input[i].files[0];
		
				var formData = new FormData();
				formData.append("file",$scope.file[i]);
				formData.append("ind",i);
				
				$.ajax({
					url: 'rest/user/upload/educationfile',
					type: 'POST',
					data: formData,
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (returndata) {
						
						$scope.filedtails=JSON.parse(returndata);
						
						user[$scope.filedtails.index].certificatePath=$scope.filedtails.fileURL;
                        counter=counter+1;
                        
                        if(counter == user.length){
                        	if($scope.educationid.length > 0){
                        		for(var i=0;i<$scope.educationid.length;i++){
              				  var obj ={};obj.id = $scope.educationid[i];
              				user.push(obj);
              				}
              			  }
                        	 
                        Profile_Service.addEducationDetails(user).then(function(response){
              			  $scope.flag = response.data;
              			  $scope.fetchUserProfile(); $scope.educationid =[];
              			  if($scope.flag != "Failed"){
              				 
              				  GlobalModule_notificationService.notification("success","Your Educational Details have been added successfully");
              				$scope.activity.activityid=8;
  						  $scope.activity.userid=$rootScope.userdetails.id;
  						  GlobalModule_User_activityService.addUserActivity($scope.activity);
              				  }else{
              					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
              				  }
              			
              			  $(".loader").fadeOut("slow");
              		  },function(response){
              			  GlobalModule_notificationService.notification("error","Error In User add");
              			  $(".loader").fadeOut("slow");
              			});
                        
                       }
					}
				});
				
			}else{
				counter =counter+1;
				 
			}
			
		 
		  }
		
		 if(hasfile == 0 ){
			 if($scope.educationid.length > 0){
         		for(var i=0;i<$scope.educationid.length;i++){
				  var obj ={};obj.id = $scope.educationid[i];
				user.push(obj);
				}
			  }
		  Profile_Service.addEducationDetails(user).then(function(response){
			  $scope.flag = response.data;
			  $scope.fetchUserProfile(); 
			  $scope.educationid =[];
			  if($scope.flag != "Failed"){
				  GlobalModule_notificationService.notification("success","Your Educational Details have been added successfully");
				  $scope.activity.activityid=8;
					 $scope.activity.userid=$rootScope.userdetails.id;
					  GlobalModule_User_activityService.addUserActivity($scope.activity);
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
			  
			  $(".loader").fadeOut("slow");
		  },function(response){
			  GlobalModule_notificationService.notification("error","Error In User add");
			  $(".loader").fadeOut("slow");
			});
		 
		 }
	  };
	
	  $scope.addRowForworkExperience = function(){
		  $scope.userWork.push({ 
			  'employerName': "", 
			  'position': "", 
			  'location': "",
			  'fromDate': "",
			  'salary':"",
			  'currencyId':0,
			  'toDate':"",
			  'reasonOfLeaving':"",
		  });
	  };
	  
	  $scope.workid = [];
	  $scope.removeForWork = function(item) 
      {
		if(item.id != undefined){
			$scope.workid.push(item.id);
		}
        angular.forEach( $scope.userWork, function(value, key) 
       {        	
            if (value == item) 
            {
            	 $scope.userWork.splice(key, 1);
            }
        });
    
      };
	  
      
      $scope.fetchCurrencies = function(){
    	  
    	  Profile_Service.fetchCurrencies().then(function(response){
			  $scope.currencyList = response.data;
			  
			  $scope.currencyListPartF=[];
			  $scope.currencyListPartS=[];
			  
			  for(var i=0;i<5;i++)
			  {				  
				  $scope.currencyListPartF.push($scope.currencyList[i]);
			  }
			  for(var i=5;i<$scope.currencyList.length;i++)
			  {				 
				  $scope.currencyListPartS.push($scope.currencyList[i]);
			  }
			  			  
		  },function(response){
				
			});
	  };   	 
	  $scope.fetchCurrencies();
	  
	  $scope.saveworkExperience = function(user){
		
		  if(user  ==  "" || user == null)
		  {
		  GlobalModule_notificationService.notification("success","Please Add Work Experience Info");
		  return;
		  }
		  
		  $(".loader").show();
		  
		  var hasfile=0;
    	  var counter = 0;
		  for(var i=0;i<user.length;i++){
			  
			  user[i].userid = $rootScope.userdetails.id;
			  user[i].fromDate = $("#fromdate"+i).val();
			  user[i].toDate = $("#todate"+i).val();
			  
			  if(user[i].salary != "" && user[i].currencyId == "")
			  {			  
				  GlobalModule_notificationService.notification("error","Please select Currency");
				  user[i].salary = "";
				  $(".loader").fadeOut("slow");
				  return;
			  }
			  else
			  {
		  $scope.input[i] = document.getElementById('file-input'+i);		  
			if($scope.input[i].value!="")
			{
				hasfile = 1;
				$scope.file[i]=$scope.input[i].files[0];
				var formData = new FormData();
				formData.append("file",$scope.file[i]);
				formData.append("ind",i);
				
				$.ajax({
					url: 'rest/user/upload/experiencecertificate',
					type: 'POST',
					data: formData,
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (returndata) {

						$scope.filedtailsForDocument=JSON.parse(returndata);						
						user[$scope.filedtailsForDocument.index].certificatePath=$scope.filedtailsForDocument.fileURL;
						counter=counter+1;
						if(counter == user.length){
							
							if($scope.workid.length > 0){
								
								  for(var i=0;i<$scope.workid.length;i++){
								  var obj ={};obj.id = $scope.workid[i];
								  user.push(obj);
								  
								  }
							  }
												   									   
							Profile_Service.saveworkExperience(user).then(function(response){
								
							$scope.flagForWorkExperience = response.data;
							$scope.workid=[];
						    $scope.user={};
							if($scope.flagForWorkExperience != "Failed"){
								  GlobalModule_notificationService.notification("success","Your Work Experience details have been added successfully");
								  $scope.activity.activityid=3;
								  $scope.activity.userid=$rootScope.userdetails.id;
								  GlobalModule_User_activityService.addUserActivity($scope.activity);								  
								}
							else{									
									GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								}
			
							$(".loader").fadeOut("slow");
							},function(response){
								  GlobalModule_notificationService.notification("error","Error In User add");
								$(".loader").fadeOut("slow");
							});  
						   
					};
					}
				});
			}
			else
			{
				counter =counter+1;
			}
		 }
		  }
		if(hasfile==0)
			{
			
			if($scope.workid.length > 0){
				  for(var i=0;i<$scope.workid.length;i++){
				  var obj ={};obj.id = $scope.workid[i];
				  user.push(obj);				  
				  }
			}			 					
			Profile_Service.saveworkExperience(user).then(function(response){
			$scope.flag = response.data;
			$scope.fetchUserProfile(); $scope.workid = [];
			if($scope.flag != "Failed"){
				GlobalModule_notificationService.notification("success","Your Work Experience details have been added successfully");
				$scope.activity.activityid=3;
				$scope.activity.userid=$rootScope.userdetails.id;
				GlobalModule_User_activityService.addUserActivity($scope.activity);
			}
			else{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}
			$(".loader").fadeOut("slow");
		  },function(response){
			  GlobalModule_notificationService.notification("error","Error In User add");
			  $(".loader").fadeOut("slow");
			});
		}
	  };
	  
	  $scope.checkComplianceForm= function(complianceId,index){
		  
		  for(var i=0;i<$scope.userCompliance.length;i++)
			  {
			  if($scope.passportData != null){
					  if(complianceId==$scope.passportData.complianceId && $scope.userCompliance[i].ocr == "1")
					  {
						  /*if(index==i){
							  $("#travel :input").attr("disabled", false);
							  $("#travel :select").attr("disabled", false);
						  }*/
						 // $("#travel :input").attr("readonly", true);
						  
						 /* $('#valselect').val('0');*/
						  GlobalModule_notificationService.notification("error","Passport already present. Please select other compliance");
					      return;
					  }
			  }
			  }
		  
		  $scope.formid=undefined;		  
			Profile_Service.fetchComplianceForm(complianceId).then(function(response){
				  $scope.complianceForm = response.data;
				  if($scope.complianceForm.complianceFormPath != null)					
					  $scope.formid=index;					  				 
			  },function(response){
					
				});
		  };
	  	  
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
					  $scope.stateList = response.data;		
					  	
					  //for first empty dropdown fix
					  if($scope.stateList.length == 0){
						  $scope.userContact.state.id = 0;						  
						  $scope.userContact.city.id = 0;
						 // $scope.cityList = "";
					  }				  
					  
				  },function(response){
						
					});		
			  };
			 
			  $scope.fetchCityList = function(id){
				  
					Profile_Service.fetchCityList(id).then(function(response){
						  $scope.cityList = response.data;
						  
			/*			  //for first empty dropdown fix
						  if($scope.cityList.length == 0 ){
							  $scope.userContact.city.id =0;
						  }		*/
						  
					  },function(response){
							
						});
				  };
				  
				  $scope.refreshModal = function()
					{	
					  $(".loader").show();
					 $scope.showflag = 5;  
					 $(".loader").fadeOut("slow");				
					}; 
					
				  $scope.saveUserContact = function(user){
					  $(".loader").show();
					
					  user.id = $rootScope.userdetails.id;
					  if(user.phoneNumber.length<10)
					  {
						  GlobalModule_notificationService.notification("error","Please enter valid mobile number");
						  $(".loader").fadeOut("slow");
						  setApplyClass(5);
						  return;	
					  }
					if(user.altPhoneNumber != undefined){
					  if(!user.altPhoneNumber.length==0){
					  if(user.altPhoneNumber.length<10)
					  {
						  GlobalModule_notificationService.notification("error","Please enter valid alternate mobile number");
						  $(".loader").fadeOut("slow");
						  setApplyClass(5);
					      return;
					  }
					  }
					}
					  if(user.pincode.length<6)
					  {
						  GlobalModule_notificationService.notification("error","Please enter valid Pin/Zip code");
						  $(".loader").fadeOut("slow");
						  setApplyClass(5);
						  return;	
					  }
					 
  var e = document.getElementById("country");
                var country = e.options[e.selectedIndex].value;
         
                if(country=="number:0")
                {
                GlobalModule_notificationService.notification("error","Please select Country");
  $(".loader").fadeOut("slow");
  setApplyClass(5);
  return;
                }
               
               
                var e1 = document.getElementById("state");
                var state = e1.options[e1.selectedIndex].value;
              
                if(state=="number:0")
                {
                GlobalModule_notificationService.notification("error","Please select State");
  $(".loader").fadeOut("slow");
  setApplyClass(5);
  return;
                }
               
                var e2 = document.getElementById("city");
                var city = e2.options[e2.selectedIndex].value;
             
                if(city=="number:0")
                {
                GlobalModule_notificationService.notification("error","Please select City");
                $(".loader").fadeOut("slow");
                   setApplyClass(5);
                   return;
                }
               
					  Profile_Service.saveUserContact(user).then(function(response){
						 
						  $scope.flag = response.data;
						  if($scope.flag == "success"){
						  GlobalModule_notificationService.notification("success","Your Contact have been added successfully");
						  $scope.activity.activityid=9;
							 $scope.activity.userid=$rootScope.userdetails.id;
							  GlobalModule_User_activityService.addUserActivity($scope.activity);
						  }else if($scope.flag =="duplicate"){
							  GlobalModule_notificationService.notification("error","This Email Id is already present! Please enter another Email Id ");
							  $scope.showFlag = 5;
						  }
						  else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  $(".loader").fadeOut("slow");
					  },function(response){
						  GlobalModule_notificationService.notification("error","Error In User add");
						  $(".loader").fadeOut("slow");
						});
				  };
			
				  $scope.userImage=[];
				  $scope.addUserImage = function(){
					  $scope.userImage.push({ 
						  'image': "", 
					  });
					  
				  };
	
				  
				  $scope.saveUserCV = function(){
					  $(".loader").show();
					  $scope.usercv = {};
					  $scope.usercv.id = $rootScope.userdetails.id;
					  $scope.usercv.languageKnown = document.getElementById('langknown').value;
					  
					  event.preventDefault();
						var input = document.getElementById('filecv');
						if(input.value!="")
						{
						var filename=input.files[0].name;
						GlobalModule_dataStoreService.storeData('LoginModule','filename_cv',filename);
						var file = input.files[0];
					var formData = new FormData();
						formData.append("file",file);
						
				    	  $(".loader").show();
						$.ajax({
							url: 'rest/user/upload/usercv',
							type: 'POST',
							data: formData,
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (returndata) {
								
								$scope.filedtailsforCV=JSON.parse(returndata);					
								
								//for upload in AWS S3
								$scope.usercv.name = $scope.filedtailsforCV.fileURL.split('/')[4];
								
								
								 if($scope.filedtailsforCV != undefined)
									{
									 $scope.usercv.cvPath = $scope.filedtailsforCV.fileURL;
									}								 
								
								 Profile_Service.saveUserCV($scope.usercv).then(function(response){
									  $scope.flagcv = response.data;									 
									  $scope.fetchUserProfile();
									  if($scope.flagcv != ''){
										  GlobalModule_notificationService.notification("success","Your CV have been added successfully");
										  $scope.activity.activityid=11;
											 $scope.activity.userid=$rootScope.userdetails.id;
											  GlobalModule_User_activityService.addUserActivity($scope.activity);
										  }else{
											  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
										  }
									  $(".loader").fadeOut("slow");
								  },function(response){
									  $(".loader").fadeOut("slow");
									});
								 
							}
						});
						
						}else{
						 Profile_Service.saveUserCV($scope.usercv).then(function(response){
						  $scope.flagcv = response.data;
						  $scope.fetchUserProfile();
						  if($scope.flagcv.indexOf("success")!=-1){
							  //GlobalModule_notificationService.notification("success","Your CV have been added successfully");
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  }
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
						 
						}
						$(".loader").fadeOut("slow");
						 $scope.saveUserCVImages();
				  };
				  
				  $scope.saveUserCVImages = function(){
					  $(".loader").show();
					  $scope.usercvImages = [];
					  var errorflag = false;
					  var data = document.getElementById('userimage').files;
					  if(data.length != 0){
					  event.preventDefault();
					  for(var i=0;i<data.length;i++){
						  $scope.usercv = {};
						  $scope.usercv.id = $rootScope.userdetails.id;
						  $scope.usercv.type = "Image";
						 
						$scope.input = data[i];
						 event.preventDefault();
							
							if($scope.input.value!="")
							{
							var file = $scope.input;
							var formData = new FormData();
							formData.append("file",file);
							
						$.ajax({
							url: 'rest/user/upload/usercvimages',
							type: 'POST',
							data: formData,
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (returndata) {
								$scope.filedtailsforCVImages=JSON.parse(returndata);
								 if($scope.filedtailsforCVImages != undefined)
									{
									 $scope.usercv.path = $scope.filedtailsforCVImages.fileURL;
									}
								 $scope.usercvImages =[];
								 $scope.usercvImages.push( $scope.usercv);
								//if(i==data.length-1){
									 Profile_Service.saveUserCVImages( $scope.usercvImages).then(function(response){
									  $scope.flagcvimages = response.data;
									  if($scope.flagcvimages == "Failed")
										  {
										     errorflag=true;
										  }
									 /* if($scope.flagcvimages != "Failed"){
										  GlobalModule_notificationService.notification("success","Your Images have been saved successfully");
										  }else{
											  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
										  }*/
									  $(".loader").fadeOut("slow");
								  },function(response){
									  $(".loader").fadeOut("slow");
									});
									 
								//}
								
							}
						});
						}
							
					  }
						if(errorflag==true) {
							GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						}else{
							 GlobalModule_notificationService.notification("success","Your Images have been saved successfully");
							 
						}
						
					  };
				  };
				  
				 							  
				  $scope.addnewForCompliance = function(){
					 //console.log($scope.userCompliance);
					  $scope.userCompliance.push({ 
						 
						  'documentNumber': "",
						  'issueDate': "",
						  'expiryDate':"",						  
						  'path':null,
					  });					 
				  };
				
				  $scope.usercomplianceid =[];
				  $scope.removeForUserCompliance = function(item) 
			      {
					if(item.id != undefined){
						$scope.usercomplianceid.push(item.id);
				  }
			        angular.forEach( $scope.userCompliance, function(value, key) 
			       {
			        	
			            if (value == item) 
			            {
			            	 $scope.userCompliance.splice(key, 1);
			            }
			        });			    
			      };
			      
			      $scope.addForUserCompliance = function(user) 
			      {			    	  
			    	  if(user  ==  "" || user == null)
					  {
						  GlobalModule_notificationService.notification("success","Please Add Compliance Info");
						  return;
  }
     
   
      for(var i=0;i<user.length;i++)
      {
    	  if(user[i].issueDate == "" || user[i].issueDate == null || user[i].expiryDate == "" || user[i].expiryDate == null || user[i].countryOfIssue == 0){
    		  GlobalModule_notificationService.notification("error","Please Fill mandatory fields.");
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
			    	  var hasfile=0;
			    	  var counter = 0;
			    	  $(".loader").show();
					  for(var i=0;i<user.length;i++){
					  user[i].userid = $rootScope.userdetails.id;
					  if($scope.showFlag == 6){
						  user[i].issueDate= $("#issuedate_compl"+i).val();
						  user[i].expiryDate= $("#expirydate_compl"+i).val();
						  $scope.input[i] = document.getElementById('documentfile_compl'+i);						   
					  }else{
					  user[i].issueDate= $("#issuedate"+i).val();
					  user[i].expiryDate= $("#expirydate"+i).val();
					  $scope.input[i] = document.getElementById('documentfile'+i);
					  }
					  if($scope.input[i]!=null)
						{
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
										$scope.fetchUserProfile();$scope.usercomplianceid =[];
										if($scope.flagForCompliance != "Failed" && $scope.flagForCompliance != "duplicate"){
											GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
											 $scope.activity.activityid=10;
											 $scope.activity.userid=$rootScope.userdetails.id;
											  GlobalModule_User_activityService.addUserActivity($scope.activity);
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
						  $scope.fetchUserProfile();$scope.usercomplianceid = [];
						  if($scope.flagForCompliance != "Failed" && $scope.flagForCompliance != "duplicate"){
							  GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
							  $scope.activity.activityid=10;
								 $scope.activity.userid=$rootScope.userdetails.id;
								  GlobalModule_User_activityService.addUserActivity($scope.activity);
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
			 
			      
			      };
			    			     			      
			      $scope.cancell = function(){			    	 
			    	  $location.path("/dashboard");			    	  
			      };
			      
			      
			  //-------------------------------------------------------------------------------------------    
			      
			      
			      
	//--------------------------user to do List---------------------------------		
			      
			      /*$scope.fetchAppliedJobsDetails=function(){
			    	  			    	  
			      Profile_Service.fetchAppliedJobsDetails($scope.userProfile.id).then(function(response){
					  $scope.appliedJobsDetails = response.data;	
					  
				},function(response){										
					});
				};   
				$scope.fetchAppliedJobsDetails(); */
			      			      
			      $scope.fetchCompliances = function(){    //-------------fetch all comliances------------
					  					  			    	  			    	 			   
					  Profile_Service.fetchCompliances().then(function(response){
						  
						  $scope.compliancesList = response.data;								 
					  },function(response){
							
					});
				  };
				  $scope.fetchCompliances();
				  
				  
				  /*$scope.fetchCountry = function(){					  
					  	Profile_Service.fetchCountries().then(function(response){						  
						  $scope.countrylist = response.data;									  
					  });
				  };//$scope.fetchCountry();
*/				  
				  $scope.checkcomplianceList = function(id){
					  
					 
					  for(var i=0;i<$scope.userCompliance.length;i++)							  
						{
						    if(id==$scope.compliancesList[i].id)
							  {
						    	  
							      $scope.complianceTemp={};
								  $scope.complianceTemp.id=$scope.userCompliance[i].compliance.id;
								  $scope.complianceTemp.complianceName=$scope.userCompliance[i].compliance.complianceName;
								  $scope.compliancesList.push($scope.complianceTemp);
								 
							  }
						}
				  };							  
				  $scope.getflag=function(id)  //--------for whether compliance exist in user complianc or not 
				  {							 
					  $scope.flag=false;
					 
					  for(var i=0;i<$scope.userCompliance1.length;i++)
					  {
						 
					     if(id==$scope.userCompliance1[i].compliance.id && $scope.userProfile.id==$scope.userCompliance1[i].userid && $scope.userCompliance1[i].documentNumber != "" && $scope.userCompliance1[i].issueDate != "" && $scope.userCompliance1[i].countryOfIssue != 0 && $scope.userCompliance1[i].expiryDate != "" && $scope.userCompliance1[i].path != null)
					    	 {					    						    	 								    	 					    	 
						    	 $scope.flag=true;
						    	 	break;
					    	 }					    	 					    
					  }							 
					  return $scope.flag;					  
				  };
				  
				  $scope.getPathflag=function(id)
				  {					 
						 
					  for(var i=0;i<$scope.userCompliance.length;i++)
					  {
						 
					     if(id==$scope.userCompliance[i].compliance.id && $scope.userCompliance[i].path != null)
					    	 {
					    	 	
						    	 return true;						    	 	
					    	 }					    	 					    
					  }							 
					  return false;
				  };
				  
				  
				  
				  $scope.getdownflag=function(id)
				  {
					  
					 	for(var i=0;i<$scope.userCompliance.length;i++)
					  {
					     if(id==$scope.userCompliance[i].compliance.id && ($scope.userCompliance[i].path != null || $scope.userCompliance[i].path != undefined || $scope.userCompliance[i].path != '' && $scope.userCompliance[i].path != ""))
					    	 {					    	 
						    	 return true;						    	 	
					    	 }					    	 					    
					     else					 					    
					    	 return false; 
					  }
				  };
			  //------------------fetch compliances by job----------   
				  $scope.complianceFlag=false;
				  $scope.compliancesListbyJob=[];
				  $scope.fetchCompliancebyJob=function(){
					    					
					  $(".loader").show();	  
					  Profile_Service.fetchCompliancebyJob($scope.userProfile.id).then(function(response){						  
						  $scope.compliancesListbyJob = response.data;	
						  	console.log($scope.compliancesListbyJob);					  
						  if($scope.compliancesListbyJob != null && $scope.compliancesListbyJob.length > 0)						  
						  $scope.complianceFlag=true;						  
						
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
					});	
					  
				 };
			   // $scope.fetchCompliancebyJob();
				 	 				  				  								  			       				  
				  $scope.setTodate=function(e,index){  //----for on check status today's date get displayed
								  					  
					  $scope.currentDate=(new Date());
								  
					  if($(e).is(":checked"))
						  {
						  
							  $("#completeDate"+e.getAttribute('data-index')).val(moment($scope.currentDate,'YYYY-MM-DD').format("DD-MM-YYYY"));
							  /*$('#file_name'+index).attr('disabled',true);
							  $('#documentfilefotodo'+index).attr('disabled',true);*/
						  
						  }
					  else  
						  {						  	
							  $("#completeDate"+e.getAttribute('data-index')).val('');							  
							  /*$('#file_name'+index).removeAttr("disabled");
							  $('#documentfilefotodo'+index).removeAttr("disabled");*/
						  }
				 };
				  					 
				  $scope.addListOfDocuments=function(user){					  		  
					  					  
					  if(user  ==  "" || user == null)
					  {
						  GlobalModule_notificationService.notification("success","Please Add Compliance Info");
						  return;
					  }
					  
					  
					  
			    	  var hasfile=0;
			    	  var counter = 0;
			    	  $(".loader").show();	
					  for(var i=0;i<user.length;i++){
					  user[i].userid = $rootScope.userdetails.id;
					  user[i].issueDate= $("#issuedate"+i).val();
					  user[i].expiryDate=$("#expirydate"+i).val();
					  
					  $scope.input[i] = document.getElementById('documentfilefotodo'+i);
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
									    $scope.user={};
										if($scope.flagForCompliance != "Failed"){
											GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
											 $scope.activity.activityid=10;
											 $scope.activity.userid=$rootScope.userdetails.id;
											  GlobalModule_User_activityService.addUserActivity($scope.activity);
											  $location.path("/dashboard");
											}else{
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
				 for(var i=0;i<user.length;i++){
					  user[i].userid = $rootScope.userdetails.id;
					  user[i].issueDate= $("#issuedate"+i).val();
					  user[i].expiryDate= $("#expirydate"+i).val();
				 }				
					  Profile_Service.addComplianceDetails(user).then(function(response){
						  $scope.flagForCompliance = response.data;
						  $scope.fetchUserProfile();$scope.usercomplianceid = [];
						  $scope.user={};
						  if($scope.flagForCompliance != "Failed"){
							  GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
							  $scope.activity.activityid=10;
								 $scope.activity.userid=$rootScope.userdetails.id;
								 $location.path("/dashboard");
								  GlobalModule_User_activityService.addUserActivity($scope.activity);
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  }
						
						  $(".loader").fadeOut("slow");
					  },function(response){
						  GlobalModule_notificationService.notification("error","Error In User Compliance add");
						  $(".loader").fadeOut("slow");
						}); 
					
				 
			        }
			 $scope.fetchCompliances();
				  }; 
				  
				  $scope.reload = function()
				  {
					  $state.reload(); 
				  };
				  
		//---------------------------------------------------------------		  
				  $scope.checkFields = function(e,index,id)
				  {							  
					  $scope.str = $('#documentNumber'+e.getAttribute('data-index')).val();
					   $scope.strissdt=$('#issuedate'+e.getAttribute('data-index')).val();
					   $scope.strexpdt=$('#expirydate'+e.getAttribute('data-index')).val();
					   $scope.strcntryiss=$('#countryOfIssue'+e.getAttribute('data-index')).val();					  
					   $scope.sstrpath=$('#file_name'+e.getAttribute('data-index')).val();					
					   if($scope.compliancesListbyJob[index].path == '' || $scope.compliancesListbyJob[index].path == undefined)
					   {
							if($scope.sstrpath == '' || $scope.strissdt == '' || $scope.compliancesListbyJob[index].countryOfIssue == 0 || $scope.str == '' || $scope.strexpdt == '')
							{							   
							   GlobalModule_notificationService.notification("error","Please Fill mandatory fields");
							   $scope.chckflag=false;
							   $("#chck"+index).prop('checked',false);
							   $("#completeDate"+e.getAttribute('data-index')).val('');							  						
							   return;							  
					        }
					   }
					   else 
					   {
						   if($scope.strissdt == '' || $scope.compliancesListbyJob[index].countryOfIssue == 0 || $scope.str == '' || $scope.strexpdt == '')
							{							   
							   GlobalModule_notificationService.notification("error","Please Fill mandatory fields");
							   $scope.chckflag=false;
							   $("#chck"+index).prop('checked',false);
							   $("#completeDate"+e.getAttribute('data-index')).val('');							  						
							   return;							  
					        }
					   }
				  };
				  			  
			      /*-------Suggestion Box for Employer Name -------*/
			      
			      $scope.fetchHotelListForEmployer = function(search,index){
			    	  if(search=="")
			    		  {
			    		 // $scope.employerNameList=[];
			    		  }
			    	  else{
			    		  
					  if(search.length>2){
					  
					  Profile_Service.fetchHotelListForEmployer(search).then(function(response){												  
						  $scope.employerNameList = response.data;						  
						 
					  },function(response){
						  
						});
					 /* if($scope.employerNameList.length>0)
					 {
						  for(var i=0;i<$scope.employerNameList.length;i++)
						  {
						  var temp="";
						  temp=temp.concat($scope.employerNameList[i].employerName,",",$scope.employerNameList[i].area);
					  if(temp==search)
						 {
						  
					 $scope.userWork[index].location=$scope.employerNameList[i].location;
						 }
						  }
						  }*/
					  }
			    	  }
				  };
				 // $scope.fetchHotelListForEmployer();
				  
				  $scope.formatDate1 = function(date){		     
				         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
				         return dateOut;
				   };
				 
				   $scope.dateformate = function(date){		     
				         var dateOut = moment(date).format("DD-MM-YYYY");
				         return dateOut;
				   };
				   
				 /*  $scope.dateformate = function(date){		     
				         var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
				         return dateOut;
				   };*/
				   
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
				   				   
				   $scope.validateWorkDate = function(work,element){  //---------validate issue date and expiry date
					   					   		
					        if ( new Date(stringToDate(work.fromDate,"dd-mm-yyyy","-")) > new Date(stringToDate(work.toDate,"dd-mm-yyyy","-")) ) { 
							   GlobalModule_notificationService.notification("error","You seem to have entered a date from the past. Please enter the correct date");							   
					        	//$('#'+element).after('<p>You cannot enter a date from past!</p>');
					        	$('#'+element).val(null);
					            return false;
					        }
					        return true;
					        
				   };
				   
				   /*$scope.showname =function (i,index) {
						
						var filename=document.getElementById('documentfilefotodo'+i);
						 $('#file_name'+i).val(filename);	
						 						
						   var fileName = val.substr(val.lastIndexOf("\\")+1, val.length);
						  document.getElementById("file_name"+index).value = fileName;
					 };*/
				   $scope.setColor = function(element)
				   {					  
					   var index = angular.element(element).scope().$index;
					   $scope.input[index] = document.getElementById('file-input'+index);					   					   
					   if($scope.input[index].value!="")
						{
						   $('#uploadfile'+index).css("color", "#3c9a3e");						   
						}
				   };
				   
				   
				   
				   $scope.fileNameChanged = function(element)
				   {
					   var index = angular.element(element).scope().$index;
					   $scope.input[index] = document.getElementById('documentfilefotodo'+index);
						if($scope.input[index].value!="")
						{
							var filename=$scope.input[index].value;
							filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);
							$('#file_name'+index).val(filename);
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
					
					
					
					
				 $scope.etoDoList= function(){
					 
					 $state.go("restricted.etodolist");
					 
				 };
				 
				 $scope.formatCurrency=function(index){
						
						var el=document.getElementById('inlineFormInputGroup'+index);
						var elType = null; // input or other
						var value = null;
						// get value
						if($(el).is('input') || $(el).is('textarea')){
							value = $(el).val().replace(/,/g, '');
							elType = 'input';
						} else {
							value = $(el).text().replace(/,/g, '');
							elType = 'other';
						}
						// if value changes
						$(el).on('paste keyup', function(){
							value = $(el).val().replace(/,/g, '');
							formatElement(el, elType, value); // format element
						});
						formatElement(el, elType, value); // format element				
				};
				
				function formatElement(el, elType, value){
					var result = '';
					var valueArray = value.split('');
					var resultArray = [];
					var counter = 0;
					var temp = '';
					for (var i = valueArray.length - 1; i >= 0; i--) {
						temp += valueArray[i];
						counter++;
						if(counter == 3){
							resultArray.push(temp);
							counter = 0;
							temp = '';
						}
					};
					if(counter > 0){
						resultArray.push(temp);				
					}
					for (var i = resultArray.length - 1; i >= 0; i--) {
						var resTemp = resultArray[i].split('');
						for (var j = resTemp.length - 1; j >= 0; j--) {
							result += resTemp[j];
						};
						if(i > 0){
							result += ',';
						}
					};
					if(elType == 'input'){
						$(el).val(result);
					} else {
						$(el).empty().text(result);
					}
				}
				function fetchpdata(){
					$(".loader").fadeOut("slow");
					var id=$rootScope.userdetails.id;
					 Profile_Service.fetchPassportdata(id).then(function(response){
						//alert();
						 $scope.passportData=response.data;
						 $scope.passData1=$scope.passportData;
						 
						 $scope.PassportNumber=$scope.passportData.passportNo;
						 console.log($scope.passportData);									 
						 if($scope.passportData == null || $scope.passportData.passportNo==" ")
						 {
						        $("#browsePic").show();
						        $(".others_passport_det").hide();
						       // $("#browsePic").show();
						 }
						 if( $scope.passportData.countryOfissue != "India" && $scope.passportData.passportNo!=" ")
							{	
							 		
					    	        var countryOFissue=parseInt($scope.passportData.countryOfissue);
									$scope.passportData.countryOfissue=countryOFissue;
							        document.getElementById("others").checked = true;
							        $('.others_passport_det').find('input').attr('disabled', true);
									$(".others_passport_det").show();
									$(".confirmed_passport_det").hide();
									$("#browsePic").hide();
									$("#browsePic1").hide();
									$("#edit").show();
									
									$("#addbtn").hide();
									$("#updatebtn").show();
									document.getElementById("selectd").disabled = true;
						
							}
						 if( $scope.passportData.countryOfissue == "India" && $scope.passportData.passportNo !=" ")
							{	
							        $("#browsePic").hide();
								    $('.confirmed_passport_det').find('input').attr('disabled', true);
							        document.getElementById("india").checked = true;
									$(".others_passport_det").hide();
									$(".confirmed_passport_det").show();
									$("#addbtn").hide();
									$("#updatebtn").show();
									$("#reuploaddiv").css("display","block");
							}
						 if(! $scope.passportData.countryOfissue == "Others" && !$scope.passportData.countryOfissue == "India")
							 { 
							    $("#browsepic").show();
							 }
						 
					 });
				}
				
				//$scope.fetchpdata();	
				
				$scope.checkValidPassport= function(passNo)	
				{
					
					//var letterNumber = /^[A-Z][1-9]\d\s?\d{4}[1-9]$/ig;
					var matchreg="[A-Z]"; 
					var matchnumber= "^(0|[1-9][0-9]*)$";
					var p1=passNo;
					var validp1=p1.substring(0, 1);
					var validnumber=p1.substring(1, 8);
					var passvalidnum=parseInt(validnumbers)
					if(!(validp1.match(matchreg)) || ( passNo.length != 8) || (validnumber.length != 7)    ){
						 GlobalModule_notificationService.notification("error","Please enter valid passport number");
				          return false;
					}
				
					/*var letterNumber =/[a-zA-Z]{2}[0-9]{7}/;
				      if(!(passNo.match(letterNumber)))
				      {
				          GlobalModule_notificationService.notification("error","Please enter valid passport number");
				          return;
				      }*/
				      
				      $scope.passportNodup=false;
					 Profile_Service.checkValidPassport(passNo).then(function(response)
							 {
						           $scope.passportNo = response.data;
						           if( $scope.passportNo == true && passNo!=$scope.PassportNumber)
						        	   {
						        	   $scope.passportNodup=true;
						        	   GlobalModule_notificationService.notification("error","Passport number already exist");
						        	   $scope.passportData.passportNo='';
								          return;
						        	   		
						        	   }
						           else{
						        	   $scope.passportNodup=false;
						           }
								  
							  },function(response){
									
							});	
					
				};
				$scope.showmodal=function(passport)
				{
					$(".loader").show();
					$scope.passportData={};
					  $scope.userPassport = {};
					  $scope.userPassport.id = $rootScope.userdetails.id;
					  event.preventDefault();
						var input = document.getElementById('passportImage');
						var path=input.value;

						if(path=="")
							{
							input = document.getElementById('passportImage2');
							path=input.value;
							}
						
						var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
						if(!allowedExtensions.exec(input.value)){
						$(".loader").show();
						GlobalModule_notificationService.notification("error","Please upload image(.jpg/.jpeg/.png only)");
						$("#updatebtn").hide();
						$("#passportImage").val(null);
						$(".loader").fadeOut("slow");			
						return;
					}
						
						 path = path.replace(/\\/g, "\\\\");
						 
						 var n = path.lastIndexOf("/");
						 var res = path.substring(n+1);
						 var v=res.lastIndexOf("\\");
						 var f=res.substring(v+1);
						 $scope.passportData.filename=f;
						 $scope.fileName=f;
						if(input.value!="")
						{
							var file = input.files[0];
							var formData = new FormData();
								formData.append("file",file);
								
						    	  $(".loader").show();
								$.ajax({
									url: 'rest/user/upload/userPassport',
									type: 'POST',
									data: formData,
									async: true,
									cache: false,
									contentType: false,
									processData: false,
									success: function (returndata) {
										
										$scope.filedtailsforPassport=JSON.parse(returndata);
										//for upload in AWS S3
										$scope.userPass=$scope.filedtailsforPassport.fileURL;
										$scope.userPassport.name = $scope.filedtailsforPassport.fileURL.split('/')[5];
										$scope.userPassport.countryOfissue="India";
										 
										 var option=document.getElementsByName('radiobtn');
										 if($scope.filedtailsforPassport != undefined && option[0].checked)
											{
											    $scope.userPassport.path = $scope.filedtailsforPassport.fileURL;
											    var path= $scope.userPassport.path;						    
											}
										 else{
											 $scope.userPassport.path = $scope.filedtailsforPassport.fileURL;
										 }
										 
										 if(option[0].checked)
										 {
											 readOcr($scope.userPassport);
											// $scope.adduserPassport($scope.userPassport);
										 }
										 else{
											 $(".loader").fadeOut("slow");
										 }
										 
									}
								});
								
								}
			};
				
			 $scope.adduserPassport = function(passportData){
				 
				 /*var result = Object.keys(passportData).map(function(key) {
				
					  return [Number(key), passportData[key]];
					});*/
				 
				/*var result= Object.entries(passportData);
				 console.log(result);
				 
				 for(var i=0;i<result.length;i++)
					 {
					// $scope.checkValidPassport(result[0][1]);
					 }*/
				 
				 /*$scope.checkValidPassport(passportData.passportNo);
				 if($scope.passportNodup==true){
					 alert();
					 return;
				 }*/
				// $scope.passportNodup=false; 
				 
				 if(passportData == null)
					{
					  GlobalModule_notificationService.notification("error","Please fill all the mandatory fields");
					  return; 
	
					}
				 
				passportData.filename= $scope.passportData.filename;
				 var option=document.getElementsByName('radiobtn');
				
				//var letterNumber =  /^[A-Z][1-9]\d\s?\d{4}[1-9]$/ig;
				/* var letterNumber =/[a-zA-Z]{2}[0-9]{7}/;
				 if(passportData.passportNo != undefined) {
				 if(!(passportData.passportNo.match(letterNumber)))
			      {
			          GlobalModule_notificationService.notification("error","Please enter valid passport number");
			          return;
			      }
				 }*/
				 var matchreg="[A-Z]"; 
				 var matchnumber=  "^(0|[1-9][0-9]*)$";
					var p1=passportData.passportNo;
					var validp1=p1.substring(0, 1);
					var validnumbers=p1.substring(1, 8);
					var passvalidnum=parseInt(validnumbers);
					 if(passportData.passportNo != undefined) {
					if(!(validp1.match(matchreg)) || ( passportData.passportNo.length != 8) || (validnumbers.length != 7) ){
						 GlobalModule_notificationService.notification("error","Please enter valid passport number");
				          return false;
					}
					 }
				 if(option[1].checked){
					  
			      if(passportData.passportNo == undefined || passportData.passportNo == "" || passportData.dateOfIssue == undefined ||  passportData.expiryDate == undefined || passportData.lastName == undefined || passportData == null || passportData.dateOfIssue == "" ||  passportData.expiryDate == "" || passportData.dateOfBirth==undefined || passportData.dateOfBirth == "")
					{
					 GlobalModule_notificationService.notification("error","Please add passport details");
					 return;
					}
			      var result = document.getElementById('selectd').value;
					 if (result == "") {
						 GlobalModule_notificationService.notification("error","Please select country of Issue");
					 }
			        
				 }
				 /*passportData.countryOfissue="Others";*/
				 if($scope.passportData.filePath!=null){
				 if (!option[1].checked) {
					// passportData.countryOfissue="India";
					// alert();
					  if($scope.passportData.filePath!=undefined){
						  passportData.path=$scope.passportData.filePath;
						  passportData.countryOfissue="India";
					  }
					  else{
						  passportData.path=$scope.PassData.filePath;
						  passportData.countryOfissue="India";
					  }
					 
				  }
				  if (!option[0].checked) {
					  document.getElementById("others").checked = true;
					  passportData.path=$scope.passportData.filePath;
						  
					 // passportData.countryOfissue="Others";
					 
				  }
				 }
				 else{
					 if(option[0].checked){
				 
					 passportData.path= $scope.userPassport.path;
					 passportData.countryOfissue="India";
			
					 }
					 else{
						 passportData.path= $scope.userPassport.path;
					 }
				 }
				 
				 
				/* passportData.path= $scope.userPassport.path*/
			passportData.id=$rootScope.userdetails.id;
			Profile_Service.adduserPassport(passportData).then(function(response){
				  $scope.flagpass = response.data;	
				  $(".loader").show();
				  $("#reuploaddiv").css("display","block");
				  fetchpdata();
				  
				  if($scope.flagpass != ''){
					  if($scope.passportData.flag != undefined){
						  GlobalModule_notificationService.notification("error","Please add your details");
						  return;
					  } 
					 else{
					 GlobalModule_notificationService.notification("success","Your passport details have been added successfully");
					 $scope.showFlag = 2;
					  $scope.setApplyClass(2);
					  $state.reload(); 
					 
					 // $("#reupload").show();
					 }
				  }
				  
				  
				  
				  var option=document.getElementsByName('radiobtn');
					 if($scope.flagpass != '' && option[1].checked)
					 {
						 /*$("#edit").show();
						 $("#browsePic1").hide();
						 document.getElementById("selectd").disabled = true;
						 $('.others_passport_det').find('input').attr('disabled', true);
						 
						 */
						 if($scope.passportData.flag != undefined){
							  GlobalModule_notificationService.notification("error","Please add your details");
							  return;
						  } 
						 else{
						 GlobalModule_notificationService.notification("success","Your passport details have been added successfully");
						 $scope.showFlag = 2;
						  $scope.setApplyClass(2);
						  $state.reload(); 
						 }
					 }
					 else
					 {
						  if($scope.flagpass != '')
						  {
							  fetchPassportdata(passportData); 
						  }
						  else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						   }
					 }
					 
			//	  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
		};
			
		//$scope.adduserPassport(null);		
			
			$scope.clearTxt= function()	{
			//$('#passNo').val('');
			//$scope.passportData.passportNo=undefined;
			$("#validPassport").modal("hide"); 
			//$("#btnupdate").attr("disabled", false);
			$('#btnupdate').prop('disabled', false);
			};
			
			
			
				
			function readOcr(passportData){
				passportData.filename= $scope.passportData.filename;
				passportData.id=$rootScope.userdetails.id;
				 Profile_Service.readOcr(passportData).then(function(response)
						 {
							  $scope.passportData = response.data;	
							  console.log( $scope.passportData);
							  if($scope.passportData != undefined ||$scope.passportData != null){
								  
								  $scope.isUniquePassport=$scope.passportData.isUniquePassport;
								  if($scope.isUniquePassport == false)
									  {
									  
									    $("#validPassport").modal("show"); 
									     $("#passport_det").modal("show");
									    $('#btnupdate').hide();
									    $(".loader").fadeOut("slow");
									    return;
									  }
								  else{
									  $(".loader").fadeOut("slow");
									  $('#btnupdate').show();
									  $("#passport_det").modal("show");
									  
								  }
								
								}
							 else{
								  $(".loader").fadeOut("slow");
								  $('#browsePic').find('input:text').val('');
								  GlobalModule_notificationService.notification("error","Your passport image is not clear. Please upload a clear image");
						          return;
							  }
							  
							 
						  },function(response){
								
						});	
				
				
				
				
			}

			 function fetchPassportdata(passportData){
				 var id=$rootScope.userdetails.id;
				 Profile_Service.fetchPassportdata(id).then(function(response){	    		 
						$scope.PassData = response.data;	
						var pathh=$scope.PassData.path;
						$scope.userPass=$scope.PassData.path;
						console.log($scope.PassData);
						 //$(".loader").show();	
					     var passportImage=document.getElementById("passportImage");
					     var path=$scope.PassData.path;
						 var n = path.lastIndexOf("/");
						 var res = path.substring(n+1);
						// passportData.path=$scope.userPass;
						
						
					});
				}
			 
/*			 $scope.updatePassportData= function(passportData)	
			 {
				if((passportData.passportNo!="" && passportData.passportNo.match(letterNumber)) || (passportData.dateOfIssue!="" && passportData.dateOfIssue.match(letterNumber))||  (passportData.expiryDate!="" && passportData.expiryDate.match(letterNumber)) || (passportData.lastName!="" && passportData.lastName.match(letterNumber)) ||  (passportData.dateOfIssue!="" && passportData.dateOfIssue.match(letterNumber)) ||  (passportData.expiryDate!="" && passportData.expiryDate.match(letterNumber)) || (passportData.dateOfBirth!="" && passportData.dateOfBirth.match(letterNumber)) || (passportData.firstName!="" && passportData.firstName.match(letterNumber)) || (passportData.lastName!="" && passportData.lastName.match(letterNumber)))
					{
						 GlobalModule_notificationService.notification("error","Please enter valid text");
						 return;
					}
				 
				inputval.match(letterNumber)
					 var inputval=passportData[i];
					 var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
				     
					 if(inputval!="" && !inputval.match(letterNumber))
						{
							GlobalModule_notificationService.notification("error","Please enter valid text");
							return;
						}
					 
					 
					
				 
				 var option=document.getElementsByName('radiobtn');
				 if(option[0].checked){
					 $('.confirmed_passport_det').find('input').attr('disabled', 'disabled');
				 }
				 if(option[1].checked){
					 if(passportData!=null){
					 if(passportData.passportNo!=" " && passportData.passportNo!=null && passportData.passportNo != undefined && passportData.dateOfIssue != undefined &&  passportData.expiryDate != undefined && passportData.lastName != undefined && passportData != null){
					$('.others_passport_det').find('input').attr('disabled', 'disabled');
					document.getElementById("selectd").disabled = true;
					 $("#edit").show();
					 }
				 }}
				 if (!option[1].checked && !option[0].checked) {
					 GlobalModule_notificationService.notification("error","Please select country of issue");
			          return;
				  }
				 
				 var letterNumber = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/ig;
				 if(!passportData.passportNo == undefined) {
				 if(!(passportData.passportNo.match(letterNumber)))
			      {
			          GlobalModule_notificationService.notification("error","Please enter valid passport number");
			          return;
			      }
				 }
			      if(passportData.passportNo == undefined || passportData.passportNo == "" || passportData.dateOfIssue == undefined ||  passportData.expiryDate == undefined || passportData.lastName == undefined || passportData == null || passportData.dateOfIssue == "" ||  passportData.expiryDate == "" || passportData.dateOfBirth==undefined || passportData.dateOfBirth == "")
					{
					 GlobalModule_notificationService.notification("error","Please add passport details");
					 return;
					}

				  if (!option[1].checked) {
					 // alert();
					  if($scope.passportData.filePath!=undefined){
						  passportData.path=$scope.passportData.filePath;
						  passportData.countryOfissue="India";
					  }
					  else{
						  passportData.path=$scope.PassData.filePath;
						  passportData.countryOfissue="India";
					  }
					 
				  }
				  if (!option[0].checked) {
					  document.getElementById("others").checked = true;
					  
						  if($scope.userPass == undefined){
							  $scope.passportData.path=null;
						  }
						  else{
						  passportData.path=$scope.passportData.path;
						  }
					  
					  
					 // passportData.countryOfissue="Others";
					 
				  }
				 passportData.id=$rootScope.userdetails.id;
				 Profile_Service.updatePassportData(passportData).then(function(response){	
					 $(".loader").show();	
					 fetchpdata();
					 if($scope.passportData.flag != undefined){
						  GlobalModule_notificationService.notification("error","Please add your details");
						  return;
					  } 
					 else{
					 GlobalModule_notificationService.notification("success","Your passport details have been added successfully");
					 $scope.showFlag = 2;
					  $scope.setApplyClass(2);
					 }
						}); 
					};
					*/
			
					
					$scope.confirmedData= function(passportData)	
					{
						if(passportData.passportNo == undefined || passportData.dateOfIssue == undefined ||  passportData.expiryDate == undefined  ||passportData.placeOfIssue == undefined || passportData.placeOfIssue == "" ||passportData.placeOfBirth == undefined ||passportData.placeOfBirth == "" || passportData == null || passportData.dateOfIssue == "" ||  passportData.expiryDate == "" || passportData.dateOfBirth==undefined || passportData.dateOfBirth == "")
							{
							 GlobalModule_notificationService.notification("error","Please fill all the mandatory fields");
							 return;
							}
						var id=$rootScope.userdetails.id;
						var matchreg="[A-Z]"; 
						 var matchnumber=  "^(0|[1-9][0-9]*)$";
						var p1=passportData.passportNo;
						var validp1=p1.substring(0, 1);
						var validnumbers=p1.substring(1, 8);
						var passvalidnum=parseInt(validnumbers)
						if(passportData.passportNo != undefined   ){
						if(!(validp1.match(matchreg)) || ( passportData.passportNo.length != 8) || (validnumbers.length != 7) ){
							 GlobalModule_notificationService.notification("error","Please enter valid passport number");
					          return false;
						}
					}
						//var letterNumber = /^[A-Z][1-9]\d\s?\d{4}[1-9]$/ig;
						/*var letterNumber ="^[A-Z][0-9]{8}$";
						 if(passportData.passportNo != undefined) {
						 if(!(passportData.passportNo.match(letterNumber)))
					      {
					          GlobalModule_notificationService.notification("error","Please enter valid passport number");
					          return false;
					      }
						
						 }*/
						 
								$scope.passportData=passportData;
								 $("#browsePic").hide();
								 $("#passport_sample").hide();
								 document.getElementById("india").checked = true;
								 $('.confirmed_passport_det').find('input').attr('disabled', 'disabled');
								 $("#passport_det").modal("hide");
								$(".confirmed_passport_det").show();
								$("#updatebtn").show();
								$("#addbtn").hide();
								$(".others_passport_det").hide();
								$("#reuploaddiv").css("display","none");
						};
						
						
						$scope.removeReadonly= function()	{
							 $('.confirmed_passport_det').find('input').attr('disabled', false);
							 document.getElementById("selectd").disabled = false;
							};
					
							$scope.removeReadonly1= function()	{
								 $('.others_passport_det').find('input').attr('disabled', false);
								 document.getElementById("selectd").disabled = false;
								};
							
								
								
							
							$( document ).ready(function() 
							{
								fetchpdata();
							});
							
						
							
							$("#india").click(function() {
								
								$('#browsePic').find('input:text').val('');
								 $("#browsePic1").hide();
								$scope.passportData= $scope.passData1;
								if($scope.passportData == null  && ($scope.filepath=="" || $scope.filepath==undefined))
								 {
								        $("#browsePic").show();
								        $(".others_passport_det").hide();
								        $("#addbtn").hide();     
								        
								 }
								/*if($scope.passportData == null && $scope.filepath=="")
								 {
								        $("#browsePic").show();
								        $(".others_passport_det").hide();
								        $("#addbtn").show();     
								        
								 }*/
								
								if($scope.passportData.countryOfissue == "India" && $scope.passportData.passportNo !=" " && $scope.filepath!=""){
									 $scope.passportData= $scope.passData1;
									 fetchpdata();
									 $(".others_passport_det").hide();
									 $(".confirmed_passport_det").show();
									 $("#addbtn").hide();
									 $("#updatebtn").show();
								 }
								 /*if( $scope.passportData.countryOfissue != "Others" && $scope.passportData.countryOfissue != "India")
								 	{
									     $("#browsePic").show();
										 $("#edit").hide();
										 $(".confirmed_passport_det").hide();
								         $(".others_passport_det").hide();
									}*/
								 if($scope.passportData.countryOfissue == "India" && $scope.passportData.passportNo ==" "){
									 $("#browsePic").show();
									 $("#edit").hide();
									 $(".confirmed_passport_det").hide();
							         $(".others_passport_det").hide();
									 $("#addbtn").hide();
								 }
								  if($scope.passportData.countryOfissue != "India" && $scope.passportData.passportNo !=" "){
									 $("#browsePic").show();
									 $("#edit").hide();
									 $(".others_passport_det").hide();
									 $(".confirmed_passport_det").hide();
									 
									 $("#updatebtn").hide();
									 //$('.others_passport_det').find('input').attr('disabled', false);
								 }
						    
						    });
							 $("#others").click(function() {
							/*	 fetchpdata();*/
								 $('#browsePic1').find('input:text').val('');
								// $scope.passportData= $scope.passData2;
								 if($scope.passportData==null){
									 $('.others_passport_det').find('input:text').val('');
								    $(".others_passport_det").show();
								    $(".confirmed_passport_det").hide();
								    $("#browsePic").hide();
								    $("#addbtn").show();
								    $("#browsePic1").show();
								   // $("#browsePic").hide();
								 }
								 else{
									 
								    if( !$scope.passportData.countryOfissue == "Others" && !$scope.passportData.countryOfissue == "India")
								 	{
									     $("#browsepic").show();
										 $("#edit").hide();
								         $(".others_passport_det").hide();
								         $(".confirmed_passport_det").hide();
								         //$scopr.passportData='';
									}
								     /*if($scope.passportData.countryOfissue == undefined && $scope.passportData.passportNo!=" "){
								    	 $scope.passportData=null;
								    	 $('.others_passport_det').find('input:text').val('');
										 $(".others_passport_det").show();
										 $(".confirmed_passport_det").hide();
										 $("#browsePic1").show();
										 $("#addbtn").show();
										 $("#updatebtn").hide();
										 $("#edit").hide();
									 }*/
								     if($scope.passportData.countryOfissue == "India" && $scope.passportData.passportNo!=" " )
								    	 {
								    	 $scope.filepath=$scope.passportData.path;
								    	 $scope.passportData=null;
								    	 
									    	 $('.others_passport_det').find('input:text').val('');
											 $(".others_passport_det").show();
											 $(".confirmed_passport_det").hide();
											 $("#browsePic1").show();
											 $("#addbtn").show();
											 $("#updatebtn").hide();
								    	 }
								     if($scope.passportData.passportNo!=" "){
								    	 fetchpdata();
								    	 $(".others_passport_det").show();
										 $("#browsePic").hide();
										 $("#browsePic1").hide();
										 $(".confirmed_passport_det").hide();
										 $('.others_passport_det').find('input').attr('disabled', true);
										 document.getElementById("selectd").disabled = true;
										 $("#edit").show();
										 document.getElementById("selectd").disabled = true;
									 }
								     
								     if($scope.passportData.countryOfissue != "India" && $scope.passportData.passportNo==" " || $scope.passportData.passportNo==" " || $scope.passportData.countryOfissue == null){
							
								    	 $('.others_passport_det').find('input:text').val('');
								    	 $('.others_passport_det').find('input').attr('disabled', false);
								    	 $(".others_passport_det").show();
										    $(".confirmed_passport_det").hide();
										    $("#browsePic").hide();
										    $("#addbtn").show();
										    $("#edit").hide();
										    document.getElementById("selectd").disabled = false;
										    $("#updatebtn").hide();
										    $("#browsePic1").show();
										 }
								     
								     
								 }   
								    
								    });
							 
							
							 
							 $scope.validateDate1 = function(passportData){  //---------validate issue date and expiry date	
								 
							        if ( new Date(stringToDate(passportData.dateOfIssue,"dd-mm-yyyy","-")) > new Date(stringToDate(passportData.expiryDate,"dd-mm-yyyy","-")) ) { 
							           				          
							           $scope.passportData.expiryDate='';
									   GlobalModule_notificationService.notification("error","You seem to have entered a date from the future.Please enter the correct date");							   
							        	//$('#'+element).val(null);
							            return false;
							        }
							        return true;
							        
						   };
						   
						   
						 $scope.cleardata = function(){  
							   $("#passport_det").modal("hide");
							   $(".modal-backdrop").hide();
							   $scope.userPassport.name='';
							   $('#browsePic1').find('input:text').val('');
							  // $scope.passportData=null;
							   $scope.showFlag = 1; 
							   location.reload();
						   };
						   $scope.dateFormat = function(data){  
						 
							   var letterNumber = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/;
								 if(!data.match(letterNumber)) {
									 GlobalModule_notificationService.notification("error","Invalid date");							   
							        	return;
								 };
							   
						   }
						   $scope.dateBirthcheck= function(dob,passportData){
								  
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
				                	  passportData.dateOfBirth='';
				                  GlobalModule_notificationService.notification("error","Uh-Huh! You need to be 18 or older in order to apply.");
				                  return;
				                  }
				                  
				                  
							  };
							  
							  	$scope.checkinputtext= function(inputval,id)
							  	{
								 
								      var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
								      if(inputval!="" && !inputval.match(letterNumber))
										{
								    	    $('#'+id).val('');
								    	    //document.getElementById(id).focus();
											GlobalModule_notificationService.notification("error","Please enter valid text");
											return;
										}
										
				                  
							  };
							  
							  $scope.showPassportData= function()
							  	{
									var id=$rootScope.userdetails.id;
									 Profile_Service.showPassportData(id).then(function(response){
										 if(response.data!=null){
										 $scope.userPassportData=response.data;
										 console.log( $scope.userPassportData);
										 $("#passport_det_modal").modal("show");
										 }
										 else{
												GlobalModule_notificationService.notification("error","No passport details found");

										 }
									 });
								};
							  
							  
								$(".others_passport_det").click(function(){
									
									var option=document.getElementsByName('radiobtn');
									if(option[1].checked && $scope.passportData== null){
										
										var input = document.getElementById('passportImage2');
										var path=input.value;
										if(path=="")
										{
											GlobalModule_notificationService.notification("error","Please browse file");
											document.getElementById("passportImage2").focus();
											return;
										}
									}
								});
								
								/*$(function(){
								    $(".others_passport_det").bind('keypress',function(e){
								        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
								        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
								        if (regex.test(str)) return true;
								        e.preventDefault();
								        GlobalModule_notificationService.notification("error","txt xtxt txtxxt txtx");
								        return false;
								    });
								});
								
								*/
								
								$scope.showConformReuploadModal	=function(){
									
									 $("#reupload-passport").modal("show");
								};
								
								$scope.PreviewDownloadEdu = function(path){
									   
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
								$scope.reUploadPassport=function(){
									$(".loader").show();
									var id=$rootScope.userdetails.id;
									 //Profile_Service.updatePassportOnReupload(id).then(function(response){
										//alert();
										 //$scope.Status=response.data;
										 
										
										 $(".confirmed_passport_det").hide();
										 $("#updatebtn").hide();
										 //location.reload();
										 $("#browsePic").show();
										 $('#browsePic').find('input:text').val('');
										 $("#passport_sample").show();
										 $("#passport_det_modal").modal("hide");
										 $(".loader").fadeOut("slow");
										 
										 //$("#passport_det_modal").modal("hide");
										
								//});
									 
								};
													
}]);
