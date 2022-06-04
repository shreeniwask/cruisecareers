'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('chooseotp_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS){
	$scope.Validateuser = GlobalModule_dataStoreService.loadData('LoginModule','Validateuser');	
	if($scope.Validateuser == false){
		$state.go("forgotpassword");
	}
	$scope.resendActivationLink = function(){
		$(".loader").show();
		var emailid = GlobalModule_dataStoreService.loadData('LoginModule','emailforactivationlink');
		Login_Service.resendActivationLink(emailid).then(function(response){
			$scope.flag = response.data;
			if($scope.flag == true){
				GlobalModule_notificationService.notification("success","Activation link email send successfully");
				$(".loader").fadeOut("slow");	
				$scope.user.email ="";
			} 

		});
	}
	
	$scope.sendOtp = function(button){
		$(".loader").show();
		var user={};
		var option="notSelected";
		var opts = document.getElementsByName("radio-group");
		
		for(var x=0;x<opts.length;x++)
		{
			if(opts[x].checked)
			{
				option = opts[x].value;
				break;
			}
		}
		if(option == "notSelected"){
			GlobalModule_notificationService.notification("error","Please select atleast one option");
			$(".loader").fadeOut("slow");
			return;
		}
		if(option == "email"){
		$scope.userdetail = GlobalModule_dataStoreService.loadData('LoginModule','useremailid');
		var splitemail=$scope.userdetail.split("@");
		var name=splitemail[0];
		
		
	    
		var temp = "";
		for (var i = 0; i < name.length; i++) {
				if(i>4){
					temp=temp+"*";
				}
				else {
					temp = temp+name.charAt(i)
				}
			}
		$scope.userdetail=temp.concat("@"+splitemail[1]);
		}else if(option == "sms"){
		$scope.userdetail = GlobalModule_dataStoreService.loadData('LoginModule','usermobno');
		var checknumber=$scope.userdetail.substring( 2,$scope.userdetail.length-2);
		
		$scope.userdetail=$scope.userdetail.replace(checknumber, "******");
		
		}
		$scope.usereailid= GlobalModule_dataStoreService.loadData('LoginModule','useremailid');

		user.mfaoption=option;
		GlobalModule_dataStoreService.storeData('LoginModule','emailforactivationlink',$scope.usereailid);
		user.email=$scope.usereailid;
		Login_Service.sendOtpToUsers(user).then(function(response){

			$scope.otpinserttatus = response.data;
			if($scope.otpinserttatus == "success"){
				$("#selectmfa").css("display","none");
				$("#validateotp").css("display","inline");
				 var threeMinutes ;
				 threeMinutes = 60 * 3;
			     var display = document.querySelector('#time');
				 $scope.startTimer(threeMinutes,display);
			}
			else if($scope.otpinserttatus == "Inactive"){
				
				$('#resendactivationlink').modal('show');
				
			}
			$(".loader").fadeOut("slow");	
		},function(response){

			$(".loader").fadeOut("slow");

		});	
		
	};
	GlobalModule_dataStoreService.storeData('LoginModule','validateotp',false);	
	$scope.validateUserOtp=function(userotp){
		if(userotp == "" || userotp == undefined){
			GlobalModule_notificationService.notification("error","Please enter otp sent");
			return;
		}
		$(".loader").show();
		Login_Service.validateUserOtp(userotp).then(function(response){

			$scope.validateotpstatus = response.data;
			if($scope.validateotpstatus == "present"){
				
				$state.go("resetforgetpassword");
				GlobalModule_dataStoreService.storeData('LoginModule','validateotp',true);	
				GlobalModule_dataStoreService.storeData('LoginModule','Validateuser',true);	
			}
			else if($scope.validateotpstatus == "otpexp"){
				GlobalModule_notificationService.notification("error","Your otp has expired");
				$(".loader").fadeOut("slow");
				return;
			}
			else {
				GlobalModule_notificationService.notification("error","Your otp is invalid");
				$(".loader").fadeOut("slow");
				return;
			}
			$(".loader").fadeOut("slow");
		},function(response){

			$(".loader").fadeOut("slow");

		});	
	};
	
	
	 $scope.startTimer=function(duration, display) {
	    var timer = duration, minutes, seconds;
	 var  x= setInterval(function () {
	        minutes = parseInt(timer / 60, 10)
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;
	        $('#mysmstimer').html(minutes + ":" + seconds); 
	       // display.textContent = minutes + ":" + seconds;
	      //  $("#resend_otp").css("display", "none");
		
	        if (timer > 0) {
	        	--timer
	        	//return;
	        	
	         /*$("#resendDis").css("display", "none");
	        	$("#smsotp").prop("disabled", false);*/
	        
	        }
		
	       	//alert('Timeout for otp');
	       	else{
	       		clearInterval(x);
	       		//$("#time").css("display", "none");
	       		/*$("#resendDis").css("display", "");
	       		$("#smsotp").prop("disabled", true);*/
	       	}
	        	
	        	
	        //	timer=duration;
	        
	       
	       
	    }, 1000);
	    
	}

	
}]);
