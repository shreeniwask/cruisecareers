'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('group_mapping_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','group_mapping_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,group_mapping_Service){




	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');


	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.searchOf;

	//grouplisting 	
	$scope.fetchGroupList = function(offset,limit,colName,order,searchOf){

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
		group_mapping_Service.fetchGroupList(offset,limit,colName,order,searchOf).then(function(response){
			$scope.groupList = response.data;

			console.log($scope.groupList);
			$(".loader").fadeOut("slow");
		},function(response){	
			$(".loader").fadeOut("slow");
		});	 
	};
	$scope.fetchGroupList(0,10,null,null,null);



	//-------------------------------pagination---------------------------

	$scope.fetchGroupCount=function(search){

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

		group_mapping_Service.fetchGroupCount($scope.searchOf).then(function(response){				
			$scope.count = response.data;
			console.log($scope.count);
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.fetchGroupCount(null);

	
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchGroupList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.searchOf);
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
		$scope.fetchGroupList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.searchOf);
	};

//	----------------------------sorting------------------------------------
$scope.sortingOfGroupListing = function(colName,searchterm){
	
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
	
	$scope.fetchGroupList(0,10,$scope.colName,$scope.order,$scope.searchOf);
};


$scope.dateformate = function(date){		     
	var dateOut = moment(date).format("DD-MM-YYYY");
	return dateOut;
};



//For Delete Group
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

$scope.checkedAllList = function(grouplist,gl){	

	if(gl == true || gl == undefined){				 
		for(var i=0; i<grouplist.length; i++){					  

			//if already exist in getCheckedtemplateid than don't pass
			if($scope.getCheckedId.indexOf(grouplist[i].id) !== -1)   
			{  						 
			}
			else{
				$scope.checkedList(grouplist[i].id);	
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


$scope.deleteFromGroupList = function(){
	if($scope.getCheckedId.length == 0){
		GlobalModule_notificationService.notification("error","Please select any record");
	}else{
		
		group_mapping_Service.deleteFromGroupList($scope.getCheckedId,$rootScope.userdetails.id).then(function(response){				
			$scope.count = response.data;
			$scope.fetchGroupList(0,10,null,null,null);

			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});
	}

};

$scope.openCreateGroupPage= function(group){
	
	GlobalModule_dataStoreService.storeData('LoginModule','group',group);
	$state.go("restricted.admin.createGroup");
	
};




}]);
