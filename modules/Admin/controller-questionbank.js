var controllers = angular.module('LoginModule');

controllers.controller('questionbank_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','assessEngine_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,assessEngine_Service)
{
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.questionTypeId=1;
	  $scope.questionTags=[];
	  $scope.questionTag=[];
	  
	  //----------------View/fetch question bank list------------------------- 
	  $scope.fetchlist = function(tagType,id){
		  if(id=="" || id==undefined){
			  for(var i=0;i<$scope.questionTag.length;i++){
				  if($scope.questionTag[i].tag_type==tagType){
					  $scope.questionTag.splice(i, 1);
				  }
			  }
		  }
		  else{
		  for(var i=0;i<$scope.questionTag.length;i++){
			  if($scope.questionTag[i].tag_type==tagType){
				  $scope.questionTag.splice(i, 1);
			  }
		  }
		  var addTag={
					tag_type: tagType,
					tag_id: id
			};
			$scope.questionTag.push(addTag);
		  }
			
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
	  
		 $scope.fetchquestionbank = function(offset,limit,colName,order,search,level,questiontag,flag){	
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
				 if(questiontag== null || questiontag== ""){
					 flag = true;
				 }else{
					 flag = false;
				 }
				 var assessmenttype="";
				 if(assessmenttype=="" || assessmenttype==null)
				  {
					 assessmenttype= undefined;
				  }
				 ////console.log(questiontag);
				 assessEngine_Service.fetchquestionbank(offset,limit,colName,order,search,assessmenttype,level,questiontag,flag).then(function(response){
				 $scope.questionList=response.data;
				// console.log($scope.questionList);
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
		 };
		
		 $scope.fetchquestionbank(0,10,null,null,null,0,$scope.questionTag,true);
		 
		 
		 $scope.fetchQuestionList=function(search,questionType){
			 
			 if(search=="")
				{
					 
				}
			 else
				 {
				 	if(search.length>4)
				 	{
				 		$scope.queList=[]; 
				 		assessEngine_Service.fetchQuestionList(search,questionType).then(function(response){
							 
				 		$scope.questionsList=response.data;
				 		
				 		console.log($scope.questionsList);
						
				 		for(var i=0;i<$scope.questionsList.length;i++)
				 		{
				 			$scope.queList.push({id:$scope.questionsList[i].id,detail:$scope.questionsList[i].questionText});
				 		}
				 		console.log($scope.queList);
				 		
							   
					},function(response){
				});	 
							 
				 	}
					  
				 
				 }
			 
			
			// var abc= $("#queList option:selected").attr('class');
			 
		//	 console.log(abc);
			 
		 };
		 
		 $scope.selectedQuetionAns= function(){
			 if($scope.questionsList[0].questionText==$scope.question.questionText){
				// alert($scope.questionsList[0].id);
				 $scope.fetchAnsList($scope.questionsList[0].id);
				 
			 }
		 };
		
		 $scope.fetchAnsList=function(id){
		 
		 
			 assessEngine_Service.fetchAnsList(id).then(function(response){
				 
			 		$scope.anslist=response.data;

			 		for(var i=0;i<$scope.anslist.length;i++)
			 		{
			 			/*$scope.question.ans[i].id=$scope.anslist[i].id;
			 			$scope.question.ans[i].answerText=$scope.anslist[i].answerText;
			 			$scope.question.ans[i].correct=$scope.anslist[i].isCorrect;*/
			 		$scope.question.ans.push({id:$scope.anslist[i].id,answerText:$scope.anslist[i].answerText,isCorrect:$scope.anslist[i].isCorrect});
			 		}
			 		console.log($scope.anslist);
			 		
			 		
			 },function(response){
				});	 
			
			
		 };
		 
		
		 
		/* ............... sorting on list-----------*/

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
				$scope.fetchquestionbank(0,10,$scope.colName,$scope.order,$scope.search,0,$scope.questionTag);	
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
					$scope.fetchquestionbank($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,$scope.questionTag);	
				};
				
		  $scope.getquestionbanklistcount = function(search,flag){
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
				 if($scope.questionTag==null || $scope.questionTag == ""){
					 flag=true;
				 }else{
					 flag==false;
				 }
				 assessEngine_Service.getquestionbanklistcount($scope.search,0,$scope.questionTag,flag).then(function(response){
					$scope.count = response.data;
					console.log($scope.count);
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getquestionbanklistcount(null,true);
		    
			
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
		    $scope.pageNumber=0;
		    $scope.current = function(page) {
		    	$scope.pageNumber=page;
		        $scope.offset = page * $scope.limit;
				$scope.fetchquestionbank($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,0,$scope.questionTag);	
		    };
   
		    //----pagination end-----
		    
			//----------------delete Question from list ------------------------- 
			  
			   //----------check question list-------
					  
					  $scope.getCheckedQuesid=[];
					  
					  $scope.getCheckedQuestions = function(id){			  
						  
						  if($scope.getCheckedQuesid.indexOf(id) !== -1)
						  {	
						  var array  = $scope.getCheckedQuesid;
						  var index =  array.indexOf(id);
						  $scope.getCheckedQuesid.splice(index,1);
						  }else
						  {		    	
					      $scope.getCheckedQuesid.push(id);				      
						  };						  
					  };
					 
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
					  
					  
					  $scope.check = function(){	
						
					  if($scope.getCheckedQuesid.length == 0){
						  GlobalModule_notificationService.notification("error","Please select any record");
						  }
					  else{				  
						  $('#deletelist').modal('show');
						  }			  
					  };
		
			
					$scope.deletefromList = function(){
						  
						  $(".loader").fadeOut("slow");
						    $("#deletelist").modal('hide');
						    assessEngine_Service.deleteQuestionList($scope.getCheckedQuesid).then(function(response){
							  $scope.deleteflag = response.data;	
							  $scope.getquestionbanklistcount(null,true);
							  $scope.fetchquestionbank(0,10,$scope.colName,$scope.order,$scope.search,0,$scope.questionTags,true);	
							  $scope.getCheckedAssessmentid=[];
							  if($scope.deleteflag.indexOf("success")!=-1){
								  GlobalModule_notificationService.notification("success","Record deleted successfully");
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  }
							  $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							});
					};

	//-----------------save/insert assessment  in list-----------------------	
					$scope.question={
							ans:[]
					};
					$scope.changeTemplateType = function()
					{
						$scope.question={ans:[]};
						$scope.showpreview=0;
					};
					
					$scope.changeSurvayTemplateType = function(type)
					{						
						$scope.question={ans:[],scaleAnsLabel:[]};
						
						if($('#select-que-type-survey').val() == 4)
						{							
							for(var i=0;i<5;i++){
								$scope.question.ans.push({
									isCorrect:false,
									answerText:""+(i+1)
								});
							}
								$scope.numberOfAns=5;
							
								for(var i=0;i<3;i++){
									$scope.question.scaleAnsLabel.push({
										ansLabel:""
									});
								}		
						}
						else
						{
							for(var i=0;i<4;i++){
								$scope.question.ans.push({
									isCorrect:false,
									answerText:""
								});
							}
								$scope.numberOfAns=4;
						}
					};
					
					$scope.changeInterviewAssementTemplateType = function(type)
					{						
						$scope.question={ans:[],scaleAnsLabel:[]};
						
						if($('#select-que-type-interview_assessment').val() == 9)
						{							
							for(var i=0;i<5;i++){
								$scope.question.ans.push({
									isCorrect:false,
									answerText:""+(i+1)
								});
							}
								$scope.numberOfAns=5;
							
								for(var i=0;i<3;i++){
									$scope.question.scaleAnsLabel.push({
										ansLabel:""
									});
								}		
						}
						
					};
					
					$scope.changeNumberOfAnswers =function(len){
					
						var prelen=$scope.question.ans.length;
																		
						if($scope.question.questionType == 4 || $scope.question.questionType == 9)
						{
							if(len>$scope.question.ans.length){
								for(var i=0;i<(len-prelen);i++){
									$scope.question.ans.push({
										isCorrect:false,
										answerText:""+(prelen+i+1)
									});
								}
								}else{
									for(var i=$scope.question.ans.length;i>=(len);i--){
										$scope.question.ans.splice(i, 1);
									}
								}
						}
						else
						{
							if(len>$scope.question.ans.length){
								for(var i=0;i<(len-prelen);i++){
									$scope.question.ans.push({
										isCorrect:false,
										answerText:""
									});
								}
								}else{
									for(var i=$scope.question.ans.length;i>=(len);i--){
										$scope.question.ans.splice(i, 1);
									}
								}
						}
					};
					
					$scope.changeQuestionFor = function(id){
						
						$scope.question={ans:[]};
						$scope.showpreview=0;
						$scope.question.typeId=id;												
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
					
					$scope.previewMedia = function(format,i)
					{						 
						var input = document.getElementById('que-file-upload'+i);
						
						 if (input.files && input.files[0]) {
					    	    var reader = new FileReader();

					    	    reader.onload = function(e) {
					    	    	$scope.mediaPath= e.target.result;
					    	    };

					    	    reader.readAsDataURL(input.files[0]);
					    	  }
						 $scope.showpreview=format;
						  if(input.value!="")
							{
							   
							var file = input.files[0];
							var formData = new FormData();
							formData.append("file",file);
							$.ajax({
								url: 'rest/user/upload/userprofile',
								type: 'POST',
								data: formData,
								async: true,
								cache: false,
								contentType: false,
								processData: false,
								success: function (returndata) {
									$scope.fetchfiledata =JSON.parse(returndata);
									 
									 if($scope.fetchfiledata != undefined)
										{
										// $scope.mediaPath = $scope.fetchfiledata.fileURL;
										 //$scope.showpreview=format;
										 $scope.question.questionMedia = $scope.fetchfiledata.fileURL;
										 
										 ////console.log($scope.mediaPath);
										}
									}
									});
								}
					};
					
					
					$scope.toSetSingleCorrectvalue = function(index)
					{
						
						for(var i=0;i<4;i++)
							{
							if(i == index)
								{
								$scope.question.ans[i].isCorrect=true;
								}
							else{
								$scope.question.ans[i].isCorrect=false;
								}
							}
					};

					$scope.cancelToAddQuestion = function(){
						$scope.questionTags=[];
						$scope.question={};
						$scope.mediaPath="";
						 $(".box").hide();
						 $scope.selectAllbrands=false;
						 $scope.checkedbrand=false;
						 $scope.selectAllShips=true;
						 $scope.selectAlldept=false;
						 $scope.checkeddept=false;
						 $scope.selectAllPosition=false;
						 $scope.checkedpos=false;
						 $scope.fetchshiplist(0);
						 $scope.filterPosition=[];
						 $('#TagAll').find('input[type=checkbox]:checked').prop('checked', false);
						 $scope.questionTypeId=1;
						 $scope.response="";
						
						 
					};
					 $scope.clearFile = function(){
						 $scope.mediaPath="";
						 $scope.showpreview="";
					 };
					
					$scope.clearData = function()
					{
						// $scope.fetchAnsList=false;
						$scope.selectAllbrands=false;
						 $scope.checkedbrand=false;
						 
						 $scope.selectAlldept=false;
						 $scope.checkeddept=false;
						 $scope.selectAllPosition=false;
						 $scope.checkedpos=false;
						 $scope.fetchshiplist(0);
						$scope.questionTags=[];
						$scope.question={};
						 $scope.filterPosition=[];
					};
					
					$scope.clearQuestion = function(){
						$scope.question.questionText="";
						$scope.question.ans=[];
						$scope.question.questionMedia="";
						$scope.question.questionMediaType="";
						$scope.mediaPath="";
						$scope.showpreview="";
					};
					
					var queExist=function()
					 {
									 
						 
						 if($scope.questionsList!=null && $scope.questionsList.length>0 &&  $scope.questionsList[0].questionText==$scope.question.questionText){
							 
							  GlobalModule_notificationService.notification("error","Question is already exist");
							 // $scope.selectedQuetionAns=null;
							  $scope.clearQuestion();
							 return false;
						 	}
					 else
							 {
							 return true;
							 
							 }
						// return true;
						/*
						 else if($scope.questionsList!=null && $scope.questionsList.length>0 && $scope.questionsList[0].questionText != $scope.question.questionText)
							 {
							 
							 	isAllTagsChacked();
							 }
						 */
						 
					 };
					
	$scope.saveQustionbank = function(question){ 
		
		
		if(($scope.questionTypeId == 2 || $scope.questionTypeId == 3)  && question.questionText != null)
		{
			
			for(var j=question.ans.length-1;j>=0;j--)
			 {
			 if(question.ans[j].answerText == "")
				 {
				 question.ans.splice(j,1);
				 
				}
			 }
			
		}
		 
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  
		  question.tags=$scope.questionTags;
	  	if(question.questionText != undefined){
	  		if(queExist() && isAllTagsChacked() && uniqueAns(question.ans,question.questionType)){
	  			
		  if(question.level==undefined){
			  question.level=1;
		  }
		  if(question.questionMediaType==undefined || question.questionMediaType=="")
			  {
			  question.questionMediaType=4;
			  }
		 for(var i=0;i<question.ans.length;i++)
			 {
			 if(question.ans[i].isCorrect==undefined)
			 {
				 question.ans[i].isCorrect=false;
			 }
			 }
		 if(question.questionType == 4)
		 {
			 for(var i=0;i<question.scaleAnsLabel.length;i++)
			 {
				 if(question.scaleAnsLabel[i].isCorrect==undefined)
				 {
					 question.scaleAnsLabel[i].isCorrect=false;
				 }
			 } 
		 }		 
		 if(question.isVoiceEnabled==undefined){
			 question.isVoiceEnabled=false;
		 }
		 if(question.questionType==5 || question.questionType==6){
			 question.questionType=2; 
		 }
		 if(question.questionType==7){
			 question.questionType=3; 
		 }
		 if(question.questionType==8){
			 question.questionType=1; 
		 }
		 if(question.questionType==9){
			 question.questionType=4; 
		 }
		 question.assessmentCategoryId=$scope.questionTypeId;
		 ////console.log($scope.question);
		 question.userid=$rootScope.userdetails.id;
		 $(".loader").show();
		  assessEngine_Service.saveQustionbank(question).then(function(response){
				  $scope.saveFlag= response.data;
				
				
				 if($scope.saveFlag.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Question created successfully");
					  $scope.cancelToAddQuestion();
						$scope.getquestionbanklistcount(null,true);
						$scope.fetchquestionbank(0,10,$scope.colName,$scope.order,$scope.search,0,$scope.questionTag,true);	
						 $("#create-questionair").hide();
					       $("#questionnaire-tabel").show();
					 // location.reload();
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
	  	}	    	
	  	  else
	  		{
	  		  if($scope.questionTypeId == 3){
	  			GlobalModule_notificationService.notification("error","Please select question type");  
	  		  }else{
	  			GlobalModule_notificationService.notification("error","Please enter valid value in question text");  
	  		  }
	  		
	  		}
		  };
		  
		 var uniqueAns = function(answer,questionType){
			 var count=0;
			 if(answer.length != undefined && questionType>1)
				 {
				 for(var i=0;i<answer.length;i++){
					 for(var j=i+1;j<answer.length;j++)
						 {
						 if(answer[i].answerText == answer[j].answerText)
							 {
							 GlobalModule_notificationService.notification("error","Duplicate answers");
							  return false;
							 }
						 }
					 if(answer[i].isCorrect==true){
						 count++;
					 }
				 }
				 if(count==0 && $scope.questionTypeId==1)
					 {
					 GlobalModule_notificationService.notification("error","please select at least one right answer");
					  return false;
					 }
					 
				 }
			 return true;
		 };
		 
		var isAllTagsChacked = function(){
			
			/* if($scope.questionsList!=null && $scope.questionsList.length>0 && $scope.questionsList[0].questionText==$scope.question.questionText){
				 
				  GlobalModule_notificationService.notification("error","Question is already present");
				 return false;
			 	}*/
			 
			var checkedBrands=0;
			var checkedShips=0;
			var checkedPos=0;
			var checkedDept=0;
			var checkedQuesCat=0;
			if($scope.questionTypeId == 1 || $scope.questionTypeId == 3)
			{
				for(var i=0;i<$scope.questionTags.length;i++){
					if($scope.questionTags[i].tag_type==1)
						checkedBrands++;
					if($scope.questionTags[i].tag_type==2)
						checkedShips++;
					if($scope.questionTags[i].tag_type==3)
						checkedDept++;
					if($scope.questionTags[i].tag_type==4)
						checkedPos++;
					if($scope.questionTags[i].tag_type==5)
						checkedQuesCat++;
				}
				if(checkedBrands==0)
				{
					  GlobalModule_notificationService.notification("error","Please add at least one brand tag");
					  return false;
				}
				/*if(checkedShips==0)
				{
					  GlobalModule_notificationService.notification("error","Please add at least one ship tag");
					  return false;
				}*/
				if(checkedDept==0)
				{
					  GlobalModule_notificationService.notification("error","Please add at least one department tag");
					  return false;
				}
				if(checkedPos==0)
				{
					  GlobalModule_notificationService.notification("error","Please add at least one position tag");
					  return false;
				}
				if(checkedQuesCat==0 && ($scope.questionTypeId == 1 || $scope.questionTypeId == 3))
				{
					  GlobalModule_notificationService.notification("error","Please add at least one category tag");
					  return false;
				}			
			}
			return true;
		}; 

	 
			
			$scope.fetchbrandlist = function(){					 
				assessEngine_Service.fetchbrandlist().then(function(response){
					 $scope.brandlist=response.data;	
					// $scope.shiplist[i].id=null;
					// $scope.shiplist={};
					 ////console.log($scope.brandlist);
				  }); 
			 };$scope.fetchbrandlist();
			// $scope.shiplist={};
			 $scope.selectAllShips=true;
			// $scope.shiplist={};
			 $scope.fetchshiplist = function(id){					 
					assessEngine_Service.fetchshiplist(id).then(function(response){
						 $scope.shiplist=response.data;	
						 $scope.shiplist[i].id=null;
						 ////console.log($scope.shiplist);
						 for(var i=0;i<$scope.shiplist.length;i++)
							{
								var addTag={
										tag_type: 2,
										tag_id: $scope.shiplist[i].id
								};
								$scope.questionTags.push(addTag);
								// $scope.shiplist[i].id=null;
							}
						
					  }); 
					// $scope.shiplist[i].id=null;
					$scope.shiplist={};
				 }; $scope.fetchshiplist(0);
				 
			 $scope.fetchdepartmentlist = function(){					 
						assessEngine_Service.fetchdepartmentlist().then(function(response){
							 $scope.departmentlist=response.data;	
							 ////console.log($scope.departmentlist);
						  }); 
					 };$scope.fetchdepartmentlist();
					 
					 $scope.fetchQuestionCategorylist = function(){					 
							assessEngine_Service.fetchQuestionCategorylist().then(function(response){
								 $scope.questionCategory=response.data;	
								 ////console.log($scope.questionCategory);
							  }); 
						 };$scope.fetchQuestionCategorylist();		 
					 
			 $scope.fetchpositionlist = function(id){		
				 if(id==0)
					 {
					 $scope.filterPosition=[];
					 }
				 
							assessEngine_Service.fetchpositionlist(id).then(function(response){
								 $scope.positionlist=response.data;	
								// $scope.positionlist={};
								
								 for(var i=0;i<$scope.positionlist.length;i++){
										$scope.filterPosition.push($scope.positionlist[i]);
									}
								 ////console.log($scope.filterPosition);
							  }); 
							 $scope.positionlist={};
						 }; 
						// $scope.positionlist={};
						 
				// ------tagging questions------	
			$scope.questionTags=[];
			$scope.filterPosition=[];
			$scope.filterpositionlist = function(check,id){
				if(check==true){
					if(id==0)
						{
						$scope.filterPosition=$scope.positionlist;
						}
					else
						{
						$scope.fetchpositionlist(id);
						$scope.filterPosition.push($scope.positionlist);
						}
						
				}else{
					if(id==0){
						 $scope.filterPosition=[];
						var taglength=$scope.questionTags.length;
						for(var i=taglength;i>=0;i--)
						{
						if($scope.questionTags[i].tag_type == 4)
							{
							$scope.questionTags.splice(i, 1);
							}
						}
					}
					else{
						for(var i=0;i<$scope.filterPosition.length;i++)
						{
						if($scope.filterPosition[i].category.id == id)
							{
							$scope.filterPosition.splice(i, 1);
							for(var j=0;j<$scope.questionTags.length;j++)
							{
							if($scope.questionTags[i].tag_id == $scope.filterPosition[i].id)
								{
								$scope.questionTags.splice(j, 1);
								}
							}
							}
						}
					}
				}
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
								////console.log($scope.filterPosition);
						}
				}
			};
						 
			
			$scope.addToTag = function(check,id,tagType){
				if(check == true)
					{
					var addTag={
							tag_type: tagType,
							tag_id: id
					};
					$scope.questionTags.push(addTag);
					}
				else{
					if(tagType==3){
						$scope.deletePostiontagbyId(id);
					}
					var deleteTag={
							tag_type: tagType,
							tag_id: id
					};
					
					var taglength=$scope.questionTags.length;
					for(var i=taglength-1;i>=0;i--)
					{
						
						if(deleteTag.tag_type == $scope.questionTags[i].tag_type && deleteTag.tag_id==$scope.questionTags[i].tag_id)
							{
							$scope.questionTags.splice(i, 1);
							}
						}
				}
				////console.log( $scope.questionTags);
			};
			
			$scope.deletePostiontagbyId = function(id){
				 for (var i=0;i<$scope.filterPosition.length;i++){
					 if($scope.filterPosition[i].category.id==id){
							 var postionId=$scope.filterPosition[i].id;
							 var taglength1=$scope.questionTags.length;
							 for(var j=taglength1-1;j>=0;j--)
								{
									if($scope.questionTags[j].tag_type==4 && postionId==$scope.questionTags[j].tag_id)
										{
										$scope.questionTags.splice(j, 1);
										}
								}
					 }
				 }
			 };
			 
			$scope.selectAllTags = function(check,tagType){
				if(check== true)
					{
					for(var i=0;i<$scope.questionTags.length;i++)
					{
					if($scope.questionTags[i].tag_type == tagType)
						{
						$scope.questionTags.splice(i, 1);
						}
					}
				if(tagType==1)
					{
					for(var i=0;i<$scope.brandlist.length;i++)
					{
						var addTag={
								tag_type: 1,
								tag_id: $scope.brandlist[i].id
						};
						$scope.questionTags.push(addTag);
					}
					}
				if(tagType==2)
				{
				for(var i=0;i<$scope.shiplist.length;i++)
				{
					var addTag={
							tag_type: 2,
							tag_id: $scope.shiplist[i].id
					};
					$scope.questionTags.push(addTag);
				}
				}
				if(tagType==3)
				{
				for(var i=0;i<$scope.departmentlist.length;i++)
				{
					var addTag={
							tag_type: 3,
							tag_id: $scope.departmentlist[i].id
					};
					$scope.questionTags.push(addTag);
				}
				}
				if(tagType==4)
				{
				for(var i=0;i<$scope.filterPosition.length;i++)
				{
					var addTag={
							tag_type: 4,
							tag_id: $scope.filterPosition[i].id
					};
					$scope.questionTags.push(addTag);
				}
				}
				if(tagType==5)
				{
				for(var i=0;i<$scope.questionCategory.length;i++)
				{
					var addTag={
							tag_type: 5,
							tag_id: $scope.questionCategory[i].id
					};
					$scope.questionTags.push(addTag);
				}
				}
					
				}else{
						if(tagType==3){
							$scope.filterPosition=[];
							$scope.selectAllPosition=false;
							$scope.checkedpos=false;
						}
						var taglength=$scope.questionTags.length;
						for(var i=taglength-1;i>=0;i--)
						{
							if(tagType==3 && $scope.questionTags[i].tag_type==4){
								$scope.questionTags.splice(i, 1);
							}
							else if($scope.questionTags[i].tag_type == tagType)
							{
							$scope.questionTags.splice(i, 1);
							}
						}
					}
				////console.log( $scope.questionTags);
			};
			
			$scope.checkResponse = function(id){
				if(id==1){
					$scope.question.isVoiceEnabled=true;
					$scope.question.isvideoEnabled=false;
				}else if(id==2){
					$scope.question.isVoiceEnabled=false;
					$scope.question.isvideoEnabled=true;
				}else{
					$scope.question.isVoiceEnabled=false;
					$scope.question.isvideoEnabled=false;
				}
				////console.log($scope.question);
			};
			
			/*$scope.changeQuestionFor = function(){
				$('#type-ui').hide();
			}*/
			
}]);