'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Upload_Docs_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Upload_Docs_Service','Master_Service', '$window', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Upload_Docs_Service,Master_Service,$window){
	 
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.userImage=[];
	  $scope.addUserImage = function(){
		  $scope.userImage.push({ 
			  'image': "", 
		  });
		  
	  };
	  $scope.input=[];
		$scope.file=[];
		$scope.userId;
		
		// to create and get documentUploadId
		$scope.getDocumnetUploadId = function(){
			
			$(".loader").show();
			  $scope.usercvImages = [];
			  var errorflag = false;
			  var data = document.getElementById('userdoc').files;
			  if(data.length != 0){
				  
			  
			  $scope.usercv = {};
			  $scope.usercv.userId = $rootScope.userdetails.id;
			  $scope.usercv.tottalDoc=data.length;
			  
			  $scope.usercvImages =[];
			  $scope.usercvImages.push( $scope.usercv);
			  
			  Upload_Docs_Service.getDocumnetUploadId( $scope.usercvImages).then(function(response){
				  $scope.uploadid = response.data;
				  //document.getElementByid('uploadId').value=$scope.flagcvimages.uploadId;
				  //$scope.userId=$scope.flagcvimages.uploadid;
				  if($scope.uploadid  == "")
					  {
					     errorflag=true;
					  }
				  else{
					  $scope.saveUserDocs($scope.uploadid);
					  angular.element("input[type='file']").val(null);
				  }
				 /* if($scope.flagcvimages != "Failed"){
					  GlobalModule_notificationService.notification("success","Your Images have been saved successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }*/
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
			  
			 // $state.go("restricted.admin.uploaddoclist");
			
			  $('.uploaded-file-names').html("");
			
			  }else{
				  GlobalModule_notificationService.notification("error","Please Upload Atleast One Document ");
				  $(".loader").fadeOut("slow");
			  }
			 
		};
		 
	$scope.saveUserDocs = function(uploadId){
		
		var successCount=0;
		var failCount=0;
		
		
		  $(".loader").show();
		  $scope.usercvImages = [];
		  var errorflag = false;
		  var data = document.getElementById('userdoc').files;
		  if(data.length != 0){
		  event.preventDefault();
		  for(var i=0;i<data.length;i++){
			 
			 
			 // $scope.usercv.docType = "Image";
			  $scope.usercv = {};
			  $scope.usercv.userId = $rootScope.userdetails.id;
			  $scope.usercv.tottalDoc=data.length;
			  $scope.usercv.uploadId=uploadId;
				 
			 
			$scope.input = data[i];
			var filename=$scope.input.name;
			$scope.usercv.fileName=filename;
			
			 event.preventDefault();
				
				if($scope.input.value!="")
				{
				var file = $scope.input;
				var formData = new FormData();
				formData.append("file",file);
				formData.append("uploadId",uploadId);
				
				
			$.ajax({
				url: 'rest/uploaddoc/uploaddocuments',
				type: 'POST',
				data: formData,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returndata) {
					$scope.filedtailsforCVImages=JSON.parse(returndata);
					 if($scope.filedtailsforCVImages != undefined)
						{
						 if($scope.filedtailsforCVImages.fileURL!="failed"){
							 
							 successCount++;
							 
							 $scope.usercv.path = $scope.filedtailsforCVImages.fileURL;
							 
							 $scope.usercvImages =[];
							 $scope.usercvImages.push( $scope.usercv);
							//if(i==data.length-1){
							 Upload_Docs_Service.saveUserUploadDocsDetail( $scope.usercvImages).then(function(response){
								  $scope.flagcvimages = response.data;
								 
								  if($scope.flagcvimages.flag == "Failed")
									  {
									     errorflag=true;
									     
									  }
								  if($scope.flagcvimages.flag == "success")
								  {
								     errorflag=false;
								     
								  }
								  $scope.docUpload = {};
								  $scope.docUpload.uploadId=uploadId;
								  $scope.docUpload.successCount=successCount;
								  $scope.updateDocumentUpload($scope.docUpload);
								  
								  
								 /* if($scope.flagcvimages != "Failed"){
									  GlobalModule_notificationService.notification("success","Your Images have been saved successfully");
									  }else{
										  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
									  }*/
								  $(".loader").fadeOut("slow");
							  },function(response){
								  $(".loader").fadeOut("slow");
								});
							 
							 
							 
						 }else{
							 failCount++;
							 
						 }
						
						}
					 
					
					 
				
						 
					//}
					
				},
				error: function (returndata) {
					failCount++;
				}
			});
			}
				
		  }
		  //+successCount+" And Failed "+failCount
		  $('#docUploadMod').html("Your documents has been uploaded successfully ");
		  $('#docUploadMod2').html("Successful upload "+successCount);
		  $('#docUploadMod3').html("Failed upload "+failCount);
		 // $('#warning-modal').html();
		  $("#warning-modal").modal('show');
		 
		  //GlobalModule_notificationService.notification("success","Your Documents uploaded successfully "+successCount+" And Failed "+failCount);
		 
			/*if(errorflag==true) {
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}else{
				 GlobalModule_notificationService.notification("success","Your Documents uploaded successfully");
				 
			}*/
			// $scope.updateDocumentUpload(uploadId,successCount);
			
		  };
	  };
	  
	  // for uploading documentupload successCount
	  
	  $scope.updateDocumentUpload = function(docUpload){
		  Upload_Docs_Service.updateDocumentUpload(docUpload).then(function(response){
			
			
			
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});closeCurrentTab()
	  };
	  
	  // for closing current tab
	  
	  $scope.closeCurrentTab = function(docUpload){
		  $window.close();
	  };
	  
}]);