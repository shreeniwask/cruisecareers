'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Question_Category_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','quesCategory_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,quesCategory_Service)
{
	
	 $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	 
	 //----------------View/fetch category list ------------------------- 
	 $scope.fetchquestioncategory = function(offset,limit,colName,order,search){
		 
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
			 
			 quesCategory_Service.fetchquestioncategory(offset,limit,colName,order,search).then(function(response){
			 $scope.TemplateTypeList=response.data;
			
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
		 	 
	 };	
	 $scope.fetchquestioncategory(0,10,null,null,null);
	 
	 
	  //-----------------save/insert type in list-----------------------	
	  
	  $scope.saveCategoryDetails=function(templatetype){
		  
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
	    	if(templatetype.type == undefined || templatetype.categoryName.match(letterNumber)){
	    		
	    		$(".loader").show();
	  		  templatetype.userid=$rootScope.userdetails.id;
	      	 
	  			 quesCategory_Service.saveCategoryDetails(templatetype).then(function(response){
	  				  $scope.savetemplatetypedetails = response.data;
	  				
	  				  $scope.getCategoryCount(null);
	  				  $scope.fetchquestioncategory(0,10,null,null,null);
	  				  $scope.template={};
	  				 $state.go('restricted.admin.questionCategoryMaster');
	  				
	  				 if($scope.savetemplatetypedetails.indexOf("success")!=-1){
	  					  GlobalModule_notificationService.notification("success","Question category saved successfully");
	  					  $("#add_category").modal('hide');
	  				 }
	  				 else if($scope.savetemplatetypedetails =='failed'){
	  					  GlobalModule_notificationService.notification("error","Question category Type already exist");
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
					  categoryName:"",	
		   };		  
	    };  
		  
		  
	 $scope.templatetypes=function(t){
		  
		  $scope.templatetypemaster={	  	  
					  categoryName:"",
					  id:0	
		  };
		  $scope.templatetypemaster.categoryName=t.categoryName;
		  $scope.templatetypemaster.id=t.id;
	};
	 
	
	
	//-----------sorting template categoryName master list-----
	 
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
			$scope.fetchquestioncategory(0,10,$scope.colName,$scope.order,$scope.search);	
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
			 $scope.fetchquestioncategory($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
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
		 
		 quesCategory_Service.getCategoryCount($scope.search).then(function(response){
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
       $scope.fetchquestioncategory($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
       
   };
   
   
   $scope.setButton = function(){
		$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			 $scope.fetchquestioncategory();
		};
   
   
	
//-------------------------------------------------------------------------	 
   
	//-----------------update template categoryName list------------------------------ 
	  
	  $scope.updateCategoryDetails=function(templatetype){
		  
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/; 
		  
	    	if(templatetype.categoryName == undefined || templatetype.categoryName.match(letterNumber)){
	    		
	    
		  templatetype.userid=$rootScope.userdetails.id;
		//  templatetype.typeId=$rootScope.
		  $(".loader").show();
		  
		 quesCategory_Service.updateCategoryDetails(templatetype).then(function(response){
			
			  $scope.updatecategorydetails = response.data;	
			  $scope.getCategoryCount(null);
			  $scope.fetchquestioncategory(0,10,null,null,null);
			
			  if($scope.updatecategorydetails.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Question category updated successfully");
			  
				  $state.go('restricted.admin.questionCategoryMaster');
				  $("#edit_category").modal('hide');
				 
				  
			  }
			  else if($scope.updatecategorydetails =='failed'){
				  
				  GlobalModule_notificationService.notification("error","Question category already exist");
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
	  
	 
	 
	 
	 //--------delete categoryName from listr------------
	  $scope.deleteCategoryFromList = function(formlist){
		 		  
		  $scope.formlist=formlist;
		  
			  quesCategory_Service.deleteCategoryFromList($scope.formlist,$scope.getCheckedtemplatetypeid).then(function(response){
			  $scope.categoryflag = response.data;	
			  $scope.getCategoryCount(null);
			  $scope.fetchquestioncategory(0,10,null,null,null);
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
	 

	
	   //----------Get no of checked template categoryName-------
	  
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