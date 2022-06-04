'use strict';

var services = angular.module('LoginModule');


services.service('Employee_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
this.fetchCompliancebyJob=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emptodo/compliancelistbyjob/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.addComplianceDetails = function(compliances){
		var promise = $http({
			method : 'POST',
			data:compliances,
			url : 'rest/emptodo/addcompliancedetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchComplianceDetails=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/emptodo/fetchcomplaincedetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPostings=function(posting,id){
				
		var promise = $http({
			method : 'GET',
			url : 'rest/postings/fetchpostings/'+id+'/'+posting,
			headers : {
				'Content-Type' : 'application/json'			
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchReimbursmentType=function(){		
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchReimbursmentType',
			headers : {
				'Content-Type' : 'application/json'			
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};	
	
	this.fetchExpenseStatus=function(){		
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchexpensesstatus',
			headers : {
				'Content-Type' : 'application/json'			
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};	
	 
	this.askReimbursement = function(ExpenseDataObj){
		var promise = $http({
			method : 'POST',
			data:ExpenseDataObj,
			url : 'rest/expenses/askReimbursement',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchEmployeeExpenseList = function(offset,limit,colName,order,search,userid,RoleId,approverTabFlag){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchemplexpenselist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+userid+"/"+RoleId+"/"+approverTabFlag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fecthExpenseListCount = function(search,categoryId,statusId,EmpId,RoleId){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/getexpenseslistcount/'+search+"/"+categoryId+"/"+statusId+"/"+EmpId+"/"+RoleId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.CheckClaimAvailablility = function(reimbursementTypeId,UserId){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/CheckClaimAvailablility/'+reimbursementTypeId+"/"+UserId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchexpenseHead = function(reimbursementTypeId,brandId){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchexpenseHead/'+reimbursementTypeId+'/'+brandId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.claimExpense = function(expensedetails){
		var promise = $http({
			method : 'POST',
			data: expensedetails,
			url : 'rest/expenses/claimExpense',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.deletefromlist= function(id,claimedId){
		
		var promise = $http({
			method : 'POST',
			url : 'rest/expenses/deletefromlist/'+id+'/'+claimedId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchLatestClaimedList= function(id,colName,order,user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/expenses/fetchlatestclaimedlist/'+id+'/'+colName+'/'+order,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchactivatedId = function(claimedId,id,user){
		
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/expenses/fetchactivatedId/'+claimedId+'/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};

	this.fetchBrandAmount= function(id1,id2){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchbrandamount/'+id1+'/'+id2,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	
	this.submitClaimedList= function(claimedId){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/submitclaimedlist/'+claimedId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};	
	
	this.fetchTransportMode = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/expenses/fetchtransportmode',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchSummaryReport = function(claimedId){
		
		var promise = $http({
			method : 'GET',

			url : 'rest/expenses/fetchSummaryReport/'+claimedId,
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