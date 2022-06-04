'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('AdminDashboard_Ctrl',['$scope','$rootScope','$state','admindashBoard_Service','GlobalModule_dataStoreService','GlobalModule_notificationService','$route','$sce', function ($scope, $rootScope,$state,admindashBoard_Service,GlobalModule_dataStoreService,GlobalModule_notificationService,$route,$sce){

	$scope.weekDate=[];
	
	
    $scope.loadDashboard = function(){    
    	 $(".loader").show();
    	$scope.date = $("#date").data('date');	    	
		$scope.unixTimestamp = moment($scope.date, 'DD-MM-YYYY').unix();
		//console.log($scope.date);
		$scope.fetchnewApplicantCount();
		$scope.fetchSchedularCount();
		$scope.fetchAppliedCandidatesCount();		
						
		$scope.fetchTrendingJob();		
		$scope.fetchTimeSlotsList();
		$(".loader").fadeOut("slow");
		
		$scope.bar_chart.destroy();
		$scope.pie_chart.destroy();	
		
	    };
	   
    
	$scope.fetchnewApplicantCount = function(){		
		admindashBoard_Service.fetchnewApplicantCount($scope.unixTimestamp).then(function(response){
			   $scope.ApplicantCount = response.data; 
		},function(response){			
			});
	  };
	  
	
	$scope.fetchSchedularCount = function(){
			admindashBoard_Service.fetchSchedularCount($scope.unixTimestamp).then(function(response){
				   $scope.SchedularCount = response.data; 
			},function(response){			
				});
		  };
	
	
	$scope.fetchAppliedCandidatesCount = function(){
		admindashBoard_Service.fetchAppliedCandidatesCount($scope.unixTimestamp).then(function(response){	
			   $scope.AppliedCandidatesCount = response.data;	
			   
			   $scope.dataPack1 = [];
			   $scope.dates = [];
			   
			   if($scope.AppliedCandidatesCount == null || $scope.AppliedCandidatesCount == undefined || $scope.AppliedCandidatesCount.length == 0){					
				   $scope.set = false;
				  
			   }else{				   
				   for(var  i=0; i<$scope.AppliedCandidatesCount.length; i++){				  
					   $scope.dataPack1.push($scope.AppliedCandidatesCount[i].count);
					   $scope.dates.push($scope.AppliedCandidatesCount[i].day);
					   }					   
					   $scope.set = true;
			   }			
	
				// for bar chart---------------					   	
				   $scope.bar_ctx = document.getElementById('crr');
					$scope.bar_chart = new Chart($scope.bar_ctx, {
					    type: 'bar',
					    data: {
					        labels: $scope.dates,
					        datasets: [
					        {
					            label: 'Applied Candidates',
					            data: $scope.dataPack1,
					            backgroundColor: "#7cb5ec",
					            hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",           
					        },
					        ]
					    },
					    options: {
					        animation: {
					          duration: 1000,
					        },
					      
					        scales: {
					          xAxes: [{ 
					            gridLines: { display: false },
					            scaleLabel: {
					              display: false,
					              labelString: 'Applied Candidates'
					            }
					            }],
					          yAxes: [{ 
					           scaleLabel: {
					              display: true,
					              labelString: 'Number of Candidates',
					            },
					            ticks: {
					              beginAtZero: true,
					              max: 150,
					              stepSize: 50,
					            }, 
					          }],
					        },
					        legend: {
					          display: true,
					          position: 'bottom',
					          legendMarkerType: "triangle",
					          labels: {
					                fontColor: '#000',
					                fontFamily: 'roboto',
					                fontSize: 16,
					             }
					        }
					    } 
					  }
					);
				  // closed bar chart-----------------------		
		},function(response){			
			});
	  };
	
	/*----------event time list for week---------*/
	  $scope.timeSlots={};
	  
	$scope.fetchTimeSlotsList = function(){	
		admindashBoard_Service.fetchTimeSlotsList($scope.unixTimestamp).then(function(response){
			   $scope.timeSlots = response.data;
				 $scope.fetchEventListforWeek();
		},function(response){			
			});
	  };
	 
	  
	  $scope.fetchEventListforWeek = function(){		
		  // ----dates in selected week-----
		  $scope.weekDate=[];
			$scope.today = new Date(($scope.unixTimestamp) * 1000);		
			
			$scope.weekDate[0]=$scope.today;
			$scope.diff=$scope.unixTimestamp+148949-65300;
			for (var i =1;i<7;i++)
				{
				$scope.diff=$scope.diff+148949-65300;
				$scope.nextday = new Date(($scope.diff) * 1000);	
				$scope.weekDate[i]=$scope.nextday;
				//alert($scope.weekDate[i]);
				}
		 
			//-----fetch event list for week------
			
		  /*for(var j=0;j<7;j++){
			  $scope.unixTimestampforWeekDay = moment($scope.weekDate[j]).unix(); 
			 
		  for(var i=0;i<$scope.timeSlots.length;i++)
			  {
			  alert($scope.unixTimestampforWeekDay);
			admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek[i] = response.data; 
				// $scope.eventlist.push($scope.EventListforWeek);
				  // alert($scope.weekDate[j]+"----"+ $scope.EventListforWeek[i].name);
			},function(response){			
				});
			  }
		  $scope.weekEventlist[j]=$scope.EventListforWeek;
		  $scope.EventListforWeek=[];
	  }*/
			$scope.eventlist1=[];
			$scope.EventListforWeek={};
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[0]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $scope.EventListforWeek={};
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							 $scope.EventListforWeek = response; 
							 $scope.eventlist1.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(
					function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist1.push($scope.EventListforWeek);
				
				// alert($scope.timeSlots[i]);
				
			});*/
			
			 //$scope.eventlist1[$scope.timeSlots[i]]=$scope.EventListforWeek;
			  }
		 
		  $scope.eventlist2=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[1]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist2.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist2.push($scope.EventListforWeek);
			},function(response){			
				});*/
			  }
		  
		  $scope.eventlist3=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[2]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist3.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist3.push($scope.EventListforWeek);
			},function(response){			
				});*/
			  }
		  
		  $scope.eventlist4=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[3]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist4.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist4.push($scope.EventListforWeek);
			},function(response){			
				});*/
			  }
		  
		  $scope.eventlist5=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[4]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist5.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist5.push($scope.EventListforWeek);
			},function(response){			
				});*/
			  }
		  
		  $scope.eventlist6=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[5]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist6.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist6.push($scope.EventListforWeek);
			},function(response){			
				});*/
			  }
		  
		  $scope.eventlist7=[];
			$scope.unixTimestampforWeekDay = moment($scope.weekDate[6]).unix(); 
			 for(var i=0;i<$scope.timeSlots.length;i++)
			  {
				 $.ajax({
						url: 'rest/admindashboard/fetcheventlistforweek/'+$scope.unixTimestampforWeekDay+"/"+$scope.timeSlots[i],
						type: 'GET',
						async: false,
						success: function (response) {
							$scope.EventListforWeek = response; 
							 $scope.eventlist7.push($scope.EventListforWeek);
						}
					});
			/*admindashBoard_Service.fetchEventListforWeek($scope.unixTimestampforWeekDay,$scope.timeSlots[i]).then(function(response){
				 $scope.EventListforWeek = response.data; 
				 $scope.eventlist7.push($scope.EventListforWeek);
			},function(response){			
				});*/
				
			  }
		 
		  };
	  
	  
	 /*----------------------Event Scheduler for this week end-----------------*/
	  
	  $scope.fetchTrendingJob = function(){
			admindashBoard_Service.fetchTrendingJob($scope.unixTimestamp).then(function(response){
				   $scope.TrendingJob = response.data;				   
				   
				   $scope.positionName = [];
				   $scope.count = [];
				   
				   if($scope.TrendingJob == null || $scope.TrendingJob == undefined || $scope.TrendingJob.length == 0){					
					   $scope.pieset = false;
					  
				   }else{				   
					   for(var  i=0; i<$scope.TrendingJob.length; i++){
						   $scope.positionName.push($scope.TrendingJob[i].name);
						   $scope.count.push($scope.TrendingJob[i].count);
					   }					   
						   $scope.pieset = true;
				   }
				   
				
				 //for pie chart---------------------------	
				   
				   $scope.pie_ctx = document.getElementById("pie-chart");
					$scope.pie_chart = new Chart($scope.pie_ctx, {
					    type: 'pie',
					    data: {
					      labels: $scope.positionName,
					      datasets: [{
					        label: "Series1 (Percentage)",
					        backgroundColor: ["#74b3ea", "#8f44ad","#7af084","#fea05f","#8180e5", "#fc527d"],
					        hoverBackgroundColor: ["#519cde" , "#541e69", "#36f045", "#fb8330", "#5050e3", "#f43f6d"],
					        hoverBorderColor: ["#74b3ea", "#454549","#7af084","#fea05f","#8180e5", "#fc527d"],
					        data: $scope.count
					      }]
					    },
					    options: {
					      title: {
					        display: false,
					        text: ''
					      },
					      legend: {
					        display: true,
					        position: 'bottom',
					        legendMarkerType: "circle"

					    },
					    tooltips: {
					            callbacks: {
					                label: function(tooltipItem, data) {
					                    var allData = data.datasets[tooltipItem.datasetIndex].data;
					                    var tooltipLabel = data.labels[tooltipItem.index];
					                    var tooltipData = allData[tooltipItem.index];
					                    var total = 0;
					                    for (var i in allData) {
					                        total += allData[i];
					                    }
					                    var tooltipPercentage = ((tooltipData / total) * 100).toFixed(2);
					                    return tooltipLabel + ' : '  + ' ' + tooltipPercentage + '%';
					                }
					            },
					            backgroundColor: '#ccc',
					            titleFontSize: 14,
					            titleFontColor: '#0066ff',
					            bodyFontColor: '#000',
					            bodyFontSize: 14, 
					            displayColors: false
					        }
					    
					    }
					});
					//pie chart closed-----------------	
			},function(response){			
				});
		  };
		  
		 
}]);