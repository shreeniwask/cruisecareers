var controllers = angular.module('LoginModule');

controllers.controller('InterviewTemplater_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','interview_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,interview_Service)
{
	var squence=0;
	$scope.interviewtemplateFlag=true;
	$scope.interviewTemplateeditFlag=false;
	$scope.selectedTemplateId=-1;
	$scope.TemplateQuestion=[];
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    $scope.interviewtemplateFlag =  GlobalModule_dataStoreService.loadData('LoginModule','interviewtemplateFlag');
    if($scope.interviewtemplateFlag==false){
    	$scope.interviewtemplate = GlobalModule_dataStoreService.loadData('LoginModule','interviewtemplate');
    	
    	 $scope.interviewTemplateeditFlag = GlobalModule_dataStoreService.loadData('LoginModule','interviewTemplateeditFlag');
  
    GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplateFlag', true);
    
    }
    
    $scope.fetchTemplateQuestion = function(id){	
    	$scope.TemplateQuestion=[];
    	interview_Service.fetchTemplateQuestion(id).then(function(response){
			  $scope.TemplateQuestion = response.data;			  
			 
			  if($scope.TemplateQuestion.length>0)
				  {
			        squence=$scope.TemplateQuestion[$scope.TemplateQuestion.length-1].squence;
				  }
			
			  GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplateFlag', false);
			  GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', true);
				 
			  GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateQuestions',  $scope.TemplateQuestion);
		  },function(response){
				
			});
	  };
   
    if($scope.interviewTemplateeditFlag==true)
    	{
    	//$scope.TemplateQuestion= GlobalModule_dataStoreService.loadData('LoginModule','interviewTemplateQuestions');
    	$scope.selectedTemplateId = GlobalModule_dataStoreService.loadData('LoginModule','interviewTemplateId');
    	$scope.TemplateQuestion = $scope.fetchTemplateQuestion($scope.selectedTemplateId);
    	//squence=$scope.TemplateQuestion[$scope.TemplateQuestion.length-1].squence;
    	GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', false);
    	}
    
   //alert( $scope.interviewtemplate.templateName);
  //----------------View/fetch InterviewTemplate list ------------------------- 
	 $scope.fetchInterviewTemplateList= function(offset,limit,colName,order,search){
	
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
			 
		 interview_Service.fetchInterviewTemplateList(offset,limit,colName,order,search).then(function(response){
			 $scope.interviewList=response.data;
			 	
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchInterviewTemplateList(0,20,null,null,null);
	 
	 
	 $scope.SortingfetchInterviewTemplateList= function(colName,searchterm){
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
			$scope.fetchInterviewTemplateList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		//.......QuestionTemplate  fetch list...........
		
		
		
		$scope.getData = function()
		{
			$scope.TemplateQuestion=[];
			GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', false);
			$state.go("restricted.admin.createInterviewTemplate");
			 $scope.fetchTemplateQuestion();
			 
			 $scope.interviewtemplate = {
			  /*templateName:"",
			  position:{
				  id:""
			           }		*/	  
			 };
			 GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplate',  $scope.interviewtemplate);
		};
		
			 // $scope.fetchTemplateQuestion();
			  
			  
			 /* $scope.fetchTemplateQuestion = function(id){
					$(".loader").show();
					//$scope.currentPage = 1;
					$scope.templateQuestion=[];
					//alert($scope.userIdInterview+"  "+$scope.jobIdInterview);
					Admin_Service.fetchTemplateQuestion(id,$scope.userIdInterview,$scope.jobIdInterview).then(function(response){
						 $scope.templateQuestion =response.data;
				
						// $scope.transalate();
						 $(".loader").fadeOut("slow");
					 },function(response){
							$(".loader").fadeOut("slow");
						});
					$scope.changetemp=0;
					
				};
				$scope.changetemp=0;
				$scope.OnChangeTemplate = function(temp){
					
					if($scope.templateQuestion.length > 0 && $scope.changetemp==0)
						{
						$('#changeTemplate').modal({
						    backdrop: 'static',
						    keyboard: false
						});
						$("#examselector").attr('disabled', 'disabled');
						$("#changeTemplate").modal("show");
						
						}
					else
						{
						$("#examselector").removeAttr('disabled');
						}
					
				};*/
			  
			  
			  
			  // fetchInterviewTemplateList for update 
			  
			  
			  		
		// ----------------View/fetch position  list ------------------------- 
		/*$scope.getData = function()
		{
			$state.go("restricted.admin.createInterviewTemplate");
			 $scope.fetchPositionList();
			 
			 $scope.clear=function(){
				 
				  $scope.interviewtemplate = {
						  templateName:"",
						  position:{
							  id:0
						           }			  
			  };
		}; 
		}
		*/
		$scope.fetchPositionList = function(){		
			interview_Service.fetchPositionList().then(function(response){
				  $scope.positionList = response.data;				  
			  },function(response){					
				});
		  };
		  $scope.fetchPositionList();
  
	$scope.setButton = function(){
		$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			 $scope.fetchInterviewTemplateList();
		};
		
	
		
		
			
		$scope.addTemplateQuestion = function(){
		//	squence=$scope.TemplateQuestion[$scope.TemplateQuestion.length-1].squence;
			squence++;
			$scope.TemplateQuestion.push({
				squence:squence,
				question:""
			});
		};
		
		$scope.removeTemplateQuestion = function(index)
		{ 
			squence--;
			question:"";
			$scope.TemplateQuestion.splice(index,1);
			for(var i=0;i<$scope.TemplateQuestion.length;i++){
				$scope.TemplateQuestion[i].squence=i+1;
				var val=i+1;
				$("#sequence"+i).val(val);
			}							
		};	
		
		
		
		
		/*$scope.usercomplianceid =[];
		  $scope.removeTemplateQuestion = function(item) 
	      {
			if(item.id != undefined){
				$scope.usercomplianceid.push(item.id);
		  }
	        angular.forEach( $scope.TemplateQuestion, function(value, key) 
	       {
	            if (value==item) 
	            {
	            	 $scope.TemplateQuestion.splice(key, 1);
	            }
	        });			    
	      };*/
		
				
		$scope.cancelled= function(){
	      $state.go("restricted.admin.interviewtemplate");
			 };
			 
			 
		 $scope.interviewTemplatedata = function(data){	
		
			 	//console.log(data);
			 	
				// $scope.fetchTemplateQuestion(data.id);
				 GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', true);
				 GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplateId', data.id);
				 GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplateFlag', false);
				  GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplate',data);				
			    // $scope.addTemplateQuestion();
			    // $scope.removeTemplateQuestion(index);
				  $state.go("restricted.admin.createInterviewTemplate");
			  };
			  
			  
			  
			//------pagination--------------------------------
				
			 	$scope.offset=0;
				$scope.limit=10;
				$scope.navButtons = [];
			 $scope.setButton = function(){
					$scope.navButtons = [];
					
						for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
						$scope.navButtons.push(j);
						}		
						 $scope.fetchInterviewTemplateList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
					};
					
			  $scope.getInterviewTemplateyListCount=function(search){
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
					 interview_Service.getInterviewTemplateyListCount($scope.search).then(function(response){
						$scope.count = response.data;
					
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						
						$(".loader").fadeOut("slow");
						
					});		
				};
				$scope.getInterviewTemplateyListCount(null);
			    
				
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
			        $scope.fetchInterviewTemplateList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			    };
			 
			  //----pagination end------
			  
			  
			  
		
		//----------------delete  Interview Template  from list ------------------------- 
		  
		   //----------Get no of checked Interview Template -------
				  
				  $scope.getCheckedInterviewTemplateid=[];
				  
				  $scope.checkedInterviewTemplateList= function(id){			  
					  
					  if($scope.getCheckedInterviewTemplateid.indexOf(id) !== -1)
					  {		
					  var array  = $scope.getCheckedInterviewTemplateid;
					  var index = array.indexOf(id);
					  $scope.getCheckedInterviewTemplateid.splice(index,1);
					  }else
					  {		    	
				      $scope.getCheckedInterviewTemplateid.push(id);				      
					  };						  
				  };
				 
				  $scope.checkedAllList = function(listedInterviewTemplate,rd){				  
					  if(rd == true || rd == undefined){				 
					  for(var i=0; i<listedInterviewTemplate.length; i++){					  
						  
						  //if already exist in getCheckedtemplateid than don't pass
						  if($scope.getCheckedInterviewTemplateid.indexOf(listedInterviewTemplate[i].id) !== -1)   {  						 
						  }else{
							  $scope.checkedInterviewTemplateList(listedInterviewTemplate[i].id);	
						  }
						  
					  }			
					  }else{
						  $scope.getCheckedInterviewTemplateid=[];
					  }
				  };
			
				  $scope.check = function(){	
					
				  if($scope.getCheckedInterviewTemplateid.length == 0){
					  GlobalModule_notificationService.notification("error","Please select any record");
					  }
				  else{				   
					  $('#deletelist').modal('show');
					  }			  
				  };
			//-----------------------------------------------------------------------	  
				
		
$scope.deletefromList = function(formlist){
	  
	$(".loader").show();
	  $scope.formlist=formlist;
	    $("#deletelist").modal('show');
	    interview_Service.deleteInterviewTemplateList($scope.formlist,$scope.getCheckedInterviewTemplateid).then(function(response){
		  $scope. InterviewTemplateflag = response.data;	
		$scope.getInterviewTemplateyListCount(null);
		  $scope.fetchInterviewTemplateList(0,20,null,null,null);
		  $scope.getCheckedInterviewTemplateid=[];
		 //location.reload();
		  if($scope.InterviewTemplateflag.indexOf("success")!=-1){
			  GlobalModule_notificationService.notification("success","Record deleted successfully");
			  //$scope.fetchLevelList();
		  }else{
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			 
		  }
		  $(".loader").fadeOut("slow");
	  },function(response){
		  $(".loader").fadeOut("slow");
		});
};

		

	
	//................ delete end.............//
	
	
	  //-----------------save/insert Interview Template  in list-----------------------	
	  
	  $scope.SaveInterviewTemplate=function(interviewtemplate){ 
		  
		 // alert("save");
		  interviewtemplate.templateQuestion=$scope.TemplateQuestion;
		  $(".loader").fadeOut("slow");
		  var letterNumber = /^[a-z A-Z0-9!@\#\`\~\$%\^\&*/\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._-]+$/;  
		  
	    	if(interviewtemplate.templateName == "" || interviewtemplate.templateName.match(letterNumber)){
	    		 
		 
	    		interviewtemplate.userid=$rootScope.userdetails.id;
	    	//	//console.log(interviewtemplate);
			 interview_Service.SaveInterviewTemplate(interviewtemplate).then(function(response){
				  $scope.interviewflag = response.data;
			
				
				  $scope.getInterviewTemplateyListCount(null);
				  $scope.fetchInterviewTemplateList(0,10,null,null,null);
				  $scope.interviewtemplate={};
				// $state.path('/interviewtemplate');
				  /*if($scope.usercomplianceid.length > 0){
					   for(var i=0;i<$scope.usercomplianceid.length;i++){
						   var obj ={};obj.id = $scope.usercomplianceid[i];
						   interviewtemplate.push(obj); 
					   }*/
				
				 if($scope.interviewflag.indexOf("success")!=-1){
					 GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', false);
					  GlobalModule_notificationService.notification("success","Your Interview Template Details saved successfully");
					  $state.go("restricted.admin.interviewtemplate");
				 }
				 else if($scope.interviewflag =='"failed"'){
					  GlobalModule_notificationService.notification("error","InterviewTemplate Name already exist");
					  $("#interview_add").modal('hide');
					  
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
		  };
		  
	  $scope.clear=function(){
		  $scope.interviewtemplate = {
				  templateName:"",
				  position:{
					  id:0
				           }			  
	  };
		  $scope.TemplateQuestion=[];		  
		  GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplateFlag', true);
		  GlobalModule_dataStoreService.storeData('LoginModule','interviewtemplate', $scope.interviewtemplate);
		  GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateeditFlag', false);
			 
		  GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateQuestions',  $scope.TemplateQuestion);
	
		  $state.go("restricted.admin.createInterviewTemplate");
		
	}; 
	/* $scope.interviewtemplate={
			 id:0,templateName:"",
			  position:{
				  id:0
			           }
	 };*/
		 /* $scope.interviewtemplatedata=function(p){
			
			  $scope.interviewtemplate.id=p.id;
			  $scope.interviewtemplate.templateName=p.templateName;
			  $scope.interviewtemplate.position.id=p.position.id;
			  $state.path('/createInterviewTemplate');
		 };*/
		 
		 
		 
		 
		
		 
		/*//----------------update Interview   Template  in details-------------------------
		  $scope.updateInterviewTemplate=function(interviewtemplate){
			  
			  $(".loader").fadeOut("slow");
			///  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._-]+$/;  
			  
		    	if(interviewtemplate.templateName == undefined || interviewtemplate.templateName.match(letterNumber)){
		    				    	
		    		interviewtemplate.userid=$rootScope.userdetails.id;
		
		    		interview_Service.updateInterviewTemplate(interviewtemplate).then(function(response){
				  $scope.updateInterviewTemplateflag = response.data;
		
				 $scope.getInterviewTemplateyListCount(null);
				  $scope.fetchInterviewTemplateList(0,10,null,null,null);
				  $scope.interviewtemplate={};
				  if($scope.updateInterviewTemplateflag.indexOf("success")!=-1){
					  
					  GlobalModule_notificationService.notification("success","Your InterviewTemplate Details updated successfully");
				  
					  $state.path('/createInterviewTemplate');
					 
					  $("#interview_edit").modal('hide');
					  
				  }
				  else if($scope.updateInterviewTemplateflag=='"failed"'){
					  
					  GlobalModule_notificationService.notification("error","InterviewTemplate Name already exist .Please Try again ");
					  $("#interview_edit").modal('hide');
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
		};
*/
		  

		/*	 $scope.updateInterviewTemplate =function(p){	
				 
				 $scope.match = false;
				$scope.interviewtemplate.InterviewTemplateUpdate = $scope.InterviewTemplateUpdate;
				$scope.interviewtemplate.templateNameS = $scope.templateName;		
				$scope.interviewtemplate.id = $scope.position.id;
				$scope.interviewtemplate.userid = $rootScope.userdetails.id;				
				
				for (var j=0;j<$scope.interviewtemplate.InterviewTemplateUpdate.length;j++) {
				    for (var k=j+1;k<$scope.interviewtemplate.InterviewTemplateUpdate.length;k++) {
				        if ($scope.interviewtemplate.InterviewTemplateUpdate[k].user.id == $scope.interviewtemplate.InterviewTemplateUpdate[j].user.id){ 		        	
				        	$scope.match = true;		            
				        }
				    }
				}
				
				
				if($scope.match == true){
				GlobalModule_notificationService.notification("error","You can't add the same user more than once. Please remove duplicate users!");	
				} 
				else{
					interview_Service.updateInterviewTemplate($scope.interviewtemplate).then(function(response){
					  $scope.result = response.data;
					  
					  if($scope.result!="success"){					  
						  GlobalModule_notificationService.notification("success","Record updated successfully");
						 
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }			   
					  $state.go("restricted.admin.interviewtemplate");
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
				}
			
			 };
		  
		  */
		  
		  
		  
}]);
