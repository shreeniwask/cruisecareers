'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Upload_Doc_List_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Upload_Doc_List_Service','Admin_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Upload_Doc_List_Service,Admin_Service,Master_Service){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.documentList=[];
	$scope.offset=0;
	$scope.limit=10;
	$scope.docListId;
	
	
	// for column sorting
	$scope.getSettings = function(){
		Admin_Service.getSettings($rootScope.userdetails.id,20).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
			var userdcolindex=[];
			var admindcolindex=[];
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Emp Number' || $scope.columnlist[i].name=='Emp Name' ){
							userdcolindex.push(i);
						}
						if($scope.columnlist[i].name=='File Name' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Emp Number' || $scope.columnlist[j].name=='Emp Name' || $scope.columnlist[j].name=='File Name' || $scope.columnlist[j].name=='File Type' || $scope.columnlist[j].name=='Upload Date' || $scope.columnlist[j].name=='	Expiry Date' ){
									$scope.columnlist[j].isActive=true;
								}
							}
						}
						if($scope.columnlist[i].isActive==true)
							{
							count++;
							}
					}
					if($rootScope.userdetails.roleId!=1 && (!($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8)) && $rootScope.userdetails.roleId!=8 ){
						
						/*$scope.columnlist.splice(0,1);
						$scope.columnlist.splice(0,1);*/
						
						for(var i=userdcolindex.length-1;i>=0;i--){
							$scope.columnlist.splice(userdcolindex[i],1);
						}
					}
			
		if(count==$scope.columnlist.length)
			{
			$scope.colcheck=true;
			}else{
				$scope.colcheck=false;
			}
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	};
	$scope.getSettings();
	
	$scope.savesettings = function(){
		var count=0;
		for(var i=0;i<$scope.columnlist.length;i++){
			if($scope.columnlist[i].isActive==true)
				{
				count++;
				}
		}

		if(count==$scope.columnlist.length)
		{
		$scope.colcheck=true;
		}else{
			$scope.colcheck=false;
		}	
		Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
			  $scope.savesetFlag = response.data;	
		});
	};
	
			$scope.activeColumn = function(columnName)
			{
				if($scope.columnlist != undefined){
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
						return true;
				}
				}
				return false;
			};
	
	
	$scope.selectAllColoumns = function(check)
	{
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Emp Number' || $scope.columnlist[i].name=='Emp Name' || $scope.columnlist[i].name=='File Name'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
	};
	


$scope.fetchDocumentList = function(offset,limit,colName,order,search){

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

	Upload_Doc_List_Service.fetchDocumentList(offset,limit,colName,order,search,$rootScope.userdetails).then(function(response){
		$scope.documentList=response.data;
		console.log($scope.documentList);
		$(".loader").fadeOut("slow");
	},function(response){
		$(".loader").fadeOut("slow");
	}); 
};
$scope.fetchDocumentList(0,10,null,null,null);


//pagination
$scope.setButton = function(){
	$scope.navButtons = [];

	for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
		$scope.navButtons.push(j);
	}
	$scope.fetchDocumentList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
};

$scope.fetchDocumentListCount=function(searchterm){

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

	Upload_Doc_List_Service.fetchDocumentListCount($scope.search,$rootScope.userdetails).then(function(response){				
		$scope.count = response.data;
		if($scope.count>$scope.limit){
			$scope.setButton();					
		}

	},function(response){
		$(".loader").fadeOut("slow");		
	});		
};
$scope.fetchDocumentListCount(null);

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
	$scope.fetchDocumentList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
};


//--------------------sorting---------------------------------

$scope.SortingDocumentList = function(colName,searchterm){
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
	$scope.fetchDocumentList(0,10,$scope.colName,$scope.order,$scope.search);	
};


