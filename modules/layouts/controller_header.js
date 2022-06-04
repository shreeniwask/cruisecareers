'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Header_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','GlobalModule_User_activityService','APP_CONSTANTS','$websocket', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,GlobalModule_User_activityService,APP_CONSTANTS,$websocket){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');

	$scope.fetchUnseenNotifications=function()
	{
		$(".loader").show();

		var flag='Unseen';

		Login_Service.fetchUnseenNotifications($rootScope.userdetails.id,flag).then(function(response){

			$scope.unSeenNotifications=response.data;

		},function(response){

			$(".loader").fadeOut("slow");

		});

		$(".loader").fadeOut("slow");
	};

	$scope.fetchUnseenNotifications();

	$scope.seeAllNotifications= function(){

		$(".loader").show();

		$scope.unSeenNotifications=[];
		//$("#notification-dropdown-list").dropdown("toggle");	
		$state.go("restricted.admin.my_notification");
	};
	$scope.fetchCallNotifications=function(){

		var callSourceId=1;
		Login_Service.fetchCallNotifications(callSourceId).then(function(response){

			$scope.callNotications=response.data;
			if($scope.callNotications.length>0){
				//notifyMe('','','Incoming Call from '+$scope.callNotications.firstname);
			}


		},function(response){

			$(".loader").fadeOut("slow");

		});
	}
	$scope.fetchCallNotifications();

	$scope.initiateCommunication=function(callLog){ 
		
		var callFor=1;
		
		GlobalModule_dataStoreService.storeData('LoginModule','callFor',callFor);
		if(callLog.communicationOption.id==1){
			$state.go("restricted.admin.ongoing_call",{callId: callLog.id,userId: callLog.userid,callType: true});
		}else if(callLog.communicationOption.id==2){
			$state.go("restricted.admin.ongoing_call",{callId: callLog.id,userId: callLog.userid,callType: false});
		}
		
	}

//	var ws_call_notifications = $websocket.$new(internetCallingURL+"incoming_call_notifications");

//	ws_call_notifications.$on('$open', function () {
//	console.log('The ngWebsocket has open!'); // It will print after 5 (or more) seconds
//	});

//	ws_call_notifications.$on('$message', function (message) {
//	$scope.fetchCallNotifications();
//	$('#call_master_tab').click();
//	});
	if($rootScope.userdetails.roleId != 2 && $rootScope.userdetails.roleId != 3){
		try{
			var channel = pusher.subscribe('my-channel-call');
			channel.bind('incoming-call', function(data) {
				$scope.$apply(function () {
					if(data.message&&data.message.communicationOption){
						notifyMe('','',data.message.communicationOption.name+" from "+data.message.user.firstName);
					}
					$scope.fetchCallNotifications();
					
				});
				$('#call_master_tab').click();
			});
		}catch(err) {
			console.log(err);
		}
		
	}
	$scope.incomingCall;
	if($rootScope.userdetails.roleId == 2 || $rootScope.userdetails.roleId == 3){
		try{
			var channel = pusher.subscribe('my-channel-'+$rootScope.userdetails.id);
			channel.bind('incoming-call', function(data) {
				$scope.$apply(function () {
					if(data.message){
						$scope.incomingCall=data.message;
						$('#call_confirmation').modal();
						//
						notifyMe('','',"Incoming Call from SUpport");
					}
					
				});
			});
		}catch(err) {
			console.log(err);
		}
		
	}

	$scope.acceptCall=function(){
		$('#call_confirmation').modal('hide');
		$state.go("restricted.call_reply",{callId: $scope.incomingCall.userCallId,callType: false});
	}
	
	$scope.declineCall=function(){
		 $('#call_confirmation').modal('hide');
		Login_Service.closeTicket($scope.incomingCall.userCallId).then(function(response){

		},function(response){

			$(".loader").fadeOut("slow");

		});
	}
	
	
	$scope.fetchCandidateCallNotifications=function(){

		var callSourceId=2;
		Login_Service.fetchCallNotifications(callSourceId).then(function(response){

			$scope.candidateCallNotification=response.data;
			if($scope.candidateCallNotification.length>0){
				//notifyMe('','','Incoming Call from '+$scope.callNotications.firstname);
			}


		},function(response){

			$(".loader").fadeOut("slow");

		});
	}
	$scope.fetchCandidateCallNotifications();

}]);