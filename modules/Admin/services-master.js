
'use strict';

var services = angular.module('LoginModule');


services.service('Master_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
 //----View Position Master List--------------------
	
	this.fetchPositionMaster = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/positionmaster/fetchPositionList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getPositionCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/positionmaster/getpositioncount/'+searchterm,
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
	 
	//----delete Position from  List--------------------
	
	this.deletePositionFromList = function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/positionmaster/deletePositionFromlist',
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
	
	
//----suspend Position from  List--------------------
	
	this.suspendPositionFromList = function(fromlist,ids){
		var promise = $http({
			method : 'POST',
			data:ids,
			url : 'rest/positionmaster/suspendPositionFromlist',
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
	
	
	//----insert Position in List--------------------------
	
	this.savePositionDetails = function(position){
		var promise = $http({
			method : 'POST',
			data : position,
			url : 'rest/positionmaster/savePositionDetails',
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

	//----update Position from  List------------------------
	
	this.updatePositionDetails = function(req){
		var promise = $http({
			method : 'POST',
			data : req,
			url : 'rest/positionmaster/updatePositionDetails',
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
	
	this.fetchPositionById = function(id){
		var promise = $http({
			method : 'GET',
			url : 'rest/positionmaster/fetchPositionById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	//..................end of position master .....................//
	
	
	
	
	
	
	// .......................Start of Assessment master ...................//
	
	
	
	
//----View Assessment  Master List--------------------
	
	this.fetchAssessmentMaster = function(offset,limit,colName,order,search,brandId,departId,positionId,categoryId){    
		
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentmaster/fetchAssessmentList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+brandId+"/"+departId+"/"+positionId+"/"+categoryId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchAssessmentToAssigne = function(offset,limit,colName,order,search,brandId,departId,positionId,shipId){ 		
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentmaster/fetchAssessmentToAssigne/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+brandId+"/"+departId+"/"+positionId+"/"+shipId,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getAssessmentCount = function(searchterm,categoryid){
		var promise = $http({
			method : 'GET',
			url : 'rest/assessmentmaster/getassessmentcount/'+searchterm+'/'+categoryid,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//.....   ********..............//
	
	
//----delete Assessment from  List--------------------
	
	this.deleteAssessmentFromList = function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/assessmentmaster/deleteAssessmentFromlist',
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
	
	
	//.....*********************.............\\
	
	
//----insert Assessment in List--------------------------
	
	this.saveAssessmentDetails = function(assessment){
		var promise = $http({
			method : 'POST',
			data : assessment,
			url : 'rest/assessmentmaster/saveassessmentDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//..............*********............	

	//----update Assessment from  List------------------------
	
	this.updateAssessmentDetails = function(assessment){
		var promise = $http({
			method : 'POST',
			data : assessment,
			url : 'rest/assessmentmaster/updateAssessmentDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	// Start  Qualification ..................// 
	
	
	

//----View Qualification   List--------------------
	
	this.fetchQualificationList= function(offset,limit,colName,order,search){    
		
		var promise = $http({
			method : 'GET',
			url : 'rest/qualification/fetchQualificationList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.fetchLevelList= function(){    
		var promise = $http({
			method : 'GET',
			url : 'rest/qualification/fetchlevellist',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getQualificationCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/qualification/getQualificationCount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//.....   ********..............//
	
	
//----delete  Qualification  from  List--------------------
	
	this.deleteQualificationFromList = function(fromlist,id){
		var promise = $http({
			method : 'POST',
			data:id,
			url : 'rest/qualification/deleteQualificationFromList',
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
	
	
	//.....*********************.............\\
	
	
//----insert Qualification  in List--------------------------
	
	this.saveQualificationDetails = function(qualification){
		var promise = $http({
			method : 'POST',
			data : qualification,
			url : 'rest/qualification/saveQualificationDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	//..............*********............	

	//----update Qualification  from  List------------------------
	
	this.updateQualificationDetails = function(qualification){
		var promise = $http({
			method : 'POST',
			data : qualification,
			url : 'rest/qualification/updateQualificationDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	
	 // .....End Qualification .......//
	
	
	//------------------------Category -------------------------------------//
	
	
//-----------------View category Master List--------------------
	
	this.fetchTemplateTypeMaster = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/templatetypemaster/fetchtemplatetypemaster/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
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
			url : 'rest/templatetypemaster/getcategorycount/'+searchterm,
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
			url : 'rest/templatetypemaster/deleteCategoryFromlist',
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
			url : 'rest/templatetypemaster/saveCategoryDetails',
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
			url : 'rest/templatetypemaster/updateCategoryDetails',
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
			url : 'rest/templatetypemaster/fetchCategoryById/'+id,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
   //---------------------End of Template type master----------------------------------	
	
	
//--------------------------Category master------------------------------------------------
	
	this.fetchCategoryMasterList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/adminmaster/fetchcategoryList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getcategoryListcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/adminmaster/getcategorylistcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getBrandListcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/adminmaster/getbrandListcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.fetchBrandsList = function(offset,limit,colName,order,search){
		var promise = $http({
			method : 'GET',
			url : 'rest/adminmaster/fetchbrandsList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	 //insert brand data

	this.addDepartmentDetails = function(department){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/adddepartmentDeatails',
			data: department,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.getcategoryListcount = function(search){
		var promise = $http({
			method : 'GET',
			url : 'rest/adminmaster/getcategorylistcount/'+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveDepartmentsData = function(department){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/adddepartmentDeatails',
			data: department,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.updatedepartmentdetails = function(department){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/updatecategoryDeatails',
			data: department,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.addBrandsDetails = function(brand){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/addbrandsDeatails',
			data: brand,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.updateBrandsDeatails = function(brand){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/updatebrandsDeatails',
			data: brand,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	

	this.updateBrandsComplianceForm = function(brand){		
		var promise = $http({
			method : 'POST',			
			url : 'rest/compliancemaster/updatecompliances',
			data: brand,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.uploadLogo=function(brand){
		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/brandlogo',
			data: brand,
			headers : {
				'Content-Type' : 'application/json',
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	};
		
	this.updateCategoryLogo=function(category){
		
		var promise = $http({
			method : 'POST',			
			url : 'rest/adminmaster/categorylogo',
			data: category,
			headers : {
				'Content-Type' : 'application/json',
					
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;	
		
	};
	
	//-------------End of department master and brand master---------------------
	
	
	//------------Start of Compliance Master--------------------------------------
	
	
	//------------fetch compliance master list------------------------------------
	
	this.fetchComplianceMasterList = function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/compliancemaster/fetchComplianceMasterList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getComplianceCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/compliancemaster/getcompliancecount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.displayToCandidateToggle = function(id,checkstatus){
		var promise = $http({
			method : 'GET',
			url : 'rest/compliancemaster/displaytocandidatetoggle/'+id+"/"+checkstatus,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.saveComplianceDetails = function(compliance){
		var promise = $http({
			method : 'POST',
			data : compliance,
			url : 'rest/compliancemaster/saveComplianceDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.updateComplianceDetails = function(compliance){
		var promise = $http({
			method : 'POST',
			data : compliance,
			url : 'rest/compliancemaster/updateComplianceDetails',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.deleteComplianceFromList = function(fromlist,id){
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
	
	
	
	// .......................Start of Assessment history ...................//
	
	
	
	
	//----View Assessment  History List--------------------
		
		this.fetchAssessmentHistoryList = function(offset,limit,colName,order,search){    
			
			var promise = $http({
				method : 'GET',
				url : 'rest/AssessmentHistory/fetchAssessmentHistoryList/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.getAssessmentHistoryListCount= function(searchterm){
			var promise = $http({
				method : 'GET',
				url : 'rest/AssessmentHistory/getAssessmentHistoryListCount/'+searchterm,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		//-------------Ship Master----------------------------------------------
		
		this.fetchShipMaster=function(offset,limit,colName,order,search){
			
			var promise = $http({
				method : 'GET',
				url : 'rest/shipmaster/fetchshipslist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
			
		};
		
		this.getShipsCount= function(searchterm){
			
			var promise = $http({
				method : 'GET',
				url : 'rest/shipmaster/getshipcount/'+searchterm,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;
		};

		this.saveShipsDetails = function(ship){
			var promise = $http({
				method : 'POST',
				data : ship,
				url : 'rest/shipmaster/saveshipsdetails',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.updateShipDetails = function(ship){
			var promise = $http({
				method : 'POST',
				data : ship,
				url : 'rest/shipmaster/updateshipsdetails',
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.deleteShipsFromList = function(fromlist,id){
			var promise = $http({
				method : 'POST',
				data:id,
				url : 'rest/shipmaster/deleteshipfromlist',
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
		
		
		/*---------------------------------Survey Master--------------------------------------------------------*/
		
		
		this.fetchSurveyMaster = function(offset,limit,colName,order,search,brandId,departId,positionId){    
			
			var promise = $http({
				method : 'GET',
				url : 'rest/assessmentmaster/fetchSurveyMaster/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search+"/"+brandId+"/"+departId+"/"+positionId,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		/*------------------------------------count--------------------------------*/
		this.getSurveyCount = function(searchterm){
			var promise = $http({
				method : 'GET',
				url : 'rest/assessmentmaster/getSurveyCount/'+searchterm,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		//----delete Survey from  List--------------------
		
		this.deleteSurveyFromList = function(fromlist1,id){
			var promise = $http({
				method : 'POST',
				data:id,
				url : 'rest/assessmentmaster/deleteSurveyFromlist',
				headers : {
					'Content-Type' : 'application/json',
					'fromlist1' :fromlist1
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
			
		};
	 //fetch question list
		
		this.fetchAssessmentQuestionList = function(assessmentId,colName,order,search){             
		//	alert(assessmentId);
			var promise = $http({
				method : 'GET',
				url : 'rest/assessmentmaster/fetchassessmentquestionlist/'+assessmentId+"/"+colName+"/"+order+"/"+search,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.saveQuestionList = function(assessmentId,questions){             
			//alert(assessmentId);
			var promise = $http({
				method : 'POST',
				data:questions,
				url : 'rest/assessmentmaster/savequestionlist',
				
				headers : {
					'Content-Type' : 'application/json',
						'assessmentId':assessmentId
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		//fetch survey question
		
		this.fetchSurveyQuestionList = function(surveyId,colName,order,search){             
			//alert(surveyId);
			var promise = $http({
				method : 'GET',
				url : 'rest/assessmentmaster/fetchsurveyquestionlist/'+surveyId+"/"+colName+"/"+order+"/"+search,
				headers : {
					'Content-Type' : 'application/json'
				},
				cache : false
			}).then(function (response) {
		        return response;
		    });
			return promise;		
		};
		
		this.deleteQuestionFromSurveyList= function(QueListObjet,surveyId){
			
			var promise = $http({
				method : 'POST',
				data:QueListObjet,
				url : 'rest/assessmentmaster/deletequestionfromsurveylist/'+surveyId,
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