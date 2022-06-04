var controllers = angular.module('LoginModule');

controllers.controller('generateReport_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','assessEngine_Service','generateReport_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,assessEngine_Service,generateReport_Service,Master_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    
    $scope.surveyObj = GlobalModule_dataStoreService.loadData('LoginModule','surveyObj');
    
    //console.log($scope.surveyObj);
    
  $scope.fetchallassignetime = function(surveyId){    	
    	generateReport_Service.fetchallassignetime(surveyId).then(function(response){
			 $scope.surveyTimelist=response.data;			
			 //call all the method for initial load with first surveycombinationId
			 $scope.selectedDate($scope.surveyTimelist[0].id);
			 $scope.dateId = $scope.surveyTimelist[0].id;
			 //console.log($scope.surveyTimelist);
		 }); 
    };
    $scope.fetchallassignetime($scope.surveyObj.id);
    
    $scope.selectedDate=function(surveycombinationId){    
    	$(".loader").show();
    	$scope.selectedSurveyComId = surveycombinationId;
    	
    	$scope.fetchquestionData(surveycombinationId); 
    	$scope.fetchsurveyAssigneCount(surveycombinationId);
        $scope.fetchsurveyAttemptCount(surveycombinationId); 
        $scope.showflag=1;
        $("#summary-survey").show();
			$("#crosstab").hide();
			 var summary=angular.element(document.getElementById('summary'));		    	 	    	 
			 summary.attr("class", "active");
	    	 var crosstabmenu=angular.element(document.getElementById('crosstabmenu'));		    	 	    	 
	    	 crosstabmenu.attr("class", "");
        $(".loader").fadeOut("slow");
    }; 
       
    $scope.fetchquestionData = function(surveycombinationId){
    	generateReport_Service.fetchquestionData(surveycombinationId).then(function(response){
			 $scope.questionData=response.data;	 
		 
			 //console.log($scope.questionData);
		 }); 
    };
   
    
    $scope.fetchsurveyAssigneCount = function(surveycombinationId){
    	generateReport_Service.fetchsurveyAssigneCount(surveycombinationId).then(function(response){
			 $scope.SurveyAssigneCount=response.data;
			 
						/*$scope.maximum=Math.pow(10, $scope.SurveyAssigneCount.toString().length);;
			$scope.stepping=$scope.maximum/10;*/
			 			 
		 }); 
    };
       
    $scope.fetchsurveyAttemptCount=function(surveycombinationId){
    	 
    	generateReport_Service.fetchsurveyAttemptCount(surveycombinationId).then(function(response){
			 $scope.surveyAttemptCount=response.data;	
			 //console.log($scope.surveyAttemptCount);
		 }); 
    };
    
    $scope.fetchuserList=function(ansId,qId){    	 
    	generateReport_Service.fetchuserList(ansId,qId,$scope.selectedSurveyComId).then(function(response){
			 $scope.usersList=response.data;	
			 
			 if($scope.usersList.length == 0){
				 GlobalModule_notificationService.notification("error","User count is zero");
			 }else{
				 $("#print_candidates").modal('show');	
				 //console.log($scope.usersList);
			 }
			  
		 }); 
    }; 
 
    	
    	
    	$scope.chart=function(q,index){ 
    	 
    		$(".loader").show();
			 var AnsList=[];
			 var Count=[];
			 
			 var temp=0;
			 for(var j=0;j<q.ans.length;j++){
				 AnsList.push(q.ans[j].answerText);
				 Count.push(q.ans[j].count);
				 
				 if(q.ans[j].count != 0)
					 temp=q.ans[j].count;
			 } 
			 
			 if(temp==0)
			 {
				 GlobalModule_notificationService.notification("error","No one responded yet!");
				 $('#'+index).hide();
				 $(".loader").fadeOut("slow");
				 return;
			 }
			 /*------------------------------------------*/
			 var maximum=getMaximumValue(q);
			 
			 var stepping=getStepping(maximum);
			 /*--------------------------------------*/
		 
       $scope.dataPack1 = Count; //count of Ans
	   $scope.dates = AnsList; //Ans option
	   
    $scope.bar_ctx = document.getElementById('myChart'+index);
  
	$scope.bar_chart = new Chart($scope.bar_ctx, {
	    type: 'bar',
	    data: {
	        labels: $scope.dates,
	        datasets: [
	        {
	        	label: "Options",
	            backgroundColor: "rgba(124, 181, 236, 0.57)",
	            borderColor: "rgb(124, 181, 236)",
	            borderWidth: 2,
	            hoverBackgroundColor: "rgba(124, 181, 236, 0.57)",
	            hoverBorderColor: "rgb(124, 181, 236)",
	            data: $scope.dataPack1,          
	        },
	        ]
	    },
	    options: {
	        animation: {
	          duration: 1000,
	        },
	      
	        scales: {
	          xAxes: [{ 
	            gridLines: { display: false },
	            scaleLabel: {
	              display: false,
	              labelString: 'Options'
	            }
	            }],
	          yAxes: [{ 
	           scaleLabel: {
	              display: true,
	              labelString: 'Number of Candidates',
	            },
	            ticks: {
	              beginAtZero: true,
	              max: maximum,
		          stepSize: stepping,
	            }, 
	          }],
	        },
	        legend: {
	          display: true,
	          position: 'bottom',
	          legendMarkerType: "triangle",
	          labels: {
	                fontColor: '#000',
	                fontFamily: 'roboto',
	                fontSize: 16,
	             }
	        }
	    } 
	  }
	);
	$(".loader").fadeOut("slow");
   };
    	
    	
    //-------------------Generate Cross-tab---------------------------
    	
    	$scope.fetchSurveyQuestions=function()
    	{
    		$(".loader").show();
    		
    		generateReport_Service.fetchSurveyQuestions($scope.surveyObj.id).then(function(response){
   			 $scope.surveyQuestionsList=response.data;	
   			 
   			 //console.log($scope.surveyQuestionsList);
   			$scope.questionsList=[];
    		$scope.questionsIdsForCrosstab=[]; 
   			$scope.showflag=2;
   			$("#summary-survey").hide();
   			$("#gotoque").hide(); 
   			$("#generated_survey").hide();
   			$("#crosstab").show(); 
   			$(".btn-cntnr").show();   			
    		$("#av").show();
    		
   			$(".loader").fadeOut("slow");
   		 });
    	};	
 
    	$scope.questionsIdsForCrosstab=[];
    	$scope.getSelectedForGenerate=function(queId){
    		        		
    		if($scope.questionsIdsForCrosstab.indexOf(queId) !== -1)
			{		
				  var array  = $scope.questionsIdsForCrosstab;
				  var index = array.indexOf(queId);
				  $scope.questionsIdsForCrosstab.splice(index,1);
				  return;
			}    		
    		if($scope.questionsIdsForCrosstab.length < 2)
    		{	    	
			      $scope.questionsIdsForCrosstab.push(queId);				      				 
    		}
    		else
    		{
    			GlobalModule_notificationService.notification("error","You can select only 2 Questions");
    			var checkid = $('#' + queId);
    			checkid.prop("checked", false);
    		}

			//console.log($scope.questionList);
    	};
    	
    	
    	$scope.generateCrossTab=function(){
    		
    		$(".loader").show();
    		
    		if($scope.questionsIdsForCrosstab.length < 2)
    		{
    			GlobalModule_notificationService.notification("error","Please select any 2 Questions");
    			$(".loader").fadeOut("slow");
    			return;
    		}
    		    		
    		$scope.questionsList=[];
			for(var i = 0;i<$scope.questionsIdsForCrosstab.length;i++)
			{
				for(var j = 0;j<$scope.surveyQuestionsList.length;j++)
				{
					if($scope.surveyQuestionsList[j].id==$scope.questionsIdsForCrosstab[i])
					{
						$scope.questionsList.push($scope.surveyQuestionsList[j]);
						
						continue;
					};
				};    				
			}
			
			$("#av").hide();
			$(".btn-cntnr").hide();
			
			console.log($scope.questionsList);
			
    		generateReport_Service.fetchCommonAnsUsers($scope.questionsList,$scope.surveyObj.id,$scope.selectedSurveyComId).then(function(response){
      			 
    			$scope.crosstabData=response.data;	
    			console.log($scope.crosstabData);
    			
    			$("#gotoque").show();
    			$("#generated_survey").show();
    			$(".loader").fadeOut("slow");
      			
      		 });
    		
    		$(".loader").fadeOut("slow");   		
    	};
    	
    	$scope.fetchUsersList=function(answerIds)
    	{
    		$(".loader").show();
    		
    		generateReport_Service.fetchUsersList(answerIds,$scope.surveyObj.id,$scope.selectedSurveyComId).then(function(response){
     			 
    			$scope.usersList=response.data;	
    			
    			if($scope.usersList.length == 0){
   				 GlobalModule_notificationService.notification("error","User count is zero");
   			 }else{
   				 $("#print_candidates").modal('show');	
   				 console.log($scope.usersList);
   			 }
    			//console.log($scope.usersList);
      			 
      			$(".loader").fadeOut("slow");
      			
      		 });
    		$(".loader").fadeOut("slow");
    	};
    	
    	$scope.showQuetionsList=function()
    	{
    		$(".loader").show();
    		
    		$("#generated_survey").hide();
    		$("#av").show();
    		$scope.questionsList=[];
    		$scope.questionsIdsForCrosstab=[]; 
    		var checkid = $('.flashadmin');
			checkid.prop("checked", false); 
			$(".btn-cntnr").show();
			$("#gotoque").hide();
			$scope.fetchSurveyQuestions();
			
    		$(".loader").fadeOut("slow");
    	};
    	
    	$scope.goToSurveyList=function(){
    		$state.go("restricted.admin.surveymaster");
    	};
    	
    	var getMaximumValue=function(q)
        {
    		var maximum=0;
    		
    		var m=q.ans[0].count;
			 for(var i=0;i<q.ans.length;i++)
		     {
				 if(q.ans[i].count>m)
				 {
					 m=q.ans[i].count;
				 }
		     }

			 if(m>=($scope.SurveyAssigneCount/2))
			 {
				 maximum=$scope.SurveyAssigneCount;
			 }
			 else if(m>=($scope.SurveyAssigneCount/4))
			 {
				 maximum=Math.round($scope.SurveyAssigneCount/2);
			 }			 
			 else if(m>=($scope.SurveyAssigneCount/8))
			 {
				 maximum=Math.round($scope.SurveyAssigneCount/4);
			 }
			 else if(m>=($scope.SurveyAssigneCount/16))
			 {
				 maximum=Math.round($scope.SurveyAssigneCount/8);
			 }
			 else
				 maximum=m;			 			
			 
			 return maximum;
        };
        
        var getStepping=function(maximum){
        	
        	var stepping=0;
        	if(Math.round(maximum/10) == 0)
   		    {
        		stepping=1;
   		    }
   		    else
   		    	stepping= Math.round(maximum/10);
        	
        	return stepping;
        };
        
        
      	$scope.generateExcel = function(){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?surveyId='+$scope.selectedSurveyComId+'&screenId=0&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
}]);