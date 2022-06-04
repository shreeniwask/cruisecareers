'use strict';

var services = angular.module('GlobalModule');




services.service('GlobalModule_ValidationService',['$rootScope','$window', function($rootScope,$window) {

	this.isAlphabet = function(elem) {
		var alphaExp = /^[a-zA-Z]+$/;
		if (elem.match(alphaExp)) {
			return true;
		} else {
			return false;
		}
	};	



	this.AllowOnlyNumeric= function (e) {
		alert(e.keyCode);
		if (window.event) // IE 
		{
			if (((e.keyCode < 48 || e.keyCode > 57) & e.keyCode != 8) & e.keyCode != 46) {
				event.returnValue = false;
				return false;

			}
		}
		else { // Fire Fox
			if (((e.which < 48 || e.which > 57) & e.which != 8) & e.which != 46) {
				e.preventDefault();
				return false;

			}
		}
	}

	this.isNumeric = function(elem) {
		//var numericExpression = /^[0-9]+$/;
		var numericExpression = /^[-.,0-9]+$/;
		try{
			if (elem.match(numericExpression)) {
				return true;
			} else {
				return false;
			}
		}catch(err){

		}

	};

	this.isDropdownSelected=function (elem){
		if(elem== 0||elem== undefined ||elem ==null){
			return false;
		}else{
			return true;
		}
	};

	this.validateEmailAddress = function(email){		
		//var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var filter= /^((\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)\s*[;,]{0,1}\s*)+$/;
		if (!filter.test(email)) {
			return false;
		} else{
			return true;
		}
	};

}]);


/*
services.service('GlobalModule_notificationService',['$rootScope','$window', function($rootScope,$window) {







	this.notification = function(messageClass,message){
	$("body").append('<div  class="dialog-loading-wrapper"><div class="message '+messageClass+'" id="notification"style="display: none;"> <h5> '+ message+'!</h5></div></div>');





		$('#notification').slideToggle(445,function(){
			$(this).show(function(){
			setTimeout(function (){
			$('#notification').slideUp(445,function(){
				 $('#notification').parent().remove();});
			},5000);
			  });

			});

	};







}]);
 */


services.service('GlobalModule_notificationService',['$rootScope','$window', function($rootScope,$window) {




	this.notification = function(messageClass,message){
		$("body").append('<div  class="dialog-loading-wrapper"><div class="message '+messageClass+'" id="notification" style="display: none;"> <h5> '+ message+'</h5></div></div>');


		$('#notification').slideToggle(445,function(){

			setTimeout(function (){

				$('#notification').slideUp(445,function(){

					$('#notification').parent().remove();});
			},3000);
		});



	};		
}]);

services.service('GlobalModule_helperService',['$rootScope','$window', function($rootScope,$window) {

	this.preLoadObject= function(obj){
		//$scope.userId=GlobalModule_dataStoreService.loadData('UserModule','userId');
		obj.lastUpdatedBy=$rootScope.userId;
		obj.createdBy=$rootScope.userId;
		return obj;
	};

	this.getParameterByName = function(name){
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	};

	this.validateEmailAddress = function(email){		
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(email)) {
			return false;
		} else{
			return true;
		}
	};

	this.checkUserSession = function(){
		if($rootScope.useridentifier){
			return false;
		}else{
			return true;
		}
	};

	this.checkBrowser = function() {

		var userAgent = $window.navigator.userAgent;

		var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /ie/i};

		for(var key in browsers) {
			if (browsers[key].test(userAgent)) {
				return key;
			}
		};

		return 'unknown';
	}
}]);



