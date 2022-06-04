'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Free_Query_Edit_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Free_Query_Candidate_Service','Master_Service','Admin_Service','Profile_Service','assessEngine_Service','DocumentTypeListService','Free_Query_Edit_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Free_Query_Candidate_Service,Master_Service,Admin_Service,Profile_Service,assessEngine_Service,DocumentTypeListService,Free_Query_Edit_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.editQueryId = GlobalModule_dataStoreService.loadData('LoginModule','queryId');
	$scope.configList;
	$scope.compliancelist;
	$scope.documentType;
	$scope.userJobStatus;
	$scope.assessmentStatus;
	$scope.interviewPositionList;
	$scope.interviewTemplates;
	$scope.sourceList;
	$scope.freeQueryCandidateData;
	$scope.filterPosition=[];
	
	$scope.fetchFreeQueryCandidateList = function(id){
			
			$(".loader").show();
			
			Free_Query_Edit_Service.editFreeQuery(id).then(function(response){
				  $scope.freeQueryCandidateData = response.data;
				  $scope.configList=$scope.freeQueryCandidateData.configList;
				  $scope.compliancelist=$scope.freeQueryCandidateData.complianceList;
				  $scope.userJobStatus=$scope.freeQueryCandidateData.userJobStatus;
				  $scope.assessmentStatus=$scope.freeQueryCandidateData.assessmentStatus;
				  $scope.interviewPositionList=$scope.freeQueryCandidateData.positionMasterList;
				  $scope.sourceList=$scope.freeQueryCandidateData.sorceOfInfoList;
				  console.log($scope.freeQueryCandidateData);
				  //$scope.saveCandiadateConfiguration($scope.purgeDataCandidateList);
				  Admin_Service.fetchInterviewTemplates().then(function(response){
						 $scope.interviewTemplates =response.data;
					//	//console.log($scope.interviewTemplates);
					 },function(response){
						});
				  
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
			
		};
		$scope.fetchFreeQueryCandidateList($scope.editQueryId);
		
		//fetch Qualification List
		$scope.fetchQualifications = function(){
			  
			Profile_Service.fetchQualifications().then(function(response){
				  $scope.qualificationsList = response.data;
			  },function(response){
					
				});
		  };$scope.fetchQualifications();
		
		$scope.fetchbrandlist = function(){					 
			assessEngine_Service.fetchbrandlist().then(function(response){
				 $scope.brandlist=response.data;		
				 ////console.log($scope.brandlist);
			  }); 
		 };$scope.fetchbrandlist();
		 
		 $scope.fetchdepartmentlist = function(){					 
				assessEngine_Service.fetchdepartmentlist().then(function(response){
					 $scope.departmentlist=response.data;	
					 ////console.log($scope.departmentlist);
				  }); 
			 };$scope.fetchdepartmentlist();
		
		/*$scope.fetchpositonbydipartment = function(id){
			
			  Admin_Service.fetchpositonbydipartment(id).then(function(response){
				  $scope.positionbydepartment = response.data;
			  },function(response){				
				});		  
			  
			  };*/
			 $scope.fetchpositionlist = function(id){		
				 if(id==0)
					 {
					 $scope.filterPosition=[];
					 }
				 
							assessEngine_Service.fetchpositionlist(id).then(function(response){
								 $scope.positionlist=response.data;	
								 
								
								 for(var i=0;i<$scope.positionlist.length;i++){
										$scope.filterPosition.push($scope.positionlist[i]);
									}
								 ////console.log($scope.filterPosition);
							  }); 
			 };
			 
			 $scope.filterpositionlist = function(check,deptId){
					
					if(check){
						$scope.fetchpositionlist(deptId);
						
					}else{
						if(deptId==0)
							{
							$scope.filterPosition=[];
							}else{
									var tempLength=$scope.filterPosition.length;
									for(var i=tempLength-1;i>=0;i--)
									{
									if($scope.filterPosition[i].category.id == deptId)
										{
										$scope.filterPosition.splice(i, 1);
										}
									}
									
							}
					}
				};
		
		$scope.countryList=function(){
			
			Profile_Service.fetchCountries().then(function(response){
				  $scope.countrylist = response.data;
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		$scope.countryList();
		$scope.stateList=function(id){
			
			Profile_Service.fetchStateList(id).then(function(response){
				  $scope.statelist = response.data;
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		
		$scope.cityList=function(id){
			
			Profile_Service.fetchCityList(id).then(function(response){
				  $scope.citylist = response.data;
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		
		
		
		// for fetching document type list
		
		$scope.fetchDocumentTypeList=function(){

			$(".loader").show();

			DocumentTypeListService.fetchDocumentTypeList().then(function(response){
				$scope.documentType=response.data;
			
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			}); 
		}
		$scope.fetchDocumentTypeList();
		
		// for assessment typelist
		
		 $scope.fetchassessmenttype  = function(){					 
				assessEngine_Service.fetchassessmenttype().then(function(response){
					 $scope.assessmenttype=response.data;	
					// console.log($scope.assessmenttype);
				  }); 
			 };$scope.fetchassessmenttype();
	
		// for saving freequery
		$scope.savepFreeQueryDetailCandidate=function(configList){
			
			// for saving data set to specific fields value its static setting so check carefully when makes changes on this page
			$scope.configList[1].freeQueryDataList[0].objIds=$scope.qualiIds;
			$scope.configList[3].freeQueryDataList[8].objIds=$scope.countryIds;
			$scope.configList[3].freeQueryDataList[6].objIds=$scope.stateIds;
			$scope.configList[3].freeQueryDataList[5].objIds=$scope.cityIds;
			$scope.configList[4].freeQueryDataList[2].objIds=$scope.complianceCountryIds;
			$scope.configList[4].freeQueryDataList[3].objIds=$scope.complianceIds;
			$scope.configList[5].freeQueryDataList[3].objIds=$scope.brandIds;
			//$scope.configList[5].freeQueryDataList[1].objIds=$scope.depIds;
			$scope.configList[5].freeQueryDataList[0].objIds=$scope.posiIds;
			$scope.configList[5].freeQueryDataList[4].objIds=$scope.jobStatusIds;
			$scope.configList[7].freeQueryDataList[0].objIds=$scope.assbrandIds;
			$scope.configList[7].freeQueryDataList[2].objIds=$scope.assposiIds;
			$scope.configList[7].freeQueryDataList[7].objIds=$scope.assStatusIds;
			$scope.configList[8].freeQueryDataList[4].objIds=$scope.surveyStatusIds;
			$scope.configList[6].freeQueryDataList[1].objIds=$scope.interviewPositionIds;
			$scope.configList[6].freeQueryDataList[2].objIds=$scope.interviewTempIds;
			
			$scope.configList[9].freeQueryDataList[1].objIds=$scope.docTypeIds;
			
			$(".loader").show();
			
			Free_Query_Candidate_Service.savepFreeQueryDetailCandidate(configList).then(function(response){
				  $scope.data = response.data;
			
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		
		//for selecting brands
		$scope.brandIds=[];
		$scope.selectAllBrands=function(val){
			if(val){
				for(var i=0;i<$scope.brandlist.length;i++){
					$scope.brandIds.push($scope.brandlist[i].id);
				}
			}else{
				$scope.brandIds.length=0;
			}
			
		};
		
		$scope.addBrand=function(id,val){
			  if($scope.brandIds.indexOf(id) == -1) {
				  $scope.brandIds.push(id);
			  } else{ 
				  $scope.brandIds.splice($scope.brandIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting departments
		$scope.depIds=[];
		$scope.selectAllDept=function(val){
			if(val){
				for(var i=0;i<$scope.departmentlist.length;i++){
					$scope.depIds.push($scope.departmentlist[i].id);
				}
			}else{
				$scope.depIds.length=0;
			}
			
		};
		
		$scope.addDept=function(id,val){
			  if($scope.depIds.indexOf(id) == -1) {
				  $scope.depIds.push(id);
			  } else{ 
				  $scope.depIds.splice($scope.depIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting departments
		$scope.posiIds=[];
		$scope.selectAllPositions=function(val){
			if(val){
				for(var i=0;i<$scope.filterPosition.length;i++){
					$scope.posiIds.push($scope.filterPosition[i].id);
				}
			}else{
				$scope.posiIds.length=0;
			}
			
		};
		
		$scope.addPosi=function(id,val){
			  if($scope.posiIds.indexOf(id) == -1) {
				  $scope.posiIds.push(id);
			  } else{ 
				  $scope.posiIds.splice($scope.posiIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting brands
		$scope.qualiIds=[];
		$scope.selectAllQualifi=function(val){
			if(val){
				for(var i=0;i<$scope.qualificationsList.length;i++){
					$scope.qualiIds.push($scope.qualificationsList[i].id);
				
				}
			}else{
				$scope.qualiIds=[];
			}
			
		};
		
		$scope.addQuali=function(id,val){
			  if($scope.qualiIds.indexOf(id) == -1) {
				  $scope.qualiIds.push(id);
			  } else{ 
				  $scope.qualiIds.splice($scope.qualiIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting countrys
		$scope.countryIds=[];
		$scope.selectAllCountry=function(val){
			if(val){
				for(var i=0;i<$scope.countrylist.length;i++){
					$scope.countryIds.push($scope.countrylist[i].id);
				
				}
			}else{
				$scope.countryIds.length=0;
			}
			
		};
		
		$scope.addCountry=function(id,val){
			  if($scope.countryIds.indexOf(id) == -1) {
				  $scope.countryIds.push(id);
			  } else{ 
				  $scope.countryIds.splice($scope.countryIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting states
		$scope.stateIds=[];
		$scope.selectAllState=function(val){
			if(val){
				for(var i=0;i<$scope.statelist.length;i++){
					$scope.stateIds.push($scope.statelist[i].id);
				
				}
			}else{
				$scope.stateIds.length=0;
			}
			
		};
		
		$scope.addState=function(id,val){
			  if($scope.stateIds.indexOf(id) == -1) {
				  $scope.stateIds.push(id);
			  } else{ 
				  $scope.stateIds.splice($scope.stateIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting citys
		$scope.cityIds=[];
		$scope.selectAllCity=function(val){
			if(val){
				for(var i=0;i<$scope.citylist.length;i++){
					$scope.cityIds.push($scope.citylist[i].id);
				
				}
			}else{
				$scope.cityIds.length=0;
			}
			
		};
		
		$scope.addCity=function(id,val){
			  if($scope.cityIds.indexOf(id) == -1) {
				  $scope.cityIds.push(id);
			  } else{ 
				  $scope.cityIds.splice($scope.cityIds.indexOf(id),1);
			  }
			
		};
		
		// for setting compliance list ids
		$scope.complianceIds=[];
		$scope.selectAllCompliances=function(val){
			if(val){
				for(var i=0;i<$scope.compliancelist.length;i++){
					$scope.complianceIds.push($scope.compliancelist[i].id);
				
				}
			}else{
				$scope.complianceIds.length=0;
			}
			
		};
		
		$scope.addCompliance=function(id,val){
			  if($scope.complianceIds.indexOf(id) == -1) {
				  $scope.complianceIds.push(id);
			  } else{ 
				  $scope.complianceIds.splice($scope.complianceIds.indexOf(id),1);
			  }
			
		};
		
		// for setting doctype list ids
		$scope.docTypeIds=[];
		$scope.selectAllDocTypes= function(val){
			if(val){
				for(var i=0;i<$scope.documentType.length;i++){
					$scope.docTypeIds.push($scope.documentType[i].id);
				
				}
			}else{
				$scope.docTypeIds.length=0;
			}
			
		};
		
		$scope.addType=function(id,val){
			  if($scope.docTypeIds.indexOf(id) == -1) {
				  $scope.docTypeIds.push(id);
			  } else{ 
				  $scope.docTypeIds.splice($scope.docTypeIds.indexOf(id),1);
			  }
			
		};
		
		// for setting jobstatus
		$scope.jobStatusIds=[];
		$scope.selectAllJobStatus= function(val){
			if(val){
				for(var i=0;i<$scope.userJobStatus.length;i++){
					$scope.jobStatusIds.push($scope.userJobStatus[i].id);
				
				}
			}else{
				$scope.jobStatusIds.length=0;
			}
			
		};
		
		$scope.addJobStatus=function(id,val){
			  if($scope.jobStatusIds.indexOf(id) == -1) {
				  $scope.jobStatusIds.push(id);
			  } else{ 
				  $scope.jobStatusIds.splice($scope.jobStatusIds.indexOf(id),1);
			  }
			
		};
		
		
		// fro setting gender
		$scope.setAction=function(val,obj){
			if(val==1){
				obj.value="male";
			}else if(val==2){
				obj.value="female";
			}
			
		};
	// for setting date
		$scope.setDate=function (obj,elm){
			obj.value=$("#"+elm).val();

		};
		
	// for storing comparison
		
		
			$scope.comparelist=[];
		for(var i=1;i<=4;i++){
			var compareObj={};
			if(i==1){
				compareObj.id=i;
				compareObj.name="Greater";
				$scope.comparelist.push(compareObj);
			}else if(i==2){
				compareObj.id=i;
				compareObj.name="Equal";
				$scope.comparelist.push(compareObj);
			}
			else if(i==3){
				compareObj.id=i;
				compareObj.name="Less";
				$scope.comparelist.push(compareObj);
			}
			/*else if(i==4){
				compareObj.id=i;
				compareObj.name="Between";
				$scope.comparelist.push(compareObj);
			}*/
		}
			
		// fro setting compare value
		$scope.addComparision=function(cmId,obj){
			obj.compareId=cmId;
		};
		
		//for selecting countrys
		$scope.complianceCountryIds=[];
		$scope.selectAllComplianceCountry=function(val){
			if(val){
				for(var i=0;i<$scope.countrylist.length;i++){
					$scope.complianceCountryIds.push($scope.countrylist[i].id);
				
				}
			}else{
				$scope.complianceCountryIds.length=0;
			}
			
		};
		
		$scope.addComplianceCountry=function(id,val){
			  if($scope.complianceCountryIds.indexOf(id) == -1) {
				  $scope.complianceCountryIds.push(id);
			  } else{ 
				  $scope.complianceCountryIds.splice($scope.complianceCountryIds.indexOf(id),1);
			  }
			
		};
		
		// for assessment 
		//for selecting brands
		$scope.assbrandIds=[];
		$scope.selectAllAssBrands=function(val){
			if(val){
				for(var i=0;i<$scope.brandlist.length;i++){
					$scope.assbrandIds.push($scope.brandlist[i].id);
				}
			}else{
				$scope.assbrandIds.length=0;
			}
			
		};
		
		$scope.addAssBrand=function(id,val){
			  if($scope.assbrandIds.indexOf(id) == -1) {
				  $scope.assbrandIds.push(id);
			  } else{ 
				  $scope.assbrandIds.splice($scope.brandIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting departments
		$scope.assdepIds=[];
		$scope.selectAllAssDept=function(val){
			if(val){
				for(var i=0;i<$scope.departmentlist.length;i++){
					$scope.assdepIds.push($scope.departmentlist[i].id);
				}
			}else{
				$scope.assdepIds.length=0;
			}
			
		};
		
		$scope.addAssDept=function(id,val){
			  if($scope.assdepIds.indexOf(id) == -1) {
				  $scope.assdepIds.push(id);
			  } else{ 
				  $scope.assdepIds.splice($scope.assdepIds.indexOf(id),1);
			  }
			
		};
		
		//for selecting departments
		$scope.assposiIds=[];
		$scope.selectAllAssPositions=function(val){
			if(val){
				for(var i=0;i<$scope.filterPosition.length;i++){
					$scope.assposiIds.push($scope.filterPosition[i].id);
				}
			}else{
				$scope.assposiIds.length=0;
			}
			
		};
		
		$scope.addAssPosi=function(id,val){
			  if($scope.assposiIds.indexOf(id) == -1) {
				  $scope.assposiIds.push(id);
			  } else{ 
				  $scope.assposiIds.splice($scope.assposiIds.indexOf(id),1);
			  }
			
		};
		
		// for assessment status
		$scope.assStatusIds=[];
		$scope.selectAllAssStatus= function(val){
			if(val){
				for(var i=0;i<$scope.assessmentStatus.length;i++){
					$scope.assStatusIds.push($scope.assessmentStatus[i].id);
				
				}
			}else{
				$scope.assStatusIds.length=0;
			}
			
		};
		
		$scope.addAssStatus=function(id,val){
			  if($scope.assStatusIds.indexOf(id) == -1) {
				  $scope.assStatusIds.push(id);
			  } else{ 
				  $scope.assStatusIds.splice($scope.assStatusIds.indexOf(id),1);
			  }
			
		};
		
		// for survey status
		$scope.surveyStatusIds=[];
		$scope.selectAllSurveyStatus= function(val){
			if(val){
				for(var i=0;i<$scope.assessmentStatus.length;i++){
					$scope.surveyStatusIds.push($scope.assessmentStatus[i].id);
				
				}
			}else{
				$scope.surveyStatusIds.length=0;
			}
			
		};
		
		$scope.addSurveyStatus=function(id,val){
			  if($scope.surveyStatusIds.indexOf(id) == -1) {
				  $scope.surveyStatusIds.push(id);
			  } else{ 
				  $scope.surveyStatusIds.splice($scope.surveyStatusIds.indexOf(id),1);
			  }
			
		};
		
		// for survey status
		$scope.interviewPositionIds=[];
		$scope.selectAllInterviewPositions= function(val){
			if(val){
				for(var i=0;i<$scope.interviewPositionList.length;i++){
					$scope.interviewPositionIds.push($scope.interviewPositionList[i].id);
				
				}
			}else{
				$scope.interviewPositionIds.length=0;
			}
			
		};
		
		$scope.addInterviewPosi=function(id,val){
			  if($scope.interviewPositionIds.indexOf(id) == -1) {
				  $scope.interviewPositionIds.push(id);
			  } else{ 
				  $scope.interviewPositionIds.splice($scope.interviewPositionIds.indexOf(id),1);
			  }
			
		};
		
		$scope.interviewTempIds=[];
		$scope.selectAllInterviewtemplates= function(val){
			if(val){
				for(var i=0;i<$scope.interviewTemplates.length;i++){
					$scope.interviewTempIds.push($scope.interviewTemplates[i].id);
				
				}
			}else{
				$scope.interviewTempIds.length=0;
			}
			
		};
		
		$scope.addInterviewTemp=function(id,val){
			  if($scope.interviewTempIds.indexOf(id) == -1) {
				  $scope.interviewTempIds.push(id);
			  } else{ 
				  $scope.interviewTempIds.splice($scope.interviewTempIds.indexOf(id),1);
			  }
			
		};
		
	
		

	
}]);