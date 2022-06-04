var controllers = angular.module('LoginModule');

controllers.controller('Qualification_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
{
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
  
  //----------------View/fetch  Qualification list ------------------------- 
	 $scope.fetchQualificationList = function(offset,limit,colName,order,search){

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
			 
		 Master_Service.fetchQualificationList(offset,limit,colName,order,search).then(function(response){
			 $scope.qualificationList=response.data;
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchQualificationList(0,20,null,null,null);
	
	 
	 $scope.SortingfetchQualificationList = function(colName,searchterm){
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
			$scope.fetchQualificationList(0,20,$scope.colName,$scope.order,$scope.search);	
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
				 $scope.fetchQualificationList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
			};
			
	  $scope.getQualificationCount=function(search){
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
			 Master_Service.getQualificationCount($scope.search).then(function(response){
				$scope.count = response.data;
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
			
			},function(response){
				
				$(".loader").fadeOut("slow");
				
			});		
		};
		$scope.getQualificationCount(null);
	    
		
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
	        $scope.fetchQualificationList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	    };
		
		
		
	    /*------level list------*/
	    $scope.fetchLevelList = function(){	
	    	$scope.levelList=[];
	    	Master_Service.fetchLevelList().then(function(response){
				  $scope.levelList = response.data;	
			  },function(response){
					
				});
		  };
		  $scope.fetchLevelList();
		  
		  
		//-----------------save/insert  Qualification  in list-----------------------	
		  var onSaveLevelFlag=0;
		  $scope.saveQualificationDetails=function(qualification){ 
		  	  	
		  	  
			  $(".loader").show();
		  	  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
		  	  
		    	if(qualification.qualificationName != '' && qualification.qualificationName.match(letterNumber)){
		  	  
		  	 
		    		qualification.userid=$rootScope.userdetails.id;
		    		
		  		 Master_Service.saveQualificationDetails(qualification).then(function(response){
		  			  $scope.saveQualificationFlag= response.data;
		  			 $scope.qualification={};
		  			 // $scope.getQualificationCount(null);
		  			  $scope.fetchQualificationList(0,20,null,null,null);
		  			  qualification.qualificationName="";
		  			 $state.go('restricted.admin.qualification');
		  			 
		  			 if($scope.saveQualificationFlag.indexOf("success")!=-1){
		  				  GlobalModule_notificationService.notification("success","Your Qualification Details saved successfully");
		  				  $("#add_qualification").modal('hide');
		  				levelDisplayOnce=1;
		  				 // location.reload();
		  				 $scope.fetchLevelList();
		  			 }
		  			 else if($scope.saveQualificationFlag =='failed'){
		  				  GlobalModule_notificationService.notification("error","Qualification Name already exist");
		  				  $("#add_qualification").modal('hide');
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
		    	$(".loader").fadeOut("slow");
		  	  };
		  	  

		  	//----------------update  Qualification details-------------------------
		  		
		  	  $scope.updateQualificationDetails=function(qualification){

				  $(".loader").show();
			  	  var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  
			  	  
			    	if(qualification.qualificationName != '' && qualification.qualificationName.match(letterNumber)){
		  		  if(qualificationNameData==$scope.qualification.qualificationName && levelIddata==$scope.qualification.levelId)
		  			  {
	  				  GlobalModule_notificationService.notification("error","Please Change values");
		  			  }
		  		  else{
		  		$(".loader").show();
		  		$scope.qualification.userid=$rootScope.userdetails.id;
		         
		  			 Master_Service.updateQualificationDetails($scope.qualification).then(function(response){
		  			  $scope.updateFlag = response.data;	
		  			  	
	
		  			//  $scope.getQualificationCount(null);
		  			$scope.qualification={};
		  			levelDisplayOnce=1;
		  			  if($scope.updateFlag.indexOf("success")!=-1){
		  				  GlobalModule_notificationService.notification("success","Your Qualification  Details updated successfully");
		  				$scope.fetchLevelList();
		  				 $scope.fetchQualificationList(0,20,null,null,null);
		  				  $state.go('restricted.admin.qualification');
		  				 
		  				  $("#edit_qualification").modal('hide');
		  				  
		  			  }
		  			  else if($scope.updateFlag =='failed'){
		  				  GlobalModule_notificationService.notification("error","Qualification  Name already exist");
		  				  $("#edit_ qualification").modal('hide');
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
		  	  } 
		  		else
	    		{
	    		GlobalModule_notificationService.notification("error","Please enter valid value");
	    		}
	    	$(".loader").fadeOut("slow");
		  	  };
		  	  
		  	$scope.qualification={};
		  	var levelDisplayOnce=1;
		  	var qualificationNameData="";
		  	var levelIddata=0;
		  	 $scope.qualificationData = function(p){
				  $scope.qualification.id=p.id;
				  $scope.qualification.qualificationName=p.qualificationName;
				  qualificationNameData=p.qualificationName;
				  $scope.qualification.level=p.level;
				  levelIddata=p.levelId;
				 // alert(p.levelId);
				  $scope.qualification.levelId=p.levelId;
				  if(levelDisplayOnce==1)
					  {
					  onSaveLevelFlag=1;
				  $scope.levelList.push($scope.qualification);
					  }
				  levelDisplayOnce=0;
				  
			  };
			  
			  
			//----------------delete  Qualification from list ------------------------- 
			  
			   //----------Get no of checked position-------
					  
					  $scope.getCheckedQualificationid=[];
					  
					  $scope.checkedQualificationList= function(id){			  
						  
						  if($scope.getCheckedQualificationid.indexOf(id) !== -1)
						  {		
						  var array  = $scope.getCheckedQualificationid;
						  var index = array.indexOf(id);
						  $scope.getCheckedQualificationid.splice(index,1);
						  }else
						  {		    	
					      $scope.getCheckedQualificationid.push(id);				      
						  };						  
					  };
					 
					  $scope.checkedAllList = function(listedQualification,rd){				  
						  if(rd == true || rd == undefined){				 
						  for(var i=0; i<listedQualification.length; i++){					  
							  
							  //if already exist in getCheckedtemplateid than don't pass
							  if($scope.getCheckedQualificationid.indexOf(listedQualification[i].id) !== -1)   {  						 
							  }else{
								  $scope.checkedQualificationList(listedQualification[i].id);	
							  }
							  
						  }			
						  }else{
							  $scope.getCheckedQualificationid=[];
						  }
					  };
				
					  $scope.check = function(){	
						
					  if($scope.getCheckedQualificationid.length == 0){
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
		    $("#deletelist").modal('show');
			  Master_Service.deleteQualificationFromList($scope.formlist,$scope.getCheckedQualificationid).then(function(response){
			  $scope. qualificationflag = response.data;	
		//	$scope.getQualificationCount(null);
			  $scope.fetchQualificationList(0,20,null,null,null);
			  $scope.getCheckedQualificationid=[];
			 //location.reload();
			  if($scope.qualificationflag.indexOf("success")!=-1){
				  GlobalModule_notificationService.notification("success","Record deleted successfully");
				  $scope.fetchLevelList();
			  }else{
				  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				 
			  }
			  $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	};
  
			
	 $scope.clear=function(){
		  
		  $scope.qualification={
				
				  qualificationName:""
					  
			};
		  if(onSaveLevelFlag==1)
			  {
			 
			  $scope.levelList.pop();
			  onSaveLevelFlag=0;
			  levelDisplayOnce=1;
			  }
	  		  
		}; 
	
	     
}]);