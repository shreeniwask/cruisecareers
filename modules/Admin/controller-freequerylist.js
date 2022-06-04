'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Free_Query_List_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Master_Service','Admin_Service','Free_Query_List_Service','Free_Query_Candidate_Service',function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Master_Service,Admin_Service,Free_Query_List_Service,Free_Query_Candidate_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	GlobalModule_dataStoreService.storeData('LoginModule','queryId',undefined);
	
	$scope.freeQueryList;
	$scope.queryInfoList;
	$scope.queryId;
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	//$scope.freequerylist=[];
	$scope.userAccessrights={};
	$scope.fetchqueryList=function(offset,limit,colName,order,search){
		
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
		
		$(".loader").show();
		Free_Query_List_Service.fetchqueryList(offset,limit,colName,order,search,$rootScope.userdetails.id).then(function(response){
			  $scope.freequerylist = response.data;
			    
			  console.log($scope.freequerylist);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});	
		
	};
	$scope.fetchqueryList(0,10,null,null,null);
	
	// for getting list count
	
	$scope.getQueryListCount=function(searchterm){
		
		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=searchterm;
	
		 if($scope.search=="" || $scope.search == null)
		  {
		  $scope.search= undefined;  
		  }
		
		 Free_Query_List_Service.getQueryListCount($scope.search,$rootScope.userdetails.id).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}
		
		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.getQueryListCount(null);
	
	// for pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchqueryList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
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
        $scope.fetchqueryList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
    };
	
    //for sorting 
    $scope.SortingFreeQueryList = function(colName,searchterm){
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
			$scope.fetchqueryList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		 // for enter key in search
		  $scope.searchOnEnter = function($event,search){
		  
		 	 var keyCode = $event.which || $event.keyCode;
		 	    if (keyCode === 13) {
		 	    	$scope.fetchqueryList(0,10,null,null,search);
		 	    	$scope.getQueryListCount(search);
		 	    }
		  };
    
	$scope.executeQuery=function(id){
		
		$(".loader").show();
		Free_Query_List_Service.executeQuery(id).then(function(response){
			  $scope.statusflag = response.data;
			  console.log($scope.statusflag);
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
	  
	//for generating excelsheet
		$scope.generateExcel = function(id){		 
						
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+21+'&queryId='+id+'&roleId='+$rootScope.userdetails.roleId+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
			  $state.reload();
		};
		 
		 // for deleting freequery data
		 $scope.getCheckedId=[];
		  
		  $scope.checkedList=function(id){
			  
			  if($scope.getCheckedId.indexOf(id) !== -1){	
				  var array  = $scope.getCheckedId;
				  var index = array.indexOf(id);
				  $scope.getCheckedId.splice(index,1);	
				  
			  }else{	
				  $scope.getCheckedId.push(id);
			  }
		  };
		  
		  $scope.checkedAllList = function(freequerylist,rd){	
			  
			  if(rd == true || rd == undefined){				 
				  for(var i=0; i<freequerylist.length; i++){					  
					  //if already exist in getCheckedtemplateid than don't pass
						  if($scope.getCheckedId.indexOf(freequerylist[i].id) !== -1){    
						   						 
						  }else{
						  
							  $scope.checkedList(freequerylist[i].id);	
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
			  $('#deletequerylist').modal('show');
			  }			  
		  };
		 		
			$scope.editFreeQuery = function(id,queryFor){
				
				if(queryFor == 1){
				GlobalModule_dataStoreService.storeData('LoginModule','queryId',id);
				$state.go("restricted.admin.freequery");
				}else if(queryFor == 2){
					GlobalModule_dataStoreService.storeData('LoginModule','queryId',id);
					$state.go("restricted.admin.freequeryEmployee");
				}
			};
			
			// for deleting one record only 
			$scope.deleteId;
			$scope.deleteThis=function (id){
				$scope.deleteId=id;
				$('#deletequerylist').modal('show');
			}
			 $scope.deleteFreeQuery = function(){
					$scope.ids=[];
					$scope.ids.push($scope.deleteId);
					
					Free_Query_List_Service.deleteFreeQuery($scope.ids).then(function(response){				
						$scope.count = response.data;
						GlobalModule_notificationService.notification("success","Record Deleted Successfully");
						$scope.fetchqueryList(0,10,null,null,null);
						$scope.getQueryListCount($scope.search);
						if($scope.count>$scope.limit){
							$scope.setButton();					
						}
					
					},function(response){
						GlobalModule_notificationService.notification("success","Record Deleted Successfully");
						$scope.fetchqueryList(0,10,null,null,null);
						$scope.getQueryListCount($scope.search);
						if($scope.count>$scope.limit){
							$scope.setButton();					
						}
						$(".loader").fadeOut("slow");		
					});
				
			};
			$scope.userdata=function(data){
				var obj={
						 queryId:data.id,
						 queryName: data.name,
						 "delete": true,
						 edit: true,
						 executeQuery:true
					};	
				GlobalModule_dataStoreService.storeData('LoginModule','data',obj);
 			};
			
			$scope.redirectPage=function(freequery){
				
				GlobalModule_dataStoreService.storeData('LoginModule','freequery',$scope.freequerylist);
				$state.go('restricted.admin.accessright');
			};
			
			$scope.datetimeformat = function(date){
				
				if(date == undefined || date == '')
				{
					 return null;
				}
				
		        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
		        return dateOut;
		   };
}]);