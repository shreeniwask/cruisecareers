'use strict';

var controllers = angular.module('LoginModule');


controllers.directive('allow1', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, Free_Query_Candidate_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var transformedInput = text.replace(/[^0-9]/g, '');

	                if (transformedInput !== text) {
	                	Free_Query_Candidate_Ctrl.$setViewValue(transformedInput);
	                	Free_Query_Candidate_Ctrl.$render();
	                }
	                return transformedInput;
	            }
	            return undefined;
	        }            
	        Free_Query_Candidate_Ctrl.$parsers.push(fromUser);
	    }
	};
	});

controllers.directive('allow2', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, Free_Query_Candidate_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var transformedInput = text.replace(/[^a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]/g, '');

	                if (transformedInput !== text) {
	                	Free_Query_Candidate_Ctrl.$setViewValue(transformedInput);
	                	Free_Query_Candidate_Ctrl.$render();
	                }
	                return transformedInput;
	            }
	            return undefined;
	        }            
	        Free_Query_Candidate_Ctrl.$parsers.push(fromUser);
	    }
	};
	});

controllers.directive('allow3', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, Free_Query_Candidate_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var transformedInput = text.replace(/[^a-zA-Z0-9]/g, '');

	                if (transformedInput !== text) {
	                	Free_Query_Candidate_Ctrl.$setViewValue(transformedInput);
	                	Free_Query_Candidate_Ctrl.$render();
	                }
	                return transformedInput;
	            }
	            return undefined;
	        }            
	        Free_Query_Candidate_Ctrl.$parsers.push(fromUser);
	    }
	};
	});

