'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Bulk_Sms_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Bulk_Sms_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Bulk_Sms_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    $scope.MasterScreenId = GlobalModule_dataStoreService.loadData('LoginModule','screenId');
	
    
    
    $scope.fetchBulkSmsData = function(offset,limit,colName,order,search){
  	  $(".loader").show();
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
  		
  	  
  		 Bulk_Sms_Service.fetchBulkSmsData(offset,limit,colName,order,search).then(function(response){
  		  $scope.bulkList = response.data;
  		  console.log($scope.bulkList);
  		  $(".loader").fadeOut("slow");
  	},function(response){
  		$(".loader").fadeOut("slow");
  		});
  };
  $scope.fetchBulkSmsData(0,10,null,null,null);
  
  
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
		$scope.fetchBulkSmsData(0,10,$scope.colName,$scope.order,$scope.search);
		
	};
	//Sorting End
	
	
	
	//formate date 
   $scope.formatDate1 = function(date){	
		   
		     if(date==null)
		    	 {
		    	 	return;
		    	 }
	         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
	         return dateOut;
	   };
	   
	   
	   //------------------------Pagination Start-----------------------------------------------
		$scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
	   $scope.setButton = function(){
		   $scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchBulkSmsData($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
			//------------------------------count start-----------------------------------------------
			$scope.fetchBulkSmsDataListCount=function(searchterm){
				$(".loader").show();
				
				$scope.offset =0 ;
				$scope.navButtons = [];
				$scope.count= 0 ;
				$scope.start = 0;
				$scope.search=searchterm;
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
				
				 Bulk_Sms_Service.fetchBulkSmsDataListCount($scope.search).then(function(response){
					
					$scope.count = response.data;
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});		
			};
			$scope.fetchBulkSmsDataListCount(null);
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
		        $scope.fetchBulkSmsData($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		    };
			
			//---------------------------------pagination end---------------------------------------------
			
	
	    


		 $scope.fetchTemplateTypeList=function(){
			 $(".loader").show();	 
			 Bulk_Sms_Service.fetchTemplateTypeList().then(function(response){
				 $scope.templateTypeList=response.data;
				 $(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");
			 });			 
		 } ;
	   
		
		  $scope.fetchTemplatepreview= function(id){
		    	$(".loader").show();
		    	$scope.previewid=id;
		    	Bulk_Sms_Service.fetchTemplatepreview($scope.previewid).then(function(response){	    		
		    		$scope.tmptpreview=response.data;
		    		console.log($scope.tmptpreview);
		    		/*if($scope.tmptpreview[0].Body.indexOf("${schedule}") > -1){	
		    			
		    			if($scope.usersdetailforEmail.length == 1){	    				
		    				$scope.Slotflag = true;	 
		    				$scope.fetchUserEventsAndSlots($scope.selectedUserId);	    	
		    			}else{	
		    				$scope.communicationmanager={};
		    				$scope.tmptpreview[0].Body = null;	    				
		    				$('#comm-manager').modal("hide");
		    				$scope.Slotflag = false;
		    				GlobalModule_notificationService.notification("error","Please select only one user for scheduler mail");	  				
		    			}	    			
		    		}else{
		    			$scope.Slotflag = false;	
		    		}*/
		    		
		    		$(".loader").fadeOut("slow");	
		    	},function(response){
		    		$(".loader").fadeOut("slow");	
		    	});
		    	
		    };
		    
		    
		   
		 

		    
		    $scope.smsFileNameChanged = function(element)
			{
						  
				//var index = angular.element(element).scope().$index;
				$scope.input = document.getElementById('smsfile');			   
				if($scope.input.value!="")
				{						
					var filename=$scope.input.value;
					filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
					$('#smsfilepath').val(filename);				
				}
			};
		

		    $scope.clearsmsdata=function(){
				
				$("#smsfilepath").val(null);
				$("#filename").val(null);
				$("#smsfile").val(null);
				$scope.tmptpreview = null;	
				$scope.template={};
				 $scope.modeid=null;
 				
			}; 
			
			
			 $scope.reload = function(){
				 
 				$scope.tmptpreview = null;	
 				 $scope.template={};
 				 $scope.modeid=null;
 				$('#comm-manager').modal("hide");
 				
			 }; 
			 
			 $scope.close = function(){
				 
	 				
	 				$("#id_of_textbox1").val(null);
	 				$('#SMS_log_modal').modal("hide");
	 				
				 }; 
			
			
	

			$scope.bulkSmsData=function(tempid,modeid)
			{		
				
				
				$scope.templateid=tempid;
				$scope.modeid = modeid;
				$scope.temppreview = document.getElementById('templatepreview');
				$scope.preview=$scope.temppreview.value;
				console.log($scope.temppreview.value);
				
				$(".loader").show();
				
				var letterNumber = /^[a-zA-Z0-9)\(\_\-" "\.]+$/;	
				
				var input = document.getElementById('smsfile');
				
				if($scope.templateid == "" || $scope.templateid == undefined)
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
				
				if($scope.modeid == "" || $scope.modeid == undefined)
				{
					
					GlobalModule_notificationService.notification("error","Please choose SMS mode.");	       
				       $(".loader").fadeOut("slow");
				       return;
				}
				var allowedExtensions = /(\.xlsx)$/i;
				
				if(!allowedExtensions.exec(input.value)){
						////console.log(input.value);
						////console.log(addshipdatafile.filename);
					$(".loader").show();
					GlobalModule_notificationService.notification("error","Please upload excel(.xlsx) file only.");
					$("#smsfilepath").val(null);
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
						//formData.append("savebulkdata",$scope.bulksms);	
						formData.append("templateid",$scope.templateid);
						formData.append("modeid",$scope.modeid );
						formData.append("temppreview",$scope.temppreview.value);	
						
					
					$.ajax({
							url: 'rest/bulkSms/upload/uploadbulksmsdata',
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
												
									$("#comm-manager").modal('hide');
									
									GlobalModule_notificationService.notification("success","File Uploaded Successfully.");
								
									 $state.reload();		
									 $(".modal-backdrop").hide();
									$(".loader").fadeOut("slow");
														
									}
								else {
											
									GlobalModule_notificationService.notification("error","File Uploaded failed");
									$("#comm-manager").modal('hide');
									
																   							         
									$(".loader").fadeOut("slow");
									
								}
								
								
								$(".loader").fadeOut("slow");
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
	
		
	


$scope.fetchSmsStatusLog = function(search,colName,order,id){
	  $scope.id=id;
	  $(".loader").show();
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
		
	
		 Bulk_Sms_Service.fetchSmsStatusLog(search,colName,order,$scope.id).then(function(response){
		  $scope.smslog = response.data;
		 console.log($scope.smslog);
		  $(".loader").fadeOut("slow");
	},function(response){
		$(".loader").fadeOut("slow");
		});
};
 //$scope.fetchSmsStatusLog(null,0);


$scope.generateExcel = function(id,search){
	$scope.smsid=id;
	$scope.search=search;
	
	if($scope.search == undefined){
		$scope.search = "";
	}        	
	
	 
	  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+22+'&smsid='+$scope.smsid+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));	
	  

};
		 
//Sorting log Start
$scope.sortByColumnlog = function(colname,searchterm,id){
	   $scope.offset =0 ;
		$scope.start = 0;
		$scope.id=id;
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
		$scope.fetchSmsStatusLog($scope.search,$scope.colName,$scope.order,$scope.id);
		
	};
	//Sorting End
	

}]);

