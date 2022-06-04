'use strict';

var services = angular.module('LoginModule');


services.service('Employee_Expenses',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.fetchExpensesList = function(offset,limit,colName,order,search,userid,RoleId,approverTabFlag){             
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchemplexpenselist/'+offset+'/'+limit+'/'+colName+'/'+order+'/'+search+'/'+userid+'/'+RoleId+'/'+approverTabFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getExpenseListCount = function(searchterm,roleId,approverTabFlag){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/getexpenseslistcount/'+searchterm+'/'+roleId+'/'+approverTabFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
			
	this.saveExpenseStatusDetails = function(statusDetails){
		
		var promise = $http({
			method : 'POST',
			data : statusDetails,
			url : 'rest/expenses/saveexpensestatusdetails/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.fetchExpensesStatus = function()
	{
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchexpensesstatus/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.saveExpenseStatusDetails = function(statusDetails){
		
		var promise = $http({
			method : 'POST',
			data : statusDetails,
			url : 'rest/expenses/saveexpensestatusdetails/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.submitAprrovedList = function(expenseObj,roleId){
		
		var promise = $http({
			method : 'POST',
			data : expenseObj,
			url : 'rest/expenses/submitaprrovedlist/'+roleId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveExpensesPaymentDetails = function(expenses){
		
		var promise = $http({
			method : 'POST',
			data : expenses,
			url : 'rest/expenses/saveExpensesPaymentDetails/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	

	this.fetchClaimReportMonthly = function(claimedId,fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchclaimreportmonthly/'+claimedId+'/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.fetchClaimReport = function(fromDate,toDate){
		
		var promise = $http({
			method : 'GET',

			url : 'rest/expenses/fetchClaimReport/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};

this.fetchClaimReport = function(claimedId){
		
		var promise = $http({
			method : 'GET',

			url : 'rest/expenses/fetchClaimReport/'+claimedId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};

	
	this.getClaimReportMonthlyCount = function(fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/getclaimreportmonthlycount/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.getOracleReportMonthlyCount = function(fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/getoraclereportmonthlycount/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.fetchClaimReportPaymentDetails = function(fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchclaimreportpaymentdetails/'+fromDate+'/'+toDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	
	this.getClaimReportPaymentDetailsCount = function(fromDate,toDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/getclaimreportpaymentdetailscount/'+fromDate+'/'+toDate,
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