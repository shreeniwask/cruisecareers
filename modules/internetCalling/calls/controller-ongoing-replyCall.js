var controllers=angular.module("LoginModule")

controllers.controller('MissedCallReplyController',function($scope,$rootScope,CallLogService,GlobalModule_dataStoreService,$stateParams,GlobalModule_notificationService,$state){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
 	$scope.callFor=GlobalModule_dataStoreService.loadData('LoginModule','callFor');
 	$('.modal-backdrop').removeClass("modal-backdrop");  
	callLogId=$stateParams.callId;
	videoInput = document.getElementById('videoInput');
	videoOutput = document.getElementById('videoOutput');

	$scope.callEndNotification=function(){
		GlobalModule_notificationService.notification("success","Communication ended by candidate");
	}
	$scope.gobackToListing=function(){
		stop();
		$state.go("restricted.admin.call_log");
	}
	register($stateParams.userId,$rootScope.userdetails.id,$stateParams.callId,($stateParams.callType=='true'),false);
	//call($stateParams.callId)
	
	CallLogService.checkIfCallClosed($stateParams.callId).then(function(response){
		callTerminated=response.data;
		if(response.data){
			GlobalModule_notificationService.notification("error","Call has been terminated");
			$state.go("restricted.admin.call_log");
			stop();
		}else{
			
		}
		$(".loader").fadeOut("slow");
	},function(response){
		$(".loader").fadeOut("slow");
	}); 
	
	$('.user-profile').click(function() {
		$('.user-profile').hide();
		$('.user-data').fadeIn( 1000, function() {   
			$(this).show();
		});
		$('.cross').fadeIn( 1000, function() {   
			$(this).show();
		});
	});
	$('.cross').click(function() {
		$('.user-profile').show();
		$('.user-data').fadeOut( 1000, function() {   
			$(this).hide();
		});
		$('.cross').fadeOut( 1000, function() {   
			$(this).hide();
		});
	});
	
	$scope.fetchUserProfile = function(){
		$(".loader").show();
		CallLogService.fetchUserProfile($stateParams.userId).then(function(response){
			$scope.profile = response.data;
			//console.log($scope.profile);
			//call($stateParams.callId);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};	
	$scope.fetchUserProfile();

	$scope.fetchWorkExperience= function(){

		$(".loader").show();
		CallLogService.fetchWorkExperience($stateParams.userId).then(function(response){
			$scope.workExperience = response.data;
			call($stateParams.callId);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};

	$scope.fetchCommunicationNotes = function(){
		$(".loader").show();
		CallLogService.fetchCommunicationNotes($stateParams.userId).then(function(response){
			$scope.communicationNotes = response.data;
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};
	$scope.fetchCommunicationNotes();// TODO Auto-generated method stub
	//save communication notes
	$scope.saveCommunicationNotes = function(){
		$(".loader").show();
		$scope.communicationNote.userid=$rootScope.userdetails.id;
		$scope.communicationNote.userCallId=$stateParams.callId;
		CallLogService.saveCommunicationNotes($scope.communicationNote).then(function(response){
			$scope.communicationNotes.push($scope.communicationNote);
			$scope.fetchCommunicationNotes();
			$scope.communicationNote={};
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};	
	$scope.showCommunicationNotes =function(notesId){
		$('#notes'+notesId).modal({backdrop: 'static', keyboard: false});
		$('#notes'+notesId).draggable({
			handle: ".modal-header"
		});
		$('.modal-content').resizable({
			//alsoResize: ".modal-dialog",
			//minHeight: 150
		});
		$('.modal-backdrop').removeClass("modal-backdrop");    
	}

	$scope.fetchAppliedJobsByUser= function(){

		$(".loader").show();

		CallLogService.fetchAppliedJobsByUser($stateParams.userId).then(function(response){

			$scope.appliedJobs = response.data;

			//console.log($scope.appliedJobs);

			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");

		});
	};
	$scope.fetchAppliedJobsByUser();


	$scope.dateformate = function(date){	

		if(date == undefined || date == '')
		{
			return null;
		}

		var dateOut = moment(date).format("DD-MM-YYYY");
		return dateOut;
	};
	var channel = pusher.subscribe('my-channel-call-'+$stateParams.callId);
	channel.bind('call-closed', function(data) {
		$scope.$apply(function () {
			GlobalModule_notificationService.notification("error","Call declined by user");
		});
	});

});