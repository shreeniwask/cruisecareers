'use strict';

var services = angular.module('LoginModule');


services.service('Admin_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	
	
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
	
	this.fetchAppliedJobs = function(offset,limit,colName,order,search,advancesearch,activefilter){
		var promise = $http({
			method : 'POST',
			data: advancesearch,
			url : 'rest/admin/appliedjobs/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+activefilter,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	
	
	this.fetchpostedJobList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/allPostedJobs/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getPostedJobcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/getpostedjobcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchpositonbydipartment = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchpositonbydipartment/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.fetchassessmentlist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchassessmentlist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	
	this.savePostJob = function(job){		
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/admin/savePostedJob',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.insertTemplate = function(job){		
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/admin/insertTemplate',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.updatePostedJob = function(job){		
		var promise = $http({
			method : 'POST',
			data : job,
			url : 'rest/admin/updatePostedJob',
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
		
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/admin/deletefromlist',
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
	
	this.fetchcompliancelist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchcompliancelist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	this.ratingList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/rating',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.experianceList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/experiance',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPersonRoleMappingTypeList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/pesonrolemappingtype',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchPostedJobById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchpostedjobbyid/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.statuslist = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/getstatuslist/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.changeHotJob = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/changeHotJob/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	
	this.changestatus = function(jobid,statusid){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/changestatus/'+jobid+"/"+statusid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.activeStutus = function(jobid,statusid){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/activeStutus/'+jobid+"/"+statusid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getAppliedJobcount = function(searchterm,advancesearch,activefilter){
		var promise = $http({
			method : 'POST',
			data:advancesearch,
			url : 'rest/admin/getappliedjobcount/'+searchterm+'/'+activefilter,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchProfileCompletion = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchProfileCompletion/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;			
	};
	
	this.fetchUserRatings = function(id,jobId){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchUserRatings/'+id+"/"+jobId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.fetchUserProfileDetails = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchUserProfileDetails/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.appliedJobComplianceLog = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/appliedJobComplianceLog/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.saveindosnumber = function(id,indosnumber){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/saveIndosNumber/'+id+"/"+indosnumber,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.appliedJobEducationalInfo = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/appliedJobEducationalInfo/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.getUpdatedStatusOfUser = function(userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/getUpdatedStatusOfUser/'+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	
	this.appliedJobContactInfo = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/appliedJobContactInfo/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.fetchCommunicationModes = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/communication/fetchcmnModeList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchTemplatetypeList = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/communication/fetchTemplatetypeList/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.fetchTmpltpreview = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/communication/fetchTemplatepreview/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.sendEmailtoUsers = function(user,templateid,modeId,adminid){
		
		//console.log(user);
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/communication/sendEmailtoUser',
			headers : {
				'Content-Type' : 'application/json',
					'templateid' : templateid,
					'modeId' : modeId,
					'adminid' : adminid
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};


	
this.EmailSecretUrl = function(emailId,currentTime,videoId,ExpiryMin,AdminId){	
	 
	var promise = $http({
		method : 'POST',
		url : 'rest/communication/EmailSecretUrl/'+emailId+"/"+currentTime+"/"+videoId+"/"+ExpiryMin+"/"+AdminId,
		headers : {
			'Content-Type' : 'application/json',				
		},
		cache : false
	}).then(function (response) {
        return response;
    });
	return promise;		
};
	
/*this.sendSharableLinkEmail = function(user,templateid){
		
		//console.log(user);
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/communication/sendEmailtoUser',
			headers : {
				'Content-Type' : 'application/json',
					'templateid' : templateid
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};*/
	
	this.fetchTemplateMaster = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
		
			url : 'rest/admin/fetchTemplateMaster/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getAcitveTemplateCount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/getAcitveTemplateCount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchtemplateId = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchtemplateId/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveTemplate = function(data){
		var promise = $http({
			method : 'POST',
			url : 'rest/admin/saveTemplate',
			data: data,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updateTemplate = function(data){
		var promise = $http({
			method : 'POST',
			url : 'rest/admin/updateTemplate',
			data: data,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
			
		}).then(function (response) {
	        return response;
	    });		
		return promise;		
	};
	
	this.updateUserJobStatus = function(userid,adminid){
		var promise = $http({
			method : 'POST',
			url : 'rest/admin/updateUserJobStatus/'+userid+'/'+adminid,
			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
			
		}).then(function (response) {
	        return response;
	    });		
		return promise;		
	};
	
	this.fetchtemplatetype = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchtemplatetype',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	/*-------Event Scheduler page-----*/ 
	
	this.fetchEventSchedulerList = function(offset,limit,colName,order,search,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/eventschedulerlist/'+userId+"/"+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getEventSchedulerListcount = function(searchterm,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/eventschedulerlistcount/'+userId+"/"+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchschedulardata = function(eventid){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchschedulardata/'+eventid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.addEventSlot = function(slot,eventId){
		
		var promise = $http({
			method : 'POST',
			data:slot,
			url : 'rest/event/addeventslot',
			headers : {
				'Content-Type' : 'application/json',
				'eventId' : eventId
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	this.addNewScheduler = function(user){
		var promise = $http({
			method : 'POST',
			data:user,
			url : 'rest/event/addnewscheduler',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchRatingForAll = function(){
		var promise = $http({
			method : 'POST',
			
			url : 'rest/admin/fetchRatingForAll',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.serachAdminUsers = function(eventid,search,userid){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/eventscheduler/searchuser/'+eventid+"/"+search+"/"+userid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.getSchedulerName = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/eventschedulerNameList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getSlotsByEventId = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchSlotsList/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
		this.fetchusersBysltId = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchusersBySlotId/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.assignslotstouser = function(slot){
		var promise = $http({
			method : 'POST',
			data:slot,
			url : 'rest/event/addAssignsSlottoUser',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	this.updateEvent = function(updateevent){
		var promise = $http({
			method : 'POST',
			data:updateevent,
			url : 'rest/event/updateEvent',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//fetch category for sms and email
	this.fetchTemplatetypeList = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchTemplatetypeList',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//fetch sms or email for specific category
	this.fetchSmsOrEmailTemplateList = function(id,mode){		
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchSmsOrEmailTemplateList/'+id+"/"+mode,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	// fetch category id
	this.fetchCategoryIdByTempId = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchCategoryIdByTempId/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	
	this.removeuUserBySlotId = function(slot){
		var promise = $http({
			method : 'POST',
			data: slot,
			url : 'rest/event/removeUsersBySlotId',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchcandidatelist = function(slotId,eventId){
		var promise = $http({
			method : 'GET',
			url : 'rest/event/fetchcandidatelist/'+slotId+"/"+eventId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.appliedJobAssessmentLog = function(jobId,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/appliedJobAssessmentLog/'+jobId+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.fetchAssignAssessment = function(userId,roleId){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchAssignAssessment/'+userId+"/"+roleId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	this.saveAssignAssessment = function(assessments){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/admin/saveAssignAssessment',
			data: assessments,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.saveassessmentslog = function(assessments){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/admin/saveassessmentslog',
			data: assessments,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getcommunicatioLogList = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/communicationlog/fetchcommunicationloglist/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	//--------------- Decision Log function -----------------
	this.fetchCustRequisitionList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/customerreq/customreqlist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	//--------------- Decision Log function end -----------------
	
	//--------------- Scheduler Log function -----------------
	this.getSchedulerLogList = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/schedulerlog/schedulerloglist/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	//--------------- Scheduler Log function end -----------------
	
	this.getUserActivityList = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/useractivity/fetchcUserActivityList/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	
	
	this.getStatusOfCandidate = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/getStatusOfCandidate/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
			
	this.addEmailmanagerEntry = function(user,templateid,modeid,userdetailsid){		
		var promise = $http({
			method : 'POST',
			data : user,
			url : 'rest/communication/addusercommunicationEntry',
			headers : {
				'Content-Type' : 'application/json',
					'templateid' : templateid,
					'modeid' : modeid,
					'userdetailsid' : userdetailsid,					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getsubtemplateTypeList = function(id){		
		var promise = $http({
			method : 'GET',
			url : 'rest/communication/fetchSubTypeTemplate/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
		
	};
	
	
	this.checkuserinslot = function(selectedUser,eventId){		
		var promise = $http({
			method : 'POST',
			data : selectedUser,
			url : 'rest/admin/checkuserinslot/'+eventId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
	};
	
	//----------to do list------------------------

	
this.fetchComplianceDetails=function(id){
		
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
	
//-------interview template-----

	this.fetchInterviewTemplates = function(){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchInterviewTemplates',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchTemplateQuestion = function(interviewTemplateId,userid,jobid){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchTemplateQuestion/'+interviewTemplateId+"/"+userid+"/"+jobid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchInterviewAns = function(interviewTemplateId,userId,jobId,createdDate){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchInterviewAns/'+interviewTemplateId+"/"+userId+"/"+jobId+"/"+createdDate,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveInteriewAns = function(tmpalteans){		
		var promise = $http({
			method : 'POST',
			data : tmpalteans,
			url : 'rest/admin/saveInteriewAns',
			headers : {
				'Content-Type' : 'application/json',									
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchInterviewListForUser = function(offset,limit,colName,order,userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchinterviewlistforuser/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//-------interview template end -----
	
		this.fetchUserEventsAndSlots = function(userId){
		var promise = $http({
			method : 'GET',
			url : 'rest/admin/fetchUserEventsAndSlots/'+userId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};	
	
	
	this.fetchCompliancesbyPosition=function(brandid,categoryid,positionid){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/compliancesmatrix/fetchcompliancesbyposition/'+brandid+"/"+categoryid+"/"+positionid,			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchCompliancesbyPositionForCrew=function(shipid,brandid,categoryid,positionid){
		
	var promise = $http({
			method : 'GET',
			url : 'rest/compliancesmatrix/fetchcompliancesbypositionforcrew/'+shipid+"/"+brandid+"/"+categoryid+"/"+positionid,			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.saveCompliancesforPosition=function(compliance){
		
		var promise = $http({
			method : 'POST',
			data : compliance,
			url : 'rest/compliancesmatrix/savecompliancesforposition/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
this.updateCompliancesforPosition=function(compliance){
		
		var promise = $http({
			method : 'POST',
			data : compliance,
			url : 'rest/compliancesmatrix/updatecompliancesforposition/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
	this.deleteCompliancesforPosition=function(compliance){
			
			var promise = $http({
				method : 'POST',
				data : compliance,
				url : 'rest/compliancesmatrix/deleteCompliancesforposition/',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
			
		};
		
		this.fetchComplianceDependencies=function(compliance){
			
			var promise = $http({
				method : 'POST',
				data : compliance,
				url : 'rest/compliancesmatrix/fetchcompliancedependencies/',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
			
		};
		
		// for saving compliancesmatrix dependency
		
		this.saveCompDependency=function(compliance){
			
			var promise = $http({
				method : 'POST',
				data : compliance,
				url : 'rest/compliancesmatrix/savecompliancesmatrixdependency/',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
			
		};
		
	
this.saveCompliancesforPositionForCrew=function(compliance){
		
		var promise = $http({
			method : 'POST',
			data : compliance,
			url : 'rest/compliancesmatrix/savecompliancesforpositionforcrew/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;
		
	};
	
this.generateInterview=function(userid,jobid,createdid){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/generateInterview/'+userid+"/"+jobid+"/"+createdid,			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
this.fetchInterViewVideoPath=function(interviewId){
		
		var promise = $http({
			method : 'GET',
			url : 'rest/interviewtemplate/fetchinterviewvideopath/'+interviewId,			
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.assignAssessment = function(Userdata,assessmentId,senderId,assessmentDate){	
	 
		var promise = $http({
			method : 'POST',
			data : Userdata,
			url : 'rest/admin/assignAssessment/'+assessmentId+"/"+senderId+"/"+assessmentDate,
			headers : {
				'Content-Type' : 'application/json',
														
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getSettings = function(userId,screanId){
			
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchscreensettings/'+userId+"/"+screanId,			
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.savesettings = function(columnlist,userId){		
			var promise = $http({
				method : 'POST',
				data : columnlist,
				url : 'rest/admin/savesettings/'+userId,
				headers : {
					'Content-Type' : 'application/json',
															
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.fetchQuestionAns = function(assessmentObj,userId,selecttabflag){		
			var promise = $http({
				method : 'POST',
				data : assessmentObj,
				url : 'rest/admin/fetchQuestionAns/'+userId+"/"+selecttabflag,
				headers : {
					'Content-Type' : 'application/json',
															
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.SaveShortAns = function(AssessmentId,user_asmt_id,UserId,QuestionListObj,AdminId){			 
			var promise = $http({
				method : 'POST',
				data : QuestionListObj,
				url : 'rest/admin/SaveShortAns/'+AssessmentId+"/"+user_asmt_id+"/"+UserId+"/"+AdminId,	
				headers : {
					'Content-Type' : 'application/json',					 					
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		
	this.getAssessmentTestImages = function(assessmentId,userId){
				
				var promise = $http({
					method : 'GET',
					url : 'rest/assessmentengine/getassessmenttestimages/'+assessmentId+"/"+userId,			
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};			
			
			
			/*-----------------Survey------------------------*/
		/*	
			this.getSettings = function(userId,screanId){
				
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchscreensettings/'+userId+"/"+screanId,			
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};*/
			
			this.fetchselectedUserData = function(selectedUserobj){		
				var promise = $http({
					method : 'POST',
					data : selectedUserobj,
					url : 'rest/admin/fetchselectedUserData',
					headers : {
						'Content-Type' : 'application/json',
																
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			 
			this.fetchUserDetalis = function(userid){
			
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchuserdetalis/'+userid,			
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
		};
		
		this.fetchUserRatingValue = function(userId,jobId){
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchuserratingvalue/'+userId+'/'+jobId,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;	
		};
				
		this.fetchUserJobfairInterviewLog = function(userId){
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchuserjobfairinterviewlog/'+userId,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;	
		};
		
		this.fetchCandidateFlag = function(){
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchCandidateFlag',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;	
		};
		
		this.fetchUpdatedUserFlag = function(flaguserid,userid){
			var promise = $http({
				method : 'GET',
				url : 'rest/admin/fetchUpdatedUserFlag/'+flaguserid+"/"+userid,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;	
		};
		
		this.removeUpdatedUserFlag = function(userid){
			
			var promise = $http({
				method : 'POST',
				url : 'rest/admin/removeUpdatedUserFlag/'+userid,
				headers : {
					'Content-Type' : 'application/json',
				
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
			
		};
		
		this.updateUserFlag = function(userFlag){
			var promise = $http({
				method : 'POST',
				data:userFlag,
				url : 'rest/admin/updateUserFlag',
				headers : {
					'Content-Type' : 'application/json'
					
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;				
		};
		
		
		this.adminResetPassword = function(userIds,senderId){
			var promise = $http({
				method : 'POST',
				data:userIds,
				url : 'rest/admin/adminresetpassword/'+senderId,
				headers : {
					'Content-Type' : 'application/json',
					
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;				
		};
		
		
	
		this.saveAltcontact = function(userContact,senderId){		
			var promise = $http({
				method : 'POST',
				data : userContact,
				url : 'rest/admin/saveAltcontact/'+senderId,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
			
		};
		
		this.disableAccount = function(ids){
		
		
		var promise = $http({
			method : 'POST',
			data : ids,
			url : 'rest/admin/disableaccount',
			headers : {
				'Content-Type' : 'application/json',
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//-----------------------------flag--------------------------
	this.insertUserFlag = function(userFlag){
		
		
		var promise = $http({
			method : 'POST',
			data : userFlag,
			url : 'rest/admin/insertUserFlag',
			headers : {
				'Content-Type' : 'application/json',
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
		this.removeUserFlag = function(ids){
			
			
			var promise = $http({
				method : 'POST',
				data : ids,
				url : 'rest/admin/removeUserFlag',
				headers : {
					'Content-Type' : 'application/json',
						
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		
		this.saveResetStatus = function(useractivity, id ,userid){
			
			
			var promise = $http({
				method : 'POST',
				data : useractivity,
				url : 'rest/admin/saveResetStatus/'+id+"/"+userid,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};

		this.addNewFlag = function(userFlag){


			var promise = $http({
				method : 'POST',
				data : userFlag,
				url : 'rest/flagsettings/addNewFlag',
				headers : {
					'Content-Type' : 'application/json',
				},
				cache : false
			}).then(function (response) {
			       return response;
			});
			return promise;
		};
			
		
		
		this.fetchNewFlag = function(){
			
			
			var promise = $http({
				 method : 'GET',
				 url : 'rest/flagsettings/fetchNewFlag',
				 headers : {
					 'Content-Type' : 'application/json'
				 },
				 cache : false
			}).then(function (response) {
				    return response;
			});
				 return promise;
		 };
				 
				 
	
			this.deleteFlag = function(id){
				
				
				var promise = $http({
					method : 'POST',
					url : 'rest/flagsettings/deleteFlag/'+id,
					headers : {
						'Content-Type' : 'application/json',
							
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
		
			this.fetchUserAppliedJobs = function(userid){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchuserappliedjobs/'+userid,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			
			this.savePullOfStatus = function(pullof){		
				var promise = $http({
					method : 'POST',
					data : pullof,
					url : 'rest/admin/savepullofstatus',
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
				
			};
			
			
			this.fetchqestn = function(assessmentObj){
				var promise = $http({
					method : 'POST',
					data : assessmentObj,
					url : 'rest/dashboardDetails/fetchqestn',
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			//-----------------------------------------Interview Assessment Log User List----------------------
			
			this.fetchInterviewAssessmentListForUser = function(offset,limit,colName,order,userId){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchInterviewAssessmentListForUser/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+userId,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			//-----------------------------------------Interview Assessment Log User List----------------------
			
			//--------------------------Interview Assessment Template------------------------------------//					  
			  

			this.fetchInterviewAssessmentTemplates = function(){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchInterviewAssessmentTemplates',
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.insertScheduleEventSlots = function(slot){
				var promise = $http({
					method : 'POST',
					data : slot,
					url : 'rest/admin/insertScheduleEventSlots',
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.assignReqMappAssessment = function(reqassessmentdata,adminId){
				var promise = $http({
					method : 'POST',
					data : reqassessmentdata,
					url : 'rest/admin/assignReqMappAssessment/'+adminId,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.fetchCandidateJourneyButtonStatus = function(userid,adminid,jobid,applicationstatus,process){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchcandidatejourneybuttonstatus/'+userid+"/"+adminid+"/"+jobid+"/"+applicationstatus+"/"+process,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.fetchCandidateJourneyLog = function(userid,userJobId){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/fetchcandidatejourneylog/'+userid+"/"+userJobId,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.startManagerReview = function(reqassessmentdata,adminId){
				var promise = $http({
					method : 'POST',
					data : reqassessmentdata,
					url : 'rest/admin/startManagerReview/'+adminId,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.saveManagerComment = function(reqassessmentdata,adminId){
				var promise = $http({
					method : 'POST',
					data : reqassessmentdata,
					url : 'rest/admin/saveManagerComment/'+adminId,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.searchReqAssessMappData = function(req_id){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/searchReqAssessMappData/'+req_id,
					headers : {
						'Content-Type' : 'application/json'
					},
					cache : false
				}).then(function (response) {
			        return response;
			    });
				return promise;		
			};
			
			this.checkInterviewschedule = function(jobid,userid){
				var promise = $http({
					method : 'GET',
					url : 'rest/admin/checkInterviewschedule/'+userid+"/"+jobid,
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

