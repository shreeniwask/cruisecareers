var controllers = angular.module('LoginModule');

controllers.controller('ReadinessReport_Ctrl',['$scope','$rootScope','$filter','$location','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Report_Service', function ($scope, $rootScope,$filter,$location,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Report_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.roleId = $rootScope.userdetails.roleId;
  //----------------View/fetch Employee Readiness Report list ------------------------- 
    
    $scope.fetchEmpReadinessReport = function(offset,limit,colName,order,search,fromDate,toDate){
    	
		 $(".loader").show();
		 //console.log(fromDate);
		// console.log(toDate);
		 
		 $scope.search=search;
		/*	$scope.fromDate=fromDate;
			$scope.toDate=toDate;*/
			if(fromDate == "" || fromDate == null)
			  {
				fromDate= undefined;
			  
			  }
			if(toDate == "" ||	toDate == null)
			{
				toDate= undefined;
			}
		  if(search=="" || search==null)
			  {
			  search= undefined;
			  }
		  if(colName == null || colName == ""){
				 colName = undefined;
			 }
			 if(order == null){
				 order = undefined;
			 }
			
			 $scope.fromDate = $filter('date')(fromDate, "yyyy-MM-dd");
			 $scope.toDate = $filter('date')(toDate, "yyyy-MM-dd");
			 
			 
			 Report_Service.fetchEmpReadinessReport(offset,limit,colName,order,search,fromDate,toDate).then(function(response){
			 $scope.selectedEmplList=response.data;			 
			 console.log($scope.selectedEmplList);

			 
			
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	 $scope.fetchEmpReadinessReport(0,10,null,null,null,null,null);
    
	 
	//-----------sort employee readiness report--------------------
	 
	 $scope.SortingReadinessReportList = function(colName,searchterm,fromDate,toDate){
		 
		  $scope.offset =0 ;
			$scope.start = 0;
		  $scope.colName=colName;
		  $scope.fromDate=fromDate;
			$scope.toDate=toDate;
			if($scope.order == undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order != undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search=="" || $scope.search == null)
			  {
			  $scope.search= undefined;
			  
			  }
			if($scope.colName == null)
			  {
			  $scope.colName = undefined; 
			  }
			if($scope.fromDate == "" || $scope.fromDate == null)
			  {
			  $scope.fromDate= undefined;
			  
			  }
			if($scope.toDate == "" || $scope.toDate == null)
			{
				$scope.toDate= undefined;
			}
			/*if($scope.fromDate == "" || $scope.fromDate == null)
			  {
			  $scope.fromDate = undefined;
			  
			  }
			if($scope.toDate != undefined && $scope.toDate == "asc")
			{
				var d = new Date();
				var dd = d.getDate();
				var mm = d.getMonth()+1; //January is 0!
				var yyyy = d.getFullYear();

				if(dd<10) {
				    dd = '0'+dd;
				} 

				if(mm<10) {
				    mm = '0'+mm;
				} 

				d = mm + '/' + dd + '/' + yyyy;
				$scope.toDate = d;
			}*/
			$scope.fetchEmpReadinessReport(0,10,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);	
		};
	 
		//---------------pagination--------------------------------
		$scope.offset=0;
		$scope.limit=10;
		$scope.navButtons = [];
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}		
				 $scope.fetchEmpReadinessReport($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);
			};
			
	  $scope.getReportListCount=function(search,fromDate,toDate){	  
		  $(".loader").show();
		  
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=search;
			$scope.fromDate=fromDate;
			$scope.toDate=toDate;
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
			 if($scope.fromDate == "" || $scope.fromDate == null)
			  {
			  $scope.fromDate= undefined;
			  
			  }
			if($scope.toDate == "" || $scope.toDate == null)
			{
				$scope.toDate= undefined;
			}
			 /*if($scope.fromDate=="" || $scope.fromDate==null)
			  {
			  $scope.fromDate= undefined;
			  
			  }
			 
			if($scope.toDate!=undefined && $scope.toDate=="asc")
			{
				var d = new Date();
				var dd = d.getDate();
				var mm = d.getMonth()+1; //January is 0!
				var yyyy = d.getFullYear();

				if(dd<10) {
				    dd = '0'+dd;
				} 

				if(mm<10) {
				    mm = '0'+mm;
				} 

				d = mm + '/' + dd + '/' + yyyy;
				$scope.toDate = d;
			}*/
			 Report_Service.getReportListCount($scope.search,$scope.fromDate,$scope.toDate).then(function(response){
				$scope.count = response.data;				
				console.log($scope.count);
				
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getReportListCount(null,null,null);
	    
		
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
	        $scope.fetchEmpReadinessReport($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);
	    };
	    //--------------pagination end---------------
	 
	    /*$scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchEmpReadinessReport($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);
			};*/
		
		$scope.selectFilterDate= function()
		{
			//console.log(($('#todate').val()).length);
			var fromDate=null;
			var toDate=null;
			 
			if(($('#fromdate').val()).length > 0)
			{				
				fromDate=$scope.formatDate1($('#fromdate').val());
				$scope.fromdateExcel = fromDate;
				if(($('#todate').val()).length == 0)
					$scope.toDate= null;
				else
					toDate=$scope.formatDate1($('#todate').val());
				$scope.toDateExcel = toDate;
				
				$scope.search=$('#id_of_textbox').val();
					
				
				$scope.getReportListCount($scope.search,fromDate,toDate);
				$scope.fetchEmpReadinessReport(0,10,$scope.colName,$scope.order,$scope.search,fromDate,toDate);
				
			}
			else
				{
					GlobalModule_notificationService.notification("error","Please select Dates");
					return;
				}
		};
		
		
		$scope.formatDate1 = function(date){		     
	         var dateOut = moment(date,'DD/MM/YYYY').format("YYYY-MM-DD");
	         return dateOut;
	   };
			
	 $scope.formatDate = function(date){
		 if(date != null || date == ' ' || date != undefined)
         {
			 //var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
			 var dateOut = moment(date).format("DD-MM-YYYY");
	         return dateOut;
         }
		 return;
   };
   
   $scope.redirectToEIForm= function(userid,eifstatus,userstatusid) {
		GlobalModule_dataStoreService.storeData('LoginModule','userId', userid);
		GlobalModule_dataStoreService.storeData('LoginModule','eifstatus', eifstatus);
		GlobalModule_dataStoreService.storeData('LoginModule','userstatusid', userstatusid);
		
		$state.go('restricted.admin.EIForm');	
		};	
	 
   
   $scope.generatePDF=function()
   {
	   //$scope.fetchEmpReadinessReport(0,1000,$scope.colName,$scope.order,$scope.search,$scope.fromDate,$scope.toDate);
	   Report_Service.fetchEmpReadinessReport();
		  	/*var options = {
				//'width': 800,
		  	};
		  	var pdf = new jsPDF('p', 'pt', 'a4');
		  	
		  	pdf.addHTML($("#content2"), -1, 220, options, function() {
		    	pdf.save('Report.pdf');
		  	});
		*/
	   
	   
	   var table = tableToJson($('#content2').get(0))
       var doc = new jsPDF('p','pt', 'a4', true);
       doc.cellInitialize();
       $.each(table, function (i, row){
           //console.debug(row);
           $.each(row, function (j, cell){
               doc.cell(20, 30,150, 20, cell, i);  // 2nd parameter=top margin,1st=left margin 3rd=row cell width 4th=Row height
           })
       })
       doc.save('sample-file.pdf');
  
   };
	 
   function tableToJson(table) {
	    var data = [];

	    // first row needs to be headers
	    var headers = [];
	    for (var i=0; i<table.rows[0].cells.length; i++) {
	        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
	    }


	    // go through cells
	    for (var i=0; i<table.rows.length; i++) {

	        var tableRow = table.rows[i];
	        var rowData = {};

	        for (var j=0; j<tableRow.cells.length; j++) {

	            rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

	        }

	        data.push(rowData);
	    }       

	    return data;
	}
   
   $scope.validateDate = function(fromD,toD){  //---------validate issue date and expiry date
		 
       if ( new Date(stringToDate(fromD,"dd-mm-yyyy","-")) > new Date(stringToDate(toD,"dd-mm-yyyy","-")) ) { 
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


	//----------------------Employee Status-------------


	$scope.employeedata = function(e)
	{	
		/*$scope.employeeStatusDetails = {
				
				employeeStatusId:0,
				employeeNo:"",
				dateOfEmployment:""
		};*/
		
		$scope.statusDetails={
				
				employeeStatusId:0,
				employeeNo:"",
				dateOfEmployment:""
		};
				
		$scope.empId=e.empId;
		$scope.requisitionId=e.requisitionId;
		$scope.readinessDate=e.readinessDate;
		$scope.fetchEmployeeStatusDetails($scope.empId,$scope.requisitionId);
	};
	
	$scope.saveEmployeeStatusDetails = function(status)
	{
		
		$(".loader").show();
		//status.dateOfEmployment=$scope.formatDate(status.dateOfEmployment);
		var letterNumber = /^[0-9]+$/;
		if(status.employeeStatusId == null || status.employeeStatusId == undefined || status.employeeStatusId == 0)
		{
			GlobalModule_notificationService.notification("error","Please select status");
			$(".loader").fadeOut("slow");
			return;
		}
		if(status.description == null && status.employeeStatusId == 2)
		{
			
			  GlobalModule_notificationService.notification("error","Please give description");
			  $(".loader").fadeOut("slow");
			  return;
			  
		}
		if(status.employeeStatusId==1 && (status.employeeNo == null || status.employeeNo == undefined ||status.employeeNo == "" || status.dateOfEmployment == null || status.dateOfEmployment == undefined ||status.dateOfEmployment == ""))
		{
			
			  GlobalModule_notificationService.notification("error","Please fill all fileds");
			  $(".loader").fadeOut("slow");
			  return;
			/*if($("#employeedate").val() < $scope.readinessDate)
			{
				GlobalModule_notificationService.notification("error","Date should be greater than readiness date");
				$(".loader").fadeOut("slow");
			}*/
		}
		else if(status.employeeStatusId==1 && !status.employeeNo.match(letterNumber))
		{
			GlobalModule_notificationService.notification("error","Please enter integer numbers only");
			$(".loader").fadeOut("slow");
			return;
		}
		else{
			
			$(".loader").show();
									 
			  status.userid=$rootScope.userdetails.id;
			  for(var i=0;i<$scope.employeeNumbers.length;i++)
			  {  
				  if(status.employeeNo == $scope.employeeNumbers[i].employeeNo)
				  {
					  GlobalModule_notificationService.notification("error","Employee Number already exist");
					  $(".loader").fadeOut("slow");
					  return;
				  }					  
			  }	
			  for(var i=0;i<$scope.indosNumbers.length;i++)
			  {   
				  if(status.indosNo == $scope.indosNumbers[i].indosNo && $scope.indosNumbers[i].indosNo != undefined && $scope.indosNumbers[i].indosNo != "" && $scope.indosNumbers[i].indosNo != null)
				  {
					  GlobalModule_notificationService.notification("error","INDoS Number already exist");
					  $(".loader").fadeOut("slow");
					  return;
				  }					  
			  }	
			  
			  status.dateOfEmployment=$("#employeedate").val();				  			
			  //console.log(status.dateOfEmployment);
			  status.empId=$scope.empId;
			  status.requisitionId=$scope.requisitionId;
				 //console.log(status);
				 Report_Service.saveEmployeeStatusDetails(status).then(function(response){
					  $scope.saveemployeestatusdetails = response.data;
					  //console.log($scope.saveemployeestatusdetails);					  					  					  
					 //$state.go('restricted.admin.positionmaster');
					
					 if($scope.saveemployeestatusdetails.indexOf("success")!=-1){
						 if(status.employeeStatusId==1){
							 GlobalModule_notificationService.notification("success","Your Employee Details saved successfully");
							}
							else{
							GlobalModule_notificationService.notification("success","Your Abandoned Details saved successfully");
							}
						  $scope.getReportListCount(null,null,null);
						  $scope.fetchEmpReadinessReport(0,10,null,null,null,null,null);
						  $scope.employeeStatusDetails=[];
						  $("#astatus-change").modal('hide');
						  $("#status-change").modal('hide');						 						  
					 }
					 else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  $("#status-change").modal('hide');
							  $("#astatus-change").modal('hide');
					      }
					 $("#status-change").modal('hide');
					  $("#astatus-change").modal('hide'); 
					 $(".loader").fadeOut("slow");
				  },function(response){
					  $(".loader").fadeOut("slow");
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
					 
				  });		    			    	  		
		}
	};

 
	$scope.fetchEmployeeStatusDetails=function(emplId,reqId){
		
			Report_Service.fetchEmployeeStatusDetails(emplId,reqId).then(function(response){
				  $scope.employeeStatusDetails = response.data;
				  //console.log($scope.employeeStatusDetails);
				  $scope.fetchEmployeeNumber(emplId);
				  $scope.fetchOtherIndosNumber(emplId);
				if($scope.employeeStatusDetails.length <= 0)
				  {				
					
						$scope.statusDetails.employeeStatusId=0;
						$scope.statusDetails.employeeNo="";
						$scope.statusDetails.dateOfEmployment=null;
						$('#status-change').modal('show');

					
				  }
				  else
				{
				  $('#status-change').modal('show');
				  if($scope.employeeStatusDetails[0].employeeStatusId ==3)
					  $scope.statusDetails.employeeStatusId=0;
				  else if($scope.employeeStatusDetails[0].employeeStatusId == 1)
				  {
					  $scope.statusDetails.employeeStatusId=$scope.employeeStatusDetails[0].employeeStatusId;
					  
				  }
				  else if($scope.employeeStatusDetails[0].employeeStatusId == 2)
				  {
					  $scope.statusDetails.employeeStatusId=$scope.employeeStatusDetails[0].employeeStatusId;
					 
				  }
				  $scope.statusDetails.employeeNo=$scope.employeeStatusDetails[0].employeeNo; 
				  $scope.statusDetails.indosNo=$scope.employeeStatusDetails[0].indosNo; 
				  $scope.statusDetails.dateOfEmployment=$scope.formatDate($scope.employeeStatusDetails[0].dateOfEmployment);
				  $scope.statusDetails.description=$scope.employeeStatusDetails[0].description;				  
				}

				  				 
			  },function(response){
				 				 
			  });
			return;	
	};
	
	$scope.fetchEmployeeNumber = function(emplId){
		
		Report_Service.fetchEmployeeNumber(emplId).then(function(response){			
			$scope.employeeNumbers=response.data;
			//console.log($scope.employeeNumbers);
		},function(response){
			 
		  });
		return;
	};
	
	$scope.fetchOtherIndosNumber = function(emplId){
		
		Report_Service.fetchOtherIndosNumber(emplId).then(function(response){			
			$scope.indosNumbers=response.data;
			//console.log($scope.indosNumbers);
		},function(response){
			 
		  });
		return;
	};
	
	$scope.satusList= [{number:0, statusname:"Candidate"},
	                   {number:1, statusname:"Employee"},
	                   {number:2, statusname:"Abandoned"},
	                   {number:3, statusname:"Candidate"}
	                   ];
	
	$scope.satusLists= [{number:1, statusname:"Employee"},
	                   {number:2, statusname:"Abandoned"}
	                   ];
	
	$scope.showRemainigModal=function(number)
	{		
		if(number == 1)
		{
			$("#employee-detail").show();
			$("#starusid").show();
			$("#dateofemp").show();
		}
		else if(number == 2)
		{
			$("#employee-detail").hide();
			$("#starusid").hide();
			$("#dateofemp").hide();
			$("#abdnt-descr").show();
			
		}
		else
			return;
	};
	
	$scope.validateDate = function(element){ 
		//---------validate issue date and expiry date		
		
		fromDate=$("#fromdate").val();
		toDate=$("#todate").val();
        if ( new Date(stringToDate(fromDate,"dd-mm-yyyy","-")) > new Date(stringToDate(toDate,"dd-mm-yyyy","-")) ) { 
           				          
          // $scope.compliance.expiryDate='';
		   GlobalModule_notificationService.notification("error","You cannot enter a date from past!");							   
        	$('#'+element).val(null);
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
        		$scope.search = "";
        	}        	
        	if($scope.fromdateExcel == undefined){
        		$scope.fromdateExcel = "";
        	}
        	if($scope.toDateExcel == undefined){
        		$scope.toDateExcel = "";
        	}
        	 
    		  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+5+'&search='+$scope.search+'&fromdate='+$scope.fromdateExcel+'&todate'+$scope.toDateExcel+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
  	  };
  	  
  	$scope.generateEIFExcel = function(){
  		  if($scope.getCheckedId == undefined || $scope.getCheckedId.length == 0){
  			GlobalModule_notificationService.notification("error","Select atleast one record");	
  		  }else{
  			window.open('download?userId='+$scope.getCheckedId+'&screenId='+25+'&AccessToken='+getCookie('ACCESS_TOKEN'));
  		  }
  	};
  	
  	$scope.getCheckedId=[];
  	
  	$scope.checkedList=function(id){
		  
		  if($scope.getCheckedId.indexOf(id) !== -1)
		  {		
		  var array  = $scope.getCheckedId;
		  var index = array.indexOf(id);
		  $scope.getCheckedId.splice(index,1);
		  }else
			  {		    	
	      $scope.getCheckedId.push(id);
			  }
	  };
}]);