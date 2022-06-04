'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Appliedjobs_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Customer_Service','assessEngine_Service','Master_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Customer_Service,assessEngine_Service,Master_Service){

	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	console.log($rootScope.userdetails);
	$scope.slots={};
	$scope.slot={};
	$scope.Slotid=0;
	$scope.offset=0;
	$scope.limit=10;
	$scope.navButtons = [];
	$scope.removeusersBySlotId={};
	$scope.selectedEvent;
	$scope.senderId=$rootScope.userdetails.id;
	//$scope.empData;
	$scope.filter="nofilter";
	
	$scope.getSettings = function(){
		Admin_Service.getSettings($rootScope.userdetails.id,1).then(function(response){
			  $scope.columnlist = response.data;	
			var count=0;
					for(var i=0;i<$scope.columnlist.length;i++){
						if($scope.columnlist[i].name=='Name' && $scope.columnlist[i].isActive==false){
							for(var j=0;j<$scope.columnlist.length;j++){
								if($scope.columnlist[j].name=='Ref. No.' || $scope.columnlist[j].name=='Name' || $scope.columnlist[j].name=='Applied Position' || $scope.columnlist[j].name=='Rating' || $scope.columnlist[j].name=='Experience' || $scope.columnlist[j].name=='Status' || $scope.columnlist[j].name=='Interview' || $scope.columnlist[j].name=='Email'){
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
	};
	$scope.getSettings();
	
	$scope.appliedJobs=[];
	
	$scope.activefilter = "onlyactive";

	  $scope.fetchAppliedJobs = function(offset,limit,colName,order,search,advancesearch,activefilter){
		  $(".loader").show();
		  //$scope.advancesearch={};
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
			 if(advancesearch == null){
				 advancesearch = {};
			 }
			 if(advancesearch != null && advancesearch != {}){
				 $scope.filter="setfilter";
			 advancesearch.dob=document.getElementById('dob').value;
				 $scope.advancesearch=advancesearch;
			 }
			// advancesearch={name:"dsf"};
		  Admin_Service.fetchAppliedJobs(offset,limit,colName,order,search,$scope.advancesearch,activefilter).then(function(response){
			  $scope.appliedJobs = response.data;
			
			  console.log($scope.appliedJobs);
			//alert($scope.appliedJobs[0].email);
			  if($scope.appliedJobs.length == 0){
				  GlobalModule_notificationService.notification("error","Please enter valid input");
				  return;
			  }
			  $('#rd').prop('checked', false);
			  
			  $(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
			});		   
	  };
	  $scope.fetchAppliedJobs(0,10,null,null,null,null,$scope.activefilter);
	 
	  $scope.getAppliedJobcount=function(searchterm,advancesearch,activefilter){
			$(".loader").show();
			
			$scope.offset =0 ;
			$scope.navButtons = [];
			$scope.count= 0 ;
			$scope.start = 0;
			$scope.search=searchterm;
			$scope.advancesearch=advancesearch;
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
			 if($scope.advancesearch == null){
				 $scope.advancesearch = {};
			 }
			 
			 if($scope.advancesearch != null && $scope.advancesearch != {}){
				 $scope.filter="setfilter";
				 $scope.advancesearch.dob=document.getElementById('dob').value;
			 }
			 
			
			Admin_Service.getAppliedJobcount($scope.search,$scope.advancesearch,activefilter).then(function(response){
				
				$scope.count = response.data;
				$("#advance_search").modal("hide");
				$(".loader").fadeOut("slow");
				if($scope.count>$scope.limit){
					$scope.setButton();
				}
				/*if($scope.count==0){
					GlobalModule_notificationService.notification("error","Please Enter valid inputs");
				}*/
			
			
			},function(response){
				$(".loader").fadeOut("slow");		
			});		
		};
		$scope.getAppliedJobcount(null,null,$scope.activefilter);
		
		
		//<----Filtered Applied  job---->
		
		/* $scope.fetchFilteredAppliedJobsList = function(offset,limit,advancesearchobj){
			  $(".loader").show();
			  if(advancesearchobj==null || advancesearchobj=="")
				  {
				  advancesearchobj= undefined;
				  
				  }
			
			  Admin_Service.fetchFilteredAppliedJobsList(offset,limit,advancesearchobj).then(function(response){
				  $scope.appliedJobs = response.data;
				  console.log($scope.appliedJobs);
				//alert($scope.appliedJobs[0].email);
				  $('#rd').prop('checked', false);
				  
				  $(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
				});		   
		  };
		 */
		  	$scope.toggleactivejobs=function(actradio){
		  		if(actradio != undefined){
		  			$scope.activefilter = actradio;
		  			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search,$scope.advancesearch,actradio);
		  			$scope.getAppliedJobcount(null,$scope.advancesearch,actradio);
		  		}
		  	};
		
				
			 $scope.clearfilteredcount=function(){

				 $scope.advancesearch = {
				 name:"",
				 email:"",
				 passportId:"",
				 referNumber:"",
				 dob:""
				     
				 };
				};
			
		  
	  
	$scope.savesettings = function(){
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
		if(check==true)
			{
			for(var i=0;i<$scope.columnlist.length;i++){
				 $scope.columnlist[i].isActive=true;
					
			}
			}else{
				for(var i=0;i<$scope.columnlist.length;i++){
					if($scope.columnlist[i].name=='Name' || $scope.columnlist[i].name=='Ref. No.' || $scope.columnlist[i].name=='User Status'){
						$scope.columnlist[i].isActive=true;
						}else{
							$scope.columnlist[i].isActive=false;
						}
					}
					
				}
	};
	  
	  $scope.setButton = function(){
			$scope.navButtons = [];
			
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
				}
				if($scope.filter == "nofilter"){
				 $scope.fetchAppliedJobs($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.advancesearch);
				}
				};
		
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
	        $scope.fetchAppliedJobs($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.advancesearch,$scope.activefilter);
	    };
	    
	    
	    //fetch modes of communication
	    
	    $scope.fetchCommunicationModes = function(){
	    	$(".loader").show();
	    	Admin_Service.fetchCommunicationModes().then(function(response){
				  $scope.modesList = response.data;
				  $(".loader").fadeOut("slow");	
			},function(response){
				$(".loader").fadeOut("slow");	
				});
	    	
	    };
	    $scope.fetchCommunicationModes();
	    
	    
	    $scope.fetchTmplttypeslist= function(id){
	    
	    	$(".loader").show();	 
	    	$scope.modeid=id;
	    	Admin_Service.fetchTemplatetypeList(id).then(function(response){	    		
	    		$scope.temptypelist=response.data;	    		
	    		$(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");	
	    	});
	    };
	    
	    $scope.openUserDetailPage =function(candidate){		
	    	
	    	var flag=$scope.enableDisableToDo(candidate.userid,candidate.jobId);

			GlobalModule_dataStoreService.storeData('LoginModule','applicationStatus',$scope.applicationStatus);
			GlobalModule_dataStoreService.storeData('LoginModule','selectedPostion',$scope.selectedPostion);
	    	GlobalModule_dataStoreService.storeData('LoginModule','flag',flag);
			GlobalModule_dataStoreService.storeData('LoginModule','appliedJobs',candidate);
			GlobalModule_dataStoreService.storeData('LoginModule','backbutton','appliedjobs');
			$state.go("restricted.admin.candidatelist");
		};
		
	    $scope.Slotflag = false;
	    $scope.communicationmanager={};
	    $scope.fetchTmpltpreview= function(id){
	    	$(".loader").show();	
	    	Admin_Service.fetchTmpltpreview(id).then(function(response){	    		
	    		$scope.tmptpreview=response.data;
	    		
	    		if($scope.tmptpreview[0].Body.indexOf("${schedule}") > -1){	
	    			
	    			if($scope.usersdetailforEmail.length == 1){	    				
	    				$scope.Slotflag = true;	 
	    				$scope.fetchUserEventsAndSlots($scope.selectedUserId);	    	
	    			}else{	
	    				$scope.communicationmanager={};
	    				$scope.tmptpreview[0].Body = null;	    				
	    				$('#comm-manager').modal("hide");
	    				$scope.Slotflag = false;
	    				GlobalModule_notificationService.notification("error","Please select only one user for scheduler mail");	  				
	    			}	    			
	    		}else{
	    			$scope.Slotflag = false;	
	    		}
	    		
	    		$(".loader").fadeOut("slow");	
	    	},function(response){
	    		$(".loader").fadeOut("slow");	
	    	});
	    	
	    };
	    
	 
	    $scope.fetchUserEventsAndSlots = function(userid){	    	
	    	Admin_Service.fetchUserEventsAndSlots(userid).then(function(response){	    		
	    		$scope.UserEventsAndSlots=response.data;	
	    		   $scope.EventSolts=[];
	    		for(var i=0; i<$scope.UserEventsAndSlots.length; i++){
	    			
	    			$scope.EventSolts[i] = $scope.UserEventsAndSlots[i].name +" - "+ $scope.dateformate($scope.UserEventsAndSlots[i].dateTime); 
	    		}
	    		console.log( $scope.dateformate);
	    		if($scope.EventSolts.length == 0){
	    			$scope.communicationmanager={};
    				$scope.tmptpreview[0].Body = null;	    				
    				$('#comm-manager').modal("hide");
    				$scope.Slotflag = false;
    				GlobalModule_notificationService.notification("error","Please assign slot to selected user");
    				}	    		
	    	});	    	
	    	 
	    };
	  
	
	    $scope.changealias = function(s){	
	    	$scope.slotTime = s.split(" - ")[1];
	    	$scope.eventName = s.split(" - ")[0];	
	    };
	   
	    $scope.getsubtemplateTypeList=function(id){	
			 Admin_Service.getsubtemplateTypeList(id).then(function(response){
				 $scope.SubTemplateTypeList=response.data;				
			 });			 
		 } ;
	   
	    
	
	   $scope.usersdetailforEmail = [];
	   $scope.selectedCandidatenames=[];
	   
	    $scope.getuserforemail= function(userid,jobid,jname,status,role,refrencenumber){	    	
	    	$scope.usersDetailsForEmail ={};
	    	$scope.usersDetailsForEmail.userid = userid;
	    	$scope.usersDetailsForEmail.id = jobid;	  
	    	$scope.usersDetailsForEmail.status = status;
	    	$scope.usersDetailsForEmail.rolId=role;
	    	$scope.usersDetailsForEmail.refId=refrencenumber
	    	
	      $scope.usersdetailforEmail.push($scope.usersDetailsForEmail);	
	     
	      $scope.selectedCandidate ={};
	    	$scope.selectedCandidate.userid = userid;
	    	$scope.selectedCandidate.name = jname;
	      $scope.selectedCandidatenames.push($scope.selectedCandidate);	
	 };	
	 
	 $scope.openModalForInterview=function(id){
		 
		 if($scope.usersdetailforEmail.length==0){
				GlobalModule_notificationService.notification("error","Please select user to assign slot");
				$scope.clearEvent();
			}
		 else
			 {
			 //check valid user or not for this operation
			 for(var i=0;i<$scope.usersdetailforEmail.length;i++){
					var userid=$scope.usersdetailforEmail[i].id;
					var status=$scope.usersdetailforEmail[i].status;
					var assignassessflag=$scope.Userdata[i].mappreqid;
					if(assignassessflag==undefined){
						assignassessflag=false;
					}
					var discard=0;
					if((status=="Shortlisted" && assignassessflag==false) || status=="Assessment Completed" || status=="Interview Completed"  || status=="Peer Review Started" ){
						discard=0;
					}else{
						discard=1;
						break;
					}
				}
				if(discard!=0){
					 $('#invaliduserselected').modal('show');
				}
				else{

			
					if(true){
					for(var i=0;i<$scope.schedulernameList.length;i++)
					{						
					  if($scope.schedulernameList[i].id==id)
						  {
						   $scope.selectedEvent = $scope.schedulernameList[i].schedulerName;
						   break;
						  }			  
					}					
								 
					Admin_Service.getSlotsByEventId($scope.selectedEvent.id).then(function(response){
						 $scope.slotsListById=response.data;
						 
						 $scope.slot = $scope.slotsListById[$scope.slotsListById.length-1] ;
						 var date=$scope.slotsListById.dateTime;					 
						
					 });
					}
					
					$scope.checkuserinslot($scope.usersdetailforEmail,$scope.selectedEvent);
				}
					 }
		};
	
		
	
	
		$scope.sure = function(){
			$("#interview_schedule").modal('show');	
		};
		
		$scope.clearEvent=function()
		{
			$scope.selectedEvent=undefined;
		};
		
	 $scope.checkuserinslot = function(selectedUser,selectedEvent){
		 $scope.eventId = selectedEvent.id;		 
		 Admin_Service.checkuserinslot(selectedUser,$scope.eventId).then(function(response){	    		
	    		$scope.slotresult = response.data;
	    		
	    		if($scope.slotresult == undefined || $scope.slotresult <=0 ||$scope.slotresult == null){					 
					$("#interview_schedule").modal('show');											
				}
				else
					{							
					$("#checkuserinslot").modal('show');
					}
	    		
	    		
	    	},function(response){	    		
	    	});
		 };
	
	 
	 
	 $scope.removeuserforemail = function(userid,jobid) 
     {
		angular.forEach( $scope.usersdetailforEmail, function(value, key) 
      {
           if (value == userid) 
           {
           	 $scope.usersdetailforEmail.splice(key, 1);
           
           }
       });
		$scope.removeselectedcandidate(userid);
		
     };
     
     $scope.stateChanged = function (answers,userid,jobid,jname,status,role,refrencenumber) {   
    	
    	 $scope.selectedUserId = userid;   	 
    	 
    	   if(answers){ //If it is checked
    		   $scope.getuserforemail(userid,jobid,jname,status,role,refrencenumber);
    	   }else{
    		  for(var i=0;i<$scope.usersdetailforEmail.length;i++){
    				           if ($scope.usersdetailforEmail[i].id == jobid) 
    				           {
    				           	 $scope.usersdetailforEmail.splice(i, 1);
    				           }
    				       };
    	   }    	
    	   
    	};
    	
    	$scope.sortByColumn = function(colname,searchterm){
 		   $scope.offset =0 ;
 			$scope.start = 0;
 			$scope.colName = colname;
 			$scope.search=searchterm;
 			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
 			{
 				$scope.order ="asc";
 			}
 			else if($scope.order!=undefined && $scope.order=="asc")
 			{
 				$scope.order = "desc";
 			}
 			if($scope.search==null)
 			  {
 			  $scope.search= undefined;
 			  
 			  }
 			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search,null,$scope.activefilter);
 			
 		};
    	
	   $scope.orderByPosition = function(searchterm){
		   $scope.offset =0 ;
			$scope.start = 0;
			$scope.colName = "pm.position_name";
			$scope.search=searchterm;
			if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
			{
				$scope.order ="asc";
			}
			else if($scope.order!=undefined && $scope.order=="asc")
			{
				$scope.order = "desc";
			}
			if($scope.search==null)
			  {
			  $scope.search= undefined;
			  
			  }
			$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search,null);
			
		};
		//$scope.orderByPosition();
		 $scope.orderByLocation= function(searchterm){
			 $scope.offset =0 ;
				$scope.start = 0;
			 	$scope.search=searchterm;
				$scope.colName = "c.cityname";
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.search==null)
				  {
				  $scope.search= undefined;
				  
				  }
			
				$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search,null);
			};
			$scope.orderByExperiance= function(searchterm){
				$scope.offset =0 ;
				$scope.start = 0;
				$scope.search=searchterm;
				$scope.colName = "experiance";
				if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
				{
					$scope.order ="asc";
				}
				else if($scope.order!=undefined && $scope.order=="asc")
				{
					$scope.order = "desc";
				}
				if($scope.search==null)
				  {
				  $scope.search= undefined;
				  
				  }
				$scope.fetchAppliedJobs(0,10,$scope.colName,$scope.order,$scope.search,null);
			};
			
			
			//$scope.orderByLocation();
			$scope.applicationStatus=true;
			
	    $scope.userdata = function(j){
	    	//alert(j.status);
	    	//alert(j.requisition.decisionDate);
	    	//console.log(j);
	    	$scope.searchterm1='';
	    	$scope.userinfo=j;
	    	$scope.showflag= 1;
	    	document.getElementById("list1").setAttribute("class", "active"); 
	    	 for (var i=2;i<=9;i++)
			  {
				  document.getElementById("list"+i).setAttribute("class", ""); 
			  }
	    	 $scope.applicationStatus=true;
	    	$scope.fetchUserProfileDetails(j.userid);
	    	$scope.fetchProfileCompletion(j.userid);
	    	$scope.fetchUserRatings(j.userid,j.jobId);
	        $scope.communicatioLogList(j.userid);
	        $scope.schedulerLogList(j.userid);
	        $scope.fetchrequisitionListForUser(0,100,null,null,null,j.jobId);
	        $scope.status=j.status;
	    	$scope.username = j.name;	  
	    	$scope.location = j.location;
	    	$scope.id = j.userid;
	    	$scope.roleId=j.user.roleId;
	    	$scope.decisionDate=j.requisition.decisionDate;
	    	
	    	for(var i=0;i<$scope.appliedJobs.length;i++)
	    		{
	    		
	    		if($scope.appliedJobs[i].userid==j.userid && $scope.appliedJobs[i].status=='Selected')
	    			{
	    			$scope.applicationStatus=false;
	    			$scope.selectedPostion=$scope.appliedJobs[i].position;
	    			}
	    		}
	    	
	    	$scope.jobId = j.jobId; 
	    	$scope.userAppliedJobId=j.id;
	    	$('#decisionDate').val("");
	    	$scope.selectReq={decisionComment:"",decisionDate:""};
	    	
	    	$scope.decisionLoglistForUser();
	    	 $scope.fetchReqforSelected($scope.userAppliedJobId);
	    	 $scope.fetchComplianceDetails(j.userid);
	    	 
	    	// $scope.fetchRatingForAll();   //Dont call this method. it is to update rating for all applications
	    };	
	    	
	    $scope.fetchRatingForAll = function(jobId){		    	
	    	$scope.savFlage = false;
	    			    	
			  Admin_Service.fetchRatingForAll().then(function(response){					  
					  			  		  				
			});	    	
	    };
	    	$scope.alreadySelected = function()
	    	{
	    		alert('User is already selected for position : '+$scope.selectedPostion);
		    	//GlobalModule_notificationService.notification("error","User is already selected for "+$scope.selectedPostion);

	    	};
	    	
	        $scope.change = [];
		    $scope.myFunc = function(x) {	
		    	var index = $scope.change.indexOf(x.id);
		    	if (index > -1) {
		    		$scope.change.splice(index,1);
					}
		    	
		    	$scope.change.push(x.id);	    	
		    };
		    
		    
		    
		    $scope.assessmentFlag = 1;
		    $scope.AssessmentFlag = function(data){		    	
		    	if(data == 1){
		    	$scope.assessmentFlag = 1;		    	
		    	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
		    	 tab31.attr("class", "");		    	 
		    	 var tab21=angular.element(document.getElementById('activetab21'));
		    	 tab21.attr("class", "");								    	 
		    	 var tab11=angular.element(document.getElementById('activetab11'));		
		    	 tab11.attr("class", "active");			    	
		    	}
		    	if(data == 2){
		    		$scope.assessmentFlag = 2;
		    		var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
			    	 tab31.attr("class", "");		    	 
			    	 var tab21=angular.element(document.getElementById('activetab21'));
			    	 tab21.attr("class", "active");								    	 
			    	 var tab11=angular.element(document.getElementById('activetab11'));		
			    	 tab11.attr("class", "");	
		    	}
		    	if(data == 3){
		    		$scope.assessmentFlag = 3;
		    		var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
			    	 tab31.attr("class", "active");		    	 
			    	 var tab21=angular.element(document.getElementById('activetab21'));
			    	 tab21.attr("class", "");								    	 
			    	 var tab11=angular.element(document.getElementById('activetab11'));		
			    	 tab11.attr("class", "");	
		    	}
		    	if(data==4)
		    		{
		    		$scope.assessmentFlag = 4;	
		    		}
		    };
		    $scope.selecttabflag=0;
		    $scope.switchTab=function(assessmentObj){	
		    	$(".loader").show();		
		    	$scope.SelectedAssessment = assessmentObj;
		    	 if($scope.selecttabflag=="interviewassessment"){
		    	 $scope.clearQuestion();
	    		 $scope.interviewShowFlag=7;
	    		 $scope.id =$scope.userIdInterview;
				 $scope.AssessmentDateTime=assessmentObj.AssessmentDateTime;
				 $scope.tempName=assessmentObj.name;
				 $scope.positionNamefordetail=assessmentObj.position.name;
				 $scope.interviewerName=assessmentObj.InterviewerName;
		    	 }else{
		    	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
		    	 tab31.attr("class", "active");		    	 
		    	 var tab21=angular.element(document.getElementById('activetab21'));
		    	 tab21.attr("class", "");
		    	 $scope.assessmentFlag = 3;		   
		    	 }
		    	
		    	 
		    	 Admin_Service.fetchQuestionAns($scope.SelectedAssessment,$scope.id,$scope.selecttabflag).then(function(response){					  
					  $scope.QuestionAnsList = response.data; 	
					  //console.log($scope.QuestionAnsList);
					  
					  for(var i=0;i<$scope.QuestionAnsList.length;i++){
						  $scope.QuestionAnsList[i].shortAnsScore = $scope.FormateAnsScore($scope.QuestionAnsList[i].shortAnsScore);
					  }
					 $(".loader").fadeOut("slow");  				
			});			    	 
		    };
		    
		    $scope.getAssessmentTestImages = function(assessmentObj){
		    	$(".loader").show();
		    	
		    	 Admin_Service.getAssessmentTestImages(assessmentObj.id,$scope.id).then(function(response){					  
					  $scope.assessmentTestImages = response.data; 	
					 		//console.log($scope.assessmentTestImages);
					 $(".loader").fadeOut("slow");  				
			});	
		    };
		    
		    $scope.FormateAnsScore=function(shortAnsScore){
		    	//alert(shortAnsScore);parseFloat parseInt
		    	var a = parseFloat(shortAnsScore);
		    	return a;
		    };
		   
		    $scope.checkedUserAns  = function (ansId,UserAns){ 		    	 
		    var Ids = [];
		    	
		    	for(var i=0;i<UserAns.length;i++){
		    		Ids.push(UserAns[i].id);
		    	}	    	
		    	
		    	if(Ids.indexOf(ansId) != -1){	 
		    		$scope.setRedioFlag = true;
		    		return true;		    		 
		    	}else{ 
		    		
		    		$scope.setRedioFlag = false;
		    		return false;
		    	}  
		    	
		    };
		   
		    $scope.SaveScore=function(){      
		    	 
		    	//save short Ans and finalscore		    
		    	 Admin_Service.SaveShortAns($scope.SelectedAssessment.id,$scope.id,$scope.QuestionAnsList,$rootScope.userdetails.id).then(function(response){					  
					  $scope.ShortAnsStausResponse = response.data; 						 
					  if($scope.ShortAnsStausResponse == "success"){
						  GlobalModule_notificationService.notification("success","Woo Hoo! Answer(s) has been saved successfully");
						  $scope.fetchAssignAssessment($scope.id,$scope.roleId);
					  }					  
					  	 var tab31=angular.element(document.getElementById('activetab31'));		    	 	    	 
				    	 tab31.attr("class", "");		    	 
				    	 var tab21=angular.element(document.getElementById('activetab21'));
				    	 tab21.attr("class", "active");								    	 
				    	 var tab11=angular.element(document.getElementById('activetab11'));		
				    	 tab11.attr("class", "");			
				    	 $scope.AssessmentFlag(2);
			});		  
		    	 
		    	 
		    };
		    
		    
		    
	    $scope.appliedJobAssessmentLog = function(jobId){		    	
	    	$scope.savFlage = false;
	    	$(".loader").show();		    	
			  Admin_Service.appliedJobAssessmentLog(jobId,$scope.id).then(function(response){					  
					  $scope.assessments = response.data; 					 
					  if(!($scope.assessments.length > 0)){
						  $scope.savFlage = true;							
					  }						  
					  $scope.tempassessments = $scope.assessments;					  
				  $(".loader").fadeOut("slow");			  				
			});	    	
	    };		    
	    $scope.appliedJobAssessmentLog($scope.jobId);	 	    
	   
	    $scope.fetchAssignAssessment = function(userId,roleId){	
	    	$scope.assignAssessmentSave = false;
	    	$(".loader").show();		    	
			  Admin_Service.fetchAssignAssessment(userId,roleId).then(function(response){					  
					  $scope.AssignAssessmentList = response.data; 				  
					  
					//  //console.log($scope.AssignAssessmentList);
					  if(!($scope.AssignAssessmentList.length > 0)){
						  $scope.assignAssessmentSave = true;							
					  }	
				  $(".loader").fadeOut("slow");			  				
			});	 
	    };
	    
	    $scope.saveAssignAssessment = function(){	    	
	    	
	    	var letterNumber = /^[0-9a-zA-Z]+$/;  
	    	var aphabet = /^[a-zA-Z]+$/;
	    	var numbers = /^[0-9]*$/;
	    	
	    	for(var i=0; i<$scope.AssignAssessmentList.length; i++){	    		
	    		if($scope.AssignAssessmentList[i].score == undefined || !$scope.AssignAssessmentList[i].score.match(letterNumber) || $scope.AssignAssessmentList[i].score.match(aphabet) || $scope.AssignAssessmentList[i].score.match(numbers))
    			{	    			
	    			 $scope.validate = true;	 
		     	}else
    			{
	    			$scope.validate = false;
	    			break;		    		
	    			}  
	    		if( $scope.AssignAssessmentList[i].comment == undefined || !$scope.AssignAssessmentList[i].comment.match(letterNumber) || $scope.AssignAssessmentList[i].comment.match(aphabet) || $scope.AssignAssessmentList[i].comment.match(numbers))   		
		  	      {  	
		    			 $scope.validate = true;	    			
		  	      }	else
		    			{
		    			$scope.validate = false;
		    			break;		    		
		    			} 	  		  
	    	}
	    	
	    	for(var i=0; i<$scope.AssignAssessmentList.length; i++){
	    		
	    		
	    		$scope.AssignAssessmentList[i].userid = $scope.id;
	    		//$scope.AssignAssessmentList[i].jobid = $scope.jobId;
	    		$scope.AssignAssessmentList[i].createdby = $rootScope.userdetails.id;	    		
	    		//$scope.AssignAssessmentList[i].completedon = $("#date"+i).val();	
	    		
	    		if($scope.change.indexOf($scope.AssignAssessmentList[i].id) != -1){		    			
	    			$scope.AssignAssessmentList[i].assessby = $rootScope.userdetails.id;
	    		}else{
	    			$scope.AssignAssessmentList[i].assessby = $scope.AssignAssessmentList[i].assessby;
	    		}	    		
	    	}
	    	
	    	var assessmentObj = [];	 
	    	angular.extend(assessmentObj,$scope.AssignAssessmentList);	    
	    	
	    	if($scope.validate){	
	    		
	    		 $(".loader").show();
			 Admin_Service.saveAssignAssessment(assessmentObj).then(function(response){	 				  
				  $scope.status = response.data;
				  
				 // console.log($scope.status);
				  
				  if($scope.status = 'success'){
					  GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
					  $scope.fetchAssignAssessment($scope.id,$scope.roleId);
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Error in saving records");
				  }				  
				  $(".loader").fadeOut("slow");					  
			});	 		 
	
	    }	
	    else{
	    	GlobalModule_notificationService.notification("error","Please enter valid value! Either numeric or aphabets allowed");
	    }
	    };
	   
	    
	    $scope.saveassessmentslog = function(){	    	
	    	var letterNumber = /^[0-9a-zA-Z]+$/;  
	    	var aphabet = /^[a-zA-Z]+$/;
	    	var numbers = /^[0-9]*$/;
	    	for(var i=0; i<$scope.assessments.length; i++){	    		
	    		if($scope.assessments[i].score == undefined || !$scope.assessments[i].score.match(letterNumber) || $scope.assessments[i].score.match(aphabet) || $scope.assessments[i].score.match(numbers))
    			{	    			
	    			 $scope.validate = true;	 
		     	}else
    			{
	    			$scope.validate = false;
	    			break;		    		
	    			}  
	    		if( $scope.assessments[i].comment == undefined || !$scope.assessments[i].comment.match(letterNumber) || $scope.assessments[i].comment.match(aphabet) || $scope.assessments[i].comment.match(numbers))   		
		  	      {  	
		    			 $scope.validate = true;	    			
		  	      }	else
		    			{
		    			$scope.validate = false;
		    			break;		    		
		    			} 	  		  
	    	}
	    	
	    	for(var i=0; i<$scope.assessments.length; i++){	    		
	    		$scope.assessments[i].userid = $scope.id;
	    		$scope.assessments[i].jobid = $scope.jobId;
	    		$scope.assessments[i].createdby = $rootScope.userdetails.id;	    		
	    		$scope.assessments[i].completedon = $("#date"+i).val();	
	    		
	    		if($scope.change.indexOf($scope.assessments[i].id) != -1){		    			
	    			$scope.assessments[i].assessby = $rootScope.userdetails.id;
	    		}else{
	    			$scope.assessments[i].assessby = $scope.assessments[i].assessby;
	    		}	    		
	    	}
	    	
	    	var assessmentObj = [];	 
	    	angular.extend(assessmentObj,$scope.assessments);	    
	    	
	    	if($scope.validate){	
	    		
	    	$(".loader").show();
			  Admin_Service.saveassessmentslog(assessmentObj).then(function(response){	 				  
				  $scope.result = response.data;
				  
				  if($scope.result = 'success'){
					  GlobalModule_notificationService.notification("success","Woo Hoo! Records has been saved successfully");
					  $scope.appliedJobAssessmentLog($scope.jobId);
				  }else{
					  GlobalModule_notificationService.notification("error","Uh Oh! Error in saving records");
				  }				  
				  $(".loader").fadeOut("slow");					  
			});	 			 
	
	    }	
	    else{
	    	GlobalModule_notificationService.notification("error","Please enter valid value! Either numeric or aphabets allowed");
	    }
	    };

	    
	    
	    
	    $scope.fetchProfileCompletion = function(id){	
	    	$(".loader").show();
			  Admin_Service.fetchProfileCompletion(id).then(function(response){	 				  
				  $scope.percent = response.data;	 
				  $('.chart').data('easyPieChart').update($scope.percent);
				  $(".loader").fadeOut("slow");	
			});
		  };
		  
		  $scope.fetchUserRatings = function(id,jobId){	
		    	$(".loader").show();
		    	
				  Admin_Service.fetchUserRatings(id,jobId).then(function(response){	 				  
					  $scope.ratingPercent = response.data;	 
					  $('.chartnew').data('easyPieChart').update($scope.ratingPercent);
					  $(".loader").fadeOut("slow");	
				});
			  };
	
		  $scope.fetchUserProfileDetails = function(id){
			  $(".loader").show();
			  $scope.edituserid=id;
			  Admin_Service.fetchUserProfileDetails(id).then(function(response){	 
				  $scope.useralldata = response.data;
				  $scope.usercompliancelist = $scope.useralldata.userComplianceList;
				  $scope.userworklist = $scope.useralldata.userWorkList; 		
				
			   	  $scope.picpath =  $scope.useralldata.profilePic;
			   	  $scope.cvpath = $scope.useralldata.userCV.cvPath;	
			   	  $scope.position = $scope.useralldata.currentPosition;		
			   	  $scope.refNo = $scope.useralldata.RefNo;   	
			   	  
			   	$(".loader").fadeOut("slow");	
			});
		  };
		  
		  $scope.showflag= 1;
		  $scope.showFlag = function(id){			  
			  $scope.showflag  = id;
			  for (var i=1;i<=9;i++)
				  {
				  if (i==id)
			  document.getElementById("list"+id).setAttribute("class", "active"); 
				  else 
					  document.getElementById("list"+i).setAttribute("class", ""); 

				  }
		  };
	
		    $scope.path = null;
		    /*$scope.download = function(path){
				if(path.includes("amazonaws"))
			   {
				$rootScope.getSignedURL(path).then(function(response){
					window.open(response.data);
				},function(response){
					Common_Service.errorResponseHandler(response);
				});
			   }
				else
					{
					window.open(path);
					}
					

			};*/
		    
			    $scope.buttondisable = function(path) {	
					if (path == null || path == undefined || path == "") { 
						path={};
					   return true; //disable
					  }
					  else {
						  path={};
					   return false; //enable
					  };
					  
					  
					};
		    
					
			 $scope.appliedJobComplianceLog = function(id){	 
				 				
			$(".loader").show();
			  Admin_Service.appliedJobComplianceLog(id).then(function(response){	 			 
			  $scope.compliancelog = response.data;	
			  $(".loader").fadeOut("slow");			  
			},function(response){	
				$(".loader").fadeOut("slow");		
				});
			 };
		  
			 $scope.appliedJobEducationalInfo = function(id){
				 $(".loader").show();
				 Admin_Service.appliedJobEducationalInfo(id).then(function(response){	 			 
					  $scope.educationalInfo = response.data;
					  $(".loader").fadeOut("slow");
					},function(response){	
						$(".loader").fadeOut("slow");	
						});				 
			 };
			 
			 $scope.appliedJobContactInfo = function(id){
				 $(".loader").show();
				 Admin_Service.appliedJobContactInfo(id).then(function(response){	 			 
					  $scope.contactInfo = response.data;					  
					  $(".loader").fadeOut("slow");	
					},function(response){			
						$(".loader").fadeOut("slow");	
						});				 
			 };
			 
			 
			$scope.checkUserformodal = function(){
				
				if($scope.usersdetailforEmail.length == 0){
					GlobalModule_notificationService.notification("error","Please select users");
				}else{
					 $('#comm-manager').modal('show');
				}				
			};
			 
			
			 
			$scope.sendEmailtoUsers = function(templateid,typeid,modeId){
				$scope.templateid=templateid;	
				$scope.adminid=$rootScope.userdetails.id;
				if($scope.Slotflag == false){
					$scope.eventName = "";
				    $scope.slotTime = "";
				}
				
				
				 if($scope.usersdetailforEmail.length != 0){
				 $(".loader").show();
				 
					$scope.usersdetailforEmail[0].eventName = $scope.eventName;
			    	$scope.usersdetailforEmail[0].slotTime = $scope.slotTime;
			    	$scope.usersdetailforEmail[0].rolId = 2;
			    	
				 Admin_Service.sendEmailtoUsers($scope.usersdetailforEmail,templateid,modeId,$scope.adminid).then(function(response){	 	
					
					 $scope.userdetails.id=$rootScope.userdetails.id;
					
					 Admin_Service.addEmailmanagerEntry($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id);
					 //GlobalModule_notificationService.notification("success","Woo Hoo! Email has been sent successfully");
					 if($scope.modeid==2 || modeId==2){
						 GlobalModule_notificationService.notification("success","Woo Hoo! SMS has been sent successfully");
					 }else{
						 GlobalModule_notificationService.notification("success","Woo Hoo! Email has been sent successfully");
					 }
					 $scope.usersdetailforEmail=[];
					 if($scope.Userdata != null){
						 for(var i=0;i<$scope.Userdata.length;i++){
						 var refno=$scope.Userdata[i].refId;
						
						 $('#'+refno+'').prop('checked', false);
					 }
					 }
					 $scope.Userdata=[];
					
					 $('#comm-manager').modal('hide');
 					
 					$(".loader").fadeOut("slow");
 					
 					
					},function(response){		
						 GlobalModule_notificationService.notification("error","Uh Oh! Error in Email send");
						 $scope.usersdetailforEmail=[];
						$(".loader").fadeOut("slow");	
						});	
			
				 
			 }else{
				 GlobalModule_notificationService.notification("success","Please select users.");
				 $scope.usersdetailforEmail=[];
			 }
				 
				 	$scope.communicationmanager={};
	 				$scope.tmptpreview[0].Body = null;	    				
	 				$('#comm-manager').modal("hide");
	 				$scope.Slotflag=false;
				 
			 };
			 
			$scope.refreshModal = function()
				{		
				 $scope.showflag = 1;  
				 $scope.array = null;				
				};				
	
				
			$scope.schedulerlist=function(){
				 Admin_Service.getSchedulerName().then(function(response){
					 $scope.schedulernameList=response.data;
					
				 });
			};
			$scope.schedulerlist();
			
			$scope.communicatioLogList = function(id){
				
				 Admin_Service.getcommunicatioLogList(id).then(function(response){
					 $scope.comLogList = response.data;
					
				 });
			};
		
		$scope.cancelAssignment=function()
		{
			$scope.clearEvent();
		};
		

		  $scope.dateformate3 = function(date){		     
		        var dateOut = moment(date).format("MM-DD-YYYY hh:mm a");
		        
		        return dateOut;
		  };
		
		$scope.assignslotstouser=function(id){
		
			
			$state.go("restricted.admin.appliedjobs");
			
			if($scope.usersdetailforEmail.length==0){
				GlobalModule_notificationService.notification("error","Please select user to assign slot");
			}else{
				$scope.slot.emailTemplateId=$scope.selectedEvent.emailTemplateId;
				$scope.slot.smsTemplateId=$scope.selectedEvent.smsTemplateId;
				$scope.slot.schedulerType=$scope.selectedEvent.schedulerType;
				$scope.clearEvent();
			if($scope.usersdetailforEmail.length > $scope.slot.candidates-$scope.slot.assignedUsers)
				{
				GlobalModule_notificationService.notification("error","User exceeds available seats in the slot");
				}
			else
				{
			$scope.slot.userid=$rootScope.userdetails.id;
			$scope.slot.user=$scope.usersdetailforEmail;
			$scope.slot.userdetails = $scope.usersdetailforEmail;
			for(i=0;i<$scope.slot.userdetails.length;i++){
				$scope.slot.userdetails[i].slotTime=$scope.slottime;
			}
			//$scope.slot.userdetails.slotTime=$scope.slottime;
			var currentdate= new Date();
			console.log(currentdate);
			var slotdate= $scope.dateformate3($scope.slottime);
			//console.log(formatedcurrentdate);
			console.log(slotdate);
			var slotdate1 = new Date(slotdate);
			if($scope.sloteventId==0)
				{
				GlobalModule_notificationService.notification("error","Please select slot");
				}
			else if(currentdate>slotdate1){
				GlobalModule_notificationService.notification("error","Please select future date and time for the interview");
			}
			else{
			Admin_Service.assignslotstouser($scope.slot).then(function(response){
				$scope.flaguser=response.data;	
				$scope.sloteventId=0;
				if($scope.flaguser == 'success'){
					//email
					if($scope.slot.emailTemplateId!=null && $scope.slot.emailTemplateId!=0 && $scope.slot.emailTemplateId!=undefined){
					Admin_Service.sendEmailtoUsers($scope.slot.userdetails,$scope.slot.emailTemplateId,1,$scope.slot.userid).then(function(response){
						$scope.flag=response.data;
						// Admin_Service.addEmailmanagerEntry($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id);
						 $scope.usersdetailforEmail=[];
						 if($scope.Userdata != null){
							 for(var i=0;i<$scope.Userdata.length;i++){
							 var refno=$scope.Userdata[i].refId;
							
							 $('#'+refno+'').prop('checked', false);
						 }
						 }
						 $scope.Userdata=[];
	 					$(".loader").fadeOut("slow");
					},function(response){		
						 GlobalModule_notificationService.notification("error","Uh Oh! Error in Email send");
						 $scope.usersdetailforEmail=[];
						$(".loader").fadeOut("slow");	
						});	
					}
					
					if($scope.slot.smsTemplateId!=null && $scope.slot.smsTemplateId!=0 && $scope.slot.smsTemplateId!=undefined){
					Admin_Service.sendEmailtoUsers($scope.slot.userdetails,$scope.slot.smsTemplateId,2,$scope.slot.userid).then(function(response){
						$scope.flag=response.data;
						// Admin_Service.addEmailmanagerEntry($scope.usersdetailforEmail,$scope.templateid,$scope.modeid,$scope.userdetails.id);
						 $scope.usersdetailforEmail=[];
						 if($scope.Userdata != null){
							 for(var i=0;i<$scope.Userdata.length;i++){
							 var refno=$scope.Userdata[i].refId;
							
							 $('#'+refno+'').prop('checked', false);
						 }
						 }
						 $scope.Userdata=[];
	 					$(".loader").fadeOut("slow");
					},function(response){		
						 GlobalModule_notificationService.notification("error","Uh Oh! Error in sms send");
						 $scope.usersdetailforEmail=[];
						$(".loader").fadeOut("slow");	
						});	
					}
					if(($scope.slot.smsTemplateId==null || $scope.slot.smsTemplateId==0 || $scope.slot.smsTemplateId==undefined) && ($scope.slot.emailTemplateId==null || $scope.slot.emailTemplateId==0 || $scope.slot.emailTemplateId==undefined)){
						Admin_Service.insertScheduleEventSlots($scope.slot).then(function(response){
							$scope.flag=response.data;
							console.log("inserted in scheduler queue table");
		 					$(".loader").fadeOut("slow");
						},function(response){		
							 GlobalModule_notificationService.notification("error","Uh Oh! Error while inserting candidate eventslots");
							 $scope.usersdetailforEmail=[];
							$(".loader").fadeOut("slow");	
							});	
					
						}
					GlobalModule_notificationService.notification("success","Users assigned successfully ");
					 $('.modal-backdrop').hide();
					 $state.reload();
				}else{
					 GlobalModule_notificationService.notification("error","Users not assigned successfully");
				}
			 });
			}
				}
			}
		};
		
		$scope.fetchusersBysltId=function(id,dateTime){
			$scope.selectedSlotDateTime = dateTime;
			$scope.removeuserListassignSlot=[];
	$scope.Slotid=id;
			Admin_Service.fetchusersBysltId(id).then(function(response){
				 $scope.userlistBySlotId=response.data;
				$scope.removeusersBySlotId=response.data;
				if($scope.userlistBySlotId.length == 0){
					 GlobalModule_notificationService.notification("error","No users present in this slot");
				}else{
					$("#candidates_modal").modal('show');
				}
				
			 });
		};
		
		$scope.removeuserListassignSlot=[];
		 $scope.removeselectedcandidate = function(user) 
	     {	
	$scope.removeuserListassignSlot.push(user);	
	
			 var index = $scope.removeusersBySlotId.indexOf(user);
			 if (index > -1) {
				 $scope.removeusersBySlotId.splice(index,1);
				}		
		 
	     };
	     $scope.sloteventId=0;
	     $scope.setEventId=function(slot){	    
	    	$scope.slot  = slot;	 
	    	$scope.Slotid = slot.id;
	    	$scope.sloteventId =  slot.id;
	    	$scope.slottime = slot.dateTime;
	     };
	     
	     $scope.deleteuserbySlotId=function(){
	    	
	    	if($scope.removeuserListassignSlot.length==0){
	    		 GlobalModule_notificationService.notification("error","Select user for delete");
	    	}else{
	    	 $scope.slots.userid=$rootScope.userdetails.id;
	    	 $scope.slots.id=$scope.Slotid;
	    	 $scope.slots.user=$scope.removeuserListassignSlot;
	    
	    	 Admin_Service.removeuUserBySlotId($scope.slots).then(function(response){
	    		 $scope.deleteFlag=response.data;
	    		 if( $scope.deleteFlag != "success"){	    			 
	    			 GlobalModule_notificationService.notification("error","User not deleted successfully");	    			 
	    		 }else{
	    			 GlobalModule_notificationService.notification("success","User deleted successfully");	    			
	    		 }
	    		
	    		 });
	     };
	     
	     Admin_Service.getSlotsByEventId($scope.selectedEvent.id).then(function(response){
			 $scope.slotsListById=response.data;
			 
			 $scope.slot = $scope.slotsListById[$scope.slotsListById.length-1] ;
			 var date=$scope.slotsListById.dateTime;					 
			
		 });
	     		
	     };
	     
	     $scope.interviewquestion = false;
	     $scope.toggleQuestnDiv= function(data){
	    	 
	    	 if(data == 1){
	    		 $scope.interviewquestion = false;
	    	 }
	    	 if(data == 2){
	    	 $scope.interviewquestion = true;}
	     };
	     
	   //--------------- Decision Log function-----------------
	     
	     $scope.offset=0;
	 	$scope.limit=10;
	 	$scope.navButtons = [];
	     $scope.fetchrequisitionListForUser = function(offset,limit,colName,order,search,jobId){
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
			 $scope.jobId=jobId;
			 
		Customer_Service.fetchrequisitionListForUser(offset,limit,colName,order,search,$scope.jobId).then(function(response){
			 $scope.requisitionList =response.data;
			 
			 console.log($scope.requisitionList);
			 
			 $(".loader").fadeOut("slow");
		 },function(response){
				$(".loader").fadeOut("slow");
			});
		 };
		 
		 
		 
		 
		/* 
		 $scope.setReqButton = function(){
				$scope.navButtons = [];
				
					for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
					$scope.navButtons.push(j);
					}
					 $scope.fetchrequisitionListForUser($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search,$scope.jobId);
				};
				 
					
					$scope.currentReq = function(page) {  
				        $scope.offset = page * $scope.limit;
				        $scope.fetchrequisitionListForUser(0,5,$scope.colName,$scope.order,$scope.search,$scope.jobId);
				    };*/
				    $scope.SortingReqList = function(colName,searchterm){
						  $scope.offset1 =0 ;
							$scope.start1 = 0;
						  $scope.colName1=colName;
							$scope.search1=searchterm;
							if($scope.order1 == undefined || $scope.order1 == "desc" && $scope.order1 != undefined)
							{
								$scope.order1 ="asc";
							}
							else if($scope.order1 != undefined && $scope.order1 == "asc")
							{
								$scope.order1 = "desc";
							}
							if($scope.search1 == "" || $scope.search1 == null)
							  {
							  $scope.search1 = undefined;
							  
							  }
							if($scope.colName1 == null)
							  {
							  $scope.colName1 = undefined; 
							  }
							$scope.fetchrequisitionListForUser(0,100,$scope.colName1,$scope.order1,$scope.search1,$scope.jobId);	
						};
						
							 
						
						/*-----select, reject and hold candidate -----*/
						
						$scope.checkedReqId = function(reqId,candidateNo,selectedUsers)
						{
							$scope.reqId=reqId;
							$scope.candidateNo=candidateNo;
							$scope.selectedUsers=selectedUsers;
							$scope.selectedRequistion($scope.reqId);
						};
						
						$scope.selectedRequistion = function(reqId){
							
							 Customer_Service.selectedRequistion(reqId,$scope.userAppliedJobId).then(function(response){
					    		 
							 });
							};
							
						$scope.fetchReqforSelected = function(userJobId)
						{
							Customer_Service.fetchReqforSelected(userJobId).then(function(response){
					    		 $scope.selectedRequisitionId=response.data;
					    	//	 //console.log($scope.selectedRequisitionId);
					    		 
							 });
						};
						
						 $scope.selectUserRequisition = function(action){
					
							 

						if(($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "")
						{
							
							GlobalModule_notificationService.notification("error","Please select date");
							
							return;
						    }
						else if(action=='Shortlisted' && $scope.applicationStatus==false){
								
								 GlobalModule_notificationService.notification("error","Already selected, Can't short list");
							     }
							    else if((($scope.reqId==0 || $scope.reqId==null) && action=='Selected') || (($scope.reqId==0 || $scope.reqId==null) && action=='Shortlisted')){
								 
								 GlobalModule_notificationService.notification("error","please select requisition first !!");
						    	}
						    	else if(($scope.reqId==$scope.selectedRequisitionId && action=='Shortlisted')){
						    		 GlobalModule_notificationService.notification("error","Already selected , Please Select another requisition");
						    	}
						    	else if(($scope.candidateNo==$scope.selectedUsers && action=='Selected') || ($scope.candidateNo==$scope.selectedUsers && action=='Shortlisted')){
						    		 GlobalModule_notificationService.notification("error","Requistion is full, Select another requisition !!");
						    	}
						    	/*else if(action == 'Not Successful' && ($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == ""){
						    		GlobalModule_notificationService.notification("error","Please enter valid date");
						    		$('#rejectbutton').modal('hide'); 
									return;
						    	}*/
						    	else{
						    		$(".loader").show();
						    		
						    		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
						    		/*if($scope.selectFlag=='false' && action=='Reject'){
						    			action='Not selected';
							    	}*/
						    		$scope.selectReq.id=$scope.reqId;
						    		$scope.selectReq.jobid=$scope.jobId;
						    		$scope.selectReq.userAppliedJobId=$scope.userAppliedJobId;
						    		$scope.selectReq.userid=$scope.id;
						    		$scope.selectReq.decisionDate=$('#decisionDate').val();
						    		$scope.decisionDate=$('#decisionDate').val();
						    		if($scope.selectReq.decisionComment != '' && $scope.selectReq.decisionComment != undefined)
						    		{
						    			if(!($scope.selectReq.decisionComment.match(letterNumber)))
						    			{
						    				GlobalModule_notificationService.notification("error","Invalid text in Comment");
						    				$(".loader").fadeOut("slow");
						    				return;
						    			}
						    		}				    		
						    		
						    		$scope.reqId=0;
						    			
						    	//	$scope.decisionDate=$('#decisionDate').val();

						    	 Customer_Service.selectUserRequisition($scope.selectReq,$rootScope.userdetails.id,action).then(function(response){
						    		 $scope.reqFlag=response.data;
						    		 
						    		 $scope.decisionLoglistForUser();
						    		 $scope.fetchReqforSelected($scope.userAppliedJobId);
						    		 $scope.fetchrequisitionListForUser(0,100,null,null,null,$scope.jobId);
							    	 $scope.fetchAppliedJobs(0,10,null,null,$scope.searchterm,null);
							    	 $scope.getAppliedJobcount($scope.searchterm,null);
						    		 if( action=='Selected'){
						    			 
						    			 $scope.status='Selected';
						    			 $scope.applicationStatus=false;
						    			 GlobalModule_notificationService.notification("success","User selected successfully");
						    			 $scope.reqId=0;
						    		 }
						    		 else if( action=='Not Successful'){
						    			 $scope.status='Not Successful';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
						    			 
						    		 }
						    		 else if(action == 'Hold'){
						    			 $scope.status='Hold';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","User kept on hold");
						    			 
						    		 }
						    		 else if(action == 'Shortlisted'){
						    			 $scope.status='Shortlisted';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","User short listed");
						    			 
						    		 }
						    		 
						    			 else if(action == 'No Show'){
						    			 $scope.status='No Show';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","Status Changed to No Show");
						    			 
						    		 }
						    		
						    		 else if(action == 'Pending Brand Approval'){
						    			 $scope.status='Pending Brand Approval';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","Status Changed to Pending Brand Approval");
						    			 
						    		 }
						    		 else if(action == 'Not Suitable'){
						    			 $scope.status='Not Suitable';
						    			 $scope.applicationStatus=true;
						    			 GlobalModule_notificationService.notification("success","Status Changed successfully");
						    			 
						    		 }
						    		 else{
						    			 GlobalModule_notificationService.notification("error","Failed to take any action");
						    			 
						    		 }
						    		 $scope.selectReq={decisionComment:""};
						    		// $scope.selectReq={decisionDate:""};
						    		 $('#decisionDate').val("");	
						    		 $scope.selectFlag = 'false';
						    		 $(".loader").fadeOut("slow");
						    		 },function(response){
						    				
						 			});
						    	 
						     };
						     };
						 
						     
						     $scope.rejectFlag=0;
						     $scope.showDecisionModal=function(flag)
						     {
						    	 $scope.rejectFlag=flag;
						     }
						    	 
			//--------------- Decisioon Log list-------------------
						     
			$scope.decisionLoglistForUser = function(){
				$(".loader").show();
				Customer_Service.decisionLoglistForUser($scope.userAppliedJobId).then(function(response){
					 $scope.decisionLoglist =response.data;
					console.log($scope.decisionLoglist);
					 $(".loader").fadeOut("slow");
				 },function(response){
						$(".loader").fadeOut("slow");
					});
				
			};
					
			/*$scope.setdecisionDate=function(d)
			{
				 $scope.empData=d;
				  $scope.dDate=d.requisition.decisionDate;
				
			};*/
			//--------------- Decision Log function end -----------------
		 
					 
		 $scope.getUserActivityList=function(id){
			/* $scope.userid=$scope.edituserid;*/
		
			 Admin_Service.getUserActivityList(id).then(function(response){
				 $scope.useractivityList=response.data;
			
			 });			
		 } ;
		 
		 $scope.communicatioLogList = function(id){
			 
				Admin_Service.getcommunicatioLogList(id).then(function(response){
					$scope.comLogList = response.data;
					
				});
			};

			$scope.schedulerLogList = function(id){

				Admin_Service.getSchedulerLogList(id).then(function(response){
					$scope.scheLogList = response.data;
				});
			};
			
			 $scope.formatDate = function(date){		     
		         var dateOut = moment(date,'DD/MM/YYYY').format("DD-MM-YYYY");
		         return dateOut;
		   };
		   
		   $scope.AssessmentdateFormat = function(date){
			   var dateOut = new Date(date);       
		        return dateOut;
		   };
		   
		   $scope.formatDate1 = function(date){	
			   
			     if(date==null)
			    	 {
			    	 	return;
			    	 }
		         var dateOut = moment(date,'YYYY-MM-DD').format("DD-MM-YYYY");
		         return dateOut;
		   };
		   $scope.formatDate2 = function(date){
			   
			   if(date==null)
		    	 {
		    	 	return;
		    	 }
		         var dateOut = moment(date,'ll').format("DD-MM-YYYY");
		         return dateOut;
		   };
		   
		   $scope.formatDate3 = function(date){
			   
			   if(date==null)
		    	 {
		    	 	return;
		    	 }
			   if(date.indexOf('-') < 4)
			   {
				   return date;
			   }
		         var dateOut = moment(date).format("DD-MM-YYYY");
		         return dateOut;
		   };
		   $scope.dateformate = function(date){
		         var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
		         return dateOut;
		   };
		   
		   $scope.dateformodal = function(date){		     
		         var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
		         return dateOut;
		   };
		   
		   $scope.dateformodalstd = function(date){	
			   
			   	  if(date == undefined || date == '')
				  {
					  return null;
				  }
			   
		         var dateOut = moment(date).format("DD-MM-YYYY");
		         return dateOut;
		   };
		   
		   
			 
	//-------------------to do list------------------------- 
			 
			 $scope.getflag=function(id){
				 							 
		for(var i =0; i<$scope.compliancesDetails.length;i++)
			{
			
			
			if(id==$scope.compliancesDetails[i].compliance.id)
				{
				if($scope.compliancesDetails[i].countryOfIssue != null && $scope.compliancesDetails[i].issueDate != null && $scope.compliancesDetails[i].expiryDate != null && $scope.compliancesDetails[i].path != null && $scope.compliancesDetails[i].createdDate != null)
				{
			     return true;			     
				}
			else
				return false;
		        }	
	           }			 
		   };
			 
			 			 
			 $scope.fetchComplianceDetails=function(id){
				 
				 Admin_Service.fetchComplianceDetails(id).then(function(response){
					  					 					
					  $scope.compliancesDetails = response.data;
					  
										  					  
				  },function(response){
					  							
				});					  
			 };
			 
			 
			 var video, reqBtn, startBtn, stopBtn, ul, stream, recorder,storeBtn,recordedBlobs;
			 var videoEnabled = false;
	//---------interview template ------
			 $scope.interviewTemplates=[{
                 id: 0,
                 name:"" }
                 ];
			 //$scope.temp;
			 $scope.webcamStream;
		   $scope.fetchInterviewTemplates = function(job){
			   Admin_Service.checkInterviewschedule(job.id,job.userid).then(function(response){
					 $scope.interviewexist =response.data;
				//	//console.log($scope.interviewTemplates);
			   if((job.status=="Interview Scheduled" || job.status=="Peer Review Started") &&  $scope.interviewexist>0){
				   $scope.isinterviewschdulepossible=true;
				   
			   }else{
				   
				   $scope.isinterviewschdulepossible=false;
			   }
				   $('#interview-sch').modal('show');
				video = document.getElementById('video');
				reqBtn = document.getElementById('request');
				startBtn = document.getElementById('start');
				stopBtn = document.getElementById('stop');
				storeBtn = document.getElementById('store');
				ul = document.getElementById('ul');
				reqBtn.onclick = requestVideo;
				startBtn.onclick = startRecording;
				stopBtn.onclick = stopRecording;
				startBtn.disabled = true;
				ul.style.display = 'none';
				stopBtn.disabled = true;
				videoEnabled = false;
			   
			   $scope.temp;
			   $scope.xpath=[];
			   $scope.interviewShowFlag=1;
			   document.getElementById("activetab1").setAttribute("class", "active"); 
				document.getElementById("activetab2").setAttribute("class", "");
				document.getElementById("activetab3").setAttribute("class", "");
				document.getElementById("activetab6").setAttribute("class", "");
				document.getElementById("video-part").setAttribute("style", "display: none !important;");
				/*$('#interview-sch').modal({
					   backdrop: 'static',
					   keyboard: false
					});*/
			//alert($scope.temp);
			$scope.changetemp=0;
			$scope.enabledTemp();
			   $scope.nameOfInterviewer=job.name;
			   $scope.positionNameInterview=job.position;
			   $scope.jobIdInterview=job.jobId;
			   $scope.userIdInterview=job.userid;
			   $scope.generateInterview();
			   $scope.fetchUserJobfairInterviewLog();
			   $scope.User_id=job.userid;
			   $scope.templateQuestion=[];
			   $scope.interviewTemplates=[{
                   id: 0,
                   name:"" }
                   ];
			   $scope.fetchinterviewListForUser(0,100,null,null,job.userid);
				Admin_Service.fetchInterviewTemplates().then(function(response){
					 $scope.interviewTemplates =response.data;
				//	//console.log($scope.interviewTemplates);
				 },function(response){
					});
			  
			   },function(response){
				});
			};
			
			$scope.fetchTemplateQuestion = function(temp){
				 
				$(".loader").show();
				//$scope.currentPage = 1;
				$scope.sel_position = temp.position.name;
				document.getElementById("video-part").setAttribute("style", "display: block !important;");
				$('#start').show();
				$('#stop').hide();
				$scope.templateQuestion=[];
				//alert($scope.userIdInterview+"  "+$scope.jobIdInterview);
				Admin_Service.fetchTemplateQuestion(temp.id,$scope.userIdInterview,$scope.jobIdInterview).then(function(response){
					 $scope.templateQuestion =response.data;
					// $scope.transalate();
					 $(".loader").fadeOut("slow");
				 },function(response){
						$(".loader").fadeOut("slow");
					});
				$scope.changetemp=0;
				
			};
			
			
			//--------------------------Interview Assessment Template------------------------------------//					  
			  
			
			   $scope.fetchInterviewAssessmentTemplates = function(){
				   	console.log("started");
					Admin_Service.fetchInterviewAssessmentTemplates().then(function(response){
						
						$scope.userdetails.id=$rootScope.userdetails.id;    //logged in user id
						 $scope.interviewAssessTemplates =response.data;
						 console.log($scope.interviewAssessTemplates);
					
					 GlobalModule_dataStoreService.storeData('LoginModule','interviewAssessTemplates',$scope.interviewAssessTemplates);	
					 GlobalModule_dataStoreService.storeData('LoginModule','appliedJobs',$scope.userIdInterview);	
					 GlobalModule_dataStoreService.storeData('LoginModule','checkpreview','nonpreview');	
					 
					 var url = $state.href('user_Interview_Assessment');
					 window.open(url,'_blank');
					 
					
					 },function(response){
						 $(".loader").fadeOut("slow");
						});
					
				};
			
			
			
			//-------to create interview log entry------
			$scope.generateInterview = function(){
											
				Admin_Service.generateInterview($scope.userIdInterview,$scope.jobIdInterview,$rootScope.userdetails.id).then(function(response){
					 $scope.generateInterviewId =response.data;
					
				 },function(response){
					});
			};
			
			$scope.changetemp=0;
			$scope.OnChangeTemplate = function(temp){
				 
				if($scope.templateQuestion.length > 0 && $scope.changetemp==0)
					{
					$('#changeTemplate').modal({
					    backdrop: 'static',
					    keyboard: false
					});
					$("#examselector").attr('disabled', 'disabled');
					$("#changeTemplate").modal("show");
					
					}
				else
					{
					requestVideo();
					$("#examselector").removeAttr('disabled');
					}
				
			};
			$scope.enabledTemp= function()
			{
				$("#examselector").removeAttr('disabled');
				$("#changeTemplate").modal('hide');
				
			};
			$scope.saveInteriewAns = function(template){
				$(".loader").show();
				for (var i=0;i<$scope.templateQuestion.length;i++)
					{
				$scope.templateQuestion[i].createdby=$rootScope.userdetails.id;
				$scope.templateQuestion[i].jobid=$scope.jobIdInterview;
				$scope.templateQuestion[i].userid=$scope.userIdInterview;
				$scope.templateQuestion[i].interviewId=$scope.generateInterviewId
					}
				Admin_Service.saveInteriewAns($scope.templateQuestion).then(function(response){
					 $scope.flagForAns =response.data;
					 
					 if( $scope.flagForAns.indexOf("success")!=-1){
		    			 GlobalModule_notificationService.notification("success","Saved Successfully ");
		    			 $state.go("restricted.admin.appliedjobs");
		    		 }
					 $(".loader").fadeOut("slow");
					 
				 },function(response){
						$(".loader").fadeOut("slow");
					});
				
			};
			
			
			$scope.updateuserjobstatus = function(userid,adminid){
				 $(".loader").show();
				
				  Admin_Service.updateUserJobStatus(userid,adminid).then(function(response){
					  $scope.jobstatus = response.data; 
					  $(".loader").fadeOut("slow");
				 
					});
			
			};
			
			
			
			var submitvideo = 0;
			var videosubmit =false;
			$scope.submitFlag=false;
			$scope.submitInteview = function()
			{
				$(".loader").show();
				$scope.submitFlag=true;
				$scope.updateuserjobstatus($scope.userIdInterview,$rootScope.userdetails.id);
				if(submitvideo==1)
					{
					videosubmit=true;
					stopRecording();
					}else{
				$(".loader").show();
				 location.reload();
				 $('#examselector').modal('hide');
				 $(".Interview-que").modal('hide');
				}
				$scope.webcamStream.getVideoTracks()[0].stop();
			};
			
			
			$scope.recognizing=false;
			 var recognition;
			$scope.transalate = function(check){
				var index=-1;
				
				var a=check;
				//alert(check);
				$scope.recognizing=false;
				if (window.hasOwnProperty('webkitSpeechRecognition')) {

		              recognition = new webkitSpeechRecognition();
		             recognition.continuous = false;
		             recognition.interimResults = false;
		            // Initialize();
		             recognition.lang = "en-US";
				/*for(var i=0;i<($scope.templateQuestion.length);i++)
					{*/
					$(".speaker"+a).hide();
				
				     if($("#ans-switch"+a).is(":checked")) {
				    	 index=a;
				    	 
				    	 var append= $('#transcript'+a).val();
				    	 $('#erase').prop('disabled', true);
				         $(".speaker"+a).show();
				         recognition.start();
				         $scope.recognizing=true;
				        
				         recognition.onresult = function(e) {
				         var ans=e.results[0][0].transcript;
				         $('#transcript'+a).val(append+" "+ans);
				         $scope.templateQuestion[check-1].answer=append+" "+ans;
				        // answer=answer+" "+append+" "+ans;
				              recognition.stop();
				         };
				         recognition.onend = function() {
				        	// recognition.start();
				        	 if($scope.recognizing==true){
				        	 $scope.transalate(check);
				        	 }
				        	
				        	};
				         recognition.onerror = function(e) {
				         recognition.stop();
				        	//$(".speaker"+a).hide();
				         }

				     	} else {
				        $(".speaker"+a).hide();
				       if($scope.recognizing==true)
				    	   {
				    	   recognition.stop();
				    	   $scope.recognizing=false;
				    	   $('#erase').prop('disabled', false);
				    	   }	 
				     }
				//	}
				
					}
			};
			
			
			function handleDataAvailable(event) {
				  console.log('handleDataAvailable', event);
			
					
				  if (event.data && event.data.size > 0) {
				    recordedBlobs.push(event.data);
				  }
				}
			
		  /* ---------video upload----------*/
			function requestVideo() {
				recordedBlobs=[];	
				videoEnabled = true;
			  navigator.mediaDevices.getUserMedia({
			      video: true,
			      
			      audio: true
			    }).then(function(stm)  {
			    	$scope.webcamStream = stm;
			      reqBtn.style.display = 'none';
			      startBtn.removeAttribute('disabled');
			      //video.src = URL.createObjectURL($scope.webcamStream);
			      var video= document.getElementById('video');
			      video.srcObject = $scope.webcamStream;
			      video.muted = true;
			    });
			}

			function startRecording() {
				submitvideo=1;
				$('#start').hide();
				$('#stop').show();
				if (videoEnabled==false)
					{
					requestVideo();
					}
			 /* recorder = new MediaRecorder($scope.webcamStream, {
			    mimeType: 'video/webm'
			  });*/
			 recorder = new MediaRecorder($scope.webcamStream);
			 recorder.ondataavailable = handleDataAvailable;
			  recorder.start();
			  stopBtn.removeAttribute('disabled');
			  startBtn.disabled = true;
			}


			function stopRecording() {
				$('#start').show();
				$('#stop').hide();
				videoEnabled = false;
			  recorder.ondataavailable = function(e) {
			    ul.style.display = 'block';
			    var a = document.createElement('a'),
			      li = document.createElement('li');
			    var input = document.getElementById('imgInp');
			   // var videoName= ['video_', (new Date() + '').slice(4, 28)].join('');
			    handleDataAvailable(e);
				  var eventdata = new Blob(recordedBlobs, {type: 'video/webm'});
			    var videoName = ['video_', (new Date() + '').slice(4, 28), '.webm'].join('');
			    
			    a.href = URL.createObjectURL(eventdata);
			  //  a.href = URL.createObjectURL(e.data);
			    //input.value = a.download;
			    a.id = 'videoId';
			    a.textContent = a.download;
			 // window.open(URL.createObjectURL(e.data));
			    window.open(URL.createObjectURL(eventdata));
			    $scope.uploadvideo(eventdata,videoName);
			    
			    //video.src="";
			   // video.srcObject = "";
			   /* li.appendChild(a);
			    ul.appendChild(li);*/
			 //   document.getElementById('videoId').click();
			    startBtn.removeAttribute('disabled');
			   
			   /* storeBtn.click();*/
			  };
			  recorder.stop();
			  stopBtn.disabled = true;
			  //$scope.webcamStream.getVideoTracks()[0].stop();
			}

			$scope.uploadvideo = function(data,videoName)
			{
				/*var data= $('#video').attr('src');*/
				//var data=$('#ul').find('a').attr('href');
				$(".loader").show();
				var hrf =   $('#ul').find('a').attr('download');
				var input = document.getElementById('imgInp');
					var created=$rootScope.userdetails.id;
					var formData = new FormData();
					formData.append("file",data);
					formData.append("file-name",videoName);
					//formData.append("questionId",questionId);
					formData.append("userid",$scope.userIdInterview);
					formData.append("jobId", $scope.jobIdInterview);
					formData.append("createdId",created);
					formData.append("interviewId", $scope.generateInterviewId);					
					
					$.ajax({
							url: 'rest/admin/upload/video',
							type: 'POST',
							data: formData,
							
							async: true,
							cache: false,
							contentType: false,
							processData: false,
							success: function (response) {
								submitvideo=0;
								
								$(".loader").fadeOut("slow");
								if(videosubmit==true)
									{
									videosubmit=false;
									$(".loader").fadeOut("slow");
									location.reload();
									}
								//  GlobalModule_notificationService.notification("success","video save Successfully !!"); 
							}
						});
								
					$(".loader").fadeOut("slow");
			};
			
			$scope.checkboxstatus = function()
			{
				//alert($scope.currentPage);
				if( $scope.recognizing==true)
					{
           		 recognition.stop();
           		$scope.recognizing=false;
					}
				for(var i=0;i<($scope.templateQuestion.length);i++)
				{
					$('#transcript'+i).val($scope.templateQuestion[i].answer);
					$('#ans-switch'+i).prop('checked', false);
					$(".speaker"+i).hide();
				}
			}
			
			$scope.deleteAns =function(id)
			{
				 $('#transcript'+id).val('');
				 $scope.templateQuestion[id-1].answer="";
			};
			
			//----Pagination for interview
			$scope.currentPage = 1;
		   
			//-----interview log---
			$scope.vedioflag=1;
			$scope.showvidolist = function(id)
			{
				//alert(id);
				$scope.vedioflag=id;
				if(id==1){					
					$scope.fetchInterViewVideoPath($scope.interviewId);
					document.getElementById("showvidolist1").setAttribute("class", "active"); 
					document.getElementById("showvidolist2").setAttribute("class", "");
					document.getElementById("showvidolist3").setAttribute("class", "");
				}
				if(id == 2){					
					$scope.xpath=[];
					document.getElementById("showvidolist2").setAttribute("class", "active"); 
					document.getElementById("showvidolist1").setAttribute("class", "");
					document.getElementById("showvidolist3").setAttribute("class", "");
					}
				
				if(id == 3){
					document.getElementById("showvidolist3").setAttribute("class", "active"); 
					document.getElementById("showvidolist1").setAttribute("class", "");
					document.getElementById("showvidolist2").setAttribute("class", "");
				}
				
			};
			$scope.AnsSaveFlag = false;
			$scope.setSaveButtonFlag=function(q){
				$scope.assessmentobjectforuserclickpic=q;
				if(q.scoringType ==  "Manual" || q.scoringType ==  "Auto/Manual"){ 
					$scope.AnsSaveFlag = true;
				}
				if(q.scoringType ==  "Auto"){
					$scope.AnsSaveFlag = false;
				}
			};
			
			$scope.Activeflag=function(){
				document.getElementById("showvidolist3").setAttribute("class", ""); 
				document.getElementById("showvidointerviewlist3").setAttribute("class", ""); 
			};
		
			$scope.showvideopath = function(x,index){
				
				$scope.xpath=[];
				var path = x.filepath;
				 
				if(path.includes("amazonaws"))
				   {
					$rootScope.getSignedURL(path).then(function(response){
						x.filepathsigned = response.data;
						x.flag=1;
						$scope.xpath.push(x);
						console.log($scope.xpath);
					},function(response){
						Common_Service.errorResponseHandler(response);
					});
				   }
				else{
					x.filepathsigned = x.filepath;
					x.flag=2;
					
					 
					$scope.xpath.push(x);
						console.log($scope.xpath);
						window.open(x.filepathsigned,'_blank');
				   }
				
				/*console.log('interview-video'+index)
				var v = document.getElementById('interview-video'+index);
				v.addEventListener('canplaythrough', function(e) {
				  console.log(e.type, this.seekable.end(0));
				});*/
			};
			
/*$scope.showinterviewvideopath = function(v,index){
	$scope.indexid=index;
				$scope.vpath=[];
				var path = v;
				//var path = x.filepath;
				 
				if(path.includes("amazonaws"))
				   {
					$scope.vpath.push(v);
					
				   }else{
						$scope.vpath.push(v);
				   }
				
			};*/
			
			$scope.time={};
			$scope.sharableLink="";			
			$scope.getpath = function(x){				
				$scope.PathObject = x;
				$scope.time={};
				$scope.sharableLink="";				 
			};
			
			$scope.setLinkVariable = function(){
				$scope.showspanFlag = false;
			};
			
			$scope.showspanFlag = false;
			 
			$scope.getSharableLink = function(time){
				 $(".loader").show();
				$scope.currentTime = moment(new Date()).unix();			 
				 
				$scope.videoId = $scope.PathObject.id; 
				
				$scope.showspanFlag = true;				
				if(time.hours==0 && time.minute == 0){
					GlobalModule_notificationService.notification("error","Please enter valid time set");
				}else{
					$scope.min = time.hours * 60 + time.minute;
					//$scope.sharableVideoPath($scope.PathObject,$scope.min);
				} 	 
				
				//SENDING mail as well as storing into db
				  Admin_Service.EmailSecretUrl(time.email,$scope.currentTime,$scope.videoId,$scope.min,$rootScope.userdetails.id).then(function(response){
					  $scope.EmailSecretUrlResponse = response.data; 
					  $(".loader").fadeOut("slow");
				 if($scope.EmailSecretUrlResponse == "success"){
					  GlobalModule_notificationService.notification("success","Secret link is successfully sent!");					 
				 }
					});
			
			};
			
			$scope.sharableVideoPath = function(x,time){
				
				var path = x.filepath;
				 
				if(path.includes("amazonaws"))
				   {
					$rootScope.getSignedURLcustomTime(path,time).then(function(response){
						x.filepathsigned = response.data;
						  $scope.sharableLink = response.data;
					},function(response){
						Common_Service.errorResponseHandler(response);
					});
				   } 	
				
			};
			
			 
			$scope.fetchinterviewListForUser =function(offset,limit,colName,order,search,userId){
				  $(".loader").show();
				  $scope.xpath=[];
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
					
				  Admin_Service.fetchInterviewListForUser(offset,limit,colName,order,$scope.userIdInterview).then(function(response){
					  $scope.interviewListForUser = response.data;	
					   //console.log($scope.interviewListForUser);
					  $(".loader").fadeOut("slow");
				},function(response){
					$(".loader").fadeOut("slow");
					});
			  };
			  
			  $scope.SortinginterviewList = function(colName){
				  $scope.offset =0 ;
					$scope.start = 0;
				  $scope.colName=colName;
					if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
					{
						$scope.order ="asc";
					}
					else if($scope.order!=undefined && $scope.order=="asc")
					{
						$scope.order = "desc";
					}
					if($scope.colName==null)
					  {
					  $scope.colName= undefined; 
					  }
					$scope.fetchinterviewListForUser(0,100,$scope.colName,$scope.order,$scope.userIdInterview);	
				};
			
				$scope.fetchInterviewAns = function(j)
				{
					$scope.interviwAnsobj=j;
					$scope.createdDate=j.createdDate;
					$scope.tempName=j.name;
					$scope.positionNamefordetail=j.position.name;					
					$scope.interviewShowFlag=3;
					$(".loader").show();
					
					Admin_Service.fetchInterviewAns(j.id,$scope.userIdInterview,$scope.jobIdInterview,j.interviewId).then(function(response){
						 $scope.interviewQuesAns =response.data;
						 console.log($scope.interviewQuesAns);
						 $scope.vedioflag=1;
						 document.getElementById("showvidolist1").setAttribute("class", "active"); 
							document.getElementById("showvidolist2").setAttribute("class", "");
						 $(".loader").fadeOut("slow");
					 },function(response){
							$(".loader").fadeOut("slow");
						});			
					$scope.interviewId=j.interviewId;
					$scope.fetchInterViewVideoPath(j.interviewId);
					
					/*var v = document.getElementById('interview-video');
					v.addEventListener('canplaythrough', function(e) {
					  console.log(e.type, this.seekable.end(0));
					});*/
					
				};
				
				$scope.fetchInterViewVideoPath = function(interviewId){
					Admin_Service.fetchInterViewVideoPath(interviewId).then(function(response){
						 $scope.InterViewVideoPath = response.data;
						 console.log($scope.InterViewVideoPath);
						 
						 $scope.xpath=[];
							var path = $scope.InterViewVideoPath[0].filepath;
							 
							if(path.includes("amazonaws"))
							   {
								$rootScope.getSignedURL(path).then(function(response){
									$scope.InterViewVideoPath[0].filepathsigned = response.data;
									$scope.InterViewVideoPath[0].flag=1
									$scope.xpath.push($scope.InterViewVideoPath[0]);
									console.log($scope.xpath);
								},function(response){
									Common_Service.errorResponseHandler(response);
								});
							   
					}else{
						   $scope.InterViewVideoPath[0].filepathsigned = path;
						   $scope.InterViewVideoPath[0].flag=2
							$scope.xpath.push($scope.InterViewVideoPath[0]);
						   
							console.log($scope.xpath);
					   }
					});
				};
				
				$scope.clearInterviewlog = function(id){
					$scope.xpath=[];
					if(id==1)
						{
						$('#interview-sch').hide();
						$('.modal-backdrop').hide();
						$scope.interviewTemplates=[];
						$("#video-part").hide();
						}
					$(".loader").show();
					$(".loader").fadeOut("slow");
				
					
					/*var v = document.getElementById('interview-video');
					v.addEventListener('canplaythrough', function(e) {
					  console.log(e.type, this.seekable.end(0));
					});*/
					
					//document.getElementById("video-part").setAttribute("style", "display: none !important;");
					
				};
		    //-----interview End------
						 	
			 $scope.enableDisableToDo= function(id,jobId){
				 				 
				 $scope.flag=false;
				 for(var i=0;i<$scope.appliedJobs.length;i++){
					 
				 if($scope.appliedJobs[i].userid == id && $scope.appliedJobs[i].status == 'Selected' && $scope.appliedJobs[i].jobId==jobId)
					 {
					 //$scope.flag=true;   
					 	$scope.applicationStatus=false;
		    			$scope.selectedPostion=$scope.appliedJobs[i].position;
					 	return true;
					 }				 
				 }				 
			 };			 
			 
			 $scope.reload = function(){
				 $scope.communicationmanager={};
 				$scope.tmptpreview = null;	    				
 				$('#comm-manager').modal("hide");
 				$scope.Slotflag = false;
			 }; 
		
		   
		   //--------assessment assigne-----------
			 
			 
    $scope.fetchbrandlist = function(){					 
		assessEngine_Service.fetchbrandlist().then(function(response){
			 $scope.brandlist=response.data;				 
		  }); 
	 };$scope.fetchbrandlist(); 	 
	
	 $scope.fetchdepartmentlist = function(){					 
				assessEngine_Service.fetchdepartmentlist().then(function(response){
					 $scope.departmentlist=response.data;	
				  }); 
			 };$scope.fetchdepartmentlist();
			 
	 $scope.fetchpositionlist = function(deptId){					 
					assessEngine_Service.fetchpositionlist(deptId).then(function(response){
						 $scope.positionlist=response.data;	
					  }); 
				 }; 
	
	 $scope.fetchAssessmentMaster = function(offset,limit,colName,order,search,brandId,departId,positionId,shipId){		
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
			 
			 //only self Assessment false 'coz self assessment cant be assigne
		 Master_Service.fetchAssessmentToAssigne(offset,limit,colName,order,search,brandId,departId,positionId,shipId).then(function(response){
			 $scope.assessmentList=response.data;
			 //console.log($scope.assessmentList);
			 $(".loader").fadeOut("slow");
		  });
	 };	 	 
	 
	 $scope.SortingAssessmentMasterList = function(colName,searchterm){
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
			$scope.fetchAssessmentMaster(0,1000,$scope.colName,$scope.order,$scope.search,0,0,0,0);	
		};
	 
		 
	 $scope.applyFilter = function(data){	
		 
		 if(data === undefined){			 
			 GlobalModule_notificationService.notification("error","please select filter data!");			 
		 }		 
		
		 if(data != undefined){		 
			 
			 if(data.brand == undefined || data.brand == ""){
				 data.brand = 0;
			 }
			 if(data.department == undefined || data.department == ""){
				 data.department = 0;
			 }
			 if(data.position == undefined || data.position == ""){
				 data.position = 0;
			 }			 
			 
			 $scope.fetchAssessmentMaster(0,1000,null,null,null,data.brand,data.department,data.position,0);
		 }		 
	 };
	 
	 $scope.Userdata = [];
	 $scope.saveuserlist = function(UserID,answers,rolId,refno,userstatus,mappreqid){	
		  
		 var duplicateFlag = false;
	     for(var i=0; i<$scope.Userdata.length; i++){
	    	 if($scope.Userdata[i].id == UserID){	    		
	    		 var duplicateFlag = true;
	    	 }
	     }  
	     if(duplicateFlag == false && answers==true){
	    	 $scope.Userdata.push({id:UserID,roleId:rolId,refId:refno,status:userstatus,mappreqid:mappreqid});
	    	 
	    	 }
	     
	     if(answers == false || answers==undefined){
	    	 for(var i=0; i<$scope.Userdata.length; i++){
		    	 if($scope.Userdata[i].id == UserID){		    		 
		    		 $scope.Userdata.splice(i, 1);		    		 
		    	 }
		     }  
	    	 $('#'+refno+'').prop('checked', false);
	     }
	    
	 };
	 
	 $scope.checkedall =function(all){ 
			
		 if(all == true){
			 for(var i=0;i<$scope.appliedJobs.length;i++){
				 var m=0;
				 for(var j=0;j<$scope.Userdata.length;j++){
				 if($scope.Userdata[j].id == $scope.appliedJobs[i].userid){
					 m++;
				 }
				
				 
				 }
				 if(m == 0)
				 {
						 $scope.Userdata.push({id:$scope.appliedJobs[i].userid,roleId:$scope.appliedJobs[i].user.roleId,refId:$scope.appliedJobs[i].referNumber});
						 $scope.usersdetailforEmail.push({id:$scope.appliedJobs[i].userid,rolId:$scope.appliedJobs[i].user.roleId});
				}
			 }
			 
		 }else{ 
			 for(var i=0;i<$scope.Userdata.length;i++){
				 for(var j=0;j<$scope.appliedJobs.length;j++){
					 
					  if($scope.Userdata[i].id == $scope.appliedJobs[j].userid){
							 $scope.Userdata.splice(i, 1);		
							 $('#'+'C-'+$scope.appliedJobs[j].userid+'').prop('checked', false);
						  }
					  
					  if($scope.usersdetailforEmail[i].id == $scope.appliedJobs[j].userid){
							  $scope.usersdetailforEmail.splice(i, 1);		
							 $('#'+'C-'+$scope.appliedJobs[j].userid+'').prop('checked', false);
						  }
			  
			 }
				 }
		 } 
		 
	 };
	 
	$scope.selectedcandinate =function(){		
		$(".loader").show();
		 $('#print_candidates').modal("show");
		
		 Admin_Service.fetchselectedUserData($scope.Userdata).then(function(response){
			  $scope.selectedUserData = response.data;
			  $(".loader").fadeOut("slow");
			  //console.log($scope.selectedUserData);
		});  
	};
	  
	$scope.removefromlist=function(index,refno){		
		
		 
		 $scope.Userdata.splice(index,1);
		 
		 $('#'+refno+'').prop('checked', false);
		 $scope.selectedcandinate();
		 
		 //console.log($scope.Userdata);
	};
	
	$scope.checkIds=function(refno,userId){	
		 
		for(var i=0;i<$scope.Userdata.length;i++){
			
			if($scope.Userdata[i].id == userId){
				$('#'+refno+'').prop('checked', true);
			}
			
		} 
	}; 
 
	
	 $scope.selected = function(assessmentData,id){			 
		$(".back-tr").removeClass("back-tr");
		$('#back-tr'+id).addClass('back-tr');		
		 $scope.assessmentData = assessmentData;		  
	 };
	 $scope.disabled = 0; 
	 $scope.assignAssessment = function(){
		 $scope.disabled = 1; 
		 $scope.Validator = true;
		 if($("#assessDate").data('date') == undefined){
			 GlobalModule_notificationService.notification("error","please select date");
			 $scope.Validator = false;
		 } 	 
		 if($scope.assessmentData == undefined){
			 GlobalModule_notificationService.notification("error","please select Assesment");
			 $scope.Validator = false;
		 }
		 
		 if($scope.Validator == true){
		 $scope.assessmentId=$scope.assessmentData.id;			 
		 $scope.date = $("#assessDate").data('date');    	
		 $scope.assessmentDate = moment($scope.date, 'DD-MM-YYYY').unix();		
		 
		 Admin_Service.assignAssessment($scope.Userdata,$scope.assessmentId,$scope.senderId,$scope.assessmentDate).then(function(response){
			  var result = response.data;		
			  if(result == "success"){
				  GlobalModule_notificationService.notification("success","Assessment successfully assigned to user");
				  $('#assigned-assessments-modal').modal("hide");
				  $state.reload();
				  $(".modal-backdrop").hide();
				  
			  }else{
				  if(result == "Duplicate"){
					 // GlobalModule_notificationService.notification("error","Assessment already assigned to one or more users.It will not be assigned again");
					  GlobalModule_notificationService.notification("success","Assessment successfully assigned to user");
					  $('#assigned-assessments-modal').modal("hide");
					  $state.reload();
					  $(".modal-backdrop").hide();
					 
				  }else{
					  GlobalModule_notificationService.notification("error","Assessment is not assigned to user");
				  }
			  }
			  
			  $scope.date = null;
			  $scope.data.brand =null;
			  $scope.data.department = null;
			  $scope.data.position = null;
			  
			  
		}); }
	 };
	 
	 $scope.clearmodal = function(){ 
		 $('#assigned-assessments-modal').modal("hide");
		  $scope.date = null;
		  $scope.data.brand = null;
		  $scope.data.department = null;
		  $scope.data.position = null;
	 };
	 
	 $scope.checkUserforAssessmentModal = function(){
			
			if($scope.usersdetailforEmail.length == 0){
				GlobalModule_notificationService.notification("error","Please select users");
			}else{
				console.log("===============$scope.Userdata=======")
				console.log($scope.Userdata);
				for(var i=0;i<$scope.Userdata.length;i++){
					var userid=$scope.Userdata[i].id;
					var status=$scope.Userdata[i].status;
					var mapreq=$scope.Userdata[i].mappreqid;
					var discard=0;
					if(status=="Shortlisted" || status=="Assessment Assigned" || status=="Assessment Completed" || status=="Interview Completed"  || status=="Peer Review Started" ){
						discard=0;
					}else{
						discard=1;
						break;
					}
				}
				if(discard==0){
					 $('#assigned-assessments-modal').modal('show');
				}
				else{
					 $('#invaliduserselected').modal('show');
					
					}
				
			}				
		};
		
	 $scope.download = function(path){
		   
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
		
		 $scope.generateExcel = function(){		 
			  if($scope.search == undefined){
				  $scope.search ="";
			  }			 
			  window.open('download?userId='+$rootScope.userdetails.id+'&screenId='+1+'&search='+$scope.search+'&AccessToken='+getCookie('ACCESS_TOKEN')+'&activefilter='+$scope.activefilter);		 
		  };
		  
		  
		  //----------------------------------
		  var assessmentTestImages=[];	  
		  $(document).ready(function() {
			  for(var i=0;i<assessmentTestImages.length;i++) { 
			    var $lightbox = $('#lightbox-new'+i);
			    
			    
			    $('[data-target="#lightbox-new"]').on('click', function(event) {
			        var $img = $(this).find('img'), 
			            src = $img.attr('src'),
			            alt = $img.attr('alt'),
			            css = {
			                'maxWidth': $(window).width() - 100,
			                'maxHeight': $(window).height() - 100
			            };
			       
			    $scope.bigImage=src;
			        $lightbox.find('img').attr('src', src);
			        $lightbox.find('img').attr('alt', alt);
			        $lightbox.find('img').css(css);
			    });
			    
			    $lightbox.on('shown.bs.modal', function (e) {
			    	var $img = $lightbox.find('img');
			        //alert($img.src);
			        $lightbox.find('.modal-dialog').css({'width': $img.width()});
			    });
			  }
		  });
		  		 
		  /*$scope.showAudioTrack=function(q,index){
			  
			  $scope.media=index;			  				
			  
			  $scope.isVoiceEnabledFlag=q.isVoiceEnabled;
			  
			  $scope.mediaLink = q.audioAns;			  														
				
			};*/
		  $scope.showThisBigImage = function(imagePath){
			  $scope.bigImage=imagePath;
			  $("#lightbox-new").modal("show");
		  };
		  		  
		  
		  //----------------
		  
		  $scope.generatedSignUrl = function(index){
			   
				if($scope.QuestionAnsList[index].audioAns.includes("amazonaws"))
			   {
					$(".loader").show();
				$rootScope.getSignedURL($scope.QuestionAnsList[index].audioAns).then(function(response){
					$scope.QuestionAnsList[index].audioAns=response.data;
					//console.log($scope.QuestionAnsList);
					$(".loader").fadeOut("slow");
				},function(response){
					GlobalModule_dataStoreService.errorResponseHandler(response);
				});
			   }
				
			};
			
			$scope.displayUserAssessmentMedia = function()
			{
				for(var i=0;i<$scope.QuestionAnsList.length;i++){
				 var audio = document.getElementById("audioMedia"+i);
				 if(audio != null || audio != undefined)
				 audio.load();
				}				
			};
			
			
			/*var v = document.getElementById('v');
			v.addEventListener('canplaythrough', function(e) {
			  console.log(e.type, this.seekable.end(0));
			});*/
			
			/*if()
			{
				
			}*/
			
		// for role mapping 
			
		$scope.setCandidateProfile=false;
	    $scope.candidateProfile=function()
	    {
	    	
			  for(var i=0;i<$rootScope.userdetails.roleMenuMapping.menus.length;i++)
			  {
				  if($rootScope.userdetails.roleMenuMapping.menus[i].name == "Candidate Profile")
				 {
					  $scope.setCandidateProfile=true;
				 }
		      }
		};$scope.candidateProfile();
		
	
	 $scope.setInterview=false;
	 $scope.interview=function(){
			  for(var i=0;i<$rootScope.userdetails.roleMenuMapping.menus.length;i++)
			  {
				  if($rootScope.userdetails.roleMenuMapping.menus[i].name == "Interview")
				 {
					  $scope.setInterview=true;
				 }
		      }
		};$scope.interview();
		
		$scope.uploadLocalvideo = function()
		{
			
			//$(".loader").show();
			//var hrf =   $('#ul').find('a').attr('download');
			var input = document.getElementById('uservideo');
			$(".loader").show();
			
				var created=$rootScope.userdetails.id;
				var formData = new FormData();
				formData.append("file",input.files[0]);
				formData.append("file-name",input.files[0].name);
				
				formData.append("userid",$scope.userIdInterview);
				formData.append("jobId", $scope.jobIdInterview);
				formData.append("createdId",created);
				formData.append("interviewId", $scope.interviewId);					
				
				$.ajax({
						url: 'rest/admin/uploadLocalInterviwVideo',
						type: 'POST',
						data: formData,
						
						async: true,
						cache: false,
						contentType: false,
						processData: false,
						success: function (response) {
							submitvideo=0;
							
							$(".loader").fadeOut("slow");
							
							GlobalModule_notificationService.notification("success","video uploaded Successfully !!"); 
							$scope.fetchInterviewAns($scope.interviwAnsobj);
						}
					});
							
				$(".loader").fadeOut("slow");
			
		};
		
	$scope.setList=function(s)
	{
		$scope.decisionDateId=s.id;
	};
		
	
	
		$scope.decisionSuitable=function(action)
		 {   
			   if(($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "" && action=='Not Suitable')
					{
				       GlobalModule_notificationService.notification("error","Please select date");
						return;
					}
			   else{
				   $('#rejectbutton').modal('show');
			   }
		  };
		  $scope.decisionSuccess=function(action)
			 {   
				   if(($("#decisionDate").val()) == undefined || ($("#decisionDate").val()) == "" && action=='Not Successful')
						{
					       GlobalModule_notificationService.notification("error","Please select date");
							return;
						}
				   else{
					   $('#rejectbutton').modal('show');
				   }
			  };
		  
	/*$scope.datemodal=function()
	{
		$('#decisionDate').modal('hide'); 
	}*/
		  
		  /*$scope.dateformate = function(date){	
			  
			  if(date == undefined || date == '')
			  {
				  return null;
			  }
			  
		      var dateOut = moment(date).format("DD-MM-YYYY");
		      return dateOut;
		   };*/
			
			$scope.onloadFun = function(evt) {
				$(function(){
				$('#decisionDate').datetimepicker({
					 format: 'DD-MM-YYYY',
					 maxDate: new Date(),
					 minDate: new Date()
					 
			
	          });
				});
		      };
		      
		      //for mapping button status
		      
		      $scope.isEnabledButton=function(menuName)
		      {
		    	  for(var i=0;i<$rootScope.userdetails.roleMenuMapping.menus.length;i++)
		    	  {
		    		  if( menuName == $rootScope.userdetails.roleMenuMapping.menus[i].name  )
		    			  {
		    			    return true;
		    			  }
		    		  
		    	  }	return false;  
		      };
		      
		      $scope.fetchUserRatingValue=function(userid,jobId){
		    	  
		    	  $(".loader").show();
			    	
				  Admin_Service.fetchUserRatingValue(userid,jobId).then(function(response){	 				  
					  $scope.ratingValueList = response.data;	 
					 console.log($scope.ratingValueList);
					 
					  $(".loader").fadeOut("slow");	
					  
				},function(response){
				$(".loader").fadeOut("slow");	
				});
		    	  
		      };
		      
		      $scope.fetchUserJobfairInterviewLog=function(){ 
		    	  
		    	  $(".loader").show();
			    	
				  Admin_Service.fetchUserJobfairInterviewLog($scope.userIdInterview).then(function(response){	 				  
					  $scope.jobFairInterviewLog = response.data;	 
					 console.log($scope.jobFairInterviewLog);
				//	 for(var i=0;i<$scope.jobFairInterviewLog;i++){
					 console.log($scope.jobFairInterviewLog[0].interviewLog.communicationnotes.notes);
				//	 }
					  $(".loader").fadeOut("slow");	
					  
				},function(response){
					
				$(".loader").fadeOut("slow");	
				});	    	  
		      };
		      
		      $scope.showVideoList=function(jobfair){
		    	  
		    	  $(".loader").show();
		    	  $scope.vedioflag=1;
					document.getElementById("showvidointerviewlist1").setAttribute("class", "active"); 
				//	document.getElementById("showvidointerviewlist2").setAttribute("class", "");
		    	  $scope.jobfairInterviewVideoList=jobfair.interviewLog.interviewVideoFilePath.split(",");
		    	  
		    	 //$scope.noteList=jobfair.interviewLog.communicationnotes.notes.split(",");
		    	  $scope.noteList=jobfair.interviewLog.communicationnotes.notes;
		    	  
		    	  
		    	 //console.log($scope.note);
		    	//  $scope.showvideopath1();
		    	  
		    	  
		    	  console.log($scope.jobfairInterviewVideoList);
		    
		    	  $scope.interviewShowFlag=5;
		    	  $('#start_timer_button').show();
		    	  $('#stop_timer_button').hide();

		    	//  $scope.eventidofvideo=1;
		    	  
					$scope.fetchInterViewVideoPath(jobfair.interviewLog.id);
		    	  $(".loader").fadeOut("slow");
		    	  
		      };
		    
		      $scope.showvideopath1 = function(){
					
		    	  $scope.videopath=[];
		    	 
		    	  for(var i=0; i<$scope.jobfairInterviewVideoList.length;i++){
					if($scope.jobfairInterviewVideoList[i].includes("amazonaws"))
					   {
						$rootScope.getSignedURL($scope.jobfairInterviewVideoList[i]).then(function(response){
							
							$scope.signedVideoPath = response.data;
							$scope.videopath.push($scope.signedVideoPath);
							console.log($scope.videopath)
							 
							//$("#video-details").modal();
							//start(null,'video_recording',response.data)
							
 						},
 						function(response){
 							GlobalModule_dataStoreService.errorResponseHandler(response);
 						});
					  }	/*else{
						   $scope.signedVideoPath = $scope.jobfairInterviewVideoList[i];
						   $scope.videopath.push($scope.signedVideoPath);
						
							console.log($scope.videopath)
					   }*/
					}
		    	
				};
				
			
				//-----video interview log---
				$scope.vedioflag=1;
				$scope.showvidointerviewlist = function(id)
				{
				
					$scope.vedioflag=id;
					if(id==1){	
						// $scope.showVideoList(jobfair);
						$scope.fetchInterViewVideoPath($scope.interviewId);
						document.getElementById("showvidointerviewlist1").setAttribute("class", "active"); 
						document.getElementById("showvidointerviewlist3").setAttribute("class", "");
					}
					if(id == 2){					
						document.getElementById("showvidointerviewlist1").setAttribute("class", "");
						document.getElementById("showvidointerviewlist3").setAttribute("class", "");
						}
					
					if(id == 3){
						document.getElementById("showvidointerviewlist3").setAttribute("class", "active"); 
						document.getElementById("showvidointerviewlist1").setAttribute("class", "");
					}
					
				};
				
			$scope.candidateOrInterviewer=function(videoPath){
				
				if(videoPath.includes('callee'))
				{
					return 'interviewer';
				}
				else if(videoPath.includes('caller'))
				{
					return 'candidate';
				}
				
			};
			
			$scope.checkedcandidateids=[];
			  
			$scope.ckedcandidateId = function(id){			  
						  
				if($scope.checkedcandidateids.indexOf(id) !== -1)
				{		
					var array  = $scope.checkedcandidateids;
					var index = array.indexOf(id);
					$scope.checkedcandidateids.splice(index,1);
				}
				else
				{		    	
					$scope.checkedcandidateids.push(id);				      
				};						  
			};
			
			$scope.checkedAllList = function(appliedJobs,rd){
				
				if(rd == true || rd == undefined)
				{				 
					for(var i=0; i<appliedJobs.length; i++)
					{					  
						if($scope.checkedcandidateids.indexOf(appliedJobs[i].userid) !== -1)  
						{  						 
						}
						else
						{
							 $scope.ckedcandidateId(appliedJobs[i].userid);	
						}						  
					}			
				}
				else
				{
					$scope.checkedcandidateids=[];
				}
			};
			
			
	//------------------------candidate flag--------------------------------------			
	          
			 $scope.clear=function(){

				 $scope.flag = {
				 flagComment:"",
				 flagId:{
				 id:0
				          }    
				 };
				};
			
		
				 $scope.changeFlagForUser=function(id){
						$scope.flaguserid=id;
						
							//$("#update_Flag").modal("show");
						
					};
		           
				
				
				
				
				
				
	           $scope.updateUserFlag=function(userFlag){
	        	   
	        	   $(".loader").show();
	        	  
	        	//   $("#update_Flag").modal('show');
	        	   userFlag.userid=$scope.flaguserid;
				   userFlag.id=$rootScope.userdetails.id;
					Admin_Service.updateUserFlag(userFlag).then(function(response){
						$scope.Flag = response.data;
						 $scope.getAppliedJobcount(null,null);
						 $scope.fetchAppliedJobs(0,10,null,null,null,null);
						 $scope.checkedcandidateids=[];
						 if($scope.Userdata != null){
							 for(var i=0;i<$scope.Userdata.length;i++){
							 var refno=$scope.Userdata[i].refId;
							
							 $('#'+refno+'').prop('checked', false);
						 }
						 }
						 $scope.Userdata=[];
						 if($scope.Flag == "success"){
							 $("#update_Flag").modal('hide');
							 $("#assign1_Flag").modal('hide');
							 $scope.noflag="";
						 GlobalModule_notificationService.notification("success"," Your flag has been updated successfully");
						 }else{
						 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						 }
						 $(".loader").fadeOut("slow");
						 },function(response){
						 $(".loader").fadeOut("slow");
						});
					};  
					
					 $scope.fetchCandidateFlag=function(){ 
				    	  
				    	  $(".loader").show();
				    	  
					    	
						  Admin_Service.fetchCandidateFlag().then(function(response){	 				  
							  $scope.userFlag= response.data;	 
							 console.log($scope.userFlag);
							 
							  $(".loader").fadeOut("slow");	
							  
						},function(response){
							
						$(".loader").fadeOut("slow");	
						});	    	  
				      };
				      $scope.fetchCandidateFlag();
				      
				      
				      
                     $scope.fetchUpdatedUserFlag=function(userid){ 
				    	  
				    	  $(".loader").show();
					    	
						  Admin_Service.fetchUpdatedUserFlag(userid,$rootScope.userdetails.id).then(function(response){	 				  
							  $scope.uflag= response.data;
							  
							 console.log($scope.uflag);
							 if($scope.uflag == null){
								 $scope.noflag="noflag";
							 }else{
								 $scope.noflag="";
								// $scope.flagcomment=$scope.uflag.flagComment;
							 }
							 if($scope.uflag== null ){
								 $("#assign1_Flag").modal("show");
							 }else{
								 $("#update_Flag").modal("show");
							 }
							 
							 
							  $(".loader").fadeOut("slow");	
							  
						},function(response){
							
						$(".loader").fadeOut("slow");	
						});	    	  
				      };
				    //  $scope.fetchUpdateFlag();
				      
				      $scope.checkRemoveUpdateUserFlag=function(){
				    	  
				    	  $("#update_Flag").modal("hide");
							$("#remove_UpdateFlag").modal("show");
					}; 


				      
                  $scope.removeUpdatedUserFlag=function(){ 
				    	  
				    	  $(".loader").show();
					    	
						  Admin_Service.removeUpdatedUserFlag($scope.flaguserid).then(function(response){	 				  
							  $scope.rflag= response.data;	 
							 console.log($scope.rflag);
							 if($scope.Userdata != null){
								 for(var i=0;i<$scope.Userdata.length;i++){
								 var refno=$scope.Userdata[i].refId;
								
								 $('#'+refno+'').prop('checked', false);
							 }
							 }
							 $scope.Userdata=[];
							 if($scope.rflag == "success"){
								 $("#update_Flag").modal('hide'); 
							 GlobalModule_notificationService.notification("success"," Your flag has been remove successfully");
							 $scope.getAppliedJobcount(null,null);
							 $scope.fetchAppliedJobs(0,10,null,null,null,null);
							 }else{
							 GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							 }
				
							  $(".loader").fadeOut("slow");	
							  
						},function(response){
							
						$(".loader").fadeOut("slow");	
						});	    	  
				      };
				      
				      
				      
					
					
					
					
	//-----------------------------------------------------------------------------------------------				
				    	

				
			$scope.openResetPasswordModal=function(){
				
				if($scope.checkedcandidateids.length == 0){
					
					
					GlobalModule_notificationService.notification("error","Please select any record");
					
				}else{
					$("#resetpasswordmodal").modal("show");
				}
			}
			$scope.adminResetPassword=function(){
				 $(".loader").show();
				
				Admin_Service.adminResetPassword($scope.checkedcandidateids,$scope.senderId).then(function(response){
			    	
					 var resetStatusFlag = response.data;				   
					 $scope.checkedcandidateids=[];
					  if(resetStatusFlag == "success"){
						  
						  $("#successresetpasswordmodal").modal("show");
					  }
					 if(resetStatusFlag == "Emaildoesnotexists")
					 {
						 $("#errorresetpasswordmodal").modal("show");
					 }
					 
					 $(".loader").fadeOut("slow");
					 
				 },function(response){
					  $(".loader").fadeOut("slow");
			});
				
			};
			
			$scope.reload=function(){
				$("#successresetpasswordmodal").modal('hide');
				$(".modal-backdrop").hide();
				$state.reload();
			}
			
			$scope.startVideo=function(){
				$('#startstopvideo video').trigger('play');
			
		    	  $('#start_timer_button').hide();
		    	  $('#stop_timer_button').show();
			};
			
			$scope.stopVideo=function(){
				$('#startstopvideo video').trigger('pause');
				$('#start_timer_button').show();
				 $('#stop_timer_button').hide();
			}
			
			
			$scope.checkDisableAccount=function(){
					if($scope.checkedcandidateids.length == 0){
						GlobalModule_notificationService.notification("error","Please select users");	
					}else{
						$("#disable_user").modal("show");
					}
				};  
				$scope.disableAccount = function(){
					
					$(".loader").fadeOut("slow");
					
					    $("#disable_user").modal('show');
					    Admin_Service.disableAccount($scope.checkedcandidateids).then(function(response){
						  $scope.disableflag = response.data;	
						  $scope.getAppliedJobcount(null,null);
						  $scope.fetchAppliedJobs(0,10,null,null,null,null);
						  $scope.checkedcandidateids=[];
						  if($scope.Userdata != null){
								 for(var i=0;i<$scope.Userdata.length;i++){
								 var refno=$scope.Userdata[i].refId;
								
								 $('#'+refno+'').prop('checked', false);
							 }
							 }
							 $scope.Userdata=[];
						  if($scope.disableflag == "success"){
							  
							  GlobalModule_notificationService.notification("success","Accounts disabled successfully");
						  }else{
							  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						  }
						  $(".loader").fadeOut("slow");
					  },function(response){
						  $(".loader").fadeOut("slow");
						});
				  };	 
				  
				//-----------------------------------------Flag Account----------------------
				 
				  
				  $scope.checkInsertUserFlag=function(id){
					  	$scope.flaguserid=id;
						if($scope.checkedcandidateids.length == 0){
							GlobalModule_notificationService.notification("error","Please select users");	
						}else{
						//	$(".modal-backdrop").hide();
							 $("#assign_Flag").modal('show');
						}
					}; 
					
					/*$scope.changeFlagForUser=function(id){
					$scope.flaguserid=id;

					$("#assign_Flag").modal("show");

					};*/
			
					$scope.insertUserFlag = function(userFlag){
						
						$(".loader").show();
						userFlag.userids=$scope.checkedcandidateids;
						userFlag.id=$rootScope.userdetails.id
						
						    //$("#assign_Flag").modal('show');
						    
						    Admin_Service.insertUserFlag(userFlag).then(function(response){
							  $scope.insertstatus = response.data;	
							  $scope.getAppliedJobcount(null,null);
							  $scope.fetchAppliedJobs(0,10,null,null,null,null);
							  $scope.checkedcandidateids=[];
							  if($scope.Userdata != null){
									 for(var i=0;i<$scope.Userdata.length;i++){
									 var refno=$scope.Userdata[i].refId;
									
									 $('#'+refno+'').prop('checked', false);
								 }
								 }
								 $scope.Userdata=[];
							  if($scope.insertstatus == "success"){
								  $("#assign_Flag").modal('hide');
								  GlobalModule_notificationService.notification("success"," Your flag has been set successfully");
								  
							  }else{
								  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
							  }
							  $(".loader").fadeOut("slow");
						  },function(response){
							  $(".loader").fadeOut("slow");
							});
					  };	
			
			
			$scope.checkRemoveUserFlag=function(){
									if($scope.checkedcandidateids.length == 0){
										GlobalModule_notificationService.notification("error","Please select users");	
									}else{
										$("#remove_Flag").modal("show");
									}
								};  
								$scope.removeUserFlag= function(){
									
									$(".loader").fadeOut("slow");
									for(var j=0;j<$scope.checkedcandidateids.length;j++){
										var checkuserid=$scope.checkedcandidateids[j];
										
									for(var i=0;i< $scope.appliedJobs.length;i++){
										if(checkuserid == $scope.appliedJobs[i].userid)
										{
											if($scope.appliedJobs[i].userflag.flagName == ""){
												$scope.checkedcandidateids[j]="";
												GlobalModule_notificationService.notification("error",$scope.appliedJobs[i].name+ " has no flag assigned");
												return;
												break;
											}
										}	
									}
									}
									 //   $("#remove_Flag").modal('show');
									    Admin_Service.removeUserFlag($scope.checkedcandidateids).then(function(response){
										  $scope.removeflag = response.data;	
										  $scope.getAppliedJobcount(null,null);
										  $scope.fetchAppliedJobs(0,10,null,null,null,null);
										  $scope.checkedcandidateids=[];
										  if($scope.Userdata != null){
												 for(var i=0;i<$scope.Userdata.length;i++){
												 var refno=$scope.Userdata[i].refId;
												
												 $('#'+refno+'').prop('checked', false);
											 }
											 }
											 $scope.Userdata=[];
										  if($scope.removeflag == "success"){
											  
											  GlobalModule_notificationService.notification("success","Flags removed successfully");							  
										  }else{
											  GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
										  }
										  $(".loader").fadeOut("slow");
									  },function(response){
										  $(".loader").fadeOut("slow");
										});
								  };	 
								  
								//-----------------------------------------Interview Assessment Log User List----------------------
									 
								  $scope.fetchInterviewAssessmentListForUsers =function(offset,limit,colName,order,search,userId){
									  $(".loader").show();
									  $scope.xpath=[];
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
										 $scope.selecttabflag = "interviewassessment";
									  Admin_Service.fetchInterviewAssessmentListForUser(offset,limit,colName,order,$scope.userIdInterview).then(function(response){
										  $scope.fetchInterviewAssessmentListForUser = response.data;	
										   console.log($scope.interviewListForUser);
										  $(".loader").fadeOut("slow");
									},function(response){
										$(".loader").fadeOut("slow");
										});
								  };	
								  
								//-----------------------------------------Interview Assessment Log User List----------------------
								  
								//-----------------------------------------Interview Assessment Log Tab Data----------------------
									
								  $scope.fetchInterviewAssessmentTabData = function(){
									  $scope.fetchInterviewAssessmentListForUsers(0,100,null,null,$scope.User_id);
										$(".loader").show();
										$(".loader").fadeOut("slow");
																			
									};		
									
										$scope.clearQuestion = function(){
											$scope.QuestionAnsList="";
										};
										
								$scope.SortinginterviewassessmentList = function(colName){
									  $scope.offset =0 ;
										$scope.start = 0;
									  $scope.colName=colName;
										if($scope.order==undefined || $scope.order=="desc" && $scope.order != undefined)
										{
											$scope.order ="asc";
										}
										else if($scope.order!=undefined && $scope.order=="asc")
										{
											$scope.order = "desc";
										}
										if($scope.colName==null)
										  {
										  $scope.colName= undefined; 
										  }
														
										$scope.fetchInterviewAssessmentListForUsers(0,100,$scope.colName,$scope.order,$scope.userIdInterview);
									};
									
									
									 $scope.startManagerReview = function(reqassessmentdata){	 
											
											$(".loader").show();
											  var req={};
											  req.id=reqassessmentdata.userid;
											  req.userAppliedJobId=reqassessmentdata.id;
											  req.requisition_id=reqassessmentdata.requisition.id;
											  req.roleId=reqassessmentdata.user.roleId;
											  req.JobId=reqassessmentdata.jobId;
											  
											  Admin_Service.startManagerReview(req,$rootScope.userdetails.id).then(function(response){	 			 
											  $scope.startmanageresponse = response.data;
											  if($scope.startmanageresponse == "invalid admin"){
												  GlobalModule_notificationService.notification("error","You Cannot Do Manager Review");
												  $state.reload();
											  }else if($scope.startmanageresponse=="success"){
												  GlobalModule_notificationService.notification("success","Under Manager Review");
												  $state.reload();
											  }
											  
											  else{
												  GlobalModule_notificationService.notification("error","Can't do manager review");
												  $state.reload();
											  }
											  $(".loader").fadeOut("slow");			  
											},function(response){	
												$(".loader").fadeOut("slow");		
												});
											 };
			
	
											 $scope.underManagerReview = function(reqassessmentdata){	 
													$scope.jobdatamngrcomment={};
												 if(reqassessmentdata.mgr_reviewer_id!=$rootScope.userdetails.id){
													 GlobalModule_notificationService.notification("error","You Are Not Valid Manager To Add Comment");
													  $state.reload(); 
												 }
												 else{
													 $scope.jobdatamngrcomment=reqassessmentdata;
													 $("#Manager_comment_modal").modal("show");
													
											 }
													 };
													 
													 $scope.saveManagerComment = function(){	 
															$(".loader").show();
															var reqassessmentdata = $scope.jobdatamngrcomment;
															var comment = $("#mng_comment").val();
															  var req={};
															  req.id=reqassessmentdata.id;
															  req.userid=reqassessmentdata.userid;
															  req.jobId=reqassessmentdata.jobId;
															  req.mgr_review_comment=comment;
															  
															  Admin_Service.saveManagerComment(req,$rootScope.userdetails.id).then(function(response){	 			 
															  $scope.savemngcommentresponse = response.data;
															   if($scope.savemngcommentresponse=="success"){
																  GlobalModule_notificationService.notification("success","Manager Comment Save Successfully");
																  $('.modal-backdrop').hide(); 
																  $state.reload();
															  }
															  
															  else{
																  GlobalModule_notificationService.notification("error","Failed to save Manager Comment");
																  $state.reload();
															  }
															  $(".loader").fadeOut("slow");			  
															},function(response){	
																$(".loader").fadeOut("slow");		
																});
													 
															 };
					
															 $scope.showmanagercomment = function(j){	
															 $scope.managerComment=j.mgr_review_comment;
															 $("#yassessment-modal").modal("show");
															 };
															 
								//-----------------------------------------Interview Assessment Log Tab Data----------------------
									
							
									 $scope.assignReqMappAssessment = function(reqassessmentdata){	 
											
											$(".loader").show();
											  var req={};
											  req.id=reqassessmentdata.userid;
											  req.userAppliedJobId=reqassessmentdata.id;
											  req.requisition_id=reqassessmentdata.requisition.id;
											  req.roleId=reqassessmentdata.user.roleId;
											  req.JobId=reqassessmentdata.jobId;
											  
											  Admin_Service.assignReqMappAssessment(req,$rootScope.userdetails.id).then(function(response){	 			 
											  $scope.assignmappreqassessment = response.data;
											  if($scope.assignmappreqassessment != ""){
												  GlobalModule_notificationService.notification("success","Assessment successfully assigned to user");
												  $state.reload();
											  }else{
												  GlobalModule_notificationService.notification("error","Assessment is not assigned to user");
												  $state.reload();
											  }
											  $(".loader").fadeOut("slow");			  
											},function(response){	
												$(".loader").fadeOut("slow");		
												});
											 };
				
											 
											

}]);

