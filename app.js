'use strict';

angular.module('CommonModule', []);
angular.module('GlobalModule', []);
angular.module('MapModule', []);
angular.module('UserModule', []);
angular.module('BasicModule', []);
angular.module('SocialMediaModule', []);
angular.module('localization', []);
angular.module('SocialMediaModule', []);
angular.module('CMSModule', []);
angular.module('ProductModule', []);
angular.module('LoginModule', []);
angular.module('templatemodule',[]);



var CruiseWebsite = angular.module('CruiseWebsite', 
		[ 	'GlobalModule',
			'ngRoute',
			'ngCookies',
			'ui.validate',
			'ngSanitize',
			'chart.js',
			'oc.lazyLoad',
			'ui.router',
			'ui.router.state.events',
			'ngWebsocket'
			]
);

CruiseWebsite.constant('HTTP_ERRORS', {
	'UNAUTHORIZED': 401
});
CruiseWebsite.constant('APP_CONSTANTS', {
	'ACCESS_TOKEN': 'ACCESS_TOKEN'
});
//Calling
var incomingCallNotifications;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
const NO_CALL = 0;
const IN_CALL = 1;
const POST_CALL = 2;
const DISABLED = 3;
const IN_PLAY = 4;
const TEXT_VALIDATOR_REGEX=/^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}
CruiseWebsite.run(function($rootScope,$http,APP_CONSTANTS) {
	  $rootScope.getSignedURL = function(fileKey) {
		   
		  var promise = $http({
				method : 'POST',
				url :  'rest/admin/signedURL',
				headers : {
					'Content-Type' : 'application/json',
					'access-token' : getCookie(APP_CONSTANTS.ACCESS_TOKEN)
				},
				data:{"fileKey":fileKey}
			}).then(function (response) {
				return response;
			});
			return promise;	
	    };
	    
	    
	    $rootScope.getSignedURLcustomTime = function(fileKey,time) {
			   
			  var promise = $http({
					method : 'POST',
					url :  'rest/admin/signedURLCutsomTime/'+time,
					headers : {
						'Content-Type' : 'application/json',
						'access-token' : getCookie(APP_CONSTANTS.ACCESS_TOKEN)
					},
					data:{"fileKey":fileKey}
				}).then(function (response) {
					return response;
				});
				return promise;	
		    };
});

CruiseWebsite.run(['$rootScope','$templateCache','$route','$location',function($rootScope, $templateCache,$route,$location) {

	/** $rootScope.$on('$routeChangeStart', function () {
		  if (null==$rootScope.userdetails) {
		    $location.path('/login');
		  }
		});**/

	$rootScope.$on('$viewContentLoaded', function() {
		$templateCache.removeAll();
		$rootScope.currentLocation= $location.path();
	});

	$rootScope.globalIncludeURL = "indexCustomer.html";

	$rootScope.resetValidityOfFormFields = function(form) {
		var errorData = form.$error;
		var field, errorType = null, fields;
		var i, l;

		for(errorType in errorData) {
			fields = errorData[errorType];
			for(i = 0, l = fields ? fields.length : 0; i < l; ++i) {
				if(!fields[i]) {
					continue;
				}

				field = fields[i];
				field.$setValidity(errorType, true);
			}
		}
	};

	$rootScope.showValidityOfFormFields = function(form, validationErrors) {
		angular.forEach(validationErrors, function (value, key) {
			form[value.field].$setValidity(value.message, false);
		});
	};

	$route.reload();
}]);