'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Employee_Ctrl',['$scope','$state','$rootScope','$location','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','GlobalModule_User_activityService','Profile_Service','Employee_Service','dashboardDetails_Service','Admin_Service','Login_Service', function ($scope,$state,$rootScope,$location,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,GlobalModule_User_activityService,Profile_Service,Employee_Service,dashboardDetails_Service,Admin_Service,Login_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$rootScope.showFlag = GlobalModule_dataStoreService.loadData('LoginModule','showFlag'); 
	
	$scope.typeFlag= GlobalModule_dataStoreService.loadData('LoginModule','typeFlag');
	
	
	
	
	$scope.fetchBankFormUrl=function(){
		Login_Service.fetchconfigproperties($scope.user).then(function(response){	    		 
			$scope.propertiesList = response.data;	
			console.log($scope.propertiesList);
		});
	};$scope.fetchBankFormUrl();
	
	$scope.downloadBankForm = function(path){	
		
		if(path.includes("amazonaws"))
		   {
			
				window.open("https://s3.ap-south-1.amazonaws.com/cruisecareer/expensedoc/bank_details_medical_claimsv2.pdf");
		 
		   }
	};
	
	
	
	
	$scope.fetchPostings = function(posting)
	{
		$(".loader").show();		
			
		Employee_Service.fetchPostings(posting,$rootScope.userdetails.id).then(function(response){
				  
				  $scope.currentJobPostings = response.data;
				  if($scope.currentJobPostings != null && $scope.currentJobPostings.length > 0)						  
					  $scope.cPostingFlag=true;
				  else
					  $scope.cPostingFlag=false;
				
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			});		
	};
	
	//console.log($rootScope.showFlag);
	//------------------fetch compliances by job----------   
	  $scope.complianceFlag=false;
	  $scope.compliancesListbyJob=[];
	  $scope.fetchCompliancebyJob=function(){		    					
		  
		  $(".loader").show();
		  var compliance={};
		  compliance.userid=$rootScope.userdetails.id;
		  
		  Employee_Service.fetchCompliancebyJob($rootScope.userdetails.id).then(function(response){
			  
			  $scope.compliancesListbyJob = response.data;	
			  //console.log($scope.compliancesListbyJob);
			  if($scope.compliancesListbyJob != null && $scope.compliancesListbyJob.length > 0)						  
				  $scope.complianceFlag=true;						  
			
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		});	
		  
	 };
	 	 
	 $scope.assessmentList = [{}];
		$scope.fetchAssessmets = function(IsSelf_Assessment){
			
			$scope.cassessFlag=false;
			$scope.sassessFlag=undefined;
			dashboardDetails_Service.fetchAssessmets(IsSelf_Assessment,$scope.userdetails.id).then(function(response){
				$scope.assessmentList = response.data;//assessmentList			
			
				if($scope.assessmentList != null && $scope.assessmentList.length != 0 )
					$scope.cassessFlag=true;
					
				for(var i=0; i<$scope.assessmentList.length; i++){ 
					$scope.assessmentList[i].IsTodaysDate = $scope.compareDate($scope.assessmentList[i].assessmentDate);				 
				} 			 
			});			
		};
		
		/*$scope.fetchSelfAssessments = function(typeId){
			
			$(".loader").show();
			
			$scope.sassessFlag=false;
			$scope.cassessFlag=undefined;
			
			dashboardDetails_Service.fetchSurveyList($scope.userdetails.id,$scope.userdetails.roleId,typeId).then(function(response){
				$scope.SelfAssessmentList = response.data;	
				
				console.log($scope.SelfAssessmentList);
				
				if($scope.SelfAssessmentList != null && $scope.SelfAssessmentList.length != 0)
					$scope.sassessFlag=true;
				
				for(var i=0; i<$scope.SelfAssessmentList.length; i++){ 
					$scope.SelfAssessmentList[i].IsTodaysDate = $scope.compareDate($scope.SelfAssessmentList[i].assessmentDate);				 
				} 	
				
				$(".loader").fadeOut("slow");
				
			});	
		};*/
				
		$scope.fetchSurveysList=function(){
			
			$(".loader").show();
			
			dashboardDetails_Service.fetchSurveysList($scope.userdetails).then(function(response){
				
				$scope.surveyList = response.data;
			
				//console.log($scope.surveyList);
				
			},function(response){
				  
			});	
			
			$(".loader").fadeOut("slow");
		};
		
		
	if($rootScope.showFlag == 2)
	{
		$scope.fetchCompliancebyJob();
		document.getElementById('liEducational').setAttribute("class", "active");
		document.getElementById('liPersonal').setAttribute("class", "");
		document.getElementById('liWork').setAttribute("class", "");
		document.getElementById('liReimbursment').setAttribute("class", "");
		document.getElementById('liSurvey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");			

		document.getElementById('emails1').setAttribute("class", "");
	}
	else if($rootScope.showFlag == 1)
	{
		$scope.postingFlag=1;
		$scope.fetchPostings('current');
		
		document.getElementById('liPersonal').setAttribute("class", "active");
		document.getElementById('liEducational').setAttribute("class", "");		
		document.getElementById('liWork').setAttribute("class", "");
		document.getElementById('liReimbursment').setAttribute("class", "");
		document.getElementById('liSurvey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");			

		document.getElementById('emails1').setAttribute("class", "");
	}
	else if($rootScope.showFlag == 3)
	{
		$scope.assessType=1;
		$scope.fetchAssessmets(false);
		document.getElementById('liWork').setAttribute("class", "active");		
		document.getElementById('liEducational').setAttribute("class", "");
		document.getElementById('liPersonal').setAttribute("class", "");
		document.getElementById('liReimbursment').setAttribute("class", "");
		document.getElementById('liSurvey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");			

		document.getElementById('emails1').setAttribute("class", "");
		
	}else if($rootScope.showFlag == 4){
		document.getElementById('liReimbursment').setAttribute("class", "active");		
		document.getElementById('liEducational').setAttribute("class", "");
		document.getElementById('liPersonal').setAttribute("class", "");
		document.getElementById('liWork').setAttribute("class", "");
		document.getElementById('liSurvey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");			

		document.getElementById('emails1').setAttribute("class", "");
		
		
	}else if($rootScope.showFlag == 5){
		
		$scope.fetchSurveysList();
		document.getElementById('liSurvey').setAttribute("class", "active");
		document.getElementById('liReimbursment').setAttribute("class", "");	
		document.getElementById('liEducational').setAttribute("class", "");
		document.getElementById('liPersonal').setAttribute("class", "");
		document.getElementById('liWork').setAttribute("class", "");	
		document.getElementById('documents').setAttribute("class", "");			

		document.getElementById('emails1').setAttribute("class", "");
	}
else if($rootScope.showFlag == 6){
		
	//	$scope.fetchSurveysList();
	document.getElementById('emails1').setAttribute("class", "active");
		document.getElementById('liReimbursment').setAttribute("class", "");	
		document.getElementById('liEducational').setAttribute("class", "");
		document.getElementById('liPersonal').setAttribute("class", "");
		document.getElementById('liWork').setAttribute("class", "");	
		document.getElementById('liSurvey').setAttribute("class", "");
		document.getElementById('documents').setAttribute("class", "");
		

	}
else if($rootScope.showFlag == 7){
	
	//$scope.fetchSurveysList();
	document.getElementById('documents').setAttribute("class", "active");			

	document.getElementById('emails1').setAttribute("class", "");
	document.getElementById('liReimbursment').setAttribute("class", "");	
	document.getElementById('liEducational').setAttribute("class", "");
	document.getElementById('liPersonal').setAttribute("class", "");
	document.getElementById('liWork').setAttribute("class", "");	
	document.getElementById('liSurvey').setAttribute("class", "");
}
	
	 
	 $scope.usercomplianceid=[];
	 
	$scope.addListOfDocuments=function(compliances){					  		  
		$scope.activity={
				activityid:0
		};
		  if(compliances  ==  "" || compliances == null)
		  {
			  GlobalModule_notificationService.notification("success","Please Add Compliance Info");
			  return;
		  }
  	  var hasfile=0;
  	  var counter = 0;
  	  $(".loader").show();
  	  	  $scope.input=[];
		  for(var i=0;i<compliances.length;i++){
		  compliances[i].userid = $rootScope.userdetails.id;
		  compliances[i].issueDate= $("#issuedate"+i).val();
		  compliances[i].expiryDate=$("#expirydate"+i).val();
		  
		  $scope.input[i] = document.getElementById('documentfilefotodo'+i);
		  
			if($scope.input[i].value!="")
			{
				hasfile = 1;
				$scope.file=[];
				$scope.file[i]=$scope.input[i].files[0];
				var formData = new FormData();
				formData.append("file",$scope.file[i]);
				formData.append("ind",i);
				
				$.ajax({
					url: 'rest/emptodo/upload/compliancedocument',
					type: 'POST',
					data: formData,
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (returndata) {

						$scope.filedtailsForDocument=JSON.parse(returndata);
						compliances[$scope.filedtailsForDocument.index].path=$scope.filedtailsForDocument.fileURL;						
						  counter=counter+1;
						   if(counter == compliances.length){
						   
						   if($scope.usercomplianceid.length > 0){
							   for(var i=0;i<$scope.usercomplianceid.length;i++){
								   var obj ={};obj.id = $scope.usercomplianceid[i];
									compliances.push(obj); 
							   }
							}									   
						   Employee_Service.addComplianceDetails(compliances).then(function(response){
							$scope.flagForCompliance = response.data;
							$scope.usercomplianceid =[];
						    $scope.compliances={};
							if($scope.flagForCompliance != "Failed"){
								GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
								 //$scope.activity.activityid=10;
								// $scope.activity.userid=$rootScope.userdetails.id;
								 // GlobalModule_User_activityService.addUserActivity($scope.activity);
								//$state.go("home");								
								$scope.activity.activityid=10;
								 $scope.activity.userid=$rootScope.userdetails.id;
								  GlobalModule_User_activityService.addUserActivity($scope.activity);
								  
								  $location.path("/dashboard");
								  $(".loader").fadeOut("slow");
								}else{
									GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							}
			
							$(".loader").fadeOut("slow");
							},function(response){
								GlobalModule_notificationService.notification("error","Error In Employye Compliance add");
								$(".loader").fadeOut("slow");
							});  
						   
					};
					}
				});
		}else{
	counter =counter+1;
	}
		  }
if(hasfile == 0 ){
	 if($scope.usercomplianceid.length > 0){
		   for(var i=0;i<$scope.usercomplianceid.length;i++){
			   var obj ={};obj.id = $scope.usercomplianceid[i];
			   compliances.push(obj); 
		   }
		}				 				 
	 for(var i=0;i<compliances.length;i++){
		 compliances[i].userid = $rootScope.userdetails.id;
		 compliances[i].issueDate= $("#issuedate"+i).val();
		 compliances[i].expiryDate= $("#expirydate"+i).val();
	 }
	 //console.log(compliances);
	 Employee_Service.addComplianceDetails(compliances).then(function(response){
			  $scope.flagForCompliance = response.data;
			  $scope.usercomplianceid =[];
			    $scope.compliances={};
			  if($scope.flagForCompliance != "Failed"){
				  GlobalModule_notificationService.notification("success","Your Compliance Details have been added successfully");
				  //$scope.activity.activityid=10;
					 //$scope.activity.userid=$rootScope.userdetails.id;
				  		$scope.activity.activityid=10;
				  		$scope.activity.userid=$rootScope.userdetails.id;
					  GlobalModule_User_activityService.addUserActivity($scope.activity);
					 $location.path("/dashboard");
					  //GlobalModule_User_activityService.addUserActivity($scope.activity);
					 $(".loader").fadeOut("slow");
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
			
			  $(".loader").fadeOut("slow");
		  },function(response){
			  GlobalModule_notificationService.notification("error","Error In User Compliance add");
			  $(".loader").fadeOut("slow");
			}); 	 
      }
	  }; 
	  
	  $scope.fetchComplianceDetails=function()
	  {
		  Employee_Service.fetchComplianceDetails($rootScope.userdetails.id).then(function(response){
			  $scope.compliancesDetails = response.data;
			  //console.log($scope.compliancesDetails);
		  },function(response){
		});
	  };
	  $scope.fetchComplianceDetails();
	  
	  $scope.reload = function()
	  {
		  $state.reload(); 
	  };
	  
	  $scope.fetchCountries = function(){		  
			Profile_Service.fetchCountries().then(function(response){
				  $scope.countryList = response.data;							  
			  },function(response){
					
				});
		  };
	  $scope.fetchCountries();
	  
	  $scope.getflag=function(id)  //--------for whether compliance exist in user complianc or not 
	  {							 
		  $scope.flag=false;
		 
		  for(var i=0;i<$scope.compliancesDetails.length;i++)
		  {
			 
		     if(id==$scope.compliancesDetails[i].compliance.id && $rootScope.userdetails.id==$scope.compliancesDetails[i].userid && $scope.compliancesDetails[i].documentNumber != ' ' && $scope.compliancesDetails[i].issueDate != '' && $scope.compliancesDetails[i].countryOfIssue != null && $scope.compliancesDetails[i].expiryDate != '' && $scope.compliancesDetails[i].path != null)
		    	 {					    						    	 								    	 					    	 
			    	 $scope.flag=true;
			    	 	break;
		    	 }					    	 					    
		  }							 
		  return $scope.flag;					  
	  };
	  
	  $scope.getPathflag=function(id)
	  {					 
			 
		  for(var i=0;i<$scope.compliancesDetails.length;i++)
		  {
			 
		     if(id==$scope.compliancesDetails[i].compliance.id && $scope.compliancesDetails[i].path != null)
		    	 {
		    	 	
			    	 return true;						    	 	
		    	 }					    	 					    
		  }							 
		  return false;
	  };
	  
	  $scope.setTodate=function(e,index){  //----for on check status today's date get displayed
			  
		  $scope.currentDate=(new Date());
					  
		  if($(e).is(":checked"))
			  {
			  
				  $("#completeDate"+e.getAttribute('data-index')).val(moment($scope.currentDate,'YYYY-MM-DD').format("DD-MM-YYYY"));
				  /*$('#file_name'+index).attr('disabled',true);
				  $('#documentfilefotodo'+index).attr('disabled',true);*/			  
			  }
		  else  
			  {						  	
				  $("#completeDate"+e.getAttribute('data-index')).val('');							  
				  /*$('#file_name'+index).removeAttr("disabled");
				  $('#documentfilefotodo'+index).removeAttr("disabled");*/
			  }
	 };
	  
//---------------------------------------------------------------		  
	  $scope.checkFields = function(e,index,id)
	  {							  
		   $scope.str = $('#documentNumber'+e.getAttribute('data-index')).val();
		   $scope.strissdt=$('#issuedate'+e.getAttribute('data-index')).val();
		   $scope.strexpdt=$('#expirydate'+e.getAttribute('data-index')).val();
		   $scope.strcntryiss=$('#countryOfIssue'+e.getAttribute('data-index')).val();					  
		   $scope.sstrpath=$('#file_name'+e.getAttribute('data-index')).val();
		   
		   if($scope.compliancesListbyJob[index].path == '' || $scope.compliancesListbyJob[index].path == undefined)
		   {
				if($scope.sstrpath == '' || $scope.strissdt == '' || $scope.compliancesListbyJob[index].countryOfIssue == '' || $scope.str == '' || $scope.strexpdt == '')
				{							   
				   GlobalModule_notificationService.notification("error","Please Fill mandatory fields");
				   $scope.chckflag=false;
				   $("#chck"+index).prop('checked',false);
				   $("#completeDate"+e.getAttribute('data-index')).val('');							  						
				   return;							  
		        }
		   }
		   else 
		   {
			   if($scope.strissdt == '' || $scope.compliancesListbyJob[index].countryOfIssue == '' || $scope.str == '' || $scope.strexpdt == '')
				{							   
				   GlobalModule_notificationService.notification("error","Please Fill mandatory fields");
				   $scope.chckflag=false;
				   $("#chck"+index).prop('checked',false);
				   $("#completeDate"+e.getAttribute('data-index')).val('');							  						
				   return;							  
		        }
		   }
	  };
	  			  	  
	  $scope.formatDate1 = function(date){		     
	         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
	         return dateOut;
	   };
	 
	   $scope.validateDate = function(compliance,element){  //---------validate issue date and expiry date					   					   
		        if ( new Date(stringToDate(compliance.issueDate,"dd-mm-yyyy","-")) > new Date(stringToDate(compliance.expiryDate,"dd-mm-yyyy","-")) ) { 
		           				          
		          // $scope.compliance.expiryDate='';
				   GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
		        	$('#'+element).val(null);
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
	   				   
	   $scope.validateWorkDate = function(work,element){  //---------validate issue date and expiry date
		   					   		
		        if ( new Date(stringToDate(work.fromDate,"dd-mm-yyyy","-")) > new Date(stringToDate(work.toDate,"dd-mm-yyyy","-")) ) { 
				   GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
		        	//$('#'+element).after('<p>You cannot enter a date from past!</p>');
		        	$('#'+element).val(null);
		            return false;
		        }
		        return true;
		        
	   };	   	   
	  	  	   	   
	   $scope.fileNameChanged = function(element)
	   {
		   
		   var index = angular.element(element).scope().$index;
		   $scope.input=[];		  
		   $scope.input[index] = document.getElementById('documentfilefotodo'+index);
		   
			if($scope.input[index].value!="")
			{
				var filename=$scope.input[index].value;
				filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);
				
				$('#file_name'+index).val(filename);
			}
	   };
    
	   $scope.download = function(path){
		   
			if(path.includes("amazonaws"))
		   {
			$rootScope.getSignedURL(path).then(function(response){
				window.open(response.data);
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		   }
			else
				{
				window.open(path);
				}
		};
		    
		
		$scope.PreviewDocumentEmployee = function(path){
			 
			if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
			{
			$scope.imageFlag=true;
			if(path.includes(".pdf"))
			{
			$scope.imageFlag=false;
			$scope.pdfFlag=true;
			}else{
			$scope.imageFlag=true;
			$scope.pdfFlag=false;
			}
			if(path.includes("amazonaws"))
			{
			$rootScope.getSignedURL(path).then(function(response){

			$scope.fileurl=response.data;
			//console.log(fileurl);
			$scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
			console.log($scope.pdfDocPath);
			},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
			});
			  }
			}

			 else
			 $scope.imageFlag=false;
			if(!(path.includes(".pdf"))){
			  $scope.pdfFlag=false
			}
			};
		
		
		
		
	$scope.toDoList=function(){
		
		$state.go("restricted.eprofile");
		
	};
	
	$scope.cancell=function(){
		
		$location.path("/dashboard");
	};
	
	$scope.postingView=function(posting)
	{
		$(".loader").show();
		
		if(posting == 'current')
		{
			$scope.postingFlag=1;
			$scope.fetchPostings(posting);
		}
		else if(posting == 'past')
		{
			$scope.postingFlag=2;
			$scope.fetchPostings(posting);
		}
		else if(posting == 'future')
		{
			$scope.postingFlag=3;
			$scope.fetchPostings(posting);
		}
	};
	
	//------------Assignment ----------------------------------------------
	
	$scope.switchAssessment =function(id){
		
		 $(".loader").show();
		
		if(id == 1){
			$scope.assessType=1;
		}
		if(id == 2){
			$scope.assessType=2;
		}		
		$(".loader").fadeOut("slow");
	};

	$scope.formatDate = function(date){
        var dateOut = new Date(date);       
        return dateOut;
  };
  
  $scope.compareDate = function (dateOut){	   
	  var today = new Date();
	  var outDate = new Date(dateOut);
	  
	  $scope.isToday = (today.toDateString() == outDate.toDateString());
	  return $scope.isToday;
  };
    	  		  
	$scope.fetchqestn = function(assessmentObj){
		
		$scope.selectedAssessment = assessmentObj; 		
		GlobalModule_dataStoreService.storeData('LoginModule','SelectedAssessment',$scope.selectedAssessment);			
		GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',$scope.typeFlag);		
				
		 $state.go('restricted.testPlayer');
		 //window.open(url,'_blank');
		 
		 //window.top.close();		 
	};
	
	/*$scope.openLaunchModel = function(){		
		$('#start-assessment').modal({backdrop: 'static', keyboard: false});			
	};*/
	
	
	$(document).ready(function(){
		$('#start-assessment-question').on('hidden.bs.modal', function () {
			if($scope.question.questionMediaType==2){
			 var audio = document.getElementById("audioMedia");
			 audio.load();
			 }
			else if($scope.question.questionMediaType==3){
			    var video = document.getElementById("mediaVideo");
			    video.load();
			}
			    $scope.MediaLink="";			    
	    });
		});
	
	
	$scope.openquestionModel = function(){
		
		$scope.currentQuestionNo = 1;				
		$scope.question = $scope.questionList[$scope.currentQuestionNo-1]; 
		$('#start-assessment').modal("hide");
		$('#start-assessment-question').modal({backdrop: 'static', keyboard: false});
		
	};
	
	$scope.submitAndNext = function(){		
		if($scope.currentQuestionNo == $scope.questionList.length){		
			$('#start-assessment-question').modal("hide");
			GlobalModule_notificationService.notification("success","Assessment completed sucessfully");		
			
			//call save status query for status change,save score and assess by 0(0 for assessment done by system)		
			dashboardDetails_Service.saveStatus($scope.selectedAssessment,$scope.userdetails.id).then(function(response){
				var result = response.data;					
				$scope.fetchSelfAssessments();
				$scope.fetchAssessmets(false);
			});						
			
		}else{
			$scope.currentQuestionNo = $scope.currentQuestionNo+1;		
			$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
		}
			
	};
	
	$scope.multipleselect =[];
	$scope.saveAns = function(ans){
	
		if(ans == undefined){
			ans = {};
			ans.text = "";
		}

		for(var i=0; i<$scope.chechboxIds.length;i++){
			$scope.multipleselect.push({id:$scope.chechboxIds[i]});
		};		
		
		var assessmentAnsObj ={};				
		assessmentAnsObj.questn ={};
		
		assessmentAnsObj.questn = $scope.question;
		assessmentAnsObj.questn.shortAns = ans.text;		
		assessmentAnsObj.questn.ans = $scope.multipleselect;
		assessmentAnsObj.questn.selectedAns = $scope.RedioId;		
		assessmentAnsObj.assessment = $scope.selectedAssessment;
		assessmentAnsObj.createdby = $scope.userdetails.id;	
	
		//console.log(assessmentAnsObj.assessment);
		dashboardDetails_Service.saveAssessmentAns(assessmentAnsObj).then(function(response){
			$scope.response = response.data;		
			 
			var assessmentAnsObj ={};	
			assessmentAnsObj.questn ={};
			$scope.multipleselect =[];
			$scope.chechboxIds = [];	
			$scope.ans = {};
			$scope.ans.text = "";
			 
			
		});			
	};

	$scope.checkCamera = function(a){
		 $(".loader").show();
		 if(a.questionCount == 0)
		 {
			 GlobalModule_notificationService.notification("error","This assessment don't have questions");
			 $(".loader").fadeOut("slow");
			 return;
		 }
		/* if (navigator.mediaDevices.getUserMedia) {
				//errorFlag= false;
			 console.log("getUserMedia supported");
				 navigator.mediaDevices.getUserMedia(
	
				    {
				       video: true,
				       audio: false
				    }, success, error );
				 ,function (err) {
				    	return false;
				        next(new Error('user not found'));
				    },function (success){
				    	console.log("getUserMedia supported complete");
				    	return true;
				    }
				
				    // successCallback
				    function success() {
				    	//alert("camera found");
				    	$scope.errorFlag=true;
				    	//localStorage.setItem("CameraStatus", true);
				    	//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',true);
				    	 console.log("getUserMedia supported complete:camera found");
				    	 $scope.fetchqestn(a); 
				    	
				    }
				
				    // errorCallback
				    function error() {
				    	$scope.errorFlag=false;
				    	$(".loader").fadeOut("slow");
				       console.log("The following error occured: ");
				       //localStorage.setItem("CameraStatus", false);
				       //GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
				       alert("The following error occured: Web-cam not found.Please enable your webcam and launch the test again");
			 			 
				    }
				    $scope.errorFlag=true;
				    console.log("getUserMedia supported complete");
				    $(".loader").fadeOut("slow");
				   // alert("Launch");
				} else {
					$scope.errorFlag=false;
					//localStorage.setItem("CameraStatus", false);
					//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
					alert("Web-cam not found");
				 console.log("getUserMedia not supported");
				
				} */	
		 
		 
		 navigator.mediaDevices.getUserMedia({
			       video: true,
			       audio: false,
			    }).then(function(stm)  {
			    	
			    	$scope.errorFlag=true;
			    	//localStorage.setItem("CameraStatus", true);
			    	//GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',true);
			    	// console.log("getUserMedia supported complete:camera found");
			    	 $scope.fetchqestn(a); 
			    	
				    }).catch(function(error){
				    
				    	console.log(error);
				    	$(".loader").fadeOut("slow");
				    	$scope.errorFlag=false;
				    	$(".loader").fadeOut("slow");
				       //console.log("The following error occured: ");
				       //localStorage.setItem("CameraStatus", false);
				       //GlobalModule_dataStoreService.storeData('LoginModule','CameraStatus',false);
				       alert("The following error occured: Web-cam not found.Please enable your webcam and launch the test again");
			 			 
		    });						 
	 };
	
	$scope.chechboxIds = [];
	$scope.checkBox = function(ansId,check){		
		
		if(check==true){
			$scope.chechboxIds.push(ansId);	
		}
		else{
			var index = $scope.chechboxIds.indexOf(ansId);
			$scope.chechboxIds.splice(index,1);
		}	    	
	    };	
	    
	    
	    $scope.checkRedio = function(id){
	    	$scope.RedioId = id;	    	
	    }; 
	    
	    $scope.fetchSurveyQestn=function(surveyObj){
	    	
	    	$scope.selectedSurvey=surveyObj;
	    	GlobalModule_dataStoreService.storeData('LoginModule','selectedSurvey',$scope.selectedSurvey);			
			GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',$scope.typeFlag);		
			GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',false);	
					
			$state.go('restricted.testPlayer');						 				    	
	    };
	    
	    
	  //************Expense Module*****************************//
	 
	$scope.fetchExpenseStatus = function(){			
			Employee_Service.fetchExpenseStatus().then(function(response){				  
				  $scope.expenseStatuslist = response.data;		
				 //console.log($scope.expenseStatuslist);
			});
		};
	$scope.fetchExpenseStatus();
						
				$scope.fetchEmployeeExpenseList = function(offset,limit,colName,order,search,userid,RoleId){
					
					$(".loader").show();
					
					if(search=="" || search==null)
					  {
					  search= undefined;
					  }
				  if(colName == null || colName== ""){
						 colName = undefined;
					 }
					 if(order == null){
						 order = undefined;
					 }
					
					Employee_Service.fetchEmployeeExpenseList(offset,limit,colName,order,search,userid,RoleId,0).then(function(response){
						  $scope.employeeExpenseList = response.data; 		
						 //console.log($scope.employeeExpenseList);
						});	
					
					$(".loader").fadeOut("slow");
				};
				$scope.fetchEmployeeExpenseList(0,1000,null,null,null,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
				
				
				$scope.SortingExpenseList = function(colName,searchterm){
					 
					$(".loader").show();
					  $scope.offset =0;
					  $scope.start = 0;
					  $scope.colName=colName;

						if($scope.order == undefined || $scope.order=="desc" && $scope.order != undefined)
						{
							$scope.order ="asc";
						}
						else if($scope.order != undefined && $scope.order=="asc")
						{
							$scope.order = "desc";
						}
						if($scope.search=="" || $scope.search == null)
						{
						  $scope.search= undefined;						  
						}
						if($scope.colName == null)
						{
						  $scope.colName = undefined; 
						}	
						
						$(".loader").fadeOut("slow");
						
						$scope.fetchEmployeeExpenseList(0,10,$scope.colName,$scope.order,$scope.search,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
					};
				
				$scope.fecthExpenseListCount = function(search,categoryId,statusId,EmpId,RoleId){
					Employee_Service.fecthExpenseListCount(search,categoryId,statusId,EmpId,RoleId).then(function(response){
						  $scope.EmployeeExpenseListCount = response.data; 	
						  //console.log($scope.EmployeeExpenseListCount);
						});	
				};			 
				//-----------------pagination-----------------------------

			 	$scope.offset=0;
				$scope.limit=10;
				$scope.navButtons = [];
				 $scope.setButton = function(){
						$scope.navButtons = [];
						
							for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
							$scope.navButtons.push(j);
							}
							$scope.fetchEmployeeExpenseList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,0,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
							  
						};  
						
						/*$scope.fecthExpenseListCount = function(search,categoryId,statusId,EmpId,RoleId){
						
						$scope.offset =0 ;
						$scope.navButtons = [];
						$scope.count= 0 ;
						$scope.start = 0;
						$scope.search=search;
						if($scope.colName == null){
							$scope.colName = undefined;
						 }
						 if($scope.order == null){
							 $scope.order = undefined;
						 }
						 if($scope.search=="" || $scope.search == null)
						  {
						  $scope.search= undefined;  
						  }
						
						 Employee_Service.fecthExpenseListCount($scope.search,categoryId,statusId,EmpId,RoleId).then(function(response){							
							$scope.count = response.data;
							
							//console.log($scope.count);
							if($scope.count>$scope.limit){
								$scope.setButton();
							}
						
						},function(response){
								
						});		
					};
					$scope.fecthExpenseListCount(null,0,0,$rootScope.userdetails.id,$rootScope.userdetails.roleId);*/	
					 
					 $scope.goToClaimedList= function(expenseObj,flag){
						 
						GlobalModule_dataStoreService.storeData('LoginModule','claimFlag', flag); 

						GlobalModule_dataStoreService.storeData('LoginModule','expenseObj', expenseObj);
							
						GlobalModule_dataStoreService.storeData('LoginModule','claimeFlag', true);
							
						$state.go("restricted.claimReimbursment");
												 
					 };
					 
	/*--------------------Column Setting for reimbursement-----------------*/				 
					 $scope.getSettings = function(){
						 $(".loader").show();
							Admin_Service.getSettings($rootScope.userdetails.id,8).then(function(response){
								  $scope.columnlist = response.data;
								  
								  //console.log($scope.columnlist);
								  
								  $scope.columnlist.splice(10,1);
								 // console.log($scope.columnlist);
								var count=0;
										for(var i=0;i<$scope.columnlist.length;i++){
											if($scope.columnlist[i].name=='Claim No.' && $scope.columnlist[i].isActive==false){
												for(var j=0;j<$scope.columnlist.length;j++){
													if($scope.columnlist[j].name=='Claim No.' || $scope.columnlist[j].name=='Date of claim' || $scope.columnlist[j].name=='Type of reimbursement' || $scope.columnlist[j].name=='Claimed Amount' || $scope.columnlist[j].name=='Approved amount' || $scope.columnlist[j].name=='Status'){
														$scope.columnlist[j].isActive=true;
													}
												}
											}
											if($scope.columnlist[i].isActive==true)
												{
												count++;
												}
										}
								
							if(count==$scope.columnlist.length)
								{
								$scope.colcheck=true;
								}else{
									$scope.colcheck=false;
								}
								  $(".loader").fadeOut("slow");
							},function(response){
								$(".loader").fadeOut("slow");
								});
							
							$(".loader").fadeOut("slow");
						};
						$scope.getSettings();
						
						$scope.savesettings = function(){
							$(".loader").show();
							var count=0;
							for(var i=0;i<$scope.columnlist.length;i++){
								if($scope.columnlist[i].isActive==true)
									{
									count++;
									}
							}

							if(count==$scope.columnlist.length)
							{
							$scope.colcheck=true;
							}else{
								$scope.colcheck=false;
							}	
							Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
								  $scope.savesetFlag = response.data;
								  //console.log($scope.savesetFlag);
							});
							$(".loader").fadeOut("slow");
						};
						
								$scope.activeColumn = function(columnName)
								{
									$(".loader").show();
									if($scope.columnlist != undefined){
									for(var i=0;i<$scope.columnlist.length;i++){
										if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
										{
											$(".loader").fadeOut("slow");
											return true;
										}											
									}
									}
									$(".loader").fadeOut("slow");
									return false;
								};
						
						
						$scope.selectAllColoumns = function(check)
						{
							$(".loader").show();
							if(check==true)
								{
								for(var i=0;i<$scope.columnlist.length;i++){
									 $scope.columnlist[i].isActive=true;
										
								}
								}else{
									for(var i=0;i<$scope.columnlist.length;i++){
										if($scope.columnlist[i].name=='Claim No.' || $scope.columnlist[i].name=='Date of claim' || $scope.columnlist[i].name=='Claimed Amount' || $scope.columnlist[i].name=='Approved amount' || $scope.columnlist[i].name=='Status'){
											$scope.columnlist[i].isActive=true;
											}else{
												$scope.columnlist[i].isActive=false;
											}
										}
										
									}
							$(".loader").fadeOut("slow");
						};
					 
	//--------------------------------------------------------------------------------------------------------------------				 
					 
					 $scope.formatDate = function(date){
						 if(date != null || date == ' ' || date != undefined)
				         {
							 var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
					         return dateOut;
				         }
						 return;
				   };
				   
		 		
}]);