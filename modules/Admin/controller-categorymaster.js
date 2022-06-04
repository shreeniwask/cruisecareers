'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CategoryMaster_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Master_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Master_Service){
	
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	//-----------------------fetch/view list--------------------
	$scope.fetchCategoryMasterList = function(offset,limit,colName,order,search){
		
		$(".loader").show();
		
		$scope.getCheckedId=[];
		
		 if(search==null || search=="")
		  {
		  search= undefined;
		  
		  }
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		Master_Service.fetchCategoryMasterList(offset,limit,colName,order,search).then(function(response){
			  $scope.departmentList = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){	
			  $(".loader").fadeOut("slow");
			});		  
	};
	$scope.fetchCategoryMasterList(0,10,null,null,null);
	
	//-----------------pagination-----------------------------
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchCategoryMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getcategoryListcount=function(searchterm){
		
			
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=searchterm;
			if($scope.colName == null){
				$scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 if($scope.search=="" || $scope.search == null)
			  {
			  $scope.search= undefined;  
			  }
			
			 Master_Service.getcategoryListcount($scope.search).then(function(response){
				
				$scope.count = response.data;
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
					
			});		
		};
		$scope.getcategoryListcount(null);
		
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
	        $scope.fetchCategoryMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	
	
	//------------------------------sorting--------------------
	    $scope.SortingBrandMasterList = function(colName,searchterm){
			  $scope.offset =0 ;
				$scope.start = 0;
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
				$scope.fetchCategoryMasterList(0,10,$scope.colName,$scope.order,$scope.search);	
			};
			
	//--------------------------------------------------------------------------

	//--------------------------insert Department details-----------------------
			
			$scope.addDepartmentDetails=function(department){
				
				$(".loader").fadeOut("slow");
				var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		    	if(department.categoryName == undefined || department.categoryName.match(letterNumber)){
				//$scope.id=category.id;				
				department.userid=$rootScope.userdetails.id;
				 Master_Service.addDepartmentDetails(department).then(function(response){														
					  $scope.categoryresponse = response.data;
					  $scope.getcategoryListcount(null);
					  $scope.fetchCategoryMasterList(0,10,null,null,null);
					  $scope.department.categoryName="";
					 // $state.go('restricted.admin.brandmaster');	
					  $("#add_department").modal('hide');
					  
					  if($scope.categoryresponse.indexOf("success")!=-1)
						  {
					          GlobalModule_notificationService.notification("success","Your Department has been added successfully");
					          
					          $(".loader").fadeOut("slow");
						  }
					  else if($scope.categoryresponse =='failed'){
						  
						  GlobalModule_notificationService.notification("error","Department Name already exist");
						  $("#add_department").modal('hide');
					 }
					  else
						  {				  	
						      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
						      $("#add_department").modal('hide');
						      $(".loader").fadeOut("slow");	
						  }
					  
				},function(response){	
					
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
					  $(".loader").fadeOut("slow");					  
			 });
				
		    	}
		    	else{
		    		
		    		 GlobalModule_notificationService.notification("error","Please enter valid input.");
		    		
		    	}
					  
			};
	
			
	//----------------------upload/update logo----------------------------
			
			$scope.updateCategoryLogo=function(category){
				
				$(".loader").show();

				$scope.category={
						id:-1,
						logoPath:""
				};
				$scope.category.id= $scope.department.categoryid;

				$scope.category.userid=$rootScope.userdetails.id;

				
				var input = document.getElementById('imgInp');
				if(input.value!="" || input.value != undefined)
				{
					var file = input.files[0];
					
					if(file == undefined)
					{
						$("#edit_department_logo").modal('hide');
						  GlobalModule_notificationService.notification("success","Your category logo have been updated successfully");
						  $(".loader").fadeOut("slow");
					}
					else
					{
						var formData = new FormData();
						formData.append("file",file);
						formData.append("id",$scope.department.categoryid);
						formData.append("userid",$scope.category.userid);
						//formData.id=$scope.brandid;
						
						$scope.category.file=file.name;
						
						input.value="";
					
					$.ajax({
							url: 'rest/adminmaster/upload/categorylogo',
							type: 'POST',
							data: formData,
							
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (returndata) {								
								  $("#edit_department_logo").modal('hide');
								  GlobalModule_notificationService.notification("success","Your category logo have been updated successfully");
								  $(".loader").fadeOut("slow"); 
								  $scope.fetchCategoryMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
								  $scope.category.logoPath="";						 
							}
						});
				    }
				}
			   };
	
			    
	//-----------------------------------------------------------------------		
			
			   		    
			 $scope.department={						
					id:0,
					iconPath:""
			};        
			$scope.openUpdateModal=function(d){
				
				$scope.department.categoryid=d.id;
		    	$scope.department.iconPath=d.iconPath;
		    	$scope.department.userid=d.userid;
							
			};
			

			
	//--------------------update department---------------------------------	
			
			$scope.updatedepartmentdetails= function(department)
			{
				$(".loader").fadeOut("slow");
				var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
				  
		    	if(department.categoryName == undefined || department.categoryName.match(letterNumber)){
		    		
				  department.userid=$rootScope.userdetails.id;
					 Master_Service.updatedepartmentdetails(department).then(function(response){
					  $scope.categoryupdateresponse = response.data;	
					  $scope.getcategoryListcount(null);
					  $scope.fetchCategoryMasterList(0,10,null,null,null);
					  $state.go('restricted.admin.departmentmaster');
					  $("#edit_department").modal('hide');
					  if($scope.categoryupdateresponse.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Your Department Details updated successfully");
					  
						  $(".loader").fadeOut("slow");
						  
					  }
					  else if($scope.categoryupdateresponse =='failed'){
						  
						  GlobalModule_notificationService.notification("error","Department Name already exist");
						  $("#edit_department").modal('hide');						  
					 }
					  else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  $(".loader").fadeOut("slow");
					  }
					  
				  },function(response){
					  
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again"); 
					  $(".loader").fadeOut("slow");
			  });
				
     	}
	  else
		  {
		  		GlobalModule_notificationService.notification("error","Please enter valid name");
		  }
				
				
				
				
				
			/*	var input = document.getElementById('imgInp');
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
								 department.iconPath = $scope.filedtailsforProfile.fileURL;
								}
							 Master_Service.updatedepartmentdetails(department).then(function(response){
								  $scope.flag = response.data;
								  GlobalModule_notificationService.notification("success","Your Department Details have been added successfully");
								 
								  $(".loader").fadeOut("slow");
							  },function(response){
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
								  $(".loader").fadeOut("slow");
								});
						}
					});
				}*/
				/* Master_Service.updatedepartmentdetails(department).then(function(response){
					 $scope.flag=response.data;
				 });*/
			};
			
	//---------------------------------------------------------------------------		
			
			
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
			  
			  $scope.checkedAllList = function(listedCategory,rd){				  
				  if(rd == true || rd == undefined){				 
				  for(var i=0; i<listedCategory.length; i++){					  
					  
					  //if already exist in getCheckedtemplateid than don't pass
					  if($scope.getCheckedId.indexOf(listedCategory[i].id) !== -1)   {  						 
					  }else{
						  $scope.checkedList(listedCategory[i].id);	
					  }
					  
				  }			
				  }else{
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
			  
			  
	//-------------------delete list-------------------------------------
			  
			 $scope.deletedepartmentfromList = function(formlist){
				
				 $(".loader").fadeOut("slow");
				  $scope.formlist=formlist;				
					  Admin_Service.deleteFromList($scope.formlist,$scope.getCheckedId).then(function(response){
					  $scope.categoryflag = response.data;	
					  $scope.getcategoryListcount(null);
					  $scope.fetchCategoryMasterList(0,10,null,null,null);
					 
					  if($scope.categoryflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
			  };
			  
	//--------------------------------------------------------------------		
				
			  $scope.clear=function(){
				  
				  $scope.department={
							userid:0,
							id:0,
							categoryName:"",
							iconPath:""
					}; 
				  
				};  
			  			  
			$scope.departmentmaster={
					userid:0,
					id:0,
					categoryName:"",
					iconPath:""
			};
			$scope.departmentdata=function(d){
				$scope.departmentmaster.userid=$rootScope.userdetails.id;
				$scope.departmentmaster.id=d.id;
				$scope.departmentmaster.categoryName=d.categoryName;
				$scope.departmentmaster.iconPath=d.iconPath;
				
				//$('#edit_brand').modal('show');
			};
			
			
			
			
}]);
	