

'use strict';

var services = angular.module('LoginModule');


services.service('quesCategory_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	
	this.fetchquestioncategory = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/questioncategory/fetchquestioncategory/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getCategoryCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/questioncategory/getcategorycount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
//-------------------------------------------------------	
	 
	//----delete category from  List--------------------
	
	this.deleteCategoryFromList = function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/questioncategory/deleteCategoryFromlist',
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
//----------------------------------------------------------
	
	//----insert category in List--------------------------
	
	this.saveCategoryDetails = function(category){
		var promise = $http({
			method : 'POST',
			data : category,
			url : 'rest/questioncategory/saveCategoryDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
//----------------------------------------------------------	

	//----update category from  List------------------------
	
	this.updateCategoryDetails = function(templatetype){
		var promise = $http({
			method : 'POST',
			data : templatetype,
			url : 'rest/questioncategory/updateCategoryDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//--------------------------------------------------
	
	this.fetchCategoryById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/questioncategory/fetchCategoryById/'+id,
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
	
   //---------------------End of Template type master----------------------------------	