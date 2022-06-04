var controllers=angular.module("LoginModule")

controllers.controller('CreateSubSupportGroupController',function($scope,SubSupportGroupService,SupportGroupService,$state,GlobalModule_notificationService){
	$scope.subSupportGroup={};
	$scope.offset=0;
	$scope.limit=10;
	$scope.subSupportGroupList=[];
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
		SubSupportGroupService.insertSubSupportGroup($scope.subSupportGroup).then(function(response){
			$(".loader").fadeOut("slow");
			$state.go("restricted.admin.listsubsupportgroup");
			 GlobalModule_notificationService.notification("success","Your Sub Support Group has been added successfully");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	


});

