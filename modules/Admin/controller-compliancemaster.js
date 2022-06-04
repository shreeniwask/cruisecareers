'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('ComplianceMaster_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service)
	{

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');

	//----------------View/fetch category list ------------------------- 

	$scope.fetchComplianceMasterList = function(offset,limit,colName,order,search){

		$(".loader").show();
		if(search=="" || search==null)
		{
			search= undefined;
		}
		if(colName == null || colName== ""){
			colName = undefined;
		}
		if(order == null){
			order = undefined;
		}

		Master_Service.fetchComplianceMasterList(offset,limit,colName,order,search).then(function(response){
			$scope.complianceList=response.data;
			//console.log($scope.complianceList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 

	};	
	$scope.fetchComplianceMasterList(0,10,null,null,null);


//	-------------------sorting compliance master list--------------------------

	$scope.SortingComplianceMasterList = function(colName,searchterm){
		$scope.offset =0 ;
		$scope.start = 0;
		$scope.colName=colName;
		$scope.search=searchterm;
		if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
		{
			$scope.order ="asc";
		}
		else if($scope.order!=undefined && $scope.order=="asc")
		{
			$scope.order = "desc";
		}
		if($scope.search=="" || $scope.search==null)
		{
			$scope.search= undefined;

		}
		if($scope.colName==null)
		{
			$scope.colName= undefined; 
		}
		$scope.fetchComplianceMasterList(0,10,$scope.colName,$scope.order,$scope.search);	
	}; 


	//--------------------------pagination--------------------------------

	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}		
		$scope.fetchComplianceMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};


	$scope.getComplianceCount=function(search){

		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=search;
		if($scope.search==null || $scope.search=="")
		{
			$scope.search= undefined;
		}
		if($scope.colName == null || $scope.colName== ""){
			$scope.colName = undefined;
		}
		if($scope.order == null){
			$scope.order = undefined;
		}
		Master_Service.getComplianceCount($scope.search).then(function(response){
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();
			}

		},function(response){

			$(".loader").fadeOut("slow");

		});		
	};
	$scope.getComplianceCount(null);

	$scope.previous = function() {
		$scope.start =  $scope.start - 5;
		$scope.offset = $scope.start * $scope.limit;
		$scope.setButton();

	};

	$scope.next = function() {
		$scope.start =  $scope.start + 5;
		$scope.offset = $scope.start * $scope.limit;

		$scope.setButton(); 

	};

	$scope.current = function(page) {  
		$scope.offset = page * $scope.limit;
		$scope.fetchComplianceMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};

	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchComplianceMasterList();
	};


	//-------------------------clear pop-up-------------------------------------------- 

	$scope.clear=function(){

		$scope.compliancemaster = {
				complianceName:"",
				complianceDuration:-1			  
		};
	}; 

	//-----------------save/insert compliance in list-----------------------	

	$scope.saveComplianceDetails=function(compliance){ 


		$(".loader").show();
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  		  	  
		if(compliance.complianceName != undefined || compliance.complianceName.match(letterNumber)){
			
	    		if($("#dis_candidate_check").is(":checked"))
	    			$scope.displayToCandidate = 1;
	    		else
	    			$scope.displayToCandidate = 0;
	    		
			compliance.displayToCandidate=$scope.displayToCandidate;
			compliance.userid=$rootScope.userdetails.id;
			Master_Service.saveComplianceDetails(compliance).then(function(response){
				$scope.savecompliancedetails = response.data;
				$scope.getComplianceCount(null);
				$scope.fetchComplianceMasterList(0,10,null,null,null);
				$scope.compliancemaster={};
				$state.go('restricted.admin.compliancemaster');

				if($scope.savecompliancedetails.indexOf("success")!=-1){

					GlobalModule_notificationService.notification("success","Your Compliance Details saved successfully");
					$("#add_compliance").modal('hide');

				}
				else if($scope.savecompliancedetails =='duplicate')
				{
					GlobalModule_notificationService.notification("error","Compliance Name already exist");
					$(".loader").fadeOut("slow");
 				}
				else if($scope.savecompliancedetails =='failed'){

					GlobalModule_notificationService.notification("error","Compliance Name already exist");
					$("#add_compliance").modal('hide');
				}
				else{
					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				}

				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");

			});
		}	    	
		else
		{

			GlobalModule_notificationService.notification("error","Please enter valid value");

		}
	};

	//---------------------------------------------------------------------------------------------------

	//---------------------------upload compliance form----------------------------------------------	  
	$scope.openModal=function(c){
		$scope.complianceFormPath="";
		$scope.complianceid=c.id;
		//console.log(c.complianceFormPath);
		$scope.complianceFormPath=c.complianceFormPath.substr(85, c.complianceFormPath.length);
	};


	$scope.fileNameChanged = function(element)
	{
		var index = angular.element(element).scope().$index;
		$scope.input = document.getElementById('documentfile');			   
		if($scope.input.value!="")
		{

			var filename=$scope.input.value;
			filename=filename.substr(filename.lastIndexOf("\\")+1, filename.length);					
			$('#docfilepath').val(filename);
		}
	};

	$scope.uploadFile = function()
	{	
		$(".loader").show();
		
		var input = document.getElementById('documentfile');

		if(input.value!="" || input.value != undefined)
		{
			var file = input.files[0];
			if(file == undefined)
			{
				$("#uploadform").modal('hide');
				GlobalModule_notificationService.notification("success","Compliance form has been updated successfully");
				$(".loader").fadeOut("slow");
			}
			else
			{
				var formData = new FormData();
				formData.append("file",file);
				formData.append("id",$scope.complianceid);
				formData.append("userid",$rootScope.userdetails.id);				

				input.value="";

				$.ajax({
					url: 'rest/compliancemaster/upload/complianceform',
					type: 'POST',
					data: formData,

					async: true,
					cache: false,
					contentType: false,
					processData: false,
					success: function (response) {

						$("#uploadform").modal('hide');
						GlobalModule_notificationService.notification("success","Compliance form has been uploaded successfully");									  																  
						$(".loader").fadeOut("slow");								  								
						$scope.fetchComplianceMasterList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
					}
				});
			}
		}
	};		 

	//------------------------------------------------------------------------------------------

