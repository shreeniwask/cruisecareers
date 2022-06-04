var controllers=angular.module("LoginModule")

controllers.controller('CallController',function($state,$scope,$rootScope,CallLogService,GlobalModule_dataStoreService,$stateParams,GlobalModule_notificationService,$websocket,TicketService){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	callId=$stateParams.callId;
	register($rootScope.userdetails.id,null,$stateParams.callId,($stateParams.callType=='true'),true);
	videoInput = document.getElementById('videoInput');
	videoOutput = document.getElementById('videoOutput');
	if($stateParams.callType!='true'){
		videoInput.style.display="none"
	}
//	var wsi = $websocket.$new(
//			internetCallingURL+"notifications/"+$stateParams.callId
//	);
//
//	wsi.$on('$open', function () {
//		console.log('The ngWebsocket has open!'); // It will print after 5 (or more) seconds
//
//	});
//
//	wsi.$on('$message', function (message) {
//		console.log(message)
//
//		//$scope.fetchCallNotifications();
//
//	});
	$scope.$on('$destroy', function() {
		$scope.closeTicket();
		stop();
		console.log('Child1 is no longer necessary');
	})
	
	
	var channel = pusher.subscribe('my-channel-'+$stateParams.callId);
	channel.bind('user-registered', function(data) {
		//console.log(data.message)
		if(data.message.agentId){
			//call($stateParams.callId)
		}
	});
	
	$scope.endCall=function(){
		stop();
		$scope.callEndNotification();
	}
	
	$scope.closeTicket=function(){
		$(".loader").show();
		TicketService.closeTicket(callId).then(function(response){

			//$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};

	$scope.callEndNotification=function(){
		//GlobalModule_notificationService.notification("success","Communication ended by support agent");
		$state.go("restricted.support_feedback",{callId: $stateParams.callId});

	}
});