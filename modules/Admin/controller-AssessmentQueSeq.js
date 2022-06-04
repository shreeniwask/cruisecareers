'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('AssessmentQueSeq_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Master_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.assessmentId = GlobalModule_dataStoreService.loadData('LoginModule','assessmentId');
	
	 //console.log($scope.assessmentId);
	$scope.fetchAssessmentQuestionList= function(assessmentId,colName,order,search){
		
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
			// console.log(assessmentId);
		 Master_Service.fetchAssessmentQuestionList($scope.assessmentId,colName,order,search).then(function(response){
			
			 $scope.QuestionList=response.data;
			// console.log($scope.QuestionList);
			 questionList($scope.QuestionList.length+1);
			//console.log($scope.fetchAssessmentQuestionList.length);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 $scope.fetchAssessmentQuestionList($scope.assessmentId,null,null,null);
	
	 
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
			$scope.fetchAssessmentQuestionList($scope.assessmentId,$scope.colName,$scope.order,$scope.search);	
		};
		
		var questionList=function(noOfQuestions){
			$scope.sequenceList=[];
			
			for(var i=1;i<noOfQuestions;i++)
			{
					$scope.sequenceList.push({sequence:i});
				
			}
		};
		
		$scope.changeSequence=function(selected,index){
			
			var temp=$scope.QuestionList[index];
			
			   if(selected-1>index)
			   {
				   var fistindex=index;
				   var lastindex=selected-1;
				   sequencechange(fistindex,lastindex);
				  
			   }
			   else{
				   var fistindex=selected-1;
				   var lastindex=index;
				   sequencechange1(fistindex,lastindex);
			   }
			};
			var sequencechange=function(fistindex,lastindex){
				
				for(var i=fistindex;i<lastindex;i++)
				{
					//$scope.QuestionList[i].sequence=i+1;
					var temp=$scope.QuestionList[i];
					$scope.QuestionList[i]=$scope.QuestionList[i+1];
					
					$scope.QuestionList[i+1]=temp;
				
				}
				for(var i=0;i<$scope.QuestionList.length;i++)
				{
					$scope.QuestionList[i].sequence=i+1;
				}
				//console.log($scope.QuestionList);
			};
			
			var sequencechange1=function(fistindex,lastindex){
							
				for(var i=lastindex-1;i>=fistindex;i--)
				{
					//$scope.QuestionList[i].sequence=i+1;
					var temp=$scope.QuestionList[i];
					$scope.QuestionList[i]=$scope.QuestionList[i+1];
								
					$scope.QuestionList[i+1]=temp;
							
				}
				for(var i=0;i<$scope.QuestionList.length;i++)
				{
					$scope.QuestionList[i].sequence=i+1;
				}
							//console.log($scope.QuestionList);
			};
			
			
			$scope.saveQuestionList=function()
			{
				 $(".loader").show();
				 										 
			 Master_Service.saveQuestionList($scope.assessmentId,$scope.QuestionList).then(function(response){
				 var saveResponse=response.data;
				 if(saveResponse=='success')
				 {
					  GlobalModule_notificationService.notification("success","Questions sequence saved successfully");
					  $state.go('restricted.admin.assessmentmaster');
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }				 
				 
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 });
			 
			};
			
			
			
			$scope.cancelAssessmentseq=function(){
				 $state.go('restricted.admin.assessmentmaster');
			 };	
			 
			 //delete question
		
			 $scope.deleteQuestionFromSurveyList= function(){
				 
				 $(".loader").show();
				 
				 Master_Service.deleteQuestionFromSurveyList($scope.QueListObjet,$scope.assessmentId).then(function(response){
					 
					 var deletequestion=response.data;
					 			 
					 if(deletequestion == 'success')
					 {
							GlobalModule_notificationService.notification("success","Question has been deleted successfully");
							$state.reload();
					 }
					 			 
				 },function(response){
					  $(".loader").fadeOut("slow");
				 });	
				 
				 $(".loader").fadeOut("slow");
			 };
			 
			 $scope.showDeleteModal= function(question){
				 
				 $scope.QueListObjet=question;
				 $('#deletelist').modal('show');
			 };
	 
}]);