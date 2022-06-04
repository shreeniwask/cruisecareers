var controllers = angular.module('LoginModule');

controllers.controller('UserJobFairYourSlot_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','UserJobFair_Service','Admin_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,UserJobFair_Service,Admin_Service)
{
	
	$scope.fetchSelectedUserSlot = function(){
		  $(".loader").show();
	
		  UserJobFair_Service.fetchSelectedUserSlot($rootScope.userdetails.id).then(function(response){
			  $scope.userSelectedSlot = response.data;
			  
			  //console.log($scope.userSelectedSlot);
			 
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
	  };
	  
	  
	  $scope.fetchSelectedUserSlot();
	
	  $scope.dateformate = function(date){		     
	        var dateOut = moment(date).format("DD-MM-YYYY");
	        return dateOut;
	    };

}]);