'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Cms_Ctrl',['$scope','$rootScope','$state','Cms_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Login_Service', function ($scope, $rootScope,$state,Cms_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Login_Service){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');

	 $scope.checkkeys = function(){
		
		var len = document.getElementById('name').value.length;
		
	
		if(len == 30){
			/*alert('30 characters are allowed in title');*/
			//GlobalModule_notificationService.notification("error","only 30 characters are allowed in title");				
		}};
		
		 $scope.checkdecs = function(){
		
			var length = document.getElementById('decs').value.length;
			
			if(length == 60){
				/*alert('60 characters are allowed in description');*/
				//GlobalModule_notificationService.notification("error","only 60 characters are allowed in description");
				//$(".loader").fadeOut("slow");
				
			}};
		
	
	
	$scope.getindex=function(i){
		 $scope.removeflag=false;
		
		$scope.index = i;
		
		 function readURL(input) {
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();

		            reader.onload = function (e) {
		                $('#image_upload_preview'+i).attr('src', e.target.result);              
		            };            
		            
		            reader.readAsDataURL(input.files[0]);
		        }
		    }
		      $('#input-image'+i).change(function () {
		        readURL(this);
		    }); 
		
	};
	
	$scope.removeflag=false;
	$scope.getremove = function(i){			
		$scope.removeflag=true;		
		
		$('#image_upload_preview'+i).attr('src', 'resources/img/default-image.png'); 		 
	};
	  
	$scope.fetchHomeImagesList = function(){
		  
		  Login_Service.fetchHomeImagesList().then(function(response){
			  $scope.homeImagesList = response.data;
		  
		  },function(response){
				
			});
	  };
	  $scope.fetchHomeImagesList();
	  
	  var validateUpload=function(imageDetails){
		 // var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
			
			$(".loader").show();
	  
	 // var filePath = document.getElementById('input-image'+$scope.index).value;
	  //console.log(value);
		
			var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		 
			
		    if(!allowedExtensions.exec(imageDetails.path)){
		    	
		    	GlobalModule_notificationService.notification("error","Please Upload Image File Only");			 
		    	//$(".loader").fadeOut("slow");
		    	return false;	
		    }
		//    $(".loader").fadeOut("slow");
		    return true;
};
	  
	$scope.saveHomeImageDerails = function(imageDetails){			
		
		var letterNumber = /^[ a-zA-Z0-9!@\#\`\~\$%\^\&*/\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._-]+$/;	
		
		if((imageDetails.title.match(letterNumber) || imageDetails.title == "") && (imageDetails.description.match(letterNumber) || imageDetails.description == "")){
		
			/*var validationFlag=validateUpload(imageDetails);

			if(!validationFlag)
			{
				//$(".loader").fadeOut("slow");
				return;
			}
*/
			
			imageDetails.createdby = $rootScope.userdetails.id;	
			var input = document.getElementById('input-image'+(imageDetails.id-1));						
			
			// $(".loader").show();
			if(input.value!="" && $scope.removeflag==false)
			{			
			var file = input.files[0];
			var formData = new FormData();
			formData.append("file",file);
			$.ajax({
				url: 'rest/Cms/upload/homeimage',
				type: 'POST',
				data: formData,
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returndata) {
					$scope.filedtailsforProfile=JSON.parse(returndata);				
					 imageDetails.path = $scope.filedtailsforProfile.fileURL;
					 imageDetails.isActive = "true";
			
					 
					 var validationFlag=validateUpload(imageDetails);

						if(!validationFlag)
						{
							$(".loader").fadeOut("slow");
							return;
						}

					 
					 
					 
					 
					 Cms_Service.saveHomeImageDerails(imageDetails).then(function(response){
						  $scope.flag = response.data;			
						 
						  GlobalModule_notificationService.notification("success","Your records have been added successfully");	
						  $(".loader").fadeOut("slow");
					  },function(response){
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
						  $(".loader").fadeOut("slow");
						});
				}
			
			});
		}else{
			
			if($scope.removeflag){
				
			 $(".loader").show();
			 
			 imageDetails.path ='resources/img/default-image.png';
			 
			if(imageDetails.description == "" && imageDetails.title == ""){
				 imageDetails.isActive = "false";
			 }else{
				 imageDetails.isActive = "true";
				 $(".loader").fadeOut("slow");
			 }
		

			
			 Cms_Service.saveHomeImageDerails(imageDetails).then(function(response){
				  $scope.flag = response.data;			
				  GlobalModule_notificationService.notification("success","Your records have been added successfully");	
				  $(".loader").fadeOut("slow");
			  },function(response){
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				  $(".loader").fadeOut("slow");
				});
			 $scope.removeflag=false;
		}else{
			
			if(imageDetails.description == "" && imageDetails.title == ""){
				 imageDetails.isActive = "false";
			 }else{
				 imageDetails.isActive = "true";
			 }
					
					Cms_Service.saveHomeImageDerails(imageDetails).then(function(response){
				  $scope.flag = response.data;			
				  GlobalModule_notificationService.notification("success","Your records have been added successfully");	
				  $(".loader").fadeOut("slow");
			  },function(response){
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				  $(".loader").fadeOut("slow");
				});
			
		};
			
			
		}
		
		
		}else{
			GlobalModule_notificationService.notification("error","Please enter valid text!");
		}
		
	};
	
	
	$scope.cancel = function(imageDetails){
		$('#image_upload_preview'+$scope.index).attr('src', 'resources/img/default-image.png'); 
		
		 $(".loader").show();
			//imageDetails.path ='http://localhost:8080/CruiseCareersWebsite/resources/img/default-image.png';
		//	imageDetails.path ='resources/img/default-image.png';
			imageDetails.title = '';
			imageDetails.description = '';
			imageDetails.isActive = "false";
			
			 
			 Cms_Service.saveHomeImageDerails(imageDetails).then(function(response){
				  $scope.flag = response.data;			
				  GlobalModule_notificationService.notification("success","Your records have been clear successfully");	
				  $(".loader").fadeOut("slow");
			  },function(response){
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
				  $(".loader").fadeOut("slow");
				});			
	};
	
	$scope.fetchhomeimgdetails=function(){		
		 Cms_Service.fetchhomeimgdetails().then(function(response){
			  $scope.data = response.data;
			 // $(".loader").fadeOut("slow");
		 });
	};
	$scope.fetchhomeimgdetails();
	
}]);