var controllers=angular.module("LoginModule")

controllers.controller('ListingSupportGroupController',function($scope,GlobalModule_notificationService,$rootScope,SupportGroupService,RegionService){
	
	//	pagination
	$scope.supportGroup={};
	$scope.offset=0;
	$scope.limit=10;
	$scope.supportGroupList=[];
	$scope.fetchSupportGroupListing=function(offset,limit,colName,order,search){
		
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
		SupportGroupService.fetchSupportGroupListing(offset,limit,colName,order,search).then(function(response){
		
			$scope.supportGroupList=response.data;
			console.log($scope.supportGroupList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.fetchSupportGroupListing(0,10,null,null,null);
			
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchSupportGroupListing($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};

	$scope.fetchSupportGroupListCount=function(searchterm){

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

		SupportGroupService.fetchSupportGroupListCount($scope.search).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.fetchSupportGroupListCount(null);

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
		$scope.fetchSupportGroupListing($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};

//	--------------------sorting---------------------------------
	$scope.SortingSupportGroupListing = function(colName,searchterm){
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
		$scope.fetchSupportGroupListing(0,10,$scope.colName,$scope.order,$scope.search);		
	};
	
	$scope.SortingsupportGroupList= function(colName,searchterm)
	{
			$scope.offset =0 ;
			$scope.start = 0;
			$scope.colName=colName;
			$scope.search=searchterm;
			
		if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
		{
			$scope.order ="asc";
		}
		else if($scope.order != undefined && $scope.order == "asc")
		{
			$scope.order = "desc";
		}
		if($scope.search == "" || $scope.search==null)
		{
			$scope.search= undefined;

		}
		if($scope.colName==null)
		{
			$scope.colName= undefined; 
		}
		$scope.fetchSupportGroupListing(0,10,$scope.colName,$scope.order,$scope.search);	
	};
	
		$scope.fetchRegionList = function(){

			$(".loader").show();

			RegionService.fetchRegionList().then(function(response){
				$scope.regionList=response.data;				 
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		}
		$scope.fetchRegionList();
		
		$scope.openAddEditModal= function(supportgroup){
			
			$(".loader").show();
			
			if(supportgroup == undefined)
			{
				$scope.supportgroup={};
			}
			else
			{
				$scope.supportgroup=supportgroup;
			}
			$(".loader").fadeOut("slow");
			$('#add_edit_support_group').modal('show');
		};
				
		$scope.saveSupportGroup=function(supportgroup){
			
			$(".loader").show();
			
			if(supportgroup.name == undefined || !supportgroup.name.match(TEXT_VALIDATOR_REGEX))
			{
				  GlobalModule_notificationService.notification("error","Please enter valid Support Group Name");
				  $(".loader").fadeOut("slow");
				  return;
			}
			if(supportgroup.region == undefined || supportgroup.region.id == undefined || supportgroup.region.id == 0)
			{
				GlobalModule_notificationService.notification("error","Please select region");
				$(".loader").fadeOut("slow");
				return;
			}
				
			SupportGroupService.createSupportGroup(supportgroup).then(function(response){
				
				var saveStatus=response.data;
				
				if(saveStatus == "duplicateName")
				{
					GlobalModule_notificationService.notification("error","Support Group already exists");
					$(".loader").fadeOut("slow");
				}
				else if(saveStatus == "success")
				{
					$('#add_edit_support_group').modal('hide');
					if($scope.supportgroup.id == undefined || $scope.supportgroup.id == 0)
					{
						GlobalModule_notificationService.notification("success","Support Group has been added successfully");
					}
					else if($scope.supportgroup.id != 0)
					{
						GlobalModule_notificationService.notification("success","Support Group has been updated successfully");
					}
					$(".loader").fadeOut("slow");
					$scope.fetchSupportGroupListing(0,10,null,null,null);
					$scope.fetchSupportGroupListCount(null);
 				}
 
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		}
		
		$scope.checkedSupportGroupIds=[];
		  
		$scope.checkSupportGroup = function(id){			  
			  
			  if($scope.checkedSupportGroupIds.indexOf(id) !== -1)
			  {		
				  var array  = $scope.checkedSupportGroupIds;
				  var index = array.indexOf(id);
				  $scope.checkedSupportGroupIds.splice(index,1);
			  }else
			  {		    	
				  $scope.checkedSupportGroupIds.push(id);				      
			  };						  
		  };
		 
		  $scope.checkedAllList = function(supportGroupList,rd){				  
			  
			  if(rd == true){
				  
			  for(var i=0; i<supportGroupList.length; i++){					  
				  
 				  if($scope.checkedSupportGroupIds.indexOf(supportGroupList[i].id) !== -1)   {  						 
				  }else{
					  $scope.checkSupportGroup(supportGroupList[i].id);	
				  }				  
			  }			
			  }else{
				  $scope.checkedSupportGroupIds=[];
			  }
		  };
		
		$scope.deleteSupportGroup = function(){
			  
				$(".loader").show();
 			
			    $("#deletelist").modal('show');
			    SupportGroupService.deleteSupportGroup($scope.checkedSupportGroupIds,'ic_support_group').then(function(response){
				   var deleteflag = response.data;	
				   
				  $scope.checkedSupportGroupIds=[];
				  if(deleteflag == "success"){
					  GlobalModule_notificationService.notification("success","Support Group deleted successfully");
					  $(".loader").fadeOut("slow");
					  $scope.fetchSupportGroupListing(0,10,null,null,null);
					  $scope.fetchSupportGroupListCount(null);
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
		  };
		  
		  $scope.check = function()
		  {				  
			  if($scope.checkedSupportGroupIds.length == 0)
			  {
				  GlobalModule_notificationService.notification("error","Please select any record");
			  }
			  else
			  {				  
				  $('#deletelist').modal('show');
			  }			  
		  };
});