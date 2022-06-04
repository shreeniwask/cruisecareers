'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateAssessment_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','assessEngine_Service','dashboardDetails_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,assessEngine_Service,dashboardDetails_Service,Master_Service){
	
	
	
	$scope.FilterData = GlobalModule_dataStoreService.loadData('LoginModule','filterData');
	$scope.UserDetails = GlobalModule_dataStoreService.loadData('LoginModule','user');		 
	$scope.surveyFlag = GlobalModule_dataStoreService.loadData('LoginModule','newcreationsurvey');
	$scope.interviewassesmentFlag = GlobalModule_dataStoreService.loadData('LoginModule','interviewassessmentnewcreation');
 
	 
	$scope.list=[];
	$scope.shipListFlag = false;
	
	$scope.AssessmentforList = [{id:1,name:'Employee'},{id:2,name:'Candidate'}];

	$scope.filter = function(Data){		
	
		
	if(Data.assessmentType == undefined){
		Data.assessmentType = 1;
	}
	
/*		//if employee make ship required
		if(Data.assessmentFor == 1 || Data.assessmentFor == undefined){			
			if(Data.assessmentName == undefined || Data.assessmentFor == undefined || Data.assessmentType == undefined ||
					Data.brand == undefined || Data.ship == undefined ||Data.department == undefined || Data.position == undefined){
				 GlobalModule_notificationService.notification("error","Please fill mandatory filleds");
			}		
			else{
				GlobalModule_dataStoreService.storeData('LoginModule','filterData', Data);					 
				$state.go('restricted.admin.CreateAssessment');
			}			
		}	
		
		//ship is not complusion for candidate
		if(Data.assessmentFor == 2 || Data.assessmentFor == undefined){
			if(Data.assessmentName == undefined || Data.assessmentFor == undefined || Data.assessmentType == undefined ||
					Data.brand == undefined ||Data.department == undefined || Data.position == undefined){
				 GlobalModule_notificationService.notification("error","Please fill mandatory filleds");
			}		
			else{*/
	
		if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false && Data.assessmentTime != undefined && Data.assessmentTime<=0){
			GlobalModule_notificationService.notification("error","please enter valid duration time");

		}else{
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		 
			if(Data.assessmentName.match(letterNumber)){
				GlobalModule_dataStoreService.storeData('LoginModule','filterData', Data);			 
				$state.go('restricted.admin.CreateAssessment');
			}
			else{				
				GlobalModule_notificationService.notification("error","please enter valid name");
			}
				
		};
			/*}*/		
		/*} */
		
		
				
	};	 
		
		$scope.cancel = function(){
			if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
				$state.go('restricted.admin.assessmentmaster');
			}else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
				$state.go('restricted.admin.interviewassessmentmaster');
			}
			else{
				$state.go('restricted.admin.surveymaster');
			}
		};
		
		$scope.BackFromFilterAssessment = function(){
			if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
				$state.go('restricted.admin.assessmentmaster');
			}else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
				$state.go('restricted.admin.interviewassessmentmaster');
			}
			else{
				$state.go('restricted.admin.surveymaster');
			}
	 };
		
		$scope.BackfromcreateAss = function(){			 
			$state.go('restricted.admin.FilterForassessment');			 
		};
	
	
	
	$scope.setFlag = function(data){
		if(data == 1){
			$scope.shipListFlag = true;
		}
		if(data != 1){
			$scope.shipListFlag = false;
		}
	};
	
	
	$scope.add = function(){
		$scope.dataList.push({
			level:"",
			number:"",
			questionType:"",
			questionCategory:""
		});		 
	};
	
	$scope.dataList =[{
		level:"",
		number:"",
		questionType:"",
		questionCategory:""
	}];
	
	$scope.removeForList = function(index){		 
		$scope.dataList.splice(index, 1);
	};	
	
	 $scope.disabled = 0; 
	$scope.saveDynamicAssessments = function(){		 
		 $scope.disabled = 1; 
	 
		if($scope.dataList[0].level == "" || $scope.dataList[0].number=="" || $scope.dataList[0].questionType==""){
			GlobalModule_notificationService.notification("error","please select question parameter");
		}else{
		
		if($scope.FilterData.ship == undefined){
			$scope.FilterData.ship = 0;
		}
		if($scope.FilterData.assessmentTime == undefined){
			$scope.FilterData.assessmentTime = 0;
		}
		var assessments = {};
		assessments.brand = {};
		assessments.ship = {};
		assessments.category = {};
		assessments.position = {};
		
		for(var i=0; i<$scope.dataList.length; i++){
			if($scope.dataList[i].questionType != 1){
				assessments.isAutoAssess = true;			 
			}else{
				assessments.isAutoAssess = false;
				break;
			}
		} 
		
		assessments.assessmentType = $scope.FilterData.assessmentType;
		
		if($scope.FilterData.selfAssessment == undefined){
			assessments.isSelfAssessment = false;
		}else{
			if($scope.FilterData.selfAssessment != undefined){
				assessments.isSelfAssessment = $scope.FilterData.selfAssessment;
			}
		}
		
		if($scope.surveyFlag == true){
			assessments.catId = 2;
		 }else{
			 assessments.catId = 1;
		 }
		
		assessments.assessmentName = $scope.FilterData.assessmentName;
		assessments.brand.id = $scope.FilterData.brand;
		assessments.ship.id = $scope.FilterData.ship;
		assessments.category.id = $scope.FilterData.department;
		assessments.position.id = $scope.FilterData.position;		
		assessments.question = $scope.dataList;
		assessments.createdby = $scope.UserDetails.id;
		assessments.assessmentTime=$scope.FilterData.assessmentTime;
			 
		
		//console.log(assessments);
		assessEngine_Service.checkQuestionCount($scope.dataList).then(function(response){
			$scope.saveResponse=response.data;	 
			if($scope.saveResponse != "success"){
				$scope.listIndex = $scope.saveResponse;
				$("#not_enough_question").modal('show');	
				//GlobalModule_notificationService.notification("error","Not enough question in question bank for selected parameter");
			}else{
			assessEngine_Service.saveDynamicAssessments(assessments).then(function(response){
				 $scope.resultsdynamic=response.data;	
				 
				 if($scope.resultsdynamic == "success"){				 
				 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
				 $state.go('restricted.admin.assessmentmaster');				  
				 }else{
					 if($scope.resultsdynamic == "Duplicate"){							 
						 GlobalModule_notificationService.notification("error","Assessment already exits. Please try with some other name");
						 $state.go('restricted.admin.assessmentmaster');
					 }else{
						 GlobalModule_notificationService.notification("error","please try again!");
						 $state.go('restricted.admin.assessmentmaster');
					 }
				 }
			  });
		} 
		
		}); 
		}
	};
	
	$scope.disabled = 0;  
	$scope.saveFixedAssessment = function(){
		$scope.disabled = 1;  	
		$scope.questionidList = [];
		
		if($scope.getCheckedQuesid.length == 0){
			 GlobalModule_notificationService.notification("error","please select question");
		}else{
	
		if($scope.FilterData.ship == undefined){
			$scope.FilterData.ship = 0;
		}
		if($scope.FilterData.assessmentTime == undefined){
			$scope.FilterData.assessmentTime = 0;
		}
		var assessmentobj = {};				
		assessmentobj.brand = {};
		assessmentobj.ship = {};
		assessmentobj.category = {};
		assessmentobj.position = {};		
		
		assessmentobj.assessmentName = $scope.FilterData.assessmentName;
		assessmentobj.assessmentTypeId = $scope.FilterData.assessmentType;		
		
		if($scope.FilterData.selfAssessment == undefined){
			assessmentobj.isSelfAssessment = false;
		}else{
			if($scope.FilterData.selfAssessment != undefined){
				assessmentobj.isSelfAssessment = $scope.FilterData.selfAssessment;
			}
		}		
		
		for(var i=0; i<$scope.getCheckedQuesid.length; i++){			 
			 $scope.questionidList.push({id:$scope.getCheckedQuesid[i]});
		 };
		 
		 if($scope.surveyFlag == true){
			 assessmentobj.catId = 2;
		 } 
		 else if($scope.interviewassesmentFlag == true){
			 assessmentobj.catId = 3;
		 }
		 else{
			 assessmentobj.catId = 1;
		 }
		
		assessmentobj.brand.id = $scope.FilterData.brand;
		assessmentobj.ship.id = $scope.FilterData.ship;
		assessmentobj.category.id = $scope.FilterData.department;
		assessmentobj.position.id = $scope.FilterData.position;			
		assessmentobj.createdby = $scope.UserDetails.id;
		assessmentobj.question = $scope.questionidList;
		assessmentobj.assessmentTime=$scope.FilterData.assessmentTime;
		
		//console.log(assessmentobj);
		assessEngine_Service.saveAssessment(assessmentobj).then(function(response){
			 $scope.result=response.data;	
			 
			 if($scope.result == "success"){
				 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
				 
				 if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
					 $state.go('restricted.admin.assessmentmaster');
				 }else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
					 $state.go('restricted.admin.interviewassessmentmaster');
				 }
				 else{
					 $state.go('restricted.admin.surveymaster');
				 }
				
			 }else{
				 if($scope.result == "Duplicate"){
					 GlobalModule_notificationService.notification("error","Name already exits. Please try with some other name");

					 if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
						 $state.go('restricted.admin.assessmentmaster');
					 }else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
						 $state.go('restricted.admin.interviewassessmentmaster');
					 }else{
						 $state.go('restricted.admin.surveymaster');
					 }
				 }else{
					 GlobalModule_notificationService.notification("error","please try again!");
					 if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
						 $state.go('restricted.admin.assessmentmaster');
					 }else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
						 $state.go('restricted.admin.interviewassessmentmaster');
					 }else{
						 $state.go('restricted.admin.surveymaster');
					 }
				 }
			 }
			 
		  }); 
		}
	 };
	
	$scope.saveOfflineAssessment = function(Data){	
		
		//if employee make ship required
		if(Data.assessmentFor == 1 || Data.assessmentFor == undefined){			
			if(Data.assessmentName == undefined || Data.assessmentFor == undefined || Data.assessmentType == undefined ||
					Data.brand == undefined || Data.ship == undefined ||Data.department == undefined || Data.position == undefined){
				 GlobalModule_notificationService.notification("error","Please fill mandatory filleds");
			}		
			else{
				 
				if(Data.ship == undefined){
					Data.ship = 0;
				} 
				if(Data.selfAssessment == undefined){
					Data.selfAssessment = false;
				}
				if(Data.assessmentTime == undefined){
					Data.assessmentTime = 0;
				}
				 
				var offlineAssess ={};
				offlineAssess.brand ={};
				offlineAssess.category ={};
				offlineAssess.position = {};
				offlineAssess.ship = {};
				
				 offlineAssess.assessmentName = Data.assessmentName;
				 offlineAssess.userid = $scope.UserDetails.id;
				 offlineAssess.assessmentTypeId = Data.assessmentType;
				 offlineAssess.isSelfAssessment = Data.selfAssessment;
				 offlineAssess.brand.id = Data.brand;
				 offlineAssess.category.id = Data.department;
				 offlineAssess.position.id = Data.position;
				 offlineAssess.ship.id = Data.ship;
				 offlineAssess.assessmentTime=Data.assessmentTime;	 				 
				 
				 Master_Service.saveAssessmentDetails(offlineAssess).then(function(response){
					 $scope.offlineresult=response.data;	
					 
					 if($scope.offlineresult == "success"){
						 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
						 $state.go('restricted.admin.assessmentmaster');
					 }else{
						 if($scope.offlineresult == "Duplicate"){							 
							 GlobalModule_notificationService.notification("error","Assessment already exits. Please try with some other name");

							 $state.go('restricted.admin.assessmentmaster');
						 }else{
							 GlobalModule_notificationService.notification("error","please try again!");
							 $state.go('restricted.admin.assessmentmaster');
						 }
					 }
					 
				  }); 
			}			
		}	
		
		//ship is not complusion for candidate
		if(Data.assessmentFor == 2 || Data.assessmentFor == undefined){
			if(Data.assessmentName == undefined || Data.assessmentFor == undefined || Data.assessmentType == undefined ||
					Data.brand == undefined ||Data.department == undefined || Data.position == undefined){
				 GlobalModule_notificationService.notification("error","Please fill mandatory filleds");
			}		
			else{
				if(Data.ship == undefined){
					Data.ship = 0;
				} 
				if(Data.selfAssessment == undefined){
					Data.selfAssessment = false;
				}
				if(Data.assessmentTime == undefined){
					Data.assessmentTime = 0;
				}
				 
				var offlineAssess ={};
				offlineAssess.brand ={};
				offlineAssess.category ={};
				offlineAssess.position = {};
				offlineAssess.ship = {};
				
				 offlineAssess.assessmentName = Data.assessmentName;
				 offlineAssess.userid = $scope.UserDetails.id;
				 offlineAssess.assessmentTypeId = Data.assessmentType;
				 offlineAssess.isSelfAssessment = Data.selfAssessment;
				 offlineAssess.brand.id = Data.brand;
				 offlineAssess.category.id = Data.department;
				 offlineAssess.position.id = Data.position;
				 offlineAssess.ship.id = Data.ship;
				 offlineAssess.assessmentTime=Data.assessmentTime;
				 Master_Service.saveAssessmentDetails(offlineAssess).then(function(response){
					 $scope.offlineresult=response.data;	
					 
					 if($scope.offlineresult == "success"){
						 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
						 $state.go('restricted.admin.assessmentmaster');
					 }else{
						 if($scope.offlineresult == "Duplicate"){							 
							 GlobalModule_notificationService.notification("error","Assessment already exits. Please try with some other name");

							 $state.go('restricted.admin.assessmentmaster');
						 }else{
							 GlobalModule_notificationService.notification("error","please try again!");
							 $state.go('restricted.admin.assessmentmaster');
						 }
					 }
					 
				  }); 
			}		
		} 
		 
	 };
	 
	 $scope.offlineFlage = false;
	 $scope.setAssessmentTypeFlag = function(assessmentTypeId){	 
		 if(assessmentTypeId == 3){
			 $scope.offlineFlage = true;
		 }else{
			 $scope.offlineFlage = false;
		 }
	 };
	
	$scope.fetchbrandlist = function(){					 
		assessEngine_Service.fetchbrandlist().then(function(response){
			 $scope.brandlist=response.data;				 
		  }); 
	 };$scope.fetchbrandlist();
	 
	 $scope.fetchassessmenttype  = function(){					 
			assessEngine_Service.fetchassessmenttype().then(function(response){
				 $scope.assessmenttype=response.data;	
				// console.log($scope.assessmenttype);
			  }); 
		 };$scope.fetchassessmenttype();
	 
	 $scope.fetchshiplist = function(brandId){					 
			assessEngine_Service.fetchshiplist(brandId).then(function(response){
				 $scope.shiplist=response.data;		
			  }); 
		 };
		 
	 $scope.fetchdepartmentlist = function(){					 
				assessEngine_Service.fetchdepartmentlist().then(function(response){
					 $scope.departmentlist=response.data;	
				  }); 
			 };$scope.fetchdepartmentlist();
			 
	 $scope.fetchpositionlist = function(deptId){					 
					assessEngine_Service.fetchpositionlist(deptId).then(function(response){
						 $scope.positionlist=response.data;	
					  }); 
				 }; 		
				 
	 $scope.fetchquestiontypelist = function(){					 
			assessEngine_Service.fetchquestiontypelist().then(function(response){
				 $scope.questionTypeList=response.data;	
				// console.log($scope.questionTypeList);
			  }); 
		 }; $scope.fetchquestiontypelist();	 
	
	
		 $scope.getCheckedQuesid=[];
		 
		 $scope.checkedAllList = function(questlist,rd){				  
			  if(rd == true){				 
			  for(var i=0; i<questlist.length; i++){
				  if( $scope.getCheckedQuesid.indexOf(questlist[i].id == -1)){
					  $scope.getCheckedQuestions(questlist[i].id);
				  }
				  
			  }			
			  }else{
				  $scope.getCheckedQuesid=[];
			  }			
			  
		  };
		  
		  $scope.getCheckedQuestions = function(question,Booelan){					  
			   
			  if(Booelan == true){
			  if($scope.getCheckedQuesid.indexOf(question.id) !== -1)
			  {	
			  var array  = $scope.getCheckedQuesid;
			  var index =  array.indexOf(question.id);
			  $scope.getCheckedQuesid.splice(index,1);			  
			  }else
			  {		    	
		      $scope.getCheckedQuesid.push(question.id);				      
			  }; 			  
			  }
			  else{
			  if(Booelan == undefined || Booelan == false ){
				  var array  = $scope.getCheckedQuesid;
				  var index =  array.indexOf(question.id);
				  $scope.getCheckedQuesid.splice(index,1);	
			  }
			  }  
		  };
		  
				 
			//sorting	 
			$scope.sortingQuestionlist = function(colName,searchterm){
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
					$scope.fetchfilteredquestion(0,10000,$scope.colName,$scope.order,$scope.search,0,$scope.list,true);	
				};
			
				
				 //------pagination--------------
				
				/*$scope.offset=0;
				$scope.limit=10;
				$scope.navButtons = [];
			 $scope.setButton = function(){
					$scope.navButtons = [];
					
						for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
						$scope.navButtons.push(j);
						}		
						$scope.fetchfilteredquestion($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,$scope.list);	
					};*/
					
			 /* $scope.getquestionlistcount = function(search){
					$scope.offset =0 ;
					$scope.navButtons = [];
					$scope.count= 0 ;
					$scope.start = 0;
					$scope.search=search;
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
					 assessEngine_Service.getquestionbanklistcount($scope.search,0,$scope.list).then(function(response){
						$scope.count = response.data;
						console.log("-->"+$scope.count);
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						
						$(".loader").fadeOut("slow");
						
					});		
				};
				$scope.getquestionlistcount(null);*/
			    
				
				/*$scope.previous = function() {
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
					$scope.fetchfilteredquestion($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,$scope.list);	
			    };*/
	   
			    //----pagination end-----
	
			    /*alert("brand"+$scope.FilterData.brand);
			     alert("department"+$scope.FilterData.department);
			      alert("position"+$scope.FilterData.position);
			       alert("ship"+$scope.FilterData.ship);*/
			
    // $scope.list = [{tag_type:1,tag_id:2},{tag_type:1,tag_id:1},{tag_type:2,tag_id:1},{tag_type:4,tag_id:1},{tag_type:3,tag_id:1}];	
     
	 $scope.fetchfilteredquestion = function(offset,limit,colName,order,search,level,list,flag){	
		 $(".loader").show();
	 $scope.level = level;
	 

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
	 var assessmenttype="";
	 if(assessmenttype=="" || assessmenttype==null)
	  {
		 assessmenttype= undefined;
	  }
	 if($scope.surveyFlag == true ){
		 assessmenttype = 'survey';
	 }
	 else if($scope.interviewassesmentFlag == true){
		 assessmenttype = 'Interview Assessment';
	 }else{
		 assessmenttype = 'Assessment';
	 }
	 
	 //console.log($scope.list);
	 $scope.surveyQuestion =[];
	 $scope.assessmentQuestion =[];
	 $scope.interviewAssessmentQuestion = [];
	 $scope.questionList =[];
	 assessEngine_Service.fetchquestionbank(offset,limit,colName,order,search,assessmenttype,$scope.level,$scope.list,flag).then(function(response){
			 $scope.bothquestionList=response.data;		
			
			 console.log($scope.bothquestionList);
			 
			 for(var i=0; i<$scope.bothquestionList.length;i++){
				 if($scope.bothquestionList[i].assessmentCategoryId == 2){
					 $scope.surveyQuestion.push($scope.bothquestionList[i]);
				 }else if($scope.bothquestionList[i].assessmentCategoryId == 3){
					 $scope.interviewAssessmentQuestion.push($scope.bothquestionList[i]);
				 }
				 else{
					 $scope.assessmentQuestion.push($scope.bothquestionList[i]);
				 }
			 }
			 
			 if($scope.surveyFlag == true ){
				 $scope.questionList = $scope.surveyQuestion;
			 }else if($scope.interviewassesmentFlag == true){
				 $scope.questionList = $scope.interviewAssessmentQuestion;
			 }
			 else{
				 $scope.questionList = $scope.assessmentQuestion;
			 }
			
			 console.log($scope.questionList);
			 
			 $(".loader").fadeOut("slow");
		  }); 			 
	 };
	 $scope.fetchfilteredquestion(0,1000,null,null,null,0,$scope.list,true);
	 
	 if($scope.FilterData != undefined){	
		 //tag_type for brand=1,dept = 3,position=4,ship=2	 
		 if($scope.FilterData.brand != undefined){
			 $scope.list.push({tag_type:1,tag_id:$scope.FilterData.brand});
		 }
		 if($scope.FilterData.department != undefined){
			 $scope.list.push({tag_type:3,tag_id:$scope.FilterData.department});
		 }
		 if($scope.FilterData.position != undefined){
		 $scope.list.push({tag_type:4,tag_id:$scope.FilterData.position});
		 }
		 if($scope.FilterData.ship != undefined){
			 $scope.list.push({tag_type:2,tag_id:$scope.FilterData.ship});
		 }
		 }	
	 
	 
	 //----category tag for filter-------Rohan[8 may 2018]
	 $scope.fetchlist = function(tagType,id){
		 
		  if(id=="" || id==undefined){
			  for(var i=0;i<$scope.list.length;i++){
				  if($scope.list[i].tag_type==tagType){
					  $scope.list.splice(i, 1);
				  }
			  }
		  }
		  else{
		  for(var i=0;i<$scope.list.length;i++){
			  if($scope.list[i].tag_type==tagType){
				  $scope.list.splice(i, 1);
			  }
		  }
		  var addTag={
					tag_type: tagType,
					tag_id: id
			};
			$scope.list.push(addTag);
		  }
		 // console.log($scope.list);
			
	  };
	  $scope.list = [{typeId:0}];
	  
	  $scope.filterByQuestionType = function(type){
		  
		 
			 if(type=="")
			  {
			  type=0;
			  }
		  $scope.list[0].typeId=type;
		  //$scope.fetchfilteredquestion(0,10000,$scope.colName,$scope.order,$scope.search,0,$scope.list);
		 // console.log($scope.list);
	  };
		

	  $scope.fetchQuestionCategorylist = function(){					 
			assessEngine_Service.fetchQuestionCategorylist().then(function(response){
				 $scope.questionCategory=response.data;	
				// console.log($scope.questionCategory);
			  }); 
		 };$scope.fetchQuestionCategorylist();	
	 //----------------------------------------
	 
	 $scope.data={}; 
	//update Assessments--------------------------------------------------------	 
	 $scope.selectedAssessment = GlobalModule_dataStoreService.loadData('LoginModule','assessmentDetails');
	 
	 $scope.newcreation = GlobalModule_dataStoreService.loadData('LoginModule','newcreation');	
	// console.log($scope.selectedAssessment); 
	 
	 if($scope.newcreation == false && $scope.selectedAssessment.assessmentTypeId == 3 ){
		 $scope.offlineFlage = true;
	 }
	 //for fixed Assessment
	 if($scope.selectedAssessment != undefined){
		 if($scope.selectedAssessment.typeFlag != 2){
			 $scope.fetchpositionlist($scope.selectedAssessment.category.id);
			 $scope.fetchshiplist($scope.selectedAssessment.brand.id);
		
		
		 
		 if($scope.selectedAssessment.ship.id != undefined ||  $scope.selectedAssessment.ship.id != 0){
			 $scope.shipListFlag = true;
		 }
		 if($scope.selectedAssessment.ship.id == undefined || $scope.selectedAssessment.ship.id == 0){
			 $scope.shipListFlag = false;
		 }
		 }
		 
		 
	 $scope.data.assessmentName = $scope.selectedAssessment.assessmentName;	 
	 
	 if($scope.selectedAssessment.typeFlag != 2){
	 if($scope.selectedAssessment.ship.id == 0){
		 	 $scope.data.assessmentFor = 2; 
	 }else{
		 $scope.data.assessmentFor = 1;  
	 } 
	 }
		 
		 
	 $scope.data.assessmentType = $scope.selectedAssessment.assessmentTypeId;
	 $scope.data.selfAssessment = $scope.selectedAssessment.isSelfAssessment;
	 if($scope.selectedAssessment.typeFlag != 2){
	 $scope.data.brand = $scope.selectedAssessment.brand.id;
	 $scope.data.ship = $scope.selectedAssessment.ship.id;
	 $scope.data.department = $scope.selectedAssessment.category.id;
	 $scope.data.position = $scope.selectedAssessment.position.id;
	 }
	 $scope.data.assessmentId = $scope.selectedAssessment.id;	
	 $scope.data.assessmentTime = $scope.selectedAssessment.assessmentTime;
	 }	 else{
		 
		 if($scope.FilterData !=undefined){
		 $scope.fetchpositionlist($scope.FilterData.department);
		 $scope.fetchshiplist($scope.FilterData.brand);
		 
		 if($scope.FilterData.ship != undefined ||  $scope.FilterData.ship != 0){
			 $scope.shipListFlag = true;
		 }
		 if($scope.FilterData.ship == undefined || $scope.FilterData.ship == 0){
			 $scope.shipListFlag = false;
		 }
		 
	 $scope.data.assessmentName = $scope.FilterData.assessmentName;	 
	 
	 if($scope.FilterData.ship == 0){
		 	 $scope.data.assessmentFor = 2; 
	 }else{
		 $scope.data.assessmentFor = 1;  
	 } 

	 $scope.data.assessmentType = $scope.FilterData.assessmentType;
	 $scope.data.selfAssessment = $scope.FilterData.selfAssessment;
	 $scope.data.brand = $scope.FilterData.brand;
	 $scope.data.ship = $scope.FilterData.ship;
	 $scope.data.department = $scope.FilterData.department;
	 $scope.data.position = $scope.FilterData.position;
	 $scope.data.assessmentTime = $scope.FilterData.assessmentTime;
	 //$scope.data.assessmentId = $scope.FilterData.id;	
		 }
	 }
	 
	 //for Fixed Assessment
	 $scope.AssessmentquestionList =[];
	 $scope.fetchqestn = function(){		 
		dashboardDetails_Service.fetchqestn($scope.selectedAssessment).then(function(response){
		$scope.AssessmentquestionList = response.data;		 
			});	
		}; 	 $scope.fetchqestn();
		
		 
		//for Dyanamic Assessment	 
		 $scope.fetchDynamicQstnDetails = function(){		 
			 assessEngine_Service.fetchDynamicQstnDetails($scope.selectedAssessment).then(function(response){
					$scope.dynamicQstnList = response.data; 
					
					//console.log($scope.dynamicQstnList);
					$scope.dataList =[];
					for(var i=0;i<$scope.dynamicQstnList.length;i++){																				          
						 $scope.dataList.push({level:$scope.dynamicQstnList[i].questn.level,number:$scope.dynamicQstnList[i].questionCount,questionType:$scope.dynamicQstnList[i].questn.questionType,questionCategory:$scope.dynamicQstnList[i].questn.questionCategory});
					 }		//	console.log($scope.dataList);		 
						});	
		 };$scope.fetchDynamicQstnDetails();
		 
		 
		 $scope.disabled = 0; 
		 $scope.UpdateDynamicAssessment = function(){
			 $scope.disabled = 1;
			 if($scope.dataList[0].level == "" || $scope.dataList[0].number=="" || $scope.dataList[0].questionType==""){
					GlobalModule_notificationService.notification("error","please select question parameter");
				}else{
			 
			 if($scope.FilterData.ship == undefined){
					$scope.FilterData.ship = 0;
				}
			 if($scope.FilterData.assessmentTime == undefined){
				 $scope.FilterData.assessmentTime = 0;
				}
			 
			 var updateDynamicAssess ={};
			 updateDynamicAssess.brand = {};
			 updateDynamicAssess.ship = {};
			 updateDynamicAssess.category = {};
			 updateDynamicAssess.position = {};			 
			 
			 for(var i=0; i<$scope.dataList.length; i++){
					if($scope.dataList[i].questionType != 1){
						updateDynamicAssess.isAutoAssess = true;			 
					}else{
						updateDynamicAssess.isAutoAssess = false;
						break;
					}
				} 
			 
			 updateDynamicAssess.assessmentTypeId = $scope.FilterData.assessmentType;
			 
			 if($scope.FilterData.selfAssessment == undefined){
				 updateDynamicAssess.isSelfAssessment = false;
				}else{
					if($scope.FilterData.selfAssessment != undefined){
				updateDynamicAssess.isSelfAssessment = $scope.FilterData.selfAssessment;
					}
				}
			 
			 updateDynamicAssess.assessmentName = $scope.FilterData.assessmentName;
			 updateDynamicAssess.brand.id = $scope.FilterData.brand;
			 updateDynamicAssess.ship.id = $scope.FilterData.ship;
			 updateDynamicAssess.category.id = $scope.FilterData.department;
			 updateDynamicAssess.position.id = $scope.FilterData.position;		
			 updateDynamicAssess.question = $scope.dataList;
			 updateDynamicAssess.userid = $scope.UserDetails.id;
			 updateDynamicAssess.id = $scope.data.assessmentId; 
			 updateDynamicAssess.assessmentTime =$scope.FilterData.assessmentTime ;
			 assessEngine_Service.checkQuestionCount($scope.dataList).then(function(response){
					$scope.updateResponse=response.data;	
					
					if($scope.updateResponse != "success"){
						$scope.listIndex = $scope.updateResponse;
						$("#not_enough_question").modal('show');
						//GlobalModule_notificationService.notification("error","Not enough question in question bank for selected parameter");
					}else{
						assessEngine_Service.UpdateDynamicAssessment(updateDynamicAssess).then(function(response){
							 $scope.status=response.data;	
							 if($scope.status == "success"){				 
							 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been updated successfully");
							 $state.go('restricted.admin.assessmentmaster');		 
							  
							 }else{				  
								 GlobalModule_notificationService.notification("error","Records has not been updated");
								 $state.go('restricted.admin.assessmentmaster');		
							 }
						  });
					} 
					
					}); 		  
				}
			};
		 
 	
	  
 	 
		 
		$scope.checkquestionId = function(Qid){
		
			for(var i=0;i<$scope.AssessmentquestionList.length;i++){	
			 
				if(Qid == $scope.AssessmentquestionList[i].id){ 					
					return true;
					break;
				}			
			}
			for(var j=0;j<$scope.getCheckedQuesid.length;j++){	
				 
				if(Qid == $scope.getCheckedQuesid[j]){ 					
					return true;
					break;
				}			
			}
			
				return false;		
		};
		
		$scope.disabled = 0;  
		$scope.UpdateFixedAssessment =function(question){			
			$scope.disabled = 1;  	
			//$scope.getCheckedQuesid=[];
			$scope.questionidList =[]; 
			
			/*for(var i=0;i<question.length;i++){
			if($("#check"+question[i].id).is(":checked")){						 
			$scope.getCheckedQuesid.push(question[i].id);				  		
			  }		
			}*/
			
			if($scope.getCheckedQuesid.length == 0){
				 GlobalModule_notificationService.notification("error","please select question");
			}else{
			
			if($scope.FilterData.ship == undefined){
				$scope.FilterData.ship = 0;
			}
			
			 for(var j=0; j<$scope.getCheckedQuesid.length; j++){	
				
				 $scope.questionidList.push({id:$scope.getCheckedQuesid[j]});
			 };
			 if($scope.FilterData.assessmentTime == undefined){
				 $scope.FilterData.assessmentTime = 0;
				}
			 var assessmentUpdateobj = {};				
			 assessmentUpdateobj.brand = {};
			 assessmentUpdateobj.ship = {};
			 assessmentUpdateobj.category = {};
			 assessmentUpdateobj.position = {};
			 
			 assessmentUpdateobj.assessmentName = $scope.FilterData.assessmentName;
			 assessmentUpdateobj.assessmentTypeId = $scope.FilterData.assessmentType;
			 assessmentUpdateobj.id = $scope.data.assessmentId;
			 assessmentUpdateobj.assessmentTime= $scope.FilterData.assessmentTime;
			 if($scope.FilterData.selfAssessment == undefined){
				 assessmentUpdateobj.isSelfAssessment = false;
				}else{
					if($scope.FilterData.selfAssessment != undefined){
						assessmentUpdateobj.isSelfAssessment = $scope.FilterData.selfAssessment;
					}
				}	 
			 
			 assessmentUpdateobj.brand.id = $scope.FilterData.brand;
			 assessmentUpdateobj.ship.id =  $scope.FilterData.ship;
			 assessmentUpdateobj.category.id =  $scope.FilterData.department;
			 assessmentUpdateobj.position.id =  $scope.FilterData.position;				
			 assessmentUpdateobj.userid =  $scope.UserDetails.id;
			 assessmentUpdateobj.question = $scope.questionidList;		 
			 
			 assessEngine_Service.UpdateFixedAssessment(assessmentUpdateobj).then(function(response){
				 $scope.result=response.data;				 
				 if($scope.result == "success"){
					 if($scope.surveyFlag == false && $scope.interviewassesmentFlag == false){
						 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been updated successfully and Kindly Update the Sequence");
						 $state.go('restricted.admin.assessmentmaster');
					 }else if($scope.surveyFlag == false && $scope.interviewassesmentFlag == true){
						 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been updated successfully");
						 $state.go('restricted.admin.interviewassessmentmaster');
					 }
					 else{
						 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been updated successfully");
						 $state.go('restricted.admin.surveymaster');
					 }
				 };
				 
			  });
			}
		};
	 	
		$scope.updateQuestion=function()
		{
			for(var j=0; j<$scope.getCheckedQuesid.length; j++){			 
				 $scope.questionidList.push({id:$scope.getCheckedQuesid[j]});
			 };
		};
		
		$scope.UpdateOfflineAssessment = function(data){
			
			if(data.ship == undefined){
				data.ship = 0;
			} 
			if(data.assessmentFor == 2){
				data.ship = 0;
			}
			if(data.selfAssessment == undefined){
				data.selfAssessment = false;
			}
			if(data.assessmentTime == undefined){
				data.assessmentTime = 0;
			}
			var updateOfflineAssessment ={};
			updateOfflineAssessment.brand = {};
			updateOfflineAssessment.ship = {};
			updateOfflineAssessment.category = {};
			updateOfflineAssessment.position = {};			
			
			updateOfflineAssessment.id = $scope.data.assessmentId;
			updateOfflineAssessment.assessmentName = data.assessmentName;
			updateOfflineAssessment.assessmentTypeId = data.assessmentType;				 
			updateOfflineAssessment.brand.id = data.brand;
			updateOfflineAssessment.ship.id = data.ship;
			updateOfflineAssessment.category.id = data.department;
			updateOfflineAssessment.position.id = data.position;
			updateOfflineAssessment.isSelfAssessment = data.selfAssessment;	
			updateOfflineAssessment.userid =  $scope.UserDetails.id;
			updateOfflineAssessment.assessmentTime=data.assessmentTime;
			 assessEngine_Service.UpdateOfflineAssessment(updateOfflineAssessment).then(function(response){
				 $scope.offlineStatus=response.data;				 
				 if($scope.offlineStatus == "success"){
					 GlobalModule_notificationService.notification("success","Woo Hoo! Records has been updated successfully");
					 $state.go('restricted.admin.assessmentmaster');
				 }else{
					 GlobalModule_notificationService.notification("error","Record has not been able to update");
					 $state.go('restricted.admin.assessmentmaster');
				 }
				 
			  }); 
		};
		
		$scope.openmodal=function(q){
			
			if(q.questionMediaType == 1){
				$scope.MediaType = 1;
				$scope.MediaLink = q.questionMedia;
			}
			if(q.questionMediaType == 2){
				$scope.MediaType = 2;
				$scope.MediaLink = q.questionMedia;
			}
			if(q.questionMediaType == 3){
				$scope.MediaType = 3;
				$scope.MediaLink = q.questionMedia;
			}
			
			$('#media').modal('show');
		};

		$(document).ready(function(){
			$('#media').on('hidden.bs.modal', function () {
				if($scope.MediaType==2){
				 var audio = document.getElementById("audioMedia");
				 audio.load();
				 }
				else if($scope.MediaType==3){
				    var video = document.getElementById("mediaVideo");
				    video.load();
				}
				    $scope.MediaLink="";
				    
		    });
			});
		
		
		
}]);