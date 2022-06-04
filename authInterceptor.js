CruiseWebsite
.factory('AuthInterceptor', ['$cookies',function($cookies) {  
	return {
		// Send the Authorization header with each request
		'request': function(config) {
			config.headers = config.headers || {};
			config.headers.AccessToken = $cookies.get('ACCESS_TOKEN');
			return config;
		}
	};
}]);
CruiseWebsite.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]);
$.ajaxSetup({
    headers: { 'AccessToken':getCookie("ACCESS_TOKEN") }
});
CruiseWebsite
.factory('ResponseInterceptor', ['$cookies','$state','GlobalModule_notificationService','$q',function($cookies,$state,GlobalModule_notificationService,$q) {  
	return {
		'responseError': function(response) {
			if(response.status==401){
				$state.go('login',{error: true});
			}
			else if(response.status==400&&response.config.url=="rest/session/login"){
				 GlobalModule_notificationService.notification("error","Oh no! The Username and Password seems to be wrong. Please try again.");
			 }else if(response.status==500){
				 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			 }
			return $q.reject(response);
		}
	};
}]);
CruiseWebsite.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('ResponseInterceptor');
}]);
