'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('role_mapping_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','role_mapping_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,role_mapping_Service){


	

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	$scope.searchOf;
	
	
	$scope.fetchCreatedRoleList = function(offset,limit,searchOf,order,colName){
		
		$(".loader").show();
		
		$scope.getCheckedId=[];
		
		 if(searchOf==null || searchOf=="")
		  {
			 searchOf= undefined;		  
		  }
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		 role_mapping_Service.fetchCreatedRoleList(offset,limit,searchOf,order,colName).then(function(response){
			  $scope.createdroleList = response.data;
			  
			  console.log($scope.createdroleList);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});		  
	};
	$scope.fetchCreatedRoleList(0,10,$scope.searchOf,null,null);
	
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchCreatedRoleList($scope.offset,$scope.limit,$scope.searchOf,$scope.order,$scope.colName);
			};
			
		$scope.getCreatedRoleCount=function(search){
							
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.searchOf=search;
			if($scope.colName == null){
				$scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 if($scope.searchOf=="" || $scope.searchOf == null)
			  {
			  $scope.searchOf= undefined;  
			  }
			
			 role_mapping_Service.getCreatedRoleCount($scope.searchOf).then(function(response){				
				$scope.count = response.data;
				console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();					
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getCreatedRoleCount(null);
		
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
	        $scope.fetchCreatedRoleList($scope.offset,$scope.limit,$scope.searchOf,$scope.order,$scope.colName);
	       
	    };
	    
//--------------------sorting---------------------------------
	    
	    $scope.sortingOfRolelisting = function(colName,searchterm){
			  $scope.offset =0 ;
				$scope.start = 0;
			  $scope.colName=colName;
				$scope.searchOf=searchterm;
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.searchOf=="" || $scope.searchOf==null)
				  {
					$scope.searchOf= undefined;
				  
				  }
				if($scope.colName==null)
				  {
				  $scope.colName= undefined; 
				  }
				$scope.fetchCreatedRoleList(0,10,$scope.searchOf,$scope.order,$scope.colName);
			};
			
		  $scope.dateformate = function(date){		     
			    var dateOut = moment(date).format("DD-MM-YYYY");
			    return dateOut;
			};
			
			//for setting modal values
			$scope.roleLogmodal;
			$scope.setroleLogModal = function(e){
				$scope.roleLogmodal=e;
			};
		
			// for deleting roles
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
			  
			  $scope.checkedAllList = function(createdroleList,rd){	
				  
				  if(rd == true || rd == undefined){				 
				  for(var i=0; i<createdroleList.length; i++){					  
					  
					  //if already exist in getCheckedtemplateid than don't pass
					  if($scope.getCheckedId.indexOf(createdroleList[i].id) !== -1)   
					  {  						 
					  }
					  else{
						  $scope.checkedList(createdroleList[i].id);	
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
			
			$scope.deleteRoleFromList = function(){
			if($scope.getCheckedId.length == 0){
				GlobalModule_notificationService.notification("error","Please select any record");
			}else{
				role_mapping_Service.deleteRoleFromList($scope.getCheckedId).then(function(response){				
					$scope.count = response.data;
					$scope.fetchCreatedRoleList(0,10,null,null,null);
					GlobalModule_notificationService.notification("success","Record deleted successfully");
					
					if($scope.count>$scope.limit){
						$scope.setButton();					
					}
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});
			}
			
			
			
		};
		
			$scope.openCreatePageSetting=function(role){			
				GlobalModule_dataStoreService.storeData('LoginModule','role',role);
				$state.go("restricted.admin.create_role");		
			};
	

}]);