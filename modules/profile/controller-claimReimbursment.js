'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('claimReimbursment_Ctrl',['$scope','$state','$rootScope','$location','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','GlobalModule_User_activityService','Profile_Service','Employee_Service','dashboardDetails_Service', function ($scope,$state,$rootScope,$location,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,GlobalModule_User_activityService,Profile_Service,Employee_Service,dashboardDetails_Service){
	var map;
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user'); 
	//console.log($rootScope.userdetails);

	$scope.RepatData = GlobalModule_dataStoreService.loadData('LoginModule','repatData'); 

	$scope.expenseObj = GlobalModule_dataStoreService.loadData('LoginModule','expenseObj');
	
	$scope.claimFlag = GlobalModule_dataStoreService.loadData('LoginModule','claimFlag');

	$scope.claimeFlag = GlobalModule_dataStoreService.loadData('LoginModule','claimeFlag');
 
	$scope.travelDistanceFlag=false;
		
	$scope.claim={};

	function addMaxDays(dt){

		var days =$scope.RepatData.maxDays;
		dt.setDate(dt.getDate() + days);

		$scope.formatDate(dt);

		return $scope.formatDate(dt);
	}


	$scope.formatDate = function(date){		     
		var dateOut = moment(date).format("DD-MM-YYYY");
		return dateOut;
	};


	$scope.ReimbursmentType=[{}];

	$scope.fetchReimbursmentType = function(){
		$(".loader").show();
		Employee_Service.fetchReimbursmentType().then(function(response){				  
			$scope.ReimbursmentType = response.data;		
			//console.log($scope.ReimbursmentType);
		});
		$(".loader").fadeOut("slow");		
	};
	$scope.fetchReimbursmentType();

	$('#reinmbursement-drpdwn').show();
	$('#reimbursement-detail').hide();

	$scope.CheckClaimAvailablility = function(reimbursementTypeId){	

		$(".loader").show();

		Employee_Service.CheckClaimAvailablility(reimbursementTypeId,$rootScope.userdetails.id).then(function(response){				  
			  $scope.availablilityResponse = response.data;	
			 // console.log($scope.availablilityResponse);
			 if($scope.availablilityResponse == null){
				 GlobalModule_notificationService.notification("error","not allowed to claim for this type");
				 $state.go("restricted.eprofile");
			 }else{
				 $('#reinmbursement-drpdwn').hide();
				 
				 for(var i=0; i<$scope.ReimbursmentType.length;i++){
					 if($scope.ReimbursmentType[i].reimbursementTypeId == reimbursementTypeId){
						 $scope.selectedReimbursment = $scope.ReimbursmentType[i];
					 }
				 }
				 $scope.ClaimList=[];
				  $scope.RepatData = $scope.availablilityResponse;
				  
				  var disImrkDate = $scope.formatDate($scope.RepatData.disembarkDate);
					
					var dateParts2 = (disImrkDate).split('-');
					
					var d2=new Date(dateParts2[2],parseInt((dateParts2[1]))-1,dateParts2[0]);
					//$scope.maximumDate=addMaxDays(d2);					
										
					if($scope.RepatData.mmiDate == undefined || $scope.RepatData.mmiDate == "" || $scope.RepatData.mmiDate == null)
					{												
						$scope.maximumDate=addMaxDays(d2);
					}
					else
					{
						var addMaxDt =addMaxDays(d2);
						var dateParts5=addMaxDt.split('-');
						var d3=new Date(dateParts5[2],parseInt((dateParts5[1]))-1,dateParts5[0]);
						
						var mmidt=$scope.formatDate($scope.RepatData.mmiDate);
						var dateParts4=mmidt.split('-');
						var d4=new Date(dateParts4[2],(parseInt(dateParts4[1]))-1,dateParts4[0]);
						
						var greaterDt=checkDates(d3,d4);
						
						if(greaterDt == true)
						{
							$scope.maximumDate=mmidt;
						}
						else
						{
							$scope.maximumDate=addMaxDt;
						}				
					}				
				}
				$scope.initMap();
				
				//console.log($scope.RepatData);
				$scope.fetchexpenseHead(reimbursementTypeId,$scope.availablilityResponse.brand.id);
				fetchTransportMode();
			
				
				$('#reimbursement-detail').show();				
			});				   
		$(".loader").fadeOut("slow");		
	};

	$scope.fetchexpenseHead = function(reimbursementTypeId,brandId){

		$(".loader").show();

		Employee_Service.fetchexpenseHead(reimbursementTypeId,brandId).then(function(response){
			$scope.expenseHeadList = response.data;	
			//console.log($scope.expenseHeadList);
		});

		$(".loader").fadeOut("slow");
	};
	
	$scope.travelFlag=false;
	$scope.showHideTravelDeatils= function(head_id)
	{
		if(head_id == '')
		{
			$scope.travelFlag=false;
		}
		for(var i=0;i<$scope.expenseHeadList.length;i++)
			{
				if($scope.expenseHeadList[i].expense_typeId == head_id)
				{
					$scope.travelFlag= $scope.expenseHeadList[i].travel_flag;
					$scope.maxBrandAmnt=formatAllCurrency($scope.expenseHeadList[i].brand.amount);
					break;
				}
				/*else
				{
					$scope.maxBrandAmnt=$scope.expenseHeadList[i].brand.amount;
				}*/				
			}fetchTransportMode();
			//console.log();
	};
	
	if($scope.claimFlag == 2)
	{
		$scope.fetchexpenseHead($scope.expenseObj.reimbursementTypeId,$scope.expenseObj.brand.id);
		
	}		

	$scope.ClaimList =[{}];

	function checkDates(dt1,dt2) { 				 

		return (dt1.getTime() > dt2.getTime());
	}

	$scope.addClaim=function(claimData){	 

		$(".loader").show();
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;

		var input = document.getElementById('documentfile');

		if(claimData == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select mandatory");
			$(".loader").fadeOut("slow");
			return;
		}
		if(parseInt(claimData.claimedAmount) < 0)
		{
			GlobalModule_notificationService.notification("error","Invalid claim amount");
			$(".loader").fadeOut("slow");
			return;
		}
		if($scope.travelFlag == true && claimData.transportMode == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select transport mode type");
			$(".loader").fadeOut("slow");
			return;
		}
		if($scope.travelFlag == true && (claimData.from == undefined || claimData.to == undefined))
		{
			GlobalModule_notificationService.notification("error","Travel from and Travel to are mandatory");
			$(".loader").fadeOut("slow");
			return;
		}
		
		if(claimData.from != undefined)
		{
			if(!(claimData.from.match(letterNumber)))
			{
				GlobalModule_notificationService.notification("error","Invalid text fieds for travel from");
				$(".loader").fadeOut("slow");
				return;
			}
		}
		if(claimData.to != undefined)
		{
			if(!(claimData.to.match(letterNumber)))
			{
				GlobalModule_notificationService.notification("error","Invalid text fieds for travel to");
				$(".loader").fadeOut("slow");
				return;
			}
		}		
		if(claimData.expense_typeId == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select expense type");
			$(".loader").fadeOut("slow");
			return;
		}
		if(claimData.currencyTypeClmAmnt == undefined)
		{
			GlobalModule_notificationService.notification("error","Please enter claim amount");
			$(".loader").fadeOut("slow");
			return;
		}
		if($('#date').val() == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select date of expense");
			$(".loader").fadeOut("slow");
			return;
		}
		if(input.value == "" || input.value == '')
		{
			GlobalModule_notificationService.notification("error","Please upload expense document");
			$(".loader").fadeOut("slow");
			return;
		}
		

		var expnsDate = $('#date').val();
		var disImrkDate = $scope.formatDate($scope.RepatData.disembarkDate);

		var dateParts1 = expnsDate.split('-');
		var dateParts2 = (disImrkDate).split('-');
		var d1=new Date(dateParts1[2],parseInt((dateParts1[1]))-1,dateParts1[0]);
		var d2=new Date(dateParts2[2],parseInt((dateParts2[1]))-1,dateParts2[0]);
		var dtFlag=checkDates(d1,d2);

		var addMaxDt=addMaxDays(d2);
		var dateParts5=addMaxDt.split('-');
		var d3=new Date(dateParts5[2],parseInt((dateParts5[1]))-1,dateParts5[0]);

		var mmiFlag=false;
		if($scope.RepatData.mmiDate == undefined || $scope.RepatData.mmiDate == "" || $scope.RepatData.mmiDate == null)
		{			
			mmiFlag=checkDates(d1,d3);
		}
		else
		{
			var mmidt=$scope.formatDate($scope.RepatData.mmiDate);
			var dateParts4=mmidt.split('-');
			var d4=new Date(dateParts4[2],(parseInt(dateParts4[1]))-1,dateParts4[0]);

			checkDates(d3,d4);

			mmiFlag=checkDates(d1,d4);
		}

		if(mmiFlag == true)
		{
			GlobalModule_notificationService.notification("error","Your expense claim seems to be outside your eligible date range.");
			$scope.claim = {};
			$('#date').val(null);
			$scope.selectedfile="";
			document.getElementById('documentfile').value=null;
			$(".loader").fadeOut("slow");
			return;
		}		
		if(dtFlag == false)
		{
			GlobalModule_notificationService.notification("error","Expenses incurred prior to disembark date cannot be claimed.");
			$(".loader").fadeOut("slow");
			return;
		}

		if($scope.travelFlag == true && $scope.finalDistanceInKm == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select locations from map");
			$(".loader").fadeOut("slow");
			return;
		}
		
		if(claimData.expense_typeId == 1 && (claimData.from == undefined || claimData.to == undefined))
		{
			GlobalModule_notificationService.notification("error","Please select Travel From and Travel To");
			$(".loader").fadeOut("slow");
			return;
		}


		/*if($scope.ClaimList.length != 0)
		{*/
			/*for(var i=0;i<$scope.expenseHeadList.length;i++)
			{
				if($scope.expenseHeadList[i].brand.amount != 0)
				{
					if(claimData.expense_typeId == $scope.expenseHeadList[i].expense_typeId)
					{					
							if(claimData.claimedAmount > $scope.expenseHeadList[i].brand.amount){
							
								GlobalModule_notificationService.notification("error","Your claimed amount exceeds the max amount for your brand. " +$scope.expenseHeadList[i].brand.amount);
							 $scope.claim = {};
							 $('#date').val(null);
							 $scope.selectedfile="";
								document.getElementById('documentfile').value=null;
							$(".loader").fadeOut("slow");
							 return;
						}
					}
				}
				claimData.expense_headName = $scope.expenseHeadList[i].expense_headName;			
			}*/
		//}		 
		
		claimData.distance= $scope.finalDistanceInKm;
			
		claimData.dateOfExpense = $("#date").data('date');	 
		claimData.brand = $scope.RepatData.brand;
		claimData.ship = $scope.RepatData.ship;
		claimData.category = $scope.RepatData.category;
		claimData.position = $scope.RepatData.position;
		
		if(input.value!="")
		{
			var file = input.files[0];
			var formData = new FormData();
			formData.append("file",file);

			$.ajax({
				url: 'rest/expenses/uploadExpenseDoc',
				type: 'POST',
				data: formData,
				async: true,
				cache: false,
				contentType: false,
				processData: false,
				success: function (returndata) {
					$scope.filedtailsforProfile=JSON.parse(returndata);
					if($scope.filedtailsforProfile != undefined)
					{
						claimData.docPath = $scope.filedtailsforProfile.fileURL;						 	
					}

					claimData.reimbursementTypeId = $scope.selectedReimbursment.reimbursementTypeId;
					claimData.repatId = $scope.RepatData.id;
					claimData.createdby = $rootScope.userdetails.id;
					claimData.userid = $rootScope.userdetails.id;
					if(($scope.claimedId != 0 && $scope.ClaimList.length != 0) && $scope.claimedId != undefined)
					{
						claimData.claimedId=$scope.claimedId;
					}			 	 
					//check for duplicate 
					claimData.duplicateId = 0;

					if($scope.claimFlag == 2)
					{
						claimData.claimedId = $scope.expenseObj.claimedNumber;
					} 
					//$scope.ClaimList.push(claimData);
					$scope.claimDataForModal=claimData;
					validateClaim(claimData);
				}
			});
		} 

		$(".loader").fadeOut("slow");
	};

	$scope.deletefromlist = function(id,claimedId){

		$(".loader").show(); 

		Employee_Service.deletefromlist(id,claimedId).then(function(response){
			$scope.deleteStatus = response.data; 
			//console.log($scope.deleteStatus);
			if($scope.deleteStatus = "success")
				GlobalModule_notificationService.notification("success","Your claim request has been deleted");

			$scope.fetchClaimedList(claimedId,null,null);		
		});	
		$(".loader").fadeOut("slow");

	};


	$scope.saveClaimedList = function(claimList){

		$(".loader").show();
		var ClaimedList=[];
		ClaimedList.push(claimList);
		console.log($scope.selectedfile);
		//console.log(ClaimedList);
		Employee_Service.claimExpense(ClaimedList).then(function(response){
			$scope.ClaimList = response.data; 
			//console.log($scope.ClaimList);
			$scope.claimedId=$scope.ClaimList[0].claimedId;
			
			$scope.travelDistanceFlag=false;
			$scope.finalDistanceInKm=0;
			//console.log($scope.ClaimList);
			if($scope.ClaimList.length > 0)
				GlobalModule_notificationService.notification("success","Your claim has been added successfully");	
			
			
			$scope.travelFlag=false;
			$scope.claim = {};
			$scope.expenseDate = null;
			
			console.log($scope.selectedfile);
			$scope.selectedfile="";
			$('#date').val(null);
			document.getElementById('documentfile').value=null;
			document.getElementById('docfilepath').value=null;
		});	
		$(".loader").fadeOut("slow");
	};

	$scope.fetchClaimedList = function(id,colName,order){

		$(".loader").show();
		
		Employee_Service.fetchLatestClaimedList(id,colName,order,$rootScope.userdetails).then(function(response){
			$scope.ClaimList = response.data;	
			console.log($scope.ClaimList);
			$('#reinmbursement-drpdwn').hide();
			$('#reimbursement-detail').show();
		});		
		
		$(".loader").fadeOut("slow");
	};
	if($scope.claimFlag != 3)
	{
		$scope.fetchClaimedList($scope.expenseObj.claimedNumber,null,null);
	}

	$scope.SortingExpensesList = function(colName){
		  
		  $scope.colName=colName;
		 
			if($scope.order == undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order != undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			/*if($scope.search=="" || $scope.search == null)
			  {
			  $scope.search= undefined;
			  
			  }*/
			if($scope.colName == null)
			  {
			  $scope.colName = undefined; 
			  }
						
			$scope.fetchClaimedList($scope.expenseObj.claimedNumber,$scope.colName,$scope.order);	
	};
	
	
	$scope.submitClaimedList= function(claimedId){

		Employee_Service.submitClaimedList(claimedId).then(function(response){

			$scope.submitStatus = response.data;

			$state.go("restricted.eprofile");
		});
	};

	$scope.showDetails= function(claim){

		$(".loader").show();

		$("#claimedlist").hide();

		$scope.claimDetails=claim;

		$("#claimed_detail").show();

		$(".loader").fadeOut("slow");
	};


	$scope.download = function(path){

		//window.open(path);
		if(path.includes("amazonaws"))
		{
			$rootScope.getSignedURL(path).then(function(response){
				window.open(response.data);
			},function(response){
				GlobalModule_dataStoreService.errorResponseHandler(response);
			});
		}
		else
		{
			window.open(path);
		}				
	};

	/*$scope.fetchLatestClaimedList= function(claimedId){

		Employee_Service.fetchLatestClaimedList(claimedId).then(function(response){
			  $scope.ClaimList = response.data; 
			  console.log($scope.ClaimList);
			  if($scope.ClaimList.length > 0 && $scope.claimeFlag == false)
				  GlobalModule_notificationService.notification("success","Your Claim request added");			 			  
			});			
	};*/
	var fromLocation;
	var toLocation;
	$scope.initAutocomplete=function(){
		
		google.maps.event.trigger(map, "resize");
		var card = document.getElementById('pac-card');
		var input = document.getElementById('pac-input-from');
		var input_to = document.getElementById('pac-input-to');
		map.controls[google.maps.ControlPosition.TOP].push(card);

		var autocomplete = new google.maps.places.Autocomplete(input);
		var autocomplete_to = new google.maps.places.Autocomplete(input_to);

		var infowindow = new google.maps.InfoWindow();
		var infowindowContent = document.getElementById('infowindow-content');
		infowindow.setContent(infowindowContent);
		var marker_from = new google.maps.Marker({
			map: map,
			anchorPoint: new google.maps.Point(0, -29)
		});
		var marker_to = new google.maps.Marker({
			map: map
		});
		
		autocomplete.addListener('place_changed', function() {
			infowindow.close();
			marker_from.setVisible(false);
			var place = autocomplete.getPlace();
			
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}
			fromLocation=place.geometry.location;
			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);  // Why 17? Because it looks good.
			}
			marker_from.setPosition(place.geometry.location);
			marker_from.setVisible(true);

			var address = '';
			if (place.address_components) {
				address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
					].join(' ');
			}

			infowindowContent.children['place-icon'].src = place.icon;
			infowindowContent.children['place-name'].textContent = place.name;
			infowindowContent.children['place-address'].textContent = address;
			$scope.claim.from=address;
			infowindow.open(map, marker_from);
		});
		autocomplete_to.addListener('place_changed', function() {
			infowindow.close();
			marker_to.setVisible(false);
			var place = autocomplete_to.getPlace();
			toLocation=place.geometry.location;
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}

			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(12);  // Why 17? Because it looks good.
			}
			marker_to.setPosition(place.geometry.location);
			marker_to.setVisible(true);

			var address = '';
			if (place.address_components) {
				address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
					].join(' ');
			}
			infowindowContent.children['place-icon'].src = place.icon;
			infowindowContent.children['place-name'].textContent = place.name;
			infowindowContent.children['place-address'].textContent = address;
			$scope.claim.to=address;
			infowindow.open(map, marker_to);
		});
	};
	
	$('#travel-from').hide();
	$('#travel-to').hide();
	$scope.calculateDistance=function() {
		//console.log(toLocation);
		
		if(toLocation == undefined)
		{
			GlobalModule_notificationService.notification("error","Please select locations from map");
			return;
		}
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
				{
					origins: [fromLocation],
					destinations: [toLocation],
					travelMode:  google.maps.TravelMode.DRIVING,
				      unitSystem: google.maps.UnitSystem.IMPERIAL,
				      avoidHighways: false,
				      avoidTolls: false
				}, function(response, status) {
					//console.log(response);
					
					var travelDistance=response.rows[0].elements[0].distance.text;
					
					//console.log(travelDistance.replace('mi', ''));
					var dist1=travelDistance.replace('mi', '');
					var dist3=dist1.replace(',', '');
					var dist2=parseFloat(dist3) * 1.609344 ;
					$scope.finalDistanceInKm=dist2;	
					//alert($scope.finalDistanceInKm);
					$('#travel-from').show();
					$('#travel-to').show();
					//console.log($scope.finalDistanceInKm);
					//console.log($scope.finalDistanceInKm * 1.609344);
				});
		$('#mapmodal').modal('hide');
	};
	
	$scope.initMap=function() {
		
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -33.8688, lng: 151.2195},
			zoom: 13
		});
		$scope.initAutocomplete();
	};
	
	$scope.openMapModal=function(){
		$('#mapmodal').modal('show');
		$scope.travelDistanceFlag=true;
	};
	
	
	var validateClaim=function(claim){
		
		for(var i=0;i<$scope.expenseHeadList.length;i++)
		{
			//$scope.maxBrandAmnt=$scope.expenseHeadList[i].brand.amount;
			
			$(".loader").show();
			
				if(claim.expense_typeId == $scope.expenseHeadList[i].expense_typeId)
				{										
					if($scope.expenseHeadList[i].brand.amount != 0)
					{
						var claimAmnt=(claim.currencyTypeClmAmnt).replace(',','');
						claim.claimedAmount=parseInt(claimAmnt);
						if(claim.claimedAmount > $scope.expenseHeadList[i].brand.amount)
						{	
							$(".loader").fadeOut("slow");
							$("#warning-modal").modal('show');
							//GlobalModule_notificationService.notification("error","Your claimed amount exceeds the max amount,max amount for your brand is " +$scope.expenseHeadList[i].brand.amount);						 
							break;						
						}
						else
						{
							$scope.saveClaimedList(claim);
							break;
						}
					}
				}		 		
		}
		
	};
	
	if($scope.claimFlag != 3)
	{
		$scope.RepatData = $scope.expenseObj;
		$scope.selectedReimbursment = $scope.expenseObj;
	}
		
	if($scope.claimFlag == 2)
	{
		//console.log($scope.RepatData);
		//console.log($scope.selectedReimbursment);
		
		var disImrkDate = $scope.formatDate($scope.RepatData.disembarkDate);

		var dateParts2 = (disImrkDate).split('-');

		var d2=new Date(dateParts2[2],parseInt((dateParts2[1]))-1,dateParts2[0]);

		if($scope.RepatData.mmiDate == undefined || $scope.RepatData.mmiDate == "" || $scope.RepatData.mmiDate == null)
		{												
			$scope.maximumDate=addMaxDays(d2);
		}
		else
		{
			var addMaxDt =addMaxDays(d2);
			var dateParts5=addMaxDt.split('-');
			var d3=new Date(dateParts5[2],parseInt((dateParts5[1]))-1,dateParts5[0]);

			var mmidt=$scope.formatDate($scope.RepatData.mmiDate);
			var dateParts4=mmidt.split('-');
			var d4=new Date(dateParts4[2],(parseInt(dateParts4[1]))-1,dateParts4[0]);

			var greaterDt=checkDates(d3,d4);

			if(greaterDt == true)
			{
				$scope.maximumDate=mmidt;
			}
			else
			{
				$scope.maximumDate=addMaxDt;
			}				
		}
		
		$scope.initMap();
	}
	
	$scope.formatCurrency=function(index){
		
		var el=document.getElementById('claim-amount');
		var elType = null; // input or other
		var value = null;
		// get value
		if($(el).is('input') || $(el).is('textarea')){
			value = $(el).val().replace(/,/g, '');
			elType = 'input';
		} else {
			value = $(el).text().replace(/,/g, '');
			elType = 'other';
		}
		// if value changes
		$(el).on('paste keyup', function(){
			value = $(el).val().replace(/,/g, '');
			formatElement(el, elType, value); // format element
		});
		formatElement(el, elType, value); // format element				
};

