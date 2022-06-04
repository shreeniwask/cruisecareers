var controllers = angular.module('LoginModule');

controllers.controller('Positionmaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
   
    
  //----------------View/fetch Position list ------------------------- 
	 $scope.fetchPositionMaster = function(offset,limit,colName,order,search){
	
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
			 
		 Master_Service.fetchPositionMaster(offset,limit,colName,order,search).then(function(response){
			 $scope.positionList=response.data;
			//console.log($scope.positionList);
			 
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchPositionMaster(0,10,null,null,null);
	 
//-----------sorting position master list-----
	 
	 $scope.SortingPositionMasterList = function(colName,searchterm){
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
			$scope.fetchPositionMaster(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		//------pagination--------------------------------
		
		 	$scope.offset=0;
			$scope.limit=10;
			$scope.navButtons = [];
		 $scope.setButton = function(){
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}		
					 $scope.fetchPositionMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
				};
				
		  $scope.getPositionCount=function(search){
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
				 Master_Service.getPositionCount($scope.search).then(function(response){
					$scope.count = response.data;
					//console.log($scope.count);
					
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getPositionCount(null);
		    
			
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
		        $scope.fetchPositionMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		    };
		    //----pagination end------
		   
	/* $scope.updatePosition=function(p)
	 {
		 $scope.positiondata.positonname=p.positonname;
		 
	 }
	*/
		    $scope.fetchCategoryList = function(){		  
				  Login_Service.fetchCategoryList().then(function(response){
					  $scope.categoryList = response.data;		
				  },function(response){
						
					});
			  };
			  $scope.fetchCategoryList();
	    
		$scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchPositionMaster();
			};
		
	//----------------delete Position from list ------------------------- 
			  
			   //----------Get no of checked position-------
					  
					  $scope.getCheckedpositionid=[];
					  
					  $scope.checkedpositionList = function(id){			  
						  
						  if($scope.getCheckedpositionid.indexOf(id) !== -1)
						  {		
						  var array  = $scope.getCheckedpositionid;
						  var index = array.indexOf(id);
						  $scope.getCheckedpositionid.splice(index,1);
						  }else
						  {		    	
					      $scope.getCheckedpositionid.push(id);				      
						  };						  
					  };
					 
					  $scope.checkedAllList = function(listedPositions,rd){				  
						  if(rd == true || rd == undefined){				 
						  for(var i=0; i<listedPositions.length; i++){					  
							  
							  //if already exist in getCheckedpoitionid than don't pass
							  if($scope.getCheckedpositionid.indexOf(listedPositions[i].id) !== -1)   {  						 
							  }else{
								  $scope.checkedpositionList(listedPositions[i].id);	
							  }
							  
						  }			
						  }else{
							  $scope.getCheckedpositionid=[];
						  }
					  };
					  
					  
					  $scope.check = function(){				  
					  if($scope.getCheckedpositionid.length == 0){
						  GlobalModule_notificationService.notification("error","Please select any record");
						  }
					  else{				  
						  $('#deletelist').modal('show');
						  }			  
					  };
				//-----------------------------------------------------------------------	  
					
			
	  $scope.deletefromList = function(formlist){
		  
		  $(".loader").fadeOut("slow");
		  $scope.formlist=formlist;
		
		    $("#deletelist").modal('show');
			  Master_Service.deletePositionFromList($scope.formlist,$scope.getCheckedpositionid).then(function(response){
			  $scope.positionflag = response.data;	
			  $scope.getPositionCount(null);
			  $scope.fetchPositionMaster(0,10,null,null,null);
			  $scope.getCheckedpositionid=[];
			  if($scope.positionflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record deleted successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  
	//----------------suspend Position from list ------------------------- 
	  
	  

	  $scope.suspendcheck = function(){				  
	  if($scope.getCheckedpositionid.length == 0){
		  GlobalModule_notificationService.notification("error","Please select any record");
		  }
	  else{				  
		  $('#suspendlist').modal('show');
		  }			  
	  };
	  
	  
$scope.suspendfromList = function(formlist){
		  
		  $(".loader").fadeOut("slow");
		  $scope.formlist=formlist;
		
		    $("#suspendlist").modal('show');
			  Master_Service.suspendPositionFromList($scope.formlist,$scope.getCheckedpositionid).then(function(response){
			  $scope.positionflag = response.data;	
			  $scope.getPositionCount(null);
			  $scope.fetchPositionMaster(0,10,null,null,null);
			  $scope.getCheckedpositionid=[];
			  if($scope.positionflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record suspended successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  
	  
	  
 
	  
	  
	  
	   //-----------------save/insert position in list-----------------------	
	  
	  $scope.savePositionDetails=function(position){ 
		  	
		  
		  $(".loader").fadeOut("slow");
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		  
		  
	    if(position.positonname == undefined || position.positonname.match(letterNumber)){
		  
		 
		  position.userid=$rootScope.userdetails.id;
	
			 Master_Service.savePositionDetails(position).then(function(response){
				  $scope.savepositiondetails = response.data;
			
				  $scope.getPositionCount(null);
				  $scope.fetchPositionMaster(0,10,null,null,null);
				  $scope.positionmaster={};
				  $state.go('restricted.admin.positionmaster');
				
				 if($scope.savepositiondetails.indexOf("success")!=-1){
					  GlobalModule_notificationService.notification("success","Your Position Details saved successfully");
					  $("#add_position").modal('hide');
				 }
				 else if($scope.savepositiondetails =='failed'){
					  GlobalModule_notificationService.notification("error","Position Name already exist");
					  $("#add_position").modal('hide');
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
	    		GlobalModule_notificationService.notification("error","Please enter valid value");
	    		}
		  };
	  		  
	
		  $scope.clear=function(){
			 
			  $scope.positionmaster = {
					  positonname:"",
					  category:{
						  id:0
					           }			  
		  };
	}; 
	
		  $scope.positiondata=function(p){
			  
			  $scope.positionmaster = {
					  positonname:"",
					  category:{
						  id:0
					  }
			  };
			  $scope.positionmaster.id=p.id;
			  $scope.positionmaster.positonname=p.positonname;
			  $scope.positionmaster.category.id=p.category.id;
		 };
		//----------------update Position details-------------------------
		
		 
				
		  $scope.updatePositionDetails=function(position){
			  
			  $(".loader").fadeOut("slow");
			  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
			  
		    	if(position.positonname == undefined || position.positonname.match(letterNumber)){
		    				    	
			  position.userid=$rootScope.userdetails.id;
		
				 Master_Service.updatePositionDetails(position).then(function(response){
				  $scope.updatepositiondetails = response.data;	
			
				  $scope.getPositionCount(null);
				  $scope.fetchPositionMaster(0,10,null,null,null);
				  $scope.positionmaster={};
				  if($scope.updatepositiondetails.indexOf("success")!=-1){
					  
					  GlobalModule_notificationService.notification("success","Your Position Details updated successfully");
				  
					  $state.go('restricted.admin.positionmaster');
					 
					  $("#edit_position").modal('hide');
					  
				  }
				  else if($scope.updatepositiondetails =='failed'){
					  
					  GlobalModule_notificationService.notification("error","Position Name already exist");
					  $("#edit_position").modal('hide');
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
				GlobalModule_notificationService.notification("error","Please enter valid value");
			}
		};
    
    
    
}]);