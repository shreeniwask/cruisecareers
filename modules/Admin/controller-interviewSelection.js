'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('interviewSelect_Ctrl',['$scope','$rootScope','$location','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Master_Service', function ($scope, $rootScope,$location,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Master_Service){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	$scope.job = GlobalModule_dataStoreService.loadData('LoginModule','interviewjob');
	
	alert("1");
	//---------interview template ------
	 $scope.interviewTemplates=[{
        id: 0,
        name:"" }
        ];
	 $scope.temp="";
	 
 
	$scope.temp="";
	//alert($scope.temp);
	$scope.changetemp=0;
	$scope.enabledTemp();
	   $scope.nameOfInterviewer=$scope.job.name;
	   $scope.positionNameInterview=$scope.job.position;
	   $scope.jobIdInterview=$scope.job.jobId;
	   $scope.userIdInterview=$scope.job.userid;
	   $scope.templateQuestion=[];
	   $scope.interviewTemplates=[{
          id: 0,
          name:"" }
          ];
	   $scope.fetchInterviewTemplates = function(){
		Admin_Service.fetchInterviewTemplates($scope.job.positionId).then(function(response){
			 $scope.interviewTemplates =response.data;
			
			
			
		 },function(response){
			});
		
	};
	$scope.fetchInterviewTemplates();
	
	$scope.fetchTemplateQuestion = function(id){
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
		
	};
	$scope.enabledTemp= function()
	{
		$("#examselector").removeAttr('disabled');
	}
	$scope.saveInteriewAns = function(template){
		$(".loader").show();
		for (var i=0;i<$scope.templateQuestion.length;i++)
			{
		$scope.templateQuestion[i].createdby=$rootScope.userdetails.id;
		$scope.templateQuestion[i].jobid=$scope.jobIdInterview;
		$scope.templateQuestion[i].userid=$scope.userIdInterview;
			}
		
		Admin_Service.saveInteriewAns($scope.templateQuestion).then(function(response){
			 $scope.flagForAns =response.data;
			 
			
			 if( $scope.flagForAns=='"success"'){
   			 GlobalModule_notificationService.notification("success","Saved Successfully ");
   			 $location.path("/appliedjobs");
   		 }
			 $(".loader").fadeOut("slow");
			 
		 },function(response){
				$(".loader").fadeOut("slow");
			});
		
	};
	
	$scope.submitInteview = function()
	{
		
		 location.reload();
		 $('#examselector').modal('hide');
		 $(".Interview-que").modal('hide');
	};
	
	$scope.recognizing=false;
	
	$scope.transalate = function(check){
		var index=-1;
		
		var a=check;
		//alert(check);
		$scope.recognizing=false;
		if (window.hasOwnProperty('webkitSpeechRecognition')) {

            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
           // Initialize();
            recognition.lang = "en-US";
		/*for(var i=0;i<($scope.templateQuestion.length);i++)
			{*/
			$(".speaker"+a).hide();
		
		     if($("#ans-switch"+a).is(":checked")) {
		    	 index=a;
		    	 
		    	 var append= $('#transcript'+a).val();
		    	 $('#erase').prop('disabled', true);
		         $(".speaker"+a).show();
		         recognition.start();
		         $scope.recognizing=true;
		        
		         recognition.onresult = function(e) {
		         var ans=e.results[0][0].transcript;		        
		         $('#transcript'+a).val(append+" "+ans);
		         $scope.templateQuestion[check-1].answer=append+" "+ans;
		         
		        // answer=answer+" "+append+" "+ans;
		              recognition.stop();
		         };
		         recognition.onend = function() {
		        	// recognition.start();
		        	 if($scope.recognizing==true){
		        		
		        	 $scope.transalate(check);
		        	 }
		        	
		        	};
		         recognition.onerror = function(e) {
		         recognition.stop();
		        	//$(".speaker"+a).hide();
		        	
		         }

		     	} else {
		        $(".speaker"+a).hide();
		       if($scope.recognizing==true)
		    	   {
		    	   recognition.stop();
		    	 
		    	   $scope.recognizing=false;
		    	   $('#erase').prop('disabled', false);
		    	   }	 
		     }
		//	}
		
			}
	};
	
 /* ---------audio upload----------*/
	
	$scope.uploadAudio=function(input,userId,questionId,jobId)
	{	
		if(input.value!="")
		{
			var created=$rootScope.userdetails.id;
			var file = input.files[0];
			var formData = new FormData();
			formData.append("file",file);
			formData.append("questionId",questionId);
			formData.append("userid",userId);
			formData.append("jobId",jobId);
			formData.append("createdId",created);
			//formData.id=$scope.brandid;
			
			$scope.brand.file=file.name;
			
			input.value="";
			
			$.ajax({
					url: 'rest/admin/upload/audio',
					type: 'POST',
					data: formData,
					
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {

						  GlobalModule_notificationService.notification("success","Audio save Successfully !!"); 
					}
				});
						
		}
	};
	

	
}]);