var controllers=angular.module("LoginModule")


controllers.controller('DocumentTpyeListController',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','DocumentTypeListService', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,DocumentTypeListService){


	$scope.documentTypeList = [];
	$scope.documentType=[];
	$scope.roleName=[];
	$scope.offset=0;
	$scope.limit=10;
	$scope.documentTypeObj={};
	$scope.documentTypeObj.documentTypeRoles=[];
	$scope.documentRetentionDays;


	//Document Type List
	$scope.fetchDocumentTypeList=function(){

		$(".loader").show();

		DocumentTypeListService.fetchDocumentTypeList().then(function(response){
			$scope.documentType=response.data;
			console.log($scope.documentType);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.fetchDocumentTypeList();

	//Role Name
	$scope.fetchRoleList=function(){

		$(".loader").show();

		DocumentTypeListService.fetchRoleList().then(function(response){
			$scope.roleList=response.data;
			//console.log($scope.workFlowsList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	
	$scope.fetchRoleList();

	$scope.fetchDocumentTypeListWithRole = function(offset,limit,colName,order,search,id){
		$(".loader").show();


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
		$(".loader").show();

		DocumentTypeListService.fetchDocumentTypeListWithRole(offset,limit,colName,order,search).then(function(response){
			$scope.documentTypeList=response.data;
			console.log($scope.documentTypeList);
			//$scope.documentRetentionDays=$scope.documentTypeList[0].documentTypeMaster;
			//console.log($scope.documentRetentionDays);
			
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.fetchDocumentTypeListWithRole(0,10,null,null,null);

	//Data for storing in DataBase

	$scope.insertIntoDocumentTypeRoleMap=function(){
		
		if($scope.documentTypeObj.documentTypeRoles.length>0){
			DocumentTypeListService.insertIntoDocumentTypeRoleMap($scope.documentTypeObj).then(function(response){
				$(".loader").fadeOut("slow");
				$scope.fetchDocumentTypeListWithRole(0,10,null,null,null);
				$scope.documentTypeObj={};
				$scope.documentTypeObj.documentTypeRoles=[];
				
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		}else{
			GlobalModule_notificationService.notification("error","Assign At Least One Role");
		}
	}
	$scope.toggleSelection = function toggleSelection(id) {
		for(var i=0;i<$scope.documentTypeObj.documentTypeRoles.length;i++){
			if($scope.documentTypeObj.documentTypeRoles[i].roleId==id){
				$scope.documentTypeObj.documentTypeRoles.splice(i, 1);
				return;
			}
		}

		// Is currently selected
		$scope.documentTypeObj.documentTypeRoles.push({roleId:id});
	};
	$scope.checkIfRoleMapped = function toggleSelection(id) {
		for(var i=0;i<$scope.documentTypeObj.documentTypeRoles.length;i++){
			if($scope.documentTypeObj.documentTypeRoles[i].roleId==id){
				return true;
			}
		}
		return false;
	};



//	pagination
	//$scope.offset=0;
	//$scope.limit=10;
	//$scope.navButtons = [];
	

	$scope.fetchDocumentTypeCount=function(searchterm){

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

		DocumentTypeListService.fetchDocumentTypeCount($scope.search).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.fetchDocumentTypeCount(null);

	$scope.previous = function() {
		$scope.start =  $scope.start - 5;
		$scope.offset = $scope.start * $scope.limit;
		$scope.setButton();
		//$scope.fetchDocumentTypeCount(null);

	};

	$scope.next = function() {
		$scope.start =  $scope.start + 5;
		$scope.offset = $scope.start * $scope.limit;	      
		$scope.setButton(); 
		//$scope.fetchDocumentTypeCount(null);

	};
	//$scope.pageNumber=0;
	$scope.current = function(page) {  
	  	//$scope.pageNumber=page;
		$scope.offset = page *$scope.limit;
		$scope.fetchDocumentTypeListWithRole($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchDocumentTypeListWithRole($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};


//	--------------------sorting---------------------------------

	$scope.SortingDocumentTypeList = function(colName,searchterm){
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
		$scope.fetchDocumentTypeListWithRole(0,10,$scope.colName,$scope.order,$scope.search);	
	};

	//Fetching Roles for DocumentType

	$scope.fetchRoleListForDocumentType=function(){

			$(".loader").show();
			DocumentTypeListService.fetchRoleListForDocumentType($scope.documentTypeObj.id).then(function(response){
				$scope.documentTypeObj.documentTypeRoles=response.data;
				//console.log($scope.workFlowsList);
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
	}
//});
	
	// for setting select index on start

	
	
	//adding document type
	
$scope.addDocumentType=function(documentTypeMaster){
	$(".loader").show();
	
	var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
	if(documentTypeMaster.name != undefined && documentTypeMaster.name.match(letterNumber)){
	for(var i=0;i<$scope.documentType.length;i++){
		if($scope.documentType[i].name==documentTypeMaster.name){
			  GlobalModule_notificationService.notification("error","document type already exist");
			  $(".loader").fadeOut("slow");
			return false;  
			}
	
		}
	DocumentTypeListService.addDocumentType(documentTypeMaster).then(function(response){
		 $scope.documentTyperesponse = response.data;
		 if( $scope.documentTyperesponse=="success")
	{
		  GlobalModule_notificationService.notification("success","Your Document type has been added successfully");
		  $("#add_documenttype").modal('hide');
		  $("#days").val("");
		  $scope.fetchDocumentTypeList();
		 $scope.documentTypeMaster.name="";
		//  $scope.fetchRoleListForDocumentType();
		  $scope.fetchDocumentTypeListWithRole(0,10,null,null,null);
		  $scope.fetchDocumentTypeCount(null);
		  
		 // $scope.fetchDocumentTypeCount(null);

	}
		 else
			 {
			   GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
			 }
		 $(".loader").fadeOut("slow");
			},function(response){
					$(".loader").fadeOut("slow");
				}); 
		}
	else
		{
		GlobalModule_notificationService.notification("error","Please enter valid input");
		 $(".loader").fadeOut("slow");
		}

};

//deleting document type


$scope.checkedDocumentids=[];

$scope.addcheckedDocumentids = function(id){			  
			  
	if($scope.checkedDocumentids.indexOf(id) !== -1)
	{		
		var array  = $scope.checkedDocumentids;
		var index = array.indexOf(id);
		$scope.checkedDocumentids.splice(index,1);
	}
	else
	{		    	
		$scope.checkedDocumentids.push(id);				      
	};						  
};
		 
$scope.checkedAllList = function(documentTypeList,rd){
	
	if(rd == true || rd == undefined)
	{				 
		for(var i=0; i<documentTypeList.length; i++)
		{					  
			if($scope.checkedDocumentids.indexOf(documentTypeList[i].id) !== -1)  
			{  						 
			}
			else
			{
				 $scope.addcheckedDocumentids(documentTypeList[i].id);	
			}						  
		}			
	}
	else
	{
		$scope.checkedDocumentids=[];
	}
};
		  
		  
$scope.check = function(){
	
	if($scope.checkedDocumentids.length == 0)
	{
		GlobalModule_notificationService.notification("error","Please select any record");
	}
	else
	{				  
		$('#deletelist').modal('show');
	}			  
};

$scope.deleteDocument = function(formlist){
	  
	$(".loader").show();			  
	
	$("#deletelist").modal('hide');
	    
	DocumentTypeListService.deleteDocumentType(formlist,$scope.checkedDocumentids).then(function(response){
	    	
		 var deleteStatusFlag = response.data;				   
		 $scope.checkedDocumentids=[];
		  
		 if(deleteStatusFlag.indexOf("success")!=-1)
		 {
			  GlobalModule_notificationService.notification("success","Document deleted successfully");
			  $scope.fetchDocumentTypeListWithRole(0,10,null,null,null);
			  $scope.fetchDocumentTypeList();
			  $scope.fetchDocumentTypeCount(null);
		 }
		 else
		 {
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		 }
		 
		 $(".loader").fadeOut("slow");
		 
	 },function(response){
		  $(".loader").fadeOut("slow");
});
};


//update retention days

    
    $scope.updateRetentionDays=function(document){
    	$scope.updatedaysId=document.id;
    	$scope.documentRetentionDays=document.documentTypeMaster.retentionDays;
    	$("#add_retentionDays").modal('show');
    	
    };
    
   
    $scope.updateRetentionDaysOfDocument=function(retentionDays)
    {
    	DocumentTypeListService.updateRetentionDaysOfDocument($scope.documentRetentionDays,$scope.updatedaysId).then(function(response){
			 
		  $scope.updatedays = response.data;	
		 
		  if($scope.updatedays.indexOf("success")!=-1){
			  
			  GlobalModule_notificationService.notification("success","Your document retention days has been updated successfully");	
				$scope.fetchDocumentTypeListWithRole(0,10,null,null,null);

			  $("#add_retentionDays").modal('hide');
		  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");  
	  });		
			  
			  
			  
			  
			  					  
			
			  
    };
//----------------insert document  details----------------

/*$scope.addDocumentType=function(documentTypeMaster){
	
	$scope.documentType
	if(documentTypeMaster.name == undefined || documentTypeMaster.name.match(letterNumber)){
		
	$scope.id=documentTypeMaster.id;
	documentTypeMaster.userid=$rootScope.userdetails.id;
	
		DocumentTypeListService.addDocumentType(documentTypeMaster).then(function(response){														
		  $scope.documentTyperesponse = response.data;
		  console.log( $scope.documentTyperesponse);
		  $scope.getBrandListcount(null);
		  $scope.fetchBrandsList(0,10,null,null,null);
		  $scope.fetchDocumentTypeList();
		  $scope.documentTypeMaster.name="";	  			  
		 //$state.go('restricted.admin.brandmaster');	
		  $("#add_documenttype").modal('hide');
		  if($scope.documentTyperesponse.indexOf("success") != -1)
			  {
		          GlobalModule_notificationService.notification("success","Your Document type has been added successfully");
		          
		        //  $(".loader").fadeOut("slow");
			  }
		  else if($scope.documentTyperesponse=='failed'){
			  
			  GlobalModule_notificationService.notification("error","Document Type Name already exist");
			  $("#add_documenttype").modal('hide');
			//  $(".loader").fadeOut("slow");
			 
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
	   	
	
}*/


}]);
