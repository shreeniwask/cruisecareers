'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewDeploymentRequisitionList_Ctrl',['$scope','$rootScope','$state','$filter','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','CrewDeployRequisitionMaster_Service','CrewDeployCreateViewRequisition_Service','Customer_Service','CrewDeploymentRequisitionApproverList_Service', function ($scope, $rootScope,$state,$filter,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,CrewDeployRequisitionMaster_Service,CrewDeployCreateViewRequisition_Service,Customer_Service,CrewDeploymentRequisitionApproverList_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.displayClearFilter = false;
	$scope.dateClearFilterBtn = false;
	$scope.createCrewDeployRequisitionPage = function(){
		
		$state.go("restricted.admin.createcrewdeployrequisition");
		GlobalModule_dataStoreService.storeData('LoginModule','crewDeployRequisitionFlag', false);
	};
	
	$scope.fetchCrewDeployRequisitionList = function(offset,limit,colName,order,search,fromDate,toDate){
		 $(".loader").show();
		  var to  = $("#todate").val();
		  var fr  = $("#fromdate").val();
		  toDate=to;
		  fromDate=fr;
		
		 if(search==null || search=="")
		  {
		  search= undefined;
		  
		  }
		 if(fromDate == "" || fromDate == null)
		  {
			fromDate= undefined;
		  
		  }
		if(toDate == "" ||	toDate == null)
		{
			toDate= undefined;
		}
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		 $scope.fromDate = $filter('date')(fr, 'yyyy-MM-dd');
		 $scope.toDate = $filter('date')(to, 'yyyy-MM-dd');
		 
		 //for all use from date and to date
		 $scope.from_Date = $filter('date')(fromDate, 'yyyy-MM-dd');
		 $scope.to_Date = $filter('date')(toDate, 'yyyy-MM-dd');
		 
		 CrewDeployCreateViewRequisition_Service.fetchCrewDeployRequisitionList(offset,limit,colName,order,search,fromDate,toDate).then(function(response){
		
		 $scope.crewdeployrrequisitionList=response.data;
		 
		 $(".loader").fadeOut("slow");
	 },function(response){
			$(".loader").fadeOut("slow");
		});
	 };
	$scope.fetchCrewDeployRequisitionList(0,10,null,null,null,null,null);
	
	$scope.filterCrewDeployRequisitionList = function(offset,limit,colName,order,search,fromDate,toDate){
		 $(".loader").show();
		  var to  = $("#todate").val();
		  var fr  = $("#fromdate").val();
		  if(to!="" && fr!=""){
			  $scope.validateDate();
		  $scope.d = (to.split('-')[0]);
	      $scope.m = (to.split('-')[1]);
	      $scope.y = (to.split('-')[2]);
	      $scope.fd = (fr.split('-')[0]);
	      $scope.fm = (fr.split('-')[1]);
	      $scope.fy = (fr.split('-')[2]);
		  toDate=$scope.y+'-'+$scope.m+'-'+$scope.d;
		  fromDate=$scope.fy+'-'+$scope.fm+'-'+$scope.fd;
		  $scope.dateClearFilterBtn = false;
		  }else{
			  if(search==null || search==""){
			  GlobalModule_notificationService.notification("error","Please select date.");
			  $(".loader").fadeOut("slow");
			  $scope.dateClearFilterBtn = true;
			  return;
			  }
		  }
		 if(search==null || search=="")
		  {
		  search= undefined;
		  
		  }else{
			  $scope.dateClearFilterBtn = false;
		  }
		 if(fromDate == "" || fromDate == null)
		  {
			fromDate= undefined;
		  
		  }
		if(toDate == "" ||	toDate == null)
		{
			toDate= undefined;
		}
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		 $scope.fromDate = $filter('date')(fr, 'yyyy-MM-dd');
		 $scope.toDate = $filter('date')(to, 'yyyy-MM-dd');
		 
		 //for all use from date and to date
		 $scope.from_Date = $filter('date')(fromDate, 'yyyy-MM-dd');
		 $scope.to_Date = $filter('date')(toDate, 'yyyy-MM-dd');
		 
		 CrewDeployCreateViewRequisition_Service.fetchCrewDeployRequisitionList(offset,limit,colName,order,search,fromDate,toDate).then(function(response){
		
		 $scope.crewdeployrrequisitionList=response.data;
		 
		 $(".loader").fadeOut("slow");
	 },function(response){
			$(".loader").fadeOut("slow");
		});
	 };
	 
	$scope.SortingCrewRequisitionList = function(colName,searchterm,fromDate,toDate){
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
			$scope.from_Date=$scope.from_Date;
				$scope.to_Date=$scope.to_Date;
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
			if($scope.from_Date == "" || $scope.from_Date == null)
			  {
			  $scope.from_Date= undefined;
			  
			  }
			if($scope.to_Date == "" || $scope.to_Date == null)
			{
				$scope.to_Date= undefined;
			}
			$scope.fetchCrewDeployRequisitionList(0,10,$scope.colName,$scope.order,$scope.search,$scope.from_Date,$scope.to_Date);	
		};
		
		 $scope.getCrewDeployRequisitionCount=function(search,fromDate,toDate){
				$scope.offset =0 ;
				$scope.navButtons = [];
				$scope.count= 0 ;
				$scope.start = 0;
				$scope.search=search;
				$scope.from_Date=fromDate;
				$scope.to_Date=toDate;
				if($scope.search==null || $scope.search=="")
				  {
					$scope.search= undefined;
				  
				  }
			  if($scope.colName == null || $scope.colName== ""){
				  $scope.colName = undefined;
				 }
				 if($scope.order == null){
					 $scope.order = undefined;
				 }
				 if($scope.from_Date == "" || $scope.from_Date == null)
				  {
				  $scope.from_Date= undefined;
				  
				  }
				if($scope.to_Date == "" || $scope.to_Date == null)
				{
					$scope.to_Date= undefined;
				}
				 CrewDeployCreateViewRequisition_Service.getCrewDeployRequisitionCount($scope.search,$scope.from_Date,$scope.to_Date).then(function(response){
					$scope.count = response.data;
				
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});		
			};
			$scope.getCrewDeployRequisitionCount(null,null,null);
		
			  $scope.deletefromListCDreq = function(formlist){
				  $scope.formlist=formlist;
				  

				  if($scope.getCheckedId.length == 0) 
				  {
					  GlobalModule_notificationService.notification("error","Please select any record");
				  }
				  else
				  {
					  $("#deletelist").modal('show');
					  CrewDeployCreateViewRequisition_Service.deleteFromCDreqList($scope.formlist,$scope.getCheckedId).then(function(response){
					  $scope.crewdeployrequiflag = response.data;	
					  $scope.getCheckedId=[];
					  $scope.getCrewDeployRequisitionCount(null,null,null);
					  $scope.fetchCrewDeployRequisitionList(0,10,null,null,null,null,null);
					  
					  if($scope.crewdeployrequiflag.indexOf("success")!=-1){
						  GlobalModule_notificationService.notification("success","Record deleted successfully");
					  }else{
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					  }
					  $(".loader").fadeOut("slow");
					   
					 
				  },function(response){
					  $(".loader").fadeOut("slow");
					});
					  
				  }
				
			  };
			  $scope.fetchCrewDeployRequisitionById=function(id){
				 CrewDeployCreateViewRequisition_Service.fetchCrewDeployRequisitionById(id).then(function(response){
						
						 $scope.cdrequisition=response.data;
						
						 GlobalModule_dataStoreService.storeData('LoginModule','crewDeployRequisition', $scope.cdrequisition);
						  GlobalModule_dataStoreService.storeData('LoginModule','crewDeployRequisitionFlag', true);
						 $state.go("restricted.admin.createcrewdeployrequisition");
						 $(".loader").fadeOut("slow");
					 },function(response){
							$(".loader").fadeOut("slow");
							
						});
					 };
			  
					  $scope.TriggerCDReqCommunication=function(req){
							 
						  $(".loader").show();
						  req.userid=$rootScope.userdetails.id;	
						    req.status='Started';
						  
						  CrewDeployCreateViewRequisition_Service.updateCrewDeployRequisitionDetails(req).then(function(response){
							  $scope.updatecrewdeployrequisition = response.data;
							 if($scope.updatecrewdeployrequisition.indexOf("success")!=-1){
								  GlobalModule_notificationService.notification("success","Your Crew Deployment  Requisition Triggered successfully");
								  //$state.go('restricted.admin.crewdeploymentconfiguration');
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  }
							  $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							});
							  
					 
					  };
			  $scope.checkifRequisitionSelected = function(){
				  
				  if($scope.getCheckedId.length == 0){
					  GlobalModule_notificationService.notification("error","Please select any record");
				  }else{
					  $("#deletelist").modal('show');
					  }
				
			  };
	$scope.brandsList = function(){
		  
		CrewDeployRequisitionMaster_Service.brandsList().then(function(response){
			  $scope.brandsList = response.data;
			  console.log($scope.brandsList);
			  $(".loader").fadeOut("slow");
		  },function(response){
				
			});
	  };
	$scope.brandsList();
	
	$scope.getSettings = function(){
		Customer_Service.getSettings($rootScope.userdetails.id,24).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Req. Name' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Req. Name' || $scope.columnlist[j].name=='Req. Code' || $scope.columnlist[j].name=='Position' || $scope.columnlist[j].name=='Brand' || $scope.columnlist[j].name=='Ship' || $scope.columnlist[j].name=='Port of Joining' || $scope.columnlist[j].name=='No. of Candidates' || $scope.columnlist[j].name=='Expected Joining Date' || $scope.columnlist[j].name=='Approval status' || $scope.columnlist[j].name=='Acceptance status' || $scope.columnlist[i].name=='Action'){
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
	
	$scope.selectAllColoumns = function(check)
	{
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Brand' || $scope.columnlist[i].name=='No. of Candidates' || 
							$scope.columnlist[i].name=='Req. Name' || $scope.columnlist[i].name=='Action'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
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
		Customer_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
			  $scope.savesetFlag = response.data;	
		});
	};
	
	
	 $scope.getCheckedId=[];
	  $scope.checkedList=function(id,status){
		
	
		  if($scope.getCheckedId.indexOf(id) !== -1)
		  {		
		  var array  = $scope.getCheckedId;
		  var index = array.indexOf(id);
		  $scope.getCheckedId.splice(index,1);
		 }else
			  {		    	
			 
	     	if($scope.getreqstatus=="Started" || $scope.getreqstatus=="Closed"){
				}else{
					$scope.getCheckedId.push(id);
				}
			}
			  		  
	  };
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchCrewDeployRequisitionList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.from_Date,$scope.to_Date);
			};

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
		  $scope.fetchCrewDeployRequisitionList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.from_Date,$scope.to_Date);
		};
		
		 $scope.validateDate = function(){  //---------validate issue date and expiry date
			 var fromDate=$("#fromdate").val();
				var toDate=$("#todate").val();
				
		       if ( new Date(stringToDate(fromDate,"dd-mm-yyyy","-")) > new Date(stringToDate(toDate,"dd-mm-yyyy","-")) ) { 
		          //console.log(fromD);
		          //console.log(toD);
		         
		         // $scope.compliance.expiryDate='';
				   GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
		       	//$('#'+element).after('<p>You cannot enter a date from past!</p>');
		       	$('#todate').val(null);
		           return false;
		       }
		       return true;
		       
		};
		function stringToDate(_date,_format,_delimiter)
		{
		          var formatLowerCase=_format.toLowerCase();
		          var formatItems=formatLowerCase.split(_delimiter);
		          var dateItems=_date.split(_delimiter);
		          var monthIndex=formatItems.indexOf("mm");
		          var dayIndex=formatItems.indexOf("dd");
		          var yearIndex=formatItems.indexOf("yyyy");
		          var month=parseInt(dateItems[monthIndex]);
		          month-=1;
		          var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
		          return formatedDate;
		}
		

		$scope.generateExcel = function(){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }	
			  if($scope.from_Date == undefined){
	        		$scope.from_Date = "";
	        	}
	        	if($scope.to_Date == undefined){
	        		$scope.to_Date = "";
	        	}
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+24+'&search='+$scope.search+'&fromdate='+$scope.from_Date+'&todate='+$scope.to_Date+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
		  
