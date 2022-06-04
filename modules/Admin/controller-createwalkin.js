'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateWalkIn_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Create_Walkin_Service','Walk_In_List_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Create_Walkin_Service,Walk_In_List_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	
	$scope.editflag=true;
	$rootScope.userdetails.id;
	//$scope.eventId=GlobalModule_dataStoreService.loadData('LoginModule','eventId');
	$scope.list=[];
	$scope.listForUser=[];
	$scope.imageTabFlag=1;
	$scope.imageList=[];
	$scope.imageListForUser=[];
   $scope.mediatype=1;
   $scope.mediaFor=0;
   $scope.mediaforFlag=1;
   $scope.perviewButtton=0;
   
   $scope.jobfair=GlobalModule_dataStoreService.loadData('LoginModule','jobfair');
 	
   if($scope.jobfair != undefined)
	{
	   $scope.jobfairId=$scope.jobfair.id;
	}

	$scope.addImageDiv=function(mediatype){
				
		if(mediatype == 1)
		{
			$scope.list.push({imagePathId:0,mediaFor:$scope.mediaforFlag,type:'image'});
		}
		else if(mediatype == 2)
		{
			$scope.list.push({imagePathId:0,mediaFor:$scope.mediaforFlag,type:'video'});
		}   
 	};
	
 	$scope.addImageDivForUser=function(mediatype){
		
 		if(mediatype == 1)
		{
			$scope.listForUser.push({imagePathId:0,mediaFor:$scope.mediaforFlag,type:'image'});
		}
		else if(mediatype == 2)
		{
			$scope.listForUser.push({imagePathId:0,mediaFor:$scope.mediaforFlag,type:'video'});
		}	
 	};

	/*$scope.download = function(jobfair){	
		
		if(jobfair.includes("amazonaws"))
		   {
			$rootScope.getSignedURL(jobfair).then(function(response){
				//window.open(response.data);
				$scope.fileurl=response.data;
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		   }
	
	};*/
 	if($scope.jobfair != undefined){
 	$scope.dateformate1 = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        return dateOut;
    };
 	}
	//$scope.jobfair=GlobalModule_dataStoreService.loadData('LoginModule','jobfair');
	
	/*if($scope.jobfair != undefined)
	{
	$scope.jobfair.bannerPath=$scope.download($scope.jobfair.bannerPath);
	}*/
	
	$scope.editflag=GlobalModule_dataStoreService.loadData('LoginModule','editflag');
	
	//dateformat
	$scope.dateformate = function(date){
        var dateOut = moment(date).format("DD-MM-YYYY ");
        return dateOut;
  };
  
  if($scope.jobfair != undefined)
	{
  $scope.jobfair.startDate=$scope.dateformate($scope.jobfair.startDate);
  $scope.jobfair.endDate=$scope.dateformate($scope.jobfair.endDate);
  $scope.jobfair.activationDate=$scope.dateformate($scope.jobfair.activationDate);
  
	}
  
  if($scope.jobfair != undefined){
	  $scope.perviewButtton=0;
	  
  }else{
	  $scope.perviewButtton=1;
  }
  
	
	
	$scope.removeflag=false;
	$scope.getremove = function(){			
		$scope.removeflag=true;		
		
		$('#image_upload_preview_u').attr('src', 'resources/img/default-image.png'); 		 
	};
	
	
	$scope.getindex1=function(id){
		
		 $scope.removeflag=false;
		
		 function readURL(input) {
			 
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();

		            reader.onload = function (e) {
		           	
		            	var s=(e.target.result).split(':')[1];
		            	var type=s.split('/')[0];
		            	$scope.list[id].type =type;
		
 		            	$(".loader").show();
		            	$(".loader").fadeOut("slow");
		            	$('#'+type+'_upload_preview_u'+id).attr('src', e.target.result); 		            	 
		            };            
		           
		            reader.readAsDataURL(input.files[0]);
		        }
		        
		    }
		      $('#input-image'+id).change(function () {
		        readURL(this);
		    }); 	
	};
	
	
	$scope.getindexForUser=function(id){
		
		 $scope.removeflag=false;
		
		 function readURLForUser(input) {
			 
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();

		            reader.onload = function (e) {
		           	
		            	var s=(e.target.result).split(':')[1];
		            	var type=s.split('/')[0];
		            	$scope.listForUser[id].type =type;

		            	$(".loader").show();
		            	$(".loader").fadeOut("slow");
		            	$('#'+type+'_upload_preview_h'+id).attr('src', e.target.result); 
 		            	 
		            };            
		           
		            reader.readAsDataURL(input.files[0]);
		        }
		        
		    }
		      $('#input-image-user'+id).change(function () {
		    	  readURLForUser(this);
		    }); 	
	};
	
	
	$scope.removeflag=false;
	$scope.getremove1 = function(index){	
		
		$scope.list.splice(index,1);		
 	};
	
