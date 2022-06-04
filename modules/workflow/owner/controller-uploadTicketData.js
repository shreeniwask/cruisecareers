var controllers = angular.module('LoginModule');

controllers.controller('UploadTicketData_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','UploadTicketData_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,UploadTicketData_Service)
{
$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.workflow = GlobalModule_dataStoreService.loadData('LoginModule','workflowObject');
	
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
$scope.fetchUploadedFileList = function(offset,limit,colName,order,search){
		
		$(".loader").show();
		
	//	$scope.getCheckedId=[];
		
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
		UploadTicketData_Service.fetchUploadedFileList(offset,limit,colName,order,search,$scope.workflow.workFlowId).then(function(response){
			$scope.ticketDataList = response.data;
			//console.log($scope.ticketDataList);
			$(".loader").fadeOut("slow");
		},function(response){		
			$(".loader").fadeOut("slow");
		});		  
	};
	$scope.fetchUploadedFileList(0,10,null,null,null);
	
	
	$scope.dateformate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        return dateOut;
  };
  
  //fetch log list
  
  $scope.fetchTicketLogList=function(ticket){
		
		$(".loader").show();
		
		$scope.nameFlag=false;
		
		$scope.fileName=ticket.filename;
		
		UploadTicketData_Service.fetchTicketLogList(ticket.id).then(function(response){
			$scope.ticketLogList = response.data;
			
			$('#reason-pop').modal('show');
			$("#reason-body").show();
			
			$(".loader").fadeOut("slow");
		},function(response){				
			$(".loader").fadeOut("slow");
			GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
	});
};
  
//sorting

$scope.SortingTicketFileList = function(colName,searchterm){
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
		$scope.fetchUploadedFileList(0,10,$scope.colName,$scope.order,$scope.search);	
	};
	
	
	//pagination
	
	$scope.setButton = function(){
		$scope.navButtons = [];
		
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
			}
			 $scope.fetchUploadedFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
		
	$scope.getTicketDatacount=function(searchterm,workflowId){
						
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
		
	UploadTicketData_Service.getTicketDatacount($scope.search,$scope.workflow.workFlowId).then(function(response){				
		$scope.count = response.data;
	  //  console.log($scope.count);
	  //  console.log($scope.limit);
		if($scope.count>$scope.limit){
		$scope.setButton();					
	}
     },function(response){
	   $(".loader").fadeOut("slow");		
});		
};
$scope.getTicketDatacount(null);
	
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
    $scope.fetchUploadedFileList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
    $scope.setButton = function(){
    $scope.navButtons = [];
		
	for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
		$scope.navButtons.push(j);
	}
	$scope.fetchUploadedFileList();
};
};

