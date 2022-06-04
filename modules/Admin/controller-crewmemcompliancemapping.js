'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('CrewComplianceMapping_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Master_Service','assessEngine_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Master_Service,assessEngine_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
		
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
		$(".loader").show();
		  Admin_Service.fetchpositonbydipartment(id).then(function(response){
			  $scope.positionbydepartment = response.data;
			  $(".loader").fadeOut("slow");
		  },function(response){				
			});		  
		  };
		  
		  $scope.fetchShipsbyBrand=function(id){
				
			  assessEngine_Service.fetchshiplist(id).then(function(response){
				  $(".loader").show();
				  $scope.shipsList = response.data;
				  $(".loader").fadeOut("slow");	
				  //console.log($scope.shipsList);
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
					 //$scope.complianceList.check=false;
					 $scope.compliancesListbyPosition=[];
					 $(".loader").fadeOut("slow");					 
				  },function(response){
					  $(".loader").fadeOut("slow");
				 }); 				 	 
			 };	
			 $scope.fetchComplianceList(0,1000,null,null,null);
	
						 	
					$scope.fetchCompliancesbyPosition=function(shipid,brandid,categoryid,positionid){
						
						 $(".loader").show();
						 //console.log(positionid);
						 //console.log(categoryid);
						 //console.log(brandid);
						 if(positionid == undefined && categoryid == undefined)
						 {
							 positionid=0;
							 categoryid=0;
						 }
						 /*$scope.fetchComplianceList(0,1000,null,null,null);
						 $scope.complianceList.check=false;
						 $scope.compliancesListbyPosition=[];*/
						Admin_Service.fetchCompliancesbyPositionForCrew(shipid,brandid,categoryid,positionid).then(function(response){
							 $scope.complianceList=response.data;
							 						 
							 /*if($scope.compliancesListbyPosition != null && $scope.compliancesListbyPosition.length>0)
								 $scope.getCompliancesforPosition();*/
							 
							 $(".loader").fadeOut("slow");
							 
						  },function(response){
							  
							  $(".loader").fadeOut("slow");
						 });						
					};
					
					$scope.getselectedStatus=function(shipid,brandid,categoryid,positionid,index)
					{
						
						if(shipid==undefined || brandid==undefined || categoryid==undefined || positionid==undefined)
							{
								$("#checkcompl"+index).prop('checked',false);
								GlobalModule_notificationService.notification("error","Please select all dropdown");
							}							
					};
					
					$scope.getCompliancesforPosition=function()
					{												
						for(var i=0;i<$scope.complianceList.length;i++)
							{
							$scope.complianceList[i].check=false;
							}
						for(var i=0;i<$scope.complianceList.length;i++)
						{
							for(var j=0;j<$scope.compliancesListbyPosition.length;j++)
							{
								//console.log($scope.compliancesListbyPosition[j].compliance2.id);
								if($scope.complianceList[i].id==$scope.compliancesListbyPosition[j].compliance2.id)
									$scope.complianceList[i].check=true;							
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
					
				$scope.saveCompliancesforPosition=function(shipid,brandid,categoryid,positionid,compliance){
										
					$(".loader").fadeOut("slow");
					$scope.compliances=[]; 
					
				   if(shipid == undefined || brandid==undefined || categoryid==undefined || positionid==undefined)
					{						
						GlobalModule_notificationService.notification("error","No action performed");							    	
				    }
				    else
				    	{
				    	
				    	for(var i=0;i<$scope.complianceList.length;i++)
						{
				    		if($("#checkcompl"+i).is(":checked"))
				    			$scope.compliances.push($scope.complianceList[i]);				    		
						}
				    	compliance.compliance=$scope.compliances;
				    	compliance.userid=$rootScope.userdetails.id;				    	
						 Admin_Service.saveCompliancesforPositionForCrew(compliance).then(function(response){
							  $scope.savecompliancesforPosition = response.data;
							  
							 // $scope.fetchCompliancesbyPosition(0,1000,null,null,null);
							
							 if($scope.savecompliancesforPosition.indexOf("success")!=-1){
								  GlobalModule_notificationService.notification("success","Your Compliances are Saved Successfully");								  								  
								  $state.go('restricted.admin.crewmembercompliancemapping');
								  $(".loader").fadeOut("slow");
								  
								  //location.reload("/compliancesmatrix");
								  //$state.go("restricted.admin.compliancesmatrix");
							 }						
							 else{
								 
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								  $state.go('restricted.admin.crewmembercompliancemapping');
							      }
							 
							 $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 
						  });
				    	} 					    	  					
				};	
				
				
				
				$scope.checkedAll=function(shipid,brandid,categoryid,positionid)
				{	
					
					if(shipid == undefined || brandid==undefined || categoryid==undefined || positionid==undefined)
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
			/*	document.getElementById('icd').onchange = function() {
				    if ( document.getElementById('icd').checked === false ) {
				        planhide();
				    }
				};  */
				
				$scope.showmodal=function(shipid,brandid,categoryid,positionid)
				{
					if(shipid == undefined || brandid==undefined || categoryid==undefined || positionid==undefined)
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
	
				
				
}]);