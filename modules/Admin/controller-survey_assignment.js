'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('survey-assignment_Ctrl',['$scope','$rootScope','$state','$timeout','$stateParams','Login_Service','Admin_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','GlobalModule_User_activityService','assessEngine_Service','survey_assignment_Service', function ($scope,$rootScope,$state,$timeout,$stateParams ,Login_Service,Admin_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,GlobalModule_User_activityService,assessEngine_Service,survey_assignment_Service){
	
	$scope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.surveyId = GlobalModule_dataStoreService.loadData('LoginModule','surveyId');
	
	$scope.surveyName = GlobalModule_dataStoreService.loadData('LoginModule','surveyName');
		
	$scope.brandsList = function(){
		
		$(".loader").show();
		
		  Login_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
		  
		$(".loader").fadeOut("slow");	  
		  },function(response){
				
			});
	  };
	$scope.brandsList();

	$scope.fetchCategoryList = function(){
		
		$(".loader").show();
		
		  Login_Service.fetchCategoryList().then(function(response){
			  $scope.categoryList = response.data;	
			  
		$(".loader").fadeOut("slow");
		  },function(response){
				
			});
	  };	  
	$scope.fetchCategoryList();
	
	
	$scope.fetchpositonbydipartment = function(id){
		
		$(".loader").show();
		
		if(id == undefined || id == 0)
		{
			$(".loader").fadeOut("slow");
			return;
		}
		
		  Admin_Service.fetchpositonbydipartment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
			  
		$(".loader").fadeOut("slow");
		  },function(response){				
			});		  
		  };
		  
	$scope.fetchShipsbyBrand=function(id){
		
		$(".loader").show();
		if(id == undefined || id == 0)
		{
			$(".loader").fadeOut("slow");
			return;
		}
		assessEngine_Service.fetchshiplist(id).then(function(response){
			
			$scope.shipsList = response.data;
			
			$(".loader").fadeOut("slow");	
				  ////console.log($scope.shipsList);
		},function(response){				
		});		  
	};
	
	
	$scope.SurveyforList = [{id:1,name:'Candidate'},{id:2,name:'Employee'}];
	
	$scope.CandiateSurveyFor = [{id:1,name:'Applied'},{id:5,name:'Shortlisted'},{id:2,name:'Selected'}];
	
	$scope.emplDetailFlag=false;
	$scope.candidateFlag=false;
	$scope.setFlag = function(id){
		//alert(id);				
		$('#userdetail').val(null);
		if(id != 2 || id != 3)
		{
			$scope.emplDetailFlag=true;
			
			if(id == 2){			
				$scope.shipListFlag = true;
				$scope.candidateFlag=false;
			}
			if(id != 2){
				$scope.shipListFlag = false;			
				$scope.candidateFlag=true;
			}
		}
		else
		{
			$scope.emplDetailFlag=false;
		}
	};
	
	$scope.fetchUserDetails=function(search,roleId){
		
		var numval='^[0-9]$';
		
		if(search=="")
		  {
		 
		  }
		else if(search.charAt(0).match(numval) && roleId == 1)
			{
				GlobalModule_notificationService.notification("error","Ref. no. should start with 'C-'");
				return;
			}
	  else{
		  
	  if(search.length>3){
	  
		survey_assignment_Service.fetchEmployeeDetails(search,roleId).then(function(response){
			
		  $scope.userDetailsList = response.data;

		  $scope.EmployeeNumberList=[];
		  
		  if(search.charAt(0) >= 0 && search.charAt(0) <= 9)
		  {
			  
			  for(var i=0;i<$scope.userDetailsList.length;i++)
			  {
				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].empl_number});
			  }
		  }
		  else if((search.charAt(0) == 'C' || search.charAt(0) == 'c') && search.charAt(1) == '-')
		  {			 
			  for(var i=0;i<$scope.userDetailsList.length;i++)
			  {
				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].empl_number});
			  }
		  }
		  else
		  {
			  for(var i=0;i<$scope.userDetailsList.length;i++)
			  {
				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList[i].id , detail:$scope.userDetailsList[i].email});
			  }
		  }
		  
	  },function(response){
		  
		});	 
	  }
	  }		
	};

	$scope.fetchAssignedList=function(id){
		
		$(".loader").show();
		
		$scope.checkBoxFlag=false;
		
		survey_assignment_Service.fetchAssignedList(id).then(function(response){
			
			  $scope.surveyList = response.data;			  
			  ////console.log($scope.surveyList);
			  for(var i=0;i<$scope.surveyList.length;i++)
			  {
				  if($scope.surveyList[i].assignFlag == 0)
				  {
					  $scope.checkBoxFlag=true;
					  break;
				  }
			  }
			  ////console.log($scope.surveyList);
			  
		$(".loader").fadeOut("slow");
		  },function(response){				
			});
		
	};
	$scope.fetchAssignedList($scope.surveyId);
		
	$scope.surveyObject={};
	$scope.assignSurvey=function(survey){
		
		$(".loader").show();
		
		if(survey == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select mandatory fields");
			$(".loader").fadeOut("slow");
			$state.reload();
			return;
		}
		
		var numval='^[0-9]$';
		
		if(survey.roleId == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select Candidate or Employee");
			$(".loader").fadeOut("slow");
			return;
		}		
		else if(survey.startDate == undefined || survey.endDate == undefined)
		{
			GlobalModule_notificationService.notification("error","Start Date and End Date are mandatory");
			$(".loader").fadeOut("slow");
			return;
		}
		else if(survey.roleId == 1 && survey.candidateSurveyFor == undefined && ($('#brandid').val() != '' || $('#categoryid').val()  != '' || $('#positionid').val()  != ''))
		{
			GlobalModule_notificationService.notification("error","Select Candidate survey for");
			$(".loader").fadeOut("slow");
			return;
		}
		else if(survey.employerName != undefined)
		{
			if(survey.employerName.charAt(0).match(numval) && survey.roleId == 1)
			{
				GlobalModule_notificationService.notification("error","Ref. no. should start with 'C-'");
				$(".loader").fadeOut("slow");
				return;
			}
		}
		if(survey.employerName != undefined)
		{
			if((survey.employerName.charAt(0) >= 0 && survey.employerName.charAt(0) <= 9))
			  {
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{					
					if($scope.userDetailsList[i].empl_number == survey.employerName)
					{
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						$scope.surveyObject=survey;
						break;
					}					
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Employee number");
					$(".loader").fadeOut("slow");
					return;
				}
			  }
			else if((survey.employerName.charAt(0) == 'C' || survey.employerName.charAt(0) == 'c') && survey.employerName.charAt(1) == '-')
			  {
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{					
					if($scope.userDetailsList[i].empl_number == survey.employerName)
					{	
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						$scope.surveyObject=survey;
						break;
					}
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Reference number");
					$(".loader").fadeOut("slow");
					return;
				}
			  }
			else
			  {				
				var m=0;
				for(var i=0;i<$scope.userDetailsList.length;i++)
				{
					if($scope.userDetailsList[i].email == survey.employerName)
					{
						m++;
						survey.userId=$scope.userDetailsList[i].id;
						//$scope.surveyObject.push(survey);
						$scope.surveyObject=survey;
					}
				}
				if(m==0)
				{
					GlobalModule_notificationService.notification("error","Invalid Email");
					$(".loader").fadeOut("slow");
					return;
				}
			  }
		}
		else
		{
			//$scope.surveyObject.push(survey);
			$scope.surveyObject=survey;
		}
		
		
			$scope.surveyObject.userid=$scope.userdetails.id;
			$scope.surveyObject.saurveyId=$scope.surveyId;
				
		////console.log($scope.surveyList);
		
		survey_assignment_Service.assignSurvey($scope.surveyObject).then(function(response){
			$scope.assignSurvey = response.data;
			
			if($scope.assignSurvey.indexOf("success")!=-1){
								
				$scope.fetchAssignedList($scope.surveyId);
				
				$(".loader").fadeOut("slow");
				
				GlobalModule_notificationService.notification("success","Survey assigned successfully");
				
				
				
				$('#emp-user').val(undefined);
		    	$('#startDate').val(null);
		    	$('#endDate').val(null);
		    	//$('#userdetail').val(null);
		    	//$("#assignTo").hide();
		    	
		    	$scope.brandId=null;
		    	
		    	$scope.shipListFlag = false;
		    	$scope.shipsId = null;
		    	$scope.categoryId = null;
		    	$scope.positionid = null;
		    	$scope.employerName = null;
				
			}
		else if($scope.assignSurvey =='failed'){
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}
			
		},function(response){				
		});
		
			$state.reload();
		
		$(".loader").fadeOut("slow");
	};
	
	
	$scope.publishSurvey=function(){
		
		$(".loader").show();
		
		if($scope.getCheckedId.length == 0)
		{
			GlobalModule_notificationService.notification("error","Please select any record");
			$(".loader").fadeOut("slow");
			return;
		}
		else
		{
			survey_assignment_Service.publishSurveyList($scope.getCheckedId).then(function(response){
				
				$scope.publishSurvey = response.data;
				
				if($scope.publishSurvey.indexOf("success")!=-1){
	
					GlobalModule_notificationService.notification("success","Your Assignment list published successfully");
			
					$scope.fetchAssignedList($scope.surveyId);
					
	    	
				}
				else{
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				}
			
			},function(response){				
			});
		}
		$state.reload();
		$(".loader").fadeOut("slow");
		
	};
			
	$scope.disableInput=false;
	$scope.disableCombination=true;
	$scope.disableFlag=function(flag){
		
		$(".loader").show();
		
		if(flag == 1)
		{
			$scope.disableInput=false;
			$scope.disableCombination=true;
		}
		else if(flag == 2)
		{
			$scope.disableCombination=false;
			$scope.disableInput=true;
		}
		
		$(".loader").fadeOut("slow");
		
	};
	
	
	$scope.deleteFromSurveyList=function(id){
				
		$(".loader").show();
		
		survey_assignment_Service.deleteFromSurveyList(id).then(function(response){
			
			$scope.removeSurvey = response.data;
			
			if($scope.removeSurvey.indexOf("success")!=-1){
				
				$scope.fetchAssignedList($scope.surveyId);
				
				GlobalModule_notificationService.notification("success","Record deleted successfully");
				
				$("#deletelist").modal('hide');
				$('.modal-backdrop').hide();
			}
			else{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}
			
		},function(response){				
		});
		
		$state.reload();
		
		$(".loader").fadeOut("slow");
		
	};
	
	
	$scope.getCheckedId=[];
	
	$scope.checkedAssignedList = function(id){			  

		if($scope.getCheckedId.indexOf(id) !== -1)
		{		
			var array  = $scope.getCheckedId;
			var index = array.indexOf(id);
			$scope.getCheckedId.splice(index,1);
		}else
		{		    	
			$scope.getCheckedId.push(id);				      
		};
		////console.log($scope.getCheckedId);
	};
	
	$scope.checkedAllList = function(list,rd){				  
		if(rd == true || rd == undefined){				 
			for(var i=0; i<list.length; i++){					  

				//if already exist in getCheckedcomplianceid than don't pass
				if($scope.getCheckedId.indexOf(list[i].id) !== -1)   {  						 
				}else if(list[i].assignFlag == 0){

					$scope.checkedAssignedList(list[i].id);	
				}

			}			
		}else{
			$scope.getCheckedId=[];
		}
	};

	$scope.cancel  = function()
	{
		$state.go("restricted.admin.surveymaster");
	};
	
	$scope.openDeleteModal = function(id)
	{
		$scope.deleteId=id;
		$("#deletelist").modal('show');
	};
	
	$scope.validateDate = function(element){ 
			
		var startDate=$("#startDate").val();
		var endDate=$("#endDate").val();
        if ( new Date(stringToDate(startDate,"dd-mm-yyyy","-")) > new Date(stringToDate(endDate,"dd-mm-yyyy","-")) ) { 
           				                    
	        $('#'+element).val(null);
			GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
		   
            return false;
        }
        return true;
	};  
        function stringToDate(_date,_format,_delimiter)
		   {
		               var formatLowerCase=_format.toLowerCase();
		               var formatItems=formatLowerCase.split(_delimiter);
		               var dateItems=_date.split(_delimiter);
		               var monthIndex=formatItems.indexOf("mm");
		               var dayIndex=formatItems.indexOf("dd");
		               var yearIndex=formatItems.indexOf("yyyy");
		               var month=parseInt(dateItems[monthIndex]);
		               month-=1;
		               var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
		               return formatedDate;
		   }

}]);
