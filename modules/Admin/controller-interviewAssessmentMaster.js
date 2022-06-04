var controllers = angular.module('LoginModule');

controllers.controller('interviewAssessmentmaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','Interview_assessment_master_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,Interview_assessment_master_Service,Admin_Service)
{
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    $scope.MasterScreenId = GlobalModule_dataStoreService.loadData('LoginModule','screenId');
	//----------------View/fetch Interview Assessment list ------------------------- 
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
			 $scope.interviewassessmentList=response.data;
			 console.log($scope.interviewassessmentList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 
	 $scope.fetchAssessmentMaster(0,10,null,null,null,0,0,0,3);
	
	// No of Question 	
	 $scope.openInterviewAssessmentQuestionPage=function(InterviewassessmentId){
		 GlobalModule_dataStoreService.storeData('LoginModule','InterviewassessmentId',InterviewassessmentId);
		 $state.go("restricted.admin.interviewAssessementQuestionList");
	 };
	 // Sorting 
	 
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
			$scope.fetchAssessmentMaster(0,10,$scope.colName,$scope.order,$scope.search,0,0,0,3);	
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
				 $scope.fetchAssessmentMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,0,0,3);
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
				//console.log("COLUMN:");
				//console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getAssessmentCount(null,3);
	    
		
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
	        $scope.fetchAssessmentMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,0,0,3);
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
				  
				  
				  $scope.checkInterviewAssessment = function(){	
					
				  if($scope.getCheckedAssessmentid.length == 0){
					  GlobalModule_notificationService.notification("error","Please select any record");
					  }
				  else{				  
					  $('#deletelist').modal('show');
					  }			  
				  };
			//-----------------------------------------------------------------------	  
				
		
$scope.deletefromListInterviewAssessment = function(formlist){
	  
	  $(".loader").fadeOut("slow");
	  $scope.formlist=formlist;
	    $("#deletelist").modal('show');
		  Master_Service.deleteAssessmentFromList($scope.formlist,$scope.getCheckedAssessmentid).then(function(response){
		  $scope.assessmentflag = response.data;	
		  $scope.getAssessmentCount(null,3);
		  $scope.fetchAssessmentMaster(0,10,null,null,null,0,0,0,3);
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

$scope.assessmentmaster={};
$scope.assessmentdata=function(p){
	  $scope.assessmentmaster.id=p.id;
	  $scope.assessmentmaster.assessmentName=p.assessmentName;		 
	  $scope.assessmentmaster.userid=$rootScope.userdetails.id;		  
};


$scope.clear=function(){		  
	  $scope.assessment={				
			  assessmentName:""					
		};	  		  
	}; 
	
	$scope.forwardInterviewassessment= function(){	 
		
		GlobalModule_dataStoreService.storeData('LoginModule','assessmentDetails', undefined);			
		GlobalModule_dataStoreService.storeData('LoginModule','newcreation', true);
		GlobalModule_dataStoreService.storeData('LoginModule','newcreationsurvey', false);
		GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', true);
		GlobalModule_dataStoreService.storeData('LoginModule','filterData', undefined);	
		$state.go('restricted.admin.FilterForassessment');			
		
	};
	

	//for assessmentPreview------------------------------------
	$scope.PreviewAssessment = function(assessment){
	   	console.log("started");
		//Admin_Service.fetchqestn(assessment).then(function(response){
		//	$scope.questionList = response.data;
			//console.log($scope.questionList);		
			
	   	$scope.selectedAssessment = assessment;		
			
		 GlobalModule_dataStoreService.storeData('LoginModule','SelectedAssessment',$scope.selectedAssessment);	
		 GlobalModule_dataStoreService.storeData('LoginModule','IscomingFromAssMaster',true);
		 GlobalModule_dataStoreService.storeData('LoginModule','checkpreview','preview');
		 var url = $state.href('user_Interview_Assessment');
		 window.open(url,'_blank');	
		 
		 
		/* },function(response){
			 $(".loader").fadeOut("slow");
			});*/
		
	};
	
	

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
	GlobalModule_dataStoreService.storeData('LoginModule','interviewassessmentnewcreation', true);
	$state.go('restricted.admin.FilterForassessment');
};

//filter for column
$scope.getSettings = function(screenId){
	Admin_Service.getSettings($rootScope.userdetails.id,screenId).then(function(response){
		  $scope.columnlist = response.data;
		  console.log("column list:")
		  console.log($scope.columnlist);
		var count=0;
				for(var i=0;i<$scope.columnlist.length;i++){
					if(($scope.columnlist[i].name=='Name' && $scope.columnlist[i].isActive==false) || ($scope.columnlist[i].name=='Survey' && $scope.columnlist[i].isActive==false)){
						for(var j=0;j<$scope.columnlist.length;j++){
							/*if($scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='preview' || $scope.columnlist[j].name=='No of questions' || $scope.columnlist[j].name=='Scoring' || $scope.columnlist[j].name=='Assessment Type'){*/
							if($scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='preview' || $scope.columnlist[j].name=='No of questions'){	
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
				if($scope.columnlist[i].name=='Interview Assessments' || $scope.columnlist[i].name=='Survey'){
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









	
}]);