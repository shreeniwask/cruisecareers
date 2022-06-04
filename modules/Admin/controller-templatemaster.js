'use strict';

var controllers = angular.module('templatemodule');

controllers.controller('Templatemaster_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,Profile_Service,Admin_Service)
{
	
	
	$scope.addtemplate = function(){			
	$state.go("restricted.admin.createtemplate");	
	$scope.flag = true;
	GlobalModule_dataStoreService.storeData('LoginModule','flag',$scope.flag);		
    GlobalModule_dataStoreService.storeData('LoginModule','data',$scope.data);       
	};
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	
	 $scope.fetchTemplateMaster = function(offset,limit,colName,order,search){		
		 
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
			 
		 Admin_Service.fetchTemplateMaster(offset,limit,colName,order,search).then(function(response){	 			 
			  $scope.templatemaster = response.data;	
			
			  $(".loader").fadeOut("slow");
			},function(response){	
				$(".loader").fadeOut("slow");
				});				 
	 };
	 $scope.fetchTemplateMaster(0,10,null,null,null);

	 
	 
	 $scope.SortingPostedJobList = function(colname,searchterm){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colname;
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
			$scope.fetchTemplateMaster(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
	 
	 $scope.setButton = function(){
			$scope.navButtons = [];			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}						
				 $scope.fetchTemplateMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
	  $scope.getAcitveTemplateCount=function(search){
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
			Admin_Service.getAcitveTemplateCount($scope.search).then(function(response){
				$scope.count = response.data;				
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getAcitveTemplateCount(null);
	    
		
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
	        $scope.fetchTemplateMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	
	    
		
		
		$scope.fetchtemplateId = function(id){		
			GlobalModule_dataStoreService.storeData('LoginModule','templateid',id);			
				  Admin_Service.fetchtemplateId(id).then(function(response){
					  $scope.template = response.data;	
					  
					  $scope.data = $scope.template[0];
					 
					  GlobalModule_dataStoreService.storeData('LoginModule','data',$scope.data);
					  GlobalModule_dataStoreService.storeData('LoginModule','flag',false);	
					 $state.go("restricted.admin.createtemplate");		
					
				  },function(response){						
					});
			  };	  
			  
			 	
			  $scope.getCheckedtemplateid=[];			  
			  $scope.checkedtemplateList = function(id){			  
				  
				  if($scope.getCheckedtemplateid.indexOf(id) !== -1)
				  {		
				  var array  = $scope.getCheckedtemplateid;
				  var index = array.indexOf(id);
				  $scope.getCheckedtemplateid.splice(index,1);
				  }else
					  {		    	
			      $scope.getCheckedtemplateid.push(id);				      
					  };	
			  };
			  
			  
			  $scope.checkedAllList = function(listedTemplate,rd){				  
				  if(rd == true || rd == undefined){				 
				  for(var i=0; i<listedTemplate.length; i++){					  
					  
					  //if not already exist in getCheckedtemplateid than pass
					  if($scope.getCheckedtemplateid.indexOf(listedTemplate[i].id) == -1)   {  		
						  $scope.checkedtemplateList(listedTemplate[i].id);	
					  }
					  
				  }			
				  }else{
					  $scope.getCheckedtemplateid=[];
				  }
			  };
			  
			  
			 
			  $scope.check = function(){				  
			  if($scope.getCheckedtemplateid.length == 0){
				  GlobalModule_notificationService.notification("error","Please select any record");}
			  else{				  
				  $('#deletelist').modal('show');
				  }			  
			  };			 
			  
			  
			  $scope.deletefromList = function(formlist){
				  $scope.formlist=formlist;
				 //alert($scope.formlist+" "+$scope.getCheckedId.length);
				  if($scope.getCheckedtemplateid.length == 0) 
				  {
					  GlobalModule_notificationService.notification("error","Please select any record");
				  }
				  else
				  {
					  Admin_Service.deleteFromList($scope.formlist,$scope.getCheckedtemplateid).then(function(response){
					  $scope.postjobflag = response.data;	
					  $scope.getAcitveTemplateCount(null);
					  $scope.fetchTemplateMaster(0,10,null,null,null);
					 
					  if($scope.postjobflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");						 
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");					  
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
			  }
				  $scope.getCheckedtemplateid = [];
			  };
			  
			  
}]);