'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Requistion_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','Customer_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,Customer_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	  //$scope.customerAssessmentRequisitionFlag=false;
	
	$scope.getSettings = function(){
		Customer_Service.getSettings($rootScope.userdetails.id,3).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Brand' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Brand' || $scope.columnlist[j].name=='Position' || $scope.columnlist[j].name=='Department' || $scope.columnlist[j].name=='No. of Candidates' || $scope.columnlist[j].name=='Selected Candidates' || $scope.columnlist[j].name=='Date of Requisition' || $scope.columnlist[j].name=='Expected date of closure'){
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
		Customer_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
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
					if($scope.columnlist[i].name=='Brand' || $scope.columnlist[i].name=='Selected Candidates'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
	};

	
	 $scope.fetchCustRequisitionList = function(offset,limit,colName,order,search){
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
		 
	Customer_Service.fetchCustRequisitionList(offset,limit,colName,order,search).then(function(response){
		
		 $scope.customerrequisitionList=response.data;
		 $(".loader").fadeOut("slow");
	 },function(response){
			$(".loader").fadeOut("slow");
		});
	 };
	$scope.fetchCustRequisitionList(0,10,null,null,null);
	
	
	  $scope.getCustRequisitionCount=function(search){
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
			 Customer_Service.getCustRequisitionCount($scope.search).then(function(response){
				$scope.count = response.data;
			
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getCustRequisitionCount(null);
		
		
		
		 $scope.setButton = function(){
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					 $scope.fetchCustRequisitionList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
				};
	
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
        $scope.fetchCustRequisitionList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
    };
	
    $scope.SortingPostedJobList = function(colName,searchterm){
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
			$scope.fetchCustRequisitionList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
    
		$scope.createCustomerRequisitionPage = function(){
			
			$state.go("restricted.admin.createrequisition");
			GlobalModule_dataStoreService.storeData('LoginModule','customerRequisitionFlag', false);
			GlobalModule_dataStoreService.storeData('LoginModule','customerAssessmentRequisitionFlag',false);
			$scope.customerAssessmentRequisitionFlag=false;
		};
		
		$scope.fetchRequisitionById=function(id){
			
			Customer_Service.fetchRequisitionById(id).then(function(response){
				
				 $scope.customerrequisition=response.data;
				 $scope.brand_id=$scope.customerrequisition.brand.id;
				 $scope.dept_id=$scope.customerrequisition.category.id;
				 $scope.position_id=$scope.customerrequisition.position.id;
				 GlobalModule_dataStoreService.storeData('LoginModule','customerRequisition', $scope.customerrequisition);
				  GlobalModule_dataStoreService.storeData('LoginModule','customerRequisitionFlag', true);
				  GlobalModule_dataStoreService.storeData('LoginModule','req_id', id);
				  $scope.newassessmentlist=$scope.customerrequisition.assessmentList;
				  
				 $state.go("restricted.admin.createrequisition");
				// fetch Requisition Mapping Assessment cc-573
				 $scope.fetchassessmentlist($scope.brand_id,$scope.dept_id,$scope.position_id);
				  
				 $(".loader").fadeOut("slow");
			 },function(response){
					$(".loader").fadeOut("slow");
					
				});
			 };
			/*$scope.customerrequisitionList*/
			
		$scope.updateRequiDetails=function(req){
			
			Customer_Service.updateRequiDetails(req).then(function(response){
				
			});
		};
		
		
		//delete from list
		
		
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
		  
		  $scope.checkedAllList = function(listedRequisition,rd){
			  
			  if(rd == true || rd == undefined){				 
			  for(var i=0; i<listedRequisition.length; i++){					  
				  
				  //if already exist in getCheckedpoitionid than don't pass
				  if($scope.getCheckedId.indexOf(listedRequisition[i].id) !== -1)   {  						 
				  }else{
					  $scope.checkedList(listedRequisition[i].id);	
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
		  
		  
		  
		  
		  $scope.deletefromListreq = function(formlist){
			  $scope.formlist=formlist;
			  

			  if($scope.getCheckedId.length == 0) 
			  {
				  GlobalModule_notificationService.notification("error","Please select any record");
			  }
			  else
			  {
				  $("#deletelist").modal('show');
				  Admin_Service.deleteFromList($scope.formlist,$scope.getCheckedId).then(function(response){
				  $scope.custrequiflag = response.data;	
				  $scope.getCheckedId=[];
				  $scope.getCustRequisitionCount(null);
				  $scope.fetchCustRequisitionList(0,10,null,null,null);
				  
				  if($scope.custrequiflag.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Record deleted successfully");
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
				   
				 
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
				  
			  }
			
		  };
		
		  
		  $scope.checkifRequisitionSelected = function(){
			  
			  if($scope.getCheckedId.length == 0){
				  GlobalModule_notificationService.notification("error","Please select any record");
			  }else{				  
				  $("#deletelist").modal('show');
			  }
			
		  };
		  
		//---------------------------------fatch assessment base on brand,dep,position----------------------//
		  $scope.fetchassessmentlist = function(brand_id,dept_id,position_id){		
			  $(".loader").show();
			  Customer_Service.fetchassessmentlist(brand_id,dept_id,position_id).then(function(response){
				  $scope.assessmentlist = response.data;
				  $scope.searchassessmentlist=$scope.assessmentlist;
				  if($scope.assessmentlist.length>0){
					  if($scope.customerrequisition.assessmentList !=undefined){
						  $scope.showRequisitionFlag=true;
						  }else{
							  $scope.showRequisitionFlag=false;
						  }
					  $scope.customerAssessmentRequisitionFlag=true;
					   GlobalModule_dataStoreService.storeData('LoginModule','customerAssessmentRequisitionFlag',true);
					   GlobalModule_dataStoreService.storeData('LoginModule','assessmentlist',$scope.assessmentlist);
					   GlobalModule_dataStoreService.storeData('LoginModule','searchassessmentlist',$scope.searchassessmentlist);					   
				  }else{
					  $scope.customerAssessmentRequisitionFlag=false;
					  GlobalModule_dataStoreService.storeData('LoginModule','customerAssessmentRequisitionFlag',false);
				  }
				  $(".loader").fadeOut("slow");
				  $state.reload();
			  },function(response){	
				  $(".loader").fadeOut("slow");
				});		  
		  };
		 
		 
}]);