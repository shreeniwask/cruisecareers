'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('createAdminUser_Ctrl',['$scope','$state','$rootScope','$location','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Login_Service','createAdminUser_Service', function ($scope,$state, $rootScope,$location,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Login_Service,createAdminUser_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	 
	    /*GlobalModule_dataStoreService.loadData('LoginModule','flag');*/	 
	 $scope.senderId=$rootScope.userdetails.id;
		
		 
		 $scope.flag=GlobalModule_dataStoreService.loadData('LoginModule','flag');
		            
		 $scope.u={};
		 if(!$scope.flag){
			 
			 $scope.u = GlobalModule_dataStoreService.loadData('LoginModule','userUpdateData');
		 }
		 
		 $scope.getUserlist = function(offset,limit,colName,order,search){

			 $(".loader").show();
			 
			 $scope.getCheckedId=[];
			  if(search=="" || search==null)
				  {
				  search= undefined;
				  }
			  if(colName == null || colName== ""){
					 colName = undefined;
				 }
				 if(order == null){
					 order = undefined;
				 }
				 
				 createAdminUser_Service.getUserList(offset,limit,colName,order,search).then(function(response){
				 $scope.getUserList=response.data;
				 //console.log($scope.getUserList);
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
		 }; 
		  
		 $scope.getUserlist(0,10,null,null,null);
		
		  $scope.clear = function(){
				 
				 $scope.u={};
				 
				 for(var i=0;i<$scope.fetchRole.length;i++)
					 {
				  
					 $scope.fetchRole[i].checkFlag=false;
					 
					 }
				/* if($("#check"+question[i].id).is(":checked")){						 
						$scope.getCheckedQuesid.push(question[i].id);				  		
						  }		
				*/
			};
			//console.log( $scope.u);	
			 
			
		$scope.addUsers = function(){
			$scope.clear();
			//console.log( $scope.u);
			$scope.flag=true;
		
			GlobalModule_dataStoreService.storeData('LoginModule','flag', true);
			
		//	 //console.log($scope.getUserList);
			 $state.go("restricted.admin.addUsers");
		};
		
		  
		

	 $scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}		
				 $scope.getUserlist($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
	
	  $scope.getUserListCount=function(search){
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=search;
			if($scope.search==null || $scope.search=="")
			  {
				$scope.search= undefined;  
			  }
		  if($scope.colName == null || $scope.colName== ""){
			  $scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 createAdminUser_Service.getUserListCount($scope.search).then(function(response){
				$scope.count = response.data;
		     	console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getUserListCount(null);
	    
		
		$scope.previous = function() {
			$scope.start =  $scope.start - 5;
	        $scope.offset = $scope.start * $scope.limit;
	        $scope.setButton();
	    };

	    $scope.next = function() {
	    	$scope.start =  $scope.start + 5;
	        $scope.offset = $scope.start * $scope.limit;
	      
	        $scope.setButton(); 
	      
	    };
	    
	$scope.current = function(page) {  
	        $scope.offset = page * $scope.limit;
	        $scope.getUserlist($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	 
	  //--------------------sorting---------------------------------
	    
	    $scope.cancelCreateUser = function(){
	    	
	    	 $state.go("restricted.admin.createAdminUser");
			
	    };
	    
	//--------------------sorting---------------------------------
	 

	    
	    
	    $scope.SortingUserList = function(colName,searchterm){
			  $scope.offset =0;
				$scope.start =0;
			  $scope.colName=colName;
				$scope.search=searchterm;
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.search=="" || $scope.search==null)
				  {
				  $scope.search= undefined;
				  
				  }
				if($scope.colName==null)
				  {
				  $scope.colName= undefined; 
				  }
				$scope.getUserlist(0,10,$scope.colName,$scope.order,$scope.search);	
			};
	

		
			
			//----------------------------------delete brands-----------------------
			
		     $scope.getCheckedId=[];
			  
			  $scope.checkedList=function(id){
				  
				  if($scope.getCheckedId.indexOf(id) !== -1)
				  {		
				  var array  = $scope.getCheckedId;
				  var index = array.indexOf(id);
				  $scope.getCheckedId.splice(index,1);	   
				  }else
					  {		    	
			      $scope.getCheckedId.push(id);
			     
					  }
			
			   };
			   
			   
			   
			  $scope.checkedAllList = function(UserList,rd){	
				  
				  if(rd == true || rd == undefined){				 
				  for(var i=0; i<UserList.length; i++){					  
					  
					  //if already exist in getCheckedtemplateid than don't pass
					  if($scope.getCheckedId.indexOf(UserList[i].id) !== -1)   
					  {  						 
					  }
					  else{
						  $scope.checkedList(UserList[i].id);	
					  }
					  }			
				  }
				  else{
					  $scope.getCheckedId=[];
				  }
			  };
			  
			  
			  
			  
			  
			  
			  
			  
			  
		    $scope.check = function(){	
			  if($scope.getCheckedId.length == 0){
				  
				  GlobalModule_notificationService.notification("error","Please select any record");
				  }
			  else{				  
				  $('#deletelist').modal('show');
				  }		
			       //console.log( $scope.getCheckedId);
			    };
			    
			  
		
			  
			  $scope.deleteUserList = function(){
			 
				 $(".loader").fadeOut("slow");
				  createAdminUser_Service.deleteUserList($scope.getCheckedId,$scope.senderId).then(function(response){
					  $scope.userflag = response.data;	
					  //$scope.getUserListCount(null);
					 // $scope.getUserlist(0,10,null,null,null);
					 
					  if($scope.userflag.indexOf("success")!=-1){
					GlobalModule_notificationService.notification("success","Record deleted successfully");
					$scope.getUserListCount(null);
					$scope.getUserlist(0,10,null,null,null);
					
					
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
			  };
			  

				//----------------------------------Fetch Data-----------------------
			  $scope.ids=[];
			  $scope.fetchUserRole = function(userid){	
					 createAdminUser_Service.fetchUserRole(userid).then(function(response){
						$scope.ids= response.data;	
						//console.log($scope.ids);
						GlobalModule_dataStoreService.storeData('LoginModule','checkedIdsList', $scope.ids);
						 /*for(var i=0;i<$scope.ids.length;i++)
							{
								for(var j=0;j<$scope.fetchRole.length;j++)
								{
									if($scope.ids[i]==$scope.fetchRole[j].id)
									{
										alert("ckecl");
										var checkId=$($scope.fetchRole[j].id);
										checkId.prop("checkFlag",true);
									}								
								}							
							} */
					 });			 	 
				  };
				
				//----------------------------------Fetch franted Data -----------------------
			  
				 // alert($scope.flag);
				  $scope.UpdateUserData = function(data){
					  /*$scope.flag= false;*/
					  GlobalModule_dataStoreService.storeData('LoginModule','flag', false);			
				      GlobalModule_dataStoreService.storeData('LoginModule','userUpdateData', data);
	       			  $state.go("restricted.admin.addUsers");
	       			 $scope.fetchUserRole(data.id);
		 
			  };
			  
				//funtion returns all data of role_master
				 $scope.fetchRole = function(){ 
			
						 createAdminUser_Service.fetchRole().then(function(response){
						 $scope.fetchRole=response.data;	
						 if(!$scope.flag){
							 $scope.checkedIdsList = GlobalModule_dataStoreService.loadData('LoginModule','checkedIdsList');
							 for(var i=0;i<$scope.checkedIdsList.length;i++)
								{
									for(var j=0;j<$scope.fetchRole.length;j++)
									{
										if($scope.checkedIdsList[i]==$scope.fetchRole[j].id)
										{	
											$scope.fetchRole[j].checkFlag=true;
											$scope.selectedRoleId = $scope.fetchRole[j].id;
										}								
										
										
									}							
								}
							 }	
						 
					 }); 
				 };
				$scope.fetchRole();
		
				
				
				
				$scope.roleIds = [];
				 $scope.storeRole = function(id)
				 {
					$scope.selectedRoleId=id; 
				 };
				 
			
				
				 $scope.newUserData=function(u){
					 $scope.u.roleId = $scope.selectedRoleId;
				      if($scope.u.firstName==null || $scope.u.firstName=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please fill up FirstName");
							  return;
						  }
						else if($scope.u.lastName==null || $scope.u.lastName=="")				
						  {
						
							  GlobalModule_notificationService.notification("error"," Please fill up LastName");
							  return;							
						}
						else if($scope.u.email==null || $scope.u.email=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please fill up Email");
							  return;
						  }
						else if($scope.u.roleId==null || $scope.u.roleId=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please select any record");
							  return;
						  }
				     
			
				  	Login_Service.isEmailPresent($scope.u.email).then(function(response){
						$scope.flagEmailPresent = response.data;
						if($scope.flagEmailPresent == true){
							// GlobalModule_notificationService.notification("success","THis Email Id is already registered with us.");

							GlobalModule_notificationService.notification("success","user is already added with below email ID");
							$scope.u.email ="";
							$state.go("restricted.admin.createAdminUser");
							$(".loader").fadeOut("slow");
						} 
						else{
							createAdminUser_Service.saveNewUserData($scope.u,$scope.senderId).then(function(response){
								  
						
						 $scope.saveResponse = response.data;
				
						 if($scope.saveResponse=='success')
						 {
							 
							  GlobalModule_notificationService.notification("success","User created successfully");
							  $state.go("restricted.admin.createAdminUser");
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  $state.go("restricted.admin.createAdminUser");
								
						  }
					
					 });
						}
				  	});
				 
				
				 };
				 
				 
				 
				 $scope.UpdateData=function(u){					
					u.userRoles=$scope.fetchRole;
					$scope.u.roleId = $scope.selectedRoleId;
				      if($scope.u.firstName==null || $scope.u.firstName=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please fill up FirstName");
							  return;
						  }
						else if($scope.u.lastName==null || $scope.u.lastName=="")				
						  {
						
							  GlobalModule_notificationService.notification("error"," Please fill up LastName");
							  return;							
						}
						else if($scope.u.email==null || $scope.u.email=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please fill up Email");
							  return;
						  }
						else if($scope.u.roleId==null || $scope.u.roleId=="")
						  {
							  GlobalModule_notificationService.notification("error"," Please select any record");
							  return;
						  }
				     
				    createAdminUser_Service.UpdateDataResponse(u,$scope.senderId).then(function(response){
						 $scope.UpdateDataResponse = response.data;
						  GlobalModule_dataStoreService.storeData('LoginModule','flag', true);
						 if($scope.UpdateDataResponse=='success')
						 {
							  GlobalModule_notificationService.notification("success","User updated  Successfully");
							  $state.go("restricted.admin.createAdminUser");
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  $state.go("restricted.admin.createAdminUser");
								
						  }
					
						 
					 });
				 };
				 
											 
}]);