// //-----settings------
/*var getSettings = function(){
	
	$(".loader").show();
	
	Admin_Service.getSettings($rootScope.userdetails.id,18).then(function(response){
		  $scope.columnlist = response.data;
		  console.log($scope.columnlist);
		var count=0;
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Id' && $scope.columnlist[i].isActive==false){
						for(var j=0;j<$scope.columnlist.length;j++){
							if( $scope.columnlist[j].name=='File Name' || $scope.columnlist[j].name=='Created Date' || $scope.columnlist[j].name=='File Type' || $scope.columnlist[j].name=='Emp Id' || $scope.columnlist[j].name=='Emp Name'){
								$scope.columnlist[j].isActive=true;
							}
						}
					}
					if($scope.columnlist[i].isActive==true)
						{
						count++;
						}
				}
		
	if(count==$scope.columnlist.length)
		{
		$scope.colcheck=true;
		}else{
			$scope.colcheck=false;
		}
		  $(".loader").fadeOut("slow");
	},function(response){
		$(".loader").fadeOut("slow");
		});
	$(".loader").fadeOut("slow");
};

$scope.getSettings();

$scope.savesettings = function(){
	
	$(".loader").show();
	
	var count=0;
	for(var i=0;i<$scope.columnlist.length;i++){
		if($scope.columnlist[i].isActive==true)
			{
			count++;
			}
	}

	if(count==$scope.columnlist.length)
	{
	$scope.colcheck=true;
	}else{
		$scope.colcheck=false;
	}	
	Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
		  $scope.savesetFlag = response.data;	
	});
	$(".loader").fadeOut("slow");
};

$scope.activeColumn = function(columnName)
{
	
	if($scope.columnlist != undefined){
	for(var i=0;i<$scope.columnlist.length;i++){
		if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
			return true;
		}
	}
	return false;
};


$scope.selectAllColoumns = function(check)
{
	$(".loader").show();
	
	if(check==true)
		{
		for(var i=0;i<$scope.columnlist.length;i++){
			 $scope.columnlist[i].isActive=true;
				
		}
		}else{
			for(var i=0;i<$scope.columnlist.length;i++){
				if( $scope.columnlist[j].name=='File Name' || $scope.columnlist[j].name=='Created Date' || $scope.columnlist[j].name=='File Type' || $scope.columnlist[j].name=='Emp Id' || $scope.columnlist[j].name=='Emp Name'){
					$scope.columnlist[i].isActive=true;
					}else{
						$scope.columnlist[i].isActive=false;
					}
				}
				
			}
	$(".loader").fadeOut("slow");
};*/

