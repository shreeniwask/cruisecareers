'use strict';

var controllers = angular.module('LoginModule');

controllers.controller('Testimonials_Ctrl',['$scope','$rootScope','$state','GlobalModule_dataStoreService','GlobalModule_notificationService','Master_Service','Testimonials_Service', function ($scope, $rootScope,$state,GlobalModule_dataStoreService,GlobalModule_notificationService,Master_Service,Testimonials_Service)
{
	
	/*$scope.testimonialsListFlag=true;
	$scope.testimonialsEditFlag=false;
	$scope.testimonialId=-1;
	
    $rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');
    
    $scope.testimonialsListFlag =  GlobalModule_dataStoreService.loadData('LoginModule','testimonialsListFlag');
    
    if($scope.testimonialsListFlag==false){
    	
    	 $scope.testimonialsListPage = GlobalModule_dataStoreService.loadData('LoginModule','testimonialsListPage');
    	
    	 $scope.testimonialsEditFlag = GlobalModule_dataStoreService.loadData('LoginModule','testimonialsEditFlag');
  
    	 GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListFlag', true);
    
    }*/
	
    
	//----------------View/fetch Position list ------------------------- 
	 $scope.fetchTestimonialsList = function(offset,limit,colName,order,search){
	
		 $(".loader").show();
		 if(search=="" || search==null)
		 {
			  search= undefined;
		 }
		 if(colName == null || colName== "")
		 {
			  colName = undefined;
		 }
		 if(order == null)
		 {
			  order = undefined;
		 }
			 
		 Testimonials_Service.fetchTestimonialsList(offset,limit,colName,order,search).then(function(response){
			 $scope.testimonialsList=response.data;
			////console.log($scope.testimonialsList);
			 $(".loader").fadeOut("slow");
		  },function(response){
			  $(".loader").fadeOut("slow");
		 }); 
	 };
	
	 $scope.fetchTestimonialsList(0,10,null,null,null);
	 
//-----------sorting position master list-----
	 
	 $scope.SortingTestimonialsList = function(colName,searchterm){
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
			$scope.fetchTestimonialsList(0,10,$scope.colName,$scope.order,$scope.search);	
		};
		
		//------pagination--------------------------------
		
		 	$scope.offset=0;
			$scope.limit=10;
			$scope.navButtons = [];
			$scope.setButton = function(){
			$scope.navButtons = [];
				
				for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
			}		
				$scope.fetchTestimonialsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
				
		$scope.getTestimonialsListCount=function(search){
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
			Testimonials_Service.getTestimonialsListCount($scope.search).then(function(response){
				$scope.count = response.data;
				
			if($scope.count>$scope.limit){
				$scope.setButton();
			}				
		},function(response){
					
				$(".loader").fadeOut("slow");
					
			});		
		};
		$scope.getTestimonialsListCount(null);
		    
			
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
		    $scope.fetchTestimonialsList($scope.offset,$scope.limit,$scope.colName,$scope.order,$scope.search);
		};
		    //----pagination end------

	
		$scope.setButton = function(){
			$scope.navButtons = [];
				
			for(var j = $scope.start, len= $scope.count/$scope.limit; j < $scope.start+5 && j < len; j++){
				$scope.navButtons.push(j);
			}
			$scope.fetchTestimonialsList();
		};
		    
	
				//----------Get no of checked position-------
		
		$scope.getCheckedTestimonialsid=[];
		 $scope.getSequences=[];
		  $scope.checkedTestimonialsList = function(id,sequence){			  
			  $scope.getSequences.push(sequence);
			  
			  if($scope.getCheckedTestimonialsid.indexOf(id) !== -1)
			  {		
			  var array  = $scope.getCheckedTestimonialsid;
			  var index = array.indexOf(id);
			  $scope.getCheckedTestimonialsid.splice(index,1);
			  }else
			  {		    	
		      $scope.getCheckedTestimonialsid.push(id);				      
			  };						  
		  };
		 
		  $scope.checkedAllList = function(listedTestimonials,rd){				  
			  if(rd == true || rd == undefined){				 
			  for(var i=0; i<listedTestimonials.length; i++){					  				   
				  //if already exist in getCheckedpoitionid than don't pass
				  if($scope.getCheckedTestimonialsid.indexOf(listedTestimonials[i].id) !== -1)   {  						 
				  }else{
					  $scope.checkedTestimonialsList(listedTestimonials[i].id);	
				  }
				  
			  }			
			  }else{
				  $scope.getCheckedTestimonialsid=[];
			  }
		  };
		  
		  
		  $scope.check = function(){				  
		  if($scope.getCheckedTestimonialsid.length == 0){
			  GlobalModule_notificationService.notification("error","Please select any record");
			  }
		  else{	
			  ////console.log($scope.getSequences);
			  $('#deletelist').modal('show');
			  }			  
		  };				
			//-----------------------------------------------------------------------	  
			
		$scope.deletefromList = function(formlist){
			var testimonial	={};  
			$(".loader").show();
			var maxSequence=Math.max.apply(Math, $scope.getSequences);
			////console.log(maxSequence);
			$scope.formlist=formlist;
			testimonial.userid=$rootScope.userdetails.id;
			testimonial.maxSequence=maxSequence;
			testimonial.ids=$scope.getCheckedTestimonialsid;
			$("#deletelist").modal('show');
			Testimonials_Service.deleteTestimonialfromList(testimonial,$scope.formlist).then(function(response){
			$scope.testimonialflag = response.data;	
			$scope.getTestimonialsListCount(null);
			$scope.fetchTestimonialsList(0,10,null,null,null);
			$scope.getCheckedTestimonialsid=[];
			if($scope.testimonialflag.indexOf("success")!=-1){
				
				GlobalModule_notificationService.notification("success","Record deleted successfully");
				
			}else{
				
				GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
			}
			$state.reload();
			$(".loader").fadeOut("slow");
			},function(response){
				$(".loader").fadeOut("slow");
			});
		};
		//--------------------------------------------------------------------------------
		
		
		$scope.allTestimonialsSequence=function()
		{
			Testimonials_Service.allTestimonialsSequence().then(function(response){
				 $scope.allSequences=response.data;
				////console.log($scope.allSequences);				
				 $(".loader").fadeOut("slow");
			  },function(response){
				  $(".loader").fadeOut("slow");
			 });
		};
		$scope.allTestimonialsSequence();
		
		$scope.testimonialData = function(data){	
						
			////console.log(data);
					 	
			$(".loader").show();
			
			////console.log($scope.allSequences);
			
			var temp= $scope.allSequences.length;
						
			$scope.sequenceList=[];
					
			for(var i=1;i<=temp;i++)
			{
				$scope.sequenceList.push({sequence:i});
			}
			$scope.testimonial = {
					  name:"",
					  position:"",
					  profilePicPath:"",			
					  description:"",				
					  sequence:""					  
			  };
			  $scope.testimonial.id=data.id;
			  $scope.testimonial.name=data.name;
			  $scope.testimonial.position=data.position;
			  $scope.testimonial.description=data.description;
			  $scope.testimonial.sequence=data.sequence;
			  $scope.testimonial.oldSequence=data.sequence;			  
			  $scope.testimonial.profilePicPath=data.profilePicPath;
			  ////console.log($scope.testimonial.profilePicPath);
			  $("#show-add-testimonial").show();
			  $(".loader").fadeOut("slow");
		         $("#testimonialslist").hide();
			// $scope.fetchTemplateQuestion(data.id);
			/*GlobalModule_dataStoreService.storeData('LoginModule','testimonialsEditFlag', true);
			GlobalModule_dataStoreService.storeData('LoginModule','testimonialId', data.id);
			GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListFlag', false);
			GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListPage',data);				
					    // $scope.addTemplateQuestion();
					    // $scope.removeTemplateQuestion(index);
			$state.go("restricted.admin.createtestimonial");*/
		};
				  
				  
					  
		$scope.cancel= function(){
			
			$(".loader").show();
			$("#show-add-testimonial").hide();
			$(".loader").fadeOut("slow");
	         $("#testimonialslist").show();
				//location.reload();	     
			//$state.go("restricted.admin.testimonials");
		};
				//-----------------save/insert position in list-----------------------	
				  
		$scope.addTestimonialsDetails=function(testimonial){ 
					  						  
			$(".loader").show();
			var letterNumber = /^[a-zA-Z0-9!@\#\`\~\$%\^\&*\)\(\{\}\:\,;\|"\'+\?\<\>\[\]=._\:\-\\\/" "]+$/;
					  					  
			if(testimonial.name == undefined || testimonial.name.match(letterNumber)){
					  					 
				testimonial.userid=$rootScope.userdetails.id;
				testimonial.oldSequence=$scope.testimonial.oldSequence;				
				var input = document.getElementById('input-image');
				//console.log(input.value);
				if(testimonial.profilePicPath == '')
				{
					if(input.value == "" && ($scope.removeflag==true || $scope.removeflag==undefined || testimonial.profilePicPath == '' || testimonial.profilePicPath == null))
					{
						GlobalModule_notificationService.notification("error","Please select Image");
						$(".loader").fadeOut("slow");
						return;
					}
				}
				var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
				if(testimonial.profilePicPath == '' || testimonial.profilePicPath == null)
				{
					if(!allowedExtensions.exec(input.value))
					{
							       
			        GlobalModule_notificationService.notification("error","Please upload file having extensions .jpeg/.jpg/.png/.gif only.");
			        input.value = '';
			        $(".loader").fadeOut("slow");
			        return;
					}
				}	
				if(input.value != "")
					$scope.removeflag=false;
				
				////console.log(input.value);
				////console.log(testimonial.profilePicPath);
				
				if(input.value!="")
				{
				var file = input.files[0];
				var formData = new FormData();
				formData.append("file",file);
		    	  
				$.ajax({
					url: 'rest/testimonials/upload/testimonialprofile',
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
							 	testimonial.profilePicPath = $scope.filedtailsforProfile.fileURL;
							}
						 ////console.log(testimonial);
						 Testimonials_Service.addTestimonialDetails(testimonial).then(function(response){
								$scope.addtestimonialsdetails = response.data;
								document.getElementById('input-image').value="";			         
								
										  //$scope.positionmaster={};
								//$state.go('restricted.admin.testimonials');
								
								if($scope.addtestimonialsdetails.indexOf("success")!=-1){
									$("#show-add-testimonial").hide();
							        $scope.getTestimonialsListCount(null);
									$scope.fetchTestimonialsList(0,10,null,null,null);
									GlobalModule_notificationService.notification("success","Testimonial's Details saved successfully");									
							         $("#testimonialslist").show();	
									$(".loader").fadeOut("slow");
									$state.go('restricted.admin.testimonials');							 }
								else if($scope.addtestimonialsdetails =='failed'){
									GlobalModule_notificationService.notification("error","Testimonial Name already exist");
								}
								else{
									GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								}
										 
								$(".loader").fadeOut("slow");
								$state.go('restricted.admin.testimonials');
								$state.reload();
							},function(response){
								$(".loader").fadeOut("slow");
								GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
										 
						});
					}
				});								
				}
				else
					{
					testimonial.profilePicPath=$scope.testimonial.profilePicPath;
					////console.log(testimonial);
					Testimonials_Service.addTestimonialDetails(testimonial).then(function(response){
						$scope.addtestimonialsdetails = response.data;
							
						$scope.getTestimonialsListCount(null);
						$scope.fetchTestimonialsList(0,10,null,null,null);
								  //$scope.positionmaster={};
						$state.go('restricted.admin.testimonials');
								
						if($scope.addtestimonialsdetails.indexOf("success")!=-1){
							$("#show-add-testimonial").hide();
					        $scope.getTestimonialsListCount(null);
							$scope.fetchTestimonialsList(0,10,null,null,null);							
							GlobalModule_notificationService.notification("success","Testimonial's Details saved successfully");
							$("#testimonialslist").show();	
							$(".loader").fadeOut("slow");
							//$location.reload("/testimonials");
							//$window.location.reload("/testimonials");
						}
						else if($scope.addtestimonialsdetails =='failed'){
							GlobalModule_notificationService.notification("error","Testimonial Name already exist");
						}
						else{
							GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
						}
								 
						$(".loader").fadeOut("slow");
					},function(response){
						$(".loader").fadeOut("slow");
						GlobalModule_notificationService.notification("error","Uh Oh! Seems to be an error. Please try again");
								 
					});
					$state.go('restricted.admin.testimonials');
					$state.reload();
				}
			 }
			else
			{
				GlobalModule_notificationService.notification("error","Please enter valid value");
			}
		};
				
				  
					  
			$scope.clear=function(){
				
				$(".loader").show();
				var temp=$scope.allSequences.length;
				var m=temp+1;
				$scope.sequenceList=[];
				////console.log($scope.allSequences.length);	
				////console.log(temp);
				for(var i=1;i<=m;i++)
				{
					$scope.sequenceList.push({sequence:i});
				}
				////console.log($scope.testimonial);
				$scope.testimonial = {
						  name:"",
						  position:"",
						  profilePicPath:"",			
						  description:"",				
						  sequence:""					  
				 };	
				////console.log($scope.testimonial);
		         $("#show-add-testimonial").show();
		         $(".loader").fadeOut("slow");
		         $("#testimonialslist").hide();
					/*GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListFlag', true);
					GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListPage', $scope.testimonialsListPage);
					GlobalModule_dataStoreService.storeData('LoginModule','testimonialsEditFlag', false);							 
					//GlobalModule_dataStoreService.storeData('LoginModule','interviewTemplateQuestions',  $scope.TemplateQuestion);
			    	 
					$state.go("restricted.admin.createInterviewTemplate");*/
						
			};
				
			$scope.removeflag=undefined;
			$scope.getremove = function(){
				$scope.removeflag=true;
				$('#image_upload_preview').attr('src', 'resources/img/default-image.png');
				$scope.testimonial.profilePicPath="";
			};
			/*$scope.getData = function()
			{
				GlobalModule_dataStoreService.storeData('LoginModule','testimonialsEditFlag', false);
				$state.go("restricted.admin.createtestimonial");
						 
						 
				$scope.testimonialsListPage = {
						  templateName:"",
						  position:{
							  id:""
						           }			  
				};
				GlobalModule_dataStoreService.storeData('LoginModule','testimonialsListPage',  $scope.testimonialsListPage);
			};*/
	
			$scope.getindex=function(){
				
				
				 function readURL(input) {
				        if (input.files && input.files[0]) {
				            var reader = new FileReader();

				            reader.onload = function (e) {
				                $('#image_upload_preview').attr('src', e.target.result);              
				            };            
				            
				            reader.readAsDataURL(input.files[0]);
				        }
				    }
				      $('#input-image').change(function () {
				        readURL(this);
				    }); 
				
			};
			$scope.formatDate = function(date){
				 if(date != null || date == ' ' || date != undefined)
		         {
					 var dateOut = moment(date,'yyyy-MM-DD').format("DD-MM-YYYY");
			         return dateOut;
		         }
				 return;
		   };
}]);

