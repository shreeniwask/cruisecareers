'use strict';

var controllers = angular.module('LoginModule');

controllers.directive('allow1', function () {
return {
    require: 'ngModel',
    link: function (scope, element, attr, addTicket_Ctrl) {
        function fromUser(text) {
            if (text) {
                var transformedInput = text.replace(/[^0-9]/g, '');

                if (transformedInput !== text) {
                	addTicket_Ctrl.$setViewValue(transformedInput);
                	addTicket_Ctrl.$render();
                }
                return transformedInput;
            }
            return undefined;
        }            
        addTicket_Ctrl.$parsers.push(fromUser);
    }
};
});
controllers.directive('allow3', function () {
	return {
	    require: 'ngModel',
	    link: function (scope, element, attr, addTicket_Ctrl) {
	        function fromUser(text) {
	            if (text) {
	                var decimal = text.replace(/[^0-9\.]/g, '');

	                if (decimal !== text) {
	                	addTicket_Ctrl.$setViewValue(decimal);
	                	addTicket_Ctrl.$render();
	                }
	                return decimal;
	            }
	            return undefined;
	        }            
	        addTicket_Ctrl.$parsers.push(fromUser);
	    }
	};
	});



(function() {

	controllers.directive('allow2', onlyLettersInput);
	  
	  function onlyLettersInput() {
	      return {
	        require: 'ngModel',
	        link: function(scope, element, attr, addTicket_Ctrl) {
	          function fromUser(text) {
	            var transformedInput = text.replace(/[^a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]/g, '');
	            //console.log(transformedInput);
	            if (transformedInput !== text) {
	            	addTicket_Ctrl.$setViewValue(transformedInput);
	            	addTicket_Ctrl.$render();
	            }
	            return transformedInput;
	          }
	          addTicket_Ctrl.$parsers.push(fromUser);
	        }
	      };
	    };

	})();

