var controllers=angular.module("LoginModule")

controllers.controller('ListingSubSupportGroupController',function($scope,$rootScope,SubSupportGroupService,SupportGroupService,GlobalModule_notificationService){
	
//	pagination
	$scope.subSupportGroup={};
	$scope.offset=0;
	$scope.limit=10;
	$scope.subSupportGroupList=[];
	
	
	$scope.fetchListingSubSupportGroupList=function(offset,limit,colName,order,search){
		
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
		SubSupportGroupService.fetchListingSubSupportGroupList(offset,limit,colName,order,search).then(function(response){
 			$scope.subSupportGroupList=response.data;
 			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.fetchListingSubSupportGroupList(0,10,null,null,null);
			
	
	
	

	
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchListingSubSupportGroupList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};

	$scope.fetchSubSupportGroupListCount=function(searchterm){

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

		SubSupportGroupService.fetchSubSupportGroupListCount($scope.search).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.fetchSubSupportGroupListCount(null);

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
		$scope.fetchListingSubSupportGroupList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};


//	--------------------sorting---------------------------------

	$scope.SortingListingSubSupportGroupList = function(colName,searchterm){
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
		$scope.fetchListingSubSupportGroupList(0,10,$scope.colName,$scope.order,$scope.search);	
	
	
	};
	
	$scope.SortingSubSupportGroupList = function(colName,searchterm){
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
		$scope.fetchListingSubSupportGroupList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		
		$scope.fetchSupportGroupListing=function(){
			
			$(".loader").show();
			 
			SupportGroupService.fetchSupportGroupListing(0,1000,null,'asc',null).then(function(response){
			
				$scope.supportGroupList=response.data;
 				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		};
		$scope.fetchSupportGroupListing();

		$scope.checkedSubSupportGroupIds=[];
		  
		$scope.checkSubSupportGroup = function(id){			  
			  
			  if($scope.checkedSubSupportGroupIds.indexOf(id) !== -1)
			  {		
				  var array  = $scope.checkedSubSupportGroupIds;
				  var index = array.indexOf(id);
				  $scope.checkedSubSupportGroupIds.splice(index,1);
			  }else
			  {		    	
				  $scope.checkedSubSupportGroupIds.push(id);				      
			  };						  
		  };
		 
		  $scope.checkedAllList = function(subSupportGroupList,rd){				  
			  
			  if(rd == true){
				  
			  for(var i=0; i<subSupportGroupList.length; i++){					  
				  
 				  if($scope.checkedSubSupportGroupIds.indexOf(subSupportGroupList[i].id) !== -1)   {  						 
				  }else{
					  $scope.checkSubSupportGroup(subSupportGroupList[i].id);	
				  }				  
			  }			
			  }else{
				  $scope.checkedSubSupportGroupIds=[];
			  }
		  };
		
		$scope.deleteSubSupportGroup = function(){
			  
			$(".loader").show();
			
		    $("#deletelist").modal('show');
		    SupportGroupService.deleteSupportGroup($scope.checkedSubSupportGroupIds,'ic_sub_support_group').then(function(response){
			   var deleteflag = response.data;	
			   
			  $scope.checkedSubSupportGroupIds=[];
			  if(deleteflag == "success"){
				  GlobalModule_notificationService.notification("success","Sub Support Group deleted successfully");
				  $(".loader").fadeOut("slow");
				  $scope.fetchListingSubSupportGroupList(0,10,null,null,null);
				  $scope.fetchSubSupportGroupListCount(null);
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
		
		$scope.addEditSubSupportGroup= function(subSupportGroup){
			
			$(".loader").show();
			
			if(subSupportGroup == undefined)
			{
				$scope.subSupportGroup={};
				$scope.subSupportGroup.allDayShift=true;
				$('#datetimepicker_strt').data('date','') 
				$('#datetimepicker_end').data('date','') 
				$('#add_edit_sub_support_group').modal('show');
			}
			else
			{
				$scope.subSupportGroup=subSupportGroup;
				$('#datetimepicker_strt').data('date',$scope.subSupportGroup.workingHoursStartString) 
				 $('#datetimepicker_end').data('date',$scope.subSupportGroup.workingHoursEndString) 
				$('#add_edit_sub_support_group').modal('show');
			}
			$(".loader").fadeOut("slow");
		};
		
 		$scope.saveSubSupportGroup=function(supportgroup){
			
			$(".loader").show();
			 			
			if(supportgroup.name == undefined || !supportgroup.name.match(TEXT_VALIDATOR_REGEX))
			{
				  GlobalModule_notificationService.notification("error","Please enter valid Support Group Name");
				  $(".loader").fadeOut("slow");
				  return;
			}
			if(supportgroup.supportGroup == undefined || supportgroup.supportGroup.id == undefined || supportgroup.supportGroup.id == 0)
			{
				GlobalModule_notificationService.notification("error","Please select Support Group");
				$(".loader").fadeOut("slow");
				return;
			}
			if(!supportgroup.allDayShift&&(supportgroup.offlineHoursMessage == undefined || !supportgroup.offlineHoursMessage.match(TEXT_VALIDATOR_REGEX)))
			{
				GlobalModule_notificationService.notification("error","Please enter valid Offline Hours Text");
				$(".loader").fadeOut("slow");
				return;
			}
			delete supportgroup.workingHoursStart;
			delete supportgroup.workingHoursEnd;
			supportgroup.workingHoursStartString = $('#datetimepicker_strt').data('date') 
			supportgroup.workingHoursEndString = $('#datetimepicker_end').data('date') 
			
			SubSupportGroupService.insertSubSupportGroup(supportgroup).then(function(response){
				
				var saveStatus=response.data;
				
				if(saveStatus == "duplicateName")
				{
					GlobalModule_notificationService.notification("error","Sub Support Group already exists");
					$(".loader").fadeOut("slow");
				}
				else if(saveStatus == "success")
				{
					$('#add_edit_sub_support_group').modal('hide');
					if($scope.subSupportGroup.id == undefined || $scope.subSupportGroup.id == 0)
					{
						GlobalModule_notificationService.notification("success","Sub Support Group has been added successfully");
					}
					else if($scope.subSupportGroup.id != 0)
					{
						GlobalModule_notificationService.notification("success","Sub Support Group has been updated successfully");
					}					
					$(".loader").fadeOut("slow");
					$scope.fetchListingSubSupportGroupList(0,10,null,null,null);
					$scope.fetchSubSupportGroupListCount(null);
 				}
 
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		};
		
		$scope.check = function()
		  {				  
			  if($scope.checkedSubSupportGroupIds.length == 0)
			  {
				  GlobalModule_notificationService.notification("error","Please select any record");
			  }
			  else
			  {				  
				  $('#deletelist').modal('show');
			  }			  
		  };
});