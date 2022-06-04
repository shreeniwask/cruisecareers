'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('repatDataList_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Admin_Service','Repate_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Admin_Service,Repate_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	GlobalModule_dataStoreService.storeData('LoginModule','approverTabFlag',undefined);
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
		
	//----------------------------------------------
	$scope.fetchRepatDataList = function(offset,limit,colName,order,search){
		
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
		Repate_Service.fetchRepatDataList(offset,limit,colName,order,search).then(function(response){
			$scope.DataList = response.data;
			//console.log($scope.DataList);
			$(".loader").fadeOut("slow");
		},function(response){		
			$(".loader").fadeOut("slow");
		});		  
	};
	$scope.fetchRepatDataList(0,10,null,null,null);
	
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchRepatDataList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
	$scope.getRepatDataListcount=function(searchterm){
							
		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=searchterm;
		if($scope.colName == null){
			$scope.colName = undefined;
		}
		if($scope.order == null){
			 $scope.order = undefined;
		}
		if($scope.search=="" || $scope.search == null)
		{
			 $scope.search= undefined;  
		}
			
		Repate_Service.getRepatDataListcount($scope.search).then(function(response){				
			$scope.count = response.data;
			//console.log($scope.count);
			if($scope.count>$scope.limit){
			$scope.setButton();					
		}
	},function(response){
		$(".loader").fadeOut("slow");		
	});		
};
	$scope.getRepatDataListcount(null);
		
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
	$scope.fetchRepatDataList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	$scope.setButton = function(){
	$scope.navButtons = [];
			
	for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
		$scope.navButtons.push(j);
	}
		$scope.fetchRepatDataList();
};
};

$scope.SortingFileList = function(colName,searchterm){
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
		$scope.fetchRepatDataList(0,10,$scope.colName,$scope.order,$scope.search);	
	};
	
	
	
	
	  $scope.setlistidMaxDays= function(s)
	  {  		  		  
		  $scope.empMaxDays=s.maxDays;
		  $scope.empId=s.id;
		    
		 $('#add_mmi_Days').modal('show');
	
	  };
	
	
	
	  $scope.setlistid= function(s)
	  {  		  
		  
		  //alert(s.mmiDate);
		  $scope.empDataListId=s.id;
		  $scope.diembrkdt=s.disembarkDate;
		  if(s.mmiDate != undefined)
		  {
			  $scope.formatMmiDate=$scope.dateformate(s.mmiDate);
			  $scope.empMmiDate=$scope.formatMmiDate;
		  }
		  else
			  $scope.mmiDate="";
		  
		   $('#add_mmi_date').modal('show');
	
	  };
	  
	
	
	 $scope.maxDaysUpdate=function(days)
	  {
				 //console.log($scope.empDataListId);				
				if(days == undefined || days <= 0 )
				{
					GlobalModule_notificationService.notification("error","Please enter valid number of days");
					return;
				}
				
				Repate_Service.maxDaysUpdate($scope.empId,days).then(function(response){
				$scope.uploadMaxdays = response.data; 
										
			    if($scope.uploadMaxdays=="update")
				{
				      GlobalModule_notificationService.notification("success","Max days updated successfully");
				      $scope.getRepatDataListcount($scope.searchterm);
				      $('#add_mmi_Days').modal('hide');
				      $scope.fetchRepatDataList(0,10,$scope.colName,$scope.order,$scope.search);	
				      $scope.maxDays='';
				      return;
					 }
			    	else
			    	{
						GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");										 

			    	}		    			    	
		  }); 
	  };	
	  		 
	  		function calculateAge(disemDate,mmiDate) { 				 

			  return disemDate.getTime() > mmiDate.getTime();
		 };

	   $scope.mmiDateUpdate=function()
	  {		   
		   
		   if(($("#mmiDate").val()) == undefined || ($("#mmiDate").val()) == "")
			{
				GlobalModule_notificationService.notification("error","Please enter valid MMI date");
				return;
			}
		  $scope.mmiDate=  $("#mmiDate").val();
		  		  
		  var disembarkDate=$scope.dateformate($scope.diembrkdt);
	
		  var UpdatemmiDate = $("#mmiDate").val();
		  var dateParts1 = UpdatemmiDate.split('-');
		  var dateParts2 = disembarkDate.split('-');
		  var disemDate=new Date(dateParts2[2],dateParts2[1],dateParts2[0]);
		  var mmiDate=new Date(dateParts1[2],dateParts1[1],dateParts1[0]);
		  var diff=calculateAge(disemDate,mmiDate);
          if(diff == true)
			{
		    	   GlobalModule_notificationService.notification("error","MMI date should be greater than Disembark Date");
		    	   return;
			}
	                  //console.log($scope.mmiDate);
		              Repate_Service.mmiDateUpdate($scope.empDataListId,$scope.mmiDate).then(function(response){
			    	   $scope.uploadMimDate = response.data; 
				
			    	if($scope.uploadMimDate=="update")
					{
			    		$scope.getRepatDataListcount($scope.searchterm);
				      GlobalModule_notificationService.notification("success"," MMI date Updated successfully");										 
				      $('#add_mmi_date').modal('hide');
				      $scope.getRepatDataListcount($scope.searchterm);
				      $scope.fetchRepatDataList(0,10,$scope.colName,$scope.order,$scope.search);	
				    	 $scope.mmiDate='';
				       return;
					}
			    	else
			    	{
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");		
			        }	
		  });
	  
	  };
	  
	  $scope.generateExcel = function(){		 
		  if($scope.search == undefined){
			  $scope.search ="";
		  }			 		  	
		  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+10+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));
	  };
	
	  
	  /*--------------------Column Setting for reimbursement-----------------*/		
	  
		 $scope.getSettings = function(){
			 $(".loader").show();
				Admin_Service.getSettings($rootScope.userdetails.id,10).then(function(response){
					  $scope.columnlist = response.data;
					  //console.log($scope.columnlist);
					var count=0;
							for(var i=0;i<$scope.columnlist.length;i++){
								if($scope.columnlist[i].name=='Emp. No.' && $scope.columnlist[i].isActive==false){
									for(var j=0;j<$scope.columnlist.length;j++){
										if($scope.columnlist[j].name=='Emp. No.' || $scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='Disembark Date' || $scope.columnlist[j].name=='Max Days' || $scope.columnlist[j].name=='MMI Date'){
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
							if($scope.columnlist[i].name=='Emp. No.' || $scope.columnlist[i].name=='Name' || $scope.columnlist[i].name=='Disembark Date' || $scope.columnlist[i].name=='Max Days' || $scope.columnlist[i].name=='MMI Date'){
								$scope.columnlist[i].isActive=true;
								}else{
									$scope.columnlist[i].isActive=false;
								}
							}
							
						}
				$(".loader").fadeOut("slow");
			};
		 
//--------------------------------------------------------------------------------------------------------------------				 

			$scope.openUserDescription= function(empId){
				
				GlobalModule_dataStoreService.storeData('LoginModule','empId',empId);
				
				GlobalModule_dataStoreService.storeData('LoginModule','employeeflag',2);
				$state.go("restricted.admin.employeedescription");			
			};
	  
	  
	  $scope.dateformate = function(date){	
		  
		  if(date == undefined || date == '')
		  {
			  return null;
		  }
		  
	      var dateOut = moment(date).format("DD-MM-YYYY");
	      return dateOut;
	   };

}]);
