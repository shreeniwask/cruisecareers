'use strict';

var services = angular.module('LoginModule');


services.service('Wf_tickettaskStatusCount_Service',['$rootScope','$location','$http', function($rootScope, $location, $http) {
	
	  this.fetchTicketsTasksStatusList = function(userid,workflowId){
			var promise = $http({
				method : 'GET',
				url : 'rest/workflowdashboard/fetchWorkFlowTicketsTaskStatusCount/'+userid+"/"+workflowId,
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