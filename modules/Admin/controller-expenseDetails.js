'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('expenseDetails_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Employee_Expenses','Employee_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Employee_Expenses,Employee_Service){
	
	$scope.expenseObject=GlobalModule_dataStoreService.loadData('LoginModule','expenseObject');
   console.log($scope.expenseObject);
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
	$scope.approverTabFlag=GlobalModule_dataStoreService.loadData('LoginModule','approverTabFlag');
  	
	$scope.showFlag=1;
	$scope.fetchClaimDetailsList = function(id,colName,order){
		
		$(".loader").show();
		
		Employee_Service.fetchLatestClaimedList(id,colName,order,$rootScope.userdetails).then(function(response){
			$scope.claimDetailsList = response.data;
 			$scope.actvateId=$scope.claimDetailsList[0].id;
			//$scope.openExpensetab($scope.claimDetailsList[0]);
 			$scope.fetchactivatedId($scope.expenseObject.claimedNumber,$scope.actvateId,$rootScope.userdetails)
 		});
		
		$(".loader").fadeOut("slow");
	};
	$scope.fetchClaimDetailsList($scope.expenseObject.claimedNumber,null,null);
	
	$scope.fetchUpdatedClaimDetailsList = function(id,colName,order){
		
		$(".loader").show();
		
		Employee_Service.fetchLatestClaimedList(id,colName,order,$rootScope.userdetails).then(function(response){
			$scope.claimDetailsList = response.data;
 		});
		
		$(".loader").fadeOut("slow");
	};
	
	
	$scope.SortingExpensesList = function(colName){
		 		  
		  $scope.colName=colName;
		 
			if($scope.order == undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order != undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}			
			if($scope.colName == null)
			  {
			  $scope.colName = undefined; 
			  }
						
			$scope.fetchClaimDetailsList($scope.expenseObject.claimedNumber,$scope.colName,$scope.order);	
		};
	
	$scope.fetchClaimDetailsList($scope.expenseObject.claimedNumber);
	
	$scope.openApproverModal= function(c){
		
		$(".loader").show();
		$scope.claimedObject=c;
		if(c.currencyTypeAprvdAmnt != undefined || c.currencyTypeAprvdAmnt != null)
			$scope.claimedObject.currencyTypeAprvdAmnt=c.currencyTypeAprvdAmnt;
		else 
			$scope.claimedObject.currencyTypeAprvdAmnt=c.currencyTypeAprvdAmnt;
		
		$scope.claimedObject.maxBrandAmnt=c.maxBrandAmnt;
		
		$scope.claimedObject.comment=c.comment;

		$('#claim_amount').modal('show');
		
		$(".loader").fadeOut("slow");
	};
	
	$scope.saveApproveRejectStatus = function(e,statusId){

		$(".loader").show();
		e.approvedAmount =e.currencyTypeAprvdAmnt.replace(/,/g, '');
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
				
		if(e==undefined)
		{
			GlobalModule_notificationService.notification("error","Please give valid inputs");
			$(".loader").fadeOut("slow");
			return;
		}
		if(parseInt(e.approvedAmount) > parseInt($scope.claimedObject.claimedAmount)) 
		{
			GlobalModule_notificationService.notification("error","Approved amount is greater than claim amount");
			$(".loader").fadeOut("slow");
			return;
		}
		/*if(e.approvedAmount > $scope.brandAmount)
		{
			GlobalModule_notificationService.notification("error","Approved amount is greater than maximum approval amount for this brand");
			$(".loader").fadeOut("slow");
			return;
		}*/
		if(statusId == 5 && (e.comment==undefined || e.comment==""))
		{
			GlobalModule_notificationService.notification("error","Please enter reasons for rejection");
			$(".loader").fadeOut("slow");
			return;
		}
		if(statusId == 5 && e.currencyTypeAprvdAmnt != '')
		{
			GlobalModule_notificationService.notification("error","Remove approved amount");
			$(".loader").fadeOut("slow");
			return;
		}
		if(statusId == 4 && (e.comment==undefined || e.comment=="") && (parseInt(e.approvedAmount) < parseInt($scope.claimedObject.claimedAmount)))
		{			
				GlobalModule_notificationService.notification("error","Please mention comment");
				$(".loader").fadeOut("slow");
				return;						
		}	
		if(e.approvedAmount == undefined && statusId == 4)
		{
			GlobalModule_notificationService.notification("error","Please Enter Approval amount");
			$(".loader").fadeOut("slow");
			return;
		}
		if(parseInt(e.approvedAmount) < 0)
		{
			GlobalModule_notificationService.notification("error","Please Enter Valid Amount");
			$(".loader").fadeOut("slow");
			return;
		}
		if((e.comment != undefined && e.comment != "") && !(e.comment.match(letterNumber)))
		{
			GlobalModule_notificationService.notification("error","Please Enter Valid Comment");
			$(".loader").fadeOut("slow");
			return;
		}

		e.id=$scope.claimedObject.id;
		e.expStatusId=statusId;
		e.createdby = $rootScope.userdetails.id;
		/*GlobalModule_dataStoreService.storeData('LoginModule','actvateId',$scope.claimedObject.id);
		 $scope.actvateId=GlobalModule_dataStoreService.loadData('LoginModule','actvateId');
		*/
		Employee_Expenses.saveExpenseStatusDetails(e).then(function(response){
			var approveRejectStatus = response.data;	
			
			if(approveRejectStatus == 'success')
		    {

				if(statusId == 4)
				{
					GlobalModule_notificationService.notification("success","You have approved the claim");
				}
				else if(statusId == 5)
				{
					GlobalModule_notificationService.notification("success","You have rejected the claim");
				}
				$scope.fetchUpdatedClaimDetailsList($scope.expenseObject.claimedNumber,null,null);
				 $scope.fetchactivatedId($scope.expenseObject.claimedNumber, $scope.claimedObject.id,$rootScope.userdetails);
				 
				$('#claim_amount').modal('hide');
				
		    }
			
		});
		
		// $scope.openExpensetab($scope.claimDetailsList[,0]);
		
		$(".loader").fadeOut("slow");
		
	};
	//$scope.saveApproveRejectStatus($scope.expenseObject,null);
	$scope.submitAprrovedList= function(){
		$scope.fetchClaimDetailsList($scope.expenseObject.claimedNumber,null,null);
		for(var i=0;i<$scope.claimDetailsList.length;i++)
		{
			if($scope.claimDetailsList[i].expStatusId == 3)
			{
				GlobalModule_notificationService.notification("error","Please Approve/Reject all expenses");
				return;
			}
			
		}
		
		Employee_Expenses.submitAprrovedList($scope.expenseObject,$rootScope.userdetails.roleId).then(function(response){
			
			var approvedListStatus = response.data;
			
			if(approvedListStatus == 'success')
		    {	
				 if($rootScope.userdetails.roleId < 7)
					GlobalModule_notificationService.notification("success","The claim(s) have been approved and submitted to the next level");	
				else if($rootScope.userdetails.roleId == 7)
					GlobalModule_notificationService.notification("success","The claim(s) have been fully approved");
				
				$state.go("restricted.admin.employeeexpenselist");
		    }else if(approvedListStatus == 'rejected')
		    	{
		    		GlobalModule_notificationService.notification("success","The claim(s) have been fully rejected");
				
		    			$state.go("restricted.admin.employeeexpenselist");
		    	}
		    
			
		});
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
	
	$scope.goToExpensesList = function(){
		
		$state.go("restricted.admin.employeeexpenselist");
	};
	
	$scope.fetchBrandAmount = function(c){
		$(".loader").show();
		Employee_Service.fetchBrandAmount($scope.expenseObject.brand.id,c.expenseMasterid).then(function(response){
			$scope.brandAmount=response.data;
	
		});
		
		$(".loader").fadeOut("slow");
	};
	
	
	$scope.takeTwoDigits= function(decimalDigit){
		
		return parseFloat(decimalDigit).toFixed(2);
		
	};
	
	
	$scope.formatDate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY");
        return dateOut;
	};
	
	$scope.formatCurrency=function(){
		
		var el=document.getElementById('apprvd-amnt');
		var elType = null; // input or other
		var value = null;
		// get value
		if($(el).is('input') || $(el).is('textarea')){
			value = $(el).val().replace(/,/g, '');
			elType = 'input';
		} else {
			value = $(el).text().replace(/,/g, '');
			elType = 'other';
		}
		// if value changes
		$(el).on('paste keyup', function(){
			value = $(el).val().replace(/,/g, '');
			formatElement(el, elType, value); // format element
		});
		formatElement(el, elType, value); // format element				
};

function formatElement(el, elType, value){
	var result = '';
	var valueArray = value.split('');
	var resultArray = [];
	var counter = 0;
	var temp = '';
	for (var i = valueArray.length - 1; i >= 0; i--) {
		temp += valueArray[i];
		counter++
		if(counter == 3){
			resultArray.push(temp);
			counter = 0;
			temp = '';
		}
	};
	if(counter > 0){
		resultArray.push(temp);				
	}
	for (var i = resultArray.length - 1; i >= 0; i--) {
		var resTemp = resultArray[i].split('');
		for (var j = resTemp.length - 1; j >= 0; j--) {
			result += resTemp[j];
		};
		if(i > 0){
			result += ','
		}
	};
	if(elType == 'input'){
		$(el).val(result);
	} else {
		$(el).empty().text(result);
	}
}

	$scope.dateformate = function(date){		     
	    var dateOut = moment(date).format("DD-MM-YYYY");
	    return dateOut;
	};

  $scope.openSummaryReport = function(){		 
	  
	  $state.go("restricted.admin.expensesummeryreport");
	  
  };
/*  $scope.openExpensetab=function(elist){
	 
	 // $scope.elist={};
	  $scope.actvateId=elist.id;
  	  $scope.expenselist=elist;
	  $scope.expenselistId=elist.id;
	  $scope.tabFlag=true;
	  
		if($scope.expenselistId== $scope.ReportList1.id)
			{
			$scope.expenselist=$scope.ReportList1;
			}
		
	
	  if(elist.docPath.includes(".jpg"))
		 {
		  $scope.imageFlag=true;
		  if(elist.docPath.includes("amazonaws"))
		   {
			$rootScope.getSignedURL(elist.docPath).then(function(response){
				
				$scope.expenseDocPath=response.data;
				console.log($scope.expenseDocPath);
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		   }
		 }
	  
	  else
		  $scope.imageFlag=false;
	  
	  GlobalModule_dataStoreService.storeData('LoginModule','expenselist',$scope.expenselist);
	  $scope.expenselist=GlobalModule_dataStoreService.loadData('LoginModule','expenselist');
	};
  */

/*  $scope.fetchClaimReport=function(id){
		$(".loader").show();
		
		Employee_Expenses.fetchClaimReport(id).then(function(response){
			$scope.ReportList = response.data;	
			//console.log($scope.summaryReportList);			
		});
		
		$(".loader").fadeOut("slow");
	};
	$scope.fetchClaimReport($scope.expenseObject.claimedNumber);*/
		
  
  /*$scope.generateExcelForClaim = function(){		 
	  if($scope.search == undefined){
		  $scope.search ="";
	  }			 
	 window.open('download?claimedId='+$scope.expenseObject.claimedNumber+'&userId='+$rootScope.userdetails.id+'&screenId='+50+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&approverTabFlag='+$scope.approverTabFlag+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
  };*/
$scope.fetchactivatedId=function(claimedId,id,user){
	 $scope.actvateId=id;
 	//  $scope.expenselist=elist;
	//  $scope.expenselistId=elist.id;
	 
	
	Employee_Service.fetchactivatedId($scope.expenseObject.claimedNumber,$scope.actvateId,$rootScope.userdetails).then(function(response){
		//$(".loader").show();

		$scope.expenselist = response.data;	
		console.log($scope.expenselist);	
		 if($scope.expenselist.docPath.includes(".jpg") || $scope.expenselist.docPath.includes(".pdf"))
		 {
			 $scope.imageFlag=true;
			 if($scope.expenselist.docPath.includes(".pdf"))
			 {
				 $scope.imageFlag=false;
				 $scope.pdfFlag=true;
			 }else{
				 $scope.imageFlag=true;
				 $scope.pdfFlag=false; 
			 }
				 if($scope.expenselist.docPath.includes("amazonaws"))
				 {
					 $rootScope.getSignedURL($scope.expenselist.docPath).then(function(response){
				
						 $scope.expenseDocPath=response.data;
						 $scope.pdfDocPath=$sce.trustAsResourceUrl($scope.expenseDocPath);
						 console.log($scope.expenseDocPath);
				},function(response){
					GlobalModule_dataStoreService.errorResponseHandler(response);
				});
		   }
		 }
		
	  else
		  $scope.imageFlag=false;
		 if(!($scope.expenselist.docPath.includes(".pdf"))){
			   $scope.pdfFlag=false
		 }

	});
	
	//$(".loader").fadeOut("slow");
};
//$scope.fetchactiveId($scope.expenseObject.claimedNumber,$scope.actvateId);
$scope.takeFileName=function(awsPath)
{
if(awsPath != undefined)
return awsPath.substr(97, awsPath.length);

return "";
};

}]);