controllers.controller('addTicket_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','addTicket_Service','survey_assignment_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,addTicket_Service,survey_assignment_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    //$scope.typeFlag= GlobalModule_dataStoreService.loadData('LoginModule','typeFlag');
	$scope.ticketID=0;
	$scope.workflowID=0;
	$scope.ticketID= GlobalModule_dataStoreService.loadData('LoginModule','ticketID');
	$scope.workflowID= GlobalModule_dataStoreService.loadData('LoginModule','workflowID');
	var workflowdDataFieldList=[];
	if($scope.workflowID==0){var workflowID=1;}
	var workflowId=1;
	
	if($scope.ticketID!=0 && $scope.ticketID!=undefined){
		$scope.ticketLabel="Update Ticket";
		$("#save").hide();
		$(".loader").show();
        addTicket_Service.fetchWorkflowDataFieldListByTicketId($scope.ticketID,$scope.workflowID).then(function(response){
		$scope.workflowdDataFieldList = response.data;
		console.log(response.data);
	    $(".loader").fadeOut("slow");
		},function(response){
	    $(".loader").fadeOut("slow");
	  });
        $scope.callbackTicketList= function(){
			// alert("hello");
			 $state.go('restricted.admin.ticket');
			
			 
    } ;
		
	}else{
	$scope.ticketLabel="Add New Ticket";
	$("#update").hide();
	$scope.fetchWorkflowDataFieldList = function(workflowID){
		 $(".loader").show();
		 addTicket_Service.fetchWorkflowDataFieldList1(workflowID).then(function(response){
				$scope.workflowdDataFieldList = response.data;
				if(response.data.length==null || response.data.length<1){
					GlobalModule_dataStoreService.storeData('LoginModule','workflowID',workflowID);
					 $state.go('restricted.admin.ticket');
					 GlobalModule_notificationService.notification("error","Please add fields in workflow for creaitng ticket");
				 		
				}
				  console.log(response.data);
			     $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
			});
	  };
	  
	  $scope.fetchWorkflowDataFieldList($scope.workflowID);
		var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;

	  $scope.addNewTicket = function(){

		 /* angular.forEach($scope.selectedList, function (selected, day) {
		        if (selected) {
		           console.log(day);
		        }
		    });*/
	   $(".loader").show();
	      var ticketAdd=true;
         //console.log($scope.workflowdDataFieldList);
        for(var i=0;i<$scope.workflowdDataFieldList.length;i++){
 			if($scope.workflowdDataFieldList[i].fieldmasterId==2 ||$scope.workflowdDataFieldList[i].fieldmasterId==1){
 				if($scope.workflowdDataFieldList[i].fieldvalue!=null && $scope.workflowdDataFieldList[i].fieldvalue!="" && $scope.workflowdDataFieldList[i].fieldvalue!=undefined){
 					if(!($scope.workflowdDataFieldList[i].fieldvalue.match(letterNumber)))
 					 {
 						 GlobalModule_notificationService.notification("error","Please Enter Valid Input "+$scope.workflowdDataFieldList[i].label);	
 						 //$("#"+fieldValue+""+index).val('');
 						// $("#textArea-2"+index).text('Enter Valid Input');
 						 $(".loader").fadeOut("slow");
 						ticketAdd=false;
 				  }
 				}
 			   // $scope.errorMsg="Please Enter ";
 				//GlobalModule_notificationService.notification("error",""+$scope.workflowdDataFieldList[0].label+"should be "+$scope.workflowdDataFieldList.length);
 			 }
 			 if($scope.workflowdDataFieldList[i].fieldmasterId==6){
        		var input = document.getElementById('docfilepath-'+i);
        		//alert(input);
        		if(input.value=="")
        	    {
        			ticketAdd=false;
        	    	event.preventDefault();
        	    	GlobalModule_notificationService.notification("error","Please Select "+$scope.workflowdDataFieldList[i].label+" File");
        	    	$(".loader").fadeOut("slow");
        	  
        	    }
 			}
 			if($scope.workflowdDataFieldList[i].fieldmasterId==8){
        		
 				var dateFields=$("#prefld-date"+$scope.workflowdDataFieldList[i].workflowFieldId).val();
				
				if((dateFields == undefined || dateFields == null) && $scope.workflowdDataFieldList[i].isRequired == true)
				{
					GlobalModule_notificationService.notification("error","Please select date for field "+ $scope.workflowdDataFieldList[i].label);	
					return false;
				}
				
				$scope.workflowdDataFieldList[i].fieldvalue=dateFields;
 			}
 			if($scope.workflowdDataFieldList[i].fieldmasterId == 7)
			{
 				if($scope.workflowdDataFieldList[i].userEmail!=null && $scope.workflowdDataFieldList[i].userEmail!="" && $scope.workflowdDataFieldList[i].userEmail!=undefined)
 				{
 			    
				var userdetail=document.getElementById("userdetail"+$scope.workflowdDataFieldList[i].workflowFieldId).value;
				
				if($scope.workflowdDataFieldList[i].isRequired == true && userdetail == undefined)
				{
					GlobalModule_notificationService.notification("error","Please enter employee/user email for "+ $scope.workflowdDataFieldList[i].label);
					$(".loader").fadeOut("slow");
					return;
				}
				if($scope.userDetailsList != undefined)
				{
					var m=0;
					for(var j=0;j<$scope.userDetailsList.length;j++)
					{
						if($scope.userDetailsList[j].empl_number == userdetail)
						{
							m++;
							$scope.workflowdDataFieldList[i].fieldvalue=$scope.userDetailsList[j].id +'-'+userdetail;
						}
					}
					if(m==0)
					{
						GlobalModule_notificationService.notification("error","Invalid number for " + $scope.workflowdDataFieldList[i].label);
						$(".loader").fadeOut("slow");
						return;
					}
				}
 			    }
 			}
			
 			if($scope.workflowdDataFieldList[i].fieldmasterId == 9)
			{
				
					var hours=$("#hours"+$scope.workflowdDataFieldList[i].workflowFieldId).val();
					
					var minutes=$("#minutes"+$scope.workflowdDataFieldList[i].workflowFieldId).val();
					
					if(hours > 24  || minutes > 60 ){
						GlobalModule_notificationService.notification("error"," Please Enter valid time");
						$(".loader").fadeOut("slow");
						return;
						
					}
			
			$scope.timeMinHours = hours +":"+minutes;
			$scope.workflowdDataFieldList[i].fieldvalue=$scope.timeMinHours;
				}
		//	$scope.taskDetails[i].fieldValue.push($scope.timeMinHours);
 		
	
 	
 	  }
          //    GlobalModule_notificationService.notification("error","Please select any record");
        // alert("hello"+$scope.workflowdDataFieldList[0].wf_ValidationMaster.fieldLength);
         
         if(ticketAdd){
        	 
		  addTicket_Service.addNewTicket1($scope.workflowdDataFieldList,$scope.workflowID).then(function(response){
					//$scope.workflowdDataFieldList = response.data;
			//console.log(response.data);
			$(".loader").fadeOut("slow");
			if(response.data=="success"){
				GlobalModule_notificationService.notification("success","Ticket created Successfully");
				$scope.callbackTicketList();
			 }
			
			  },function(response){
				  $(".loader").fadeOut("slow");
				});
             }
		  };
	    
		 $scope.callbackTicketList= function(){
			// alert("hello");
			 $state.go('restricted.admin.ticket');
			
			 
		 } ;
	  }
		$scope.updateTicket=function(){
		 $(".loader").fadeOut("slow");
		 //console.log($scope.workflowdDataFieldList);
		 var ticketUpdate=true;
		 for(var i=0;i<$scope.workflowdDataFieldList.length;i++){
	 			if($scope.workflowdDataFieldList[i].fieldmasterId==2 ||$scope.workflowdDataFieldList[i].fieldmasterId==1){
	 				if($scope.workflowdDataFieldList[i].fieldvalue!=null && $scope.workflowdDataFieldList[i].fieldvalue!="" && $scope.workflowdDataFieldList[i].fieldvalue!=undefined){
	 					if(!($scope.workflowdDataFieldList[i].fieldvalue.match(letterNumber)))
	 					 {
	 						 GlobalModule_notificationService.notification("error","Please Enter Valid Input "+$scope.workflowdDataFieldList[i].label);	
	 						 //$("#"+fieldValue+""+index).val('');
	 						// $("#textArea-2"+index).text('Enter Valid Input');
	 						 $(".loader").fadeOut("slow");
	 						ticketUpdate=false;
	 				  }
	 				}
	 			   // $scope.errorMsg="Please Enter ";
	 				//GlobalModule_notificationService.notification("error",""+$scope.workflowdDataFieldList[0].label+"should be "+$scope.workflowdDataFieldList.length);
	 			 }
	 		    }
		    if(ticketUpdate){
		     addTicket_Service.updateTicket1($scope.workflowdDataFieldList,$scope.workflowID,$rootScope.userdetails.id,$scope.ticketID).then(function(response){
			  console.log(response.data);
			  if(response.data=="success"){
				GlobalModule_notificationService.notification("success","Ticket Updated Successfully");
				$scope.callbackTicketList();
			  }
			  },function(response){
				  $(".loader").fadeOut("slow");
		    });
		   }
			
		};
		
		$scope.validateFieldValue=function(fieldValue,index){
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
			if(!(fieldValue.match(letterNumber)))
			 {
				 GlobalModule_notificationService.notification("error","Please Enter valid input");	
				 $("#"+fieldValue+""+index).val(' ');
				// $("#textArea-2"+index).text('Enter Valid Input');
				 //return false;
		  }
		};
		
		$scope.userDetailsList=[];
		$scope.addUserDetailsList=function(){
			
			if($scope.userDetailsList1 != undefined)
			{
				$scope.userDetailsList=$scope.userDetailsList.concat($scope.userDetailsList1);
			}		
			//Array.prototype.push.apply($scope.userDetailsList, $scope.userDetailsList1);	
			//console.log($scope.userDetailsList);
		}
		
		$scope.fetchUserDetails=function(search,role){
	  		
	  		var roleId=0;
	  		
	  		if(role == 'Employee')
	  		{
	  			roleId=2;
	  		}
	  		else if(role == 'Candidate')
	  		{
	  			roleId=1;
	  		}
	  		
	  		var numval='^[0-9]$';
	  		
	  		if(search=="")
	  		{
	  		 
	  		}
	  		else if(search.charAt(0).match(numval) && roleId == 1)
	  		{
	  				GlobalModule_notificationService.notification("error","Ref. no. should start with 'C-'");
	  				return;
	  		}
	  	  else{
	  		  
	  	  if(search.length>4){
	  	  
	  		survey_assignment_Service.fetchEmployeeDetails(search,roleId).then(function(response){
	  			
	  		  $scope.userDetailsList1 = response.data;
	  		  
	  		  //console.log($scope.userDetailsList);
	  		  
	  		  $scope.EmployeeNumberList=[];
	  		  
	  		  if(search.charAt(0) >= 0 && search.charAt(0) <= 9)
	  		  {
	  			  
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].empl_number});
	  			  }
	  		  }
	  		  else if((search.charAt(0) == 'C' || search.charAt(0) == 'c') && search.charAt(1) == '-')
	  		  {			 
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].empl_number});
	  			  }
	  		  }
	  		  else
	  		  {
	  			  for(var i=0;i<$scope.userDetailsList1.length;i++)
	  			  {
	  				 // $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id , detail:$scope.userDetailsList1[i].email});
	  				  
	  				  $scope.EmployeeNumberList.push({id:$scope.userDetailsList1[i].id});

	  			  }
	  		  }
	  		  
	  	  },function(response){
	  		  
	  		});	 
	  	  }
	  	  }		
	  	};
		
		$scope.getworkflowListTab=function(){
			$state.go('restricted.admin.ownerworkflow');
		};
		$scope.getMyTaskListTab=function(){
			$state.go('restricted.admin.mytask');
		};
		 
		$scope.onloadFun = function(evt) {
			$(function(){
			$('.dateonly2').datetimepicker({
				
          });
			});
	      };
	 
}]);