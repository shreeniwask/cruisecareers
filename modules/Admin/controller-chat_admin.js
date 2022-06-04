'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('chatAdmin_Ctrl',['$scope','$rootScope','$location','chatAdmin_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Login_Service', function ($scope, $rootScope,$location,chatAdmin_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Login_Service){
	
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');


	$scope.fetchonlineusers = function(){			
		chatAdmin_Service.fetchonlineusers().then(function(response){
		$scope.result = response.data;
		
		//console.log($scope.result);
	});
	};
	$scope.fetchonlineusers();	
			
	$scope.fetchchaturl = function(){
		 Login_Service.fetchchaturl().then(function(response){
			 $scope.ChatUrl = response.data;			
			 });	 
	 }; $scope.fetchchaturl();
	 
	$scope.count =1;
	$scope.Idlist =[];
	$scope.indexCount = 0;
	
	$scope.setflag = function(x){		
	$scope.Idlist.push(x.id);	
	$scope.Tohide = $scope.Idlist[$scope.indexCount];	
	$scope.iframeId = x.id;		
	
		//if open alreadyly dont open
		if(document.getElementById($scope.iframeId) == null){
			
			var newEle = angular.element("<div class='tab-pane active'><iframe id='"+$scope.iframeId+"' height='500' width='250' style='float: left;margin: 10px 10px; scrolling=no !important;'></iframe></div> ");
		    var target = document.getElementById('target');
		    angular.element(target).append(newEle);		    
		    $scope.count = $scope.count+1;
		    
		$scope.flag = 1;		
		$scope.url= $scope.ChatUrl+'#/'+$scope.userdetails.id+'/'+$scope.userdetails.roleId+'/'+$scope.userdetails.firstName+'/'+x.roomId;		
		document.getElementById($scope.iframeId).src = $scope.url;		
		
		//if 4th one hide first one in the list
		if($scope.count > 4){
			$scope.indexCount++;			
	 		angular.element(document.getElementById($scope.Tohide)).hide();	
	 	}
		}else{
			
			if($scope.count > 4){
				$scope.indexCount++;			
		 		angular.element(document.getElementById($scope.Tohide)).hide();	
		 	}
			
			angular.element(document.getElementById($scope.iframeId)).show();			
		}
		
			
	};
		 
}]);