'use strict';
var services = angular.module('LoginModule');


services.service('ExpenseMaster_service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.getExpenseMasterList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/fetchExpenseMasterlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.brandsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/expneseHeadSetting/brandsList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.selectedbrandList = function(brandsList){
		var promise = $http({
			method : 'POST',
			data : brandsList,
			url : 'rest/expensemaster/selectedbrandList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.saveExpenseDetails = function(expense){
		var promise = $http({
			method : 'POST',
			data : expense,
			url : 'rest/expensemaster/insertExpenseMaster',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	
	this.saveExpenseSubHead = function(subhead){
		var promise = $http({
			method : 'POST',
			data : subhead,
			url : 'rest/expensemaster/saveExpenseSubHead',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deleteFromList = function(fromlist,id){
		
		//console.log(id);
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/expensemaster/deleteFromList',
			headers : {
				'Content-Type' : 'application/json',
				'fromlist' :fromlist
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.getExpenseListCount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/getExpenseListCount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSubHead = function(ParentId){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/fetchSubHead/'+ParentId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
/*	this.brandDetails = function(ParentId,subHeaId){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/brandDetails/'+ParentId+"/"+subHeaId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/

this.brandDetails = function(ParentId){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/brandDetails/'+ParentId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSettingData = function(subHeaId){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/fetchSettingData/'+subHeaId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.deleteSubHead = function(subheadId){           
		 
		var promise = $http({
			method : 'GET',
			url : 'rest/expensemaster/deletesubhead/'+subheadId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
}]);