$scope.getRemoveForUSer = function(index){	
		
		$scope.listForUser.splice(index,1);		 
	};
	
	var validateJobFairDetail=function(jobfair)
	{
		$(".loader").show();
		
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		 
		$(".loader").show();
		if(jobfair.name == undefined || jobfair.name == '')
		{
			GlobalModule_notificationService.notification("error","Please enter title for Meet A Recruiter");
			return false;
		}
		else if(!(jobfair.name.match(letterNumber)))
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter valid title for Meet A Recruiter");
			return false;
		}
		if(jobfair.description == undefined || jobfair.description == '')
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter description for Meet A Recruiter");
			return false;
		}
		else if(!(jobfair.description.match(letterNumber)))
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter valid description for Meet A Recruiter");
			return false;
		}
		if(jobfair.activationDate == "")
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter activation date for Meet A Recruiter");
			return false;
		}
		if(jobfair.startDate == "")
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter start date for Meet A Recruiter");
			return false;
		}
		if(jobfair.endDate == "")
		{
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please enter end date for Meet A Recruiter");
			return false;
		}
		
		return true;
	};
	
	$scope.saveCareerFair=function(jobfair){
		
		$scope.imageList =uploadImages(1);
		$scope.imageListForUser=uploadImages(2);
		
		$scope.saveJobFairDetail(jobfair);
	};
	
	
	var uploadImages=function(flag)
	{
		$(".loader").show();
		
		var input='';
		var imageList=[];
		if(flag == 1)
		{
			$(".loader").show();
			if($scope.list.length !=0)
			{
			
			for(var i=0;i<$scope.list.length;i++)
			{	
				$(".loader").show();
				var input = $scope.list[i].fileDetail;
	 		 
					var file = input.files[0];
					var formData = new FormData();
					formData.append("file",file);
	 
					$.ajax({
						
						url: 'rest/createjobfair/uploadjobfairbanner',
						type: 'POST',
						data: formData,
						async: false,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							
							 var uploadedPath=JSON.parse(returndata);
							 imageList.push({bannerPath:uploadedPath.fileURL,type:$scope.list[i].type,mediaFor:1});
							
						}			
					});
			}
		}
			$(".loader").fadeOut("slow");
			return imageList;
		}
		else if(flag == 2)
		{
			$(".loader").show();

			if($scope.listForUser.length !=0)
			{
				
			for(var i=0;i<$scope.listForUser.length;i++)
			{			
				$(".loader").show();
				var input=$scope.listForUser[i].fileDetail;
				
				var file = input.files[0];
				var formData = new FormData();
	 			formData.append("file",file);
	 
	 			$.ajax({
						
						url: 'rest/createjobfair/uploadjobfairbanner',
						type: 'POST',
						data: formData,
						async: false,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							
							 var uploadedPath=JSON.parse(returndata);
							 imageList.push({bannerPath:uploadedPath.fileURL,type:$scope.listForUser[i].type,mediaFor:2});
							
						}			
					});
			}
		}
			$(".loader").fadeOut("slow");
			return imageList;
		}
	}
	$scope.filesToUpload=[];
	$scope.pushInputFileInList=function(ind,mediaFor){
		
		var index=ind.id.replace ( /[^\d.]/g, '' );
		
		if(mediaFor == 1)
		{
			$scope.list[index].fileDetail=document.getElementById("input-image"+index);	
		}
		else if(mediaFor == 2)
		{
			$scope.listForUser[index].fileDetail=document.getElementById("input-image-user"+index);
		}
						
	};
	
 	$scope.saveJobFairDetail=function(jobfair)
	{
		$(".loader").show();
		if(jobfair == undefined){
			
			GlobalModule_notificationService.notification("error","Please enter mandatory fields for Meet A Recruiter");
			$(".loader").fadeOut("slow");
			return false;
			
		}
       
		$(".loader").show();
		
		jobfair.startDate=document.getElementById('start-date1').value;
		jobfair.endDate=document.getElementById('end-date1').value;
		jobfair.activationDate=document.getElementById('activation-date1').value;
	     		
		var validationFlag=true;
		
		$(".loader").show();
		
		validationFlag=validateJobFairDetail(jobfair);
		
		$(".loader").show();
		
		if(!validationFlag)
		{			
			$(".loader").fadeOut("slow");
			return;
		}
		jobfair.imagePath=uploadImages(1);
		jobfair.imagePathForUser=uploadImages(2);
					
        jobfair.walkinflag= true;
		$(".loader").show();
		
		Create_Walkin_Service.saveJobFairDetail(jobfair).then(function(response){
			var savedStatus=response.data;
			
			if(savedStatus == 'success')
			{
				GlobalModule_notificationService.notification("success","Meet A Recruiter created successfully");
				$(".loader").fadeOut("slow");
				$state.go("restricted.admin.walkinlist");
			}
			/*else if(savedStatus=='DuplicateJobFairName'){
				  
				  GlobalModule_notificationService.notification("error","job fair Name already exist");
				  $("#add_brand").modal('hide');
				  $(".loader").fadeOut("slow");
				 
			 }
			*/
			else if(savedStatus=='overlap'){
				  
				  GlobalModule_notificationService.notification("error","Meet A Recruiter is already active on this date");
				  $("#add_brand").modal('hide');
				  $(".loader").fadeOut("slow");				 
			 }
			
		$(".loader").fadeOut("slow");
		},function(response){
			
			GlobalModule_notificationService.notification("error","Error In creating Meet A Recruiter");
			$(".loader").fadeOut("slow");
		});
		
	};
	$scope.joblistid=0;  
	 $scope.joblistid1=0; 
	 $scope.jobtitle;
	 $scope.jobtitle1;
	 $scope.description;
	 $scope.description1;
	 
	 
	/* $scope.fetchJobList=function(jobfair){
		  
		  JobFairsList_Service.fetchJobList($scope.jobfairId).then(function(response){
				 
			  $scope.joblist = response.data;
			 //console.log($scope.joblist);
			  $scope.joblisteg=$scope.joblist[0];
			  $scope.joblisteg1=$scope.joblist[1];
			  
			  $scope.joblistid=$scope.joblisteg.jobListId;
			  $scope.jobtitle=$scope.joblisteg.jobTitle;
			  $scope.description=$scope.joblisteg.jobDescription;
			  
			  $scope.joblistid1=$scope.joblisteg1.jobListId;
			  $scope.jobtitle1=$scope.joblisteg1.jobTitle1;
			  $scope.description1=$scope.joblisteg1.jobDescription1;
			 // console.log($scope.description1);
			  
			  $scope.jobfair.jobTitle= $scope.jobtitle;
				 
			  $scope.jobfair.jobDescription=$scope.description;
			  $scope.jobfair.jobTitle1= $scope.jobtitle1;
			  $scope.jobfair.jobDescription1= $scope.description1;
			 
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
	  };
	  $scope.fetchJobList();
	*/
	
	$scope.updateJobFairDetail=function(jobfair)
	{
		$(".loader").show();
        
		$scope.imageList=[];
				
		jobfair.startDate=document.getElementById('start-date1').value;
		jobfair.endDate=document.getElementById('end-date1').value;
		jobfair.activationDate=document.getElementById('activation-date1').value;
		
		var validationFlag=true;
		$(".loader").show();
		
		validationFlag=validateJobFairDetail(jobfair);
		$(".loader").show();
		
		if(!validationFlag)
		{
			
			$(".loader").fadeOut("slow");
			return;
		}
			
		$(".loader").show();
		
		var input=document.getElementsByName("inputImage");
		
		if(input.length !=0)
		{
			for(var i=0;i<input.length;i++)
			{				
				$scope.data=input[i];
				
				if($scope.data.value!="")
				{
					var file = $scope.data.files[0];
					var formData = new FormData();
					formData.append("file",file);
		
					$.ajax({
						
						url: 'rest/createjobfair/uploadjobfairbanner',
						type: 'POST',
						data: formData,
						async: false,
						cache: false,
						contentType: false,
						processData: false,
						success: function (returndata) {
							
							 var uploadedPath=JSON.parse(returndata);
							 $scope.imageList.push({imagePathId:$scope.list[i].imagePathId,
								 bannerPath:uploadedPath.fileURL,
								 type:$scope.list[i].type,
								 mediaFor:1});
									
						}			
					});
					
				}else{
					$scope.imageList.push({imagePathId:$scope.list[i].imagePathId,bannerPath:$scope.list[i].bannerPath,
						type:$scope.list[i].type,mediaFor:1});
				}
			}
		}
		
		jobfair.imagePath=$scope.imageList;
			
		$(".loader").show();
		var input=document.getElementsByName("inputImageForUser");
		//	console.log(input);
			if(input.length !=0){
			for(var i=0;i<input.length;i++){
				
				$scope.data=input[i];
			//console.log($scope.data);
			if($scope.data.value!="")
			{
				var file = $scope.data.files[0];
				var formData = new FormData();
				formData.append("file",file);

				$.ajax({
					
					url: 'rest/createjobfair/uploadjobfairbanner',
					type: 'POST',
					data: formData,
					async: false,
					cache: false,
					contentType: false,
					processData: false,
					success: function (returndata) {
						
						 var uploadedPath=JSON.parse(returndata);
						 
						 $scope.imageListForUser.push({imagePathId:$scope.listForUser[i].imagePathId,
							 
							 bannerPath:uploadedPath.fileURL, type:$scope.listForUser[i].type, mediaFor:2});
						 						
					}			
				});
			}else{
				$scope.imageListForUser.push({imagePathId:$scope.listForUser[i].imagePathId,
					bannerPath:$scope.listForUser[i].bannerPath,type:$scope.listForUser[i].type,mediaFor:2});				
			}
			}
			}
			
			jobfair.imagePathForUser=$scope.imageListForUser;
			jobfair.jobListId=$scope.joblistid;
			jobfair.jobListId1=$scope.joblistid1;
			jobfair.walkinflag= true;
			Create_Walkin_Service.saveJobFairDetail(jobfair).then(function(response){
			
			var savedStatus=response.data;
			
			if(savedStatus == 'success')
			{
				GlobalModule_notificationService.notification("success","Meet A Recruiter updated successfully");
				
				$scope.fetchUploadedJobfairImages();
				$scope.fetchUploadedJobfairImagesForUser();
				
				$state.go("restricted.admin.walkinlist");
			}
			else if(savedStatus=='overlap'){
				  
				  GlobalModule_notificationService.notification("error","Meet A Recruiter is already active on this date");
 				  $(".loader").fadeOut("slow");				 
			 }
			
		$(".loader").fadeOut("slow");
		},function(response){
			
			GlobalModule_notificationService.notification("error","Error In updating Meet A Recruiter");
			$(".loader").fadeOut("slow");
		});
	};
	
	/*$( "#activation-date" ).datepicker({ minDate: new Date()});*/
	$scope.onloadActiveDate=function(){
	$('#activation-date').datetimepicker({
		  minDate: new Date(),
		  format: 'DD-MM-YYYY LT',
		  });
	};
	
	$scope.onloadStartDate=function(){
		$('#start-date').datetimepicker({
			  minDate: new Date(),
		format: 'DD-MM-YYYY LT'
			  });
		};
		
		$scope.onloadEndDate=function(){
			$('#end-date').datetimepicker({
				  minDate: new Date(),
			format: 'DD-MM-YYYY LT'
				  });
			};
			
		
			$scope.fetchUploadedJobfairImages=function(jobfair){
				  
				var walkinfag=true;
				Walk_In_List_Service.fetchUploadedJobfairImages($scope.jobfairId,walkinfag).then(function(response){
						 
					  $scope.list = response.data;
					  
						 $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
					 }); 
			  };
			  
			  if ($scope.editflag==false)
			  $scope.fetchUploadedJobfairImages();
			  
			  
			  $scope.fetchUploadedJobfairImagesForUser=function(jobfair){
				  
				  var walkinfag=true;
				  Walk_In_List_Service.fetchUploadedJobfairImagesForUser($scope.jobfairId,walkinfag).then(function(response){
						 
					  $scope.listForUser = response.data;
					
						 $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
					 }); 
			  };
			  
			  if ($scope.editflag==false)
			  $scope.fetchUploadedJobfairImagesForUser();
			
			  // to play one video at a time
			  
			  /*$scope.stopVideo=function(){
				  alert("hey");
			  var videos = document.querySelectorAll('video');
			  for(var i=0; i<videos.length; i++)
			     videos[i].addEventListener('play', function(){pauseAll(this)}, true);


			  function pauseAll(elem){
				  alert("pause");
			  	for(var i=0; i<videos.length; i++){
			  		//Is this the one we want to play?
			  		if(videos[i] == elem) continue;
			  		//Have we already played it && is it already paused?
			  		if(videos[i].played.length > 0 && !videos[i].paused){
			  		// Then pause it now
			  		  videos[i].pause();
			  		}
			  	}
			    }
			  };*/
	
}]);