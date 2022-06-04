'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('email_configuration_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Email_Configuration_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Email_Configuration_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.approverTabFlag=1;
	$scope.EmailType;
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	//for email type configurtion
	$scope.getEmailConfigBean = function(){
		
		Email_Configuration_Service.getEmailConfigBean().then(function(response){
			  $scope.EmailConfigBeanList = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	$scope.getEmailConfigBean();
	
	
	//for updating emailconfigdata
	$scope.updateEmailConfigBean = function(emailConfigBean){
		// $scope.emailConfigId=emailConfigId;
		$scope.emailId_check=emailConfigBean.emailId;
		$scope.password_check=emailConfigBean.password;
		if($scope.emailId_check == null || $scope.emailId_check == undefined || $scope.emailId_check == "" || $scope.password_check == null || $scope.password_check == undefined || $scope.password_check == ""){
			GlobalModule_notificationService.notification("error","Please,Fill Mandatory Fields ");
		}else{
			Email_Configuration_Service.updateEmailConfigBean(emailConfigBean).then(function(response){
				  $scope.SUCCESS = response.data;
				  if($scope.SUCCESS=="SUCCESS"){
					  $scope.getEmailConfigBean();
					  GlobalModule_notificationService.notification("success","Updated Successfully");
					  $state.go("restricted.admin.emailtypes");
				  }else{
					  GlobalModule_notificationService.notification("error","Update Fail");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});
			
		}
		
		
		
	};
	//$scope.updateEmailConfigBean(null);
	
	//for fetching emailtypemaster and roles list
/*	$scope.getEmailTypeRoleMasterPojo = function(){
		// $scope.emailConfigId=emailConfigId;
		 Email_Configuration_Service.getEmailTypeRoleMasterPojo().then(function(response){
			  $scope.EmailTypeRoleMapPojo = response.data;
			  
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
		 $scope.getEmailTypeRoleMapList();
	};*/
	
	//for fetching the emailtyperolemap list
	/*$scope.getEmailTypeRoleMapList = function(){
		// $scope.emailConfigId=emailConfigId;
		 Email_Configuration_Service.getEmailTypeRoleMapList().then(function(response){
			  $scope.EmailTypeRoleMapList = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
		
	};*/
	//$scope.getEmailTypeRoleMapList();
	
	//for geting the emailtyperolemapassingtoBeanlist list
	$scope.emailTypeAssignToBeanList = function(offset,limit,colName,order){
		// $scope.emailConfigId=emailConfigId;
		Email_Configuration_Service.emailTypeAssignToBeanList(offset,limit,colName,order).then(function(response){
			 
			  $scope.EmailTypeAssignToBeanList = response.data;
			// console.log($scope.EmailTypeAssignToBeanList[0]);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		 $scope.fetchEmailTypeAssignToBeanList(0,10,null,null);
		
		 
	};
	//$scope.emailTypeAssignToBeanList();
	
	//for updating EmailTypeRoleMap
	$scope.updateEmailTypeRoleMap = function(emailTypeAssignToBeanId,offset,limit,colName,order){
		if(emailTypeAssignToBeanId!=""){
			
			for(var i=0;i<$scope.EmailTypeAssignToBeanList.length;i++)
			{
			if($scope.EmailTypeAssignToBeanList[i].id==emailTypeAssignToBeanId){
			//$scope.email.id=b.id;
			var emailTypeAssignToBean =$scope.EmailTypeAssignToBeanList[i];
			break;
			}else{
				
			}
			}
			
			// for checking checked available to role atleast one
			$scope.checkedList=[];
			$scope.emailTypeRoleMapBeanList2=[];
			$scope.emailTypeRoleMapBeanList2=emailTypeAssignToBean.emailTypeRoleMapBeanList;
			var i=0;
			for(i=0;i< $scope.emailTypeRoleMapBeanList2.length;i++){
				var e=$scope.emailTypeRoleMapBeanList2[i];
				if(e.check){
					$scope.checkedList.push(e.id);
					break;
				}
			}
			
			if($scope.checkedList.length>0){
				//emailTypeAssignToBean.emailTypeRoleMapBeanList=$scope.EmailTypeAssignToBeanList[0].emailTypeRoleMapBeanList;
				console.log(emailTypeAssignToBean);
				// $scope.emailConfigId=emailConfigId;
				 Email_Configuration_Service.updateEmailTypeRoleMap(emailTypeAssignToBean,offset,limit,colName,order).then(function(response){
					  $scope.EmailTypeAssignToBean = response.data;
					  
					  $scope.fetchEmailTypeAssignToBeanListupdate=[];
					  $scope.fetchEmailTypeAssignToBeanList(0,10,null,null);
					  GlobalModule_notificationService.notification("success","Role Assigned Successfully");
					  $scope.selectDefault();
					
						 
					  $(".loader").fadeOut("slow");
				  },function(response){		
					  $(".loader").fadeOut("slow");
					});	
			}else{
				GlobalModule_notificationService.notification("error","Assign At Least One Role");
			}
			
		}else{
			GlobalModule_notificationService.notification("error","Please select Mail Type");
		}
		
		 
		
	};
	$scope.email={};
	
	$scope.selectedList=function(id){
		document.getElementById("available_label").setAttribute("style", "display: block !important;");
	for(var i=0;i<$scope.EmailTypeAssignToBeanList.length;i++)
		{
		if($scope.EmailTypeAssignToBeanList[i].id==id){
		//$scope.email.id=b.id;
		$scope.email.emailTypeRoleMapBeanList=$scope.EmailTypeAssignToBeanList[i].emailTypeRoleMapBeanList;
		break;
		}else{
			$scope.email.emailTypeRoleMapBeanList=[];
		}
		}
	if(id==""){
		document.getElementById("available_label").setAttribute("style", "display: none;");
	}
	};
	
	//for fetching the emailtyperolemapassingtoBeanlist list
	$scope.fetchEmailTypeAssignToBeanList = function(offset,limit,colName,order){
		// $scope.emailConfigId=emailConfigId;
		 Email_Configuration_Service.fetchEmailTypeAssignToBeanList(offset,limit,colName,order).then(function(response){
			 
			  $scope.fetchEmailTypeAssignToBeanListupdate = response.data;
		//	 console.log($scope.fetchEmailTypeAssignToBeanList[0]);
			  console.log($scope.fetchEmailTypeAssignToBeanListupdate);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
		 
	};
	
	// console.log($scope.fetchEmailTypeAssignToBeanListupdate);
	// for setting select index on start
	
	$scope.selectDefault = function(){
		var scope = angular.element("#openinterview").scope();
		scope.selectedList(0);
		$scope.email.id = "";
		
		
	};
	
	 $scope.setemaillistid= function(id)
	  {  		
	 	  $scope.fetchEmailTypeAssignToBeanListupdate=s;
	 	 $scope.eId=s.id;
	  };
	
		$scope.addNewEmail=function(emailConfigBean){
			
			$(".loader").show();
			
			/*if(emailConfigBean.retentionDays== undefined || emailConfigBean.retentionDays <= 0 )
			{
				GlobalModule_notificationService.notification("error","Please enter valid number of days");
				return;
			}*/
				Email_Configuration_Service.addNewEmail(emailConfigBean).then(function(response){
			 $scope.addNewEmailList = response.data;
			 if( $scope.addNewEmailList=='success')
				{
					 $("#add_email_doc").modal('hide');
					  $scope.fetchEmailTypeAssignToBeanList(0,10,null,null);
				  GlobalModule_notificationService.notification("success","Your Email Id has been added successfully");
					
				
				  $scope.emailTypeAssignToBeanList(0,1000,null,null);
				 
					}else if( $scope.addNewEmailList=='DuplicateEmailId'){
						GlobalModule_notificationService.notification("error","Email id already exists");
					}
			 else
			 {
			   GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			 }
			 $(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");
		}); 
	};
			
	//sorting
	
	$scope.SortingByEmailId = function(colName){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
		  $(".loader").show();
			
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
			$scope.fetchEmailTypeAssignToBeanList(0,10,$scope.colName,$scope.order);
			
			 $(".loader").fadeOut("slow");
		};
// pagination
		

		  $scope.setButton = function(){
			 
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					$scope.fetchEmailTypeAssignToBeanList($scope.offset,$scope.limit,$scope.colName,$scope.order);
				};
				
				
				$scope.fetchEmailListCount=function(search){
			
					$scope.offset =0 ;
					$scope.navButtons = [];
					$scope.count= 0 ;
					$scope.start = 0;
					$scope.search=search;
					$(".loader").show();
					//$scope.search=search;
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
					 Email_Configuration_Service.fetchEmailListCount($scope.search).then(function(response){
						$scope.count = response.data;
						//console.log($scope.count);
						
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						
						$(".loader").fadeOut("slow");	
						
					});		
				};
				$scope.fetchEmailListCount(null);
						
				
				
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
			    
			  
			    $scope.pageNumber=0;
			    $scope.current = function(page) {  
			    	$scope.pageNumber=page;
			        $scope.offset = page * $scope.limit;
			        $scope.fetchEmailTypeAssignToBeanList($scope.offset,$scope.limit,$scope.colName,$scope.order);
			    };
			    
		/*	    $scope.setButton = function(){
				$scope.navButtons = [];
					
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					$scope.fetchEmailTypeAssignToBeanList($scope.offset,$scope.limit,$scope.colName,$scope.order);
					
					
				};*/
				
				
				// for deleting
				 $scope.getCheckedId=[];
				  
				  $scope.checkedList1=function(id){
					  
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
				  
				  $scope.checkedAllList = function(fetchEmailTypeAssignToBeanListupdate,rd){	
					  
					  if(rd == true || rd == undefined){				 
					  for(var i=0; i<fetchEmailTypeAssignToBeanListupdate.length; i++){					  
						  
						  //if already exist in getCheckedtemplateid than don't pass
						  if($scope.getCheckedId.indexOf(fetchEmailTypeAssignToBeanListupdate[i].id) !== -1)   
						  {  						 
						  }
						  else{
							  $scope.checkedList1(fetchEmailTypeAssignToBeanListupdate[i].id);	
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
				  };
				
				$scope.deleteEmailTypeLogs = function(){
					
					if($scope.getCheckedId.length == 0){
						GlobalModule_notificationService.notification("error","Please select any record");
					}else{
						Email_Configuration_Service.deleteEmailTypeLogs($scope.getCheckedId).then(function(response){				
							$scope.count = response.data;
							$scope.getCheckedId=[];
					
							 $scope.fetchEmailTypeAssignToBeanList(0,10,null,null);
								$scope.fetchEmailListCount(null);
							// $scope.getEmailLogDetailListcount(null);
							/*if($scope.count>$scope.limit){
								$scope.setButton();					
							}*/
						
						},function(response){
							$(".loader").fadeOut("slow");		
						});
						GlobalModule_notificationService.notification("success","Record Deleted Successfully");
					}
					
					
					
				};
				

				  $scope.setlistidRetentionDays= function(s)
				  {  		
					  
					  
					 	 $scope.eId=s.id;
					  $scope.retentionDays=s.retentionDays;
					 // $scope.empId=s.id;
					    
					 $('#add_Days').modal('show');
				
				  };
				
				
				 $scope.retentionDaysUpdate=function(days)
				  {
							 //console.log($scope.empDataListId);				
							if(days == undefined || days <= 0 )
							{
								GlobalModule_notificationService.notification("error","Please enter valid number of days");
								return;
							}
							
							Email_Configuration_Service.retentionDaysUpdate( $scope.eId,days).then(function(response){
							$scope.updateRetentiondays = response.data; 
													
						    if($scope.updateRetentiondays=="update")
							{
							      GlobalModule_notificationService.notification("success","Retention Days updated successfully");
							     $scope.fetchEmailListCount();
							      $scope.fetchEmailTypeAssignToBeanList(0,10,null,null);
							      $('#add_Days').modal('hide');
							      
									
							      $scope.retentionDays='';
							      return;
								 }
						    	else
						    	{
									GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 

						    	}		    			    	
					  }); 
				  };	
				
				
				
	
	
}]);