$scope.checkedAllList = function(listedRequisition,rd){
			  
			  if(rd == true || rd == undefined){				 
			  for(var i=0; i<listedRequisition.length; i++){					  
				  
				  //if already exist in getCheckedpoitionid than don't pass
				  $scope.getreqstatus=listedRequisition[i].status;
				  if($scope.getCheckedId.indexOf(listedRequisition[i].id) !== -1)   {  						 
				  }else{
					  $scope.checkedList(listedRequisition[i].id);	
				  }
				  
			  }			
			  }else{
				  $scope.getCheckedId=[];
			  }
		  };
		  
		  
		  $scope.check = function(){
			 		  
		  if($scope.getCheckedId.length == 0){
			  GlobalModule_notificationService.notification("error","Please select any record");
			  }
		  else{				  
			  $('#deletelist').modal('show');
			  }			  
		  };
		 
		  $scope.fetchLogList=function(id,reqlist){
				
				$(".loader").show();
				
				CrewDeploymentRequisitionApproverList_Service.fetchLogList(id).then(function(response){
					$scope.logList = response.data;
					$scope.RequisitionName=reqlist.name;
					$scope.RequisitionPosition=reqlist.positonname;
					$scope.RequisitionBrand=reqlist.brandName;
					$scope.RequisitionCode=reqlist.code;
					$scope.RequisitionShip=reqlist.shipName;
					$scope.RequisitionPort=reqlist.port;
					$scope.RequisitionJoiningDate=reqlist.joining_date;
					$scope.RequisitionNoOfCandidates=reqlist.no_of_candidates;
					$scope.RequisitionCategoryName=reqlist.categoryName;
					$('#req_log_modal').modal('show');
					$("#reason-body").show();
					$(".loader").fadeOut("slow");
				},function(response){				
					$(".loader").fadeOut("slow");
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 
			});
		};
	$scope.cancel=function(){
		$state.reload();
	 };
	 
	 $scope.triggerFilter=function(){
		 if($scope.dateClearFilterBtn == false)
		 $scope.displayClearFilter = true;	
		 };
		
}]);