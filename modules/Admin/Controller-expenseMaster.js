'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('expenseMaster_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','ExpenseMaster_service','Employee_Service','Login_Service',function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,ExpenseMaster_service,Employee_Service,Login_Service){

	
	 $scope.brandDetailslist= GlobalModule_dataStoreService.loadData('LoginModule','brandDetailslist');
	 $scope.brandDetailslist=[];  
	 $scope.subheadlist=[];	
	 $scope.expense={};
	 GlobalModule_dataStoreService.storeData('LoginModule','approverTabFlag',undefined);
	 
	 $scope.expenseFlag=GlobalModule_dataStoreService.loadData('LoginModule','expenseFlag');
	
	 $scope.fetchReimbursmentType = function(){			
	    	Employee_Service.fetchReimbursmentType().then(function(response){				  
			
	    	$scope.ReimbursmentType = response.data;						 			
	    	});
		};
		
	$scope.fetchReimbursmentType();
	 
	   $scope.getbrandsList = function(){
		
		   Login_Service.brandsList().then(function(response){
				
			  $scope.brandsList = response.data;
				
			 // console.log($scope.brandsList);
			  
			  $scope.checkedBrandsList=$scope.brandsList;
				
			  GlobalModule_dataStoreService.storeData('LoginModule','brandsList', $scope.brandsList);

      },function(response){
					
				});
		  };
		  

		  $scope.getbrandsList();
	   
	   		$scope.fetchSubHead = function(ParentId){
	   			$(".loader").show();
	  		ExpenseMaster_service.fetchSubHead(ParentId).then(function(response){
					$scope.subheadlist= response.data;
	                 //console.log($scope.subheadlist);
				
	  		});		
	  		$(".loader").fadeOut("slow");
			  };

			
			  
	      $scope.brandDetails = function(ParentId){ 
	 
	    	  $scope.getbrandsList();
	    	  if(ParentId == undefined)
	    	  {
	    		  $('#add_setting').modal('show');
	    		  return;	
	    	  }
	  		ExpenseMaster_service.brandDetails(ParentId).then(function(response){
					$scope.brandDetailslist= response.data;
					//console.log($scope.brandDetailslist);
					if($scope.brandDetailslist.length > 0)
					 {
					 for(var i=0;i<$scope.brandsList.length;i++)
						{
							for(var j=0;j<$scope.brandDetailslist.length;j++)
							{
								if($scope.brandsList[i].id==$scope.brandDetailslist[j].id)
								{
									//alert($scope.brandDetailslist[j].code);									
									//$('#checedbrandlist'+$scope.brandsList[i].id).prop('checked', true);
									$scope.brandsList[i].code=$scope.brandDetailslist[j].code;
									$scope.brandsList[i].amount=$scope.brandDetailslist[j].amount;
									$scope.brandsList[i].currencyAmnt=$scope.brandDetailslist[j].currencyAmnt;
					     	     }								
                               }							
						}
					}
			//		alert($scope.brandsList[0].code);
					$('#add_setting').modal('show');
					 //console.log($scope.brandsList);
	                });			 	 
			  };
				
	   if($scope.expenseFlag){
		   
		   
		 $scope.subheadlist=[];
		 $scope.fetchReimbursmentType();
		 $scope.expenseMaster = GlobalModule_dataStoreService.loadData('LoginModule','updateExpences');		
		 $scope.fetchSubHead($scope.expenseMaster.expense_typeId); 
		 $scope.subheadlist= $scope.expenseMaster.subHead;
	 
	   }
	       
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	
	$scope.getExpenseMasterList=function(offset,limit,colName,order,search ){
		$(".loader").show();
		if(search=="" || search==null)
		  {
		  search= undefined;
		  }
	  if(colName == null || colName== ""){
			 colName = undefined;
		 }
		 if(order == null){
			 order = undefined;
		 }
		
		ExpenseMaster_service.getExpenseMasterList(offset,limit,colName,order,search).then(function(response){
			
			$scope.expenseMasterList = response.data; 
			
			/*var value=1233234234;
			var num=value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");*/
			//console.log(num);
		});		
		  $(".loader").fadeOut("slow");
	};
	$scope.getExpenseMasterList(0,10,null,null,null);
     $scope.clear = function(){
			 
			 $scope.data={};			 
	 };
		 
	 $scope.clearSubHeadModal= function(){
		 
		 $scope.subhead=''; 
		 $('#edit_subhead').modal('show');
		 
	};
	 
	 $scope.closeSettingModal=function()
		{
			$('#create_slot-btn1').modal('hide');
		};	
	 
	 
	$scope.addExpense = function(){
		
		$scope.clear();
		 //console.log( $scope.e);
		 GlobalModule_dataStoreService.storeData('LoginModule','expenseFlag', false);
		 $state.go("restricted.admin.createExpenseMaster");
	};

	//------------HeadSetting-----------------------------//
	  
	  
	  $scope.cancelCreateExpense = function(){
	    	
	    	 $state.go("restricted.admin.expensemaster");
	    };
	    	       
		/*--------------------------------UpdateExpencess----------------------------------------------------*/
		
		
		  $scope.updateExpences = function(data){
		
			  GlobalModule_dataStoreService.storeData('LoginModule','expenseFlag', true);
			     
			  GlobalModule_dataStoreService.storeData('LoginModule','updateExpences', data);
		    						  
			  $state.go("restricted.admin.createExpenseMaster");
	 		};
   	
   		/*--------------------------------FetchSubHeadExpencessList----------------------------------------------------*/

	
		     $scope.fetchSettingData=function(subHeaId){
	              
		    	 $scope.getbrandsList();
		    	 if(subHeaId == undefined)
		    	 {
		    		 $('#add_setting').modal('show');
		    		 return;
		    	 }
		    	 ExpenseMaster_service.fetchSettingData(subHeaId).then(function(response){
					
				  $scope.getSettingData = response.data;				  				  
				  //console.log($scope.getSettingData);
				  if($scope.getSettingData.length > 0)
				 {
					  for(var i=0;i<$scope.brandsList.length;i++)
						{
							for(var j=0;j<$scope.getSettingData.length;j++)
							{
								if($scope.brandsList[i].id==$scope.getSettingData[j].id)
								{									 
									$scope.brandsList[i].code=$scope.getSettingData[j].code;
									$scope.brandsList[i].amount=$scope.getSettingData[j].amount;
									$scope.brandsList[i].currencyAmnt=$scope.getSettingData[j].currencyAmnt;									
					     	     }								
	                          }							
						}
				 }	
				  
				  $('#add_setting').modal('show');
			});
		     };
	/*--------------------------------pagination----------------------------------------------------*/
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.getExpenseMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getExpenseListCount=function(searchterm){
							
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=searchterm;
			
			 if($scope.search=="" || $scope.search == null)
			  {
			  $scope.search= undefined;  
			  }
			 if($scope.colName == "" || $scope.colName == null){
					$scope.colName = undefined;
				 }
				 if($scope.order == null){
					 $scope.order = undefined;
				 }
			
			 ExpenseMaster_service.getExpenseListCount($scope.search).then(function(response){				
				$scope.count = response.data;
				//console.log($scope.count);
				if($scope.count>$scope.limit){
					$scope.setButton();					
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getExpenseListCount(null);
		
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
	        $scope.getExpenseMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	       
	    };
	    	//---------------------------update expense lists------------------------------------------
		
		$scope.updateExpenseDetails= function(expense)
		{
			$(".loader").show();
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
			  
	    	if(expense.expenseName != undefined || expense.expenseName.match(letterNumber)){
	    		
			  expense.userid=$rootScope.userdetails.id;
			 
			  ExpenseMaster_service.updateExpenseDetails(expense).then(function(response){
				  $scope.expenseUpdateResponse = response.data;	
				  $scope.getExpenseListCount(null);
				  $scope.getExpenseMasterList(0,10,null,null,null);
				  
				  if($scope.expenseUpdateResponse.indexOf("success")!=-1 || $scope.expenseUpdateResponse == 'success'){
					  GlobalModule_notificationService.notification("success","Your expense Details updated successfully");
				  
					 $state.go('restricted.admin.expensemaster');
					 
					  $("#edit_expense").modal('hide');
					  
				  }
				  else if($scope.expenseUpdateResponse == 'failed'){
					  
					  GlobalModule_notificationService.notification("error","expense Name already exist");
					  $("#edit_expense").modal('hide');
				 } 
				  else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");  
		  });
	   	}		 
	    else	
	    	{
	    	 	GlobalModule_notificationService.notification("error","Please enter valid name");
	    	}
		
		};
		
		$scope.openUpdateModal=function(e){
		$("#edit_expense").modal('show');
			
			$scope.expensemaster={						
					id:0,
					userid:0,
					max_amount:""
	        };
			
			$scope.expensemaster.expenseid=e.id;
			$scope.expensemaster.expensename=e.name;
			$scope.expensemaster.expenseamount=e.max_amount;
	    	$scope.expensemaster.userid=e.userid;
		};
		
  //-----------sorting expense master list-----
		 
		 $scope.SortingExpenseMasterList = function(colName,searchterm){
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
				$scope.getExpenseMasterList(0,10,$scope.colName,$scope.order,$scope.search);	
			};
  //----------------------------------delete expense-----------------------
	  

		 $scope.getCheckedIdList=[];
		  
		 
		  $scope.checkedList=function(id,check){
			  
			 if(check)
				 {
				 $('#checedbrandlistcode'+id).prop( "disabled", true );
				 $('#checedbrandlistamt'+id).prop( "disabled", true );
				 
				 }
			 else{
				 $('#checedbrandlistcode'+id).prop( "disabled", false );
				 $('#checedbrandlistamt'+id).prop( "disabled", false );
			 }
			  if($scope.getCheckedIdList.indexOf(id) !== -1)
			  {		
			  var array  = $scope.getCheckedIdList;
			  var index = array.indexOf(id);
			  $scope.getCheckedIdList.splice(index,1);	   
			  }else
				  {		    	
		      $scope.getCheckedIdList.push(id);
		     
				  }
 		  };
		  		  
		  $scope.checkedAllList = function(listedExpense,rd){
			  if(rd == undefined|| rd == false )
				  {
				  $scope.selectedRoleId=false;
				  }
			  else{
			  $scope.selectedRoleId=rd;
			  }
			  if(rd == true || rd == undefined){
			  for(var i=0; i<listedExpense.length; i++){					  
				  
				  if($scope.getCheckedIdList.indexOf(listedExpense[i].id) !== -1)   
				  {  						 
				  }
				  else{
					  //console.log(listedExpense[i].id);
					  $scope.checkedList(listedExpense[i].id);	
				  }
				  }			
			  }
			  else{
				  $scope.getCheckedIdList=[];
			  }
			  
			  if(rd)
				 {
				  for(var i=0;i<$scope.brandsList.length;i++){
				 $('#checedbrandlistcode'+$scope.brandsList[i].id).prop( "disabled", true );
				 $('#checedbrandlistamt'+$scope.brandsList[i].id).prop( "disabled", true );
		  
			 }
				 }
			 else{
				  for(var i=0;i<$scope.brandsList.length;i++){
					 $('#checedbrandlistcode'+$scope.brandsList[i].id).prop( "disabled", false );
					 $('#checedbrandlistamt'+$scope.brandsList[i].id).prop( "disabled", false );					 
				  }
 			 }
		  };
		  
		  
		  $scope.check = function(){	
		  if($scope.getCheckedIdList.length == 0){
			  
			  GlobalModule_notificationService.notification("error","Please select record(s) to delete");
		 }
		  else{				  
			  	$('#deletelist').modal('show');
			  }			  
		  };
		  		  
		  $scope.deletefromList = function(formlist){
			  
			 
			  if($scope.deletesubheadindex!=null){
				
	    		$scope.subheadlist.splice($scope.deletesubheadindex,1);
	    		return;
			   }			  
			  	$(".loader").fadeOut("slow");
			  $scope.formlist=formlist;
			  if($scope.subHeadId != undefined)
			    {
			    	$scope.getCheckedIdList.push($scope.subHeadId);
 			    }
			    
				 ExpenseMaster_service.deleteFromList($scope.formlist,$scope.getCheckedIdList).then(function(response){
				  $scope.expenseflag = response.data;	
				  $scope.getExpenseListCount(null);
				 $scope.getExpenseMasterList(0,10,null,null,null);
				 
				  if($scope.expenseflag.indexOf("success")!=-1){
					 
					  GlobalModule_notificationService.notification("success","Record deleted successfully");
					  $scope.getCheckedIdList=[];
					  
					  // $scope.getExpenseListCount();
					 // $scope.getCheckedIdList=;
				  }else{
					
					  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				  }
				  $(".loader").fadeOut("slow");
			    },function(response){
				  $(".loader").fadeOut("slow");
				});
		  };
		
		  $scope.clear=function(){
			  
				  $scope.expenseMaster={
						  expense_headName:"",
						  reimbursement_typeName:""
							
				};				  
		}; 
			
		$scope.expensedata=function(e){
			
			  $scope.expenseMaster={
					expense_headName:"",
				 reimbursement_typeName:0
					
			};

			$scope.expenseMaster.userid=$rootScope.userdetails.id;
			$scope.expenseMaster.id=e.id;
			$scope.expenseMaster.expense_headName=e.expense_headName;
			$scope.expenseMaster.reimbursement_typeName=e.reimbursement_typeName;
			$scope.expenseMaster.id=e.id;
			
			$('#add_expense').modal('show');
			
		};
		
			//-----------------save/insert expensehead in list-----------------------	
		    
			
			$scope.saveExpenseSubHead=function(subhead,headCheckFlag){ 
				  
				 // $(".loader").show();
				  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
				  
					if(subhead == undefined || subhead.match(letterNumber))
					{
						if($scope.subheadlist.length > 0)
						{
							for(var i=0;i<$scope.subheadlist.length;i++)
							{
								if($scope.subheadlist[i].name==subhead) 
								{									
									GlobalModule_notificationService.notification("error","Expense SubHead Name already exist");
									$(".loader").fadeOut("slow");
									return;
								 }
								 else
								 {									  
									  if(headCheckFlag == true)
									  {
										  $scope.subheadlist.push({name:subhead,travel_flag:headCheckFlag});
										  //$scope.subheadlist[i].travel_flag=headCheckFlag;
									  }
									  else
									  {
										  $scope.subheadlist.push({name:subhead,travel_flag:headCheckFlag});
									  }
									  
									  break;
				                 }
				             }
						 }
						else
						{
							//$scope.subheadlist.push({name:subhead});
							if(headCheckFlag == true)
							  {
								  $scope.subheadlist.push({name:subhead,travel_flag:headCheckFlag});
								  //$scope.subheadlist[i].travel_flag=headCheckFlag;
							  }
							  else
							  {
								  $scope.subheadlist.push({name:subhead,travel_flag:headCheckFlag});
							  }
						}
						 $scope.subhead="";
	                     $('#edit_subhead').modal('hide');								
					}				  
					else
					{
						 GlobalModule_notificationService.notification("error","Please enter valid input");
			  			 $scope.subhead="";
					}
					//  alert($scope.subheadlist[0].name);
			  };
			  
		  
		  
		  //-----------------save/insert expense in list-----------------------	

		  $scope.saveExpenseDetails=function(expense){ 
				//console.log($scope.subheadlist);	
				$(".loader").show();	
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  

			 if(expense == undefined)
			{
				GlobalModule_notificationService.notification("error","Please fill mandatory fields");
				$(".loader").fadeOut("slow");
			    return;
			}
			if(expense.expense_headName == undefined)
			{
				GlobalModule_notificationService.notification("error","Please enter expense head name");
				$(".loader").fadeOut("slow");
			    return;
			}
			
			if(expense.expense_headName == undefined || expense.expense_headName.match(letterNumber) && expense.expense_headName!=null ) {
         		
            	 for(var j=0;j<$scope.expenseMasterList.length;j++)
                 {
					if(expense.expense_headName==$scope.expenseMasterList[j].expense_headName && expense.expense_typeId != $scope.expenseMasterList[j].expense_typeId)
				    {
						  GlobalModule_notificationService.notification("error","Expense Name already exist");
						  $(".loader").fadeOut("slow");
					      return;
				    }			
			      }
        		              	            	 
					$scope.id=expense.id;
					
				    expense.userid=$rootScope.userdetails.id;
		
					if( $scope.subheadlist.length > 0 )
				    {
						expense.subHead=$scope.subheadlist;
				    }
					if($scope.headBrandsData== undefined)
					{
						$scope.headBrandsData=[];
					}
					   					   
				    expense.brands= $scope.headBrandsData;
					
 					ExpenseMaster_service.saveExpenseDetails(expense).then(function(response){
				 
						$scope.saveExpenseDetailsResponse = response.data;
	              						
						if($scope.saveExpenseDetailsResponse == "success" && $scope.expenseFlag==false)							
						{
							
							  GlobalModule_notificationService.notification("success","Your expense has been added successfully");
			            	  
							  $scope.getExpenseMasterList(0,10,null,null,null);
					        
					          $state.go("restricted.admin.expensemaster");
						}						
                    	  else if($scope.saveExpenseDetailsResponse == "success" && $scope.expenseFlag==true)
					 	  {
                    		 /* if(expense.brands == undefined || expense.brands == null || expense.brands.length == 0)
  							{
  								GlobalModule_notificationService.notification("error","Setting is not added, It will not visible to Employee");
  							}
  							else
  							{*/
  	                           GlobalModule_notificationService.notification("success","Your expense has been updated successfully");				  
  							//}			         
  			            	  $scope.getExpenseMasterList(0,10,null,null,null);
  					        					             
							 $state.go("restricted.admin.expensemaster");
						  }
						
					     else if($scope.saveExpenseDetailsResponse=='Duplicate')
					     {
		              
					        GlobalModule_notificationService.notification("error","Expense Name already exist");				  
					 
				          }
				  
					     else
					   {				  	
					      GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again.");
					      
					   }				  
				  
				     });}
               else{
					
            	   GlobalModule_notificationService.notification("error","Please enter valid input");
					
				 }
				  					
			  $(".loader").fadeOut("slow");
		  };
		
  
		  $scope.cancelCreateExpense = function(){
		    	
		    	 $state.go("restricted.admin.expensemaster");
				
		    };
		
		    
		  $scope.openDeleteModal= function(id){

			  $scope.deleteSubHeadId=id;
		    	//$scope.deletesubheadindex=id;
		    	$('#delete-subhead').modal('show');

          };
		    
               $scope.subHeadSetting=function(id)
		        {
            	   $scope.subHeadindex=id;
		    	};
		                  
		    	 $scope.settingId=0;
			 	 $scope.expenseSetting = function(id,headName){
			 		$scope.settingId=id;
 			 		$scope.headName=headName;
			 		if($scope.expenseFlag==false)
			 		 {   
			 			 $scope.getbrandsList();
			 			 
			 			   $scope.codeCK="";
						   $scope.amountCK="";						   
						   $('#checkallbrandlist').prop('checked', false);
						   $('#add_setting').modal('show');
			 		  }   
					};
				
				$scope.allchecked=false;
				$scope.addSubHeadBrandList=function(){
             	
            	   if($scope.settingId == 2)            	 
            	   {   
            		   if(!$scope.allchecked)
            		   {
	            		   for(var i=0;i<$scope.brandsList.length;i++)
		  	 			   {	 				    
		  	 				  if($scope.brandsList[i].currencyAmnt == undefined || $scope.brandsList[i].currencyAmnt == '' || $scope.brandsList[i].currencyAmnt == 0)
		  	 				  {
		  	 					  GlobalModule_notificationService.notification("error","You have not specified amount for any/some brand(s) so this expense head will not available for expense claim");
		  	 					  return;
		  	 				  }  	 				 	 				 
		  	 			   }
            		   }
            		   else
            		   {
            			   if($scope.amountCK == '')
            			   {
            				   GlobalModule_notificationService.notification("error","You have not specified amount for any brand so this expense head will not available for expense claim");
		  	 				   return;
            			   }
            		   }
            		   
            		   $scope.subheadlist[$scope.subHeadindex].brands=$scope.brandsList;
                  
            		   $scope.brandsList=[];
	  	 			   $scope.codeCK="";
	  				   $scope.amountCK="";
	  				   $('#add_setting').modal('hide');
	  				   return;
                   }           	  
            	   else if($scope.settingId == 1)
            	   {	
            		   if(!$scope.allchecked)
            		   {
            			   for(var i=0;i<$scope.brandsList.length;i++)
    	  	 			   {	 				    
    	  	 				  if($scope.brandsList[i].currencyAmnt == undefined || $scope.brandsList[i].currencyAmnt == '' || $scope.brandsList[i].currencyAmnt == 0)
    	  	 				  {
    	  	 					  GlobalModule_notificationService.notification("error","You have not specified amount for any/some brand(s) so this expense head will not available for expense claim");
    	  	 					  return;
    	  	 				  }  	 				 	 				 
    	  	 			   } 
            		   }
            		   else
            		   {
            			   if($scope.amountCK == '')
            			   {
            				   GlobalModule_notificationService.notification("error","You have not specified amount for any brand so this expense head will not available for expense claim");
		  	 				   return;
            			   }
            		   }
            		   
            		   $scope.headBrandsData=$scope.brandsList;
	                 
	                   $scope.brandsList=[];
	  	 			   $scope.codeCK="";
	  				   $scope.amountCK="";
	  				   $('#add_setting').modal('hide');
	  				   $scope.allchecked=false;
	  				   return; 
                   }
            	   else if($scope.expenseFlag == false && $scope.settingId == 2)
            	   {  
            		   if(!$scope.allchecked)
            		   {
	            		   for(var i=0;i<$scope.brandsList.length;i++)
		  	 			   {	 				    
		  	 				  if($scope.brandsList[i].currencyAmnt == undefined || $scope.brandsList[i].currencyAmnt == '' || $scope.brandsList[i].currencyAmnt == 0)
		  	 				  {
		  	 					  GlobalModule_notificationService.notification("error","You have not specified amount for any/some brand(s) so this expense head will not available for expense claim");
		  	 					  return;
		  	 				  }  	 				 	 				 
		  	 			   }
            		   }
            		   else
            		   {
            			   if($scope.amountCK == '')
            			   {
            				   GlobalModule_notificationService.notification("error","You have not specified amount for any brand so this expense head will not available for expense claim");
		  	 				   return;
            			   }
            		   }       
            		   
            		   $scope.subheadlist[$scope.subHeadindex].brands=$scope.brandsList;
            		   
            		   for(var i=0;i<$scope.brandsList.length;i++)
 	  	 			   {	 				    
 	  	 				 $scope.brandsList[i].code='';
 	  	 				 $scope.brandsList[i].amount=0;	 				 
 	  	 			   }
 	  	 			   $scope.codeCK="";
 	  				   $scope.amountCK=""; 
 	  				   $('#add_setting').modal('hide');
 	  				   $scope.allchecked=false;
 	  				   return;
 	  			
            	  }  
            	   $('#add_setting').modal('hide');
            	   $scope.allchecked=false;                
                 };
                

               $scope.subModal=function(id)
               {
            	
            	   $('#add_Subhead').modal('hide');     	   
               };
               
                 $scope.deleteSubHead = function()
                  {                             	 
 
                	 ExpenseMaster_service.deleteSubHead($scope.deleteSubHeadId).then(function(response){
            		   
            		   var deleteSubHeadStatus=response.data;
            		   
            		   if(deleteSubHeadStatus == "success")
   				    {
     	            	  GlobalModule_notificationService.notification("success","Subhead deleted successfully");	
     	            	  
     	            	 $scope.fetchSubHead($scope.expenseMaster.expense_typeId);
   				    }
            	   });
               };
		
               $scope.removeFromSubHeadList= function(index)
               {
            	   $scope.subheadlist.splice(index,1);
               };
               
               $scope.applyToAllFieldscode = function(check,code){
    			if(check){
    			 for(var i=0;i<$scope.brandsList.length;i++)
    				{
    					$scope.brandsList[i].code=code;		 
    				}
    			}
    		};	
               
               
		$scope.applyToAllFieldsamount = function(check,amout){
			if(check){
			 for(var i=0;i<$scope.brandsList.length;i++)
				{
 					$scope.brandsList[i].currencyAmnt=formatAllCurrency(amout);
				}
			}
		};	
		
		$scope.checkAllSubhead= function(headCheckFlag){
			
			if($scope.subheadlist.length != 0)
			{
				for(var i=0;$scope.subheadlist.length;i++)
				{
					$scope.subheadlist[i].travel_flag=headCheckFlag;
				}
			}
		};

		$scope.formatCurrency=function(index){
					
			var el=document.getElementById('checedbrandlistamt'+index);
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
	
}]);
	