'use strict';

var services = angular.module('LoginModule');


services.service('Testimonials_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {

	this.fetchTestimonialsList= function(offset,limit,colName,order,search){             
		var promise = $http({
			method : 'GET',
			url : 'rest/testimonials/fetchtestimoniallist/'+offset+"/"+limit+"/"+colName+"/"+order+"/"+search,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	this.getTestimonialsListCount = function(searchterm){
		var promise = $http({
			method : 'GET',
			url : 'rest/testimonials/gettestimonialcount/'+searchterm,
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	this.addTestimonialDetails = function(testimonial){
		var promise = $http({
			method : 'POST',
			data : testimonial,
			url : 'rest/testimonials/addtestimonial',
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

	
	this.deleteTestimonialfromList= function(testimonial,fromlist){
		var promise = $http({
			method : 'POST',
			data:testimonial,
			url : 'rest/testimonials/deletetestimoniallist/'+fromlist,
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
		
	this.allTestimonialsSequence= function(){             
		var promise = $http({
			method : 'GET',
			url : 'rest/testimonials/alltestimonialssequence/',
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