'use strict';

var services = angular.module('LoginModule');


services.service('Profile_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.fetchUserProfile = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/userprofiledetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.checkUserPassport = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/checkUserPassport/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
		
	this.savePersonaldetails = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addpersonaldetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchQualifications = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/qualification',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.addEducationDetails = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addeducationdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveworkExperience = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/adduserworkdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.fetchCurrencies = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/currencylist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.fetchCountries = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/countrylist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchStateList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/stateslist/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchCityList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/citylist/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveUserContact = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addcontactdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchMyApplications = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/myapplications/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveUserCV = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addusercvdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveUserCVImages = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addusercvimagesdetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchCompliances = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/documentnameForCompliance',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.addComplianceDetails = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/addcompliancedetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//-------To do List----------------
	this.fetchAppliedJobsDetails = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/appliedjobsdetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchCompliancebyJob=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/compliancelistbyjob/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchAppliedStatus=function(id){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchappliedstatus/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
	};
	

	this.fetchHotelListForEmployer = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchhotellistforemployer/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	
		
this.fetchComplianceForm=function(complianceId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchcomplianceform/'+complianceId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchSourceOfInfoList=function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchsourceofinfolist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	// for Deactivating account
	this.deactivateAccount = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/purge/deactivateaccount',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	/*this.readOcr = function(passportImage){
		var promise = $http({
			method : 'GET',
		    //url : 'rest/user/readOcr/'+passportImage,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	 
	this.checkValidPassport = function(passNo){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/checkValidPassport/'+passNo,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.adduserPassport = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/adduserPassport',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.readOcr = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
		    url : 'rest/user/readOcr',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	 
/*this.fetchPassportdata=function(){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchPassportdata',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	
	this.fetchPassportdata = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchPassportdata/'+userid,

			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.updatePassportOnReupload = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/upadatePassportdataonreupload/'+userid,

			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.updatePassportData = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/user/updatePassportData',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.showPassportData = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/showPassportData/'+userid,

			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.checkRoleSpecificCompliances = function(userjob){
		var promise = $http({
			method : 'POST',
			data : userjob,
			url : 'rest/user/checkRoleSpecificCompliances',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchUserComplianceMandatoryDetails = function(compliances_mandatory_fetch,check_compliances){
		var promise = $http({
			method : 'POST',
			data : compliances_mandatory_fetch,check_compliances,
			url : 'rest/user/fetchUserComplianceMandatoryDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.updateWithdrawApplicationStatus=function(userJobId,userid){
			
			var promise = $http({
				method : 'POST',
				url : 'rest/user/updateWithdrawApplicationStatus/'+userJobId+'/'+userid,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
			
		};
		
		this.displayCandidateJourneyLogsInactiveJobs = function(flag,userJobId,userid){
			var promise = $http({
				method : 'GET',
				url : 'rest/user/displayCandidateJourneyLogsInactiveJobs/'+flag+'/'+userJobId+'/'+userid,

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