services.service('GlobalModule_dataStoreService',['$cookieStore','$location','APP_CONSTANTS','$state','$cookies', function($cookieStore,$location,APP_CONSTANTS,$state,$cookies) {

	var dataStore = {};
	dataStore.commonmodule={};
	dataStore.globalmodule={};
	dataStore.mapmodule={};
	dataStore.usermodule={};
	dataStore.useractivitymodule={};
	dataStore.basicmodule={};
	dataStore.complainmodule={};
	dataStore.loginmodule={};
	dataStore.templatemodule={};


	this.storeData=function(moduleName,key,value){
		if(typeof moduleName !== 'string' || typeof key !== 'string'){
			return;
		}
		var moduleNameLower = moduleName.toLowerCase();
		var keyLower = key.toLowerCase();
		dataStore[moduleNameLower][keyLower]=value;
		storeToClientStorage(dataStore);
	};

	this.loadData=function(moduleName,key){
		if(typeof moduleName !== 'string' || typeof key !== 'string'){
			return;
		}
		var moduleNameLower = moduleName.toLowerCase();
		var keyLower = key.toLowerCase();

		var value = dataStore[moduleNameLower][keyLower];
		if(value == undefined){
			var storage = readFromClientStorage();
			if(storage != undefined){
				value = storage[moduleNameLower][keyLower];
				if(value == undefined){
					value=loadValueIfExistInURL(keyLower);
				}
			}else{
				value=loadValueIfExistInURL(keyLower);
			}
		}
		return value;
	};

	var loadValueIfExistInURL = function(keyLower){
		var moduleInURL = 'section';
		var keyInURL = keyLower;		
		var pathSearch = $location.search();		
		var moduleValueInURL = pathSearch[moduleInURL];
		if(moduleValueInURL != undefined){
			return pathSearch[keyInURL];
		}else{
			return undefined;
		}			
	};

	var storeToClientStorage=function(data){
		if(typeof localStorage !== 'undefined'){
			localStorage.setItem('dataStore', JSON.stringify(data));
		}else{
			$cookieStore.put('dataStore',JSON.stringify(data));
		}
	};

	var readFromClientStorage=function(){
		if(typeof localStorage !== 'undefined'){
			return JSON.parse(localStorage.getItem("dataStore"));
		}else{
			try{
				return JSON.parse($cookieStore.get('dataStore'));
			}catch(err){
				return undefined;
			}

		}
	};


	if(undefined != readFromClientStorage()){
		dataStore = readFromClientStorage();
	}
	this.logout=function(){
		clearInterval(incomingCallNotifications);
		this.deleteCookie(APP_CONSTANTS.ACCESS_TOKEN);
		$state.go("login");
	};

	this.errorResponseHandler=function(recievedResponse){
		if(recievedResponse.status==404){
			$state.go('error.404');
		}else if(recievedResponse.status==503 || recievedResponse.status==502){
			$state.go('error.500');
		}else if(recievedResponse.status==401){
			this.logout();
		}
	};
	this.setCookie=function(cookieName, cookieValue, expiryDays){
		//console.log(cookieName)
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() + ( 24 * 60 * 60 * 1000));
		//$cookies.put(cookieName,cookieValue,{'secure' :true,'expires': expireDate});//--for production
		$cookies.put(cookieName,cookieValue,{'expires': expireDate});

	};
	this.deleteCookie=function(cookieName){
		$cookies.remove(cookieName);
	};

}]);


services.service('GlobalModule_exporterService',['GlobalModule_helperService', function(GlobalModule_helperService) {

	this.exportToExcel = function(table, worksheetName){

		if(GlobalModule_helperService.checkBrowser() === 'ie'){
			var tab_text_start="<table>";
			var tab_text_end="<table>";
			tab = document.getElementById(table); // id of actual table on your page

			var tempIFrame = document.createElement('IFRAME');
			tempIFrame.setAttribute("id", "tempIFrameTxtArea1");
			tempIFrame.style.display="none";
			document.body.appendChild(tempIFrame);

			var txt = document.getElementById('tempIFrameTxtArea1').contentWindow;
			txt.document.open("txt/html","replace");
			txt.document.write(tab_text_start+tab.innerHTML+tab_text_end);
			txt.document.close();
			txt.focus();
			tb = txt.document.execCommand("SaveAs",true,"download.xls");
			document.getElementById('tempIFrameTxtArea1').parentNode.removeChild(document.getElementById('tempIFrameTxtArea1'));
			return (tb);
		}else{
			//For Chrome and firefox
			var uri = 'data:application/vnd.ms-excel;base64,'
				, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
					, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
			, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

			if (!table.nodeType) table = document.getElementById(table);
			var ctx = {worksheet: worksheetName || 'Worksheet', table: table.innerHTML}
			window.location.href = uri + base64(format(template, ctx));
		}
	};

}]);

services.service('GlobalModule_User_activityService',['$rootScope','$window','$http', function($rootScope,$window,$http) {



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




