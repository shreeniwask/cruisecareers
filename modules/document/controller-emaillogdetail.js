'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('emaillogdetail_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Emaillogdetail_Service','Master_Service','Admin_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Emaillogdetail_Service,Master_Service,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.approverTabFlag=1;
	$scope.EmailType;
	$scope.emailListId;
	// for column sorting
	
	
		$scope.getSettings = function(){
			Admin_Service.getSettings($rootScope.userdetails.id,18).then(function(response){
				  $scope.columnlist = response.data;	
				  var i= $scope.columnlist.indexOf();
				var count=0;
				var userdcolindex=[];
				var admindcolindex=[];
				
						for(var i=0;i<$scope.columnlist.length;i++){
							if($scope.columnlist[i].name=='Emp Number' || $scope.columnlist[i].name=='Emp Name' ){
								userdcolindex.push(i);
							}
							if($scope.columnlist[i].name=='Subject'){
								admindcolindex.push(i);
							}
							if($scope.columnlist[i].name=='Email Date' && $scope.columnlist[i].isActive==false){
								for(var j=0;j<$scope.columnlist.length;j++){
									if($rootScope.userdetails.roleId==1){
										if($scope.columnlist[j].name=='Emp Number' || $scope.columnlist[j].name=='Emp Name' || $scope.columnlist[j].name=='Email Date' || $scope.columnlist[j].name=='Mail From' ){
											$scope.columnlist[j].isActive=true;
										}
									}else{
										if( $scope.columnlist[j].name=='Subject'|| $scope.columnlist[j].name=='Email Date' || $scope.columnlist[j].name=='Mail From' ){
											$scope.columnlist[j].isActive=true;
										}
										
									}
									
								}
							}
							if($scope.columnlist[i].isActive==true)
								{
								count++;
								}
						}
						
						if($rootScope.userdetails.roleId!=1 && (!($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8)) && $rootScope.userdetails.roleId!=8){
							
							/*$scope.columnlist.splice(0,1);
							$scope.columnlist.splice(0,1);*/
							
							for(var i=userdcolindex.length-1;i>=0;i--){
								$scope.columnlist.splice(userdcolindex[i],1);
							}
						}
						if($rootScope.userdetails.roleId==1 || ($rootScope.userdetails.roleId > 3 && $rootScope.userdetails.roleId < 8) || $rootScope.userdetails.roleId==8 ){
							for(var i=admindcolindex.length-1;i>=0;i--){
								$scope.columnlist.splice(admindcolindex[i],1);
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
			Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
				  $scope.savesetFlag = response.data;	
			});
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
			if(check==true)
				{
				for(var i=0;i<$scope.columnlist.length;i++){
					 $scope.columnlist[i].isActive=true;
						
				}
				}else{
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Emp Number' || $scope.columnlist[i].name=='Emp Name'){
							$scope.columnlist[i].isActive=true;
							}else{
								$scope.columnlist[i].isActive=false;
							}
						}
						
					}
		};
	
		 $scope.getIndosnumber = function()
	  		{	
	  				console.log("start");
	  			Emaillogdetail_Service.getIndosNumber($rootScope.userdetails.id).then(function(response){
	  					 $scope.indosnumber = response.data;
	  					 $rootScope.userdetails.employeeIndosNumber=$scope.indosnumber;
	  					$scope.fetchEmailLogDetailList(0,10,null,null,null);
	  			});	
	  		}
	
	  		$scope.getIndosnumber();
	  		
	$scope.fetchEmailLogDetailList = function(offset,limit,colName,order,search){
		
		$(".loader").show();
		
		$scope.getCheckedId=[];
		
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
		 Emaillogdetail_Service.fetchEmailLogDetailList(offset,limit,colName,order,search,$rootScope.userdetails).then(function(response){
			  $scope.emaillogdetaillist = response.data;
			  //console.log($scope.emaillogdetaillist);
			  $(".loader").fadeOut("slow");
		  },function(response){		
			  $(".loader").fadeOut("slow");
			});		  
	};
	//$scope.fetchEmailLogDetailList(0,10,null,null,null);
	//pagination
	 $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchEmailLogDetailList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
		$scope.getEmailLogDetailListcount=function(searchterm){
							
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
			
			 Emaillogdetail_Service.getEmailLogDetailListcount($scope.search,$rootScope.userdetails).then(function(response){				
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton();					
				}
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getEmailLogDetailListcount(null);
		
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
	        $scope.fetchEmailLogDetailList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
	
	
	$scope.SortingEmailLogList = function(colName,searchterm){
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
			$scope.fetchEmailLogDetailList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		//for setting modal values
		$scope.EmailLogmodal;
		$scope.setEmailLogModal = function(e){
			$scope.EmailLogmodal=e;
		};
		
		// for deleting emailLogs
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
		  
		  $scope.checkedAllList = function(emaillogdetaillist,rd){	
			  
			  if(rd == true || rd == undefined){				 
			  for(var i=0; i<emaillogdetaillist.length; i++){					  
				  
				  //if already exist in getCheckedtemplateid than don't pass
				  if($scope.getCheckedId.indexOf(emaillogdetaillist[i].id) !== -1)   
				  {  						 
				  }
				  else{
					  $scope.checkedList(emaillogdetaillist[i].id);	
				  }
				  }			
			  }
			  else{
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
		
		$scope.deleteEmailLogs = function(){
			
			if($scope.getCheckedId.length == 0){
				GlobalModule_notificationService.notification("error","Please select any record");
			}else{
				Emaillogdetail_Service.deleteEmailLogs($scope.getCheckedId).then(function(response){				
					$scope.count = response.data;
					$scope.fetchEmailLogDetailList(0,10,null,null,null);
					$scope.getEmailLogDetailListcount($scope.search);
					if($scope.count>$scope.limit){
						$scope.setButton();					
					}
				
				},function(response){
					$(".loader").fadeOut("slow");		
				});
				GlobalModule_notificationService.notification("success","Record Deleted Successfully");
			}
			
			
			
		};
		
		// for generating excelsheet
		 $scope.generateExcel = function(){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+18+'&search='+$scope.search+'&roleId='+$rootScope.userdetails.roleId+'&indosNo='+$rootScope.userdetails.employeeIndosNumber+'&refNo='+$rootScope.userdetails.refNo+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
		  };
		
		  // for enter key in search
		  $scope.searchOnEnter = function($event,search){
		  
		 	 var keyCode = $event.which || $event.keyCode;
		 	    if (keyCode === 13) {
		 	    	$scope.fetchEmailLogDetailList(0,10,null,null,search);
		 	    	$scope.getEmailLogDetailListcount(search);
		 	    }
		  };
		  
		  
		  $scope.setemaillistid= function(s)
		  {  		
		 	  $scope.emailListId=s;
		 	 $scope.eId=s.id;
		 	if(s.expiryDate != undefined)
			  {
				  $scope.formatMmiDate=$scope.dateformate(s.expiryDate);
				  $scope.expiryDate=$scope.formatMmiDate;
			  }
			  else
				  $scope.expiryDate="";
		 	 
		  };
		/*  $scope.addExpirydate=function()
		  {		   
		 	   
		 	   if(($("#expiryDate1").val()) == undefined || ($("#expiryDate1").val()) == "")
		 		{
		 			GlobalModule_notificationService.notification("error","Please enter valid expiry date");
		 			return;
		 		}
		 	  $scope.expiryDate=  $("#expiryDate1").val();
		 	 Emaillogdetail_Service.addExpirydate($scope.eId,$scope.expiryDate).then(function(response){
		    	   $scope.expiryDate = response.data; 
		    	   console.log=($scope.expiryDate);
		    	 GlobalModule_notificationService.notification("success","Expiry date added successfully");										 
		      $('#add_expiry_date').modal('hide');
		    
		      $scope.fetchEmailLogDetailList(0,10,null,null,null);
		    	 $scope.expiryDate='';
		    	 $(".loader").fadeOut("slow");
		 	},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		 	
		  };*/
		  
		//dateformat
		  $scope.dateformate = function(date){	
			  
			  if(date == undefined || date == '')
			  {
				  return null;
			  }
			  
		     var dateOut = moment(date).format("DD-MM-YYYY");
		     return dateOut;
		  };
		 
  
		
	
}]);