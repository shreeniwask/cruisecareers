var controllers=angular.module("LoginModule")

controllers.controller('SupportFeedbackController',function($scope,$rootScope,$location,GlobalModule_dataStoreService,$state,TicketService,$stateParams){
	$rootScope.userdetails = GlobalModule_dataStoreService.loadData('LoginModule','user');	
	$('.rating').magicRatingInit({
		success: function(magicRatingWidget, rating) {
			//alert(rating);
		},
		iconGood: "fa-bicycle",
		iconBad: "fa-car",
	});
	$(".rating2").magicRatingInit({
		success: function(magicRatingWidget, rating) {
			//alert(rating);
		}
	})
	$scope.callRating=function(){
		$(".loader").show();
		var callRating={};
		callRating.rating=$("#rating i.fa-star").last().attr('data-rating');
		callRating.userCallId=$stateParams.callId
		callRating.createdBy=	$rootScope.userdetails.id
		TicketService.insertCallRating(callRating).then(function(response){
			$(".loader").fadeOut("slow");
			$scope.thanks=!$scope.thanks;
			GlobalModule_notificationService.notification("success","Your rating has been added successfully");
		},function(response){
			$(".loader").fadeOut("slow");
		}); 
	}
});