//	------------------------update compliance details-------------------------

	$scope.updateComplianceDetails=function(compliance){

		$(".loader").fadeOut("slow");
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;  		  	  
		if(compliance.complianceName != undefined || compliance.complianceName.match(letterNumber)){

			if($("#edit_dis_candidate_check").is(":checked"))
    			$scope.displayToCandidate = 1;
    		else
    			$scope.displayToCandidate = 0;
    		
			compliance.displayToCandidate=$scope.displayToCandidate;
			compliance.userid=$rootScope.userdetails.id;
			Master_Service.updateComplianceDetails(compliance).then(function(response){

				$scope.updatecompliancedetails = response.data;	

				$scope.getComplianceCount(null);
				$scope.fetchComplianceMasterList(0,10,null,null,null);
				$scope.compliancemaster={};
				if($scope.updatecompliancedetails.indexOf("success")!=-1){

					GlobalModule_notificationService.notification("success","Your Compliance Details updated successfully");

					$state.go('restricted.admin.compliancemaster');

					$("#edit_compliance").modal('hide');

				}
				else if($scope.updatecompliancedetails =='failed'){

					GlobalModule_notificationService.notification("error","Compliance Name already exist");
					$("#edit_compliance").modal('hide');
				}
				else{

					GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
				}
				$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");  
			});

		}
		else 
		{
			GlobalModule_notificationService.notification("error","Please enter valid value");
		}

	};

	//----------------------------------------------------------------------------------	

	//------------------------Delete compliance from list--------------------------------


	$scope.deleteComplianceFromList = function(formlist){

		$(".loader").fadeOut("slow");
		$scope.formlist=formlist;

		$("#deletelist").modal('show');
		Master_Service.deleteComplianceFromList($scope.formlist,$scope.getCheckedcomplianceid).then(function(response){
			$scope.complianceflag = response.data;	
			$scope.getComplianceCount(null);
			$scope.fetchComplianceMasterList(0,10,null,null,null);
			$scope.getCheckedcomplianceid=[];
			if($scope.complianceflag.indexOf("success")!=-1){
				GlobalModule_notificationService.notification("success","Record deleted successfully");
			}else{
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		});
	};

	//---------------------------------------------------------------------------	



	//-------------------------Get no of checked compliance------------------------

	$scope.getCheckedcomplianceid=[];

	$scope.checkedcomplianceList = function(id){			  

		if($scope.getCheckedcomplianceid.indexOf(id) !== -1)
		{		
			var array  = $scope.getCheckedcomplianceid;
			var index = array.indexOf(id);
			$scope.getCheckedcomplianceid.splice(index,1);
		}else
		{		    	
			$scope.getCheckedcomplianceid.push(id);				      
		};						  
	};
	
	$scope.displayToCandidateToggle = function(id,event){			  
		$scope.id=id;
		$(".loader").show();
		var checkstatus=event.target.checked;
		Master_Service.displayToCandidateToggle($scope.id,checkstatus).then(function(response){
			$scope.change_status = response.data;
			$state.reload();

		},function(response){

			$(".loader").fadeOut("slow");

		});				  
	};

	$scope.checkedAllList = function(listedCompliance,rd){				  
		if(rd == true || rd == undefined){				 
			for(var i=0; i<listedCompliance.length; i++){					  

				//if already exist in getCheckedcomplianceid than don't pass
				if($scope.getCheckedcomplianceid.indexOf(listedCompliance[i].id) !== -1)   {  						 
				}else{

					$scope.checkedcomplianceList(listedCompliance[i].id);	
				}

			}			
		}else{
			$scope.getCheckedcomplianceid=[];
		}
	};


	$scope.check = function(){	

		if($scope.getCheckedcomplianceid.length == 0){

			GlobalModule_notificationService.notification("error","Please select any record");

		}
		else{				  
			$('#deletelist').modal('show');
		}			  
	};


	$scope.clear=function(){

		$scope.compliancemaster = {
				complianceName:"",
				complianceDuration:""						  			  
		};
		$('#dis_candidate_check').prop('checked', false);
	};	

	$scope.compliancedata=function(c){

		$scope.compliancemaster = {
				complianceName:"",
				complianceDuration:""
		};
		$scope.compliancemaster.id=c.id;
		$scope.compliancemaster.complianceName=c.complianceName;
		$scope.compliancemaster.complianceDuration=c.complianceDuration;
		if(c.displayToCandidate ==1 ){
			$scope.compliancemaster.displayToCandidate=true;
		}else{
			$scope.compliancemaster.displayToCandidate=false;
		}
		
	};


	$scope.download = function(path){
		   
		 
			window.open(path);
			 
	};
	
	
	$scope.PreviewDownload = function(path){
		 
		if(path.includes(".jpg") || path.includes(".pdf") || path.includes(".png"))
		{
		$scope.imageFlag=true;
		if(path.includes(".pdf"))
		{
		$scope.imageFlag=false;
		$scope.pdfFlag=true;
		}else{
		$scope.imageFlag=true;
		$scope.pdfFlag=false;
		}
		if(path.includes("amazonaws"))
		{
		$rootScope.getSignedURL(path).then(function(response){

		$scope.fileurl=response.data;
		$scope.pdfDocPath=$sce.trustAsResourceUrl($scope.fileurl);
		console.log($scope.pdfDocPath);
		},function(response){
		GlobalModule_dataStoreService.errorResponseHandler(response);
		});
		  }
		}

		 else
		 $scope.imageFlag=false;
		if(!(path.includes(".pdf"))){
		  $scope.pdfFlag=false
		}
		};
	
		$scope.checkDiplayToCandidate=function(){	
		
			if($("#dis_candidate_check").is(":checked"))
				$('#dis_candidate_check').prop('checked', true);
   		
		}; 
		
			
	}]);