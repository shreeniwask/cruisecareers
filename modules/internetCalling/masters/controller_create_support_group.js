var controllers=angular.module("LoginModule")

controllers.controller('CreateSupportGroupController',function($scope,SupportGroupService,RegionService,$state,GlobalModule_notificationService){
	$scope.supportGroup={};
	$scope.offset=0;
	$scope.limit=10;
	$scope.supporGrouptList=[];
	$scope.fetchRegionList = function(){

		$(".loader").show();

		RegionService.fetchRegionList().then(function(response){
			$scope.regionList=response.data;
			//console.log($scope.tasksList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchRegionList();
	$scope.saveSupportGroupName=function(){
		SupportGroupService.createSupportGroup($scope.supportGroup).then(function(response){
			$(".loader").fadeOut("slow");
			$state.go("restricted.admin.supportgrouplist");
			 GlobalModule_notificationService.notification("success","Your  Support Group has been added successfully");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	


});


		

	
