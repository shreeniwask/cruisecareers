var controllers=angular.module("LoginModule")

controllers.controller('EditSubSupportGroupController',function($scope,$rootScope,SubSupportGroupService,$stateParams,SupportGroupService,$state,GlobalModule_notificationService){
	$scope.fetchSubSupportGroupById=function(){
		$(".loader").show();

		SubSupportGroupService.fetchSubSupportGroupById($stateParams.subSupportGroupId).then(function(response){

			$(".loader").fadeOut("slow");
			$scope.subSupportGroup=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchSubSupportGroupById();
	$scope.fetchSupportGroupList=function(){
		$(".loader").show();

		SupportGroupService.fetchSupportGroupList().then(function(response){
			$scope.supportGroupList=response.data;
			console.log($scope.supportGroupList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchSupportGroupList();
	$scope.saveSubSupportGroup=function(){
		SubSupportGroupService.updateSubSupportGroup($scope.subSupportGroup).then(function(response){
			$(".loader").fadeOut("slow");
			$state.go("restricted.admin.listsubsupportgroup");
			GlobalModule_notificationService.notification("success","Your Sub Support Group has been updated successfully");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	
});



