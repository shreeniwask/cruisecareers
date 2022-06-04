var controllers=angular.module("LoginModule")

controllers.controller('CallForInterviewCntrl',function($state,$scope,$rootScope,CallLogService,GlobalModule_dataStoreService,$stateParams,GlobalModule_notificationService){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log(($stateParams.callType=='true'));
	register($rootScope.userdetails.id,null,$stateParams.callId,($stateParams.callType=='true'),false);
	videoInput = document.getElementById('videoInput');
	videoOutput = document.getElementById('videoOutput');
	
	
	$scope.callEndNotification=function(){
		//GlobalModule_notificationService.notification("success","Communication ended by support agent");
		//$state.go("restricted.support_feedback",{callId: $stateParams.callId});
		
	}
	$scope.call=function(){
		call($stateParams.callId);
	}
	$scope.callEnded=function(){
		
		setTimeout(function(){
			$state.go("restricted.user_job_fair");
		},500);
	
	}
});