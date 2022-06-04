'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Expenses_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Employee_Expenses','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Employee_Expenses,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	
	$scope.approverTabFlag=GlobalModule_dataStoreService.loadData('LoginModule','approverTabFlag');
	 $scope.empData;
	 $scope.empPaidDate;
	 $scope.fromDate=null;
	 $scope.toDate=null;
	
	    //alert($scope.approverTabFlag);
	    if($scope.approverTabFlag == undefined){
	    	$scope.approverTabFlag=1;
	    }
	    	
	    if($scope.approverTabFlag == 1)
		 {
			 document.getElementById('my-claims').setAttribute("class", "active");
			 document.getElementById('all-claims').setAttribute("class", "");
			 /*$("#all-claims-lits").hide();
			 $("#my-claims-lits").show();*/
		 }
		 else if($scope.approverTabFlag == 2)
		 {
			 document.getElementById('all-claims').setAttribute("class", "active");
			 document.getElementById('my-claims').setAttribute("class", "");
			 /*$("#my-claims-lits").hide();
			 $("#all-claims-lits").show();*/
		 }
		 
	    $scope.fetchExpensesList = function(offset,limit,colName,order,search,userid,rolid){
	    	
			 $(".loader").show();
			// console.log(fromdate);
			 /*alert($scope.approverTabFlag);*/
			 
			 $scope.search=search;
			// $scope.fromDate=fromDate;	
			// $scope.toDate=toDate;
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
				 
				 GlobalModule_dataStoreService.storeData('LoginModule','approverTabFlag',$scope.approverTabFlag);
				 
				// $scope.fromdate=($("#fromDate").val());
				 //$scope.todate=($("#toDate").val());
				 Employee_Expenses.fetchExpensesList(offset,limit,colName,order,search,$rootScope.userdetails.id,$rootScope.userdetails.roleId,$scope.approverTabFlag).then(function(response){
					 
				 $scope.expensesList=response.data;
				
				console.log($scope.expensesList);
				 
				 if($scope.approverTabFlag == 1)
				 {
					 document.getElementById('my-claims').setAttribute("class", "active");
					 document.getElementById('all-claims').setAttribute("class", "");
					 document.getElementById('claim-reports').setAttribute("class", "");
					 /*$("#all-claims-lits").hide();
					 $("#my-claims-lits").show();*/
				 }
				 else if($scope.approverTabFlag == 2)
				 {
					 document.getElementById('all-claims').setAttribute("class", "active");
					 document.getElementById('my-claims').setAttribute("class", "");
					 document.getElementById('claim-reports').setAttribute("class", "");
					 /*$("#my-claims-lits").hide();
					 $("#all-claims-lits").show();*/
				 }
				 else if($scope.approverTabFlag == 3){
					document.getElementById('all-claims').setAttribute("class", "");
					 document.getElementById('my-claims').setAttribute("class", "");
					 document.getElementById('claim-reports').setAttribute("class", "active");
				 }
				 			 				 
				//console.log($scope.expensesList);
				
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 }); 
		 };
		 $scope.fetchExpensesList(0,10,null,null,null,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
		 
		 $scope.SortingExpenseList = function(colName,searchterm){
			 
			  $scope.offset =0 ;
				$scope.start = 0;
			  $scope.colName=colName;
			 /* $scope.fromDate=fromDate;
				$scope.toDate=toDate;*/
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
				/*if(categoryId == 0 || categoryId == undefined)
				  {
					categoryId= 0;
				  
				  }
				if(statusId == 0 || statusId == undefined)
				{
					statusId= 0;
				}	*/			
				$scope.fetchExpensesList(0,10,$scope.colName,$scope.order,$scope.search,$rootScope.userdetails.id,$rootScope.userdetails.roleId);	
			};
		 
			$scope.offset=0;
			$scope.limit=10;
			$scope.navButtons = [];
		 $scope.setButton = function(){
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}		
					 $scope.fetchExpensesList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
				};
				
				
				$scope.getExpenseListCount=function(search){	  
					$scope.offset =0 ;
					$scope.navButtons = [];
					$scope.count= 0 ;
					$scope.start = 0;
					$scope.search=search;
					
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
					Employee_Expenses.getExpenseListCount($scope.search,$rootScope.userdetails.roleId,$scope.approverTabFlag).then(function(response){
						$scope.count = response.data;				
						//console.log($scope.count);
						
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						
						$(".loader").fadeOut("slow");
						
					});		
				};
				$scope.getExpenseListCount(null,null,null);
			
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
			        $scope.fetchExpensesList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
			    };
				
				
				$scope.expensedata=function(e)
				{
					
					$scope.statusDetails={	
														
							expStatusId:e.expStatusId,
							comment:e.comment,
							approvedAmount:e.approvedAmount,
							requestedAmount:e.requestedAmount
					};
					$scope.id=e.id;
					$('#status-change').modal('show');
					
				};
								
				$scope.saveExpenseStatusDetails=function(s)
				{
					$(".loader").show();
					
					s.id=$scope.id;
					
					
					Employee_Expenses.saveExpenseStatusDetails(s).then(function(response){
						
						  $scope.saveexpensestatusdetails = response.data;
						
						 // console.log($scope.saveexpensestatusdetails);
						 
						 if($scope.saveexpensestatusdetails.indexOf("success")!=-1){
							 
							  GlobalModule_notificationService.notification("success","Your Expense Details saved successfully");
							  $scope.getExpenseListCount(null,null,null);
							  $scope.fetchExpensesList(0,10,null,null,null,0,0,0,0);
							  $scope.statusDetails=[];
							  
							  $("#status-change").modal('hide');						 						  
						 }
						 else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								  $("#status-change").modal('hide');								  
						      }
						 $("#status-change").modal('hide');
						  
						 $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						 
					  });	
				};
				
				
				$scope.showRemainigModal=function(modal){
					
					$(".loader").show();
					
					if(modal == 1)
					{
						$("#rejct-modal").hide();
						$("#apprv-modal").show();
						
					}
					else if(modal == 3)
					{
						$("#apprv-modal").hide();
						$("#rejct-modal").show();
					}
					
					$(".loader").fadeOut("slow");
				};
				
				
				$scope.fetchExpensesStatus=function(){
					
					$(".loader").show();
					
					Employee_Expenses.fetchExpensesStatus().then(function(response){
						
						  $scope.expensesStatus = response.data;
						  					
					  },function(response){
						  
						  $(".loader").fadeOut("slow");
						
					  });
					$(".loader").fadeOut("slow");
				};				
				$scope.fetchExpensesStatus();
				
				$scope.openClaimDetail=function(expenseObject){
					
					GlobalModule_dataStoreService.storeData('LoginModule','expenseObject', expenseObject);
					
					$state.go("adminexpensedetails");
					
				};
				
				$scope.getSettings = function(){
					 
					$(".loader").show();
					var screenNo=9;
					/*if($scope.approverTabFlag == 1)
					 {
						screenNo=9;
					 }
					 else if($scope.approverTabFlag == 2)
					 {
						 screenNo=11;
					 }*/
					
						Admin_Service.getSettings($rootScope.userdetails.id,screenNo).then(function(response){
							  $scope.columnlist = response.data;
							  console.log($scope.columnlist);
							var count=0;
									for(var i=0;i<$scope.columnlist.length;i++){
										if($scope.columnlist[i].name=='Claim No.' && $scope.columnlist[i].isActive==false){
											for(var j=0;j<$scope.columnlist.length;j++){
												if($scope.columnlist[j].name=='Claim No.' || $scope.columnlist[j].name=='Date of claim' || $scope.columnlist[j].name=='Type of reimbursement' || $scope.columnlist[j].name=='Claimed Amount' || $scope.columnlist[j].name=='Approved amount' || $scope.columnlist[j].name=='Status' || $scope.columnlist[j].name=='Role' || $scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='Approved Date' || $scope.columnlist[j].name=='Payments'){
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
						
						$(".loader").fadeOut("slow");
					};
					$scope.getSettings();
					
					$scope.savesettings = function(){
						$(".loader").show();
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
							  //console.log($scope.savesetFlag);
						});
						$(".loader").fadeOut("slow");
					};
					
							$scope.activeColumn = function(columnName)
							{
								//alert(columnName);
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
						$(".loader").show();
						if(check==true)
							{
							for(var i=0;i<$scope.columnlist.length;i++){
								 $scope.columnlist[i].isActive=true;
									
							}
							}else{
								for(var i=0;i<$scope.columnlist.length;i++){
									if($scope.columnlist[i].name=='Claim No.' || $scope.columnlist[i].name=='Date of claim' || $scope.columnlist[i].name=='Type of reimbursement' || $scope.columnlist[i].name=='Claimed Amount' || $scope.columnlist[i].name=='Approved amount' || $scope.columnlist[i].name=='Status' || $scope.columnlist[i].name=='Role' || $scope.columnlist[i].name=='Name' || $scope.columnlist[i].name=='Payments'){
										$scope.columnlist[i].isActive=true;
										}else{
											$scope.columnlist[i].isActive=false;
										}
									}
									
								}
						$(".loader").fadeOut("slow");
					};
				
				
					
				
					 $scope.dateformate = function(date){	
						  
						  if(date == undefined || date == '')
						  {
							  return null;
						  }
						  
					      var dateOut = moment(date).format("DD-MM-YYYY");
					      return dateOut;
					   };
		   //$scope.exmmiDate;
					
					  $scope.setPaymentDetails= function(e)
					  {  		  
						  $scope.expense=e;
						  //$scope.currencyTypeTtlApprvdAmnt=e.currencyTypeTtlApprvdAmnt;
						  $scope.paymentDetails={paidAmount:'',paidDate:'',currencyTypeTtlApprvdAmnt:''};
						  						
						  $scope.paymentDetails.currencyTypeTtlApprvdAmnt=e.currencyTypeTtlApprvdAmnt;
						 if(e.paidDate != undefined && e.paidAmount != undefined)
						 {
							 $scope.paymentDetails.paidAmount=e.paidAmount;
							 $scope.paymentDetails.paidDate=$scope.formatDate(e.paidDate);
							 $('#paidDate').val($scope.paymentDetails.paidDate);
							 
						 }
						 //console.log($scope.paymentDetails);
						 /*else
						 {
							 
						 }*/
						  
						  $('#payment-det').modal('show');
					  };
					  /*
					  $scope.checkPayementamount= function(amount)
					  {  		  
						  
						  
						//  if($scope.currencyTypeTtlApprvdAmnt>amount){
							  GlobalModule_notificationService.notification("error","ApprvdAmnt amount is "+ $scope.currencyTypeTtlApprvdAmnt);
						//  }
					
					  };
					  
					  
					  
			   
					  $scope.chkpaidAmount=function(expenses){
						  console.log(expenses);
						  var paidAmount=expenses.paidAmount.replace(',','');
						  if(expenses.paidAmount==null ||expenses.paidAmount == undefined || expenses.paidAmount==0){
							  
							  $("#chk").html("Enter valid amount "); 
							  //$('#payment-det').modal('show');
						  }
						  $scope.flagpaidAmount=false;
						
					   if(expenses.totalApprovedAmnt>parseInt(paidAmount))
					   {
						   $scope.ispaidAmountless=true;
						   
						 // $("#chk").html("entered amount is less than approved amount ");
						  //$("#less")
						   $('#modal-2').modal('show');
					   }
					  
					   else if(expenses.totalApprovedAmnt<parseInt(paidAmount))
						  {
						  $scope.flagpaidAmount=false;
						 // $("#chk").html("entered amount is greater than approved amount ");
						  $('#modal-2').modal('show');
						  }
					  else 
					  {
						  $("#chk").html("entered amount is equal to approved amount ");
						  
					  }
					 else{
						 $scope.flagpaidAmount=0;
					  }
						 
						 // $scope.saveExpensesPaymentDetails(expenses);
					  };
			   $scope.saveExpensesPaymentDetails=function(expenses)
			   {
				  

				  
					Employee_Expenses.saveExpensesPaymentDetails(expenses).then(function(response){
						
						  $scope.paymentData = response.data;
						  console.log($scope.paymentData);
						  $scope.fetchExpensesList(0,10,null,null,null,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
						 // $scope.chkpaidAmount(expenses);
						 $('#payment-det').modal('hide');
							 
					  },function(response){
						  
						
						
					  });
			   }*/
					  
			   var checkDates=function(clmdate,paymentDate)
			   {
				   if(clmdate.getTime() == paymentDate.getTime())
				   {
					   return false;
				   }
				   
				   return (clmdate.getTime() > paymentDate.getTime());					
			   };
					  
			   $scope.checkExpensePaymentDetails=function(expenses)
			   {
				   $(".loader").show();
				   
				   //console.log(expenses);
				   if(expenses.paidAmount == undefined || expenses.paidAmount == '')
			       {
					   GlobalModule_notificationService.notification("error","Please enter paid amount");
					   $(".loader").fadeOut("slow");
					   return; 
			       }
				   if(($("#paidDate").val()) == undefined || ($("#paidDate").val()) == '')
				   {
						GlobalModule_notificationService.notification("error","Please enter payment date");
						$(".loader").fadeOut("slow");
						return;
				   }
				   
				   $scope.payDate = $("#paidDate").val();
				   var claimApprovedDate=$scope.formatDate($scope.expense.claimCompletionDate); //$scope.formatDate($scope.payDate);
				   var dateParts1 = $scope.payDate.split('-');
				   var dateParts2 = claimApprovedDate.split('-');
				   var clmdate=new Date(dateParts2[2],dateParts2[1],dateParts2[0]);
				   var paymentDate=new Date(dateParts1[2],dateParts1[1],dateParts1[0]);
				   var diff=checkDates(clmdate,paymentDate);
			       if(diff == true)
				   {
					   	GlobalModule_notificationService.notification("error","Your Payment date seems to be outside your eligible date range.");
					   	$(".loader").fadeOut("slow");
					   	return;
				   }
			       
			       $scope.paymentAmount=expenses.paidAmount;
			       var payidAmount=$scope.paymentAmount.replace(',','');
			       if(parseInt(payidAmount) < $scope.expense.totalApprovedAmnt)
			       {
			    	   $(".loader").fadeOut("slow");
			    	   $('#modal-2').modal('show');
			    	   return;
			    	   /*GlobalModule_notificationService.notification("error","Your Paid amount is different.");
					   	return;*/
			       }
			       else if(parseInt(payidAmount) > $scope.expense.totalApprovedAmnt)
			       {
			    	   $(".loader").fadeOut("slow");
			    	   $('#modal-2').modal('show');
			    	   return;
			    	  /* GlobalModule_notificationService.notification("error","Your Paid amount is different.");
					   	return;*/
			       }
			       
			       $scope.saveExpensesPaymentDetails();
			       
			       $(".loader").fadeOut("slow");
				  
			   };
			   
			   $scope.saveExpensesPaymentDetails=function()
			   {
				   $(".loader").show();
				   
				   $scope.expense.paidAmount=$scope.paymentAmount;
				   $scope.expense.paidDate=$scope.payDate;
				   
				   Employee_Expenses.saveExpensesPaymentDetails($scope.expense).then(function(response){
						
					  $scope.paymentData = response.data;
					  
					  if($scope.paymentData=="success")
						{
					      GlobalModule_notificationService.notification("success","Payment details updated successfully");										 
					      $('#payment-det').modal('hide');
					      $('#modal-2').modal('hide');
					      
					      $scope.fetchExpensesList(0,10,null,null,null,$rootScope.userdetails.id,$rootScope.userdetails.roleId);
					      $scope.paymentAmount='';
					      $scope.payDate="";
					      //$scope.paidDate='';					       
						}			    	
				  });
				  
				  $(".loader").fadeOut("slow");
				  
			 };
			  
			   
			   $scope.formatCurrency=function(index){
					
					var el=document.getElementById('chkPaidamount'+index);
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
					counter++;
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
						result += ',';
					}
				};
				if(elType == 'input'){
					$(el).val(result);
				} else {
					$(el).empty().text(result);
				}
			}
			
			
			$scope.formatAllCurrency=function(){
				
				var el=document.getElementById('all-currency');
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

		 var formatAllCurrency=function(nStr){
		    nStr += '';
		    var x = nStr.split('.');
		    var x1 = x[0];
		    var x2 = x.length > 1 ? '.' + x[1] : '';
		    var rgx = /(\d+)(\d{3})/;
		    while (rgx.test(x1)) {
		        x1 = x1.replace(rgx, '$1' + ',' + '$2');
		    }
		    return x1 + x2;
		};
		
		$scope.fetchClaimReportMonthly=function(claimedId,fromDate,toDate){
			 Employee_Expenses.fetchClaimReportMonthly(0,fromDate,toDate).then(function(response){
				 
				 $scope.claimList=response.data;
				// console.log($scope.claimList);
			 },function(response){
						
				$(".loader").fadeOut("slow");
						
					});	
		};
		$scope.fetchClaimReportMonthly(null,null,null);
		
		
		$scope.fetchClaimReport=function(fromDate,toDate){
			$(".loader").show();
			
			Employee_Expenses.fetchClaimReport(fromDate,toDate).then(function(response){
				$scope.ReportList = response.data;	
				//console.log($scope.summaryReportList);			
			});
			
			$(".loader").fadeOut("slow");
		};
	//	$scope.fetchClaimReport($scope.expenseObject.claimedNumber);	
		
		
		//generate excel for claim report
		
		$scope.generateExcel = function(claimedId){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }	
			  var fromDate=null;
				var toDate=null;
				if(($('#fromDate').val()).length > 0)
				{				
					$scope.fromDate=$scope.formatDate1($('#fromDate').val());
					$scope.fromdateExcel = fromDate;
					if(($('#toDate').val()).length == 0)
						$scope.toDate= null;
					else
						$scope.toDate=$scope.formatDate1($('#toDate').val());
					$scope.toDateExcel = toDate;
					
					$scope.search=$('#id_of_textbox').val();
					
					if($scope.fromDate > $scope.toDate || $scope.toDate == undefined)
					{
					GlobalModule_notificationService.notification("error","Please select valid to date");
					return;
					}
				}
				
				else {
				GlobalModule_notificationService.notification("error","Please select Dates");
				return;
				}
				$scope.toDate = extendToOneDay($scope.toDate);
				//console.log($scope.toDate);
			
				Employee_Expenses.getClaimReportMonthlyCount($scope.fromDate,$scope.toDate).then(function(response){
					 
					 $scope.count=response.data;
					 //console.log($scope.count);
					 
					 if($scope.count !=0)	
						{	
						  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+8+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&claimedId=0&approverTabFlag='+$scope.approverTabFlag+'&fromDate='+$scope.fromDate+'&toDate='+$scope.toDate+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
						}else{
							GlobalModule_notificationService.notification("error","No completed claims found,please complete claim to generate excel");
                            return;
						}
				 },function(response){
							
					$(".loader").fadeOut("slow");
							
						});
				
			
			};
			
	//generate Excel for oracle
			
			$scope.generateExcelForOracle = function(){		 
				  if($scope.search == undefined){
					  $scope.search ="";
				  }	
				  var fromDate=null;
					var toDate=null;
					if(($('#fromDate').val()).length > 0)
					{				
						$scope.fromDate=$scope.formatDate1($('#fromDate').val());
						$scope.fromdateExcel = fromDate;
						if(($('#toDate').val()).length == 0)
							$scope.toDate= null;
						else
							$scope.toDate=$scope.formatDate1($('#toDate').val());
						$scope.toDateExcel = toDate;
						
						$scope.search=$('#id_of_textbox').val();
						
						if($scope.fromDate > $scope.toDate || $scope.toDate == undefined)
						{
						GlobalModule_notificationService.notification("error","Please select valid to date");
						return;
						}
					}
					
					else {
					GlobalModule_notificationService.notification("error","Please select Dates");
					return;
					}
					$scope.toDate = extendToOneDay($scope.toDate);
					//console.log($scope.toDate);
				
					Employee_Expenses.getOracleReportMonthlyCount($scope.fromDate,$scope.toDate).then(function(response){
						 
						 $scope.count=response.data;
					//	 console.log($scope.count);
						 
						 if($scope.count !=0)	
							{	
							  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+50+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&approverTabFlag='+$scope.approverTabFlag+'&fromDate='+$scope.fromDate+'&toDate='+$scope.toDate+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
							}else{
								GlobalModule_notificationService.notification("error","No completed claims found,please complete claim to generate excel");
	                            return;
							}
					 },function(response){
								
						$(".loader").fadeOut("slow");
								
							});
					
				
				};
			
		$scope.fetchClaimReportPaymentDetails=function(fromDate,toDate){
			Employee_Expenses.fetchClaimReportPaymentDetails(fromDate,toDate).then(function(response){
						 
			  $scope.claimList=response.data;
			  //console.log($scope.claimList);
			 },function(response){
								
				$(".loader").fadeOut("slow");
								
		   	});	
		};
				$scope.fetchClaimReportPaymentDetails(null,null);	
			
				
		//generate excel for payment details
	    
				$scope.generateExcelForPaymentDetails = function(){		 
					  if($scope.search == undefined){
						  $scope.search ="";
					  }	
					  var fromDate=null;
						var toDate=null;
						if(($('#fromDate').val()).length > 0)
						{				
							$scope.fromDate=$scope.formatDate1($('#fromDate').val());
							$scope.fromdateExcel = fromDate;
							if(($('#toDate').val()).length == 0)
								$scope.toDate= null;
							else
								$scope.toDate=$scope.formatDate1($('#toDate').val());
							$scope.toDateExcel = toDate;
							
							$scope.search=$('#id_of_textbox').val();
							
							if($scope.fromDate > $scope.toDate || $scope.toDate == undefined)
							{
							GlobalModule_notificationService.notification("error","Please select valid to date");
							return;
							}
						}
						
						else {
						GlobalModule_notificationService.notification("error","Please select Dates");
						return;
						}
						$scope.toDate = extendToOneDay($scope.toDate);
						//console.log($scope.toDate);
					
						Employee_Expenses.getClaimReportPaymentDetailsCount($scope.fromDate,$scope.toDate).then(function(response){
							 
							 $scope.count=response.data;
							 //console.log($scope.count);
							 
							 if($scope.count !=0)	
								{	
								  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+51+'&roleId='+$rootScope.userdetails.roleId+'&approverTabFlag='+$scope.approverTabFlag+'&fromDate='+$scope.fromDate+'&toDate='+$scope.toDate+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
								}else{
									GlobalModule_notificationService.notification("error","No paid claims found");
		                            return;
								}
						 },function(response){
									
							$(".loader").fadeOut("slow");
									
								});
						
					
					};
		
			
		
		
		//to extend one day	
		  var extendToOneDay = function(date){
			  var date1 = new Date(date);
			    var newdate = new Date(date1);

			    newdate.setDate(newdate.getDate() + 1);
			    
			    var dd = newdate.getDate();
			    var mm = newdate.getMonth() + 1;
			    var y = newdate.getFullYear();

			    var someFormattedDate = y + '-' + mm + '-' + dd;
			    return someFormattedDate;
		  };
		
		$scope.formatDate1 = function(date){		     
	         var dateOut = moment(date,'DD/MM/YYYY').format("YYYY-MM-DD");
	         return dateOut;
	   };
			
		$scope.formatDate = function(date){	
			
			if(date == undefined || date == '')
			  {
				  return null;
			  }
			
			var dateOut = moment(date).format("DD-MM-YYYY");
			return dateOut;
		};
		
		$scope.onloadFun = function(evt) {
			$(function(){
			$('#fromDate').datetimepicker({
				 format: 'DD-MM-YYYY'
          });
			});
	      };
	      $scope.onloadFun1 = function(evt) {
				$(function(){
				$('#toDate').datetimepicker({
					 format: 'DD-MM-YYYY',
						// maxDate:new Date()+1,			 
	          });
				});
		      };
		         
			   
		
		        
		        
		        
}]);