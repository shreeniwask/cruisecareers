/*
 * (C) Copyright 2015 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
document.cookie = 'X-Authorization=' + getCookie('ACCESS_TOKEN') + '; path=/';
var wsPlayer = new WebSocket(internetCallingURL+'api/player?accessToken='+getCookie('ACCESS_TOKEN'));
//var wsPlayer = new WebSocket('wss://calling.cruisecareers.in:8443/internetCalling/api/player?accessToken='+getCookie('ACCESS_TOKEN'));
var webRtcPeer;
var video;
var state = null;
var isSeekable = false;

var I_CAN_START = 0;
var I_CAN_STOP = 1;
var I_AM_STARTING = 2;
var seekslider;
var played=false;
var videoDuration;
var s_mode;
var videourl;

window.onbeforeunload = function() {
	wsPlayer.close();
}

wsPlayer.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'startResponse':
		startResponse(parsedMessage);
		break;
	case 'error':
		if (state == I_AM_STARTING) {
			setState(I_CAN_START);
		}
		onError('Error message from server: ' + parsedMessage.message);
		break;
	case 'playEnd':
		playEnd();
		break;
	case 'videoInfo':
		showVideoData(parsedMessage);
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
			if (error)
				return console.error('Error adding candidate: ' + error);
		});
		break;
	case 'seek':
		console.log (parsedMessage.message);
		break;
	case 'position':
		document.getElementById("videoPosition").value = parsedMessage.position;
		break;
	case 'iceCandidate':
		break;
	default:
		if (state == I_AM_STARTING) {
			setState(I_CAN_START);
		}
		onError('Unrecognized message', parsedMessage);
	}
}


function start(mode,elementId,videoUrl) {
	// Disable start button
	setState(I_AM_STARTING);
	video = document.getElementById(elementId);
	showSpinner(video);
	videourl=videoUrl;
	console.log('Creating WebRtcPeer in ' + mode + ' mode and generating local sdp offer ...');

	// Video and audio by default
	var userMediaConstraints = {
		audio : true,
		video : true
	}

	if (mode == 'video-only') {
		userMediaConstraints.audio = false;
	} else if (mode == 'audio-only') {
		userMediaConstraints.video = false;
	}
	s_mode=mode;
	var options = {
		remoteVideo : video,
		mediaConstraints : userMediaConstraints,
		onicecandidate : onIceCandidate
	}

	console.info('User media constraints' + userMediaConstraints);

	webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
			function(error) {
				if (error)
					return console.error(error);
				webRtcPeer.generateOffer(onOffer);
			});
}

function onOffer(error, offerSdp) {
	if (error)
		return console.error('Error generating the offer');
	console.info('Invoking SDP offer callback function ' + location.host);

	var message = {
		id : 'start',
		sdpOffer : offerSdp,
		videourl : videourl
	}
	sendMessage(message);
}

function onError(error) {
	console.error(error);
}

function onIceCandidate(candidate) {
	console.log('Local candidate' + JSON.stringify(candidate));

	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	}
	sendMessage(message);
}

function startResponse(message) {
	setState(I_CAN_STOP);
	console.log('SDP answer received from server. Processing ...');

	webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
		if (error)
			return console.error(error);
	});
}

function pause() {
	togglePause()
	console.log('Pausing video ...');
	var message = {
		id : 'pause'
	}
	sendMessage(message);
}

function resume() {
	togglePause()
	console.log('Resuming video ...');
	var message = {
		id : 'resume'
	}
	sendMessage(message);
}

function stop() {
	console.log('Stopping video ...');
	setState(I_CAN_START);
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;

		var message = {
			id : 'stop'
		}
		sendMessage(message);
	}
	hideSpinner(video);
}

function playEnd() {
	setState(I_CAN_START);
	hideSpinner(video);
	pbutton=$($($(video).siblings( ".video_controls_bar")[0]).find(".pButton")[0]);
	$($($(video).siblings( ".video_controls_bar")[0]).find(".start_play")[0]).css("display","block");
	$(pbutton).css("display","none");
	$($($($(video).siblings( ".video_controls_bar")[0]).find(".replay")[0])).css("display","block");
}

function doSeek(element) {
	var message = {
		id : 'doSeek',
		position: (videoDuration*element.value/100)
	}
	sendMessage(message);
}

function getPosition() {
	var message = {
		id : 'getPosition'
	}
	sendMessage(message);
}

function showVideoData(parsedMessage) {
	//Show video info
	isSeekable = parsedMessage.isSeekable;
	if (isSeekable) {
//		document.getElementById('isSeekable').value = "true";
		enableButton('#doSeek', 'doSeek()');
	} else {
	//	document.getElementById('isSeekable').value = "false";
	}
	played=true
	videoDuration=parsedMessage.videoDuration;
	playhead=$($($(video).siblings( ".video_controls_bar")[0]).find(".playhead")[0]);
	var timeline = $($($(video).siblings( ".video_controls_bar")[0]).find(".timeline")[0]); // timeline
	pbutton=$($($(video).siblings( ".video_controls_bar")[0]).find(".pButton")[0]);
	$(pbutton).css("display","block");
	$($($(video).siblings( ".video_controls_bar")[0]).find(".curtimetext")[0]).html('00:00');
	$($($(video).siblings( ".video_controls_bar")[0]).find(".start_play")[0]).css("display","none");
	$($($(video).siblings( ".video_controls_bar")[0]).find(".replay")[0]).css("display","none");
	// timeline width adjusted for playhead
	var timelineWidth = $(timeline).outerWidth() - $(playhead).outerWidth();
	
	if (s_mode == 'audio-only') {
		showAudioPlaceholder(video);
	}
	$(playhead).css( { marginLeft : "0px" } );
	video.ontimeupdate = function() {
		$($($(video).siblings( ".video_controls_bar")[0]).find(".curtimetext")[0]).html(msToHMS(video.currentTime*1000));
		 var playPercent = timelineWidth * (video.currentTime*1000 / videoDuration);
		 if(video.currentTime*1000<=videoDuration){
			 $(playhead).css( { marginLeft : playPercent+ "px" } );
		 }else{
			 $(playhead).css( { marginLeft : timelineWidth+ "px" } );
		 }
    };
	$($($(video).siblings( ".video_controls_bar")[0]).find(".durtimetext")[0]).html(msToHMS(videoDuration))
}
//returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}
//mousemove EventListener
//Moves playhead as user drags
function moveplayhead(event) {
 var newMargLeft = event.clientX - getPosition(timeline);

 if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
     playhead.style.marginLeft = newMargLeft + "px";
 }
 if (newMargLeft < 0) {
     playhead.style.marginLeft = "0px";
 }
 if (newMargLeft > timelineWidth) {
     playhead.style.marginLeft = timelineWidth + "px";
 }
}

function setState(nextState) {
	switch (nextState) {
	case I_CAN_START:
		enableButton('#start', 'start()');
		disableButton('#pause');
		disableButton('#stop');
		enableButton('#videourl');
		enableButton("[name='mode']");
		disableButton('#getPosition');
		disableButton('#doSeek');
		break;

	case I_CAN_STOP:
		disableButton('#start');
		enableButton('#pause', 'pause()');
		enableButton('#stop', 'stop()');
		disableButton('#videourl');
		disableButton("[name='mode']");
		break;

	case I_AM_STARTING:
		disableButton('#start');
		disableButton('#pause');
		disableButton('#stop');
		disableButton('#videourl');
		disableButton('#getPosition');
		disableButton('#doSeek');
		disableButton("[name='mode']");
		break;

	default:
		onError('Unknown state ' + nextState);
		return;
	}
	state = nextState;
}

function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Senging message: ' + jsonMessage);
	wsPlayer.send(jsonMessage);
}
function playPause(element){
	if(played){
		pause();
		element.classList.remove("pause")
		element.classList.add("play");
		played=false
	} else {
		resume();
		element.classList.remove("play")
		element.classList.add("pause");
		played=true
	}
}
function replay(element){
	element.style.display="none";
	stop();
	pbutton=$($($(video).siblings( ".video_controls_bar")[0]).find(".pButton")[0]);
	$(pbutton).css("display","block");
	start(s_mode,video.id,videourl)
}
function muteUnmute(element){
	if(video.muted){
		video.muted = false;
		element.classList.remove("mute")
		element.classList.add("unmute");
	} else {
		video.muted = true;
		element.classList.remove("unmute")
		element.classList.add("mute");
	}
}
function togglePause() {
	var pauseText = $("#pause-text").text();
	if (pauseText == " Resume ") {
		$("#pause-text").text(" Pause ");
		$("#pause-icon").attr('class', 'glyphicon glyphicon-pause');
		$("#pause").attr('onclick', "pause()");
	} else {
		$("#pause-text").text(" Resume ");
		$("#pause-icon").attr('class', 'glyphicon glyphicon-play');
		$("#pause").attr('onclick', "resume()");
	}
}

function disableButton(id) {
	$(id).attr('disabled', true);
	$(id).removeAttr('onclick');
}

function enableButton(id, functionName) {
	$(id).attr('disabled', false);
	if (functionName) {
		$(id).attr('onclick', functionName);
	}
}

function showSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = 'resources/img/transparent-1px.png';
		arguments[i].style.background = 'center transparent url("resources/img/spinner.gif") no-repeat';
	}
}

function hideSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].src = '';
		arguments[i].poster = 'resources/img/ic/video_placeholder.jpg';
		arguments[i].style.background = '';
	}
}
function msToHMS( duration ) {
	 var milliseconds = parseInt((duration % 1000) / 100),
	    seconds = parseInt((duration / 1000) % 60),
	    minutes = parseInt((duration / (1000 * 60)) % 60),
	    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	  hours = (hours < 10) ? "0" + hours : hours;
	  minutes = (minutes < 10) ? "0" + minutes : minutes;
	  seconds = (seconds < 10) ? "0" + seconds : seconds;

	  return hours + ":" + minutes + ":" + seconds ;
}
function seektimeupdate(duration){
	var nt = video.currentTime * (100 / parseInt((duration / 1000) % 60) );
	console.log(nt);
	seekslider=$($($(video).siblings( ".video_controls_bar")[0]).children(".seekslider")[0])
	seekslider.val( nt);
	var curmins = Math.floor(video.currentTime / 60);
	var cursecs = Math.floor(video.currentTime - curmins * 60);
	var durmins = Math.floor(parseInt((duration / (1000 * 60)) % 60) / 60);
	var dursecs = Math.floor(parseInt((duration / 1000) % 60) - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	$($($(video).siblings( ".video_controls_bar")[0]).children(".curtimetext")[0]).html(curmins+":"+cursecs);
	//curtimetext.innerHTML = curmins+":"+cursecs;
	//durtimetext.innerHTML = durmins+":"+dursecs;
}
/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});


function showAudioPlaceholder() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = 'resources/img/transparent-1px.png';
		arguments[i].style.background = 'center transparent url("resources/img/ic/voice.png") no-repeat';
	}
}
