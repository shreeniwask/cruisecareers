'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('create_role_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','role_mapping_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,role_mapping_Service){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.roleMenuMapping={role:{}};
	$scope.role=GlobalModule_dataStoreService.loadData('LoginModule','role');
	
	if($scope.role != undefined)
	{
		$scope.roleMenuMapping.role=$scope.role;
	}
	
	$scope.fetchRoleMenuList=function(roleId){
		 role_mapping_Service.fetchRoleMenuList(roleId).then(function(response){
			 $scope.menuroleList = response.data;
			 
			// console.log($scope.menuroleList);
			 
		 },function(response){
		 });		  
	};
	
	if($scope.role!=undefined)
	$scope.fetchRoleMenuList($scope.role.id);
	else{
		$scope.fetchRoleMenuList(0);
	}
		 
		
	
	
	  //----------------insert role details----------------
		
		var validateRole=function(roleMenuMapping){
			
			//$scope.role={roleMenuMapping:[]};
					
			
			
			$(".loader").show();
			
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
			  
			if(roleMenuMapping == undefined)
			 {
				 GlobalModule_notificationService.notification("error","Please fill all mandatory fields");			 
				 return false;
			 }
			
	    	if(roleMenuMapping.role.name == undefined )
	    	{
	    		 GlobalModule_notificationService.notification("error","Please Enter Role name");			 
				 return false;
	    	}
			else{
				if(!(roleMenuMapping.role.name.match(letterNumber)))
					{
					 GlobalModule_notificationService.notification("error","Please Enter valid Role name");			 
					 return false;
					}
			}
	    	if(roleMenuMapping.role.roleDescription == undefined)
	    	{
	    		 GlobalModule_notificationService.notification("error","Please Enter Description");			 
				 return false;
	    	}
	    	else{
	    		if(!(roleMenuMapping.role.roleDescription.match(letterNumber))){
	    			
	    			 GlobalModule_notificationService.notification("error","Please Enter valid Description");			 
					 return false;
	    		}
	    	}
	    	
	    	 if($scope.menuroleList.length != 0)
			 {
				 var temp=0;
				 
				 for(var i=0; i<$scope.menuroleList.length; i++)
					{	
						 if($scope.menuroleList[i].isSelected == true)
						 {
						 	temp++;
						 	break;
						 }
					}	
					 		 
					if(temp == 0)
					{
						GlobalModule_notificationService.notification("error","Please Select at least one field");			 
						return false;
					}
			 }
			 
			 
			return true;
		};
		
		$scope.saveCreatedRole =function(roleMenuMapping){
			
			 $(".loader").show();
			 
			 var validationFlag=validateRole(roleMenuMapping);
			 
			 if(!validationFlag)
			 {
				 $(".loader").fadeOut("slow");
				 return;
			 }
			 roleMenuMapping.menus=$scope.menuroleList;
			
			role_mapping_Service.saveCreatedRole(roleMenuMapping).then(function(response){	
				
				  $scope.roleresponse = response.data;
				
				  if($scope.roleresponse.indexOf("success") != -1)
					  {
				          GlobalModule_notificationService.notification("success","Your role has been added successfully");
				          $state.go("restricted.admin.role_listing");
				          $(".loader").fadeOut("slow");
					  }
				  else if($scope.roleresponse=='failed'){
					  
					  GlobalModule_notificationService.notification("error","role Name already exist");
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
		
		$scope.updateRole=function(roleMenuMapping){
			
			 $(".loader").show();
			 
			 var validationFlag=validateRole(roleMenuMapping);
			 
			 if(!validationFlag)
			 {
				 $(".loader").fadeOut("slow");
				 return;
			 }
			 roleMenuMapping.menus=$scope.menuroleList;
			
			
			
			role_mapping_Service.saveCreatedRole(roleMenuMapping).then(function(response){	
				
				  $scope.roleresponse = response.data;
				
				  if($scope.roleresponse.indexOf("success") != -1)
					  {
				          GlobalModule_notificationService.notification("success","Your role has been Updated successfully");
				          $state.go("restricted.admin.role_listing");
				          $(".loader").fadeOut("slow");
					  }
				  else if($scope.roleresponse=='failed'){
					  
					  GlobalModule_notificationService.notification("error","role Name already exist");
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
		     
		     
		    /* 
		     $scope.fetchRoleList=function(id){
		    	 
		    	 role_mapping_Service.fetchRoleList().then(function(response){
					 $scope.roleList = response.data;

		    	 	},function(response){
		    	 	});
					 
		     		};
		    
			 
			
			$scope.selectedrole= function(){
				 if($scope.roleList[0].name==$scope.role.name){
					// alert($scope.roleList[0].id);
					$scope.fetchRoleMenuList($scope.roleList[0].id);
					 
				 }
			 };*/
			
			/* $scope.fetchMenuList=function(){
			 
			 
				 assessEngine_Service.fetchMenuList().then(function(response){
					 
				 		$scope.menulist=response.data;

				 		for(var i=0;i<$scope.menulist.length;i++)
				 		{
				 			$scope.menus.roleMenuMapping[i].id=$scope.menulist[i].id;
				 			
				 		}
				 		console.log($scope.menulist);
				 		
				 		
				 },function(response){
					});	 
					 };
				
				*/
		
		
		

	
}]);