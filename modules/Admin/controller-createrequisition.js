'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CreateRequistion_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','Customer_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,Customer_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.customerRequisitionFlag =  GlobalModule_dataStoreService.loadData('LoginModule','customerRequisitionFlag');
	$scope.newassessmentlist=[];
	$scope.searchassessmentlist=[];
	$scope.score="";
	$scope.customerAssessmentRequisitionFlag=false;
	//$scope.customerAssessmentRequisitionFlag =  GlobalModule_dataStoreService.loadData('LoginModule','customerAssessmentRequisitionFlag');
	$scope.assessmentlist=GlobalModule_dataStoreService.loadData('LoginModule','assessmentlist');
	$scope.searchassessmentlist=GlobalModule_dataStoreService.loadData('LoginModule','searchassessmentlist');
	$scope.req_id=GlobalModule_dataStoreService.loadData('LoginModule','req_id');
	
	 $scope.fetchpositonbydipartment = function(id){	
		  Admin_Service.fetchpositonbydipartment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
			  //console.log($scope.positionbydepartment);		  
		  },function(response){				
			});		  
		  };
	
	if($scope.customerRequisitionFlag == true){
		$scope.cstmrrequisitionstn = GlobalModule_dataStoreService.loadData('LoginModule','customerRequisition');
		$scope.fetchpositonbydipartment($scope.cstmrrequisitionstn.category.id);
		$scope.newassessmentlist=$scope.cstmrrequisitionstn.assessmentList;
		$scope.brand_id=$scope.cstmrrequisitionstn.brand.id;
		$scope.dept_id=$scope.cstmrrequisitionstn.category.id;
		$scope.position_id=$scope.cstmrrequisitionstn.position.id;
		$scope.customerAssessmentRequisitionFlag=GlobalModule_dataStoreService.loadData('LoginModule','customerAssessmentRequisitionFlag');
			
		
	}else{
		$scope.cstmrrequisitionstn = {};
	}
	
		$scope.brandsList = function(){
				  
				  Login_Service.brandsList().then(function(response){
					  $scope.brandsList = response.data;
				  },function(response){
						
					});
			  };
			    
			  $scope.brandsList();
			  
			  $scope.fetchCategoryList = function(){		  
				  Login_Service.fetchCategoryList().then(function(response){
					  $scope.categoryList = response.data;			
				  },function(response){
						
					});
			  };
			  $scope.fetchCategoryList();
			  
			
		  
		  $scope.savecustomerRequisition=function(req){			 
			req.requisitiondate  = $("#requisitiondate").val();
			req.closuredate=$("#closuredate").val();
			req.userid=$rootScope.userdetails.id;		 
			
			for(var i=0;i<$scope.newassessmentlist.length;i++)
			{
				    req.score  = $("#score"+i).val();
				    $scope.newassessmentlist[i].score=req.score;
		        	
			}
			if($scope.newassessmentlist=="")
				req.assessmentList= [];
				else
					req.assessmentList= $scope.newassessmentlist;	
			 var dateParts = req.requisitiondate.split("-");

			    var strtD = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
			   
			    dateParts = req.closuredate.split("-");

			    var endD = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

			    if(strtD >endD ){
			     
			      GlobalModule_notificationService.notification("error","End Date should be greater than start date");
			    }else{    	
			 Customer_Service.savecustomerRequisition(req).then(function(response){
				  $scope.saverequisition = response.data;
				
				 $state.go('restricted.admin.customerrequisition');
				
				 if($scope.saverequisition.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Your Customer Requisition has been saved successfully");
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
			 
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				}); 
			  };
		  }; 
			  $scope.updateRequiDetails=function(req){
				 
				  req.requisitiondate  = $("#requisitiondate").val();
					req.closuredate=$("#closuredate").val();
					req.userid=$rootScope.userdetails.id;
					for(var i=0;i<$scope.newassessmentlist.length;i++)
					{
						    req.score  = $("#score"+i).val();
						    $scope.newassessmentlist[i].score=req.score;
				        	
					}
					if($scope.newassessmentlist=="")
						req.assessmentList= [];
						else
							req.assessmentList= $scope.newassessmentlist;	
					 var dateParts = req.requisitiondate.split("-");

					    var strtD = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
					   
					    dateParts = req.closuredate.split("-");

					    var endD = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

					    if(strtD >endD ){
					     
					      GlobalModule_notificationService.notification("error","End Date should be greater than start date");
					    }else{
				  Customer_Service.updateRequiDetails(req).then(function(response){
					  $scope.updaterequisition = response.data;
					  $state.go('restricted.admin.customerrequisition');
					  if($scope.updaterequisition.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Your Customer Requisition has been updated successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					});
					  
			  };
			  };
		
				  
			 $scope.cancelRequisition=function(){
				 $state.go('restricted.admin.customerrequisition');
			 }; 
			 
			
			 $scope.checkErr = function(startDate,endDate) {
				    $scope.errMessage = '';		    
			 };
		   
		  
		  $scope.saveOrUpdateCustomerRequisition = function(req){
			  if($scope.customerRequisitionFlag == true){
								
				  $scope.updateRequiDetails(req);
			  }else{  
				  $scope.savecustomerRequisition(req);	  
			       }
		  };
		  
		  //---------------------------------fatch assessment base on brand,dep,position----------------------//
		  $scope.fetchassessmentlist = function(brand_id,dept_id,position_id){		
			  $(".loader").show();
			  $scope.brand_id=brand_id;
			  $scope.dept_id=dept_id;
			  $scope.position_id=position_id;
			  if($scope.brand_id!= undefined && $scope.dept_id!= undefined && $scope.position_id!= undefined){
			  Customer_Service.fetchassessmentlist(brand_id,dept_id,position_id).then(function(response){
				  $scope.assessmentlist = response.data;
				  $scope.searchassessmentlist=$scope.assessmentlist;
				  if($scope.assessmentlist.length>0){
					  if($scope.cstmrrequisitionstn.assessmentList !=undefined){
					  $scope.newassessmentlist=$scope.cstmrrequisitionstn.assessmentList;
					  $scope.showRequisitionFlag=true;
					  }else{
						  $scope.showRequisitionFlag=false;
					  }
					  $scope.customerAssessmentRequisitionFlag=true;
					  
				  }else{
					  $scope.customerAssessmentRequisitionFlag=false;
					  $scope.clearMappedAssessment();
				  }
			  
				  $(".loader").fadeOut("slow");
			  },function(response){				
				});		
			  }else{
				  $(".loader").fadeOut("slow");
				  $scope.customerAssessmentRequisitionFlag=false;
				  $scope.clearMappedAssessment();
			  }
		  };
		
		  $scope.getassessmentchecklist = function()
		  {	
			  $scope.newassessmentlist=[];
			  for(var i=0; i<$scope.searchassessmentlist.length>0; i++){
				  var x = document.getElementById($scope.searchassessmentlist[i].assessments);
				  if(x.checked==true){
					  var asses={};
		        	  asses.assessments=$scope.searchassessmentlist[i].assessments;
		        	  asses.score="";
			  $scope.newassessmentlist.push(asses);
					  }
					  }
			   
		  };
		 
		  $scope.fetchassessmentSearch = function(brand_id,dept_id,position_id,search_v){
			  if(search_v!=""){
				  $scope.searchassessmentlist=[];
			  for(var i=0; i<$scope.assessmentlist.length>0; i++){
		          if(
		        		  $scope.assessmentlist[i].assessments.match(search_v)){
		        	  console.info($scope.assessmentlist[i].assessments);
		        	 
		        	  var asses={};
		        	  asses.assessments=$scope.assessmentlist[i].assessments;
		        	  $scope.searchassessmentlist.push(asses);
		        	  $scope.setAssessment();
		        	}
			  }
			  }else{
				  $scope.searchassessmentlist=$scope.assessmentlist;
				  $scope.setAssessment();
			  }
				  
		  };
		  
		  $scope.clearMappedAssessment = function(){
				$scope.newassessmentlist="";
			};
			 
			$scope.setAssessment = function()
			  {
				
				if($scope.searchassessmentlist.length>0 && $scope.newassessmentlist.length>0)
					{
					  for(var i=0;i<$scope.searchassessmentlist.length;i++)
						  {
						     for(var j=0;j<$scope.newassessmentlist.length;j++)
						    	 {
						    	    if ($scope.newassessmentlist[j].assessments==$scope.searchassessmentlist[i].assessments)
						    	    	{
						    	    	
						    	    	var abc=$scope.newassessmentlist[j].assessments;
						    	    	  var x = document.getElementById($scope.searchassessmentlist[i].assessments);
						    	    	  var s= document.getElementById($scope.newassessmentlist[j].score);
						    	    	  $scope.checked=true;
						    	    	  $scope.searchassessmentlist[i].checked=$scope.checked;
						    	    	  break;
						    	    	}
						    	    
						    	 }
						  
						  }
					}
			  };
			
			  $scope.removeassessment = function(assessmentname) 
			  {
				  var arry  = $scope.newassessmentlist;
				  var element = arry.indexOf(assessmentname);
				  $scope.newassessmentlist.splice(element,1);
				  var x = document.getElementById(assessmentname);
				  x.checked = false;
			  };
			  
			  $scope.SortingReqAssessmentList = function(colName){
				  $scope.colName=colName;
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
					$scope.fetchRequisitionAssessment($scope.colName,$scope.order,$scope.req_id);	
				};
				
				$scope.fetchRequisitionAssessment = function(colName,order,req_id){
					Customer_Service.fetchRequisitionAssessment(colName,order,req_id).then(function(response){
						  $scope.newassessmentlist = response.data;
						  $(".loader").fadeOut("slow");
					  },function(response){				
						});	
				};
}]);