//download

      $scope.download = function(path){
    	  
	        if(path.includes("amazonaws"))
            {
	             $rootScope.getSignedURL(path).then(function(response){
	            	// alert(1);
	             	window.open(response.data);
	        },function(response){
	      	GlobalModule_dataStoreService.errorResponseHandler(response);
	     });
       }
	   else
		  {
		//   alert();
		    window.open(path);
		   }			
};

	$scope.uploadTicketData=function()
	{									
		$(".loader").show();
		
		var letterNumber = /^[a-zA-Z0-9)\(\_\-" "\.]+$/;	
		
		var input = document.getElementById('ticketfile');
		
		if(input.value == "" || input.value == undefined)
		{
			
			GlobalModule_notificationService.notification("error","Please browse file.");	       
		       $(".loader").fadeOut("slow");
		       return;
		}
		
		var allowedExtensions = /(\.xlsx)$/i;
		
		if(!allowedExtensions.exec(input.value)){
			$(".loader").show();
			GlobalModule_notificationService.notification("error","Please upload excel(.xlsx) file only.");
			$(".loader").fadeOut("slow");			
			return;
		}		
		 if((input.value!= "" || input.value != undefined))
			{								
				var file = input.files[0];
				var formData = new FormData();
				formData.append("file",file);				
				formData.append("userid",$rootScope.userdetails.id);
				formData.append("workflowId",$scope.workflow.workFlowId);
			
			$.ajax({
					url: 'rest/uploadticketdata/upload/uploadticketfile',
					type: 'POST',
					data: formData,					
					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {
												
						$scope.uploadStatus = response;
												
						if($scope.uploadStatus.indexOf("success")!=-1){
										
							$("#upload-excel").modal('hide');
							
							GlobalModule_notificationService.notification("success","File Uploaded successfully,All data Stored");
							$scope.fetchUploadedFileList(0,10,null,null,null);	
							$scope.getTicketDatacount(null);
							$(".loader").fadeOut("slow");
						 }
						else if($scope.uploadStatus.indexOf("failed")!=-1){
									
							GlobalModule_notificationService.notification("error","File Uploaded successfully,No Data Stored");
							$("#upload-excel").modal('hide');
							$scope.fetchUploadedFileList(0,10,null,null,null);
							$scope.getTicketDatacount(null);
							$(".loader").fadeOut("slow");
						}
						else if($scope.uploadStatus.indexOf("partial")!=-1 ){
							
							$("#upload-excel").modal('hide');
							GlobalModule_notificationService.notification("error","File Uploaded successfully,Partial Data stored");
							$scope.fetchUploadedFileList(0,10,null,null,null);
							$scope.getTicketDatacount(null);
							$(".loader").fadeOut("slow");
						}
						
						$(".loader").fadeOut("slow");
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
	
//delete 
	
	$scope.deletefromList = function(formlist){
		  
		$(".loader").show();
		$scope.formlist=formlist;
				
		$("#deletelist").modal('hide');
		UploadTicketData_Service.deleteTicketDataFileFromList($scope.formlist,$scope.getCheckedticketdataid).then(function(response){
		$scope.ticketdataflag = response.data;	
		$(".loader").fadeOut("slow");
		$scope.getTicketDatacount(null);
		$scope.fetchUploadedFileList(0,10,null,null,null);
		$scope.getCheckedticketdataid=[];
		if($scope.ticketdataflag.indexOf("success")!=-1){
			GlobalModule_notificationService.notification("success","Record deleted successfully");
		}
		else
		{
			GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		}
		
	},function(response){
		
		 $(".loader").fadeOut("slow");
	});
};

$scope.getCheckedticketdataid=[];

$scope.checkedticketdataList = function(id){			  
			  
if($scope.getCheckedticketdataid.indexOf(id) !== -1)
{		
	var array  = $scope.getCheckedticketdataid;
	var index = array.indexOf(id);
	$scope.getCheckedticketdataid.splice(index,1);
}
else
{		    	
	$scope.getCheckedticketdataid.push(id);				      
};						  
};
		 
$scope.checkedAllList = function(listedTicketData,rd){				  
	if(rd == true || rd == undefined){				 
	for(var i=0; i<listedTicketData.length; i++){					  
				  
	//if already exist in getCheckedpoitionid than don't pass
	if($scope.getCheckedticketdataid.indexOf(listedTicketData[i].id) !== -1)   {  						 
	}
	else
	{
		$scope.checkedticketdataList(listedTicketData[i].id);	
	}
	}				
	}
	else
	{
		$scope.getCheckedticketdataid=[];
	}
};

$scope.check = function(){
	
	if($scope.getCheckedticketdataid.length == 0){
	GlobalModule_notificationService.notification("error","Please select any record");
}
else
{				  
	$('#deletelist').modal('show');
}			  
};

$scope.clear=function(){
	
	$("#shipfilepath").val(null);
	$("#filename").val(null);
	$("#shipfile").val(null);
	  				  
}; 

$scope.fileNameChanged = function(element)
{
	$scope.input = document.getElementById('ticketfile');			   
	if($scope.input.value!="")
	{						
		var filename=$scope.input.value;
		filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
		$('#ticket-data-file').val(filename);				
	}
};

$scope.clear=function(){
	
	$("#ticketfile").val(null);
	$("#ticket-data-file").val(null);
	  				  
};

}]);