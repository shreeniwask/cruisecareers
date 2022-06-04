'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewDeploymentLeaveDataUpload_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CrewDeploymentLeaveDataUpload_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CrewDeploymentLeaveDataUpload_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($rootScope.userdetails);
	
	//fetch BrandList
	$scope.brandsList = function(){
		  
		CrewDeploymentLeaveDataUpload_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
			  console.log($scope.brandsList);
			  $(".loader").fadeOut("slow");
		  },function(response){
				
			});
	  };
	$scope.brandsList();
	
	// fetch upload file list
	
	$scope.fetchUploadFileList = function(offset,limit,colName,order,search,brandid){
	  	  $(".loader").show();
	  	  if(search==null || search=="")
	  		  {
	  		  search= undefined;
	  		  
	  		  }
	  	  if(brandid==null || brandid==""){
	  		  brandid=undefined;
	  	  }
	  	  if(colName == null || colName== ""){
	  			 colName = undefined;
	  		 }
	  		 if(order == null){
	  			 order = undefined;
	  		 }
	  		
	  	  
	  		CrewDeploymentLeaveDataUpload_Service.fetchUploadFileList(offset,limit,colName,order,search,brandid).then(function(response){
	  		  $scope.fetchuploadfilelist = response.data;
	  		  console.log($scope.fetchuploadfilelist);
	  		  $(".loader").fadeOut("slow");
	  	},function(response){
	  		$(".loader").fadeOut("slow");
	  		});
	  };
	  $scope.fetchUploadFileList(0,10,null,null,null,null);
	
	  
	//Sorting Start
	  $scope.sortByColumn = function(colname,searchterm){
		   $scope.offset =0 ;
			$scope.start = 0;
			$scope.colName = colname;
			$scope.search=searchterm;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
			 if($scope.brandid==null || $scope.brandid==""){
				 $scope.brandid=undefined;
		  	  }
			$scope.fetchUploadFileList(0,10,$scope.colName,$scope.order,$scope.search,$scope.brandid);
			
		};
		//Sorting End
		
		 
		   //------------------------Pagination Start-----------------------------------------------
			$scope.offset=0;
			$scope.limit=10;
			$scope.navButtons = [];
		   $scope.setButton = function(){
			   $scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					 $scope.fetchUploadFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.brandid);
				};
				
	  
				//------------------------------count start-----------------------------------------------
				$scope.fetchUploadFileListCount=function(searchterm,brandid){
					$(".loader").show();
					
					$scope.offset =0 ;
					$scope.navButtons = [];
					$scope.count= 0 ;
					$scope.start = 0;
					$scope.search=searchterm;
					$scope.brandid=brandid;
					if($scope.colName == null || $scope.colName == ""){
						$scope.colName = undefined;
					 }
					 if($scope.order == null){
						 $scope.order = undefined;
					 }
					 if($scope.search=="" || $scope.search == null)
					  {
					  $scope.search= undefined;  
					  }
					 if($scope.brandid==null || $scope.brandid==""){
						 $scope.brandid=undefined;
				  	  }
					 CrewDeploymentLeaveDataUpload_Service.fetchUploadFileListCount($scope.search,$scope.brandid).then(function(response){
						
						$scope.count = response.data;
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						$(".loader").fadeOut("slow");		
					});		
				};
				$scope.fetchUploadFileListCount(null,null);
				// ----------------------------------count end-------------------------------- 
				
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
			        $scope.fetchUploadFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.brandid);
			    };
				
				//---------------------------------pagination end---------------------------------------------
				
	  
	  $scope.dateformate1 = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
	        
	        return dateOut;
	  };
	  //$scope.dateformate1(date);
	
	  $scope.smsFileNameChanged = function(element)
		{
					  
			//var index = angular.element(element).scope().$index;
			$scope.input = document.getElementById('cduploadfile');			   
			if($scope.input.value!="")
			{						
				var filename=$scope.input.value;
				filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
				$('#cduploadfilepath').val(filename);				
			}
		};
		
		$scope.clearuploadfiledata=function(){
			
			$("#cduploadfilepath").val(null);
			$("#cduploadfile").val(null);
			};
	  
		 
			$scope.CrewDeployemnetUploadFile=function(brandid)
			{		
				
				
				$scope.brandid=brandid;
				$(".loader").show();
				
				var letterNumber = /^[a-zA-Z0-9)\(\_\-" "\.]+$/;	
				
				var input = document.getElementById('cduploadfile');
				
				if($scope.brandid == "" || $scope.brandid == undefined)
				{
					
					GlobalModule_notificationService.notification("error","Please Choose Template.");	       
				       $(".loader").fadeOut("slow");
				       return;
				}
				
				if(input.value == "" || input.value == undefined)
				{
					
					GlobalModule_notificationService.notification("error","Please Upload File");	       
				       $(".loader").fadeOut("slow");
				       return;
				}
				
				var allowedExtensions = /(\.xlsx)$/i;
				
				if(!allowedExtensions.exec(input.value)){
					$(".loader").show();
					GlobalModule_notificationService.notification("error","Please upload excel(.xlsx) file only.");
					$("#cduploadfilepath").val(null);
					$(".loader").fadeOut("slow");			
					return;
				}		
				else if((input.value!= "" || input.value != undefined))
					{
						
						var file = input.files[0];
						var formData = new FormData();
						formData.append("file",file);
						formData.append("userid",$rootScope.userdetails.id);
						formData.append("brandid",$scope.brandid);
						
					$.ajax({
							url: 'rest/uploadcrewdeployleavedata/upload/uploadcdfile',
							type: 'POST',
							data: formData,					
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (response) {
								
								
								$scope.result = response;
								////console.log($scope.addshipdatadetails);
								$(".loader").fadeOut("slow");
								if($scope.result.indexOf("success")!=-1){
												
									$("#upload-excel").modal('hide');
									
									GlobalModule_notificationService.notification("success","File Uploaded Successfully.");
								
									 $state.reload();		
									 $(".modal-backdrop").hide();
									$(".loader").fadeOut("slow");
														
									}
								else if($scope.result.indexOf("No configuration")!=-1){
									$("#upload-excel").modal('hide');
									GlobalModule_notificationService.notification("error"," No Configuration For Selected Brand");
									$(".loader").fadeOut("slow");
								}
								else if($scope.result.indexOf("Requisition Running")!=-1){
									$("#upload-excel").modal('hide');
									GlobalModule_notificationService.notification("error"," There are open requisitions being processed for this brand. Kindly wait for the process to be completed before uploading new Employee data for the brand");
									$(".loader").fadeOut("slow");
								}
								else {
											
									GlobalModule_notificationService.notification("error","File Uploaded failed");
									$("#upload-excel").modal('hide');
									$(".loader").fadeOut("slow");
									
								}
								
								 
								$(".loader").fadeOut("slow");
								$('.modal-backdrop').hide();
								$state.reload();
								//$state.go('restricted.admin.uploadmaster');
							}
						});
					}
					else
					{				
						GlobalModule_notificationService.notification("error","Please Enter valid file name");
						$(".loader").fadeOut("slow");
						return;
					}
			};
			
			$scope.download = function(path){	
				
				/*if(path.includes("amazonaws"))
				   {
					$rootScope.getSignedURL(path).then(function(response){
						window.open(response.data);
					},function(response){
						GlobalModule_dataStoreService.errorResponseHandler(response);
					});
				   }
				   else
				   {*/
						window.open(path);
				    //}
				
			};
			
			$scope.downloadSample = function(path){	
				
				window.open(path);
		
				};
			
			$scope.generateExcel = function(){		 
		    	 
				  if($scope.search == undefined){
					  $scope.search ="";
				  }			 
				  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+24+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&approverFlag='+'upload');	 
			  };
			  $scope.log_filename="";
			  $scope.fetchFileUploadLog = function(fileid){
				  $scope.fileid1=fileid;
				  $scope.log_filename="";
			  		CrewDeploymentLeaveDataUpload_Service.fetchFileUploadLogList($scope.fileid1).then(function(response){
			  		  $scope.fetchuploadfileloglist = response.data;
			  		 
			  			for (let i = 0; i < $scope.fetchuploadfileloglist.length; i++) {
			  			 if($scope.fetchuploadfileloglist[i].fileid==fileid) {
			  				 $scope.log_filename=$scope.fetchuploadfileloglist[i].filename;
			  			 }
			  			}
			  		  console.log($scope.fetchuploadfilelist);
			  		  $(".loader").fadeOut("slow");
			  	},function(response){
			  		$(".loader").fadeOut("slow");
			  		});
			  }
			  
			  $scope.fetchSampleDoc = function(){
				  
					CrewDeploymentLeaveDataUpload_Service.fetchSampleDoc(0).then(function(response){
				  		  $scope.sampleDoc = response.data;
				  		  $scope.sampledocument=$scope.sampleDoc;
				  		  console.log($scope.sampleDoc);
					},function(response){
				  		$(".loader").fadeOut("slow");
				  		});
				}
				$scope.fetchSampleDoc();
}]);