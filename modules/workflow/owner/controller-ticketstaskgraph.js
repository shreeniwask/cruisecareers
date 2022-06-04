'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Wf_tickettasksStatusCount_Ctrl',['$scope','$rootScope','$state','Login_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce','Profile_Service','Admin_Service','Wf_ticketStatusCount_Service','Wf_tickettaskStatusCount_Service', function ($scope, $rootScope,$state,Login_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce,Profile_Service,Admin_Service,Wf_ticketStatusCount_Service,Wf_tickettaskStatusCount_Service){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
	
	 $rootScope.userId = GlobalModule_dataStoreService.loadData('LoginModule','userId');
	 $scope.workFlowId = GlobalModule_dataStoreService.loadData('LoginModule','workflowId');
	 
	 $scope.colorObject=[];
	 
	 $scope.fetchWfStatusColor=function(ticketstasksStatusCount){
			Wf_ticketStatusCount_Service.fetchWfStatusColor().then(function(response){
				$scope.statusColor = response.data;
				
				$scope.colorObject.push($scope.statusColor[1].statusColorCode);
				$scope.colorObject.push($scope.statusColor[0].statusColorCode);
				$scope.colorObject.push($scope.statusColor[3].statusColorCode);
				$scope.colorObject.push($scope.statusColor[4].statusColorCode);
				$scope.colorObject.push($scope.statusColor[2].statusColorCode);
				
				/*var i=0;
				
				for(i=0;i<$scope.statusColor.length;i++){
					$scope.colorObject.push($scope.statusColor[i].statusColorCode);
				}*/
				
				console.log($scope.colorObject);
				$scope.showGraph(ticketstasksStatusCount);
			});
		};
	 
	 $scope.fetchTicketsTasksStatusList=function(userId,workflowId){
		 	$(".loader").show();
			
			Wf_tickettaskStatusCount_Service.fetchTicketsTasksStatusList(userId,workflowId).then(function(response){
				$scope.ticketstasksStatusCount = response.data;
				$scope.fetchWfStatusColor($scope.ticketstasksStatusCount);
				//console.log($scope.ticketstasksStatusCount);
				$scope.showGraph($scope.ticketstasksStatusCount);
				
				  $(".loader").fadeOut("slow");
			  },function(response){		
				  $(".loader").fadeOut("slow");
				});	
		};
		$scope.fetchTicketsTasksStatusList($rootScope.userId,$scope.workFlowId);
		
		// for fetching color dyanamically
		
		//$scope.fetchWfStatusColor();
		
		// for graph
		$scope.showGraph=function(ticketstasksStatusCount){
			
			var tktcnt =0;
			if($scope.ticketstasksStatusCount.length != 0)
			{
				tktcnt = $scope.ticketstasksStatusCount[0].taskOverDueCount+$scope.ticketstasksStatusCount[0].taskNotAssignedCount+$scope.ticketstasksStatusCount[0].taskCompletedCount+$scope.ticketstasksStatusCount[0].taskAssignedCount;
			}
			
			var ticksList = [];
			
			for(var i=0;i<=tktcnt;i++)
				{
				ticksList.push(i);
				}
		
			//console.log(ticksList);
			
		 google.charts.load("current", {packages:["corechart"]});
		    google.charts.setOnLoadCallback(drawChart);
		    function drawChart() {
		    	 var genre = ['Genre', 'Assigned', 'Not Assigned', 'Completed', 'Overdue', 'In Progress', { role: 'annotation' }];
		    	    var list = [];
		    	       list.push(genre);
		    	       for(var i=0; i<$scope.ticketstasksStatusCount.length; i++){          
		    	           list.push([ticketstasksStatusCount[i].task.name,
		    	        	   ticketstasksStatusCount[i].taskAssignedCount,
		    	        	   ticketstasksStatusCount[i].taskNotAssignedCount,
		    	        	   ticketstasksStatusCount[i].taskCompletedCount,
		    	        	   ticketstasksStatusCount[i].taskOverDueCount,
		    	        	   ticketstasksStatusCount[i].taskInProgressCount,'']);           
		    	       }
		    	        console.log(list);
		      var data = google.visualization.arrayToDataTable(list);
		        var list_workflow = 5;
		        var height_div = 80*list_workflow;
		          var view = new google.visualization.DataView(data);
		          view.setColumns([0,1,2,3,4,5,
		                           { calc: "stringify",
		                             sourceColumn: 1,
		                             type: "string",
		                             role: "annotation" },
		                           6]);

		        var options = {
		        width: 1000,
		        height: height_div,
		        legend: { position: 'top', maxLines: 3 },
		        bar: { groupWidth: '75%' },
		        colors: $scope.colorObject,
		        isStacked: true,
		        
		        hAxis: {
		            title: 'Number of tickets',
		            viewWindowMode: 'explicit',
		            viewWindow: {
		              //max: 180,
		              min: 0,
		              /*max: 2,*/
			          stepSize: 1,
		            },
		            gridlines: {
		              count: 2,
		            },
		            /*ticks: {
			              beginAtZero: true,
			              max: 2,
				          stepSize: 1,
			            },*/
		            ticks : ticksList,
		          }
		        
                /*scales: {
                	 yAxes: [{ 
          	           scaleLabel: {
          	              display: true,
          	              labelString: 'Number of Candidates',
          	            },
                       
                         ticks: {
                                  // it is for ignoring negative step.
                                    beginAtZero: true,
                                    max:$scope.ticketstasksStatusCount[0].taskOverDueCount+$scope.ticketstasksStatusCount[0].taskNotAssignedCount+$scope.ticketstasksStatusCount[0].taskNotAssignedCount+$scope.ticketstasksStatusCount[0].taskCompletedCount+$scope.ticketstasksStatusCount[0].taskAssignedCount,
                                    stepSize: 1  // if i use this it always set it '1', which look very awkward if it have high value  e.g. '100'.
                                }
            
		      }]
              }*/
		     }
		      var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
		      chart.draw(view, options);
		  }
		};

		$scope.getTicketListByWorkflowId=function(){
			var workflowObj={workFlowId:0,name:'',wf_Owner:{ownerId:0}};
			workflowObj.workFlowId=$scope.workFlowId;
			workflowObj.name=GlobalModule_dataStoreService.loadData('LoginModule','workflowName');
			workflowObj.wf_Owner.ownerId=GlobalModule_dataStoreService.loadData('LoginModule','workflowownerid');
			GlobalModule_dataStoreService.storeData('LoginModule','ownerWorkflowObject',workflowObj);
			$state.go('restricted.admin.ticket');
		};
		
}]);