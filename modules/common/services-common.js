'use strict';

var services = angular.module('CommonModule');


services.service('CommonModule_serverCallService',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.executeSearchRequest = function(searchRequest){
		
		searchRequest.fetchFields = ["id","rst_name","rst_location","rst_location_id","rst_address1","rst_address2","rst_area","rst_city","rst_costfortwo","cuisines","dishes","tips_count","img_count","COORDINATES_LAT","COORDINATES_LONG"];
		/*searchRequest.highlightFields = ["rst_name","rst_location","cuisines","dishes"];*/
		searchRequest.resultSize = 10;
		
		
		var promise = $http({
			method : 'POST',
			data : searchRequest,
			url : 'services/common/search',	
			headers : {
				'Content-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};
	
	
	
	this.fetchFilterListCuisine = function(){
		
		var promise = $http({
			method : 'GET',
			url : 'services/cuisine/all',	
			headers : {
				'Accept-Type' : 'application/json'
			},
			cache : false
		}).then(function (response) {
	        return response;
	    });
		return promise;		
	};

}]);

services.service('CommonModule_helperService',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	this.customAccordianForTableRow = function(className,index){
		$('.END').remove();
		$('.'+className+index).nextUntil('tr.'+className+(index+1)).toggle(500);
		
		if($('.'+className+index).find('td').first().html() == ' - '){
			$('.'+className+index).find('td').first().html(' + ');
		}else{
			$('.'+className+index).find('td').first().html(' - ');
		}
	};
	
	this.paginationRenderer = function(assetReceivingListSize,offset,pagesInfoDivId){

		var buttonSize = Math.ceil(assetReceivingListSize/10);
		var activateButton = Math.ceil(offset/10);
		var paginationButtonArray = [];
		if(buttonSize > 1){
			for(var i = 0; i < buttonSize;i++ ){
				if(activateButton == i){
					paginationButtonArray.push({"name":i+1,"offset":(i*10),"limit":10,"class":"active"});
				}else{
					paginationButtonArray.push({"name":i+1,"offset":(i*10),"limit":10,"class":""});
				}
			}
		}
		
		if((offset+10)<assetReceivingListSize){
			$(pagesInfoDivId).html('Showing '+(offset+1)+' to '+(offset+10)+' of '+assetReceivingListSize+' entries');
		}else{
			$(pagesInfoDivId).html('Showing '+(offset+1)+' to '+assetReceivingListSize+' of '+assetReceivingListSize+' entries');
		}
		return paginationButtonArray;
	};

}]);

services.service('CommonModule_initialDataService',['$rootScope','CommonModule_serverCallService', function($rootScope, CommonModule_serverCallService) {
	
	$rootScope.filters = {};
	
	this.fetchFiltersData = function(){
		CommonModule_serverCallService.fetchFilterListCuisine().then(function(response){
			//Success
			//$rootScope.filters.cuisineFilterList = [];
			$rootScope.filters.cuisineFilterList = response.data;
			//$rootScope.filters.cuisineFilterList.push(response.data[0]);
		},function(response){
			//Error			
			
		});
		
	};
	

}]);

/*services.service('CommonModule_userActivityService',['$rootScope','CommonModule_serverCallService', function($rootScope, CommonModule_serverCallService) {
	

	this.addUserActivity = function(useractivity){
		var promise = $http({
			method : 'POST',
			data:useractivity,
			url : 'rest/useractivity/adduseractivity',
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
*/



