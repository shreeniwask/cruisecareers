var controllers=angular.module("LoginModule")

controllers.controller('TicketsController',function($scope,$rootScope,$location,TicketService,GlobalModule_dataStoreService,$state){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	$scope.attachments=[];

	$scope.fetchTicketList=function(){
		TicketService.fetchTicketList($rootScope.userdetails.id).then(function(response){
			$scope.tickets=response.data;
			$(".loader").fadeOut("slow");
			$scope.fetchTicketDetails($scope.tickets[0])
			//console.log($scope.tasksList);

		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchTicketDetails=function(ticket){
		$scope.ticket=ticket;
		$scope.fetchUserCallAttachmentByUserCallId(ticket.id);
		TicketService.fetchTicketDetails(ticket.id).then(function(response){
			$scope.ticketDetails=response.data;
			//console.log($scope.tasksList);
			$(".loader").fadeOut("slow");
			setTimeout( function(){ $(".msg_history").scrollTop( $('.msg_history').prop('scrollHeight')) }, 100);
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}

	$scope.fetchTicketList();

	$scope.replyByMessage=function(message){
		$(".loader").show();
		var usercallLog={};
		usercallLog.userCallId=$scope.ticket.id;
		usercallLog.textMessage=message;
		usercallLog.callerid=$rootScope.userdetails.id;
		attachments
		TicketService.replyToTicket($('#attachments')[0].files,usercallLog,undefined,undefined).then(function(response){
			usercallLog=response.data;
			$scope.attachments=[];
			$scope.ticketDetails.push(usercallLog);
			setTimeout( function(){ $(".msg_history").scrollTop( $('.msg_history').prop('scrollHeight')) }, 100);
			$('#reply')[0].reset();
			$(".loader").fadeOut("slow");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
	$scope.fetchUserCallAttachmentByUserCallId=function(ticketId){
		$(".loader").show();
		TicketService.fetchUserCallAttachmentByUserCallId(ticketId).then(function(response){

			$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
			$("#text_message").modal();
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};

	$scope.closeTicket=function(ticket){
		$(".loader").show();
		TicketService.closeTicket(ticket.id).then(function(response){

			//$scope.userCallAttachmentList=response.data;
			$(".loader").fadeOut("slow");
			$state.go("restricted.support_feedback",{callId: ticket.id});
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	};
	
	
	$scope.disableButton=function()
	{
		$('#ticketClosed').prop('disabled', true);
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
	$("#attachments").on('change', function() {
		if (this.files.length >= 1) {
			$.each(this.files, function(i, file) {
				$scope.$apply(function(){
					$scope.attachments.push(file);
				})

			})

		}


	});
	$scope.showAudioMessage=function(ticket){
		//$(".loader").show();
		
		$rootScope.getSignedURL(ticket.voiceMessage).then(function(response){
			$scope.voiceMessage=response.data;
			$(".loader").fadeOut("slow");
			if(video){
				stop();
			}
			
			start('audio-only','player'+ticket.id,response.data)
		},function(response){
			GlobalModule_dataStoreService.errorResponseHandler(response);
		});
	};
	
	$scope.dateformate = function(date){		     
        var dateOut = moment(date).format("DD-MM-YYYY hh:mm a");
        
        return dateOut;
  };
	
});
controllers.directive('chatScreen', function() {
	return function(scope, element, attrs) {
		scope.$on('LastElem', function(event){
			$(".msg_history").scrollTop( $('.msg_history').prop('scrollHeight'))
		});
	};
});