var speechCmd={};
speechCmd.clear=["clear","clean"];
speechCmd["delete"]=["delete","remove"];
speechCmd["okhorlicks"]=["ok google","okay google","ok horlicks","okay Horlicks"];
speechCmd.close=["close"];
speechCmd.send=["send","sent"];

var isSent=false;
var autosendTime=10; // 30 seconds
var idleTime = 0;
var intervalTrigger=true;
var speech = new Speech();
var tf="";
var tn="";


function timerIncrement()
{
  idleTime++;
 
  if (idleTime > autosendTime && $autosend)
  {
	idleTime=0;
    autoSend();
  }
}


function autoSend()
{

	makeAjaxCall();
	var speech1 = new Speech();
	speech1.stopCapture();
	speech1.startCapture();
}


function SpeechCMD(){
	this.init=function(event){
		var str =event.results[0][0].transcript.toLowerCase();
				
		var rStr="";
		var isGTrue=false;
		for(var prop in speechCmd){
			//alert(prop);
			switch(prop){
			case "clear":
				var isTrue=false;
				for (i = 0; i < speechCmd[prop].length; i++) { 
					//alert(str.includes(speechCmd[prop][i]));
					if(str.includes(speechCmd[prop][i]) == true){
						isTrue=true;
					}
				}
				if(isTrue){
				rStr=this.cmdClear(event);
				isGTrue=isTrue;
				}
				break;
			case "delete":
				var isTrue=false;
				for (i = 0; i < speechCmd[prop].length; i++) { 
					if(str.includes(speechCmd[prop][i]) == true){
						isTrue=true;
					}
					
				}
				if(isTrue){
					rStr=this.cmdDelete(event);
					isGTrue=isTrue;
					}
				break;
			case "okhorlicks":
				if (typeof str === 'undefined' || !str) { 
					str=event.results[0][0].transcript;
				};
				var isTrue=false;
				for (i = 0; i < speechCmd[prop].length; i++) { 
					if(str.includes(speechCmd[prop][i]) == true){
						isTrue=true;
						
					}
				}
				if(isTrue){
					rStr=this.cmdOkHrolicks(event);
					isGTrue=isTrue;
					}
				//this.str=this.cmdOkHrolicks(this.str)
				break;
			case "close":
				var isTrue=false;
				for (i = 0; i < speechCmd[prop].length; i++) { 
					if(str.includes(speechCmd[prop][i]) == true){
						isTrue=true;
						
					}
				}
				if(isTrue){
					rStr=this.cmdClose(event);
					isGTrue=isTrue;
					}
				//this.str=this.cmdClose(this.str)
				break;
			case "send":
				var isTrue=false;
				for (i = 0; i < speechCmd[prop].length; i++) { 
					if(str.includes(speechCmd[prop][i]) == true){
						isTrue=true;
					}
				}
				if(isTrue){
					rStr=this.cmdSend(event);
					isGTrue=false;
					
					}
				//this.str=this.cmdSend(this.str)
				break;
			}
			
		}
		if(isGTrue)
		return rStr;
		return str;		
	}
	this.cmdClear=function(event){
		str=""
		var speech1 = new Speech();
		speech1.stopCapture();
		speech1.startCapture();
		return str;
	}
	this.cmdDelete=function(){
		
	}
	this.cmdOkHrolicks=function(event){
		$modal.css({
	        top: 0,
	        left: 0,
	        width: '100%',
	        height: '100%'
	    }).addClass('is-open');
		$('#sidebar_secondary').addClass('popup-box-on');
		var speech1 = new Speech();
		speech1.stopCapture();
		speech1.startCapture();
	}
	this.cmdSend=function(event){
		
		
/*	  var inputtext= $('.rsc-input').val();
		
	    	if($.trim(inputtext).length > 1){
	    		$('.rsc-submit-button').click();
	    	}else{
	    		alert("Please ask question.");
	    	}
	    	var speech1 = new Speech();
			speech1.stopCapture();
			speech1.startCapture();*/
		
		autoSend();
	}
	this.cmdClose=function(){
		
		 var top = $trigger.offset().top + $trigger.outerHeight();
		    var left = $trigger.offset().left;
		    $modal.css({
		        top: top,
		        left: left,
		        width: 0,
		        height: '2px'
		    }).removeClass('is-open');
		    //document.getElementById("myModal").style.display = "none";
			 $('#sidebar_secondary').removeClass('popup-box-on');
			 var speech1 = new Speech();
				speech1.stopCapture();
				speech1.startCapture();
	}
}



function Speech() {
  if ('webkitSpeechRecognition' in window) {
    // creating voice capture object
    this.recognition = new webkitSpeechRecognition();

    // settings
    this.recognition.continuous = true; // not stop automatically
    this.recognition.interimResults = true;

    this.startCapture = function() {
      this.recognition.start();
    }

    this.stopCapture = function() {
      this.recognition.stop();
    }

    this.restartCapture = function() {
    	this.recognition.stop();
        this.recognition.start();
      }    
    
    this.recognition.onresult = function(event) {
    	
    	console.log(event);
    	var speechCMD = new SpeechCMD();    	
    	var transcrt=speechCMD.init(event);
    	
    	//var transcrt=event.results[0][0].transcript;
    	console.log(transcrt);
    	//$('#output').text(event.results[0][0].transcript);      
    	// $('#output').val(transcrt);
    	
    	/*var speechCMD = new SpeechCMD();
    	transcrt=speechCMD.init(transcrt);*/
      	$output.val(transcrt);
      	/*var currT= new Date();
      	tf = currT;
      	tf.setSeconds(tf.getSeconds() + autosendTime);
      	tn=currT;
      	
      	$.delay(autosendTime*1000, function(){
      		
      	});*/
      	idleTime=0;
      	if(intervalTrigger)
      	var idleInterval = setInterval(timerIncrement, 1000);
      	intervalTrigger=false;
    }

    this.recognition.onerror = function(event) {
      console.log(event.error);
      var speech1 = new Speech();
		speech1.stopCapture();
		speech1.startCapture();
    }

    console.log("webkitSpeechRecognition is available.");
  } else {
    console.log("webkitSpeechRecognition is not available.");
  }
}




$( document ).ready(function() {
	console.log('Starting SpeechRecognition library.');
	speech.startCapture();
	
	$('#output').focus( function() {
		$autosend=false;
		});

	$('#output').blur( function() {
		idleTime=0;
		$autosend=true;
		});
});

