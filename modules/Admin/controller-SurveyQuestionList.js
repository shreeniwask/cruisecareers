'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('SurveyQueList_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Master_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.surveyId = GlobalModule_dataStoreService.loadData('LoginModule','surveyId');
	
	console.log($scope.surveyId);
	
	$scope.fetchSurveyQuestionList= function(surveyId,colName,order,search){
		
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
			// console.log(surveyId);
		 Master_Service.fetchSurveyQuestionList($scope.surveyId,colName,order,search).then(function(response){
			
			 $scope.QuestionList=response.data;
			console.log($scope.QuestionList);
			 //questionList($scope.QuestionList.length+1);
			//console.log($scope.fetchAssessmentQuestionList.length);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 $scope.fetchSurveyQuestionList($scope.surveyId,null,null,null);
	 
	 
	 //delete question from list
	 
	
	 $scope.deleteQuestionFromSurveyList= function(){
		 
		 $(".loader").show();
		 
		 Master_Service.deleteQuestionFromSurveyList($scope.QueListObjet,$scope.surveyId).then(function(response){
			 
			 var deletequestion=response.data;
			 			 
			 if(deletequestion == 'success')
			 {
					GlobalModule_notificationService.notification("success","Question has been deleted successfully");
					$scope.fetchSurveyQuestionList($scope.surveyId,null,null,null);
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
			$scope.fetchSurveyQuestionList($scope.surveyId,$scope.colName,$scope.order,$scope.search);	
		};
}]);