'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('ComplianceMatrix_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Master_Service){

	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.deleteComplianceId=0;
		
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
	
	
	$scope.fetchpositonbydipartment = function(id){
				
		  Admin_Service.fetchpositonbydipartment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
		  },function(response){				
			});		  
		  };
	//$scope.postedJob = GlobalModule_dataStoreService.loadData('LoginModule','postedjob');
	//$scope.fetchpositonbydipartment($scope.postedJob.category.id);
	
		  $scope.fetchComplianceList = function(offset,limit,colName,order,search){
				 
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
					 
					 Master_Service.fetchComplianceMasterList(offset,limit,colName,order,search).then(function(response){
					 $scope.complianceList=response.data;
					 //console.log($scope.complianceList);
					 //$scope.complianceList.check=false;
					 $scope.compliancesListbyPosition=[];
					 $(".loader").fadeOut("slow");					 
				  },function(response){
					  $(".loader").fadeOut("slow");
				 }); 
				 	 
			 };	
			 $scope.fetchComplianceList(0,1000,null,null,null);
	
			 $scope.offset=0;
				$scope.limit=10;
				$scope.navButtons = [];
				$scope.setButton = function(){
					$scope.navButtons = [];
					
						for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
						$scope.navButtons.push(j);
						}		
						 $scope.fetchComplianceList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
					};
			 
			 
			 $scope.getComplianceCount=function(search){
				 
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
					 Master_Service.getComplianceCount($scope.search).then(function(response){
						$scope.count = response.data;
						if($scope.count>$scope.limit){
							$scope.setButton();
						}
					
					},function(response){
						
						$(".loader").fadeOut("slow");
						
					});		
				};
				$scope.getComplianceCount(null);
			 
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
			        $scope.fetchComplianceList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			    };
			 
			    $scope.setButton = function(){
					$scope.navButtons = [];
					
						for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
						$scope.navButtons.push(j);
						}
						 //$scope.fetchComplianceList();
						 //$scope.complianceList.check=false;
						 $scope.compliancesListbyPosition=[];
						 //$scope.getCompliancesforPosition();
					};
			 
					$scope.selectedCompliancesIds=[];
					$scope.fetchCompliancesbyPosition=function(brandid,categoryid,positionid){
												
						 $(".loader").show();
						 //$scope.fetchComplianceList(0,1000,null,null,null);
						 //$scope.complianceList.check=false;
						 $scope.compliancesListbyPosition=[];
						Admin_Service.fetchCompliancesbyPosition(brandid,categoryid,positionid).then(function(response){
							$scope.complianceList=response.data;
							 							 
							 /*if($scope.compliancesListbyPosition.length>0)
								 $scope.getCompliancesforPosition();*/
							$scope.selectedCompliancesIds.length = 0;
							//$scope.selectedCompliancesIds=[];
							for(var k=0;k<$scope.complianceList.length;k++){
								if($scope.complianceList[k].check){
									$scope.selectedCompliancesIds.push($scope.complianceList[k].id);
								}
							}
							 
							 $(".loader").fadeOut("slow");
							 
						  },function(response){
							  
							  $(".loader").fadeOut("slow");
						 });						
					};
					
					$scope.getselectedStatus=function(brandid,categoryid,positionid,index)
					{
						
						if(brandid==undefined || categoryid==undefined || positionid==undefined)
							{
							$("#checkcompl"+index).prop('checked',false);
								GlobalModule_notificationService.notification("error","Please select all dropdown");
							}							
					};
					
					$scope.getselectedStatus1=function(brandid,categoryid,positionid,index)
					{
						
						if(brandid==undefined || categoryid==undefined || positionid==undefined)
							{
							$("#checkcompl2"+index).prop('checked',false);
								GlobalModule_notificationService.notification("error","Please select all dropdown");
							}							
					};
					
					
					$scope.getCompliancesforPosition=function()
					{												
						/*for(var i=0;i<$scope.complianceList.length;i++)
							{
								$scope.complianceList[i].check=false;
							}*/
						for(var i=0;i<$scope.complianceList.length;i++)
						{
							for(var j=0;j<$scope.compliancesListbyPosition.length;j++)
							{
								if($scope.complianceList[i].id==$scope.compliancesListbyPosition[j].compliance2.id)
									{
										$scope.complianceList[i].check=true;
										break;
									}									
								else
									$scope.complianceList[i].check=false;
							};	
						}
							
						return;
					};
					
					
					/*$scope.fetchcompliancesbyposition=function(){
						
						$(".loader").show();
						
						Admin_Service.fetchcompliancesbyposition().then(function(response){
							
							$(".loader").fadeOut("slow");
							$scope.conmplianceListbyPosition=response.data;
							
						},function(response){
							
							$(".loader").fadeOut("slow");
						});	
						
						for(var i=0;i<$scope.complianceList.length;i++)
						{
							alert($("checkcompl"+i).val());
							$("checkcompl"+i).attr('disabled','false');							
						}						
					};*/
					
			//--------------save compiances for position-----------------
				
					$scope.compliances=[];
					$scope.getcompliancelist = function(complnc)
					  {  						
						  if($scope.compliances.indexOf(complnc.complianceName) !== -1)
							  {		
								  var arry  = $scope.compliances;
								  var element = arry.indexOf(complianceName);
								  $scope.compliances.splice(element,1);
							  }
						 else								  
							  {				  
								  	$scope.compliances.push(complnc);	  
							  }								  
					   };	
					
				$scope.saveCompliancesforPosition=function(brandid,categoryid,positionid,compliance){
								$('#cancel-req-btn').blur();		
					$(".loader").fadeOut("slow");
					$scope.compliances=[]; 
					
					if(brandid==undefined || categoryid==undefined || positionid==undefined)
					{						
						GlobalModule_notificationService.notification("error","No action performed");							    	
				    }
				    else
				    	{
				    	
				    	for(var i=0;i<$scope.complianceList.length;i++)
						{
				    		if($("#checkcompl"+i).is(":checked")){
				    			if($("#checkcompl_a"+i).is(":checked"))
				    			$scope.mandatory_compliances = 1;
			    	    		else
			    	    		$scope.mandatory_compliances = 0;
			    	    		
				    			$scope.complianceList[i].mandatory_compliances=$scope.mandatory_compliances;
				    			$scope.compliances.push($scope.complianceList[i]);	
				    		}
						}
				    	//for removing the available comliances
				    	/*for(var p=0;p<$scope.selectedCompliancesIds.length;p++){
						
							for(var q=0;q<$scope.compliances.length;q++){
								if($scope.selectedCompliancesIds[p]=$scope.compliances[q].id){
								 $scope.compliances[q].check=false;
								}
							}
						}*/
				    	if($scope.compliances.length>0){
				    		
				    
				    	compliance.compliance=$scope.compliances;
				    	compliance.userid=$rootScope.userdetails.id;				    	
						 Admin_Service.saveCompliancesforPosition(compliance).then(function(response){
							  $scope.savecompliancesforPosition = response.data;
							  
							 // $scope.fetchCompliancesbyPosition(0,1000,null,null,null);
							
							 if($scope.savecompliancesforPosition.indexOf("success")!=-1){
								  GlobalModule_notificationService.notification("success","Your compliances have been  saved successfully");								  
								  $(".loader").fadeOut("slow");
								  $scope.fetchCompliancesbyPosition(brandid,categoryid,positionid);
								  //location.reload("/compliancesmatrix");
								  //$state.go("restricted.admin.compliancesmatrix");
							 }						
							 else{
								 
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								  
							      }
							 
							 $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 
						  });
				    	}/*else{
				    		GlobalModule_notificationService.notification("error","Please select at least one compliance.");
				    	}*/
				    	}	    					    	  					
				};	
				
				
				$scope.updateCompliancesforPosition=function(brandid,categoryid,positionid,compliance_edit){
								$('#cancel-req-btn').blur();		
					$(".loader").fadeOut("slow");
					$scope.compliances=[]; 
					
					if(brandid==undefined || categoryid==undefined || positionid==undefined)
					{						
						GlobalModule_notificationService.notification("error","No action performed");							    	
				    }
				    else
				    	{
				    	
				    	for(var i=0;i<$scope.complianceList.length;i++)
						{
				    		if($("#selectcompl"+i).is(":checked")){
				    			if($("#checkcompl_edit"+i).is(":checked"))
				    			$scope.mandatory_compliances = 1;
			    	    		else
			    	    		$scope.mandatory_compliances = 0;
			    	    		
				    			$scope.complianceList[i].mandatory_compliances=$scope.mandatory_compliances;
				    			$scope.compliances.push($scope.complianceList[i]);	
				    		}
						}
				
				    	if($scope.compliances.length>0){
				    		
				    
				    		compliance_edit.compliance_edit=$scope.compliances;
				    		compliance_edit.userid=$rootScope.userdetails.id;				    	
						 Admin_Service.updateCompliancesforPosition(compliance_edit).then(function(response){
							  $scope.updatecompliancesforPosition = response.data;
							 
							 if($scope.updatecompliancesforPosition.indexOf("success")!=-1){
								  GlobalModule_notificationService.notification("success","Your compliances have been  saved successfully");								  
								  $(".loader").fadeOut("slow");
								  $scope.fetchCompliancesbyPosition(brandid,categoryid,positionid);
								  //location.reload("/compliancesmatrix");
								  //$state.go("restricted.admin.compliancesmatrix");
							 }						
							 else{
								 
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								  
							      }
							 
							 $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 
						  });
				    	}/*else{
				    		GlobalModule_notificationService.notification("error","Please select at least one compliance.");
				    	}*/
				    	}	    					    	  					
				};
				
				$scope.checkedAll=function(brandid,categoryid,positionid)
				{	
					
					if(brandid==undefined || categoryid==undefined || positionid==undefined)
					{
						$("#rd").prop('checked',false);
						GlobalModule_notificationService.notification("error","Please select all dropdown");
					}
					else
					{
						if($("#rd").is(":checked"))
						{	
							for(var i=0;i<$scope.complianceList.length;i++)
							$("#checkcompl"+i).prop('checked',true);
						}
						else
						{
							for(var i=0;i<$scope.complianceList.length;i++)
							$("#checkcompl"+i).prop('checked',false);
						}												
					}					
				};
				
				$scope.checkedAll2=function(brandid,categoryid,positionid)
				{	
					
					if(brandid==undefined || categoryid==undefined || positionid==undefined)
					{
						$("#rd2").prop('checked',false);
						GlobalModule_notificationService.notification("error","Please select all dropdown");
					}
					else
					{
						if($("#rd2").is(":checked"))
						{	
							for(var i=0;i<$scope.complianceList.length;i++)
							$("#checkcompl2"+i).prop('checked',true);
						}
						else
						{
							for(var i=0;i<$scope.complianceList.length;i++)
							$("#checkcompl2"+i).prop('checked',false);
						}												
					}					
				};
			/*	document.getElementById('icd').onchange = function() {
				    if ( document.getElementById('icd').checked === false ) {
				        planhide();
				    }
				};  */
				
				$scope.showmodal=function(brandid,categoryid,positionid)
				{
					if(brandid==undefined || categoryid==undefined || positionid==undefined)
					{
						$("#rd").prop('checked',false);
						GlobalModule_notificationService.notification("error","No action performed");
					}
					else
						$('#confrmtn').modal('show');
				};
								
				$scope.redirectPage=function()
				{					
					/*for(var i=0;i<$scope.complianceList.length;i++)
					{
						for(var j=0;j<$scope.compliancesListbyPosition.length;j++)
						{
							if($scope.complianceList[i].id != $scope.compliancesListbyPosition[j].compliance2.id)
								$("#checkcompl"+i).prop('checked',false);							
						};	
					}*/
					location.reload();
				};
	// for compliance dependencies
				$scope.complianceList2=[];
				
				
				 $scope.fetchComplianceList2 = function(offset,limit,colName,order,search,complianceId){
					 
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
						 
						 Master_Service.fetchComplianceMasterList(offset,limit,colName,order,search).then(function(response){
						 $scope.complianceList2=response.data;
						 
						 for(var i=0;i<$scope.complianceList2.length;i++){
							 if($scope.complianceList2[i].id=complianceId){
								 $scope.complianceList2.splice(i,1);
								 break;
							 }
						}
						 //console.log($scope.complianceList);
						 //$scope.complianceList.check=false;
						 $scope.compliancesListbyPosition=[];
						 $(".loader").fadeOut("slow");					 
					  },function(response){
						  $(".loader").fadeOut("slow");
					 }); 
					 	 
				 };	
				 
				
				$scope.fetchCompliancesForDependency=function(complianceId,ComplianceDependencies){
					
					$(".loader").show();
					//$scope.fetchComplianceList2(0,1000,null,null,null,complianceId);			
					$scope.complianceId=complianceId;
					$scope.complianceList2.length=0;
					for(var i=0;i<$scope.complianceList.length;i++){
						if($scope.complianceList[i].check){
							$scope.complianceList2.push($scope.complianceList[i]);
						}
					}
					 for(var i=0;i<$scope.complianceList2.length;i++){
						 if($scope.complianceList2[i].id == complianceId){
							 $scope.complianceList2.splice(i,1);
							break;
						 }
						 $scope.complianceList2[i].selected=false;
					}
					 
					 for(var i=0;i<$scope.complianceList2.length;i++){
						 
						 $scope.complianceList2[i].selected=false;
					}
					 $scope.dependentTasksIds.length=0;
					 for(var i=0;i<$scope.complianceList2.length;i++){
						 
						 for(var m=0;m<ComplianceDependencies.length;m++){
							 
							 if($scope.complianceList2[i].id == ComplianceDependencies[m]){
								 $scope.complianceList2[i].selected=true;
								 $scope.dependentTasksIds.push($scope.complianceList2[i].id);
							 }
						 }
						 
					}
				
					$(".loader").fadeOut("slow");
					$('#compliancedepedencies').modal('show');
				};
				$scope.fetchComplianceDependencies=function(brandid,categoryid,positionid,compliance,complianceId){
					$(".loader").show();
					compliance.id=complianceId;
					
					 Admin_Service.fetchComplianceDependencies(compliance).then(function(response){
						  $scope.depIds = response.data;
						  $scope.fetchCompliancesForDependency(complianceId,$scope.depIds);
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						 
					  });
					
				};
				
				// for deleting
				$scope.deleteCompliancesforPosition=function(brandid,categoryid,positionid,compliance,complianceId){
					$scope.compliances.length=0;
					if($scope.deleteComplianceId!=0){
						complianceId=$scope.deleteComplianceId;
					}
					
					for(var i=0;i<$scope.complianceList.length;i++)
					{
			    		if($scope.complianceList[i].id==complianceId){
			    			
			    			$scope.compliances.push($scope.complianceList[i]);	
			    		}
			    						    		
					}
			    	compliance.compliance=$scope.compliances;
			    	compliance.userid=$rootScope.userdetails.id;
					
					 Admin_Service.deleteCompliancesforPosition(compliance).then(function(response){
						  $scope.deleteCompliancesforPosition = response.data;
						  
						 // $scope.fetchCompliancesbyPosition(0,1000,null,null,null);
						
						 if($scope.deleteCompliancesforPosition.indexOf("success")!=-1){
							  GlobalModule_notificationService.notification("success","Your Compliances have been Deleted Successfully");								  
							  $(".loader").fadeOut("slow");
							  $scope.fetchCompliancesbyPosition(brandid,categoryid,positionid);
						 }						
						 else{
							 
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  
						      }
						 
						 $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						 
					  });
				};
				
				// for adding dependencies
				$scope.dependentTasksIds=[];
				$scope.addDependentComplianceId = function(id){		
					
					if($scope.dependentTasksIds.indexOf(id) !== -1){
						var array  = $scope.dependentTasksIds;
						var index = array.indexOf(id);
						$scope.dependentTasksIds.splice(index,1);
					}
					else{
						$scope.dependentTasksIds.push(id);				      
					};		
					//console.log($scope.dependentTasksIds);compliancIds
				};
				
				$scope.saveCompDependency=function(brandid,categoryid,positionid,compliance){
					
					compliance.id=$scope.complianceId;
					compliance.compliancIds=$scope.dependentTasksIds;
					$(".loader").show();
					
					Admin_Service.saveCompDependency(compliance).then(function(response){
						 var saveStatus=response.data;
						 
						 if(saveStatus == 'success')
						 {
							 GlobalModule_notificationService.notification("success","Dependency has been added");
							 $('#compliancedepedencies').modal('hide');
							 $scope.dependentTasksIds = [];
						/*	 $scope.fetchTasksList(0,10,null,null,null);
							 $scope.fetchTasksTree();
							 $scope.init();*/
							 $scope.fetchCompliancesbyPosition(brandid,categoryid,positionid);
						 }
						 
					  },function(response){
						  $(".loader").fadeOut("slow");
					 }); 
					
					//$state.reload();
					
					$(".loader").fadeOut("slow");
				};
				$scope.setdeleteCompId=function(id){
					if(id!=0){
						$scope.deleteComplianceId=id;
					}else{
						$scope.deleteComplianceId=0;
					}
					
				};
				// fro unchecking checkboxes
				$scope.unCheckedCheckBoxes=function(brandid,categoryid,positionid){
					$scope.fetchCompliancesbyPosition(brandid,categoryid,positionid);
				};
				
				$scope.checkMandatoryCompliances=function(){	
					
					if($("#checkcompl_a"+i).is(":checked"))
						$("#checkcompl_a"+i).prop('checked',true);
		   		
				}; 
}]);