// for deleting files
// for deleting emailLogs
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
 
 $scope.checkedAllList = function(documentList,rd){	
	  
	  if(rd == true || rd == undefined){				 
	  for(var i=0; i<documentList.length; i++){					  
		  
		  //if already exist in getCheckedtemplateid than don't pass
		  if($scope.getCheckedId.indexOf(documentList[i].id) !== -1)   
		  {  						 
		  }
		  else{
			  $scope.checkedList(documentList[i].id);	
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

$scope.deleteFileLogs = function(){
	
	if($scope.getCheckedId.length == 0){
		GlobalModule_notificationService.notification("error","Please select any record");
	}else{
		Upload_Doc_List_Service.deleteFileLogs($scope.getCheckedId).then(function(response){				
			$scope.count = response.data;
			$scope.fetchDocumentList(0,10,null,null,null);
			 $scope.fetchDocumentListCount($scope.searchterm);
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}
		
		},function(response){
			$(".loader").fadeOut("slow");		
		});
		GlobalModule_notificationService.notification("success","Record Deleted Successfully");
	}
	
	
	
};


//------------------- Generate excel------------------------
$scope.generateExcel = function(){		 
	  if($scope.search == undefined){
		  $scope.search ="";
	  }			 
	  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+20+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
  };
  
	$scope.dateformatte = function(date){
	    var dateOut = moment(date).format("DD-MM-YYYY hh:mm:ss");
	    return dateOut;
	};

$scope.dateformate = function(date){		     
  var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
  return dateOut;
};

$scope.openAddFieldsPage=function(workflow){
  
  GlobalModule_dataStoreService.storeData('LoginModule','fieldId',undefined);
  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
  $state.go("restricted.admin.addworkflowfield");
};

$scope.openEditWorkFlowPage=function(workflow){
  
  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
  $state.go("restricted.admin.createworkflow");
};

$scope.openTasksListPage= function(workflow){
  
  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
  $state.go("restricted.admin.taskslist");
};
	

// for download file
$scope.download = function(path){	
	
	if(path.includes("amazonaws"))
	   {
		$rootScope.getSignedURL(path).then(function(response){
			window.open(response.data);
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	   }
	   else
	   {
			window.open(path);
	    }
	
};

$scope.PreviewDownload = function(path){
	 
	if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
	{
	$scope.imageFlag=true;
	if(path.includes(".pdf"))
	{
	$scope.imageFlag=false;
	$scope.pdfFlag=true;
	}else{
	$scope.imageFlag=true;
	$scope.pdfFlag=false;
	}
	if(path.includes("amazonaws"))
	{
	$rootScope.getSignedURL(path).then(function(response){

	$scope.fileurl=response.data;
	$scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
	console.log($scope.pdfDocPath);
	},function(response){
	GlobalModule_dataStoreService.errorResponseHandler(response);
	});
	  }
	}

	 else
	 $scope.imageFlag=false;
	if(!(path.includes(".pdf"))){
	  $scope.pdfFlag=false
	}
	};


// for generating excel
//for generating excelsheet
$scope.generateExcel = function(){		 
	  if($scope.search == undefined){
		  $scope.search ="";
	  }			 
	  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+20+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
 };
 
 // for enter key in search
 $scope.searchOnEnter = function($event,search){
 
	 var keyCode = $event.which || $event.keyCode;
	    if (keyCode === 13) {
	    	$scope.fetchDocumentList(0,10,null,null,search);
	    	$scope.fetchDocumentListCount(search);
	    }
 };
 
 $scope.setlistid= function(s)
 {  		
	  $scope.docListId=s.id;
	  if(s.expiryDate != undefined)
	  {
		  $scope.formatMmiDate=$scope.dateformate(s.expiryDate);
		  $scope.expiryDate=$scope.formatMmiDate;
	  }
	  else
		  $scope.expiryDate="";
	  
	   //$('#add_expiry_date').modal('show');

	  
 };
 $scope.addExpirydate=function()
 {		   
	   
	   if(($("#expiryDate1").val()) == undefined || ($("#expiryDate1").val()) == "")
		{
			GlobalModule_notificationService.notification("error","Please enter valid expiry date");
			return;
		}
	  $scope.expiryDate=  $("#expiryDate1").val();
	  Upload_Doc_List_Service.addExpirydate($scope.docListId, $scope.expiryDate).then(function(response){
   	   $scope.expiryDate = response.data; 
   	// $('#add_expiry_date').modal('hide');
   	   console.log=($scope.expiryDate);
   	 GlobalModule_notificationService.notification("success","Expiry date updated successfully");										 
     $('#add_expiry_date').modal('hide');
     $scope.fetchDocumentListCount($scope.searchterm);
   $scope.fetchDocumentList(0,10,$scope.colName,$scope.order,$scope.search);
     //$scope.fetchDocumentList(0,10,null,null,null);
   	$scope.expiryDate='';
      
   	 		$(".loader").fadeOut("slow");
	 	},function(response){
			
			$(".loader").fadeOut("slow");
			
		});		

 };
 
 $scope.dateformate = function(date){	
	  
	  if(date == undefined || date == '')
	  {
		  return null;
	  }
	  
     var dateOut = moment(date).format("DD-MM-YYYY");
     return dateOut;
  };
  

 

}]);