controllers.controller('Free_Query_Candidate_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Free_Query_Candidate_Service','Master_Service','Admin_Service','Profile_Service','assessEngine_Service','DocumentTypeListService','Free_Query_Edit_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Free_Query_Candidate_Service,Master_Service,Admin_Service,Profile_Service,assessEngine_Service,DocumentTypeListService,Free_Query_Edit_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	 // $scope.editQueryId;
	 
	$scope.filterPosition=[];
		
	$scope.freeQueryFlag=1;
	$scope.menuFlag= 1;
	
	document.getElementById("menu1").setAttribute("class", "active"); 
	for (var i=2;i<=11;i++)
	{
		document.getElementById("menu"+i).setAttribute("class", ""); 
	}
		
	 $scope.showMenu = function(id){			  
		  
		 $scope.menuFlag  = id;
		  
		  for (var i=1;i<=12;i++)
			  {
				  if (i==id)
					  document.getElementById("menu"+id).setAttribute("class", "active"); 
				  else 
					  document.getElementById("menu"+i).setAttribute("class", ""); 
			  }
	  };
	 
	  $scope.setExcludeButtonColor=function(i,j)
		{
			if($scope.freeQueryCandidateData.configList[i].freeQueryDataList[j].exclude)
			{
				$("#exclude"+i+j).css('color', 'red'); 
				$("#exclude"+i+j).attr('title', 'Excluded');
			}
			else
			{
				$("#exclude"+i+j).css('color', '#00aeef'); 
				$("#exclude"+i+j).attr('title', 'Exclude');
			}
		}
	 
	  $scope.editQueryId = GlobalModule_dataStoreService.loadData('LoginModule','queryId');

	$scope.fetchFreeQueryCandidateList = function(){
			
			$(".loader").show();
			
			Free_Query_Candidate_Service.fetchFreeQueryCandidateList().then(function(response){
			
				$(".loader").show();
				
				  $scope.freeQueryCandidateData = response.data;
				  
				  console.log($scope.freeQueryCandidateData);
				  
				  $scope.configList=$scope.freeQueryCandidateData.configList;
				  $scope.compliancelist=$scope.freeQueryCandidateData.complianceList;
				  $scope.userJobStatus=$scope.freeQueryCandidateData.userJobStatus;
				  $scope.assessmentStatus=$scope.freeQueryCandidateData.assessmentStatus;
				  $scope.interviewPositionList=$scope.freeQueryCandidateData.positionMasterList;
				  $scope.brandlist=$scope.freeQueryCandidateData.brandList;
				  $scope.brandlistForAssessment=$scope.freeQueryCandidateData.brandListForAssessment;
				  $scope.brandlistForJobPosting=$scope.freeQueryCandidateData.brandListForJobPosting;
				  $scope.departmentlist=$scope.freeQueryCandidateData.categoryList;
				  $scope.departmentlistForAssessment=$scope.freeQueryCandidateData.categoryListForAssessment;
				  $scope.departmentlistForJobPosting=$scope.freeQueryCandidateData.categoryListForJobPosting;
				  
				  $scope.positionlist=$scope.freeQueryCandidateData.positionMasterList;
				  $scope.appliedPositionlist=$scope.freeQueryCandidateData.appliedPosition;
				  $scope.appliedCategorylist=$scope.freeQueryCandidateData.appliedCategory;
				  $scope.appliedBrandlist=$scope.freeQueryCandidateData.appliedBrand;
				  /*$scope.positionMasterListForShortlisted=$scope.freeQueryCandidateData.positionMasterListForShortlisted;
				  $scope.positionMasterListForSelected=$scope.freeQueryCandidateData.positionMasterListForSelected;*/				  
				  $scope.positionlistforinterview=$scope.freeQueryCandidateData.positionMasterListForInterview;
				  $scope.positionlistforassessment=$scope.freeQueryCandidateData.positionMasterListForAssessment;
				  $scope.positionlistforjobposting=$scope.freeQueryCandidateData.positionMasterListForJobPosting;
				  $scope.qualificationsList=$scope.freeQueryCandidateData.qualificationList;
				  $scope.interviewTemplates=$scope.freeQueryCandidateData.templateList;
				  $scope.documentType=$scope.freeQueryCandidateData.docTypeList;
				  $scope.sourceList=$scope.freeQueryCandidateData.sorceOfInfoList;
				  $scope.shipList=$scope.freeQueryCandidateData.shipList;			 
				  //console.log($scope.shipList);
			
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
			
		};		
		if($scope.editQueryId == undefined)
		{
			$scope.fetchFreeQueryCandidateList();
		}
		
		var validateFreeQuery=function(configList)
		{
			$(".loader").show();
			
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			
			if(configList == undefined)
			{
				GlobalModule_notificationService.notification("error","Please fill all mandatory fields");
				$(".loader").fadeOut("slow");
				return false;
			}
			if(configList.name == undefined || !(configList.name.match(letterNumber))){
		    	
				GlobalModule_notificationService.notification("error","Please enter valid query name");
				$(".loader").fadeOut("slow");
				return false;
		    }
			if(configList.description == undefined || !(configList.description.match(letterNumber))){
		    	
				GlobalModule_notificationService.notification("error","Please enter valid description");
				$(".loader").fadeOut("slow");
				return false;
		    }
			if($scope.freeQueryFields.length <= 0)
			{
				GlobalModule_notificationService.notification("error","No field selected to execute query");
				$(".loader").fadeOut("slow");
				return false;
			}
			return true;
		};
		
		
		// for saving freequery
		$scope.savepFreeQueryDetailCandidate=function(configList){
			
			$(".loader").show();
			
			var validationFlag=validateFreeQuery(configList);
			
			if(!validationFlag)
			{
				$(".loader").fadeOut("slow");
				return;
			}
			
			// for saving data set to specific fields value its static setting so check carefully when makes changes on this page
			$scope.configList[0].freeQueryDataList[4].objIds=$scope.sourceIds;
			$scope.configList[1].freeQueryDataList[0].objIds=$scope.qualiIds;
			$scope.configList[3].freeQueryDataList[4].objIds=$scope.countryIds;
			$scope.configList[3].freeQueryDataList[2].objIds=$scope.stateIds;
			$scope.configList[3].freeQueryDataList[1].objIds=$scope.cityIds;
			$scope.configList[4].freeQueryDataList[2].objIds=$scope.complianceCountryIds;
			$scope.configList[4].freeQueryDataList[3].objIds=$scope.complianceIds;
			$scope.configList[5].freeQueryDataList[3].objIds=$scope.brandIds;
			$scope.configList[5].freeQueryDataList[1].objIds=$scope.depIds;
			$scope.configList[5].freeQueryDataList[6].objIds=$scope.posiIds;
			$scope.configList[5].freeQueryDataList[4].objIds=$scope.jobStatusIds;
			$scope.configList[7].freeQueryDataList[0].objIds=$scope.assbrandIds;
			$scope.configList[7].freeQueryDataList[2].objIds=$scope.assposiIds;
			$scope.configList[7].freeQueryDataList[1].objIds=$scope.assdepIds;
			$scope.configList[7].freeQueryDataList[7].objIds=$scope.assStatusIds;
			$scope.configList[8].freeQueryDataList[4].objIds=$scope.surveyStatusIds;
			$scope.configList[6].freeQueryDataList[1].objIds=$scope.interviewPositionIds;
			$scope.configList[6].freeQueryDataList[2].objIds=$scope.interviewTempIds;
			
			$scope.configList[9].freeQueryDataList[1].objIds=$scope.docTypeIds;
			$scope.configList[10].freeQueryDataList[5].objIds=$scope.shipIds;
			$scope.configList[10].freeQueryDataList[0].objIds=$scope.PostJobposiIds;
			$scope.configList[10].freeQueryDataList[1].objIds=$scope.postdepIds;
			$scope.configList[10].freeQueryDataList[2].objIds=$scope.postbrandIds;
			$scope.configList[5].freeQueryDataList[9].objIds=$scope.appliedBrandIds;
			$scope.configList[5].freeQueryDataList[8].objIds=$scope.appliedCategoryIds;
			$scope.configList[5].freeQueryDataList[7].objIds=$scope.appliedPositionIds;
			$scope.configList[5].freeQueryDataList[10].objIds=$scope.employee_number;

			configList.userid=$rootScope.userdetails.id;
			configList.queryFor=$scope.freeQueryFlag;
			$(".loader").show();
			
			Free_Query_Candidate_Service.savepFreeQueryDetailCandidate(configList).then(function(response){
				$scope.freeQueryId = response.data;
				  if($scope.freeQueryId != 0 && $scope.freeQueryId != undefined){
					 
					  if($scope.freeQueryId == -1)
					  {
						  GlobalModule_notificationService.notification("error","This Query name already exists.");
						  $(".loader").fadeOut("slow");
						  return;
					  }
					  
						  					  
					  if(configList.execute == true)
					  {
						  $scope.generateExcel($scope.freeQueryId);						  
						  GlobalModule_notificationService.notification("success","Query has been saved and executed");
						  $(".loader").fadeOut("slow");
						  $state.go("restricted.admin.freequerylist");
					  }
					  else
					  {
						  GlobalModule_notificationService.notification("success","Your query has been saved successfully");
						  $(".loader").fadeOut("slow");
						  $state.go("restricted.admin.freequerylist");
					  }					 				  
				  }else{
					  $scope.generateExcel(freeQueryId);
					  GlobalModule_notificationService.notification("success","Query has been saved and executed");
					  $state.go("restricted.admin.freequerylist");
				  }
				  
				  $(".loader").fadeOut("slow");
				  
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		
		// for saving and executing directly
		$scope.saveAndExecute=function(configList){
			
			$(".loader").show();
			
			var validationFlag=validateFreeQuery(configList);
			
			if(!validationFlag)
			{
				$(".loader").fadeOut("slow");
				return;
			}
			
			configList.execute=true;
			$scope.savepFreeQueryDetailCandidate(configList);
		};
		
		//for selecting brands
		$scope.brandIds=[];
		$scope.selectAllBrands=function(val){
			if(val){
				for(var i=0;i<$scope.brandlist.length;i++){
					//$scope.brandIds.push($scope.brandlist[i].id);
					if($scope.brandIds.indexOf($scope.brandlist[i].id) == -1) {
						  $scope.brandIds.push($scope.brandlist[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.brandlist.length;i++){
					$scope.brandlist[i].isSelected=false;
				}
				$scope.brandIds=[];
			}			
		};
		
		$scope.addBrand=function(id,val){
			  if($scope.brandIds.indexOf(id) == -1) {
				  $scope.brandIds.push(id);
			  } else{ 
				  $scope.brandIds.splice($scope.brandIds.indexOf(id),1);
			  }			
		};
		//for selecting ship for job posting
		$scope.shipIds=[];
		$scope.selectAllShips=function(val){
			if(val){
				for(var i=0;i<$scope.shipList.length;i++){
					//$scope.shipIds.push($scope.shipList[i].id);
					if($scope.shipIds.indexOf($scope.shipList[i].id) == -1) {
						  $scope.shipIds.push($scope.shipList[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.shipList.length;i++){
					$scope.shipList[i].isSelected=false;
				}
				$scope.shipIds=[];
			}			
		};
		
		$scope.addShip=function(id,val){
			  if($scope.shipIds.indexOf(id) == -1) {
				  $scope.shipIds.push(id);
			  } else{ 
				  $scope.shipIds.splice($scope.shipIds.indexOf(id),1);
			  }			
		};
		
		
		
		
		//for selecting departments
		$scope.depIds=[];
		$scope.selectAllDept=function(val){
			if(val){
				for(var i=0;i<$scope.departmentlist.length;i++){
					//$scope.depIds.push($scope.departmentlist[i].id);
					if($scope.depIds.indexOf($scope.departmentlist[i].id) == -1) {
						  $scope.depIds.push($scope.departmentlist[i].id);
					  }
				}
			}else{
				
				for(var i=0;i<$scope.departmentlist.length;i++){
					$scope.departmentlist[i].isSelected=false;
				}
				
				$scope.depIds=[];
			}			
		};
		
		$scope.addDept=function(id,val){
			  if($scope.depIds.indexOf(id) == -1) {
				  $scope.depIds.push(id);
			  } else{ 
				  $scope.depIds.splice($scope.depIds.indexOf(id),1);
			  }			
		};
		//for selecting department for job posting
		$scope.postdepIds=[];
		$scope.selectAllPostDept=function(val){
			if(val){
				for(var i=0;i<$scope.departmentlist.length;i++){
					//$scope.depIds.push($scope.departmentlist[i].id);
					if($scope.postdepIds.indexOf($scope.departmentlist[i].id) == -1) {
						  $scope.postdepIds.push($scope.departmentlist[i].id);
					  }
				}
			}else{
				
				for(var i=0;i<$scope.departmentlistForJobPosting.length;i++){
					$scope.departmentlistForJobPosting[i].isSelected=false;
				}
				
				$scope.postdepIds=[];
			}			
		};
		
		$scope.addDeptPost=function(id,val){
			  if($scope.postdepIds.indexOf(id) == -1) {
				  $scope.postdepIds.push(id);
			  } else{ 
				  $scope.postdepIds.splice($scope.postdepIds.indexOf(id),1);
			  }			
		};
		
		//for selecting departments
		$scope.posiIds=[];
		$scope.selectAllPositions=function(val){
			if(val){
				for(var i=0;i<$scope.positionlist.length;i++){
					//$scope.posiIds.push($scope.filterPosition[i].id);
					if($scope.posiIds.indexOf($scope.positionlist[i].id) == -1) {
						  $scope.posiIds.push($scope.positionlist[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.positionlist.length;i++){
					$scope.positionlist[i].isSelected=false;
				}
				$scope.posiIds=[];
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
					//$scope.qualiIds.push($scope.qualificationsList[i].id);
					if($scope.qualiIds.indexOf($scope.qualificationsList[i].id) == -1) {
						  $scope.qualiIds.push($scope.qualificationsList[i].id);
					  }				
				}
			}else{
				for(var i=0;i<$scope.qualificationsList.length;i++){
					$scope.qualificationsList[i].isSelected=false;
				}
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
				for(var i=0;i<$scope.freeQueryCandidateData.countryList.length;i++){
					//$scope.countryIds.push($scope.countrylist[i].id);
					if($scope.countryIds.indexOf($scope.freeQueryCandidateData.countryList[i].id) == -1) {
						  $scope.countryIds.push($scope.freeQueryCandidateData.countryList[i].id);
					  }
				
				}
			}else{
				for(var i=0;i<$scope.freeQueryCandidateData.countryList.length;i++){
					$scope.freeQueryCandidateData.countryList[i].isSelected=false;
				}
				$scope.countryIds=[];
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
				for(var i=0;i<$scope.freeQueryCandidateData.stateList.length;i++){
					//$scope.stateIds.push($scope.statelist[i].id);
					if($scope.stateIds.indexOf($scope.freeQueryCandidateData.stateList[i].id) == -1) {
						  $scope.stateIds.push($scope.freeQueryCandidateData.stateList[i].id);
					  }		
				}
			}else{
				for(var i=0;i<$scope.freeQueryCandidateData.stateList.length;i++){
					$scope.freeQueryCandidateData.stateList[i].isSelected=false;
				}
				$scope.stateIds=[];
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
				for(var i=0;i<$scope.freeQueryCandidateData.cityList.length;i++){
					//$scope.cityIds.push($scope.citylist[i].id);
					if($scope.cityIds.indexOf($scope.freeQueryCandidateData.cityList[i].id) == -1) {
						  $scope.cityIds.push($scope.freeQueryCandidateData.cityList[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.freeQueryCandidateData.cityList.length;i++){
					$scope.freeQueryCandidateData.cityList[i].isSelected=false;
				}
				$scope.cityIds=[];
			}			
		};
		
		$scope.addCity=function(id,val){
			  if($scope.cityIds.indexOf(id) == -1) {
				  $scope.cityIds.push(id);
			  } else{ 
				  $scope.cityIds.splice($scope.cityIds.indexOf(id),1);
			  }		
		};
		// for setting sourceinfoids list ids
		$scope.sourceIds=[];
		$scope.selectAllSources=function(val){
			if(val){
				for(var i=0;i<$scope.sourceList.length;i++){					
					//$scope.sourceIds.push($scope.sourceList[i].id);				
					if($scope.sourceIds.indexOf($scope.sourceList[i].id) == -1) {
						  $scope.sourceIds.push($scope.sourceList[i].id);
					  }					
				}
			}else{
				for(var i=0;i<$scope.sourceList.length;i++){
					$scope.sourceList[i].isSelected=false;
				}
				$scope.sourceIds=[];
			}			
		};
		
		$scope.addSource=function(id,val){
			  if($scope.sourceIds.indexOf(id) == -1) {
				  $scope.sourceIds.push(id);
			  } else{ 
				  $scope.sourceIds.splice($scope.sourceIds.indexOf(id),1);
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
				for(var i=0;i<$scope.compliancelist.length;i++){
					$scope.compliancelist[i].isSelected=false;
				}
				$scope.complianceIds=[];
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
					//$scope.docTypeIds.push($scope.documentType[i].id);
					if($scope.docTypeIds.indexOf($scope.documentType[i].id) == -1) {
						  $scope.docTypeIds.push($scope.documentType[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.documentType.length;i++){
					$scope.documentType[i].isSelected=false;
				}
				$scope.docTypeIds=[];
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
					//$scope.jobStatusIds.push($scope.userJobStatus[i].id);
					if($scope.jobStatusIds.indexOf($scope.userJobStatus[i].id) == -1) {
						  $scope.jobStatusIds.push($scope.userJobStatus[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.userJobStatus.length;i++){
					$scope.userJobStatus[i].isSelected=false;
				}
				$scope.jobStatusIds=[];
			}			
		};
		
		$scope.addJobStatus=function(id,val){
			  if($scope.jobStatusIds.indexOf(id) == -1) {
				  $scope.jobStatusIds.push(id);
			  } else{ 
				  $scope.jobStatusIds.splice($scope.jobStatusIds.indexOf(id),1);
			  }			
		};
		
		$scope.shortlistdpostnIds=[];
		$scope.selectAllShorlistdPostn=function(val){
			if(val){
				for(var i=0;i<$scope.positionMasterListForShortlisted.length;i++){
					//$scope.depIds.push($scope.departmentlist[i].id);
					if($scope.shortlistdpostnIds.indexOf($scope.positionMasterListForShortlisted[i].id) == -1) {
						  $scope.shortlistdpostnIds.push($scope.positionMasterListForShortlisted[i].id);
					  }
				}
			}else{
				
				for(var i=0;i<$scope.positionMasterListForShortlisted.length;i++){
					$scope.positionMasterListForShortlisted[i].isSelected=false;
				}
				
				$scope.shortlistdpostnIds=[];
			}			
		};
		
		$scope.addShorlstdPostn=function(id,val){
			  if($scope.shortlistdpostnIds.indexOf(id) == -1) {
				  $scope.shortlistdpostnIds.push(id);
			  } else{ 
				  $scope.shortlistdpostnIds.splice($scope.shortlistdpostnIds.indexOf(id),1);
			  }			
		};
		
		$scope.selectedPostnIds=[];
		$scope.selectAllSelectedPostn=function(val){
			if(val){
				for(var i=0;i<$scope.positionMasterListForSelected.length;i++){
					//$scope.depIds.push($scope.departmentlist[i].id);
					if($scope.selectedPostnIds.indexOf($scope.positionMasterListForSelected[i].id) == -1) {
						  $scope.selectedPostnIds.push($scope.positionMasterListForSelected[i].id);
					  }
				}
			}else{
				
				for(var i=0;i<$scope.positionMasterListForSelected.length;i++){
					$scope.positionMasterListForSelected[i].isSelected=false;
				}
				
				$scope.selectedPostnIds=[];
			}			
		};
		
		$scope.addSelectdPostn=function(id,val){
			  if($scope.selectedPostnIds.indexOf(id) == -1) {
				  $scope.selectedPostnIds.push(id);
			  } else{ 
				  $scope.selectedPostnIds.splice($scope.shortlistdpostnIds.indexOf(id),1);
			  }			
		};
		
		// fro setting gender
		$scope.setAction=function(val,obj){
			if(val==1){
				obj.value="male";
			}else if(val==2){
				obj.value="female";
			}
			else if(val==3)
			{
				obj.value="both";
			}
			
		};
		
	// for setting date
		$scope.setDate=function (obj,elm,i){
			
			if(i == 1)
			{
				obj.fromField=$("#"+elm).val();
			}
			else if(i == 2)
			{
				obj.toField=$("#"+elm).val();
			}
			else if(i == 3)
			{
				obj.value=$("#"+elm).val();
			}
		};
		
		/*$scope.setDate2=function (obj,elm){
			obj.toField=$("#"+elm).val();

		};*/
		
	// for storing comparison
		
		
			$scope.comparelist=[];
		for(var i=1;i<=6;i++){
			var compareObj={};
			if(i==1){
				compareObj.id=i;
				compareObj.name=">";
				$scope.comparelist.push(compareObj);
			}else if(i==2){
				compareObj.id=i;
				compareObj.name="=";
				$scope.comparelist.push(compareObj);
			}
			else if(i==3){
				compareObj.id=i;
				compareObj.name="<";
				$scope.comparelist.push(compareObj);
			}else if(i==4){
				compareObj.id=i;
				compareObj.name=">=";
				$scope.comparelist.push(compareObj);
			}else if(i==5){
				compareObj.id=i;
				compareObj.name="<=";
				$scope.comparelist.push(compareObj);
			}else if(i==6){
				compareObj.id=i;
				compareObj.name="< >";
				$scope.comparelist.push(compareObj);
			}
		}
			
		// fro setting compare value
		$scope.addComparision=function(cmId,obj){
			obj.compareId=cmId;
		};
		
		//for selecting countrys
		$scope.complianceCountryIds=[];
		$scope.selectAllComplianceCountry=function(val){
			if(val){
				for(var i=0;i<$scope.freeQueryCandidateData.countryList.length;i++){
					//$scope.complianceCountryIds.push($scope.countrylist[i].id);
					if($scope.complianceCountryIds.indexOf($scope.freeQueryCandidateData.countryList[i].id) == -1) {
						  $scope.complianceCountryIds.push($scope.freeQueryCandidateData.countryList[i].id);
					  }
				
				}
			}else{
				for(var i=0;i<$scope.freeQueryCandidateData.countryList.length;i++){
					$scope.freeQueryCandidateData.countryList[i].isSelected=false;
				}
				$scope.complianceCountryIds=[];
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
				for(var i=0;i<$scope.brandlistForAssessment.length;i++){
					//$scope.assbrandIds.push($scope.brandlist[i].id);
					if($scope.assbrandIds.indexOf($scope.brandlistForAssessment[i].id) == -1) {
						  $scope.assbrandIds.push($scope.brandlistForAssessment[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.brandlistForAssessment.length;i++){
					$scope.brandlistForAssessment[i].isSelected=false;
				}
				$scope.assbrandIds=[];
			}		
		};
		
		$scope.addAssBrand=function(id,val){
			  if($scope.assbrandIds.indexOf(id) == -1) {
				  $scope.assbrandIds.push(id);
			  } else{ 
				  $scope.assbrandIds.splice($scope.brandIds.indexOf(id),1);
			  }
			
		};
		//for job posting brands
		$scope.postbrandIds=[];
		$scope.selectAllpostBrands=function(val){
			if(val){
				for(var i=0;i<$scope.brandlistForJobPosting.length;i++){
					//$scope.assbrandIds.push($scope.brandlist[i].id);
					if($scope.postbrandIds.indexOf($scope.brandlistForJobPosting[i].id) == -1) {
						  $scope.postbrandIds.push($scope.brandlistForJobPosting[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.brandlistForJobPosting.length;i++){
					$scope.brandlistForJobPosting[i].isSelected=false;
				}
				$scope.postbrandIds=[];
			}		
		};
		
		$scope.addPostBrand=function(id,val){
			  if($scope.postbrandIds.indexOf(id) == -1) {
				  $scope.postbrandIds.push(id);
			  } else{ 
				  $scope.postbrandIds.splice($scope.postbrandIds.indexOf(id),1);
			  }
			
		};
		
		
		
		
		//for selecting departments
		$scope.assdepIds=[];
		$scope.selectAllAssDept=function(val){
			if(val){
				for(var i=0;i<$scope.departmentlist.length;i++){
					//$scope.assdepIds.push($scope.departmentlist[i].id);
					if($scope.assdepIds.indexOf($scope.departmentlist[i].id) == -1) {
						  $scope.assdepIds.push($scope.departmentlist[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.departmentlistForAssessment.length;i++){
					$scope.departmentlistForAssessment[i].isSelected=false;
				}
				$scope.assdepIds=[];
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
				for(var i=0;i<$scope.positionlistforassessment.length;i++){
					//$scope.assposiIds.push($scope.filterPosition[i].id);
					if($scope.assposiIds.indexOf($scope.positionlistforassessment[i].id) == -1) {
						  $scope.assposiIds.push($scope.positionlistforassessment[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.positionlistforassessment.length;i++){
					$scope.positionlistforassessment[i].isSelected=false;
				}
				$scope.assposiIds=[];
			}
			
		};
		
		$scope.addAssPosi=function(id,val){
			  if($scope.assposiIds.indexOf(id) == -1) {
				  $scope.assposiIds.push(id);
			  } else{ 
				  $scope.assposiIds.splice($scope.assposiIds.indexOf(id),1);
			  }
			
		};
		//selecting position for job posting
		$scope.PostJobposiIds=[];
		$scope.selectAllPostJobPositions=function(val){
			if(val){
				for(var i=0;i<$scope.positionlistforjobposting.length;i++){
					//$scope.assposiIds.push($scope.filterPosition[i].id);
					if($scope.PostJobposiIds.indexOf($scope.positionlistforjobposting[i].id) == -1) {
						  $scope.PostJobposiIds.push($scope.positionlistforjobposting[i].id);
					  }
				}
			}else{
				for(var i=0;i<$scope.positionlistforjobposting.length;i++){
					$scope.positionlistforjobposting[i].isSelected=false;
				}
				$scope.PostJobposiIds=[];
			}
			
		};
		
		$scope.addPostJobPosi=function(id,val){
			  if($scope.PostJobposiIds.indexOf(id) == -1) {
				  $scope.PostJobposiIds.push(id);
			  } else{ 
				  $scope.PostJobposiIds.splice($scope.PostJobposiIds.indexOf(id),1);
			  }
			
		};
		
		
		// for assessment status
		$scope.assStatusIds=[];
		$scope.selectAllAssStatus= function(val){
			if(val){
				for(var i=0;i<$scope.assessmentStatus.length;i++){
					//$scope.assStatusIds.push($scope.assessmentStatus[i].id);
					if($scope.assStatusIds.indexOf($scope.assessmentStatus[i].id) == -1) {
						  $scope.assStatusIds.push($scope.assessmentStatus[i].id);
					  }				
				}
			}else{
				for(var i=0;i<$scope.assessmentStatus.length;i++){
					$scope.assessmentStatus[i].isSelected=false;
				}
				$scope.assStatusIds=[];
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
					//$scope.surveyStatusIds.push($scope.assessmentStatus[i].id);
					if($scope.surveyStatusIds.indexOf($scope.assessmentStatus[i].id) == -1) {
						  $scope.surveyStatusIds.push($scope.assessmentStatus[i].id);
					  }
				
				}
			}else{
				for(var i=0;i<$scope.assessmentStatus.length;i++){
					$scope.assessmentStatus[i].isSelected=false;
				}
				$scope.surveyStatusIds=[];
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
					 
					if($scope.interviewPositionIds.indexOf($scope.interviewPositionList[i].id) == -1) {
						  $scope.interviewPositionIds.push($scope.interviewPositionList[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.interviewPositionList.length;i++){
					$scope.interviewPositionList[i].isSelected=false;
				}
				$scope.interviewPositionIds=[];
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
					//$scope.interviewTempIds.push($scope.interviewTemplates[i].id);
					if($scope.interviewTempIds.indexOf($scope.interviewTemplates[i].id) == -1) {
						  $scope.interviewTempIds.push($scope.interviewTemplates[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.interviewTemplates.length;i++){
					$scope.interviewTemplates[i].isSelected=false;
				}
				$scope.interviewTempIds=[];
			}
		};
		
		$scope.addInterviewTemp=function(id,val){
			  if($scope.interviewTempIds.indexOf(id) == -1) {
				  $scope.interviewTempIds.push(id);
			  } else{ 
				  $scope.interviewTempIds.splice($scope.interviewTempIds.indexOf(id),1);
			  }
			
		};
		
		$scope.appliedPositionIds=[];
		$scope.selectAllApplPositions= function(val){
			if(val){
				for(var i=0;i<$scope.appliedPositionlist.length;i++){
					//$scope.interviewTempIds.push($scope.interviewTemplates[i].id);
					if($scope.appliedPositionIds.indexOf($scope.appliedPositionlist[i].id) == -1) {
						  $scope.appliedPositionIds.push($scope.appliedPositionlist[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.appliedPositionlist.length;i++){
					$scope.appliedPositionlist[i].isSelected=false;
				}
				$scope.appliedPositionIds=[];
			}		
		};
		
		$scope.addApplPosi=function(id){
			
			  if($scope.appliedPositionIds.indexOf(id) == -1) {
				  $scope.appliedPositionIds.push(id);
			  } else{ 
				  $scope.appliedPositionIds.splice($scope.appliedPositionIds.indexOf(id),1);
			  }			
		};
		
		$scope.appliedCategoryIds=[];
		$scope.selectAllApplDept= function(val){
			if(val){
				for(var i=0;i<$scope.appliedCategorylist.length;i++){
					//$scope.interviewTempIds.push($scope.interviewTemplates[i].id);
					if($scope.appliedCategoryIds.indexOf($scope.appliedCategorylist[i].id) == -1) {
						  $scope.appliedCategoryIds.push($scope.appliedCategorylist[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.appliedCategorylist.length;i++){
					$scope.appliedCategorylist[i].isSelected=false;
				}
				$scope.appliedCategoryIds=[];
			}		
		};
		 	
		$scope.addApplDept=function(id){
			
			  if($scope.appliedCategoryIds.indexOf(id) == -1) {
				  $scope.appliedCategoryIds.push(id);
			  } else{ 
				  $scope.appliedCategoryIds.splice($scope.appliedCategoryIds.indexOf(id),1);
			  }			
		};
		
		$scope.appliedBrandIds=[];
		$scope.selectAllApplBrand= function(val){
			if(val){
				for(var i=0;i<$scope.appliedBrandlist.length;i++){
 					if($scope.appliedBrandIds.indexOf($scope.appliedBrandlist[i].id) == -1) {
						  $scope.appliedBrandIds.push($scope.appliedBrandlist[i].id);
					  }			
				}
			}else{
				for(var i=0;i<$scope.appliedBrandlist.length;i++){
					$scope.appliedBrandlist[i].isSelected=false;
				}
				$scope.appliedBrandIds=[];
			}		
		};
		
		$scope.addApplBrand=function(id){
			
			  if($scope.appliedBrandIds.indexOf(id) == -1) {
				  $scope.appliedBrandIds.push(id);
			  } else{ 
				  $scope.appliedBrandIds.splice($scope.appliedBrandIds.indexOf(id),1);
			  }			
		};
		
		// for getting suggestion masterlist
		$scope.fetchSuggestionList= function(tableName,name,listName){
			if(name.length>3){
				$(".loader").show();
				Free_Query_Candidate_Service.fetchSuggestionList(tableName,name).then(function(response){
					if(listName==="countrylist"){
						$scope.countrylist =response.data;
					}else if(listName==="statelist"){
						$scope.statelist =response.data;
					}else if(listName==="citylist"){
						$scope.citylist =response.data;
					}else if(listName==="compcountrylist"){
						$scope.compcountrylist =response.data;
					}
					
					 $(".loader").fadeOut("slow");
				 },function(response){
					 $(".loader").fadeOut("slow");
					});
			}else{
				return false;
			}
		};
		
		$scope.setDatePicker=function()
		{
			$('.dateonly').datetimepicker({	    		
				 format: 'DD-MM-YYYY',
				 useCurrent: false,
	 			     	
			}).on('dp.change', function (e) { $(this).change()});
		};
				
		$scope.setExcludeFlag=function(i,j)
		{
 			if(!($scope.freeQueryCandidateData.configList[i].freeQueryDataList[j].exclude))
			{
				$scope.freeQueryCandidateData.configList[i].freeQueryDataList[j].exclude=true;
				$("#exclude"+i+j).css('color', 'red'); 
				$("#exclude"+i+j).attr('title', 'Excluded');
			    //clicked = false;
			}
			else
			{
				$scope.freeQueryCandidateData.configList[i].freeQueryDataList[j].exclude=false;
				$("#exclude"+i+j).css('color', '#00aeef'); 
				$("#exclude"+i+j).attr('title', 'Exclude');
				//clicked = true;
			}
 		};

		$scope.freeQueryFields=[];
		$scope.addInSelectedFieldsList=function(fieldName)
		{	
 			if($scope.freeQueryFields.indexOf(fieldName) == -1) {
				  $scope.freeQueryFields.push(fieldName);
			  } else{ 
				  $scope.freeQueryFields.splice($scope.freeQueryFields.indexOf(fieldName),1);
			  }
 		};
				
		$scope.generateExcel = function(id){		 
						 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+21+'&queryId='+id+'&roleId='+$rootScope.userdetails.roleId+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
			  $state.reload();
		};
		 
		 $scope.formatCurrency=function(id){
				
				var el=document.getElementById(id);
				var elType = null; // input or other
				var value = null;
				// get value
				if($(el).is('input') || $(el).is('textarea')){
					value = $(el).val().replace(/,/g, '');
					elType = 'input';
				} else {
					value = $(el).text().replace(/,/g, '');
					elType = 'other';
				}
				// if value changes
				$(el).on('paste keyup', function(){
					value = $(el).val().replace(/,/g, '');
					formatElement(el, elType, value); // format element
				});
				formatElement(el, elType, value); // format element				
		};

		function formatElement(el, elType, value){
			var result = '';
			var valueArray = value.split('');
			var resultArray = [];
			var counter = 0;
			var temp = '';
			for (var i = valueArray.length - 1; i >= 0; i--) {
				temp += valueArray[i];
				counter++
				if(counter == 3){
					resultArray.push(temp);
					counter = 0;
					temp = '';
				}
			};
			if(counter > 0){
				resultArray.push(temp);				
			}
			for (var i = resultArray.length - 1; i >= 0; i--) {
				var resTemp = resultArray[i].split('');
				for (var j = resTemp.length - 1; j >= 0; j--) {
					result += resTemp[j];
				};
				if(i > 0){
					result += ','
				}
			};
			if(elType == 'input'){
				$(el).val(result);
			} else {
				$(el).empty().text(result);
			}
		}
	
		$scope.fetchFreeQueryCandidateList = function(id){
			
			$(".loader").show();
			
			Free_Query_Edit_Service.editFreeQuery(id).then(function(response){
				
				  $scope.freeQueryCandidateData = response.data;
				  
				  //console.log($scope.freeQueryCandidateData);
				  
				  $scope.configList=$scope.freeQueryCandidateData.configList;
				  $scope.compliancelist=$scope.freeQueryCandidateData.complianceList;
				  $scope.userJobStatus=$scope.freeQueryCandidateData.userJobStatus;
				  $scope.assessmentStatus=$scope.freeQueryCandidateData.assessmentStatus;
				  $scope.interviewPositionList=$scope.freeQueryCandidateData.positionMasterList;
				  $scope.brandlist=$scope.freeQueryCandidateData.brandList;
				  $scope.brandlistForAssessment=$scope.freeQueryCandidateData.brandListForAssessment;
				  $scope.brandlistForJobPosting=$scope.freeQueryCandidateData.brandListForJobPosting;

				  $scope.departmentlist=$scope.freeQueryCandidateData.categoryList;
				  $scope.departmentlistForAssessment=$scope.freeQueryCandidateData.categoryListForAssessment;
				  $scope.departmentlistForJobPosting=$scope.freeQueryCandidateData.categoryListForJobPosting;

				  $scope.positionlist=$scope.freeQueryCandidateData.positionMasterList;
				  $scope.positionlistforinterview=$scope.freeQueryCandidateData.positionMasterListForInterview;
				  $scope.positionlistforassessment=$scope.freeQueryCandidateData.positionMasterListForAssessment;
				  $scope.positionlistforjobposting=$scope.freeQueryCandidateData.positionMasterListForJobPosting;

				  $scope.qualificationsList=$scope.freeQueryCandidateData.qualificationList;
				  $scope.interviewTemplates=$scope.freeQueryCandidateData.templateList;
				  $scope.documentType=$scope.freeQueryCandidateData.docTypeList;
				  $scope.sourceList=$scope.freeQueryCandidateData.sorceOfInfoList;
				  $scope.freeQueryFields=$scope.freeQueryCandidateData.listOfSelectedFields;
				  $scope.shipList=$scope.freeQueryCandidateData.shipList;			 

				  $scope.sourceIds=response.data.selectedSourceIds;
				  $scope.interviewTempIds=response.data.selectedTemplateIds;
				  $scope.interviewPositionIds=response.data.selectedPositionMasterForInterviewIds;
				  $scope.surveyStatusIds=response.data.selectedSurveytStatusIds;
				  $scope.assStatusIds=  response.data.selectedAssessmentStatusIds;
				  $scope.assposiIds=response.data.selectedPositionMasterForAssessmentIds;
				  $scope.assdepIds=response.data.selectedCategoryForAssessmentIds;
	//			  $scope.assbrandIds=	response.data.selectedBrandIds;
				  $scope.assbrandIds=	response.data.selectedBrandForAssessmentIds;
				  $scope.complianceCountryIds=response.data.selectedCountryForCompliancesIds;
				  $scope.jobStatusIds=response.data.selectedUserJobStatusIds;
				  $scope.docTypeIds=  response.data.selectedDocTypeIds;
				  $scope.complianceIds=response.data.selectedCompliancesIds;
				  $scope.cityIds=response.data.selectedCityIds;
				  $scope.stateIds=response.data.selectedStateIds;
				  $scope.countryIds= response.data.selectedCountryIds;
				  $scope.qualiIds=response.data.selectedQualificationIds;
				  $scope.posiIds=  response.data.selectedPositionMasterIds;
				  $scope.depIds=response.data.selectedCategoryIds;
				  $scope.brandIds=response.data.selectedBrandIds;
				  
				  $scope.postbrandIds=response.data.selectedBrandForJobPostingIds;
				  $scope.postdepIds=response.data.selectedDepartmentForJobPostingIds;
				  $scope.PostJobposiIds=response.data.selectedPositionMasterForJobPostingIds;
				  $scope.shipIds=response.data.selectedShipForJobPostingIds;
	  
				  $scope.appliedPositionlist=$scope.freeQueryCandidateData.appliedPosition;
				  $scope.appliedCategorylist=$scope.freeQueryCandidateData.appliedCategory;
				  $scope.appliedBrandlist=$scope.freeQueryCandidateData.appliedBrand;
				  $scope.appliedPositionIds= $scope.freeQueryCandidateData.selectedAppliedPostingIds;
				  $scope.appliedCategoryIds= $scope.freeQueryCandidateData.selectedAppliedCategoryIds;
				  $scope.appliedBrandIds= $scope.freeQueryCandidateData.selectedAppliedBrandIds;
				  
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
		if($scope.editQueryId != undefined)
		{
			$scope.fetchFreeQueryCandidateList($scope.editQueryId);
		}
		
		
		
		$scope.userType=function(s){
			 
			$scope.showMenu(1);
			
			$scope.freeQueryFields=[];
		//	alert(s);
			if(s==1){
				//$scope.freeQueryFields=[];
			  
				$scope.addInSelectedFieldsList();
				
				
			} else if(s == 2){
				//$scope.freeQueryFields=[];
				
				
				$scope.addInSelectedFieldsList();
			
			}
		};
		
}]);