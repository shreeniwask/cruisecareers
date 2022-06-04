var controllers=angular.module("LoginModule")

controllers.controller('EditSupportGroupController',function($scope,$rootScope,SupportGroupService,$stateParams,RegionService,$state,GlobalModule_notificationService){
	$scope.fetchSupportGroupById=function(){
		$(".loader").show();

		SupportGroupService.fetchSupportGroupById($stateParams.supportGroupId).then(function(response){

			$(".loader").fadeOut("slow");
			$scope.supportGroup=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchSupportGroupById();
	$scope.fetchRegionList=function(){
		$(".loader").show();

		RegionService.fetchRegionList().then(function(response){
			$scope.regionList=response.data;
			console.log($scope.RegionList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchRegionList();
	$scope.saveSupportGroupName=function(){
		SupportGroupService.updateSupportGroup($scope.supportGroup).then(function(response){
			$(".loader").fadeOut("slow");
			$state.go("restricted.admin.supportgrouplist");
			GlobalModule_notificationService.notification("success","Your  Support Group has been updated successfully");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	
});



