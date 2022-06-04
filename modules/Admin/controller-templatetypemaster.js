'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('TemplateTypeMaster_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
{
	 
	 $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	 
	 //----------------View/fetch category list ------------------------- 
	 $scope.fetchTemplateTypeMaster = function(offset,limit,colName,order,search){
		 
		 $(".loader").show();
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
			 
			 Master_Service.fetchTemplateTypeMaster(offset,limit,colName,order,search).then(function(response){
			 $scope.TemplateTypeList=response.data;
			
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		 	 
	 };	
	 $scope.fetchTemplateTypeMaster(0,10,null,null,null);
	 
	 
	  //-----------------save/insert type in list-----------------------	
	  
	  $scope.saveCategoryDetails=function(templatetype){
		  
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
	    	if(templatetype.type == undefined || templatetype.type.match(letterNumber)){
	    		
	    		$(".loader").show();
	  		  templatetype.userid=$rootScope.userdetails.id;
	      	 
	  			 Master_Service.saveCategoryDetails(templatetype).then(function(response){
	  				  $scope.savetemplatetypedetails = response.data;
	  				
	  				  $scope.getCategoryCount(null);
	  				  $scope.fetchTemplateTypeMaster(0,10,null,null,null);
	  				  $scope.template={};
	  				 $state.go('restricted.admin.templatetypemaster');
	  				
	  				 if($scope.savetemplatetypedetails.indexOf("success")!=-1){
	  					  GlobalModule_notificationService.notification("success","Your Template Type saved successfully");
	  					  $("#add_category").modal('hide');
	  				 }
	  				 else if($scope.savetemplatetypedetails =='failed'){
	  					  GlobalModule_notificationService.notification("error","Template Type already exist");
	  					  $("#add_category").modal('hide');
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
	    		
	    		GlobalModule_notificationService.notification("error","Please enter valid value");
	    		}
		  
		  
		  
		  };
	 
		  
		  $scope.clear=function(){
			  
			  $scope.template={	  	  
					  type:"",	
		   };		  
	    };  
		  
		  
	 $scope.templatetypes=function(t){
		  
		  $scope.templatetypemaster={	  	  
					  type:"",
					  id:0	
		  };
		  $scope.templatetypemaster.type=t.type;
		  $scope.templatetypemaster.id=t.id;
	};
	 
	
	
	//-----------sorting template type master list-----
	 
	 	$scope.SortingCategoryList = function(colName,searchterm){
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
			$scope.fetchTemplateTypeMaster(0,10,$scope.colName,$scope.order,$scope.search);	
		};
	
	
     //------pagination--------------------------------	
		
			$scope.offset=0;
			$scope.limit=10;
			$scope.navButtons = [];
			$scope.setButton = function(){
			$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}		
			 $scope.fetchTemplateTypeMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
		
	//-----------------Get category count----------------------
		$scope.getCategoryCount=function(search){
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
		 
		 Master_Service.getCategoryCount($scope.search).then(function(response){
			$scope.count = response.data;
		
			if($scope.count>$scope.limit){
				$scope.setButton();
			}
		
		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.getCategoryCount(null);
   
	
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
       $scope.fetchTemplateTypeMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
       
   };
   
   
   $scope.setButton = function(){
		$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			 $scope.fetchTemplateTypeMaster();
		};
   
   
	
//-------------------------------------------------------------------------	 
   
	//-----------------update template type list------------------------------ 
	  
	  $scope.updateCategoryDetails=function(templatetype){
		  
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/; 
		  
	    	if(templatetype.type == undefined || templatetype.type.match(letterNumber)){
	    		
	    
		  templatetype.userid=$rootScope.userdetails.id;
		//  templatetype.typeId=$rootScope.
		  $(".loader").show();
		  
		 Master_Service.updateCategoryDetails(templatetype).then(function(response){
			
			  $scope.updatecategorydetails = response.data;	
			  $scope.getCategoryCount(null);
			  $scope.fetchTemplateTypeMaster(0,10,null,null,null);
			
			  if($scope.updatecategorydetails.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Your Template Type updated successfully");
			  
				  $state.go('restricted.admin.templatetypemaster');
				  $("#edit_category").modal('hide');
				 
				  
			  }
			  else if($scope.updatecategorydetails =='failed'){
				  
				  GlobalModule_notificationService.notification("error","Template Name already exist");
				  $("#edit_category").modal('hide');
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
    		
    	GlobalModule_notificationService.notification("error","Please enter valid value");
    }
	     	
	    	
		 
};
	  
	 //---------------------------------------------------------------- 
	  
	 
	 
	 
	 //--------delete type from listr------------
	  $scope.deleteCategoryFromList = function(formlist){
		 		  
		  $scope.formlist=formlist;
		  
			  Master_Service.deleteCategoryFromList($scope.formlist,$scope.getCheckedtemplatetypeid).then(function(response){
			  $scope.categoryflag = response.data;	
			  $scope.getCategoryCount(null);
			  $scope.fetchTemplateTypeMaster(0,10,null,null,null);
			  $scope.getCheckedtemplatetypeid=[];
			  
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
	 
	 
	 //---------------------------------------------------------------
	 

	
	   //----------Get no of checked template type-------
	  
	  $scope.getCheckedtemplatetypeid=[];
	  $scope.checkedtemplatetypeList = function(id){			  
		  
		  if($scope.getCheckedtemplatetypeid.indexOf(id) !== -1)
		  {		
		  var array  = $scope.getCheckedtemplatetypeid;
		  var index = array.indexOf(id);
		  $scope.getCheckedtemplatetypeid.splice(index,1);
		  }else
		  {		    	
	      $scope.getCheckedtemplatetypeid.push(id);				      
		  };						  
	  };
	 
	  $scope.checkedAllList = function(listedTypes,rd){				  
		  if(rd == true || rd == undefined){				 
		  for(var i=0; i<listedTypes.length; i++){					  
			  
			  //if already exist in getCheckedtemplateid than don't pass
			  if($scope.getCheckedtemplatetypeid.indexOf(listedTypes[i].id) !== -1)   {  						 
			  }else{
				  $scope.checkedtemplatetypeList(listedTypes[i].id);	
			  }
			  
		  }			
		  }else{
			  $scope.getCheckedtemplatetypeid=[];
		  }
	  };
	  
	  $scope.check = function(){		
	  if($scope.getCheckedtemplatetypeid.length == 0){
		  GlobalModule_notificationService.notification("error","Please select any record");
		  }
	  else{				  
		  $('#deletelist').modal('show');
		  }			  
	  };
//-----------------------------------------------------------------------
	 
	}]);