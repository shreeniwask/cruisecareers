'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('consulate_verfication_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS','consulate_verfication_Service', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS,consulate_verfication_Service){

	$scope.id;
	$scope.showflag= 1;
	  $scope.showFlag = function(id){			  
		  $scope.showflag  = id;
		  for (var i=1;i<=4;i++)
			  {
			  if (i==id)
				  document.getElementById("list"+i).classList.add("active");
			  else 
				  document.getElementById("list"+i).classList.remove("active");
			  }
	  };
	
	$scope.checkNumberOfCandidate = function()
	{	
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		//var name= $("#name").val();
		
		var dob=$("#dob").val();
		var newdate;
		if(dob==null || dob=="")
		  {
		  newdate= undefined;
		  
		  }
		else{
			var datearray = dob.split("/");
			 newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
			
		}
				
		//var refNo= $("#refNo").val();
		var passNo=$("#passNo").val();
		/*if(name=="")
			{
			GlobalModule_notificationService.notification("error","Please Enter Name");
				return;
			}*/
		/*if(name!="" && !name.match(letterNumber))
			{
			GlobalModule_notificationService.notification("error","Please Enter Valid Name");
			return;
			}*/
		/*if(dob=="")
		{
			GlobalModule_notificationService.notification("error","Please Enter Date Of Birth");
			return;
		}*/
		 var letterNumber = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/ig;
		if(passNo=="")
		{
			GlobalModule_notificationService.notification("error","Please Enter Passport Number");
			return;
		}else if(!(passNo.match(letterNumber))){
			
			GlobalModule_notificationService.notification("success","Please enter valid passport number");
			  return;
		}
		/*else if(dob == "" && passNo != ""){
			
			consulate_verfication_Service.checkNumberOfCandidate(passNo).then(function(response){
				
				$scope.noOfCandidate=response.data;
				if($scope.noOfCandidate==0)
				{
					$("#infodiv").hide();
					$("#backbtn").hide();
					GlobalModule_notificationService.notification("error","No Records Found");
					return;
				}
				if($scope.noOfCandidate>1)
					{
						$("#p").show();
						$("#infodiv").hide();
						return;
					}
				else
				{
					$("#tbl").find("input,button,textarea,select").attr("disabled", "disabled");
					$("#p").hide();
					$("#viewbtn").hide();
					$("#canclebtn").hide();
					$("#backbtn").show();
					$("#infodiv").show();
					$("#visabtn").show();
					if(passNo == null || passNo== ""){
						passNo = undefined;
					 }
					if(refNo == null || refNo== ""){
						refNo = undefined;
					 }
						consulate_verfication_Service.userprofiledetails(newdate,passNo).then(function(response)
						{
							$scope.userProfile = response.data;
							//console.log($scope.userProfile);
							if($scope.userProfile==0)
							{
								$("#infodiv").hide();
								GlobalModule_notificationService.notification("error","No Records Found");
								return;
							}
							else{
							$scope.educationalInfo = $scope.userProfile.userEducationList;
							$scope.contactInfo = $scope.userProfile.userContact;
							
							$scope.userWork =[];
							 if($scope.userProfile.userWorkList != undefined)
							 {
								 $scope.userWork =	 $scope.userProfile.userWorkList;
							 }
							$scope.compliancelog = $scope.userProfile.userComplianceList;
							
							}
						},function(response){
							  $(".loader").fadeOut("slow");
					    });
					
				}
				
				  },function(response){
					  $(".loader").fadeOut("slow");
			    });
			
		}
		else if(dob != "" && passNo != "")
		{
			var reg = /^\d+$/;
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			
			if(name!="" && !name.match(letterNumber))
			{
				GlobalModule_notificationService.notification("error","Please Enter Valid Name");
				return;
			}
			
			if(refNo!="")
				{
					    if(refNo.startsWith("C-") && refNo.length>=2)
						{
							var refNo1=refNo.substring(2);
							if(!refNo1.match(reg)){
								GlobalModule_notificationService.notification("error","Please Enter Valid Reference Number");
								return;
							}
						}
						 if(refNo.startsWith("C") && refNo.length<=1 || refNo.startsWith("c"))
						{
								GlobalModule_notificationService.notification("error","Please Enter Valid Reference Number");
								return;
						}
						 if((!refNo.startsWith("C-") && !refNo.startsWith("c")) && !refNo.match(reg))
							 {
							 GlobalModule_notificationService.notification("error","Please Enter Valid Reference Number");
								return;
							 }
						
					}
			else if(!refNo.match(reg)){
				GlobalModule_notificationService.notification("error","Please Enter Valid Reference Number");
				return;
			}
			if(passNo!="" && !passNo.match(letterNumber))
			{
				GlobalModule_notificationService.notification("error","Please Enter Valid Passport Number");
				return;
			}
			if(refNo == null || refNo== ""){
				refNo = undefined;
			 }	
			if(passNo == null || passNo== ""){
				passNo = undefined;
			 }
			
			consulate_verfication_Service.countCandidate(newdate,passNo).then(function(response){
				
				
				$scope.noOfCandidate=response.data;
				if($scope.noOfCandidate==0)
				{
					$("#infodiv").hide();
					$("#backbtn").hide();
					GlobalModule_notificationService.notification("error","No Records Found");
					return;
				}
				if($scope.noOfCandidate>1)
					{
						$("#p").show();
						$("#infodiv").hide();
						return;
					}*/
				if(true)
				{
					$("#tbl").find("input,button,textarea,select").attr("disabled", "disabled");
					$("#p").hide();
					$("#backbtn").show();
					$("#viewbtn").hide();
					$("#canclebtn").hide();
					//$("#infodiv").show();
				
               consulate_verfication_Service.checkNumberOfCandidate(passNo,newdate).then(function(response){
						
						$scope.noOfCandidate=response.data;
						if($scope.noOfCandidate==0)
						{
							$("#infodiv").hide();
							//$("#backbtn").hide();
							GlobalModule_notificationService.notification("error","No Records Found");
							return;
						}
						else{
						consulate_verfication_Service.userprofiledetails(newdate,passNo).then(function(response)
						{
							$scope.userProfile = response.data;
							
							if($scope.userProfile==0)
							{
								$("#infodiv").hide();
								GlobalModule_notificationService.notification("error","No Records Found");
								return;
							}
							else{
								$("#infodiv").show();	
							$scope.educationalInfo = $scope.userProfile.userEducationList;
							$scope.contactInfo = $scope.userProfile.userContact;
							$scope.complianceInfo = $scope.userProfile.userComplianceList;
							$scope.userWork =[];
							 if($scope.userProfile.userWorkList != undefined)
							 {
								 $scope.userWork =	 $scope.userProfile.userWorkList;
							 }
							
							 if($scope.userProfile.userWorkList==0)
								 {
								    $("#pdiv").show(); 
								 }
							 $("#visabtn").show();							
							}
						},function(response){
							  $(".loader").fadeOut("slow");
					    });	
               }
},function(response){
	  $(".loader").fadeOut("slow");
});	
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
			}
	};
	
	 $( document ).ready(function() {
		 $("#infodiv").hide();
		 $("#backbtn").hide();
		 $("#visabtn").hide();
		});

	 $scope.pageload=function(){
			$state.reload();
		};
		$scope.check=function(){
			if($scope.userProfile.documentsBean==0)
				{
				GlobalModule_notificationService.notification("error","No Visa Application Found");
				return;
				}
		};
		
		 $("#visabtn").show();
		
		$(".view_consulate li:first").addClass("active");
		
		/*$scope.scrollToDiv=function(id){
			    event.preventDefault();
			    var target = "#" + id;
			    $('html, body').animate({
			        scrollTop: $(target).offset().top
			    }, 2000);
		};*/
}]);
