var controllers = angular.module('LoginModule');

controllers.controller('ShipsMaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
   
    
  //----------------View/fetch Position list ------------------------- 
	 $scope.fetchShipMaster = function(offset,limit,colName,order,search){
	
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
			 
		 Master_Service.fetchShipMaster(offset,limit,colName,order,search).then(function(response){
			 $scope.shipsList=response.data;
			////console.log($scope.shipsList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchShipMaster(0,10,null,null,null);
	 
//-----------sorting position master list-----
	 
	 $scope.SortingShipsMasterList = function(colName,searchterm){
		  $scope.offset =0
		  ;
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
			$scope.fetchShipMaster(0,10,$scope.colName,$scope.order,$scope.search);	
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
					 $scope.fetchShipMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
				};
				
		  $scope.getShipsCount=function(search){
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
				 Master_Service.getShipsCount($scope.search).then(function(response){
					$scope.count = response.data;
				
					if($scope.count>$scope.limit){
						$scope.setButton();
					}
				
				},function(response){
					
					$(".loader").fadeOut("slow");
					
				});		
			};
			$scope.getShipsCount(null);
		    			
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
		        $scope.fetchShipMaster($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		    };
		    //----pagination end------
		   
	/* $scope.updatePosition=function(p)
	 {
		 $scope.positiondata.positonname=p.positonname;
		 
	 }
	*/
		    $scope.fetchBrandsList = function(){		  
		    	Master_Service.fetchBrandsList(0,1000,null,null,null).then(function(response){
					  $scope.brandsList = response.data;
					  ////console.log($scope.brandsList);
				  },function(response){
						
				});
			  };
			  $scope.fetchBrandsList();
	    
		$scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				 $scope.fetchShipMaster();
			};
		
	//----------------delete Position from list ------------------------- 
			  
			   //----------Get no of checked position-------
					  
					  $scope.getCheckedshipid=[];
					  
					  $scope.checkedshipsList = function(id){			  
						  
						  if($scope.getCheckedshipid.indexOf(id) !== -1)
						  {		
						  var array  = $scope.getCheckedshipid;
						  var index = array.indexOf(id);
						  $scope.getCheckedshipid.splice(index,1);
						  }else
						  {		    	
					      $scope.getCheckedshipid.push(id);				      
						  };						  
					  };
					 
					  $scope.checkedAllList = function(listedShips,rd){
						  
						  if(rd == true || rd == undefined){
							  
						  for(var i=0; i<listedShips.length; i++){					  
							  
							  //if already exist in getCheckedpoitionid than don't pass
							  if($scope.getCheckedshipid.indexOf(listedShips[i].id) !== -1)   {  						 
							  }else{
								  $scope.checkedshipsList(listedShips[i].id);	
							  }
							  
						  }			
						  }else{
							  $scope.getCheckedshipid=[];
						  }
					  };
					  
					  
					  $scope.check = function(){				  
					  if($scope.getCheckedshipid.length == 0){
						  
						  GlobalModule_notificationService.notification("error","Please select any record");
						  
					  }
					  else{
						  
						  $('#deletelist').modal('show');
						  }			  
					  };
				//-----------------------------------------------------------------------	  
					
			
	  $scope.deletefromList = function(formlist){
		  
		  $(".loader").show();
		  
		  $scope.formlist=formlist;
		
			  Master_Service.deleteShipsFromList($scope.formlist,$scope.getCheckedshipid).then(function(response){
			  $scope.shipflag = response.data;	
			  $scope.getShipsCount(null);
			  $scope.fetchShipMaster(0,10,null,null,null);
			  $scope.getCheckedshipid=[];
			  if($scope.shipflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record deleted successfully");
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  
	  
	  
    //-----------------save/insert position in list-----------------------	
	  
	  $scope.saveShipsDetails=function(ship){ 
		  			  
		  $(".loader").show();
		
		  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
		  
		  if(ship.brands.id == undefined || ship.brands.id == null || ship.brands.id == 0)
		  {
			  GlobalModule_notificationService.notification("error","Please select brand");
			  $(".loader").fadeOut("slow");
		  }
		  
	    if(ship.shipName != undefined || ship.shipName.match(letterNumber)){
		  
		 
		  ship.userid=$rootScope.userdetails.id;
	
			 Master_Service.saveShipsDetails(ship).then(function(response){
				  $scope.saveshipdetails = response.data;
			
				  
				  $scope.shipmaster={};
				
				 if($scope.saveshipdetails.indexOf("success")!=-1){
					 
					  GlobalModule_notificationService.notification("success","Your Ship Details saved successfully");
					  
					  $("#add_ship").modal('hide');
					  
					  $scope.getShipsCount(null);
					  
					  $scope.fetchShipMaster(0,10,null,null,null);
					  
					  
					  $state.go('restricted.admin.shipmaster');
				 }
				 else if($scope.saveshipdetails =='failed'){
					 
					  GlobalModule_notificationService.notification("error","ship Name already exist");
					  
					  $("#add_ship").modal('hide');
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
			 
			  $scope.shipmaster = {
					  shipName:"",
					  brands:{
						  id:0
					           }			  
		  };
		 }; 
	
		  $scope.shipdata=function(s){
			  
			  $scope.shipmaster = {
					  shipName:"",
					  brands:{
						  id:0
					  }
			  };
			  $scope.shipmaster.id=s.id;
			  $scope.shipmaster.shipName=s.shipName;
			  $scope.shipmaster.brands.id=s.brands.id;
		 };
		//----------------update Position details-------------------------
						
		  $scope.updateShipDetails=function(ship){
			  
			  $(".loader").show();
			  
			  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			  
			  if(ship.brands.id == undefined || ship.brands.id == null || ship.brands.id == 0)
			  {
				  GlobalModule_notificationService.notification("error","Please select brand");
				  $(".loader").fadeOut("slow");
			  }
			  
		    	if(ship.shipName != undefined || ship.shipName.match(letterNumber)){
		    				    	
			  ship.userid=$rootScope.userdetails.id;
		
				 Master_Service.updateShipDetails(ship).then(function(response){
					 
				  $scope.updateshipdetails = response.data;	
				  
				  $scope.shipmaster={};
				  
				  if($scope.updateshipdetails.indexOf("success")!=-1){
					  
					  GlobalModule_notificationService.notification("success","Your Ship Details updated successfully");						  
					 
					  $("#edit_ship").modal('hide');
					  
					  $scope.getShipsCount(null);
					  
					  $scope.fetchShipMaster(0,10,null,null,null);
					  					  
					  $state.go('restricted.admin.shipmaster');
					  
				  }
				  else if($scope.updateshipdetails =='failed'){
					  
					  GlobalModule_notificationService.notification("error","ship Name already exist");
					  $("#edit_ship").modal('hide');
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