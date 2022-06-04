'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('create_group_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','group_mapping_Service','survey_assignment_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,group_mapping_Service,survey_assignment_Service){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.wf_Group=GlobalModule_dataStoreService.loadData('LoginModule','group');
	
	
	var fetchGroupOwnersList = function(groupId)
	{
		$(".loader").show();
		
		group_mapping_Service.fetchGroupOwnersList(groupId).then(function(response){
			
			 $scope.ownerList = response.data;
			 			 
		 },function(response){
		 });
		
		 $(".loader").fadeOut("slow");
	};
	
	if($scope.wf_Group != undefined)
	{
		$scope.groupMap={wf_Group:$scope.wf_Group};
		fetchGroupOwnersList($scope.wf_Group.id);
	}

	//--------------------- insert query controller---------------------
	
	$scope.createGroup =function(groupMap){
		
		 $(".loader").show();
		 
		 var validationFlag=validateGroup(groupMap);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 
		 groupMap.users=$scope.ownerList;
		 groupMap.wf_Group.createdby=$rootScope.userdetails.id;
		//$scope.id=brand.id;
		//brand.userid=$rootScope.userdetails.id;
		
		 group_mapping_Service.createGroup(groupMap).then(function(response){	
			
			  $scope.groupresponse = response.data;
			  
			  if($scope.groupresponse=="duplicate")
				  {
				    GlobalModule_notificationService.notification("error","Group name already exist");
				    groupMap.wf_Group.name="";
				    groupMap.wf_Group.description="";
				    
				  }
		
			 
			  if($scope.wf_Group === undefined){
				  GlobalModule_notificationService.notification("success","Your group has been added successfully");
		          $state.go("restricted.admin.grouplisting");
		          $(".loader").fadeOut("slow");
			  }
			  else if($scope.groupresponse=="success")
				  {
			          GlobalModule_notificationService.notification("success","Your group has been updated successfully");
			          $state.go("restricted.admin.grouplisting");
			          $(".loader").fadeOut("slow");
				  }
			  
			  
			 /* else if($scope.wf_Group.id !== undefined){
				  GlobalModule_notificationService.notification("success","Your group has been updated successfully");
		          $state.go("restricted.admin.grouplisting");
		          $(".loader").fadeOut("slow");
			  }
			*/  
			  else if($scope.groupresponse=='failed'){
				  
				  GlobalModule_notificationService.notification("error","group not created");
				  $("#add_brand").modal('hide');
				  $(".loader").fadeOut("slow");
				 
			 }
			  
			  
			  else
				  {				  	
				      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				      $(".loader").fadeOut("slow");	
				  }
			 
		 });

	};

	
/*	//create group
	$scope.createGroup=function(group){
		
		 $(".loader").show();
		 
		 var validationFlag=validateGroup(group);
		 
		 if(!validationFlag)
		 {
			 $(".loader").fadeOut("slow");
			 return;
		 }
		 group.users=$scope.ownerList;
		 group.wf_Group.createdby=$rootScope.userdetails.id;
		//$scope.id=brand.id;
		//brand.userid=$rootScope.userdetails.id;
		
		 group_mapping_Service.createGroup(group).then(function(response){	
			
			  $scope.groupresponse = response.data;
		
			  if($scope.groupresponse.indexOf("success") != -1)
				  {
			          GlobalModule_notificationService.notification("success","Your group has been added successfully");
			          $state.go("restricted.admin.grouplisting");
			          $(".loader").fadeOut("slow");
				  }
			  else if($scope.groupresponse=='failed'){
				  
				  GlobalModule_notificationService.notification("error","group not created");
				  $("#add_brand").modal('hide');
				  $(".loader").fadeOut("slow");
				 
			 }
			  
			  else
				  {				  	
				      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				      $(".loader").fadeOut("slow");	
				  }
			 
		 });

	};

	
*/	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var validateGroup=function(groupMap){
		
		//$scope.role={roleMenuMapping:[]};
				
		
		
		$(".loader").show();
		
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
		if(groupMap == undefined)
		 {
			 GlobalModule_notificationService.notification("error","Please fill all mandatory fields");			 
			 return false;
		 }
		
		if($scope.ownerList.length == 0)
		 {
			GlobalModule_notificationService.notification("error","Please add at least one owner for group");			 
			 return false; 
		 }
		
		
   	if(groupMap.wf_Group.name == undefined )
   	{
   		 GlobalModule_notificationService.notification("error","Please Enter Group name");			 
			 return false;
   	}
		else{
			if(!(groupMap.wf_Group.name.match(letterNumber)))
				{
				 GlobalModule_notificationService.notification("error","Please Enter valid Group name");			 
				 return false;
				}
		}
   	
   	/*//--email---//
   	if(users.email == undefined )
   	{
   		 GlobalModule_notificationService.notification("error","Please Enter Email");			 
			 return false;
   	}
		else{
			if(!(users.email.match(letterNumber)))
				{
				 GlobalModule_notificationService.notification("error","Please Enter valid Email");			 
				 return false;
				}
		}
   	//---end of code--//
   	*/
   	if(groupMap.wf_Group.description != undefined && !(groupMap.wf_Group.description.match(letterNumber)))
   	{		
		GlobalModule_notificationService.notification("error","Please Enter valid Description");			 
		return false;
	}
   	
		return true;
	};
	
	
$scope.fetchUserDetails=function(search){
	
		if(search=="")
		  {
			
		  }
		//console.log($rootScope.userdetails);

		//console.log($scope.userDetailsList);
	  
		  
	  if(search.length>3){
	 
		  search= search.split("  ");
			search=search[0];
		survey_assignment_Service.fetchEmployeeDetails(search,8).then(function(response){
			
		  $scope.userDetailsList = response.data;
          console.log($scope.userDetailsList);
		  $scope.OfficeUserList=[];
		  
//		  $scope.OfficeUserList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].empl_number});
		for(var i=0;i<$scope.userDetailsList.length;i++)
		{
			$scope.OfficeUserList.push({id:$scope.userDetailsList[i].id , name:$scope.userDetailsList[i].name,email:$scope.userDetailsList[i].email,roleName:$scope.userDetailsList[i].roleMaster.roleName});
			console.log($scope.OfficeUserList);
		}
				
	  },function(response){
		  
		});	 
	  }
	};
	

var validateUser=function(){
		
		
		$(".loader").show();
		
		for(var i=0;i<$scope.ownerList.length;i++){
			if($scope.ownerName==$scope.ownerList[i].name)
			{
				GlobalModule_notificationService.notification("error","User already exist");
				return false;
			}
			}
			 	
		return true;
	};


	
	
	$scope.ownerList=[];
	$scope.ownerName='';
	$scope.addOwnerInList=function(){
		$scope.ownerName= $scope.ownerName.split("  ");
		$scope.ownerName=$scope.ownerName[0];
		if($scope.ownerName == '')
		{
			 GlobalModule_notificationService.notification("error","Please Enter office user name");			 
			 return;
		}
		
		//console.log($scope.email);
		
		
		
var validationFlag=validateUser();

		if(!validationFlag)
		{
			$(".loader").fadeOut("slow");
			//$scope.ownerName='';
			return;
		}
		

		

		
		

		
		var temp=0;
		if($scope.userDetailsList != undefined && $scope.userDetailsList.length != 0)
		{
			for(var i=0;i<$scope.userDetailsList.length;i++)
			{
				if($scope.ownerName == $scope.userDetailsList[i].name)
				{	temp++;	
					$scope.ownerList.push({id:$scope.userDetailsList[i].id , name:$scope.userDetailsList[i].name,email:$scope.userDetailsList[i].email});
					//$scope.name=$scope.ownerList[i];
				}				
			}
		}
		
		if(temp == 0)
		{
			GlobalModule_notificationService.notification("error","Please Enter valid username ");	
			$(".loader").fadeOut("slow");
			return;
		}
		else
		{
			$(".loader").fadeOut("slow");
			$scope.ownerName='';
			$('#userdetail').val(null);
		}
		$(".loader").fadeOut("slow");
	};
	
	
$scope.deleteOwnerFromList=function(){
		

			$(".loader").show();
			
	  	
		var index=-1;
		
		for(var i=0;i<$scope.ownerList.length;i++)
		{
			if($scope.ownerList[i].id == $scope.deleteId)
			{
				index=i;				
			}
		}
		
		if(index != -1)
		{
			$scope.ownerList.splice(index,1);
			
		}
		
		$(".loader").fadeOut("slow");
	};
	
 
	/*$scope.deleteId=0;
	
	$scope.deleteOwnerFromList=function(id){
		
		 $('#deletelist').modal();
			$(".loader").show();
	
			var index=-1;
			index=i;
			
			for(var i=0;i<$scope.ownerList.length;i++)
			{
				$scope.deleteId=$scope.ownerList[i].id;
	
			}
			
			console.log($scope.ownerList);
			group_mapping_Service.deleteOwnerFromList($scope.deleteId).then(function(response){				
	  			$scope.deleteflag = response.data;
			
	  			if(index != -1)
	  			{
	  				$scope.ownerList.splice(index,1);
	  				
	  			}
	  			$('#deletelist').modal();
	  			
	  			
	  			$(".loader").fadeOut("sow");
	  		},function(response){
	  			$(".loader").fadeOut("slow");		
	  		});
	  	
	  	
	  };

*/
	
	
	
	
	
	
	
	
	 $scope.openDeleteModal= function(id)
	  {
		  $scope.deleteId=id;
		  /*$scope.paymentMaster={};*/
		  $('#deletelist').modal('show');
		  
	  };

	

}]);
