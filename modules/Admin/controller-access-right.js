var controllers = angular.module('LoginModule');

controllers.controller('AccessRight_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','AccessRight_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,AccessRight_Service)
{
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    $scope.freequery=GlobalModule_dataStoreService.loadData('LoginModule','freequery');
    //console.log($scope.freequery);
	$scope.selectedQuery = GlobalModule_dataStoreService.loadData('LoginModule','data');
    //console.log($scope.selectedQuery);
    $scope.freeQueryId= $scope.selectedQuery.queryId;
    
    $scope.accessRights={};
   
    
    
    
    
 	$scope.fetchFreeQueryAccessRight = function(freeQueryId){
		  $(".loader").show();
	
		  AccessRight_Service.fetchFreeQueryAccessRight($scope.freeQueryId).then(function(response){
			  $scope.queryRights = response.data;
			  $scope.userPermissions=$scope.queryRights;
			 // console.log($scope.userPermissions);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  $scope.fetchFreeQueryAccessRight($scope.freeQueryId);
 	
	  //to select 
	  
$scope.selectOption = function(val) {
		  
		  for(var i=0;i< $scope.userPermissions.length;i++)
			{
			  if(val == 1){
				  $scope.userPermissions[i].edit = true;
			  }
			 
			  if(val == 2){
				  $scope.userPermissions[i].del = true;
			  }
			}
};

$scope.addnewuser = function(){
	$scope.userPermissions.push({ 
		  'add': "true"
	  });  		
};
	  
 	$scope.fetchUserForAccessRights = function(){
		  $(".loader").show();
	
		  AccessRight_Service.fetchUserForAccessRights().then(function(response){
			  $scope.userList = response.data;
			  
			 // console.log($scope.userList);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	 $scope.fetchUserForAccessRights();
	 
	 $scope.userPermissions={};
	 
	 $scope.SaveAccessRightsFreeQuery=function(){
		
		 $scope.match = false;
		 $scope.accessRights.userid=$rootScope.userdetails.id;
		 $scope.accessRights.id= $scope.freeQueryId;
		 $scope.accessRights.userPermissions=$scope.userPermissions;
		 
		 for (var j=0;j<$scope.accessRights.userPermissions.length;j++) {
			    for (var k=j+1;k<$scope.accessRights.userPermissions.length;k++) {
			        if ($scope.accessRights.userPermissions[k].user.id == $scope.accessRights.userPermissions[j].userid){ 		        	
			        	$scope.match = true;		            
			        }
			    }
			}	
			
			if($scope.match == true){
			GlobalModule_notificationService.notification("error","You can't add the same user more than once. Please remove duplicate users!");	
			} else{
		 
		 
		 AccessRight_Service.SaveAccessRightsFreeQuery($scope.accessRights).then(function(response){
		  $scope.result = response.data;
		  
		  if($scope.result.indexOf("success")!=-1)
		  {
			  
			  GlobalModule_notificationService.notification("success","Record updated successfully");
				 $state.go("restricted.admin.freequerylist");

			  
		  }else{
			  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
		  }			   
		  $(".loader").fadeOut("slow");
	  },function(response){
		  $(".loader").fadeOut("slow");
		});
			}
	};
$scope.UserIds=[];
$scope.addUser=function(id){
	$scope.UserIds =id;
	//console.log($scope.UserIds);
};

$scope.removeuser = function(id) {
	//alert(id);
	  var userp = $scope.userPermissions[id];
	  if(null!=userp.user)
		  {
	  var userList={};
	  userList.id=userp.user.id;
	  userList.name=userp.user.firstName+" "+userp.user.lastName;
	  $scope.userList.push(userList);
		  }
	  $scope.userPermissions.splice(id, 1);
};


$scope.getUserRightsCount = function(freeQueryId){
	  $(".loader").show();

	  AccessRight_Service.getUserRightsCount($scope.freeQueryId).then(function(response){
		  $scope.count = response.data;
		  
		  //console.log($scope.count);
		 
		  $(".loader").fadeOut("slow");
	},function(response){
		$(".loader").fadeOut("slow");
		});
};
$scope.getUserRightsCount();


$scope.deleteUserAccess = function(accessRightId){
	  
	$(".loader").show();			  
	
	AccessRight_Service.deleteUserAccess(accessRightId).then(function(response){
	    	
		 var deleteStatusFlag = response.data;				   
		
		 $(".loader").fadeOut("slow");
		 
	 },function(response){
		  $(".loader").fadeOut("slow");
});
};

}]);