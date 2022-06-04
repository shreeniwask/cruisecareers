'use strict';

var controllers = angular.module('GlobalModule');


controllers.controller('TestCtrl' , ['$scope','$http','GlobalModule_dataStoreService', function ($scope,$http,GlobalModule_dataStoreService){
	/*$scope.test = function(){
		$http({
			method : 'GET',
			url : 'services/dashboard/toprestaurantwithdetails/11',
			headers : {
				'Accept-Type' : 'text/event-stream'
			},
			cache : false
		}).success(function(data, status) {
			console.log('Test Success------------------------------------------------');
		}).error(function(status){
			console.log('Error');
		});
	};*/	
	
	/*$scope.test = function(){
		$http({
			method : 'GET',
			url : 'services/ping',
			headers : {
				'Accept-Type' : 'text/event-stream'
			},
			cache : false
		}).success(function(data, status) {
			console.log('Test Success------------------------------------------------');
		}).error(function(status){
			console.log('Error');
		});
	};*/
	
	/*$scope.test = function(){
		//GlobalModule_dataStoreService.storeData('GlobalModule','key1',"Test........");
		//GlobalModule_dataStoreService.storeData('GlobalModule','key2',"Test123");
		alert(GlobalModule_dataStoreService.loadData('GlobalModule','key2'));
	};*/
	
	/*$scope.test = function(){
		alert(Modernizr.localstorage);
	};*/
	
	
	//   V-TIGER
	/*$scope.test = function(){
		//V-TIGER
		$http({
			method : 'GET',
			url : 'services/vtiger/login/admin/ikx8YGQ8maqSqnZH',
			headers : {
				'Accept-Type' : 'application/json'
			},
			cache : false
		}).success(function(response, status) {
			console.log(response);
			var testModuleName = 'HelpDesk';
			//CREATE
			var details = '{"test":"testttt","ticket_title":"ONLINE PROBLEM","ticketstatus":"In Progress","assigned_user_id":"19x1"}';
			var sessionName = response.sessionName;
			var userId = response.userId;
			
			var tiger = '{"sessionName":"'+sessionName+'","userId":"'+userId+'","moduleName":"'+testModuleName+'","details":'+details+'}';
			
			$http({
				method : 'POST',
				url : 'services/vtiger',
				data : tiger,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).success(function(response, status) {
				console.log(response);
				
				var testModuleName = 'HelpDesk';
				//UPDATE
				var details = '{"test":"testttt","ticket_title":"ONLINE PROBLEM UPDATE","ticketstatus":"In Progress","assigned_user_id":"19x5","id":"'+response.id+'","ticket_no":"'+response.ticket_no+'"}';
				var tiger = '{"sessionName":"'+sessionName+'","userId":"'+userId+'","moduleName":"'+testModuleName+'","details":'+details+'}';
				
				$http({
					method : 'PUT',
					url : 'services/vtiger',
					data : tiger,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).success(function(response, status) {
					console.log(response);
					//RETRIEVE
					var tiger = '{"sessionName":"'+sessionName+'","userId":"'+userId+'","record_id":"'+response.id+'"}';
					// for QUERY -- var tiger = '{"sessionName":"'+sessionName+'","userId":"'+userId+'","query":"select * from HelpDesk"}';
					
					$http({
						method : 'POST',
						url : 'services/vtiger/retrieve',
						// for QUERY -- url : 'services/vtiger/query',
						data : tiger,
						headers : {
							'Content-Type' : 'application/json'
						},
						cache : false
					}).success(function(response, status) {
						console.log(response);
						
						//DELETE
						var details = '{"id":"'+response.id+'"}';
						var tiger = '{"sessionName":"'+sessionName+'","userId":"'+userId+'","details":'+details+'}';
						
						$http({
							method : 'POST',
							url : 'services/vtiger/delete',
							data : tiger,
							headers : {
								'Content-Type' : 'application/json'
							},
							cache : false
						}).success(function(response, status) {
							console.log(response);
						}).error(function(status){
							console.log('Error');
						});
						
					}).error(function(status){
						console.log('Error');
					});
				}).error(function(status){
					console.log('Error');
				});
			}).error(function(status){
				console.log('Error');
			});
		}).error(function(status){
			console.log('Error');
		});
	};*/
	
	/*$scope.test = function(){
		$http({
			method : 'GET',
			url : 'services/common/statictext',
			headers : {
				'Accept-Type' : 'application/json'
			},
			cache : false
		}).success(function(data, status) {
			console.log('Test Success------------------------------------------------');
		}).error(function(status){
			console.log('Error');
		});
	};*/
	
	
	
}]);