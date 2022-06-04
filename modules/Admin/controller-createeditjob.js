'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateEditJob_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.postjobeditFlag =  GlobalModule_dataStoreService.loadData('LoginModule','postjobeditFlag');
	 $scope.complist = [];
	 $scope.newassessmentlist = [];
	 $scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
		
		$("#fulldesc").ckeditor();		
		window.scrollTo(0, 0);		
	  
	  $scope.fetchpositonbydipartment = function(id){	
		  Admin_Service.fetchpositonbydipartment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
		  },function(response){				
			});		  
		  };
	  
	if($scope.postjobeditFlag == true){
		$scope.postedJob = GlobalModule_dataStoreService.loadData('LoginModule','postedjob');
		$scope.compliancesListbyPosition=GlobalModule_dataStoreService.loadData('LoginModule','compliancesListbyPosition');
		$scope.fetchpositonbydipartment($scope.postedJob.category.id);
		 $scope.compliancesListbyJob=$scope.postedJob.complianceList;
		 $scope.checkCompl==true;
		 //alert("hi");
		 $scope.newassessmentlist=$scope.postedJob.assessmentList;
	}else{
		$scope.postedJob ={};
		 $scope.postedJob.postedJobEducation =[];
		 $scope.postedJob.postedJobRating = [];
		 $scope.postedJob.postedJobKeywords =[];
		 $scope.postedJob.postedJobExperience = [];
	}
	
	$scope.addPostedjob = function(){
		 $state.go("restricted.admin.createjobs");
		//GlobalModule_dataStoreService.storeData('LoginModule','postjobeditFlag', false);
	};

	  $scope.fetchPersonRoleMappingTypeList = function(){
			
			 Admin_Service.fetchPersonRoleMappingTypeList().then(function(response){
				  $scope.personRoleMappingTypeList = response.data;
			  
			  },function(response){
					
				});
		  };
		  $scope.fetchPersonRoleMappingTypeList();	  
	
	  
		  $scope.experianceList = function(){
			  Admin_Service.experianceList().then(function(response){
				  $scope.experianceList = response.data;	
				  for(var i=0;i<$scope.experianceList.length;i++){
					  $scope.experianceList[i].id = ($scope.experianceList[i].id).toString();
				  }
			  },function(response){
					
				});
		  };
		  
		  $scope.experianceList();
		  
		  $scope.ratingList = function(){
			  Admin_Service.ratingList().then(function(response){
				  $scope.ratingList = response.data;
				  for(var i=0;i<$scope.ratingList.length;i++){
					  $scope.ratingList[i].id = ($scope.ratingList[i].id).toString();
				  }
			  
			  },function(response){
					
				});
		  };
		  $scope.ratingList();	  
		  
	  
	$scope.brandsList = function(){
		  
		  Login_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
		  
		  },function(response){
				
			});
	  };
	    
	  $scope.brandsList();
	  
	  $scope.fetchCategoryList = function(){		  
		  Login_Service.fetchCategoryList().then(function(response){
			  $scope.categoryList = response.data;			
		  },function(response){
				
			});
	  };
	  $scope.fetchCategoryList();
	  
	  $scope.disabled = 0;
	  $scope.saveOrUPdatePostJob = function(job){
		  $scope.disabled = 1;
		  var totle=0.0;
		  var flagTripRating=0,flagEduRating=0,flagkeyRating=0,flagExpRating=0;
		  var points=0;
		  if(job.postedJobRating.length>1 || job.postedJobEducation.length >1 || job.postedJobKeywords.length>1 || job.postedJobExperience.length>1)
			  {
			  GlobalModule_notificationService.notification("error","Type of Person Role mapping Should be unique and their points weightage should be 100 % ");
			  }
		  else{
		  if(job.postedJobRating.length > 0)
			  {
			  flagTripRating=1;
			  }
		  if(job.postedJobEducation.length > 0)
			  {
			  flagEduRating=1;
			  }
		  if(job.postedJobKeywords.length > 0)
			  {
			  flagkeyRating=1;
			  }
		  if(job.postedJobExperience.length > 0)
			  {
			  flagExpRating=1;
			  }
		 
			  if(flagTripRating==1)
				  {
			   points=document.getElementById("points2").value;
			   totle=totle+parseInt(points);
				  }
			  if(flagEduRating==1)
				  {
				  points= document.getElementById("points1").value;
				  totle=totle+parseInt(points);
				  }
			  if(flagkeyRating==1)
				  {
				   points= document.getElementById("points3").value;
				   totle=totle+parseInt(points);
				  }
			  if(flagExpRating==1)
				  {
				 points=document.getElementById("points4").value;
				 totle=totle+parseInt(points);
				  }
		if(totle==100   || (flagTripRating==0 && flagEduRating==0 && flagkeyRating==0 && flagExpRating==0))
			{
		  if($scope.postjobeditFlag == true){
			  $scope.updatePostedJob(job);
		  }else{
			  $scope.savePostJob(job);
		  }
			}
		else 
			GlobalModule_notificationService.notification("error","Type of Person Role mapping Should be unique and their points weightage should be 100 % ");
	  }
	  };
	  
	  $scope.getCheckedId=[];
	  
	  $scope.checkedList=function(id){
		  
		  if($scope.getCheckedId.indexOf(id) !== -1)
		  {		
		  var array  = $scope.getCheckedId;
		  var index = array.indexOf(id);
		  $scope.getCheckedId.splice(index,1);
		  }else
			  {		    	
	      $scope.getCheckedId.push(id);
	     
			  }
	  };
	  
	  $scope.deletefromList = function(formlist){
		  $scope.formlist=formlist;
		  if($scope.getCheckedId.length == 0) 
		  {
			  GlobalModule_notificationService.notification("error","Please select any record");
		  }
		  else
		  {
			  Admin_Service.deleteFromList($scope.formlist,$scope.getCheckedId).then(function(response){
			  $scope.postjobflag = response.data;
			  $scope.getCheckedId=[];
			  $scope.getPostedJobcount(null);
			  $scope.fetchpostedJobList(0,10,null,null,null);
			  if($scope.postjobflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record deleted successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  }
	  };
	  
	  $scope.savePostJob = function(job){
		  if($("#fulldesc").val() == "" || $("#fulldesc").val() == null){
			  GlobalModule_notificationService.notification("success","please add full description");
			  return;
		  }
		  $(".loader").show();
		  $scope.postjob={};$scope.postjob.brand ={};$scope.postjob.position={};
		  $scope.postjob.userid = $rootScope.userdetails.id;
		  $scope.postjob.summery = $("#fulldesc").val();
		  $scope.postjob.shortDescription = job.shortDescription;
		  $scope.postjob.brand.id = job.brand.id;
		  $scope.postjob.position.id = job.position.id;
		  var personmappingarray =[];
		  for(var i=0;i<job.postedJobEducation.length;i++)
		  {
			  personmappingarray.push(job.postedJobEducation[i]);
			};
			 for(var j=0;j<job.postedJobRating.length;j++)
			  {
				  personmappingarray.push(job.postedJobRating[j]);
				};
				for(var j=0;j<job.postedJobKeywords.length;j++)
				  {
					  personmappingarray.push(job.postedJobKeywords[j]);
					};
					for(var j=0;j<job.postedJobExperience.length;j++)
					  {
						  personmappingarray.push(job.postedJobExperience[j]);
						};
		  
						$scope.postjob.jobRoleMappingList = personmappingarray;
						
						$scope.postjob.complianceList= $scope.complist ;
						$scope.postjob.assessmentList= $scope.newassessmentlist;
						
		  Admin_Service.savePostJob($scope.postjob).then(function(response){
			  $scope.postjobflag = response.data;	
			   $state.go("restricted.admin.adminpostedjobs");
			  if($scope.postjobflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Your job has been posted successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  
	  
	  $scope.fetchQualifications = function(){
		  
			Profile_Service.fetchQualifications().then(function(response){
				  $scope.qualificationsList = response.data;
				  for(var i=0;i<$scope.qualificationsList.length;i++){
					  $scope.qualificationsList[i].id = ($scope.qualificationsList[i].id).toString();
				  }
			  },function(response){
					
				});
		  };
		
		 $scope.fetchQualifications();
		 
		 //$scope.checkCompl=false;
		  $scope.fetchPostedJobById = function(jobid){
		  $(".loader").show();
		  
		  $scope.compliancesListbyPosition=[];
			  Admin_Service.fetchPostedJobById(jobid).then(function(response){
				  $scope.postedJob = response.data;
				  
				  $scope.postedJob.postedJobEducation =[];
					 $scope.postedJob.postedJobRating = [];
					 $scope.postedJob.postedJobKeywords =[];
					 $scope.postedJob.postedJobExperience = [];
					 $scope.compliancesListbyJob=[];
					 $scope.compliancesListbyJob=$scope.postedJob.complianceList;
					 //if($scope.compliancesListbyPosition!='')
					 //$scope.checkCompl=true;
					// alert($scope.checkCompl);
					 $scope.newassessmentlist=$scope.postedJob.assessmentList;
				  for(var i=0;i<$scope.postedJob.jobRoleMappingList.length;i++){
					
					  if($scope.postedJob.jobRoleMappingList[i].typeid == 1){
						  $scope.postedJob.postedJobEducation.push($scope.postedJob.jobRoleMappingList[i]);
					  }else 
						  if($scope.postedJob.jobRoleMappingList[i].typeid == 2){
						  $scope.postedJob.postedJobRating.push($scope.postedJob.jobRoleMappingList[i]);
					  }else 
						  if($scope.postedJob.jobRoleMappingList[i].typeid == 3){
						  $scope.postedJob.postedJobKeywords.push($scope.postedJob.jobRoleMappingList[i]);
					  }else 
						  if($scope.postedJob.jobRoleMappingList[i].typeid == 4){
						  $scope.postedJob.postedJobExperience.push($scope.postedJob.jobRoleMappingList[i]);
					  }
				  }
				  
				  
					  GlobalModule_dataStoreService.storeData('LoginModule','postjobeditFlag', true);
				  GlobalModule_dataStoreService.storeData('LoginModule','postedjob', $scope.postedJob);
				  $(".loader").fadeOut("slow");
				  $state.go("restricted.admin.createjobsb");
				 
			  },function(response){
					
				});
		  };
		 
		 $scope.addRoleMapping = function(id){
			 
			
			if(id == 1){
			 $scope.postedJob.postedJobEducation.push({ 
				  'typekey': "", 
				  'points': "",
				'typeid':id
			  });
			 
			}
			if(id == 2){
			 $scope.postedJob.postedJobRating.push({ 
				  'typekey': "", 
				  'points': "",
					  'typeid':id
			  });
			}
			if(id == 3){
			 $scope.postedJob.postedJobKeywords.push({ 
				  'typekey': "", 
				  'points': "",
					  'typeid':id
			  });
			}
			if(id == 4){
			 $scope.postedJob.postedJobExperience.push({ 
				  'typekey': "", 
				  'points': "",
					  'typeid':id
			  });
			}
		 };
		 
	
	  $scope.fetchassessmentlist = function(){		  
		  Admin_Service.fetchassessmentlist().then(function(response){
			  $scope.assessmentlist = response.data;
		  },function(response){				
			});		  
	  };
	  $scope.fetchassessmentlist();
	  
	  $scope.fetchcompliancelist = function(){		  
		  Admin_Service.fetchcompliancelist().then(function(response){
			  $scope.compliancelist = response.data;
			 
		  },function(response){				
			});		  
	  };
	  $scope.fetchcompliancelist();
	  
	  $scope.setCompliance = function()
	  {
		if($scope.compliancelist.length>0 && $scope.complist.length>0)
			{
			  for(var i=0;i<$scope.compliancelist.length;i++)
				  {
				     for(var j=0;j<$scope.complist.length;j++)
				    	 {
				    	    if ($scope.complist[j]==$scope.compliancelist[i].complianceName)
				    	    	{
				    	    	  var x = document.getElementById($scope.complist[j]);
				    			  if (null!=x)
				    	    	     x.checked = true;
				    			  break;
				    	    	}
				    	 }
				  
				  }
			}
	  };
	  
	  $scope.getcompliancelist = function(complianceName)
	  {   		 
		  if($scope.complist.indexOf(complianceName) !== -1)
			  {		
			  var arry  = $scope.complist;
			  var element = arry.indexOf(complianceName);
			  $scope.complist.splice(element,1);
			  }else
				  {				  
		  $scope.complist.push(complianceName);	  
				  }		  
	   };	  
	  $scope.removecompliance = function(complianceName) 
	  {
		  var arry  = $scope.complist;		 
		  var element = arry.indexOf(complianceName);
		  $scope.complist.splice(element,1);
		  var x = document.getElementById(complianceName);
		  x.checked = false;
	  };
	  
	  
	  $scope.setAssessment = function()
	  {
		if($scope.assessmentlist.length>0 && $scope.newassessmentlist.length>0)
			{
			  for(var i=0;i<$scope.assessmentlist.length;i++)
				  {
				     for(var j=0;j<$scope.newassessmentlist.length;j++)
				    	 {
				    	    if ($scope.newassessmentlist[j]==$scope.assessmentlist[i].assessmentName)
				    	    	{
				    	    	  var x = document.getElementById($scope.newassessmentlist[j]);
				    			  if (null!=x)
				    	    	     x.checked = true;
				    			  break;
				    	    	}
				    	 }
				  
				  }
			}
	  };
	   
	   $scope.getassessmentlist = function(assessmentname)
		  {		 
		   if($scope.newassessmentlist.indexOf(assessmentname) !== -1)
			  {			  			  
			  var arry  = $scope.newassessmentlist;
			  var element = arry.indexOf(assessmentname);
			  $scope.newassessmentlist.splice(element,1);
			  }else
				  {				  
		  $scope.newassessmentlist.push(assessmentname);	  
				  }		
		  };
		  
		  $scope.removeassessment = function(assessmentname) 
		  {
			  var arry  = $scope.newassessmentlist;
			  var element = arry.indexOf(assessmentname);
			  $scope.newassessmentlist.splice(element,1);
			  var x = document.getElementById(assessmentname);
			  x.checked = false;
		  };
		 
		  $scope.changestatus=function(){
			  //alert(aaa);
		  };
		  
		  
		  $scope.statuslist = function(){
			  Admin_Service.statuslist().then(function(response){
				  $scope.statuslist = response.data;	
			  },function(response){
					
				});
		  };
		  
		  $scope.statuslist();
		  
		  
		 $scope.changeHotJob = function(jobid){			 
			 Admin_Service.changeHotJob(jobid).then(function(response){
				
				 $scope.setButton();
				// $scope.fetchpostedJobList(0,10,null,null,null);	
			  },function(response){				
				});		
		 }; 
		 
		  
		 $scope.changestatus = function(jobid,statusid){			 
			 Admin_Service.changestatus(jobid,statusid).then(function(response){
				 
				 $scope.setButton();
				//$scope.fetchpostedJobList(0,10,null,null,null);	
			  },function(response){				
				});		
		 }; 
		 
		 
		    $scope.cancelPostedJob = function(){
		    	GlobalModule_dataStoreService.storeData('LoginModule','postjobeditFlag', false);
		    	 $state.go("restricted.admin.adminpostedjobs");
				
		    };
		    
		    $scope.updatePostedJob = function(job){
		    	
		    	if($("#fulldesc").val() == "" || $("#fulldesc").val() == null){
					  GlobalModule_notificationService.notification("success","please add full description");
					  return;
				  }
		    	  $(".loader").show();
				  $scope.postjob={};$scope.postjob.brand ={};$scope.postjob.position={};
				  $scope.postjob.userid = $rootScope.userdetails.id;
				  $scope.postjob.summery = $("#fulldesc").val();
				  $scope.postjob.shortDescription = job.shortDescription;
				  $scope.postjob.brand.id = job.brand.id;
				  $scope.postjob.position.id = job.position.id;
				  $scope.postjob.id = job.id;
				  var personmappingarray =[];
				  for(var i=0;i<job.postedJobEducation.length;i++)
				  {
					  personmappingarray.push(job.postedJobEducation[i]);
					};
					 for(var j=0;j<job.postedJobRating.length;j++)
					  {
						  personmappingarray.push(job.postedJobRating[j]);
						};
						for(var j=0;j<job.postedJobKeywords.length;j++)
						  {
							  personmappingarray.push(job.postedJobKeywords[j]);
							};
							for(var j=0;j<job.postedJobExperience.length;j++)
							  {
								  personmappingarray.push(job.postedJobExperience[j]);
								};
				  
								$scope.postjob.jobRoleMappingList = personmappingarray;
								
								$scope.postjob.complianceList= $scope.complist ;
								$scope.postjob.assessmentList= $scope.newassessmentlist;
								
				  Admin_Service.updatePostedJob($scope.postjob).then(function(response){
					  $scope.updatepostjobflag = response.data;	
					   $state.go("restricted.admin.adminpostedjobs");
					  if($scope.updatepostjobflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Your job has been updated successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
			  };
			  
			  //$scope.checkcomplbyPos=false;
			  $scope.fetchCompliancesbyPosition=function(brandid,categoryid,positionid){
				  
					 $(".loader").show();
					 $scope.compliancesListbyPosition=[];
					Admin_Service.fetchCompliancesbyPosition(brandid,categoryid,positionid).then(function(response){						 						
						$scope.compliancesListbyPosition=response.data;
						GlobalModule_dataStoreService.storeData('LoginModule','compliancesListbyPosition', $scope.compliancesListbyPosition);
						//$scope.checkcomplbyPos=true;
						//alert($scope.checkcomplbyPos);
						 $(".loader").fadeOut("slow");
						 
					  },function(response){						  
						  $(".loader").fadeOut("slow");
					 });						
				};
			  
			  
				$scope.deleteRatinglist = function(index)	{
					 
					 $scope.postedJob.postedJobRating.splice(index,1); 
				};
				
				$scope.deleteExperiencelist = function(index)	{
					 
					 $scope.postedJob.postedJobExperience.splice(index,1); 
				};
				
				$scope.deleteEducationlist = function(index)	{
					 
					 $scope.postedJob.postedJobEducation.splice(index,1); 
				};
				
				$scope.deleteKeywordslist = function(index)	{
					 
					 $scope.postedJob.postedJobKeywords.splice(index,1); 
				};
			  
				
}]);