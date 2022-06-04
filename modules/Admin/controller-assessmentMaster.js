var controllers = angular.module('LoginModule');

controllers.controller('Assessmentmaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','assessEngine_Service','dashboardDetails_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,assessEngine_Service,dashboardDetails_Service,Admin_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    $scope.MasterScreenId = GlobalModule_dataStoreService.loadData('LoginModule','screenId');
    
  //----------------View/fetch Assessment list ------------------------- 
	 $scope.fetchAssessmentMaster = function(offset,limit,colName,order,search,brandId,departId,positionId,categoryId){	
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
			 
		 Master_Service.fetchAssessmentMaster(offset,limit,colName,order,search,brandId,departId,positionId,categoryId).then(function(response){
			 $scope.assessmentList=response.data;
			 //console.log($scope.assessmentList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchAssessmentMaster(0,10,null,null,null,0,0,0,1);
	 
	 $scope.openAssessmentQuestionPage=function(assessmentId){
		 
		 GlobalModule_dataStoreService.storeData('LoginModule','assessmentId',assessmentId);
		 $state.go("restricted.admin.assessmentquestionsequencing");
	 };
	  
	 $scope.openSurveyQuestionPage=function(surveyId){
		 
		 GlobalModule_dataStoreService.storeData('LoginModule','surveyId',surveyId);
		 $state.go("restricted.admin.surveyQuestionList");
	 };
	 
	 ////...............something is left  sorthing 
	 
	 
	 
	 
	 $scope.SortingAssessmentMasterList = function(colName,searchterm){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search=="" || $scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
			if($scope.colName==null)
			  {
			  $scope.colName= undefined; 
			  }
			$scope.fetchAssessmentMaster(0,10,$scope.colName,$scope.order,$scope.search,0,0,0,1);	
		};
	 
	 //------pagination--------------
		
	 	$scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}		
				 $scope.fetchAssessmentMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,0,0,1);
			};
			
	  $scope.getAssessmentCount=function(search,categoryid){
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=search;
			$scope.categoryid = categoryid;
			if($scope.search==null || $scope.search=="")
			  {
				$scope.search= undefined;
			  }
		  if($scope.colName == null || $scope.colName== ""){
			  $scope.colName = undefined;
			 }
			 if($scope.order == null){
				 $scope.order = undefined;
			 }
			 Master_Service.getAssessmentCount($scope.search,$scope.categoryid).then(function(response){
				$scope.count = response.data;
				//console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getAssessmentCount(null,1);
	    
		
		$scope.previous = function() {
			$scope.start =  $scope.start - 5;
	        $scope.offset = $scope.start * $scope.limit;
	        $scope.setButton();
	     
	    };

	    $scope.next = function() {
	    	$scope.start =  $scope.start + 5;
	        $scope.offset = $scope.start * $scope.limit;
	      
	        $scope.setButton(); 
	      
	    };
	    
	    $scope.current = function(page) {  
	        $scope.offset = page * $scope.limit;
	        $scope.fetchAssessmentMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,0,0,1);
	    };
	    
	    
	    //----pagination end------
	   
	 
	 
  
	 
	 
		
		//----------------delete Assessment from list ------------------------- 
		  
		   //----------Get no of checked position-------
				  
				  $scope.getCheckedAssessmentid=[];
				  
				  $scope.checkedAssessmentList = function(id){		  
					  
					  if($scope.getCheckedAssessmentid.indexOf(id) !== -1)
					  {		
					  var array  = $scope.getCheckedAssessmentid;
					  var index = array.indexOf(id);
					  $scope.getCheckedAssessment.splice(index,1);
					  }else
					  {		    	
				      $scope.getCheckedAssessmentid.push(id);				      
					  };						  
				  };
				 
				  $scope.checkedAllList = function(listedAssessment,rd){				  
					  if(rd == true || rd == undefined){				 
					  for(var i=0; i<listedAssessment.length; i++){					  
						  
						  //if already exist in getCheckedtemplateid than don't pass
						  if($scope.getCheckedAssessmentid.indexOf(listedAssessment[i].id) !== -1)   {  						 
						  }else{
							  $scope.checkedAssessmentList(listedAssessment[i].id);	
						  }
						  
					  }			
					  }else{
						  $scope.getCheckedAssessmentid=[];
					  }
				  };
				  
				  
				  $scope.check = function(){	
					
				  if($scope.getCheckedAssessmentid.length == 0){
					  GlobalModule_notificationService.notification("error","Please select any record");
					  }
				  else{				  
					  $('#deletelist').modal('show');
					  }			  
				  };
			//-----------------------------------------------------------------------	  
				
		
$scope.deletefromList = function(formlist){
	  
	  $(".loader").fadeOut("slow");
	  $scope.formlist=formlist;
	    $("#deletelist").modal('show');
		  Master_Service.deleteAssessmentFromList($scope.formlist,$scope.getCheckedAssessmentid).then(function(response){
		  $scope.assessmentflag = response.data;	
		  $scope.getAssessmentCount(null,1);
		  $scope.fetchAssessmentMaster(0,10,null,null,null,0,0,0,1);
		  $scope.getCheckedAssessmentid=[];
		  if($scope.assessmentflag.indexOf("success")!=-1){
			  GlobalModule_notificationService.notification("success","Record deleted successfully");
		  }else{
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		  }
		  $(".loader").fadeOut("slow");
	  },function(response){
		  $(".loader").fadeOut("slow");
		});
};

//..............................\\
		
		
//-----------------save/insert assessment  in list-----------------------	

/*$scope.saveAssessmentDetails=function(assessment){ 
	  	
	  
	  $(".loader").fadeOut("slow");
	  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
	  
  	if(assessment.assessmentName != undefined && assessment.assessmentName.match(letterNumber)){
	  
	 
	  assessment.userid=$rootScope.userdetails.id;
	  
		 Master_Service.saveAssessmentDetails(assessment).then(function(response){
			  $scope.saveAssessmentFlag= response.data;
			  $scope.getAssessmentCount(null);
			  $scope.fetchAssessmentMaster(0,10,null,null,null);
			  assessment.assessmentName="";
			 $state.go('restricted.admin.assessmentmaster');
			
			 if($scope.saveAssessmentFlag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Your Assessment Details saved successfully");
				  $("#add_assessment").modal('hide');
			 }
			 else if($scope.saveAssessmentFlag =='failed'){
				  GlobalModule_notificationService.notification("error","Assesment Name already exist");
				  $("#add_assessment").modal('hide');
			 }
			 else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			      }
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			 
		  });
  	}	    	
  	  else
  		{
  		GlobalModule_notificationService.notification("error","Please enter valid value");
  		}
	  };*/
		  
	  
	  
	  $scope.assessmentmaster={};
	  $scope.assessmentdata=function(p){
		  $scope.assessmentmaster.id=p.id;
		  $scope.assessmentmaster.assessmentName=p.assessmentName;		 
		  $scope.assessmentmaster.userid=$rootScope.userdetails.id;		  
	  };

	//----------------update Assessment details-------------------------
		
	 /* $scope.updateAssessmentDetails=function(assessment){
		  
		  $(".loader").fadeOut("slow");
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
	  	if(assessment.assessmentName != undefined && assessment.assessmentName.match(letterNumber)){
	  			
		  assessment.userid=$rootScope.userdetails.id;
	
			 Master_Service.updateAssessmentDetails($scope.assessmentmaster).then(function(response){
			  $scope.updateAssessmentdetails = response.data;	
			  
			  
			  $scope.getAssessmentCount(null);
			  $scope.fetchAssessmentMaster(0,10,null,null,null,0,0,0);
			  $scope.assessmentmaster={};
			  assessment.assessmentName="";
			  if($scope.updateAssessmentdetails.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Your Assessment Details updated successfully");
			  
				  $state.go('restricted.admin.assessmentmaster');
				 
				  $("#edit_assessment").modal('hide');
				  
			  }
			  else if($scope.updateAssessmentdetails =='failed'){
				  GlobalModule_notificationService.notification("error","Assessment Name already exist");
				  $("#edit_assessment").modal('hide');
			 }
			  else{
				
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");  
	  });
			 
	 }	
	 else{
		 GlobalModule_notificationService.notification("error","Please enter valid value");
	 }	
	  };*/

	  $scope.clear=function(){		  
		  $scope.assessment={				
				  assessmentName:""					
			};	  		  
		}; 
		
		$scope.forward= function(){	 
			
			GlobalModule_dataStoreService.storeData('LoginModule','assessmentDetails', undefined);			
			GlobalModule_dataStoreService.storeData('LoginModule','newcreation', true);
			GlobalModule_dataStoreService.storeData('LoginModule','newcreationsurvey', false);
			GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', false);
			GlobalModule_dataStoreService.storeData('LoginModule','filterData', undefined);	
			$state.go('restricted.admin.FilterForassessment');			
			
		};
		
 
		//for assessmentPreview------------------------------------
		$scope.fetchqestn = function(assessmentObj){			 
			$scope.selectedAssessment = assessmentObj;			
			 	
			 //console.log(assessmentObj);
			 if($scope.MasterScreenId == 4){
				 
				 GlobalModule_dataStoreService.storeData('LoginModule','SelectedAssessment',$scope.selectedAssessment);	
				 GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',true);
				 GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',1);
			 }else{
				 $scope.selectedAssessment.saurveyId=assessmentObj.id;
				 GlobalModule_dataStoreService.storeData('LoginModule','selectedSurvey',$scope.selectedAssessment);	
				 GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',true);
				 GlobalModule_dataStoreService.storeData('LoginModule','typeFlag',2);
			 }
			 var url = $state.href('restricted.testPlayer');
			 window.open(url,'_blank');
			/*	$state.go("restricted.testPlayer");*/
			 
			/*	dashboardDetails_Service.fetchqestn(assessmentObj).then(function(response){
				$scope.questionList = response.data;
				
				$scope.currentQuestionNo = 1;				
				$scope.question = $scope.questionList[$scope.currentQuestionNo-1]; 		
				 
			});	*/
		};
		
		/*$scope.openquestionModel = function(){					
			//$('#start-assessment-question').modal("show");
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
		
		$scope.submitAndNext = function(){		
			if($scope.currentQuestionNo == $scope.questionList.length){		
				$('#start-assessment-question').modal("hide");
				GlobalModule_notificationService.notification("success","Assessment question completed");			
			}else{
				$scope.currentQuestionNo = $scope.currentQuestionNo+1;		
				$scope.question = $scope.questionList[$scope.currentQuestionNo-1];	
			}				
		};
		
		$scope.updateAssessmentDetails = function(assessment){			 
			GlobalModule_dataStoreService.storeData('LoginModule','assessmentDetails', assessment);	
			GlobalModule_dataStoreService.storeData('LoginModule','newcreation', false)
			GlobalModule_dataStoreService.storeData('LoginModule','newcreationsurvey', false);
			GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', false);
			$state.go('restricted.admin.FilterForassessment');
		};
		
		//filter for column
		$scope.getSettings = function(screenId){
			Admin_Service.getSettings($rootScope.userdetails.id,screenId).then(function(response){
				  $scope.columnlist = response.data;	
				  //console.log($scope.columnlist);
				var count=0;
						for(var i=0;i<$scope.columnlist.length;i++){
							if(($scope.columnlist[i].name=='Assessments' && $scope.columnlist[i].isActive==false) || ($scope.columnlist[i].name=='Survey' && $scope.columnlist[i].isActive==false)){
								for(var j=0;j<$scope.columnlist.length;j++){
									if($scope.columnlist[j].name=='Assessments' || $scope.columnlist[j].name=='preview' || $scope.columnlist[j].name=='No of questions' || $scope.columnlist[j].name=='Scoring' || $scope.columnlist[j].name=='Assessment Type'){
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
		};
		$scope.getSettings($scope.MasterScreenId);
		
		
		 
		
		$scope.savesettings = function(){
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
			});
		};
		
				$scope.activeColumn = function(columnName)
				{
					if($scope.columnlist != undefined){
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
							return true;
					}
					}
					return false;
				};
		
		
		$scope.selectAllColoumns = function(check)
		{
			if(check==true)
				{
				for(var i=0;i<$scope.columnlist.length;i++){
					 $scope.columnlist[i].isActive=true;
						
				}
				}else{
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Assessments' || $scope.columnlist[i].name=='Survey'){
							$scope.columnlist[i].isActive=true;
							}else{
								$scope.columnlist[i].isActive=false;
							}
						}
						
					}
		};
		
		
		$scope.formatDate = function(date){
	        var dateOut = new Date(date);       
	        return dateOut;
	  };
	  
	  $scope.generateExcel = function(){
		  if($scope.search == undefined){
			  $scope.search="";
		  }
		  
		  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+4+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  };
	  
	  $scope.forwardSurvey= function(){				
			GlobalModule_dataStoreService.storeData('LoginModule','assessmentDetails', undefined);			
			GlobalModule_dataStoreService.storeData('LoginModule','newcreation', true);
			GlobalModule_dataStoreService.storeData('LoginModule','newcreationsurvey', true);
			GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', false);
			GlobalModule_dataStoreService.storeData('LoginModule','filterData', undefined);	
			$state.go('restricted.admin.FilterForassessment');					
		};
		
		$scope.updateSurveyDetails = function(assessment){	
			assessment.typeFlag = 2;
			 
			GlobalModule_dataStoreService.storeData('LoginModule','assessmentDetails', assessment);	
			GlobalModule_dataStoreService.storeData('LoginModule','newcreation', false);	
			GlobalModule_dataStoreService.storeData('LoginModule','newcreationsurvey', true);
			GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', false);
			
			$state.go('restricted.admin.FilterForassessment');
		};
	  
	  
	  
	  /*----------------------------------------survey Master----------------------------------------------------*/
	  
	  
	  $scope.fetchSurveyMaster = function(offset,limit,colName,order,search,brandId,departId,positionId){	
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
				 
			 Master_Service.fetchSurveyMaster(offset,limit,colName,order,search,brandId,departId,positionId).then(function(response){
				 $scope.surveyList=response.data;
				 //console.log($scope.surveyList);
			 
				
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
		 };
		
		 $scope.fetchSurveyMaster(0,10,null,null,null,0,0,0);
		/*----------------Sorting--------------------------*/
		 $scope.SortingSurveyMasterList = function(colName,searchterm){
			  $scope.offset =0 ;
				$scope.start = 0;
			  $scope.colName=colName;
				$scope.search=searchterm;
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.search=="" || $scope.search==null)
				  {
				  $scope.search= undefined;
				  
				  }
				if($scope.colName==null)
				  {
				  $scope.colName= undefined; 
				  }
				$scope.fetchSurveyMaster(0,10,$scope.colName,$scope.order,$scope.search,0,0,0);	
			};
			
			
			/*--------------------------pagination--------------*/
			
			$scope.offset1=0;
			$scope.limit1=10;
			$scope.navButtons1 = [];
		 $scope.setButton1 = function(){
				$scope.navButtons1 = [];
				
					for(var j = $scope.start1, len= $scope.count1/$scope.limit1; j < $scope.start1+5 && j < len; j++){
					$scope.navButtons1.push(j);
					}		
					 $scope.fetchSurveyMaster($scope.offset1,$scope.limit1,$scope.colName,$scope.order,$scope.search1,0,0,0);
				};
				
		  $scope.getSurveycount=function(search){
				$scope.offset1 =0 ;
				$scope.navButtons1 = [];
				$scope.count1= 0 ;
				$scope.start1 = 0;
				$scope.search1=search;
				if($scope.search1==null || $scope.search1=="")
				  {
					$scope.search1= undefined;
				  }
			  if($scope.colName == null || $scope.colName== ""){
				  $scope.colName = undefined;
				 }
				 if($scope.order == null){
					 $scope.order = undefined;
				 }
				// alert($scope.search1);
				 Master_Service.getSurveyCount($scope.search1).then(function(response){
					$scope.count1 = response.data;
				console.log($scope.count1);
					if($scope.count1>$scope.limit1){
						$scope.setButton1();
					}else{
						 $scope.fetchSurveyMaster($scope.offset1,$scope.limit1,$scope.colName,$scope.order,$scope.search1,0,0,0);

					}
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getSurveycount(null);
		    
			
			$scope.previous1 = function() {
				$scope.start1 =  $scope.start1 - 5;
		        $scope.offset1 = $scope.start1 * $scope.limit1;
		        $scope.setButton1();
		     
		    };

		    $scope.next1 = function() {
		    	$scope.start1 =  $scope.start1 + 5;
		        $scope.offset1 = $scope.start1 * $scope.limit1;
		      
		        $scope.setButton1(); 
		      
		    };
		    
		    $scope.current1= function(page) {  
		        $scope.offset1 = page * $scope.limit1;
		        $scope.fetchSurveyMaster($scope.offset1,$scope.limit1,$scope.colName,$scope.order,$scope.search1,0,0,0);
		    };
		 
		  //----------------delete Survey from list ------------------------- 
	     
			  $scope.getCheckedSurveyid=[];
			  
			  $scope.checkedSurveyList = function(id){		 
				  
				  if($scope.getCheckedSurveyid.indexOf(id) !== -1)
				  {		
				  var array  = $scope.getCheckedSurveyid;
				  var index = array.indexOf(id);
				  $scope.getCheckedSurveyid.splice(index,1);
				  }else
				  {		    	
			      $scope.getCheckedSurveyid.push(id);				      
				  };			
				  //console.log( $scope.getCheckedSurveyid);
			  };
			 
			  $scope.checkedAllList = function(listedSurvey,rd){				  
				  if(rd == true || rd == undefined){				 
				  for(var i=0; i<listedSurvey.length; i++){					  
					  
					  //if already exist in getCheckedtemplateid than don't pass
					  if($scope.getCheckedSurveyid.indexOf(listedSurvey[i].id) !== -1)   {  						 
					  }else{
						  $scope.checkedSurveyList(listedSurvey[i].id);	
					  }
					  
				  }			
				  }else{
					  $scope.getCheckedSurveyid=[];
				  }
			  };
			  
			  
			  $scope.check1 = function(){	
				
			  if($scope.getCheckedSurveyid.length == 0){
				  GlobalModule_notificationService.notification("error","Please select any record");
				  }
			  else{				  
				  $('#deletelist').modal('show');
				  }			  
			  };
		    
		    
		    $scope.deletefromList1 = function(formlist1){
		  	  
		  	  $(".loader").fadeOut("slow");
		  	  $scope.formlist1=formlist1;
		  	    $("#deletelist").modal('show');
		  		  Master_Service.deleteSurveyFromList($scope.formlist1,$scope.getCheckedSurveyid).then(function(response){
		  		  $scope.surveyflag = response.data; 
		  		  $scope.getSurveycount(null);
		  		  $scope.fetchSurveyMaster(0,10,null,null,null,0,0,0);
		  		  $scope.getCheckedSurveyid=[];
                   if($scope.surveyflag == "success"){
		  			  GlobalModule_notificationService.notification("success","Record deleted successfully");
		  		  }else{
		  			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		  		  }
		  		  $(".loader").fadeOut("slow");
		  	  },function(response){
		  		  $(".loader").fadeOut("slow");
		  		});
		  };
		  
		 
		  $scope.surveyReport = function(surveyId){
			 		  
			  window.open('download?surveyId='+surveyId+'&screenId='+0);		 
		  };
		  
			
		  $scope.checkSelectedSurvey=function(){
			  
			  if($scope.getCheckedSurveyid.length == 0){
				  
				  GlobalModule_notificationService.notification("error","Please select survey");
				  
			  }
			  else if($scope.getCheckedSurveyid.length > 1){
				  
				  GlobalModule_notificationService.notification("error","Please select only one survey");
				  
			  }
			  else{
				  var surveyName="";
				  
				  for(var i=0;i<$scope.surveyList.length;i++)
					 {
					  	if($scope.getCheckedSurveyid[0] == $scope.surveyList[i].id)
					  		 surveyName=$scope.surveyList[i].assessmentName;
					 }
				  	GlobalModule_dataStoreService.storeData('LoginModule','surveyId',$scope.getCheckedSurveyid[0]);
				  	GlobalModule_dataStoreService.storeData('LoginModule','surveyName',surveyName);
				  	$state.go("restricted.admin.surveyassignment");
				  }	
			  
		  };
	  
		  $scope.clickonReport=function(surveyObj){			  
			  GlobalModule_dataStoreService.storeData('LoginModule','surveyObj',surveyObj);			  
			  $state.go("restricted.admin.generateReport");			   
		  };
		  
		  $scope.changeseq=function(){			  
				 // GlobalModule_dataStoreService.storeData('LoginModule','surveyObj',surveyObj);			  
				  $state.go('restricted.admin.assessmentquestionsequencing');
				  };
	  
}]);