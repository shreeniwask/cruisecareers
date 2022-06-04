var controllers=angular.module("LoginModule")

controllers.controller('RegionController',function($scope,RegionService,SupportOptionsService,$rootScope,$location,GlobalModule_dataStoreService,$state){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	$scope.regionList=[];
	$scope.supportGroupList=[];
	$scope.subSupportGroupList=[];
	$scope.attachments=[];
	var audioFile;
	var audioFileName;
	$scope.files;
	$scope.offline=false;
	$scope.recorded=false;

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
	$scope.fetchSupportGroupList=function(){
		$(".loader").show();

		RegionService.fetchSupportGroupList($scope.regionId).then(function(response){
			$scope.supportGroupList=response.data;
			//console.log($scope.tasksList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchRegionList();

	$scope.fetchSubSupportGroupList=function(){
		$(".loader").show();
		$scope.subSupportGroup=null;
		RegionService.fetchSubSupportGroupList($scope.supportGroupId).then(function(response){
			$scope.subSupportGroupList=response.data;
			//console.log($scope.tasksList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}

	$scope.showCommunicationOptions=function(){
		
		$scope.communicationOption=!$scope.communicationOption;
	}
	
	$scope.checkIfOfflineHours=function(){
		$scope.offline=false;
		var currentTime= new Date();    // e.g. 11:00 pm
		var startTime = convertToDate($scope.subSupportGroup.workingHoursStart);
		var endTime = convertToDate($scope.subSupportGroup.workingHoursEnd);
		$scope.offline=currentTime<startTime||currentTime>endTime
	}
	$scope.selectCommunicationOption=function(communicationOptionId){
		$(".loader").show();
		var usercallDetails={};
		usercallDetails.subSupportGroup={};
		usercallDetails.subSupportGroup.id=parseInt($scope.subSupportGroup.id);
		usercallDetails.communicationOption={}
		usercallDetails.communicationOption.id=communicationOptionId;
		usercallDetails.userid=$rootScope.userdetails.id;
		usercallDetails.callSourceId=1;
		usercallDetails.jobFairId=0;
		
		SupportOptionsService.insertCommunicationOptionSelectionDetails(null,usercallDetails).then(function(response){
			usercallDetails=response.data;
			$(".loader").fadeOut("slow");
			var video=false;
			if(communicationOptionId==1){
				video=true
			}
			$state.go("restricted.call",{callId: usercallDetails.id,callType: video});
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.sendMessage=function(communicationOptionId,message){
		$(".loader").show();
		var usercallDetails={};
		usercallDetails.subSupportGroup={};
		usercallDetails.subSupportGroup.id=parseInt($scope.subSupportGroup.id);
		usercallDetails.communicationOption={}
		usercallDetails.communicationOption.id=communicationOptionId;
		usercallDetails.textMessage=message;
		usercallDetails.callSourceId=1;
		usercallDetails.userid=$rootScope.userdetails.id;
		SupportOptionsService.insertCommunicationOptionSelectionDetails($('#attachments')[0].files,usercallDetails).then(function(response){
			usercallDetails=response.data;
			$(".loader").fadeOut("slow");
			$state.go("restricted.ticket_submitted");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.sendVoiceMessage=function(communicationOptionId){
		$(".loader").show();
		var usercallDetails={};
		usercallDetails.subSupportGroup={};
		usercallDetails.subSupportGroup.id=parseInt($scope.subSupportGroup.id);
		usercallDetails.communicationOption={}
		usercallDetails.communicationOption.id=communicationOptionId;
		usercallDetails.userid=$rootScope.userdetails.id;
		usercallDetails.callSourceId=1;
		SupportOptionsService.insertCommunicationOptionSelectionDetails($scope.files,usercallDetails,audioFile,audioFileName).then(function(response){
			usercallDetails=response.data;
			$(".loader").fadeOut("slow");
			$state.go("restricted.ticket_submitted");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	var recorder;
	$scope.recordAudio = function(check){
		//alert(index);
		//$scope.voiceQuestionIndex=index;
		if(check){
			$('#button_play').attr('disabled','disabled');
			$('#button_stop').removeAttr('disabled');

			requestAideo();
			//startRecording();
		}else{
			$('#button_stop').attr('disabled','disabled');
			$('#button_play').removeAttr('disabled');
			stopRecording();
		}
	};



	function requestAideo() {

		navigator.mediaDevices.getUserMedia({

			audio: true
		}).then(function(stm)  {
			stream = stm;
			recorder = new MediaRecorder(stream);
			recorder.start();
			// audioVoice.src = URL.createObjectURL(stream);
		});

	}

	function stopRecording() {
		//$scope.audioRecorded=true;
		recorder.ondataavailable = function(e) {
			$scope.audioRecorded=true;

			var audioName = ['audio_', (new Date() + '').slice(4, 28), '.ogg'].join('');
			//console.log($scope.voiceQuestionIndex);

			var audioVoice= document.getElementById('voice-respnce');
			audioVoice.src  = URL.createObjectURL(e.data);
			console.log(e.data);
			audioFile=e.data;
			audioFileName=audioName;
			//$scope.uploadaudio(e.data,audioName);


		};

		recorder.stop();
		$scope.recorded=true;
		$('#button_stop').show()


	}
	$scope.enableFileEvent=function(){
		$scope.attachments=[]
		$("#attachments").on('change', function() {
			if (this.files.length >= 1) {
			$.each(this.files, function(i, file) {
				$scope.$apply(function(){
					$scope.attachments.push(file);
				})
				
		        })
				
			}
		        
			
		});
	}
	
	function convertToDate(time){
		 
		var date = new Date();
		 
		var strs = time.split(":");
		 if(time.includes("PM")&&!strs[0].includes("12")){
			 date.setHours(Number(strs[0])+12);
		 }else{
			 date.setHours(strs[0]);
		 }
		
		date.setMinutes(strs[1]);
		date.setSeconds(strs[2].replace("AM", "").replace("PM", ""));
		 
		return date;
	}
	
	
});
