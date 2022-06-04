var controllers = angular.module('LoginModule');

controllers.controller('Interview_Initiate_Ctrl',['$scope','$state','$rootScope','CallLogService','GlobalModule_dataStoreService','$stateParams','SupportOptionsService','UserJobFair_Service','GlobalModule_notificationService','$websocket', function ($scope,$state,$rootScope,CallLogService,GlobalModule_dataStoreService,$stateParams,SupportOptionsService,UserJobFair_Service,GlobalModule_notificationService,$websocket)
{
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.jobFair= GlobalModule_dataStoreService.loadData('LoginModule','jobFairObj');
	$scope.eventId= GlobalModule_dataStoreService.loadData('LoginModule','eventId');
	$scope.slotId= GlobalModule_dataStoreService.loadData('LoginModule','slotId');
	$scope.statusflag= GlobalModule_dataStoreService.loadData('LoginModule','statusflag');
	
	
	//$scope.inteviewOverFlag=GlobalModule_dataStoreService.loadData('LoginModule','inteviewOverFlag');

	$scope.flag=false;
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
		
		
		$scope.fetchStartInterviewDetails= function()
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
		if($scope.statusflag=="true"){
			$scope.fetchStartInterviewDetails();
		}
//		fetchStartInterviewDetails();
		
		
		var wsi;
		$scope.showConnectMsg=false;
		$scope.pushNotification=function(){
			$(".loader").show();
		
			
			 CallLogService.fetchVideoCallCount($scope.slotId,$rootScope.userdetails.id).then(function(response){
				  $scope.vcdatacount = response.data;
				  
				  console.log($scope.vcdatacount);
				
				 
				
			if($scope.vcdatacount==0){
			var usercallDetails={};
				usercallDetails.subSupportGroup={};
			usercallDetails.subSupportGroup.id=parseInt(4);
			usercallDetails.communicationOption={}
			usercallDetails.communicationOption.id=1;
			usercallDetails.userid=$rootScope.userdetails.id;
			usercallDetails.callSourceId=2;
			//usercallDetails.jobFairId=$scope.jobFair.id;
			usercallDetails.eventid=$scope.eventId;
			usercallDetails.slotid=$scope.slotId;
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
					 console.log("------------------push data-------------------------------");
					channel.bind('user-registered', function(data) {
						  window.alert("hiiiiiii!");
						  console.log("hiiiiiii!");
						//console.log(JSON.stringify(data));
						 $scope.$apply(function () {
							  window.alert("hi!");
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
			
	
			},function(response){
				$(".loader").fadeOut("slow");
			});
		
			}else{
				$scope.requestForStartFlag=true;	
				 $scope.startFlag=true;
				 $scope.fetchVideoCallData($scope.slotId,$rootScope.userdetails.id);
				}
			  $(".loader").fadeOut("slow");
				
			  },function(response){
					$(".loader").fadeOut("slow");
					});
			
		}
		 
			$scope.pushNotification();
		
			
			
			
			
			  var channel = pusher.subscribe('my-channel-interviews');
			  console.log("------------------data get-------------------------------");
				channel.bind('link-send', function(data) {
					// window.alert("close!");
					 $scope.$apply(function () {
						 console.log(data);
					//	 $scope.callDetailId=data.message.callid;
						 $scope.slotDetailId=data.message.slotid
						 $scope.userIdDetail=data.message.userid
						 console.log($scope.slotDetailId);
						 
						 $scope.fetchVideoCallData($scope.slotDetailId,$scope.userIdDetail);
						// $('#call_master_tab').click();
				     });
					
				});  
			
				
			
				$scope.fetchVideoCallData = function(slotDetailId,userIdDetail){
					  $(".loader").show();
				
					  CallLogService.fetchVideoCallData(slotDetailId,userIdDetail).then(function(response){
						  $scope.vcdata = response.data;
						  $scope.flag=true;
						  console.log($scope.vcdata);
						
						 
						  $(".loader").fadeOut("slow");
					},function(response){
						$(".loader").fadeOut("slow");
						});
				  };
				 // $scope.fetchVideoCallData(0);
	
					$scope.startInterview = function(url){
						
						// var urls = $state.href(url);
						 window.open(url,'_blank');
					//	window.location.href = url
						
					};
					
					
		$scope.formatDate = function(date){
			  var dateOut = moment(date).format("DD-MM-YYYY");
		      return dateOut;
	    };
	    
	    $scope.dateformate = function(date){
	         var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	         return dateOut;
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