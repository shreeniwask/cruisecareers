'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewDeploymentRequisitionApproverList_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CrewDeploymentRequisitionApproverList_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CrewDeploymentRequisitionApproverList_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
		
				
	//fetch BrandList
	$scope.brandsList = function(){
		  
		CrewDeploymentRequisitionApproverList_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
			  console.log($scope.brandsList);
			  $(".loader").fadeOut("slow");
		  },function(response){
				
			});
	  };
	$scope.brandsList();
	
	//Fetch Approver List
	$scope.fetchCrewDeployApproverList = function(offset,limit,colName,order,search,brandid){
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
		 if(brandid==null || brandid==""){
	  		  brandid=undefined;
	  	  }
		 CrewDeploymentRequisitionApproverList_Service.fetchCrewDeployApproverList(offset,limit,colName,order,search,brandid).then(function(response){
		
		 $scope.crewdeploymentapproverList=response.data;
		 console.log("Apporver List:");
		 console.log($scope.crewdeploymentapproverList);
		 
		  $(".loader").fadeOut("slow");
	 },function(response){
			$(".loader").fadeOut("slow");
		});
	 };
	$scope.fetchCrewDeployApproverList(0,10,null,null,null,null);
	
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
			$scope.fetchCrewDeployApproverList(0,10,$scope.colName,$scope.order,$scope.search,$scope.brandid);
			
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
				 $scope.fetchCrewDeployApproverList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.brandid);
			};
			
  
			//------------------------------count start-----------------------------------------------
			$scope.fetchCrewDeployApproverListCount=function(searchterm,brandid){
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
				 CrewDeploymentRequisitionApproverList_Service.fetchCrewDeployApproverListCount($scope.search,$scope.brandid).then(function(response){
					
					$scope.count = response.data;
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});		
			};
			$scope.fetchCrewDeployApproverListCount(null,null);
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
		        $scope.fetchCrewDeployApproverList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.brandid);
		    };
			
			//---------------------------------pagination end---------------------------------------------
		
		    $scope.generateExcel = function(){		 
		    	 
				  if($scope.search == undefined){
					  $scope.search ="";
				  }			 
				  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+24+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&approverFlag='+'approver');	 
			  };
			  
			  $scope.fetchLogList=function(id,reqlist){
					
					$(".loader").show();
					
					CrewDeploymentRequisitionApproverList_Service.fetchLogList(id).then(function(response){
						$scope.logList = response.data;
						for(var i=0;i<$scope.logList.length;i++){
							$scope.RequisitionName=reqlist.req.name
							$scope.RequisitionPosition=reqlist.req.positonname;
							$scope.RequisitionBrand=reqlist.req.brandName;
							$scope.RequisitionCode=reqlist.req.code;
							$scope.RequisitionShip=reqlist.req.shipName;
							$scope.RequisitionPort=reqlist.req.port;
							$scope.RequisitionJoiningDate=reqlist.req.joining_date;
							$scope.RequisitionNoOfCandidates=reqlist.req.no_of_candidates;
							$scope.RequisitionCategoryName=reqlist.req.categoryName;
							break;
						}
						$('#approve_log_details').modal('show');
						$("#reason-body").show();
						$(".loader").fadeOut("slow");
					},function(response){				
						$(".loader").fadeOut("slow");
						GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
				});
			};
			

			$scope.updateApproverStatus=function(req,status){
				
				$(".loader").show();
				if(status=="Rejected"){
					var message=$("#message").val();
					
				}
				if(req == undefined){
					req=$scope.getReqData;
					status=$scope.getapprostatus;
					req.comment=message;
				}
				CrewDeploymentRequisitionApproverList_Service.updateApproverStatus(req,status,$rootScope.userdetails.id).then(function(response){
					$scope.updateapproverstatus = response.data;
					 location.reload();
					$(".loader").fadeOut("slow");
				},function(response){				
					$(".loader").fadeOut("slow");
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
			});
			};

			$scope.getReqData="";
			$scope.getapprostatus="";
			$scope.getReqDataForRejected=function(req,status){
				
			   		$scope.getReqData=req;
			   		$scope.getapprostatus=status;
							  
			};
	
}]);