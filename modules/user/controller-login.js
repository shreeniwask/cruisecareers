'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Login_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','UserJobFair_Service','Userwalkin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,UserJobFair_Service,Userwalkin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	GlobalModule_dataStoreService.storeData('LoginModule','loginfrom',undefined);
	window.scrollTo(0, 0);
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	$scope.positionList;
	$scope.activeJobfairCount=0;
	$scope.activeWalkinCount=0;

	$scope.myInterval = 5000;
	  $scope.noWrapSlides = false;
	  
	  $scope.fetchchaturl = function(){
			 Login_Service.fetchchaturl().then(function(response){
				 $scope.ChatUrl = response.data;			
				 });	 
		 };
		 $scope.fetchchaturl();
	  
	  if($scope.userdetails == undefined){
			$scope.url = $scope.ChatUrl+'#/0/2/guest/0';
		}else{
			$scope.url = $scope.ChatUrl+'#/'+$scope.userdetails.id+'/'+$scope.userdetails.roleId+'/'+$scope.userdetails.firstName+'/'+0;
		}
		
		if(document.getElementById('chat_iframe') != null){
			document.getElementById('chat_iframe').src = $scope.url;
		}
	
	  $scope.brandsList = function(){		  
		  Login_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;		  
		  },function(response){				
			});
	  };
	  
	  $scope.brandsList();
	
	  $scope.fetchHomeImagesList = function(){
		  
		  Login_Service.fetchHomeImagesList().then(function(response){
			  $scope.homeImagesList = response.data;
		  
		  },function(response){
				
			});
	  };
	  $scope.fetchHomeImagesList();
	  
	  $scope.testimonialsList=[];
	  $scope.fetchTestimonialsList = function(){
		  
		  Login_Service.fetchTestimonialsList().then(function(response){
			  $scope.testimonialsList = response.data;
			  
			  //console.log($scope.testimonialsList);
			  for(var i=0;i<$scope.testimonialsList.length;i++){
				  if($scope.testimonialsList[i].type == "Video"){  
					  $scope.testimonialsList[i].path = $sce.trustAsResourceUrl($scope.testimonialsList[i].path);
				  }
			  }

			 $scope.readDetailsOfTestimonials($scope.testimonialsList[0].id);

		  },function(response){
			  
			});
	  };
	  $scope.fetchTestimonialsList();
	 
	  $scope.goToTestimonials = function(){
		  $state.go("testimonials");
			 $scope.readDetailsOfTestimonials($scope.testimonialsList[0].id);

	  };
	 
	  	$scope.readDetailsOfTestimonials = function(id){
		  
		  Login_Service.readDetailsOfTestimonials(id).then(function(response){
			  $rootScope.testimonialsDetails = response.data;
			  //console.log($rootScope.testimonialsDetails);
			  if($rootScope.testimonialsDetails.type == "Video"){
				  $rootScope.urlVideo = $sce.trustAsResourceUrl($rootScope.testimonialsDetails.path);
			  }
			 
		  },function(response){
				
			});
	  };
	  
	  
	  $scope.fetchCategoryList = function(){
		  
		  Login_Service.fetchCategoryList().then(function(response){
			  $scope.categoryList = response.data;
		  },function(response){
				
			});
	  };
	  $scope.fetchCategoryList();
	  
	  $scope.fetchPositionList = function(){
		  if($scope.jobTyped==''){
				return;
			}
		  Login_Service.fetchPositionList($scope.jobTyped).then(function(response){
			  $scope.positionList = response.data;
		  },function(response){
				
			});
	  };
	  
	  
	  $scope.insertRecentSearch = function(positionid,jobtyped){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  $scope.recent = {};
		  $scope.recent.positionId = positionid;
		  $scope.recent.typedValue = jobtyped;
		  $scope.recent.id = userid;
		  Login_Service.insertRecentSearch($scope.recent).then(function(response){
			 
		  },function(response){
				
			});
	  };
	  
	  $scope.fetchSelectedJobCallback = function(){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  $scope.insertRecentSearch($scope.selectedJobId,$scope.jobTyped);
		  $state.go("job_results",{categoryId: $scope.selectedJobId,flag: 'position'});
	  };
	  
	  $scope.fetchJobResult = function(id,flag){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  
		  $scope.insertRecentSearch(id,$scope.jobTyped);
		
		  Login_Service.fetchJobResult(id,flag,userid).then(function(response){
			  $scope.jobResult = response.data;
			  GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobResult);
			  $state.go("job_result");
		  },function(response){
				
			});
	  };
	  
	  $scope.fetchHotJobs = function(){
		  
		  Login_Service.fetchHotJobs().then(function(response){
			  $scope.hotJobs = response.data;
		  },function(response){
				
			});
	  };
	
	  $scope.fetchHotJobs();
	  
	  $scope.fetchJobSearchResult = function(job){
		  var userid;
		  if($rootScope.userdetails == undefined){
			   userid = 0;
		  }else{ userid = $rootScope.userdetails.id;}
		  $state.go("job_result",{search: job});
	  };
	  
	  //for job fair banner images
	  
	  
	  $scope.fetchJobFairImageListForLandingPage = function(){
		  $(".loader").show();
	      var walkinflag=false;
		  UserJobFair_Service.fetchJobFairImageListForLandingPage(walkinflag).then(function(response){
			  $scope.jobfairimagelistadmin = response.data;
			  
			//  console.log($scope.jobfairimagelistadmin);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  
	  /*$scope.fetchJobFairJobListForUser = function(search){
		  $(".loader").show();
	
		  UserJobFair_Service.fetchJobFairJobListForUser(search,0).then(function(response){
			  $scope.jobfairjobObj = response.data;
			 
			 // console.log($scope.jobfairjobObj);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };*/
	  
	  $scope.fetchJobFairJobListForUserforlandingpage = function(search){
		  $(".loader").show();
	
		  var walkinflag=false;
		  UserJobFair_Service.fetchJobFairJobListForUserforlandingpage(search,0,walkinflag).then(function(response){
			  $scope.jobfairjobObjs = response.data;
			 //console.log($scope.jobfairjobObjs);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  //$scope.fetchJobFairJobListForUser(null);
	  $scope.dateformate2 = function(date){		     
	        var dateOut = moment(date).format("DD MMM, YYYY");
	        return dateOut;
	  };
	  
	  $scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        return dateOut;
	  };
	  
	  $scope.redirectToJobfair=function(){
		  
			  var userid;
			  if($rootScope.userdetails == undefined){
				   userid = 0;
			 
			
			  UserJobFair_Service.fetchJobFairJobListForUser(search,userid).then(function(response){
				 var jobfairjobObj1 = response.data;
				//  GlobalModule_dataStoreService.storeData('LoginModule','jobResult',$scope.jobResult);
				  $state.go("restricted.user_job_fair");
			  
			  },function(response){
					
				});
			  } 
	  };
	  
	  
	  //for walkins
	  
	  
	  $scope.fetchWalkinJobListForUserforlandingpage = function(search){
		  $(".loader").show();
	
		  var walkinflag=true;
		  Userwalkin_Service.fetchWalkinJobListForUserforlandingpage(search,0,walkinflag).then(function(response){
			  $scope.jobfairjobObj = response.data;
			 
			 //console.log($scope.jobfairjobObj);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  //$scope.fetchJobFairJobListForUser(null);
	  
	  $scope.fetchWalkinImageListForLandingPage = function(){
		  $(".loader").show();
	      var walkinflag=true;
	      Userwalkin_Service.fetchWalkinImageListForLandingPage(walkinflag).then(function(response){
			  $scope.Walkinimagelistadmin = response.data;
			  
			//  console.log($scope.jobfairimagelistadmin);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	
	  
	// end of walkins
	  
	  $scope.getActiveJobfairCount=function(){
			 
		  var walkinflag=false;
			 UserJobFair_Service.getActiveJobfairCount(walkinflag).then(function(response){
									
			$scope.activeJobfairCount1 = response.data;
			
			$scope.activeJobfairCount=$scope.activeJobfairCount1;
			console.log("jofaise"+$scope.activeJobfairCount)
			if($scope.activeJobfairCount !=0)
			{
				
				$scope.fetchJobFairJobListForUserforlandingpage(null);
				$scope.fetchJobFairImageListForLandingPage();
			}
			//console.log($scope.activeJobfairCount);
		
			},function(response){
										
			$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getActiveJobfairCount();
	  
		
		
		$scope.getActiveWalkinCount=function(){
			 
			var walkinflag=true;
			Userwalkin_Service.getActiveWalkinCount(walkinflag).then(function(response){
									
			$scope.activewalkinCount1 = response.data;
			
			$scope.activeWalkinCount=$scope.activewalkinCount1;
			console.log("walkins"+$scope.activeWalkinCount)
			if(	$scope.activeWalkinCount !=0)
			{
				
				$scope.fetchWalkinJobListForUserforlandingpage(null);
				$scope.fetchWalkinImageListForLandingPage();
			}
			//console.log($scope.activeJobfairCount);
		
			},function(response){
										
			$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getActiveWalkinCount();
	  
		
		$scope.redirectPage = function(checkpage){
			
			if(checkpage == "register"){
				$state.go("register");
				GlobalModule_dataStoreService.storeData('LoginModule','loginfrom','loginfromjobfair');
			}
			else if(checkpage == "login"){
				$state.go("login");
				GlobalModule_dataStoreService.storeData('LoginModule','loginfrom','loginfromjobfair');
			}
		};
		
		$scope.redirectPageWalkins = function(checkpage){
			
			if(checkpage == "register"){
				$state.go("register");
				GlobalModule_dataStoreService.storeData('LoginModule','loginfrom','loginfromwalkins');
			}
			else if(checkpage == "login"){
				$state.go("login");
				GlobalModule_dataStoreService.storeData('LoginModule','loginfrom','loginfromwalkins');
			}
		};
		
		
		
	  
	  
}]);