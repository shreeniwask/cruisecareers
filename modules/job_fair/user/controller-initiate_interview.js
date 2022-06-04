var controllers = angular.module('LoginModule');

controllers.controller('InitiateInterviewController',['$scope','$state','$rootScope','CallLogService','GlobalModule_dataStoreService','$stateParams','SupportOptionsService','UserJobFair_Service','GlobalModule_notificationService','$websocket', function ($scope,$state,$rootScope,CallLogService,GlobalModule_dataStoreService,$stateParams,SupportOptionsService,UserJobFair_Service,GlobalModule_notificationService,$websocket)
{
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.jobFair= GlobalModule_dataStoreService.loadData('LoginModule','jobFairObj');
	$scope.inteviewOverFlag=GlobalModule_dataStoreService.loadData('LoginModule','inteviewOverFlag');

		$scope.regionList=[];
		$scope.supportGroupList=[];
		$scope.subSupportGroupList=[];
		var audioFile;
		var audioFileName;
		$scope.files;
		$scope.callDetail;
 		
		$scope.showSeeAll=true;
		var fetchAppliedJobsByUser= function(){

			$(".loader").show();

			CallLogService.fetchAppliedJobsByUser($rootScope.userdetails.id).then(function(response){

				$scope.appliedJobsOfUser = response.data;
				var appliedJobs= $scope.appliedJobsOfUser;
				$scope.threeAppliedJobs = appliedJobs.splice(0,3);				 
				$scope.appliedJobs=$scope.threeAppliedJobs.concat(appliedJobs);
				
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");

			});
		};
		fetchAppliedJobsByUser();
		var fetchStartInterviewDetails= function()
		{
			$(".loader").show();
			
			//$scope.jobFairId=183;
			UserJobFair_Service.fetchStartInterviewDetails($scope.jobFair.id,$rootScope.userdetails.id).then(function(response){
				$scope.startInterviewDetails=response.data;
				$scope.acivateClass();
				console.log($scope.startInterviewDetails);
				//checkInterviewStartDateTime();
				$(".loader").fadeOut("slow");
				 
			},function(response){
				$(".loader").fadeOut("slow");
			});
		};
		fetchStartInterviewDetails();
		
		
		
		var fetchInterviewCallLogId= function()
		{
			$(".loader").show();
			
 			UserJobFair_Service.fetchInterviewCallLogId($rootScope.userdetails.id,$scope.jobFair.id).then(function(response){
				$scope.callDetail=response.data;
				//console.log($scope.callDetail);
				 
				$(".loader").fadeOut("slow");
				 
			},function(response){
				$(".loader").fadeOut("slow");
			});
 			$(".loader").fadeOut("slow");
		};
		//fetchInterviewCallLogId();
		
		$scope.fetchSelectedUserSlot = function(){
			  $(".loader").show();
		
			  UserJobFair_Service.fetchSelectedUserSlot($rootScope.userdetails.id).then(function(response){
				  $scope.userSelectedSlot = response.data;
				  
				  //console.log($scope.userSelectedSlot);
				 
				  $(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				});
		  };
		  
		  $scope.fetchSelectedUserSlot();
		
		$scope.showCommunicationOptions=function(){
			$scope.communicationOption=!$scope.communicationOption;
		}
		var wsi;
		$scope.showConnectMsg=false;
		$scope.selectCommunicationOption=function(){
			$(".loader").show();
			var usercallDetails={};
 			usercallDetails.subSupportGroup={};
			usercallDetails.subSupportGroup.id=parseInt(4);
			usercallDetails.communicationOption={}
			usercallDetails.communicationOption.id=1;
			usercallDetails.userid=$rootScope.userdetails.id;
			usercallDetails.callSourceId=2;
			usercallDetails.jobFairId=$scope.jobFair.id;
			//console.log(usercallDetails);
			SupportOptionsService.insertCommunicationOptionSelectionDetails(null,usercallDetails).then(function(response){
				usercallDetails=response.data;
				$scope.userCallDetailsId=usercallDetails.id;
				
				if(usercallDetails != undefined)
				{
					$scope.requestForStartFlag=true;
				}
 				
				try
				{
					var channel = pusher.subscribe('my-channel-'+usercallDetails.id);
					channel.bind('user-registered', function(data) {
						//console.log(JSON.stringify(data));
						 $scope.$apply(function () {
							 $scope.callDetail=data.message;
							 if($scope.callDetail != undefined)
							 {
								 $scope.requestForStartFlag=false;
								 $scope.startFlag=true;
	 						 }
					     });
						
					});				
				}catch(err) {
					console.log(err);
				}
				
				$(".loader").fadeOut("slow");
				/*var video=false;
				if(communicationOptionId==1){
					video=true
				}*/
				//$state.go("restricted.call",{callId: $scope.userCallDetailsId,callType: video});
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		}
		 
			$scope.selectCommunicationOption();
		
		
		$scope.generateInterview = function(){
			
			CallLogService.generateInterview($scope.jobFair.id,$rootScope.userdetails.id,$scope.callDetail.id).then(function(response){
				 $scope.generateInterviewId =response.data;
				 
				 $scope.joinInterview();
				 
			 },function(response){
		  });
		};
		
		$scope.joinInterview=function(){
			var video=true;
			$state.go("restricted.callforinterview",{callId: $scope.callDetail.userCallId,callType: video});
		};
		
		$scope.formatDate = function(date){
			  var dateOut = moment(date).format("DD-MM-YYYY");
		      return dateOut;
	    };
	    
	    $scope.dateformate = function(date){
	         var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	         return dateOut;
	   };
	    
	    checkDates= function()
	    {
	    	
	    	var todaysDate=$scope.formatDate(new Date());	    	
	    	var d1 = todaysDate.split('-');
			var toDate=new Date(d1[2],parseInt((d1[1]))-1,d1[0]);
			
			var slotDate=$scope.formatDate($scope.startInterviewDetails.event.slots[0].dateTime);
			
			var d2=slotDate.split('-');
			var slDate=new Date(d2[2],(parseInt(d2[1]))-1,d2[0]);
			
			if(toDate.getTime() == slDate.getTime())
			{
				return 1;
			}
			else if(toDate.getTime() > slDate.getTime())
			{
				return 2;
			}
			else
			{
				return 3;
			}			
	    };
	    
	    $scope.closeSlot=false;
	    var checkInterviewStartDateTime= function(){
	    	
	    	//$scope.startInterviewDetails
	    	if($scope.startInterviewDetails.event.slots[0] != undefined && $scope.startInterviewDetails.event.slots.length > 0)
	    	{
	    		
	    		var d1 =new Date($scope.startInterviewDetails.event.slots[0].dateTime);
	    		
	    		d1.setMinutes( d1.getMinutes() + 30 );
	    		//console.log($scope.dateformate(d1));
	    		
	    		if(($scope.dateformate($scope.startInterviewDetails.event.slots[0].dateTime) <= $scope.dateformate(new Date())))
	    		{
	    			$scope.startInterview=true;
	    		}
	    		else
	    		{
	    			$scope.startInterview=false;
	    		}
	    	}
	    	else
	    	{
	    		$scope.closeSlot=true;
	    	}
	    };
	    	   
		  $scope.selectedSlotCount=function(userId){
				
				 UserJobFair_Service.selectedSlotCount($rootScope.userdetails.id,$scope.jobFair.id).then(function(response){
											
				$scope.count = response.data;
				
				if($scope.count == 0)
				{
					$scope.buttonflag=1;
				}else{
					$scope.buttonflag=2;
				}
				 //console.log($scope.count);
				},function(response){
											
				$(".loader").fadeOut("slow");
					
				});		
			};
			//$scope.selectedSlotCount(null);
						
			//delete slot			  
			 $scope.deleteUserSlot = function(){
				 
				 UserJobFair_Service.deleteUserSlot($rootScope.userdetails.id).then(function(response){
				  $scope.deleteSlotFlag = response.data;				   
							  
				if($scope.deleteSlotFlag == 'success')
					{
						 GlobalModule_notificationService.notification("success","Slot cancled successfully");
						 $scope.buttonflag=1;
						 $state.go("restricted.user_job_fair");
						}
						 else
						{
						 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						 }
						 $(".loader").fadeOut("slow");
								 
							 },function(response){
								  $(".loader").fadeOut("slow");
						});
						}; 
		
			$scope.backToJobfair=function(jobFairId)
			{
				$state.go('restricted.user_job_fair');
			};
						
	
		
		$scope.reloadSlick = function() {
			  setTimeout(function() {
				  $('.slider-repeat').slick({
					  infinite: true,
					  slidesToShow: 3,
					  dots: false,
					    prevArrow: false,
					    nextArrow: false
					});
			  });
			};
			
$scope.showHideSeeAll= function() {
			$(".loader").show();
			$scope.showSeeAll=false;
			$(".loader").fadeOut("slow");
		};
		
		/*$scope.$on('$destroy', function() {
			wsi.$close();
			console.log('Child1 is no longer necessary');
		})*/

		$scope.mediaFile=[];
		$scope.acivateClass= function() {
			if($scope.startInterviewDetails.jobFairMedias.length > 0)
			{
				for(var i=0;i<$scope.startInterviewDetails.jobFairMedias.length;i++)
				{	
					if(i==0)
					{
						$("#mediaFile"+$scope.startInterviewDetails.jobFairMedias[0].id).addClass("class", "active");
					}
					else
					{
						$scope.mediaFile.push($scope.startInterviewDetails.jobFairMedias[i]);
						$("#mediaFile"+$scope.startInterviewDetails.jobFairMedias[i].id).addClass("class", "");
					}
				}
			}
			
		};
}]);