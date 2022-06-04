'use strict';

var services = angular.module('LoginModule');


services.service('Login_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.brandsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/brandslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchHomeImagesList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/homeImageslist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchTestimonialsList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/testimonials',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.readDetailsOfTestimonials = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchTestimonialsById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchCategoryList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchCategories',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchPositionList = function(jobTyped){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchPositions/'+jobTyped,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchJobResult = function(id,flag,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchjobs/'+id+"/"+flag+"/"+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchHotJobs = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchAllHotJobs',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchJobById = function(id,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchJobById/'+id+"/"+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchJobSearchResult = function(job,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchjobsSearch/'+job+"/"+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.insertRecentSearch = function(recent){
		var promise = $http({
			method : 'POST',
			data : recent,
			url : 'rest/user/insertRecentSearch',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchRecentSearch = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchRecentSearch/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.getRegister = function(user){
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/session/getRegister',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.isEmailPresent = function(email){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/isemailpresent/'+email,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.getLogin = function(user){
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/session/login',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.resendActivationLink = function(emailid){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/resendactivationlink/'+emailid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	
	this.getEmpStatus = function(userid){
		/*var user = {}
		user.userid = userid*/
		var empstatus = $http({
			method : 'GET',
			//data : user,
			url : 'rest/session/getempstatus/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return empstatus;	
	}

	this.logout = function(user){

		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/session/logout',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.forgetPassword = function(user){
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/session/forgetPassword',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.checkUserAppliedForAnotherjob = function(userid){
		var promise = $http({
			method : 'POST',
			url : 'rest/user/checkUserAppliedForAnotherjob/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.applyForJob = function(job){
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/user/applyForJob',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.notify = function(job){
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/user/notify',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.referFriends = function(job){
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/user/referFriends',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};


	this.registerSocialLogin = function(userdata){
		var promise = $http({
			method : 'POST',
			data : userdata,
			url : 'rest/session/registersocialLogin',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};	

	this.fetchchaturl = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/fetchchaturl',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	//fetch notification for user
	this.fetchNotification=function(userid){		
		var promise = $http({
			method : 'GET',		
			url : 'rest/user/notificationstatus/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.makeSeenNotification= function(userid){
		var promise = $http({
			method : 'POST',			
			url : 'rest/user/seennotificationstatus/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};


	this.fetchAllNotifications=function(userid){		
		var promise = $http({
			method : 'GET',		
			url : 'rest/user/fetchallnotification/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchconfigproperties=function(){		
		var promise = $http({
			method : 'GET',		
			url : 'rest/session/fetchconfigproperties',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};

	this.fetchUnseenNotifications=function(userId,flag){		

		var offset=0;
		var limit=1000;

		var promise = $http({
			method : 'GET',		
			url : 'rest/mynotificaion/fetchnotification/'+offset+'/'+limit+'/'+userId+'/'+flag,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	this.fetchCallNotifications=function(callSourceId){		
		var promise = $http({
			method : 'GET',		
			url : 'rest/call/incomingcalls/'+callSourceId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	this.closeTicket = function(ticketId){             
		var promise = $http({
			method : 'POST',
			url : 'rest/call/close_call/'+ticketId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	
	this.sendOtpToUsers = function(user){
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/session/sendotptousers',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};


	this.validateUserOtp = function(userotp){
		var promise = $http({
			method : 'POST',
			
			url : 'rest/session/validateuserotp/'+userotp,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	
	this.resetForgetPassword = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/session/resetforgetpassword',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	
	this.getUserContactByEmailId = function(email){
		var promise = $http({
			method : 'GET',
			url : 'rest/user/getusercontactbyemail/'+email,
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
