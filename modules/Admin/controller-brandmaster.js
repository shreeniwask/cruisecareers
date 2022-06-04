'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('BrandsMaster_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','Master_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,Master_Service){
	
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	$scope.fetchBrandsList = function(offset,limit,colName,order,search){
		
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
		Master_Service.fetchBrandsList(offset,limit,colName,order,search).then(function(response){
			  $scope.brandsList = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});		  
	};
	$scope.fetchBrandsList(0,10,null,null,null);
	
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchBrandsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getBrandListcount=function(searchterm){
							
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
			
			 Master_Service.getBrandListcount($scope.search).then(function(response){				
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton();					
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getBrandListcount(null);
		
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
	        $scope.fetchBrandsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	
	
	//--------------------sorting---------------------------------
	    
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
				$scope.fetchBrandsList(0,10,$scope.colName,$scope.order,$scope.search);	
			};
	
			
	//----------------insert brand details----------------
	
	$scope.addBrandsDetails=function(brand){
		
		$(".loader").show();
		
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
		
    	if(brand.brandName == undefined || brand.brandName.match(letterNumber)){
    		
		$scope.id=brand.id;
		brand.userid=$rootScope.userdetails.id;
		
		 Master_Service.addBrandsDetails(brand).then(function(response){														
			  $scope.brandresponse = response.data;
			  $scope.getBrandListcount(null);
			  $scope.fetchBrandsList(0,10,null,null,null);
			  $scope.brand.brandName="";	  			  
			 //$state.go('restricted.admin.brandmaster');	
			  $("#add_brand").modal('hide');
			  if($scope.brandresponse.indexOf("success") != -1)
				  {
			          GlobalModule_notificationService.notification("success","Your Brand has been added successfully");
			          
			          $(".loader").fadeOut("slow");
				  }
			  else if($scope.brandresponse=='failed'){
				  
				  GlobalModule_notificationService.notification("error","Brand Name already exist");
				  $("#add_brand").modal('hide');
				  $(".loader").fadeOut("slow");
				 
			 }
			  
			  else
				  {				  	
				      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				      $(".loader").fadeOut("slow");	
				  }
		 });
		 }else{
			 GlobalModule_notificationService.notification("error","Please enter valid input");
			 $(".loader").fadeOut("slow");
		 }
    	   	
    	 /*var input = document.getElementById('defaultUrl');
			if(input.value!="")
			{
				var file = input.files[0];
				var formData = new FormData();
				formData.append("file",file);
				formData.append("id",$scope.id);
				formData.append("userid",brand.userid);			
				$scope.brand.file=file.name;
				
				input.value="";
				
				$.ajax({
						url: 'rest/adminmaster/upload/brandlogo',
						type: 'POST',
						data: formData,						
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (response) {
														
						//	  GlobalModule_notificationService.notification("success","Your Brand logo have been updated successfully");
							  $(".loader").fadeOut("slow");
							  $scope.brand={};							
							  $scope.fetchBrandsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
						}
					});								
			   }*/   	
	     };
	
	

	
	$scope.openUpdateModal=function(id)
	{
	
		$scope.brandid=id;
	
	};
	
	
	//---------------------------update brand lists------------------------------------------
	
	$scope.updateBrandsDeatails= function(brand)
	{
		$(".loader").show();
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
    	if(brand.brandName != undefined || brand.brandName.match(letterNumber)){
    		
		  brand.userid=$rootScope.userdetails.id;
		 
			 Master_Service.updateBrandsDeatails(brand).then(function(response){
			  $scope.brandupdateresponse = response.data;	
			  $scope.getBrandListcount(null);
			  $scope.fetchBrandsList(0,10,null,null,null);
			  
			  if($scope.brandupdateresponse.indexOf("success")!=-1 || $scope.brandupdateresponse == 'success'){
				  GlobalModule_notificationService.notification("success","Your Brand Details updated successfully");
			  
				 $state.go('restricted.admin.brandmaster');
				 
				  $("#edit_brand").modal('hide');
				  
			  }
			  else if($scope.brandupdateresponse == 'failed'){
				  
				  GlobalModule_notificationService.notification("error","Brand Name already exist");
				  $("#edit_brand").modal('hide');
			 } 
			  else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");  
	  });
   	}		 
    else	
    	{
    	 	GlobalModule_notificationService.notification("error","Please enter valid name");
    	}
	
	};
	
	//-----------------------------------------------------------------------
	
	        
	$scope.openUpdateModal=function(b){
		
		$scope.brandmaster={						
				id:0,
				userid:0,
				logoPath:"",
	     		redirectURL:""
				
		};
		$scope.brandmaster.brandid=b.id;
    	$scope.brandmaster.logoPath=b.logoPath;
    	$scope.brandmaster.userid=b.userid;
    	$scope.brandmaster.redirectURL=b.redirectURL;
	};
	
	
	
	//-------------------upload log--------------------------------
	
	$scope.uploadLogo=function()
	{
		$(".loader").show();
		$scope.brand={
				id:-1,
				logoPath:""
			
		};
		$scope.brand.id= $scope.brandid;
		$scope.brand.userid=$rootScope.userdetails.id;
		
		var input = document.getElementById('imgInp');
		
		if(input.value!="" || input.value != undefined)
		{
			var file = input.files[0];
			if(file == undefined)
				{
					$("#edit_brand_logo").modal('hide');
				   GlobalModule_notificationService.notification("success","Your Brand logo have been updated successfully");
				   $(".loader").fadeOut("slow");
				}
			else
			{
				var formData = new FormData();
				formData.append("file",file);
				formData.append("id",$scope.brandmaster.brandid);
				formData.append("userid",$scope.brand.userid);
				//formData.id=$scope.brandid;
				
				$scope.brand.file=file.name;
			
			input.value="";
			
			$.ajax({
					url: 'rest/adminmaster/upload/brandlogo',
					type: 'POST',
					data: formData,
					
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {
						
						 $("#edit_brand_logo").modal('hide');
						  GlobalModule_notificationService.notification("success","Your Brand logo have been updated successfully");
						  $(".loader").fadeOut("slow");
						  $scope.brandmaster={};
						
						  $scope.fetchBrandsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
					}
				});
			}
		}
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

	  $scope.checkedAllList = function(listedBrands,rd){	
		  
		  if(rd == true || rd == undefined){				 
		  for(var i=0; i<listedBrands.length; i++){					  
			  
			  //if already exist in getCheckedtemplateid than don't pass
			  if($scope.getCheckedId.indexOf(listedBrands[i].id) !== -1)   
			  {  						 
			  }
			  else{
				  $scope.checkedList(listedBrands[i].id);	
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
	  
	  
	  
	  $scope.deletefromList = function(formlist){
		  
		  $(".loader").fadeOut("slow");
		  $scope.formlist=formlist;
		    
			  Admin_Service.deleteFromList($scope.formlist,$scope.getCheckedId).then(function(response){
			  $scope.brandflag = response.data;	
			  $scope.getBrandListcount(null);
			  $scope.fetchBrandsList(0,10,null,null,null);
			 
			  if($scope.brandflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record deleted successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	
	  $scope.clear=function(){
		  
	  $scope.brand={
			
				brandName:"",
				redirectURL:""
		};	  
	}; 
		
	$scope.brandsdata=function(b){
		
		$scope.brandmaster={
				userid:0,
				id:0,
				brandName:"",
				logoPath:"",
				redirectURL:""
		};
		
		$scope.brandmaster.userid=$rootScope.userdetails.id;
		$scope.brandmaster.id=b.id;
		$scope.brandmaster.brandName=b.brandName;
		$scope.brandmaster.logoPath=b.logoPath;
		$scope.brandmaster.redirectURL=b.redirectURL;
		
		//$('#edit_brand').modal('show');
	};
	

	
}]);