function formatElement(el, elType, value){
	var result = '';
	var valueArray = value.split('');
	var resultArray = [];
	var counter = 0;
	var temp = '';
	for (var i = valueArray.length - 1; i >= 0; i--) {
		temp += valueArray[i];
		counter++;
		if(counter == 3){
			resultArray.push(temp);
			counter = 0;
			temp = '';
		}
	};
	if(counter > 0){
		resultArray.push(temp);				
	}
	for (var i = resultArray.length - 1; i >= 0; i--) {
		var resTemp = resultArray[i].split('');
		for (var j = resTemp.length - 1; j >= 0; j--) {
			result += resTemp[j];
		};
		if(i > 0){
			result += ',';
		}
	};
	if(elType == 'input'){
		$(el).val(result);
	} else {
		$(el).empty().text(result);
	}
}

var formatAllCurrency=function(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

$scope.fileNameChanged = function(element)
{
			  
	$scope.input = document.getElementById('documentfile');			   
	if($scope.input.value!="")
	{						
		var filename=$scope.input.value;
		filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
		$('#docfilepath').val(filename);				
	}
};
	
var fetchTransportMode = function(){

	$(".loader").show();

	Employee_Service.fetchTransportMode().then(function(response){
		$scope.transportModeList = response.data;	
		
	});

	$(".loader").fadeOut("slow");
};


}]);