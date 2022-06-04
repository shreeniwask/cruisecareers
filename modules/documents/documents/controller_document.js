var controllers=angular.module("LoginModule")

controllers.controller('DocumentController',function($scope,$rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,DocumentService,Admin_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
		$scope.documentList=[];
		$scope.offset=0;
		$scope.limit=10;

	$scope.fetchDocumentList = function(offset,limit,colName,order,search){

		$(".loader").show();
		if(search==null || search=="")
		{
			search= undefined;		  
		}
		if(colName == null || colName== ""){
			colName = undefined;
		}
		if(order == null){
			order = undefined;
		}

		DocumentService.fetchDocumentList(offset,limit,colName,order,search).then(function(response){
			$scope.documentList=response.data;
			console.log($scope.documentList);
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	$scope.fetchDocumentList(0,10,null,null,null);


//	pagination
	$scope.setButton = function(){
		$scope.navButtons = [];

		for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
			$scope.navButtons.push(j);
		}
		$scope.fetchDocumentList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};

	$scope.fetchDocumentListCount=function(searchterm){

		$scope.offset =0 ;
		$scope.navButtons = [];
		$scope.count= 0 ;
		$scope.start = 0;
		$scope.search=searchterm;
		if($scope.colName == null){
			$scope.colName = undefined;
		}
		if($scope.order == null){
			$scope.order = undefined;
		}
		if($scope.search=="" || $scope.search == null)
		{
			$scope.search= undefined;  
		}

		DocumentService.fetchDocumentListCount($scope.search).then(function(response){				
			$scope.count = response.data;
			if($scope.count>$scope.limit){
				$scope.setButton();					
			}

		},function(response){
			$(".loader").fadeOut("slow");		
		});		
	};
	$scope.fetchDocumentListCount(null);

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
		$scope.fetchDocumentList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
	};


//	--------------------sorting---------------------------------

	$scope.SortingDocumentList = function(colName,searchterm){
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
		$scope.fetchDocumentList(0,10,$scope.colName,$scope.order,$scope.search);	
	};
	
	
	// //-----settings------
	var getSettings = function(){
		
		$(".loader").show();
		
		Admin_Service.getSettings($rootScope.userdetails.id,18).then(function(response){
			  $scope.columnlist = response.data;
			  console.log($scope.columnlist);
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Id' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Id' || $scope.columnlist[j].name=='File Name' || $scope.columnlist[j].name=='Date' || $scope.columnlist[j].name=='File Type' || $scope.columnlist[j].name=='Emp Id' || $scope.columnlist[j].name=='Emp Name'){
									$scope.columnlist[j].isActive=true;
								}
							}
						}
						if($scope.columnlist[i].isActive==true)
							{
							count++;
							}
					}
			
		if(count==$scope.columnlist.length)
			{
			$scope.colcheck=true;
			}else{
				$scope.colcheck=false;
			}
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});
		$(".loader").fadeOut("slow");
	};
	
	getSettings();
	
	$scope.savesettings = function(){
		
		$(".loader").show();
		
		var count=0;
		for(var i=0;i<$scope.columnlist.length;i++){
			if($scope.columnlist[i].isActive==true)
				{
				count++;
				}
		}

		if(count==$scope.columnlist.length)
		{
		$scope.colcheck=true;
		}else{
			$scope.colcheck=false;
		}	
		Admin_Service.savesettings($scope.columnlist,$rootScope.userdetails.id).then(function(response){
			  $scope.savesetFlag = response.data;	
		});
		$(".loader").fadeOut("slow");
	};
	
	$scope.activeColumn = function(columnName)
	{
		
		if($scope.columnlist != undefined){
		for(var i=0;i<$scope.columnlist.length;i++){
			if($scope.columnlist[i].name==columnName && $scope.columnlist[i].isActive==true)
				return true;
			}
		}
		return false;
	};
	
	
	$scope.selectAllColoumns = function(check)
	{
		$(".loader").show();
		
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Id' || $scope.columnlist[i].name=='File Name' || $scope.columnlist[i].name=='Date' || $scope.columnlist[i].name=='Emp Name'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
		$(".loader").fadeOut("slow");
	};
	
	
//------------------- Generate excel------------------------
	$scope.generateExcel = function(){		 
		  if($scope.search == undefined){
			  $scope.search ="";
		  }			 
		  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+18+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN'));		 
	  };
	
	$scope.dateformate = function(date){		     
      var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
      return dateOut;
};

$scope.openAddFieldsPage=function(workflow){
	  
	  GlobalModule_dataStoreService.storeData('LoginModule','fieldId',undefined);
	  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
	  $state.go("restricted.admin.addworkflowfield");
};

$scope.openEditWorkFlowPage=function(workflow){
	  
	  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
	  $state.go("restricted.admin.createworkflow");
};
	
$scope.openTasksListPage= function(workflow){
	  
	  GlobalModule_dataStoreService.storeData('LoginModule','workflowObject',workflow);
	  $state.go("restricted.admin.taskslist");
};
		
});

