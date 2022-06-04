'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Passport_Upload_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Passport_Upload_Service','Master_Service','Profile_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Passport_Upload_Service,Master_Service,Profile_Service){


	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($rootScope.userdetails);
	$scope.check='0'
	$scope.passport=false;
	$scope.details=false;
	//-----------------------Fetch passport detail after inserting refno and click on search button--------------
	 $scope.fetchPassportDetail = function(refno){
		 $scope.check='0';
		$scope.passport=true;
		$scope.details=false;
		
		
		 $scope.PassportNumber=null;
		 if(refno != undefined && refno != "" && refno!=null){
		 var refarray=refno.split('-');
		 var refno1 = refarray[1];
		 }
		 var format = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
		 $scope.PassportNumber=null;
		 if(refno == undefined || refno == "" || refno==null ){
			  GlobalModule_notificationService.notification("error","Please Enter Reference Number");    
			  return;
		 }
		 else if(!refno.startsWith("C-")){
			 if(refno.startsWith("c-")){
				 
			 }else{
				 GlobalModule_notificationService.notification("error","Invalid Reference Number");    
				  return; 
			 }
			 
		 }
		 else if(refno.match("^[a-zA-Z]+$")){
			 GlobalModule_notificationService.notification("error","Invalid Reference Number");    
			  return;
		 }else if(refno.match("^[0-9]+$")){
			 GlobalModule_notificationService.notification("error","Invalid Reference Number");    
			  return; 
		 }
		 
		
		 Passport_Upload_Service.checkValidRefno(refno).then(function(response)
				 {
			           $scope.refNo = response.data;
			           if($scope.refNo==true){
			        	   
		 Passport_Upload_Service.fetchPassportDetail(refno).then(function(response){	    		 
				$scope.passportdetaildata = response.data;
				if($scope.passportdetaildata != null){
					$scope.PassportNumber=$scope.passportdetaildata.passportNo;
					
					
					$scope.check='1';
				$(".passport_parrent").show();
				$('.confirmed_passport_det').find('input').attr('disabled', 'disabled');
				$("#savepassportdetails"). attr("disabled", true);	
				$(".confirmed_passport_det").show();
				$("#uploadpassportfile").attr("disabled", true);
				$("#editpassportdetails").show();
				 $("#sampleuploadbutton").show();
				//$("#reuploadpassportfile").attr("disabled", 'disabled');
				$("#countryOfIssue").find('input').attr("disabled",true);
				$("#uploadfile").show();
				$("#dynamicpic").show();
				 $("#staticpic").hide();
				$scope.disabledupload=true;
				$scope.disabledreupload=true;
		 }else{
			 $(".passport_parrent").show();
			 $('.confirmed_passport_det').find('input').attr('disabled', false);
			 $("#savepassportdetails"). attr("disabled", false);
			 $("#countryOfIssue").find('input').attr("disabled",false);
			 $(".confirmed_passport_det").show();
			 $("#editpassportdetails").hide();
			 $("#sampleuploadbutton").show();
			 $("#uploadfile").show();
			 $("#dynamicpic").show();
			 $("#staticpic").hide();
			// $('.confirmed_passport_det').find('input').attr('disabled', 'disabled');
				$scope.disabledupload=false;
				$scope.disabledreupload=false;
		 }
				console.log($scope.passportdetaildata);
				
		 		});
			           }else{
			        	   $(".passport_parrent").hide();
			        	   GlobalModule_notificationService.notification("error","Invalid Reference Number");  
			        	   return;
			           }
			});
		};
		
		
		
		
		//------------------------------------CC-595 Fetching user details through passport number------------------------------------------	
		
		
		
		$scope.fetchUserDetail= function(passno) {	
			
			$(".loader").show();
			
			
			if(passno!="" && passno != undefined){
			var matchreg="[A-Z]"; 
			var matchnumber=  "^(0|[1-9][0-9]*)$";
			var passNo=passno;
			var validp1=passNo.substring(0, 1);
			var validnumbers=passNo.substring(1, 8);
			var passvalidnum=parseInt(validnumbers);
		
			if(!(validp1.match(matchreg)) || ( passno.length != 8) || (validnumbers.length != 7) ){
				 GlobalModule_notificationService.notification("error","Please enter valid passport number");
				  $(".loader").fadeOut("slow");
		         return false;
		       
				}
			
			}else{
				 GlobalModule_notificationService.notification("error","Please enter valid passport number");
				  $(".loader").fadeOut("slow");
		         return false;
			}
			
			
			
			$scope.passport=false;
			$scope.details=true;
			
			Passport_Upload_Service.fetchUserDetail(passno).then(function(response){
				  $scope.userdata = response.data;
				 
				  var createddate=$scope.formatDate($scope.userdata.createdDate);
				  $scope.userdata.createdDate=createddate;
				  
				  
				 console.log($scope.userdata);
				
					$(".loader").fadeOut("slow");	
			  },function(response){	
					$(".loader").fadeOut("slow");	
				  
				});
			
			$(".loader").fadeOut("slow");	
		};	
		
		
		//------------------------------------End------------------------------------------	
		
		
		 $scope.formatDate = function(date){
			 if(date != null || date == ' ' || date != undefined)
	         {
				 //var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
				 var dateOut = moment(date).format("DD-MM-YYYY");
		         return dateOut;
	         }
			 return;
	   };
		
		
	//------------------------------------cancel button------------------------------------------	
		
		 $scope.cancel = function(){			    	 
			 $state.reload(); 		    	  
	      };

	 	 $scope.editpassportdetails = function(){			    	 
	 		$("#savepassportdetails"). attr("disabled", false);	
			$(".confirmed_passport_det").show();
			 $('.confirmed_passport_det').find('input').attr('disabled', false);
			 $("#countryOfIssue").find('input').attr("disabled",false);
				$scope.disabledupload=false;
				$scope.disabledreupload=false;
	      };
	      //-----------------------------Save the profile details------------------------
	      
	      
	      
	      $scope.SavePassportDetails= function(passportdetaildata)	
			{
				/*if(passportdetaildata.passportNo == undefined || passportdetaildata.passportNo == "" || passportdetaildata.passportNo == null ||
				 *   passportdetaildata.dateOfIssue == undefined || passportdetaildata.dateOfIssue == "" || passportdetaildata.dateOfIssue == null ||
				 *   passportdetaildata.expiryDate == undefined || passportdetaildata.expiryDate == "" || passportdetaildata.expiryDate == null ||
				 *   passportdetaildata.placeOfIssue == undefined || passportdetaildata.placeOfIssue == "" || passportdetaildata.placeOfIssue == null ||
				 *   passportdetaildata.placeOfBirth == undefined || passportdetaildata.placeOfBirth == "" || passportdetaildata.placeOfBirth == null || 
				 *   passportdetaildata.dateOfBirth==undefined || passportdetaildata.dateOfBirth == "" || passportdetaildata.dateOfBirth == null)
					{
					 GlobalModule_notificationService.notification("error","Please fill all the mandatory fields");
					 return;
					}*/
	    	  $scope.passportNo=false;
				var id=$rootScope.userdetails.id;
				passportdetaildata.updatedBy=id;
				var matchreg="[A-Z]"; 
				 var matchnumber=  "^(0|[1-9][0-9]*)$";
				var passNo=passportdetaildata.passportNo;
				var validp1=passNo.substring(0, 1);
				var validnumbers=passNo.substring(1, 8);
				var passvalidnum=parseInt(validnumbers);
				if(passportdetaildata.passportNo != undefined   ){
				if(!(validp1.match(matchreg)) || ( passportdetaildata.passportNo.length != 8) || (validnumbers.length != 7) ){
					 GlobalModule_notificationService.notification("error","Please enter valid passport number");
			          return false;
					}
				}
				
				 $scope.passportNodup=false;
				 Passport_Upload_Service.checkValidPassportNo(passNo).then(function(response)
						 {
					           $scope.passportNo = response.data;
					           if( $scope.passportNo == true && passNo!=$scope.PassportNumber)
					        	   {
					        	   $scope.passportNodup=true;
					        	   GlobalModule_notificationService.notification("error","Passport number already exist");
					        	   return;
					        	   		
					        	   }
					           else{
					        	   $scope.passportNodup=false;
									if($scope.check=='1'){
										
										 var inputfile = document.getElementById('reuploadpassportfile');
									console.log(inputfile);
									if(inputfile==null){
										
										GlobalModule_notificationService.notification("error","Please upload image(.jpg/.jpeg/.png only)");
										
									}
									else if(inputfile.value!="")
									    {
									
										 $scope.passportdetaildata.countryOfissue="India";
										var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
										if(!allowedExtensions.exec(inputfile.value)){
										$(".loader").show();
										GlobalModule_notificationService.notification("error","Please upload image(.jpg/.jpeg/.png only)");
										$("#uploadpassportfile").val(null);
										$("#reuploadpassportfile").val(null);
										$(".loader").fadeOut("slow");			
										return;
									}	
										
										var file = inputfile.files[0];
										var formData = new FormData();
										formData.append("file",file);
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
													 if($scope.filedtailsforPassport != undefined)
														{
														 passportdetaildata.path = $scope.filedtailsforPassport.fileURL;
														 $scope.passportdetaildata.name = $scope.filedtailsforPassport.fileURL.split('/')[5];
														 $scope.passportdetaildata.countryOfissue="India";
														 $scope.savepassport(passportdetaildata);
														}
												}
									    });

									    }
									 else{
										 passportdetaildata.path = $scope.passportdetaildata.filePath;
										 $scope.savepassport(passportdetaildata);
									 }
								}
									else{
										 var inputfile = document.getElementById('uploadpassportfile');
											if(inputfile==null){
												
												GlobalModule_notificationService.notification("error","Please upload image(.jpg/.jpeg/.png only)");
												
											}
											else if(inputfile.value!="")
										    {
												 
												 $scope.passportdetaildata.countryOfissue="India";
												var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
												if(!allowedExtensions.exec(inputfile.value)){
												$(".loader").show();
												GlobalModule_notificationService.notification("error","Please upload image(.jpg/.jpeg/.png only)");
												$("#uploadpassportfile").val(null);
												$("#reuploadpassportfile").val(null);
												$(".loader").fadeOut("slow");			
												return;
												}	
											
											var file = inputfile.files[0];
											var formData = new FormData();
											formData.append("file",file);
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
														 if($scope.filedtailsforPassport != undefined)
															{
															 passportdetaildata.path = $scope.filedtailsforPassport.fileURL;
															 $scope.passportdetaildata.name = $scope.filedtailsforPassport.fileURL.split('/')[5];
															 $scope.passportdetaildata.countryOfissue="India";
															 $scope.savepassport(passportdetaildata);

															}
													}
										    });

										    }
										 else{
											 GlobalModule_notificationService.notification("error","Please Upload File");
											 return;
										 }
									}
									
					           }
							  
						  },function(response){
								
						});	
				

				};
				
				$scope.savepassport = function(passportdetaildata){
					
					var option=document.getElementsByName('radiobtn');
					 if(option[0].checked)
					 {
						 var refno=document.getElementById('referencenofield').value;
						 var refnoarray=refno.split('-');
						 var userid=refnoarray[1];
						 passportdetaildata.id=userid;
						 Profile_Service.adduserPassport(passportdetaildata).then(function(response){
							  $scope.flagpass = response.data;	
							  var option=document.getElementsByName('radiobtn');
								 if($scope.flagpass != '' && option[1].checked)
								 {
									 
								 }else{
									 if($scope.flagpass != ''){
										  GlobalModule_notificationService.notification("success","Your passport details have been added successfully");
										  $scope.fetchPassportDetail(refno);
										  return;
									 }
									 else{
										  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
										  return;
								   }
								 }
							  	  
					 },function(response){
						  $(".loader").fadeOut("slow");
						});
						 
					 }
					 else{
						 $(".loader").fadeOut("slow");
					 }
				};
				
				$("#india").click(function() {
					 $("#Othercountry").hide();
					 $("#sampleuploadbutton").show();
					 $("#uploadfile").show();
					  $(".confirmed_passport_det").show();
					  $("#editpassportdetails").show();
					  $("#dynamicpic").show();
						 $("#staticpic").hide();
						if($scope.passportdetaildata==null){
							 $("#editpassportdetails").hide();
						} 
				});
				
				 $("#others").click(function() {
					
					 $("#Othercountry").show();
					 $("#sampleuploadbutton").show();
					 $("#uploadfile").hide();
					 $("#editpassportdetails").hide();
					 $("#dynamicpic").hide();
					 $("#staticpic").show();
					 
					  $(".confirmed_passport_det").hide();
					  
					
				 });
				
				 $scope.getindex=function(){
					 $scope.removeflag=false;
					
					 function readURL(input) {
					        if (input.files && input.files[0]) {
					            var reader = new FileReader();

					            reader.onload = function (e) {
					                $('#uploadpassportimg').attr('src', e.target.result);              
					            };            
					            
					            reader.readAsDataURL(input.files[0]);
					        }
					    }
					      $('#uploadpassportfile').change(function () {
					        readURL(this);
					    }); 
					
				};
				$scope.getindex1=function(){
					 function readURL(input) {
					        if (input.files && input.files[0]) {
					            var reader = new FileReader();

					            reader.onload = function (e) {
					                $('#reuploadpassportimg').attr('src', e.target.result);              
					            };            
					            
					            reader.readAsDataURL(input.files[0]);
					        }
					    }
					      $('#reuploadpassportfile').change(function () {
					        readURL(this);
					    }); 
					
				};

}]);