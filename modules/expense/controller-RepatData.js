'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('uploadRepatData_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','Repate_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,Repate_Service){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	GlobalModule_dataStoreService.storeData('LoginModule','approverTabFlag',undefined);
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
		
	$scope.sampleFilePath='https://s3.ap-south-1.amazonaws.com/cruisecareer/sample/sample_repat_upload.xlsx';
	
	$scope.getSettings = function(){
		Admin_Service.getSettings($rootScope.userdetails.id,1).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Name' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Ref. No.' || $scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='Applied Position' || $scope.columnlist[j].name=='Rating' || $scope.columnlist[j].name=='Experience' || $scope.columnlist[j].name=='Status' || $scope.columnlist[j].name=='Interview'){
									$scope.columnlist[j].isActive=true;
								}
							}
						}
						if($scope.columnlist[i].isActive==true)
							{
							count++;
							}
					}
			
		if(count==$scope.columnlist.length)
			{
			$scope.colcheck=true;
			}else{
				$scope.colcheck=false;
			}
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	};
	$scope.getSettings();
	
	$scope.savesettings = function(){
		var count=0;
		for(var i=0;i<$scope.columnlist.length;i++){
			if($scope.columnlist[i].isActive==true)
				{
				count++;
				}
		}

		if(count==$scope.columnlist.length)
		{
		$scope.colcheck=true;
		}else{
			$scope.colcheck=false;
		}	
		Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
			  $scope.savesetFlag = response.data;	
		});
	};
	
			$scope.activeColumn = function(columnName)
			{
				if($scope.columnlist != undefined){
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
						return true;
				}
				}
				return false;
			};
	
	
	$scope.selectAllColoumns = function(check)
	{
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Name' || $scope.columnlist[i].name=='Ref. No.'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
	};
	
	
	
	
	//----------------------------------------------
	$scope.fetchUploadedRepatFileList = function(offset,limit,colName,order,search){
		
		$(".loader").show();
		
		$scope.getCheckedId=[];
		
		if(search==null || search=="")
		{
			search= undefined;		  
		}
		if(colName == null || colName== ""){
			colName = undefined;
		}
		if(order == null){
			order = undefined;
		}
		Repate_Service.fetchUploadedRepatFileList(offset,limit,colName,order,search).then(function(response){
			$scope.DataList = response.data;
			//console.log($scope.DataList);
			$(".loader").fadeOut("slow");
		},function(response){		
			$(".loader").fadeOut("slow");
		});		  
	};
	$scope.fetchUploadedRepatFileList(0,10,null,null,null);
	
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchUploadedRepatFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
	$scope.getUploadedListcount=function(searchterm){
		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=searchterm;
		if($scope.colName == null){
			$scope.colName = undefined;
		}
		if($scope.order == null){
			 $scope.order = undefined;
		}
		if($scope.search=="" || $scope.search == null)
		{
			 $scope.search= undefined;  
		}
			
		Repate_Service.getUploadedListcount($scope.search).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
			$scope.setButton();					
		}
	},function(response){
		$(".loader").fadeOut("slow");		
	});		
};
	$scope.getUploadedListcount(null);
		
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
	$scope.fetchUploadedRepatFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	$scope.setButton = function(){
	$scope.navButtons = [];
			
	for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
		$scope.navButtons.push(j);
	}
		$scope.fetchUploadedRepatFileList();
};
};
	    
	$scope.SortingFileList = function(colName,searchterm){
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
		$scope.fetchUploadedRepatFileList(0,10,$scope.colName,$scope.order,$scope.search);	
	};

	$scope.shipData=function()
	{							
		
		$(".loader").show();
		
		var letterNumber = /^[a-zA-Z0-9)\(\_\-" "\.]+$/;	
		
		var input = document.getElementById('shipfile');
		
		if(input.value == "" || input.value == undefined)
		{
			
			GlobalModule_notificationService.notification("error","Please browse file.");	       
		       $(".loader").fadeOut("slow");
		       return;
		}
		var allowedExtensions = /(\.xlsx)$/i;
		
		if(!allowedExtensions.exec(input.value)){
				//console.log(input.value);
				//console.log(addshipdatafile.filename);
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please upload excel(.xlsx) file only.");
			$("#shipfilepath").val(null);
			$(".loader").fadeOut("slow");			
			return;
		}		
		else if((input.value!= "" || input.value != undefined))
			{
				
				//addshipdatafile.userid = $rootScope.userdetails.id;
				var file = input.files[0];
				var formData = new FormData();
				formData.append("file",file);
				//formData.append("filename",addshipdatafile.filename);
				formData.append("userid",$rootScope.userdetails.id);													
			
			$.ajax({
					url: 'rest/repatDataUpload/upload/uploaddata',
					type: 'POST',
					data: formData,					
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {
						
						
						$scope.addshipdatadetails = response;
						//console.log($scope.addshipdatadetails);
						$(".loader").fadeOut("slow");
						if($scope.addshipdatadetails.indexOf("success")!=-1){
										
							$("#upload-excel").modal('hide');
							
							GlobalModule_notificationService.notification("success","File uploaded successfully. All data saved");
						
							$scope.getUploadedListcount(null);
							$scope.fetchUploadedRepatFileList(0,10,null,null,null);									   							         
							$(".loader").fadeOut("slow");
							$state.go('restricted.admin.uploadRepatData');							
							}
						else if($scope.addshipdatadetails.indexOf("failed")!=-1){
									
							GlobalModule_notificationService.notification("error","File uploaded successfully. No data saved");
							$("#upload-excel").modal('hide');
							
							$scope.getUploadedListcount(null);
							$scope.fetchUploadedRepatFileList(0,10,null,null,null);									   							         
							$(".loader").fadeOut("slow");
							$state.go('restricted.admin.uploadRepatData');
						}
						else if($scope.addshipdatadetails.indexOf("partial")!=-1 ){
							
							$("#upload-excel").modal('hide');
							GlobalModule_notificationService.notification("error","File uploaded successfully. Partial data saved");
							
							$scope.getUploadedListcount(null);
							$scope.fetchUploadedRepatFileList(0,10,null,null,null);									   							         
							$(".loader").fadeOut("slow");
							$state.go('restricted.admin.uploadRepatData');
						}
						
						$(".loader").fadeOut("slow");
						$state.go('restricted.admin.uploadRepatData');
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

	$scope.fetchLogList=function(id){
		
		$(".loader").show();
		
		$scope.nameFlag=false;
		
		Repate_Service.fetchLogList(id).then(function(response){
			$scope.logList = response.data;
			//console.log($scope.logList);
			$('#reason-pop').modal('show');
			$("#reason-body").show();
			$("#overlapping-data").hide();
			$(".loader").fadeOut("slow");
		},function(response){				
			$(".loader").fadeOut("slow");
			
			GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
	});
};
			
	$scope.deletefromList = function(formlist){
				  
		$(".loader").show();
		$scope.formlist=formlist;
				
		$("#deletelist").modal('show');
		Repate_Service.deleteShipDataFileList($scope.formlist,$scope.getCheckedshipdataid).then(function(response){
		$scope.shidataflag = response.data;	
		$scope.getUploadedListcount(null);
		$scope.fetchUploadedRepatFileList(0,10,null,null,null);
		$scope.getCheckedshipdataid=[];
		if($scope.shidataflag.indexOf("success")!=-1){
			GlobalModule_notificationService.notification("success","Record deleted successfully");
		}
		else
		{
			GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		}
		$(".loader").fadeOut("slow");
	},function(response){
		
		 $(".loader").fadeOut("slow");
	});
};
			  
			  
	$scope.getCheckedshipdataid=[];
			  
	$scope.checkedshipdataList = function(id){			  
				  
	if($scope.getCheckedshipdataid.indexOf(id) !== -1)
	{		
		var array  = $scope.getCheckedshipdataid;
		var index = array.indexOf(id);
		$scope.getCheckedshipdataid.splice(index,1);
	}
	else
	{		    	
		$scope.getCheckedshipdataid.push(id);				      
	};						  
};
			 
	$scope.checkedAllList = function(listedShipData,rd){				  
		if(rd == true || rd == undefined){				 
		for(var i=0; i<listedShipData.length; i++){					  
					  
		//if already exist in getCheckedpoitionid than don't pass
		if($scope.getCheckedshipdataid.indexOf(listedShipData[i].id) !== -1)   {  						 
		}
		else
		{
			$scope.checkedshipdataList(listedShipData[i].id);	
		}
		}				
		}
		else
		{
			$scope.getCheckedshipdataid=[];
		}
	};
	
	$scope.check = function(){
		
		if($scope.getCheckedshipdataid.length == 0){
		GlobalModule_notificationService.notification("error","Please select record(s) to delete");
	}
	else
	{				  
		$('#deletelist').modal('show');
	}			  
};

	$scope.fileNameChanged = function(element)
	{
				  
		//var index = angular.element(element).scope().$index;
		$scope.input = document.getElementById('shipfile');			   
		if($scope.input.value!="")
		{						
			var filename=$scope.input.value;
			filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
			$('#shipfilepath').val(filename);				
		}
	};
			  	
	$scope.download = function(path){
		if(path.includes("amazonaws"))
	   {
		$rootScope.getSignedURL(path).then(function(response){
			window.open(response.data);
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	   }
		else
			{
			window.open(path);
			}			
	};
   
	$scope.clear=function(){
					
		$("#shipfilepath").val(null);
		$("#filename").val(null);
		$("#shipfile").val(null);
		  				  
	}; 
	
	$scope.dateformate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        return dateOut;
  };
	

  $scope.showDetails = function(s,enumber,ids,E_name){
	  
	  $scope.nameFlag=true;
	  
	  $scope.logId=ids;
	  
	  $scope.Employee_name=E_name;
	  $scope.Employee_number=enumber;
	  
	  if(s == 'overlapping')
	  {
		  $(".loader").show();
		  
		  $("#reason-body").hide();
		  
		  Repate_Service.fetchOverLappingData(enumber,ids).then(function(response){
				$scope.overappingData = response.data;
				//console.log($scope.overappingData);
				
				for(var i=0;i<$scope.overappingData.length;i++)
				{
					if($scope.overappingData[i].shipDataForOld.isActive == true)
					{
						$scope.checkFlag1=true;
						$scope.checkFlag2=false;
						break;
					}	
				}
				
				$(".loader").fadeOut("slow");
			},function(response){				
				$(".loader").fadeOut("slow");
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
		});
		  
		  
		  $("#overlapping-data").show();
		  
	      $(".loader").fadeOut("slow");
	  } 
	  
      if(s	== 'reasons')
      {
    	  $(".loader").show();
		  
    	  $scope.nameFlag=false;
    	  
    	  $("#overlapping-data").hide();
    	  
		  $("#reason-body").show();
		  	  
	      $(".loader").fadeOut("slow");
      }
      	  
  };
  
 
  
  $scope.keepRecords = function()
  {
	  $(".loader").show();
	  
	  $scope.nameFlag=false;
	  
	  var keepId=null;
	  var remId=null;
	  
	  if($("#option_0_1").is(":checked"))
	  {
		   keepId=$scope.overappingData[0].oldRecordIds;
		   remId=$scope.overappingData[0].newRecordId;		   
	  }
	  if($("#option_0_0").is(":checked"))
	  {
		   keepId=$scope.overappingData[0].newRecordId;
		   remId=$scope.overappingData[0].oldRecordIds;
	  }
	  
	  Repate_Service.keepRecords(keepId,remId,$scope.logId).then(function(response){
			$scope.savedDataStatus = response.data;
			//console.log($scope.savedDataStatus);
			$('#reason-pop').modal('hide');
			if($scope.savedDataStatus == 'success')
			{
				GlobalModule_notificationService.notification("success","Record saved successfully");
				
				$("#overlapping-data").hide();
		    	  
				  $("#reason-body").show();
				  
				$(".loader").fadeOut("slow");
			}
			else if($scope.savedDataStatus == 'failed')
			{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				$(".loader").fadeOut("slow");
			}
			
		},function(response){				
			$(".loader").fadeOut("slow");
			GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
	});
  };
  
	$scope.substring=function(date){
		var d=date.substr(0, 19);
		
		return d;
	};
			
	$scope.downloadSampleFile=function(sampleFilePath){
		window.open(sampleFilePath);
	};
	
}]);