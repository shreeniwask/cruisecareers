var services=angular.module("LoginModule");

services.service('DocumentTypeListService',function($http)
		{

	this.fetchDocumentTypeListWithRole = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/documentType/list/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) 
				{
			return response;

				});
		return promise;		
	};


	this.fetchDocumentTypeCount = function(searchterm){             
		var promise = $http({
			method : 'GET',
			url : 'rest/documentType/count/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) 
				{
			return response;

				});
		return promise;		
	};
	
	//Document Type List
	this.fetchDocumentTypeList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/documentType/documentTypeList/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	//Role Name
	this.fetchRoleList = function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/role/list/',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	//Data for storing in DataBase
	
	this.insertIntoDocumentTypeRoleMap = function(documentType){             
		var promise = $http({
			method : 'POST',
			url : 'rest/documentType/maproles',
			data: documentType,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) 
				{
			return response;

				});
		return promise;		
	};
	//Fetching Roles for DocumentType
	
	this.fetchRoleListForDocumentType = function(documentTypeId){             
		var promise = $http({
			method : 'GET',
			url : 'rest/role/fetchRoles/'+documentTypeId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
			return response;
		});
		return promise;		
	};
	
	//adding document type 
	this.addDocumentType = function(documentTypeMaster){             
		var promise = $http({
			method : 'POST',
			url : 'rest/documentType/addDocumentType',
			data: documentTypeMaster,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) 
				{
			return response;

				});
		return promise;		
	};
	
	this.deleteDocumentType = function(fromlist,documentListIds){
		var promise = $http({
			method : 'POST',
			data:documentListIds,
			url : 'rest/documentType/deletedocumenttype',
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
	
	
	this.updateRetentionDaysOfDocument = function(retentionDays,updatedaysId){
		var promise = $http({
			method : 'POST',
			//data : documentTypeMaster,
			url : 'rest/documentType/updateretentiondaysofdocument/'+retentionDays+"/"+updatedaysId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

});